// pages/dashboard.tsx
import MarketTicker from "@/components/ui/MarketTicker";
import StrategySelector from "@/components/ui/StrategySelector";
import OrderPanel from "@/components/ui/OrderPanel";
import PortfolioPanel from "@/components/ui/PortfolioPanel";
import PriceChart from "@/components/ui/PriceChart";
import Link from "next/link";

export default function Dashboard() {
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
          <PortfolioPanel />
        </div>
      </div>
    </div>
  );
}