import { PricingTable } from "@/components/site/pricing-table";
import { EmailCapture } from "@/components/site/email-capture";

export default function PricingPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="pt-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Choose your pace without sacrificing oversight
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Transparent pricing for every liquidity maturity stage. Annual plans include a 12% discount and white-glove onboarding.
          </p>
        </div>
      </section>
      <PricingTable />
      <EmailCapture />
    </div>
  );
}
