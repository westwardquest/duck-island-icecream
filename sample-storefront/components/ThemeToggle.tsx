"use client";

import { useCallback, useSyncExternalStore } from "react";
import styles from "@/app/page.module.css";
import {
  commitTheme,
  getServerThemeSnapshot,
  getThemeSnapshot,
  subscribeTheme,
} from "./themeStore";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggle = useCallback(() => {
    commitTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

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
