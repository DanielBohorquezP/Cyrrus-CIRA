import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/lib/language";
import { cn } from "@/lib/utils";

/**
 * Crawlable link to the other-language version of the current page.
 *
 * Every Spanish route has an English twin at the same slug under /en (see
 * langPath), so the target is a pure prefix swap of the current pathname. It
 * is a real <Link>/<a href>, rendered identically on the server and on the
 * client's first pass, so the prerendered HTML carries it and search engines
 * can follow it.
 */
export function LanguageLink({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const lang = useLang();
  const target = lang === "en" ? "es" : "en";
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const href =
    lang === "en" ? clean.replace(/^\/en(?=\/|$)/, "") || "/" : clean === "/" ? "/en" : `/en${clean}`;

  return (
    <Link
      to={href}
      hrefLang={target}
      lang={target}
      aria-label={target === "en" ? "View this page in English" : "Ver esta página en español"}
      className={cn(
        "inline-flex h-10 items-center rounded-full px-2 text-sm font-medium uppercase transition-colors",
        className,
      )}
    >
      {target === "en" ? "EN" : "ES"}
    </Link>
  );
}
