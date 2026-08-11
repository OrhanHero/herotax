import { useState, useMemo, useEffect } from "react";
import { LangContext, LANGUAGES, I18N, readStoredLang, storeLang } from "./i18n";
import { ARTICLES } from "./data/articles";
import { getArticles } from "./services/articleService";
import NewsTicker from "./components/atoms/NewsTicker";
import BackToTop from "./components/atoms/BackToTop";
import AmbientMoonlightGlow from "./components/atoms/AmbientMoonlightGlow";
import Header from "./components/sections/Header";
import HeroSection from "./components/sections/HeroSection";
import StartseiteFeatureHub from "./components/sections/StartseiteFeatureHub";
import Footer from "./components/sections/Footer";
import KIPage from "./components/pages/KIPage";
import NewsHubPage from "./components/pages/NewsHubPage";
import EUDIWalletPage from "./components/pages/EUDIWalletPage";
import ToolsPage from "./components/pages/ToolsPage";
import LivePage from "./components/pages/LivePage";
import PublikationenPage from "./components/pages/PublikationenPage";
import DatenschutzPage from "./components/pages/DatenschutzPage";
import ImpressumPage from "./components/pages/ImpressumPage";
import NotFoundPage from "./components/pages/NotFoundPage";

export default function HeroTaxPlatform() {
  /* ── Sprach-State (global) ── */
  const [lang, setLang] = useState(readStoredLang);
  const [articles, setArticles] = useState(ARTICLES);
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname.toLowerCase().replace(/\/$/, "") || "/" : "/"
  );
  const activeLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  /* SPA Routing Event Listener */
  useEffect(() => {
    const handlePopState = () => {
      const current = typeof window !== "undefined" ? window.location.pathname.toLowerCase().replace(/\/$/, "") || "/" : "/";
      setPathname(current);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = activeLang.dir;
    } catch {
      /* SSR / eingeschränkte Umgebungen */
    }
  }, [lang, activeLang.dir]);

  const isLegalPage = pathname === "/datenschutz" || pathname === "/impressum";

  const renderContent = () => {
    switch (pathname) {
      case "/":
        return (
          <>
            <HeroSection />
            <StartseiteFeatureHub />
          </>
        );
      case "/ki":
        return <KIPage />;
      case "/news":
        return <NewsHubPage />;
      case "/eudi-wallet":
        return <EUDIWalletPage />;
      case "/tools":
        return <ToolsPage />;
      case "/live":
        return <LivePage />;
      case "/publikationen":
        return <PublikationenPage />;
      case "/datenschutz":
        return <DatenschutzPage />;
      case "/impressum":
        return <ImpressumPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL: activeLang.dir === "rtl" }}>
      <div className="min-h-screen antialiased overflow-x-hidden w-full max-w-full relative" dir={activeLang.dir} style={{ backgroundColor: "#FAFAF8", color: "#141417" }}>
        <AmbientMoonlightGlow />
        <Header />
        {!isLegalPage && <NewsTicker items={articles} />}

        <main>{renderContent()}</main>

        <Footer />
        <BackToTop />
      </div>
    </LangContext.Provider>
  );
}

