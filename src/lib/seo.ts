import type { Metadata } from "next";

export const SITE_URL = "https://myhayat.app";
export const SITE_NAME = "My Hayat";
export const DEFAULT_TITLE = "My Hayat | AI Mental Health Companion for the Lebanese Community";
export const DEFAULT_DESCRIPTION = "My Hayat is an AI mental health companion built for the Lebanese community, offering culturally aware support in Lebanese Arabic and English, 24/7.";
export const DEFAULT_OG_IMAGE = "/myhayat_hero.png";

export type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export type ArticleSeo = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: "en" | "ar";
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, SITE_URL).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = "website",
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} preview image`,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/myhayat-logo.png"),
    sameAs: [],
    description: DEFAULT_DESCRIPTION,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: ["en", "ar"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/education-hub?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd(article: ArticleSeo) {
  const url = absoluteUrl(`/education-hub/${article.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    articleSection: article.category,
    inLanguage: article.locale === "ar" ? "ar" : "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/myhayat-logo.png"),
      },
    },
    image: [absoluteUrl(DEFAULT_OG_IMAGE)],
    datePublished: article.publishedTime ?? "2026-06-22T00:00:00.000Z",
    dateModified: article.modifiedTime ?? article.publishedTime ?? "2026-06-22T00:00:00.000Z",
    author: {
      "@type": "Organization",
      name: `${SITE_NAME} Clinical Content Team`,
    },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  };
}
