"use client";

import React, { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { MyHayatCard } from "./MyHayatCard";
import { MyHayatButton } from "./MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { useRouter } from "next/navigation";

export function ContactModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", category: "General", message: "" });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#contact-modal") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    // Check initial hash
    handleHashChange();
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const closeModal = () => {
    // Remove the hash from the URL without triggering a full reload
    const newUrl = window.location.pathname + window.location.search;
    window.history.replaceState(null, "", newUrl);
    setIsOpen(false);
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", category: "General", message: "" });
        setTimeout(() => {
          closeModal();
        }, 4000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={closeModal}
      />
      
      <div className="relative w-full max-w-lg z-10 animate-in fade-in zoom-in-95 duration-200">
        <MyHayatCard noPattern className="bg-myhayat-offwhite dark:bg-[#1a0a14] border-4 border-myhayat-salmon dark:border-myhayat-pink/50 shadow-2xl p-0 overflow-hidden relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-myhayat-pink to-myhayat-salmon p-6 text-white relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-titan text-3xl mb-1 flex items-center gap-2">
              {t("contact.title")} 
              <img src="/decor_heart.svg" alt="" className="w-6 h-6 animate-pulse" />
            </h2>
            <p className="opacity-90">{t("contact.subtitle")}</p>
          </div>

          <div className="p-6 md:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 animate-in fade-in">
                <img src="/decor_shoot_star_2.svg" alt="" className="w-16 h-16 animate-float" />
                <h3 className="font-titan text-2xl text-myhayat-pink">{t("contact.form.success")}</h3>
                <p className="text-gray-500 dark:text-gray-400">We've sent a confirmation to your email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 bg-white dark:bg-[#251320] focus:border-myhayat-pink focus:outline-none focus:ring-2 focus:ring-myhayat-pink/20 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 bg-white dark:bg-[#251320] focus:border-myhayat-pink focus:outline-none focus:ring-2 focus:ring-myhayat-pink/20 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">
                    {t("contact.form.category")}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 bg-white dark:bg-[#251320] focus:border-myhayat-pink focus:outline-none focus:ring-2 focus:ring-myhayat-pink/20 transition-colors appearance-none"
                  >
                    <option>{t("contact.form.categories.general")}</option>
                    <option>{t("contact.form.categories.partnership")}</option>
                    <option>{t("contact.form.categories.support")}</option>
                    <option>{t("contact.form.categories.media")}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-myhayat-salmon/30 dark:border-myhayat-pink/30 bg-white dark:bg-[#251320] focus:border-myhayat-pink focus:outline-none focus:ring-2 focus:ring-myhayat-pink/20 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm font-bold">Something went wrong. Please try again.</p>
                )}

                <MyHayatButton 
                  className="w-full flex items-center justify-center gap-2 mt-2" 
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t("contact.form.send")}
                    </>
                  )}
                </MyHayatButton>
              </form>
            )}
          </div>
        </MyHayatCard>
      </div>
    </div>
  );
}
