import { fontDisplay } from "../../../config/tokens";
import { diffColorClass, diffLabel } from "./electionFormat";

/**
 * ElectionResultTable — Ergebniszeilen mit Fortschrittsbalken.
 *
 * rows: [{ id, name, color, value, diff, mandate? }]
 * valueLabel / mandateLabel: Spaltenköpfe. Ohne mandateLabel entfällt die Spalte.
 */
const ElectionResultTable = ({ rows, valueLabel = "ERGEBNIS", mandateLabel }) => (
  <div className="relative z-10 space-y-2">
    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-3 border-b border-slate-800 pb-1.5">
      <span>PARTEI</span>
      <div className="flex items-center gap-4 sm:gap-6 text-right">
        <span className="w-16 text-right text-slate-200 font-bold">{valueLabel}</span>
        <span className="w-16 text-right text-slate-400">DIFF &apos;23</span>
        {mandateLabel && <span className="w-16 text-right text-slate-200 font-bold">{mandateLabel}</span>}
      </div>
    </div>

    {rows.map((r) => (
      <div key={r.id} className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: r.color }} />
            <span>{r.name}</span>
          </span>
          <div className="flex items-center gap-4 sm:gap-6 text-[11px]">
            <span className="w-16 text-right font-black text-white text-sm" style={{ ...fontDisplay }}>
              {r.value.toFixed(1)}%
            </span>
            <span className={`w-16 text-right font-semibold ${diffColorClass(r.diff)}`}>{diffLabel(r)}</span>
            {mandateLabel && <span className="w-16 text-right text-slate-200 font-bold">{r.mandate}</span>}
          </div>
        </div>
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, r.value * 3.3)}%`, backgroundColor: r.color }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default ElectionResultTable;
