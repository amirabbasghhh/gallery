"use client";


import * as React from "react";
import { LanguageProvider } from "@/components/LanguageSelector/LanguageContext";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export interface ProvidersProps {
  children: React.ReactNode;
}


export function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageProvider>
  );
}
