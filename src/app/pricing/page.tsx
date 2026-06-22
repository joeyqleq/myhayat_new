"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";
import { SparklesText } from "@/components/ui/sparkles-text";
import { faqJsonLd } from "@/lib/seo";

function FAQ({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-2 border-myhayat-salmon/20 dark:border-myhayat-pink/20 rounded-2xl overflow-hidden border-glow-card">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-myhayat-pink/5 transition-colors">
        <span className="font-bold text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 text-myhayat-salmon dark:text-myhayat-pink transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  const { t } = useTranslation();

  const plans = [
    {
      name: t("pricing.free.name"),
      price: t("pricing.free.price"),
      period: t("pricing.free.period"),
      desc: t("pricing.free.desc"),
      features: [t("pricing.free.f1"), t("pricing.free.f2"), t("pricing.free.f3"), t("pricing.free.f4"), t("pricing.free.f5")],
      cta: t("pricing.free.cta"),
      borderColor: "border-myhayat-salmon",
      shadow: "shadow-[var(--shadow-curved)]",
      popular: false,
    },
    {
      name: t("pricing.premium.name"),
      price: t("pricing.premium.price"),
      period: t("pricing.premium.period"),
      desc: t("pricing.premium.desc"),
      features: [t("pricing.premium.f1"), t("pricing.premium.f2"), t("pricing.premium.f3"), t("pricing.premium.f4"), t("pricing.premium.f5"), t("pricing.premium.f6")],
      cta: t("pricing.premium.cta"),
      borderColor: "border-myhayat-pink",
      shadow: "shadow-[var(--shadow-curved-pink)]",
      popular: true,
    },
    {
      name: t("pricing.plus.name"),
      price: t("pricing.plus.price"),
      period: t("pricing.plus.period"),
      desc: t("pricing.plus.desc"),
      features: [t("pricing.plus.f1"), t("pricing.plus.f2"), t("pricing.plus.f3"), t("pricing.plus.f4"), t("pricing.plus.f5"), t("pricing.plus.f6")],
      cta: t("pricing.plus.cta"),
      borderColor: "border-myhayat-yellow",
      shadow: "shadow-[var(--shadow-curved-yellow)]",
      popular: false,
    },
  ];

  const faqs = [
    { q: t("pricing.faq.q1"), a: t("pricing.faq.a1") },
    { q: t("pricing.faq.q2"), a: t("pricing.faq.a2") },
    { q: t("pricing.faq.q3"), a: t("pricing.faq.a3") },
    { q: t("pricing.faq.q4"), a: t("pricing.faq.a4") },
  ];

  const pricingFaqSchema = faqJsonLd(faqs.map((faq) => ({ question: faq.q, answer: faq.a })));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }}
      />
      <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
        <Navbar />
        <main className="flex-grow w-full">

        {/* Hero */}
        <section className="relative pt-36 pb-12 px-4 md:px-8 overflow-hidden">
          {/* Decorative: Cubes — represent value/building blocks */}
          <img src="/decor_cube_1.svg" alt="" className="absolute -top-10 -left-20 w-48 opacity-8 dark:opacity-4 pointer-events-none hidden lg:block animate-drift" />
          <img src="/decor_cube_2.svg" alt="" className="absolute bottom-0 right-0 w-40 opacity-6 dark:opacity-3 pointer-events-none hidden lg:block animate-drift" style={{ animationDelay: "2s" }} />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-block px-6 py-2 bg-myhayat-yellow text-gray-900 rounded-full font-bold text-sm transform -rotate-2 border-2 border-myhayat-salmon shadow-sm">
              {t("pricing.launching")} 🚀
            </div>
            <h1 className="text-5xl md:text-7xl font-titan leading-tight">
              <AnimatedGradientText className="!bg-transparent !p-0 inline">
                <span className="inline animate-gradient bg-gradient-to-r from-[#F85BAA] via-[#FEC810] to-[#F85BAA] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                  {t("pricing.title")}
                </span>
              </AnimatedGradientText>{" "}
              <SparklesText className="inline text-myhayat-pink" sparklesCount={4}>{t("pricing.titleHighlight")}</SparklesText>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("pricing.subtitle")}
            </p>
            <div className="inline-block px-6 py-3 bg-myhayat-pink/10 dark:bg-myhayat-pink/20 rounded-2xl text-myhayat-pink font-bold text-lg border-2 border-myhayat-pink/20">
              {t("pricing.earlyBird")}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <div key={i} className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-myhayat-pink text-white rounded-full text-sm font-bold z-10 border-2 border-white shadow-md animate-pulse">
                    {t("pricing.premium.popular")} ⭐
                  </div>
                )}
                <MyHayatCard noPattern className={`p-8 bg-white dark:bg-[#251320] ${plan.borderColor} border-4 ${plan.shadow} hover-lift hover-border-beam ${plan.popular ? "hover-glow" : ""} transition-transform h-full flex flex-col`}>
                  <JapaneseCubesPattern variant={plan.popular ? "stars" : "diamonds"} colorScheme={plan.popular ? "pink" : "mixed"} size={18} opacity={0.03} className="absolute inset-0 pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-overlay" />
                  <h3 className="font-titan text-3xl mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-titan text-5xl text-myhayat-pink dark:text-myhayat-yellow">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-myhayat-teal shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MyHayatButton
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {plan.cta}
                  </MyHayatButton>
                </MyHayatCard>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 md:px-8 relative">
          {/* Decorative: Shapes ring pattern — represents questions/thinking */}
          <img src="/decor_shapes_ring_pattern.svg" alt="" className="absolute -bottom-10 -right-10 w-48 opacity-6 dark:opacity-3 pointer-events-none hidden lg:block" />

          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-titan text-center mb-12">
              {t("pricing.faq.title")}
              <img src="/decor_yellow_asterisk.svg" alt="" className="inline-block decor-sm ms-2 animate-twinkle" />
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQ key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
            
            {/* Added Illustration */}
            <div className="mt-16 flex justify-center relative z-0">
               <img src="/Illustrations/family enjoys a delicious breakfast.svg" alt="Family wellbeing" className="w-80 h-auto" />
            </div>
          </div>
        </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
