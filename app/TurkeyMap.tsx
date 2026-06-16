"use client";

import { motion } from "framer-motion";
import { MapPin, Smile } from "lucide-react";
import { useState } from "react";

/** viewBox 0 0 1000 422 — Simplemaps Turkey SVG */
const MAP_CITIES = [
  { name: "İstanbul", x: 23.4, y: 17.5 },
  { name: "Bursa", x: 25.8, y: 26 },
  { name: "İzmir", x: 10.8, y: 45 },
  { name: "Ankara", x: 39.5, y: 37.5 },
  { name: "Antalya", x: 24.2, y: 66 },
  { name: "Gaziantep", x: 64.8, y: 56 },
  { name: "Trabzon", x: 73.8, y: 21 },
] as const;

function CityPin({ name, x, y, delay }: { name: string; x: number; y: number; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 16 }}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeInOut" }}
        className="relative"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-stone-400/25"
          style={{ animationDuration: "2.8s", animationDelay: `${delay}s` }}
        />
        <button
          type="button"
          aria-label={name}
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md ring-2 ring-stone-200/80 transition hover:ring-stone-300 sm:h-10 sm:w-10"
        >
          <Smile className="h-4 w-4 text-stone-700 sm:h-[18px] sm:w-[18px]" strokeWidth={2.2} />
        </button>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6, scale: hovered ? 1 : 0.92 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-800 px-3 py-1 text-xs font-medium text-[#FAF7F2] shadow-lg"
        role="tooltip"
      >
        {name}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-stone-800" />
      </motion.div>
    </motion.div>
  );
}

export default function TurkeyMap() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:px-10 md:pb-32" id="harita">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center md:mb-14"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full mully-surface px-4 py-2 text-sm text-[var(--mully-text-muted)]">
          <MapPin className="h-4 w-4" />
          Sosyal kanıt
        </div>
        <h2 className="text-3xl font-semibold sm:text-4xl">Mully Haritası</h2>
        <p className="mx-auto mt-4 max-w-lg text-[var(--mully-text-muted)]">
          Mully şu an Türkiye&apos;nin her yerinde gülümsetiyor.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto w-full max-w-4xl"
      >
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-gray-900/60 via-gray-950/80 to-black p-4 shadow-2xl sm:p-8">
          <div className="relative mx-auto w-full max-w-3xl" style={{ aspectRatio: "1000 / 422" }}>
            <img
              src="/maps/turkey.svg"
              alt="Türkiye haritası"
              className="absolute inset-0 h-full w-full object-contain"
            />

            {MAP_CITIES.map((city, i) => (
              <CityPin key={city.name} name={city.name} x={city.x} y={city.y} delay={i * 0.12} />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 text-center text-lg font-semibold sm:text-xl"
        >
          Şu ana kadar{" "}
          <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
            150+ ev
          </span>{" "}
          Mully ile tanıştı
        </motion.p>
      </motion.div>
    </section>
  );
}
