// File: /app/components/Header.tsx

import { motion } from "framer-motion";

interface HeaderProps {
  showHeader: boolean;
  onScrollToPricing: () => void;
}

export default function Header({ showHeader, onScrollToPricing }: HeaderProps) {
  return (
    <motion.header
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-950/80 shadow transition-all duration-500"
      initial={{ y: -80, opacity: 0 }}
      animate={showHeader ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Botsensai</h1>
        <nav>
          <button
            onClick={onScrollToPricing}
            className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition"
            aria-label="Scroll to Pricing"
          >
            Pricing
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
