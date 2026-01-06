"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { DeviceFrame } from "@/components/visuals/DeviceFrame";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { TextAnimate } from "@/components/ui/text-animate";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-myhayat-offwhite dark:bg-[#1a0510] relative text-gray-900 font-sans">
      <Navbar />

      <main className="flex-grow w-full">
        
        {/* HERO SECTION with HeroHighlight */}
        <HeroHighlight containerClassName="h-auto min-h-[90vh] pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-20">
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-8 relative">
                
                {/* Decoration: Stitch Sun */}
                <img src="/decor_sun.svg" alt="" className="absolute -top-32 -left-20 w-48 h-48 opacity-20 animate-spin-slow pointer-events-none hidden lg:block" style={{ animationDuration: '20s' }} />

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border-2 border-myhayat-yellow shadow-[4px_4px_0px_0px_var(--color-myhayat-yellow)] rotate-[-2deg] mb-4 hover:rotate-0 transition-transform cursor-default">
                     <span className="w-3 h-3 rounded-full bg-myhayat-pink animate-ping" />
                     <span className="text-sm md:text-base font-bold text-gray-800 tracking-widest uppercase font-sans">Made for Lebanon 🇱🇧</span>
                </div>

                {/* Headline wrapped in TextAnimate */}
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-barriecito leading-[0.9] text-gray-900 dark:text-gray-100 relative">
                    <span className="block mb-2">Your Bestie,</span>
                    <Highlight className="text-myhayat-pink px-4 pb-2 pt-1 inline-block transform -rotate-1">
                        Always There.
                    </Highlight>
                    {/* Decor SVG: Lips or Smile */}
                    <img src="/decor_melting_smiley.svg" alt="Smiley" className="hidden md:block absolute -right-12 -top-12 w-24 h-24 animate-bounce" />
                </h1>

                {/* Subheadline (Stitch Text) */}
                <div className="relative">
                    <TextAnimate 
                        animation="blurInUp" 
                        by="word" 
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium font-sans max-w-xl mx-auto md:mx-0 leading-relaxed"
                    >
                        Meet My Hayat, the AI companion that speaks your dialect and gets your vibe. No judging, just chatting like you're having coffee with a friend in Hamra. ☕️
                    </TextAnimate>
                    <img src="/decor_heart.svg" alt="" className="absolute -bottom-8 right-0 w-8 h-8 animate-pulse hidden md:block" />
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                     <MyHayatButton size="lg" className="w-full sm:w-auto relative group overflow-hidden">
                        <span className="relative z-10">Chat in Arabic</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                     </MyHayatButton>
                     <MyHayatButton variant="secondary" size="lg" className="w-full sm:w-auto">
                        See The Vibe
                     </MyHayatButton>
                </div>

                {/* Decorative Elements around text */}
                 <img src="/decor_shoot_star_2.svg" alt="Star" className="absolute -left-12 top-1/2 w-12 h-12 opacity-60 animate-pulse hidden md:block" />
            </div>

            {/* Visual Content (MyHayat Hero Image) */}
            <div className="flex-1 relative w-full flex justify-center md:justify-end">
                 {/* Blob background */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-myhayat-yellow/40 to-myhayat-pink/40 rounded-full blur-3xl -z-10" />
                 
                 <div className="relative z-10 w-full max-w-[500px] animate-float" style={{ animationDuration: '6s' }}>
                      <Image 
                        src="/myhayat_hero.png" 
                        alt="My Hayat Hero Illustration" 
                        width={600} 
                        height={600} 
                        className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        priority
                      />
                 </div>

                 {/* Floating Element (Stitch Style) */}
                 <div className="absolute -bottom-4 -left-4 md:-left-10 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                     <MyHayatCard className="p-4 bg-white/90 backdrop-blur-sm rotate-[-6deg] max-w-[180px] border-myhayat-pink">
                         <p className="font-barriecito text-xl text-myhayat-salmon text-center leading-none relative">
                             Available<br/>24/7!
                             <img src="/decor_flower_1.svg" className="absolute -top-4 -right-4 w-6 h-6 animate-spin" />
                         </p>
                     </MyHayatCard>
                 </div>
            </div>
            </div>
        </HeroHighlight>

        {/* FEATURES / CARDS SECTION */}
        <section className="mb-32 px-4 md:px-8 max-w-7xl mx-auto relative z-20">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Card 1 */}
                 <MyHayatCard className="p-8 group hover:-translate-y-2 transition-transform h-full"> 
                     <div className="w-16 h-16 rounded-full bg-white border-2 border-myhayat-salmon flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          <span className="text-3xl">❤️</span>
                     </div>
                     <h3 className="font-barriecito text-3xl mb-3 text-gray-800">Zero Judgment</h3>
                     <p className="text-gray-600 text-lg leading-relaxed">
                        Pour your heart out in a 100% confidential space. No awkward stares, just pure empathy.
                     </p>
                 </MyHayatCard>

                 {/* Card 2 */}
                 <MyHayatCard className="p-8 group hover:-translate-y-2 transition-transform h-full border-myhayat-pink shadow-[8px_8px_0px_0px_var(--color-myhayat-pink)]">
                     <div className="w-16 h-16 rounded-full bg-white border-2 border-myhayat-pink flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          <span className="text-3xl">🇱🇧</span>
                     </div>
                     <h3 className="font-barriecito text-3xl mb-3 text-gray-800">Lebanese Dialect</h3>
                     <p className="text-gray-600 text-lg leading-relaxed">
                        "Kifak?" "Ça va?" We speak your language. Express yourself naturally in Lebanese Arabic.
                     </p>
                 </MyHayatCard>

                 {/* Card 3 */}
                 <MyHayatCard className="p-8 group hover:-translate-y-2 transition-transform h-full border-myhayat-yellow shadow-[8px_8px_0px_0px_var(--color-myhayat-yellow)]">
                     <div className="w-16 h-16 rounded-full bg-white border-2 border-myhayat-yellow flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          <span className="text-3xl">🌙</span>
                     </div>
                     <h3 className="font-barriecito text-3xl mb-3 text-gray-800">Here 24/7</h3>
                     <p className="text-gray-600 text-lg leading-relaxed">
                        Insomnia at 3 AM? Anxiety before a meeting? My Hayat is always awake and ready to listen.
                     </p>
                 </MyHayatCard>
             </div>
        </section>

        {/* ECHOES TEASER SECTION */}
        <section className="mb-32">
            <div className="relative rounded-[3rem] bg-myhayat-pink p-8 md:p-16 overflow-hidden border-4 border-myhayat-salmon shadow-[var(--shadow-curved)]">
                 {/* Bg Pattern */}
                 <div className="absolute inset-0 bg-japanese-cubes opacity-20 mix-blend-overlay" />
                 
                 <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                     <div className="flex-1 space-y-6 text-center lg:text-left text-white">
                         <div className="inline-block px-4 py-1 bg-myhayat-yellow text-myhayat-pink font-bold rounded-full rotate-2 transform border-2 border-white shadow-sm mb-2">
                             NEW FEATURE
                         </div>
                         <h2 className="text-4xl md:text-6xl font-barriecito leading-tight">
                             Reflect & Grow with <span className="text-myhayat-yellow italic">Echoes</span>
                         </h2>
                         <p className="text-xl font-medium opacity-90 max-w-xl text-white/90">
                             Track your mood patterns, journal your thoughts, and get personalized insights into your well-being journey. It's like a diary that actually helps you figure things out!
                         </p>
                         <div className="pt-4">
                             <MyHayatButton variant="secondary" className="bg-white text-myhayat-pink border-white hover:bg-gray-50 scale-100 hover:scale-105">
                                 Try Echoes Free
                             </MyHayatButton>
                         </div>
                     </div>
                     
                     {/* Visual */}
                     <div className="flex-1 w-full max-w-md relative transition-transform duration-500 hover:rotate-1">
                          <DeviceFrame type="laptop" className="w-[120%] -ml-[10%] drop-shadow-2xl">
                              <Image 
                                src="/laptop_mockup.png" 
                                alt="Echoes Dashboard" 
                                width={800} 
                                height={600} 
                                className="w-full h-full object-cover" 
                              />
                          </DeviceFrame>
                     </div>
                 </div>
            </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="mb-32 px-4 md:px-8 max-w-7xl mx-auto relative z-20">
             <div className="text-center mb-16 space-y-4">
                 <h2 className="text-4xl md:text-5xl font-barriecito text-gray-800">
                     Community <span className="text-myhayat-pink">Love</span>
                 </h2>
                 <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                     Join thousands of Lebanese users who found their safe space with My Hayat.
                 </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Testimonial 1 */}
                 <MyHayatCard className="p-6 bg-white border-myhayat-yellow shadow-[6px_6px_0px_0px_var(--color-myhayat-yellow)]">
                     <div className="flex items-center gap-4 mb-4">
                         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-myhayat-yellow bg-gray-100 relative">
                             <Image src="/mod1.png" alt="User 1" width={100} height={100} className="object-cover w-full h-full" />
                         </div>
                         <div>
                             <h4 className="font-bold text-gray-800 font-sans">Layla K.</h4>
                             <p className="text-sm text-gray-500">Beirut</p>
                         </div>
                     </div>
                     <p className="text-gray-600 italic">"Finally, an app that understands what 'shou l wade3' actually means. It feels like talking to a real friend."</p>
                 </MyHayatCard>

                 {/* Testimonial 2 */}
                 <MyHayatCard className="p-6 bg-white border-myhayat-pink shadow-[6px_6px_0px_0px_var(--color-myhayat-pink)]">
                     <div className="flex items-center gap-4 mb-4">
                         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-myhayat-pink bg-gray-100 relative">
                             <Image src="/mod2.png" alt="User 2" width={100} height={100} className="object-cover w-full h-full" />
                         </div>
                         <div>
                             <h4 className="font-bold text-gray-800 font-sans">Rami H.</h4>
                             <p className="text-sm text-gray-500">Jounieh</p>
                         </div>
                     </div>
                     <p className="text-gray-600 italic">"I use Echoes every night to clear my head. The insights are surprisingly accurate!"</p>
                 </MyHayatCard>

                 {/* Testimonial 3 */}
                 <MyHayatCard className="p-6 bg-white border-myhayat-salmon shadow-[6px_6px_0px_0px_var(--color-myhayat-salmon)]">
                     <div className="flex items-center gap-4 mb-4">
                         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-myhayat-salmon bg-gray-100 relative">
                             <Image src="/mod3.png" alt="User 3" width={100} height={100} className="object-cover w-full h-full" />
                         </div>
                         <div>
                             <h4 className="font-bold text-gray-800 font-sans">Yara M.</h4>
                             <p className="text-sm text-gray-500">Byblos</p>
                         </div>
                     </div>
                     <p className="text-gray-600 italic">"Zero judgment, 100% support. It's the best thing I've downloaded this year."</p>
                 </MyHayatCard>
             </div>
        </section>

        {/* CALL TO ACTION SECTION */}
        <section className="relative py-24 px-4 md:px-8 overflow-hidden bg-myhayat-pink">
             <div className="absolute inset-0 bg-japanese-cubes opacity-10 mix-blend-multiply" />
             
             {/* Decorative Heart Background */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
                 <Image src="/myhayat_heart.svg" alt="" width={800} height={800} className="animate-pulse" />
             </div>

             <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                 <div className="inline-block px-6 py-2 bg-white rounded-full text-myhayat-pink font-bold border-2 border-myhayat-salmon transform -rotate-2">
                     Ready to talk?
                 </div>
                 
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-barriecito text-white leading-tight drop-shadow-md">
                     Your Mental Health <br/> Shouldn't Be a Secret.
                 </h2>
                 
                 <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto">
                     Start chatting with My Hayat today. Free, private, and always on your side.
                 </p>

                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                      <MyHayatButton size="lg" className="bg-myhayat-yellow text-gray-900 border-white hover:scale-110 h-16 text-xl px-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
                          Start Chatting Now
                          <span className="ml-2 text-2xl">☕️</span>
                      </MyHayatButton>
                 </div>
             </div>

             {/* Decor Elements */}
             <img src="/decor_melting_smiley.svg" className="absolute bottom-10 left-10 w-24 h-24 animate-bounce hidden md:block opacity-50" />
             <img src="/decor_shoot_star_2.svg" className="absolute top-10 right-10 w-20 h-20 animate-spin-slow hidden md:block opacity-50" />
        </section>

      </main>
      <Footer />
    </div>
  );
}
