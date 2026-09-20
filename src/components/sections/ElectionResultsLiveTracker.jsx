import { useState } from "react";
import { CheckCircle2, ExternalLink, ShieldCheck, Building, Landmark, BarChart2, Layers } from "lucide-react";
import { ELECTION_CONFIG, ELECTION_STAGES, BVV_RESULTS, COALITIONS } from "../../data/electionResults";
import { fontDisplay } from "../../config/tokens";

/**
 * ElectionResultsLiveTracker:
 * Amtliches Wahlergebnis- & Hochrechnungs-Dashboard für Berlin 2026.
 * Bietet direkte Umschaltung zwischen:
 * 1) Abgeordnetenhaus (AGH): Zweitstimmen (Listenstimme) & Erststimmen (Direktmandate)
 * 2) Bezirksverordnetenversammlungen (BVV) in allen 12 Berliner Bezirken
 * Mit visuellem 2-Säulen-Vergleich: Aktuelle Wahl (linke Säule) vs. Wahl 2023 (rechte Säule).
 */
const ElectionResultsLiveTracker = () => {
  // Wahl-Ebene: 'agh' (Abgeordnetenhaus) | 'bvv' (Bezirksverordnetenversammlungen)
  const [electionLevel, setElectionLevel] = useState("agh");

  // AGH Chronologie-Phase: 'prognose' | 'hochrechnung' | 'zwischenstand' | 'endergebnis'
  const [stageKey, setStageKey] = useState("zwischenstand");
  const currentStage = ELECTION_STAGES[stageKey] || ELECTION_STAGES.zwischenstand;

  // Stimmart bei AGH: 'zweitstimmen' | 'erststimmen'
  const [voteType, setVoteType] = useState("zweitstimmen");
  const isZweit = voteType === "zweitstimmen";

  // Berechne Koalitionsdaten basierend auf aktuellen Parteisitze und Prozenten (Zweitstimmen)
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

  // Skalierung für Säulen (max 32 % für optimale Visualisierung)
  const maxChartVal = 32;

  // Daten für die BVV-Anzeige
  const bvvParties = BVV_RESULTS.parties;

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
            AMTLICHE WAHLERGEBNISSE 🗳️
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-300 bg-slate-800/90 px-2.5 py-0.5 rounded border border-slate-700/80 flex items-center gap-1">
            <Building size={11} className="text-blue-400" />
            Berlin · 20. September 2026
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 bg-slate-950/70 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {electionLevel === "agh" ? currentStage.time : BVV_RESULTS.time}
          </span>
        </div>
      </div>

      {/* Wahl-Ebene Tabs: Abgeordnetenhaus (AGH) vs. Bezirke (BVV) */}
      <div className="relative z-10 mb-4 p-1.5 bg-slate-950/90 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setElectionLevel("agh")}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
              electionLevel === "agh"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Building size={13} />
            <span>20. Abgeordnetenhaus (AGH)</span>
          </button>
          <button
            type="button"
            onClick={() => setElectionLevel("bvv")}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
              electionLevel === "bvv"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Layers size={13} />
            <span>Bezirksverordnete (BVV)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <a
            href={electionLevel === "agh" ? ELECTION_CONFIG.aghUrl : ELECTION_CONFIG.bvvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline flex items-center gap-1 font-semibold"
          >
            <span>wahlen-berlin.de öffnen</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Falls Abgeordnetenhaus ausgewählt: Chronologie-Phasen & Erst-/Zweitstimmen Umschalter */}
      {electionLevel === "agh" ? (
        <>
          {/* Stage Selector / Wahltag Chronologie Pills */}
          <div className="relative z-10 mb-3.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Wahlergebnis-Chronologie &amp; Auszählungsstände:
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
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 flex items-center justify-center gap-1.5 ${
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

          {/* Umschalter: Zweitstimmen vs. Erststimmen */}
          <div className="relative z-10 mb-4 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setVoteType("zweitstimmen")}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isZweit
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span>Zweitstimmen (Listenstimme)</span>
                <span className="text-[10px] bg-blue-900/80 text-blue-200 px-1.5 py-0.5 rounded">159 Sitze</span>
              </button>
              <button
                type="button"
                onClick={() => setVoteType("erststimmen")}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                  !isZweit
                    ? "bg-fuchsia-700 text-white shadow-md shadow-fuchsia-700/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span>Erststimmen (Wahlkreisstimme)</span>
                <span className="text-[10px] bg-fuchsia-950/80 text-fuchsia-200 px-1.5 py-0.5 rounded">78 Direktmandate</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-400 text-center sm:text-right">
              {isZweit
                ? "Maßgeblich für Sitzverteilung & Regierungsmehrheit"
                : "Entscheidet über Direktkandidaten in den Wahlkreisen"}
            </span>
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

          {/* Säulen-Vergleich: Aktuelle Wahl (linke Säule) vs. Wahl 2023 (rechte Säule) */}
          <div className="relative z-10 p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-white">
                <BarChart2 size={15} className="text-amber-400" />
                <span>SÄULEN-VERGLEICH: {isZweit ? "ZWEITSTIMMEN" : "ERSTSTIMMEN"}</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-sm bg-fuchsia-500 shadow-xs" />
                  <span>Linke Säule: Aktuelle Wahl (2026)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 border border-slate-500" />
                  <span>Rechte Säule: Wahl 2023</span>
                </div>
              </div>
            </div>

            {/* Säulendiagramm Canvas */}
            <div className="relative h-52 w-full pt-6 pb-2 px-1 flex items-end justify-between gap-1 sm:gap-2.5">
              {/* 5% Sperrklausel Hurdle Line (bei Zweitstimmen) */}
              {isZweit && (
                <div
                  className="absolute left-0 right-0 border-b border-dashed border-amber-400/60 z-10 pointer-events-none flex items-center justify-end pr-2"
                  style={{ bottom: `${(5 / maxChartVal) * 100}%` }}
                >
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-amber-400/40 -mb-2.5 shadow-sm">
                    5 % Sperrklausel
                  </span>
                </div>
              )}

              {currentStage.parties.map((p) => {
                const currentVal = isZweit ? p.percent : (p.erststimmen ?? p.percent);
                const val2023 = isZweit
                  ? (ELECTION_CONFIG.results2023.zweitstimmen[p.id] ?? 0)
                  : (ELECTION_CONFIG.results2023.erststimmen[p.id] ?? 0);
                const diff = isZweit ? p.diff : (p.erststimmenDiff ?? (currentVal - val2023));
                const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
                const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";

                const heightCurrent = Math.max(5, Math.min(100, (currentVal / maxChartVal) * 100));
                const height2023 = Math.max(5, Math.min(100, (val2023 / maxChartVal) * 100));

                return (
                  <div key={p.id} className="flex-1 flex flex-col items-center h-full justify-end group/col">
                    {/* Prozentwerte über den beiden Säulen */}
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-1.5 w-full text-center font-mono text-[10px] sm:text-xs">
                      <span className="font-bold text-white leading-none truncate" title={`Aktuell (Linke Säule): ${currentVal.toFixed(1)}%`}>
                        {currentVal.toFixed(1)}%
                      </span>
                      <span className="text-slate-500 text-[9px] sm:text-[11px] leading-none truncate" title={`Wahl 2023 (Rechte Säule): ${val2023 > 0 ? val2023.toFixed(1) + '%' : '—'}`}>
                        {val2023 > 0 ? `${val2023.toFixed(1)}%` : "—"}
                      </span>
                    </div>

                    {/* Zwei Säulen Seite an Seite */}
                    <div className="flex items-end justify-center gap-1 w-full h-36 relative">
                      {/* Linke Säule: Aktuelle Wahl */}
                      <div
                        className="w-1/2 max-w-[24px] sm:max-w-[32px] rounded-t-sm transition-all duration-700 relative group-hover/col:brightness-110 shadow-md flex flex-col justify-end"
                        style={{
                          height: `${heightCurrent}%`,
                          backgroundColor: p.color,
                        }}
                        title={`${p.name} · Linke Säule (Aktuell): ${currentVal.toFixed(1)}%`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/25 rounded-t-sm" />
                        <span className="text-[8px] font-mono text-white/90 text-center font-bold pb-0.5 hidden sm:block">
                          '26
                        </span>
                      </div>

                      {/* Rechte Säule: Wahl 2023 */}
                      <div
                        className="w-1/2 max-w-[24px] sm:max-w-[32px] rounded-t-sm transition-all duration-700 relative border border-slate-600/70 bg-slate-800/90 group-hover/col:border-slate-400 flex flex-col justify-end"
                        style={{
                          height: `${height2023}%`,
                        }}
                        title={`${p.name} · Rechte Säule (2023): ${val2023.toFixed(1)}%`}
                      >
                        <div className="absolute inset-0 bg-slate-700/60 rounded-t-sm" />
                        <span className="text-[8px] font-mono text-slate-400 text-center font-bold pb-0.5 hidden sm:block">
                          '23
                        </span>
                      </div>
                    </div>

                    {/* Parteiname und Diff unten */}
                    <div className="pt-2 text-center w-full border-t border-slate-800 mt-1">
                      <div className="text-[11px] sm:text-xs font-bold text-white truncate font-mono">
                        {p.name}
                      </div>
                      <div className={`text-[10px] font-mono font-semibold ${diffColor}`}>
                        {p.id !== "sonstige" ? `${diffFormatted}%` : "—"}
                      </div>
                      <div className="text-[9px] font-mono text-slate-400">
                        {isZweit ? (p.seats > 0 ? `${p.seats} S.` : "0 S.") : `${p.direktmandate ?? 0} Dir.`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailtabelle: Direkter Zahlenvergleich Aktuell vs. 2023 */}
          <div className="relative z-10 space-y-2 mb-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1 border-b border-slate-800 pb-1">
              <span>PARTEI</span>
              <div className="flex items-center gap-3 sm:gap-6 text-right">
                <span className="w-16 sm:w-20 text-right text-slate-200 font-bold">AKTUELL (L)</span>
                <span className="w-16 sm:w-20 text-right text-slate-400">2023 (R)</span>
                <span className="w-12 text-right">± '23</span>
                <span className="w-12 text-right">{isZweit ? "SITZE" : "DIREKT"}</span>
              </div>
            </div>

            {currentStage.parties.map((p) => {
              const currentVal = isZweit ? p.percent : (p.erststimmen ?? p.percent);
              const val2023 = isZweit
                ? (ELECTION_CONFIG.results2023.zweitstimmen[p.id] ?? 0)
                : (ELECTION_CONFIG.results2023.erststimmen[p.id] ?? 0);
              const diff = isZweit ? p.diff : (p.erststimmenDiff ?? (currentVal - val2023));
              const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
              const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";
              const mandateLabel = isZweit
                ? (p.seats > 0 ? `${p.seats} S.` : "0 S.")
                : `${p.direktmandate ?? 0} Dir.`;

              return (
                <div key={p.id} className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white flex items-center gap-1.5 w-28">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: p.color }}
                      />
                      {p.name}
                    </span>

                    <div className="flex items-center gap-3 sm:gap-6 text-[11px]">
                      <span className="w-16 sm:w-20 text-right font-black text-white text-sm" style={{ ...fontDisplay }}>
                        {currentVal.toFixed(1)}%
                      </span>
                      <span className="w-16 sm:w-20 text-right font-mono text-slate-400">
                        {val2023 > 0 ? `${val2023.toFixed(1)}%` : "—"}
                      </span>
                      <span className={`w-12 text-right font-semibold ${diffColor}`}>
                        {p.id !== "sonstige" ? `${diffFormatted}%` : "—"}
                      </span>
                      <span className="w-12 text-right text-slate-300 font-bold">
                        {mandateLabel}
                      </span>
                    </div>
                  </div>

                  {/* Doppel-Balken (Aktuell oben, 2023 unten) */}
                  <div className="space-y-1 pt-0.5">
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, currentVal * 2.8)}%`, backgroundColor: p.color }}
                        title={`Aktuelle Wahl (Linke Säule): ${currentVal.toFixed(1)}%`}
                      />
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-slate-600 transition-all duration-700 opacity-60"
                        style={{ width: `${Math.min(100, val2023 * 2.8)}%` }}
                        title={`Wahl 2023 (Rechte Säule): ${val2023.toFixed(1)}%`}
                      />
                    </div>
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
        </>
      ) : (
        /* Falls BVV ausgewählt ist */
        <div className="relative z-10 space-y-4 mb-5">
          {/* Status Banner BVV */}
          <div className="rounded-xl p-3.5 bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-amber-300 uppercase tracking-wide">
                  BEZIRKSVERORDNETENVERSAMMLUNGEN (BVV)
                </span>
                <span className="text-xs text-slate-400 font-mono">·</span>
                <span className="text-xs text-slate-300 font-medium">
                  {BVV_RESULTS.countedAreas}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Wahlen zu den Kommunalparlamenten in allen 12 Berliner Bezirken (Mitte, Friedrichshain-Kreuzberg, Pankow, etc.).
              </p>
            </div>
            <div className="shrink-0 text-right sm:border-l sm:border-slate-800 sm:pl-3 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Wahlbeteiligung BVV</span>
              <span className="text-xs font-bold font-mono text-emerald-400">{BVV_RESULTS.turnout}</span>
            </div>
          </div>

          {/* BVV Säulen-Vergleich */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-white">
                <BarChart2 size={15} className="text-amber-400" />
                <span>BVV-SÄULEN-VERGLEICH (BERLINWEIT)</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-sm bg-fuchsia-500 shadow-xs" />
                  <span>Linke Säule: BVV 2026</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 border border-slate-500" />
                  <span>Rechte Säule: BVV 2023</span>
                </div>
              </div>
            </div>

            {/* Säulendiagramm BVV */}
            <div className="relative h-52 w-full pt-6 pb-2 px-1 flex items-end justify-between gap-1 sm:gap-2.5">
              {bvvParties.map((p) => {
                const currentVal = p.percent;
                const val2023 = p.val2023 ?? 0;
                const diff = p.diff;
                const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
                const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";

                const heightCurrent = Math.max(5, Math.min(100, (currentVal / maxChartVal) * 100));
                const height2023 = Math.max(5, Math.min(100, (val2023 / maxChartVal) * 100));

                return (
                  <div key={p.id} className="flex-1 flex flex-col items-center h-full justify-end group/col">
                    <div className="flex items-center justify-center gap-1 mb-1.5 w-full text-center font-mono text-[10px] sm:text-xs">
                      <span className="font-bold text-white leading-none truncate">
                        {currentVal.toFixed(1)}%
                      </span>
                      <span className="text-slate-500 text-[9px] sm:text-[11px] leading-none truncate">
                        {val2023 > 0 ? `${val2023.toFixed(1)}%` : "—"}
                      </span>
                    </div>

                    <div className="flex items-end justify-center gap-1 w-full h-36 relative">
                      {/* Linke Säule: BVV 2026 */}
                      <div
                        className="w-1/2 max-w-[24px] sm:max-w-[32px] rounded-t-sm transition-all duration-700 relative group-hover/col:brightness-110 shadow-md flex flex-col justify-end"
                        style={{ height: `${heightCurrent}%`, backgroundColor: p.color }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/25 rounded-t-sm" />
                        <span className="text-[8px] font-mono text-white/90 text-center font-bold pb-0.5 hidden sm:block">
                          '26
                        </span>
                      </div>

                      {/* Rechte Säule: BVV 2023 */}
                      <div
                        className="w-1/2 max-w-[24px] sm:max-w-[32px] rounded-t-sm transition-all duration-700 relative border border-slate-600/70 bg-slate-800/90 group-hover/col:border-slate-400 flex flex-col justify-end"
                        style={{ height: `${height2023}%` }}
                      >
                        <div className="absolute inset-0 bg-slate-700/60 rounded-t-sm" />
                        <span className="text-[8px] font-mono text-slate-400 text-center font-bold pb-0.5 hidden sm:block">
                          '23
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 text-center w-full border-t border-slate-800 mt-1">
                      <div className="text-[11px] sm:text-xs font-bold text-white truncate font-mono">
                        {p.name}
                      </div>
                      <div className={`text-[10px] font-mono font-semibold ${diffColor}`}>
                        {p.id !== "sonstige" ? `${diffFormatted}%` : "—"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailtabelle BVV */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1 border-b border-slate-800 pb-1">
              <span>PARTEI</span>
              <div className="flex items-center gap-3 sm:gap-6 text-right">
                <span className="w-16 sm:w-20 text-right text-slate-200 font-bold">BVV '26 (L)</span>
                <span className="w-16 sm:w-20 text-right text-slate-400">BVV '23 (R)</span>
                <span className="w-12 text-right">± '23</span>
              </div>
            </div>

            {bvvParties.map((p) => {
              const currentVal = p.percent;
              const val2023 = p.val2023 ?? 0;
              const diff = p.diff;
              const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
              const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";

              return (
                <div key={p.id} className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white flex items-center gap-1.5 w-32">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: p.color }}
                      />
                      {p.name}
                    </span>

                    <div className="flex items-center gap-3 sm:gap-6 text-[11px]">
                      <span className="w-16 sm:w-20 text-right font-black text-white text-sm" style={{ ...fontDisplay }}>
                        {currentVal.toFixed(1)}%
                      </span>
                      <span className="w-16 sm:w-20 text-right font-mono text-slate-400">
                        {val2023 > 0 ? `${val2023.toFixed(1)}%` : "—"}
                      </span>
                      <span className={`w-12 text-right font-semibold ${diffColor}`}>
                        {p.id !== "sonstige" ? `${diffFormatted}%` : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-0.5">
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, currentVal * 2.8)}%`, backgroundColor: p.color }}
                      />
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-slate-600 transition-all duration-700 opacity-60"
                        style={{ width: `${Math.min(100, val2023 * 2.8)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Official Data Source Badges & Direct Links to wahlen-berlin.de */}
      <div className="relative z-10 pt-3 border-t border-slate-800 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-amber-400" />
            Amtliche Live-Portale &amp; Schnittstellen:
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Landeswahlleiterin Berlin · wahlen-berlin.de
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-2">
          <a
            href={ELECTION_CONFIG.aghUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-200 hover:text-white text-[11px] font-mono flex items-center justify-between gap-1.5 transition-all"
          >
            <div className="truncate">
              <span className="font-bold block">20. Abgeordnetenhaus</span>
              <span className="text-[10px] text-slate-400">Erst- &amp; Zweitstimmen</span>
            </div>
            <ExternalLink size={12} className="shrink-0 text-blue-400" />
          </a>

          <a
            href={ELECTION_CONFIG.bvvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border border-fuchsia-500/40 text-fuchsia-200 hover:text-white text-[11px] font-mono flex items-center justify-between gap-1.5 transition-all"
          >
            <div className="truncate">
              <span className="font-bold block">Bezirke (BVV-Wahlen)</span>
              <span className="text-[10px] text-slate-400">12 Berliner Bezirke</span>
            </div>
            <ExternalLink size={12} className="shrink-0 text-fuchsia-400" />
          </a>

          <a
            href={ELECTION_CONFIG.rbbDashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 hover:text-white text-[11px] font-mono flex items-center justify-between gap-1.5 transition-all"
          >
            <div className="truncate">
              <span className="font-bold block">rbb24 Wahl-Dashboard</span>
              <span className="text-[10px] text-amber-400">Live-Analyse &amp; Ticker</span>
            </div>
            <ExternalLink size={12} className="shrink-0 text-amber-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ElectionResultsLiveTracker;
