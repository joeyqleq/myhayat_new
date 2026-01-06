import type { Metadata } from "next";
import { Urbanist, Barriecito, Satisfy } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const barriecito = Barriecito({
  variable: "--font-barriecito",
  weight: "400",
  subsets: ["latin"],
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Hayat | AI Mental Health Companion",
  description: "Your AI mental health companion for the Lebanese community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${barriecito.variable} ${satisfy.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
