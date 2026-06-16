"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

const MODAL_IMAGE = "/images/mully-anasayfa6.jpeg";

type BuyModalContextValue = {
  openPreparing: () => void;
};

const BuyModalContext = createContext<BuyModalContextValue | null>(null);

function PreparingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Kapat"
              className="absolute right-4 top-4 rounded-full p-2 text-[var(--mully-text-muted)] transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto mb-6 h-36 w-36 overflow-hidden rounded-3xl border border-white/10 shadow-lg ring-2 ring-rose-500/30"
            >
              <Image
                src={MODAL_IMAGE}
                alt="Mully hazırlanıyor"
                fill
                sizes="144px"
                className="object-cover object-[center_30%]"
              />
            </motion.div>
            <p className="mully-font-display text-2xl text-white">Mully hazırlanıyor...</p>
            <p className="mt-3 text-sm text-[var(--mully-text-muted)]">Gülümseyen ev arkadaşınız paketleniyor.</p>
            <div className="mt-6 flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full mully-accent-gradient"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BuyModalProvider({ children }: { children: ReactNode }) {
  const [preparingOpen, setPreparingOpen] = useState(false);

  const openPreparing = useCallback(() => {
    setPreparingOpen(true);
    window.setTimeout(() => setPreparingOpen(false), 3200);
  }, []);

  const value = useMemo(() => ({ openPreparing }), [openPreparing]);

  return (
    <BuyModalContext.Provider value={value}>
      <PreparingModal open={preparingOpen} onClose={() => setPreparingOpen(false)} />
      {children}
    </BuyModalContext.Provider>
  );
}

export function useBuyModal() {
  const ctx = useContext(BuyModalContext);
  if (!ctx) {
    throw new Error("useBuyModal must be used within BuyModalProvider");
  }
  return ctx;
}
