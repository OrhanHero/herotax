/* ── Wahl-Formatierung · gemeinsame Helfer für die Election-Teilkomponenten ── */

/** Differenz in Prozentpunkten mit Vorzeichen, z. B. "+2.4%" / "-1.0%". */
export const formatDiff = (diff) => (diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`);

/** Tailwind-Textfarbe passend zur Richtung der Differenz. */
export const diffColorClass = (diff) =>
  diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";

/** "Sonstige" bekommt keine Differenz — die Gruppe ist nicht vergleichbar. */
export const diffLabel = (row) => (row.id !== "sonstige" ? formatDiff(row.diff) : "—");
