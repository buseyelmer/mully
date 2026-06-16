"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Layers,
  MapPin,
  Menu,
  Shield,
  Smile,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBuyModal } from "./BuyModalProvider";
import ThemeSelector from "./ThemeSelector";

const HERO_IMAGE = "/images/mully-anasayfa.jpeg";

type MenuId = "world" | "features";

type MenuLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

const worldLinks: MenuLink[] = [
  {
    label: "Ev Hikayesi",
    href: "#hikaye",
    icon: BookOpen,
    description: "Mully evinde dolaşıyor",
  },
  {
    label: "Mully'nin Günlüğü",
    href: "#gunluk",
    icon: Heart,
    description: "Evden neşeli anlar",
  },
  {
    label: "Mully Haritası",
    href: "#harita",
    icon: MapPin,
    description: "Türkiye genelinde gülümseme",
  },
];

const featureLinks: MenuLink[] = [
  {
    label: "Mully'nin Dokusu",
    href: "#doku",
    icon: Layers,
    description: "Bouclé kumaş hissi",
  },
  {
    label: "Mully'nin Sırrı",
    href: "#sirlar",
    icon: Sparkles,
    description: "Görünmez özellikler",
  },
  {
    label: "Uyum Testi",
    href: "#uyum",
    icon: Smile,
    description: "Mully ile eşleşmeni keşfet",
  },
  {
    label: "Güvenin Neşeli Hali",
    href: "#guven",
    icon: Shield,
    description: "Kargo ve iade garantisi",
  },
];

const menuConfig: Record<
  MenuId,
  { title: string; subtitle: string; links: MenuLink[]; visualTitle: string; visualCta: string }
> = {
  world: {
    title: "Mully Dünyası",
    subtitle: "Ev arkadaşının hikayesi",
    links: worldLinks,
    visualTitle: "It's a Match!",
    visualCta: "Hikayeyi keşfet",
  },
  features: {
    title: "Özellikler",
    subtitle: "Dokusu, sırrı ve karakteri",
    links: featureLinks,
    visualTitle: "Gülümseme garantili",
    visualCta: "Mully'yi keşfet",
  },
};

function MegaMenuVisual({
  title,
  cta,
}: {
  title: string;
  cta: string;
}) {
  return (
    <div className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-gray-950 to-black p-6 sm:min-h-[300px] sm:p-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
        {[
          { top: "12%", left: "15%", color: "#f43f5e", size: 5 },
          { top: "22%", left: "78%", color: "#a855f7", size: 4 },
          { top: "55%", left: "10%", color: "#3b82f6", size: 4 },
          { top: "70%", left: "85%", color: "#f97316", size: 5 },
        ].map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              backgroundColor: d.color,
            }}
          />
        ))}
      </div>

      <p className="mully-font-display relative z-10 text-2xl text-white sm:text-3xl">
        {title}
      </p>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-4">
        <div className="relative h-32 w-32 sm:h-36 sm:w-36">
          <div className="absolute inset-0 overflow-hidden rounded-full ring-4 ring-white/20">
            <Image
              src={HERO_IMAGE}
              alt="Mully puf"
              fill
              sizes="144px"
              className="object-cover object-[center_32%]"
            />
          </div>
          <div className="absolute -bottom-1 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg ring-4 ring-gray-950">
            <Heart className="h-4 w-4 fill-white text-white" />
          </div>
        </div>
        <p className="mt-5 text-center text-sm font-medium text-stone-300">{cta}</p>
      </div>

      <Link
        href="#hikaye"
        className="relative z-10 inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/15 transition hover:bg-white/15"
      >
        Keşfet
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function MegaMenuPanel({ menuId }: { menuId: MenuId }) {
  const config = menuConfig[menuId];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden border-t border-white/10"
    >
      <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.1fr_1fr] md:gap-8 md:px-8 md:py-8 lg:grid-cols-[1.15fr_1fr]">
        <MegaMenuVisual title={config.visualTitle} cta={config.visualCta} />

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--mully-text-muted)]">
            {config.subtitle}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{config.title}</h3>

          <ul className="mt-5 space-y-1">
            {config.links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className="group flex items-start gap-3 rounded-2xl px-3 py-3 transition hover:bg-white/5"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--mully-text)]">
                    <link.icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block text-sm font-medium group-hover:text-white">
                      {link.label}
                    </span>
                    <span className="block text-xs text-[var(--mully-text-muted)]">{link.description}</span>
                  </span>
                  <ArrowRight className="ml-auto mt-2 h-4 w-4 shrink-0 text-[var(--mully-text-muted)] opacity-0 transition group-hover:opacity-100" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function MobileNavPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const sections: { title: string; links: MenuLink[] }[] = [
    { title: "Mully Dünyası", links: worldLinks },
    { title: "Özellikler", links: featureLinks },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Menüyü kapat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[58] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[59] border-t border-white/10 md:hidden"
          >
            <div className="max-h-[min(70vh,520px)] overflow-y-auto px-4 py-4">
              {sections.map(({ title, links }) => (
                <div key={title} className="mb-5 last:mb-2">
                  <p className="px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--mully-text-muted)]">
                    {title}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-2xl px-3 py-3 transition active:bg-white/10"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                            <link.icon className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium">{link.label}</span>
                            <span className="block text-xs text-[var(--mully-text-muted)]">
                              {link.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href="#uyum"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium transition active:bg-white/10"
              >
                <Smile className="h-4 w-4 text-[var(--mully-accent)]" />
                Eşleşme Testi
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function SiteHeader() {
  const { openPreparing } = useBuyModal();
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const navItems: { id: MenuId; label: string }[] = [
    { id: "world", label: "Mully Dünyası" },
    { id: "features", label: "Özellikler" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pt-4">
      <motion.div
        layout
        className="mx-auto max-w-6xl overflow-visible rounded-b-[28px] mully-header-blur shadow-[0_10px_40px_rgba(0,0,0,0.55)] ring-1 ring-white/15 backdrop-blur-xl sm:rounded-b-[40px]"
        onMouseLeave={scheduleClose}
        onMouseEnter={cancelClose}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-7 sm:py-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition active:bg-white/15 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link
              href="/"
              className="truncate text-lg font-semibold tracking-tight sm:text-xl"
              onClick={() => setMobileOpen(false)}
            >
              Mully
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex lg:gap-2">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onMouseEnter={() => openMenu(id)}
                onFocus={() => openMenu(id)}
                className={`relative px-3 py-2 text-sm font-medium tracking-tight transition lg:px-4 ${
                  activeMenu === id
                    ? "text-white"
                    : "text-[var(--mully-text-muted)] hover:text-white"
                }`}
              >
                {label}
                {activeMenu === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-px mully-accent-gradient lg:left-4 lg:right-4"
                  />
                )}
              </button>
            ))}
            <Link
              href="#uyum"
              className="px-3 py-2 text-sm font-medium tracking-tight text-[var(--mully-text-muted)] transition hover:text-white lg:px-4"
            >
              Eşleşme
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <ThemeSelector className="relative z-[61]" />
            <button
              type="button"
              onClick={openPreparing}
              className="rounded-full mully-accent-btn px-3.5 py-2 text-sm font-medium sm:px-5"
            >
              Satın Al
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-b-[28px] sm:rounded-b-[40px]">
          <MobileNavPanel open={mobileOpen} onClose={() => setMobileOpen(false)} />
          <AnimatePresence mode="wait">
            {activeMenu && <MegaMenuPanel key={activeMenu} menuId={activeMenu} />}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}
