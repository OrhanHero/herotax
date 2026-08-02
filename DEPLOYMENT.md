# 🚀 Deployment auf IONOS herotax.de

## Vorbereitung

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
https://herotax.de           ← sollte die App laden
https://herotax.de/news      ← sollte auch die App laden (SPA-Routing)
https://herotax.de/tools     ← sollte auch die App laden
```

### 5. Browser-Caching prüfen
Öffne DevTools → Network → schau auf Cache-Control Headers
```
index.html         → "no-cache, no-store" (immer aktuell)
index-*.js/css     → "max-age=31536000" (1 Jahr, versioned)
```

## Automatisierung (Optional)

### CI/CD mit GitHub Actions
Erstelle `.github/workflows/deploy.yml`:
```yaml
name: Deploy to IONOS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - name: Upload to IONOS
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.IONOS_HOST }}
          username: ${{ secrets.IONOS_USER }}
          key: ${{ secrets.IONOS_SSH_KEY }}
          source: "dist/*"
          target: "/www/htdocs/herotax.de/"
```

**GitHub Secrets eintragen:**
- `IONOS_HOST`: herotax.de
- `IONOS_USER`: Dein FTP-User
- `IONOS_SSH_KEY`: SSH Private Key (falls SFTP via SSH)

## News/Artikel aktualisieren

### Statische Daten
Bearbeite `/src/data/articles.js` und deploye neu:
```bash
npm run build
# Upload dist/ wieder zu IONOS
```

### Dynamische Daten (API-Integration)
Später: Kommentar in `/src/services/articleService.js` aktivieren:
```javascript
export const fetchArticlesFromAPI = async (type = "ai") => {
  const apiUrl = type === "ai" ? process.env.VITE_API_AI_ARTICLES : process.env.VITE_API_BMDS_ITEMS;
  if (!apiUrl) return null;
  const response = await fetch(apiUrl);
  return response.json();
};
```

Umgebungsvariablen in `.env`:
```
VITE_API_AI_ARTICLES=https://api.example.com/articles/ai
VITE_API_BMDS_ITEMS=https://api.example.com/articles/bmds
```

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
