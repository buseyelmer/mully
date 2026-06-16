"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LayoutGroup, motion } from "framer-motion";
import {
  THEME_STORAGE_KEY,
  isThemeId,
  themes,
  type ThemeId,
  type ThemeConfig,
} from "./themes";

type ThemeContextValue = {
  themeId: ThemeId;
  theme: ThemeConfig;
  setThemeId: (id: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeVars(theme: ThemeConfig) {
  const root = document.documentElement;
  root.setAttribute("data-mully-theme", theme.id);
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>("neseli");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const legacyMap: Record<string, ThemeId> = { sakin: "gece", odaklanmis: "odak" };
    const resolved =
      stored && isThemeId(stored)
        ? stored
        : stored && legacyMap[stored]
          ? legacyMap[stored]
          : null;
    if (resolved) {
      setThemeIdState(resolved);
      applyThemeVars(themes[resolved]);
      return;
    }
    applyThemeVars(themes.neseli);
  }, []);

  const setThemeId = useCallback((id: ThemeId) => {
    document.documentElement.classList.add("mully-theme-transition");
    setThemeIdState(id);
    applyThemeVars(themes[id]);
    localStorage.setItem(THEME_STORAGE_KEY, id);
    window.setTimeout(() => {
      document.documentElement.classList.remove("mully-theme-transition");
    }, 650);
  }, []);

  const theme = themes[themeId];

  const value = useMemo(
    () => ({ themeId, theme, setThemeId }),
    [themeId, theme, setThemeId],
  );

  return (
    <ThemeContext.Provider value={value}>
      <LayoutGroup>
        <motion.div
          layout
          className="min-h-full mully-bg-primary text-[var(--mully-text)]"
          animate={{
            background: `linear-gradient(180deg, ${theme.vars["--mully-bg-1"]} 0%, ${theme.vars["--mully-bg-2"]} 50%, ${theme.vars["--mully-bg-3"]} 100%)`,
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </LayoutGroup>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
