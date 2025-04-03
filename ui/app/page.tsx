"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import plans from "@/lib/plans";
import Header from "@/app/components/Header";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import styles from "./LandingPage.module.css";

// Dynamically import LottieWrapper (client-only)
const LottieWrapper = dynamic(() => import("@/components/ui/LottieWrapper"), {
  ssr: false,
});

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

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    const node = document.querySelector("#hero-animation");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShowLottie(true);
    }, { threshold: 0.2 });

    if (node) observer.observe(node);

    return () => {
      clearTimeout(timer);
      if (node) observer.unobserve(node);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowHeader(latest > 80);
  });

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-x-hidden relative">
      {/* Intro splash animation */}
      {showIntro && (
        <motion.div
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
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
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontFamily="Arial"
              dy=".3em"
            >
              B
            </text>
          </motion.svg>
        </motion.div>
      )}

      <Header showHeader={showHeader} onScrollToPricing={scrollToPricing} />

      {/* Hero */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        >
          <source src="/videos/looping.mp4" type="video/mp4" />
        </video>

        {/* Floating visuals */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image
            src="/svg/candle-green.svg"
            alt="Green candle"
            width={24}
            height={24}
            className={`absolute top-10 left-1/4 opacity-70 ${styles.floatingSlow}`}
          />
          <Image
            src="/svg/candle-red.svg"
            alt="Red candle"
            width={32}
            height={32}
            className={`absolute bottom-16 right-1/3 opacity-50 ${styles.floatingFast}`}
          />
          {floatingCharts.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Chart ${i + 1}`}
              width={i === 1 ? 120 : 80}
              height={i === 1 ? 120 : 80}
              className={`absolute opacity-10 ${
                i % 2 === 0 ? "top-20 left-10" : "bottom-24 right-12"
              } ${styles.floatingSlow}`}
            />
          ))}
        </div>

        {/* Hero content */}
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
            AI-driven insights, real-time market data, and intelligent automation
            tools to elevate your trading strategy.
          </motion.p>

          <motion.button
            onClick={scrollToPricing}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={styles.ctaButton}
            aria-label="Scroll to pricing"
          >
            Explore Pricing
          </motion.button>

          {/* Lottie animation */}
          <div id="hero-animation" className="flex gap-4 justify-center mt-12">
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

      {/* Pricing */}
      <section
        id="pricing"
        ref={pricingRef}
        className="relative bg-white dark:bg-gray-900 py-24 px-6 sm:px-12 text-gray-900 dark:text-white overflow-hidden"
      >
        <motion.div
          style={{ y, opacity }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Choose a plan that aligns with your trading goals. Transparent.
            Flexible. Powerful.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={styles.pricingCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  type: "spring",
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-blue-600 mb-4">
                  {plan.price}
                </p>
                <ul className="text-left text-sm space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500">✔</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className={styles.cardButton} aria-label={`Choose ${plan.name}`}>
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
