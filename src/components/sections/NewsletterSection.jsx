import { useState } from "react";
import { Check } from "lucide-react";
import { useLang } from "../../i18n";
import { T, fontDisplay } from "../../config/tokens";
import Eyebrow from "../atoms/Eyebrow";

/** Newsletter (Beehiiv/Substack-ready) */
const NewsletterSection = () => {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  /** Newsletter-Anmeldung.
      → Beehiiv/Substack: fetch()-Block aktivieren & CONFIG befüllen. */
  const handleSubscribe = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError(t("nl.err"));
      return;
    }
    setEmailError("");

    /* — Beehiiv-API (aktivieren, sobald Endpoint vorhanden;
         API-Key gehört serverseitig hinter einen eigenen Proxy,
         NIE in den Client-Code) —
    try {
      await fetch(CONFIG.newsletter.beehiivApiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch (err) { console.error("Newsletter-Fehler:", err); }
    */

    setSubscribed(true);
    /* Plausible-Conversion-Event: */
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible("Newsletter Signup");
    }
  };

  return (
    <section id="newsletter" className="py-24" style={{ borderTop: `1px solid ${T.lineSoft}` }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Eyebrow index="06">{t("nl.eyebrow")}</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-5" style={{ ...fontDisplay, color: T.text }}>
          {t("nl.title")}
        </h2>
        <p className="text-lg leading-relaxed mb-10" style={{ color: T.muted }}>
          {t("nl.sub")}
        </p>

        {/* Alternative: Beehiiv-Embed statt eigenem Formular —
            CONFIG.newsletter.beehiivEmbedUrl befüllen und dieses
            iframe einkommentieren:
            <iframe src={CONFIG.newsletter.beehiivEmbedUrl}
                    className="w-full h-32 rounded-2xl" title="Newsletter" /> */}

        {subscribed ? (
          <div
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full font-semibold"
            style={{ backgroundColor: T.blueDim, border: `1px solid ${T.blueBorder}`, color: T.blue }}
          >
            <Check size={20} />
            {t("nl.ok")}
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder={t("nl.ph")}
                aria-label="E-Mail"
                className="flex-1 px-6 py-4 rounded-full text-base focus:outline-none focus-visible:ring-2"
                style={{ backgroundColor: T.card, border: `1px solid ${emailError ? T.error : T.line}`, color: T.text, boxShadow: T.shadow }}
              />
              <button
                onClick={handleSubscribe}
                className="px-7 py-4 rounded-full font-bold transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2"
                style={{ ...fontDisplay, backgroundColor: T.blue, color: T.blueInk }}
              >
                {t("nl.btn")}
              </button>
            </div>
            <p className="mt-3 text-sm" style={{ color: emailError ? T.error : T.faint }}>
              {emailError || t("nl.note")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
