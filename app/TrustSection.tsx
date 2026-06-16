"use client";

import { motion } from "framer-motion";

function MullyFace({ className }: { className?: string }) {
  return (
    <g className={className}>
      <circle cx="24" cy="24" r="22" fill="#292524" stroke="#f43f5e" strokeWidth="1.5" />
      <circle cx="17" cy="21" r="2.2" fill="#fafafa" />
      <circle cx="31" cy="21" r="2.2" fill="#fafafa" />
      <path
        d="M16 30 Q24 38 32 30"
        fill="none"
        stroke="#fafafa"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

function MullyTruckIcon() {
  return (
    <svg viewBox="0 0 72 48" className="h-12 w-[4.5rem] sm:h-14 sm:w-20" aria-hidden>
      <rect x="4" y="18" width="28" height="18" rx="4" fill="#1c1917" stroke="#f43f5e" strokeWidth="1.2" />
      <path d="M32 22h14l8 10v4H32z" fill="#1c1917" stroke="#f43f5e" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="18" cy="38" r="4" fill="#292524" stroke="#a3a3a3" strokeWidth="1" />
      <circle cx="46" cy="38" r="4" fill="#292524" stroke="#a3a3a3" strokeWidth="1" />
      <g transform="translate(44, 2) scale(0.55)">
        <MullyFace />
      </g>
    </svg>
  );
}

function MullyReturnIcon() {
  return (
    <svg viewBox="0 0 72 48" className="h-12 w-[4.5rem] sm:h-14 sm:w-20" aria-hidden>
      <path
        d="M36 8 C22 8 12 18 12 28 C12 34 15 39 20 42"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 28 L8 24 L12 20" fill="none" stroke="#C9BBA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M36 40 C50 40 60 30 60 20 C60 14 57 9 52 6"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M60 20 L64 24 L60 28" fill="none" stroke="#C9BBA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(22, 10) scale(0.7)">
        <MullyFace />
      </g>
    </svg>
  );
}

const trustItems = [
  {
    Icon: MullyTruckIcon,
    title: "Ücretsiz Kargo",
    text: "Mully kapınıza gülümseyerek gelir — kargo ücreti yok.",
  },
  {
    Icon: MullyReturnIcon,
    title: "14 Gün İade",
    text: "Uyum sağlamazsa 14 gün içinde kolayca iade edebilirsiniz.",
  },
] as const;

export default function TrustSection() {
  return (
    <section id="guven" className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 md:px-10 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center md:mb-16"
      >
        <p className="mully-section-label">Gülümseme garantisi</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Güvenin Neşeli Hali
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[var(--mully-text-muted)]">
          Standart ikonlar yerine Mully&apos;nin yüzü — alışverişiniz kadar sıcak garantiler.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {trustItems.map(({ Icon, title, text }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ y: -4 }}
            className="relative flex flex-col items-center overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black p-8 text-center shadow-2xl sm:p-10"
          >
            <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full mully-accent-gradient opacity-20 blur-2xl" />
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/10 bg-white/5">
              <Icon />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 max-w-xs leading-relaxed text-[var(--mully-text-muted)]">{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
