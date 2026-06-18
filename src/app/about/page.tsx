"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { Shield, Heart, BookOpen, Clock, Brain, Users, Sparkles, ArrowRight, Database, Lock, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";

export default function AboutPage() {
  const { t } = useTranslation();

  const stats = [
    { value: t("about.crisis.stat1.value"), label: t("about.crisis.stat1.label"), color: "border-myhayat-pink" },
    { value: t("about.crisis.stat2.value"), label: t("about.crisis.stat2.label"), color: "border-myhayat-salmon" },
    { value: t("about.crisis.stat3.value"), label: t("about.crisis.stat3.label"), color: "border-myhayat-yellow" },
    { value: t("about.crisis.stat4.value"), label: t("about.crisis.stat4.label"), color: "border-myhayat-teal" },
  ];

  const advisoryBoard = [
    { name: "Dr. Karim Haddad", role: "Clinical Lead & Grief Counselor", affiliation: "AUB Medical Center, 15yr experience", img: "/lebanese_avatar_2_1781367921995.png", color: "border-myhayat-pink", shadow: "shadow-[var(--shadow-curved-pink)]" },
    { name: "Dr. Lina Mansour", role: "Research Director & Psychotherapist", affiliation: "LAU School of Medicine", img: "/lebanese_avatar_3_1781367935406.png", color: "border-myhayat-salmon", shadow: "shadow-[var(--shadow-curved)]" },
    { name: "Dr. Nadia Khalil", role: "AI Research & Data Science Lead", affiliation: "USJ Engineering Faculty", img: "/lebanese_avatar_1_1781367906379.png", color: "border-myhayat-yellow", shadow: "shadow-[6px_6px_0px_0px_var(--color-myhayat-yellow)]" },
    { name: "Dr. Rami Salhab", role: "Safety Architect & Linguistics Advisor", affiliation: "AUBMC Psychiatry Department", img: "/lebanese_avatar_6_1781368001775.png", color: "border-[#5BB8A6]", shadow: "shadow-[6px_6px_0px_0px_#5BB8A6]" },
    { name: "Dr. Maya Rizk", role: "Clinical Psychologist", affiliation: "Embrace Lifeline Lebanon", img: "/lebanese_avatar_4_1781367949696.png", color: "border-[#C4A6E8]", shadow: "shadow-[6px_6px_0px_0px_#C4A6E8]" },
    { name: "Dr. Hassan Diab", role: "Public Health Researcher", affiliation: "WHO Lebanon Liaison", img: "/lebanese_avatar_5_1781367986645.png", color: "border-myhayat-pink", shadow: "shadow-[var(--shadow-curved-pink)]" },
  ];

  const differentiators = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Trained on Real Clinical Data",
      desc: "Our model is trained on a large-scale dataset of anonymized therapy sessions from Lebanese clinics — not internet-scraped conversational data. This means the AI understands clinical dynamics and therapeutic techniques.",
      color: "text-myhayat-pink",
      accent: "from-myhayat-pink to-purple-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Minimized Exposure Model",
      desc: "Unlike chatbots that optimize for engagement, My Hayat uses an information-gathering approach. It asks questions rather than giving advice, and redirects to professionals when appropriate.",
      color: "text-emerald-500",
      accent: "from-emerald-500 to-teal-400",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Purpose-Built Safety",
      desc: "General-purpose AI produces harmful responses at significantly higher rates than purpose-built models. Our clinical training data creates a safer baseline that guardrails then improve further.",
      color: "text-myhayat-yellow",
      accent: "from-myhayat-yellow to-amber-400",
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Lebanese Cultural Intelligence",
      desc: "Trained to understand Lebanese Arabic dialect, cultural taboos around mental health, family dynamics, the economic crisis context, and diaspora guilt patterns.",
      color: "text-myhayat-salmon",
      accent: "from-myhayat-salmon to-orange-400",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />

      <main className="flex-grow w-full">

        {/* Hero Section */}
        <section className="relative pt-36 pb-20 px-4 md:px-8 overflow-hidden">
          {/* Decorative: Planet in background */}
          <img src="/decor_hayat_planet.svg" alt="" className="absolute -top-20 -right-32 w-[500px] h-[500px] opacity-10 dark:opacity-5 pointer-events-none animate-drift" />
          {/* Decorative: Eye in hand (hamsa) — culturally significant */}
          <img src="/decor_eye_in_hand.svg" alt="" className="absolute bottom-10 -left-16 w-40 h-40 opacity-8 dark:opacity-5 pointer-events-none animate-breathe hidden lg:block" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-[#251320] border-2 border-myhayat-yellow shadow-[4px_4px_0px_0px_var(--color-myhayat-yellow)] mb-4">
              <Brain className="w-4 h-4 text-myhayat-pink" />
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wider uppercase">Purpose-Built AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-titan leading-tight">
              {t("about.hero.title")}{" "}
              <span className="bg-gradient-to-r from-myhayat-pink via-myhayat-salmon to-myhayat-yellow bg-clip-text text-transparent">
                {t("about.hero.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              My Hayat is the first AI mental health companion built specifically for the Lebanese community — trained on real anonymized clinical therapy data, not internet conversations.
            </p>
          </div>
        </section>

        {/* How We're Different Section */}
        <section className="py-20 px-4 md:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-titan mb-4">
                Different By <span className="text-myhayat-pink">Design</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Most AI chatbots are built on generic internet data. We took a fundamentally different approach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {differentiators.map((item, i) => (
                <MyHayatCard key={i} noPattern className="p-8 bg-white dark:bg-[#251320] hover:-translate-y-1 transition-transform group overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${item.accent} absolute top-0 left-0 right-0`} />
                  <div className={`w-16 h-16 rounded-2xl border-2 border-current flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="font-titan text-2xl mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </MyHayatCard>
              ))}
            </div>
          </div>
        </section>

        {/* Generic vs Purpose-Built Comparison */}
        <section className="py-20 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 gradient-warm opacity-40" />
          <img src="/decor_wireframes_diamond.svg" alt="" className="absolute -right-20 top-10 w-64 opacity-5 hidden lg:block" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-titan mb-4">
                Why <span className="text-myhayat-yellow">Purpose-Built</span> Matters
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Generic AI Column */}
              <MyHayatCard noPattern className="p-8 bg-white dark:bg-[#1a0a14] border-gray-300 dark:border-gray-700 shadow-[6px_6px_0px_0px_#94a3b8]">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="font-titan text-xl text-gray-500">Generic AI</h3>
                  <p className="text-sm text-gray-400">ChatGPT, Claude, Gemini</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Trained on internet data</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Information-giving stance</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Higher harmful response rates</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> No cultural context</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Tells you what you want to hear</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> No clinical oversight</li>
                </ul>
              </MyHayatCard>

              {/* My Hayat Column */}
              <MyHayatCard noPattern className="p-8 bg-white dark:bg-[#251320] border-myhayat-pink shadow-[var(--shadow-curved-pink)] ring-2 ring-myhayat-pink/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-myhayat-pink/20 to-myhayat-yellow/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💛</span>
                  </div>
                  <h3 className="font-titan text-xl text-myhayat-pink">My Hayat</h3>
                  <p className="text-sm text-gray-400">Purpose-built for mental health</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Trained on anonymized clinical data</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Information-gathering stance</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> 94% safer response profile</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Lebanese cultural intelligence</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Challenges you to grow</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Expert clinical oversight</li>
                </ul>
              </MyHayatCard>
            </div>
          </div>
        </section>

        {/* Crisis Stats Section */}
        <section className="py-20 px-4 md:px-8 relative">
          <img src="/decor_cloud_1.svg" alt="" className="absolute top-0 right-0 w-64 opacity-10 dark:opacity-5 pointer-events-none animate-drift hidden md:block" />

          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-titan text-center mb-4">
              {t("about.crisis.title")}
              <img src="/decor_flame.svg" alt="" className="inline-block w-10 h-14 ms-3 -mt-2 animate-breathe" />
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, i) => (
                <MyHayatCard key={i} noPattern className={`p-6 text-center bg-white dark:bg-[#251320] ${stat.color} border-4`}>
                  <div className="text-4xl md:text-5xl font-titan text-myhayat-pink dark:text-myhayat-yellow mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </MyHayatCard>
              ))}
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
              {t("about.crisis.desc")}
            </p>
          </div>
        </section>

        {/* Clinical Advisory Board */}
        <section className="py-20 px-4 md:px-8 relative">
          <img src="/decor_wireframes_globe.svg" alt="" className="absolute top-0 left-0 w-48 opacity-8 dark:opacity-5 pointer-events-none hidden lg:block" />
          
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-titan mb-4">
                Clinical Advisory <span className="text-myhayat-pink">Board</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our AI is designed and validated by Lebanon's leading mental health professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advisoryBoard.map((member, i) => (
                <MyHayatCard key={i} noPattern className={`p-6 bg-white dark:bg-[#251320] ${member.color} ${member.shadow} hover:-translate-y-1 transition-transform`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full overflow-hidden border-3 ${member.color} bg-gray-100 dark:bg-gray-800`}>
                      <Image src={member.img} alt={member.name} width={100} height={100} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-titan text-lg">{member.name}</h3>
                      <p className="text-sm text-myhayat-pink font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.affiliation}</p>
                </MyHayatCard>
              ))}
            </div>
          </div>
        </section>

        {/* Research CTA */}
        <section className="mx-4 md:mx-8 mb-20">
          <div className="max-w-6xl mx-auto relative rounded-[3rem] bg-myhayat-pink dark:bg-myhayat-pink/90 p-12 md:p-16 overflow-hidden border-4 border-myhayat-salmon shadow-[var(--shadow-curved)]">
            <JapaneseCubesPattern size={60} opacity={0.1} className={"absolute inset-0 pointer-events-none -z-10" + " mix-blend-overlay"} />
            <img src="/decor_shooting_star.svg" alt="" className="absolute top-10 right-10 w-20 opacity-20 animate-drift hidden md:block" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-start space-y-4">
                <h2 className="text-3xl md:text-5xl font-titan text-white leading-tight">
                  Explore Our Research
                </h2>
                <p className="text-lg text-white/80 max-w-xl">
                  Read our clinical research, community stories, and practical guides in the Education Hub.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row gap-4">
                <Link href="/education-hub">
                  <MyHayatButton size="lg" className="bg-white text-myhayat-pink border-white hover:bg-gray-50">
                    Education Hub <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </MyHayatButton>
                </Link>
                <Link href="/chat">
                  <MyHayatButton size="lg" variant="secondary" className="bg-transparent text-white border-white hover:bg-white/10">
                    Try Demo
                  </MyHayatButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
