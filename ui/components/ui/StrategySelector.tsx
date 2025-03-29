import React from "react";

export default function StrategySelector() {
  return (
    <div className="bg-black text-white p-4 rounded-xl shadow space-y-2">
      <h2 className="text-lg font-bold">Strategy Selector</h2>
      <select className="w-full p-2 bg-gray-800 rounded">
        <option value="spread">Fixed Spread</option>
        <option value="ai">AI Optimized</option>
        <option value="arbitrage">Arbitrage</option>
      </select>
    </div>
  );
}
