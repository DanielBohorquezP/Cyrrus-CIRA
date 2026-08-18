import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esMetodoCira from "./locales/es/metodo-cira.json";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enMetodoCira from "./locales/en/metodo-cira.json";

// Only the namespaces the entry bundle can actually render are bundled here.
// The full set of 24 locale files is ~150KB of JSON that every visitor used to
// parse before first interaction, to render one page that needs 11KB of it.
// Everything else now ships inside the route chunk that uses it — see
// src/i18n/ns/*.ts and the `import "@/i18n/ns/<name>"` line at the top of each
// page. Those chunks are already behind React.lazy, so the JSON rides along
// for free instead of sitting on the critical path.
//
// `common` is the nav/footer/CTA copy every page needs; `home` is the entry
// route (the one page kept out of the lazy set in App.tsx); `metodo-cira` is
// here because the home page's CyrrusAbout section reads the canonical CIRA
// phases out of it rather than restating them.
const CORE_NS = ["common", "home", "metodo-cira"];

/**
 * The language this document is for, read straight off the URL.
 *
 * i18next used to start on "es" unconditionally and get corrected by
 * LanguageProvider's effect after the first render. That made every English
 * page render its entire tree in Spanish and then immediately re-render all of
 * it in English — a second full pass over ~1,000 elements, on the main thread,
 * inside the load window. The URL already says which language the page is, so
 * there's nothing to wait for.
 *
 * Kept in sync with langFromPathname() in src/lib/language.tsx, which can't be
 * imported here: it pulls in react-router, and this module is evaluated from
 * main.tsx before the router exists.
 */
function initialLang() {
  if (typeof window === "undefined") return "es";
  const { pathname } = window.location;
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

i18next.use(initReactI18next).init({
  lng: initialLang(),
  fallbackLng: "es",
  defaultNS: "common",
  ns: CORE_NS,
  // Tells i18next that a language can arrive in pieces, so registering a
  // namespace later isn't treated as re-declaring an already-complete language.
  partialBundledLanguages: true,
  interpolation: { escapeValue: false },
  // No backend is configured — every namespace is registered synchronously,
  // either here or at the top of the route chunk that needs it. Suspense would
  // only ever be able to hang, never resolve, if a registration were missed.
  react: { useSuspense: false },
  resources: {
    es: {
      common: esCommon,
      home: esHome,
      "metodo-cira": esMetodoCira,
    },
    en: {
      common: enCommon,
      home: enHome,
      "metodo-cira": enMetodoCira,
    },
  },
});

export default i18next;
