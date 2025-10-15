import { langAr } from "@/languages/ar";
import { langEn } from "@/languages/en";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translations
const translations = {
  en: langEn,
  ar: langAr,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const direction: Direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const storedLanguage = localStorage.getItem(
      "enterpriseLanguage"
    ) as Language;
    if (storedLanguage && ["en", "ar"].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", language);
  }, [direction, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("enterpriseLanguage", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  const value = {
    language,
    direction,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
