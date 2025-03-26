"use client";


import * as React from "react";
import { useRouter } from "next/navigation";
import { LanguageProvider } from "@/components/LanguageSelector/LanguageContext";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export interface ProvidersProps {
  children: React.ReactNode;
}

// declare module "@react-types/shared" {
//   interface RouterConfig {
//     routerOptions: NonNullable<
//       Parameters<ReturnType<typeof useRouter>["push"]>[1]
//     >;
//   }
// }

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <LanguageProvider>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageProvider>
  );
}
