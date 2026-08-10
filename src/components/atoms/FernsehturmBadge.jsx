import { fontMono, T } from "../../config/tokens";

/**
 * FernsehturmBadge — Minimalistische Berliner Fernsehturm Vektor-Silhouette
 * Verleiht der Seite authentischen Berliner Tech-Charakter.
 */
export const FernsehturmIcon = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block shrink-0"
  >
    {/* Turmspitze */}
    <line x1="12" y1="0" x2="12" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    {/* Kugelsegment (Fernsehturm Kugel) */}
    <circle cx="12" cy="11" r="4.5" stroke={color} strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="11" r="1.5" fill={color} />
    {/* Turmschaft / Beine */}
    <line x1="12" y1="15.5" x2="12" y2="32" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="18" x2="7" y2="32" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="12" y1="18" x2="17" y2="32" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const FernsehturmBadge = ({ label = "BERLIN TECH METROPOLE" }) => {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
      style={{
        ...fontMono,
        backgroundColor: T.wash,
        border: `1px solid ${T.line}`,
        color: T.text,
      }}
    >
      <FernsehturmIcon size={16} color={T.blue} />
      <span>{label}</span>
    </span>
  );
};

export default FernsehturmBadge;
