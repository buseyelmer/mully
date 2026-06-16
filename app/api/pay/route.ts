import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/checkout/schema";
import { initiateGarantiPayment } from "@/lib/garanti-payment";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Lütfen tüm alanları kontrol edin." },
        { status: 400 },
      );
    }

    const values = parsed.data;

    if (values.paymentMethod === "card") {
      const result = await initiateGarantiPayment(values);

      if (!result.ok) {
        return NextResponse.json({ message: result.message }, { status: 402 });
      }

      return NextResponse.json(
        { transactionId: result.transactionId },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "Havale/EFT siparişi oluşturuldu." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Sunucu hatası. Lütfen daha sonra tekrar deneyin." },
      { status: 500 },
    );
  }
}
