import { Link, useLocation } from "react-router-dom";
import { otherLangPath, setLangPreference, useLang, type Lang } from "@/lib/language";
import { cn } from "@/lib/utils";

const LABELS: Record<Lang, { short: string; full: string }> = {
  es: { short: "ES", full: "Español" },
  en: { short: "EN", full: "English" },
};

interface LanguageSwitcherProps {
  /** Match the surrounding header: "dark" is for the transparent header over the hero. */
  variant?: "light" | "dark";
  className?: string;
  onNavigate?: () => void;
}

/**
 * ES/EN toggle.
 *
 * Both options are real links to the same page in each language, not buttons:
 * that gives crawlers a followable path to the translated document (matching
 * the hreflang alternates usePageMeta emits) and gives people
 * open-in-new-tab and the normal link affordances.
 *
 * Either option also records the choice via setLangPreference, which is the
 * point of the control. LanguageProvider's one-time browser-language detection
 * only redirects "/" when nothing is stored, so without this a visitor who
 * deliberately chose Spanish on an English-configured browser would be bounced
 * back to /en the next time they hit the root.
 */
export function LanguageSwitcher({ variant = "light", className, onNavigate }: LanguageSwitcherProps) {
  const lang = useLang();
  const { pathname } = useLocation();
  const dark = variant === "dark";

  const targets: Array<{ code: Lang; to: string }> = [
    { code: "es", to: lang === "es" ? pathname : otherLangPath(pathname, lang) },
    { code: "en", to: lang === "en" ? pathname : otherLangPath(pathname, lang) },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 transition-[background-color,border-color] duration-200 ease-out",
        dark ? "border-white/25 bg-white/5" : "border-border bg-background",
        className,
      )}
      role="group"
      aria-label={lang === "en" ? "Language" : "Idioma"}
    >
      {targets.map(({ code, to }) => {
        const active = code === lang;
        return (
          <Link
            key={code}
            to={to}
            hrefLang={code}
            lang={code}
            aria-label={LABELS[code].full}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              setLangPreference(code);
              onNavigate?.();
            }}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-[background-color,color] duration-200 ease-out",
              active
                ? dark
                  ? "bg-white text-navy"
                  : "bg-navy text-white"
                : dark
                  ? "text-white/70 hover:text-white"
                  : "text-gray hover:text-navy",
            )}
          >
            {LABELS[code].short}
          </Link>
        );
      })}
    </div>
  );
}
