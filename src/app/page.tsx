"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

import { useTranslation } from "@/lib/i18n";
import { Marquee } from "@/components/ui/marquee";
import { Iphone } from "@/components/ui/iphone";
import { SparklesText } from "@/components/ui/sparkles-text";
import { HyperText } from "@/components/ui/hyper-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";

export default function Home() {
  const { t } = useTranslation();
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail }),
      });
      setWaitlistSubmitted(true);
      setWaitlistEmail("");
    } catch { /* noop for MVP */ }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-myhayat-offwhite dark:bg-[#1a0a14] relative text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />

      <main className="flex-grow w-full">
        
        {/* HERO SECTION */}
        <section className="relative h-[100dvh] flex items-center pt-20 pb-0 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 gradient-warm opacity-50 z-0 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-20">
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-start space-y-6 relative">
                
                {/* Decoration: Sun — warmth, energy */}
                <img src="/decor_sun.svg" alt="" className="absolute -top-32 -left-20 w-48 h-48 opacity-15 dark:opacity-8 animate-spin-slow pointer-events-none hidden lg:block" style={{ animationDuration: '20s' }} />

                {/* Badge */}
                <div className="animate-tilt inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-[#251320] border-2 border-myhayat-yellow shadow-[4px_4px_0px_0px_var(--color-myhayat-yellow)] hover:rotate-0 transition-transform cursor-default">
                     <span className="w-3 h-3 rounded-full bg-myhayat-pink animate-pulse" />
                     <span className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 tracking-widest uppercase">{t("hero.badge")}</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-titan leading-[0.95] relative z-20">
                  <AnimatedGradientText className="!bg-transparent !p-0">
                    <span className="inline animate-gradient bg-gradient-to-r from-[#F85BAA] via-[#FEC810] to-[#F85BAA] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                      {t("hero.title1")}
                    </span>
                  </AnimatedGradientText>
                  <br />
                  <AnimatedGradientText className="!bg-transparent !p-0">
                    <span className="inline animate-gradient bg-gradient-to-r from-[#F98181] via-[#F85BAA] to-[#F98181] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                      {t("hero.title2")}
                    </span>
                  </AnimatedGradientText>
                    {/* Decor: Melting smiley — playfulness */}
                    <img src="/decor_melting_smiley.svg" alt="" className="hidden md:block absolute -right-12 -top-12 w-24 h-24 animate-float -z-10" />
                </h1>

                {/* Subheadline */}
                <div className="relative">
                    <TypingAnimation 
                      as="p"
                      duration={30}
                      className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium max-w-xl mx-auto md:mx-0 leading-relaxed"
                    >
                        {t("hero.subtitle")}
                    </TypingAnimation>
                    <img src="/decor_heart.svg" alt="" className="absolute -bottom-8 end-0 w-8 h-8 animate-sequence hidden md:block" />
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
                     <Link href="/chat">
                       <MyHayatButton size="lg" className="w-full sm:w-auto">
                           {t("hero.cta1")}
                       </MyHayatButton>
                     </Link>
                     <Link href="/how-it-works">
                       <MyHayatButton variant="secondary" size="lg" className="w-full sm:w-auto">
                           {t("hero.cta2")}
                       </MyHayatButton>
                     </Link>
                </div>

                {/* Decorative: Shooting star */}
                <img src="/decor_shoot_star_2.svg" alt="" className="absolute -start-12 top-1/2 w-12 h-12 opacity-40 animate-drift hidden md:block" />
            </div>

            {/* Visual Content */}
            <div className="flex-1 relative w-full flex justify-center md:justify-end -translate-y-2 md:-translate-y-4">
                 {/* Blob background */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[linear-gradient(45deg,#F85BAA,#FEC810,#5BB8A6,#F98181)] opacity-20 rounded-full blur-3xl -z-10 animate-rainbow-bg" />
                 
                 <div className="relative z-10 w-full max-w-[360px] animate-sequence" style={{ animationDuration: '8s' }}>
                      <Image 
                        src="/myhayat_hero.png" 
                        alt="My Hayat Hero Illustration" 
                        width={500} 
                        height={500} 
                        className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        priority
                      />
                 </div>

                 {/* Orbiting cubes — playful depth without covering hero copy */}
                 <div className="hero-cube-orbit -bottom-8 -start-2 md:-start-12 z-20 hidden sm:block" aria-hidden="true">
                    <div className="hero-cube-orbit__track">
                      <div className="hero-cube-orbit__cube">
                        <Image src="/decor_cube_1.svg" alt="" width={96} height={96} />
                      </div>
                    </div>
                    <div className="hero-cube-orbit__track hero-cube-orbit__track--reverse">
                      <div className="hero-cube-orbit__cube">
                        <Image src="/decor_cube_2.svg" alt="" width={96} height={96} />
                      </div>
                    </div>
                 </div>
            </div>
          </div>
        </section>

        {/* Cloud transition between hero and features */}
        <div className="relative -mt-8 z-30 pointer-events-none">
          <img src="/decor_cloud_1.svg" alt="" className="w-80 mx-auto opacity-20 dark:opacity-10 animate-drift" />
        </div>

        {/* NON-HERO SECTIONS CONTAINER */}
        <div className="relative">
          {/* FEATURES SECTION */}
          <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto relative z-20">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Card 1: Zero Judgment */}
                 <MyHayatCard noPattern className="p-8 bg-white dark:bg-[#251320] group hover:-translate-y-2 transition-transform h-full"> 
                     <div className="w-16 h-16 rounded-full bg-myhayat-pink/10 dark:bg-myhayat-pink/20 border-2 border-myhayat-salmon flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <span className="text-3xl">❤️</span>
                     </div>
                     <h3 className="font-titan text-3xl mb-3">{t("features.zeroJudgment.title")}</h3>
                     <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {t("features.zeroJudgment.desc")}
                     </p>
                 </MyHayatCard>

                 {/* Card 2: Lebanese Dialect */}
                 <MyHayatCard noPattern className="p-8 bg-white dark:bg-[#251320] group hover:-translate-y-2 transition-transform h-full border-myhayat-pink shadow-[var(--shadow-curved-pink)]">
                     <div className="w-16 h-16 rounded-full bg-myhayat-yellow/10 dark:bg-myhayat-yellow/20 border-2 border-myhayat-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <span className="text-3xl">🇱🇧</span>
                     </div>
                     <h3 className="font-titan text-3xl mb-3">{t("features.dialect.title")}</h3>
                     <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {t("features.dialect.desc")}
                     </p>
                 </MyHayatCard>

                 {/* Card 3: Here 24/7 */}
                 <MyHayatCard noPattern className="p-8 bg-white dark:bg-[#251320] group hover:-translate-y-2 transition-transform h-full border-myhayat-yellow shadow-[var(--shadow-curved-yellow)]">
                     <div className="w-16 h-16 rounded-full bg-myhayat-teal/10 dark:bg-myhayat-teal/20 border-2 border-myhayat-yellow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <span className="text-3xl">🌙</span>
                     </div>
                     <h3 className="font-titan text-3xl mb-3">{t("features.247.title")}</h3>
                     <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {t("features.247.desc")}
                     </p>
                 </MyHayatCard>
             </div>

             {/* Decoration: Cherry blossom between sections */}
             <div className="flex justify-center mt-12 opacity-30 dark:opacity-15">
               <img src="/Cherry blossom branch.svg" alt="" className="w-48 animate-sway dark:hidden" />
               <img src="/Cherry blossom branch black.svg" alt="" className="w-48 animate-sway hidden dark:block" />
             </div>

             {/* Illustration accent */}
             <div className="flex justify-center mt-8">
               <img src="/Illustrations/mom and daughter are going on a trip.svg" alt="Starting a journey together" className="w-64 h-auto" />
             </div>
        </section>

        {/* ECHOES TEASER SECTION */}
        <section className="mb-32 mx-4 md:mx-8">
            <div className="relative rounded-[3rem] bg-myhayat-pink dark:bg-myhayat-pink/90 p-8 md:p-16 overflow-hidden border-4 border-myhayat-salmon shadow-[var(--shadow-curved)]">
                 {/* Bg Pattern — hexagons variant */}
                 <JapaneseCubesPattern variant="hexagons" colorScheme="warm" size={28} opacity={0.15} className={"absolute inset-0 pointer-events-none -z-10" + " mix-blend-overlay"} />
                 
                 <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                     <div className="flex-1 space-y-6 text-center lg:text-start text-white">
                         <div className="inline-block px-4 py-1 bg-myhayat-yellow text-gray-900 font-bold rounded-full rotate-2 transform border-2 border-white shadow-sm mb-2">
                             {t("echoes.badge")} ✨
                         </div>
                         <h2 className="text-4xl md:text-6xl font-titan leading-tight">
                             {t("echoes.title")} <span className="text-myhayat-yellow italic">{t("echoes.titleHighlight")}</span>
                         </h2>
                         <p className="text-xl font-medium opacity-90 max-w-xl text-white/90">
                             {t("echoes.desc")}
                         </p>
                         <div className="pt-4">
                             <Link href="/echoes">
                               <MyHayatButton variant="secondary" className="bg-white text-myhayat-pink border-white hover:bg-gray-50">
                                   {t("echoes.cta")}
                               </MyHayatButton>
                             </Link>
                         </div>
                     </div>
                     
                     {/* Visual */}
                     <div className="relative mx-auto w-full max-w-[300px] mt-12 lg:mt-0 drop-shadow-2xl">
                         <Iphone src="/phone_mockup_1.png" className="w-full" />
                         
                         {/* Floating element 1 */}
                         <div className="absolute -left-12 top-1/4 animate-bounce-slow">
                             <Image src="/decor_flame.svg" alt="Flame" width={60} height={60} />
                         </div>
                         {/* Floating element 2 */}
                         <div className="absolute -right-8 bottom-1/3 animate-pulse">
                             <Image src="/decor_heart.svg" alt="Heart" width={50} height={50} />
                         </div>
                    </div>
                 </div>
            </div>
        </section>

        {/* TESTIMONIALS SECTION — full-width marquee */}
        <section className="mb-32 relative z-20">
             {/* Decorations: clouds floating above testimonials */}
             <img src="/decor_cloud_2.svg" alt="" className="absolute -top-12 left-[10%] w-40 opacity-15 dark:opacity-8 animate-drift pointer-events-none hidden md:block" />
             <img src="/decor_cloud_3.svg" alt="" className="absolute -top-8 right-[15%] w-32 opacity-10 dark:opacity-5 animate-drift pointer-events-none hidden lg:block" style={{ animationDelay: '3s' }} />

             <div className="text-center mb-16 space-y-4 px-4 md:px-8 max-w-7xl mx-auto">
                 <h2 className="text-4xl md:text-5xl font-titan">
                     {t("testimonials.title")} <SparklesText className="inline" sparklesCount={5}>{t("testimonials.titleHighlight")}</SparklesText>
                 </h2>
                 <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                     {t("testimonials.subtitle")}
                 </p>
             </div>
             {/* Full-width marquee — guaranteed screen edge to edge */}
             <Marquee pauseOnHover className="[--duration:35s] [--gap:1.5rem] py-4 w-[100vw] relative left-1/2 -translate-x-1/2">
                 {[
                   { name: t("testimonials.1.name"), loc: t("testimonials.1.location"), quote: t("testimonials.1.quote"), img: "/lebanese_avatar_1_1781367906379.png", border: "border-myhayat-yellow", shadow: "shadow-[6px_6px_0px_0px_var(--color-myhayat-yellow)]" },
                   { name: t("testimonials.2.name"), loc: t("testimonials.2.location"), quote: t("testimonials.2.quote"), img: "/lebanese_avatar_2_1781367921995.png", border: "border-myhayat-pink", shadow: "shadow-[var(--shadow-curved-pink)]" },
                   { name: t("testimonials.3.name"), loc: t("testimonials.3.location"), quote: t("testimonials.3.quote"), img: "/lebanese_avatar_3_1781367935406.png", border: "border-myhayat-salmon", shadow: "shadow-[var(--shadow-curved)]" },
                   { name: t("testimonials.4.name"), loc: t("testimonials.4.location"), quote: t("testimonials.4.quote"), img: "/lebanese_avatar_4_1781367949696.png", border: "border-[#5BB8A6]", shadow: "shadow-[6px_6px_0px_0px_#5BB8A6]" },
                   { name: t("testimonials.5.name"), loc: t("testimonials.5.location"), quote: t("testimonials.5.quote"), img: "/lebanese_avatar_5_1781367986645.png", border: "border-[#C4A6E8]", shadow: "shadow-[6px_6px_0px_0px_#C4A6E8]" },
                   { name: t("testimonials.6.name"), loc: t("testimonials.6.location"), quote: t("testimonials.6.quote"), img: "/lebanese_avatar_6_1781368001775.png", border: "border-myhayat-yellow", shadow: "shadow-[6px_6px_0px_0px_var(--color-myhayat-yellow)]" },
                 ].map((item, i) => (
                   <MyHayatCard key={i} noPattern className={`w-[350px] p-6 shrink-0 bg-white dark:bg-[#251320] ${item.border} ${item.shadow}`}>
                     <div className="flex items-center gap-4 mb-4">
                         <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${item.border} bg-gray-100 dark:bg-gray-800`}>
                             <Image src={item.img} alt={item.name} width={100} height={100} className="object-cover w-full h-full" />
                         </div>
                         <div>
                             <h4 className="font-bold">{item.name}</h4>
                             <p className="text-sm text-gray-500 dark:text-gray-400">{item.loc}</p>
                         </div>
                     </div>
                     <p className="text-gray-600 dark:text-gray-400 italic">"{item.quote}"</p>
                   </MyHayatCard>
                 ))}
             </Marquee>
        </section>

        {/* FAQ SECTION */}
        <section className="mb-32 px-4 md:px-8 max-w-5xl mx-auto relative z-20">
          {/* Decorative: Rocking chair illustration for calm feel */}
          <img src="/Illustrations/woman in a rocking chair and a fireplace.svg" alt="Resting by the fireplace" className="absolute -right-20 top-0 w-72 opacity-80 dark:opacity-60 pointer-events-none hidden xl:block" />
          {/* Decorative: daisy for growth */}
          <img src="/Spring Daisy Icon.svg" alt="" className="absolute -left-12 bottom-20 w-20 opacity-15 dark:opacity-8 animate-wiggle pointer-events-none hidden lg:block" />

          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-titan">
              {t("faq.title") || "Frequently Asked"} <SparklesText className="inline" sparklesCount={4}>{t("faq.titleHighlight") || "Questions"}</SparklesText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("faq.subtitle") || "Everything you need to know about My Hayat and how it works."}
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Is this a replacement for real therapy?", a: "No. My Hayat is an accessible companion for emotional support, grounding, and guidance. It is not a replacement for professional clinical therapy. We act as a bridge, and we provide resources to connect you with human professionals when needed.", variant: "waves" as const, color: "pink" as const },
              { q: "Is my data private and secure?", a: "Absolutely. Your privacy is our priority. Conversation data is encrypted at rest and in transit. We never sell your data, and we do not use your personal conversations to train our models without your explicit consent. You can delete your account and data at any time.", variant: "diamonds" as const, color: "teal" as const },
              { q: "Does the AI understand Lebanese Arabic?", a: "Yes. Our model is fine-tuned to understand and respond in Lebanese dialect, grasping the cultural nuances, idioms, and context that generic AI often misses.", variant: "triangles" as const, color: "yellow" as const },
              { q: "How much does it cost?", a: "We believe mental health support should be accessible. The core companion features are completely free. We also offer Premium plans with advanced features like Echoes and unlimited session memory to support the platform.", variant: "hexagons" as const, color: "lavender" as const },
            ].map((faq, i) => (
              <div key={i} className="animate-tilt relative overflow-hidden p-6 bg-white dark:bg-[#251320] border-2 border-myhayat-salmon/20 dark:border-myhayat-pink/20 text-left rounded-[2rem] shadow-[4px_4px_0px_0px_var(--color-myhayat-salmon)] hover-lift border-glow-card">
                <JapaneseCubesPattern variant={faq.variant} colorScheme={faq.color} size={28} opacity={0.05} className={"absolute inset-0 pointer-events-none -z-10" + " mix-blend-multiply dark:mix-blend-overlay"} />
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-start gap-4">
                    <span className="font-titan text-3xl text-myhayat-yellow opacity-50 shrink-0">Q.</span>
                    <h3 className="font-titan text-xl mt-1 text-myhayat-salmon dark:text-myhayat-pink flex-1">{faq.q}</h3>
                  </div>
                  <div className="flex items-start gap-4 mt-2">
                    <span className="font-titan text-3xl text-myhayat-pink opacity-50 shrink-0">A.</span>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-1 flex-1">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WAITLIST / CTA SECTION */}
        <section className="relative py-24 px-4 md:px-8 overflow-hidden bg-myhayat-pink dark:bg-myhayat-pink/90">
             <JapaneseCubesPattern variant="stars" colorScheme="warm" size={28} opacity={0.08} className={"absolute inset-0 pointer-events-none -z-10" + " mix-blend-multiply"} />
             
             {/* Decorative Heart Background */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
                 <Image src="/myhayat_heart.svg" alt="" width={800} height={800} className="animate-breathe" />
             </div>

             <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                 <div className="inline-block px-6 py-2 bg-white rounded-full text-myhayat-pink font-bold border-2 border-myhayat-salmon transform -rotate-2">
                     {t("cta.badge")}
                 </div>
                 
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-titan text-white leading-tight drop-shadow-md">
                     {t("cta.title1")} <br/> {t("cta.title2")}
                 </h2>
                 
                 <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto">
                     {t("cta.subtitle")}
                 </p>

                 {/* Waitlist Form */}
                 {waitlistSubmitted ? (
                   <div className="inline-block px-8 py-4 bg-white rounded-full text-myhayat-pink font-titan text-2xl border-4 border-myhayat-salmon shadow-lg animate-float">
                     {t("waitlist.success")}
                   </div>
                 ) : (
                   <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-lg mx-auto">
                     <input
                       type="email"
                       value={waitlistEmail}
                       onChange={(e) => setWaitlistEmail(e.target.value)}
                       placeholder={t("waitlist.placeholder")}
                       className="flex-1 h-16 px-8 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 text-lg focus:outline-none focus:bg-white/30 transition-colors w-full"
                       required
                     />
                     <MyHayatButton size="lg" className="bg-myhayat-yellow text-gray-900 border-white hover:scale-105 whitespace-nowrap">
                         {t("waitlist.button")}
                     </MyHayatButton>
                   </form>
                 )}
                 <p className="text-white/60 text-sm">{t("waitlist.privacy")}</p>
             </div>

             {/* Decor Elements */}
             <img src="/decor_melting_smiley.svg" alt="" className="absolute bottom-10 start-10 w-24 h-24 animate-float hidden md:block opacity-40" />
             <img src="/decor_shoot_star_2.svg" alt="" className="absolute top-10 end-10 w-20 h-20 animate-drift hidden md:block opacity-40" />
          </section>
        </div>

      </main>
      <Footer />
    </div>
  );
}
