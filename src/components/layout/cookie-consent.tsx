import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BorderButton } from "@/components/ui/border-button";
import { loadAnalytics } from "@/lib/analytics";
import { langFromPathname, langPath } from "@/lib/language";

const STORAGE_KEY = "cyrrus-cookie-consent";

export type CookieConsentValue = "accepted" | "rejected";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  // This banner renders outside <Routes> (see App.tsx), so the language has to
  // come off the URL rather than from useLang().
  const lang = langFromPathname(useLocation().pathname);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      setVisible(true);
    } else if (existing === "accepted") {
      loadAnalytics();
    }
  }, []);

  function choose(value: CookieConsentValue) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
    if (value === "accepted") {
      loadAnalytics();
    }
  }

  if (!visible) return null;

  // This banner was the last thing pulling framer-motion into the app shell —
  // 124KB of parse+eval on every page load, for one slide-up on an element
  // that isn't even rendered for returning visitors. It's a CSS keyframe now.
  // There's no exit animation any more: the banner unmounts on click, which is
  // what AnimatePresence was here for, and nobody watches a cookie notice
  // leave.
  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="cookie-banner-enter fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] sm:flex-row sm:items-center sm:p-6">
        <p className="flex-1 text-base leading-relaxed text-gray">
          Usamos cookies estrictamente necesarias para que este sitio funcione. Solo si usted lo
          acepta, usamos también cookies de Google Analytics y otras herramientas para entender
          cómo se usa el sitio. Puede leer más en nuestra{" "}
          <Link to={langPath("/cookies", lang)} className="text-blue underline underline-offset-2">
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="text-sm font-medium text-gray transition-colors hover:text-navy"
          >
            Rechazar
          </button>
          <BorderButton variant="dark" size="sm" onClick={() => choose("accepted")}>
            Aceptar
          </BorderButton>
        </div>
      </div>
    </div>
  );
}
