import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useLang, getAlternatePath } from "@/lib/language";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ dark = false, className }: { dark?: boolean; className?: string }) {
  const { t } = useTranslation();
  const lang = useLang();
  const { pathname } = useLocation();
  const target = getAlternatePath(pathname, lang);

  return (
    <Link
      to={target}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-150 ease-out",
        dark
          ? "border-white/20 text-white hover:bg-white/10"
          : "border-navy/15 text-navy hover:bg-navy/5",
        className,
      )}
      aria-label={t("languageSwitcher.switchTo")}
    >
      <Globe className="h-3.5 w-3.5" />
      {lang === "es" ? "EN" : "ES"}
    </Link>
  );
}
