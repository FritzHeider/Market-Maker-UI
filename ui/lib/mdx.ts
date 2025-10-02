import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const CONTENT_PATH = path.join(process.cwd(), "content", "blog");

export type MDXFrontmatter = {
  title: string;
  date: string;
  author: string;
  summary?: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: MDXFrontmatter;
};

export async function getBlogSlugs() {
  const entries = await fs.readdir(CONTENT_PATH);
  return entries.filter((file) => file.endsWith(".mdx"));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await getBlogSlugs();
  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(CONTENT_PATH, file);
      const source = await fs.readFile(filePath, "utf8");
      const { data } = matter(source);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        frontmatter: data as MDXFrontmatter,
      };
    })
  );

  return posts.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(CONTENT_PATH, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(source);

  const mdx = await compileMDX<{ title: string }>(
    {
      source: content,
      options: {
        parseFrontmatter: false,
      },
    }
  );

  return {
    slug,
    frontmatter: data as MDXFrontmatter,
    content: mdx.content,
  };
}
