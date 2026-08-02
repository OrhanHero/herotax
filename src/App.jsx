import { useState, useMemo, useEffect } from "react";
import { LangContext, LANGUAGES, I18N, readStoredLang, storeLang } from "./i18n";
import { ARTICLES } from "./data/articles";
import { getArticles } from "./services/articleService";
import NewsTicker from "./components/atoms/NewsTicker";
import Header from "./components/sections/Header";
import HeroSection from "./components/sections/HeroSection";
import AISection from "./components/sections/AISection";
import NewsHub from "./components/sections/NewsHub";
import ToolsSection from "./components/sections/ToolsSection";
import SocialWall from "./components/sections/SocialWall";
import PrivacySection from "./components/sections/PrivacySection";
import EUDIWalletSection from "./components/sections/EUDIWalletSection";
import Footer from "./components/sections/Footer";
import DatenschutzPage from "./components/pages/DatenschutzPage";

export default function HeroTaxPlatform() {
  /* ── Sprach-State (global) ──
     Initialwert kommt aus localStorage (bzw. In-Memory-Fallback),
     jede Änderung wird sofort persistiert. */
  const [lang, setLang] = useState(readStoredLang);
  const [articles, setArticles] = useState(ARTICLES);
  const activeLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  /* Minimal-Routing ohne Router-Bibliothek: nur die Datenschutzerklärung
     ist eine eigene "Seite" (eigener Pfad, per .htaccess/Vite-SPA-Fallback
     auf index.html gemappt). Alles andere bleibt die klassische One-Pager. */
  const isDatenschutzPage = typeof window !== "undefined" && window.location.pathname.replace(/\/$/, "") === "/datenschutz";

  /** t(key): Übersetzung mit Fallback-Kette gewählte Sprache → Deutsch → Key */
  const t = useMemo(() => {
    const dict = I18N[lang] || {};
    const base = I18N.de;
    return (key) => dict[key] ?? base[key] ?? key;
  }, [lang]);

  // Lade Artikel mit Caching & Update-Logik
  useEffect(() => {
    getArticles("general").then((data) => {
      setArticles(data);
    });
  }, []);

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
        {!isDatenschutzPage && <NewsTicker items={articles} />}

        <main>
          {isDatenschutzPage ? (
            <DatenschutzPage />
          ) : (
            <>
              <HeroSection />
              <AISection />
              <NewsHub />
              <EUDIWalletSection />
              <ToolsSection />
              <SocialWall />
              <PrivacySection />
            </>
          )}
        </main>

        <Footer />
      </div>
    </LangContext.Provider>
  );
}
