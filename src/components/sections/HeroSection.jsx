import { Sparkles } from "lucide-react";
import { useLang } from "../../i18n";
import { T, fontDisplay, fontMono } from "../../config/tokens";
import PrimaryCTA from "../atoms/PrimaryCTA";

/** Hero: hell, luftig — Berliner Startup-Szene am Morgen */
const HeroSection = () => {
  const { t } = useLang();
  return (
    <section className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 sm:pt-32 pb-24 overflow-hidden">
      {/* dezenter Licht-Verlauf, wie Morgensonne auf Beton */}
      <div
        className="absolute inset-x-0 top-0 h-96 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 60% at 70% 0%, ${T.blueDim} 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      <p className="relative text-xs tracking-widest uppercase mb-8 flex items-center gap-2" style={{ ...fontMono, color: T.muted }}>
        <Sparkles size={13} style={{ color: T.blue }} />
        {t("hero.kicker")}
      </p>
      <h1
        className="relative font-black tracking-tight leading-none mb-8"
        style={{ ...fontDisplay, color: T.text, fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
      >
        {t("hero.title1")}
        <br />
        {t("hero.title2pre")}<span style={{ color: T.blue }}>Berlin</span>{t("hero.title2post")}
      </h1>
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <p className="text-lg sm:text-xl leading-relaxed max-w-xl" style={{ color: T.muted }}>
          {t("hero.sub")}
        </p>
        <div className="shrink-0">
          <PrimaryCTA large />
          <p className="mt-4 text-xs text-center sm:text-start" style={{ ...fontMono, color: T.faint }}>
            {t("cta.note")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
