import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full pt-36 pb-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
          <h1 className="font-titan text-5xl mb-8 text-myhayat-pink">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <p>
            At My Hayat, accessible from myhayat.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by My Hayat and how we use it.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you for customer service, updates, and marketing</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2>3. Clinical Data and Privacy</h2>
          <p>
            Because we are an AI mental health companion, protecting the privacy of your conversations is our highest priority. All conversations are processed using secure encryption and are heavily anonymized. We do not sell your personal data or conversation history to third-party data brokers.
          </p>

          <h2>4. GDPR Data Protection Rights</h2>
          <p>
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul>
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
          </ul>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@myhayat.app.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
