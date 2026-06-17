"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { Send, Instagram, Twitter, MessageCircle as TikTokIcon, Phone } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-myhayat-offwhite dark:bg-[#1a0a14] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow w-full">

        {/* Hero */}
        <section className="relative pt-36 pb-12 px-4 md:px-8 overflow-hidden">
          {/* Decorative: Planet 3 — represents connection/reaching out */}
          <img src="/decor_planet_3.svg" alt="" className="absolute -top-16 -left-24 w-56 opacity-8 dark:opacity-4 pointer-events-none hidden lg:block animate-drift" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <h1 className="text-5xl md:text-7xl font-barriecito leading-tight">
              {t("contact.title")}{" "}
              <span className="text-myhayat-pink">{t("contact.titleHighlight")}</span>
              <img src="/decor_heart.svg" alt="" className="inline-block decor-sm ms-2 animate-twinkle" />
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">

            {/* Contact Form */}
            <div className="md:col-span-3">
              <MyHayatCard noPattern className="p-8 bg-white dark:bg-[#251320]">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <img src="/decor_shoot_star_2.svg" alt="" className="w-16 h-16 animate-float" />
                    <h3 className="font-barriecito text-2xl text-myhayat-pink">{t("contact.form.success")}</h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">{t("contact.form.name")}</label>
                      <input
                        type="text"
                        required
                        className="w-full h-12 px-5 rounded-2xl border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 bg-transparent focus:border-myhayat-pink focus:outline-none focus:ring-2 focus:ring-myhayat-pink/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">{t("contact.form.email")}</label>
                      <input
                        type="email"
                        required
                        className="w-full h-12 px-5 rounded-2xl border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 bg-transparent focus:border-myhayat-pink focus:outline-none focus:ring-2 focus:ring-myhayat-pink/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">{t("contact.form.category")}</label>
                      <select
                        className="w-full h-12 px-5 rounded-2xl border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 bg-transparent focus:border-myhayat-pink focus:outline-none focus:ring-2 focus:ring-myhayat-pink/20 transition-colors appearance-none"
                      >
                        <option>{t("contact.form.categories.general")}</option>
                        <option>{t("contact.form.categories.partnership")}</option>
                        <option>{t("contact.form.categories.support")}</option>
                        <option>{t("contact.form.categories.media")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">{t("contact.form.message")}</label>
                      <textarea
                        required
                        rows={5}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 bg-transparent focus:border-myhayat-pink focus:outline-none focus:ring-2 focus:ring-myhayat-pink/20 transition-colors resize-none"
                      />
                    </div>
                    <MyHayatButton className="w-full flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      {t("contact.form.send")}
                    </MyHayatButton>
                  </form>
                )}
              </MyHayatCard>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              {/* WhatsApp */}
              <MyHayatCard noPattern className="p-6 bg-white dark:bg-[#251320]">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-barriecito text-xl">WhatsApp</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t("contact.whatsapp")}</p>
                  </div>
                </div>
                <MyHayatButton variant="secondary" className="w-full text-sm">Join Community</MyHayatButton>
              </MyHayatCard>

              {/* Socials */}
              <MyHayatCard noPattern className="p-6 bg-white dark:bg-[#251320]">
                <h3 className="font-barriecito text-xl mb-4">{t("contact.social")}</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", color: "hover:bg-pink-500" },
                    { icon: <Twitter className="w-5 h-5" />, label: "Twitter/X", color: "hover:bg-blue-500" },
                    { icon: <TikTokIcon className="w-5 h-5" />, label: "TikTok", color: "hover:bg-purple-500" },
                  ].map((s) => (
                    <a key={s.label} href="#" className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 text-myhayat-salmon dark:text-myhayat-pink ${s.color} hover:text-white hover:border-transparent transition-all`}>
                      <span className="sr-only">{s.label}</span>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </MyHayatCard>

              {/* Location Hint */}
              <MyHayatCard noPattern className="p-6 bg-white dark:bg-[#251320]">
                <h3 className="font-barriecito text-xl mb-2">📍 Beirut, Lebanon</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Built in Lebanon, for Lebanon — and the world.</p>
              </MyHayatCard>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
