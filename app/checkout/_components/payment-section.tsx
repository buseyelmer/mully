"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, CreditCard } from "lucide-react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { bankTransferDetails } from "@/lib/checkout/bank-details";
import type { CheckoutFormValues, PaymentMethod } from "@/lib/checkout/schema";
import { FormField } from "./form-field";

type PaymentSectionProps = {
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
};

const methods: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: "card", label: "Kredi Kartı", icon: CreditCard },
  { id: "transfer", label: "Havale / EFT", icon: Building2 },
];

export function PaymentSection({
  method,
  onMethodChange,
  register,
  errors,
}: PaymentSectionProps) {
  return (
    <section className="space-y-5">
      <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-stone-500">
        Ödeme yöntemi
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {methods.map(({ id, label, icon: Icon }) => {
          const active = method === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onMethodChange(id)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition ${
                active
                  ? "border-rose-500/50 bg-white/10 text-white shadow-md shadow-rose-500/10"
                  : "border-white/15 bg-white/5 text-stone-300 hover:border-white/25 hover:bg-white/10"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0 text-[var(--mully-accent)]" />
              {label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {method === "card" ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
          >
            <FormField
              label="Kart üzerindeki isim"
              autoComplete="cc-name"
              {...register("cardHolder")}
              error={errors.cardHolder?.message}
            />
            <FormField
              label="Kart numarası"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              {...register("cardNumber")}
              error={errors.cardNumber?.message}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Son kullanma"
                placeholder="AA/YY"
                autoComplete="cc-exp"
                maxLength={5}
                {...register("expiry")}
                error={errors.expiry?.message}
              />
              <FormField
                label="CVC"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="000"
                maxLength={4}
                {...register("cvc")}
                error={errors.cvc?.message}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="transfer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
          >
            <p className="text-sm text-stone-400">
              Siparişinizi tamamlamak için aşağıdaki hesaba havale/EFT yapabilirsiniz.
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-stone-500">Banka</dt>
                <dd className="text-right font-medium text-white">{bankTransferDetails.bankName}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-stone-500">Hesap sahibi</dt>
                <dd className="text-right font-medium text-white">
                  {bankTransferDetails.accountHolder}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-stone-500">Şube</dt>
                <dd className="text-right font-medium text-white">{bankTransferDetails.branch}</dd>
              </div>
              <div>
                <dt className="text-stone-500">IBAN</dt>
                <dd className="mt-1 break-all font-mono text-[13px] text-rose-300">
                  {bankTransferDetails.iban}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-stone-500">{bankTransferDetails.note}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
