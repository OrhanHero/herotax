/**
 * HERO Tax · Routen-Konsistenzprüfung
 * ---------------------------------------------------------------------------
 * Seit Maßnahme M6 (Analyse 12.08.2026) liefert der Server für unbekannte
 * Pfade einen echten HTTP 404 statt stillschweigend die index.html. Damit ist
 * public/.htaccess die zweite Stelle, an der die Routenliste steht:
 *
 *   1. src/App.jsx      — switch (pathname) { case "/news": … }
 *                         plus ROUTE_REDIRECTS für umbenannte Adressen
 *   2. public/.htaccess — RewriteRule ^(ki|news|…)/?$ index.html
 *                         plus RewriteRule ^alt/?$ /neu [R=301,L]
 *
 * (Die sitemap.xml wird beim Build aus src/App.jsx erzeugt — siehe
 *  scripts/sitemap.mjs — und kann deshalb nicht auseinanderlaufen.)
 *
 * Laufen App.jsx und .htaccess auseinander, ist eine neue Seite live nicht
 * erreichbar (echter 404), obwohl sie im Code existiert. Dann bricht dieses
 * Skript ab.
 *
 * Aufruf: npm run check:routes
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectRoutes } from "./sitemap.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/* ── 1. Routen aus src/App.jsx ─────────────────────────────────────────────── */
// collectRoutes() liest denselben Router wie der Sitemap-Generator: kanonische
// Routen ohne die per ROUTE_REDIRECTS umbenannten Altadressen.
const { routes, redirects } = collectRoutes();
const appRoutes = new Set(routes.map((r) => r.route.toLowerCase()));
const appRedirects = new Set(redirects.map((r) => r.toLowerCase()));

/* ── 2. Routen aus public/.htaccess ────────────────────────────────────────── */
const htaccess = fs.readFileSync(path.join(root, "public/.htaccess"), "utf8");

const spaRule = htaccess.match(/RewriteRule\s+\^\(([^)]+)\)\/\?\$\s+index\.html/i);
if (!spaRule) {
  console.error('❌ In public/.htaccess fehlt die SPA-Routen-Regel (RewriteRule ^(…)/?$ index.html).');
  process.exit(1);
}
const htaccessRoutes = new Set(spaRule[1].split("|").map((r) => `/${r.toLowerCase()}`));
htaccessRoutes.add("/"); // die Startseite läuft über DirectoryIndex, nicht über die Regel

const htaccessRedirects = new Map(
  [...htaccess.matchAll(/RewriteRule\s+\^([a-z0-9\-/]+)\/\?\$\s+(\/[a-z0-9\-/]*)\s+\[R=301/gi)]
    .map((m) => [`/${m[1].toLowerCase()}`, m[2].toLowerCase()])
);

/* ── Vergleich ─────────────────────────────────────────────────────────────── */
const diff = (a, b) => [...a].filter((x) => !b.has(x)).sort();
const problems = [];

const missingInHtaccess = diff(appRoutes, htaccessRoutes);
if (missingInHtaccess.length) {
  problems.push(
    `Route(n) in src/App.jsx, aber nicht in public/.htaccess: ${missingInHtaccess.join(", ")}\n` +
    "     → diese Seiten würden live einen echten 404 liefern."
  );
}

const missingInApp = diff(htaccessRoutes, appRoutes);
if (missingInApp.length) {
  problems.push(
    `Route(n) in public/.htaccess, aber nicht in src/App.jsx: ${missingInApp.join(", ")}\n` +
    "     → der Server liefert index.html, die SPA zeigt die 404-Seite."
  );
}

// Umbenannte Adressen: die 301-Regel muss es geben und aufs richtige Ziel zeigen
for (const old of appRedirects) {
  if (!htaccessRedirects.has(old)) {
    problems.push(
      `ROUTE_REDIRECTS in src/App.jsx kennt "${old}", public/.htaccess hat dafür keine 301-Regel.\n` +
      `     → die alte Adresse liefert live einen 404 statt einer Weiterleitung.`
    );
  }
}
for (const [old, target] of htaccessRedirects) {
  if (!appRedirects.has(old)) {
    problems.push(`public/.htaccess leitet "${old}" um, src/App.jsx kennt die Altadresse nicht.`);
  }
  if (!appRoutes.has(target)) {
    problems.push(`public/.htaccess leitet "${old}" auf "${target}" — diese Route gibt es in src/App.jsx nicht.`);
  }
  if (htaccessRoutes.has(old)) {
    problems.push(`"${old}" steht sowohl in der 301-Regel als auch in der SPA-Routenliste — die Weiterleitung greift nicht zuverlässig.`);
  }
}

if (problems.length) {
  console.error("❌ Routen laufen auseinander:\n");
  for (const p of problems) console.error(`   • ${p}\n`);
  process.exit(1);
}

console.log(`✅ Routen konsistent (${appRoutes.size}): ${[...appRoutes].sort().join(", ")}`);
if (htaccessRedirects.size) {
  const list = [...htaccessRedirects].map(([o, t]) => `${o} → ${t}`).join(", ");
  console.log(`   301-Weiterleitungen (${htaccessRedirects.size}): ${list}`);
}
