import type { Metadata } from "next";
import { ARTICLE_SEO_MAP } from "@/lib/content/article-seo";
import { buildMetadata } from "@/lib/seo";

export function getArticleMetadata(slug: string): Metadata {
  const article = ARTICLE_SEO_MAP[slug];

  if (!article) {
    return buildMetadata({
      title: "Education Hub Article",
      description: "Read mental health education, research, and community stories from My Hayat.",
      path: `/education-hub/${slug}`,
      type: "article",
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/education-hub/${slug}`,
    keywords: article.keywords,
    type: "article",
  });
}
