import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload?.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  console.info("subscription", payload);

  return NextResponse.json({ ok: true });
}
