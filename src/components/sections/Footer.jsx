import { Mail } from "lucide-react";
import { useLang } from "../../i18n";
import { CONFIG } from "../../config/config";
import { T, fontDisplay, fontMono } from "../../config/tokens";
import WhatsAppGlyph from "../atoms/WhatsAppGlyph";
import TikTokGlyph from "../atoms/TikTokGlyph";
import InstagramGlyph from "../atoms/InstagramGlyph";
import YouTubeGlyph from "../atoms/YouTubeGlyph";
import AILabel from "../atoms/AILabel";

/** Footer mit Impressum */
const Footer = () => {
  const { t } = useLang();
  return (
    <footer style={{ backgroundColor: T.card, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <p className="font-bold text-sm" style={{ ...fontDisplay, color: T.text }}>
            HERO <span style={{ color: T.blue }}>Tax</span> 🛡️{" "}
            <span className="font-normal" style={{ color: T.faint }}>{t("footer.made")}</span>
          </p>
          <div className="flex items-center gap-5" aria-label="Social Media">
            <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70" style={{ color: T.muted }}>
              <InstagramGlyph size={18} />
            </a>
            <a href={CONFIG.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:opacity-70" style={{ color: T.muted }}>
              <TikTokGlyph size={17} />
            </a>
            <a href={CONFIG.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-70" style={{ color: T.muted }}>
              <YouTubeGlyph size={18} />
            </a>
            <a href={CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Channel" className="hover:opacity-70" style={{ color: T.muted }}>
              <WhatsAppGlyph size={17} />
            </a>
          </div>
        </div>

        {/* Impressum & Kontakt — fest integriert */}
        <div
          className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ backgroundColor: T.wash, border: `1px solid ${T.lineSoft}` }}
        >
          <p style={{ color: T.muted }}>
            <span className="font-semibold" style={{ color: T.text }}>{t("footer.imprint")}</span>{" "}
            {CONFIG.impressumName}
          </p>
          <a
            href={`mailto:${CONFIG.contactEmail}`}
            className="inline-flex items-center gap-2 transition-colors hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 rounded"
            style={{ color: T.blue }}
          >
            <Mail size={15} />
            {CONFIG.contactEmail}
          </a>
          <nav className="flex gap-6" aria-label="Rechtliches">
            <a href="/datenschutz" className="hover:underline underline-offset-4" style={{ color: T.muted }}>{t("footer.privacy")}</a>
            <a href="#" className="hover:underline underline-offset-4" style={{ color: T.muted }}>{t("footer.contact")}</a>
          </nav>
        </div>

        <p className="text-center text-xs mt-8 uppercase tracking-widest" style={{ ...fontMono, color: T.faint }}>
          {t("footer.legal")}
        </p>

        <div className="mt-8 max-w-2xl mx-auto">
          <AILabel />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
