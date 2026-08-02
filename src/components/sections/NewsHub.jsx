import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../../i18n";
import { T, fontDisplay, cardBase } from "../../config/tokens";
import { ARTICLES } from "../../data/articles";
import { getArticles } from "../../services/articleService";
import Eyebrow from "../atoms/Eyebrow";
import CategoryTag from "../atoms/CategoryTag";
import Meta from "../atoms/Meta";
import SourceLink from "../atoms/SourceLink";

/** Säule 02 · News-Hub mit Kategorie-Filter */
const NewsHub = () => {
  const { t } = useLang();
  const [filter, setFilter] = useState("Alle");
  const [articles, setArticles] = useState(ARTICLES);

  // Lade Artikel beim Mount (mit Caching & automatischem Update)
  useEffect(() => {
    getArticles("ai").then((data) => {
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
              className="lg:col-span-2 lg:row-span-2 group rounded-3xl p-8 sm:p-12 flex flex-col justify-between min-h-96 transition-all duration-300"
              style={cardBase}
            >
              <div className="flex items-center justify-between gap-4">
                <CategoryTag cat={featured.cat} />
                <ArrowUpRight size={22} style={{ color: T.blue }} />
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mt-16 mb-5" style={{ ...fontDisplay, color: T.text }}>
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
      </div>
    </section>
  );
};

export default NewsHub;
