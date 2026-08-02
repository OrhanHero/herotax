import { Cookie, Lock, ShieldCheck, FileText } from "lucide-react";

/** DSGVO-Prinzipien der Plattform (Säule "Datenschutz & Compliance") */
export const PRIVACY_PRINCIPLES = [
  {
    icon: Cookie,
    title: "Keine Tracking-Cookies",
    text: "Reichweitenmessung läuft über Plausible Analytics — cookielos, ohne personenbezogene Profile, Server in der EU. Deshalb braucht die Seite kein Cookie-Banner für Analytics.",
  },
  {
    icon: Lock,
    title: "Datenminimierung",
    text: "Wir erheben nur, was für den Dienst nötig ist. Kein Konto, kein Formular, keine Pflichtangaben, um die Inhalte dieser Seite zu nutzen.",
  },
  {
    icon: ShieldCheck,
    title: "Deine Rechte (Art. 15–21 DSGVO)",
    text: "Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Widerspruch: Eine formlose E-Mail genügt. Wir antworten innerhalb der gesetzlichen Frist von einem Monat.",
  },
  {
    icon: FileText,
    title: "Transparente Drittdienste",
    text: "Externe Inhalte (Social-Media-Links, eingebundene Behörden-Feeds) sind in der Datenschutzerklärung mit ihrer jeweiligen Rechtsgrundlage aufgeführt.",
  },
];

/** Datenschutz-Radar: Themen der/des BfDI, relevant für Unternehmer */
export const BFDI_ITEMS = [
  {
    title: "KI & Datenschutz: Was der BfDI zu automatisierten Prozessen sagt",
    text: "Wer Buchhaltung und Reporting mit KI automatisiert, verarbeitet oft personenbezogene Daten. Die Orientierungshilfen der Aufsichtsbehörden zeigen, worauf es ankommt.",
    source: { label: "BfDI", href: "https://www.bfdi.bund.de" },
  },
  {
    title: "Beschäftigtendatenschutz: Pflichten ab Mitarbeiter Nummer eins",
    text: "Vom Bewerbungsprozess bis zur Zeiterfassung — welche Daten du als Arbeitgeber verarbeiten darfst und wie lange du sie aufbewahren musst.",
    source: { label: "BfDI", href: "https://www.bfdi.bund.de" },
  },
  {
    title: "Internationale Datentransfers: Cloud-Tools rechtssicher nutzen",
    text: "US-Cloud-Dienste im Unternehmen? Standardvertragsklauseln, Angemessenheitsbeschlüsse und was der BfDI zu Drittlandtransfers veröffentlicht.",
    source: { label: "BfDI", href: "https://www.bfdi.bund.de" },
  },
];
