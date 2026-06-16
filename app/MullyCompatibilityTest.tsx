"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Share2, Smile } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type PufState = {
  src: string;
  objectPosition: string;
  rotate: number;
  scale: number;
  smileScale: number;
};

type Question = {
  id: "corner" | "time" | "music";
  question: string;
  options: Option[];
  puf: PufState;
};

const questions: Question[] = [
  {
    id: "corner",
    question: "Evinde en sevdiğin köşe neresi?",
    options: [
      { label: "Kitap köşesi", value: "kitap" },
      { label: "Televizyon karşısı", value: "tv" },
      { label: "Balkon / Cam kenarı", value: "balkon" },
    ],
    puf: {
      src: "/images/mully-anasayfa2.jpeg",
      objectPosition: "center 28%",
      rotate: -14,
      scale: 0.9,
      smileScale: 0.85,
    },
  },
  {
    id: "time",
    question: "Günün en yorgun saati hangisi?",
    options: [
      { label: "Sabah", value: "sabah" },
      { label: "Öğleden sonra", value: "ogleden-sonra" },
      { label: "Gece saatleri", value: "gece" },
    ],
    puf: {
      src: "/images/mully-anasayfa7.jpeg",
      objectPosition: "center 32%",
      rotate: 4,
      scale: 1.02,
      smileScale: 0.95,
    },
  },
  {
    id: "music",
    question: "Ne tür müzik dinlemeyi seversin?",
    options: [
      { label: "Caz / Akustik", value: "caz" },
      { label: "Lo-fi / Chill", value: "lofi" },
      { label: "Hareketli / Pop", value: "pop" },
    ],
    puf: {
      src: "/images/mully-anasayfa.jpeg",
      objectPosition: "center 30%",
      rotate: 0,
      scale: 1.08,
      smileScale: 1.1,
    },
  },
];

const cornerMeta: Record<
  string,
  { label: string; buyLabel: string }
> = {
  kitap: {
    label: "kitap köşende",
    buyLabel: "Kitap Köşem İçin Mully'yi Al",
  },
  tv: {
    label: "salonunda",
    buyLabel: "Salonum İçin Mully'yi Al",
  },
  balkon: {
    label: "balkonunda",
    buyLabel: "Balkonum İçin Mully'yi Al",
  },
};

const resultTemplates: Record<string, { primary: string; secondary?: string }> = {
  kitap: {
    primary: "Mully artık kitap köşende seninle.",
    secondary: "Eşleşme onaylandı.",
  },
  tv: {
    primary: "Salonun için mükemmel bir arkadaş buldun.",
    secondary: "Mully ile tanış.",
  },
  balkon: {
    primary: "Mully artık balkonunda seninle.",
    secondary: "Eşleşme onaylandı.",
  },
};

const slideVariants = {
  enter: { opacity: 0, x: 48 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -48 },
};

const gradientBtn =
  "inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full mully-accent-gradient px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:brightness-110 active:scale-[0.98] sm:w-auto sm:text-sm";

function PufVisual({ puf, stepKey }: { puf: PufState; stepKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto aspect-[4/5] w-full max-w-[160px] sm:max-w-[260px]"
      >
        <motion.div
          animate={{ rotate: puf.rotate, scale: puf.scale }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full overflow-hidden rounded-[32px] bg-gray-900 shadow-2xl shadow-black/40 ring-1 ring-white/15"
        >
          <Image
            src={puf.src}
            alt="Mully puf"
            fill
            sizes="(max-width: 640px) 220px, 260px"
            className="object-cover"
            style={{ objectPosition: puf.objectPosition }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: puf.smileScale }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="absolute left-1/2 top-[18%] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-gray-950/80 shadow-lg ring-2 ring-white/20 backdrop-blur-sm"
        >
          <Smile className="h-6 w-6 text-rose-400" strokeWidth={2.2} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MullyCompatibilityTest() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [pending, setPending] = useState<string | null>(null);
  const [shareNote, setShareNote] = useState<string | null>(null);

  const finished = step >= questions.length;
  const current = questions[step];

  const resultCopy = useMemo(() => {
    const cornerKey = answers.corner;
    if (cornerKey && resultTemplates[cornerKey]) {
      return resultTemplates[cornerKey];
    }
    return {
      primary: "Mully seninle eşleşti.",
      secondary: "Birlikte güzel bir köşe bekliyor.",
    };
  }, [answers.corner]);

  const shareText = useMemo(() => {
    const parts = [resultCopy.primary, resultCopy.secondary].filter(Boolean);
    return parts.join(" ");
  }, [resultCopy]);

  const buyConfig = answers.corner ? cornerMeta[answers.corner] : null;

  const reset = useCallback(() => {
    setStep(0);
    setAnswers({});
    setPending(null);
    setShareNote(null);
  }, []);

  const goNext = useCallback(() => {
    if (finished || !pending || !current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: pending }));
    setPending(null);
    setStep((s) => s + 1);
  }, [current, finished, pending]);

  const shareResult = useCallback(async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#mully-test`
        : "";
    const payload = {
      title: "Evine Mully Lazım mı?",
      text: shareText,
      url,
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(payload);
        setShareNote("Paylaşım menüsü açıldı.");
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(`${payload.text}\n${payload.url}`);
        setShareNote("Sonuç panoya kopyalandı.");
      }
    } catch {
      setShareNote(null);
    }
  }, [shareText]);

  return (
    <section id="mully-test" className="scroll-mt-28">
      <div className="mb-8 text-center sm:mb-10">
        <p className="mully-section-label">Mini uyum testi</p>
        <h2 className="mully-font-display mt-2 text-2xl font-medium text-white sm:text-3xl md:text-4xl">
          Evine Mully Lazım mı?
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-[28px] bg-[#0a0a0a] p-4 shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:rounded-[40px] sm:p-8 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-orange-500/5"
        />

        <div className="relative flex flex-col gap-6 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-10">
          <div className="order-2 flex justify-center md:order-1 md:justify-start">
            <PufVisual
              puf={
                finished
                  ? {
                      src: "/images/mully-anasayfa10.jpeg",
                      objectPosition: "center 30%",
                      rotate: 0,
                      scale: 1.1,
                      smileScale: 1.15,
                    }
                  : current.puf
              }
              stepKey={finished ? "result" : `step-${step}`}
            />
          </div>

          <div className="order-1 md:order-2">
            <AnimatePresence mode="wait">
              {!finished && current && (
                <motion.div
                  key={`q-${step}`}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
                    Soru {step + 1} / {questions.length}
                  </p>
                  <h3 className="mully-font-display mt-3 text-lg font-medium leading-snug text-white sm:text-2xl">
                    {current.question}
                  </h3>

                  <div className="mt-5 space-y-3 sm:mt-6">
                    {current.options.map((opt) => {
                      const selected = pending === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPending(opt.value)}
                          className={`min-h-[48px] w-full rounded-2xl border px-4 py-3.5 text-left text-base font-medium transition sm:py-4 sm:text-base ${
                            selected
                              ? "border-rose-500/50 bg-white/10 text-white shadow-md shadow-rose-500/10"
                              : "border-white/15 bg-white/5 text-stone-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.button
                    type="button"
                    onClick={goNext}
                    disabled={!pending}
                    whileHover={pending ? { scale: 1.02 } : undefined}
                    whileTap={pending ? { scale: 0.98 } : undefined}
                    className={`mt-5 sm:mt-6 ${gradientBtn} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100`}
                  >
                    İleri
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              )}

              {finished && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mully-font-display text-xl leading-snug text-white sm:text-3xl">
                    {resultCopy.primary}
                  </p>
                  {resultCopy.secondary && (
                    <p className="mully-font-display mt-2 text-base text-stone-400 sm:text-xl">
                      {resultCopy.secondary}
                    </p>
                  )}

                  <div className="mt-6 flex flex-col gap-3 sm:mt-8">
                    {buyConfig && (
                      <Link href="/checkout" className={gradientBtn}>
                        {buyConfig.buyLabel}
                      </Link>
                    )}
                    <button type="button" onClick={shareResult} className={gradientBtn}>
                      <Share2 className="h-4 w-4" />
                      Bu eşleşmeyi arkadaşınla paylaş
                    </button>
                  </div>

                  {shareNote && (
                    <p className="mt-3 text-center text-xs text-stone-500">{shareNote}</p>
                  )}

                  <button
                    type="button"
                    onClick={reset}
                    className="mt-5 w-full text-center text-sm font-medium text-stone-500 underline-offset-2 hover:text-stone-300 hover:underline"
                  >
                    Tekrar Dene
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
