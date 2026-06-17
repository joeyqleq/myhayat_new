"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full">
        <section className="pt-36 pb-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto prose dark:prose-invert prose-lg">
            <h1 className="font-barriecito text-5xl md:text-6xl text-center mb-2">{t("privacy.title")}</h1>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-12">{t("privacy.lastUpdated")}</p>

            <h2 className="font-barriecito">1. Your Privacy Matters</h2>
            <p>
              At My Hayat, your privacy isn&apos;t just a policy — it&apos;s a promise. We understand that mental health conversations 
              are among the most personal interactions you can have. That&apos;s why we&apos;ve built our entire platform with privacy as the foundation.
            </p>

            <h2 className="font-barriecito">2. What We Collect</h2>
            <ul>
              <li><strong>Email address</strong> — Only if you sign up for a premium account or join our waitlist.</li>
              <li><strong>Conversation data</strong> — Encrypted and stored securely. You can delete it at any time.</li>
              <li><strong>Usage analytics</strong> — Anonymous, aggregated data to improve our service. No personal identifiers.</li>
              <li><strong>Echoes voice data</strong> — Premium Plus only. Stored with AES-256 encryption. Never shared. Deletable at any time.</li>
            </ul>

            <h2 className="font-barriecito">3. What We Never Do</h2>
            <ul>
              <li>We <strong>never</strong> sell your data to third parties.</li>
              <li>We <strong>never</strong> use your conversations to train our models without explicit consent.</li>
              <li>We <strong>never</strong> share your information with insurance companies, employers, or government agencies.</li>
              <li>We <strong>never</strong> require your real name, phone number, or location to use our free service.</li>
            </ul>

            <h2 className="font-barriecito">4. Data Security</h2>
            <p>
              All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Our infrastructure is hosted on Azure 
              with SOC 2 Type II compliance. Voice data from Echoes is stored in isolated, encrypted containers 
              with access logs.
            </p>

            <h2 className="font-barriecito">5. Your Rights</h2>
            <p>Inspired by GDPR, we grant all users — regardless of location — the following rights:</p>
            <ul>
              <li><strong>Right to Access</strong> — Request a copy of all data we have about you.</li>
              <li><strong>Right to Deletion</strong> — Delete your account and all associated data at any time.</li>
              <li><strong>Right to Portability</strong> — Export your data in standard formats.</li>
              <li><strong>Right to Correction</strong> — Update or correct any information we hold.</li>
              <li><strong>Right to Object</strong> — Opt out of analytics at any time.</li>
            </ul>

            <h2 className="font-barriecito">6. Crisis Protocol</h2>
            <p>
              If our AI detects signs of immediate danger or suicidal ideation, we may display crisis resources 
              (such as local helpline numbers). We do <strong>not</strong> contact anyone on your behalf unless 
              you explicitly request it.
            </p>

            <h2 className="font-barriecito">7. Cookie Policy</h2>
            <p>
              We use only essential cookies: language preference and theme preference. No tracking cookies, 
              no advertising cookies, no third-party cookies.
            </p>

            <h2 className="font-barriecito">8. Contact Us</h2>
            <p>
              Questions about our privacy practices? Reach out at <a href="mailto:privacy@myhayat.app" className="text-myhayat-pink hover:underline">privacy@myhayat.app</a> or 
              visit our <a href="/contact" className="text-myhayat-pink hover:underline">contact page</a>.
            </p>

            <hr />
            <p className="text-sm text-gray-400">
              This privacy policy is effective as of June 2026. We will notify all registered users of any material changes.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
