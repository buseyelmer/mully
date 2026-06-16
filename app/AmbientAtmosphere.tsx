"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AudioLines, Music2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const VOLUME = 0.07;

function createRainAmbience(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.55;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 720;
  lowpass.Q.value = 0.6;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 180;

  const gain = ctx.createGain();
  gain.gain.value = 0;

  source.connect(highpass);
  highpass.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(ctx.destination);

  source.start();

  return {
    gain,
    stop: () => {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      window.setTimeout(() => {
        try {
          source.stop();
        } catch {
          /* already stopped */
        }
      }, 450);
    },
    fadeIn: () => {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(VOLUME, now + 0.6);
    },
  };
}

export default function AmbientAtmosphere() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<{
    ctx: AudioContext;
    ambience: ReturnType<typeof createRainAmbience>;
  } | null>(null);

  const stopSound = useCallback(() => {
    const current = audioRef.current;
    if (!current) return;
    current.ambience.stop();
    window.setTimeout(() => {
      void current.ctx.close();
    }, 500);
    audioRef.current = null;
    setPlaying(false);
  }, []);

  const startSound = useCallback(async () => {
    if (audioRef.current) return;

    const ctx = new AudioContext();
    await ctx.resume();

    const ambience = createRainAmbience(ctx);
    ambience.fadeIn();

    audioRef.current = { ctx, ambience };
    setPlaying(true);
  }, []);

  const toggleSound = useCallback(async () => {
    if (playing) {
      stopSound();
      return;
    }
    await startSound();
  }, [playing, startSound, stopSound]);

  useEffect(() => {
    return () => {
      const current = audioRef.current;
      if (!current) return;
      try {
        current.ambience.stop();
        void current.ctx.close();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-[47] sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="mb-3 w-[min(88vw,260px)] overflow-hidden rounded-2xl bg-[var(--mully-bg-1)]/95 p-4 shadow-xl ring-1 ring-[var(--mully-ring)] backdrop-blur-xl"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-[var(--mully-text)]">
                  Mully&apos;nin Ev Atmosferi
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--mully-text-muted)]">
                  Hafif yağmur ve sıcak ev sessizliği — çok düşük sesle döngüde çalar.
                </p>
              </div>
              <button
                type="button"
                aria-label="Paneli kapat"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-[var(--mully-text-muted)] transition hover:bg-[var(--mully-surface)] hover:text-[var(--mully-text)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => void toggleSound()}
              className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                playing
                  ? "mully-accent-gradient text-white"
                  : "mully-surface text-[var(--mully-text)] ring-1 ring-[var(--mully-ring)] hover:opacity-90"
              }`}
            >
              {playing ? (
                <>
                  <AudioLines className="h-4 w-4" />
                  Atmosferi durdur
                </>
              ) : (
                <>
                  <Music2 className="h-4 w-4" />
                  Atmosferi başlat
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Mully'nin Ev Atmosferi"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[var(--mully-bg-1)]/90 text-[var(--mully-text)] shadow-md ring-1 ring-[var(--mully-ring)] backdrop-blur-md"
      >
        {playing && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full mully-accent-gradient opacity-20"
            animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <motion.div
          animate={playing ? { rotate: [0, -6, 6, 0] } : { rotate: 0 }}
          transition={{ duration: 2.8, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
        >
          {playing ? (
            <AudioLines className="relative h-5 w-5" strokeWidth={1.9} />
          ) : (
            <Music2 className="relative h-5 w-5" strokeWidth={1.9} />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
