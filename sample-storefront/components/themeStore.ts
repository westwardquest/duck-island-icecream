const STORAGE_KEY = "duck-island-sample-theme";

export type Theme = "light" | "dark";

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

let theme: Theme = "light";
let initScheduled = false;
const listeners = new Set<() => void>();

export function subscribeTheme(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  listeners.add(onStoreChange);
  if (!initScheduled) {
    initScheduled = true;
    queueMicrotask(() => {
      theme = readInitialTheme();
      document.documentElement.setAttribute("data-theme", theme);
      listeners.forEach((l) => l());
    });
  }
  return () => {
    listeners.delete(onStoreChange);
  };
}

export function getThemeSnapshot(): Theme {
  return theme;
}

export function getServerThemeSnapshot(): Theme {
  return "light";
}

export function commitTheme(next: Theme) {
  theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  document.documentElement.setAttribute("data-theme", next);
  listeners.forEach((l) => l());
}
