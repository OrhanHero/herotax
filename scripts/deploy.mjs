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

let server = process.env.DIRECT_SERVER || "";
let username = process.env.DIRECT_USERNAME || "";
let password = process.env.DIRECT_PASSWORD || "";
let port = parseInt(process.env.DIRECT_PORT || "22", 10);
let remoteDir = (process.env.DIRECT_DIR || "/aiacteu").replace(/\/+$/, "") || "/aiacteu";

function safeDecode(str) {
  try { return decodeURIComponent(str); } catch { return str; }
}

if (!server && raw) {
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
      remoteDir = hostPath.substring(slash).replace(/\/+$/, "") || "/aiacteu";
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

if (!server || !password) {
  console.log("⚠️ Secret SFTP_URL nicht gefunden. Deployment wird übersprungen.");
  process.exit(0);
}

console.log(`Verbinde zu ${server}:${port} als Benutzer "${username}"...`);

const distDir = path.resolve(__dirname, "../dist");
const outDir = path.resolve(__dirname, "../out");
const localDir = fs.existsSync(distDir) ? distDir : outDir;

if (!fs.existsSync(localDir)) {
  console.error(`❌ FEHLER: Build-Ordner nicht gefunden (${localDir}). Bitte zuerst "npm run build" ausführen.`);
  process.exit(1);
}

async function run() {
  // Versuch 1: SFTP (SSH Port 22)
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
    console.log("✅ SFTP-Verbindung erfolgreich! Übertrage Dateien...");
    try { await sftp.mkdir(remoteDir, true); } catch {}
    await sftp.uploadDir(localDir, remoteDir);
    await sftp.end();
    console.log("🎉 SFTP-Upload erfolgreich abgeschlossen!");
    return;
  } catch (sftpErr) {
    console.log(`SFTP-Hinweis: ${sftpErr.message}. Wechsle zu FTPS (Port 21)...`);
  }

  // Versuch 2: FTPS (TLS Port 21 Fallback)
  const ftpClient = new ftp.Client(30000);
  try {
    await ftpClient.access({ host: server, port: 21, user: username, password: password, secure: true, secureOptions: { rejectUnauthorized: false } });
  } catch {
    await ftpClient.access({ host: server, port: 21, user: username, password: password, secure: false });
  }
  console.log("✅ FTPS-Verbindung erfolgreich! Übertrage Dateien...");
  await ftpClient.ensureDir(remoteDir);
  await ftpClient.clearWorkingDir();
  await ftpClient.uploadFromDir(localDir);
  ftpClient.close();
  console.log("🎉 FTPS-Upload erfolgreich abgeschlossen!");
}

run().catch((err) => {
  console.error("❌ FEHLER BEIM DEPLOYMENT:", err.message);
  process.exit(1);
});
