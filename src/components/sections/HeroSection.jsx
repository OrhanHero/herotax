import { useState } from "react";
import { 
  ChevronRight, 
  Calculator, 
  ShieldCheck, 
  ArrowRight,
  FileText,
  Clock,
  Landmark
} from "lucide-react";
import { CONFIG } from "../../config/config";
import { T, fontDisplay } from "../../config/tokens";
import SiteStatusBadge from "../atoms/SiteStatusBadge";
import WhatsAppGlyph from "../atoms/WhatsAppGlyph";

/**
 * Hero Section: HERO Tax · Professionelles Enterprise-Portal für Berliner Unternehmer & Gründer
 * 100% Anti-Slop: Keine KI-Bilder, keine pulsierenden Monde/Halos, keine Gaming-Optik.
 * Konzentrierte Fachinhalte, echte Gewerbesteuer- und E-Rechnungs-Daten, ruhiges Grid.
 */
const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("fristen"); // 'fristen' | 'gewerbesteuer' | 'gobd'

  const navigate = (path, e) => {
    if (e && (e.metaKey || e.ctrlKey)) return;
    if (e) e.preventDefault();
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  /* Echte Q4/2026 & 2027 Gesetzesfristen nach BMF & AO */
  const taxDeadlines = [
    {
      date: "12. Okt 2026",
      title: "USt-Voranmeldung & LSt (Sep / Q3)",
      law: "§ 18 Abs. 1 UStG · § 41a EStG",
      status: "Fällig",
      critical: true,
      note: "Fällig in 2 Tagen (Montag, 12.10. durch Wochenendverschiebung gem. § 108 Abs. 3 AO · Dauerfristverlängerung: 10. Nov)",
    },
    {
      date: "10. Nov 2026",
      title: "USt-Voranmeldung Oktober 2026",
      law: "§ 18 UStG · Schonfrist bis 13.11.",
      status: "Regulär",
      critical: false,
      note: "Gilt für Monatszahler ohne Fristverlängerung",
    },
    {
      date: "01. Jan 2027",
      title: "E-Rechnungspflicht B2B (Wachstumschancengesetz)",
      law: "§ 14 UStG n.F. · BMF 15.10.2024",
      status: "Gesetzlicher Stichtag",
      critical: true,
      note: "Empfangspflicht für alle inländischen Unternehmer ab 01.01.2025; Übergangsfrist für eigene Ausgabe bis 800k € Umsatz",
    },
  ];

  /* Echte Berliner Gewerbesteuer-Hebesätze & Umland-Vergleich */
  const gewerbesteuerRates = [
    { district: "Berlin (Alle 12 Bezirke)", rate: "410 %", effective: "14,35 %", note: "Konstant seit 2021" },
    { district: "Potsdam (Brandenburg)", rate: "455 %", effective: "15,93 %", note: "Landeshauptstadt Brandenburg" },
    { district: "Schönefeld (Flughafenumfeld)", rate: "240 %", effective: "8,40 %", note: "Niedrigster Hebesatz in der Metropolregion" },
    { district: "Königs Wusterhausen", rate: "360 %", effective: "12,60 %", note: "Wirtschaftsachse Südost" },
  ];

  /* GoBD & KI-Prozesse Fakten */
  const gobdCheckpoints = [
    {
      title: "Verfahrensdokumentation (§§ 146, 147 AO)",
      desc: "Beim Einsatz von KI-Tools zur Belegerfassung (z. B. OCR/LLM) muss die lückenlose Nachvollziehbarkeit und Unveränderbarkeit dokumentiert sein.",
      law: "GoBD Rn. 151 ff.",
    },
    {
      title: "Menschliche Freigabekontrolle Pflicht",
      desc: "Vollautomatisierte Buchungssätze ohne qualifizierte Plausibilitätsprüfung verletzen die Sorgfaltspflicht der ordnungsmäßigen Buchführung.",
      law: "BMF-Schreiben IV A 4 - S 0316",
    },
    {
      title: "Revisionssichere Aufbewahrung",
      desc: "Originale XML-Strukturen (ZUGFeRD / XRechnung) müssen unverändert im maschinenlesbaren Rohformat archiviert werden — reines PDF genügt nicht.",
      law: "§ 14b UStG",
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-14 pb-16 overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-full">

        {/* ── Linke Spalte: Seriöse Kanzlei- & Beratungsarchitektur ── */}
        <div className="lg:col-span-7 flex flex-col justify-between max-w-full space-y-8">
          
          {/* Top Status */}
          <div className="flex flex-wrap items-center gap-3">
            <SiteStatusBadge />
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium"
              style={{
                backgroundColor: T.wash,
                color: T.muted,
                border: `1px solid ${T.line}`,
              }}
            >
              <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
              Rechtssicher · Primärquellen BMF &amp; SenFin
            </span>
          </div>

          {/* H1 Headline */}
          <div className="space-y-4">
            <h1
              className="font-black tracking-tight leading-[1.08] break-words text-slate-950 dark:text-slate-50"
              style={{ ...fontDisplay, fontSize: "clamp(2.2rem, 5.2vw, 4.2rem)" }}
            >
              Steuerrecht.
              <br />
              Automatisierte Prozesse.
              <br />
              <span style={{ color: T.blue }}>Präzision</span> für Berlin.
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
              style={{ color: T.muted }}
            >
              Fachlich fundierte Orientierung für Unternehmer, Gründer und Finanzverantwortliche. Verbindliche Fristen, steuerliche Gesetzesänderungen und GoBD-konforme KI-Prozesse — ohne Marketing-Floskeln.
            </p>
          </div>

          {/* Primäre Aktionen */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            <a
              href="/tools"
              onClick={(e) => navigate("/tools", e)}
              className="px-6 py-3.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-150 hover:opacity-90 inline-flex items-center gap-2 shadow-xs"
              style={{
                backgroundColor: T.blue,
                color: T.blueInk,
                ...fontDisplay,
              }}
            >
              <Calculator size={17} />
              <span>Berechnungstools &amp; Fristen</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="/ki"
              onClick={(e) => navigate("/ki", e)}
              className="px-5 py-3.5 rounded-lg font-bold text-sm sm:text-base border transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-800/60 inline-flex items-center gap-2"
              style={{
                borderColor: T.line,
                color: T.text,
                ...fontDisplay,
              }}
            >
              <FileText size={17} />
              <span>GoBD &amp; KI-Leitfaden</span>
            </a>

            <a
              href={CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 rounded-lg font-semibold text-xs sm:text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1.5"
            >
              <WhatsAppGlyph size={15} />
              <span>Updates per Messenger</span>
            </a>
          </div>

          {/* 3 Fach-Kacheln mit hohem Nutzwert */}
          <div className="grid sm:grid-cols-3 gap-3.5 pt-2">
            <a
              href="/tools"
              onClick={(e) => navigate("/tools", e)}
              className="p-4 rounded-xl border transition-all hover:border-blue-500/50 hover:shadow-xs group"
              style={{ backgroundColor: T.card, borderColor: T.line }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">§ 14 UStG</span>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-slate-900 dark:text-slate-100" style={{ ...fontDisplay }}>
                E-Rechnung 2027
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Fristen-Matrix &amp; Konformitäts-Check für B2B-Umsätze nach BMF.
              </p>
            </a>

            <a
              href="/tools"
              onClick={(e) => navigate("/tools", e)}
              className="p-4 rounded-xl border transition-all hover:border-blue-500/50 hover:shadow-xs group"
              style={{ backgroundColor: T.card, borderColor: T.line }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">§ 19 UStG</span>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-slate-900 dark:text-slate-100" style={{ ...fontDisplay }}>
                USt- &amp; Kleinunternehmer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Vorsteuerabzug, Netto/Brutto &amp; Schwellenwerte ab 2025/2026.
              </p>
            </a>

            <a
              href="/ki"
              onClick={(e) => navigate("/ki", e)}
              className="p-4 rounded-xl border transition-all hover:border-blue-500/50 hover:shadow-xs group"
              style={{ backgroundColor: T.card, borderColor: T.line }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">GoBD Rn. 151</span>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-slate-900 dark:text-slate-100" style={{ ...fontDisplay }}>
                Verfahrensdokumentation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Prüfungssicherer Einsatz von LLM- &amp; OCR-Modellen in der Buchführung.
              </p>
            </a>
          </div>

          {/* Rechtlicher Transparenzhinweis */}
          <div
            className="p-3 rounded-lg border text-xs flex items-center justify-between gap-3"
            style={{ backgroundColor: T.wash, borderColor: T.line }}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-500">§ 5 StBerG:</span>
              <span className="text-slate-600 dark:text-slate-300">
                Informations- und Analyseportal. Keine Rechts- oder Steuerberatung im Einzelfall.
              </span>
            </div>
            <a
              href="/impressum"
              onClick={(e) => navigate("/impressum", e)}
              className="font-medium underline hover:text-blue-600 shrink-0 text-slate-500"
            >
              Impressum
            </a>
          </div>
        </div>

        {/* ── Rechte Spalte: Seriöses Standort- & Steuer-Factsheet (Zero-Slop) ── */}
        <div className="lg:col-span-5 flex flex-col justify-between max-w-full">
          
          <div
            className="rounded-2xl p-6 border flex-1 flex flex-col justify-between space-y-6"
            style={{
              backgroundColor: T.card,
              borderColor: T.line,
              boxShadow: T.shadow,
            }}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: T.lineSoft }}>
                <div className="flex items-center gap-2">
                  <Landmark size={18} className="text-blue-600" />
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100" style={{ ...fontDisplay }}>
                    Berliner Steuer- &amp; Standortradar
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Stand: Q4 / 2026</span>
              </div>

              {/* Tab Selector: Fristen | Gewerbesteuer | GoBD */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-lg my-4" style={{ backgroundColor: T.wash }}>
                {[
                  { id: "fristen", label: "Fristen Q4" },
                  { id: "gewerbesteuer", label: "Gewerbesteuer" },
                  { id: "gobd", label: "GoBD & KI" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="py-1.5 text-xs font-semibold rounded-md transition-all text-center"
                    style={{
                      backgroundColor: activeTab === tab.id ? T.card : "transparent",
                      color: activeTab === tab.id ? T.text : T.muted,
                      boxShadow: activeTab === tab.id ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: Echte Fristen */}
              {activeTab === "fristen" && (
                <div className="space-y-3">
                  {taxDeadlines.map((item) => (
                    <div
                      key={item.title}
                      className="p-3 rounded-lg border text-xs space-y-1.5"
                      style={{
                        backgroundColor: item.critical ? "rgba(35, 55, 232, 0.03)" : T.wash,
                        borderColor: item.critical ? T.blueBorder : T.lineSoft,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                          <Clock size={12} />
                          {item.date}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                          {item.law}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.title}</p>
                      <p className="text-slate-500 dark:text-slate-400 leading-normal">{item.note}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: Gewerbesteuer Hebesätze */}
              {activeTab === "gewerbesteuer" && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-500 mb-2">
                    Effektive Steuerbelastung berechnet mit Steuermesszahl 3,5 % (§ 11 Abs. 2 GewStG).
                  </div>
                  <div className="divide-y border rounded-lg overflow-hidden text-xs" style={{ borderColor: T.lineSoft }}>
                    {gewerbesteuerRates.map((row) => (
                      <div key={row.district} className="p-3 flex items-center justify-between bg-white dark:bg-slate-900">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{row.district}</p>
                          <p className="text-[11px] text-slate-500">{row.note}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-black text-sm text-slate-900 dark:text-slate-100 block">
                            {row.rate}
                          </span>
                          <span className="font-mono text-[11px] text-slate-500">
                            Effektiv {row.effective}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GoBD & KI Checkpoints */}
              {activeTab === "gobd" && (
                <div className="space-y-3">
                  {gobdCheckpoints.map((cp) => (
                    <div key={cp.title} className="p-3 rounded-lg border text-xs space-y-1" style={{ borderColor: T.lineSoft, backgroundColor: T.wash }}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{cp.title}</span>
                        <span className="font-mono text-[10px] text-slate-500">{cp.law}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{cp.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Citation & Link */}
            <div className="pt-4 border-t flex items-center justify-between text-xs text-slate-500" style={{ borderColor: T.lineSoft }}>
              <span className="font-mono text-[11px]">Gesetzliche Grundlagen: AO, UStG, GewStG</span>
              <a
                href="/news"
                onClick={(e) => navigate("/news", e)}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Zum News-Hub <ChevronRight size={13} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
