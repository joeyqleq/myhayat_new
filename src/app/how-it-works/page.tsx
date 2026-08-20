"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";
import { SparklesText } from "@/components/ui/sparkles-text";
import {
  Shield, MessageCircle, Languages, AlertTriangle,
  RefreshCw, ArrowRight, Sparkles, Database, Zap
} from "lucide-react";

export default function HowItWorksPage() {
  const { t } = useTranslation();

  const steps = [
    {
      num: "01",
      icon: <Languages className="w-7 h-7" />,
      title: t("howItWorks.step1.title"),
      desc: t("howItWorks.step1.desc"),
      color: "bg-myhayat-pink",
      borderColor: "border-myhayat-pink",
    },
    {
      num: "02",
      icon: <Shield className="w-7 h-7" />,
      title: t("howItWorks.step2.title"),
      desc: t("howItWorks.step2.desc"),
      color: "bg-myhayat-teal",
      borderColor: "border-myhayat-teal",
    },
    {
      num: "03",
      icon: <Database className="w-7 h-7" />,
      title: t("howItWorks.step3.title"),
      desc: t("howItWorks.step3.desc"),
      color: "bg-myhayat-yellow",
      borderColor: "border-myhayat-yellow",
    },
    {
      num: "04",
      icon: <MessageCircle className="w-7 h-7" />,
      title: t("howItWorks.step4.title"),
      desc: t("howItWorks.step4.desc"),
      color: "bg-myhayat-salmon",
      borderColor: "border-myhayat-salmon",
    },
  ];

  const securityItems = [
    { icon: <Shield className="w-5 h-5" />, text: t("howItWorks.security.1") },
    { icon: <AlertTriangle className="w-5 h-5" />, text: t("howItWorks.security.2") },
    { icon: <RefreshCw className="w-5 h-5" />, text: t("howItWorks.security.3") },
    { icon: <Zap className="w-5 h-5" />, text: t("howItWorks.security.4") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full">

        {/* Hero */}
        <section className="relative pt-36 pb-16 px-4 md:px-8 overflow-hidden section-daylight">
          <img src="/decor_wireframes_flower_1.svg" alt="" className="absolute -top-10 -right-20 w-72 opacity-8 dark:opacity-4 pointer-events-none hidden lg:block" />
          <img src="/decor_twinkle_yellow.svg" alt="" className="absolute bottom-20 left-10 w-8 h-8 opacity-40 animate-pulse pointer-events-none hidden md:block" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-[#251320] border-2 border-myhayat-salmon shadow-[4px_4px_0px_0px_var(--color-myhayat-salmon)] mb-4">
              <Sparkles className="w-4 h-4 text-myhayat-yellow" />
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wider uppercase">How it works</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-titan leading-tight text-balance">
              <span className="text-myhayat-pink">{t("howItWorks.title")}</span>
              <br />
              <span className="italic text-gray-900 dark:text-white">{t("howItWorks.titleHighlight")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-pretty">
              {t("howItWorks.subtitle")}
            </p>
          </div>
        </section>

        {/* 4-step pipeline */}
        <section className="py-16 px-4 md:px-8 section-daylight">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-titan text-center mb-16">
              What happens <SparklesText className="inline text-myhayat-pink" sparklesCount={4}>every time</SparklesText> you send a message
            </h2>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  {i < steps.length - 1 && (
                    <div className="absolute left-7 top-[calc(100%)] w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600 z-0 hidden md:block" />
                  )}
                  <MyHayatCard noPattern className={`p-6 md:p-8 bg-white dark:bg-[#251320] ${step.borderColor} border-4 transition-shadow relative z-10`}>
                    <JapaneseCubesPattern variant="waves" colorScheme="lavender" size={18} opacity={0.03} className="absolute inset-0 pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-overlay" />
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="flex items-center gap-4 shrink-0">
                        <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-md`}>
                          {step.icon}
                        </div>
                        <span className="font-titan text-4xl text-gray-200 dark:text-gray-700">{step.num}</span>
                      </div>
                      <div>
                        <h3 className="font-titan text-xl md:text-2xl mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-pretty">{step.desc}</p>
                      </div>
                    </div>
                  </MyHayatCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture callout — honest technical explanation */}
        <section className="py-16 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 gradient-warm" />
          <img src="/decor_wireframes_waves_2.svg" alt="" className="absolute bottom-0 left-0 w-full opacity-5 pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-titan text-center mb-4">
              What My Hayat actually is
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-pretty">
              Not fine-tuned on therapy transcripts. Not a replacement for a clinician. A carefully designed conversation system with deliberate constraints.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Languages className="w-8 h-8 text-myhayat-pink" />,
                  title: "A Lebanese language layer",
                  desc: "Arabizi recognition and generation is a separate engineering layer, not a model capability we assume. We maintain a curated Lebanese generation guide, separate from clinical knowledge, with explicit rules for what the model should and shouldn't generate.",
                  border: "border-myhayat-pink",
                },
                {
                  icon: <Shield className="w-8 h-8 text-myhayat-teal" />,
                  title: "Deterministic safety first",
                  desc: "Crisis detection runs before the language model. It's a pattern-matching classifier, not a neural network hoping for the best. High-risk messages get a verified safe response — the generative model never controls a crisis response.",
                  border: "border-myhayat-teal",
                },
                {
                  icon: <Database className="w-8 h-8 text-myhayat-yellow" />,
                  title: "Evidence-informed, not fine-tuned",
                  desc: "We use CBT, DBT and ACT frameworks as the basis for how the model should respond — through system instructions and a clinical knowledge retrieval layer, not by fine-tuning on patient data we don't have.",
                  border: "border-myhayat-yellow",
                },
              ].map((item, i) => (
                <MyHayatCard key={i} noPattern className={`p-6 bg-white dark:bg-[#251320] ${item.border} border-4 transition-shadow h-full`}>
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-titan text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-pretty text-sm">{item.desc}</p>
                </MyHayatCard>
              ))}
            </div>
          </div>
        </section>

        {/* What it's not — limits section */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-titan text-center mb-4">
              What My Hayat <span className="text-myhayat-salmon">still gets wrong</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto text-pretty">
              This is a prototype. Honest limits are a feature, not a disclaimer.
            </p>
            <div className="space-y-4">
              {[
                "Lebanese Arabizi generation is the hardest part. Generic foundation models default to Egyptian or MSA Arabic. Our guardrails catch many failures, but they can't automatically prove a sentence sounds native. Native-speaker review is ongoing.",
                "The model sometimes misses the emotional intent behind a message and responds too clinically, or the other way around. We log these failures and they inform the next training pass.",
                "Echoes — session memory and pattern tracking — is not live yet. Every conversation starts fresh. That's a privacy default, not a finished feature.",
                "This is not emergency care. If you or someone you know is in immediate danger, call Embrace Lifeline: 1564.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 dark:bg-[#251320]/60 border-2 border-myhayat-salmon/20 dark:border-myhayat-pink/20">
                  <span className="font-titan text-2xl text-myhayat-yellow opacity-60 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-gray-700 dark:text-gray-300 text-pretty">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-20 px-4 md:px-8 relative section-teal">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-titan text-center mb-12">
              {t("howItWorks.security.title")}{" "}
              <span className="text-myhayat-teal">{t("howItWorks.security.titleHighlight")}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 dark:bg-[#251320]/50 border-2 border-myhayat-teal/20 hover:border-myhayat-teal/50 transition-colors card-edge-glow">
                  <div className="w-10 h-10 rounded-full bg-myhayat-teal/10 text-myhayat-teal flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-pretty">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <img src="/Illustrations/couple relaxing in the garden on the lawn.svg" alt="Peaceful reflection" className="w-80 h-auto" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-4 md:mx-8 mb-20">
          <div className="max-w-6xl mx-auto relative rounded-[3rem] bg-myhayat-pink p-12 md:p-16 overflow-hidden border-4 border-myhayat-salmon shadow-[var(--shadow-curved)]">
            <JapaneseCubesPattern size={28} opacity={0.1} className={"absolute inset-0 pointer-events-none -z-10" + " mix-blend-overlay"} />

            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-titan text-white">
                See it for yourself.
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto text-pretty">
                The honest test of whether this works is whether a Lebanese person can open it, type naturally, and feel understood enough to keep going.
              </p>
              <Link href="/chat">
                <MyHayatButton size="lg" className="bg-white text-myhayat-pink border-white hover:bg-gray-50">
                  Try the demo <ArrowRight className="w-5 h-5 ms-2 inline" />
                </MyHayatButton>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
