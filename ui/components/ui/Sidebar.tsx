"use client";

import { usePortfolio } from "@/lib/hooks/usePortfolio";

export default function Sidebar() {
  const { data, isLoading, error } = usePortfolio();

  return (
    <aside className="bg-gray-900 text-white p-4 md:p-6 rounded-xl shadow space-y-6 w-full max-w-xs">
      <div>
        <h2 className="text-lg font-bold mb-2">💼 Account Overview</h2>

        {isLoading && <p className="text-sm text-gray-400">Loading...</p>}

        {error && (
          <p className="text-sm text-red-500">
            {(error as Error).message || "Failed to load account data."}
          </p>
        )}

        {data && (
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Balance</span>
              <span>${data.balance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">PnL</span>
              <span
                className={
                  data.pnl >= 0 ? "text-green-400" : "text-red-400"
                }
              >
                {data.pnl >= 0 ? "+" : ""}
                ${data.pnl.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Optional Navigation or Actions */}
      <div className="border-t border-gray-700 pt-4 text-sm space-y-3">
        <button className="text-left w-full hover:text-blue-400 transition">
          ⚙️ Settings
        </button>
        <button className="text-left w-full hover:text-red-400 transition">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
