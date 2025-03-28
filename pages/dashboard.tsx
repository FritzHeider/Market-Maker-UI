import dynamic from "next/dynamic";
import Link from "next/link";
import { fetchPortfolio } from "@/lib/api";
import { useEffect, useState } from "react";
import type { Portfolio } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

// Dynamically import UI components for SSR safety
const MarketTicker = dynamic(() => import("@/components/ui/MarketTicker"), { ssr: false });
const StrategySelector = dynamic(() => import("@/components/ui/StrategySelector"), { ssr: false });
const OrderPanel = dynamic(() => import("@/components/ui/OrderPanel"), { ssr: false });
const PriceChart = dynamic(() => import("@/components/ui/PriceChart"), { ssr: false });

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<Portfolio>({ balance: 0, pnl: 0 });

  useEffect(() => {
    fetchPortfolio().then(setPortfolio).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8 md:px-10">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">📈 Trading Dashboard</h1>
        <Link href="/">
          <button className="text-sm text-gray-400 hover:text-blue-400 transition">
            ← Back to Home
          </button>
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MarketTicker />
          <StrategySelector />
          <OrderPanel />
        </div>
        <div className="space-y-6">
          <PriceChart />
          <div className="bg-black p-4 rounded-xl shadow space-y-2">
            <h2 className="text-lg font-bold">Portfolio</h2>
            <div className="flex justify-between">
              <span>Balance</span>
              <span>{formatCurrency(portfolio.balance)}</span>
            </div>
            <div className="flex justify-between">
              <span>PnL</span>
              <span className={portfolio.pnl >= 0 ? "text-green-400" : "text-red-400"}>
                {portfolio.pnl >= 0 ? "+" : ""}{formatCurrency(portfolio.pnl)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
