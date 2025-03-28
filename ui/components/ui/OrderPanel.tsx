import React from "react";
import { placeOrder } from "@/lib/api";
import type { Order } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

export default function SomeComponent() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Bot Deployed",
      description: "Your strategy is now live on Binance.",
      duration: 4000,
    });
  };

  return (
    <button onClick={handleClick} className="btn-primary">
      Deploy Bot
    </button>
  );
}

export default function OrderPanel() {
  return (
    <div className="bg-black text-white p-4 rounded-xl shadow space-y-2">
      <h2 className="text-lg font-bold">Order Panel</h2>
      <input placeholder="Amount" className="w-full p-2 rounded bg-gray-800" />
      <input
        placeholder="Limit Price (optional)"
        className="w-full p-2 rounded bg-gray-800"
      />
      <div className="flex gap-2">
        <button className="w-full bg-green-600 p-2 rounded text-white">
          Buy
        </button>
        <button className="w-full bg-red-600 p-2 rounded text-white">
          Sell
        </button>
      </div>
    </div>
  );
}
