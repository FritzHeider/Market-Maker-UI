"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { placeOrder } from "@/lib/api";
import type { OrderPayload } from "@/lib/types";

export default function OrderPanel() {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [loading, setLoading] = useState<"buy" | "sell" | null>(null);

  const handleOrder = async (side: "buy" | "sell") => {
    const amt = parseFloat(amount);
    const price = limitPrice ? parseFloat(limitPrice) : undefined;

    if (!amount || isNaN(amt) || amt <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setLoading(side);

    try {
      const payload: OrderPayload = {
        side,
        amount: amt,
        limitPrice: price,
        symbol: "BTC/USDT", // Update dynamically if needed
      };

      const result = await placeOrder(payload);

      if (result.error) throw new Error(result.error);
      if (!result.data?.success) throw new Error("Unknown order error");

      toast({
        title: "Order Placed",
        description: `✅ ${side.toUpperCase()} order for ${amt} ${payload.symbol} submitted.`,
      });

      // Reset input fields
      setAmount("");
      setLimitPrice("");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred.";
      toast({
        title: "Order Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl shadow space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center">Order Panel</h2>

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        inputMode="decimal"
      />

      <input
        value={limitPrice}
        onChange={(e) => setLimitPrice(e.target.value)}
        placeholder="Limit Price (optional)"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        inputMode="decimal"
      />

      <div className="flex gap-3">
        <button
          disabled={loading === "buy"}
          onClick={() => handleOrder("buy")}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded text-white font-semibold disabled:opacity-50"
        >
          {loading === "buy" ? "Placing Buy..." : "Buy"}
        </button>

        <button
          disabled={loading === "sell"}
          onClick={() => handleOrder("sell")}
          className="w-full bg-red-600 hover:bg-red-700 p-2 rounded text-white font-semibold disabled:opacity-50"
        >
          {loading === "sell" ? "Placing Sell..." : "Sell"}
        </button>
      </div>
    </div>
  );
}
