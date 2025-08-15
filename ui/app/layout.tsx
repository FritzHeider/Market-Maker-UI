import "@/styles/globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ReactQueryProvider } from "@/lib/providers/react-query-provider";
import { Toaster } from "sonner";
import Footer from "./components/Footer";


// Metadata for SEO and sharing
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
    description: "Real-time crypto trading analytics and AI-assisted strategies.",
    creator: "@botsensai",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute left-0 top-0 m-4 bg-gray-800 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        <ReactQueryProvider>
          <main id="main-content" className="relative overflow-x-hidden">
            {children}
          </main>
          <Footer />

          {/* Global notifications */}
          <Toaster position="top-right" richColors theme="dark" />

          {/* Vercel performance tools */}
          <SpeedInsights />
          <Analytics />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
