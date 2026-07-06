import { useState, useMemo, useEffect } from "react";
import { LangContext, LANGUAGES, I18N, readStoredLang, storeLang } from "./i18n";
import { ARTICLES } from "./data/articles";
import NewsTicker from "./components/atoms/NewsTicker";
import Header from "./components/sections/Header";
import HeroSection from "./components/sections/HeroSection";
import AISection from "./components/sections/AISection";
import NewsHub from "./components/sections/NewsHub";
import ToolsSection from "./components/sections/ToolsSection";
import SocialWall from "./components/sections/SocialWall";
import PrivacySection from "./components/sections/PrivacySection";
import NewsletterSection from "./components/sections/NewsletterSection";
import Footer from "./components/sections/Footer";

export default function HeroTaxPlatform() {
  /* ── Sprach-State (global) ──
     Initialwert kommt aus localStorage (bzw. In-Memory-Fallback),
     jede Änderung wird sofort persistiert. */
  const [lang, setLang] = useState(readStoredLang);
  const activeLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  /** t(key): Übersetzung mit Fallback-Kette gewählte Sprache → Deutsch → Key */
  const t = useMemo(() => {
    const dict = I18N[lang] || {};
    const base = I18N.de;
    return (key) => dict[key] ?? base[key] ?? key;
  }, [lang]);

  useEffect(() => {
    storeLang(lang);
    /* lang- und dir-Attribut auch am <html>-Element pflegen —
       wichtig für Screenreader, Suchmaschinen und Browser-Übersetzung */
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = activeLang.dir;
    } catch {
      /* SSR / eingeschränkte Umgebungen */
    }
  }, [lang, activeLang.dir]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL: activeLang.dir === "rtl" }}>
      <div className="min-h-screen antialiased" dir={activeLang.dir} style={{ backgroundColor: "#FAFAF8", color: "#141417" }}>
        <Header />
        <NewsTicker items={ARTICLES} />

        <main>
          <HeroSection />
          <AISection />
          <NewsHub />
          <ToolsSection />
          <SocialWall />
          <PrivacySection />
          <NewsletterSection />
        </main>

        <Footer />
      </div>
    </LangContext.Provider>
  );
}
