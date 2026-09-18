import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type Lang = "es" | "en";

const LanguageContext = createContext<Lang>("es");

export function useLang() {
  return useContext(LanguageContext);
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

/**
 * Wraps a group of routes to pin i18next's active language and <html lang>
 * to a fixed value, driven by the URL prefix (/en/... vs unprefixed).
 *
 * There is no browser-language auto-redirect: "/" always serves the Spanish
 * page. Google discourages redirecting by browser/Accept-Language on the
 * canonical URL, and Googlebot's crawl language isn't a reliable signal of a
 * visitor's actual language anyway. Visitors who want English use the "/en"
 * URL directly or a link to it.
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}
