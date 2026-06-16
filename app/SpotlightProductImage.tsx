"use client";

import Image from "next/image";
import { memo, useCallback, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type SpotlightProductImageProps = {
  src: string;
  alt: string;
  objectPosition: string;
  priority?: boolean;
  sizes?: string;
};

function SpotlightProductImage({
  src,
  alt,
  objectPosition,
  priority,
  sizes = "(max-width: 1152px) 70vw, 420px",
}: SpotlightProductImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const active = useMotionValue(0);

  const smoothX = useSpring(spotX, { stiffness: 120, damping: 26, mass: 0.35 });
  const smoothY = useSpring(spotY, { stiffness: 120, damping: 26, mass: 0.35 });
  const smoothActive = useSpring(active, { stiffness: 200, damping: 32 });

  const shadowX = useTransform(smoothX, (x) => 100 - x);
  const shadowY = useTransform(smoothY, (y) => 100 - y);

  const imageFilter = useTransform(
    [smoothX, smoothY, smoothActive],
    ([x, y, a]: number[]) => {
      if (a < 0.02) return "brightness(1) contrast(1)";
      const nx = (x - 50) / 50;
      const ny = (y - 50) / 50;
      const dist = Math.min(1, Math.sqrt(nx * nx + ny * ny));
      const boost = a * (0.04 + (1 - dist) * 0.07);
      const contrast = a * (0.02 + (1 - dist) * 0.06);
      return `brightness(${(1 + boost).toFixed(3)}) contrast(${(1 + contrast).toFixed(3)})`;
    },
  );

  const spotlightGlow = useMotionTemplate`radial-gradient(circle 150px at ${smoothX}% ${smoothY}%, rgba(255,252,245,0.55) 0%, rgba(255,248,238,0.22) 38%, transparent 72%)`;
  const ambientShadow = useMotionTemplate`radial-gradient(circle 190px at ${shadowX}% ${shadowY}%, rgba(45,38,32,0.14) 0%, transparent 68%)`;
  const overlayOpacity = useTransform(smoothActive, (a) => a * 0.85);
  const shadowOpacity = useTransform(smoothActive, (a) => a * 0.45);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    spotX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotY.set(((e.clientY - rect.top) / rect.height) * 100);
    active.set(1);
  }, [spotX, spotY, active]);

  const handleLeave = useCallback(() => {
    active.set(0);
    spotX.set(50);
    spotY.set(50);
  }, [active, spotX, spotY]);

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative h-full w-full overflow-hidden rounded-[40px]"
    >
      <motion.div className="absolute inset-0" style={{ filter: imageFilter }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light blur-[2px]"
        style={{ background: spotlightGlow, opacity: overlayOpacity }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-multiply blur-[6px]"
        style={{ background: ambientShadow, opacity: shadowOpacity }}
      />
    </div>
  );
}

export default memo(SpotlightProductImage);
