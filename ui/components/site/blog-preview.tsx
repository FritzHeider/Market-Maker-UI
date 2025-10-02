import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/copy";
import { sectionPadding } from "@/lib/design-tokens";

export function BlogPreview() {
  return (
    <section className={`${sectionPadding.base}`}>
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Insights</p>
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              Strategy memos and operator interviews
            </h2>
            <p className="max-w-xl text-lg text-muted-foreground">
              Stay sharp with analysis from the desks shipping the future of automated liquidity.
            </p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-primary hover:text-primary/80">
            View all posts →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col rounded-3xl border border-border/70 bg-card/80 p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{post.date}</p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{post.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-auto pt-6 text-sm font-semibold text-primary">
                <Link href={`/blog/${post.slug}`}>Read story →</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
