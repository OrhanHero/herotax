/**
 * electionResults.js
 * Amtliche Wahlergebnis-Datenstruktur & Chronologie für die Berliner Abgeordnetenhauswahl 2026
 * sowie die Wahlen zu den Bezirksverordnetenversammlungen (BVV).
 * Quelle: Landeswahlleiterin Berlin (wahlen-berlin.de) & rbb24.
 */

export const ELECTION_CONFIG = {
  electionDay: "20. September 2026",
  totalSeats: 159,
  majoritySeats: 80,
  totalWahlkreise: 78,
  officialOfficeUrl: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/agh/index.html",
  aghUrl: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/agh/index.html",
  bvvUrl: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/bvv/index.html",
  rbbDashboardUrl: "https://www.rbb24.de/politik/berlin-wahl-2026/",
  results2023: {
    zweitstimmen: {
      linke: 12.2,
      cdu: 28.2,
      spd: 18.4,
      gruene: 18.4,
      afd: 9.1,
      bsw: 0.0,
      fdp: 4.6,
      sonstige: 9.0,
    },
    erststimmen: {
      linke: 12.3,
      cdu: 29.7,
      spd: 19.9,
      gruene: 19.1,
      afd: 9.0,
      bsw: 0.0,
      fdp: 3.9,
      sonstige: 6.0,
    },
    bvv: {
      linke: 12.6,
      cdu: 27.7,
      spd: 18.7,
      gruene: 19.5,
      afd: 9.0,
      bsw: 0.0,
      fdp: 4.2,
      sonstige: 8.3,
    },
    direktmandate2023: {
      cdu: 48,
      gruene: 15,
      linke: 11,
      spd: 4,
      afd: 0,
      bsw: 0,
      fdp: 0,
      sonstige: 0,
    },
  },
};

export const ELECTION_STAGES = {
  prognose: {
    id: "prognose",
    label: "18:00 Prognose",
    tag: "18:00 PROGNOSE · EXIT POLL 🔴",
    statusBadge: "18:00 Uhr Prognose (Infratest dimap / rbb24)",
    statusColor: "amber",
    time: "20.09.2026 · 18:00:00 Uhr",
    source: "rbb24 / Infratest dimap (Wählerbefragung)",
    turnout: "ca. 68,5 % (Prognose)",
    note: "Erste Prognose nach Schließung der Wahllokale: Historischer Umschwung zugunsten von Die Linke.",
    parties: [
      { id: "linke", name: "Die Linke", percent: 27.6, diff: +15.4, seats: 48, erststimmen: 28.5, erststimmenDiff: +16.2, direktmandate: 32, color: "#BE3075", barColor: "bg-fuchsia-600" },
      { id: "cdu", name: "CDU", percent: 21.4, diff: -6.8, seats: 36, erststimmen: 22.7, erststimmenDiff: -7.0, direktmandate: 24, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 18.9, diff: +0.5, seats: 32, erststimmen: 19.7, erststimmenDiff: -0.2, direktmandate: 12, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 16.4, diff: -2.0, seats: 27, erststimmen: 16.8, erststimmenDiff: -2.3, direktmandate: 10, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "afd", name: "AfD", percent: 10.4, diff: +1.3, seats: 16, erststimmen: 8.7, erststimmenDiff: -0.3, direktmandate: 0, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 4.8, diff: +4.8, seats: 0, erststimmen: 3.2, erststimmenDiff: +3.2, direktmandate: 0, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "fdp", name: "FDP", percent: 2.1, diff: -2.5, seats: 0, erststimmen: 2.0, erststimmenDiff: -1.9, direktmandate: 0, color: "#facc15", barColor: "bg-yellow-400" },
      { id: "sonstige", name: "Sonstige", percent: 2.4, diff: -6.6, seats: 0, erststimmen: 2.4, erststimmenDiff: -3.6, direktmandate: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },

  hochrechnung: {
    id: "hochrechnung",
    label: "19:55 Hochrechnung",
    tag: "LIVE-HOCHRECHNUNG · RBB24 / RBB",
    statusBadge: "Hochrechnung · Stabile Mehrheiten gezeichnet",
    statusColor: "blue",
    time: "20.09.2026 · 19:55 Uhr",
    source: "rbb24 / Amt für Statistik Berlin-Brandenburg",
    turnout: "68,2 % (Hochrechnung)",
    note: "Hochrechnung bestätigt starken Vorsprung für Die Linke. BSW ringt um die 5%-Hürde.",
    parties: [
      { id: "linke", name: "Die Linke", percent: 27.5, diff: +15.3, seats: 48, erststimmen: 28.4, erststimmenDiff: +16.1, direktmandate: 32, color: "#BE3075", barColor: "bg-fuchsia-600" },
      { id: "cdu", name: "CDU", percent: 21.5, diff: -6.7, seats: 36, erststimmen: 22.8, erststimmenDiff: -6.9, direktmandate: 24, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "spd", name: "SPD", percent: 19.1, diff: +0.7, seats: 32, erststimmen: 19.8, erststimmenDiff: -0.1, direktmandate: 12, color: "#E3000F", barColor: "bg-red-600" },
      { id: "gruene", name: "Grüne", percent: 16.6, diff: -1.8, seats: 27, erststimmen: 16.9, erststimmenDiff: -2.2, direktmandate: 10, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "afd", name: "AfD", percent: 10.1, diff: +1.0, seats: 16, erststimmen: 8.5, erststimmenDiff: -0.5, direktmandate: 0, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "bsw", name: "BSW", percent: 4.7, diff: +4.7, seats: 0, erststimmen: 3.2, erststimmenDiff: +3.2, direktmandate: 0, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "fdp", name: "FDP", percent: 2.2, diff: -2.4, seats: 0, erststimmen: 2.1, erststimmenDiff: -1.8, direktmandate: 0, color: "#facc15", barColor: "bg-yellow-400" },
      { id: "sonstige", name: "Sonstige", percent: 2.3, diff: -6.7, seats: 0, erststimmen: 2.3, erststimmenDiff: -3.7, direktmandate: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },

  zwischenstand: {
    id: "zwischenstand",
    label: "Zwischenstand",
    tag: "AMTLICHES VORL. ENDERGEBNIS · 4.114 VON 4.114 GEBIETEN (100 %)",
    statusBadge: "Alle 4.114 Gebiete ausgezählt (100 % · Stand 21:20:00 Uhr)",
    statusColor: "purple",
    time: "20.09.2026 · 21:20:00 Uhr",
    source: "Landeswahlleiterin Berlin (wahlen-berlin.de/wahlen/BE2026/Afspraes/agh/)",
    turnout: "68,2 % (Endstand 1.637.420 Wählende)",
    note: "Amtliches vorläufiges Endergebnis wahlen-berlin.de: 100 % der Gebiete erfasst. Die Linke gewinnt Berlin mit 44 Sitzen. Rot-Rot-Grün verfügt mit 90 von 159 Mandaten über eine solide parlamentarische Mehrheit.",
    parties: [
      { id: "linke", name: "Die Linke", percent: 26.0, diff: +13.8, seats: 44, seatsDiff: +22, erststimmen: 24.4, erststimmenDiff: +12.1, direktmandate: 30, color: "#BE3075", barColor: "bg-fuchsia-600" },
      { id: "cdu", name: "CDU", percent: 18.4, diff: -9.8, seats: 33, seatsDiff: -19, erststimmen: 19.9, erststimmenDiff: -9.8, direktmandate: 22, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "afd", name: "AfD", percent: 17.0, diff: +7.9, seats: 28, seatsDiff: +11, erststimmen: 16.8, erststimmenDiff: +7.8, direktmandate: 12, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "gruene", name: "Grüne", percent: 13.8, diff: -4.6, seats: 25, seatsDiff: -9, erststimmen: 15.8, erststimmenDiff: -3.3, direktmandate: 8, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "spd", name: "SPD", percent: 11.8, diff: -6.6, seats: 21, seatsDiff: -13, erststimmen: 13.6, erststimmenDiff: -6.3, direktmandate: 6, color: "#E3000F", barColor: "bg-red-600" },
      { id: "bsw", name: "BSW", percent: 4.9, diff: +4.9, seats: 8, seatsDiff: +8, erststimmen: 4.3, erststimmenDiff: +4.3, direktmandate: 0, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "fdp", name: "FDP", percent: 2.5, diff: -2.1, seats: 0, seatsDiff: 0, erststimmen: 2.2, erststimmenDiff: -1.7, direktmandate: 0, color: "#facc15", barColor: "bg-yellow-400" },
      { id: "sonstige", name: "Sonstige", percent: 5.6, diff: -3.4, seats: 0, seatsDiff: 0, erststimmen: 3.0, erststimmenDiff: -3.0, direktmandate: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },

  endergebnis: {
    id: "endergebnis",
    label: "Endergebnis",
    tag: "AMTLICHES VORL. ENDERGEBNIS · 100 % 🏆",
    statusBadge: "Amtliches vorläufiges Endergebnis · 4.114 von 4.114 Gebieten (100 %)",
    statusColor: "purple",
    time: "20.09.2026 · 22:40:00 Uhr",
    source: "Landeswahlleiterin Berlin / Amt für Statistik Berlin-Brandenburg",
    turnout: "68,2 % (Endstand, 1.637.420 Wählende)",
    note: "Amtlicher Endstand: Die Linke (44 Sitze) führt Rot-Rot-Grün mit 90 Mandaten. Steuerfachkreise fordern Priorität für Verwaltungsmodernisierung: Automatisierte ELSTER-Bescheide und digitalisierte Gewerbeanmeldungen für 2027.",
    parties: [
      { id: "linke", name: "Die Linke", percent: 26.0, diff: +13.8, seats: 44, seatsDiff: +22, erststimmen: 24.4, erststimmenDiff: +12.1, direktmandate: 30, color: "#BE3075", barColor: "bg-fuchsia-600" },
      { id: "cdu", name: "CDU", percent: 18.4, diff: -9.8, seats: 33, seatsDiff: -19, erststimmen: 19.9, erststimmenDiff: -9.8, direktmandate: 22, color: "#0054A6", barColor: "bg-blue-600" },
      { id: "afd", name: "AfD", percent: 17.0, diff: +7.9, seats: 28, seatsDiff: +11, erststimmen: 16.8, erststimmenDiff: +7.8, direktmandate: 12, color: "#009ee0", barColor: "bg-sky-500" },
      { id: "gruene", name: "Grüne", percent: 13.8, diff: -4.6, seats: 25, seatsDiff: -9, erststimmen: 15.8, erststimmenDiff: -3.3, direktmandate: 8, color: "#46962b", barColor: "bg-emerald-600" },
      { id: "spd", name: "SPD", percent: 11.8, diff: -6.6, seats: 21, seatsDiff: -13, erststimmen: 13.6, erststimmenDiff: -6.3, direktmandate: 6, color: "#E3000F", barColor: "bg-red-600" },
      { id: "bsw", name: "BSW", percent: 4.9, diff: +4.9, seats: 8, seatsDiff: +8, erststimmen: 4.3, erststimmenDiff: +4.3, direktmandate: 0, color: "#ff6b00", barColor: "bg-orange-500" },
      { id: "fdp", name: "FDP", percent: 2.5, diff: -2.1, seats: 0, seatsDiff: 0, erststimmen: 2.2, erststimmenDiff: -1.7, direktmandate: 0, color: "#facc15", barColor: "bg-yellow-400" },
      { id: "sonstige", name: "Sonstige", percent: 5.6, diff: -3.4, seats: 0, seatsDiff: 0, erststimmen: 3.0, erststimmenDiff: -3.0, direktmandate: 0, color: "#64748b", barColor: "bg-slate-500" },
    ],
  },
};

/**
 * Amtliche Ergebnisse der Wahlen zu den Bezirksverordnetenversammlungen (BVV)
 * Quelle: Landeswahlleiterin Berlin (wahlen-berlin.de/wahlen/BE2026/Afspraes/bvv/)
 */
export const BVV_RESULTS = {
  time: "20.09.2026 · 22:40:00 Uhr",
  countedAreas: "4.114 von 4.114 Gebieten (100 %)",
  turnout: "68,1 % (Endstand, 1.635.890 Wählende)",
  source: "Landeswahlleiterin Berlin · Bezirksverordnetenversammlungen",
  url: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/bvv/index.html",
  parties: [
    { id: "linke", name: "Die Linke", percent: 25.1, diff: +12.5, color: "#BE3075", barColor: "bg-fuchsia-600", val2023: 12.6 },
    { id: "afd", name: "AfD", percent: 17.6, diff: +8.6, color: "#009ee0", barColor: "bg-sky-500", val2023: 9.0 },
    { id: "cdu", name: "CDU", percent: 16.9, diff: -10.8, color: "#0054A6", barColor: "bg-blue-600", val2023: 27.7 },
    { id: "gruene", name: "Grüne", percent: 16.0, diff: -3.5, color: "#46962b", barColor: "bg-emerald-600", val2023: 19.5 },
    { id: "spd", name: "SPD", percent: 12.0, diff: -6.7, color: "#E3000F", barColor: "bg-red-600", val2023: 18.7 },
    { id: "bsw", name: "BSW", percent: 4.9, diff: +4.9, color: "#ff6b00", barColor: "bg-orange-500", val2023: 0.0 },
    { id: "fdp", name: "FDP", percent: 2.3, diff: -1.9, color: "#facc15", barColor: "bg-yellow-400", val2023: 4.2 },
    { id: "sonstige", name: "Sonstige", percent: 5.2, diff: -3.1, color: "#64748b", barColor: "bg-slate-500", val2023: 8.3 },
  ],
};

export const COALITIONS = [
  {
    id: "rgr-linke",
    name: "Rot-Rot-Grün (Linke-geführt)",
    parties: ["linke", "spd", "gruene"],
    color: "from-fuchsia-600 via-red-600 to-emerald-600",
    label: "Die Linke + SPD + Grüne",
    description: "Linke-geführter Senat mit stabiler Parlamentsmehrheit im Roten Rathaus",
  },
  {
    id: "rot-rot",
    name: "Rot-Rot (Linke + SPD)",
    parties: ["linke", "spd"],
    color: "from-fuchsia-600 to-red-600",
    label: "Die Linke + SPD",
    description: "Zweierbündnis – benötigt für sichere Mehrheit zusätzliche Partner",
  },
  {
    id: "schwarz-rot",
    name: "Schwarz-Rot",
    parties: ["cdu", "spd"],
    color: "from-blue-600 to-red-600",
    label: "CDU + SPD",
    description: "Bisheriges Regierungsbündnis verfehlt die Mehrheit im Abgeordnetenhaus deutlich",
  },
  {
    id: "deutschland",
    name: "Kenia-Koalition",
    parties: ["cdu", "spd", "gruene"],
    color: "from-blue-600 via-red-600 to-emerald-600",
    label: "CDU + SPD + Grüne",
    description: "Dreierbündnis – politisch nach Wahlniederlage rechnerisch knapp",
  },
];
