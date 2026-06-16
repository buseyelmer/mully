"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  checkoutSchema,
  type CheckoutFormValues,
  type PaymentMethod,
} from "@/lib/checkout/schema";
import { FormField, FormTextarea } from "./_components/form-field";
import { PaymentSection } from "./_components/payment-section";

export default function CheckoutForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      district: "",
      address: "",
      paymentMethod: "card",
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setValue("paymentMethod", method, { shouldValidate: true });
    if (method === "transfer") {
      setValue("cardHolder", "");
      setValue("cardNumber", "");
      setValue("expiry", "");
      setValue("cvc", "");
    }
  };

  const onSubmit = async (values: CheckoutFormValues) => {
    setErrorMessage(null);

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        router.push("/checkout/success");
        return;
      }

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      setErrorMessage(
        data?.message ?? "Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.",
      );
    } catch {
      setErrorMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-[40px] border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl shadow-black/40 sm:p-8"
      noValidate
    >
      <fieldset disabled={isSubmitting} className="space-y-8 disabled:opacity-80">
        <section className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-stone-500">
            Teslimat adresi
          </h2>
          <FormField
            label="Ad Soyad"
            autoComplete="name"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
          <FormField
            label="Telefon"
            type="tel"
            autoComplete="tel"
            placeholder="05XX XXX XX XX"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Şehir"
              autoComplete="address-level1"
              {...register("city")}
              error={errors.city?.message}
            />
            <FormField
              label="İlçe"
              autoComplete="address-level2"
              {...register("district")}
              error={errors.district?.message}
            />
          </div>
          <FormTextarea
            label="Tam adres"
            autoComplete="street-address"
            placeholder="Mahalle, sokak, bina no, daire..."
            {...register("address")}
            error={errors.address?.message}
          />
        </section>

        <input type="hidden" {...register("paymentMethod")} />

        <PaymentSection
          method={paymentMethod}
          onMethodChange={handlePaymentMethodChange}
          register={register}
          errors={errors}
        />
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-center text-sm text-stone-500 transition hover:text-stone-300"
        >
          ← Alışverişe dön
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full mully-accent-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "İşleniyor..."
            : paymentMethod === "card"
              ? "Ödemeyi Tamamla"
              : "Siparişi Onayla"}
        </button>
      </div>

      {errorMessage && (
        <p
          className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-300"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
