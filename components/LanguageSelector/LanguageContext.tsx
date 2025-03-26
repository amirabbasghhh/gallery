import React, { createContext, useContext, useState, ReactNode } from "react";
import { LanguageOption } from "./types";

interface LanguageContextProps {
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (language: LanguageOption) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
    key: "gb",
    label: "english",
    flag: "GB",
  });

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
