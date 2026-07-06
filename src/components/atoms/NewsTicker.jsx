import { useLang } from "../../i18n";
import { T, fontMono } from "../../config/tokens";

/**
 * NewsTicker — durchlaufendes Nachrichten-Band (BMF-Stil).
 * · Speist sich automatisch aus ARTICLES (eine Datenquelle, kein Doppelpflegen)
 * · Nahtlose Endlos-Schleife: Inhalt wird dupliziert, Animation läuft -50 %
 * · Pausiert bei Hover/Fokus (Lesbarkeit) und respektiert
 *   prefers-reduced-motion (dann horizontal scrollbar statt animiert)
 * · Jeder Eintrag verlinkt auf die Original-Quelle → neuer Tab
 */
const NewsTicker = ({ items }) => {
  const { t } = useLang();
  return (
    <div
      className="flex items-stretch"
      style={{ backgroundColor: T.text, borderBottom: `1px solid ${T.line}` }}
      role="region"
      aria-label="Newsticker: aktuelle Meldungen"
      dir="ltr"
    >
      {/* Festes Label links — Laufband bleibt technisch LTR, damit die
          Marquee-Animation in allen Sprachen identisch läuft */}
      <div
        className="flex items-center gap-2 px-4 sm:px-5 py-2.5 shrink-0 z-10"
        style={{ backgroundColor: T.blue }}
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span
            className="ticker-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: T.blueInk }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: T.blueInk }} />
        </span>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ ...fontMono, color: T.blueInk }}>
          {t("ticker.label")}
        </span>
      </div>

      {/* Laufband */}
      <div className="ticker-viewport overflow-hidden flex-1">
        <div className="ticker-track flex items-center whitespace-nowrap py-2.5">
          {/* Inhalt doppelt rendern → nahtlose Schleife bei -50 % */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {items.map((a) => (
                <a
                  key={`${copy}-${a.title}`}
                  href={a.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={copy === 1 ? -1 : 0}
                  className="inline-flex items-center gap-2.5 px-6 text-sm transition-opacity hover:opacity-75 focus:outline-none focus-visible:underline"
                  style={{ color: T.paper }}
                >
                  <span
                    className="text-xs uppercase tracking-wider shrink-0"
                    style={{ ...fontMono, color: a.cat === "Berlin Fokus" ? "#8FA0FF" : T.faint }}
                  >
                    {a.cat}
                  </span>
                  <span className="font-semibold">{a.title}</span>
                  <span className="text-xs shrink-0" style={{ ...fontMono, color: T.faint }}>
                    {a.date}
                  </span>
                  <span aria-hidden="true" style={{ color: T.blue }}>+++</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
