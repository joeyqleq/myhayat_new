"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { Iphone } from "@/components/ui/iphone";
import { useTranslation } from "@/lib/i18n";
import { MessageCircle, Sparkles, TrendingUp, Lock, ShieldCheck, Download, FileCheck, Database, Brain, Shield, Eye, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HowItWorksPage() {
  const { t } = useTranslation();

  const pipeline = [
    {
      num: "01",
      icon: <Database className="w-8 h-8" />,
      title: "Anonymized Clinical Data",
      desc: "We partner with Lebanese clinics to collect therapy session transcripts. All data is rigorously anonymized — no names, no identifiers, no location data. Only the therapeutic dynamics remain.",
      color: "bg-myhayat-pink",
      borderColor: "border-myhayat-pink",
    },
    {
      num: "02",
      icon: <Brain className="w-8 h-8" />,
      title: "The 'Ash' Difference: Fine-Tuning vs. Prompts",
      desc: "Unlike generic chatbots that just use a 'system prompt' to pretend they are therapists, My Hayat is fine-tuned directly on clinical datasets. Similar to advanced systems like 'Ash', it natively understands therapeutic questioning, emotional validation patterns, and crisis de-escalation because that's what it was built on—not just instructed to do.",
      color: "bg-myhayat-yellow",
      borderColor: "border-myhayat-yellow",
    },
    {
      num: "03",
      icon: <Shield className="w-8 h-8" />,
      title: "Safety Audits & Validation",
      desc: "Every model version is tested against suicide/self-harm benchmarks, evaluated by our clinical advisory board, and compared against general-purpose AI for harmful response rates.",
      color: "bg-emerald-500",
      borderColor: "border-emerald-400",
    },
    {
      num: "04",
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Your Conversation",
      desc: "When you talk to My Hayat, it uses an information-gathering stance — asking you thoughtful questions, not giving generic advice. It speaks your Lebanese dialect and understands your cultural context.",
      color: "bg-myhayat-salmon",
      borderColor: "border-myhayat-salmon",
    },
    {
      num: "05",
      icon: <Eye className="w-8 h-8" />,
      title: "Pattern Recognition",
      desc: "Over time, My Hayat connects today's stress to patterns from weeks ago. Using NLP analysis, it discovers emotional patterns you can't see yourself and offers breakthrough insights.",
      color: "bg-purple-500",
      borderColor: "border-purple-400",
    },
    {
      num: "06",
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Outcome Measurement",
      desc: "We track real-world outcomes: symptom reduction (PHQ-9, GAD-7), behavioral activation, and social support metrics. More engagement with My Hayat predicts better outcomes, not worse.",
      color: "bg-myhayat-teal",
      borderColor: "border-myhayat-teal",
    },
  ];

  const securityItems = [
    { icon: <Lock className="w-5 h-5" />, text: t("howItWorks.security.1") },
    { icon: <ShieldCheck className="w-5 h-5" />, text: t("howItWorks.security.2") },
    { icon: <Download className="w-5 h-5" />, text: t("howItWorks.security.3") },
    { icon: <FileCheck className="w-5 h-5" />, text: t("howItWorks.security.4") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full">

        {/* Hero */}
        <section className="relative pt-36 pb-16 px-4 md:px-8 overflow-hidden">
          <img src="/decor_wireframes_flower_1.svg" alt="" className="absolute -top-10 -right-20 w-72 opacity-8 dark:opacity-4 pointer-events-none hidden lg:block" />
          <img src="/decor_twinkle_yellow.svg" alt="" className="absolute bottom-20 left-10 w-8 h-8 opacity-40 animate-pulse pointer-events-none hidden md:block" />
          <img src="/decor_shapes_ring_pattern.svg" alt="" className="absolute top-40 -left-20 w-64 opacity-5 pointer-events-none hidden lg:block" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-[#251320] border-2 border-myhayat-salmon shadow-[4px_4px_0px_0px_var(--color-myhayat-salmon)] mb-4">
              <Sparkles className="w-4 h-4 text-myhayat-yellow" />
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wider uppercase">The Science Behind My Hayat</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-titan leading-tight">
              <AnimatedGradientText className="!bg-transparent !p-0 inline">
                <span className="inline animate-gradient bg-gradient-to-r from-[#F85BAA] via-[#FEC810] to-[#F85BAA] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                  From Clinical Sessions
                </span>
              </AnimatedGradientText>
              <br />
              to Compassionate <span className="text-myhayat-yellow">Responses</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A transparent look at how we build an AI that actually understands mental health — not just simulates it.
            </p>
          </div>
        </section>

        {/* Clinical Data Pipeline */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-titan text-center mb-16">
              The Clinical Data <span className="text-myhayat-pink">Pipeline</span>
            </h2>
            
            <div className="space-y-6">
              {pipeline.map((step, i) => (
                <div key={i} className="relative">
                  {/* Connector */}
                  {i < pipeline.length - 1 && (
                    <div className="absolute left-7 top-[calc(100%)] w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600 z-0 hidden md:block" />
                  )}
                  
                  <MyHayatCard noPattern className={`p-6 md:p-8 bg-white dark:bg-[#251320] ${step.borderColor} border-4 hover:-translate-y-1 transition-transform relative z-10`}>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="flex items-center gap-4 shrink-0">
                        <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-md`}>
                          {step.icon}
                        </div>
                        <span className="font-titan text-4xl text-gray-200 dark:text-gray-700">{step.num}</span>
                      </div>
                      <div>
                        <h3 className="font-titan text-xl md:text-2xl mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </MyHayatCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Preview with iPhone */}
        <section className="py-16 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 gradient-warm" />
          <img src="/decor_wireframes_waves_2.svg" alt="" className="absolute bottom-0 left-0 w-full opacity-5 pointer-events-none" />
          
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-5xl font-titan">
                See It In <span className="text-myhayat-pink">Action</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
                Try a simulated conversation with My Hayat. Experience how purpose-built AI responds differently from generic chatbots — with cultural awareness, clinical grounding, and genuine empathy.
              </p>
              <Link href="/chat">
                <MyHayatButton size="lg">
                  Try Demo <ArrowRight className="w-5 h-5 ml-2 inline" />
                </MyHayatButton>
              </Link>
            </div>
            <div className="w-full max-w-[280px] relative">
              <Iphone className="w-full shadow-2xl">
                <div className="w-full h-full bg-[#1a0a14] flex flex-col items-center p-4">
                  <div className="mt-12 mb-4">
                    <img src="/Watermelon.png" alt="Watermelon Logo" className="w-16 h-16 object-contain animate-breathe" />
                  </div>
                  <h4 className="font-titan text-myhayat-pink text-2xl mb-6">My Hayat</h4>
                  <div className="w-full bg-white/10 rounded-2xl p-4 mb-4">
                    <p className="text-sm text-gray-300">How are you feeling today?</p>
                  </div>
                  <div className="w-full bg-myhayat-pink/20 rounded-2xl p-4 ml-8 border border-myhayat-pink/30">
                    <p className="text-sm text-myhayat-pink">I'm feeling a bit overwhelmed with everything...</p>
                  </div>
                </div>
              </Iphone>
              <img src="/decor_pink_asterisk.svg" alt="" className="absolute -top-6 -right-6 w-12 h-12 animate-spin-slow pointer-events-none" />
              <img src="/decor_twinkle_salmon.svg" alt="" className="absolute -bottom-4 -left-4 w-6 h-6 animate-pulse pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Key Outcomes */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-titan text-center mb-4">
              Real-World <span className="text-myhayat-yellow">Results</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Our proof-of-concept studies show measurable improvement across key mental health indicators.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "94%", label: "Safer responses than generic AI", color: "border-emerald-400" },
                { value: "67%", label: "Users report reduced anxiety", color: "border-myhayat-pink" },
                { value: "3.2x", label: "Higher engagement = better outcomes", color: "border-myhayat-yellow" },
                { value: "24/7", label: "Always available, no waitlist", color: "border-myhayat-salmon" },
              ].map((stat, i) => (
                <MyHayatCard key={i} noPattern className={`p-6 text-center bg-white dark:bg-[#251320] ${stat.color} border-4`}>
                  <div className="text-3xl md:text-4xl font-titan text-myhayat-pink dark:text-myhayat-yellow mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </MyHayatCard>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-20 px-4 md:px-8 relative">
          <img src="/decor_wireframes_diamond.svg" alt="" className="absolute top-10 right-10 w-40 opacity-6 dark:opacity-3 pointer-events-none hidden lg:block" />

          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-titan text-center mb-12">
              {t("howItWorks.security.title")}{" "}
              <span className="text-myhayat-teal">{t("howItWorks.security.titleHighlight")}</span>
              <img src="/decor_twinkle_salmon.svg" alt="" className="inline-block w-6 h-6 ms-2 animate-pulse" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 dark:bg-[#251320]/50 border-2 border-myhayat-teal/20 hover:border-myhayat-teal/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-myhayat-teal/10 text-myhayat-teal flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Hub CTA */}
        <section className="mx-4 md:mx-8 mb-20">
          <div className="max-w-6xl mx-auto relative rounded-[3rem] bg-gradient-to-r from-myhayat-yellow via-myhayat-salmon to-myhayat-pink p-12 md:p-16 overflow-hidden border-4 border-white/20">
            <div className="absolute inset-0 bg-japanese-cubes opacity-10 mix-blend-overlay" />
            
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-titan text-white">
                Want to Go Deeper?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Explore our clinical research, community stories, and practical mental health guides.
              </p>
              <Link href="/education-hub">
                <MyHayatButton size="lg" className="bg-white text-myhayat-pink border-white hover:bg-gray-50">
                  Explore Education Hub <ArrowRight className="w-5 h-5 ml-2 inline" />
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
