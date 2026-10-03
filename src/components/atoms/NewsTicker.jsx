import { useMemo } from "react";
import { Radio } from "lucide-react";
import { useLang } from "../../i18n";
import { T, fontMono } from "../../config/tokens";

/**
 * NewsTicker — durchlaufendes Live-Ticker-Band mit aktuellen Meldungen zu Steuern,
 * FinTech, AI-Regulierung, Berlin-Startups und aktuellen Wirtschaftsentwicklungen.
 * · Nahtlose Endlos-Schleife: Inhalt wird dupliziert, Animation läuft -50 %
 * · Pausiert bei Hover/Fokus (Lesbarkeit)
 * · Jeder Eintrag verlinkt auf die Original-Quelle
 */
const NewsTicker = ({ items }) => {
  const { t } = useLang();

  // Aktuelle Top-News zu Steuern, Tech, Wirtschaft & Berliner Politik (Stand 03.10.2026)
  const topUpdateItems = useMemo(() => {
    return [
      {
        cat: "Berlin Fokus",
        tickerTag: "🏛️ KOALITIONSVERHANDLUNGEN",
        isElection: true,
        title: "Rot-Rot-Grün vertieft Arbeitsgruppen im Roten Rathaus: Gewerbesteuerhebesatz 410 % und Investitionen in Tech-Hubs bleiben Konsens",
        date: "03.10.2026",
        source: { label: "rbb24.de", href: "https://www.rbb24.de/politik/berlin-wahl-2026/" },
      },
      {
        cat: "Bund & Steuer",
        tickerTag: "🇩🇪 STEUERFRISTEN Q4",
        title: "USt-Voranmeldung September/Q3: Wegen Tag der Deutschen Einheit und Wochenende gilt Fristende Montag, 12. Oktober (Dauerfristverlängerung: 10.11.)",
        date: "03.10.2026",
        source: { label: "ELSTER", href: "https://www.elster.de" },
      },
      {
        cat: "Bund & Steuer",
        tickerTag: "🧾 E-RECHNUNG 2027",
        title: "Noch 89 Tage bis zur Pflicht: BMF & IHK mahnen Betriebe über 800.000 € Umsatz zur ERP-Umstellung auf ZUGFeRD / XRechnung an",
        date: "02.10.2026",
        source: { label: "BMF / ELSTER", href: "https://www.elster.de" },
      },
      {
        cat: "FinTech & KI",
        tickerTag: "🤖 KI-REALLABOR",
        title: "Bundesnetzagentur startet erste Pilotkohorte im KI-Reallabor für Start-ups & KMU unter EU-AI-Act-Kriterien",
        date: "01.10.2026",
        source: { label: "Bundesnetzagentur", href: "https://bmds.bund.de/themen/kuenstliche-intelligenz" },
      },
      {
        cat: "Berlin Fokus",
        tickerTag: "💼 STANDORT BERLIN",
        title: "Wirtschaftsverbände begrüßen Hebesatz-Garantie: 410 % sichern Wettbewerbsfähigkeit der Berliner Gründerszene",
        date: "02.10.2026",
        source: { label: "ihk.de/berlin", href: "https://www.ihk.de/berlin" },
      },
      {
        cat: "Cybersecurity",
        tickerTag: "🛡️ NIS-2 PFLICHTEN",
        title: "BSI-Sicherheitsleitfaden für Finanzdienstleister: Strengere 24h-Meldepflichten und Notfallpläne für KMU etablieren",
        date: "29.09.2026",
        source: { label: "bsi.bund.de", href: "https://www.bsi.bund.de/" },
      },
      {
        cat: "Bund & Steuer",
        tickerTag: "💶 § 19 UStG",
        title: "Kleinunternehmerregelung 2026: Bis 25.000 € Vorjahresumsatz steuerfrei fakturieren – EU-weite Regelung nutzen",
        date: "28.09.2026",
        source: { label: "Gesetze im Internet", href: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
      },
      {
        cat: "Berlin Fokus",
        tickerTag: "🏆 AMTL. ENDERGEBNIS",
        isElection: true,
        title: "Amtliches Endergebnis (100 %): Linke 25,7 % (48 Sitze), CDU 18,8 % (34 Sitze), AfD 16,3 % (29 Sitze), Grüne 14,3 % (26 Sitze), SPD 12,1 % (22 Sitze)",
        date: "21.09.2026",
        source: { label: "wahlen-berlin.de", href: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/agh/index.html" },
      },
    ];
  }, []);

  // Zeige aktuelle Top-Updates zusammen mit gefilterten Artikeln (ohne veraltete Wahltag-Meldungen)
  const tickerItems = useMemo(() => {
    const all = items && items.length > 0 ? items : [];
    const valid = all.filter((a) => {
      const text = `${a.title || ""} ${a.tickerTag || ""}`.toLowerCase();
      // Veraltete Vorwahl- und Wahltags-Schnipsel ausschließen
      if (
        text.includes("schlange am wahllokal") ||
        text.includes("bis 18 uhr") ||
        text.includes("wahlhelfende gesucht") ||
        text.includes("antragsfrist endet") ||
        text.includes("wahlarena") ||
        text.includes("berlintrend vor der wahl") ||
        text.includes("so läuft der berliner wahlabend") ||
        text.includes("polizei zieht positive zwischenbilanz") ||
        text.includes("spitzenkandidaten haben gewählt")
      ) {
        return false;
      }
      return true;
    });
    return [...topUpdateItems, ...valid];
  }, [items, topUpdateItems]);

  return (
    <div
      className="flex items-stretch shadow-xs"
      style={{ backgroundColor: T.ink, borderBottom: `1px solid ${T.line}` }}
      role="region"
      aria-label="News-Ticker: aktuelle Meldungen zu Steuern, FinTech und Tech-Ökosystem"
      dir="ltr"
    >
      {/* Festes Label links — HERO Tax Radar */}
      <div
        className="flex items-center gap-2 px-3 sm:px-4.5 py-2.5 shrink-0 z-10 select-none shadow-md"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
          borderRight: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <Radio size={15} className="text-amber-300 shrink-0 animate-pulse" />
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span
            className="ticker-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-amber-400"
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300" />
        </span>
        <span className="text-xs font-bold tracking-widest uppercase font-mono text-white flex items-center gap-1.5">
          {t("ticker.label")}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/35 tracking-wider">
          TAX &amp; TECH ⚡
        </span>
      </div>

      {/* Laufband */}
      <div className="ticker-viewport overflow-hidden flex-1 min-w-0">
        <div className="ticker-track flex items-center whitespace-nowrap py-2.5">
          {/* Inhalt doppelt rendern → nahtlose Schleife bei -50 % */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {tickerItems.map((a) => {
                const isElection =
                  a.isElection ||
                  a.tickerTag ||
                  /wahl|stimmzettel|agh|bvv|berlintrend|krach|rotes rathaus/i.test(a.title);

                return (
                  <a
                    key={`${copy}-${a.title}`}
                    href={typeof a.source === "object" ? a.source?.href : a.source || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={copy === 1 ? -1 : 0}
                    className="inline-flex items-center gap-2.5 px-6 text-sm transition-opacity hover:opacity-75 focus:outline-none focus-visible:underline"
                    style={{ color: T.inkText }}
                  >
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded"
                      style={{
                        ...fontMono,
                        backgroundColor: isElection
                          ? "rgba(245, 158, 11, 0.18)"
                          : a.cat === "Berlin Fokus"
                          ? "rgba(143,160,255,0.18)"
                          : "rgba(255,255,255,0.1)",
                        color: isElection
                          ? "#fbbf24"
                          : a.cat === "Berlin Fokus"
                          ? T.inkAccent
                          : T.inkText,
                        border: isElection
                          ? "1px solid rgba(245, 158, 11, 0.35)"
                          : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {a.tickerTag || (isElection ? "BERLIN-WAHL" : a.cat)}
                    </span>
                    <span className="font-semibold">{a.title}</span>
                    <span className="text-xs shrink-0" style={{ ...fontMono, color: T.inkMuted }}>
                      {a.date}
                    </span>
                    <span aria-hidden="true" style={{ color: isElection ? "#f59e0b" : T.inkAccent }}>
                      +++
                    </span>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
