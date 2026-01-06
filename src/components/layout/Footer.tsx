"use client";

import React from "react";
import Link from "next/link";
import { MyHayatButton } from "../ui/MyHayatButton";

export const Footer = () => {
  return (
    <footer className="relative mt-24 pb-12 px-4 md:px-8">
      <div className="
        relative 
        max-w-7xl mx-auto 
        bg-myhayat-pink/10 
        backdrop-blur-sm
        border-4 border-myhayat-salmon 
        rounded-[3rem] 
        shadow-[var(--shadow-curved)]
        p-8 md:p-12
        overflow-hidden
      ">
        {/* Interior Pattern Overlay */}
        <div className="absolute inset-0 bg-japanese-cubes opacity-10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-6">
                <Link href="/" className="inline-block relative group">
                     {/* Logo Text for now */}
                     <span className="font-barriecito text-5xl text-myhayat-salmon drop-shadow-sm text-shadow-block">
                        My Hayat
                     </span>
                </Link>
                <p className="text-lg md:text-xl text-myhayat-salmon/80 font-medium max-w-sm">
                    Your culturally attuned AI companion, here to listen, understand, and guide you through life's ups and downs in Lebanese Arabic.
                </p>
                <div className="flex gap-4">
                    {/* Social Placeholders - Replace with Lottie/Icons later */}
                    {['Instagram', 'Twitter', 'TikTok'].map((social) => (
                        <a key={social} href="#" className="
                            w-12 h-12 flex items-center justify-center 
                            rounded-full border-2 border-myhayat-salmon text-myhayat-salmon
                            hover:bg-myhayat-salmon hover:text-white transition-all hover:scale-110
                        ">
                            <span className="sr-only">{social}</span>
                            <div className="w-5 h-5 bg-current rounded-full" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-3 space-y-6">
                <h3 className="font-barriecito text-2xl text-myhayat-salmon">Navigation</h3>
                <ul className="space-y-4">
                    {['About Us', 'How It Works', 'Technology', 'Our Team', 'Contact'].map((item) => (
                        <li key={item}>
                            <Link href="#" className="text-lg text-gray-600 hover:text-myhayat-pink transition-colors font-medium">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-4 space-y-6">
                 <h3 className="font-barriecito text-2xl text-myhayat-salmon">Stay Connected</h3>
                 <p className="text-gray-600">Join our community for mental health tips and My Hayat updates.</p>
                 <form className="space-y-4">
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="Your email address"
                            className="
                                w-full h-14 pl-6 pr-4 
                                rounded-[2rem] 
                                border-4 border-myhayat-salmon 
                                bg-white/50 backdrop-blur-md
                                focus:outline-none focus:ring-4 focus:ring-myhayat-yellow/50
                                placeholder:text-gray-400
                                bg-japanese-cubes bg-[length:20px_20px]
                            "
                        />
                    </div>
                    <MyHayatButton className="w-full">
                        Subscribe
                    </MyHayatButton>
                 </form>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="
            relative z-10 
            mt-12 pt-8 
            border-t-2 border-myhayat-salmon/20
            flex flex-col md:flex-row justify-between items-center gap-4
            text-sm text-gray-500 font-medium
        ">
            <p>© {new Date().getFullYear()} My Hayat. Made with ❤️ and 🇱🇧 resilience.</p>
            <div className="flex gap-6">
                <Link href="#" className="hover:text-myhayat-salmon">Privacy Policy</Link>
                <Link href="#" className="hover:text-myhayat-salmon">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
};
