# 🚀 Deployment auf IONOS herotax.de

## Aktueller Workflow (GitHub Actions CI/CD Auto-Deployment)

Wir arbeiten ausschließlich auf dem Branch **`GoogleAntigravityIDE`**.

So wird aktuell automatisch deployt:

1. **Code auf den Branch `GoogleAntigravityIDE` pushen**:
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
4. **Sicherheits-Smoketest** (`.github/workflows/security-check.yml`) läuft
   automatisch nach jedem Deployment und alle 6 Stunden.

### Was das Deploy-Skript zusätzlich tut

- **Preflight:** Der Upload bricht ab, wenn im Build Dateien liegen, die nicht
  ins Web-Root gehören (`.env`, `.git/`, Schlüssel, Sourcemaps, Backups).
- **Prune:** Nach dem Upload werden Dateien vom Webspace gelöscht, die im
  aktuellen Build nicht mehr vorkommen — so verschwinden Reste älterer
  Deployments (etwa der alte Create-React-App-Build unter `/static/`).
  `api/cache/` bleibt dabei unangetastet. Abschaltbar mit `DEPLOY_PRUNE=0`,
  Sicherheitslimit über `DEPLOY_PRUNE_LIMIT` (Standard 200).

Hintergrund und vollständige Maßnahmenliste: [docs/SICHERHEIT.md](./docs/SICHERHEIT.md)

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
- Nutzer: siehe IONOS-Konto — **niemals hier eintragen**, dieses Repository ist öffentlich
- Zielordner: `/herotax` — steht im IONOS-Konto unter Domains & SSL → herotax.de → **Ziel**

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
- Die Serverkonfiguration liegt **ausschließlich** in `public/.htaccess` und
  wird von Vite nach `dist/.htaccess` kopiert. Es gibt bewusst keine zweite
  `.htaccess` im Repository-Root mehr — die beiden Dateien waren
  auseinandergelaufen, und ausgeliefert wurde immer nur die aus `public/`.
- Stelle sicher, dass `.htaccess` im Root-Ordner des Webspace liegt
- Prüfe IONOS-Einstellungen: `.htaccess` darf nicht deaktiviert sein

### 4. Test
```
https://herotax.de                ← sollte die App laden
https://herotax.de/news           ← sollte auch die App laden (SPA-Routing)
https://herotax.de/tools          ← sollte auch die App laden
https://herotax.de/datenschutz    ← Datenschutzerklärung (eigene "Seite", kein Scroll-Anchor)
https://herotax.de/gibtsnicht     ← muss einen echten HTTP 404 liefern
https://herotax.de/eudi-wallet    ← muss 301 auf /eu-kompass liefern
https://herotax.de/.env           ← muss 403 liefern
```

Automatisiert geht das mit:
```bash
npm run security:check
```

### ⚠️ Neue Seite anlegen — drei Dateien

Seit der 404-Härtung liefert der Server für unbekannte Pfade einen echten
HTTP 404. Eine neue Route muss deshalb an **zwei** Stellen eingetragen werden:

1. `src/App.jsx` — `case "/neue-route":`
2. `public/.htaccess` — in die `RewriteRule ^(ki|news|…)/?$ index.html`

Die `sitemap.xml` erzeugt der Build automatisch aus dem Router
(`scripts/sitemap.mjs`) — dort ist nichts zu tun. Wird eine Route umbenannt,
gehört sie zusätzlich in `ROUTE_REDIRECTS` (App.jsx) **und** in eine
301-Regel der `.htaccess`.

`npm run check:routes` prüft beides und läuft in der CI vor dem Build. Wird
eine Route vergessen, ist die Seite live nicht erreichbar.

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
- **Beispiel IONOS:** `sftp://BENUTZER:PASSWORT@access-XXXXXXXXXX.webspace-host.com/herotax/`
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
