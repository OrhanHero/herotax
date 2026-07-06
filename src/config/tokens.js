/* ── DESIGN TOKENS · "Berlin Tech White" ───────────────────────── */
export const T = {
  paper: "#FAFAF8", // Seitenhintergrund — warmes Tech-Weiß
  card: "#FFFFFF", // Karten
  wash: "#F1F1EE", // sanfte Flächen (Inputs, Panels)
  line: "#E4E4E0", // Hairlines
  lineSoft: "#EDEDEA",
  text: "#141417", // Fast-Schwarz für Typo-Kontrast
  muted: "#5F5F66", // Sekundärtext
  faint: "#93939B", // Meta-Angaben
  blue: "#2337E8", // Urbanes Ultramarin — Aktion & Autorität
  blueDim: "rgba(35,55,232,0.07)",
  blueBorder: "rgba(35,55,232,0.22)",
  blueInk: "#FFFFFF", // Text auf Blau
  error: "#D92D20",
  shadow: "0 1px 2px rgba(20,20,23,0.04), 0 8px 24px -12px rgba(20,20,23,0.10)",
};

export const fontDisplay = { fontFamily: "'Archivo', sans-serif" };
export const fontMono = { fontFamily: "'IBM Plex Mono', monospace" };

export const cardBase = {
  backgroundColor: T.card,
  border: `1px solid ${T.line}`,
  boxShadow: T.shadow,
};
