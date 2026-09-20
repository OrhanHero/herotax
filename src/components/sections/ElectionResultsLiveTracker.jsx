import { useState, useMemo } from "react";
import { CheckCircle2, ExternalLink, ShieldCheck, Building, Landmark, BarChart2, Layers, PieChart } from "lucide-react";
import { ELECTION_CONFIG, ELECTION_STAGES, BVV_RESULTS, COALITIONS } from "../../data/electionResults";
import { fontDisplay } from "../../config/tokens";
import ParliamentSeatChart, { DEFAULT_SEAT_DATA } from "./ParliamentSeatChart";

/**
 * ElectionResultsLiveTracker:
 * Klares, aufgeräumtes und übersichtliches Wahlergebnis-Dashboard für Berlin 2026.
 * Zeigt fokussiert die amtlichen Ergebnisse der Wahl 2026.
 *
 * Ansichtsmodi:
 * - 'seats': Halbkreis-Sitzverteilung (159 Sitze) nach offizieller Infratest-dimap TV-Grafik
 * - 'bars': Säulendiagramm (Stimmen-Anteile %)
 */
const ElectionResultsLiveTracker = () => {
  // Wahl-Ebene: 'agh' (Abgeordnetenhaus) | 'bvv' (Bezirksverordnetenversammlungen)
  const [electionLevel, setElectionLevel] = useState("agh");

  // AGH Darstellungs-Modus: 'seats' (Halbkreis Sitzverteilung) | 'bars' (Säulen Stimmen)
  const [viewMode, setViewMode] = useState("seats");

  // AGH Phase: 'prognose' | 'hochrechnung' | 'zwischenstand' | 'endergebnis'
  const [stageKey, setStageKey] = useState("zwischenstand");
  const currentStage = ELECTION_STAGES[stageKey] || ELECTION_STAGES.zwischenstand;

  // Stimmart bei AGH: 'zweitstimmen' | 'erststimmen'
  const [voteType, setVoteType] = useState("zweitstimmen");
  const isZweit = voteType === "zweitstimmen";

  // Sitzdaten für den Halbkreisbogen (nach TV-Vorlage geordnet)
  const seatParties = useMemo(() => {
    const pMap = new Map(currentStage.parties.map((p) => [p.id, p]));
    return DEFAULT_SEAT_DATA.map((base) => {
      const live = pMap.get(base.id);
      if (!live) return base;
      return {
        ...base,
        seats: live.seats ?? base.seats,
        diff: live.seatsDiff ?? base.diff,
      };
    });
  }, [currentStage]);

  // Koalitionsberechnung für 2026
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

  // Skalierung für Säulen (max 30 % für harmonische Proportionen)
  const maxChartVal = 30;

  return (
    <div className="group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 bg-slate-900/95 backdrop-blur-md border border-amber-500/35 hover:border-amber-500/55 shadow-2xl overflow-hidden text-slate-100 w-full">
      {/* Ambient Background Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── 1. Header Bar: Titel & Stand ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 relative z-10 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wide font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            BERLIN-WAHL 2026 🗳️
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-300 bg-slate-800/90 px-2.5 py-0.5 rounded border border-slate-700/80 flex items-center gap-1">
            <Building size={11} className="text-blue-400" />
            Amtliche Ergebnisse
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Stand: {electionLevel === "agh" ? currentStage.time : BVV_RESULTS.time}
          </span>
        </div>
      </div>

      {/* ── 2. Ebene Umschalten: Abgeordnetenhaus (AGH) vs. Bezirke (BVV) ── */}
      <div className="relative z-10 mb-4 p-1.5 bg-slate-950/90 rounded-xl border border-slate-800 space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setElectionLevel("agh")}
            className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
              electionLevel === "agh"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Building size={13} className="shrink-0" />
            <span className="truncate">20. Abgeordnetenhaus (AGH)</span>
          </button>
          <button
            type="button"
            onClick={() => setElectionLevel("bvv")}
            className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
              electionLevel === "bvv"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Layers size={13} className="shrink-0" />
            <span className="truncate">Bezirksverordnete (BVV)</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono px-1 text-slate-400">
          <span>Landeswahlleiterin Berlin</span>
          <a
            href={electionLevel === "agh" ? ELECTION_CONFIG.aghUrl : ELECTION_CONFIG.bvvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline flex items-center gap-1 font-semibold"
          >
            <span>wahlen-berlin.de</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* ── 3. Falls Abgeordnetenhaus gewählt ist ── */}
      {electionLevel === "agh" ? (
        <>
          {/* Phase-Auswahl (Wahltag-Chronologie) */}
          <div className="relative z-10 mb-3.5 p-1.5 bg-slate-950/70 rounded-xl border border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              {Object.entries(ELECTION_STAGES).map(([key, stage]) => {
                const isActive = stageKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setStageKey(key)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 flex items-center justify-center gap-1 text-center ${
                      isActive
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-slate-950 shrink-0" />}
                    <span className="truncate">{stage.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stimmart Umschalter (Erststimmen vs. Zweitstimmen) */}
          <div className="relative z-10 mb-4 p-2 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVoteType("zweitstimmen")}
                className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
                  isZweit
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span>Zweitstimmen (Listen)</span>
                <span className="text-[10px] bg-blue-900/90 text-blue-200 px-1.5 py-0.2 rounded font-semibold">159 Sitze</span>
              </button>

              <button
                type="button"
                onClick={() => setVoteType("erststimmen")}
                className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
                  !isZweit
                    ? "bg-fuchsia-700 text-white shadow-md shadow-fuchsia-700/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span>Erststimmen (Wahlkreise)</span>
                <span className="text-[10px] bg-fuchsia-950/90 text-fuchsia-200 px-1.5 py-0.2 rounded font-semibold">78 Direkt</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 text-center px-1">
              {isZweit
                ? "Maßgeblich für die Gesamtsitzverteilung & Koalitionen im Abgeordnetenhaus"
                : "Entscheidet über Direktmandate in den 78 Berliner Wahlkreisen"}
            </div>
          </div>

          {/* Status Box: Auszählungsstand & Beteiligung */}
          <div className="relative z-10 rounded-xl p-3 bg-slate-950/60 border border-slate-800 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                {currentStage.tag.split("·")[0].trim()}
              </span>
              <span className="text-xs font-mono text-slate-200 font-semibold">
                {currentStage.statusBadge}
              </span>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold shrink-0">
              Beteiligung: {currentStage.turnout.split("·")[0]}
            </div>
          </div>

          {/* ── 4. Ansichtsmodus: Sitzverteilung (Halbkreis) vs. Stimmen-Anteile (Säulen) ── */}
          <div className="relative z-10 mb-4 grid grid-cols-2 gap-2 p-1.5 bg-slate-950/90 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("seats")}
              className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
                viewMode === "seats"
                  ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <PieChart size={14} className="shrink-0" />
              <span className="truncate">🏛️ Sitzverteilung (159 Sitze)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("bars")}
              className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
                viewMode === "bars"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <BarChart2 size={14} className="shrink-0" />
              <span className="truncate">📊 Stimmen-Anteile (Säulen)</span>
            </button>
          </div>

          {/* ── 5. Visualisierung je nach gewähltem Modus ── */}
          {viewMode === "seats" ? (
            <div className="relative z-10 mb-5">
              <ParliamentSeatChart
                parties={seatParties}
                totalSeats={ELECTION_CONFIG.totalSeats || 159}
                time={currentStage.time}
                source="infratest dimap"
                sourceUrl="https://www.tagesschau.de/inland/landtagswahlen/berlin/2026/ergebnisse"
              />
            </div>
          ) : (
            /* Klares 2026 Säulendiagramm mit strikter Trennung von Plot und Labels */
            <div className="relative z-10 p-3.5 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
              {/* Header mit Titel und Hürden-Legende */}
              <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-white">
                  <BarChart2 size={15} className="text-amber-400" />
                  <span>ERGEBNISSE 2026 · {isZweit ? "ZWEITSTIMMEN" : "ERSTSTIMMEN"}</span>
                </div>
                {isZweit && (
                  <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-mono font-semibold">
                    <span className="w-4 border-b-2 border-dashed border-amber-400" />
                    <span>5 % Sperrklausel</span>
                  </div>
                )}
              </div>

              {/* A) Plot-Bereich: NUR die Säulen und die 5%-Referenzlinie */}
              <div className="relative h-44 w-full flex items-end justify-between gap-2 sm:gap-4 px-1">
                {isZweit && (
                  <div
                    className="absolute left-0 right-0 border-b-2 border-dashed border-amber-400/50 z-0 pointer-events-none"
                    style={{ bottom: `${(5 / maxChartVal) * 100}%` }}
                  />
                )}

                {currentStage.parties.map((p) => {
                  const currentVal = isZweit ? p.percent : (p.erststimmen ?? p.percent);
                  const heightPercent = Math.max(6, Math.min(100, (currentVal / maxChartVal) * 100));

                  return (
                    <div key={p.id} className="flex-1 flex flex-col items-center h-full justify-end relative z-10 group/col">
                      <div className="mb-1.5 text-center font-mono">
                        <span className="font-black text-white text-xs sm:text-base leading-none block" style={{ ...fontDisplay }}>
                          {currentVal.toFixed(1)}%
                        </span>
                      </div>

                      <div
                        className="w-full max-w-[44px] rounded-t-md transition-all duration-500 relative group-hover/col:brightness-110 shadow-lg"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: p.color,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20 rounded-t-md" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* B) Beschriftungs-Bereich: KOMPLETT GETRENNT unterhalb des Plots */}
              <div className="flex justify-between gap-2 sm:gap-4 pt-3 mt-1 border-t border-slate-800 text-center px-1">
                {currentStage.parties.map((p) => {
                  const currentVal = isZweit ? p.percent : (p.erststimmen ?? p.percent);
                  const val2023 = isZweit
                    ? (ELECTION_CONFIG.results2023.zweitstimmen[p.id] ?? 0)
                    : (ELECTION_CONFIG.results2023.erststimmen[p.id] ?? 0);
                  const diff = isZweit ? p.diff : (p.erststimmenDiff ?? (currentVal - val2023));
                  const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
                  const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";

                  return (
                    <div key={p.id} className="flex-1 space-y-0.5">
                      <div className="text-xs sm:text-sm font-bold text-white truncate font-mono">
                        {p.name}
                      </div>
                      <div className={`text-[10px] sm:text-xs font-mono font-semibold ${diffColor}`}>
                        {p.id !== "sonstige" ? diffFormatted : "—"}
                      </div>
                      <div className="text-[10px] font-mono text-slate-300 font-bold">
                        {isZweit ? (p.seats > 0 ? `${p.seats} Sitze` : "—") : `${p.direktmandate ?? 0} Direkt`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── 5. Aufgeräumte Ergebnistabelle 2026 ── */}
          <div className="relative z-10 space-y-2 mb-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-3 border-b border-slate-800 pb-1.5">
              <span>PARTEI</span>
              <div className="flex items-center gap-4 sm:gap-6 text-right">
                <span className="w-16 text-right text-slate-200 font-bold">ERGEBNIS</span>
                <span className="w-16 text-right text-slate-400">DIFF '23</span>
                <span className="w-16 text-right text-slate-200 font-bold">{isZweit ? "SITZE" : "DIREKT"}</span>
              </div>
            </div>

            {currentStage.parties.map((p) => {
              const currentVal = isZweit ? p.percent : (p.erststimmen ?? p.percent);
              const val2023 = isZweit
                ? (ELECTION_CONFIG.results2023.zweitstimmen[p.id] ?? 0)
                : (ELECTION_CONFIG.results2023.erststimmen[p.id] ?? 0);
              const diff = isZweit ? p.diff : (p.erststimmenDiff ?? (currentVal - val2023));
              const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
              const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";
              const mandateLabel = isZweit
                ? (p.seats > 0 ? `${p.seats} Sitze` : "—")
                : `${p.direktmandate ?? 0} Direkt`;

              return (
                <div key={p.id} className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: p.color }}
                      />
                      <span>{p.name}</span>
                    </span>

                    <div className="flex items-center gap-4 sm:gap-6 text-[11px]">
                      <span className="w-16 text-right font-black text-white text-sm" style={{ ...fontDisplay }}>
                        {currentVal.toFixed(1)}%
                      </span>
                      <span className={`w-16 text-right font-semibold ${diffColor}`}>
                        {p.id !== "sonstige" ? diffFormatted : "—"}
                      </span>
                      <span className="w-16 text-right text-slate-200 font-bold">
                        {mandateLabel}
                      </span>
                    </div>
                  </div>

                  {/* Einzelner Fortschrittsbalken 2026 */}
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, currentVal * 3.3)}%`, backgroundColor: p.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── 6. Koalitions-Rechner & Mehrheitsbarometer ── */}
          <div className="relative z-10 p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-5">
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
              {coalitionsWithStats.map((c) => (
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
        </>
      ) : (
        /* ── 7. Falls BVV ausgewählt ist ── */
        <div className="relative z-10 space-y-4 mb-5">
          {/* Status Banner BVV */}
          <div className="rounded-xl p-3 bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 uppercase">
                BEZIRKSWAHLEN (BVV)
              </span>
              <span className="text-xs font-mono text-slate-200">
                {BVV_RESULTS.countedAreas}
              </span>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold">
              Beteiligung: {BVV_RESULTS.turnout}
            </div>
          </div>

          {/* BVV Säulendiagramm 2026 */}
          <div className="p-3.5 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-white">
                <BarChart2 size={15} className="text-amber-400" />
                <span>BVV-ERGEBNISSE 2026 (BERLINWEIT)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">12 Berliner Bezirke</span>
            </div>

            {/* A) Plot-Bereich BVV */}
            <div className="relative h-44 w-full flex items-end justify-between gap-2 sm:gap-4 px-1">
              {BVV_RESULTS.parties.map((p) => {
                const currentVal = p.percent;
                const heightPercent = Math.max(6, Math.min(100, (currentVal / maxChartVal) * 100));

                return (
                  <div key={p.id} className="flex-1 flex flex-col items-center h-full justify-end relative z-10 group/col">
                    <div className="mb-1.5 text-center font-mono">
                      <span className="font-black text-white text-xs sm:text-base leading-none block" style={{ ...fontDisplay }}>
                        {currentVal.toFixed(1)}%
                      </span>
                    </div>

                    <div
                      className="w-full max-w-[44px] rounded-t-md transition-all duration-500 relative group-hover/col:brightness-110 shadow-lg"
                      style={{ height: `${heightPercent}%`, backgroundColor: p.color }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20 rounded-t-md" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* B) Beschriftungs-Bereich BVV */}
            <div className="flex justify-between gap-2 sm:gap-4 pt-3 mt-1 border-t border-slate-800 text-center px-1">
              {BVV_RESULTS.parties.map((p) => {
                const diff = p.diff;
                const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
                const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";

                return (
                  <div key={p.id} className="flex-1 space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-white truncate font-mono">
                      {p.name}
                    </div>
                    <div className={`text-[10px] sm:text-xs font-mono font-semibold ${diffColor}`}>
                      {p.id !== "sonstige" ? diffFormatted : "—"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailtabelle BVV 2026 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-3 border-b border-slate-800 pb-1.5">
              <span>PARTEI</span>
              <div className="flex items-center gap-4 sm:gap-6 text-right">
                <span className="w-16 text-right text-slate-200 font-bold">BVV '26</span>
                <span className="w-16 text-right text-slate-400">DIFF '23</span>
              </div>
            </div>

            {BVV_RESULTS.parties.map((p) => {
              const currentVal = p.percent;
              const diff = p.diff;
              const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
              const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";

              return (
                <div key={p.id} className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: p.color }}
                      />
                      <span>{p.name}</span>
                    </span>

                    <div className="flex items-center gap-4 sm:gap-6 text-[11px]">
                      <span className="w-16 text-right font-black text-white text-sm" style={{ ...fontDisplay }}>
                        {currentVal.toFixed(1)}%
                      </span>
                      <span className={`w-16 text-right font-semibold ${diffColor}`}>
                        {p.id !== "sonstige" ? diffFormatted : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, currentVal * 3.3)}%`, backgroundColor: p.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 8. Amtliche Schnittstellen ── */}
      <div className="relative z-10 pt-3 border-t border-slate-800 text-xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-amber-400" />
            Amtliche Daten &amp; Portale:
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            wahlen-berlin.de · rbb24.de
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
              <span className="font-bold block">Bezirke (BVV)</span>
              <span className="text-[10px] text-slate-400">12 Kommunalwahlen</span>
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
              <span className="font-bold block">rbb24 Wahlabend</span>
              <span className="text-[10px] text-amber-400">Liveticker &amp; Analyse</span>
            </div>
            <ExternalLink size={12} className="shrink-0 text-amber-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ElectionResultsLiveTracker;
