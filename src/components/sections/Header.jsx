import { useLang } from "../../i18n";
import { CONFIG } from "../../config/config";
import { T, fontDisplay } from "../../config/tokens";
import WhatsAppGlyph from "../atoms/WhatsAppGlyph";
import LanguageSwitcher from "../atoms/LanguageSwitcher";

/** Sticky Navbar mit Logo, Hauptnavigation, Sprachwahl und CTA */
const Header = () => {
  const { t } = useLang();
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl transition-all duration-300"
      style={{ backgroundColor: "rgba(250,250,248,0.92)", borderBottom: `1px solid ${T.line}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a href="#" className="font-black text-xl tracking-tight flex items-center gap-1.5" style={{ ...fontDisplay, color: T.text }}>
            <span>HERO</span> <span style={{ color: T.blue }}>Tax</span> 🛡️
          </a>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            SSL & HSTS Verified
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Hauptnavigation">
          <a href="#ki" className="hover:text-blue-600 transition-colors" style={{ color: T.muted }}>{t("nav.ki")}</a>
          <a href="#news" className="hover:text-blue-600 transition-colors" style={{ color: T.muted }}>{t("nav.news")}</a>
          <a href="#eudi-wallet" className="hover:text-blue-600 transition-colors" style={{ color: T.muted }}>{t("nav.eudiWallet")}</a>
          <a href="#tools" className="hover:text-blue-600 transition-colors" style={{ color: T.muted }}>{t("nav.tools")}</a>
          <a href="#live" className="hover:text-blue-600 transition-colors" style={{ color: T.muted }}>{t("nav.live")}</a>
          <a href="#datenschutz" className="hover:text-blue-600 transition-colors" style={{ color: T.muted }}>{t("nav.privacy")}</a>
          <a href="#publikationen" className="hover:text-blue-600 transition-colors" style={{ color: T.muted }}>{t("nav.publications")}</a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2"
            style={{ ...fontDisplay, backgroundColor: T.blue, color: T.blueInk }}
          >
            <WhatsAppGlyph size={15} />
            <span className="hidden sm:inline">{t("cta.joinShort")}</span>
            <span className="sm:hidden">{t("cta.joinShort")}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
