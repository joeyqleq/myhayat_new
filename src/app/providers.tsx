"use client";

import { LanguageProvider, useTranslation } from "@/lib/i18n";

function DirectionWrapper({ children }: { children: React.ReactNode }) {
  const { dir, locale } = useTranslation();

  return (
    <div dir={dir} lang={locale} className={locale === "ar" ? "font-arabic" : ""}>
      {children}
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <DirectionWrapper>
        {children}
      </DirectionWrapper>
    </LanguageProvider>
  );
}
