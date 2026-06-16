"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Smile } from "lucide-react";
import { useEffect, useState } from "react";

type TimePeriod = "morning" | "afternoon" | "evening";

function getTimePeriod(hour: number): TimePeriod {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "evening";
}

function getTimeMessage(hour: number): string {
  if (hour >= 6 && hour < 12) {
    return "Mully güne seninle başlamaya hazır.";
  }
  if (hour >= 12 && hour < 18) {
    return "Mully günün yorgunluğunu paylaşmaya hazır.";
  }
  return "Mully şu an dinlenmeye geçti, ama sana eşlik etmeye hazır.";
}

const periodStyles: Record<
  TimePeriod,
  { gradient: string; glow: string; ambient: string; highlight: string; ring: string }
> = {
  morning: {
    gradient: "bg-gray-950/85",
    glow: "bg-amber-500/25",
    ambient: "bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent",
    highlight: "from-amber-400 via-orange-400 to-amber-300",
    ring: "ring-amber-500/35",
  },
  afternoon: {
    gradient: "bg-gray-950/85",
    glow: "bg-rose-500/25",
    ambient: "bg-gradient-to-tr from-rose-500/10 via-transparent to-transparent",
    highlight: "from-rose-400 via-orange-400 to-amber-300",
    ring: "ring-rose-500/35",
  },
  evening: {
    gradient: "bg-gray-950/85",
    glow: "bg-orange-500/20",
    ambient: "bg-gradient-to-tr from-orange-500/10 via-violet-500/10 to-transparent",
    highlight: "from-orange-400 via-rose-400 to-violet-400",
    ring: "ring-orange-500/30",
  },
};

function HighlightedMessage({ text, highlightClass }: { text: string; highlightClass: string }) {
  const parts = text.split("Mully");
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts[0]}
      <span
        className={`bg-gradient-to-r ${highlightClass} bg-clip-text font-semibold text-transparent`}
      >
        Mully
      </span>
      {parts.slice(1).join("Mully")}
    </>
  );
}

export default function TimeGreeting() {
  const [message, setMessage] = useState<string | null>(null);
  const [period, setPeriod] = useState<TimePeriod>("afternoon");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      const hour = new Date().getHours();
      setMessage(getTimeMessage(hour));
      setPeriod(getTimePeriod(hour));
      setReady(true);
    };

    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  const styles = periodStyles[period];

  return (
    <div className="pointer-events-none absolute bottom-[14%] left-1/2 z-30 w-[min(88%,300px)] -translate-x-1/2 sm:bottom-[20%] sm:left-auto sm:right-[4%] sm:w-[min(38%,290px)] sm:translate-x-0 md:right-[8%] lg:right-[11%]">
      <AnimatePresence mode="wait">
        {ready && message && (
          <motion.div
            key={`${period}-${message}`}
            initial={{ opacity: 0, scale: 0.72, x: 24, y: 16 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 22,
              delay: 0.75,
            }}
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                <div
                  aria-hidden
                  className={`absolute -inset-2 rounded-full blur-xl ${styles.glow}`}
                />

                <div
                  className={`relative overflow-hidden rounded-full shadow-lg shadow-black/40 ring-1 backdrop-blur-md ${styles.gradient} ${styles.ring}`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-full ${styles.ambient}`}
                  />

                  <div className="relative flex items-center gap-3 px-4 py-3 sm:gap-3.5 sm:px-5 sm:py-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10">
                      <Smile
                        className="h-5 w-5 text-[var(--mully-accent)]"
                        strokeWidth={2.2}
                        aria-hidden
                      />
                    </div>
                    <p className="text-left text-[13px] font-medium leading-snug tracking-tight text-white/90 sm:text-sm">
                      <HighlightedMessage text={message} highlightClass={styles.highlight} />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
