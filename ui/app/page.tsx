// Enhanced Botsensai Landing Page
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import plans from "@/lib/plans";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";

const LottieWrapper = dynamic(() => import("@/components/ui/LottieWrapper"), { ssr: false });

// Consider fetching this from CMS or external config
const floatingCharts = (typeof window !== "undefined" && window.__BOTSENSAI_CHARTS__) || [
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

      {showIntro && (
        <motion.div
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.svg
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-24 h-24 text-white"
          >
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="5" />
            <text x="50%" y="54%" textAnchor="middle" fill="white" fontSize="20" dy=".3em">B</text>
          </motion.svg>
        </motion.div>
      )}

      <header className={`fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-sm ${showHeader ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">Botsensai</Link>
          <nav className="space-x-6 text-white font-medium">
            <button onClick={scrollToPricing} className="hover:text-blue-400 transition">Pricing</button>
            <Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          </nav>
        </div>
      </header>

      <section className="relative w-full h-screen pt-24">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20 z-0">
          <source src="/videos/looping.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 pointer-events-none">
          {floatingCharts.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Floating chart"
              width={i === 1 ? 120 : 80}
              height={i === 1 ? 120 : 80}
              className={`absolute opacity-10 ${i % 2 === 0 ? "top-20 left-10" : "bottom-24 right-12"} animate-float-slow`}
            />
          ))}
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 sm:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-xl"
          >
            🚀 Smarter Trading with Botsensai
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10"
          >
            Real-time data, AI-driven strategies, and a trading experience built for performance.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button onClick={scrollToPricing} className="cta-button">Explore Pricing</button>
            <Link href="/dashboard" className="cta-button bg-blue-600 hover:bg-blue-700">Dashboard</Link>
          </motion.div>
          <div id="hero-animation" className="mt-12 flex justify-center">
            {showLottie && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <LottieWrapper src="/animations/Animation - 1743222346036.json" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        ref={pricingRef}
        className="relative bg-white dark:bg-gray-900 py-24 px-6 sm:px-12 text-gray-900 dark:text-white overflow-hidden"
      >
        <motion.div style={{ y: yTransform, opacity: opacityTransform }} className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            No hidden fees. No gimmicks. Just scalable plans built for every trader.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                className="pricing-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6, type: "spring" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-blue-600 mb-4">{plan.price}</p>
                <ul className="text-left text-sm space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500">✔</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className="card-button">Get Started</button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Features />
      <About />
      <Footer />
    </main>
  );
}
