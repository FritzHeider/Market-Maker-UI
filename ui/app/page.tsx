// Enhanced Botsensai Landing Page with Dashboard Panel Upgrade
"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";

import PriceChart from "@/components/ui/PriceChart";
import MarketTicker from "@/components/ui/MarketTicker";
import StrategySelector from "@/components/ui/StrategySelector";
import PortfolioPanel from "@/components/ui/PortfolioPanel";
import LoginButton from "@/components/ui/LoginButton";
import OrderPanel from "@/components/ui/OrderPanel";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

export default function LandingPage() {
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  const scrollToDashboard = useCallback(() => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-x-hidden relative font-inter">
      <div className="p-4 text-right">
        <LoginButton />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">AI Market Making Made Simple</h1>
        <p className="text-gray-400 max-w-2xl mb-8">
          Engage with real-time data and intelligent strategies to stay ahead of the market.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 rounded-md text-white w-full sm:w-auto"
          >
            Get Started
          </Link>
          <button
            onClick={scrollToDashboard}
            className="px-6 py-3 bg-gray-800 rounded-md text-white w-full sm:w-auto"
          >
            Learn More
          </button>
        </div>
        <div className="mt-8 w-full max-w-md">
          <NewsletterSignup />
        </div>
      </section>

      {/* Real-time Dashboard Section */}
      <section ref={dashboardRef} className="bg-gray-950 py-24 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Live Trading Dashboard Preview</h2>
          <p className="text-gray-400">Glance at your AI-powered trading cockpit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className="col-span-1 space-y-6">
            <div className="rounded-xl bg-gray-900 p-4 shadow-md animate-slide-in">
              <OrderPanel />
            </div>
            <div className="rounded-xl bg-gray-900 p-4 shadow-md animate-slide-in">
              <PortfolioPanel />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
