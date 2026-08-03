"use client";

/* ============================================================
 * LANGUAGE CONTEXT (LanguageContext.tsx)
 * ============================================================
 * This is the brain of the language system. It:
 * 1. Stores the current language (en or ar)
 * 2. Loads translation JSON files from public/locals/en/ and public/locals/ar/
 * 3. Provides a "t" function to get translated text anywhere
 * 4. Provides a "switchLanguage" function for the language toggle button
 * 5. Automatically sets RTL direction for Arabic
 *
 * HOW TO USE IN ANY COMPONENT:
 *   import { useLanguage } from "@/context/LanguageContext";
 *   const { t, locale, switchLanguage } = useLanguage();
 *   <h1>{t("hero.title")}</h1>
 *
 * HOW TO ADD NEW TRANSLATION FILES:
 *   1. Add your JSON file to public/locals/en/yourpage.json
 *   2. Add the Arabic version to public/locals/ar/yourpage.json
 *   3. Add "yourpage" to the PAGE_FILES array below
 *   That's it! The system loads it automatically.
 * ============================================================ */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

// ----- All JSON file names inside public/locals/en/ and public/locals/ar/ -----
// If you add a new page JSON, just add its name here (without .json)
const PAGE_FILES = [
  "common",
  "home",
  "about",
  "contact",
  "countries",
  "faq",
  "hospitals",
  "patient-services",
  "process",
  "second-opinion",
  "seo",
  "treatments",
  "why-choose-us",
  "why-india",
];

// ----- Types -----
type Locale = "en" | "ar";

// All translations stored as a nested object, e.g. { common: { nav: { home: "Home" } }, home: { hero: { title: "..." } } }
type Translations = Record<string, Record<string, unknown>>;

interface LanguageContextType {
  locale: Locale;                           // Current language: "en" or "ar"
  switchLanguage: () => void;               // Toggle between en and ar
  t: (key: string) => string;              // Get translated text by dot-notation key like "hero.title"
  getArray: (key: string) => unknown[];    // Get translated array (e.g. hero.questions)
  translations: Translations;               // Raw translations object (for advanced use)
  isLoaded: boolean;                        // True when all JSON files are loaded
}

const LanguageContext = createContext<LanguageContextType | null>(null);

/* ============================================================
 * LanguageProvider — Wrap your app with this
 * ============================================================ */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get saved language from localStorage, default to "en"
  const [locale, setLocale] = useState<Locale>("en");
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load all translation JSON files for the current language
  const loadTranslations = useCallback(async (lang: Locale) => {
    const allTranslations: Translations = {};

    // Fetch all page JSON files in parallel
    const results = await Promise.all(
      PAGE_FILES.map(async (file) => {
        try {
          const response = await fetch(`/locals/${lang}/${file}.json`);
          if (!response.ok) throw new Error(`Failed to load ${file}.json`);
          const data = await response.json();
          return { file, data };
        } catch (error) {
          console.warn(`Could not load translation file: /locals/${lang}/${file}.json`, error);
          return { file, data: {} };
        }
      })
    );

    // Organize into { common: {...}, home: {...}, about: {...}, ... }
    results.forEach(({ file, data }) => {
      allTranslations[file] = data;
    });

    setTranslations(allTranslations);
    setIsLoaded(true);
  }, []);

  // Load translations when language changes
  useEffect(() => {
    // Check if user previously selected a language
    const saved = typeof window !== "undefined" ? localStorage.getItem("ibnsina-lang") : null;
    if (saved === "ar" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    loadTranslations(locale);

    // Set HTML direction for Arabic (RTL) or English (LTR)
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";

    // Save preference
    localStorage.setItem("ibnsina-lang", locale);
  }, [locale, loadTranslations]);

  // Toggle language
  const switchLanguage = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  // Get a translated string using dot-notation
  // Example: t("hero.title") looks in the "home" page file for hero.title
  // Example: t("common:nav.home") explicitly looks in common.json
  const t = useCallback(
    (key: string): string => {
      // Support explicit file prefix like "common:nav.home"
      let fileName: string | null = null;
      let path = key;

      if (key.includes(":")) {
        const parts = key.split(":");
        fileName = parts[0];
        path = parts[1];
      }

      const keys = path.split(".");

      // If explicit file given, search only that file
      if (fileName) {
        const fileData = translations[fileName];
        if (!fileData) return key;
        let result: unknown = fileData;
        for (const k of keys) {
          if (result && typeof result === "object" && k in (result as Record<string, unknown>)) {
            result = (result as Record<string, unknown>)[k];
          } else {
            return key; // Key not found, return the key itself
          }
        }
        return typeof result === "string" ? result : key;
      }

      // Otherwise, search all files until we find the key
      for (const fileData of Object.values(translations)) {
        let result: unknown = fileData;
        let found = true;
        for (const k of keys) {
          if (result && typeof result === "object" && k in (result as Record<string, unknown>)) {
            result = (result as Record<string, unknown>)[k];
          } else {
            found = false;
            break;
          }
        }
        if (found && typeof result === "string") return result;
      }

      return key; // Fallback: return the key itself
    },
    [translations]
  );

  // Get a translated array (like hero.questions or specialties.items)
  const getArray = useCallback(
    (key: string): unknown[] => {
      let fileName: string | null = null;
      let path = key;

      if (key.includes(":")) {
        const parts = key.split(":");
        fileName = parts[0];
        path = parts[1];
      }

      const keys = path.split(".");
      const searchIn = fileName ? [translations[fileName]].filter(Boolean) : Object.values(translations);

      for (const fileData of searchIn) {
        let result: unknown = fileData;
        let found = true;
        for (const k of keys) {
          if (result && typeof result === "object" && k in (result as Record<string, unknown>)) {
            result = (result as Record<string, unknown>)[k];
          } else {
            found = false;
            break;
          }
        }
        if (found && Array.isArray(result)) return result;
      }

      return [];
    },
    [translations]
  );

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage, t, getArray, translations, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ============================================================
 * useLanguage — Custom hook to use in any component
 * ============================================================ */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return context;
}
