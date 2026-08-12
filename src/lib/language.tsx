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
 * Every translated page keeps the same slug under an /en prefix (e.g.
 * "/metodo-cira/planeacion-estrategica" <-> "/en/metodo-cira/planeacion-estrategica"),
 * so the mapping is a plain prefix add/strip. Pages that don't have an EN
 * translation yet will 404 if switched to — see EN_ROUTES below for guarding.
 */
export function getAlternatePath(pathname: string, lang: Lang): string {
  if (lang === "es") {
    return pathname === "/" ? "/en" : `/en${pathname}`;
  }
  return pathname === "/en" ? "/" : pathname.replace(/^\/en/, "");
}
