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
 *
 * Speziell optimiert für überlappungsfreies, robustes Layout bei jeder Bildschirmbreite!
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
    <div className="group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 bg-slate-900/95 backdrop-blur-md border border-amber-500/35 hover:border-amber-500/55 shadow-2xl overflow-hidden text-slate-100 w-full">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />

      {/* ── 1. Header Bar: Titel & Aktualisierungszeit ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 relative z-10 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wide font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            AMTLICHE WAHLERGEBNISSE 🗳️
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/80 flex items-center gap-1">
            <Building size={11} className="text-blue-400" />
            Berlin · 20. Sept. 2026
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
            className={`py-2 px-2 sm:px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
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
            className={`py-2 px-2 sm:px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
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
          <span>Quelle: Landeswahlleiterin Berlin</span>
          <a
            href={electionLevel === "agh" ? ELECTION_CONFIG.aghUrl : ELECTION_CONFIG.bvvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline flex items-center gap-1 font-semibold"
          >
            <span>Originalportal öffnen</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* ── 3. Falls AGH gewählt ist: Phasen-Wahltag & Erst-/Zweitstimmen ── */}
      {electionLevel === "agh" ? (
        <>
          {/* Phase-Auswahl (Wahltag-Chronologie) */}
          <div className="relative z-10 mb-3.5 p-1.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
              <span className="flex items-center gap-1 font-semibold text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Wahlergebnis-Chronologie:
              </span>
              <span className="text-amber-300 font-bold">20. September 2026</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              {Object.entries(ELECTION_STAGES).map(([key, stage]) => {
                const isActive = stageKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setStageKey(key)}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold font-mono transition-all duration-200 flex items-center justify-center gap-1 text-center ${
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

          {/* Stimmart Umschalter (Erststimmen vs. Zweitstimmen) - Komplett überlappungsfrei! */}
          <div className="relative z-10 mb-4 p-2 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVoteType("zweitstimmen")}
                className={`py-2 px-2.5 rounded-lg text-xs font-mono font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 text-center ${
                  isZweit
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span>Zweitstimmen (Listenstimme)</span>
                <span className="text-[10px] bg-blue-900/90 text-blue-200 px-1.5 py-0.2 rounded font-semibold">159 Sitze</span>
              </button>

              <button
                type="button"
                onClick={() => setVoteType("erststimmen")}
                className={`py-2 px-2.5 rounded-lg text-xs font-mono font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 text-center ${
                  !isZweit
                    ? "bg-fuchsia-700 text-white shadow-md shadow-fuchsia-700/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span>Erststimmen (Wahlkreisstimme)</span>
                <span className="text-[10px] bg-fuchsia-950/90 text-fuchsia-200 px-1.5 py-0.2 rounded font-semibold">78 Direktmandate</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 text-center px-1">
              {isZweit
                ? "⚖️ Maßgeblich für die Gesamtsitzverteilung & Koalitionen im Abgeordnetenhaus"
                : "📍 Entscheidet über die Direktkandidaten in den 78 Berliner Wahlkreisen"}
            </div>
          </div>

          {/* Status Box: Amtlicher Auszählungsstand & Beteiligung */}
          <div className="relative z-10 rounded-xl p-3.5 bg-slate-950/60 border border-slate-800 mb-4 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800/80 pb-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  {currentStage.tag.split("·")[0].trim()}
                </span>
                <span className="text-xs font-mono text-slate-200 font-semibold">
                  {currentStage.statusBadge}
                </span>
              </div>
              <div className="text-xs font-mono text-emerald-400 font-bold shrink-0">
                Wahlbeteiligung: {currentStage.turnout}
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {currentStage.note}
            </p>
          </div>

          {/* ── 4. Säulen-Vergleich: Aktuelle Wahl (linke Säule) vs. Wahl 2023 (rechte Säule) ── */}
          <div className="relative z-10 p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
            {/* Header des Säulendiagramms mit klarer Legende */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-white">
                <BarChart2 size={15} className="text-amber-400" />
                <span>SÄULEN-VERGLEICH: {isZweit ? "ZWEITSTIMMEN" : "ERSTSTIMMEN"}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-xs bg-fuchsia-500" />
                  <span>Linke Säule: Wahl '26</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-xs bg-slate-700 border border-slate-500" />
                  <span>Rechte Säule: Wahl '23</span>
                </div>
                {isZweit && (
                  <div className="flex items-center gap-1 text-amber-300 text-[10px]">
                    <span className="w-3 border-b border-dashed border-amber-400" />
                    <span>5% Hürde</span>
                  </div>
                )}
              </div>
            </div>

            {/* Horizontale Scroll-Garantie für schmale Bildschirme / Spalten */}
            <div className="overflow-x-auto overflow-y-hidden pb-2 pt-4">
              <div className="relative h-56 min-w-[540px] px-1 flex items-end justify-between gap-1 sm:gap-2">
                {/* 5% Sperrklausel Hurdle Line (nur bei Zweitstimmen) - Ohne Textüberlappung! */}
                {isZweit && (
                  <div
                    className="absolute left-0 right-0 border-b border-dashed border-amber-400/50 z-1 pointer-events-none"
                    style={{ bottom: `${(5 / maxChartVal) * 100}%` }}
                  >
                    <span className="absolute -top-3 left-1 text-[9px] font-mono font-bold text-amber-300 bg-slate-950/90 px-1 rounded border border-amber-400/40">
                      5 % Hürde
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
                    <div key={p.id} className="flex-1 min-w-[58px] flex flex-col items-center h-full justify-end group/col">
                      {/* Werte über den Säulen: Gestapelt statt nebeneinander -> Nie Textkollision! */}
                      <div className="flex flex-col items-center justify-end mb-1.5 w-full text-center font-mono leading-none">
                        <span className="font-extrabold text-white text-xs sm:text-sm">
                          {currentVal.toFixed(1)}%
                        </span>
                        <span className="text-slate-400 text-[10px] mt-0.5">
                          {val2023 > 0 ? `'23: ${val2023.toFixed(1)}%` : "—"}
                        </span>
                      </div>

                      {/* Die zwei Säulen nebeneinander */}
                      <div className="flex items-end justify-center gap-1 w-full h-32 relative">
                        {/* Linke Säule: Aktuelle Wahl 2026 */}
                        <div
                          className="w-[18px] sm:w-[24px] rounded-t-xs transition-all duration-700 relative group-hover/col:brightness-110 shadow-md flex flex-col justify-end"
                          style={{
                            height: `${heightCurrent}%`,
                            backgroundColor: p.color,
                          }}
                          title={`${p.name} · Linke Säule (Aktuell): ${currentVal.toFixed(1)}%`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20 rounded-t-xs" />
                          <span className="text-[8px] font-mono text-white/90 text-center font-bold pb-0.5">
                            '26
                          </span>
                        </div>

                        {/* Rechte Säule: Wahl 2023 */}
                        <div
                          className="w-[18px] sm:w-[24px] rounded-t-xs transition-all duration-700 relative border border-slate-600/80 bg-slate-800/90 group-hover/col:border-slate-400 flex flex-col justify-end"
                          style={{
                            height: `${height2023}%`,
                          }}
                          title={`${p.name} · Rechte Säule (2023): ${val2023.toFixed(1)}%`}
                        >
                          <div className="absolute inset-0 bg-slate-700/60 rounded-t-xs" />
                          <span className="text-[8px] font-mono text-slate-400 text-center font-bold pb-0.5">
                            '23
                          </span>
                        </div>
                      </div>

                      {/* Parteiname, Diff & Mandate unter den Säulen */}
                      <div className="pt-2 text-center w-full border-t border-slate-800 mt-1">
                        <div className="text-[11px] sm:text-xs font-bold text-white truncate font-mono">
                          {p.name}
                        </div>
                        <div className={`text-[10px] font-mono font-bold ${diffColor}`}>
                          {p.id !== "sonstige" ? `${diffFormatted}%` : "—"}
                        </div>
                        <div className="text-[10px] font-mono text-slate-300 font-medium">
                          {isZweit ? (p.seats > 0 ? `${p.seats} S.` : "0 S.") : `${p.direktmandate ?? 0} Dir.`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── 5. Detailtabelle: Direkter Zahlenvergleich Aktuell vs. 2023 ── */}
          <div className="relative z-10 space-y-2 mb-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-2 border-b border-slate-800 pb-1">
              <span>PARTEI</span>
              <div className="flex items-center gap-2 sm:gap-4 text-right">
                <span className="w-14 sm:w-16 text-right text-slate-200 font-bold">WAHL '26</span>
                <span className="w-14 sm:w-16 text-right text-slate-400">WAHL '23</span>
                <span className="w-12 text-right">DIFF</span>
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
                <div key={p.id} className="p-2 sm:p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white flex items-center gap-1.5 truncate pr-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="truncate">{p.name}</span>
                    </span>

                    <div className="flex items-center gap-2 sm:gap-4 text-[11px] shrink-0">
                      <span className="w-14 sm:w-16 text-right font-black text-white text-sm" style={{ ...fontDisplay }}>
                        {currentVal.toFixed(1)}%
                      </span>
                      <span className="w-14 sm:w-16 text-right font-mono text-slate-400">
                        {val2023 > 0 ? `${val2023.toFixed(1)}%` : "—"}
                      </span>
                      <span className={`w-12 text-right font-bold ${diffColor}`}>
                        {p.id !== "sonstige" ? `${diffFormatted}%` : "—"}
                      </span>
                      <span className="w-12 text-right text-slate-200 font-bold">
                        {mandateLabel}
                      </span>
                    </div>
                  </div>

                  {/* Doppel-Balken */}
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

          {/* ── 6. Koalitions-Rechner & Mehrheitsbarometer ── */}
          <div className="relative z-10 p-3.5 sm:p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
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
                        -{ELECTION_CONFIG.majoritySeats - c.totalSeats}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* ── 7. Falls BVV ausgewählt ist: Kommunalparlamente der 12 Bezirke ── */
        <div className="relative z-10 space-y-4 mb-5">
          {/* Status Banner BVV */}
          <div className="rounded-xl p-3.5 bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 uppercase">
                  BEZIRKSWAHLEN (BVV)
                </span>
                <span className="text-xs font-mono text-slate-200">
                  {BVV_RESULTS.countedAreas}
                </span>
              </div>
              <div className="text-xs font-mono text-emerald-400 font-bold">
                Wahlbeteiligung: {BVV_RESULTS.turnout}
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Wahlen zu den Kommunalparlamenten in allen 12 Berliner Bezirken (Mitte, Friedrichshain-Kreuzberg, Pankow, etc.).
            </p>
          </div>

          {/* BVV Säulen-Vergleich */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-white">
                <BarChart2 size={15} className="text-amber-400" />
                <span>BVV-SÄULEN-VERGLEICH (BERLINWEIT)</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-xs bg-fuchsia-500" />
                  <span>Linke Säule: BVV '26</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-xs bg-slate-700 border border-slate-500" />
                  <span>Rechte Säule: BVV '23</span>
                </div>
              </div>
            </div>

            {/* Säulendiagramm BVV */}
            <div className="overflow-x-auto overflow-y-hidden pb-2 pt-4">
              <div className="relative h-56 min-w-[540px] px-1 flex items-end justify-between gap-1 sm:gap-2">
                {bvvParties.map((p) => {
                  const currentVal = p.percent;
                  const val2023 = p.val2023 ?? 0;
                  const diff = p.diff;
                  const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
                  const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";

                  const heightCurrent = Math.max(5, Math.min(100, (currentVal / maxChartVal) * 100));
                  const height2023 = Math.max(5, Math.min(100, (val2023 / maxChartVal) * 100));

                  return (
                    <div key={p.id} className="flex-1 min-w-[58px] flex flex-col items-center h-full justify-end group/col">
                      <div className="flex flex-col items-center justify-end mb-1.5 w-full text-center font-mono leading-none">
                        <span className="font-extrabold text-white text-xs sm:text-sm">
                          {currentVal.toFixed(1)}%
                        </span>
                        <span className="text-slate-400 text-[10px] mt-0.5">
                          {val2023 > 0 ? `'23: ${val2023.toFixed(1)}%` : "—"}
                        </span>
                      </div>

                      <div className="flex items-end justify-center gap-1 w-full h-32 relative">
                        {/* Linke Säule: BVV 2026 */}
                        <div
                          className="w-[18px] sm:w-[24px] rounded-t-xs transition-all duration-700 relative group-hover/col:brightness-110 shadow-md flex flex-col justify-end"
                          style={{ height: `${heightCurrent}%`, backgroundColor: p.color }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20 rounded-t-xs" />
                          <span className="text-[8px] font-mono text-white/90 text-center font-bold pb-0.5">
                            '26
                          </span>
                        </div>

                        {/* Rechte Säule: BVV 2023 */}
                        <div
                          className="w-[18px] sm:w-[24px] rounded-t-xs transition-all duration-700 relative border border-slate-600/80 bg-slate-800/90 group-hover/col:border-slate-400 flex flex-col justify-end"
                          style={{ height: `${height2023}%` }}
                        >
                          <div className="absolute inset-0 bg-slate-700/60 rounded-t-xs" />
                          <span className="text-[8px] font-mono text-slate-400 text-center font-bold pb-0.5">
                            '23
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 text-center w-full border-t border-slate-800 mt-1">
                        <div className="text-[11px] sm:text-xs font-bold text-white truncate font-mono">
                          {p.name}
                        </div>
                        <div className={`text-[10px] font-mono font-bold ${diffColor}`}>
                          {p.id !== "sonstige" ? `${diffFormatted}%` : "—"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailtabelle BVV */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-2 border-b border-slate-800 pb-1">
              <span>PARTEI</span>
              <div className="flex items-center gap-2 sm:gap-4 text-right">
                <span className="w-14 sm:w-16 text-right text-slate-200 font-bold">BVV '26</span>
                <span className="w-14 sm:w-16 text-right text-slate-400">BVV '23</span>
                <span className="w-12 text-right">DIFF</span>
              </div>
            </div>

            {bvvParties.map((p) => {
              const currentVal = p.percent;
              const val2023 = p.val2023 ?? 0;
              const diff = p.diff;
              const diffFormatted = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
              const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-slate-400";

              return (
                <div key={p.id} className="p-2 sm:p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white flex items-center gap-1.5 truncate pr-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="truncate">{p.name}</span>
                    </span>

                    <div className="flex items-center gap-2 sm:gap-4 text-[11px] shrink-0">
                      <span className="w-14 sm:w-16 text-right font-black text-white text-sm" style={{ ...fontDisplay }}>
                        {currentVal.toFixed(1)}%
                      </span>
                      <span className="w-14 sm:w-16 text-right font-mono text-slate-400">
                        {val2023 > 0 ? `${val2023.toFixed(1)}%` : "—"}
                      </span>
                      <span className={`w-12 text-right font-bold ${diffColor}`}>
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

      {/* ── 8. Amtliche Live-Portale & Schnittstellen ── */}
      <div className="relative z-10 pt-3 border-t border-slate-800 text-xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-amber-400" />
            Amtliche Portale der Landeswahlleiterin:
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            wahlen-berlin.de
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
              <span className="font-bold block">rbb24 Live-Center</span>
              <span className="text-[10px] text-amber-400">Analysen &amp; Ticker</span>
            </div>
            <ExternalLink size={12} className="shrink-0 text-amber-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ElectionResultsLiveTracker;
