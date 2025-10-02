import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-16 pb-20">
      <section className="pt-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Blog</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Perspectives from teams building resilient liquidity
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Essays, guides, and interviews from the builders powering automated market operations across the globe.
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex h-full flex-col rounded-3xl border border-border/70 bg-card/80 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{post.frontmatter.date}</p>
              <h2 className="mt-4 text-xl font-semibold text-foreground">{post.frontmatter.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{post.frontmatter.summary}</p>
              <div className="mt-auto pt-6 text-sm font-semibold text-primary">
                <Link href={`/blog/${post.slug}`}>Read story →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
