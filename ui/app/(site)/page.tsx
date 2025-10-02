import { Hero } from "@/components/site/hero";
import { FeaturesSection } from "@/components/site/features-section";
import { Metrics } from "@/components/site/metrics";
import { SplitCta } from "@/components/site/split-cta";
import { Testimonials } from "@/components/site/testimonials";
import { PricingTable } from "@/components/site/pricing-table";
import { Faq } from "@/components/site/faq";
import { BlogPreview } from "@/components/site/blog-preview";
import { EmailCapture } from "@/components/site/email-capture";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <Metrics />
      <SplitCta />
      <Testimonials />
      <PricingTable />
      <Faq />
      <BlogPreview />
      <EmailCapture />
    </>
  );
}
