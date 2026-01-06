"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MyHayatButton } from "../ui/MyHayatButton";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Technology", href: "/technology" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4 md:px-8">
      <div className="
        relative flex items-center justify-between 
        rounded-[2rem] 
        bg-myhayat-yellow/90 backdrop-blur-md 
        border-4 border-myhayat-salmon 
        shadow-[var(--shadow-curved)] 
        p-2 md:p-3
        transition-all duration-300
      ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 pl-4 group">
           {/* Placeholder for Logo Image - replaced with text for now until Image component is set up with assets */}
           <Image 
             src="/myhayat-logo.png" 
             alt="My Hayat Logo" 
             width={150} 
             height={50} 
             className="w-auto h-12 md:h-14 hover:scale-105 transition-transform drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)]"
           />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`
                px-4 py-2 rounded-full font-barriecito text-lg transition-all duration-200
                ${isActive(link.href) 
                  ? "bg-myhayat-salmon text-white shadow-sm" 
                  : "text-myhayat-salmon hover:bg-white/50 hover:text-myhayat-pink"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle Placeholder */}
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-myhayat-salmon transition-colors">
                🌙
            </button>
            <MyHayatButton size="sm" variant="primary" className="text-base h-10 px-5">
                Join Now
            </MyHayatButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden p-2 text-myhayat-salmon"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span className="sr-only">Open menu</span>
            <div className="flex flex-col gap-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-0.5 bg-current transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="
            absolute top-full left-4 right-4 mt-2 
            bg-myhayat-offwhite 
            border-4 border-myhayat-salmon 
            rounded-[2rem] 
            shadow-xl 
            p-6 
            flex flex-col gap-4
            animate-in fade-in slide-in-from-top-4 duration-200
        ">
            {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-barriecito text-myhayat-salmon text-center hover:text-myhayat-pink transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-myhayat-salmon/20 my-2" />
          <MyHayatButton className="w-full">Join Now</MyHayatButton>
        </div>
      )}
    </nav>
  );
};
