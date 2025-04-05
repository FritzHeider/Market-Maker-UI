"use client";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ReactQueryProvider } from "@/lib/providers/react-query-provider";
import { Toaster } from "sonner";

// Initialize the Inter font with desired settings.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Metadata configuration for SEO and social sharing.
export const metadata: Metadata = {
  title: "Botsensai | AI Market Maker",
  description:
    "Trade smarter with Botsensai. Real-time data, AI-enhanced strategies, and portfolio insight in one dashboard.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Botsensai | AI Market Maker",
    description:
      "A high-frequency trading dashboard powered by real-time data and intelligent automation.",
    url: "https://botsensai.com",
    siteName: "Botsensai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Botsensai Dashboard Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Botsensai | Smarter Trading",
    description:
      "Real-time crypto trading analytics and AI-assisted strategies.",
    creator: "@botsensai",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-gray-950 text-white`}>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen antialiased font-sans bg-gray-950 text-white">
        {/* Wrap the app with React Query provider */}
        <ReactQueryProvider>
          {/* Main application content */}
          {children}
          {/* Toast notifications */}
          <Toaster position="top-right" richColors theme="dark" />
          {/* Performance insights */}
          <SpeedInsights />
          {/* Analytics */}
          <Analytics />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
