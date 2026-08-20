import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type Lang = "es" | "en";

const LanguageContext = createContext<Lang>("es");

export const LANG_STORAGE_KEY = "cyrrus-lang-pref";

export function useLang() {
  return useContext(LanguageContext);
}

/** Persists an explicit (manual) language choice so auto-detection never overrides it again. */
export function setLangPreference(lang: Lang) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // localStorage unavailable (private mode, etc.) — auto-detect will just re-run next visit.
  }
}

/**
 * Puts a Spanish-canonical path into the active language's URL space.
 *
 * Every Spanish route has an English counterpart at the identical slug under
 * `/en` — that's how the route table in App.tsx is built and how
 * scripts/prerender.mjs derives the English half of its route list — so this is
 * a pure prefix rather than a mapping table that could drift out of sync.
 *
 * Use this for every internal link built from a literal path. Writing
 * `to="/experiencia"` looks harmless but hardcodes Spanish, which is how
 * English visitors ended up being sent to Spanish pages from the headers, the
 * footer and the hero CTA. nav-config.ts had its own local copy of this;
 * anything outside it should use this one.
 */
export function langPath(path: string, lang: Lang): string {
  if (lang !== "en") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/**
 * The active language read straight off the URL.
 *
 * `useLang()` is the normal way to get this, but it needs a LanguageProvider
 * above it in the tree — and the cookie banner renders outside <Routes> in
 * App.tsx, so for it the context would always report the "es" default no matter
 * which page the visitor is on.
 */
export function langFromPathname(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/** The same page in the other language, for the language switcher. */
export function otherLangPath(pathname: string, current: Lang): string {
  if (current === "en") {
    return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  }
  return langPath(pathname, "en");
}

/**
 * Wraps a group of routes to pin i18next's active language and <html lang>
 * to a fixed value, driven by the URL prefix (/en/... vs unprefixed).
 *
 * The one-time browser-language check for visitors landing on "/" used to live
 * here as an effect. It now runs before React's first render, in
 * src/lib/initial-language.ts — doing it after the tree was built meant
 * rendering the whole Spanish page only to immediately rebuild it in English.
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}
