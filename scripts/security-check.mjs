/**
 * HERO Tax · Sicherheits-Smoketest gegen die Live-Seite
 * ---------------------------------------------------------------------------
 * Setzt die Maßnahmen M3 (externe Gegenprüfung der Statuscodes), M11
 * (wiederholbare Auswertung) und M12 (Alarm bei 200 auf einem Secret-Pfad)
 * der Sicherheitsanalyse vom 12.08.2026 um.
 *
 * Geprüft werden:
 *   • alle 31 in der Analyse beobachteten Angriffs-/Recon-Pfade
 *     → müssen 403 oder 404 liefern, NIEMALS 200
 *   • die echten SPA-Routen → müssen 200 liefern
 *   • ein garantiert nicht existierender Pfad → muss 404 liefern (Soft-404-Test)
 *   • die Security-Header aus M9
 *   • die HTTPS-Weiterleitung
 *
 * Aufruf:  npm run security:check
 *          npm run security:check -- --base=https://staging.example.de
 */

const args = process.argv.slice(2);
const baseArg = args.find((a) => a.startsWith("--base="));
const BASE = (baseArg ? baseArg.slice("--base=".length) : "https://herotax.de").replace(/\/+$/, "");
const UA = "herotax-security-check/1.0 (+https://herotax.de)";
const TIMEOUT_MS = 15000;

/** Die 31 Pfade aus Anhang 15 der Analyse plus die dort genannten Varianten. */
const ATTACK_PATHS = [
  // WordPress-Exploitation (Abschnitt 6.1)
  "/wp-admin/install.php",
  "/wp-admin/",
  "/wp-admin/admin-ajax.php",
  "/wp-login.php",
  "/xmlrpc.php",
  "/wp-json/",
  "/cms/wp-includes/wlwmanifest.xml",
  "/sito/wp-includes/wlwmanifest.xml",
  // Webshells und Backdoors (Abschnitt 6.3)
  "/wp-content/plugins/hellopress/wp_filemanager.php",
  "/this_is_a_new_hello_world.php",
  "/images/images/cache.php",
  "/mrmgjy.php",
  "/site.php",
  "/smtp/phpinfo.php",
  "/debug/default/view",
  // Zugangsdaten und Konfiguration (Abschnitt 6.2)
  "/.env",
  "/backend/.env",
  "/.git/config",
  "/aws/credentials",
  "/aws/s3/credentials.yml",
  "/secrets.json",
  "/config.json",
  "/settings.json",
  "/sftp-config.json",
  "/js/config.js",
  "/api/config",
  "/meta.json",
  "/settings",
  // Fingerprinting (Abschnitt 6.4)
  "/th1s_1s_a_4o4.html",
  // Feed-Cache des PHP-Proxys darf nicht direkt lesbar sein
  "/api/cache/bsi.json",
];

/** Echte Routen — müssen erreichbar bleiben. */
const VALID_PATHS = [
  "/", "/ki", "/news", "/eu-kompass", "/tools", "/live",
  "/publikationen", "/dsgvo", "/datenschutz", "/impressum",
  "/robots.txt", "/sitemap.xml", "/favicon.ico", "/404.html",
];

/** Umbenannte Adressen — müssen dauerhaft (301) auf das neue Ziel zeigen. */
const REDIRECTS = { "/eudi-wallet": "/eu-kompass" };

/** Pfade, die es nicht gibt und die einen echten 404 liefern müssen (M6). */
const SOFT404_PROBES = ["/gibt-es-nicht-" + Date.now(), "/pl", "/dashboard", "/checkout", "/signup", "/pricing"];

const REQUIRED_HEADERS = {
  "strict-transport-security": /max-age=\d{7,}/i,
  "x-content-type-options": /nosniff/i,
  "x-frame-options": /(DENY|SAMEORIGIN)/i,
  "referrer-policy": /.+/,
  "content-security-policy": /default-src/i,
  "permissions-policy": /geolocation=\(\)/i,
};

let failures = 0;
let warnings = 0;

const fail = (msg) => { failures++; console.log(`  ❌ ${msg}`); };
const warn = (msg) => { warnings++; console.log(`  ⚠️  ${msg}`); };
const ok = (msg) => console.log(`  ✅ ${msg}`);

async function probe(url, redirect = "manual") {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect,
      signal: ctrl.signal,
      headers: { "User-Agent": UA, Accept: "*/*" },
    });
    return { status: res.status, headers: res.headers, location: res.headers.get("location") };
  } catch (err) {
    return { status: 0, error: err.message, headers: new Headers() };
  } finally {
    clearTimeout(timer);
  }
}

console.log(`\n🛡  HERO Tax Sicherheits-Smoketest — ${BASE}\n`);

/* ── 1. Angriffs- und Recon-Pfade ──────────────────────────────────────────── */
console.log("① Angriffs- und Recon-Pfade (erwartet: 403 oder 404, niemals 200)");
for (const p of ATTACK_PATHS) {
  const { status, error } = await probe(BASE + p);
  if (error) { warn(`${p} → nicht erreichbar (${error})`); continue; }
  if (status === 200) fail(`${p} → HTTP 200 — dieser Pfad wird ausgeliefert!`);
  else if (status === 403 || status === 404) ok(`${p} → ${status}`);
  else warn(`${p} → ${status} (erwartet 403/404)`);
}

/* ── 2. Echte Routen ───────────────────────────────────────────────────────── */
console.log("\n② Echte Routen (erwartet: 200)");
for (const p of VALID_PATHS) {
  const { status, error } = await probe(BASE + p);
  if (error) { fail(`${p} → nicht erreichbar (${error})`); continue; }
  if (status === 200) ok(`${p} → 200`);
  else fail(`${p} → ${status} (erwartet 200)`);
}

/* ── 2b. Umbenannte Adressen ───────────────────────────────────────────────── */
console.log("\n②b Umbenannte Adressen (erwartet: 301 auf das neue Ziel)");
for (const [from, to] of Object.entries(REDIRECTS)) {
  const { status, location, error } = await probe(BASE + from);
  if (error) { fail(`${from} → nicht erreichbar (${error})`); continue; }
  const target = (location || "").replace(BASE, "");
  if (status === 301 && target === to) ok(`${from} → 301 ${to}`);
  else if (status === 301) warn(`${from} → 301 ${location} (erwartet ${to})`);
  else fail(`${from} → ${status} (erwartet 301 auf ${to})`);
}

/* ── 3. Soft-404-Test (M6) ─────────────────────────────────────────────────── */
console.log("\n③ Soft-404-Test (erwartet: echter 404, keine 200er-Auslieferung von index.html)");
for (const p of SOFT404_PROBES) {
  const { status, error } = await probe(BASE + p);
  if (error) { warn(`${p} → nicht erreichbar (${error})`); continue; }
  if (status === 404) ok(`${p} → 404`);
  else if (status === 200) fail(`${p} → 200 — Soft-404, der Server behauptet, die Seite existiere`);
  else warn(`${p} → ${status}`);
}

/* ── 4. Security-Header (M9) ───────────────────────────────────────────────── */
console.log("\n④ Security-Header auf /");
const home = await probe(BASE + "/", "follow");
if (home.error) {
  fail(`Startseite nicht erreichbar (${home.error})`);
} else {
  for (const [name, pattern] of Object.entries(REQUIRED_HEADERS)) {
    const value = home.headers.get(name);
    if (!value) fail(`Header fehlt: ${name}`);
    else if (!pattern.test(value)) warn(`Header ${name} unerwartet: "${value}"`);
    else ok(`${name}: ${value.length > 70 ? value.slice(0, 67) + "…" : value}`);
  }
  for (const leaky of ["x-powered-by", "x-aspnet-version"]) {
    if (home.headers.get(leaky)) warn(`Technologie-Banner wird gesendet: ${leaky}: ${home.headers.get(leaky)}`);
  }
}

/* ── 5. HTTPS-Weiterleitung ────────────────────────────────────────────────── */
console.log("\n⑤ HTTPS-Erzwingung");
const httpUrl = BASE.replace(/^https:/, "http:");
if (httpUrl === BASE) {
  warn("Basis-URL ist nicht https, Test übersprungen");
} else {
  const { status, location, error } = await probe(httpUrl + "/");
  if (error) warn(`http:// nicht erreichbar (${error})`);
  else if (status === 301 && (location || "").startsWith("https://")) ok(`http:// → 301 ${location}`);
  else if (status >= 300 && status < 400) warn(`http:// → ${status} ${location || ""} (erwartet 301 auf https)`);
  else fail(`http:// → ${status} — keine Weiterleitung auf HTTPS`);
}

/* ── Ergebnis ──────────────────────────────────────────────────────────────── */
console.log(`\n──────────────────────────────────────────────`);
console.log(`Ergebnis: ${failures} Fehler, ${warnings} Warnungen`);
if (failures > 0) {
  console.log("❌ Prüfung nicht bestanden.\n");
  process.exit(1);
}
console.log("✅ Prüfung bestanden.\n");
