import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "../../i18n";
import { CONFIG } from "../../config/config";
import { T, fontDisplay } from "../../config/tokens";
import WhatsAppGlyph from "../atoms/WhatsAppGlyph";
import LanguageSwitcher from "../atoms/LanguageSwitcher";
import ThemeSwitcher from "../atoms/ThemeSwitcher";

/** Sticky Navbar mit Logo, Hauptnavigation, Sprachwahl, CTA und Mobile Side-Navigation */
const Header = () => {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined"
      ? window.location.pathname.toLowerCase().replace(/\/$/, "") || "/"
      : "/"
  );

  useEffect(() => {
    const handle = () => {
      setCurrentPath(
        window.location.pathname.toLowerCase().replace(/\/$/, "") || "/"
      );
      setMenuOpen(false);
    };
    window.addEventListener("popstate", handle);
    return () => window.removeEventListener("popstate", handle);
  }, []);

  // Scroll-Lock & Koordination mit Overlays/BackToTop wenn das mobile Menü offen ist
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-menu-open", "true");
    } else {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-menu-open");
    };
  }, [menuOpen]);

  const navigate = (path, e) => {
    if (e && (e.metaKey || e.ctrlKey)) return;
    if (e) e.preventDefault();
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "/ki",            label: t("nav.ki") },
    { href: "/news",          label: t("nav.news") },
    { href: "/eu-kompass",    label: t("nav.euKompass") },
    { href: "/tools",         label: t("nav.tools") },
    { href: "/live",          label: t("nav.live") },
    { href: "/publikationen", label: t("nav.publications") },
    { href: "/dsgvo",         label: t("nav.privacy") },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 border-b"
        style={{
          backgroundColor: "var(--color-header-bg, rgba(248,248,244,0.94))",
          borderColor: T.line,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => navigate("/", e)}
            className="font-black text-xl tracking-tight flex items-center gap-2.5 shrink-0"
            style={{ ...fontDisplay, color: T.text }}
          >
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center font-black text-white text-base shadow-xs shrink-0 select-none"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)",
                border: `1px solid ${T.line}`,
                letterSpacing: "-0.05em",
                fontFamily: "var(--font-display, sans-serif)",
              }}
              aria-hidden="true"
            >
              H
            </div>
            <span>HERO</span> <span style={{ color: T.blue }}>Tax</span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-semibold"
            aria-label="Hauptnavigation"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => navigate(link.href, e)}
                  className="transition-colors hover:text-blue-600"
                  style={{
                    color: isActive ? T.blue : T.muted,
                    fontWeight: isActive ? 700 : 600,
                    textDecoration: isActive ? "underline" : "none",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <ThemeSwitcher />
            <LanguageSwitcher />
            {/* WhatsApp CTA — auf sehr kleinen Screens ausgeblendet */}
            <a
              href={CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 shrink-0"
              style={{ ...fontDisplay, backgroundColor: T.blue, color: T.blueInk }}
            >
              <WhatsAppGlyph size={15} />
              <span>{t("cta.joinShort")}</span>
            </a>

            {/* Hamburger — nur auf Mobile */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2"
              style={{ color: T.text }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden fixed inset-0 top-16 z-40 backdrop-blur-xl overflow-y-auto"
          style={{ backgroundColor: "var(--color-header-bg, rgba(248,248,244,0.97))" }}
        >
          <nav
            className="max-w-7xl mx-auto px-5 py-6 flex flex-col"
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => navigate(link.href, e)}
                  className="py-4 text-lg font-bold border-b flex items-center justify-between transition-colors"
                  style={{
                    borderColor: T.lineSoft,
                    color: isActive ? T.blue : T.text,
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{ backgroundColor: T.blueDim, color: T.blue }}
                    >
                      Aktiv
                    </span>
                  )}
                </a>
              );
            })}

            {/* CTA im mobilen Menü */}
            <a
              href={CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-all hover:shadow-md active:scale-95"
              style={{ backgroundColor: T.blue, color: T.blueInk, ...fontDisplay }}
            >
              <WhatsAppGlyph size={18} />
              {t("cta.join")}
            </a>

            {/* Rechtliche Links im Footer des Mobile-Menüs */}
            <div className="mt-8 pt-6 flex gap-6 text-xs" style={{ borderTop: `1px solid ${T.lineSoft}` }}>
              <a href="/impressum" onClick={(e) => navigate("/impressum", e)}
                style={{ color: T.muted }} className="hover:underline underline-offset-4">
                Impressum
              </a>
              <a href="/datenschutz" onClick={(e) => navigate("/datenschutz", e)}
                style={{ color: T.muted }} className="hover:underline underline-offset-4">
                Datenschutz
              </a>
              <a href="/dsgvo" onClick={(e) => navigate("/dsgvo", e)}
                style={{ color: T.muted }} className="hover:underline underline-offset-4">
                DSGVO
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
