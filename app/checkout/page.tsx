import type { Metadata } from "next";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Ödeme | Mully",
  description: "Mully siparişinizi tamamlayın.",
};

export default function CheckoutPage() {
  return (
    <main className="mully-gradient-page min-h-screen pb-16 pt-24 sm:pt-28">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <header className="mb-8 text-center sm:mb-10">
          <p className="mully-section-label">Sipariş</p>
          <h1 className="mully-font-display mt-2 text-2xl font-medium text-white sm:text-3xl">
            Ödeme
          </h1>
          <p className="mt-2 text-sm text-stone-400">
            Teslimat bilgilerinizi girin ve ödeme yöntemini seçin.
          </p>
        </header>
        <CheckoutForm />
      </div>
    </main>
  );
}
