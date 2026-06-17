"use client";

import React from "react";
import Link from "next/link";
import { MyHayatButton } from "../ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { Instagram, Twitter, MessageCircle } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.howItWorks"), href: "/how-it-works" },
    { label: t("nav.echoes"), href: "/echoes" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.contact"), href: "#contact-modal" },
  ];

  const socials = [
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "TikTok", href: "#" },
  ];

  return (
    <footer className="relative mt-24 pb-12 px-4 md:px-8">
      <div className="relative max-w-7xl mx-auto bg-myhayat-pink/10 dark:bg-[#251320]/50 backdrop-blur-sm border-4 border-myhayat-salmon dark:border-myhayat-pink/30 rounded-[3rem] shadow-[var(--shadow-curved)] p-8 md:p-12 overflow-hidden">
        {/* Interior Pattern Overlay */}
        <div className="absolute inset-0 bg-japanese-cubes opacity-30 pointer-events-none" />

        {/* Decorative: Sun in corner */}
        <img src="/decor_sun2.svg" alt="" className="absolute -top-8 -right-8 w-32 opacity-10 pointer-events-none animate-spin-slow hidden md:block" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-6">
                <Link href="/" className="inline-block relative group">
                     <span className="font-titan text-5xl text-myhayat-salmon dark:text-myhayat-pink drop-shadow-sm text-shadow-block">
                        {t("footer.brand")}
                     </span>
                </Link>
                <p className="text-lg md:text-xl text-myhayat-salmon/80 dark:text-gray-400 font-medium max-w-sm">
                    {t("footer.tagline")}
                </p>
                <div className="flex gap-4">
                    {socials.map((social) => (
                        <a key={social.label} href={social.href} className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-myhayat-salmon dark:border-myhayat-pink/50 text-myhayat-salmon dark:text-myhayat-pink hover:bg-myhayat-salmon hover:text-white dark:hover:bg-myhayat-pink dark:hover:text-white transition-all hover:scale-110">
                            <span className="sr-only">{social.label}</span>
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* WhatsApp Community Link */}
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-myhayat-salmon dark:text-myhayat-pink hover:underline">
                  <MessageCircle className="w-4 h-4" />
                  {t("contact.whatsapp")}
                </a>
            </div>

            {/* Links Column */}
            <div className="md:col-span-3 space-y-6">
                <h3 className="font-titan text-2xl text-myhayat-salmon dark:text-myhayat-pink">{t("footer.nav")}</h3>
                <ul className="space-y-4">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link href={item.href} className="text-lg text-gray-600 dark:text-gray-400 hover:text-myhayat-pink transition-colors font-medium">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-4 space-y-6">
                 <h3 className="font-titan text-2xl text-myhayat-salmon dark:text-myhayat-pink">{t("footer.stay")}</h3>
                 <p className="text-gray-600 dark:text-gray-400">{t("footer.stayDesc")}</p>
                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder={t("footer.emailPlaceholder")}
                            className="w-full h-14 pl-6 pr-4 rounded-[2rem] border-4 border-myhayat-salmon dark:border-myhayat-pink/50 bg-white/50 dark:bg-white/5 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-myhayat-yellow/50 placeholder:text-gray-400 dark:placeholder:text-gray-600 dark:text-white"
                        />
                    </div>
                    <MyHayatButton className="w-full">
                        {t("footer.subscribe")}
                    </MyHayatButton>
                 </form>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 mt-12 pt-8 border-t-2 border-myhayat-salmon/20 dark:border-myhayat-pink/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-500 font-medium">
            <p>© {new Date().getFullYear()} {t("footer.copyright")}</p>
            <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-myhayat-salmon dark:hover:text-myhayat-pink">{t("footer.privacy")}</Link>
                <Link href="/privacy" className="hover:text-myhayat-salmon dark:hover:text-myhayat-pink">{t("footer.terms")}</Link>
            </div>
        </div>
      </div>
    </footer>
  );
};
