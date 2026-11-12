import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext(null);
const STORAGE_KEY = "teacher-theme";
const teacherRoutes = new Set([
  "personalteacher", "disciplines", "laboratory", "laboratoryadd",
  "prepodredlab", "groups", "student", "checklaboratory",
  "checklabteacher", "seeresultstudent",
]);

function readTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function TeacherThemeProvider({ isLoggedIn, children }) {
  const { pathname } = useLocation();
  const [preference, setPreference] = useState(readTheme);
  const role = localStorage.getItem("role") || localStorage.getItem("status");
  const isTeacherPage = isLoggedIn && role === "teacher" &&
    teacherRoutes.has(pathname.split("/")[1].toLowerCase());
  const canToggleTheme = isTeacherPage;
  const theme = canToggleTheme ? preference : "light";

  useLayoutEffect(() => {
    if (theme === "dark") {
      document.documentElement.dataset.teacherTheme = "dark";
    } else {
      delete document.documentElement.dataset.teacherTheme;
    }
    return () => { delete document.documentElement.dataset.teacherTheme; };
  }, [theme]);

  useEffect(() => {
    const syncTheme = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) setPreference(readTheme());
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  const toggleTheme = () => {
    const next = preference === "dark" ? "light" : "dark";
    setPreference(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Works in memory if storage is unavailable. */ }
  };

  return (
    <ThemeContext.Provider value={{ theme, isTeacherPage, canToggleTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTeacherTheme = () => useContext(ThemeContext);
