export const THEME_STORAGE_KEY = "herotax.theme";
let memoryTheme = null;

export const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    if (memoryTheme) return memoryTheme;
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
};

export const storeTheme = (theme) => {
  memoryTheme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* Safe fallback for private mode or sandboxed environments */
  }
};
