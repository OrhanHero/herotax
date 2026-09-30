/* ── CONTENT-DATEN (CMS-ready: Arrays → API-Fetch) ─────────────────
   Kuratierter Stand: 1. Oktober 2026.
   Jede Meldung hat eine Primärquelle. Beim Aktualisieren gilt: erst
   die Quelle prüfen, dann Datum und Text anpassen — nie umgekehrt. */

export const AI_ARTICLES = [
  {
    title: "KI-MIG & Bundesnetzagentur: Erstes KI-Reallabor für KMU und Start-ups gestartet",
    excerpt:
      "Die Bundesnetzagentur hat als zuständige Aufsichtsbehörde nach dem KI-MIG das Pilot-Reallabor freigeschaltet. Start-ups und KMU können generative Systeme und Agentenmodelle unter realen Bedingungen auf Konformität mit Art. 50 und Sicherheitsstandards des EU AI Act testen.",
    read: "5 Min",
    date: "27. September 2026",
    source: {
      label: "Bundesnetzagentur · KI-Reallabor",
      href: "https://bmds.bund.de/themen/kuenstliche-intelligenz",
    },
    tag: "KI-Regulierung",
  },
  {
    title: "KI-Transparenzpflicht Art. 50: Praxis-Erfahrungen und Kennzeichnungstrends bei KMU",
    excerpt:
      "Seit August 2026 gilt Art. 50 der EU-KI-Verordnung. Chatbots müssen sich klar zu erkennen geben, KI-generierte Texte, Bilder und Videos benötigen eine Kennzeichnung. Welche Best Practices sich für Webseiten, Newsletter und Kundenservice etablieren.",
    read: "6 Min",
    date: "22. September 2026",
    source: {
      label: "Verordnung (EU) 2024/1689, Art. 50 — EUR-Lex",
      href: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689",
    },
    tag: "KI-Regulierung",
  },
  {
    title: "KI-gestützte Belegverarbeitung: Vom Schuhkarton zum Echtzeit-Reporting",
    excerpt:
      "OCR- und Kategorisierungs-Modelle nehmen der Buchhaltung einen Großteil der Handarbeit ab. Welche Workflows sich für Solo-Gründer und Berliner KMUs lohnen — und wo menschliche Kontrolle Pflicht bleibt.",
    read: "7 Min",
    date: "16. August 2026",
    source: { label: "IHK Berlin — Digitalisierung", href: "https://www.ihk.de/berlin" },
    tag: "Automatisierung",
  },
  {
    title: "Risikomanagementsysteme im Finanzamt: So prüft der Algorithmus deine Erklärung",
    excerpt:
      "Nach § 88 Abs. 5 AO dürfen Finanzämter automationsgestützte Systeme zur Fallauswahl einsetzen. Was das für Abgabe-Qualität, Vorsteuer-Abzug und Plausibilität deiner Zahlen bedeutet.",
    read: "5 Min",
    date: "15. August 2026",
    source: { label: "§ 88 Abs. 5 AO — Gesetze im Internet", href: "https://www.gesetze-im-internet.de/ao_1977/__88.html" },
    tag: "Steuerverwaltung",
  },
];

/** KI-Sicherheit & Regulierung — offizielle Meldungen des BMDS
    (Bundesministerium für Digitales und Staatsmodernisierung). */
export const BMDS_ITEMS = [
  {
    title: "Neues KI-Gesetz in Kraft: Bundesnetzagentur wird zentrale KI-Marktüberwachungsbehörde",
    text: "Das Durchführungsgesetz zur KI-Verordnung (KI-MIG) ist am 29. Juli 2026 in Kraft getreten. Statt einer neuen Behörde bündelt der Bund die Aufsicht bei der Bundesnetzagentur — samt KI-Service-Desk als niedrigschwelliger Anlaufstelle für KMU und Start-ups sowie einem Reallabor für Tests im rechtssicheren Rahmen.",
    date: "29. Juli 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/neues-ki-gesetz-tritt-in-kraft" },
  },
  {
    title: "KI-Marktplatz MaKI gestartet: bundesweiter Überblick über KI-Systeme der Verwaltung",
    text: "Seit dem 17. Juni 2026 bündelt der „Marktplatz der KI-Möglichkeiten“ die KI-Anwendungen von Bund, Ländern und Kommunen an einer Stelle. Entwickelt von BMDS, IT-Planungsrat und Deutschem Landkreistag — ein Transparenzregister, das zeigt, welche Verfahren KI-gestützt laufen.",
    date: "17. Juni 2026",
    source: { label: "BMDS · MaKI (kimarktplatz.bund.de)", href: "https://www.kimarktplatz.bund.de/" },
  },
  {
    title: "Agentic AI Hub: 18 Pilotprojekte bringen KI-Agenten in die Verwaltung",
    text: "Der Bund erprobt mit 18 ausgewählten Pilotprojekten autonome KI-Agenten in Behörden — Berliner Bezirke sind dabei. Ein Indikator für den Mittelstand: Was der Bund testet, wird mittelfristig Prozess-Standard an der Schnittstelle zur Verwaltung.",
    date: "April 2026",
    source: { label: "BMDS · Künstliche Intelligenz", href: "https://bmds.bund.de/themen/kuenstliche-intelligenz" },
  },
  {
    title: "SPARK: KI-Module für Genehmigungsverfahren als Open Source veröffentlicht",
    text: "Inhaltsextraktion, formale Vollständigkeitsprüfung und Plausibilisierung — die ersten SPARK-Module sind seit dem 1. April 2026 offen verfügbar. Sie sollen Planungs- und Genehmigungsverfahren beschleunigen und sind für alle nachnutzbar.",
    date: "01. April 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/ki-basierte-open-source-module-fuer-die-verwaltung" },
  },
];

/** IT- & KI-Sicherheit — Meldungen und Angebote des BSI
    (Bundesamt für Sicherheit in der Informationstechnik). */
export const BSI_ITEMS = [
  {
    title: "Prüfkatalog für vertrauenswürdige KI: Community Draft des A5 — Kommentierung bis 31. August",
    text: "Mit der „AI Audit and Assurance Assessment Architecture“ (A5) legt das BSI eine modulare Prüfarchitektur für KI-Systeme vor: Robustheit, Erklärbarkeit, Leistungsfähigkeit, menschliche Aufsicht, Bias-Vermeidung und Cybersicherheit. Anmerkungen nimmt das BSI noch bis zum 31. August 2026 entgegen.",
    date: "06. Juli 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260706_KI_A5-Community-Draft.html" },
  },
  {
    title: "BSI-Magazin 2026/01: NIS-2 und BSI-Gesetz stärken die Cybersicherheit in Unternehmen",
    text: "Das BSI-Magazin ordnet ein, was das novellierte BSI-Gesetz und die NIS-2-Umsetzung für Unternehmen bedeuten — von Meldepflichten bis zur Verantwortung der Geschäftsleitung.",
    date: "11. Juni 2026",
    source: { label: "BSI · Meldung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Alle-Meldungen-News/Meldungen/2026/BSI-Magazin_NIS-2_BSIG_260611.html" },
  },
  {
    title: "NIS-2: Bin ich betroffen? Betroffenheitsprüfung & Pflichten im Überblick",
    text: "Das BSI führt regulierte Unternehmen durch Registrierung, Melde- und Nachweispflichten. Auch Dienstleister von Buchhaltung, ERP und IT prüfen hier, ob sie in den Anwendungsbereich fallen.",
    date: "Laufend aktualisiert",
    source: { label: "BSI · NIS-2-regulierte Unternehmen", href: "https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/nis-2-regulierte-unternehmen_node.html" },
  },
  {
    title: "Lage der Cybernation: Monatsbericht zur aktuellen Cyber-Sicherheitslage",
    text: "Monatliche Einordnung von Bedrohungen, Angriffsflächen und Schadwirkung — die schnellste Orientierung, ob eine Welle gerade auch kleine Betriebe trifft.",
    date: "Laufend aktualisiert",
    source: { label: "BSI · Monatsbericht Lage der Cybernation", href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Cyber-Sicherheitslage/Lageberichte/Monatsbericht_Lage-Cybernation/Monatsberichte_Lage_node.html" },
  },
];

/** DE-Ökosystem · DeutschlandGPT */
export const DEUTSCHLANDGPT_LINKS = [
  {
    id: "home",
    title: "DeutschlandGPT",
    desc: "DSGVO-konforme KI-Plattform für den Mittelstand — ChatGPT, Claude & Gemini, gehostet in Deutschland.",
    href: "https://www.deutschlandgpt.de/",
  },
  {
    id: "blog",
    title: "Blog",
    desc: "KI-Wissen für den deutschen Mittelstand — praktische Guides und Insights zur sicheren KI-Einführung.",
    href: "https://www.deutschlandgpt.de/blog",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    desc: "Erfolgreiche KI-Implementierungen deutscher Unternehmen und Organisationen im Überblick.",
    href: "https://www.deutschlandgpt.de/case-studies",
  },
  {
    id: "ressourcen",
    title: "Ressourcen",
    desc: "Kostenlose Materialien und Leitfäden zur strukturierten KI-Einführung im Unternehmen.",
    href: "https://www.deutschlandgpt.de/ressourcen",
  },
  {
    id: "vergleich",
    title: "Vergleich",
    desc: "Fairer Vergleich mit ChatGPT, Copilot, Langdock und weiteren KI-Lösungen.",
    href: "https://www.deutschlandgpt.de/vergleich",
  },
  {
    id: "ki-starter-check",
    title: "KI-Starter-Check",
    desc: "In 2 Minuten zum persönlichen KI-Starter-Plan — kostenlos und unverbindlich.",
    href: "https://www.deutschlandgpt.de/ki-starter-check",
  },
];

export const CYBER_ERPRESSUNG_SOURCES = [
  { label: "Senatskanzlei Berlin", detail: "Offizielle Pressemitteilung Wegner & Spranger", href: "https://www.berlin.de/rbmskzl/aktuelles/pressemitteilungen/2026/pressemitteilung.1708208.php", badge: "Amtlich", primary: true },
  { label: "heise online", detail: "30 Bitcoin oder Leak – Ransomware-Bande erpresst Berlin", href: "https://www.heise.de/news/30-Bitcoin-oder-Leak-Ransomware-Bande-erpresst-Berlin-11434325.html", badge: "Security" },
  { label: "rbb24 (Politik)", detail: "Hacker fordern Millionen-Lösegeld in Bitcoin", href: "https://www.rbb24.de/politik/beitrag/2026/08/hacker-erpressen-land-berlin-bitcoin-millionen.html", badge: "Landespolitik" },
  { label: "DER SPIEGEL", detail: "Cyberangriff auf die Hauptstadt: Die Hacker fordern 30 Bitcoin", href: "https://www.spiegel.de/netzwelt/berlin-cyberangriff-auf-die-hauptstadt-die-hacker-fordern-30-bitcoin-a-54af015f-7f83-411a-a39c-8b7b05cff60a", badge: "Recherche" },
  { label: "Der Tagesspiegel", detail: "Notfallpläne und Passwörter erbeutet – Wegner weist Ultimatum zurück", href: "https://www.tagesspiegel.de/berlin/notfallplane-und-passworter-erbeutet-wegner-weist-erpresser-ultimatum-zuruck--hacker-fordern-laut-medienbericht-zwei-millionen-euro-15984600.html", badge: "Exklusiv" },
  { label: "Berliner Morgenpost", detail: "Gehackte Berliner Verwaltung: Senat bestätigt Erpressungsversuch", href: "https://www.morgenpost.de/berlin/article412989955/gehackte-berliner-verwaltung-senat-bestaetigt-erpressungsversuch.html", badge: "Hauptstadt" },
  { label: "DIE WELT", detail: "Erpresser verlangen zwei Millionen Euro Lösegeld", href: "https://www.welt.de/politik/deutschland/article6a919777b3df30a615529309/berliner-landesbehoerden-erpresser-verlangen-loesegeld-nach-hackerangriff-offenbar-zwei-millionen-euro-gefordert.html", badge: "Politik" },
  { label: "rbb24 Hintergrund", detail: "Hackerangriff auf Berliner Landesnetz: Chronologie & Notfallmaßnahmen", href: "https://www.rbb24.de/politik/beitrag/2026/08/berlin-hackerangriff-landesnetz-loesegeld-forderung-erpresser.html", badge: "Chronologie" },
];

export const IFA_BERLIN_SOURCES = [
  { label: "IFA Berlin", detail: "Offizielle Ticket- und Aussteller-Plattform 2026", href: "https://www.ifa-berlin.com/de/ticket-b2b", badge: "Messe", primary: true },
  { label: "IFA Hallenplan", detail: "Interaktiver Gelände- & Hallenplan 2026", href: "https://www.ifa-berlin.com/de/hallenplan", badge: "Gelände" },
];

export const BERLIN_WAHL_SOURCES = [
  { label: "rbb24 Sondierungs-Ticker", detail: "Rund-um-die-Uhr-Ticker zu Sondierungen & Reaktionen", href: "https://www.rbb24.de/politik/berlin-wahl-2026/beitraege/berlin-wahl-agh-bvv-stimmen-ergebnis-reaktionen-liveticker.html", badge: "Sondierung", primary: true },
  { label: "Amtl. Endergebnis (AGH)", detail: "4.114 von 4.114 Gebieten (100 %) ausgezählt", href: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/agh/index.html", badge: "100 %", primary: true },
  { label: "BVV-Ergebnisse 12 Bezirke", detail: "Amtliche Verteilung für alle Bezirksversammlungen", href: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/bvv/index.html", badge: "BVV 100 %" },
  { label: "rbb24 Koalitions-Optionen", detail: "Rechnerische Mehrheiten im 159-Sitze-Parlament", href: "https://www.rbb24.de/politik/berlin-wahl-2026/", badge: "Koalition" },
  { label: "Wahlbeteiligung Berlin", detail: "74,2 % Gesamtbeteiligung (Urne 44,1 % + Brief 30,1 %)", href: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/agh/index.html", badge: "74,2 %" },
  { label: "Landeswahlleiterin Berlin", detail: "Amtliche Bekanntmachungen & Statistiken", href: "https://www.berlin.de/wahlen/wahlen/berliner-wahlen-2026/", badge: "Amtlich" },
];

export const ARTICLES = [
  {
    cat: "Berlin Fokus",
    tickerTag: "KOALITIONSVERHANDLUNGEN",
    isElection: true,
    title: "Sondierungsabschluss im Roten Rathaus: Rot-Rot-Grün startet offizielle Koalitionsverhandlungen – Gewerbesteuer 410 % bleibt fix",
    excerpt:
      "Mit Beginn des 4. Quartals 2026 haben Die Linke, SPD und Bündnis 90/Die Grünen nach erfolgreichen Sondierungsgesprächen die Aufnahme formeller Koalitionsverhandlungen beschlossen (96 von 159 Sitzen). Das gemeinsame Sondierungspapier setzt Prioritäten für die Berliner Wirtschaft: Das 5-Milliarden-Defizit soll ohne Steuererhöhungen konsolidiert werden, der Gewerbesteuerhebesatz von 410 % wird garantiert und die Mittel für KI-, FinTech- und Verwaltungsdigitalisierung bleiben gesichert.",
    read: "4 Min",
    date: "01. Oktober 2026",
    source: { label: "rbb24 · Landespolitik", href: "https://www.rbb24.de/politik/berlin-wahl-2026/" },
    sources: BERLIN_WAHL_SOURCES,
    featured: true,
    highlight: {
      value: "Koalitionsfahrplan",
      compare: "96 Sitze R2G",
      label: "Rot-Rot-Grün einigt sich auf Sondierungspapier: Stabiler Hebesatz 410 % & Konsolidierung ohne Steuererhöhung.",
    },
  },
  {
    cat: "Bund & Steuer",
    tickerTag: "Q4 STEUER-COUNTDOWN",
    title: "Q4 2026 Steuerfahrplan: USt-Voranmeldung Frist 10. Oktober, Investitionsabzugsbetrag & Jahresend-Check",
    excerpt:
      "Mit dem 1. Oktober startet das Schlussquartal 2026: Bis zum 10. Oktober ist die Umsatzsteuer-Voranmeldung für September bzw. das III. Quartal fällig (mit Dauerfristverlängerung bis 10. November). Für Gründer und KMU wird es zudem Zeit, geplante Anschaffungen über den Investitionsabzugsbetrag (§ 7g EStG) liquiditätsschonend zu disponieren.",
    read: "5 Min",
    date: "01. Oktober 2026",
    source: { label: "Bundesfinanzministerium / ELSTER", href: "https://www.elster.de" },
    featured: false,
    highlight: {
      value: "Frist 10.10.2026",
      compare: "USt-Voranmeldung Q3",
      label: "Fälligkeiten, Fristverlängerung und IAB-Planung (§ 7g EStG) zum Start in das 4. Quartal.",
    },
  },
  {
    cat: "Bund & Steuer",
    tickerTag: "E-RECHNUNG 2027",
    title: "Noch 3 Monate bis zur Pflicht: BMF & Kammern veröffentlichen E-Rechnungs-Checkliste für den Mittelstand",
    excerpt:
      "Der Countdown läuft: Ab dem 1. Januar 2027 müssen inländische Betriebe mit mehr als 800.000 Euro Vorjahresumsatz B2B-Rechnungen obligatorisch als ZUGFeRD oder XRechnung versenden. Das BMF stellt klar: Reines PDF genügt nicht mehr; GoBD-konforme revisionssichere Archivierung und XML-Validierung müssen jetzt in ERP-Systeme integriert werden.",
    read: "5 Min",
    date: "30. September 2026",
    source: { label: "Bundesfinanzministerium · E-Rechnung", href: "https://www.bundesfinanzministerium.de" },
    featured: false,
    highlight: {
      value: "Noch 3 Monate",
      compare: "Stichtag 01.01.2027",
      label: "B2B-Pflicht für Betriebe über 800.000 € Umsatz: ERP-Systeme jetzt rechtssicher umstellen.",
    },
  },
  {
    cat: "FinTech & KI",
    tickerTag: "KI-REALLABOR",
    title: "Bundesnetzagentur startet erste Pilotkohorte im KI-Reallabor: Berliner Start-ups testen Agentensysteme",
    excerpt:
      "Mit Beginn des Oktobers 2026 nimmt das regulatorische KI-Reallabor der Bundesnetzagentur nach dem KI-MIG die ersten Praxistests auf. Kleine und mittlere Berliner Start-ups evaluieren generative Sprachmodelle und KI-Agenten auf Konformität mit Art. 50 und Sicherheitsstandards des EU AI Act unter behördlicher Begleitung.",
    read: "4 Min",
    date: "01. Oktober 2026",
    source: { label: "Bundesnetzagentur / BMDS", href: "https://bmds.bund.de/themen/kuenstliche-intelligenz" },
    featured: false,
    highlight: {
      value: "Pilotkohorte Q4",
      compare: "KI-MIG Reallabor",
      label: "Rechtssichere Praxiserprobung autonomer Agentensysteme im Berliner FinTech-Sektor.",
    },
  },
  {
    cat: "Berlin Fokus",
    tickerTag: "SONDIERUNGSRUNDE 2",
    isElection: true,
    title: "Sondierungsgespräche im Roten Rathaus vertieft: Arbeitsgruppen beraten über 5-Milliarden-Sparkurs und Standort-Investitionen",
    excerpt:
      "Eine Woche nach der Wahl zum Berliner Abgeordnetenhaus vertiefen Die Linke, SPD und Bündnis 90/Die Grünen ihre Sondierungsgespräche über ein rot-rot-grünes Regierungsbündnis (96 von 159 Sitzen). Im Fokus der Finanz-Arbeitsgruppe steht der Abbau des prognostizierten strukturellen Defizits von rund 5 Milliarden Euro pro Jahr. Wirtschafts- und Gründerverbände fordern, Investitionen in Bildung, Digitalisierung und den FinTech-Hub Berlin trotz Sparzwang zu sichern.",
    read: "4 Min",
    date: "28. September 2026",
    source: { label: "rbb24 · Politik", href: "https://www.rbb24.de/politik/berlin-wahl-2026/" },
    sources: BERLIN_WAHL_SOURCES,
    featured: false,
    highlight: {
      value: "5 Mrd. € Konsolidierung",
      compare: "Sondierungsrunde 2",
      label: "Rot-Rot-Grün verhandelt im Roten Rathaus über Investitionspfade und Budgetausgleich.",
    },
  },
  {
    cat: "Bund & Steuer",
    tickerTag: "E-RECHNUNG 2027",
    title: "BMF konkretisiert Praxishinweise zur E-Rechnung: So bereiten Berliner KMU ZUGFeRD und XRechnung für 2027 vor",
    excerpt:
      "Das Bundesfinanzministerium hat ergänzende technische Leitlinien und Validierungsregeln zur obligatorischen B2B-E-Rechnung publiziert. Ab dem 1. Januar 2027 müssen Unternehmen mit mehr als 800.000 Euro Vorjahresumsatz elektronische Rechnungen im strukturierten XML-Format ausstellen. Das BMF stellt klar: Reines PDF genügt nicht mehr; GoBD-konforme revisionssichere Archivierung ist zwingend.",
    read: "5 Min",
    date: "28. September 2026",
    source: { label: "Bundesfinanzministerium · E-Rechnung", href: "https://www.bundesfinanzministerium.de" },
    featured: false,
    highlight: {
      value: "ZUGFeRD & XRechnung",
      compare: "Stichtag 01.01.2027",
      label: "Strukturierte XML-Datensätze nach EN 16931 werden verbindlich für Vorsteuerabzug.",
    },
  },
  {
    cat: "FinTech & KI",
    tickerTag: "KI-REALLABOR",
    title: "Bundesnetzagentur startet Pilot-Reallabor für KMU: Praxistests unter den Vorgaben des EU AI Act",
    excerpt:
      "Die Bundesnetzagentur als nationale Marktüberwachungsbehörde nach dem KI-MIG hat das Anmeldeportal für das erste regulatorische KI-Reallabor geöffnet. Kleine und mittlere Berliner Start-ups können ihre generativen KI-Modelle und Agentensysteme in einer kontrollierten Umgebung auf Konformität mit Art. 50 und Sicherheitsstandards testen.",
    read: "4 Min",
    date: "27. September 2026",
    source: { label: "Bundesnetzagentur / BMDS", href: "https://bmds.bund.de/themen/kuenstliche-intelligenz" },
    featured: false,
    highlight: {
      value: "KI-MIG Reallabor",
      compare: "KMU & Start-ups",
      label: "Rechtssichere Erprobung generativer Systeme und Agentenmodelle vor dem Rollout.",
    },
  },
  {
    cat: "Berlin Fokus",
    tickerTag: "HEBESATZ 410 %",
    isElection: true,
    title: "IHK-Standortumfrage nach der Wahl: Mittelstand mahnt Verlässlichkeit bei Gewerbesteuer und Genehmigungen an",
    excerpt:
      "In einem gemeinsamen Positionspapier zur anstehenden Senatsbildung fordern Berliner Kammern und Wirtschaftsverbände ein Moratorium für Steuererhöhungen. Der Berliner Gewerbesteuerhebesatz von 410 % dürfe nicht angetastet werden, um die Wettbewerbsfähigkeit des Standorts gegenüber dem Umland zu sichern. Zudem wird eine Beschleunigung digitaler Bauanträge gefordert.",
    read: "4 Min",
    date: "26. September 2026",
    source: { label: "IHK Berlin · Standort", href: "https://www.ihk.de/berlin" },
    featured: false,
    highlight: {
      value: "410 % Hebesatz",
      compare: "Standortgarantie",
      label: "Wirtschaft fordert Verzicht auf Abgabenerhöhungen und konsequenten Bürokratieabbau.",
    },
  },
  {
    cat: "Cybersecurity",
    tickerTag: "NIS-2 PFLICHTEN",
    title: "NIS-2-Fahrplan für Berliner IT- und Finanzdienstleister: Was Geschäftsleitungen jetzt umsetzen müssen",
    excerpt:
      "Mit dem herannahenden Inkrafttreten der NIS-2-Pflichten verschärft sich die persönliche Haftung der Unternehmensführung bei IT-Sicherheitsverstößen. Das BSI empfiehlt Betrieben, Risikomanagementprozesse zu auditieren, Zwei-Faktor-Authentifizierung für Buchhaltungssysteme zu erzwingen und Vorfall-Meldewege mit 24h-Frist zu etablieren.",
    read: "5 Min",
    date: "25. September 2026",
    source: { label: "BSI · Cyber-Sicherheitslage", href: "https://www.bsi.bund.de" },
    featured: false,
    highlight: {
      value: "24h-Meldefrist",
      compare: "Geschäftsleiterhaftung",
      label: "Strengere Cyber-Sicherheitsstandards und Nachweispflichten für B2B-Dienstleister.",
    },
  },
  {
    cat: "Berlin Fokus",
    tickerTag: "AMTLICHES ENDERGEBNIS",
    isElection: true,
    title: "Berlin-Wahl 2026: Vorläufiges amtliches Endergebnis zu 100 % ausgezählt – Sondierungsgespräche im Roten Rathaus starten",
    excerpt:
      "Mit allen 4.114 von 4.114 ausgezählten Gebieten für das Abgeordnetenhaus und die 12 BVVs steht das Ergebnis fest: Die Linke triumphiert mit 25,7 % (48 Sitze), CDU folgt mit 18,8 % (34 Sitze), AfD mit 16,3 % (29 Sitze), Grüne mit 14,3 % (26 Sitze) und SPD mit 12,1 % (22 Sitze). BSW (4,7 %) und FDP (2,5 %) scheitern an der 5%-Klausel (0 Sitze). Rot-Rot-Grün verfügt mit 96 von 159 Sitzen über eine deutliche Regierungsmehrheit; erste Sondierungsgespräche sind im Roten Rathaus angelaufen.",
    read: "4 Min",
    date: "22. September 2026",
    source: { label: "Landeswahlleiterin Berlin / rbb24", href: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/agh/index.html" },
    sources: BERLIN_WAHL_SOURCES,
    featured: false,
    highlight: {
      value: "100,0 %",
      compare: "4.114 Gebiete",
      label: "Linke stärkste Kraft (48 Sitze) · BSW/FDP verpassen AGH · Rot-Rot-Grün mit 96 Sitzen.",
    },
  },
  {
    cat: "Berlin Fokus",
    tickerTag: "WIRTSCHAFT & STEUERN",
    isElection: true,
    title: "Berliner Wirtschaft nach der Wahl: IHK und Verbände fordern Investitionsoffensive und stabilen Hebesatz",
    excerpt:
      "Nach der Abgeordnetenhauswahl richten Berliner Wirtschaftsverbände und die IHK klare Erwartungen an künftige Koalitionsverhandlungen: Verlässliche Rahmenbedingungen für Start-ups, beschleunigte Verwaltungsprozesse bei Gewerbeanmeldungen und die Beibehaltung des Gewerbesteuer-Hebesatzes bei 410 %.",
    read: "3 Min",
    date: "22. September 2026",
    source: { label: "IHK Berlin", href: "https://www.ihk.de/berlin" },
    featured: false,
    highlight: {
      value: "410 %",
      compare: "Gewerbesteuer Berlin",
      label: "Verlässliche Besteuerung & Bürokratieabbau stehen im Fokus der anstehenden Koalitionsverhandlungen.",
    },
  },
  {
    cat: "Berlin Fokus",
    tickerTag: "SONDIERUNGEN",
    isElection: true,
    title: "Sondierungsgespräche im Roten Rathaus starten: Rot-Rot-Grün und Schwarz-Rot im Sondierungspoker",
    excerpt:
      "Nach der Abgeordnetenhauswahl nehmen die Parteien im Roten Rathaus erste Sondierungsgespräche auf. Rot-Rot-Grün (96 Sitze) gilt rechnerisch als stabilste Option, während CDU und SPD über Schnittmengen bei Wirtschaft und Finanzen beraten. Im Mittelpunkt stehen der Sparkurs 2027 und die Besetzung des Finanzsenats.",
    read: "4 Min",
    date: "22. September 2026",
    source: { label: "rbb24 · Politik", href: "https://www.rbb24.de/politik/berlin-wahl-2026/" },
    featured: false,
    highlight: {
      value: "96 Sitze R2G",
      compare: "Sondierungsstart",
      label: "Parteien sondieren im Roten Rathaus; Haushaltskonsolidierung steht ganz oben auf der Agenda.",
    },
  },
  {
    cat: "Berlin Fokus",
    tickerTag: "HAUSHALT 2027",
    isElection: true,
    title: "Berliner Haushalt 2027: Landesrechnungshof mahnt strikte Schuldenbremse und strukturelle Einsparungen an",
    excerpt:
      "Die nächste Landesregierung steht vor massiven Budget-Herausforderungen: Der Landesrechnungshof beziffert die Finanzierungslücke bis 2029 auf rund fünf Milliarden Euro pro Jahr. Wirtschaftsverbände fordern, Investitionen in digitale Infrastruktur und Schulen dennoch zu priorisieren.",
    read: "4 Min",
    date: "22. September 2026",
    source: { label: "rbb24 · Finanzen", href: "https://www.rbb24.de/politik/beitrag/2026/08/haushalt-berlin-finanzsenat.html" },
    featured: false,
    highlight: {
      value: "5 Mrd. € Defizit",
      compare: "Landesrechnungshof",
      label: "Künftiger Senat muss strukturelles Defizit abbauen – ohne Innovationsbremse für Start-ups.",
    },
  },
  {
    cat: "FinTech & KI",
    tickerTag: "START-UP HUB",
    title: "Bitkom & Start-up Verband: Berlin behauptet Spitzenplatz bei KI- und FinTech-Finanzierungen",
    excerpt:
      "Der aktuelle Digital-Index bestätigt Berlin als unangefochtenes Zentrum für künstliche Intelligenz und Finanztechnologie in Deutschland: Über 45 % des deutschen Wagniskapitals für B2B-SaaS und Prozess-KI fließen in die Hauptstadt. Gefordert werden beschleunigte Visaprozesse für internationale Tech-Talente.",
    read: "4 Min",
    date: "22. September 2026",
    source: { label: "Bitkom · Startup-Index", href: "https://www.bitkom.org" },
    featured: false,
    highlight: {
      value: "45 % Venture Capital",
      compare: "Berlin Tech Hub",
      label: "Hauptstadt bleibt europäische Hochburg für FinTech, TaxTech und angewandte KI-Modelle.",
    },
  },
  {
    cat: "Bund & Steuer",
    tickerTag: "E-RECHNUNG B2B",
    title: "B2B-E-Rechnungspflicht 2026: ZUGFeRD, XRechnung und die Auswirkungen auf den Vorsteuerabzug",
    excerpt:
      "Die Umsetzungsfristen für die obligatorische elektronische Rechnung im inländischen B2B-Verkehr rücken näher. Unternehmen müssen sicherstellen, dass ihre Systeme strukturierte XML-Datensätze nach der europäischen Norm EN 16931 empfangen, verarbeiten und GoBD-konform archivieren können.",
    read: "5 Min",
    date: "21. September 2026",
    source: { label: "Bundesfinanzministerium · E-Rechnung", href: "https://www.bundesfinanzministerium.de" },
    featured: false,
    highlight: {
      value: "EN 16931",
      compare: "B2B-Standard",
      label: "ZUGFeRD & XRechnung werden verbindlich: Warum Papierrechnungen und reine PDFs auslaufen.",
    },
  },
  {
    cat: "Cybersecurity",
    tickerTag: "NIS-2 & BSI",
    title: "BSI warnt vor gezielten Phishing-Wellen gegen ERP- & Buchhaltungs-Tools: NIS-2-Pflichten greifen",
    excerpt:
      "Das Bundesamt für Sicherheit in der Informationstechnik registriert eine Zunahme automatisierter Angriffe auf Schnittstellen zur Finanzbuchhaltung. Betroffene Betriebe und IT-Dienstleister müssen nach NIS-2 strengere Incident-Reporting-Fristen und technische Mindeststandards einhalten.",
    read: "4 Min",
    date: "21. September 2026",
    source: { label: "BSI · Cyber-Sicherheitslage", href: "https://www.bsi.bund.de" },
    featured: false,
    highlight: {
      value: "24h-Meldefrist",
      compare: "NIS-2 Richtlinie",
      label: "Strengere Cyber-Sicherheitsanforderungen für digitale Dienstleister und Finanzprozesse.",
    },
  },
  {
    cat: "Bund & Steuer",
    tickerTag: "LIQUIDITÄT",
    title: "Dauerfristverlängerung USt 2026: Ein Monat Puffer für Berliner Gründer und Dienstleister",
    excerpt:
      "Mit der Dauerfristverlängerung über ELSTER verschaffen sich Unternehmerinnen und Unternehmer 30 Tage zusätzlichen Spielraum für die Umsatzsteuer-Voranmeldung und Liquiditätsplanung. Welche Sondervorauszahlung bei Monatszahlern anfällt und wie Dauerfristverlängerungen formal beantragt werden.",
    read: "3 Min",
    date: "20. September 2026",
    source: { label: "ELSTER · Formulare", href: "https://www.elster.de" },
    featured: false,
    highlight: {
      value: "+30 Tage Frist",
      compare: "Liquiditätshebel",
      label: "Zusätzliche Zeit für Rechnungsprüfung und Umsatzsteuer-Meldung rechtssicher sichern.",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "Berlin-Neukölln: BVG-Bus prallt gegen Baum – 15 Menschen verletzt",
    excerpt:
      "Schwerer Unfall in Neukölln: Am späten Samstagabend kam ein BVG-Bus der Linie M46 auf der Fulhamer Allee in Britz von der Fahrbahn ab und prallte frontal gegen einen Baum. 15 Menschen wurden verletzt, sieben von ihnen mussten stationär im Krankenhaus behandelt werden. Die Feuerwehr befreite einen eingeklemmten Fahrgast mit schwerem Gerät.",
    read: "3 Min",
    date: "13. September 2026",
    source: { label: "rbb24 · Panorama", href: "https://www.rbb24.de/panorama/beitrag/2026/09/berlin-neukoelln-bvg-busunfall-verletzte.html" },
    featured: false,
    highlight: {
      value: "15 Verletzte",
      compare: "BVG-Unfall Britz",
      label: "M46-Bus auf Fulhamer Allee gegen Baum geprallt – Großeinsatz von Feuerwehr und Polizei.",
    },
  },

  {
    cat: "Berlin Fokus",
    tickerTag: "KANDIDATEN",
    isElection: true,
    title: "Rotes Rathaus 2026: Wahlprogramme & Spitzenkandidaten von CDU, SPD, Grünen, Linke & AfD im Dossier",
    excerpt:
      "Wer regiert Berlin ab Herbst? Das HERO Tax Dossier fasst die wirtschafts-, steuer- und digitalpolitischen Pläne der Berliner Parteien kompakt zusammen — inklusive direkter Links zu den offiziellen Wahlprogrammen.",
    read: "6 Min",
    date: "06. September 2026",
    source: { label: "HERO Tax · Wahlradar 2026", href: "https://www.rbb24.de/politik/berlin-wahl-2026/" },
    featured: false,
    highlight: {
      value: "5 Programme",
      compare: "Parteien-Dossier",
      label: "Wirtschafts-, KI- und Finanzpläne der Berliner Spitzenkandidaten im Vergleich.",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "IFA Berlin 2026: Weltleitmesse für Consumer Electronics, Smart Living & AI am Berliner Funkturm",
    excerpt:
      "Vom 4. bis 8. September 2026 versammelt die IFA die globale Tech-Branche in Berlin. 102 Jahre nach der ersten Funkausstellung stehen Agentic AI im Smart Home, europäische Startup-Innovationen im IFA NEXT Hub und nachhaltige Elektronik im Mittelpunkt.",
    read: "4 Min",
    date: "03. September 2026",
    source: { label: "IFA Berlin · Offizielle Messe-Plattform", href: "https://www.ifa-berlin.com/de/ticket-b2b" },
    sources: IFA_BERLIN_SOURCES,
    featured: false,
    highlight: {
      value: "4.–8. Sept 2026",
      compare: "IFA Berlin 2026",
      label: "Weltleitmesse für Consumer Tech & IFA NEXT Innovation Hub an der Messe Berlin.",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "Ransomware-Bande „Rhysida“ erpresst Berlin: Senat weist Lösegeldforderung über 30 Bitcoin entschieden zurück",
    excerpt:
      "Nach dem schwerwiegenden Cyberangriff auf das Berliner Landesnetz verlangt die Hackergruppe „Rhysida“ 30 Bitcoin (rund 2 Millionen Euro) und droht mit Daten-Leaks im Darknet. Der Regierende Bürgermeister Kai Wegner und Innensenatorin Iris Spranger stellen unmissverständlich klar: Berlin zahlt kein Lösegeld. BKA, LKA und BSI ermitteln unter Hochdruck.",
    read: "5 Min",
    date: "29. August 2026",
    image: "https://pbs.twimg.com/media/HQ0agsDW0AAlTuN.jpg",
    imageAlt: "Innensenatorin Iris Spranger (links) und Regierender Bürgermeister Kai Wegner (rechts) bei der Stellungnahme",
    imageCaption: "Iris Spranger & Kai Wegner · Offizielle Stellungnahme zur Ransomware-Erpressung",
    imageSource: {
      label: "Foto: © Senatskanzlei Berlin via X (@RegBerlin)",
      href: "https://x.com/RegBerlin/status/2093358558603551024/photo/1",
    },
    source: { label: "Senatskanzlei Berlin · Pressemitteilung", href: "https://www.berlin.de/rbmskzl/aktuelles/pressemitteilungen/2026/pressemitteilung.1708208.php" },
    sources: CYBER_ERPRESSUNG_SOURCES,
    featured: false,
    highlight: {
      value: "30 Bitcoin",
      compare: "Erpressungsversuch",
      label: "Senat weist Lösegeldforderung von 2 Mio. € zurück: „Berlin lässt sich nicht erpressen.“",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "Cyber-Forensik im Landesnetz: Ermittler analysieren Sicherheitslücke – Notfallpläne und Server isoliert",
    excerpt:
      "Spezialisten für Incident Response und IT-Forensik sichern die Systeme der Senatsverwaltungen für Bauen und Mobilität. BKA und LKA prüfen das Ausmaß des Datenabflusses. Sicherheitskontrollen im gesamten Landesnetz wurden verschärft, um weitere Zugriffe der Ransomware-Gruppe abzuwehren.",
    read: "4 Min",
    date: "29. August 2026",
    source: { label: "Tagesspiegel · Exklusivbericht", href: "https://www.tagesspiegel.de/berlin/notfallplane-und-passworter-erbeutet-wegner-weist-erpresser-ultimatum-zuruck--hacker-fordern-laut-medienbericht-zwei-millionen-euro-15984600.html" },
    featured: false,
    highlight: {
      value: "IT-Forensik",
      compare: "BKA & LKA Einsatz",
      label: "Systeme der Fachverwaltungen isoliert; Notfallmaßnahmen im Landesnetz aktiv.",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "Auswirkungen auf Bürgerdienste: Bezirke arbeiten an Notfalllösungen für Wohngeld und Anträge",
    excerpt:
      "Die Trennung der Senatsverwaltungen vom Landesnetz führt zu anhaltenden Einschränkungen bei WBS-Anträgen, Geodaten und der Wohngeldauszahlung für über 50.000 Berliner Haushalte. Bezirke wie Steglitz-Zehlendorf bereiten alternative Antragsportale und manuelle Auszahlungswege vor.",
    read: "4 Min",
    date: "28. August 2026",
    source: { label: "Berliner Morgenpost · Verwaltung", href: "https://www.morgenpost.de/berlin/article412989955/gehackte-berliner-verwaltung-senat-bestaetigt-erpressungsversuch.html" },
    featured: false,
    highlight: {
      value: "50.000 Haushalte",
      compare: "Notbetrieb Bezirke",
      label: "Ausweichlösungen für Bürgerdienste und Sozialleistungen in Vorbereitung.",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "Fliegerbombe in Neukölln erfolgreich entschärft: 5.600 Haushalte evakuiert & Sperrkreis aufgehoben",
    excerpt:
      "Im Neuköllner Schifffahrtskanal wurde am späten Mittwochabend eine 100 kg schwere Weltkriegsbombe erfolgreich entschärft. Rund 5.600 Haushalte mussten vorübergehend evakuiert werden. Nach der Trennung des Zünders per Wasserstrahlschneider konnten die Anwohner am späten Abend zurück in ihre Wohnungen.",
    read: "4 Min",
    date: "26. August 2026",
    source: { label: "rbb24 · Panorama", href: "https://www.rbb24.de/panorama/beitrag/2026/08/berlin-neukoelln-entschaerfung-bombe-sperrkreis.html" },
    featured: false,
    highlight: {
      value: "Entschärft",
      compare: "Neukölln Sperrkreis",
      label: "5.600 Haushalte evakuiert – Kampfmittelräumdienst beendet Einsatz erfolgreich.",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "Wahl-O-Mat Berlin 2026: Parteienvergleich online auf wahl-o-mat.de verfügbar",
    excerpt:
      "Die Bundeszentrale für politische Bildung (bpb) hat den Wahl-O-Mat zur Berliner Abgeordnetenhauswahl 2026 freigeschaltet. 38 Thesen ermöglichen allen 2,4 Millionen Wahlberechtigten den direkten Parteienvergleich vor dem Wahltag am 20. September.",
    read: "4 Min",
    date: "24. August 2026",
    source: { label: "bpb · Wahl-O-Mat Berlin 2026", href: "https://www.wahl-o-mat.de/berlin2026/" },
    featured: false,
    highlight: {
      value: "Wahl-O-Mat",
      compare: "38 Thesen online",
      label: "Offizieller Parteienvergleich zur Wahl zum Berliner Abgeordnetenhaus.",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "Berliner Wahlen 2026: Wahl zum Abgeordnetenhaus (AGH) & den 12 Bezirksverordnetenversammlungen (BVV)",
    excerpt:
      "Am Sonntag, 20. September 2026, wählen die Berlinerinnen und Berliner das Abgeordnetenhaus von Berlin (AGH) sowie die 12 Bezirksverordnetenversammlungen (BVV). Alle offiziellen Termine, Wahlberechtigungen ab 16 Jahren und Briefwahl-Infos im Überblick.",
    read: "5 Min",
    date: "18. August 2026",
    source: { label: "Landeswahlleiterin Berlin · Offizielle Wahlseite 2026", href: "https://www.berlin.de/wahlen/wahlen/berliner-wahlen-2026/" },
    featured: false,
    highlight: {
      value: "20.09.2026",
      compare: "Wahl zum AGH & BVV",
      label: "Offizieller Wahltag in ganz Berlin für das Abgeordnetenhaus (AGH) und alle 12 Bezirke (BVV).",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "Briefwahl läuft auf Hochtouren: Online-Antrag per QR-Code, Frist bis 18. September, 15 Uhr",
    excerpt:
      "Die Briefwahl zur Wahl am 20. September 2026 läuft seit dem 10. August — online per QR-Code der Wahlbenachrichtigung oder postalisch. Anträge nimmt das Bezirkswahlamt bis Freitag, 18. September 2026, 15:00 Uhr an; ausgefüllte Unterlagen müssen bis Sonntag, 20. September, 18:00 Uhr vorliegen.",
    read: "4 Min",
    date: "18. August 2026",
    source: { label: "Landeswahlleiterin Berlin · Start der Briefwahl", href: "https://www.berlin.de/wahlen/pressemitteilungen/2026/pressemitteilung.1701223.php" },
    highlight: {
      value: "18.09.2026",
      compare: "15:00 Uhr · Antragsschluss",
      label: "Letzter Termin für den Antrag auf Briefwahlunterlagen beim Bezirkswahlamt.",
    },
  },
  {
    cat: "Berlin Fokus",
    title: "2,4 Millionen Wahlbenachrichtigungen: Zustellung im Endspurt bis spätestens 30. August 2026",
    excerpt:
      "Der Großteil der rund 2,4 Millionen Wahlbenachrichtigungen für AGH und BVV ist in Zustellung. Wer bis 30. August keine Benachrichtigung erhält, sollte das örtliche Wahlamt kontaktieren.",
    read: "3 Min",
    date: "17. August 2026",
    source: { label: "Landeswahlleiterin Berlin · Pressemitteilungen 2026", href: "https://www.berlin.de/wahlen/pressemitteilungen/2026/" },
  },
  {
    cat: "Bund & Steuer",
    title: "E-Rechnungspflicht: Übergangsfrist endet am 31.12.2026 — ab 2027 wird es für viele ernst",
    excerpt:
      "Wer 2026 mehr als 800.000 € Vorjahresumsatz hatte, muss B2B-Rechnungen ab dem 01.01.2027 im strukturierten Format (XRechnung / ZUGFeRD) ausstellen. Das BMF-Schreiben präzisiert die Anforderungen. Ab 2028 gilt die Pflicht flächendeckend.",
    read: "5 Min",
    highlight: {
      value: "01.01.2027",
      compare: "> 800.000 € Vorjahresumsatz",
      label: "Ab diesem Stichtag müssen betroffene Unternehmen B2B-Rechnungen strukturiert ausstellen.",
    },
    date: "18. August 2026",
    source: { label: "Bundesfinanzministerium · BMF-Schreiben Umsatzsteuer", href: "https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Umsatzsteuer/BMF_Schreiben_Allgemeines/bmf_schreiben_allgemeines.html" },
  },
  {
    cat: "Bund & Steuer",
    title: "KI-Aufsicht in Deutschland steht: Bundesnetzagentur überwacht seit 29. Juli den KI-Markt",
    excerpt:
      "Das KI-Marktüberwachungs- und Innovationsförderungsgesetz (KI-MIG) ist in Kraft. Zentrale Aufsichtsbehörde ist die Bundesnetzagentur — mit KI-Service-Desk und Reallabor speziell für KMU und Start-ups.",
    read: "4 Min",
    date: "16. August 2026",
    source: { label: "BMDS · Gesetz zur Durchführung der KI-Verordnung", href: "https://bmds.bund.de/service/gesetzgebungsverfahren/gesetz-zur-durchfuehrung-der-ki-verordnung" },
  },
  {
    cat: "Bund & Steuer",
    title: "Digital Omnibus: Hochrisiko-Pflichten des EU AI Act auf Dezember 2027 verschoben",
    excerpt:
      "Die Verordnung (EU) 2026/1744 gilt. Pflichten für Hochrisiko-KI nach Anhang III greifen erst ab 02.12.2027. Unverändert in Kraft seit 02.08.2026: die Transparenzpflicht nach Art. 50.",
    read: "4 Min",
    date: "15. August 2026",
    source: { label: "EUR-Lex · Verordnung (EU) 2024/1689 (KI-VO)", href: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" },
  },
  {
    cat: "Bund & Steuer",
    title: "Steuerliche Behandlung von KI-Tools & SaaS: Sofortaufwand statt Abschreibung nach BMF-Richtlinien",
    excerpt:
      "Abonnements für Cloud-basierte KI-Modelle, Buchhaltungs-SaaS und Entwickler-Tools stellen sofort abzugsfähige Betriebsausgaben dar. Wie Berliner Unternehmen monatliche und jährliche Software-Lizenzen steuerlich optimal verbuchen und Vorsteuer korrekt geltend machen.",
    read: "4 Min",
    date: "14. August 2026",
    source: { label: "Bundesfinanzministerium · Software-AfA", href: "https://www.bundesfinanzministerium.de" },
  },
  {
    cat: "Berlin Fokus",
    title: "Wahlvorschläge zugelassen: 21 Parteien treten mit Landes- oder Bezirkslisten an",
    excerpt:
      "Die Frist zur Einreichung der Wahlvorschläge endete am 14. Juli 2026 um 18 Uhr. Über die Zulassung entschieden die Bezirkswahlausschüsse am 22. Juli und der Landeswahlausschuss am 24. Juli 2026. Insgesamt reichten 21 Parteien Landes- oder Bezirkslisten ein.",
    read: "3 Min",
    date: "24. Juli 2026",
    source: { label: "Landeswahlleiterin Berlin · Wahlvorschläge", href: "https://www.berlin.de/wahlen/wahlen/berliner-wahlen-2026/wahlvorschlaege/artikel.1600254.php" },
  },
  {
    cat: "Berlin Fokus",
    title: "Erstwahlrecht ab 16 Jahren: Wer bei den Berliner Wahlen 2026 wahlberechtigt ist",
    excerpt:
      "Wahlberechtigt für das Abgeordnetenhaus von Berlin sind alle Deutschen ab 16 Jahren mit Hauptwohnsitz in Berlin seit mind. 3 Monaten. Bei den BVV-Wahlen dürfen auch EU-Bürgerinnen und EU-Bürger ab 16 Jahren abstimmen.",
    read: "3 Min",
    date: "12. August 2026",
    source: { label: "Landeswahlleiterin Berlin · Allgemeine Informationen", href: "https://www.berlin.de/wahlen/wahlen/berliner-wahlen-2026/allgemeine-informationen/artikel.1578239.php" },
  },
  {
    cat: "Bund & Steuer",
    title: "Steuerentlastungen 2026 in der Praxis: 7 % Gastro-Umsatzsteuer & 38 Cent Pendlerpauschale",
    excerpt:
      "Seit dem 01.01.2026 gilt für Speisen in der Gastronomie dauerhaft der ermäßigte Steuersatz von 7 % (Getränke bleiben bei 19 %), und die Entfernungspauschale liegt bei 38 Cent ab dem ersten Kilometer. Für Kalkulation, Kassensystem und Reisekostenabrechnung heißt das: Stammdaten prüfen.",
    read: "4 Min",
    date: "10. August 2026",
    source: { label: "Gesetze im Internet (§ 12 UStG)", href: "https://www.gesetze-im-internet.de/ustg_1980/__12.html" },
  },
  {
    cat: "Berlin Fokus",
    title: "Wahlrecht für EU-Unionsbürger: Stimmabgabe für die Bezirksverordnetenversammlung (BVV)",
    excerpt:
      "Staatsangehörige anderer EU-Mitgliedstaaten, die seit mindestens drei Monaten in Berlin gemeldet sind, sind für die Bezirksverordnetenversammlung (BVV) in ihrem Bezirk wahlberechtigt.",
    read: "3 Min",
    date: "09. August 2026",
    source: { label: "Landeswahlleiterin Berlin · EU-Unionsbürger", href: "https://www.berlin.de/wahlen/wahlen/berliner-wahlen-2026/unionsbuerger/artikel.1600483.php" },
  },
  {
    cat: "Bund & Steuer",
    title: "Umsatzsteuer-Voranmeldung: Dauerfristverlängerung & ELSTER-Vereinfachungen 2026",
    excerpt: "Ein Formular, 30 Tage mehr Liquiditäts- und Fristenspielraum. Warum viele Gründer diesen Hebel noch immer ungenutzt lassen.",
    read: "3 Min",
    date: "08. August 2026",
    source: { label: "ELSTER", href: "https://www.elster.de" },
  },
  {
    cat: "Berlin Fokus",
    title: "Geoportal Berlin & Geoportal.de: Digitale Geodaten, Open Data & Wahlgebiete 2026 online",
    excerpt:
      "Die Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen stellt über das Geoportal Berlin und Geoportal.de 3D-Stadtmodelle, Bau- & Flächennutzungsdaten sowie die Wahlgebietseinteilung 2026 als Open Data bereit.",
    read: "4 Min",
    date: "07. August 2026",
    source: { label: "Senatsverwaltung für Stadtentwicklung Berlin · Geodaten", href: "https://www.berlin.de/sen/stadt/stadtdaten/geodaten-berlin/aktuelles-newsletter/" },
  },
  {
    cat: "Berlin Fokus",
    title: "Gewerbeanmeldung online in Berlin: Einheitlicher Ansprechpartner beschleunigt Gründungsprozesse",
    excerpt:
      "Über das Wirtschaftsportal Berlin und den Einheitlichen Ansprechpartner (EA Berlin) können Gewerbeanmeldungen, Erlaubnisanträge und Registereintragungen digital abgewickelt werden. Das spart Gründerinnen und Gründern Amtswege und verkürzt Bearbeitungszeiten bei den Berliner Bezirksämtern.",
    read: "4 Min",
    date: "06. August 2026",
    source: { label: "Wirtschaftsportal Berlin · EA Berlin", href: "https://www.berlin.de/ea/" },
  },
  {
    cat: "Bund & Steuer",
    title: "Kleinunternehmerregelung § 19 UStG: Inlands-Schwellen und EU-weite Befreiung",
    excerpt:
      "Im Inland gilt die Regelung bis 25.000 € Vorjahresumsatz und 100.000 € im laufenden Jahr. Über die EU-Kleinunternehmerregelung ist zusätzlich eine grenzüberschreitende Befreiung bis 100.000 € Unionsumsatz möglich. Wann sich das lohnt — und wann die Regelbesteuerung besser ist.",
    read: "4 Min",
    date: "05. August 2026",
    source: { label: "Gesetze im Internet (§ 19 UStG)", href: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
  },
];
