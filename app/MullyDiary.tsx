"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Heart } from "lucide-react";

const diaryEntries = [
  {
    place: "Okuma Köşesi",
    headline: "Kitapların sessiz ortağı",
    note: "Çay buharı ve sayfa sesleri — Mully her cümlede yanınızda.",
    image: "/images/mully-anasayfa4.jpeg",
    objectPosition: "center 32%",
  },
  {
    place: "Balkon",
    headline: "Sabah ışığında tanışma",
    note: "Gün doğarken gülümsemesi kadraja giriyor; sessiz bir ev arkadaşı.",
    image: "/images/mully-anasayfa10.jpeg",
    objectPosition: "center 28%",
  },
  {
    place: "Çalışma Masası",
    headline: "Ev ofisinin neşeli köşesi",
    note: "Toplantılar biter, Mully orada kalır — motive eden bir gülümseme.",
    image: "/images/mully-anasayfa3.jpeg",
    objectPosition: "center 30%",
  },
  {
    place: "Salon",
    headline: "Akşam sohbetinin yıldızı",
    note: "Mully salona yerleşince oda anında sıcaklıyor.",
    image: "/images/mully-anasayfa5.jpeg",
    objectPosition: "center 26%",
  },
] as const;

function DiaryCard({
  entry,
  index,
}: {
  entry: (typeof diaryEntries)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group w-[min(78vw,300px)] shrink-0 snap-center sm:w-[320px]"
    >
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-gray-950 to-stone-950 shadow-xl shadow-stone-900/20 ring-1 ring-white/10 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-stone-900/35">
        <div className="relative p-4 pt-4 sm:p-5 sm:pt-5">
          <div className="relative mx-auto mb-5 w-[min(70%,220px)]">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative aspect-square overflow-hidden rounded-full shadow-lg shadow-black/40 ring-4 ring-white/15 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-rose-500/25"
            >
              <Image
                src={entry.image}
                alt={`Mully — ${entry.place}`}
                fill
                sizes="220px"
                className="object-cover"
                style={{ objectPosition: entry.objectPosition }}
              />
            </motion.div>
            <div className="absolute bottom-0 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-500 shadow-md ring-4 ring-gray-950">
              <Heart className="h-3.5 w-3.5 fill-white text-white" />
            </div>
          </div>
        </div>

        <div className="px-5 pb-6 pt-2 text-center sm:px-6 sm:pb-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-rose-400/90">
            {entry.place}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">{entry.headline}</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-400">{entry.note}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function MullyDiary() {
  return (
    <section id="gunluk" className="relative overflow-hidden mully-bg-primary py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(244,63,94,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-12"
        >
          <p className="mully-section-label">
            Evden anlar
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Mully&apos;nin Günlüğü
          </h2>
          <p className="mully-font-display mt-3 bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-2xl text-transparent sm:text-3xl">
            Her köşede bir gülümseme
          </p>
          <p className="mt-3 max-w-lg text-[var(--mully-text-muted)]">
            Pufun evdeki farklı anları — kaydırarak keşfedin.
          </p>
        </motion.div>

        <div className="-mx-4 flex items-center gap-2 sm:-mx-6 md:-mx-10">
          <div
            className="flex flex-1 gap-5 overflow-x-auto scroll-smooth px-4 pb-4 pt-1 snap-x snap-mandatory sm:gap-6 sm:px-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {diaryEntries.map((entry, i) => (
              <DiaryCard key={entry.place} entry={entry} index={i} />
            ))}
          </div>
        </div>

        <p className="mt-4 flex items-center justify-end gap-1 text-xs text-[var(--mully-text-muted)] sm:pr-2">
          Kaydır
          <ChevronRight className="h-3.5 w-3.5" />
        </p>
      </div>
    </section>
  );
}
