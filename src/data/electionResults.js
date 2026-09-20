/**
 * electionResults.js
 * Datenstruktur und Simulationsmodi für die Berliner Abgeordnetenhauswahl 2026.
 * Bietet Live-Schnittstellen-Vorbereitung für Wahlamt (wahlen-berlin.de) und rbb24.
 */

export const ELECTION_CONFIG = {
  electionDay: "20. September 2026",
  totalSeats: 159,
  majoritySeats: 80,
  officialOfficeUrl: "https://www.wahlen-berlin.de/",
  rbbDashboardUrl: "https://www.rbb24.de/politik/berlin-wahl-2026/",
  results2023: {
    cdu: 28.2,
    spd: 18.4,
    gruene: 18.4,
    linke: 12.2,
    afd: 9.1,
    bsw: 0.0,
    sonstige: 13.7,
  },
};

export const ELECTION_STAGES = {
  countdown: {
    id: "countdown",
    label: "Vor 18:00 Uhr",
    tag: "WAHLTAG-FINALE · NOCH < 50 MIN",
    statusBadge: "Endspurt: Wahllokale bis 18:00 Uhr geöffnet (Wer ansteht, wählt noch)",
    statusColor: "emerald",
    time: "20.09.2026 · 17:10 Uhr",
    source: "Landeswahlleiterin Berlin · Wahlbeteiligungs-Trend",
    turnout: "27,9 % (Stand 12:00 Uhr, +4,5 % ggü. 2023) · Hoher Nachmittags-Zulauf",
    note: "Endspurt in allen 12 Bezirken: Wer bis 18:00 Uhr in der Schlange steht, darf noch wählen. Punkt 18:00 Uhr folgt die erste Prognose von Infratest dimap / rbb.",
    parties: [
      { id: "cdu", name: "CDU", percent: 27.0, diff: -1.2, seats: 46, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 19.5, diff: +1.1, seats: 33, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 18.0, diff: -0.4, seats: 30, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "linke", name: "Die Linke", percent: 13.0, diff: +0.8, seats: 22, color: "#BE3075", barColor: "bg-fuchsia-700" },
      { id: "afd", name: "AfD", percent: 12.0, diff: +2.9, seats: 20, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 4.8, diff: +4.8, seats: 0, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "sonstige", name: "Sonstige", percent: 5.7, diff: -8.0, seats: 8, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },

  prognose: {
    id: "prognose",
    label: "18:00 Uhr Prognose",
    tag: "18:00 PROGNOSE · EXIT POLL",
    statusBadge: "18:00 Uhr Prognose (Infratest dimap / rbb24)",
    statusColor: "amber",
    time: "20.09.2026 · 18:00:00 Uhr",
    source: "rbb24 / Infratest dimap (Nachwahlbefragung)",
    turnout: "ca. 68,5 % (Prognose)",
    note: "Erste offizielle Zahlen basierend auf tausenden Wählerbefragungen direkt an den Urnen. Noch keine Auszählung der Stimmen.",
    parties: [
      { id: "cdu", name: "CDU", percent: 27.5, diff: -0.7, seats: 47, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 19.5, diff: +1.1, seats: 33, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 17.5, diff: -0.9, seats: 30, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "linke", name: "Die Linke", percent: 13.5, diff: +1.3, seats: 23, color: "#BE3075", barColor: "bg-fuchsia-700" },
      { id: "afd", name: "AfD", percent: 12.5, diff: +3.4, seats: 21, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 5.1, diff: +5.1, seats: 5, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "sonstige", name: "Sonstige", percent: 4.4, diff: -9.3, seats: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },

  hochrechnung: {
    id: "hochrechnung",
    label: "Hochrechnung (Zwischenstand)",
    tag: "LIVE-HOCHRECHNUNG",
    statusBadge: "Hochrechnung · 842 von 2.257 Stimmbezirken ausgez.",
    statusColor: "blue",
    time: "20.09.2026 · 19:45 Uhr",
    source: "rbb24 / Amt für Statistik Berlin-Brandenburg",
    turnout: "67,8 % (Zwischenstand)",
    note: "Kombination aus Wählerbefragung und ersten real ausgezählten Wahlbezirken inklusive Briefwahlbündeln.",
    parties: [
      { id: "cdu", name: "CDU", percent: 27.2, diff: -1.0, seats: 46, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 20.1, diff: +1.7, seats: 34, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 17.8, diff: -0.6, seats: 30, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "linke", name: "Die Linke", percent: 13.2, diff: +1.0, seats: 22, color: "#BE3075", barColor: "bg-fuchsia-700" },
      { id: "afd", name: "AfD", percent: 12.2, diff: +3.1, seats: 21, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 5.2, diff: +5.2, seats: 6, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "sonstige", name: "Sonstige", percent: 4.3, diff: -9.4, seats: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },

  endergebnis: {
    id: "endergebnis",
    label: "Vorl. Endergebnis",
    tag: "AMTLICHES VORL. ENDERGEBNIS",
    statusBadge: "Vorläufiges Endergebnis · 2.257 von 2.257 Bezirken",
    statusColor: "purple",
    time: "21.09.2026 · 01:15 Uhr",
    source: "Landeswahlleiterin Berlin / Amt für Statistik",
    turnout: "68,2 % (Endstand, 1.637.420 Wähler)",
    note: "Vollständige Auszählung aller 2.257 Urnen- und Briefwahlbezirke durch das Landeswahlamt.",
    parties: [
      { id: "cdu", name: "CDU", percent: 27.1, diff: -1.1, seats: 46, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 20.3, diff: +1.9, seats: 35, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 17.6, diff: -0.8, seats: 30, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "linke", name: "Die Linke", percent: 13.1, diff: +0.9, seats: 22, color: "#BE3075", barColor: "bg-fuchsia-700" },
      { id: "afd", name: "AfD", percent: 12.4, diff: +3.3, seats: 21, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 5.3, diff: +5.3, seats: 5, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "sonstige", name: "Sonstige", percent: 4.2, diff: -9.5, seats: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },
};

export const COALITIONS = [
  {
    id: "schwarz-rot",
    name: "Schwarz-Rot",
    parties: ["cdu", "spd"],
    color: "from-blue-600 to-red-600",
    label: "CDU + SPD",
    description: "Fortsetzung der bisherigen Regierungskoalition",
  },
  {
    id: "rot-gruen-rot",
    name: "Rot-Grün-Rot",
    parties: ["spd", "gruene", "linke"],
    color: "from-red-600 via-emerald-600 to-fuchsia-600",
    label: "SPD + Grüne + Linke",
    description: "Wiederauflage des Mitte-Links-Bündnisses",
  },
  {
    id: "schwarz-gruen",
    name: "Schwarz-Grün",
    parties: ["cdu", "gruene"],
    color: "from-blue-600 to-emerald-600",
    label: "CDU + Grüne",
    description: "Zweierbündnis mit knapper Mehrheitsoption",
  },
  {
    id: "deutschland",
    name: "Kenia-Koalition",
    parties: ["cdu", "spd", "gruene"],
    color: "from-blue-600 via-red-600 to-emerald-600",
    label: "CDU + SPD + Grüne",
    description: "Breite Mehrheit der Mitte",
  },
];
