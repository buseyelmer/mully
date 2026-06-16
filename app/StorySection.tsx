"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const chapters = [
  {
    room: "Salon",
    anchorId: "koleksiyon-salon",
    headline: "Akşam ışığında karşılaşma",
    body: "Mully salona yerleştiğinde oda anında sıcaklıyor — gülümsemesi ilk andan itibaren kadrajda.",
    image: "/images/mully-anasayfa5.jpeg",
    objectPosition: "center 28%",
    align: "left" as const,
  },
  {
    room: "Yatak Odası",
    anchorId: undefined,
    headline: "Sessiz bir gece arkadaşı",
    body: "Yumuşak bouclé dokusuyla yatak odasının en huzurlu köşesine taşınıyor.",
    image: "/images/mully-anasayfa2.jpeg",
    objectPosition: "center 22%",
    align: "right" as const,
  },
  {
    room: "Okuma Köşesi",
    anchorId: "koleksiyon-okuma",
    headline: "Kitap ve çay eşliğinde",
    body: "Her sayfa çevrildiğinde Mully orada — neşeli ama asla müdahaleci değil.",
    image: "/images/mully-anasayfa4.jpeg",
    objectPosition: "center 35%",
    align: "left" as const,
  },
  {
    room: "Balkon",
    anchorId: "koleksiyon-balkon",
    headline: "Sabah güneşiyle tanışma",
    body: "Gün doğarken gülümsemesi kadraja giriyor; evinizin dördüncü duvarı artık daha neşeli.",
    image: "/images/mully-anasayfa10.jpeg",
    objectPosition: "center 30%",
    align: "right" as const,
  },
] as const;

function StoryChapter({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.92, 1, 0.96]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.5]);
  const textX = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    [chapter.align === "left" ? -48 : 48, 0],
  );
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 1], [0, 1, 1, 0.3]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      id={chapter.anchorId}
      className="relative scroll-mt-28 py-8 sm:py-10"
    >
      <div
        className={`mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:px-6 md:gap-8 md:px-10 ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <motion.div
          style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
          className="relative w-full max-w-xl flex-1"
        >
          <div className="relative overflow-hidden rounded-[40px] mully-surface shadow-2xl shadow-stone-300/40 ring-1 ring-[var(--mully-ring)]">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src={chapter.image}
                alt={`Mully — ${chapter.room}`}
                fill
                sizes="(max-width: 768px) 100vw, 576px"
                className="object-cover"
                style={{ objectPosition: chapter.objectPosition }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-transparent" />
            </div>
          </div>
          <span className="absolute -bottom-3 left-6 rounded-full border border-white/10 bg-gray-950/90 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--mully-text-muted)] shadow-lg backdrop-blur-sm">
            {chapter.room}
          </span>
        </motion.div>

        <motion.div
          style={{ x: textX, opacity: textOpacity }}
          className="flex flex-1 flex-col justify-center text-center lg:max-w-md lg:text-left"
        >
          <p className="mully-section-label">
            Bölüm {index + 1}
          </p>
          <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
            {chapter.headline}
          </h3>
          <p className="mt-4 leading-relaxed text-[var(--mully-text-muted)]">{chapter.body}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function StorySection() {
  return (
    <section className="relative overflow-hidden mully-gradient-page" id="hikaye">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(/images/mully-anasayfa8.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-6xl px-4 pt-20 text-center sm:px-6 md:px-10 md:pt-28"
      >
        <p className="mully-section-label">
          Oda oda keşif
        </p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Mully Evinizde Dolaşıyor
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--mully-text-muted)]">
          Kaydırdıkça Mully farklı odalara yerleşiyor — her bölümde gülümsemesi kadraja farklı
          giriyor.
        </p>
      </motion.div>

      <div className="relative pb-4">
        {chapters.map((chapter, i) => (
          <StoryChapter key={chapter.room} chapter={chapter} index={i} />
        ))}
      </div>
    </section>
  );
}
