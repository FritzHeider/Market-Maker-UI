import { FeaturesSection } from "@/components/site/features-section";
import { FeaturesDeepDive } from "@/components/site/features-deep-dive";
import { SplitCta } from "@/components/site/split-cta";

export default function FeaturesPage() {
  return (
    <div className="space-y-20 pb-20">
      <section className="pt-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Platform</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            The operating system for modern liquidity teams
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Every module is composable, observable, and battle-tested with desks operating 24/7 across the globe.
          </p>
        </div>
      </section>
      <div className="mx-auto w-full max-w-6xl px-4">
        <FeaturesDeepDive />
      </div>
      <FeaturesSection />
      <SplitCta />
    </div>
  );
}
