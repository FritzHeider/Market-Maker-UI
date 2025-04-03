import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { side, amount, limitPrice } = body;

    if (
      !["buy", "sell"].includes(side) ||
      typeof amount !== "number" ||
      amount <= 0
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // TODO: Add real logic here (e.g., call Binance)
    console.log("✅ Order received:", { side, amount, limitPrice });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Order error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
