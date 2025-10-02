"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/copy";

export function Timeline() {
  return (
    <div className="relative mt-10 space-y-8 border-l border-border pl-8">
      {timeline.map((item, index) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ delay: index * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <span className="absolute -left-[38px] flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold">
            {item.year}
          </span>
          <p className="text-base text-muted-foreground">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
