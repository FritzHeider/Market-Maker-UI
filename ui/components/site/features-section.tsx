import { features } from "@/lib/copy";
import { sectionPadding } from "@/lib/design-tokens";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  return (
    <section className={`${sectionPadding.base}`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Capabilities</p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Automate the busywork, keep control of the outcomes
          </h2>
          <p className="text-lg text-muted-foreground">
            Every playbook, guardrail, and approval lives inside a single console designed for cross-functional desks.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
