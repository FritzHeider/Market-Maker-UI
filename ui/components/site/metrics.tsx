"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { metrics } from "@/lib/copy";
import { metricMotion, sectionPadding } from "@/lib/design-tokens";
import { formatNumber } from "@/lib/utils";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 20 });
  const display = useTransform(spring, (latest) => formatNumber(latest));

  React.useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => motionValue.set(latest),
    });
    return () => controls.stop();
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className="text-4xl font-semibold sm:text-5xl">
      <motion.span>{display}</motion.span>
      {suffix ? <span className="text-2xl font-medium text-muted-foreground">{suffix}</span> : null}
    </span>
  );
}

export function Metrics() {
  return (
    <section className={`${sectionPadding.base}`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Proof points</p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Operators trust Market Maker to keep liquidity resilient
          </h2>
          <p className="text-lg text-muted-foreground">
            We obsess over outcome metrics: tighter spreads, fewer escalations, and faster interventions when the market shifts.
          </p>
        </div>
        <div className="grid gap-6 rounded-3xl border border-border/70 bg-card/60 p-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="space-y-3"
              initial={metricMotion.initial}
              whileInView={metricMotion.animate}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Counter value={metric.value} suffix={metric.suffix} />
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
