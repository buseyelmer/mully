"use client";

/**
 * MULLY — GÖRSEL ALAN ÖLÇÜLERİ
 * Container max-width : 1152px (max-w-6xl)
 * Hero Parallax slider: aspect-video (16:9), sayfa üstü
 * Match slider        : aspect-video (16:9), footer üstü
 * Harita              : viewBox 1000×400, kullanıcı SVG silueti
 * Hazırlık modalı     : max-w-md (~448px)
 */

import TurkeyMap from "./TurkeyMap";
import TrustSection from "./TrustSection";
import { useBuyModal } from "./BuyModalProvider";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import {
  Hand,
  Heart,
  Layers,
  Mail,
  Phone,
  Ruler,
  ShoppingBag,
  ShoppingCart,
  Smile,
  Sofa,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type ConfettiParticle = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotate: number;
};

const SECRETS_IMAGE = "/images/mully-anasayfa7.jpeg";

const quizQuestions = [
  { question: "Evinin en huzurlu köşesi neresi?", options: ["Salon", "Yatak odası", "Okuma köşesi", "Balkon"] },
  { question: "İdeal akşamın nasıl geçer?", options: ["Kitap ve çay", "Film maratonu", "Sessizlik", "Sohbet"] },
  { question: "Evde en çok neye değer verirsin?", options: ["Rahatlık", "Estetik", "Neşe", "Sakinlik"] },
] as const;

const matchSlides = [
  {
    image: "/images/mully-anasayfa.jpeg",
    headline: "Mully ile eşleştin.",
    subline: "Artık eviniz biraz daha rahat.",
  },
  {
    image: "/images/mully-anasayfa4.jpeg",
    headline: "Sabah ışığında tanıştınız.",
    subline: "Sessiz bir ev arkadaşı, her gün yanınızda.",
  },
  {
    image: "/images/mully-anasayfa7.jpeg",
    headline: "Gülümseme garantili.",
    subline: "Bouclé dokusuyla sıcak bir kucaklama.",
  },
  {
    image: "/images/mully-anasayfa10.jpeg",
    headline: "Evinizin yeni neşe kaynağı.",
    subline: "Mully — mobilya değil, bir dost.",
  },
] as const;

const secrets = [
  {
    id: "craft",
    icon: Hand,
    title: "El İşçiliği",
    text: "Her dikiş ve her köşe özenle tamamlanır.",
    top: "18%",
    left: "20%",
    width: "28%",
    height: "22%",
    labelTop: "12%",
    labelLeft: "8%",
  },
  {
    id: "boucle",
    icon: Layers,
    title: "Bouclé Kumaş",
    text: "Kalın, peluş iplikler — dokunsal sıcaklık.",
    top: "45%",
    left: "55%",
    width: "32%",
    height: "28%",
    labelTop: "42%",
    labelLeft: "52%",
  },
  {
    id: "ergonomic",
    icon: Ruler,
    title: "Ergonomik Tasarım",
    text: "Yumuşak köşeler, dengeli ve rahat form.",
    top: "62%",
    left: "22%",
    width: "30%",
    height: "25%",
    labelTop: "58%",
    labelLeft: "18%",
  },
] as const;

const traits = [
  {
    icon: Smile,
    title: "Sessiz ev arkadaşı",
    text: "Konuşmaz ama her zaman orada — gülümseyen yüzüyle sizi karşılar.",
    image: "/images/mully-anasayfa.jpeg",
    grad: "from-rose-600/45 via-rose-900/20 to-transparent",
    num: "01",
  },
  {
    icon: Sofa,
    title: "Rahatlık verir",
    text: "Peluş bouclé dokusu ve yumuşak formuyla evin en sevilen köşesi olur.",
    image: "/images/mully-anasayfa4.jpeg",
    grad: "from-orange-500/40 via-orange-900/15 to-transparent",
    num: "02",
  },
  {
    icon: Sparkles,
    title: "Neşe katar",
    text: "Minimal tasarım, maksimum karakter — her odaya sıcaklık getirir.",
    image: "/images/mully-anasayfa7.jpeg",
    grad: "from-violet-500/40 via-violet-900/15 to-transparent",
    num: "03",
  },
] as const;

const confettiDots = [
  { top: "12%", left: "15%", color: "#f43f5e", size: 6 },
  { top: "20%", left: "82%", color: "#a855f7", size: 5 },
  { top: "35%", left: "8%", color: "#3b82f6", size: 4 },
  { top: "28%", left: "55%", color: "#f97316", size: 5 },
  { top: "48%", left: "90%", color: "#ec4899", size: 6 },
  { top: "65%", left: "20%", color: "#8b5cf6", size: 4 },
  { top: "72%", left: "75%", color: "#ef4444", size: 5 },
  { top: "85%", left: "45%", color: "#fb923c", size: 4 },
] as const;

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TraitsShowcase() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 mully-accent-gradient opacity-[0.07]" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {confettiDots.map((d, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.85, 0.3], scale: [1, 1.25, 1] }}
            transition={{ duration: 3 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size, backgroundColor: d.color }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center sm:mb-14"
        >
          <p className="mully-section-label">Neden bir ev arkadaşı?</p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-4xl md:text-5xl">
            Mobilya değil,{" "}
            <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
              Mully
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
          {traits.map(({ icon: Icon, title, text, image, grad, num }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative min-h-[200px] overflow-hidden rounded-[28px] ring-1 ring-white/10 sm:min-h-[240px] sm:rounded-[36px] lg:min-h-0 ${
                i === 0 ? "lg:col-span-5 lg:row-span-2" : "lg:col-span-7"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black transition duration-300 group-hover:brightness-110" />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${grad} transition duration-300 group-hover:brightness-125 group-hover:saturate-110`}
              />
              <div className="absolute inset-0 bg-white/0 transition duration-300 group-hover:bg-white/[0.07]" />
              <Image
                src={image}
                alt=""
                fill
                className="object-cover opacity-20 transition duration-500 group-hover:scale-105 group-hover:opacity-30"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full mully-accent-gradient opacity-20 blur-3xl transition group-hover:opacity-40" />

              <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-8 lg:p-10">
                <span className="text-3xl font-bold text-white/10 sm:text-5xl">{num}</span>
                <div>
                  <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:mb-5 sm:p-4">
                    <Icon className="h-5 w-5 text-[var(--mully-accent)] sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white sm:text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--mully-text-muted)] sm:mt-3 sm:text-base">{text}</p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-0 transition group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MullySecrets() {
  const [active, setActive] = useState<string | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());

  const reveal = (id: string) => {
    setActive(id);
    setFound((prev) => new Set(prev).add(id));
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-black shadow-2xl ring-1 ring-white/10">
      <div className="relative mx-auto aspect-[4/3] max-h-[580px] w-full sm:aspect-[3/2]">
        <Image
          src={SECRETS_IMAGE}
          alt="Mully puf"
          fill
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover object-[center_35%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-stone-900/5" />

        {secrets.map(({ id, top, left, width, height }) => (
          <div
            key={id}
            className="absolute cursor-crosshair"
            style={{ top, left, width, height }}
            onMouseEnter={() => reveal(id)}
            onMouseLeave={() => setActive(null)}
            aria-hidden
          />
        ))}

        <AnimatePresence>
          {secrets.map(({ id, icon: Icon, title, text, labelTop, labelLeft }) =>
            active === id ? (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute z-20 max-w-[200px] rounded-2xl border border-white/10 bg-gray-950/90 px-4 py-3 shadow-xl backdrop-blur-md sm:max-w-[220px]"
                style={{ top: labelTop, left: labelLeft }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-[var(--mully-accent)]" />
                  <p className="text-sm font-semibold text-white">{title}</p>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--mully-text-muted)]">{text}</p>
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {secrets.map(({ id }) => (
            <span
              key={id}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                found.has(id) ? "mully-accent-gradient scale-110" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SwipeConfetti({ particles }: { particles: ConfettiParticle[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, x: `${p.x}%`, y: `${p.y}%`, scale: 0, rotate: 0 }}
            animate={{ opacity: 0, y: `${p.y - 25}%`, scale: 1.2, rotate: p.rotate }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function MatchHeroSlider({ onBuy }: { onBuy: () => void }) {
  const [index, setIndex] = useState(0);
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const burstConfetti = useCallback(() => {
    const colors = ["#f43f5e", "#a855f7", "#3b82f6", "#f97316", "#ec4899", "#fbbf24"];
    const next = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i,
      x: 35 + Math.random() * 30,
      y: 30 + Math.random() * 40,
      color: colors[i % colors.length],
      size: 4 + Math.random() * 6,
      rotate: Math.random() * 360,
    }));
    setParticles(next);
    setTimeout(() => setParticles([]), 1000);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const clamped = ((next % matchSlides.length) + matchSlides.length) % matchSlides.length;
      if (clamped === index) return;
      setIndex(clamped);
      burstConfetti();
    },
    [index, burstConfetti],
  );

  const onDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 60;
    if (info.offset.x < -threshold || info.velocity.x < -400) goTo(index + 1);
    else if (info.offset.x > threshold || info.velocity.x > 400) goTo(index - 1);
    dragX.set(0);
  };

  useEffect(() => {
    const timer = setInterval(() => goTo((index + 1) % matchSlides.length), 7000);
    return () => clearInterval(timer);
  }, [index, goTo]);

  const slide = matchSlides[index];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-none shadow-2xl ring-1 ring-white/10 max-sm:rounded-[28px] sm:rounded-3xl">
      <div className="relative flex w-full flex-col bg-gradient-to-br from-gray-900 via-gray-950 to-black mully-mobile-match sm:aspect-video sm:min-h-0 sm:block">
        <SwipeConfetti particles={particles} />

        <div aria-hidden className="pointer-events-none absolute inset-0">
          {confettiDots.map((d, i) => (
            <span key={i} className="absolute rounded-full opacity-60" style={{ top: d.top, left: d.left, width: d.size, height: d.size, backgroundColor: d.color }} />
          ))}
          <Heart className="absolute left-[12%] top-[18%] h-4 w-4 fill-rose-500/70 text-rose-500 max-sm:hidden sm:block" />
          <Heart className="absolute right-[14%] top-[22%] h-3 w-3 fill-rose-500/60 text-rose-500 max-sm:hidden sm:block" />
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          style={{ x: dragX }}
          onDragEnd={onDragEnd}
          className="relative z-10 flex flex-1 cursor-grab flex-col items-center justify-center px-4 py-8 active:cursor-grabbing mully-mobile-match-inner max-sm:px-6 sm:h-full sm:min-h-0 sm:px-12 sm:py-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full max-w-2xl flex-col items-center text-center max-sm:gap-7 sm:gap-0"
            >
              <p className="mully-font-display text-2xl font-medium text-white max-sm:text-xl sm:text-3xl md:text-4xl">
                It&apos;s a Match!
              </p>

              <div className="relative mt-6 h-28 w-28 max-sm:mt-0 max-sm:h-[8.5rem] max-sm:w-[8.5rem] sm:h-36 sm:w-36">
                <div className="absolute inset-0 overflow-hidden rounded-full ring-4 ring-white/20">
                  <Image src={slide.image} alt={slide.headline} fill sizes="(max-width:640px) 136px, 144px" className="object-cover object-[center_30%]" priority={index === 0} />
                </div>
                <div className="absolute -bottom-1 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-red-600 shadow-lg ring-4 ring-gray-950 max-sm:h-9 max-sm:w-9">
                  <Heart className="h-4 w-4 fill-white text-white max-sm:h-3.5 max-sm:w-3.5" />
                </div>
              </div>

              <h3 className="mully-font-display mt-6 text-xl font-medium text-white max-sm:mt-0 max-sm:max-w-[300px] max-sm:text-lg max-sm:leading-snug sm:text-2xl">
                {slide.headline}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-stone-400 max-sm:mt-0 max-sm:max-w-[320px] max-sm:leading-relaxed sm:text-[15px]">
                {slide.subline}
              </p>

              <motion.button
                id="satin-al"
                type="button"
                onClick={onBuy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full mully-accent-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 max-sm:mt-0 max-sm:min-h-[48px] max-sm:w-full max-sm:max-w-[280px] max-sm:justify-center sm:px-10 sm:py-4"
              >
                <ShoppingBag className="h-4 w-4" />
                Şimdi Satın Al
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative z-20 flex shrink-0 items-center justify-center gap-2 px-4 mully-mobile-dots sm:absolute sm:bottom-4 sm:left-0 sm:right-0 sm:pb-0 sm:pt-0">
          {matchSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 mully-accent-gradient" : "w-2 bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>

        <p className="pointer-events-none absolute bottom-4 right-5 z-20 hidden text-xs text-white/30 sm:block">
          ← Kaydır →
        </p>
      </div>
    </div>
  );
}

function CompatibilityQuiz({ onBuy }: { onBuy: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const finished = step >= quizQuestions.length;

  const pickAnswer = (option: string) => {
    setAnswers((prev) => [...prev, option]);
    setStep((s) => s + 1);
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 py-8 shadow-2xl ring-1 ring-white/10 sm:rounded-3xl sm:p-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {confettiDots.map((d, i) => (
          <span key={i} className="absolute rounded-full opacity-80" style={{ top: d.top, left: d.left, width: d.size, height: d.size, backgroundColor: d.color }} />
        ))}
        <Heart className="absolute left-[18%] top-[22%] h-3 w-3 fill-rose-500 text-rose-500 opacity-70" />
        <Heart className="absolute right-[20%] top-[30%] h-4 w-4 fill-rose-500 text-rose-500 opacity-60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-lg text-center">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-400">Soru {step + 1} / {quizQuestions.length}</p>
              <h3 className="mully-font-display mt-4 text-xl font-medium leading-snug text-white sm:text-2xl">{quizQuestions[step].question}</h3>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2">
                {quizQuestions[step].options.map((opt) => (
                  <motion.button key={opt} type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => pickAnswer(opt)} className="min-h-[52px] rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-base font-medium text-white backdrop-blur-sm transition hover:border-pink-500/50 hover:bg-white/10 sm:rounded-3xl sm:px-5 sm:text-sm">
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <p className="mully-font-display text-3xl text-white sm:text-5xl">It&apos;s a Match!</p>
              <p className="mt-5 text-xl font-semibold text-white sm:mt-6 sm:text-2xl">Mully ile %99 uyumlusunuz!</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
                {answers.length > 0 ? `"${answers[answers.length - 1]}" tercihiniz Mully'nin kalbine dokundu.` : "Mully sizin için biçilmiş kaftan."}
              </p>
              <motion.button
                type="button"
                onClick={onBuy}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex w-full min-h-[52px] items-center justify-center gap-2 rounded-full mully-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-lg shadow-black/10 sm:w-auto sm:text-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                Şimdi Sepete Ekle
              </motion.button>
              <button type="button" onClick={() => { setStep(0); setAnswers([]); }} className="mt-4 block w-full text-xs text-gray-500 hover:text-gray-300 hover:underline">
                Testi tekrarla
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function HeroSection({ mapSlot }: { mapSlot?: ReactNode }) {
  const { openPreparing } = useBuyModal();

  return (
    <div className="relative min-h-screen mully-gradient-page text-[var(--mully-text)]">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-30 opacity-[0.04]" style={{ backgroundImage: GRAIN_BG, backgroundSize: "128px 128px" }} />

      {/* StorySection page.tsx'te; TrustSection match slider altında */}

      <TraitsShowcase />

      {/* 5 — MULLY'NİN SIRRI */}
      <section id="sirlar" className="mx-auto max-w-6xl px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-10 md:mb-14">
          <p className="mully-section-label">Görünmez özellikler</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Mully&apos;nin Sırrı</h2>
          <p className="mt-4 max-w-xl text-[var(--mully-text-muted)]">Yakından bakın.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <MullySecrets />
        </motion.div>
      </section>
      {/* 3 — UYUM TESTİ */}
      <section id="uyum" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10 md:pb-32">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-10 text-center md:mb-14">
          <p className="mully-section-label text-center">Eşleşme testi</p>
          <h2 className="mt-3 text-center text-3xl font-semibold sm:text-4xl">Mully ile Uyumunu Keşfet</h2>
          <p className="mx-auto mt-4 max-w-md text-center text-[var(--mully-text-muted)]">3 kısa soru — Mully sizin için doğru ev arkadaşı mı?</p>
        </motion.div>
        <CompatibilityQuiz onBuy={openPreparing} />
      </section>

      {mapSlot ?? <TurkeyMap />}

      {/* Match Slider — footer üstü */}
      <section className="mx-auto max-w-6xl px-6 pb-16 max-sm:px-3 max-sm:pb-12 max-sm:pt-6 md:px-10 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <MatchHeroSlider onBuy={openPreparing} />
        </motion.div>
      </section>

      <TrustSection />

      <footer className="border-t border-[var(--mully-ring)] mully-bg-secondary/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row md:px-10">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">Mully</p>
            <p className="mt-1 text-sm text-[var(--mully-text-muted)]">Evinizin ev arkadaşı</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-white/10 bg-white/5 p-3 text-[var(--mully-text-muted)] transition hover:bg-white/10 hover:text-white"><InstagramIcon className="h-5 w-5" /></a>
            <a href="mailto:hello@mully.com" aria-label="E-posta" className="rounded-full border border-white/10 bg-white/5 p-3 text-[var(--mully-text-muted)] transition hover:bg-white/10 hover:text-white"><Mail className="h-5 w-5" /></a>
            <a href="tel:+905551234567" aria-label="Telefon" className="rounded-full border border-white/10 bg-white/5 p-3 text-[var(--mully-text-muted)] transition hover:bg-white/10 hover:text-white"><Phone className="h-5 w-5" /></a>
          </div>
          <div className="text-center text-sm text-[var(--mully-text-muted)] md:text-right">
            <p>hello@mully.com</p>
            <p className="mt-1">+90 555 123 45 67</p>
          </div>
        </div>
        <div className="py-6 text-center text-xs text-[var(--mully-text-muted)]/70">© {new Date().getFullYear()} Mully. Tüm hakları saklıdır.</div>
      </footer>
    </div>
  );
}
