"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { ARTICLES } from "@/lib/content/articles";
import { ARTICLE_SEO_MAP } from "@/lib/content/article-seo";
import { articleJsonLd } from "@/lib/seo";
import { useTranslation } from "@/lib/i18n";

export default function EducationHubArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  
  const slug = resolvedParams.slug;
  const { locale, t } = useTranslation();
  
  const articleObj = ARTICLES[slug];
  const article = articleObj ? articleObj[locale as "en" | "ar"] : {
    title: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    body: <p className="lead">Content coming soon...</p>
  };

  const articleSeo = ARTICLE_SEO_MAP[slug];
  const articleSchema = articleSeo
    ? articleJsonLd({
        slug,
        title: articleSeo.title,
        description: articleSeo.description,
        category: articleSeo.category,
        publishedTime: articleSeo.publishedTime,
        modifiedTime: articleSeo.modifiedTime,
        locale: locale as "en" | "ar",
      })
    : null;

  const isAr = locale === "ar";

  return (
    <>
      {articleSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      ) : null}
      <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full relative">
        {/* Decorative background */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-myhayat-yellow/20 to-transparent -z-10" />
        <img src="/decor_wireframes_donut.svg" alt="" className="absolute top-20 right-0 w-64 opacity-5 pointer-events-none" />

        <article className="pt-36 pb-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Link href="/education-hub" className="inline-flex items-center gap-2 text-myhayat-pink hover:text-myhayat-salmon hover:underline mb-8 font-bold transition-colors">
              <ArrowLeft className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              {isAr ? "العودة إلى مركز التعلم" : "Back to Education Hub"}
            </Link>

            <div className="mb-10">
              <div className="flex items-center gap-2 text-sm text-myhayat-salmon font-bold uppercase tracking-wider mb-4">
                <BookOpen className="w-4 h-4" /> 
                {isAr ? "مرجع المقال" : "Article Reference"}
              </div>
              <h1 className={`font-titan text-4xl md:text-6xl leading-tight mb-6 ${isAr ? "text-right font-arabic" : ""}`} dir={isAr ? "rtl" : "ltr"}>
                {article.title}
              </h1>
              <div className={`flex items-center gap-4 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-800 pb-6 ${isAr ? "flex-row-reverse" : ""}`}>
                <span>{isAr ? "بقلم" : "By"} <strong>{isAr ? "فريق المحتوى السريري" : "Clinical Content Team"}</strong></span>
                <span>•</span>
                <span>{isAr ? "يونيو ٢٠٢٦" : "June 2026"}</span>
                <span>•</span>
                <span>{isAr ? "٥ دقائق للقراءة" : "5 min read"}</span>
              </div>
            </div>

            <div className={`prose dark:prose-invert prose-lg max-w-none text-justify prose-p:leading-relaxed prose-headings:font-titan prose-headings:text-myhayat-pink prose-a:text-myhayat-pink hover:prose-a:text-myhayat-yellow prose-img:rounded-3xl prose-blockquote:border-myhayat-yellow prose-blockquote:bg-myhayat-yellow/10 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:font-titan prose-blockquote:text-xl prose-li:marker:text-myhayat-yellow ${isAr ? "text-right font-arabic prose-headings:font-arabic prose-blockquote:rounded-l-2xl prose-blockquote:border-r-4 prose-blockquote:border-l-0" : "prose-blockquote:rounded-r-2xl prose-blockquote:border-l-4"}`} dir={isAr ? "rtl" : "ltr"}>
              {article.body}
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div className="flex gap-2 flex-wrap">
                {(articleSeo?.keywords ?? ["mental health", "Lebanon", "AI"]).slice(0, 3).map((keyword) => (
                  <span key={keyword} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">#{keyword.replace(/\s+/g, "-")}</span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
    </>
  );
}
