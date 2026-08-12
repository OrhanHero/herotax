/**
 * HERO Tax · Auswertung der IONOS-Roh-Access-Logs
 * ---------------------------------------------------------------------------
 * Maßnahme M11 der Sicherheitsanalyse vom 12.08.2026. Die Analyse konnte aus
 * IONOS WebAnalytics weder Statuscodes noch IP-Adressen sehen — beides steht
 * nur in den Roh-Logs. Dieses Skript beantwortet genau die Fragen, die dort
 * offen blieben.
 *
 * Logs bei IONOS holen: Kundenkonto → Hosting → Logfiles/Statistiken →
 * Access-Log herunterladen (Combined Log Format, oft als .gz).
 *
 * Aufruf:
 *   node scripts/analyze-logs.mjs access.log
 *   node scripts/analyze-logs.mjs access.log.gz logs/*.gz
 *   node scripts/analyze-logs.mjs --top=50 access.log
 *
 * Exit-Code 1, sobald ein Secret-Pfad jemals mit HTTP 200 beantwortet wurde —
 * der Check, den die Analyse als "darf keine Treffer liefern" bezeichnet.
 */
import fs from "fs";
import zlib from "zlib";
import readline from "readline";

const args = process.argv.slice(2);
const topArg = args.find((a) => a.startsWith("--top="));
const TOP = topArg ? parseInt(topArg.slice("--top=".length), 10) : 25;
const files = args.filter((a) => !a.startsWith("--"));

if (files.length === 0) {
  console.error(`Aufruf: node scripts/analyze-logs.mjs [--top=N] <access.log|access.log.gz> [...]

Die Roh-Logs liegen nicht im Repository — sie werden im IONOS-Kundenkonto
heruntergeladen (Hosting → Logfiles). Erwartet wird das Combined Log Format:

  1.2.3.4 - - [11/Aug/2026:03:14:07 +0000] "GET /wp-admin/install.php HTTP/1.1" 403 199 "-" "Mozilla/5.0 …"
`);
  process.exit(2);
}

/* Combined Log Format. Der Zeitstempel wird als ganzes Feld gegriffen, weil er
   Leerzeichen enthält; Referrer und User-Agent stehen in Anführungszeichen. */
const LINE = /^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (\S+)[^"]*" (\d{3}) (\S+)(?: "([^"]*)" "([^"]*)")?/;

/** Pfade, deren Auslieferung mit 200 ein Sicherheitsvorfall wäre. */
const SECRET_PATTERNS = [
  /\.env/i, /\.git/i, /credentials/i, /secrets?\.json/i, /config\.(json|ya?ml)/i,
  /sftp-config/i, /id_rsa|id_ed25519/i, /\.(pem|key|p12|pfx|sql|sqlite)$/i,
  /\.htpasswd/i, /wp-config/i,
];

/** Angriffs- und Recon-Muster aus Abschnitt 6 der Analyse. */
const ATTACK_PATTERNS = [
  [/^\/wp-/i, "WordPress"],
  [/xmlrpc\.php/i, "WordPress"],
  [/wlwmanifest\.xml/i, "WordPress"],
  [/\.env|\.git|credentials|secrets|sftp-config|aws\//i, "Secret-Suche"],
  [/\.(php|phtml|phar|asp|aspx|jsp|cgi)$/i, "Skript-/Webshell-Sonde"],
  [/phpinfo|debug|server-status|server-info/i, "Info-Leak-Sonde"],
  [/th1s_1s_a_4o4|\.well-known\/security/i, "Fingerprinting"],
];

const inc = (map, key, by = 1) => map.set(key, (map.get(key) || 0) + by);
const topN = (map, n = TOP) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
const pct = (part, total) => (total ? ((part / total) * 100).toFixed(2) : "0.00");

const stats = {
  total: 0,
  unparsed: 0,
  byStatus: new Map(),
  byDay: new Map(),
  errorIps: new Map(),      // IPs mit 4xx/5xx
  allIps: new Map(),
  attackIps: new Map(),
  attackPaths: new Map(),
  attackKinds: new Map(),
  userAgents: new Map(),
  serverErrors: [],         // 5xx im Detail
  secretHits: [],           // Secret-Pfad mit 200 — der kritische Fall
  softFourOhFour: new Map(),// 200 auf Pfaden, die nach Angriff aussehen
  methods: new Map(),
};

const openStream = (file) => {
  const raw = fs.createReadStream(file);
  return file.endsWith(".gz") ? raw.pipe(zlib.createGunzip()) : raw;
};

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`⚠️  Datei nicht gefunden, übersprungen: ${file}`);
    continue;
  }
  const rl = readline.createInterface({ input: openStream(file), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!line.trim()) continue;
    const m = LINE.exec(line);
    if (!m) { stats.unparsed++; continue; }

    const [, ip, ts, method, path, statusRaw, , , ua = "-"] = m;
    const status = parseInt(statusRaw, 10);
    stats.total++;

    inc(stats.byStatus, status);
    inc(stats.byDay, ts.slice(0, 11)); // 11/Aug/2026
    inc(stats.allIps, ip);
    inc(stats.methods, method);
    if (ua && ua !== "-") inc(stats.userAgents, ua);

    if (status >= 400) inc(stats.errorIps, ip);
    if (status >= 500) stats.serverErrors.push({ ip, ts, method, path, status });

    const kind = ATTACK_PATTERNS.find(([re]) => re.test(path))?.[1];
    if (kind) {
      inc(stats.attackIps, ip);
      inc(stats.attackPaths, path);
      inc(stats.attackKinds, kind);
      if (status === 200) inc(stats.softFourOhFour, path);
    }

    if (status === 200 && SECRET_PATTERNS.some((re) => re.test(path))) {
      stats.secretHits.push({ ip, ts, method, path, ua });
    }
  }
}

/* ── Ausgabe ───────────────────────────────────────────────────────────────── */

const h = (t) => console.log(`\n${t}\n${"─".repeat(t.length)}`);

console.log(`\n📊 Access-Log-Auswertung — ${files.length} Datei(en), ${stats.total.toLocaleString("de-DE")} Requests`);
if (stats.unparsed) console.log(`   (${stats.unparsed} Zeilen nicht im Combined Log Format, übersprungen)`);

h("Statuscodes");
for (const [status, n] of [...stats.byStatus.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  ${status}  ${String(n).padStart(8)}  ${pct(n, stats.total).padStart(6)} %`);
}

h("Requests pro Tag");
for (const [day, n] of [...stats.byDay.entries()]) {
  console.log(`  ${day}  ${String(n).padStart(8)}`);
}

h("HTTP-Methoden");
for (const [method, n] of topN(stats.methods, 10)) {
  const odd = !["GET", "HEAD", "POST", "OPTIONS"].includes(method) ? "  ← ungewöhnlich" : "";
  console.log(`  ${method.padEnd(10)} ${String(n).padStart(8)}${odd}`);
}

h(`Top ${TOP} IPs mit Fehlerantworten (4xx/5xx) — Kandidaten für eine Sperre`);
for (const [ip, n] of topN(stats.errorIps)) {
  const all = stats.allIps.get(ip) || 0;
  const atk = stats.attackIps.get(ip) || 0;
  console.log(`  ${ip.padEnd(40)} ${String(n).padStart(6)} Fehler / ${String(all).padStart(6)} Requests` +
              (atk ? `  · ${atk} Angriffssonden` : ""));
}

h(`Top ${TOP} Angriffs- und Recon-Pfade`);
for (const [path, n] of topN(stats.attackPaths)) {
  console.log(`  ${String(n).padStart(6)}  ${path}`);
}

h("Angriffsarten");
for (const [kind, n] of topN(stats.attackKinds, 20)) {
  console.log(`  ${kind.padEnd(24)} ${String(n).padStart(6)}`);
}

h(`Top ${TOP} User-Agents`);
for (const [ua, n] of topN(stats.userAgents)) {
  console.log(`  ${String(n).padStart(6)}  ${ua.length > 100 ? ua.slice(0, 97) + "…" : ua}`);
}

/* ── Die drei Befunde, auf die es ankommt ──────────────────────────────────── */

h("⑴ Serverfehler (5xx)");
if (stats.serverErrors.length === 0) {
  console.log("  ✅ keine");
} else {
  console.log(`  ⚠️  ${stats.serverErrors.length} Stück:`);
  for (const e of stats.serverErrors.slice(0, 40)) {
    console.log(`     ${e.status}  ${e.ts}  ${e.method} ${e.path}  (${e.ip})`);
  }
  if (stats.serverErrors.length > 40) console.log(`     … und ${stats.serverErrors.length - 40} weitere`);
}

h("⑵ Soft-404: Angriffspfade, die mit HTTP 200 beantwortet wurden");
if (stats.softFourOhFour.size === 0) {
  console.log("  ✅ keine — die .htaccess-Härtung greift");
} else {
  console.log(`  ⚠️  ${stats.softFourOhFour.size} Pfad(e). Bei Logs VOR dem 12.08.2026 ist das erwartbar`);
  console.log("     (alter Soft-404). Bei Logs danach ist es eine Lücke in public/.htaccess:");
  for (const [path, n] of topN(stats.softFourOhFour, 30)) {
    console.log(`     ${String(n).padStart(5)}  ${path}`);
  }
}

h("⑶ Secret-Pfad mit HTTP 200 — dieser Block MUSS leer sein");
if (stats.secretHits.length === 0) {
  console.log("  ✅ kein einziger Treffer. Es wurde nie ein Secret ausgeliefert.");
} else {
  console.log(`  🚨 ${stats.secretHits.length} TREFFER — als Sicherheitsvorfall behandeln:`);
  for (const hit of stats.secretHits.slice(0, 50)) {
    console.log(`     ${hit.ts}  ${hit.method} ${hit.path}`);
    console.log(`        von ${hit.ip}  ·  ${hit.ua.slice(0, 90)}`);
  }
  console.log("\n  Sofortmaßnahmen: betroffene Datei aus dem Web-Root entfernen, ALLE darin");
  console.log("  enthaltenen Zugangsdaten rotieren, IP sperren, Zeitraum forensisch prüfen.");
}

console.log("");
process.exit(stats.secretHits.length > 0 ? 1 : 0);
