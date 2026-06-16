"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import TimeGreeting from "./TimeGreeting";
import SpotlightProductImage from "./SpotlightProductImage";

/** Ana ürün görseli — dosya: public/images/mully-anasayfa.jpeg */
const HERO_IMAGE = "/images/mully-anasayfa.jpeg";

const slides = [
  { src: HERO_IMAGE, alt: "Mully puf — gülümseyen yüz, ön görünüm", objectPosition: "center 32%" },
  { src: "/images/mully-anasayfa7.jpeg", alt: "Mully puf — bouclé doku detayı", objectPosition: "center center" },
  { src: "/images/mully-anasayfa4.jpeg", alt: "Mully puf — doğal ışıkta", objectPosition: "center 38%" },
  { src: "/images/mully-anasayfa5.jpeg", alt: "Mully puf — ev ortamı", objectPosition: "center 30%" },
  { src: "/images/mully-anasayfa9.jpeg", alt: "Mully puf — yakın plan", objectPosition: "center 35%" },
] as const;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 85, damping: 22, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 85, damping: 22, mass: 0.5 });

  const rotateX = useTransform(smoothY, (v) => v * -5);
  const rotateY = useTransform(smoothX, (v) => v * 5);
  const floatX = useTransform(smoothX, (v) => v * 8);
  const floatY = useTransform(smoothY, (v) => v * 6);

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const timer = setInterval(() => goTo(index + 1), 6000);
    return () => clearInterval(timer);
  }, [index, goTo]);

  const slide = slides[index];

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-none bg-gradient-to-br from-[var(--mully-hero-from)] to-[var(--mully-hero-to)] sm:rounded-[40px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              rotateX,
              rotateY,
              x: floatX,
              y: floatY,
              transformPerspective: 1000,
            }}
            className="relative h-full max-h-[min(88%,520px)] w-full max-w-[min(72%,420px)] will-change-transform rounded-[40px] shadow-2xl shadow-black/50 ring-1 ring-white/15"
          >
            <SpotlightProductImage
              src={slide.src}
              alt={slide.alt}
              objectPosition={slide.objectPosition}
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <TimeGreeting />

      <button
        type="button"
        aria-label="Önceki slayt"
        onClick={() => goTo(index - 1)}
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 sm:left-5"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Sonraki slayt"
        onClick={() => goTo(index + 1)}
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 sm:right-5"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slayt ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 mully-accent-gradient" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
