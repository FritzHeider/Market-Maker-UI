import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { splitCta } from "@/lib/copy";
import { sectionPadding } from "@/lib/design-tokens";
import { Button } from "@/components/ui/button";

export function SplitCta() {
  return (
    <section className={`${sectionPadding.base}`}>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 lg:grid-cols-[1.05fr,1fr] lg:items-center">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={splitCta.image}
            alt="Liquidity operations dashboard"
            width={960}
            height={720}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 540px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/10 via-transparent to-primary/10" />
        </motion.div>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Why teams switch</p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">{splitCta.title}</h2>
          <p className="text-lg text-muted-foreground">{splitCta.description}</p>
          <ul className="space-y-3 text-base text-muted-foreground">
            {splitCta.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/features">Explore platform</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/about">Meet the team</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
