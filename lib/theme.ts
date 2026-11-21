"use client";

import { useMemo, useSyncExternalStore } from "react";

/* ─── Theme state ─────────────────────────────────────────────────────────────
   The active theme lives on <html data-theme="…"> (set before first paint by the
   inline script in app/layout.tsx). localStorage only persists the choice, and
   every access is guarded — storage can be blocked (private mode, strict
   privacy settings) and must never break the page. */

export type ThemeName = "midnight" | "deep-ocean";

const STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "theme-changed";

/** Theme currently applied to the document. */
export function getActiveTheme(): ThemeName {
  return document.documentElement.getAttribute("data-theme") === "deep-ocean"
    ? "deep-ocean"
    : "midnight";
}

/** Apply a theme, persist it when possible, and notify subscribers. */
export function applyTheme(theme: ThemeName): void {
  const root = document.documentElement;
  if (theme === "deep-ocean") {
    root.setAttribute("data-theme", "deep-ocean");
  } else {
    root.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable — the theme still applies for this page view */
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange);
}

/** React hook: the active theme, in sync with the document (SSR-safe). */
export function useTheme(): ThemeName {
  return useSyncExternalStore(subscribe, getActiveTheme, () => "midnight" as ThemeName);
}

/* ─── Theme colours for canvas / WebGL code ─────────────────────────────────── */

export type ThemeColorToken = "bg" | "accent" | "accent-purple" | "glow";

/** Read a theme colour token as [r, g, b] (0–255). */
export function readThemeRgb(token: ThemeColorToken): [number, number, number] {
  if (typeof document !== "undefined") {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(`--c-${token}`);
    const parts = raw.trim().split(/\s+/).map(Number);
    if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) {
      return [parts[0], parts[1], parts[2]];
    }
  }
  return DEFAULT_RGB[token];
}

/** Midnight values, used on the server and if a token cannot be read. */
const DEFAULT_RGB: Record<ThemeColorToken, [number, number, number]> = {
  bg: [13, 17, 23],
  accent: [88, 166, 255],
  "accent-purple": [124, 58, 237],
  glow: [0, 229, 255],
};

export function readThemeHex(token: ThemeColorToken): string {
  const [r, g, b] = readThemeRgb(token);
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

const TOKENS: ThemeColorToken[] = ["bg", "accent", "accent-purple", "glow"];

/** One string describing the current colours — stable between calls, so it is a valid snapshot. */
function readThemeSnapshot(): string {
  return TOKENS.map(readThemeHex).join("|");
}

const SERVER_SNAPSHOT = TOKENS.map((t) => {
  const [r, g, b] = DEFAULT_RGB[t];
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}).join("|");

/** React hook: theme colours as hex strings, refreshed when the theme changes. */
export function useThemeHex(): Record<ThemeColorToken, string> {
  const snapshot = useSyncExternalStore(subscribe, readThemeSnapshot, () => SERVER_SNAPSHOT);
  return useMemo(() => {
    const parts = snapshot.split("|");
    return Object.fromEntries(TOKENS.map((t, i) => [t, parts[i]])) as Record<
      ThemeColorToken,
      string
    >;
  }, [snapshot]);
}
