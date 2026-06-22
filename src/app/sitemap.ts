import type { MetadataRoute } from "next";
import { ARTICLE_SEO } from "@/lib/content/article-seo";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/how-it-works",
    "/chat",
    "/echoes",
    "/pricing",
    "/education-hub",
    "/blog",
    "/privacy",
    "/terms",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-06-22T00:00:00.000Z"),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const articleEntries = ARTICLE_SEO.map((article) => ({
    url: `${SITE_URL}/education-hub/${article.slug}`,
    lastModified: new Date(article.modifiedTime),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...articleEntries];
}
