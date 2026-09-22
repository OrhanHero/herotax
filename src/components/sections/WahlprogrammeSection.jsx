import { useState } from "react";
import { Vote, FileText, ExternalLink, UserCheck, Landmark, Sparkles, Download, CalendarCheck, ChevronRight } from "lucide-react";
import { WAHLPROGRAMME_DATA } from "../../data/wahlprogramme";
import { fontDisplay } from "../../config/tokens";

/**
 * WahlprogrammeSection: Bereich für die Wahlprogramme & Spitzenkandidaten
 * der Berliner Parteien CDU, SPD, Grünen, Die Linke und AfD (Wahl 2026)
 */
const WahlprogrammeSection = () => {
  const [selectedPartyId, setSelectedPartyId] = useState("all"); // 'all' | 'cdu' | 'spd' | 'gruene' | 'dielinke' | 'afd'

  const displayedParties = selectedPartyId === "all"
    ? WAHLPROGRAMME_DATA.parties
    : WAHLPROGRAMME_DATA.parties.filter((p) => p.id === selectedPartyId);

  return (
    <div className="group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 bg-slate-900/90 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/50 shadow-xl overflow-hidden text-slate-100">
      {/* Subtle Ambient Glow Effect */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

      {/* Header Badges & Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wide font-mono">
            <Landmark size={13} className="text-amber-400" />
            ROTES RATHAUS 2026 🏛️
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/70">
            Abgeordnetenhauswahl Berlin
          </span>
        </div>
        <span className="text-xs text-amber-300 font-mono flex items-center gap-1 font-semibold">
          <CalendarCheck size={12} className="text-amber-400" />
          Stand: 22.09.2026 · Sondierungs-Grundlagen
        </span>
      </div>

      {/* Main Title */}
      <div className="relative z-10 mb-4">
        <h3
          className="text-lg sm:text-xl font-bold text-white leading-snug mb-1 flex items-center gap-2"
          style={{ ...fontDisplay }}
        >
          <Vote className="text-amber-400 shrink-0" size={20} />
          <span>Wahlprogramme &amp; Spitzenkandidaten</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Programmatischer Abgleich für Sondierungs- und Koalitionsgespräche im Roten Rathaus: Kernpositionen und Steuerpläne der Berliner Parteien (Linke, CDU, Grüne, SPD, AfD).
        </p>
      </div>

      {/* Party Selector Filter Tabs */}
      <div className="relative z-10 flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-slate-800 mb-5">
        <button
          type="button"
          onClick={() => setSelectedPartyId("all")}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 cursor-pointer ${
            selectedPartyId === "all"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          Alle (5)
        </button>

        {WAHLPROGRAMME_DATA.parties.map((party) => {
          const isActive = selectedPartyId === party.id;
          return (
            <button
              key={party.id}
              type="button"
              onClick={() => setSelectedPartyId(party.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? party.tabActive
                  : "text-slate-300 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: party.color }}
              />
              <span>{party.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Party Cards List / Grid */}
      <div className="relative z-10 space-y-4">
        {displayedParties.map((party) => (
          <div
            key={party.id}
            className={`rounded-xl p-4 transition-all duration-300 bg-gradient-to-br ${party.bgGradient} border ${party.borderColor} ${party.hoverBorderColor} shadow-md relative overflow-hidden`}
          >
            {/* Color Accent Stripe Left */}
            <div
              className="absolute top-0 left-0 bottom-0 w-1.5"
              style={{ backgroundColor: party.color }}
            />

            {/* Header: Party Name & Official Site Link */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pl-2">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-md text-xs font-black tracking-wider uppercase font-mono shadow-sm"
                  style={{ backgroundColor: party.color, color: "#ffffff" }}
                >
                  {party.shortName}
                </span>
                <a
                  href={party.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-white hover:underline flex items-center gap-1"
                  style={{ ...fontDisplay }}
                >
                  <span>{party.name}</span>
                  <ExternalLink size={12} className="text-slate-400 shrink-0" />
                </a>
              </div>

              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${party.badgeBg}`}>
                Wahl 2026
              </span>
            </div>

            {/* Candidate Card */}
            <div className="mb-3.5 pl-2 bg-slate-950/40 rounded-lg p-3 border border-slate-800/80">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <UserCheck size={14} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">
                      Spitzenpersonal Rotes Rathaus
                    </span>
                    <a
                      href={party.candidate.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
                      style={{ ...fontDisplay }}
                    >
                      <span>{party.candidate.name}</span>
                      <span className="text-xs font-normal text-slate-400 font-mono">({party.candidate.party})</span>
                      <ExternalLink size={12} className="text-amber-400/80 shrink-0" />
                    </a>
                  </div>
                </div>
                <a
                  href={party.candidate.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-amber-300/90 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1 rounded border border-amber-500/30 transition-all inline-flex items-center gap-1 shrink-0"
                >
                  <span>Profil &amp; Website</span>
                  <ChevronRight size={11} />
                </a>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                {party.candidate.description}
              </p>
            </div>

            {/* Wahlprogramm PDF Link Action */}
            <div className="pl-2 flex items-center justify-between gap-2.5 pt-2.5 border-t border-slate-800/80">
              <div className="flex items-center gap-2 min-w-0 flex-1 pr-1">
                <FileText size={15} className={`${party.accentColor} shrink-0`} />
                <span className="text-xs font-semibold text-slate-200 truncate" title={party.wahlprogrammTitle}>
                  {party.wahlprogrammTitle}
                </span>
              </div>
              <a
                href={party.wahlprogrammUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 border shadow-sm ${party.badgeBg} hover:brightness-125 cursor-pointer whitespace-nowrap`}
              >
                <Download size={13} className="shrink-0" />
                <span>Wahlprogramm öffnen</span>
                <ExternalLink size={12} className="shrink-0" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Wahl-O-Mat Live Banner */}
      <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-950/80 to-blue-950/40 border border-amber-500/30 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0 mt-0.5 sm:mt-0">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white font-mono">
                Wahl-O-Mat Berlin 2026 jetzt online 🗳️
              </span>
              <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                Offiziell Live
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              38 Thesen der Bundeszentrale für politische Bildung (bpb) zum direkten Parteienvergleich vor der Wahl am 20. September 2026.
            </p>
          </div>
        </div>
        <a
          href={WAHLPROGRAMME_DATA.wahlOMatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all cursor-pointer"
        >
          <span>Wahl-O-Mat Berlin starten</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};

export default WahlprogrammeSection;
