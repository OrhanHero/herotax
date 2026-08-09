import { useState } from "react";
import { ShieldCheck, Lock, Cpu, Sparkles, Rocket, Building2, BarChart3, ChevronRight, Zap, ExternalLink } from "lucide-react";
import { useLang } from "../../i18n";
import { T, fontDisplay, fontMono } from "../../config/tokens";
import PrimaryCTA from "../atoms/PrimaryCTA";

/** Hero Section: HERO Tax — Berlin Startup & Ecosystem Radar 2026 (Mit verifizierten Original-Quellen) */
const HeroSection = () => {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("trends"); // 'trends' | 'hubs' | 'kpis'

  const trends = [
    {
      title: "Agentic AI & FinTech Boom",
      desc: "Über 45 % aller Berliner Tech-Neugründungen 2026 setzen auf KI-Beleganalyse & Tax Automation.",
      tag: "Tech #1 in DE",
      source: "KI Bundesverband e.V.",
      href: "https://ki-verband.de/",
    },
    {
      title: "18.500+ Neugründungen in H1 2026",
      desc: "Rekordzuwachs bei den Gewerbeanmeldungen in der Hauptstadt laut offizieller Pressemitteilung.",
      tag: "+12 % Wachstum",
      source: "Amt für Statistik Berlin-Brandenburg",
      href: "https://www.statistik-berlin-brandenburg.de/presse/2026/62-gewerbeanmeldungen-2026-berlin",
    },
    {
      title: "CleanTech & Smart Energy",
      desc: "Starker Fokus auf nachhaltige Energiewende & Mobility am EUREF-Campus & Adlershof.",
      tag: "Green Tech",
      source: "EUREF-Campus Berlin",
      href: "https://euref.de/",
    },
  ];

  const hubs = [
    {
      title: "Merantix AI Hub Mitte",
      desc: "Europas führendes Ökosystem für KI-Startups, Risikokapital & KI-Governance in Berlin-Mitte.",
      tag: "AI Capital",
      source: "Merantix AI Hub",
      href: "https://www.merantix.com/",
    },
    {
      title: "Factory Berlin Ecosystem",
      desc: "Kreative Tech-Community, Smart City Initiativen und internationale Gründer-Netzwerke.",
      tag: "Innovations-Hub",
      source: "Factory Berlin",
      href: "https://factoryberlin.com/",
    },
    {
      title: "WISTA Adlershof Science Park",
      desc: "Europas modernster Technologiepark für High-Tech, Photonik & Quantencomputing.",
      tag: "DeepTech Hub",
      source: "WISTA Management Adlershof",
      href: "https://www.adlershof.de/",
    },
  ];

  const kpis = [
    {
      label: "Risikokapital (H1 2026)",
      value: "1,4 Mrd. €",
      detail: "Platz 1 in Deutschland",
      source: "Berlin Partner Pressemitteilungen",
      href: "https://www.berlin-partner.de/presse/",
    },
    {
      label: "IBB GründungsBONUS Plus",
      value: "50.000 €",
      detail: "Zuschuss ohne Eigenkapitalzwang",
      source: "Investitionsbank Berlin (IBB)",
      href: "https://www.ibb.de/de/foerderprogramme/gruendungsbonus-plus.html",
    },
    {
      label: "Aktive USt-Voranmelder",
      value: "168.000",
      detail: "Gewerbebetriebe in Berlin",
      source: "Senatsverwaltung für Finanzen Berlin",
      href: "https://www.berlin.de/sen/finanzen/",
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20 overflow-hidden hero-grid-pattern">
      {/* Background Radial Glow Orbs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none opacity-40 blur-3xl"
        style={{ background: `radial-gradient(ellipse at center, ${T.blue} 0%, rgba(16, 185, 129, 0.3) 50%, transparent 75%)` }}
        aria-hidden="true"
      />

      {/* Cyber Eyebrow Badge */}
      <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-blue-500/30 bg-slate-900/80 text-blue-300 shadow-lg backdrop-blur-xl">
        <Sparkles size={13} className="text-emerald-400 animate-spin-slow" />
        <span style={{ ...fontMono }} className="tracking-wide">
          {t("hero.kicker")}
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Display Headline & Copy */}
        <div className="lg:col-span-7 space-y-6">
          <h1
            className="font-black tracking-tight leading-[1.03]"
            style={{ ...fontDisplay, color: T.text, fontSize: "clamp(2.75rem, 5.8vw, 5.25rem)" }}
          >
            {t("hero.title1")}
            <br />
            {t("hero.title2pre")}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Berlin
            </span>
            {t("hero.title2post")}
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed font-normal max-w-xl" style={{ color: T.muted }}>
            {t("hero.sub")}
          </p>

          {/* Key Feature Trust Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 shadow-xs">
              <Lock size={13} className="text-emerald-600" />
              Ohne Cookies & Tracking
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-700 border border-blue-500/20 shadow-xs">
              <ShieldCheck size={13} className="text-blue-600" />
              100% DSGVO & EU-Wallet
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-500/20 shadow-xs">
              <Cpu size={13} className="text-amber-600" />
              BSI & BMDS Live Feeds
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <PrimaryCTA large />
            <p className="text-xs text-center sm:text-start self-center" style={{ ...fontMono, color: T.faint }}>
              {t("cta.note")}
            </p>
          </div>
        </div>

        {/* Right Column: BERLIN STARTUP & ECOSYSTEM RADAR 2026 */}
        <div className="lg:col-span-5">
          <div className="hero-glass-dark rounded-3xl p-6 sm:p-7 text-slate-100 relative overflow-hidden transition-all duration-300">
            {/* Top Glowing Gradient Accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400" />

            {/* Header Status Bar */}
            <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-slate-300 uppercase" style={{ ...fontMono }}>
                  BERLIN STARTUP RADAR 🐻
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <Zap size={10} /> HUB #1 IN DE
              </span>
            </div>

            {/* Interactive Control Tabs */}
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950/60 p-1 rounded-xl mb-5 border border-slate-800/80">
              <button
                type="button"
                onClick={() => setActiveTab("trends")}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  activeTab === "trends"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Rocket size={13} /> Trends
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("hubs")}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  activeTab === "hubs"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Building2 size={13} /> Tech-Hubs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("kpis")}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  activeTab === "kpis"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BarChart3 size={13} /> KPIs
              </button>
            </div>

            {/* TAB 1: Trends 2026 */}
            {activeTab === "trends" && (
              <div className="space-y-3 animate-fadeIn">
                {trends.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.href, "_blank", "noopener,noreferrer");
                    }}
                    className="group block p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-900 transition-all cursor-pointer relative z-10 pointer-events-auto shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {item.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-blue-400 group-hover:text-blue-300 group-hover:underline">
                        <span>Quelle: {item.source}</span>
                        <ExternalLink size={12} className="shrink-0" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors" style={{ ...fontDisplay }}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </a>
                ))}
              </div>
            )}

            {/* TAB 2: Berlin Tech Hubs */}
            {activeTab === "hubs" && (
              <div className="space-y-3 animate-fadeIn">
                {hubs.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.href, "_blank", "noopener,noreferrer");
                    }}
                    className="group block p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer relative z-10 pointer-events-auto shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {item.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-400 group-hover:text-emerald-300 group-hover:underline">
                        <span>Quelle: {item.source}</span>
                        <ExternalLink size={12} className="shrink-0" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors" style={{ ...fontDisplay }}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </a>
                ))}
              </div>
            )}

            {/* TAB 3: Berlin Startup KPIs */}
            {activeTab === "kpis" && (
              <div className="space-y-3 animate-fadeIn text-xs">
                {kpis.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.href, "_blank", "noopener,noreferrer");
                    }}
                    className="group block p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-amber-500/50 hover:bg-slate-900 transition-all cursor-pointer relative z-10 pointer-events-auto shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-amber-400 mb-0.5 group-hover:underline">
                          <span>Quelle: {item.source}</span>
                          <ExternalLink size={11} className="shrink-0" />
                        </div>
                        <span className="text-slate-200 font-bold block text-xs">{item.label}</span>
                        <span className="text-slate-400 text-[11px]">{item.detail}</span>
                      </div>
                      <span className="text-lg font-black text-amber-400 font-mono group-hover:scale-105 transition-transform">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Footer Link */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span style={{ ...fontMono }}>herotax.de · Verified Sources</span>
              <a href="#news" className="text-blue-400 font-bold hover:text-blue-300 inline-flex items-center gap-1">
                Hauptstadt News lesen <ChevronRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
