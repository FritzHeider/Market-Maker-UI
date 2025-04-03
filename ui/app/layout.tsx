// File: /app/layout.tsx

import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ReactQueryProvider } from "@/lib/providers/react-query-provider";
import { Toaster } from "@/components/ui/toaster"; // if using toast system

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Botsensai | AI Market Maker",
  description:
    "Trade smarter with Botsensai. Real-time data, AI-enhanced strategies, and portfolio insight in one dashboard.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased bg-gray-950 text-white">
        <ReactQueryProvider>
          {children}
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
