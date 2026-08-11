import { useState } from "react";
import { MapPin, Navigation, ExternalLink, Building2, Zap, Cpu, Sparkles } from "lucide-react";
import { fontDisplay, fontMono } from "../../config/tokens";

export default function BerlinEcosystemMapCard() {
  const [selectedHub, setSelectedHub] = useState("mitte");

  const hubs = [
    {
      id: "mitte",
      name: "Berlin-Mitte AI Hub",
      district: "Mitte / Rosenthaler Platz",
      focus: "Agentic AI, LLMs & Governance",
      tag: "AI Capital #1",
      stats: "450+ AI Startups",
      coords: "52.5200° N, 13.4050° E",
      icon: Cpu,
      color: "#3B82F6",
      href: "https://www.merantix.com/",
    },
    {
      id: "euref",
      name: "EUREF-Campus Schöneberg",
      district: "Schöneberg / Ringbahn",
      focus: "CleanTech, Mobility & Smart City",
      tag: "GreenTech Hub",
      stats: "150+ Unternehmen",
      coords: "52.4812° N, 13.3567° E",
      icon: Zap,
      color: "#10B981",
      href: "https://euref.de/",
    },
    {
      id: "adlershof",
      name: "WISTA Science Park Adlershof",
      district: "Treptow-Köpenick",
      focus: "DeepTech, Quantencomputing & BioTech",
      tag: "DeepTech Park",
      stats: "1.200+ Firmen & Inst.",
      coords: "52.4333° N, 13.5333° E",
      icon: Building2,
      color: "#8B5CF6",
      href: "https://www.adlershof.de/",
    },
    {
      id: "kreuzberg",
      name: "Factory Berlin & Silicon Allee",
      district: "Kreuzberg / Görlitzer Park",
      focus: "FinTech, TaxTech & Web3",
      tag: "FinTech & Web3",
      stats: "3.500+ Member",
      coords: "52.4986° N, 13.4372° E",
      icon: Sparkles,
      color: "#F59E0B",
      href: "https://factoryberlin.com/",
    },
  ];

  const current = hubs.find((h) => h.id === selectedHub) || hubs[0];

  return (
    <div className="mt-4 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md text-white">
      {/* Map Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
            <Navigation size={16} />
          </span>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-white" style={{ ...fontDisplay }}>
              Interaktive Berlin Metropol Ökosystem-Karte 🗺️
            </h4>
            <p className="text-[11px] text-slate-400" style={{ ...fontMono }}>
              Tech-Hotspots, Innovation-Hubs & Standorte 2026
            </p>
          </div>
        </div>
        <span className="hidden xs:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          ● Live GPS Radar
        </span>
      </div>

      {/* Map Content Grid */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Hub Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              type="button"
              onClick={() => setSelectedHub(hub.id)}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center truncate ${
                selectedHub === hub.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              style={{ ...fontDisplay }}
            >
              {hub.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Selected Hub Detail Card */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} style={{ color: current.color }} className="shrink-0" />
              <div>
                <h5 className="font-bold text-sm sm:text-base text-white" style={{ ...fontDisplay }}>
                  {current.name}
                </h5>
                <span className="text-[11px] text-slate-400 font-mono">{current.district}</span>
              </div>
            </div>
            <a
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:underline"
              style={{ ...fontMono }}
            >
              <span>Infos & Website</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/10 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Fokusbereich</span>
              <span className="font-semibold text-slate-200">{current.focus}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Kennzahl / Dichte</span>
              <span className="font-bold text-emerald-400">{current.stats}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-400">
            <span>Koordinaten: {current.coords}</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-bold uppercase">
              {current.tag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
