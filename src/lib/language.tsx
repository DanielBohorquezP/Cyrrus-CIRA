import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type Lang = "es" | "en";

const LanguageContext = createContext<Lang>("es");

export function useLang() {
  return useContext(LanguageContext);
}

/**
 * Wraps a group of routes to pin i18next's active language and <html lang>
 * to a fixed value, driven by the URL prefix (/en/... vs unprefixed).
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}

/**
 * Maps a Spanish (default) path to its English equivalent and back, for the
 * pages that currently exist in both languages. Paths without a translated
 * counterpart fall back to the other language's homepage.
 */
const ES_TO_EN: Record<string, string> = {
  "/": "/en",
  "/metodo-cira": "/en/metodo-cira",
};
const EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(ES_TO_EN).map(([es, en]) => [en, es]),
);

export function getAlternatePath(pathname: string, lang: Lang): string {
  if (lang === "es") {
    return ES_TO_EN[pathname] ?? "/en";
  }
  return EN_TO_ES[pathname] ?? "/";
}
