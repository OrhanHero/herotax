# Sicherheitshärtung herotax.de — Umsetzungsdokumentation

| Feld | Wert |
|---|---|
| Grundlage | Sicherheitsanalyse herotax.de · IONOS WebAnalytics, 12.08.2026 |
| Umgesetzt am | 12.08.2026 |
| Branch | `GoogleAntigravityIDE` |
| Betroffene Umgebung | IONOS Webhosting (Apache), Auslieferung per GitHub Actions → SFTP/FTPS |
| Vertraulichkeit | intern |

Dieses Dokument hält fest, **was** aus dem Maßnahmenkatalog der Analyse
umgesetzt wurde, **wie** es umgesetzt wurde, **wie es überprüft wird** und
**was offen bleibt**, weil es außerhalb dieses Repositories liegt.

---

## 1. Ausgangslage in einem Absatz

Die Analyse fand in elf Tagen Livebetrieb 617 Fehleraufrufe (22,2 % aller
Seitenaufrufe), davon 295 auf `/wp-admin/install.php`. Dazu kam systematische
Suche nach `.env`, `.git/config`, `aws/credentials`, `secrets.json`,
`sftp-config.json`, nach bekannten Webshells und nach Debug-Endpunkten.
**Keine erfolgreiche Kompromittierung**, aber eine breit abgetastete
Angriffsoberfläche und ein Soft-404-Problem: unbekannte Pfade wurden mit
HTTP 200 beantwortet, was echte Serverfehler verdeckte und Angreifern die
Aufklärung erleichterte.

Der Handlungsbedarf lag damit in der Prävention, nicht in der Incident
Response. Genau danach ist die Umsetzung sortiert.

---

## 2. Wo die Härtung greift

Alle serverseitigen Regeln stehen in **`public/.htaccess`**. Diese Datei wird
von Vite unverändert nach `dist/` kopiert und landet damit als einzige
`.htaccess` im Web-Root des IONOS-Webspace.

> **Wichtig:** Vor der Umsetzung existierten **zwei** `.htaccess`-Dateien —
> eine im Repository-Root und eine in `public/`. Nur die aus `public/` wurde
> jemals ausgeliefert. Die beiden Dateien waren bereits auseinandergelaufen:
> Die HTTPS-Erzwingung stand ausschließlich in der Root-Variante und war
> deshalb **live nie aktiv**. Die Root-Datei wurde gelöscht, `public/.htaccess`
> ist ab sofort die einzige Quelle.

---

## 3. Umsetzung im Detail

### M1 — WordPress-Pfade hart abweisen ✅

`public/.htaccess` beantwortet den kompletten WordPress-Pfadraum mit **403**:

- `wp-admin`, `wp-includes`, `wp-content`, `wp-json`, `wp-login`, `wp-config`,
  `wp-cron`, `wp-signup`, `wp-mail`, `wp-trackback`, `wp-activate`,
  `wp-comments-post`, `wp-blog-header`, `wp-load`, `wp-settings`
- `xmlrpc.php`, `wlwmanifest.xml` (auch in Unterverzeichnissen wie
  `/cms/…` und `/sito/…`)
- `install.php` an beliebiger Stelle

Die Analyse hat 444 (Nginx-Manier, Verbindung ohne Antwort schließen)
vorgeschlagen. Apache kennt keinen 444-Äquivalent in `.htaccess`, daher 403.
Praktisch macht das keinen Unterschied — der Scanner bekommt keinen Treffer.

### M2 — Dotfiles, Konfigurations- und Secret-Dateien sperren ✅

Vier Regelgruppen:

1. **Dotfiles/-verzeichnisse** — `(^|/)\.` fängt `.env`, `.git/`, `.svn/`,
   `.aws/`, `.ssh/`, `.htaccess` selbst. Ausnahme davor: `/.well-known/`
   bleibt erreichbar (ACME/TLS-Erneuerung, App-Links).
2. **Konfigurationsdateien** — `secrets|settings|config|configuration|
   sftp-config|ftp-config|credentials|meta|composer|package|firebase|
   appsettings` in Kombination mit `.json|.yml|.yaml|.lock|.xml|.cfg|.ini`.
3. **Verzeichnisse** — `/aws/`, `/backend/`, `/debug/`, `/smtp/`, `/cgi-bin/`,
   `/vendor/`, `/storage/`, `/conf/`, `/config/`, `/server-status`,
   `/server-info`.
4. **Gefährliche Endungen** — `.env .bak .old .orig .save .swp .sql .db
   .sqlite .log .ini .conf .cfg .pem .key .crt .p12 .pfx .ppk .tar .gz .zip
   .rar .7z .inc .sh` und weitere.

Zusätzlich eine Regel, die **jedes serverseitige Skript außer dem Feed-Proxy**
abweist:

```apache
RewriteCond %{REQUEST_URI} !^/api/feed\.php$
RewriteRule \.(php|php[0-9]|phps|phtml|phar|asp|aspx|jsp|jspx|cgi|pl|py|rb|exe|dll)$ - [F,L,NC]
```

Diese eine Zeile deckt die komplette Webshell-Gruppe aus Abschnitt 6.3 der
Analyse ab: `wp_filemanager.php`, `images/images/cache.php`,
`this_is_a_new_hello_world.php`, `mrmgjy.php`, `site.php`, `smtp/phpinfo.php`.

**Zusätzlich gehärtet: `public/api/feed.php`** (nicht Teil des
Maßnahmenkatalogs, aber der einzige serverseitig ausgeführte Code der Seite):

- `Access-Control-Allow-Origin: *` → nur noch `herotax.de` / `www.herotax.de`
- nur `GET`/`HEAD`/`OPTIONS`, alles andere 405
- XML-Parser mit `LIBXML_NONET` (kein Netzwerkzugriff beim Auflösen externer
  Entities → kein XXE/SSRF über einen manipulierten Feed)
- `is_string()`-Prüfung auf `?source=`, damit `?source[]=` keinen TypeError
  auslöst
- `/api/cache/` ist serverseitig gesperrt — der Feed-Cache liegt zwar im
  Web-Root, ist aber nicht mehr direkt lesbar

### M3 — Physische Prüfung des Web-Roots ✅ (automatisiert)

Statt einer einmaligen manuellen Prüfung ist die Kontrolle jetzt Teil des
Deployments. `scripts/deploy.mjs` bricht **vor** dem Upload ab, wenn im Build
etwas liegt, das nicht ins Web-Root gehört:

```
❌ DEPLOYMENT ABGEBROCHEN — der Build enthält Dateien, die nicht ins Web-Root gehören:
   • .env — Umgebungsdatei mit Secrets
   • app.js.map — Sourcemap (gibt den unminifizierten Quellcode preis)
```

Geprüft wird auf: `.git/.svn/.hg`, `.env*`, `*.pem/.key/.p12/.pfx/.ppk/.crt`,
`id_rsa`, `id_ed25519`, `.htpasswd`, `.npmrc`, `.netrc`, `secrets.json`,
`credentials.json`, `sftp-config.json`, Sourcemaps (`*.map`) sowie
`*.sql/.sqlite/.db/.bak/.old/.orig/.swp`.

Die externe Gegenprüfung der Statuscodes übernimmt `npm run security:check`
(siehe Abschnitt 4).

### M4 — Rate-Limiting und automatische Sperren ⚠️ teilweise

Rate-Limiting (`limit_req_zone`) und Fail2Ban setzen Zugriff auf die
Serverkonfiguration bzw. das Betriebssystem voraus. Auf einem IONOS-Shared-
Webhosting ist beides aus dem Repository heraus **nicht** umsetzbar.

Was stattdessen umgesetzt wurde: bekannte Massenscanner und Security-Tools
werden per User-Agent abgewiesen —
`CensysInspect`, `Expanse`, `InternetMeasurement`, `NetSystemsResearch`,
`Odin`, `zgrab`, `masscan`, `Nmap`, `nikto`, `sqlmap`, `wpscan`, `dirbuster`,
`gobuster`, `feroxbuster`, `nuclei`, `ZmEu`, `l9explore` —
sowie aggressive SEO-Crawler ohne Nutzen für diese Seite
(`SemrushBot`, `AhrefsBot`, `MJ12bot`, `DotBot`, `BLEXBot`, `PetalBot`,
`DataForSeoBot`, `Barkrowler`, `SERankingBacklinksBot`).

User-Agent-Filter helfen gegen die ehrlichen Scanner. Gegen die getarnten
(„fake PerplexityBot", „fake OpenAI bot" aus Abschnitt 5.2) helfen sie
nicht — dafür ist M5 zuständig. **Siehe offene Punkte.**

### M5 — IONOS-Bot-/DDoS-Schutz und WAF ❌ nicht im Repository umsetzbar

Reine Konfigurationsmaßnahme im IONOS-Kundenkonto. **Siehe offene Punkte.**

### M6 — 404-Handling korrigieren ✅

Das war der strukturell größte Eingriff. Vorher galt die klassische
SPA-Regel:

```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
```

Damit bekam **jeder** Pfad — auch `/th1s_1s_a_4o4.html`, `/dashboard`,
`/pricing` — die `index.html` mit HTTP 200. Das erklärt die 201 „Fehleraufrufe"
auf `/` in der Analyse: Es waren keine Serverfehler, sondern Soft-404s, die
WebAnalytics der Startseite zugeordnet hat.

Neu gilt eine dreistufige Auflösung:

```apache
# 1. bekannte SPA-Route → index.html mit HTTP 200
RewriteRule ^eudi-wallet/?$ /eu-kompass [R=301,L]
RewriteRule ^(ki|news|eu-kompass|tools|live|publikationen|dsgvo|datenschutz|impressum)/?$ index.html [L,NC]

# 2. existierende Datei/Verzeichnis → normal ausliefern
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# 3. alles andere → echter HTTP 404
RewriteRule ^ - [R=404,L]
```

Dazu eine eigene, schlanke Fehlerseite `public/404.html` (`ErrorDocument 404`),
die ohne externe Ressourcen auskommt, Light/Dark beherrscht und
`noindex, follow` gesetzt hat. `ErrorDocument 403` zeigt dieselbe Seite —
ein blockierter Scanner erfährt so nicht, ob der Pfad gesperrt ist oder
schlicht nicht existiert.

**Preis dieser Maßnahme:** Die Routenliste steht jetzt an zwei Stellen —
`src/App.jsx` und `public/.htaccess`. Läuft sie auseinander, ist eine neue
Seite live nicht erreichbar. Deshalb gibt es `npm run check:routes`, das genau
das prüft und in der CI vor dem Build läuft:

```
✅ Routen konsistent (10): /, /datenschutz, /dsgvo, /eu-kompass, /impressum,
   /ki, /live, /news, /publikationen, /tools
   301-Weiterleitungen (1): /eudi-wallet → /eu-kompass
```

Geprüft wird in beide Richtungen — fehlende Route in der `.htaccess` (Seite
liefert live 404) ebenso wie eine Route in der `.htaccess`, die der Router
nicht kennt. Zusätzlich werden die umbenannten Adressen aus `ROUTE_REDIRECTS`
gegen die 301-Regeln der `.htaccess` abgeglichen: Beides muss existieren, aufs
gleiche Ziel zeigen und die Altadresse darf nicht gleichzeitig in der
SPA-Routenliste stehen.

Die Routen liest das Skript über `collectRoutes()` aus `scripts/sitemap.mjs` —
also über genau denselben Parser, aus dem beim Build auch die `sitemap.xml`
erzeugt wird. Dadurch kann die Sitemap nicht zusätzlich auseinanderlaufen.

**Wer eine neue Seite anlegt, muss sie in `src/App.jsx` und
`public/.htaccess` eintragen.** Die CI erinnert daran.

### M7 — `robots.txt` und `favicon.ico` bereitstellen ✅

`public/robots.txt` wurde von vier Zeilen auf eine differenzierte Steuerung
erweitert:

| Gruppe | Regel | Begründung |
|---|---|---|
| Googlebot, Bingbot, DuckDuckBot | `Allow: /` | Sichtbarkeit erwünscht |
| ChatGPT-User, PerplexityBot, Claude-User | `Allow: /` | von Menschen ausgelöste Abrufe — herotax.de bleibt in KI-Antworten auffindbar |
| CCBot, GPTBot, ClaudeBot, anthropic-ai, Google-Extended, Applebot-Extended, meta-externalagent, Bytespider, Amazonbot, cohere-ai | `Disallow: /` | Crawler für **Trainingsdaten** |
| SemrushBot, AhrefsBot, MJ12bot, DotBot, SERankingBacklinksBot | `Disallow: /` | kommerzielles Backlink-Scraping |
| alle übrigen | `Allow: /`, `Disallow: /api/` | |

> **Das ist die einzige geschäftliche Entscheidung in dieser Umsetzung.**
> Die Analyse hat sie ausdrücklich als solche markiert. Umgesetzt wurde die
> differenzierte Variante: Training aus — Auffindbarkeit in KI-Antworten an.
> Wer die Inhalte wieder für Modelltraining freigeben will, löscht in
> `public/robots.txt` den Block „Crawler für KI-Trainingsdaten".

`public/favicon.ico` (16/32/48 px, Markenblau `#2337E8`) beendet die
35 vermeidbaren 404er. `index.html` verweist zusätzlich darauf.

> **Hinweis:** Das `.ico` ist ein schlichtes Markenzeichen in Blau und nicht
> aus dem Logo gerendert — die vorhandene `public/favicon.png` ist trotz
> Dateiendung ein 1-MB-JPEG und ließ sich nicht ohne Bildbibliothek
> konvertieren. Als Browser-Icon greift weiterhin das hochauflösende PNG aus
> `index.html`; das `.ico` bedient nur Clients und Crawler, die stur
> `/favicon.ico` anfragen. Ein sauber gerendertes Icon kann es jederzeit
> ersetzen.

Die `sitemap.xml` wird seit `df61b9e` beim Build aus den Router-Routen
erzeugt (`scripts/sitemap.mjs`) und ist damit automatisch vollständig — die
zuvor hier vorgesehene statische Pflege entfällt.

### M8 — Altes Frontend-Bundle entfernen ✅

**Zur Empfehlung des Berichts.** Der Bericht rät, `/assets/index-*` zu
entfernen. So pauschal geht das nicht: dieses Projekt baut mit **Vite**, und
Vite erzeugt `/assets/index-*.js` — dort liegt auch der *aktuelle* Build. Das
Muster `/static/js/main.*.js` stammt dagegen aus **Create React App**, einer
Generation, die dieses Repository nicht mehr enthält.

Zu entfernen war also nicht ein Verzeichnis, sondern alles darin, was nicht
zum aktuellen Build gehört. Wie viel das war, steht weiter unten — es war
deutlich mehr als ein zweiter Build.

Ursache gefunden: `scripts/deploy.mjs` lud per `sftp.uploadDir()` nur hoch und
löschte nie etwas. Weil Vite jeden Build unter einem neuen Hash ablegt, blieb
das Bundle jedes früheren Deployments dauerhaft auf dem Webspace abrufbar.
(Der FTPS-Zweig rief zwar `clearWorkingDir()` auf, aber *vor* dem Upload und
damit inklusive des Feed-Caches.)

Das Deployment räumt jetzt nach dem Upload auf: Dateien, die auf dem Webspace
liegen, aber nicht mehr Teil des Builds sind, werden gelöscht. Dabei gilt:

- `api/cache/` ist geschützt — der Feed-Proxy legt es selbst an
- jede Löschung wird einzeln protokolliert
- Sicherheitsnetz: bei mehr als 200 zu löschenden Dateien bricht der
  Prune-Schritt ab, statt den Webspace zu leeren
  (`DEPLOY_PRUNE_LIMIT` anpassbar). Der einmalige Nachholeffekt lag mit 107
  Dateien darunter; ab jetzt räumt jedes Deployment nur noch seinen eigenen
  Vorgänger ab, die Zahl bleibt also einstellig.
- abschaltbar mit `DEPLOY_PRUNE=0`

**Gemessenes Ergebnis des ersten Deployments nach dieser Änderung**
(Run `31591513032`, 12.08.2026, 11:22 UTC):

```
🔎 Preflight ok — 44 Dateien, keine Secrets im Build.
🧹 Prune: 107 verwaiste Datei(en) auf dem Webspace
🎉 SFTP-Deployment erfolgreich abgeschlossen!
```

**107 verwaiste Dateien** — deutlich mehr als erwartet, und der Befund fällt
anders aus als angenommen:

- **Alle 107 waren `assets/index-*.js` bzw. `assets/index-*.css`.** Es lag
  also nicht ein alter Build daneben, sondern **jeder Build seit dem Go-Live**.
  Bei rund 55 Deployments (Push plus 4-Stunden-Cron) sammelte sich pro Lauf ein
  neues Bundle-Paar an, ohne dass je etwas entfernt wurde.
- Darunter exakt die beiden Dateien, die der Analyse als „zweite
  Build-Struktur" aufgefallen waren: `assets/index-Df4WSlXO.js` (16 Aufrufe)
  und `assets/index-Cf-4NrkT.js` (15 Aufrufe). Beide waren **Leichen aus
  früheren Deployments**, nicht der aktuelle Build.
- **`static/js/main.*.js` war nicht mehr auf dem Webspace.** Der Pfad aus
  Abschnitt 8.3 der Analyse (97 Aufrufe) existiert im Zielverzeichnis nicht
  mehr — er muss zwischen dem Analysezeitraum und dem 12.08.2026 verschwunden
  sein oder wurde nie aus diesem Verzeichnis ausgeliefert. Woher er stammte,
  lässt sich jetzt nicht mehr klären; für die Zukunft ist der Mechanismus, der
  solche Reste liegen lässt, jedenfalls behoben.

Damit ist die Aussage aus dem Analysebericht („veralteter zweiter JS-Build")
im Kern bestätigt, die Ursache aber eine andere als vermutet: kein paralleles
Framework, sondern ein Deployment ohne Aufräumen. Jedes dieser 107 Bundles war
öffentlich abrufbar und enthielt den Frontend-Stand seines Deployment-Tages.

Der zweite Teil von M8 — „prüfen, ob in den ausgelieferten JS-Bundles
Schlüssel, Tokens oder interne Endpunkte im Klartext stehen" — ist für den
aktuellen Build erledigt: Die Anwendung hat kein Backend mit Authentifizierung,
`vite.config.js` definiert als einzigen Build-Wert `__BUILD_TIME__`, und es
existiert keine `.env`. Für den alten CRA-Build lässt sich das nicht mehr
nachträglich prüfen — er wird ersatzlos entfernt.

### M9 — Security-Header ✅

Die Header-Sektion war bereits weitgehend vorhanden (HSTS mit `preload`,
CSP mit `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`,
`Permissions-Policy`). Ergänzt bzw. korrigiert wurden:

| Header | vorher | nachher |
|---|---|---|
| `Referrer-Policy` | `no-referrer-when-downgrade` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | ohne `interest-cohort` | mit `interest-cohort=()` |
| `X-Powered-By` u. Ä. | wurde durchgereicht | `Header always unset` |
| HTTPS-Erzwingung | nur in der nie ausgelieferten Root-`.htaccess` | in `public/.htaccess`, mit `X-Forwarded-Proto`-Erkennung für den vorgelagerten IONOS-TLS-Terminator |

Ebenfalls neu: HTTP-Methoden sind auf `GET`, `HEAD`, `POST`, `OPTIONS`
begrenzt — `TRACE`/`TRACK`/`PROPFIND` sind typische Erkennungssonden für
veraltete Server.

`server_tokens off` / `ServerTokens Prod` lässt sich in `.htaccess` **nicht**
setzen (Serverkontext) — der Versuch würde einen HTTP 500 auslösen.
**Siehe offene Punkte.**

### M10 — Login- und Formularschutz ✅ (gegenstandslos, geprüft)

Die Analyse fragte, ob `/dashboard`, `/checkout`, `/signup`, `/pricing` reale
Routen sind. **Antwort: nein.** Der Router in `src/App.jsx` kennt genau zehn
Routen (`/`, `/ki`, `/news`, `/eu-kompass`, `/tools`, `/live`,
`/publikationen`, `/dsgvo`, `/datenschutz`, `/impressum`). Es gibt keine
Anmeldung, keine Benutzerkonten, keine Formularverarbeitung und keine
Datenbank. Die Seite ist ein statisches Frontend plus einen lesenden
RSS-Proxy.

Diese Pfade waren also reines Standardrouten-Raten — und liefern seit M6
einen echten 404 statt HTTP 200.

### M11 — Serverlog-Auswertung ⚠️ teilweise

Roh-Access-Logs liegen bei IONOS, nicht im Repository. Was hier abgedeckt
werden kann, ist die Wirkungskontrolle von außen:
`npm run security:check` fragt alle 31 Angriffspfade aus dem Anhang der
Analyse ab und schlägt fehl, sobald einer davon HTTP 200 liefert — das ist
genau der Check, den die Analyse als „darf keine Treffer liefern" bezeichnet.

Die Log-Auswertung der Spitzentage 02.08., 06.08. und 11.08.2026 bleibt eine
manuelle Aufgabe. **Siehe offene Punkte.**

### M12 — Monitoring und Alerting ✅ (Teilbereich)

`.github/workflows/security-check.yml` führt den Smoketest aus:

- nach jedem erfolgreichen Deployment (`workflow_run`)
- täglich um 05:30 UTC / 07:30 Berliner Zeit
- manuell per `workflow_dispatch`, wahlweise gegen eine andere Basis-URL

Der Workflow schlägt fehl bei: HTTP 200 auf einem Secret-Pfad, fehlendem
Security-Header, fehlender HTTPS-Weiterleitung, nicht erreichbarer Route
oder einem zurückgekehrten Soft-404. GitHub benachrichtigt die
Repository-Verantwortlichen bei fehlgeschlagenen Workflows.

5xx-Alarmierung pro Minute setzt serverseitiges Monitoring voraus.
**Siehe offene Punkte.**

### M13 — Deployment-Härtung ✅

- Preflight im Deploy-Skript (siehe M3)
- `.gitignore` um `.env`, `.env.*`, `*.pem`, `*.key`, `*.p12`, `*.pfx`,
  `*.ppk`, `id_rsa`, `id_ed25519`, `.htpasswd`, `secrets.json`,
  `credentials.json`, `sftp-config.json`, `.npmrc`, `.netrc` erweitert
- Ausgeliefert wird ausschließlich `dist/` — Quellcode, `node_modules` und
  Git-Metadaten erreichen den Webspace nicht
- Das einzige Secret des Projekts (`SFTP_URL`) liegt als GitHub-Actions-Secret
  und nicht als Datei vor

### M14 — Bot-Filter in der Auswertung ❌ nicht im Repository umsetzbar

Reine Einstellung im IONOS-WebAnalytics-Konto. **Siehe offene Punkte.**

### M15 — Backup- und Wiederherstellungstest ❌ nicht im Repository umsetzbar

Der Quellcode ist über GitHub versioniert, und das Deployment ist jederzeit
aus jedem Commit reproduzierbar (`npm ci && npm run build`) — insofern ist der
Frontend-Teil wiederherstellbar. Ein dokumentierter Restore-Test des
Webspace selbst gehört zum IONOS-Konto. **Siehe offene Punkte.**

---

## 4. Wie die Wirkung überprüft wird

### Lokal, ohne Netzwerk

```bash
npm run check:routes    # App.jsx ↔ .htaccess (Routen + 301-Weiterleitungen)
npm run lint
npm run build
```

### Gegen die Live-Seite

```bash
npm run security:check
# oder gegen eine andere Umgebung:
npm run security:check -- --base=https://staging.example.de
```

Der Smoketest prüft in fünf Blöcken:

1. **31 Angriffs- und Recon-Pfade** — müssen 403 oder 404 liefern, niemals 200
2. **14 echte Routen und Dateien** — müssen 200 liefern; `/eudi-wallet` muss
   301 auf `/eu-kompass` liefern
3. **Soft-404-Test** — `/pl`, `/dashboard`, `/checkout`, `/signup`,
   `/pricing` und ein Zufallspfad müssen 404 liefern
4. **Security-Header** — HSTS, `nosniff`, `X-Frame-Options`,
   `Referrer-Policy`, CSP, `Permissions-Policy`; warnt bei durchgereichtem
   `X-Powered-By`
5. **HTTPS-Erzwingung** — `http://` muss 301 auf `https://` liefern

Exit-Code ≠ 0 bei jedem Fehler, dadurch CI-tauglich.

### Statische Vorabprüfung der Regelkette

Vor dem Commit wurde die komplette Rewrite-Kette gegen alle 31 Angriffspfade
**und** gegen alle Dateien des tatsächlichen Builds simuliert. Ergebnis:
alle Angriffs-/Recon-Pfade werden mit 403 oder 404 beantwortet, alle legitimen
Pfade (Routen, Assets, Schriften, Bilder, Feed-Proxy) weiterhin mit 200.
Keine Fehlblockade.

### Live-Verifikation

Die Umsetzungsumgebung selbst hatte per Netzwerk-Policy keinen Zugriff auf
`herotax.de` (jeder ausgehende Aufruf endete am Proxy). Die erste echte
Messung stammt deshalb aus dem CI-Lauf `31591604949` vom 12.08.2026,
11:23 UTC, unmittelbar nach dem Deployment von `be00c57`:

```
① Angriffs- und Recon-Pfade      31/31 → 403 oder 404, kein einziger 200
② Echte Routen                   14/14 → 200
②b /eudi-wallet                        → 301 /eu-kompass
③ Soft-404-Test                   6/6 → 404   (vorher: 200)
④ Security-Header                 6/6 vorhanden, kein X-Powered-By
⑤ HTTPS-Erzwingung               http:// → 301 https://herotax.de/

Ergebnis: 0 Fehler, 0 Warnungen — Prüfung bestanden.
```

Damit ist belegt: Die 617 Fehleraufrufe aus der Analyse laufen jetzt gegen
403/404 statt gegen Soft-200, die Startseite wird nicht mehr fälschlich als
Fehlerseite gezählt, und kein Secret-Pfad liefert Inhalte aus.

---

## 5. Offene Punkte

### Muss außerhalb dieses Repositories erledigt werden

| # | Aufgabe | Wo | Bezug |
|---|---|---|---|
| O1 | Bot-/DDoS-Schutz und WAF aktivieren, sofern im Tarif enthalten | IONOS-Kundenkonto | M5 — laut Analyse die wirkungsvollste Einzelmaßnahme bei geringstem Aufwand |
| O2 | Fail2Ban-artige Sperre auf gehäufte 403/404 pro IP | IONOS-Serverkonfiguration | M4 |
| O3 | `ServerTokens Prod` / `ServerSignature Off` setzen | IONOS-Serverkonfiguration (in `.htaccess` nicht möglich) | M9 |
| O4 | Roh-Access-Logs der Spitzentage 02.08., 06.08., 11.08.2026 auswerten | IONOS-Logs | M11 |
| O5 | 5xx-Alarmierung einrichten | Monitoring beim Hoster | M12 |
| O6 | Bot-Traffic im WebAnalytics-Reporting ausfiltern | IONOS WebAnalytics | M14 |
| O7 | Versionierte Webspace-Backups mit dokumentiertem Restore-Test | IONOS-Konto | M15 |

Für O4 aus der Analyse, weiterhin gültig:

```bash
awk '$9 ~ /^[45]/ {print $1}' access.log | sort | uniq -c | sort -rn | head -30
awk '$9 == 200 {print $7}' access.log | grep -Ei '\.env|\.git|credentials|secrets|config\.json'
```

Die zweite Zeile darf **keine Treffer** liefern.

### Fragen der Analyse, die jetzt beantwortet sind

| Offene Frage aus Abschnitt 13 | Antwort |
|---|---|
| Warum erscheint `/` 201-mal als Fehlerseite? | Soft-404: die SPA-Rewrite-Regel lieferte für jeden unbekannten Pfad `index.html` mit HTTP 200. Keine echten 5xx-Fehler. Mit M6 behoben. |
| Existieren `/dashboard`, `/checkout`, `/signup`, `/pricing` als reale Routen? | Nein. Der Router kennt zehn Routen, keine davon. Reines Standardrouten-Raten. |
| Stammt `/assets/index-*` aus einem alten Deployment? | Teils ja. `/assets/index-*` ist das Namensmuster des aktuellen Vite-Builds, aber weil das Deploy-Skript nie löschte, lagen dort **107 Bundles früherer Deployments** daneben — darunter die beiden in der Analyse aufgefallenen Dateien. Alle wurden am 12.08.2026 entfernt (M8). `/static/js/main.*.js` war zu diesem Zeitpunkt nicht mehr vorhanden. |

### Noch offen aus den Analytics-Daten

- **Welche Statuscodes die 617 Fehlerseiten tatsächlich lieferten** und **aus
  welchen IP-Netzen die Scans kommen**, lässt sich nur aus den Roh-Serverlogs
  klären (O4).
- **Wurde jemals ein Secret-Pfad mit 200 beantwortet?** Für die Zukunft
  beantwortet der tägliche Smoketest das. Rückwirkend nur über O4.

### Erledigt, bevor diese Umsetzung landete

Ein zweiter Auslieferungsweg über **GitHub Pages**
(`.github/workflows/static.yml`) hätte eine ungehärtete Kopie der Seite unter
einer `github.io`-Adresse erzeugt — dort greift keine `.htaccess`-Regel, also
auch nicht die Soft-404-Korrektur aus M6. Der Workflow wurde bereits in
`ae955f4` entfernt. Kein Handlungsbedarf, hier nur der Vollständigkeit halber
festgehalten.

---

## 6. Geänderte Dateien

| Datei | Änderung |
|---|---|
| `public/.htaccess` | M1, M2, M4 (UA-Filter), M6, M9 — Kern der Härtung |
| `.htaccess` (Root) | **gelöscht** — nie ausgeliefert, Quelle von Konfigurations-Drift |
| `public/404.html` | **neu** — echte Fehlerseite für `ErrorDocument 404/403` |
| `public/favicon.ico` | **neu** — M7 |
| `public/robots.txt` | M7 — Crawler-Steuerung |
| `public/api/feed.php` | CORS eingegrenzt, Methodenfilter, `LIBXML_NONET`, Typprüfung |
| `index.html` | `favicon.ico`-Verweis |
| `scripts/deploy.mjs` | M3/M13 Preflight, M8 Prune mit Schutz- und Limitlogik |
| `scripts/check-routes.mjs` | **neu** — Routen- und Redirect-Konsistenz (Folgemaßnahme aus M6) |
| `scripts/security-check.mjs` | **neu** — M3/M11/M12 Smoketest |
| `.github/workflows/security-check.yml` | **neu** — M12 |
| `.github/workflows/ci.yml` | Routen-Konsistenz vor dem Build |
| `.gitignore` | M13 — Secrets |
| `package.json` | Skripte `check:routes`, `security:check` |
| `DEPLOYMENT.md`, `README.md` | Dokumentation nachgezogen |

---

## 7. Restrisiko

Die Analyse bewertete das Gesamtrisiko als **MITTEL**, mit R1 (Offenlegung von
Secrets durch fehlkonfiguriertes Deployment) als einzigem Einzelrisiko der
Stufe HOCH.

R1 ist durch drei unabhängige Schichten adressiert: Die Dateien können nicht
mehr versehentlich committet werden (`.gitignore`), der Upload bricht ab, falls
sie es doch in den Build schaffen (Preflight), und der Server würde sie selbst
dann nicht ausliefern (`.htaccess`). Der tägliche Smoketest schlägt Alarm,
falls doch eine Lücke entsteht.

R3 (Soft-404) und R4 (veralteter zweiter Build) sind vollständig beseitigt —
beides am 12.08.2026 gegen die Live-Seite nachgemessen.
R2, R7 und R8 sind gedämpft, aber nicht beseitigt — die verbleibende Wirkung
hängt an O1/O2, also an der WAF beim Hoster. R5 war gegenstandslos (keine
Login-Routen). R6 und R9 bleiben unverändert.

Kein Ergebnis dieser Umsetzung ersetzt einen Penetrationstest oder eine
forensische Log-Analyse.
