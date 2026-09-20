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
    tag: "SIMULATION · LINKE AUF PLATZ 1 🗳️⚡",
    statusBadge: "Wahl-Simulation: Die Linke steuert auf Platz 1 im Roten Rathaus zu",
    statusColor: "emerald",
    time: "20.09.2026 · 17:28 Uhr",
    source: "Wahl-Simulator · Hochrechnungs-Modell",
    turnout: "27,9 % (Stand 12:00 Uhr) · Hoher Nachmittags-Zulauf",
    note: "Simulationsmodus: Die Linke führt in der Hochrechnungssimulation mit 27,2 % vor der CDU. Starke Mehrheiten für Mitte-Links im Abgeordnetenhaus.",
    parties: [
      { id: "linke", name: "Die Linke", percent: 27.2, diff: +15.0, seats: 48, color: "#BE3075", barColor: "bg-fuchsia-600" },
      { id: "cdu", name: "CDU", percent: 21.8, diff: -6.4, seats: 36, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 18.8, diff: +0.4, seats: 32, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 16.5, diff: -1.9, seats: 27, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "afd", name: "AfD", percent: 10.3, diff: +1.2, seats: 16, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 4.7, diff: +4.7, seats: 0, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "sonstige", name: "Sonstige", percent: 0.7, diff: -13.0, seats: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },

  prognose: {
    id: "prognose",
    label: "18:00 Uhr Prognose",
    tag: "18:00 PROGNOSE-SIMULATION · LINKE-SIEG 🔴",
    statusBadge: "Prognose-Simulation: Die Linke gewinnt Berlin-Wahl (27,6 %)",
    statusColor: "amber",
    time: "20.09.2026 · 18:00:00 Uhr",
    source: "Simulator · Infratest-Modellierung",
    turnout: "ca. 68,5 % (Prognose)",
    note: "Sensations-Simulation: Die Linke zieht an CDU und SPD vorbei und erobert Platz 1 in Berlin. Rotes Rathaus winkt.",
    parties: [
      { id: "linke", name: "Die Linke", percent: 27.6, diff: +15.4, seats: 48, color: "#BE3075", barColor: "bg-fuchsia-600" },
      { id: "cdu", name: "CDU", percent: 21.4, diff: -6.8, seats: 36, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 18.9, diff: +0.5, seats: 32, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 16.4, diff: -2.0, seats: 27, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "afd", name: "AfD", percent: 10.4, diff: +1.3, seats: 16, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 4.8, diff: +4.8, seats: 0, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "sonstige", name: "Sonstige", percent: 0.5, diff: -13.2, seats: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },

  hochrechnung: {
    id: "hochrechnung",
    label: "Hochrechnung (Zwischenstand)",
    tag: "HOCHRECHNUNGS-SIMULATION · ~ 95 % AUSGEZÄHLT",
    statusBadge: "Hochrechnung · 2.140 von 2.257 Stimmbezirken ausgez. (~ 95 %)",
    statusColor: "blue",
    time: "20.09.2026 · 19:50 Uhr",
    source: "Simulator · Auszählungs-Simulation",
    turnout: "68,2 % (Zwischenstand)",
    note: "Fast 95 % aller Stimmbezirke ausgezählt: Nur noch wenige Briefwahllokale offen. Die Linke siegt triumphal mit 27,5 % (48 Sitze). SPD und Grüne kündigen Sondierungsgespräche für Montag an.",
    parties: [
      { id: "linke", name: "Die Linke", percent: 27.5, diff: +15.3, seats: 48, color: "#BE3075", barColor: "bg-fuchsia-600" },
      { id: "cdu", name: "CDU", percent: 21.5, diff: -6.7, seats: 36, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 19.1, diff: +0.7, seats: 32, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 16.6, diff: -1.8, seats: 27, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "afd", name: "AfD", percent: 10.1, diff: +1.0, seats: 16, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 4.7, diff: +4.7, seats: 0, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "sonstige", name: "Sonstige", percent: 0.5, diff: -13.2, seats: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },

  endergebnis: {
    id: "endergebnis",
    label: "Vorl. Endergebnis",
    tag: "SIMULATION · LINKE GEWINNT ABGEORDNETENHAUS",
    statusBadge: "Simuliertes Endergebnis: Wahlsieg für Die Linke (27,5 %, 48 Sitze)",
    statusColor: "purple",
    time: "21.09.2026 · 01:15 Uhr",
    source: "Simulator · Endergebnis-Simulation",
    turnout: "68,2 % (Endstand)",
    note: "Historischer Simulations-Wahlsieg: Die Linke wird stärkste Kraft in Berlin. Rot-Rot-Grün und Rot-Rot haben regierungsfähige Mehrheiten.",
    parties: [
      { id: "linke", name: "Die Linke", percent: 27.5, diff: +15.3, seats: 48, color: "#BE3075", barColor: "bg-fuchsia-600" },
      { id: "cdu", name: "CDU", percent: 21.5, diff: -6.7, seats: 36, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 19.1, diff: +0.7, seats: 32, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 16.6, diff: -1.8, seats: 27, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "afd", name: "AfD", percent: 10.1, diff: +1.0, seats: 16, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 4.7, diff: +4.7, seats: 0, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "sonstige", name: "Sonstige", percent: 0.5, diff: -13.2, seats: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },
};

export const COALITIONS = [
  {
    id: "rgr-linke",
    name: "Rot-Rot-Grün (Linke-geführt)",
    parties: ["linke", "spd", "gruene"],
    color: "from-fuchsia-600 via-red-600 to-emerald-600",
    label: "Die Linke + SPD + Grüne",
    description: "Linke-geführter Senat mit komfortabler Mehrheit im Roten Rathaus",
  },
  {
    id: "rot-rot",
    name: "Rot-Rot (Linke + SPD)",
    parties: ["linke", "spd"],
    color: "from-fuchsia-600 to-red-600",
    label: "Die Linke + SPD",
    description: "Zweierbündnis mit knapper eigener Mehrheit (80 Sitze)",
  },
  {
    id: "schwarz-rot",
    name: "Schwarz-Rot",
    parties: ["cdu", "spd"],
    color: "from-blue-600 to-red-600",
    label: "CDU + SPD",
    description: "Bisheriges Bündnis verfehlt parlamentarische Mehrheit deutlich",
  },
  {
    id: "deutschland",
    name: "Kenia-Koalition",
    parties: ["cdu", "spd", "gruene"],
    color: "from-blue-600 via-red-600 to-emerald-600",
    label: "CDU + SPD + Grüne",
    description: "Theoretisches Dreierbündnis gegen die stärkste Kraft",
  },
];
