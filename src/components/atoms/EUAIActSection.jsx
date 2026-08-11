import { useState } from "react";
import { ShieldAlert, Users, CalendarClock, Scale, CheckCircle2, AlertTriangle, ExternalLink, Info } from "lucide-react";
import { T, fontDisplay, fontMono } from "../../config/tokens";

export default function EUAIActSection() {
  const [tab, setTab] = useState("rules"); // 'rules' | 'target' | 'timeline'

  const rules = [
    {
      title: "Transparenzpflichten (Art. 50 EU AI Act)",
      desc: "KI-generierte Texte, Bilder, Videos und Chatbots müssen eindeutig als KI-Erzeugnisse gekennzeichnet werden.",
      impact: "Pflicht für alle Webseiten & Marketing-Tools",
      icon: Info,
    },
    {
      title: "KI-Kompetenz im Betrieb (Art. 4 EU AI Act)",
      desc: "Arbeitgeber müssen sicherstellen, dass Mitarbeiter, die KI-Tools nutzen, ausreichend im sicheren Umgang geschult sind.",
      impact: "Gilt für alle Unternehmen ab Feb 2025",
      icon: CheckCircle2,
    },
    {
      title: "Verbot unzulässiger KI-Systeme (Art. 5)",
      desc: "Social Scoring, Verhaltensmanipulation und biometrische Massenüberwachung sind in der EU streng verboten.",
      impact: "Bußgelder bis zu 35 Mio. € oder 7 % vom Umsatz",
      icon: AlertTriangle,
    },
  ];

  const targets = [
    {
      role: "Unternehmer & Arbeitgeber",
      desc: "Wer KI im Recruiting, Buchhaltung, Kundenservice oder Marketing einsetzt, trägt Verantwortung für Compliance & Datenschutz.",
      badge: "Anwender / Deployer",
    },
    {
      role: "Entwickler & FinTechs",
      desc: "Wer KI-Modelle entwickelt oder per API in eigene Produkte integriert, muss Risikobewertungen & Dokumentation vorweisen.",
      badge: "Anbieter / Provider",
    },
    {
      role: "Privatpersonen & Verbraucher",
      desc: "Recht auf Aufklärung bei KI-Interaktion, Schutz vor Deepfakes sowie Anspruch auf Beschwerde bei Aufsichtsbehörden.",
      badge: "Verbraucherschutz",
    },
  ];

  const timeline = [
    {
      date: "Februar 2025",
      title: "Verbot unzulässiger KI & KI-Schulungspflicht",
      desc: "Geltungsbeginn für KI-Verbote (Art. 5) und Verpflichtung zur KI-Alphabetisierung von Mitarbeitern (Art. 4).",
      status: "In Kraft",
      color: "#10B981",
    },
    {
      date: "August 2025",
      title: "GPAI & Governance-Regeln",
      desc: "Pflichten für General Purpose AI (Basis-Modelle wie GPT-4) und Inkrafttreten der Aufsichtsstrukturen.",
      status: "Anstehend 2025",
      color: "#F59E0B",
    },
    {
      date: "August 2026",
      title: "Vollanwendung & Hochrisiko-KI",
      desc: "Strenge Auflagen und Konformitätsprüfungen für Hochrisiko-KI-Systeme treten EU-weit verbindlich in Kraft.",
      status: "Stichtag 2026",
      color: "#3B82F6",
    },
    {
      date: "August 2027",
      title: "Regulierte Industrieprodukte",
      desc: "Erweiterte Bestimmungen für KI-Systeme als Sicherheitsbauteile in bereits regulierten EU-Produkten.",
      status: "Stufe 4",
      color: "#6B7280",
    },
  ];

  return (
    <div className="mt-6 rounded-3xl p-6 sm:p-7 bg-white border border-slate-200/90 shadow-sm">
      {/* Header Badge & Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
            <Scale size={16} className="text-blue-600" />
          </span>
          <div>
            <h3 className="font-bold text-base leading-snug" style={{ ...fontDisplay, color: T.text }}>
              EU AI Act Guide 🇪🇺 · Verordnung (EU) 2024/1689
            </h3>
            <p className="text-xs" style={{ ...fontMono, color: T.faint }}>
              Kompakt-Kompass für Unternehmer, Freiberufler & Verbraucher
            </p>
          </div>
        </div>
        <a
          href="https://bmds.bund.de/aktuelles"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
        >
          <span>Amtliche Quellen</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Control Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100/80 mb-5 border border-slate-200/60">
        <button
          type="button"
          onClick={() => setTab("rules")}
          className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            tab === "rules" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
          }`}
          style={{ ...fontDisplay }}
        >
          <ShieldAlert size={13} /> Was gilt?
        </button>
        <button
          type="button"
          onClick={() => setTab("target")}
          className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            tab === "target" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
          }`}
          style={{ ...fontDisplay }}
        >
          <Users size={13} /> Wer betroffen?
        </button>
        <button
          type="button"
          onClick={() => setTab("timeline")}
          className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            tab === "timeline" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
          }`}
          style={{ ...fontDisplay }}
        >
          <CalendarClock size={13} /> Fristen
        </button>
      </div>

      {/* Tab 1: Was zu beachten ist */}
      {tab === "rules" && (
        <div className="space-y-3">
          {rules.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-start gap-2.5">
                  <Icon size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900" style={{ ...fontDisplay }}>
                      {r.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{r.desc}</p>
                    <span className="inline-block mt-2 text-[10px] font-mono font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                      {r.impact}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Wer davon betroffen ist */}
      {tab === "target" && (
        <div className="space-y-3">
          {targets.map((t) => (
            <div key={t.role} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900" style={{ ...fontDisplay }}>
                  {t.role}
                </h4>
                <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Fristen & Stufenplan */}
      {tab === "timeline" && (
        <div className="space-y-2.5">
          {timeline.map((t) => (
            <div key={t.date} className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-start gap-3">
              <span
                className="px-2 py-1 rounded text-[10px] font-mono font-bold text-white shrink-0 mt-0.5"
                style={{ backgroundColor: t.color }}
              >
                {t.date}
              </span>
              <div>
                <h4 className="font-bold text-xs text-slate-900" style={{ ...fontDisplay }}>
                  {t.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
