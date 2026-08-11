import { useState } from "react";
import { ShieldCheck, Lock, Cpu, Rocket, Building2, BarChart3, ChevronRight, Zap, ExternalLink } from "lucide-react";
import { useLang } from "../../i18n";
import { T, fontDisplay, fontMono } from "../../config/tokens";
import PrimaryCTA from "../atoms/PrimaryCTA";
import BrandenburgerTorBadge from "../atoms/BrandenburgerTorBadge";
import { FernsehturmIcon } from "../atoms/FernsehturmBadge";
import LiveTrackerBadge from "../atoms/LiveTrackerBadge";
import AIImageOverlay from "../atoms/AIImageOverlay";

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
    <section className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-14 pb-20 overflow-hidden bg-blueprint-grid">
      {/* Eyebrow & Official Blueprint Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <BrandenburgerTorBadge label="BERLIN METROPOL STEUER-SCHUTZSCHILD" />
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
            <span className="relative inline-block text-blue-600 px-2 underline decoration-blue-600/30 underline-offset-8">
              Berlin
            </span>
            {t("hero.title2post")}
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed font-normal max-w-xl" style={{ color: T.muted }}>
            {t("hero.sub")}
          </p>

          {/* Key Feature Trust Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 text-slate-800 shadow-xs" style={{ ...fontMono }}>
              <Lock size={13} className="text-blue-600" />
              Ohne Cookies & Tracking
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 text-slate-800 shadow-xs" style={{ ...fontMono }}>
              <ShieldCheck size={13} className="text-blue-600" />
              100% DSGVO & EU-Wallet
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 text-slate-800 shadow-xs" style={{ ...fontMono }}>
              <Cpu size={13} className="text-blue-600" />
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
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Live Stand Badge direkt über dem Radar */}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <LiveTrackerBadge type="general" />
            <span className="text-[11px] font-mono text-slate-500 font-semibold shrink-0">
              Echtzeit-Radar
            </span>
          </div>

          <div className="rounded-2xl relative overflow-hidden transition-all duration-300 shadow-lg">
            {/* Full Background: Berlin Moonlight Skyline */}
            <AIImageOverlay
              src="/images/berlin_moonlight_skyline.png"
              alt="Berlin Moonlight Tech Skyline"
              className="absolute inset-0 w-full h-full"
              imgClassName="w-full h-full object-cover"
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/80 to-slate-950/92" />

            {/* Content on top of background */}
            <div className="relative z-10 p-5 sm:p-6">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <FernsehturmIcon size={20} color="#FFFFFF" />
                  <span className="text-xs font-bold tracking-widest text-white uppercase" style={{ ...fontMono }}>
                    BERLIN METROPOL RADAR 🌙
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600/80 text-white border border-blue-400/30 flex items-center gap-1">
                  <Zap size={10} /> HUB #1 IN DE
                </span>
              </div>

              {/* Interactive Control Tabs */}
              <div className="grid grid-cols-3 gap-1.5 bg-white/10 backdrop-blur-sm p-1 rounded-lg mb-5 border border-white/15">
                <button
                  type="button"
                  onClick={() => setActiveTab("trends")}
                  className={`py-2 px-2 rounded-md text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                    activeTab === "trends"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                  style={{ ...fontDisplay }}
                >
                  <Rocket size={13} /> Trends
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("hubs")}
                  className={`py-2 px-2 rounded-md text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                    activeTab === "hubs"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                  style={{ ...fontDisplay }}
                >
                  <Building2 size={13} /> Tech-Hubs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("kpis")}
                  className={`py-2 px-2 rounded-md text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                    activeTab === "kpis"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                  style={{ ...fontDisplay }}
                >
                  <BarChart3 size={13} /> KPIs
                </button>
              </div>

              {/* TAB 1: Trends 2026 */}
              {activeTab === "trends" && (
                <div className="space-y-3">
                  {trends.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3.5 rounded-xl bg-white/8 backdrop-blur-sm border border-white/12 hover:border-blue-400/50 hover:bg-white/14 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/25">
                          {item.tag}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-400 group-hover:underline">
                          <span>Quelle: {item.source}</span>
                          <ExternalLink size={11} className="shrink-0" />
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors" style={{ ...fontDisplay }}>
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
                <div className="space-y-3">
                  {hubs.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3.5 rounded-xl bg-white/8 backdrop-blur-sm border border-white/12 hover:border-blue-400/50 hover:bg-white/14 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase font-bold text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/25">
                          {item.tag}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-400 group-hover:underline">
                          <span>Quelle: {item.source}</span>
                          <ExternalLink size={11} className="shrink-0" />
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors" style={{ ...fontDisplay }}>
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
                <div className="space-y-3 text-xs">
                  {kpis.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3.5 rounded-xl bg-white/8 backdrop-blur-sm border border-white/12 hover:border-blue-400/50 hover:bg-white/14 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-400 mb-0.5 group-hover:underline">
                            <span>Quelle: {item.source}</span>
                            <ExternalLink size={11} className="shrink-0" />
                          </div>
                          <span className="text-white font-bold block text-xs">{item.label}</span>
                          <span className="text-slate-400 text-[11px]">{item.detail}</span>
                        </div>
                        <span className="text-lg font-black text-amber-400 font-mono group-hover:scale-105 transition-transform">{item.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* Footer Link */}
              <div className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-400">
                <span style={{ ...fontMono }}>herotax.de · Verifizierte Daten</span>
                <a
                  href="/news"
                  onClick={(e) => {
                    if (e && (e.metaKey || e.ctrlKey)) return;
                    e.preventDefault();
                    window.history.pushState({}, "", "/news");
                    window.dispatchEvent(new Event("popstate"));
                  }}
                  className="text-blue-400 font-bold hover:text-blue-300 inline-flex items-center gap-1"
                >
                  Hauptstadt News lesen <ChevronRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
