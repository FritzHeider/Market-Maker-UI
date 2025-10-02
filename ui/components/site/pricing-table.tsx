"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { pricing } from "@/lib/copy";
import { sectionPadding } from "@/lib/design-tokens";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function PricingTable() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly");

  return (
    <section className={`${sectionPadding.base}`} id="pricing">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Flexible plans for every stage of liquidity maturity
          </h2>
          <p className="text-lg text-muted-foreground">
            Start in sandbox mode for free, then graduate to production-grade automation with dedicated support.
          </p>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-2 py-2 text-sm">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-full px-4 py-2 font-semibold transition ${billingCycle === "monthly" ? "bg-background text-foreground" : "text-muted-foreground"}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`rounded-full px-4 py-2 font-semibold transition ${billingCycle === "annual" ? "bg-background text-foreground" : "text-muted-foreground"}`}
          >
            Annual <span className="ml-1 text-xs text-accent">Save 12%</span>
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pricing.plans.map((plan) => {
            const priceValue = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual;
            const isFeatured = Boolean(plan.featured);
            return (
              <motion.article
                key={plan.name}
                layout
                className={`flex h-full flex-col rounded-3xl border ${isFeatured ? "border-primary/50 bg-primary/10 shadow-card" : "border-border bg-card/80 shadow-subtle"} p-6`}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {isFeatured ? (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-primary text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground px-3 py-1">
                    Recommended
                  </span>
                ) : null}
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                  <div className="flex items-baseline gap-2">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`${plan.name}-${billingCycle}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-3xl font-semibold"
                      >
                        {priceValue ? formatCurrency(priceValue) : "Custom"}
                      </motion.span>
                    </AnimatePresence>
                    {priceValue ? (
                      <span className="text-sm text-muted-foreground">
                        / {billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    ) : null}
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Button asChild variant={isFeatured ? "primary" : "outline"} className="w-full">
                    <Link href={plan.cta.href}>{plan.cta.label}</Link>
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground">{pricing.finePrint}</p>
      </div>
    </section>
  );
}
