"use client";

import Image from "next/image";
import { motion, useSpring, useTransform } from "framer-motion";
import { useCallback, useRef } from "react";

const TEXTURE_IMAGE = "/images/mully-anasayfa4.jpeg";

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function TextureMagnify() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useSpring(1, { stiffness: 110, damping: 26 });
  const originX = useSpring(50, { stiffness: 110, damping: 26 });
  const originY = useSpring(50, { stiffness: 110, damping: 26 });

  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      originX.set(((clientX - rect.left) / rect.width) * 100);
      originY.set(((clientY - rect.top) / rect.height) * 100);
      scale.set(1.65);
    },
    [originX, originY, scale],
  );

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateFromPoint(e.clientX, e.clientY);
    },
    [updateFromPoint],
  );

  const handleTouch = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      updateFromPoint(touch.clientX, touch.clientY);
    },
    [updateFromPoint],
  );

  const handleLeave = useCallback(() => {
    scale.set(1);
    originX.set(50);
    originY.set(50);
  }, [originX, originY, scale]);

  const transformOrigin = useTransform([originX, originY], ([x, y]) => `${x}% ${y}%`);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleLeave}
      onTouchCancel={handleLeave}
      className="group relative h-[min(72vw,360px)] touch-none overflow-hidden rounded-[28px] bg-gradient-to-br from-[var(--mully-surface-alt)] via-[var(--mully-surface)] to-[var(--mully-bg-3)] shadow-xl shadow-black/30 ring-1 ring-[var(--mully-ring)] sm:h-[480px] sm:rounded-[40px] sm:touch-auto lg:h-[540px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.07] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_BG, backgroundSize: "128px 128px" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-stone-900/20"
      />

      <motion.div className="relative h-full w-full" style={{ scale, transformOrigin }}>
        <Image
          src={TEXTURE_IMAGE}
          alt="Mully bouclé kumaş — peluş doku makro detay"
          fill
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover object-[center_42%]"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-stone-900/35 via-stone-900/5 to-transparent" />
      <p className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 text-center text-xs font-medium text-white/90 sm:bottom-8 sm:left-8 sm:right-auto sm:text-left sm:text-sm">
        <span className="sm:hidden">Parmağınızla gezdirin — dokuyu hissedin</span>
        <span className="hidden sm:inline">İmleci gezdir — dokuyu hisset</span>
      </p>
    </div>
  );
}

export default function TextureSection() {
  return (
    <section id="doku" className="mully-gradient-section py-16 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-14"
        >
          <p className="mully-section-label">Bouclé dokusu</p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-4xl">Mully&apos;nin Dokusu</h2>
          <p className="mt-3 max-w-xl text-sm text-[var(--mully-text-muted)] sm:mt-4 sm:text-base">
            Premium bouclé kumaş — parmağınızla gezdirin, peluş ipliklerin sıcaklığını yakından
            keşfedin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[28px] bg-[var(--mully-bg-1)]/80 p-2 shadow-lg shadow-black/20 ring-1 ring-[var(--mully-ring)] sm:rounded-[40px] sm:p-4"
        >
          <TextureMagnify />
        </motion.div>
      </div>
    </section>
  );
}
