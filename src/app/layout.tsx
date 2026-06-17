import type { Metadata } from "next";
import { Quicksand, Titan_One, Satisfy, Noto_Kufi_Arabic, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuroraBackground } from "@/components/Backgrounds/AuroraBackground";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const titanOne = Titan_One({
  variable: "--font-titan",
  weight: "400",
  subsets: ["latin"],
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  weight: "400",
  subsets: ["latin"],
});

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "My Hayat | AI Mental Health Companion",
  description: "Your AI mental health companion for the Lebanese community. Available 24/7 in Lebanese Arabic.",
  keywords: ["mental health", "Lebanon", "Arabic", "AI chatbot", "therapy", "wellness"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("dark font-mono", jetbrainsMono.variable)}>
      <body
        className={`${quicksand.variable} ${titanOne.variable} ${satisfy.variable} ${notoKufi.variable} antialiased font-sans bg-[#251320] text-white`}
      >
        <Providers>
          <AuroraBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}
