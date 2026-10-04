import { useState, useMemo } from "react";
import { ExternalLink, Building, BarChart2, Layers, PieChart } from "lucide-react";
import { ELECTION_CONFIG, ELECTION_STAGES, BVV_RESULTS } from "../../data/electionResults";
import ParliamentSeatChart, { DEFAULT_SEAT_DATA } from "./ParliamentSeatChart";
import ElectionBarsChart from "./election/ElectionBarsChart";
import ElectionResultTable from "./election/ElectionResultTable";
import ElectionCoalitionMatrix from "./election/ElectionCoalitionMatrix";
import ElectionSourceLinks from "./election/ElectionSourceLinks";

/**
 * ElectionResultsLiveTracker:
 * Klares, aufgeräumtes und übersichtliches Wahlergebnis-Dashboard für Berlin 2026.
 * Zeigt fokussiert die amtlichen Ergebnisse der Wahl 2026.
 *
 * Ansichtsmodi:
 * - 'seats': Halbkreis-Sitzverteilung (159 Sitze) nach offizieller Infratest-dimap TV-Grafik
 * - 'bars': Säulendiagramm (Stimmen-Anteile %)
 *
 * Nur noch Orchestrierung (State + Datenaufbereitung). Darstellung liegt in
 * ./election/* — Säulen, Tabelle, Koalitionsrechner, Quellen.
 */

/** Umschalt-Button im einheitlichen Segment-Stil. */
const Toggle = ({ active, onClick, activeCls, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
      active ? activeCls : "text-slate-400 hover:text-white hover:bg-slate-800/50"
    }`}
  >
    {children}
  </button>
);

const AMBER_ACTIVE = "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black";

/** AGH-Parteizeile für die gewählte Stimmart aufbereiten. */
const toAghRow = (p, isZweit) => {
  const value = isZweit ? p.percent : (p.erststimmen ?? p.percent);
  const prev = isZweit
    ? (ELECTION_CONFIG.results2023.zweitstimmen[p.id] ?? 0)
    : (ELECTION_CONFIG.results2023.erststimmen[p.id] ?? 0);
  const diff = isZweit ? p.diff : (p.erststimmenDiff ?? value - prev);
  const mandate = isZweit ? (p.seats > 0 ? `${p.seats} Sitze` : "—") : `${p.direktmandate ?? 0} Direkt`;
  return { id: p.id, name: p.name, color: p.color, value, diff, mandate, sub: mandate };
};

const ElectionResultsLiveTracker = () => {
  // Wahl-Ebene: 'agh' (Abgeordnetenhaus) | 'bvv' (Bezirksverordnetenversammlungen)
  const [electionLevel, setElectionLevel] = useState("agh");
  // AGH Darstellungs-Modus: 'seats' (Halbkreis Sitzverteilung) | 'bars' (Säulen Stimmen)
  const [viewMode, setViewMode] = useState("seats");
  // AGH Phase: 'prognose' | 'hochrechnung' | 'zwischenstand' | 'endergebnis'
  const [stageKey, setStageKey] = useState("endergebnis");
  // Stimmart bei AGH: 'zweitstimmen' | 'erststimmen'
  const [voteType, setVoteType] = useState("zweitstimmen");

  const currentStage = ELECTION_STAGES[stageKey] || ELECTION_STAGES.endergebnis;
  const isZweit = voteType === "zweitstimmen";
  const isAgh = electionLevel === "agh";

  // Sitzdaten für den Halbkreisbogen (nach TV-Vorlage geordnet)
  const seatParties = useMemo(() => {
    const pMap = new Map(currentStage.parties.map((p) => [p.id, p]));
    return DEFAULT_SEAT_DATA.map((base) => {
      const live = pMap.get(base.id);
      if (!live) return base;
      return { ...base, seats: live.seats ?? base.seats, diff: live.seatsDiff ?? base.diff };
    });
  }, [currentStage]);

  const aghRows = useMemo(() => currentStage.parties.map((p) => toAghRow(p, isZweit)), [currentStage, isZweit]);
  const bvvRows = useMemo(
    () => BVV_RESULTS.parties.map((p) => ({ id: p.id, name: p.name, color: p.color, value: p.percent, diff: p.diff })),
    []
  );

  return (
    <div className="group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 bg-slate-900/95 border border-amber-500/35 shadow-2xl overflow-hidden text-slate-100 w-full">
      {/* ── 1. Header Bar: Titel & Stand ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 relative z-10 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wide font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            BERLIN-WAHL 2026
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-300 bg-slate-800/90 px-2.5 py-0.5 rounded border border-slate-700/80 flex items-center gap-1">
            <Building size={11} className="text-blue-400" />
            Amtliche Ergebnisse
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
          Stand: {isAgh ? currentStage.time : BVV_RESULTS.time}
        </span>
      </div>

      {/* ── 2. Ebene: Abgeordnetenhaus (AGH) vs. Bezirke (BVV) ── */}
      <div className="relative z-10 mb-4 p-1.5 bg-slate-950/90 rounded-xl border border-slate-800 space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <Toggle active={isAgh} onClick={() => setElectionLevel("agh")} activeCls={AMBER_ACTIVE}>
            <Building size={13} className="shrink-0" />
            <span className="truncate">20. Abgeordnetenhaus (AGH)</span>
          </Toggle>
          <Toggle active={!isAgh} onClick={() => setElectionLevel("bvv")} activeCls={AMBER_ACTIVE}>
            <Layers size={13} className="shrink-0" />
            <span className="truncate">Bezirksverordnete (BVV)</span>
          </Toggle>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono px-1 text-slate-400">
          <span>Landeswahlleiterin Berlin</span>
          <a
            href={isAgh ? ELECTION_CONFIG.aghUrl : ELECTION_CONFIG.bvvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline flex items-center gap-1 font-semibold"
          >
            <span>wahlen-berlin.de</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {isAgh ? (
        <div className="space-y-4 mb-5">
          {/* Phase-Auswahl (Wahltag-Chronologie) */}
          <div className="relative z-10 p-1.5 bg-slate-950/70 rounded-xl border border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              {Object.entries(ELECTION_STAGES).map(([key, stage]) => (
                <Toggle key={key} active={stageKey === key} onClick={() => setStageKey(key)} activeCls={AMBER_ACTIVE}>
                  <span className="truncate">{stage.label}</span>
                </Toggle>
              ))}
            </div>
          </div>

          {/* Stimmart: Zweitstimmen vs. Erststimmen */}
          <div className="relative z-10 p-2 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
            <div className="grid grid-cols-2 gap-2">
              <Toggle active={isZweit} onClick={() => setVoteType("zweitstimmen")} activeCls="bg-blue-600 text-white shadow-md shadow-blue-600/30">
                <span>Zweitstimmen (Listen)</span>
                <span className="text-[10px] bg-blue-900/90 text-blue-200 px-1.5 rounded font-semibold">159 Sitze</span>
              </Toggle>
              <Toggle active={!isZweit} onClick={() => setVoteType("erststimmen")} activeCls="bg-fuchsia-700 text-white shadow-md shadow-fuchsia-700/30">
                <span>Erststimmen (Wahlkreise)</span>
                <span className="text-[10px] bg-fuchsia-950/90 text-fuchsia-200 px-1.5 rounded font-semibold">78 Direkt</span>
              </Toggle>
            </div>
            <div className="text-[11px] font-mono text-slate-400 text-center px-1">
              {isZweit
                ? "Maßgeblich für die Gesamtsitzverteilung & Koalitionen im Abgeordnetenhaus"
                : "Entscheidet über Direktmandate in den 78 Berliner Wahlkreisen"}
            </div>
          </div>

          {/* Auszählungsstand & Beteiligung */}
          <div className="relative z-10 rounded-xl p-3 bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                {currentStage.tag.split("·")[0].trim()}
              </span>
              <span className="text-xs font-mono text-slate-200 font-semibold">{currentStage.statusBadge}</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold shrink-0">
              Beteiligung: {currentStage.turnout.split("·")[0]}
            </div>
          </div>

          {/* Ansichtsmodus: Sitzverteilung vs. Stimmenanteile */}
          <div className="relative z-10 grid grid-cols-2 gap-2 p-1.5 bg-slate-950/90 rounded-xl border border-slate-800">
            <Toggle active={viewMode === "seats"} onClick={() => setViewMode("seats")} activeCls="bg-rose-600 text-white shadow-md shadow-rose-600/30">
              <PieChart size={14} className="shrink-0" />
              <span className="truncate">Sitzverteilung (159 Sitze)</span>
            </Toggle>
            <Toggle active={viewMode === "bars"} onClick={() => setViewMode("bars")} activeCls="bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <BarChart2 size={14} className="shrink-0" />
              <span className="truncate">Stimmenanteile (Säulen)</span>
            </Toggle>
          </div>

          {viewMode === "seats" ? (
            <div className="relative z-10">
              <ParliamentSeatChart
                parties={seatParties}
                totalSeats={ELECTION_CONFIG.totalSeats || 159}
                time={currentStage.time}
                source="infratest dimap"
                sourceUrl="https://www.tagesschau.de/inland/landtagswahlen/berlin/2026/ergebnisse"
              />
            </div>
          ) : (
            <ElectionBarsChart
              title={`ERGEBNISSE 2026 · ${isZweit ? "ZWEITSTIMMEN" : "ERSTSTIMMEN"}`}
              rows={aghRows}
              showThreshold={isZweit}
              aside={
                isZweit && (
                  <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-mono font-semibold">
                    <span className="w-4 border-b-2 border-dashed border-amber-400" />
                    <span>5 % Sperrklausel</span>
                  </div>
                )
              }
            />
          )}

          <ElectionResultTable rows={aghRows} mandateLabel={isZweit ? "SITZE" : "DIREKT"} />
          <ElectionCoalitionMatrix parties={currentStage.parties} />
        </div>
      ) : (
        <div className="relative z-10 space-y-4 mb-5">
          <div className="rounded-xl p-3 bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 uppercase">
                BEZIRKSWAHLEN (BVV)
              </span>
              <span className="text-xs font-mono text-slate-200">{BVV_RESULTS.countedAreas}</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold">Beteiligung: {BVV_RESULTS.turnout}</div>
          </div>

          <ElectionBarsChart
            title="BVV-ERGEBNISSE 2026 (BERLINWEIT)"
            rows={bvvRows}
            aside={<span className="text-[11px] font-mono text-slate-400">12 Berliner Bezirke</span>}
          />
          <ElectionResultTable rows={bvvRows} valueLabel="BVV '26" />
        </div>
      )}

      <ElectionSourceLinks />
    </div>
  );
};

export default ElectionResultsLiveTracker;
