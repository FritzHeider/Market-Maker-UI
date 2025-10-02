"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { heroCopy, trustLogos } from "@/lib/copy";
import { heroHeadlineGradient, revealVariant } from "@/lib/design-tokens";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-24 pt-28 sm:pt-32">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: prefersReducedMotion ? 0.3 : 0, scale: prefersReducedMotion ? 1 : 1.1 }}
        animate={{ opacity: prefersReducedMotion ? 0.3 : 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/30 blur-[160px]" />
        <div className="absolute -bottom-32 right-1/4 h-[420px] w-[420px] rounded-full bg-accent/25 blur-[140px]" />
      </motion.div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-14 px-4 text-center lg:flex-row lg:items-start lg:gap-16 lg:text-left">
        <div className="flex-1 space-y-8">
          <Badge className="mx-auto w-fit lg:mx-0">{heroCopy.kicker}</Badge>
          <motion.h1
            className={`text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r ${heroHeadlineGradient} bg-clip-text text-transparent`}
            initial={revealVariant.hidden}
            animate={revealVariant.visible(0.05)}
          >
            {heroCopy.headline}
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl lg:mx-0"
            initial={revealVariant.hidden}
            animate={revealVariant.visible(0.15)}
          >
            {heroCopy.subheading}
          </motion.p>
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row lg:items-start"
            initial={revealVariant.hidden}
            animate={revealVariant.visible(0.25)}
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={heroCopy.primaryCta.href}>{heroCopy.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={heroCopy.secondaryCta.href}>{heroCopy.secondaryCta.label}</Link>
            </Button>
          </motion.div>
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start"
            initial={revealVariant.hidden}
            animate={revealVariant.visible(0.35)}
          >
            <span className="font-semibold text-foreground">Trusted by leading desks</span>
            <div className="flex flex-wrap items-center gap-4 opacity-80 transition hover:opacity-100">
              {trustLogos.map((logo) => (
                <Image
                  key={logo.name}
                  src={logo.logo}
                  alt={logo.name}
                  width={120}
                  height={32}
                  className="h-8 w-auto grayscale transition hover:grayscale-0"
                />
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          className="flex w-full flex-1 flex-col items-center gap-6 lg:items-end"
          initial={revealVariant.hidden}
          animate={revealVariant.visible(0.4)}
        >
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-6 shadow-card">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
              style={{ opacity: 0.6 }}
              animate={{ opacity: prefersReducedMotion ? 0.3 : [0.4, 0.8, 0.4] }}
              transition={{ duration: prefersReducedMotion ? 0 : 6, repeat: prefersReducedMotion ? 0 : Infinity }}
            />
            <div className="relative space-y-4 text-left">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span>Playbook preview</span>
                <span>Q4 Liquidity</span>
              </div>
              <div className="space-y-3 rounded-2xl border border-border/80 bg-background/70 p-4">
                {["Venue coverage", "Spread guardrail", "Inventory bias"].map((label, index) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold text-foreground">
                      {index === 0 ? "12 venues" : index === 1 ? "18 bps" : "+4%"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5 text-sm text-accent">
                “Guardrails auto-tighten when volatility breaks 80th percentile. Desk receives a review task instantly.”
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
