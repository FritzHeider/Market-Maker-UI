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

// Lazy load Lottie animation
const LottieWrapper = dynamic(() => import("@/components/ui/LottieWrapper"), { ssr: false });

const floatingCharts = [
  "/svg/chart-line-1.svg",
  "/svg/chart-line-2.svg",
  "/svg/chart-bars.svg",
];

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLottie, setShowLottie] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const pricingRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: pricingRef,
    offset: ["start end", "end start"],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
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
    <main className="min-h-screen bg-gray-950 text-white overflow-x-hidden relative">

      {/* Intro Splash */}
      {showIntro && (
        <motion.div
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          aria-hidden="true"
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
            <text x="50%" y="54%" textAnchor="middle" fill="white" fontSize="20" dy=".3em">
              B
            </text>
          </motion.svg>
        </motion.div>
      )}

      {/* Top Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-sm transition-all duration-300 ${showHeader ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">Botsensai</Link>
          <nav className="space-x-6 text-white font-medium">
            <button onClick={scrollToPricing} className="hover:text-blue-400 transition">Pricing</button>
            <Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden pt-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        >
          <source src="/videos/looping.mp4" type="video/mp4" />
        </video>

        {/* Floating Visuals */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image
            src="/svg/candle-green.svg"
            alt="Green candle"
            width={24}
            height={24}
            className="absolute top-10 left-1/4 opacity-70 animate-float-slow"
          />
          <Image
            src="/svg/candle-red.svg"
            alt="Red candle"
            width={32}
            height={32}
            className="absolute bottom-16 right-1/3 opacity-50 animate-float-fast"
          />
          {floatingCharts.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Floating chart ${index + 1}`}
              width={index === 1 ? 120 : 80}
              height={index === 1 ? 120 : 80}
              className={`absolute opacity-10 ${
                index % 2 === 0 ? "top-20 left-10" : "bottom-24 right-12"
              } animate-float-slow`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 sm:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 drop-shadow-xl"
          >
            🚀 Smarter Trading with Botsensai
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10"
          >
            AI-driven insights, real-time market data, and intelligent automation tools to elevate your trading strategy.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              onClick={scrollToPricing}
              className="cta-button"
              aria-label="Explore Pricing Plans"
            >
              Explore Pricing
            </button>
            <Link href="/dashboard" passHref>
              <button className="cta-button bg-blue-600 hover:bg-blue-700 transition">
                Go to Dashboard
              </button>
            </Link>
          </motion.div>

          {/* Hero Animation */}
          <div id="hero-animation" className="flex justify-center mt-12">
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

      {/* Pricing Section */}
      <section
        id="pricing"
        ref={pricingRef}
        className="relative bg-white dark:bg-gray-900 py-24 px-6 sm:px-12 text-gray-900 dark:text-white overflow-hidden"
      >
        <motion.div
          style={{ y: yTransform, opacity: opacityTransform }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Choose a plan that aligns with your trading goals. Transparent. Flexible. Powerful.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                className="pricing-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.2,
                  duration: 0.6,
                  type: "spring",
                }}
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
                <button className="card-button" aria-label={`Choose ${plan.name}`}>
                  Get Started
                </button>
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
