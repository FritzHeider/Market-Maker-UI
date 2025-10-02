import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://market-maker.example.com";
  const posts = await getAllPosts();

  const routes: MetadataRoute.Sitemap = [
    "",
    "/features",
    "/pricing",
    "/about",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  return [...routes, ...blogRoutes];
}
