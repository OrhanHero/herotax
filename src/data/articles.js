/* ── CONTENT-DATEN (CMS-ready: Arrays → API-Fetch) ─────────────── */

export const AI_ARTICLES = [
  {
    title: "KI-gestützte Belegverarbeitung: Vom Schuhkarton zum Echtzeit-Reporting",
    excerpt:
      "OCR- und Kategorisierungs-Modelle nehmen der Buchhaltung einen Großteil der Handarbeit ab. Welche Workflows sich für Solo-Gründer und Berliner KMUs lohnen — und wo menschliche Kontrolle Pflicht bleibt.",
    read: "7 Min",
    date: "08. August 2026",
    source: { label: "IHK Berlin — Digitalisierung", href: "https://www.ihk.de/berlin" },
    tag: "Automatisierung",
  },
  {
    title: "Risikomanagementsysteme im Finanzamt: So prüft der Algorithmus deine Erklärung",
    excerpt:
      "Nach § 88 Abs. 5 AO dürfen Finanzämter automationsgestützte Systeme zur Fallauswahl einsetzen. Was das für Abgabe-Qualität, Vorsteuer-Abzug und Plausibilität deiner Zahlen bedeutet.",
    read: "5 Min",
    date: "05. August 2026",
    source: { label: "§ 88 Abs. 5 AO — Gesetze im Internet", href: "https://www.gesetze-im-internet.de/ao_1977/__88.html" },
    tag: "Steuerverwaltung",
  },
  {
    title: "Prozess-Intelligence: Monatsabschluss in 2 Stunden statt 2 Tagen",
    excerpt:
      "Ein wiederholbarer Ablauf aus Bank-Sync, GoBD-konformer Ablage und KI-Vorkontierung. Der Effizienz-Blueprint zum Nachbauen für moderne Gründer:innen.",
    read: "6 Min",
    date: "03. August 2026",
    source: { label: "Bundesfinanzministerium — GoBD", href: "https://www.bundesfinanzministerium.de" },
    tag: "Effizienz",
  },
];

/** KI-Sicherheit & Regulierung — offizielle Meldungen des BMDS
    (Bundesministerium für Digitales und Staatsmodernisierung). */
export const BMDS_ITEMS = [
  {
    title: "Neues KI-Gesetz tritt in Kraft (KI-MIG)",
    text: "Das KI-Marktüberwachungs- und Innovationsgesetz (KI-MIG) regelt verbindlich, wie der EU AI Act in Deutschland umgesetzt wird — maßgeblich für den Einsatz von KI-Software in Unternehmen.",
    date: "04. August 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/aktuelle-meldungen/detail/neues-ki-gesetz-tritt-in-kraft" },
  },
  {
    title: "Agentic AI Hub: Start der 2. Bewerbungsrunde",
    text: "Kommunen und Start-ups erproben autonome KI-Agenten in der öffentlichen Verwaltung. Ein wichtiger Indikator für den Mittelstand: Was der Bund testet, wird bald Prozess-Standard.",
    date: "01. August 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/agentic-ai-hub-start-der-2-bewerbungsrunde" },
  },
  {
    title: "Offene Daten stärken: Neuer strategischer Rahmen für Open Data",
    text: "Der Bund startet die Konsultationsphase für eine neue Open-Data-Strategie — relevant für alle Entwickler und Gründer, die öffentliche Datenquellen in Finanz- & Wirtschaftstools einbinden.",
    date: "28. Juli 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/offene-daten-staerken-start-fuer-einen-neuen-strategischen-rahmen-fuer-open-data" },
  },
  {
    title: "Digitale Wehrhaftigkeit des Staates stärken",
    text: "Mit dem Programm „CyberGovSecure“ baut der Bund die Cybersicherheit der Verwaltung aus — das setzt neue Maßstäbe für IT-Sicherheitsanforderungen an Dienstleister.",
    date: "22. Juli 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/digitale-wehrhaftigkeit-des-staates-staerken" },
  },
];

/** IT- & KI-Sicherheit — Meldungen und Angebote des BSI
    (Bundesamt für Sicherheit in der Informationstechnik). */
export const BSI_ITEMS = [
  {
    title: "Sichere Ladeinfrastruktur: BSI veröffentlicht Eckpunktepapier",
    text: "Das BSI treibt Sicherheitsstandards für vernetzte Ladeinfrastruktur voran — wichtig für Unternehmen mit eigenem Fuhrpark, E-Fahrzeugen oder öffentlich zugänglichen Ladepunkten.",
    date: "05. August 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260728_Sichere_Ladeinfrastruktur.html" },
  },
  {
    title: "CyberGovSecure: Bundeskabinett beschließt Schutzpaket",
    text: "Neues Sicherheitsprogramm schützt kritische IT-Systeme — ein Signal an Zulieferer und Berater, IT-Sicherheitsstandards nach ISO 27001 / BSI Grundschutz nachzuweisen.",
    date: "30. Juli 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260722_Bundeskabinett_staerkt_CGS.html" },
  },
  {
    title: "Projekt „Windows seziert“: Sicherheitsanalyse von Windows Hello for Business",
    text: "Das BSI veröffentlicht eine detaillierte Sicherheitsanalyse der biometrischen Anmeldung — hohe Praxisrelevanz für die Absicherung von Firmengeräten ohne Passwort-Risiken.",
    date: "24. Juli 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260715_Projekt_Windows_seziert.html" },
  },
  {
    title: "Cyberangriffe auf Praxen & KMUs: BSI unterstützt bei IT-Sicherheitsvorgaben",
    text: "Kleinbetriebe und Kanzleien rücken verstärkt in den Fokus von Ransomware. Das BSI liefert verständliche Praxis-Leitfäden zur schnellen Härtung der Firmen-IT.",
    date: "18. Juli 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260714_Cyberangriffe_auf_Praxen.html" },
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

export const ARTICLES = [
  {
    cat: "Berlin Fokus",
    title: "Gewerbeanmeldung online: 15 € statt 26 € — und was der Systemwechsel gerade bedeutet",
    excerpt:
      "Über den Einheitlichen Ansprechpartner Berlin ist die Online-Anmeldung günstiger als vor Ort. Wegen laufender Systemumstellungen kann es aktuell trotzdem länger dauern — Bestätigungen kommen teils noch postalisch.",
    read: "5 Min",
    date: "07. August 2026",
    source: { label: "Einheitlicher Ansprechpartner Berlin", href: "https://www.berlin.de/ea/" },
    featured: true,
    highlight: {
      value: "15 €",
      compare: "26 €",
      label: "Online-Anmeldung über den Einheitlichen Ansprechpartner Berlin — statt Vor-Ort-Termin.",
    },
  },
  {
    cat: "Bund & Steuer",
    title: "E-Rechnungspflicht: Was ab 2027 wirklich auf GmbHs und Einzelunternehmer zukommt",
    excerpt: "Die Übergangsfristen laufen aus. Der kompakte Fahrplan für E-Rechnungsformate (ZUGFeRD, XRechnung) in deiner Buchhaltung.",
    read: "4 Min",
    highlight: {
      value: "2027",
      label: "Ab diesem Jahr greift die E-Rechnungspflicht verbindlich für alle B2B-Umsätze.",
    },
    date: "06. August 2026",
    source: { label: "Bundesfinanzministerium", href: "https://www.bundesfinanzministerium.de" },
  },
  {
    cat: "Berlin Fokus",
    title: "IBB-Förderprogramme: GründungsBONUS Plus bringt bis zu 50.000 € für Berliner Startups",
    excerpt:
      "Die Digitalprämie Berlin wurde durch den InvestitionsBONUS abgelöst. Der GründungsBONUS Plus unterstützt innovative Vorhaben mit bis zu 50.000 € — plus 10.000 € Extra-Bonus für frauengeführte Gründungen.",
    read: "5 Min",
    date: "04. August 2026",
    source: { label: "Investitionsbank Berlin — GründungsBONUS Plus", href: "https://www.ibb.de/de/foerderprogramme/gruendungsbonus-plus.html" },
  },
  {
    cat: "Bund & Steuer",
    title: "Umsatzsteuer-Voranmeldung: Der Dauerfristverlängerungs-Move",
    excerpt: "Ein Formular, 30 Tage mehr Liquiditäts- und Fristenspielraum. Warum viele Gründer diesen Hebel noch immer ungenutzt lassen.",
    read: "3 Min",
    date: "02. August 2026",
    source: { label: "ELSTER", href: "https://www.elster.de" },
  },
  {
    cat: "Berlin Fokus",
    title: "KassenSichV-Novelle: E-Rechnungen ersetzen Kassenbelege in Berliner Gastronomie & Handel",
    excerpt:
      "Die 2. KassenSichV-Änderungsverordnung vereinfacht Belegausgaben. Gleichzeitig intensivieren Berliner Finanzämter unangekündigte Kassen-Nachschauen — bei über 50 % der Prüfungen wurden Formfehler beanstandet.",
    read: "5 Min",
    date: "01. August 2026",
    source: {
      label: "Bundesfinanzministerium — KassenSichV",
      href: "https://www.bundesfinanzministerium.de",
    },
  },
  {
    cat: "Bund & Steuer",
    title: "Kleinunternehmerregelung § 19 UStG: Neue Grenzen & EU-weite Befreiung",
    excerpt: "Die neue Kleinunternehmerregelung ermöglicht grenzüberschreitende Befreiungen bis 100.000 € EU-Umsatz. Wann sich die Regelung lohnt — und wann die Regelbesteuerung besser ist.",
    read: "4 Min",
    date: "29. Juli 2026",
    source: { label: "Gesetze im Internet (§ 19 UStG)", href: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
  },
  {
    cat: "Berlin Fokus",
    title: "Abgeordnetenhauswahl 2026: IHK Berlin fordert Bürokratieabbau & Steuerstopp",
    excerpt:
      "18 Berliner Wirtschaftskammern und Verbände formulieren Kernforderungen zur Abgeordnetenhauswahl: Tempo bei Verwaltungsverfahren, keine neuen Kommunalabgaben und gezielte Förderung von Innovationen.",
    read: "4 Min",
    date: "25. Juli 2026",
    source: { label: "IHK Berlin — Politische Positionen 2026", href: "https://www.ihk.de/berlin" },
  },
  {
    cat: "Berlin Fokus",
    title: "Investitionsrekord in der Hauptstadt: 1,4 Milliarden Euro im 1. Halbjahr 2026",
    excerpt:
      "Berlin Partner meldet Rekord-Investitionen in Technologie und nachhaltige Infrastruktur — ein starker Vertrauensbeweis für den Wirtschaftsstandort Berlin.",
    read: "4 Min",
    date: "20. Juli 2026",
    source: { label: "Berlin Partner für Wirtschaft und Technologie", href: "https://www.berlin-partner.de/" },
  },
  {
    cat: "Berlin Fokus",
    title: "Handwerkskammer Berlin: Digitalisierung schreitet voran — Kredit Transformation hilft",
    excerpt:
      "95 % der Berliner Handwerksbetriebe nutzen eigene digitale Kanäle. Die Handwerkskammer verweist auf zinsgünstige Betriebsmittelkredite zur Finanzierung von IT-Infrastruktur.",
    read: "4 Min",
    date: "15. Juli 2026",
    source: { label: "Handwerkskammer Berlin", href: "https://www.hwk-berlin.de" },
  },
  {
    cat: "Berlin Fokus",
    title: "Umsatzsteuerstatistik Berlin: 168.000 Voranmelder, Einnahmen steigen um 13 %",
    excerpt:
      "Das Amt für Statistik Berlin-Brandenburg meldet ein kräftiges Einnahme-Plus beim Umsatzsteueraufkommen — ein klarer Indikator für den robusten Konsum und B2B-Umsatz im Stadtgebiet.",
    read: "3 Min",
    date: "10. Juli 2026",
    source: { label: "Amt für Statistik Berlin-Brandenburg", href: "https://www.statistik-berlin-brandenburg.de" },
  },
];
