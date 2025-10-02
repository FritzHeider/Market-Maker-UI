import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/site/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://market-maker.example.com"),
  title: {
    default: "Market Maker",
    template: "%s | Market Maker",
  },
  description:
    "Market Maker helps liquidity teams orchestrate automated strategies with human-grade oversight.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground",
          sans.variable,
          mono.variable
        )}
      >
        <ThemeProvider>
          <a
            href="#skip"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-ring"
          >
            Skip to content
          </a>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
