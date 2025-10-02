import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = {
  title: "Market Maker",
  description:
    "Operational platform for modern liquidity teams. Coordinate automated market making with human-grade oversight.",
  keywords: [
    "liquidity",
    "market making",
    "quant",
    "crypto",
    "trading infrastructure",
  ],
  openGraph: {
    title: "Market Maker",
    description:
      "Operational platform for modern liquidity teams. Coordinate automated market making with human-grade oversight.",
    url: "https://market-maker.example.com",
    siteName: "Market Maker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Market Maker",
    description:
      "Operational platform for modern liquidity teams. Coordinate automated market making with human-grade oversight.",
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-hero-mesh">
      <SiteHeader />
      <main id="skip" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
