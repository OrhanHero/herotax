import { Landmark, Smartphone, Code, Sparkles, ShieldCheck } from "lucide-react";

/** EUDI-Wallet: Status, Partner & Zeitplan — Stand 10. September 2026.
    Quellen:
    - BMDS Pressemitteilung 53/2026 (09.09.2026): "d-you: Deutschland startet digitale Identität für alle"
    - Offizielle App-Seite des Bundes: https://eudi-wallet.gov.de/app
    - Europäische Kommission: eIDAS 2.0 / Verordnung (EU) 2024/1183
    - Verbraucherzentrale: Datenschutz & Nutzerkontrolle
    - BMI / openCode: Open-Source-Referenzimplementierung
*/

export const EUDI_PARTNERS = [
  "DATEV eG",
  "Bundessteuerberaterkammer",
  "Bundesdruckerei",
  "Deutscher Sparkassen- und Giroverband",
  "BVR (Volksbanken)",
  "Deutsche Rentenversicherung Bund",
  "Deutsche Post AG",
  "Bundesagentur für Arbeit",
  "KfW",
  "FU Berlin",
  "TU München",
  "Vodafone",
  "Handelsverband Deutschland (HDE)",
  "Rossmann",
];

export const EUDI_TIMELINE = [
  {
    icon: Sparkles,
    badge: "Neu: 09.09.2026",
    title: "Staatliche Wallet heißt „d-you“ — Launch am 2. Januar 2027",
    text: "Das BMDS hat am 9. September 2026 Namen und Logo der deutschen EUDI-Wallet offiziell vorgestellt: Sie heißt „d-you“ („d“ für digital/Deutschland, „you“ für Bürger:innen im Mittelpunkt). Das Hand-Logo verkörpert Selbstbestimmung: „Es sind deine Daten. In deiner Hand.“ Zum Launch am 2. Januar 2027 stehen rund 40 Partner aus Wirtschaft, Wissenschaft und Verwaltung mit Live-Diensten bereit.",
    source: {
      label: "BMDS — Pressemitteilung zu d-you",
      href: "https://bmds.bund.de/aktuelles/pressemitteilungen/detail/d-you-deutschland-startet-digitale-identitaet-fuer-alle",
    },
  },
  {
    icon: Smartphone,
    badge: "Offizielle App des Bundes",
    title: "Alltagseinsatz & echte Anwendungsfälle (eudi-wallet.gov.de/app)",
    text: "Schluss mit unsicheren „Screenshot-Lösungen“: Die staatliche Smartphone-App ermöglicht Online-Kontoeröffnung ohne Wartezeit, rechtssichere digitale Verträge, Personalausweis und elektronischen Aufenthaltstitel (eAT), europaweiten Hotel- und Reise-Check-in sowie beglaubigte Bewerbungs- und Bildungsnachweise direkt vom Smartphone — freiwillig und kostenlos.",
    source: {
      label: "eudi-wallet.gov.de/app — Offizielle App-Informationen",
      href: "https://eudi-wallet.gov.de/app",
    },
  },
  {
    icon: Landmark,
    badge: "EU-Frist",
    title: "EU-weite Frist: 24. Dezember 2026",
    text: "Nach der eIDAS-2.0-Verordnung (EU) 2024/1183 muss jeder EU-Mitgliedstaat seinen Bürger:innen, Einwohner:innen und Unternehmen bis zum 24. Dezember 2026 mindestens eine EUDI-Wallet zur Verfügung stellen. Alle nationalen Wallets folgen gemeinsamen technischen Standards und sind grenzüberschreitend in ganz Europa interoperabel.",
    source: {
      label: "Europäische Kommission — EUDI Wallet",
      href: "https://ec.europa.eu/digital-building-blocks/sites/spaces/EUDIGITALIDENTITYWALLET/pages/694487738/EU+Digital+Identity+Wallet+Home",
    },
  },
  {
    icon: ShieldCheck,
    badge: "40 Launch-Partner",
    title: "Sicherheit, Datenschutz & Partner-Ökosystem",
    text: "Zum Start sind Schlüsselakteure der Steuer- und Finanzwelt wie die DATEV eG, die Bundessteuerberaterkammer, die Bundesdruckerei sowie Sparkassen und Genossenschaftsbanken an Bord. Sicherheit wird durch gerätegebundene Kryptographie, PIN/Biometrie und Selective Disclosure garantiert (nur zwingend erforderliche Attribute teilen, kein Tracking).",
    source: {
      label: "Offizielles Portal eudi-wallet.gov.de",
      href: "https://eudi-wallet.gov.de/",
    },
  },
  {
    icon: Code,
    badge: "Open Source",
    title: "Referenz-Implementierung: Offener Quellcode auf openCode",
    text: "Der Bund entwickelt die deutsche EUDI-Wallet öffentlich einsehbar auf der Plattform openCode — Architektur, Krypto-Standards und Spezifikationen sind transparent für Entwickler:innen, Wirtschaft und Zivilgesellschaft zum Nachvollziehen bereitgestellt.",
    source: {
      label: "BMI — EUDI-Wallet eIDAS2 (Open Code)",
      href: "https://bmi.usercontent.opencode.de/eudi-wallet/eidas2/",
    },
  },
];
