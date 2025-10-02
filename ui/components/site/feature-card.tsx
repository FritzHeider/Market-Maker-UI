"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-20%" }}
      className="group relative flex h-full flex-col rounded-3xl border border-border/80 bg-card/80 p-8 shadow-subtle transition duration-200 hover:-translate-y-2 hover:shadow-card"
    >
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-base text-muted-foreground">{description}</p>
      <div className="mt-auto pt-6 text-sm font-semibold text-primary/80 opacity-0 transition duration-150 group-hover:opacity-100">
        Learn more →
      </div>
    </motion.article>
  );
}
