# HERO Tax 🛡️

**[herotax.de](https://herotax.de)** — Finanz-Intelligenz-Plattform für Berliner Unternehmer:innen. KI-gestützte Prozesse, Steuer-News mit Quellenangabe, praktische Tools und eine EU-Wallet-Übersicht — alles ohne Cookie-Banner, ohne Tracking-Profile.

Das Projekt ist öffentlich, weil Transparenz Teil des Anspruchs ist: Wer über Steuern und Datenschutz schreibt, muss offenlegen, wie die eigene Plattform gebaut ist.

## Was die Seite macht

- **News-Hub** — kuratierte Meldungen zu Steuern, KI-Regulierung und Digitalisierung, jede mit Primärquelle (BMF, BMDS, BSI, IHK Berlin, …); dazu ein DE-Ökosystem-Bereich mit kuratierter Verlinkung zu [DeutschlandGPT](https://www.deutschlandgpt.de/) (`DEUTSCHLANDGPT_LINKS` in `src/data/articles.js`)
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
  components/
    atoms/       kleine wiederverwendbare Bausteine (Icons, Sprachwahl, LiveTrackerBadge, ...)
    sections/    Seitenabschnitte (Header, Hero, News-Hub, Tools, Footer, ...)
    tools/       interaktive Rechner/Guides
    pages/       eigenständige Seiten (Datenschutzerklärung)
  data/          statische Inhalte (Artikel, Guide-Schritte, EUDI-Wallet, Datenschutz-Themen)
  i18n/          Übersetzungslogik + locales/ (de, en, tr, ar, ku)
  services/      articleService.js — Feed-Abruf, 4-Std-Caching & Live-Tracker
  config/        Konfiguration (Links, Kontakt, Design-Tokens)
public/
  api/feed.php   Feed-Proxy für RSS-Quellen der Behörden (4-Std-Cache)
scripts/
  deploy.mjs     Dual-Engine IONOS SFTP/FTPS Auto-Deployment-Skript
.github/
  workflows/
    deploy.yml   GitHub Actions Pipeline für automatische IONOS-Uploads
```

## Entwicklung

```bash
npm install
npm run dev       # Dev-Server (Vite)
npm run build     # Produktions-Build nach /dist
npm run preview   # Build lokal testen
npm run lint      # Oxlint
```

## Deployment

Details zum automatischen CI/CD-Deployment via GitHub Actions auf IONOS (Dual-Engine SFTP/FTPS, Secret `SFTP_URL`, `.htaccess`-SPA-Routing) stehen in [DEPLOYMENT.md](./DEPLOYMENT.md).

## Rechtlicher Hinweis

Redaktionelle Inhalte — kein Steuerberatungs-Ersatz (§ 5 StBerG). Die Datenschutzerklärung liegt unter [`/datenschutz`](https://herotax.de/datenschutz).

## Kontakt

- Web: [herotax.de](https://herotax.de)
- E-Mail: info@herotax.de
- [LinkedIn](https://www.linkedin.com/in/orhankahraman/) · [Instagram](https://instagram.com/herotaxberlin) · [TikTok](https://tiktok.com/@herotaxberlin) · [YouTube](https://www.youtube.com/@herotaxberlin) · [X](https://x.com/HeroTaxBerlin)
