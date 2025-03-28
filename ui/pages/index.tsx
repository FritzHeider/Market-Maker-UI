// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
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