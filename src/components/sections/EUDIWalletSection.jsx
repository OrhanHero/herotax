import { ExternalLink, Wallet, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";
import { T, fontDisplay, fontMono } from "../../config/tokens";
import { EUDI_TIMELINE, EUDI_PARTNERS } from "../../data/eudiWallet";
import Eyebrow from "../atoms/Eyebrow";
import AIImageOverlay from "../atoms/AIImageOverlay";

/** Säule 03 · EUDI-Wallet (Digitale Identität der EU)
    Eigener Bereich für Stand & Zeitplan des European Digital Identity
    Wallet — hochrelevant für Unternehmer:innen (KYC, Vertragsunterschrift,
    künftig ggf. Behördengänge), EU-Frist ist der 24. Dezember 2026,
    deutscher Start mit der staatlichen Wallet „d-you“ am 2. Januar 2027. */
const EUDIWalletSection = () => (
  <section className="py-24" style={{ borderTop: `1px solid ${T.lineSoft}` }} id="eudi-wallet">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      {/* Die 03 benennt den Bereich EU-Kompass, nicht nur den Wallet-Teil —
          der AI Act weiter unten gehört dazu und führt deshalb keine
          eigene Nummer. */}
      <Eyebrow index="03">EU-Kompass · EUDI-Wallet & EU AI Act</Eyebrow>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight max-w-2xl" style={{ ...fontDisplay, color: T.text }}>
          Ein Ausweis fürs Smartphone.
          <br />
          <span style={{ color: T.faint }}>Für ganz Europa.</span>
        </h2>
        <p className="text-sm max-w-xs" style={{ color: T.muted }}>
          Die EU-Frist ist der 24. Dezember 2026, Deutschland startet am
          2. Januar 2027 mit der staatlichen Wallet <strong>„d-you“</strong> —
          aktuelle Beschlüsse, Partner-Ökosystem und Praxisnutzen auf einen Blick.
        </p>
      </div>

      <div
        className="rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden relative"
        style={{ background: `linear-gradient(135deg, ${T.blue} 0%, #1725A8 100%)` }}
      >
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-8 relative z-10">
          <div className="lg:col-span-7 flex items-center gap-3">
            <span
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <Wallet size={24} style={{ color: "#FFFFFF" }} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white border border-white/30 font-mono">
                  <Sparkles size={11} className="text-amber-300" />
                  Neu: Staatliche Wallet heißt „d-you“
                </span>
                <span className="text-[11px] font-mono text-white/70">
                  Stand: 10. September 2026
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight" style={{ ...fontDisplay, color: "#FFFFFF" }}>
                Deutsche EUDI-Wallet „d-you“: Stand &amp; Launch
              </h3>
              <p className="text-xs" style={{ ...fontMono, color: "rgba(255,255,255,0.7)" }}>
                Quellen: BMDS (Pressemitteilung 53/2026) · eudi-wallet.gov.de/app · EU-Kommission · openCode
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-end">
            <AIImageOverlay
              src="/images/eudi_wallet_berlin.png"
              alt="EUDI Wallet Berlin Digital Identity 3D Visual"
              className="w-full rounded-2xl border border-white/20 shadow-lg overflow-hidden"
              imgClassName="w-full h-32 object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Featured Breaking News Box: d-you */}
        <div
          className="rounded-2xl p-6 mb-8 relative z-10 border border-white/25 backdrop-blur-md"
          style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/15">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                BMDS-Mitteilung vom 09.09.2026 · Deutschland startet digitale Identität für alle
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white leading-snug" style={{ ...fontDisplay }}>
                Name und Logo vorgestellt: Die deutsche Wallet heißt offiziell „d-you“
              </h4>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="https://bmds.bund.de/aktuelles/pressemitteilungen/detail/d-you-deutschland-startet-digitale-identitaet-fuer-alle"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-all shadow-sm"
              >
                <span>BMDS-Pressemitteilung</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href="https://eudi-wallet.gov.de/app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/30 transition-all"
              >
                <span>Offizielle App-Seite</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-white/85 mb-4">
            Das Bundesministerium für Digitales und Staatsmodernisierung (BMDS) hat die offizielle deutsche EUDI-Wallet vorgestellt:
            Das <strong>„d“</strong> steht für digital und Deutschland, das <strong>„you“</strong> rückt Bürgerinnen und Bürger in den Mittelpunkt.
            Das Logo zeigt die Hand als Leitmotiv: <em>„Es sind deine Daten. In deiner Hand.“</em>
            Zum Start am <strong>2. Januar 2027</strong> stellen rund 40 Partner aus Wirtschaft, Wissenschaft und Verwaltung eigene Services bereit —
            darunter Online-Kontoeröffnung, digitaler Vertragsabschluss und beglaubigte Nachweise ohne Screenshot-Notlösungen.
          </p>

          {/* Partner Chips */}
          <div className="pt-2">
            <span className="text-[11px] font-mono font-semibold text-white/70 block mb-2">
              Ausgewählte Launch-Partner (40 insgesamt) für Steuer-, Finanz- &amp; Verwaltungsdienste:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {EUDI_PARTNERS.map((partner) => (
                <span
                  key={partner}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/20 text-white/90 border border-white/15 inline-flex items-center gap-1"
                >
                  <CheckCircle2 size={10} className="text-emerald-300" />
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Timeline / Topic Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {EUDI_TIMELINE.map((item) => (
            <a
              key={item.title}
              href={item.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <item.icon size={17} style={{ color: "#FFFFFF" }} />
                </span>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20">
                      {item.badge}
                    </span>
                  )}
                  <ExternalLink
                    size={15}
                    className="shrink-0 opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "#FFFFFF" }}
                  />
                </div>
              </div>
              <h4 className="font-bold leading-snug mb-2" style={{ ...fontDisplay, color: "#FFFFFF" }}>
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                {item.text}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-xs pt-3 border-t border-white/10"
                style={{ ...fontMono, color: "rgba(255,255,255,0.9)" }}
              >
                <ExternalLink size={11} />
                Quelle: {item.source.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EUDIWalletSection;
