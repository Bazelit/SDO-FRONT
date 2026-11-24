import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "site-theme";
const LEGACY_STORAGE_KEY = "teacher-theme";

function readTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const preference = saved === null ? localStorage.getItem(LEGACY_STORAGE_KEY) : saved;
    return preference === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.removeProperty("color-scheme");
    document.documentElement.style.removeProperty("background-color");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "dark" ? "#0d1321" : "#c8d5f6";
  }, [theme]);

  useEffect(() => {
    const syncTheme = (event) => {
      if (event.key === STORAGE_KEY || event.key === LEGACY_STORAGE_KEY || event.key === null) {
        setTheme(readTheme());
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  const toggleTheme = () => setTheme(current => current === "dark" ? "light" : "dark");

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* Keep switching if storage is unavailable. */ }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
