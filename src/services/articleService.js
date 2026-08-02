/* ── Article-Service: Automatisches Laden & Caching ─────────────── */

import { AI_ARTICLES, BMDS_ITEMS } from "../data/articles";

const CACHE_KEYS = {
  AI_ARTICLES: "herotax_ai_articles",
  BMDS_ITEMS: "herotax_bmds_items",
  CACHE_TIMESTAMP: "herotax_cache_timestamp",
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 Stunde

/** Artikel aus localStorage laden (mit Fallback zu statischen Daten) */
export const loadArticles = (type = "ai") => {
  const key = type === "ai" ? CACHE_KEYS.AI_ARTICLES : CACHE_KEYS.BMDS_ITEMS;
  const staticData = type === "ai" ? AI_ARTICLES : BMDS_ITEMS;

  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn(`Failed to load ${key} from cache:`, e);
  }

  return staticData;
};

/** Artikel in localStorage speichern */
export const saveArticles = (type, articles) => {
  const key = type === "ai" ? CACHE_KEYS.AI_ARTICLES : CACHE_KEYS.BMDS_ITEMS;

  try {
    localStorage.setItem(key, JSON.stringify(articles));
    localStorage.setItem(CACHE_KEYS.CACHE_TIMESTAMP, Date.now().toString());
  } catch (e) {
    console.warn(`Failed to save articles to cache:`, e);
  }
};

/** Cache-Status prüfen (ist Aktualisierung nötig?) */
export const isCacheStale = () => {
  try {
    const timestamp = localStorage.getItem(CACHE_KEYS.CACHE_TIMESTAMP);
    if (!timestamp) return true;

    const age = Date.now() - parseInt(timestamp, 10);
    return age > CACHE_DURATION;
  } catch {
    return true;
  }
};

/** Cache leeren */
export const clearCache = () => {
  try {
    localStorage.removeItem(CACHE_KEYS.AI_ARTICLES);
    localStorage.removeItem(CACHE_KEYS.BMDS_ITEMS);
    localStorage.removeItem(CACHE_KEYS.CACHE_TIMESTAMP);
  } catch (e) {
    console.warn("Failed to clear cache:", e);
  }
};

/**
 * Externe Artikel-Quelle abrufen (Platzhalter für zukünftige API-Integration)
 * Beispiel: NewsAPI, RSS-Feed, Custom-Backend, etc.
 */
export const fetchArticlesFromAPI = async (type = "ai") => {
  // TODO: Hier API-Endpoint eintragen, wenn verfügbar
  // const apiUrl = type === "ai" ? process.env.VITE_API_AI_ARTICLES : process.env.VITE_API_BMDS_ITEMS;
  // if (!apiUrl) return null;
  // const response = await fetch(apiUrl);
  // return response.json();

  return null; // Derzeit deaktiviert, nutze statische Daten
};

/**
 * Artikel mit Caching & Update-Logik laden
 * - Nutzt Cache wenn gültig
 * - Holt neue Daten async wenn Cache alt
 */
export const getArticles = async (type = "ai") => {
  const cached = loadArticles(type);
  const stale = isCacheStale();

  // Cache ist gültig, nutze ihn
  if (!stale) {
    return cached;
  }

  // Cache ist alt, versuche neue Daten zu laden
  try {
    const fresh = await fetchArticlesFromAPI(type);
    if (fresh) {
      saveArticles(type, fresh);
      return fresh;
    }
  } catch (e) {
    console.warn(`Failed to fetch fresh articles (${type}):`, e);
  }

  // Fallback: Cache oder statische Daten
  return cached;
};
