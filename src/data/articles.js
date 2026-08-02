/* ── CONTENT-DATEN (CMS-ready: Arrays → API-Fetch) ─────────────── */

export const AI_ARTICLES = [
  {
    title: "KI-gestützte Belegverarbeitung: Vom Schuhkarton zum Echtzeit-Reporting",
    excerpt:
      "OCR- und Kategorisierungs-Modelle nehmen der Buchhaltung einen Großteil der Handarbeit ab. Welche Workflows sich für Solo-Gründer wirklich lohnen — und wo menschliche Kontrolle Pflicht bleibt.",
    read: "7 Min",
    date: "02. August 2026",
    source: { label: "IHK Berlin — Digitalisierung", href: "https://www.ihk.de/berlin" },
    tag: "Automatisierung",
  },
  {
    title: "Risikomanagementsysteme im Finanzamt: So prüft der Algorithmus deine Erklärung",
    excerpt:
      "Nach § 88 Abs. 5 AO dürfen Finanzämter automationsgestützte Systeme zur Fallauswahl einsetzen. Was das für Abgabe-Qualität und Plausibilität deiner Zahlen bedeutet.",
    read: "5 Min",
    date: "02. August 2026",
    source: { label: "§ 88 Abs. 5 AO — Gesetze im Internet", href: "https://www.gesetze-im-internet.de/ao_1977/__88.html" },
    tag: "Steuerverwaltung",
  },
  {
    title: "Prozess-Intelligence: Monatsabschluss in 2 Stunden statt 2 Tagen",
    excerpt:
      "Ein wiederholbarer Ablauf aus Bank-Sync, GoBD-konformer Ablage und KI-Vorkontierung. Der Effizienz-Blueprint zum Nachbauen.",
    read: "6 Min",
    date: "02. August 2026",
    source: { label: "Bundesfinanzministerium — GoBD", href: "https://www.bundesfinanzministerium.de" },
    tag: "Effizienz",
  },
];

/** KI-Sicherheit & Regulierung — offizielle Meldungen des BMDS
    (Bundesministerium für Digitales und Staatsmodernisierung).
    Quellen: echte Seiten auf bmds.bund.de — beim Aktualisieren neue
    Meldungen aus https://bmds.bund.de/aktuelles übernehmen. */
export const BMDS_ITEMS = [
  {
    title: "Neues KI-Gesetz tritt in Kraft",
    text: "Das KI-Marktüberwachungs- und Innovationsgesetz (KI-MIG) regelt jetzt verbindlich, wie der AI Act in Deutschland umgesetzt wird — relevant für jeden, der KI-Tools in seinen Prozessen einsetzt.",
    date: "29. Juli 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/aktuelle-meldungen/detail/neues-ki-gesetz-tritt-in-kraft" },
  },
  {
    title: "Agentic AI Hub: Start der 2. Bewerbungsrunde",
    text: "Kommunen und Start-ups können sich erneut bewerben, um KI-Agenten in der Verwaltung sicher zu erproben. Ein Signal auch für Unternehmen: Der Bund testet, was bald Standard wird.",
    date: "29. Juli 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/agentic-ai-hub-start-der-2-bewerbungsrunde" },
  },
  {
    title: "Offene Daten stärken: Neuer strategischer Rahmen für Open Data",
    text: "Der Bund startet einen Konsultationsprozess für eine neue Open-Data-Strategie — relevant für alle, die öffentliche Datenquellen in eigene Tools und Auswertungen einbinden.",
    date: "28. Juli 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/offene-daten-staerken-start-fuer-einen-neuen-strategischen-rahmen-fuer-open-data" },
  },
  {
    title: "Digitale Wehrhaftigkeit des Staates stärken",
    text: "Mit dem Programm „CyberGovSecure“ baut der Bund die Cybersicherheit der Verwaltung aus — ein Trend, der auch für IT-Sicherheitsanforderungen an Unternehmen im Behördenkontakt relevant wird.",
    date: "22. Juli 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/digitale-wehrhaftigkeit-des-staates-staerken" },
  },
];

/** IT- & KI-Sicherheit — Meldungen und Angebote des BSI
    (Bundesamt für Sicherheit in der Informationstechnik).
    Quellen: echte Seiten auf bsi.bund.de — beim Aktualisieren neue
    Meldungen aus dem Presse-/Meldungsbereich übernehmen. */
export const BSI_ITEMS = [
  {
    title: "Sichere Ladeinfrastruktur: BSI veröffentlicht Eckpunktepapier",
    text: "Gemeinsam mit den beteiligten Ressorts treibt das BSI Sicherheitsstandards für Ladeinfrastruktur voran — relevant für jeden Betrieb mit eigenem Fuhrpark oder Ladepunkten.",
    date: "28. Juli 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260728_Sichere_Ladeinfrastruktur.html" },
  },
  {
    title: "„CyberGovSecure“: Bundeskabinett stärkt Cybersicherheit der Bundesverwaltung",
    text: "Ein neues Programm soll die IT-Sicherheit der Bundesverwaltung ausbauen — ein Vorbote für strengere Sicherheitsanforderungen auch bei Zulieferern und Dienstleistern der Verwaltung.",
    date: "22. Juli 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260722_Bundeskabinett_staerkt_CGS.html" },
  },
  {
    title: "Projekt „Windows seziert“: Sicherheitsanalyse von Windows Hello for Business",
    text: "Das BSI veröffentlicht eine detaillierte Sicherheitsanalyse der biometrischen Windows-Anmeldung — praktisch relevant, wenn du Firmengeräte mit Windows Hello absicherst.",
    date: "15. Juli 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260715_Projekt_Windows_seziert.html" },
  },
  {
    title: "Cyberangriffe auf Praxen: BSI unterstützt bei neuen IT-Sicherheitsvorgaben",
    text: "Arztpraxen und ähnliche Kleinbetriebe geraten verstärkt ins Visier von Cyberkriminellen. Das BSI zeigt, wie die neuen IT-Sicherheitsvorgaben in der Praxis umgesetzt werden.",
    date: "14. Juli 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260714_Cyberangriffe_auf_Praxen.html" },
  },
];

/** DE-Ökosystem · DeutschlandGPT — DSGVO-konforme KI-Plattform für den
    deutschen Mittelstand. Kuratierte Verlinkung als ergänzende Ressource
    neben den redaktionellen News. Quelle: https://www.deutschlandgpt.de/ */
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
    date: "02. August 2026",
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
    title: "E-Rechnungspflicht: Was ab 2027 wirklich auf GmbHs zukommt",
    excerpt: "Die Übergangsfristen laufen aus. Der kompakte Fahrplan für deine Buchhaltung.",
    read: "4 Min",
    highlight: {
      value: "2027",
      label: "Ab diesem Jahr greift die E-Rechnungspflicht verbindlich für alle GmbHs.",
    },
    date: "03. Juli 2026",
    source: { label: "Bundesfinanzministerium", href: "https://www.bundesfinanzministerium.de" },
  },
  {
    cat: "Berlin Fokus",
    title: "IBB-Förderprogramme: Die Digitalprämie ist Geschichte — das ist der Nachfolger",
    excerpt:
      "Die Digitalprämie Berlin nimmt keine Anträge mehr an; Digitalisierungsprojekte laufen jetzt über den Berliner InvestitionsBONUS. Der GründungsBONUS Plus bringt bis zu 50.000 € — bei frauengeführten Gründungen seit April zusätzlich 10.000 €.",
    read: "5 Min",
    date: "16. Januar 2026",
    source: { label: "Investitionsbank Berlin — GründungsBONUS Plus", href: "https://www.ibb.de/de/foerderprogramme/gruendungsbonus-plus.html" },
  },
  {
    cat: "Bund & Steuer",
    title: "Umsatzsteuer-Voranmeldung: Der Dauerfristverlängerungs-Move",
    excerpt: "Ein Formular, 30 Tage mehr Luft. Warum fast jeder Gründer diesen Hebel liegen lässt.",
    read: "3 Min",
    date: "01. Juli 2026",
    source: { label: "ELSTER", href: "https://www.elster.de" },
  },
  {
    cat: "Berlin Fokus",
    title: "KassenSichV-Novelle seit Januar 2026: Das ändert sich für Kassen in Berlin",
    excerpt:
      "Die 2. Änderungsverordnung ist seit 19. Januar 2026 in Kraft — E-Rechnungen können jetzt den Kassenbeleg ersetzen. Gleichzeitig verschärfen Finanzämter die unangekündigten Kassen-Nachschauen: Bei über der Hälfte der geprüften Kassen fanden Prüfer Mängel.",
    read: "5 Min",
    date: "19. Januar 2026",
    source: {
      label: "Bundesfinanzministerium — 2. VO zur Änderung der KassenSichV",
      href: "https://www.bundesfinanzministerium.de/Content/DE/Gesetzestexte/Gesetze_Gesetzesvorhaben/Abteilungen/Abteilung_IV/21_Legislaturperiode/2025-11-05-2-VO-Aenderung-KassenSichV/0-Verordnung.html",
    },
  },
  {
    cat: "Bund & Steuer",
    title: "Kleinunternehmerregelung: Die neuen Grenzen richtig nutzen",
    excerpt: "Wann sich der Verzicht lohnt — und wann er dich Wachstum kostet.",
    read: "4 Min",
    date: "27. Juni 2026",
    source: { label: "Gesetze im Internet (§ 19 UStG)", href: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
  },
  {
    cat: "Berlin Fokus",
    title: "Abgeordnetenhauswahl am 20. September 2026: Das fordert die Wirtschaft",
    excerpt:
      "18 Berliner Kammern und Verbände, darunter die IHK Berlin, haben gemeinsame Positionen zur Wahl veröffentlicht: keine neuen Steuern oder Abgaben, weniger Bürokratie, mehr Tempo bei Verwaltung, Stadtentwicklung, Infrastruktur und Innovation. Eine rein sachliche Zusammenfassung der Forderungen — keine Wahlempfehlung.",
    read: "4 Min",
    date: "02. August 2026",
    source: { label: "IHK Berlin — Abgeordnetenhauswahl 2026", href: "https://www.ihk.de/berlin/politische-positionen-und-statistiken-channel/wahlen/abgeordnetenhauswahl" },
  },
  {
    cat: "Berlin Fokus",
    title: "Investitionsrekord: 1,4 Milliarden Euro für Berlin im ersten Halbjahr 2026",
    excerpt:
      "Berlin Partner meldet einen Rekordwert bei Unternehmensinvestitionen im ersten Halbjahr — ein starkes Signal für den Standort, während gleichzeitig die neue Innovationsstrategie InnoBB 2035 vorgestellt wird.",
    read: "4 Min",
    date: "02. August 2026",
    source: { label: "Berlin Partner für Wirtschaft und Technologie", href: "https://www.berlin-partner.de/" },
  },
  {
    cat: "Berlin Fokus",
    title: "Handwerk digitalisiert sich — aber die Landes-Fördertöpfe sind leer",
    excerpt:
      "95 % der Berliner Handwerksbetriebe haben eine eigene Website, ein Viertel nutzt bereits 3D-Druck. Wegen der angespannten Haushaltslage sind viele Digitalisierungs-Förderprogramme von Bund und Land aber ausgelaufen — die Handwerkskammer verweist auf Alternativen wie den Berlin Kredit Transformation.",
    read: "4 Min",
    date: "02. August 2026",
    source: { label: "Handwerkskammer Berlin", href: "https://www.hwk-berlin.de/artikel/foerdermittel-fuer-digitalisierung-und-innovation-91,0,372.html" },
  },
  {
    cat: "Berlin Fokus",
    title: "Berlins Umsatzsteuer-Aufkommen 2024: 168.149 Voranmelder, Einnahmen +13 %",
    excerpt:
      "Die amtliche Umsatzsteuerstatistik zeigt: Berlin hatte 2024 rund 168.000 umsatzsteuerpflichtige Voranmelder — ein Plus von 13 % beim Steueraufkommen gegenüber dem Vorjahr. Ein Indikator dafür, wie robust die Berliner Wirtschaft aktuell wirklich läuft.",
    read: "3 Min",
    date: "02. August 2026",
    source: { label: "Amt für Statistik Berlin-Brandenburg", href: "https://www.statistik-berlin-brandenburg.de/gesellschaft/staat/steuern" },
  },
  {
    cat: "Berlin Fokus",
    title: "Finanzämter prüften 89 wohlhabende Berliner — knapp 6 Millionen Euro zu wenig gezahlt",
    excerpt:
      "Eine Recherche zeigt: Bei gezielten Prüfungen vermögender Privatpersonen deckten Berliner Finanzämter erhebliche Steuerdifferenzen auf. Ein Erinnerung daran, dass Betriebsprüfungen längst nicht nur kleine Gewerbetreibende treffen.",
    read: "4 Min",
    date: "31. Januar 2026",
    source: { label: "Tagesspiegel", href: "https://www.tagesspiegel.de/berlin/finanzamter-uberprufen-reiche-berliner-wohlhabende-zahlten-knapp-sechs-millionen-euro-zu-wenig-steuern-15205002.html" },
  },
  {
    cat: "Berlin Fokus",
    title: "Rechtsänderungen im Überblick: Was sich für Berliner Unternehmen ändert",
    excerpt:
      "Die IHK Berlin fasst aktuelle Gesetzesänderungen mit Relevanz für Unternehmen laufend zusammen — von Steuerrecht bis Arbeitsrecht. Praktisch, um nichts Wichtiges zu verpassen, ohne jedes Gesetzblatt selbst zu wälzen.",
    read: "3 Min",
    date: "02. August 2026",
    source: { label: "IHK Berlin — Rechtsänderungen im Überblick", href: "https://www.ihk.de/berlin/service-und-beratung/recht-und-steuern/rechtsaenderungen-ueberblick-4993712" },
  },
];
