/* ── CONTENT-DATEN (CMS-ready: Arrays → API-Fetch) ─────────────── */

export const AI_ARTICLES = [
  {
    title: "KI-gestützte Belegverarbeitung: Vom Schuhkarton zum Echtzeit-Reporting",
    excerpt:
      "OCR + Kategorisierungs-Modelle nehmen der Buchhaltung 80 % der Handarbeit ab. Welche Workflows sich 2026 für Solo-Gründer wirklich lohnen — und wo menschliche Kontrolle Pflicht bleibt.",
    read: "7 Min",
    date: "05. Juli 2026",
    source: { label: "Bundesfinanzministerium", href: "https://www.bundesfinanzministerium.de" },
    tag: "Automatisierung",
  },
  {
    title: "Risikomanagementsysteme im Finanzamt: So prüft der Algorithmus deine Erklärung",
    excerpt:
      "Die Steuerverwaltung setzt zunehmend auf automatisierte Fallauswahl. Was das für Abgabe-Qualität und Plausibilität deiner Zahlen bedeutet.",
    read: "5 Min",
    date: "03. Juli 2026",
    source: { label: "Bundeszentralamt für Steuern", href: "https://www.bzst.de" },
    tag: "Steuerverwaltung",
  },
  {
    title: "Prozess-Intelligence: Monatsabschluss in 2 Stunden statt 2 Tagen",
    excerpt:
      "Ein wiederholbarer Ablauf aus Bank-Sync, Regelwerk und KI-Vorkontierung. Der Effizienz-Blueprint zum Nachbauen.",
    read: "6 Min",
    date: "01. Juli 2026",
    source: { label: "IHK Berlin", href: "https://www.ihk.de/berlin" },
    tag: "Effizienz",
  },
];

/** KI-Sicherheit & Regulierung — offizielle Meldungen des BMDS
    (Bundesministerium für Digitales und Staatsmodernisierung).
    Quellen: echte Seiten auf bmds.bund.de — beim Aktualisieren neue
    Meldungen aus https://bmds.bund.de/aktuelles übernehmen. */
export const BMDS_ITEMS = [
  {
    title: "KI-Regulierung: Der Rahmen für verlässliche KI in Deutschland",
    text: "AI Act & Co.: Was der Bund an Leitplanken setzt, damit KI innovationsfreundlich und zugleich sicher eingesetzt werden kann — Pflichtlektüre, bevor du KI in deine Prozesse holst.",
    date: "Themenseite",
    source: { label: "BMDS · KI-Regulierung", href: "https://bmds.bund.de/themen/kuenstliche-intelligenz/ki-regulierung" },
  },
  {
    title: "Agentic AI Hub: Pilotierung erfolgreich abgeschlossen",
    text: "Kommunen und Start-ups zeigen, wie die Verwaltung KI-Agenten schon heute sicher einsetzen kann. Ein Signal auch für Unternehmen: Der Bund testet, was bald Standard wird.",
    date: "15. Juni 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/agentic-ai-hub-pilotierung-erfolgreich-abgeschlossen" },
  },
  {
    title: "SPARK: Neue KI-Software halbiert Genehmigungszeiten",
    text: "Das BMDS veröffentlicht Module der KI-Software SPARK als Open Source — Planungs- und Genehmigungsverfahren werden drastisch beschleunigt. Gut für alle, die auf Ämter warten.",
    date: "16. Juni 2026",
    source: { label: "BMDS · Pressemitteilung", href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/neue-ki-software-halbiert-genehmigungszeiten-bei-grossen-infrastrukturprojekten" },
  },
  {
    title: "„Schneller Gründen“: Bund modernisiert den Gründungsprozess",
    text: "Bund, Länder und Kommunen digitalisieren gemeinsam die Unternehmensgründung. Direkt relevant für jeden, der in Berlin gerade startet.",
    date: "Themenseite",
    source: { label: "BMDS · Schneller Gründen", href: "https://bmds.bund.de/themen/staatsmodernisierung/digitale-verwaltung/schneller-gruenden" },
  },
];

/** IT- & KI-Sicherheit — Meldungen und Angebote des BSI
    (Bundesamt für Sicherheit in der Informationstechnik).
    Quellen: echte Seiten auf bsi.bund.de — beim Aktualisieren neue
    Meldungen aus dem Presse-/Meldungsbereich übernehmen. */
export const BSI_ITEMS = [
  {
    title: "KI-Sicherheit für Unternehmen: Das Kompetenzzentrum KI des BSI",
    text: "Robustheit, Verlässlichkeit, Prüfkriterien: Die zentrale Anlaufstelle, wenn du KI-Systeme sicher einsetzen oder bewerten willst — von der Buchhaltungs-Automation bis zum Chatbot.",
    date: "Themenseite",
    source: { label: "BSI · Künstliche Intelligenz", href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Kuenstliche-Intelligenz/kuenstliche-intelligenz_node.html" },
  },
  {
    title: "Sicherheitshinweis: KI verändert die Bedrohungslage für Organisationen",
    text: "Das BSI stuft die Auswirkungen der KI-Entwicklung auf die Cybersicherheit von Organisationen als hoch ein — Deepfakes, KI-gestütztes Phishing & Co. treffen auch kleine Unternehmen.",
    date: "22. Juni 2026 · Kritikalität: Hoch",
    source: { label: "BSI · IT-Sicherheitsmitteilungen", href: "https://www.bsi.bund.de/" },
  },
  {
    title: "BSI-Magazin: NIS-2 und BSI-Gesetz stärken Cybersicherheit in Unternehmen",
    text: "Registrierungspflichten, KI in der Praxis, Cybersicherheitsmonitor 2026: Rund ein Drittel der Befragten hinterfragt KI-generierte Inhalte nicht — die Ausgabe zeigt, was Unternehmen jetzt tun.",
    date: "11. Juni 2026",
    source: { label: "BSI · Pressemitteilung", href: "https://www.bsi.bund.de/DE/Service-Navi/Presse/Alle-Meldungen-News/Meldungen/2026/BSI-Magazin_NIS-2_BSIG_260611.html" },
  },
  {
    title: "AIC4: KI-Cloud-Dienste vor dem Einkauf auf Sicherheit prüfen",
    text: "Der Kriterienkatalog des BSI für KI-Cloud-Dienste — dein Werkzeug, um Anbieter von KI-Buchhaltung, OCR & Co. vor Vertragsabschluss auf Robustheit und Datenqualität abzuklopfen.",
    date: "Kriterienkatalog",
    source: { label: "BSI · AIC4", href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Kuenstliche-Intelligenz/AIC4/aic4_node.html" },
  },
];

export const ARTICLES = [
  {
    cat: "Berlin Fokus",
    title: "Gewerbeanmeldung 2.0: Berlins digitales Amt im Praxistest",
    excerpt:
      "Das Einheitliche Unternehmensportal verspricht die Anmeldung in unter 20 Minuten. Wir haben den Prozess durchgespielt — inklusive der drei Stolperfallen, die niemand erwähnt.",
    read: "6 Min",
    date: "04. Juli 2026",
    source: { label: "Service-Portal Berlin", href: "https://service.berlin.de" },
    featured: true,
  },
  {
    cat: "Bund & Steuer",
    title: "E-Rechnungspflicht: Was ab 2027 wirklich auf GmbHs zukommt",
    excerpt: "Die Übergangsfristen laufen aus. Der kompakte Fahrplan für deine Buchhaltung.",
    read: "4 Min",
    date: "03. Juli 2026",
    source: { label: "Bundesfinanzministerium", href: "https://www.bundesfinanzministerium.de" },
  },
  {
    cat: "Berlin Fokus",
    title: "IBB-Förderprogramme im Q3: Diese Töpfe sind noch offen",
    excerpt: "Von Digitalprämie bis GründungsBONUS — welche Anträge sich jetzt noch lohnen.",
    read: "5 Min",
    date: "02. Juli 2026",
    source: { label: "Investitionsbank Berlin", href: "https://www.ibb.de" },
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
    title: "KassenSichV-Kontrollen in Berlin: So läuft der unangekündigte Besuch",
    excerpt: "Was das Finanzamt prüft, was du bereithalten musst — und was eine fehlende TSE kostet.",
    read: "5 Min",
    date: "29. Juni 2026",
    source: { label: "Berlin.de / Finanzämter", href: "https://www.berlin.de/sen/finanzen" },
  },
  {
    cat: "Bund & Steuer",
    title: "Kleinunternehmerregelung: Die neuen Grenzen richtig nutzen",
    excerpt: "Wann sich der Verzicht lohnt — und wann er dich Wachstum kostet.",
    read: "4 Min",
    date: "27. Juni 2026",
    source: { label: "Gesetze im Internet (§ 19 UStG)", href: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
  },
];
