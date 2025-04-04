"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { placeOrder } from "@/lib/api";
import type { OrderPayload } from "@/lib/types";

type Props = {
  symbol?: string; // Supports dynamic trading pair input
};

export default function OrderPanel({ symbol = "BTC/USDT" }: Props) {
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [loading, setLoading] = useState<"buy" | "sell" | null>(null);

  const { notify, success, error } = useToast();

  const handleOrder = async (side: "buy" | "sell") => {
    const amt = parseFloat(amount.trim());
    const price = limitPrice ? parseFloat(limitPrice.trim()) : undefined;

    if (!amount || isNaN(amt) || amt <= 0) {
      error("Please enter a valid amount greater than 0.");
      return;
    }

    setLoading(side);

    try {
      const payload: OrderPayload = {
        side,
        amount: amt,
        limitPrice: price,
        symbol,
      };

      const result = await placeOrder(payload);

      if (result.error) throw new Error(result.error);
      if (!result.data?.success) throw new Error("Order failed. Please try again.");

      success(`${side.toUpperCase()} order placed for ${amt} ${symbol}`);

      notify({
        title: "📦 Order Submitted",
        description: `${side.toUpperCase()} ${amt} ${symbol}`,
        duration: 4000,
      });

      // Reset form
      setAmount("");
      setLimitPrice("");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred.";
      error(message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl shadow space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center">Order Panel</h2>

      <label className="block">
        <span className="text-sm text-gray-400">Amount</span>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          inputMode="decimal"
          type="number"
          min="0"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-400">Limit Price (optional)</span>
        <input
          value={limitPrice}
          onChange={(e) => setLimitPrice(e.target.value)}
          placeholder="Enter price or leave blank"
          className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          inputMode="decimal"
          type="number"
          min="0"
        />
      </label>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={loading === "buy"}
          onClick={() => handleOrder("buy")}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded text-white font-semibold transition disabled:opacity-50"
        >
          {loading === "buy" ? "Placing Buy..." : "Buy"}
        </button>

        <button
          type="button"
          disabled={loading === "sell"}
          onClick={() => handleOrder("sell")}
          className="w-full bg-red-600 hover:bg-red-700 p-2 rounded text-white font-semibold transition disabled:opacity-50"
        >
          {loading === "sell" ? "Placing Sell..." : "Sell"}
        </button>
      </div>
    </div>
  );
}
