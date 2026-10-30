# Inhaltsupdates — Protokoll

Workflow: [DEPLOYMENT.md → Inhaltsupdate (Redaktions-Workflow)](../DEPLOYMENT.md#inhaltsupdate-redaktions-workflow)

## 30.10.2026

**Geänderte Dateien:** `src/data/articles.js`, `src/components/atoms/NewsTicker.jsx`,
`src/components/sections/WahlprogrammeSection.jsx`, `src/services/articleService.js` (`CACHE_PREFIX` v37 → v38)

| Bereich | Meldung | Datum | Quelle |
|---|---|---|---|
| Berlin Fokus (Leitmeldung) | AGH konstituiert: Hendrikje Klein (Linke) Präsidentin, 98 Ja / 42 Nein / 9 Enth.; Linke-Parteitag 31.10. | 29.10.2026 | Abgeordnetenhaus / berlin.de |
| Bund & Steuer | Herbst-Steuerschätzung: +43,3 Mrd. € bis 2030; Berlin +583 Mio. € (2026/27) | 22.10.2026 | Bundesregierung / SenFin Berlin |
| Bund & Steuer | BMF-Schreiben Forschungszulage (IV C 3 – S 2020/00059/018/001) | 27.10.2026 | BMF |
| Bund & Steuer | E-Rechnung-Countdown 68 → 62 Tage | 30.10.2026 | BMF |
| Bund & Steuer | JStG-Anhörung: Uhrzeit/Ort ergänzt (02.11., 16–17:30 Uhr, Paul-Löbe-Haus) | 30.10.2026 | Bundestag |
| Cybersecurity | PHP2Shell: CVE-2026-109618/-109619 und gepatchte Versionen ergänzt | 21.10.2026 | BSI |
| BMDS-Panel | Digital-Gipfel 02./03.11. (Wilhelm Hallen); d-you Bug-Bounty | 30.10. / Okt. 2026 | BMDS |

**Hero-Fristen:** unverändert gültig (10.11., 16.11., 01.01.2027).

**Ersetzt:** Leitmeldung „Sondierung abgeschlossen“ → `featured: false`.

## 24.10.2026 (Komplettes Inhaltsupdate & Redaktions-Check)

**Geänderte Dateien:**
- `src/data/articles.js` (BSI A5 Community-Draft aktualisiert, Leit- & Steuermeldungen auf 24.10.2026)
- `src/data/social.js` (Frist-Kalender Juli → November aktualisiert)
- `src/components/atoms/NewsTicker.jsx` (Ticker-Stand 24.10.2026, R2G-Sondierung, PHP-Lücke, Fristen Nov, E-Rechnung 68 Tage)
- `src/components/sections/HeroSection.jsx` (Fristen: 10.11. USt/LSt, 16.11. GewSt/GrSt VZ, 01.01.2027 E-Rechnung)
- `src/components/sections/WahlprogrammeSection.jsx` (Stand auf 24.10.2026 Koalitions- & Sondierungsgrundlagen aktualisiert)
- `src/components/sections/PrivacySection.jsx` (Stand: August 2026 → Oktober 2026)
- `src/components/pages/DatenschutzPage.jsx` (Stand: August 2026 → Oktober 2026)
- `src/services/articleService.js` (`CACHE_PREFIX` v35 → v37)

| Bereich | Meldung | Datum | Quelle |
|---|---|---|---|
| Berlin Fokus (Leitmeldung) | R2G-Sondierung abgeschlossen, Papier „Mehr gemeinsam, mehr Berlin“; AGH konstituiert sich 29.10., Linke-Parteitag 31.10. | 17.10.2026 | rbb24 |
| Cybersecurity | BSI-Warnstufe Orange: kritische Lücken im PHP-Kern (CVSS 9,2), Patches seit 21.10. | 21.10.2026 | BSI |
| Bund & Steuer | Steuerfahrplan November: USt/LSt Okt. 10.11. (Schonfrist 13.11.), GewSt/GrSt-VZ Q4 16.11. | 24.10.2026 | BMF / ELSTER |
| Bund & Steuer | Drittes BMF-Schreiben E-Rechnung vom 15.10.2026; Countdown 68 Tage | 24.10.2026 | BMF |
| Bund & Steuer | JStG 2026: Anhörung Finanzausschuss 02.11., 2./3. Lesung geplant 13.11. | 24.10.2026 | Bundestag |
| FinTech & KI | KI-Sicherheitsstudie 2026 von BSI & TÜV-Verband | 07.10.2026 | BSI |
| BMDS-Panel | PIN-Rücksetzdienst wieder verfügbar; Bericht zur Staatsmodernisierung | 13.10. / 07.10.2026 | BMDS |
| BSI-Panel | PHP-Warnung; KI-Sicherheitsstudie; A5-Prüfkatalog (Konsultation abgeschlossen) | 21.10. / 07.10.2026 | BSI |
| Social Wall | Frist-Kalender auf November 2026 aktualisiert | 24.10.2026 | HERO Tax Redaktion |
| Compliance & Privacy | Stand der Datenschutzangaben auf Oktober 2026 harmonisiert | 24.10.2026 | HERO Tax Legal |

**Hero-Fristen:** abgelaufene Schonfrist 15.10. entfernt → 10.11. (USt/LSt Okt.), 16.11. (GewSt/GrSt-VZ gem. § 108 Abs. 3 AO), 01.01.2027 (E-Rechnung).

**Ersetzt / Aktualisiert:**
- Veraltete Meldungen („Sondierung gestoppt“, „Zahlungsschonfrist 15.10.“, „Noch 78 Tage E-Rechnung“).
- BSI A5 Community Draft Frist (31.08.2026) auf abgeschlossene Konsultation angepasst.
- Social Wall Juli-Fristenkarte auf November umgestellt.

**Sync-Ordner & Build:**
- Sync-Ordner: `D:\Documents\HEROTax`
- Produktions-Build (`dist/*`) erfolgreich dorthin synchronisiert.
