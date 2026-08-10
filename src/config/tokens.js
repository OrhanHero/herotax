/* ── DESIGN TOKENS · "Berliner Amt & Tech Blueprint" ───────────────────────── */
export const T = {
  paper: "#F8F8F4", // Amtspapier-Weiß / Warm Archive Paper
  card: "#FFFFFF", // Karten
  wash: "#EFEFE8", // Technisches Amts-Grau / Technical Wash
  line: "#DFDFD8", // Hairlines
  lineSoft: "#E8E8E2",
  text: "#121215", // Amtliches Tiefschwarz für Typo-Kontrast
  muted: "#5A5A62", // Sekundärtext
  faint: "#8E8E98", // Meta-Angaben
  blue: "#2337E8", // Urbanes Ultramarin — Aktion & Autorität
  blueDim: "rgba(35,55,232,0.07)",
  blueBorder: "rgba(35,55,232,0.22)",
  blueInk: "#FFFFFF", // Text auf Blau
  berlinRed: "#E10600", // Berliner Bär Rot / Amtssiegel
  berlinRedDim: "rgba(225, 6, 0, 0.06)",
  berlinRedBorder: "rgba(225, 6, 0, 0.25)",
  berlinGold: "#FFB800", // Signal-Amber
  error: "#D92D20",
  shadow: "0 2px 4px rgba(18,18,21,0.04), 0 12px 28px -12px rgba(18,18,21,0.08)",
  blueprintGrid: "rgba(35, 55, 232, 0.06)",
};

export const fontDisplay = { fontFamily: "'Archivo', sans-serif" };
export const fontMono = { fontFamily: "'IBM Plex Mono', monospace" };

export const cardBase = {
  backgroundColor: T.card,
  border: `1px solid ${T.line}`,
  boxShadow: T.shadow,
};

export const blueprintCard = {
  backgroundColor: T.card,
  border: `1px solid ${T.line}`,
  boxShadow: "0 2px 8px rgba(18,18,21,0.03)",
  position: "relative",
};
