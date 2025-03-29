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
  return( 
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
    );
}