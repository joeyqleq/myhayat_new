"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { Iphone } from "@/components/ui/iphone";
import { useTranslation } from "@/lib/i18n";
import { Mic, Brain, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EchoesPage() {
  const { t } = useTranslation();

  const phases = [
    {
      num: "01",
      icon: <Mic className="w-7 h-7" />,
      title: "Voice Capture",
      desc: "Share audio clips or voice notes of your loved one. Our system builds a unique acoustic profile from these memories.",
      color: "bg-myhayat-pink",
    },
    {
      num: "02",
      icon: <Brain className="w-7 h-7" />,
      title: "Model Generation",
      desc: "AI creates a faithful voice profile — not an impersonation, but a symbolic bridge to cherished memories.",
      color: "bg-myhayat-lavender",
    },
    {
      num: "03",
      icon: <MessageCircle className="w-7 h-7" />,
      title: "Conversation",
      desc: "Have guided conversations that reflect your loved one's warmth. Every session is clinically supervised in design.",
      color: "bg-myhayat-teal",
    },
    {
      num: "04",
      icon: <Heart className="w-7 h-7" />,
      title: "Memory Garden",
      desc: "Build a living collection of memories, voice echoes, and reflections that grows with your healing journey.",
      color: "bg-myhayat-salmon",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full">

        {/* Hero */}
        <section className="relative pt-36 pb-20 px-4 md:px-8 overflow-x-clip">
          {/* Decorative: Lips — expression of voice/speech */}
          <img src="/decor_lips.svg" alt="" className="absolute -top-10 -right-32 w-[400px] opacity-8 dark:opacity-4 pointer-events-none rotate-12 hidden lg:block" />
          {/* Decorative: Flame — emotional intensity, love that doesn't die */}
          <img src="/decor_flame.svg" alt="" className="absolute -bottom-20 -left-16 w-48 opacity-10 dark:opacity-5 pointer-events-none hidden lg:block animate-breathe" />

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-block px-6 py-2 bg-myhayat-lavender/30 text-myhayat-lavender dark:text-myhayat-lavender rounded-full font-bold text-sm border-2 border-myhayat-lavender/30">
              {t("echoes.badge")} ✨
            </div>
            <h1 className="text-5xl md:text-7xl font-titan leading-tight">
              <AnimatedGradientText className="!bg-transparent !p-0 inline">
                <span className="inline animate-gradient bg-gradient-to-r from-[#F85BAA] via-[#F98181] to-[#F85BAA] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                  {t("echoes.title")}
                </span>
              </AnimatedGradientText>{" "}
              <span className="text-myhayat-pink relative inline-block">
                {t("echoes.titleHighlight")}
                <img src="/decor_twinkle_pink.svg" alt="" className="absolute -top-6 -right-8 decor-sm animate-twinkle" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t("echoes.desc")}
            </p>
          </div>
        </section>

        {/* What is Echoes — Emotional Intro */}
        <section className="py-16 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 gradient-warm" />
          {/* Decorative: Planet — represents the cosmos of memory/afterlife */}
          <img src="/decor_hayat_planet_2.svg" alt="" className="absolute top-10 right-10 w-24 opacity-20 dark:opacity-10 pointer-events-none animate-drift hidden md:block" />

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-titan">
                When words aren&apos;t enough to say goodbye
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Echoes is a premium grief support feature designed with clinical oversight. It lets you hear supportive reflections 
                in the reproduced voice of a departed loved one — not as communication, but as a <em>symbolic remembrance ritual</em>.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Built in partnership with grief specialists and rooted in Lebanese mourning traditions, Echoes helps you 
                process loss at your own pace, in your own language.
              </p>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-myhayat-pink/10 dark:bg-myhayat-pink/5 border-2 border-myhayat-pink/20">
                <img src="/decor_eye_in_hand.svg" alt="" className="w-10 h-10 opacity-60" />
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Designed with cultural sensitivity, clinical supervision, and full ethical review.
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-[280px]">
                <Iphone className="w-full shadow-2xl">
                  <div className="w-full h-full bg-[#1a0a14] flex flex-col p-4 relative">
                    <div className="absolute top-10 left-0 w-full flex justify-center">
                      <img src="/Watermelon.png" alt="Watermelon" className="w-10 h-10 object-contain opacity-50" />
                    </div>
                    <div className="mt-24 space-y-4">
                      <div className="bg-myhayat-lavender/20 p-4 rounded-2xl w-[80%] rounded-tl-none">
                        <p className="text-sm text-myhayat-lavender">"I'm always here with you, habibi."</p>
                      </div>
                      <div className="bg-myhayat-pink/20 p-4 rounded-2xl w-[80%] rounded-tr-none self-end ml-auto">
                        <p className="text-sm text-myhayat-pink">I miss hearing your voice so much.</p>
                      </div>
                    </div>
                  </div>
                </Iphone>
                {/* Decorative: Salmon asterisk — emotional emphasis */}
                <img src="/decor_salmon_asterisk.svg" alt="" className="absolute -bottom-6 -left-6 decor-md animate-spin-slow pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* 4-Phase Process */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-titan text-center mb-4">
              How Echoes Works
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
              A careful, four-phase journey designed to honor memory with dignity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phases.map((phase, i) => (
                <MyHayatCard key={i} noPattern className="p-6 bg-white dark:bg-[#251320] hover:-translate-y-2 transition-transform">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full ${phase.color} text-white flex items-center justify-center shadow-md`}>
                      {phase.icon}
                    </div>
                    <span className="font-titan text-3xl text-gray-200 dark:text-gray-700">{phase.num}</span>
                  </div>
                  <h3 className="font-titan text-xl mb-2">{phase.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{phase.desc}</p>
                </MyHayatCard>
              ))}
            </div>
          </div>
        </section>

        {/* Ethical Framework */}
        <section className="py-20 px-4 md:px-8 relative">
          {/* Decorative: Nuclear lines — represents the ethics/science framework */}
          <img src="/decor_shapes_nuclear_lines.svg" alt="" className="absolute top-0 left-0 w-64 opacity-5 dark:opacity-3 pointer-events-none hidden lg:block" />

          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-titan text-center mb-12">
              Built on Trust
              <img src="/decor_twinkle_yellow.svg" alt="" className="inline-block decor-sm ms-2 animate-twinkle" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Clinical Supervision", desc: "Every Echoes conversation template is reviewed by Dr. Safia, our trauma specialist." },
                { title: "Informed Consent", desc: "Users go through a clear consent process understanding what Echoes is and isn't." },
                { title: "Cultural Respect", desc: "Rooted in Lebanese mourning traditions — sitting with grief, not rushing through it." },
                { title: "User Control", desc: "Pause, delete, or export your Echoes data at any time. You're always in control." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/50 dark:bg-[#251320]/50 border-2 border-myhayat-lavender/20 hover:border-myhayat-lavender/50 transition-colors">
                  <h4 className="font-titan text-xl mb-2 text-myhayat-lavender">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <img src="/decor_cloud_3.svg" alt="" className="mx-auto w-40 opacity-30 animate-drift mb-4" />
            <h2 className="text-3xl md:text-5xl font-titan">
              Ready to remember?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Echoes is available in the Premium Plus plan. Join the waitlist to be notified when we launch.
            </p>
            <Link href="/pricing">
              <MyHayatButton size="lg" className="mx-auto">{t("pricing.plus.cta")}</MyHayatButton>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
