// File: /app/dashboard/page.tsx

import MarketTicker from "@/components/ui/MarketTicker";
import OrderPanel from "@/components/ui/OrderPanel";
import PortfolioPanel from "@/components/ui/PortfolioPanel";
import StrategySelector from "@/components/ui/StrategySelector";
import PriceChart from "@/components/ui/PriceChart";


export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="col-span-2 space-y-6">
        <MarketTicker />
        <PriceChart />
        <StrategySelector />
      </div>
      <div className="col-span-1 space-y-6">
        <OrderPanel />
        <PortfolioPanel />
      </div>
    </div>
    <main className="min-h-screen px-6 py-12 text-white bg-gray-950">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <p className="text-lg text-gray-400">Your real-time trading analytics and tools will appear here.</p>
    </main>
  );
}
