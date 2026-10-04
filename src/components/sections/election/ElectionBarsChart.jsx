import { BarChart2 } from "lucide-react";
import { fontDisplay } from "../../../config/tokens";
import { diffColorClass, diffLabel } from "./electionFormat";

/**
 * ElectionBarsChart — Säulendiagramm der Stimmenanteile.
 * Wird für AGH (Erst-/Zweitstimmen) und BVV gleichermaßen genutzt.
 *
 * rows: [{ id, name, color, value, diff, sub? }]
 *  - value: Prozentwert der Säule
 *  - diff:  Differenz zu 2023 in Prozentpunkten
 *  - sub:   optionale dritte Zeile (z. B. "48 Sitze")
 */
const ElectionBarsChart = ({ title, aside, rows, showThreshold = false, maxVal = 30 }) => (
  <div className="relative z-10 p-3.5 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800">
    <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-800/80 pb-2">
      <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-white">
        <BarChart2 size={15} className="text-amber-400" />
        <span>{title}</span>
      </div>
      {aside}
    </div>

    {/* A) Plot-Bereich: nur Säulen und 5 %-Referenzlinie */}
    <div className="relative h-44 w-full flex items-end justify-between gap-2 sm:gap-4 px-1">
      {showThreshold && (
        <div
          className="absolute left-0 right-0 border-b-2 border-dashed border-amber-400/50 z-0 pointer-events-none"
          style={{ bottom: `${(5 / maxVal) * 100}%` }}
        />
      )}
      {rows.map((r) => {
        const height = Math.max(6, Math.min(100, (r.value / maxVal) * 100));
        return (
          <div key={r.id} className="flex-1 flex flex-col items-center h-full justify-end relative z-10 group/col">
            <div className="mb-1.5 text-center font-mono">
              <span className="font-black text-white text-xs sm:text-base leading-none block" style={{ ...fontDisplay }}>
                {r.value.toFixed(1)}%
              </span>
            </div>
            <div
              className="w-full max-w-[44px] rounded-t-md transition-all duration-500 relative group-hover/col:brightness-110 shadow-lg"
              style={{ height: `${height}%`, backgroundColor: r.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20 rounded-t-md" />
            </div>
          </div>
        );
      })}
    </div>

    {/* B) Beschriftung: getrennt unterhalb des Plots */}
    <div className="flex justify-between gap-2 sm:gap-4 pt-3 mt-1 border-t border-slate-800 text-center px-1">
      {rows.map((r) => (
        <div key={r.id} className="flex-1 space-y-0.5">
          <div className="text-xs sm:text-sm font-bold text-white truncate font-mono">{r.name}</div>
          <div className={`text-[10px] sm:text-xs font-mono font-semibold ${diffColorClass(r.diff)}`}>{diffLabel(r)}</div>
          {r.sub && <div className="text-[10px] font-mono text-slate-300 font-bold">{r.sub}</div>}
        </div>
      ))}
    </div>
  </div>
);

export default ElectionBarsChart;
