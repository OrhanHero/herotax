import { CheckCircle2, Landmark } from "lucide-react";
import { ELECTION_CONFIG, COALITIONS } from "../../../data/electionResults";

/** Sitze und Anteile je Koalition aus den Parteiergebnissen der aktuellen Phase. */
const computeCoalitions = (parties) => {
  const partyMap = new Map(parties.map((p) => [p.id, p]));
  return COALITIONS.map((c) => {
    let totalSeats = 0;
    let totalPercent = 0;
    c.parties.forEach((pid) => {
      const p = partyMap.get(pid);
      if (p) {
        totalSeats += p.seats || 0;
        totalPercent += p.percent || 0;
      }
    });
    return {
      ...c,
      totalSeats,
      totalPercent: Number(totalPercent.toFixed(1)),
      hasMajority: totalSeats >= ELECTION_CONFIG.majoritySeats,
    };
  });
};

/** ElectionCoalitionMatrix — Koalitionsrechner & Mehrheitsbarometer (AGH). */
const ElectionCoalitionMatrix = ({ parties }) => {
  const coalitions = computeCoalitions(parties);

  return (
    <div className="relative z-10 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-white">
          <Landmark size={14} className="text-amber-400" />
          <span>KOALITIONS-BAROMETER · ROTES RATHAUS 2026</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Mehrheit ab {ELECTION_CONFIG.majoritySeats} von {ELECTION_CONFIG.totalSeats} Sitzen
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-2.5">
        {coalitions.map((c) => (
          <div
            key={c.id}
            className={`p-3 rounded-lg border transition-all ${
              c.hasMajority
                ? "bg-slate-900/90 border-emerald-500/40 shadow-sm shadow-emerald-500/10"
                : "bg-slate-900/40 border-slate-800 opacity-75"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-white flex items-center gap-1.5 truncate">
                <span className={`w-2 h-2 rounded-full shrink-0 ${c.hasMajority ? "bg-emerald-400" : "bg-slate-500"}`} />
                <span className="truncate">{c.name}</span>
              </span>
              <span className={`font-mono text-xs shrink-0 ${c.hasMajority ? "text-emerald-300 font-bold" : "text-slate-400"}`}>
                {c.totalSeats} Sitze ({c.totalPercent}%)
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="truncate pr-1">{c.label}</span>
              {c.hasMajority ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 shrink-0">
                  <CheckCircle2 size={10} />
                  Mehrheit
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 bg-slate-800/40 px-1.5 py-0.5 rounded shrink-0">
                  -{ELECTION_CONFIG.majoritySeats - c.totalSeats} Sitze
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionCoalitionMatrix;
