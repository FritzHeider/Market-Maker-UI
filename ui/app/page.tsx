// Enhanced Botsensai Landing Page with Dashboard Panel Upgrade
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import plans from "@/lib/plans";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import PriceChart from "@/components/ui/PriceChart";
import MarketTicker from "@/components/ui/MarketTicker";
import StrategySelector from "@/components/ui/StrategySelector";
import PortfolioPanel from "@/components/ui/PortfolioPanel";
import LoginButton from "@/components/ui/LoginButton";
import OrderPanel from "@/components/ui/OrderPanel";

const LottieWrapper = dynamic(() => import("@/components/ui/LottieWrapper"), { ssr: false });

// Consider fetching this from CMS or external config
const floatingCharts = (typeof window !== "undefined" && (window as any).__BOTSENSAI_CHARTS__) || [
  "/svg/chart-line-1.svg",
  "/svg/chart-line-2.svg",
  "/svg/chart-bars.svg"
];

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLottie, setShowLottie] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const pricingRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: pricingRef, offset: ["start end", "end start"] });

  const yTransform = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1600);
    const el = document.querySelector("#hero-animation");
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setShowLottie(true);
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (val) => {
    setShowHeader(val > 80);
  });

  const scrollToPricing = useCallback(() => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-x-hidden relative font-inter">
  <div className="p-4 text-right">
    <LoginButton />
  </div>

      {/* Real-time Dashboard Section */}
      <section className="bg-gray-950 py-24 px-6 sm:px-12">
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
