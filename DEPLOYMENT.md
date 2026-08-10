# 🚀 Deployment auf IONOS herotax.de

## Aktueller Workflow (WinSCP-Auto-Sync)

So wird aktuell tatsächlich deployt:

1. **Build erstellen**
   ```bash
   npm run build
   ```
2. **Build-Output in den lokalen Sync-Ordner spiegeln** — `C:\Users\Hero\Documents\HeroTax`.
   WinSCP läuft dort dauerhaft im Hintergrund und synct diesen Ordner automatisch mit dem
   IONOS-Webspace, sobald sich Dateien ändern.
   ```powershell
   robocopy "dist\assets" "C:\Users\Hero\Documents\HeroTax\assets" /MIR
   Copy-Item "dist\index.html"   "C:\Users\Hero\Documents\HeroTax\index.html"   -Force
   Copy-Item "dist\favicon.svg"  "C:\Users\Hero\Documents\HeroTax\favicon.svg"  -Force
   Copy-Item "dist\icons.svg"    "C:\Users\Hero\Documents\HeroTax\icons.svg"    -Force
   Copy-Item "dist\api\feed.php" "C:\Users\Hero\Documents\HeroTax\api\feed.php" -Force
   Copy-Item ".htaccess"         "C:\Users\Hero\Documents\HeroTax\.htaccess"    -Force
   ```
   `/MIR` auf `assets/` ist wichtig — Vite vergibt bei jedem Build neue Content-Hashes,
   ohne Mirror-Sync sammeln sich veraltete `index-*.js`/`index-*.css`-Leichen im Zielordner.
   Der serverseitige `api/cache/`-Ordner (vom Feed-Proxy selbst angelegt) bleibt davon
   unberührt, da er nicht Teil von `dist/` ist.
3. **Warten, bis WinSCP den Diff hochlädt**, dann live auf [herotax.de](https://herotax.de)
   verifizieren.

Die Abschnitte unten (manuelles SFTP, GitHub Actions) sind Referenz/Fallback, falls der
WinSCP-Sync mal nicht läuft — nicht der Standardweg.

⚠️ **`.github/workflows/static.yml`** ist ein Überbleibsel aus einem früheren Setup: Es
triggert nur auf einen alten `claude/...`-Branch (nicht `master`) und lädt den rohen
Quellcode statt eines gebauten `dist/`-Bundles zu GitHub Pages hoch — für dieses Vite/JSX-
Projekt ohne Build-Schritt nicht funktionsfähig. Er ist nicht Teil des echten Deploy-Wegs.

## Vorbereitung (manueller Fallback)

### 1. Build erstellen
```bash
npm install
npm run build
```
Das erstellt den `/dist` Ordner mit allen produktiven Dateien.

### 2. Dateien auf IONOS hochladen

**SFTP/FTP-Zugang:**
- Host: `herotax.de` (oder `ftp.herotax.de`)
- Nutzer: [Deine IONOS-FTP-Credentials]
- Zielordner: `/www/htdocs/herotax.de` oder einfach `public_html/`

**Zu uploadende Dateien:**
```
dist/
  ├── index.html
  ├── assets/
  │   ├── index-*.js      (Vite versioned)
  │   ├── index-*.css     (Vite versioned)
  │   └── fonts/          (alle @fontsource)
  └── ...

.htaccess              ← WICHTIG! Für SPA-Routing
```

## Nach dem Upload

### 3. .htaccess aktivieren
- Stelle sicher, dass `.htaccess` im Root-Ordner liegt
- Prüfe IONOS-Einstellungen: `.htaccess` darf nicht deaktiviert sein

### 4. Test
```
https://herotax.de                ← sollte die App laden
https://herotax.de/news           ← sollte auch die App laden (SPA-Routing)
https://herotax.de/tools          ← sollte auch die App laden
https://herotax.de/datenschutz    ← Datenschutzerklärung (eigene "Seite", kein Scroll-Anchor)
```

### 5. Browser-Caching prüfen
Öffne DevTools → Network → schau auf Cache-Control Headers
```
index.html         → "no-cache, no-store" (immer aktuell)
index-*.js/css     → "max-age=31536000" (1 Jahr, versioned)
```

## Automatisierung (Optional)

### CI/CD mit GitHub Actions (IONOS Dual-Engine Deployment)

#### 1. In GitHub Repository Secrets anlegen
Vergib unter **Settings ➔ Secrets and variables ➔ Actions** das Secret:
- **Name:** `SFTP_URL`
- **Wert-Format:** `sftp://BENUTZERNAME:PASSWORT@HOST/ZIEL_ORDNER/`
- **Beispiel IONOS:** `sftp://su486213:MeinPasswort%23@access-5019090422.webspace-host.com/aiacteu/`
*(Sonderzeichen im Passwort wie `#` als `%23` kodieren, IONOS `;fingerprint=...` Filter läuft automatisch)*

#### 2. Funktionsweise
- **Dual-Engine:** Versucht automatisch zuerst **SFTP (SSH Port 22)** und wechsle bei verschlossenen Ports nahtlos auf **FTPS (TLS Port 21)**.
- **Auto Build-Erkennung:** Erkennt automatisch Vite (`dist/`) oder Next.js (`out/`) Build-Ordner.
- **Skript:** `scripts/deploy.mjs`
- **Workflow:** `.github/workflows/deploy.yml`

## News/Artikel aktualisieren

### Statische Daten
Bearbeite `/src/data/articles.js` und deploye neu:
```bash
npm run build
# Upload dist/ wieder zu IONOS
```

### Dynamische Daten & Live Tracker (automatischer 4-Std-Feed-Import)
Der NewsTicker, News-Hub ("Bund & Steuer") und das KI-Sicherheit-Panel
(BMDS/BSI) laden ihre Meldungen automatisch über den serverseitigen
Feed-Proxy `public/api/feed.php`. Der Proxy holt die offiziellen
RSS-Feeds von BMF, BMDS und BSI, cached sie 4 Stunden (14.400 Sekunden)
und liefert sie als JSON aus. Ein Live Tracker Badge zeigt den genauen
Stand an (z. B. `Live · Stand: 10.08.2026, 22:58 Uhr (alle 4 Std.)`).

**Voraussetzung:** IONOS-Webspace mit PHP (Standard bei IONOS
Webhosting-Paketen). `feed.php` liegt in `dist/api/feed.php` und wird
beim Upload automatisch mit hochgeladen.

**Cache-Ordner:** Der Proxy legt `api/cache/*.json` selbst an — dieser
Ordner muss vom Webserver beschreibbar sein (Standard bei IONOS).
Ist er es nicht, funktioniert der Proxy trotzdem, nur ohne Server-Cache.

Fällt der Live-Abruf aus (Feed down, PHP nicht verfügbar, o.ä.), fällt
die Seite automatisch auf die kuratierten Daten in `/src/data/articles.js`
zurück — es gibt also nie einen Totalausfall der Inhalte.

Neue Quellen hinzufügen: `SOURCES`-Array in `public/api/feed.php`
erweitern (nur echte, geprüfte RSS-Feed-URLs eintragen) und in
`src/services/articleService.js` unter `FEED_SOURCE` verdrahten.

## Troubleshooting

### Problem: 404 bei Subrouten
**Lösung:** `.htaccess` prüfen:
- Liegt es im `/dist` Ordner (nach Upload)?
- Sind RewriteEngine aktiviert?

### Problem: Assets laden nicht
**Lösung:** 
- DevTools → Network: Prüfe die asset URLs
- Sollten so aussehen: `/assets/index-abc123.js`
- Nicht: `dist/assets/...` oder ähnliches

### Problem: Cache wird nicht geleert
**Lösung:** Hard-Refresh im Browser
```
Windows: Strg + Shift + Entf
Mac: Cmd + Shift + R
```

## Monitoring

### Plausible Analytics
Script in `index.html` eintragen (bereits vorbereitet in Config):
```html
<script defer data-domain="herotax.de" src="https://plausible.io/js/script.js"></script>
```

### Fehler-Tracking (Optional)
Später: Sentry, LogRocket, o.ä. integrieren.

---

**Made in Berlin 🛡️**
