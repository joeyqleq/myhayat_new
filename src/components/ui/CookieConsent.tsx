"use client";

import React, { useState, useEffect } from "react";
import { MyHayatButton } from "./MyHayatButton";
import { ShieldAlert } from "lucide-react";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted or declined cookies
    const consent = localStorage.getItem("myhayat-cookie-consent");
    if (!consent) {
      // Delay showing the modal slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("myhayat-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("myhayat-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="max-w-5xl mx-auto bg-white/90 dark:bg-[#251320]/95 backdrop-blur-xl border-2 border-myhayat-salmon dark:border-myhayat-pink/30 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        {/* Decorative background */}
        <JapaneseCubesPattern size={60} opacity={0.05} className={"absolute inset-0 pointer-events-none -z-10" + ""} />

        <div className="flex-shrink-0 w-12 h-12 bg-myhayat-yellow/20 rounded-full flex items-center justify-center text-myhayat-salmon dark:text-myhayat-yellow">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">We value your privacy</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            In compliance with GDPR and international data protection standards, you can choose to accept or decline non-essential tracking. 
            By clicking "Accept All", you consent to our use of cookies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-10">
          <button 
            onClick={handleDecline}
            className="px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <MyHayatButton onClick={handleAccept} className="px-8">
            Accept All
          </MyHayatButton>
        </div>
      </div>
    </div>
  );
}
