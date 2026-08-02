/* ── Article-Service: Automatisches Laden & Caching ───────────────
   Holt aktuelle Meldungen über /api/feed.php (serverseitiger RSS-
   Proxy, siehe public/api/feed.php) und cached sie im localStorage.
   Schlägt der Live-Abruf fehl (z.B. lokale Entwicklung ohne PHP,
   Netzwerkfehler, Feed down), fällt jeder Typ auf die kuratierten
   statischen Daten aus data/articles.js zurück — die Seite bleibt
   in jedem Fall funktionsfähig. ─────────────────────────────────── */

import { BMDS_ITEMS, BSI_ITEMS, ARTICLES } from "../data/articles";

const CACHE_PREFIX = "herotax_feed_";
const CACHE_DURATION = 30 * 60 * 1000; // 30 Minuten — spiegelt den PHP-Cache

/** type → welcher Feed-Proxy-Quellname abgefragt wird (siehe SOURCES in feed.php) */
const FEED_SOURCE = {
  general: "bmf-steuern",
  bmds: "bmds",
  bsi: "bsi",
};

const STATIC_DATA = {
  general: ARTICLES,
  bmds: BMDS_ITEMS,
  bsi: BSI_ITEMS,
};

const cacheKey = (type) => `${CACHE_PREFIX}${type}`;
const cacheTimestampKey = (type) => `${CACHE_PREFIX}${type}_ts`;

const loadCache = (type) => {
  try {
    const raw = localStorage.getItem(cacheKey(type));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveCache = (type, data) => {
  try {
    localStorage.setItem(cacheKey(type), JSON.stringify(data));
    localStorage.setItem(cacheTimestampKey(type), Date.now().toString());
  } catch {
    /* z.B. Privater Modus / Speicher voll — Cache ist nur ein Optimierung */
  }
};

const isCacheStale = (type) => {
  try {
    const ts = localStorage.getItem(cacheTimestampKey(type));
    if (!ts) return true;
    return Date.now() - parseInt(ts, 10) > CACHE_DURATION;
  } catch {
    return true;
  }
};

/** Ruft den serverseitigen Feed-Proxy ab. Gibt null zurück, wenn nicht verfügbar
    (kein Fehler-Throw — der Aufrufer entscheidet über den Fallback). */
const fetchLiveItems = async (type) => {
  const source = FEED_SOURCE[type];
  if (!source) return null;

  try {
    const res = await fetch(`/api/feed.php?source=${source}`, {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data.items) && data.items.length > 0 ? data.items : null;
  } catch {
    return null;
  }
};

/** Bettet Live-Meldungen des BMF-Feeds ("Bund & Steuer") in die
    kuratierten "Berlin Fokus"-Artikel ein, statt sie zu ersetzen. */
const mergeGeneral = (liveItems) => {
  const berlinFokus = ARTICLES.filter((a) => a.cat === "Berlin Fokus");
  const bundSteuer = liveItems.map((item) => ({
    cat: "Bund & Steuer",
    title: item.title,
    excerpt: item.excerpt,
    read: "4 Min",
    date: item.date,
    source: item.source,
  }));
  return [...berlinFokus, ...bundSteuer];
};

/**
 * Artikel laden — nutzt Cache wenn frisch, holt sonst live nach.
 * type: "general" (News-Hub/Ticker) | "bmds" | "bsi"
 */
export const getArticles = async (type = "general") => {
  const cached = loadCache(type);
  if (cached && !isCacheStale(type)) {
    return cached;
  }

  const live = await fetchLiveItems(type);
  if (live) {
    const result = type === "general" ? mergeGeneral(live) : live;
    saveCache(type, result);
    return result;
  }

  return cached || STATIC_DATA[type] || [];
};

/** Cache leeren (z.B. für einen manuellen "Neu laden"-Button) */
export const clearCache = () => {
  try {
    Object.keys(FEED_SOURCE).forEach((type) => {
      localStorage.removeItem(cacheKey(type));
      localStorage.removeItem(cacheTimestampKey(type));
    });
  } catch {
    /* noop */
  }
};
