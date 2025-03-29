"use client";
import React, { useState } from "react";
import { useWebSocket } from "@/lib/websocket";

export default function MarketTicker() {
  const [price, setPrice] = useState<string>("0.00");

  useWebSocket(
    `${process.env.NEXT_PUBLIC_API_URL?.replace("http", "ws")}/ws/ticker`,
    (data) => {
      if (data && data.last) {
        setPrice(parseFloat(data.last).toFixed(2));
      }
    },
  );

  return (
    <div className="bg-black text-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold">BTC/USDT Ticker</h2>
      <p className="text-2xl mt-2">${price}</p>
    </div>
  );
}
