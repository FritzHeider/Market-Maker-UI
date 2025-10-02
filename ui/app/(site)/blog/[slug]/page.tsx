import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <article className="pb-20">
      <header className="bg-hero-radial pb-16 pt-24">
        <div className="mx-auto w-full max-w-3xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{post.frontmatter.date}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">{post.frontmatter.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">By {post.frontmatter.author}</p>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-4 prose prose-lg prose-invert:prose-headings:text-foreground prose-neutral dark:prose-invert">
        {post.content}
      </div>
    </article>
  );
}
