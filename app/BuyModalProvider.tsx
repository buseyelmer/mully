"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

type BuyModalContextValue = {
  openPreparing: () => void;
};

const BuyModalContext = createContext<BuyModalContextValue | null>(null);

export function BuyModalProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const openPreparing = useCallback(() => {
    router.push("/checkout");
  }, [router]);

  const value = useMemo(() => ({ openPreparing }), [openPreparing]);

  return (
    <BuyModalContext.Provider value={value}>{children}</BuyModalContext.Provider>
  );
}

export function useBuyModal() {
  const ctx = useContext(BuyModalContext);
  if (!ctx) {
    throw new Error("useBuyModal must be used within BuyModalProvider");
  }
  return ctx;
}
