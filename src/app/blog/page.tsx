"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { useTranslation } from "@/lib/i18n";
import { Clock, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    slug: "understanding-anxiety-lebanese-context",
    title: "Understanding Anxiety in the Lebanese Context",
    titleAr: "فهم القلق بالسياق اللبناني",
    excerpt: "Why Lebanese anxiety is unique — economic uncertainty, intergenerational trauma, and the cultural expectation to 'stay strong'.",
    excerptAr: "ليش القلق اللبناني مختلف — الضغط الاقتصادي، الصدمات المتوارثة، والتوقع الثقافي بـ 'البقاء قوي'.",
    category: "Mental Health",
    categoryAr: "صحة نفسية",
    readTime: "5 min",
    image: "/mod1.png",
  },
  {
    slug: "breathing-exercises-you-can-do-anywhere",
    title: "5 Breathing Exercises You Can Do Anywhere",
    titleAr: "٥ تمارين تنفّس فيك تعملها بأي مكان",
    excerpt: "From the 4-7-8 technique to box breathing — simple, science-backed tools to calm your nervous system in under 2 minutes.",
    excerptAr: "من تقنية ٤-٧-٨ لتنفّس الصندوق — أدوات بسيطة مبنية عالعلم لتهدئة جهازك العصبي بأقل من ٢ دقيقة.",
    category: "Wellness Tips",
    categoryAr: "نصائح عافية",
    readTime: "3 min",
    image: "/mod2.png",
  },
  {
    slug: "grief-in-lebanese-culture",
    title: "Grief in Lebanese Culture: How We Mourn and How We Heal",
    titleAr: "الحزن بالثقافة اللبنانية: كيف منحزن وكيف منشفى",
    excerpt: "From the 'azza to the 40-day traditions — understanding how Lebanese mourning practices can actually support healing.",
    excerptAr: "من العزا لتقاليد الأربعين — كيف ممارسات الحداد اللبنانية فعلاً بتساعد بالشفاء.",
    category: "Culture",
    categoryAr: "ثقافة",
    readTime: "7 min",
    image: "/mod3.png",
  },
];

export default function BlogPage() {
  const { t, locale } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full">

        {/* Hero */}
        <section className="relative pt-36 pb-12 px-4 md:px-8 overflow-hidden">
          {/* Decorative: Wireframe circle — represents knowledge/insight */}
          <img src="/decor_wireframes_circle.svg" alt="" className="absolute -top-10 -right-16 w-48 opacity-6 dark:opacity-3 pointer-events-none hidden lg:block" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <h1 className="text-5xl md:text-7xl font-barriecito leading-tight">
              {t("nav.blog")}
              <img src="/decor_twinkle_yellow.svg" alt="" className="inline-block decor-sm ms-3 animate-twinkle" />
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Mental health resources, Lebanese culture insights, and wellness tips — in your language.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <MyHayatCard noPattern className="p-0 bg-white dark:bg-[#251320] hover:-translate-y-2 transition-transform h-full flex flex-col overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <Image src={article.image} alt={locale === "ar" ? article.titleAr : article.title} width={400} height={200} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-myhayat-pink/10 text-myhayat-pink rounded-full text-xs font-bold">
                        <Tag className="w-3 h-3" />
                        {locale === "ar" ? article.categoryAr : article.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-barriecito text-xl mb-2 line-clamp-2">
                      {locale === "ar" ? article.titleAr : article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-grow">
                      {locale === "ar" ? article.excerptAr : article.excerpt}
                    </p>
                  </div>
                </MyHayatCard>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
