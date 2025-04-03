"use client";

import { usePortfolio } from "@/lib/hooks/usePortfolio";

export default function PortfolioCard() {
  const { data, isLoading, error } = usePortfolio();

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow text-white space-y-4 w-full max-w-sm sm:max-w-md md:max-w-full">
      <h3 className="text-md font-semibold">💰 Portfolio</h3>

      {isLoading && (
        <div className="space-y-2 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/2" />
          <div className="h-4 bg-gray-700 rounded w-1/3" />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">
          {(error as Error).message || "Failed to load portfolio"}
        </p>
      )}

      {data && (
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Balance</span>
            <span className="text-blue-400">${data.balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">PnL</span>
            <span
              className={`flex items-center gap-1 ${
                data.pnl >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {data.pnl >= 0 ? "▲" : "▼"} ${data.pnl.toFixed(2)}
            </span>
          </div>
          {data.timestamp && (
            <p className="text-xs text-gray-500">
              Last updated:{" "}
              {new Date(data.timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
