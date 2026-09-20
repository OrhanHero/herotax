import { useState } from "react";
import { CheckCircle2, ExternalLink, RefreshCw, ShieldCheck, Building, Landmark } from "lucide-react";
import { ELECTION_CONFIG, ELECTION_STAGES, COALITIONS } from "../../data/electionResults";
import { fontDisplay } from "../../config/tokens";

/**
 * ElectionResultsLiveTracker:
 * Interaktives Live-Ergebnis- und Prognose-Dashboard für die Berlin-Wahl 2026.
 * Integriert Vorbereitung für offizielle Wahlamts-Daten (wahlen-berlin.de) und rbb24 Prognosen.
 */
const ElectionResultsLiveTracker = () => {
  const [stageKey, setStageKey] = useState("endergebnis"); // 'countdown' | 'prognose' | 'hochrechnung' | 'endergebnis'
  const currentStage = ELECTION_STAGES[stageKey] || ELECTION_STAGES.endergebnis;

  // Berechne Koalitionsdaten basierend auf aktuellen Parteisitze und Prozenten
  const partyMap = new Map(currentStage.parties.map((p) => [p.id, p]));

  const coalitionsWithStats = COALITIONS.map((c) => {
    let totalSeats = 0;
    let totalPercent = 0;
    c.parties.forEach((pid) => {
      const p = partyMap.get(pid);
      if (p) {
        totalSeats += p.seats || 0;
        totalPercent += p.percent || 0;
      }
    });
    const hasMajority = totalSeats >= ELECTION_CONFIG.majoritySeats;
    return {
      ...c,
      totalSeats,
      totalPercent: Number(totalPercent.toFixed(1)),
      hasMajority,
    };
  });

  return (
    <div className="group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 bg-slate-900/95 backdrop-blur-md border border-amber-500/35 hover:border-amber-500/55 shadow-2xl overflow-hidden text-slate-100">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10 border-b border-slate-800 pb-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wide font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            LIVE-ERGEBNIS ZENTRALE 🗳️
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-300 bg-slate-800/90 px-2.5 py-0.5 rounded border border-slate-700/80 flex items-center gap-1">
            <Building size={11} className="text-blue-400" />
            Abgeordnetenhaus von Berlin
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 bg-slate-950/70 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {currentStage.time}
          </span>
        </div>
      </div>

      {/* Stage Selector / Live-Simulator Pills */}
      <div className="relative z-10 mb-5 p-1 bg-slate-950/70 rounded-xl border border-slate-800">
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <RefreshCw size={10} className="text-amber-400" />
            Vorschau-Modus (Wahltag-Phasen simulieren):
          </span>
          <span className="text-amber-300 font-bold">20. September 2026</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 pt-1">
          {Object.entries(ELECTION_STAGES).map(([key, stage]) => {
            const isActive = stageKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setStageKey(key)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                <span className="truncate">{stage.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Status Banner */}
      <div className="relative z-10 rounded-xl p-3.5 bg-slate-950/60 border border-slate-800 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-amber-300 uppercase tracking-wide">
              {currentStage.tag}
            </span>
            <span className="text-xs text-slate-400 font-mono">·</span>
            <span className="text-xs text-slate-300 font-medium">
              {currentStage.statusBadge}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {currentStage.note}
          </p>
        </div>
        <div className="shrink-0 text-right sm:border-l sm:border-slate-800 sm:pl-3 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Wahlbeteiligung</span>
          <span className="text-xs font-bold font-mono text-emerald-400">{currentStage.turnout}</span>
        </div>
      </div>

      {/* Main Party Results - Horizontal Progress Bars */}
      <div className="relative z-10 space-y-2.5 mb-6">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1 border-b border-slate-800 pb-1">
          <span>PARTEI</span>
          <div className="flex items-center gap-6">
            <span>± '23</span>
            <span>SITZE</span>
            <span className="w-14 text-right">STIMMEN %</span>
          </div>
        </div>

        {currentStage.parties.map((p) => {
          const diffFormatted = p.diff > 0 ? `+${p.diff.toFixed(1)}` : p.diff.toFixed(1);
          const diffColor = p.diff > 0 ? "text-emerald-400" : p.diff < 0 ? "text-red-400" : "text-slate-400";

          return (
            <div key={p.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white flex items-center gap-1.5 w-24">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: p.color }}
                  />
                  {p.name}
                </span>

                <div className="flex items-center gap-6 text-[11px]">
                  <span className={`w-10 text-right font-semibold ${diffColor}`}>
                    {p.id !== "sonstige" ? `${diffFormatted}%` : "—"}
                  </span>
                  <span className="w-10 text-right text-slate-300 font-bold">
                    {p.seats > 0 ? `${p.seats} S.` : "0 S."}
                  </span>
                  <span className="w-14 text-right text-base font-black text-white" style={{ ...fontDisplay }}>
                    {p.percent.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Bar */}
              <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 relative">
                {/* 5% Threshold Indicator Line */}
                <div
                  className="absolute top-0 bottom-0 w-[1px] bg-amber-400/50 z-10"
                  style={{ left: "5%" }}
                  title="5%-Sperrklausel (Hürde)"
                />
                <div
                  className={`h-full rounded-full transition-all duration-700 ${p.barColor}`}
                  style={{ width: `${Math.min(100, p.percent * 2.8)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Koalitions-Rechner & Mehrheitsbarometer */}
      <div className="relative z-10 p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-white">
            <Landmark size={14} className="text-amber-400" />
            <span>KOALITIONS-BAROMETER · MEHRHEIT IM ROTEN RATHAUS</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Mehrheit ab {ELECTION_CONFIG.majoritySeats} von {ELECTION_CONFIG.totalSeats} Sitzen
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-2.5">
          {coalitionsWithStats.map((c) => (
            <div
              key={c.id}
              className={`p-2.5 rounded-lg border transition-all ${
                c.hasMajority
                  ? "bg-slate-900/90 border-emerald-500/40 shadow-sm shadow-emerald-500/10"
                  : "bg-slate-900/40 border-slate-800 opacity-75"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-white flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${c.hasMajority ? "bg-emerald-400" : "bg-slate-500"}`} />
                  {c.name}
                </span>
                <span className={`font-mono text-xs ${c.hasMajority ? "text-emerald-300 font-bold" : "text-slate-400"}`}>
                  {c.totalSeats} Sitze ({c.totalPercent}%)
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{c.label}</span>
                {c.hasMajority ? (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    Mehrheit
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 bg-slate-800/40 px-1.5 py-0.5 rounded">
                    Keine Mehrheit (-{ELECTION_CONFIG.majoritySeats - c.totalSeats})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Data Source Badges & Verification Links */}
      <div className="relative z-10 pt-3 border-t border-slate-800 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-amber-400" />
            Offizielle Live-Quellen & Schnittstellen:
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Amtlich & Öffentlich
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={ELECTION_CONFIG.officialOfficeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-200 hover:text-white text-[11px] font-mono flex items-center justify-between gap-1.5 transition-all"
          >
            <div className="truncate">
              <span className="font-bold block">Landeswahlamt Berlin</span>
              <span className="text-[10px] text-slate-400">wahlen-berlin.de</span>
            </div>
            <ExternalLink size={12} className="shrink-0 text-blue-400" />
          </a>

          <a
            href={ELECTION_CONFIG.rbbDashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 hover:text-white text-[11px] font-mono flex items-center justify-between gap-1.5 transition-all"
          >
            <div className="truncate">
              <span className="font-bold block">rbb24 Wahl-Dashboard</span>
              <span className="text-[10px] text-amber-400">Prognose & Hochrechnung</span>
            </div>
            <ExternalLink size={12} className="shrink-0 text-amber-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ElectionResultsLiveTracker;
