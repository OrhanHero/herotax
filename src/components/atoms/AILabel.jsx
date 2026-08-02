/* EU AI Act Labeling (Digital Strategy) — Offizielles Icon */
import { useLang } from "../../i18n";
import { T } from "../../config/tokens";
import aiGeneratedIcon from "../../assets/eu-ai-icons/ai-generated-black.png";

export default function AILabel() {
  const { t, isRTL } = useLang();

  return (
    <div
      className="flex flex-col items-center gap-3 p-6 rounded-2xl"
      style={{ backgroundColor: "rgba(79, 82, 85, 0.05)" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Offizielles EU AI-Generated Icon */}
      <img
        src={aiGeneratedIcon}
        alt="AI Generated Label"
        style={{ height: "48px", width: "auto" }}
      />

      {/* Text mit Link zur EU Digital Strategy */}
      <p style={{ color: T.muted, fontSize: "0.75rem" }}>
        <a
          href="https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-70"
          style={{ color: T.blue }}
        >
          {t("ai_label.link")} →
        </a>
      </p>
    </div>
  );
}
