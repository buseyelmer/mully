"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

const HERO_VIDEO = "/videos/mully-hero.mp4";
const HERO_POSTER = "/images/mully-anasayfa5.jpeg";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    setVideoFailed(false);
    videoRef.current?.play().catch(() => setVideoFailed(true));
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
    setVideoReady(false);
  }, []);

  const showPosterFallback = videoFailed || !videoReady;

  return (
    <section
      aria-label="Mully hero"
      className="relative aspect-video w-full overflow-hidden rounded-[40px] bg-[var(--mully-bg-2)] shadow-[0_24px_56px_rgba(0,0,0,0.5)] mully-mobile-hero max-sm:rounded-[24px]"
    >
      <div className="absolute inset-0 overflow-hidden max-sm:overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            showPosterFallback ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!showPosterFallback}
        >
          <div className="hero-ken-burns absolute inset-[-4%]">
            <Image
              src={HERO_POSTER}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_42%] max-sm:object-[center_38%]"
            />
          </div>
        </div>

        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-[center_42%] transition-opacity duration-700 max-sm:object-[center_38%] ${
            videoReady && !videoFailed ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          onCanPlay={handleCanPlay}
          onLoadedData={handleCanPlay}
          onError={handleVideoError}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.28)]"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-black/20 max-sm:bg-gradient-to-b max-sm:from-black/20 max-sm:via-black/5 max-sm:to-black/80"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center mully-mobile-card-inner max-sm:min-h-[inherit] max-sm:justify-end max-sm:px-6 sm:px-8">
        <motion.p
          {...fadeUp(0.15)}
          className="mully-font-display text-sm tracking-[0.12em] text-white/60 max-sm:mb-3 max-sm:text-xs max-sm:text-white/70 sm:text-base"
        >
          Mully
        </motion.p>

        <motion.h1
          {...fadeUp(0.35)}
          className="mully-font-display mt-2 max-w-4xl text-[clamp(1.5rem,4.2vw,3rem)] font-medium leading-[1.12] tracking-tight text-white max-sm:mt-0 max-sm:text-[1.3rem] max-sm:leading-[1.28]"
        >
          Senin İçin Tasarlandı,
          <span className="block max-sm:mt-1 sm:inline sm:ml-1">Seninle Tamamlandı</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.55)}
          className="mt-3 max-w-md text-sm leading-relaxed text-stone-300 max-sm:hidden sm:mt-4 sm:text-[15px]"
        >
          Bouclé dokusu ve gülümseyen yüzüyle evinizin en huzurlu köşesi — sessiz bir ev
          arkadaşı.
        </motion.p>

        <motion.div {...fadeUp(0.75)} className="mt-7 max-sm:mt-8 sm:mt-9">
          <Link
            href="#hikaye"
            className="inline-flex items-center justify-center rounded-full mully-accent-gradient px-9 py-3 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:brightness-110 active:scale-[0.98] max-sm:min-h-[48px] max-sm:min-w-[140px] max-sm:px-10 max-sm:py-3.5 sm:px-10 sm:py-3.5"
          >
            Keşfet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
