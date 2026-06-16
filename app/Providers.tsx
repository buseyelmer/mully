"use client";

import AmbientAtmosphere from "./AmbientAtmosphere";
import { BuyModalProvider } from "./BuyModalProvider";
import SiteHeader from "./SiteHeader";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BuyModalProvider>
      <ThemeProvider>
        <SiteHeader />
        <AmbientAtmosphere />
        {children}
      </ThemeProvider>
    </BuyModalProvider>
  );
}
