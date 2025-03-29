// File: /app/dashboard/page.tsx

import MarketTicker from "@/components/ui/MarketTicker";
import OrderPanel from "@/components/ui/OrderPanel";
import PortfolioPanel from "@/components/ui/PortfolioPanel";
import StrategySelector from "@/components/ui/StrategySelector";
import PriceChart from "@/components/ui/PriceChart";
import MetricsPanel from "@/components/ui/MetricsPanel";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-6 space-y-12">
      {/* Dashboard Hero Card with Real-Time Metrics */}
      <section className="rounded-2xl bg-gradient-to-br from-blue-800 to-blue-600 p-8 shadow-xl">
        <h1 className="text-4xl font-bold mb-4">📊 Dashboard Overview</h1>
        <p className="text-lg text-blue-100 mb-6">
          Your real-time trading analytics, portfolio health, and AI strategy panels all live here.
        </p>
        <MetricsPanel />
      </section>

      {/* Main Analytics + Trading Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <MarketTicker />
          <PriceChart />
          <StrategySelector />
        </div>
        <div className="col-span-1 space-y-6">
          <OrderPanel />
          <PortfolioPanel />
        </div>
      </section>
    </main>
  );
}
