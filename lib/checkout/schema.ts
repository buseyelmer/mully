import { z } from "zod";

export const paymentMethods = ["card", "transfer"] as const;
export type PaymentMethod = (typeof paymentMethods)[number];

export const checkoutSchema = z
  .object({
    fullName: z.string().trim().min(3, "Ad soyad en az 3 karakter olmalı"),
    phone: z
      .string()
      .trim()
      .min(10, "Geçerli bir telefon numarası girin")
      .regex(/^[\d\s+()-]+$/, "Geçerli bir telefon numarası girin"),
    city: z.string().trim().min(2, "Şehir gerekli"),
    district: z.string().trim().min(2, "İlçe gerekli"),
    address: z.string().trim().min(10, "Tam adres en az 10 karakter olmalı"),
    paymentMethod: z.enum(paymentMethods),
    cardHolder: z.string().optional(),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvc: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== "card") return;

    if (!data.cardHolder?.trim() || data.cardHolder.trim().length < 3) {
      ctx.addIssue({
        code: "custom",
        message: "Kart üzerindeki isim gerekli",
        path: ["cardHolder"],
      });
    }

    const digits = (data.cardNumber ?? "").replace(/\s/g, "");
    if (!/^\d{16}$/.test(digits)) {
      ctx.addIssue({
        code: "custom",
        message: "16 haneli kart numarası girin",
        path: ["cardNumber"],
      });
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiry ?? "")) {
      ctx.addIssue({
        code: "custom",
        message: "Son kullanma AA/YY formatında olmalı",
        path: ["expiry"],
      });
    }

    if (!/^\d{3,4}$/.test(data.cvc ?? "")) {
      ctx.addIssue({
        code: "custom",
        message: "Geçerli bir CVC girin",
        path: ["cvc"],
      });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
