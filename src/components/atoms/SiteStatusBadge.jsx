import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { T, fontMono } from "../../config/tokens";
import { formatTrackerDate } from "../../services/articleService";

/**
 * SiteStatusBadge — Live-Stand der Webseite selbst.
 *
 * Zeigt, wann der ausgelieferte Stand gebaut wurde: "Live-Stand:
 * 12.08.2026, 08:02 Uhr". Der Zeitpunkt kommt aus __BUILD_TIME__
 * (vite.config.js) und ist damit der echte Build-Zeitpunkt, nicht der
 * Ladezeitpunkt im Browser.
 *
 * Abgrenzung zum LiveTrackerBadge: der zeigt den Stand der Nachrichten-
 * Daten aus dem Cache, dieser den Stand der Seite. In der Hero steht
 * deshalb nur dieses Badge, nicht beide.
 */
const staticBuildTime = typeof __BUILD_TIME__ !== "undefined" ? __BUILD_TIME__ : null;

const SiteStatusBadge = () => {
  const isDev = import.meta.env.DEV;
  const [stand, setStand] = useState(() => {
    const time = isDev ? Date.now() : (staticBuildTime ?? Date.now());
    return formatTrackerDate(time);
  });

  /* Im Dev-Modus alle 30 Sekunden neu formatieren, damit der Live-Stand
     bei laufendem vite dev aktuell bleibt. In Produktion minütlich. */
  useEffect(() => {
    const interval = setInterval(
      () => setStand(formatTrackerDate(isDev ? Date.now() : (staticBuildTime ?? Date.now()))),
      isDev ? 30000 : 60000
    );
    return () => clearInterval(interval);
  }, [isDev]);

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold max-w-full overflow-hidden"
      style={{
        ...fontMono,
        backgroundColor: T.blueDim,
        border: `1px solid ${T.blueBorder}`,
        color: T.blue,
      }}
      title="Die Webseite wird bei jeder Änderung und zusätzlich alle 4 Stunden automatisch neu veröffentlicht."
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: "#10B981" }}
        />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#10B981" }} />
      </span>
      <Globe size={14} className="shrink-0" />
      <span className="truncate">Live-Stand: {stand}</span>
    </span>
  );
};

export default SiteStatusBadge;
