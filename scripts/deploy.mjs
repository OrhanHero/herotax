/**
 * HERO Tax · IONOS Deployment (Dual-Engine SFTP → FTPS)
 * ---------------------------------------------------------------------------
 * Lädt den Vite-Build (dist/) auf den IONOS-Webspace.
 *
 * Sicherheitsmaßnahmen aus der Analyse vom 12.08.2026:
 *   M13 — Preflight: der Upload bricht ab, wenn im Build Dateien liegen, die
 *         niemals ins Web-Root gehören (.env, .git, Keys, Sourcemaps …).
 *   M8  — Prune: nach dem Upload werden Dateien auf dem Webspace gelöscht,
 *         die im aktuellen Build nicht mehr vorkommen. Genau so verschwindet
 *         der veraltete zweite Frontend-Build (/static/js/main.*.js aus einer
 *         früheren Create-React-App-Generation), der bisher parallel zum
 *         aktuellen Vite-Bundle (/assets/index-*.js) erreichbar blieb.
 *         Abschaltbar über DEPLOY_PRUNE=0.
 */
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import SFTPClient from "ssh2-sftp-client";
import ftp from "basic-ftp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let raw = (process.env.SFTP_URL || process.env.IONOS_URL || "").trim();

if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
  raw = raw.slice(1, -1).trim();
}

let server = (process.env.SFTP_HOST || process.env.DIRECT_SERVER || "").trim();
let username = (process.env.SFTP_USER || process.env.DIRECT_USERNAME || "").trim();
let password = (process.env.SFTP_PASS || process.env.DIRECT_PASSWORD || "").trim();
let port = parseInt(process.env.DIRECT_PORT || "22", 10);

let rawPath = (process.env.SFTP_PATH || process.env.DIRECT_DIR || "/herotax").trim();
let remoteDir = rawPath ? (rawPath.startsWith("/") ? rawPath : "/" + rawPath).replace(/\/+$/, "") || "/herotax" : "/herotax";

function safeDecode(str) {
  try { return decodeURIComponent(str); } catch { return str; }
}

// SFTP_URL als Fallback parsen, falls Einzel-Secrets (SFTP_HOST, SFTP_USER, SFTP_PASS) fehlen
if ((!server || !password) && raw && raw !== "sftp://:@//" && !raw.startsWith("sftp://:@")) {
  let clean = raw.replace(/^(sftp|ftps|ftp):\/\//i, "");
  const lastAt = clean.lastIndexOf("@");
  if (lastAt !== -1) {
    const userPass = clean.substring(0, lastAt);
    const hostPath = clean.substring(lastAt + 1);
    const colon = userPass.indexOf(":");
    if (colon !== -1) {
      username = safeDecode(userPass.substring(0, colon));
      let passRaw = userPass.substring(colon + 1);
      if (passRaw.includes(";")) { passRaw = passRaw.split(";")[0]; }
      password = safeDecode(passRaw);
    } else {
      username = safeDecode(userPass);
    }
    const slash = hostPath.indexOf("/");
    let hostPort = hostPath;
    if (slash !== -1) {
      hostPort = hostPath.substring(0, slash);
      remoteDir = hostPath.substring(slash).replace(/\/+$/, "") || "/herotax";
    }
    const hpColon = hostPort.indexOf(":");
    if (hpColon !== -1) {
      server = hostPort.substring(0, hpColon);
      port = parseInt(hostPort.substring(hpColon + 1), 10);
    } else {
      server = hostPort;
      port = 22;
    }
  } else {
    server = clean;
  }
}

/** Mit DEPLOY_CHECK=1 oder `--check` wird nur die Verbindung geprüft:
 *  Anmeldung, Zielverzeichnis, Inhalt. Kein Build nötig, kein Upload,
 *  kein Löschen. Siehe reportTarget() weiter unten. */
const CHECK_ONLY = process.env.DEPLOY_CHECK === "1" || process.argv.includes("--check");

if (!server || !password) {
  console.error("❌ FEHLER: Keine SFTP-Zugangsdaten in GitHub Secrets gefunden!");
  console.error("   Bitte unter Repository Settings → Secrets and variables → Actions prüfen, dass folgende Secrets vorhanden sind:");
  console.error("   • SFTP_USER (oder SFTP_URL)");
  console.error("   • SFTP_PASS");
  console.error("   • SFTP_HOST");
  console.error("   • SFTP_PATH");
  process.exit(1);
}

const distDir = path.resolve(__dirname, "../dist");
const outDir = path.resolve(__dirname, "../out");
const localDir = fs.existsSync(distDir) ? distDir : outDir;

if (!CHECK_ONLY && !fs.existsSync(localDir)) {
  console.error(`❌ FEHLER: Build-Ordner nicht gefunden (${localDir}). Bitte zuerst "npm run build" ausführen.`);
  process.exit(1);
}

/* ── M13 · Preflight: was niemals ins Web-Root darf ───────────────────────── */

/** Dateien/Ordner, deren Auslieferung ein Sicherheitsvorfall wäre. */
const FORBIDDEN = [
  { test: (rel) => rel.split("/").some((seg) => seg === ".git" || seg === ".svn" || seg === ".hg"),
    why: "Versionskontroll-Verzeichnis (Quellcode-Rekonstruktion möglich)" },
  { test: (rel) => /(^|\/)\.env(\..+)?$/i.test(rel), why: "Umgebungsdatei mit Secrets" },
  { test: (rel) => /\.(pem|key|p12|pfx|ppk|crt|keystore)$/i.test(rel), why: "Schlüssel-/Zertifikatsdatei" },
  { test: (rel) => /(^|\/)(id_rsa|id_ed25519|\.htpasswd|\.npmrc|\.netrc)$/i.test(rel), why: "Zugangsdaten-Datei" },
  { test: (rel) => /(^|\/)(secrets|credentials|sftp-config|ftp-config)\.(json|ya?ml)$/i.test(rel), why: "Konfigurationsdatei mit Zugangsdaten" },
  { test: (rel) => /\.map$/i.test(rel), why: "Sourcemap (gibt den unminifizierten Quellcode preis)" },
  { test: (rel) => /\.(sql|sqlite3?|db|bak|old|orig|swp)$/i.test(rel), why: "Datenbank-/Backup-Artefakt" },
];

/** Alle Dateien unterhalb von dir als repo-relative Pfade mit "/" als Trenner. */
function walkLocal(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.relative(base, abs).split(path.sep).join("/");
    if (entry.isDirectory()) out.push(...walkLocal(abs, base));
    else out.push(rel);
  }
  return out;
}

const localFiles = CHECK_ONLY && !fs.existsSync(localDir) ? [] : walkLocal(localDir);
const violations = [];
for (const rel of localFiles) {
  for (const rule of FORBIDDEN) {
    if (rule.test(rel)) violations.push(`${rel} — ${rule.why}`);
  }
}

if (violations.length > 0) {
  console.error("❌ DEPLOYMENT ABGEBROCHEN — der Build enthält Dateien, die nicht ins Web-Root gehören:");
  for (const v of violations) console.error(`   • ${v}`);
  console.error("   Bitte den Build bereinigen (siehe docs/SICHERHEIT.md, Maßnahme M13).");
  process.exit(1);
}
if (!CHECK_ONLY) {
  console.log(`🔎 Preflight ok — ${localFiles.length} Dateien, keine Secrets im Build.`);
}

/* ── M8 · Prune: verwaiste Dateien auf dem Webspace entfernen ─────────────── */

const PRUNE_ENABLED = process.env.DEPLOY_PRUNE !== "0";
/** Pfade, die der Server selbst anlegt und die der Deploy nicht anfassen darf. */
const PROTECTED_PREFIXES = ["api/cache"];
/** Sicherheitsnetz: unerwartet viele Löschungen deuten auf ein falsches
 *  Zielverzeichnis hin — dann lieber abbrechen als den Webspace leeren. */
const PRUNE_LIMIT = parseInt(process.env.DEPLOY_PRUNE_LIMIT || "200", 10);

const keep = new Set(localFiles);
const isProtected = (rel) => PROTECTED_PREFIXES.some((p) => rel === p || rel.startsWith(`${p}/`));

function reportPrune(stale) {
  if (stale.length === 0) {
    console.log("🧹 Prune: keine verwaisten Dateien auf dem Webspace.");
    return false;
  }
  console.log(`🧹 Prune: ${stale.length} verwaiste Datei(en) auf dem Webspace:`);
  for (const rel of stale.slice(0, 40)) console.log(`   • ${rel}`);
  if (stale.length > 40) console.log(`   … und ${stale.length - 40} weitere`);
  if (stale.length > PRUNE_LIMIT) {
    console.warn(`⚠️ Prune übersprungen: mehr als ${PRUNE_LIMIT} Löschungen. Zielverzeichnis prüfen (${remoteDir}) oder DEPLOY_PRUNE_LIMIT erhöhen.`);
    return false;
  }
  return true;
}

/* ── Prüfmodus: verbinden und berichten, ohne etwas zu verändern ───────────── */

/*  Gedacht für den Fall, dass die SFTP-Zugangsdaten gewechselt wurden. Ein
 *  neuer Benutzer kann bei IONOS in einem anderen Startverzeichnis landen —
 *  dann würde ein normaler Deploy stillschweigend am falschen Ort landen und
 *  der Prune-Schritt dort aufräumen. Der Prüfmodus deckt das vorher auf. */

/** Plausibilitätsprüfung: Sieht das Zielverzeichnis nach dieser Website aus? */
function reportTarget(entries) {
  const names = entries.map((e) => e.name);
  console.log(`\n📁 Zielverzeichnis ${remoteDir} — ${names.length} Einträge:`);
  for (const n of names.slice(0, 25)) console.log(`   • ${n}`);
  if (names.length > 25) console.log(`   … und ${names.length - 25} weitere`);

  const marker = ["index.html", ".htaccess", "assets"];
  const gefunden = marker.filter((m) => names.includes(m));

  if (names.length === 0) {
    console.warn("\n⚠️ Das Verzeichnis ist LEER. Entweder ist es das falsche Ziel,");
    console.warn("   oder es wurde noch nie deployt. Vor dem nächsten Deploy klären —");
    console.warn("   sonst landet die Seite am falschen Ort.");
    return false;
  }
  if (gefunden.length === 0) {
    console.warn("\n⚠️ Kein einziger erwarteter Eintrag gefunden (index.html, .htaccess, assets).");
    console.warn("   Das sieht NICHT nach dem Web-Root von herotax.de aus.");
    console.warn("   Bitte den Pfad im Secret SFTP_URL prüfen, bevor deployt wird —");
    console.warn("   der Prune-Schritt würde hier fremde Dateien löschen.");
    return false;
  }
  console.log(`\n✅ Zielverzeichnis plausibel — gefunden: ${gefunden.join(", ")}`);
  return true;
}

/** Kennungen niemals vollständig ins Log schreiben: GitHub-Actions-Logs sind
 *  bei einem öffentlichen Repository für jeden lesbar. Benutzername und Host
 *  sind zwar kein Passwort, aber Aufklärungsmaterial — genau deshalb wurden
 *  die Zugangsdaten am 12.08.2026 gewechselt. Für die Fehlersuche genügt ein
 *  Anfang, um zwei Konten auseinanderzuhalten. */
const maskiert = (wert, sichtbar = 2) =>
  !wert ? "(leer)"
  : wert.length <= sichtbar ? "*".repeat(wert.length)
  : wert.slice(0, sichtbar) + "*".repeat(Math.min(wert.length - sichtbar, 8));

console.log(`Verbinde zu ${maskiert(server, 7)} (Port ${port}) als Benutzer ${maskiert(username)}...`);
if (CHECK_ONLY) console.log("🔍 Prüfmodus: es wird nichts hochgeladen und nichts gelöscht.\n");

async function run() {
  // ── Versuch 1: SFTP (SSH Port 22) ──
  try {
    const sftp = new SFTPClient();
    await sftp.connect({
      host: server,
      port: port,
      username: username,
      password: password,
      readyTimeout: 25000,
      retries: 1,
      algorithms: { serverHostKey: ["ssh-rsa", "ecdsa-sha2-nistp256", "ecdsa-sha2-nistp384", "ecdsa-sha2-nistp521", "ssh-ed25519"] }
    });

    if (CHECK_ONLY) {
      console.log("✅ SFTP-Anmeldung erfolgreich.");
      let entries = [];
      try {
        entries = await sftp.list(remoteDir);
      } catch (err) {
        console.error(`\n❌ Zielverzeichnis ${remoteDir} nicht lesbar: ${err.message}`);
        console.error("   Der Benutzer hat dort keinen Zugriff, oder der Pfad im Secret ist falsch.");
        await sftp.end();
        process.exit(1);
      }
      const ok = reportTarget(entries);
      await sftp.end();
      console.log(ok ? "\n🎉 Verbindung geprüft — Deployment kann laufen.\n"
                     : "\n❌ Verbindung steht, aber das Ziel stimmt nicht. Bitte SFTP_URL korrigieren.\n");
      process.exit(ok ? 0 : 1);
    }

    console.log("✅ SFTP-Verbindung erfolgreich! Übertrage Dateien...");
    try { await sftp.mkdir(remoteDir, true); } catch { /* existiert bereits */ }
    await sftp.uploadDir(localDir, remoteDir);
    console.log("📤 Upload abgeschlossen.");

    if (PRUNE_ENABLED) {
      const stale = [];
      const walkRemote = async (rel = "") => {
        const abs = rel ? `${remoteDir}/${rel}` : remoteDir;
        let entries = [];
        try { entries = await sftp.list(abs); } catch { return; }
        for (const entry of entries) {
          const childRel = rel ? `${rel}/${entry.name}` : entry.name;
          if (isProtected(childRel)) continue;
          if (entry.type === "d") await walkRemote(childRel);
          else if (!keep.has(childRel)) stale.push(childRel);
        }
      };
      await walkRemote();
      if (reportPrune(stale)) {
        for (const rel of stale) {
          try {
            await sftp.delete(`${remoteDir}/${rel}`);
            console.log(`   ✔ gelöscht: ${rel}`);
          } catch (err) {
            console.warn(`   ✖ konnte ${rel} nicht löschen: ${err.message}`);
          }
        }
      }
    }

    await sftp.end();
    console.log("🎉 SFTP-Deployment erfolgreich abgeschlossen!");
    return;
  } catch (sftpErr) {
    console.log(`SFTP-Hinweis: ${sftpErr.message}. Wechsle zu FTPS (Port 21)...`);
  }

  // ── Versuch 2: FTPS (TLS Port 21 Fallback) ──
  const ftpClient = new ftp.Client(30000);
  try {
    await ftpClient.access({ host: server, port: 21, user: username, password: password, secure: true, secureOptions: { rejectUnauthorized: false } });
  } catch {
    await ftpClient.access({ host: server, port: 21, user: username, password: password, secure: false });
  }
  if (CHECK_ONLY) {
    console.log("✅ FTPS-Anmeldung erfolgreich.");
    let entries = [];
    try {
      entries = await ftpClient.list(remoteDir);
    } catch (err) {
      console.error(`\n❌ Zielverzeichnis ${remoteDir} nicht lesbar: ${err.message}`);
      ftpClient.close();
      process.exit(1);
    }
    const ok = reportTarget(entries);
    ftpClient.close();
    console.log(ok ? "\n🎉 Verbindung geprüft — Deployment kann laufen.\n"
                   : "\n❌ Verbindung steht, aber das Ziel stimmt nicht. Bitte SFTP_URL korrigieren.\n");
    process.exit(ok ? 0 : 1);
  }

  console.log("✅ FTPS-Verbindung erfolgreich! Übertrage Dateien...");
  await ftpClient.ensureDir(remoteDir);
  // Kein clearWorkingDir() mehr: das löschte bei jedem Deploy auch den
  // Feed-Cache (api/cache) mit. Aufräumen übernimmt jetzt der Prune-Schritt.
  await ftpClient.uploadFromDir(localDir);
  console.log("📤 Upload abgeschlossen.");

  if (PRUNE_ENABLED) {
    const stale = [];
    const walkRemote = async (rel = "") => {
      const abs = rel ? `${remoteDir}/${rel}` : remoteDir;
      let entries = [];
      try { entries = await ftpClient.list(abs); } catch { return; }
      for (const entry of entries) {
        if (entry.name === "." || entry.name === "..") continue;
        const childRel = rel ? `${rel}/${entry.name}` : entry.name;
        if (isProtected(childRel)) continue;
        if (entry.isDirectory) await walkRemote(childRel);
        else if (!keep.has(childRel)) stale.push(childRel);
      }
    };
    await walkRemote();
    if (reportPrune(stale)) {
      for (const rel of stale) {
        try {
          await ftpClient.remove(`${remoteDir}/${rel}`);
          console.log(`   ✔ gelöscht: ${rel}`);
        } catch (err) {
          console.warn(`   ✖ konnte ${rel} nicht löschen: ${err.message}`);
        }
      }
    }
  }

  ftpClient.close();
  console.log("🎉 FTPS-Deployment erfolgreich abgeschlossen!");
}

run().catch((err) => {
  console.error("❌ FEHLER BEIM DEPLOYMENT:", err.message);
  process.exit(1);
});
