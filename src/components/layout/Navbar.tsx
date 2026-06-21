"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MyHayatButton } from "../ui/MyHayatButton";
import { PixelHoverPill } from "../ui/PixelHoverPill";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { Menu, X, Globe } from "lucide-react";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, toggleLocale } = useTranslation();

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.howItWorks"), href: "/how-it-works" },
    { name: t("nav.echoes"), href: "/echoes" },
    { name: t("nav.pricing"), href: "/pricing" },
    { name: t("nav.chatDemo"), href: "/chat" },
    { name: "Education Hub", href: "/education-hub" },
    { name: t("nav.contact"), href: "#contact-modal" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-[94rem] px-3 md:px-5">
      <div className="relative flex items-center gap-3 rounded-[2rem] bg-myhayat-yellow/90 backdrop-blur-md border-4 border-myhayat-salmon shadow-[var(--shadow-curved)] py-1 px-3 md:py-1.5 md:px-4 transition-all duration-300 dark:bg-[#2d1825]/90 dark:border-myhayat-pink/50 overflow-hidden">
        <JapaneseCubesPattern size={28} opacity={0.2} className={"absolute inset-0 pointer-events-none -z-10" + " mix-blend-overlay"} />
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 pl-2 md:pl-3 group shrink-0">
           <Image 
             src="/myhayat-logo.png" 
             alt="My Hayat Logo" 
             width={150} 
             height={50} 
             className="w-auto h-10 xl:h-12 hover:scale-105 transition-transform drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)]"
           />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-1.5 xl:gap-2 relative z-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0"
              title={link.name}
            >
              <PixelHoverPill 
                active={isActive(link.href)} 
                className="font-titan text-[0.78rem] xl:text-[0.9rem]"
              >
                {link.name}
              </PixelHoverPill>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 relative z-10">
            {/* Language Toggle */}
            <button 
              onClick={toggleLocale}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/40 text-myhayat-salmon transition-colors text-sm font-bold dark:text-myhayat-pink dark:hover:bg-white/10"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              {t("language.switch")}
            </button>

            <MyHayatButton size="sm" variant="primary" className="text-sm border-2 border-black dark:border-white text-black dark:text-white hover:bg-myhayat-pink/90 drop-shadow-[2px_2px_0_rgba(254,200,16,1)]">
                {t("nav.joinNow")}
            </MyHayatButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="lg:hidden p-2 text-myhayat-salmon dark:text-myhayat-pink relative z-10"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span className="sr-only">Open menu</span>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-myhayat-offwhite dark:bg-[#251320] border-4 border-myhayat-salmon dark:border-myhayat-pink/50 rounded-[2rem] shadow-xl p-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-xl font-titan text-center transition-colors py-1 rounded-full
                ${isActive(link.href) 
                  ? "bg-myhayat-salmon text-white dark:bg-myhayat-pink" 
                  : "text-myhayat-salmon hover:text-myhayat-pink dark:text-myhayat-pink dark:hover:text-myhayat-yellow"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-myhayat-salmon/20 my-1" />
          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={toggleLocale}
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/30 text-myhayat-salmon font-bold text-sm dark:bg-white/10 dark:text-myhayat-pink"
            >
              <Globe className="w-4 h-4" />
              {t("language.switch")}
            </button>

          </div>
          <MyHayatButton className="w-full">{t("nav.joinNow")}</MyHayatButton>
        </div>
      )}
    </nav>
  );
};
