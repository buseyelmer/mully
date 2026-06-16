import type { CheckoutFormValues } from "./checkout/schema";

export type GarantiPaymentResult =
  | { ok: true; transactionId: string }
  | { ok: false; message: string };

/**
 * Garanti BBVA ödeme entegrasyonu buraya bağlanacak.
 * Şimdilik test akışı için mock başarı döner.
 */
export async function initiateGarantiPayment(
  values: CheckoutFormValues,
): Promise<GarantiPaymentResult> {
  void values;

  return {
    ok: true,
    transactionId: `MUL-${Date.now()}`,
  };
}
