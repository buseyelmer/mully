import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sipariş Alındı | Mully",
};

export default function CheckoutSuccessPage() {
  return (
    <main className="mully-gradient-page flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:pt-28">
      <div className="max-w-md rounded-[40px] border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl shadow-black/40 sm:p-10">
        <p className="mully-font-display text-2xl text-white sm:text-3xl">
          Siparişiniz alındı
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">
          Mully yola çıkmaya hazırlanıyor. Onay e-postası kısa süre içinde size
          ulaşacak.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full mully-accent-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:brightness-110"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </main>
  );
}
