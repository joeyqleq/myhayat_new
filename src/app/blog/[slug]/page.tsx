"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const articleContent: Record<string, { title: string; titleAr: string; body: React.ReactNode }> = {
  "understanding-anxiety-lebanese-context": {
    title: "Understanding Anxiety in the Lebanese Context",
    titleAr: "فهم القلق بالسياق اللبناني",
    body: (
      <>
        <p>Lebanon is experiencing a mental health crisis that is deeply intertwined with its socioeconomic reality. The 2019 economic collapse, the devastating Beirut port explosion of 2020, and ongoing political instability have created a perfect storm of collective trauma.</p>
        <h2>Why Lebanese Anxiety is Different</h2>
        <p>Unlike generalized anxiety in stable economies, Lebanese anxiety is often <em>rational</em> — rooted in real, persistent threats: currency devaluation that erases savings overnight, power outages that disrupt daily life, and the constant uncertainty of &quot;what comes next.&quot;</p>
        <p>This means standard Western anxiety frameworks need to be adapted. You can&apos;t simply tell someone to &quot;reframe their thoughts&quot; when the external reality is genuinely threatening.</p>
        <h2>The Stigma Factor</h2>
        <p>In Lebanese culture, mental health struggles are often minimized with phrases like <em>&quot;تحمّل&quot;</em> (endure) or <em>&quot;الله بيعين&quot;</em> (God will help). While these phrases carry genuine cultural wisdom, they can also prevent people from seeking the support they need.</p>
        <p>Research shows that 78% of Lebanese feel shame about seeking mental health help — the highest rate in the MENA region.</p>
        <h2>What Can Help</h2>
        <ul>
          <li><strong>Culturally attuned support</strong> — tools that understand Lebanese context, not generic Western advice</li>
          <li><strong>Privacy and anonymity</strong> — reducing the fear of being &quot;found out&quot;</li>
          <li><strong>Accessibility</strong> — free or affordable options, given that professional therapy costs $100+/session</li>
          <li><strong>Lebanese dialect</strong> — expressing emotions in your mother tongue is fundamentally different from using a second language</li>
        </ul>
        <p>This is exactly why My Hayat was built. Not as a replacement for professional care, but as an always-available, culturally fluent first step toward feeling better.</p>
      </>
    ),
  },
  "breathing-exercises-you-can-do-anywhere": {
    title: "5 Breathing Exercises You Can Do Anywhere",
    titleAr: "٥ تمارين تنفّس فيك تعملها بأي مكان",
    body: (
      <>
        <p>Your breath is the one tool that&apos;s always with you. These five techniques are backed by research and can be done anywhere — on the bus, in a meeting, or at 3 AM when you can&apos;t sleep.</p>
        <h2>1. Box Breathing (4-4-4-4)</h2>
        <p>Inhale for 4 counts → Hold for 4 → Exhale for 4 → Hold for 4. Repeat 4 times. Used by Navy SEALs for stress management. Takes under 2 minutes.</p>
        <h2>2. The 4-7-8 Technique</h2>
        <p>Inhale through your nose for 4 counts → Hold for 7 → Exhale through your mouth for 8. This activates your parasympathetic nervous system — your body&apos;s &quot;rest and digest&quot; mode.</p>
        <h2>3. Physiological Sigh</h2>
        <p>Take a deep breath in, then at the top, take one more small sip of air → Long, slow exhale. This is the fastest known way to calm down in real-time (Stanford research, 2023).</p>
        <h2>4. Belly Breathing</h2>
        <p>Place your hand on your belly. Breathe so deeply that your belly pushes your hand out, not your chest. This ensures you&apos;re engaging your diaphragm for full, calming breaths.</p>
        <h2>5. Counted Exhale</h2>
        <p>Make your exhale twice as long as your inhale. Inhale for 3 → Exhale for 6. This simple ratio shifts your nervous system from &quot;fight or flight&quot; to &quot;rest and digest.&quot;</p>
        <h3>Pro Tip</h3>
        <p>Try saying <em>&quot;الحمدلله&quot;</em> slowly on each exhale — combining cultural comfort with physiological calming. Many users tell us this makes breathing exercises feel more natural.</p>
      </>
    ),
  },
  "grief-in-lebanese-culture": {
    title: "Grief in Lebanese Culture: How We Mourn and How We Heal",
    titleAr: "الحزن بالثقافة اللبنانية: كيف منحزن وكيف منشفى",
    body: (
      <>
        <p>In Lebanon, grief is not a private affair — it&apos;s a communal experience woven into the fabric of daily life. From the <em>azza</em> (mourning reception) to the 40-day memorial, Lebanese mourning traditions carry deep psychological wisdom.</p>
        <h2>The Azza Tradition</h2>
        <p>When someone passes, the bereaved family opens their home for three days of <em>azza</em>. Visitors come in a steady stream, sitting with the family, drinking bitter coffee, and simply being present. There&apos;s no pressure to &quot;say the right thing&quot; — presence itself is the comfort.</p>
        <p>This practice aligns with what modern grief research calls &quot;co-regulation&quot; — the idea that our nervous systems calm down in the presence of calm others.</p>
        <h2>The 40-Day Cycle</h2>
        <p>Lebanese tradition marks the 40th day after death with a special gathering. This structured timeline gives grief a rhythm — permission to mourn deeply, and gentle nudges toward re-engaging with life.</p>
        <h2>When Traditions Break Down</h2>
        <p>For the 15 million Lebanese diaspora, these traditions often can&apos;t be practiced. You&apos;re mourning alone in a foreign country, possibly unable to attend the <em>azza</em>, disconnected from the communal fabric that makes grief bearable.</p>
        <p>This is one of the reasons we created <strong>Echoes</strong> — a digital space that honors these traditions of remembrance while adapting them for modern, displaced realities.</p>
        <h2>Healthy Grief vs. Complicated Grief</h2>
        <p>Grief isn&apos;t something to &quot;get over.&quot; It&apos;s something to move <em>through</em>. But when grief persists at the same intensity for more than 12 months, or when it prevents you from basic daily functioning, it may be time to seek professional support.</p>
        <p>My Hayat is here for the everyday moments of missing someone. For clinical grief support, we connect you with qualified Lebanese therapists who understand your cultural context.</p>
      </>
    ),
  },
};

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const { locale } = useTranslation();
  const article = articleContent[resolvedParams.slug];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-barriecito text-4xl">Article not found</h1>
            <Link href="/blog"><MyHayatButton>Back to Blog</MyHayatButton></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full">
        <article className="pt-36 pb-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-myhayat-pink hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <h1 className="font-barriecito text-4xl md:text-6xl mb-6">
              {locale === "ar" ? article.titleAr : article.title}
            </h1>
            <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-barriecito prose-a:text-myhayat-pink">
              {article.body}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
