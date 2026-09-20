import { useMemo } from "react";

/**
 * ParliamentSeatChart:
 * Visualisiert die amtliche Sitzverteilung des 20. Berliner Abgeordnetenhauses (159 Sitze)
 * als 180°-Halbkreisbogen nach offizieller Vorlage der Infratest-dimap / Tagesschau Wahlgrafik.
 *
 * Details der TV-Vorgabe:
 * - 180° Bogen von links (CDU) nach rechts (BSW)
 * - 6 Parteien: CDU (33), SPD (21), Grüne (25), Linke (44), AfD (28), BSW (8)
 * - 'Die Linke' als Wahlsiegerin radial erhaben (+12px Außenradius)
 * - '159 Sitze' zentriertes Badge im Innenkreis
 * - Dunkle, parteigefärbte Pill-Badges für die Sitze mit Diff-Werten
 * - Pinker Akzentstrich unter dem Wahlsieger Linke (+22)
 * - Stand- und Quellangabe unten links (Infratest dimap / tagesschau.de)
 */

function polarToCartesian(cx, cy, r, angleInDegrees) {
  const rad = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  };
}

function describeArcSlice(cx, cy, rIn, rOut, startAngle, endAngle) {
  const p1 = polarToCartesian(cx, cy, rOut, startAngle);
  const p2 = polarToCartesian(cx, cy, rOut, endAngle);
  const p3 = polarToCartesian(cx, cy, rIn, endAngle);
  const p4 = polarToCartesian(cx, cy, rIn, startAngle);

  const angleDiff = Math.abs(startAngle - endAngle);
  const largeArcFlag = angleDiff > 180 ? 1 : 0;

  return [
    `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
    `A ${rOut} ${rOut} 0 ${largeArcFlag} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
    `A ${rIn} ${rIn} 0 ${largeArcFlag} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

const DEFAULT_SEAT_DATA = [
  {
    id: "cdu",
    name: "CDU",
    seats: 33,
    diff: -19,
    arcColor: "#8893a4",
    pillBg: "#465469",
  },
  {
    id: "spd",
    name: "SPD",
    seats: 21,
    diff: -13,
    arcColor: "#f04e46",
    pillBg: "#5a2a32",
  },
  {
    id: "gruene",
    name: "Grüne",
    seats: 25,
    diff: -9,
    arcColor: "#8cd600",
    pillBg: "#39552b",
  },
  {
    id: "linke",
    name: "Linke",
    seats: 44,
    diff: +22,
    arcColor: "#f46b9f",
    pillBg: "#662c4a",
    isWinner: true,
  },
  {
    id: "afd",
    name: "AfD",
    seats: 28,
    diff: +11,
    arcColor: "#1eb8f0",
    pillBg: "#1c4e6e",
  },
  {
    id: "bsw",
    name: "BSW",
    seats: 8,
    diff: +8,
    arcColor: "#be699b",
    pillBg: "#54314e",
  },
];

const ParliamentSeatChart = ({
  parties = DEFAULT_SEAT_DATA,
  totalSeats = 159,
  time = "20.09.2026 • 19:57 Uhr",
  source = "infratest dimap",
  sourceUrl = "https://www.tagesschau.de/inland/landtagswahlen/berlin/2026/ergebnisse",
}) => {
  // Berechne Bogenwinkel für jede Partei (180° Gesamtwinkel)
  const slices = useMemo(() => {
    let currentAngle = 180; // Start horizontal ganz links
    const cx = 250;
    const cy = 210;
    const rIn = 92;
    const rOutBase = 175;
    const rOutElevated = 187; // Wahlsiegerin 'Linke' ist radial erhöht

    return parties.map((p) => {
      const angleSpan = (p.seats / totalSeats) * 180;
      const startAngle = currentAngle;
      const endAngle = currentAngle - angleSpan;
      currentAngle = endAngle;

      const isWinner = p.isWinner || p.id === "linke";
      const rOut = isWinner ? rOutElevated : rOutBase;

      const pathData = describeArcSlice(cx, cy, rIn, rOut, startAngle, endAngle);

      return {
        ...p,
        startAngle,
        endAngle,
        pathData,
      };
    });
  }, [parties, totalSeats]);

  return (
    <div className="rounded-2xl p-6 sm:p-8 bg-[#151e33] text-white shadow-2xl border border-slate-800/80 w-full select-none">
      {/* ── 1. Titelzeile nach Vorlage ── */}
      <div className="mb-3 text-left">
        <span className="text-xs sm:text-sm font-sans font-medium text-slate-300 block tracking-normal">
          Abgeordnetenhauswahl Berlin 2026
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5">
          Sitzverteilung
        </h2>
      </div>

      {/* ── 2. Halbkreis-Diagramm (SVG) ── */}
      <div className="relative w-full max-w-[480px] mx-auto my-2">
        <svg
          viewBox="60 15 380 210"
          className="w-full h-auto overflow-visible"
        >
          {/* Slices */}
          {slices.map((slice) => (
            <path
              key={slice.id}
              d={slice.pathData}
              fill={slice.arcColor}
              stroke="#151e33"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="transition-all duration-300 hover:brightness-110 cursor-pointer"
            >
              <title>{`${slice.name}: ${slice.seats} Sitze (${slice.diff > 0 ? '+' : ''}${slice.diff})`}</title>
            </path>
          ))}

          {/* Mittiges Badge: 159 Sitze */}
          <g transform="translate(250, 172)">
            <rect
              x="-46"
              y="-12"
              width="92"
              height="24"
              rx="4"
              fill="#242f44"
            />
            <text
              x="0"
              y="4.5"
              textAnchor="middle"
              className="text-[12px] font-sans font-bold fill-white tracking-wide"
            >
              {totalSeats} Sitze
            </text>
          </g>
        </svg>
      </div>

      {/* ── 3. Horizontale Parteien-Legende nach Vorlage ── */}
      <div className="grid grid-cols-6 gap-1 sm:gap-2 text-center pt-5 mt-2 max-w-[460px] mx-auto">
        {parties.map((p) => {
          const isWinner = p.isWinner || p.id === "linke";
          const diffText = p.diff > 0 ? `+${p.diff}` : `${p.diff}`;
          return (
            <div key={p.id} className="flex flex-col items-center">
              {/* Parteiname */}
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight block">
                {p.name}
              </span>

              {/* Farbiges Sitz-Badge */}
              <div
                className="mt-1.5 w-9 sm:w-10 h-6 rounded text-xs sm:text-[13px] font-black text-white shadow-sm flex items-center justify-center"
                style={{ backgroundColor: p.pillBg }}
              >
                {p.seats}
              </div>

              {/* Diff-Wert */}
              <span className="text-xs font-medium text-slate-200 mt-1">
                {diffText}
              </span>

              {/* Wahlsiegerin-Unterstrich für Linke */}
              <div
                className={`w-7 sm:w-8 h-[3px] rounded-full mt-1.5 transition-all ${
                  isWinner ? "bg-[#f46b9f]" : "bg-transparent"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* ── 4. Fusszeile nach Vorlage (unten links) ── */}
      <div className="pt-6 mt-4 border-t border-slate-800/60 text-xs text-slate-400 text-left space-y-0.5">
        <div>Stand: {time} | Sitze</div>
        <div className="flex items-center gap-1.5">
          <span>Quelle: {source}</span>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 underline font-normal"
            >
              (tagesschau.de)
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export { DEFAULT_SEAT_DATA };
export default ParliamentSeatChart;
