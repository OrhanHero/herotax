# 🚀 Deployment auf IONOS herotax.de

## Aktueller Workflow (GitHub Actions CI/CD Auto-Deployment)

So wird aktuell automatisch deployt:

1. **Code auf GitHub pushen** (Branch `GoogleAntigravityIDE`, `main` oder `master`):
   ```bash
   git add .
   git commit -m "deine Änderungen"
   git push origin GoogleAntigravityIDE
   ```
2. **GitHub Actions Workflow (.github/workflows/deploy.yml)**:
   - Führt automatisch `npm run build` aus.
   - Baut das Vite/React-Bundle in den `dist/`-Ordner.
   - Lädt den Inhalt per `scripts/deploy.mjs` direkt auf den IONOS-Webspace hoch (verwendet das GitHub Secret `SFTP_URL` mit automatischer SFTP/FTPS Dual-Engine).
3. **Ergebnis live verifizieren** auf [herotax.de](https://herotax.de).

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
