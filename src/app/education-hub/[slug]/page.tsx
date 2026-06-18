"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import Link from "next/link";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";
import { ARTICLES } from "@/lib/content/articles";

export default function EducationHubArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  
  const slug = resolvedParams.slug;
  const article = ARTICLES[slug] || {
    title: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    body: (
      <>
        <p className="lead">Content coming soon...</p>
      </>
    )
  };

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full relative">
        {/* Decorative background */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-myhayat-yellow/20 to-transparent -z-10" />
        <img src="/decor_wireframes_donut.svg" alt="" className="absolute top-20 right-0 w-64 opacity-5 pointer-events-none" />

        <article className="pt-36 pb-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Link href="/education-hub" className="inline-flex items-center gap-2 text-myhayat-pink hover:text-myhayat-salmon hover:underline mb-8 font-bold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Education Hub
            </Link>

            <div className="mb-10">
              <div className="flex items-center gap-2 text-sm text-myhayat-salmon font-bold uppercase tracking-wider mb-4">
                <BookOpen className="w-4 h-4" /> 
                Article Reference
              </div>
              <h1 className="font-titan text-4xl md:text-6xl leading-tight mb-6">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-800 pb-6">
                <span>By <strong>Clinical Content Team</strong></span>
                <span>•</span>
                <span>June 2026</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>

            <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-titan prose-a:text-myhayat-pink prose-img:rounded-3xl prose-blockquote:border-myhayat-yellow prose-blockquote:bg-myhayat-yellow/10 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-titan prose-blockquote:text-xl">
              {article.body}
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">#MentalHealth</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">#Lebanon</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">#AI</span>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
