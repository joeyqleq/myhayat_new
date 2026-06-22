import type { Metadata } from "next";
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Review the My Hayat terms of service, medical disclaimer, and legal conditions for using the website and product.",
  path: "/terms",
  keywords: ["My Hayat terms", "mental health chatbot disclaimer", "AI therapy terms of service"],
});

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full pt-36 pb-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
          <h1 className="font-titan text-5xl mb-8 text-myhayat-salmon">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <p>
            Welcome to My Hayat. These terms and conditions outline the rules and regulations for the use of My Hayat's Website, located at myhayat.app.
          </p>

          <h2>1. Terms</h2>
          <p>
            By accessing this Website, accessible from myhayat.app, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.
          </p>

          <h2>2. Medical Disclaimer (CRITICAL)</h2>
          <p>
            <strong>My Hayat is an Artificial Intelligence system, NOT a licensed medical professional, therapist, or psychiatrist.</strong> The service is provided for supportive and educational purposes only. It is not intended to diagnose, treat, cure, or prevent any mental health condition. In the event of a medical emergency or suicidal ideation, you must immediately contact local emergency services (in Lebanon, call the Embrace Lifeline at 1564).
          </p>

          <h2>3. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on My Hayat's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall My Hayat or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on My Hayat's Website.
          </p>

          <h2>5. Revisions and Errata</h2>
          <p>
            The materials appearing on My Hayat's Website could include technical, typographical, or photographic errors. My Hayat will not promise that any of the materials in this Website are accurate, complete, or current.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            Any claim related to My Hayat's Website shall be governed by the laws of Lebanon without regards to its conflict of law provisions.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
