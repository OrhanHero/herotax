import { useState, useEffect } from "react";
import { ThemeContext } from "./theme-context";
import { readStoredTheme, storeTheme, THEME_STORAGE_KEY } from "./theme-utils";

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readStoredTheme);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  // System preference listener if user hasn't explicitly set preference
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      try {
        if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
          setThemeState(e.matches ? "dark" : "light");
        }
      } catch {
        /* Fallback */
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
