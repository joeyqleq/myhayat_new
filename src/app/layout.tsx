import type { Metadata } from "next";
import { Quicksand, Titan_One, Satisfy, Noto_Kufi_Arabic, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ClientBackground } from "@/components/layout/ClientBackground";
import { cn } from "@/lib/utils";
import { ContactModal } from "@/components/ui/ContactModal";
import { CookieConsent } from "@/components/ui/CookieConsent";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "mental health Lebanon",
    "Lebanese Arabic AI chatbot",
    "AI mental health companion",
    "wellness Lebanon",
    "grief support Lebanon",
    "anxiety support Arabic",
    "mental health app Lebanon",
  ],
  category: "health",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/myhayat_hero.png",
        width: 1200,
        height: 630,
        alt: "My Hayat AI mental health companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/myhayat_hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd(), softwareApplicationJsonLd()];

  return (
    <html lang="en" suppressHydrationWarning className={cn("dark font-mono", jetbrainsMono.variable)}>
      <body
        className={`${quicksand.variable} ${titanOne.variable} ${satisfy.variable} ${notoKufi.variable} antialiased font-sans bg-transparent text-gray-900 dark:text-white min-h-screen`}
      >
        {jsonLd.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <Providers>
          <ClientBackground />
          <div className="relative z-10">
            {children}
            <ContactModal />
            <CookieConsent />
          </div>
        </Providers>
      </body>
    </html>
  );
}
