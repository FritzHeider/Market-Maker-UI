// pages/index.tsx
import Link from "next/link";
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
   <Head>
        <title>Botsensai | Market Maker AI Bot</title>
        <meta
          name="description"
          content="Trade smarter with Botsensai. Leverage real-time data and AI-enhanced strategies for high-frequency trading, arbitrage, and portfolio insight."
        />
        <meta property="og:title" content="Botsensai | Market Maker AI Bot" />
        <meta property="og:description" content="Trade smarter with Botsensai. Leverage real-time data and AI-enhanced strategies." />
        <meta property="og:image" content="/og-image.png" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        <Features />
        <About />
        <Pricing />
        <Footer />
      </div>
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow">
        🚀 Market Maker AI Bot
      </h1>
      <p className="text-lg text-gray-400 max-w-xl mb-8">
        Trade smarter. Our intelligent dashboard uses real-time data and AI-enhanced strategies
        to empower you with high-frequency trading, arbitrage, and portfolio insight.
      </p>

      <Link href="/dashboard">
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-medium text-white rounded-xl shadow transition">
          Enter Dashboard
        </button>
      </Link>

      <footer className="mt-16 text-sm text-gray-600">
        Built with ❤️ using Next.js, FastAPI & Tailwind CSS
      </footer>
    </div>
  );
}