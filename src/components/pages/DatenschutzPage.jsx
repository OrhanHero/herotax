import { useEffect } from "react";
import { fontMono } from "../../config/tokens";
import PrivacySection from "../sections/PrivacySection";

/* ── DSGVO & Datenschutz Hub ─────────────────────────────────────────
   Kompakter, interaktiver DSGVO & Datenschutz Hub von HERO Tax.
   ────────────────────────────────────────────────────────────────── */

export default function DatenschutzPage() {
  useEffect(() => {
    document.title = "DSGVO Hub · HERO Tax";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <a
        href="/"
        className="inline-flex items-center gap-1.5 text-xs mb-8 hover:underline underline-offset-4"
        style={{ ...fontMono, color: "#94A3B8" }}
      >
        ← Zurück zur Startseite
      </a>

      {/* Interaktiver DSGVO & Datenschutz Block mit allen Karten */}
      <PrivacySection />
    </div>
  );
}
