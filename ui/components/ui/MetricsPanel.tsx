"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { placeOrder } from "@/lib/api";
import type { OrderPayload, OrderType } from "@/lib/types";

type Props = {
  symbol?: string;
  marketPrice?: number; // Optional: passed in from parent or live ticker
};

export default function OrderPanel({ symbol = "BTC/USDT", marketPrice }: Props) {
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [loading, setLoading] = useState<"buy" | "sell" | null>(null);

  const { notify, error } = useToast();

  const handleOrder = async (side: "buy" | "sell") => {
    const amt = parseFloat(amount.trim());
    const price =
      orderType === "limit" ? parseFloat(limitPrice.trim()) : undefined;

    if (!amount || isNaN(amt) || amt <= 0) {
      error("Please enter a valid amount greater than 0.");
      return;
    }

    if (orderType === "limit" && (isNaN(price!) || price! <= 0)) {
      error("Please enter a valid limit price.");
      return;
    }

    const payload: OrderPayload = {
      side,
      amount: amt,
      limitPrice: price,
      type: orderType,
      symbol,
    };

    setLoading(side);

    try {
      await toast.promise(placeOrder(payload), {
        loading: `Placing ${side.toUpperCase()} order...`,
        success: `✅ ${side.toUpperCase()} order placed for ${amt} ${symbol}`,
        error: "❌ Failed to place order",
      });

      notify({
        title: "Order Submitted",
        description: `${side.toUpperCase()} ${amt} ${symbol}`,
        duration: 4000,
      });

      setAmount("");
      setLimitPrice("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl shadow space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center">Order Panel</h2>

      <div className="space-y-2">
        <label className="block">
          <span className="text-sm text-gray-400">Order Type</span>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as OrderType)}
            className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700"
          >
            <option value="market">Market</option>
            <option value="limit">Limit</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-gray-400">Amount</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700"
            inputMode="decimal"
            type="number"
            min="0"
          />
        </label>

        {orderType === "limit" && (
          <label className="block">
            <span className="text-sm text-gray-400">Limit Price</span>
            <input
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder="Enter limit price"
              className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700"
              inputMode="decimal"
              type="number"
              min="0"
            />
            {marketPrice && (
              <p className="text-xs text-gray-500 mt-1">
                Market: ${marketPrice.toFixed(2)}
              </p>
            )}
          </label>
        )}
      </div>

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
