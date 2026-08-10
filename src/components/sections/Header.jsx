import { useLang } from "../../i18n";
import { CONFIG } from "../../config/config";
import { T, fontDisplay, fontMono } from "../../config/tokens";
import WhatsAppGlyph from "../atoms/WhatsAppGlyph";
import LanguageSwitcher from "../atoms/LanguageSwitcher";
import { FernsehturmIcon } from "../atoms/FernsehturmBadge";

/** Sticky Navbar mit Logo, Hauptnavigation, Sprachwahl und CTA */
const Header = () => {
  const { t } = useLang();
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 border-b"
      style={{ backgroundColor: "rgba(248,248,244,0.94)", borderColor: T.line }}
    >
      {/* Technischer Blueprint Top-Bar */}
      <div className="hidden sm:block text-[10px] uppercase tracking-widest px-4 py-0.5 border-b" style={{ ...fontMono, backgroundColor: T.wash, borderColor: T.lineSoft, color: T.faint }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>BERLIN METROPOL REGION · 52.5200° N, 13.4050° E</span>
          <span>SYSTEM-STATUS: BEHÖRDEN-FEED ONLINE · 100% DSGVO</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a href="#" className="font-black text-xl tracking-tight flex items-center gap-2" style={{ ...fontDisplay, color: T.text }}>
            <FernsehturmIcon size={22} color={T.blue} />
            <span>HERO</span> <span style={{ color: T.blue }}>Tax</span>
          </a>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider" style={{ ...fontMono, backgroundColor: T.blueDim, color: T.blue, border: `1px solid ${T.blueBorder}` }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            AMTS-BLUEPRINT 2026
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold" aria-label="Hauptnavigation">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2"
            style={{ ...fontDisplay, backgroundColor: T.blue, color: T.blueInk }}
          >
            <WhatsAppGlyph size={15} />
            <span>{t("cta.joinShort")}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
