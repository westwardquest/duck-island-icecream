"use client";

import { useCallback, useState } from "react";
import styles from "@/app/page.module.css";

const STORAGE_KEY = "duck-island-sample-theme";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "dark" || v === "light") {
      return v;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function readInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }
  return readStoredTheme() ?? getPreferredTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      applyTheme(next);
      return next;
    });
  }, []);

  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === "dark"}
      suppressHydrationWarning
    >
      <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>{" "}
      <span className={styles.themeToggleText}>
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
