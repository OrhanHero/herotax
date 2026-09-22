import { useState, useMemo } from "react";

/**
 * ParliamentSeatChart:
 * Interaktive Visualisierung der amtlichen Sitzverteilung (159 Sitze) des 20. Berliner Abgeordnetenhauses
 * nach Vorlage der Infratest-dimap / Tagesschau TV-Wahlgrafik.
 *
 * Interaktive Features:
 * - Dynamisches Mouseover auf jedem Bogen-Segment und in der Legende
 * - Der aktive Balken hebt sich radial nach oben hervor ("Balken bewegt sich")
 * - Passgenauer SVG-Tooltip mit Pfeilspitze direkt auf dem Bogen
 * - Untere Farbakzent-Linie wandert dynamisch zur aktiven Partei
 * - Volle Touch-Unterstützung für mobile Endgeräte
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
    fullName: "CDU",
    seats: 34,
    diff: -18,
    arcColor: "#8893a4",
    pillBg: "#465469",
    tooltipBg: "#394758",
    accentColor: "#8893a4",
    singleLine: true,
  },
  {
    id: "spd",
    name: "SPD",
    fullName: "SPD",
    seats: 22,
    diff: -12,
    arcColor: "#f04e46",
    pillBg: "#5a2a32",
    tooltipBg: "#54242a",
    accentColor: "#f04e46",
    singleLine: true,
  },
  {
    id: "gruene",
    name: "Grüne",
    fullName: "Bündnis 90/Die Grünen",
    seats: 26,
    diff: -8,
    arcColor: "#8cd600",
    pillBg: "#39552b",
    tooltipBg: "#334a26",
    accentColor: "#8cd600",
    singleLine: false,
  },
  {
    id: "linke",
    name: "Linke",
    fullName: "Die Linke",
    seats: 48,
    diff: +26,
    arcColor: "#f46b9f",
    pillBg: "#662c4a",
    tooltipBg: "#482638",
    accentColor: "#f46b9f",
    singleLine: true,
    isWinner: true,
  },
  {
    id: "afd",
    name: "AfD",
    fullName: "AfD",
    seats: 29,
    diff: +12,
    arcColor: "#1eb8f0",
    pillBg: "#1c4e6e",
    tooltipBg: "#18445e",
    accentColor: "#1eb8f0",
    singleLine: true,
  },
];

const ParliamentSeatChart = ({
  parties = DEFAULT_SEAT_DATA,
  totalSeats = 159,
  time = "20.09.2026 • 19:57 Uhr",
  source = "infratest dimap",
  sourceUrl = "https://www.tagesschau.de/inland/landtagswahlen/berlin/2026/ergebnisse",
}) => {
  // Aktive Partei bei Mouseover (Standard: 'linke' als Wahlsiegerin)
  const [hoveredId, setHoveredId] = useState("linke");

  const cx = 250;
  const cy = 210;
  const rIn = 92;
  const rOutBase = 175;
  const rOutElevated = 188; // Erhöhter Bogen bei aktivem Mouseover

  // Berechne Bogenwinkel und Pfaddaten für jede Partei
  const slices = useMemo(() => {
    let currentAngle = 180; // Start horizontal ganz links
    const result = [];

    for (const p of parties) {
      const angleSpan = (p.seats / totalSeats) * 180;
      const startAngle = currentAngle;
      const endAngle = currentAngle - angleSpan;
      const midAngle = (startAngle + endAngle) / 2;
      currentAngle = endAngle;

      const isHovered = p.id === hoveredId;
      const rOut = isHovered ? rOutElevated : rOutBase;

      const pathData = describeArcSlice(cx, cy, rIn, rOut, startAngle, endAngle);
      const anchor = polarToCartesian(cx, cy, rOut, midAngle);

      result.push({
        ...p,
        startAngle,
        endAngle,
        midAngle,
        rOut,
        pathData,
        anchor,
        isHovered,
      });
    }

    return result;
  }, [parties, totalSeats, hoveredId]);

  // Aktive Partei für den Tooltip
  const activeSlice = slices.find((s) => s.id === hoveredId) || slices[3];

  // Tooltip Geometrie berechnen
  const tooltipLayout = useMemo(() => {
    if (!activeSlice) return null;
    const isTwoLine = !activeSlice.singleLine;
    const width = isTwoLine ? 142 : 116;
    const height = isTwoLine ? 42 : 24;

    const anchorX = activeSlice.anchor.x;
    const anchorY = activeSlice.anchor.y;

    // Horizontale Platzierung passend zur Vorlage
    let boxX = anchorX - width / 2;
    if (activeSlice.id === "gruene") {
      boxX = anchorX - width * 0.72; // Pfeil rechtsbündiger wie in Vorlage 2
    } else if (activeSlice.id === "cdu") {
      boxX = Math.max(50, anchorX - 25);
    } else if (activeSlice.id === "spd") {
      boxX = Math.max(65, anchorX - width / 2);
    } else if (activeSlice.id === "linke") {
      boxX = anchorX - width / 2; // exakt zentriert wie in Vorlage 1
    } else if (activeSlice.id === "afd") {
      boxX = Math.min(320, anchorX - width * 0.65);
    } else if (activeSlice.id === "bsw") {
      boxX = Math.min(320, anchorX - width * 0.85);
    }

    const boxY = anchorY - 6 - height;
    const pointerX = anchorX;
    const pointerY = anchorY;

    return { width, height, boxX, boxY, pointerX, pointerY, isTwoLine };
  }, [activeSlice]);

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 bg-[#151e33] text-white shadow-2xl border border-slate-800/80 w-full select-none transition-colors duration-300"
      onMouseLeave={() => setHoveredId("linke")}
    >
      {/* ── 1. Titelzeile nach TV-Vorlage ── */}
      <div className="mb-3 text-left">
        <span className="text-xs sm:text-sm font-sans font-medium text-slate-300 block tracking-normal">
          Abgeordnetenhauswahl Berlin 2026
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5">
          Sitzverteilung
        </h2>
      </div>

      {/* ── 2. Interaktives Halbkreis-Diagramm (SVG) ── */}
      <div className="relative w-full max-w-[490px] mx-auto my-2">
        <svg
          viewBox="40 -30 420 265"
          className="w-full h-auto overflow-visible"
        >
          {/* Slices: Reagieren interaktiv auf Mouseover / Touch */}
          {slices.map((slice) => (
            <path
              key={slice.id}
              d={slice.pathData}
              fill={slice.arcColor}
              stroke="#151e33"
              strokeWidth="2.5"
              strokeLinejoin="round"
              style={{
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                filter: slice.isHovered ? "brightness(1.04)" : "brightness(0.98)",
              }}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId(slice.id)}
              onClick={() => setHoveredId(slice.id)}
            >
              <title>{`${slice.name}: ${slice.seats} Sitze (${slice.diff > 0 ? "+" : ""}${slice.diff})`}</title>
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

          {/* ── Interaktiver Tooltip (folgt exakt der aktiven Partei) ── */}
          {tooltipLayout && activeSlice && (
            <g
              className="transition-all duration-200 pointer-events-none"
              style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.35))" }}
            >
              {/* Tooltip Box Hintergrund */}
              <rect
                x={tooltipLayout.boxX}
                y={tooltipLayout.boxY}
                width={tooltipLayout.width}
                height={tooltipLayout.height}
                rx="4"
                fill={activeSlice.tooltipBg}
              />

              {/* Nach unten zeigendes Dreieck zur Bogenkante */}
              <polygon
                points={`
                  ${tooltipLayout.pointerX - 6},${tooltipLayout.boxY + tooltipLayout.height}
                  ${tooltipLayout.pointerX + 6},${tooltipLayout.boxY + tooltipLayout.height}
                  ${tooltipLayout.pointerX},${tooltipLayout.pointerY}
                `}
                fill={activeSlice.tooltipBg}
              />

              {/* Tooltip Beschriftung nach Vorlage */}
              {tooltipLayout.isTwoLine ? (
                <text fill="white" className="font-sans">
                  <tspan
                    x={tooltipLayout.boxX + 8}
                    y={tooltipLayout.boxY + 16}
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {activeSlice.fullName}:
                  </tspan>
                  <tspan
                    x={tooltipLayout.boxX + 8}
                    y={tooltipLayout.boxY + 32}
                    fontSize="12"
                    fontWeight="900"
                  >
                    {activeSlice.seats} Sitze
                  </tspan>
                </text>
              ) : (
                <text
                  x={tooltipLayout.boxX + tooltipLayout.width / 2}
                  y={tooltipLayout.boxY + 16}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11.5"
                  className="font-sans"
                >
                  <tspan fontWeight="bold">{activeSlice.fullName}: </tspan>
                  <tspan fontWeight="900">{activeSlice.seats} Sitze</tspan>
                </text>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* ── 3. Interaktive Parteien-Legende nach Vorlage ── */}
      <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center pt-5 mt-2 max-w-[460px] mx-auto">
        {parties.map((p) => {
          const isSelected = p.id === hoveredId;
          const diffText = p.diff > 0 ? `+${p.diff}` : `${p.diff}`;
          return (
            <button
              key={p.id}
              type="button"
              onMouseEnter={() => setHoveredId(p.id)}
              onClick={() => setHoveredId(p.id)}
              className="flex flex-col items-center group cursor-pointer focus:outline-hidden transition-transform duration-200"
            >
              {/* Parteiname */}
              <span
                className={`text-xs sm:text-sm font-bold tracking-tight block transition-colors duration-200 ${
                  isSelected ? "text-white scale-105" : "text-slate-200 group-hover:text-white"
                }`}
              >
                {p.name}
              </span>

              {/* Farbiges Sitz-Badge */}
              <div
                className={`mt-1.5 w-9 sm:w-10 h-6 rounded text-xs sm:text-[13px] font-black text-white shadow-sm flex items-center justify-center transition-all duration-200 ${
                  isSelected ? "ring-2 ring-white/30 scale-105" : ""
                }`}
                style={{ backgroundColor: p.pillBg }}
              >
                {p.seats}
              </div>

              {/* Diff-Wert */}
              <span className="text-xs font-medium text-slate-200 mt-1">
                {diffText}
              </span>

              {/* Farbakzent-Unterstrich (wandert dynamisch zur aktiven Partei) */}
              <div
                className="w-7 sm:w-8 h-[3px] rounded-full mt-1.5 transition-all duration-200"
                style={{
                  backgroundColor: isSelected ? p.accentColor : "transparent",
                  boxShadow: isSelected ? `0 0 8px ${p.accentColor}80` : "none",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* ── 4. Fusszeile nach TV-Vorlage (unten links) ── */}
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
