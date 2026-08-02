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
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{ backgroundColor: "rgba(250,250,248,0.85)", borderBottom: `1px solid ${T.line}` }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#" className="font-black text-lg tracking-tight" style={{ ...fontDisplay, color: T.text }}>
          HERO <span style={{ color: T.blue }}>Tax</span> 🛡️
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Hauptnavigation">
          <a href="#ki" className="hover:underline underline-offset-8" style={{ color: T.muted }}>{t("nav.ki")}</a>
          <a href="#news" className="hover:underline underline-offset-8" style={{ color: T.muted }}>{t("nav.news")}</a>
          <a href="#eudi-wallet" className="hover:underline underline-offset-8" style={{ color: T.muted }}>{t("nav.eudiWallet")}</a>
          <a href="#tools" className="hover:underline underline-offset-8" style={{ color: T.muted }}>{t("nav.tools")}</a>
          <a href="#live" className="hover:underline underline-offset-8" style={{ color: T.muted }}>{t("nav.live")}</a>
          <a href="#datenschutz" className="hover:underline underline-offset-8" style={{ color: T.muted }}>{t("nav.privacy")}</a>
          <a href="#publikationen" className="hover:underline underline-offset-8" style={{ color: T.muted }}>{t("nav.publications")}</a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2"
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
