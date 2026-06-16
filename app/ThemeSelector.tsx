"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { themeList, type ThemeId } from "./themes";

export default function ThemeSelector({ className }: { className?: string }) {
  const { themeId, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const toggleOpen = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 8,
        left: Math.max(12, rect.right - 220),
      });
    }
    setOpen((v) => !v);
  };

  const select = (id: ThemeId) => {
    setThemeId(id);
    setOpen(false);
  };

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          style={{ top: menuPos.top, left: menuPos.left }}
          className="fixed z-[200] w-[min(88vw,240px)] overflow-hidden rounded-2xl border border-white/10 bg-stone-950/98 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
          role="menu"
        >
          <p className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
            Mully&apos;nin ruh hali
          </p>
          {themeList.map((theme) => {
            const active = theme.id === themeId;
            return (
              <motion.button
                key={theme.id}
                layout
                type="button"
                role="menuitem"
                onClick={() => select(theme.id)}
                whileHover={{ x: 2 }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  active ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full ring-1 ring-white/20"
                  style={{ background: theme.preview }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-white">{theme.label}</span>
                  <span className="block text-xs text-stone-400">{theme.description}</span>
                </span>
                {active && <Check className="h-4 w-4 shrink-0 text-rose-400" />}
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div ref={rootRef} className={className ?? "fixed top-5 right-5 z-[48] sm:top-6 sm:right-6"}>
      <motion.button
        ref={buttonRef}
        type="button"
        layout
        aria-label="Tema seç"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          toggleOpen();
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-md backdrop-blur-md transition hover:bg-white/15"
      >
        <Palette className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </motion.button>

      {mounted && createPortal(menu, document.body)}
    </div>
  );
}
