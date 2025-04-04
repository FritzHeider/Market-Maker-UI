"use client";

import React, { useState } from "react";
import { useWebSocket } from "@/lib/websocket";
import { motion } from "framer-motion";
import { ReadyState } from "react-use-websocket";
import { Wifi, WifiOff } from "lucide-react";

// ✅ Define incoming message type
type TickerMessage = {
  last: string; // e.g., "27854.29"
};

export default function MarketTicker() {
  const [price, setPrice] = useState("0.00");
  const [wsStatus, setWsStatus] = useState<ReadyState>(ReadyState.CONNECTING);

  useWebSocket<TickerMessage>(
    `${process.env.NEXT_PUBLIC_API_URL?.replace("http", "ws")}/ws/ticker`,
    (data) => {
      if (data && typeof data.last === "string") {
        setPrice(parseFloat(data.last).toFixed(2));
      }
    },
    {
      onOpen: () => setWsStatus(ReadyState.OPEN),
      onClose: () => setWsStatus(ReadyState.CLOSED),
    }
  );

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-blue-300">BTC/USDT Ticker</h2>
        <motion.p
          key={price}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl mt-2 font-mono"
        >
          ${price}
        </motion.p>
      </div>

      {/* Optional: WebSocket Status Indicator */}
      <div className="text-xs text-gray-400 flex items-center gap-1">
        {wsStatus === ReadyState.OPEN ? (
          <>
            <Wifi className="w-4 h-4 text-green-400" />
            <span>Live</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 text-yellow-400" />
            <span>Offline</span>
          </>
        )}
      </div>
    </div>
  );
}
