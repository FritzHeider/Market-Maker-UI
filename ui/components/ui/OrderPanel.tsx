"use client";

import React, { useState } from "react";
import { placeOrder } from "@/lib/api";
import { usePortfolio } from "@/lib/hooks/usePortfolio";
import type { OrderPayload, OrderType } from "@/lib/types";
import { useToast } from "./use-toast";

type Props = {
  symbol?: string;
  marketPrice?: number;
};

export default function OrderPanel({ symbol = "BTC/USDT", marketPrice }: Props) {
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [loading, setLoading] = useState<"buy" | "sell" | null>(null);

  // Destructure promise and error functions from the toast hook.
  const { promise, error: toastError } = useToast();
  const { data: portfolio } = usePortfolio();

  const handleQuickFill = (percent: number) => {
    if (!portfolio?.balance) return;
    setAmount(((portfolio.balance * percent) / 100).toFixed(4));
  };

  const handleOrder = async (side: "buy" | "sell") => {
    const amt = parseFloat(amount.trim());
    const price = orderType === "limit" ? parseFloat(limitPrice.trim()) : undefined;
    const tp = takeProfit ? parseFloat(takeProfit.trim()) : undefined;
    const sl = stopLoss ? parseFloat(stopLoss.trim()) : undefined;

    if (!amount || isNaN(amt) || amt <= 0) {
      toastError("Enter a valid amount greater than 0.");
      return;
    }

    if (orderType === "limit" && (isNaN(price!) || price! <= 0)) {
      toastError("Enter a valid limit price.");
      return;
    }

    if (tp !== undefined && (isNaN(tp) || tp <= 0)) {
      toastError("Take Profit must be a valid number.");
      return;
    }

    if (sl !== undefined && (isNaN(sl) || sl <= 0)) {
      toastError("Stop Loss must be a valid number.");
      return;
    }

    if (portfolio && amt > portfolio.balance) {
      toastError("Insufficient balance.");
      return;
    }

    const payload: OrderPayload = {
      side,
      amount: amt,
      limitPrice: price,
      type: orderType,
      symbol,
      takeProfit: tp,
      stopLoss: sl,
    };

    setLoading(side);

    try {
      await promise(placeOrder(payload), {
        loading: `Placing ${side.toUpperCase()} order...`,
        success: `✅ ${side.toUpperCase()} ${amt} ${symbol} placed`,
        error: "❌ Failed to place order",
      });

      // Optionally, you can add additional notifications here.
      {/* 
      Uncomment and adjust if you want an extra notification:
      notify(`TP: ${tp ?? "none"} / SL: ${sl ?? "none"}`, { duration: 4000 });
      */}

      // Reset the input fields after a successful order.
      setAmount("");
      setLimitPrice("");
      setTakeProfit("");
      setStopLoss("");
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
          {portfolio && (
            <div className="flex justify-between mt-2 gap-2">
              {[25, 50, 100].map((p) => (
                <button
                  key={p}
                  onClick={() => handleQuickFill(p)}
                  className="text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition"
                >
                  {p}%
                </button>
              ))}
              <p className="text-xs text-right text-gray-500 ml-auto">
                Balance: ${portfolio.balance.toFixed(2)}
              </p>
            </div>
          )}
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
        <div className="flex gap-3">
          <label className="w-1/2">
            <span className="text-sm text-gray-400">Take Profit (TP)</span>
            <input
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              placeholder="TP price"
              className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700"
              inputMode="decimal"
              type="number"
              min="0"
            />
          </label>
          <label className="w-1/2">
            <span className="text-sm text-gray-400">Stop Loss (SL)</span>
            <input
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="SL price"
              className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700"
              inputMode="decimal"
              type="number"
              min="0"
            />
          </label>
        </div>
      </div>
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
