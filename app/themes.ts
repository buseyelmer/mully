export type ThemeId = "neseli" | "gece" | "odak";

export type ThemeConfig = {
  id: ThemeId;
  label: string;
  description: string;
  preview: string;
  vars: Record<string, string>;
};

export const THEME_STORAGE_KEY = "mully-theme";

export const themes: Record<ThemeId, ThemeConfig> = {
  neseli: {
    id: "neseli",
    label: "Neşeli",
    description: "Match — pembe & turuncu",
    preview: "linear-gradient(135deg,#f43f5e,#fb923c)",
    vars: {
      "--mully-bg-1": "#0a0a0a",
      "--mully-bg-2": "#111111",
      "--mully-bg-3": "#1a1a1a",
      "--mully-surface": "rgba(255,255,255,0.06)",
      "--mully-surface-alt": "rgba(255,255,255,0.1)",
      "--mully-text": "#fafafa",
      "--mully-text-muted": "#a3a3a3",
      "--mully-accent": "#f43f5e",
      "--mully-accent-fg": "#ffffff",
      "--mully-accent-gradient-from": "#f43f5e",
      "--mully-accent-gradient-to": "#fb923c",
      "--mully-accent-soft": "rgba(244,63,94,0.2)",
      "--mully-ring": "rgba(255,255,255,0.12)",
      "--mully-hero-from": "#171717",
      "--mully-hero-to": "#0a0a0a",
      "--mully-header-bg": "rgba(10,10,10,0.96)",
    },
  },
  gece: {
    id: "gece",
    label: "Gece",
    description: "Koyu taş & rose vurgu",
    preview: "linear-gradient(135deg,#44403c,#292524)",
    vars: {
      "--mully-bg-1": "#0c0a09",
      "--mully-bg-2": "#1c1917",
      "--mully-bg-3": "#292524",
      "--mully-surface": "rgba(255,255,255,0.05)",
      "--mully-surface-alt": "rgba(255,255,255,0.08)",
      "--mully-text": "#fafaf9",
      "--mully-text-muted": "#a8a29e",
      "--mully-accent": "#e11d48",
      "--mully-accent-fg": "#ffffff",
      "--mully-accent-gradient-from": "#be123c",
      "--mully-accent-gradient-to": "#f97316",
      "--mully-accent-soft": "rgba(225,29,72,0.18)",
      "--mully-ring": "rgba(255,255,255,0.1)",
      "--mully-hero-from": "#1c1917",
      "--mully-hero-to": "#0c0a09",
      "--mully-header-bg": "rgba(12,10,9,0.94)",
    },
  },
  odak: {
    id: "odak",
    label: "Odak",
    description: "Lacivert & mor geçiş",
    preview: "linear-gradient(135deg,#6366f1,#a855f7)",
    vars: {
      "--mully-bg-1": "#030712",
      "--mully-bg-2": "#0f172a",
      "--mully-bg-3": "#1e293b",
      "--mully-surface": "rgba(255,255,255,0.05)",
      "--mully-surface-alt": "rgba(255,255,255,0.09)",
      "--mully-text": "#f8fafc",
      "--mully-text-muted": "#94a3b8",
      "--mully-accent": "#818cf8",
      "--mully-accent-fg": "#ffffff",
      "--mully-accent-gradient-from": "#6366f1",
      "--mully-accent-gradient-to": "#a855f7",
      "--mully-accent-soft": "rgba(99,102,241,0.2)",
      "--mully-ring": "rgba(255,255,255,0.1)",
      "--mully-hero-from": "#0f172a",
      "--mully-hero-to": "#030712",
      "--mully-header-bg": "rgba(3,7,18,0.94)",
    },
  },
};

export const themeList = Object.values(themes);

export function isThemeId(value: string): value is ThemeId {
  return value in themes;
}
