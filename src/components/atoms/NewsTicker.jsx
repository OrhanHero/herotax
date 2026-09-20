import { useMemo } from "react";
import { Vote } from "lucide-react";
import { useLang } from "../../i18n";
import { T, fontMono } from "../../config/tokens";
import { ELECTION_STAGES, BVV_RESULTS } from "../../data/electionResults";

/* Wahl zum Abgeordnetenhaus & BVV von Berlin — 20. September 2026 */
const ELECTION_DAY = new Date(2026, 8, 20);
const getDaysUntilElection = () => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((ELECTION_DAY - startOfToday) / 86_400_000));
};

/**
 * NewsTicker — durchlaufendes Wahlticker-Band mit Live-Meldungen zur Berlin-Wahl 2026.
 * · Priorisiert aktuelle Meldungen zur Wahl, Briefwahl und Parteien
 * · Nahtlose Endlos-Schleife: Inhalt wird dupliziert, Animation läuft -50 %
 * · Pausiert bei Hover/Fokus (Lesbarkeit)
 * · Jeder Eintrag verlinkt auf die Original-Quelle
 */
const NewsTicker = ({ items }) => {
  const { t } = useLang();
  const daysLeft = getDaysUntilElection();
  const currentAgh = ELECTION_STAGES.endergebnis || ELECTION_STAGES.zwischenstand;

  // Extrahiere Prozent & Gebiete dynamisch aus dem amtlichen Stand
  const matchPercent = (currentAgh.tag || currentAgh.statusBadge || "").match(/(\d+[\.,]\d+\s*%)/);
  const currentPercent = matchPercent ? matchPercent[1] : "99,9 %";

  const matchAreas = (currentAgh.tag || currentAgh.statusBadge || "").match(/(\d+[\.,\d]*\s*von\s*\d+[\.,\d]*\s*Gebieten)/i);
  const currentAreasText = matchAreas ? matchAreas[1] : "4.110 von 4.114 Gebieten";

  // Dynamische Live-Ticker-Meldungen direkt aus den amtlichen Wahldaten
  const liveElectionItems = useMemo(() => {
    const agh = ELECTION_STAGES.endergebnis || ELECTION_STAGES.zwischenstand;
    const bvv = BVV_RESULTS;
    const timeStr = agh.time ? agh.time.split("·")[1]?.trim() : "01:11 Uhr";

    // Parteien-Prozente formatieren
    const pStr = (id, fallback) => {
      const p = agh.parties?.find((x) => x.id === id);
      return p ? `${p.percent.toFixed(1).replace(".", ",")}%` : fallback;
    };
    const linkeStr = pStr("linke", "25,7 %");
    const cduStr = pStr("cdu", "18,8 %");
    const afdStr = pStr("afd", "16,3 %");
    const grueneStr = pStr("gruene", "14,3 %");
    const spdStr = pStr("spd", "12,1 %");
    const bswP = agh.parties?.find((x) => x.id === "bsw")?.percent?.toFixed(1).replace(".", ",") || "4,7";

    // Sitze formatieren
    const sStr = (id, fallback) => {
      const p = agh.parties?.find((x) => x.id === id);
      return p?.seats !== undefined ? p.seats : fallback;
    };
    const linkeSeats = sStr("linke", 48);
    const cduSeats = sStr("cdu", 34);
    const afdSeats = sStr("afd", 29);
    const grueneSeats = sStr("gruene", 26);
    const spdSeats = sStr("spd", 22);
    const r2gSeats = linkeSeats + spdSeats + grueneSeats;

    // BVV Parteien formatieren
    const bvvPStr = (id, fallback) => {
      const p = bvv.parties?.find((x) => x.id === id);
      return p ? `${p.percent.toFixed(1).replace(".", ",")}%` : fallback;
    };

    return [
      {
        cat: "Berlin Fokus",
        tickerTag: "🔴 LIVE-STAND AGH",
        isElection: true,
        title: `Amtliches Zwischenergebnis (${timeStr}): ${currentAreasText} (${currentPercent}) ausgezählt — Linke ${linkeStr}, CDU ${cduStr}, AfD ${afdStr}, Grüne ${grueneStr}, SPD ${spdStr}`,
        date: "21.09.2026",
        source: { label: "wahlen-berlin.de", href: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/agh/index.html" },
      },
      {
        cat: "Berlin Fokus",
        tickerTag: "🗳️ SITZVERTEILUNG",
        isElection: true,
        title: `159 Sitze im 20. AGH: Linke ${linkeSeats}, CDU ${cduSeats}, AfD ${afdSeats}, Grüne ${grueneSeats}, SPD ${spdSeats} · BSW scheitert an 5%-Hürde (${bswP} % = 0 Sitze) · Rot-Rot-Grün verfügt über ${r2gSeats} Sitze`,
        date: "21.09.2026",
        source: { label: "tagesschau.de", href: "https://www.tagesschau.de/inland/landtagswahlen/berlin/2026/ergebnisse" },
      },
      {
        cat: "Berlin Fokus",
        tickerTag: "🏙️ BEZIRKE & BVV",
        isElection: true,
        title: `Bezirksverordnetenversammlungen (BVV): ${bvv.countedAreas || "4.110 von 4.114 Gebieten (99,9 %)"} — Linke ${bvvPStr("linke", "24,1 %")}, CDU ${bvvPStr("cdu", "18,2 %")}, Grüne ${bvvPStr("gruene", "17,2 %")}, AfD ${bvvPStr("afd", "15,7 %")}, SPD ${bvvPStr("spd", "12,2 %")}`,
        date: "21.09.2026",
        source: { label: "wahlen-berlin.de", href: "https://www.wahlen-berlin.de/wahlen/BE2026/Afspraes/bvv/index.html" },
      },
    ];
  }, [currentAgh, currentAreasText, currentPercent]);

  // Vollständig auf Berlin-Wahl 2026 ausgerichteter Wahlticker
  const electionItems = (items || []).filter(
    (a) =>
      a.isElection === true ||
      /wahl|stimmzettel|agh|bvv|berlintrend|krach|evers|eralp|brinker|lueders|graf|rotes rathaus|briefwahl|wahlarena|koalition/i.test(
        `${a.title || ""} ${a.tickerTag || ""} ${a.cat || ""}`
      )
  );
  // Live-Meldungen voranstellen
  const tickerItems = [...liveElectionItems, ...electionItems];

  const timeOnly = currentAgh.time ? currentAgh.time.split("·")[1]?.replace("Uhr", "").trim() : "01:11";
  const badgeText = daysLeft > 0 ? `NOCH ${daysLeft} TAGE 🗳️` : `LIVE ${currentPercent} · ${timeOnly} UHR 🗳️`;

  return (
    <div
      className="flex items-stretch shadow-xs"
      style={{ backgroundColor: T.ink, borderBottom: `1px solid ${T.line}` }}
      role="region"
      aria-label="Wahlticker: aktuelle Meldungen zur Berlin-Wahl 2026"
      dir="ltr"
    >
      {/* Festes Label links — Berliner Wahl-Ticker */}
      <div
        className="flex items-center gap-2 px-3 sm:px-4.5 py-2.5 shrink-0 z-10 select-none shadow-md"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
          borderRight: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <Vote size={15} className="text-amber-300 shrink-0" />
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
          {badgeText}
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
                    href={a.source.href}
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
