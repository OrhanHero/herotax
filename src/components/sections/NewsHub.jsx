import { useState, useEffect } from "react";
import { ArrowUpRight, ExternalLink, Sparkles, Home, Newspaper, Trophy, FileText, Scale, ClipboardCheck } from "lucide-react";
import { useLang } from "../../i18n";
import { T, fontDisplay, fontMono, cardBase } from "../../config/tokens";
import { ARTICLES, DEUTSCHLANDGPT_LINKS } from "../../data/articles";
import { getArticles } from "../../services/articleService";
import Eyebrow from "../atoms/Eyebrow";
import CategoryTag from "../atoms/CategoryTag";
import Meta from "../atoms/Meta";
import SourceLink from "../atoms/SourceLink";

const DE_ICONS = {
  home: Home,
  blog: Newspaper,
  "case-studies": Trophy,
  ressourcen: FileText,
  vergleich: Scale,
  "ki-starter-check": ClipboardCheck,
};

/** Säule 02 · News-Hub mit Kategorie-Filter */
const NewsHub = () => {
  const { t } = useLang();
  const [filter, setFilter] = useState("Alle");
  const [articles, setArticles] = useState(ARTICLES);

  // Lade Artikel beim Mount (mit Caching & automatischem Update)
  useEffect(() => {
    getArticles("general").then((data) => {
      setArticles(data);
    });
  }, []);

  /* Interne Filter-Werte bleiben stabil (matchen die cat-Felder);
     nur das Label von "Alle" wird übersetzt. "Berlin Fokus" und
     "Bund & Steuer" sind Marken-Rubriken und bleiben in allen
     Sprachen gleich — wie Eigennamen. */
  const filters = ["Alle", "Berlin Fokus", "Bund & Steuer"];
  const filterLabel = (f) => (f === "Alle" ? t("news.all") : f);
  const visible = articles.filter((a) => filter === "Alle" || a.cat === filter);
  const featured = visible.find((a) => a.featured) || visible[0];
  const rest = visible.filter((a) => a !== featured);

  return (
    <section className="py-24" style={{ borderTop: `1px solid ${T.lineSoft}` }} id="news">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Eyebrow index="02">{t("news.eyebrow")}</Eyebrow>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight max-w-xl" style={{ ...fontDisplay, color: T.text }}>
            {t("news.t1")}
            <br />
            <span style={{ color: T.faint }}>{t("news.t2")}</span>
          </h2>
          <div
            className="inline-flex p-1 rounded-full self-start sm:self-auto"
            style={{ backgroundColor: T.wash, border: `1px solid ${T.line}` }}
            role="tablist"
            aria-label="News-Kategorie wählen"
          >
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2"
                style={{
                  ...fontDisplay,
                  backgroundColor: filter === f ? T.blue : "transparent",
                  color: filter === f ? T.blueInk : T.muted,
                }}
              >
                {filterLabel(f)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {featured && (
            <article
              className="lg:col-span-2 lg:row-span-2 group rounded-3xl p-8 sm:p-12 flex flex-col transition-all duration-300"
              style={cardBase}
            >
              <div className="flex items-center justify-between gap-4">
                <CategoryTag cat={featured.cat} />
                <ArrowUpRight size={22} style={{ color: T.blue }} />
              </div>

              {/* Kernzahl der Meldung als Blickfang — füllt die Fläche zwischen
                  Kopfzeile und Titel mit echtem Inhalt statt Leerraum. */}
              {featured.highlight && (
                <div className="flex-1 flex items-center gap-6 sm:gap-8 py-8">
                  <div className="shrink-0">
                    <div className="text-6xl sm:text-7xl font-black tracking-tight" style={{ ...fontDisplay, color: T.blue }}>
                      {featured.highlight.value}
                    </div>
                    {featured.highlight.compare && (
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm" style={{ color: T.faint }}>
                          statt
                        </span>
                        <span
                          className="text-xl sm:text-2xl font-bold line-through"
                          style={{ ...fontDisplay, color: T.faint, textDecorationColor: T.faint }}
                        >
                          {featured.highlight.compare}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="h-14 w-px shrink-0" style={{ backgroundColor: T.line }} />
                  <p className="text-sm sm:text-base leading-relaxed max-w-xs" style={{ color: T.muted }}>
                    {featured.highlight.label}
                  </p>
                </div>
              )}

              <div className={featured.highlight ? "" : "mt-16"}>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-5" style={{ ...fontDisplay, color: T.text }}>
                  {featured.title}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed mb-6 max-w-2xl" style={{ color: T.muted }}>
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <Meta read={featured.read} date={featured.date} />
                  <SourceLink href={featured.source.href} label={featured.source.label} />
                </div>
              </div>
            </article>
          )}

          {rest.map((a) => (
            <article
              key={a.title}
              className="group rounded-3xl p-7 flex flex-col justify-between gap-10 transition-all duration-300 hover:-translate-y-1"
              style={cardBase}
            >
              <div className="flex items-center justify-between gap-4">
                <CategoryTag cat={a.cat} />
                <ArrowUpRight size={18} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: T.blue }} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight leading-snug mb-3" style={{ ...fontDisplay, color: T.text }}>
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: T.muted }}>
                  {a.excerpt}
                </p>
                <div className="flex flex-col gap-2">
                  <Meta read={a.read} date={a.date} />
                  <SourceLink href={a.source.href} label={a.source.label} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── DE-Ökosystem · DeutschlandGPT ──
            Kuratierte Verlinkung zur DSGVO-konformen KI-Plattform für den
            deutschen Mittelstand — als ergänzende Ressource neben den News. */}
        <div className="mt-16 pt-12" style={{ borderTop: `1px solid ${T.lineSoft}` }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full uppercase tracking-wider mb-4"
                style={{ ...fontMono, color: T.blue, backgroundColor: T.blueDim, border: `1px solid ${T.blueBorder}` }}
              >
                <Sparkles size={11} />
                DE · KI-Ökosystem
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight" style={{ ...fontDisplay, color: T.text }}>
                DeutschlandGPT
              </h3>
              <p className="text-sm mt-2 max-w-md" style={{ color: T.muted }}>
                DSGVO-konforme KI-Plattform für den deutschen Mittelstand — ChatGPT, Claude & Gemini, gehostet in Deutschland.
              </p>
            </div>
            <a
              href="https://www.deutschlandgpt.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2"
              style={{ ...fontDisplay, backgroundColor: T.blue, color: T.blueInk }}
            >
              Zur Plattform
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEUTSCHLANDGPT_LINKS.map((item) => {
              const Icon = DE_ICONS[item.id];
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl p-6 flex flex-col gap-8 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2"
                  style={cardBase}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: T.blueDim, border: `1px solid ${T.blueBorder}` }}
                    >
                      <Icon size={18} style={{ color: T.blue }} />
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ color: T.blue }}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold tracking-tight leading-snug mb-2" style={{ ...fontDisplay, color: T.text }}>
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
                      {item.desc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHub;
