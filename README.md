# HERO Tax 🛡️

**[herotax.de](https://herotax.de)** — Finanz-Intelligenz-Plattform für Berliner Unternehmer:innen. KI-gestützte Prozesse, Steuer-News mit Quellenangabe, praktische Tools und eine EU-Wallet-Übersicht — alles ohne Cookie-Banner, ohne Tracking-Profile.

Das Projekt ist öffentlich, weil Transparenz Teil des Anspruchs ist: Wer über Steuern und Datenschutz schreibt, muss offenlegen, wie die eigene Plattform gebaut ist.

## Was die Seite macht

- **News-Hub** — kuratierte Meldungen zu Steuern, KI-Regulierung und Digitalisierung, jede mit Primärquelle (BMF, BMDS, BSI, IHK Berlin, …); dazu ein DE-Ökosystem-Bereich mit kuratierter Verlinkung zu [DeutschlandGPT](https://www.deutschlandgpt.de/) (`DEUTSCHLANDGPT_LINKS` in `src/data/articles.js`)
- **Light / Dark Mode Switcher** — Nahtloser Theme-Wechsel im Header (Sonne/Mond Toggle) mit automatischer System-Erkennung (`prefers-color-scheme`), `localStorage`-Persistenz und „Deep Midnight Blue Blueprint“ Ästhetik
- **Live-Feeds & Live Tracker** — ein serverseitiger PHP-Proxy (`public/api/feed.php`) holt RSS-Feeds offizieller Behörden, cached sie 4 Stunden (14.400s) und liefert sie CORS-frei aus; dazu zeigt der Live Tracker (`LiveTrackerBadge.jsx`: "Live · Stand: DD.MM.YYYY, HH:mm Uhr (alle 4 Std.)") den genauen Aktualisierungsstand samt manuellem Refresh-Button; fällt der Live-Abruf aus, greift automatisch die kuratierte Fallback-Liste in `src/data/articles.js`
- **Tools** — Umsatzsteuer-Rechner, Fristen-Check, ein interaktiver Gründungs-Guide für Berlin
- **EUDI-Wallet-Bereich** — Stand & Zeitplan der europäischen digitalen Brieftasche, mit offiziellen Quellen (EU-Kommission, BMDS, Verbraucherzentrale, Open-Code-Referenzimplementierung des Bundes)
- **Datenschutz & Compliance** — eigene DSGVO-Selbstverpflichtung, ein "Datenschutz-Radar" mit BfDI-Themen sowie ein Bereich mit BfDI-Publikationen (Broschüren, Flyer, Pixi-Bücher, Unterrichtsmaterial, Mediathek)
- **Mehrsprachigkeit** — Deutsch, Englisch, Türkisch, Arabisch (RTL) und Kurdisch (Kurmancî)
- **EU-KI-Kennzeichnung** — die Seite ist KI-generiert und weist das offiziell aus (`src/components/atoms/AILabel.jsx`)

## Tech-Stack

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) für Icons
- Kein Backend-Framework — Inhalte sind statische Daten (`src/data/`) plus ein schlanker PHP-Feed-Proxy für Live-News
- [Oxlint](https://oxc.rs) für Linting
- Dual-Engine IONOS SFTP/FTPS Deployment Engine (`scripts/deploy.mjs` + `ssh2-sftp-client` / `basic-ftp`)

## Projektstruktur

```
src/
  theme.jsx      ThemeProvider, ThemeContext & useTheme Hook für Light/Dark Mode
  components/
    atoms/       kleine wiederverwendbare Bausteine (Icons, Sprachwahl, ThemeSwitcher, LiveTrackerBadge, ...)
    sections/    Seitenabschnitte (Header, Hero, News-Hub, Tools, Footer, ...)
    tools/       interaktive Rechner/Guides
    pages/       eigenständige Seiten (Datenschutzerklärung)
  data/          statische Inhalte (Artikel, Guide-Schritte, EUDI-Wallet, Datenschutz-Themen)
  i18n/          Übersetzungslogik + locales/ (de, en, tr, ar, ku)
  services/      articleService.js — Feed-Abruf, 4-Std-Caching & Live-Tracker
  config/        Konfiguration (Links, Kontakt, Design-Tokens)
public/
  .htaccess      Apache-Konfiguration & Härtung (einzige Quelle, → dist/)
  404.html       echte Fehlerseite (ErrorDocument 404/403)
  robots.txt     Crawler-Steuerung (Suchmaschinen ja, KI-Training nein)
  api/feed.php   Feed-Proxy für RSS-Quellen der Behörden (4-Std-Cache)
scripts/
  deploy.mjs             Dual-Engine IONOS SFTP/FTPS Auto-Deployment-Skript
  check-routes.mjs       Routen-Abgleich App.jsx ↔ .htaccess
  security-check.mjs     Sicherheits-Smoketest gegen die Live-Seite
  analyze-logs.mjs       Auswertung der IONOS-Roh-Access-Logs
docs/
  SICHERHEIT.md  Umsetzungsdoku der Sicherheitsanalyse vom 12.08.2026
.github/
  workflows/
    deploy.yml           GitHub Actions Pipeline für automatische IONOS-Uploads
    security-check.yml   Sicherheits-Smoketest (alle 6 Std. + nach jedem Deploy)
    publish-public.yml   Spiegelung des Quellcodes nach OrhanHero/herotax-code
README.public.md         README des öffentlichen Spiegel-Repos (ohne Deploy-Interna)
```

## Entwicklung

```bash
npm install
npm run dev              # Dev-Server (Vite)
npm run build            # Produktions-Build nach /dist
npm run preview          # Build lokal testen
npm run lint             # Oxlint
npm run check:routes     # Routen & 301-Weiterleitungen App.jsx ↔ .htaccess
npm run security:check   # Sicherheits-Smoketest gegen die Live-Seite
npm run security:logs -- access.log   # IONOS-Access-Logs auswerten
npm run deploy:check     # SFTP-Verbindung & Zielverzeichnis prüfen (ohne Upload)
```

> **Neue Seite anlegen?** Die Route muss in `src/App.jsx` **und**
> `public/.htaccess` stehen — sonst liefert der Server dafür einen echten 404.
> (Die `sitemap.xml` entsteht beim Build automatisch aus dem Router.)
> `npm run check:routes` prüft das und läuft auch in der CI.

## Deployment

Details zum automatischen CI/CD-Deployment via GitHub Actions auf IONOS (Dual-Engine SFTP/FTPS, Secret `SFTP_URL`, `.htaccess`-SPA-Routing) stehen in [DEPLOYMENT.md](./DEPLOYMENT.md).

## Öffentliches Quellcode-Repository

Dieses Repository ist öffentlich auf [GitHub (OrhanHero/herotax)](https://github.com/OrhanHero/herotax) zugänglich. Der gesamte Quellcode der Plattform steht transparent zur Verfügung — frei nach dem Motto: *Nichts zu verstecken — auch nicht im Code.*

Alles, was zum Deployment oder Betrieb gehört, bleibt hier: die Workflows,
`scripts/deploy.mjs`, `check-routes.mjs`, `security-check.mjs`,
`analyze-logs.mjs`, `public/.htaccess`, `DEPLOYMENT.md` und `docs/`. Die
npm-Skripte und die SFTP-Abhängigkeiten werden aus der veröffentlichten
`package.json` herausgelöst, das Lockfile wird passend neu erzeugt.

> **Neue Datei, die zum Deployment gehört?** In `PRIVATE_PATHS` in
> `publish-public.yml` eintragen — sonst landet sie öffentlich. Der Workflow
> prüft die Liste vor dem Push ein zweites Mal und baut den öffentlichen Stand
> zur Gegenprobe einmal komplett durch.

Auch der Wortlaut wird geprüft: Der veröffentlichte Stand darf `SFTP`, `FTPS`,
`WinSCP`, `.htaccess` & Co. nirgends erwähnen — auch nicht in Kommentaren.
`IONOS` ist nur in der Datenschutzerklärung erlaubt, wo der Hoster genannt
werden muss.

Zwei Dateien haben deshalb eine öffentliche Zweitfassung, die beim Spiegeln
das Original ersetzt:

| privat | öffentlich | Grund |
|---|---|---|
| `README.md` | [`README.public.md`](./README.public.md) | nennt Hoster, Pipeline und Betriebs-Skripte |
| `.gitignore` | [`.gitignore.public`](./.gitignore.public) | zählt die Dateitypen der Zugangsdaten auf |

## Sicherheit

Die Seite ist gegen automatisiertes Massenscanning gehärtet: WordPress- und
Webshell-Pfade werden serverseitig mit 403 abgewiesen, Dotfiles und
Konfigurationsdateien sind gesperrt, unbekannte Pfade liefern einen echten
HTTP 404 statt stillschweigend die Startseite, und das Deployment bricht ab,
wenn Secrets im Build landen. Ein Smoketest prüft das alle sechs Stunden und
nach jedem Deployment gegen die Live-Seite.

Was genau umgesetzt wurde, wie es geprüft wird und was beim Hoster offen
bleibt, steht in [docs/SICHERHEIT.md](./docs/SICHERHEIT.md).

## Rechtlicher Hinweis

Redaktionelle Inhalte — kein Steuerberatungs-Ersatz (§ 5 StBerG). Die Datenschutzerklärung liegt unter [`/datenschutz`](https://herotax.de/datenschutz).

## Kontakt

- Web: [herotax.de](https://herotax.de)
- E-Mail: info@herotax.de
- [LinkedIn](https://www.linkedin.com/in/orhankahraman/) · [Instagram](https://instagram.com/herotaxberlin) · [TikTok](https://tiktok.com/@herotaxberlin) · [YouTube](https://www.youtube.com/@herotaxberlin) · [X](https://x.com/HeroTaxBerlin)
