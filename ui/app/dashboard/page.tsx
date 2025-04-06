"use client";

import { useSystemToast } from "@/components/ui/toaster";
import MarketTicker from "@/components/ui/MarketTicker";
import OrderPanel from "@/components/ui/OrderPanel";
import PortfolioPanel from "@/components/ui/PortfolioPanel";
import StrategySelector from "@/components/ui/StrategySelector";
import PriceChart from "@/components/ui/PriceChart";
import MetricsPanel from "@/components/ui/MetricsPanel";
import Link from "next/link";

export default function Dashboard() {
  useSystemToast(); // 🔔 Connects WebSocket-based toasts

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      
      {/* Sticky Dashboard Header */}
      <header className="sticky top-0 z-40 w-full bg-gray-900/90 backdrop-blur border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">📈 Botsensai Dashboard</h1>
          <nav className="space-x-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/dashboard" className="text-blue-400">Dashboard</Link>
            <Link href="/settings" className="hover:text-blue-400 transition">Settings</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 space-y-12">
        
        {/* Dashboard Hero Card */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-800 to-blue-600 p-8 shadow-xl animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">📊 Real-Time Insights</h2>
          <p className="text-lg text-blue-100 mb-6">
            Stay ahead with AI-backed metrics, live order flow, and real-time price action.
          </p>
          <MetricsPanel />
        </section>

        {/* Grid Layout */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left side: market views */}
          <div className="col-span-2 space-y-6">
            <div className="rounded-xl bg-gray-900 p-4 shadow-md animate-slide-in">
              <MarketTicker />
            </div>
            <div className="rounded-xl bg-gray-900 p-4 shadow-md animate-slide-in">
              <PriceChart />
            </div>
            <div className="rounded-xl bg-gray-900 p-4 shadow-md animate-slide-in">
              <StrategySelector />
            </div>
          </div>

          {/* Right side: trading + portfolio */}
          <div className="col-span-1 space-y-6">
            <div className="rounded-xl bg-gray-900 p-4 shadow-md animate-slide-in">
              <OrderPanel />
            </div>
            <div className="rounded-xl bg-gray-900 p-4 shadow-md animate-slide-in">
              <PortfolioPanel />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        Botsensai © {new Date().getFullYear()} — Empowering smart traders with real-time AI.
      </footer>
    </main>
  );
}
