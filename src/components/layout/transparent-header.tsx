import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown } from "lucide-react";
import { BorderButton } from "@/components/ui/border-button";
import { NavMenu } from "@/components/layout/nav-menu";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getNavItems, type NavChild, type NavItem } from "@/lib/nav-config";
import { useLang } from "@/lib/language";
import { useScrolled } from "@/lib/use-scrolled";
import { cn } from "@/lib/utils";
import { Img } from "@/components/ui/img";
import { useContactWizard } from "@/lib/contact-wizard-context";

function MobileNavAccordionItem({
  item,
  depth = 0,
  onNavigate,
}: {
  item: NavItem | NavChild;
  depth?: number;
  onNavigate: () => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <div>
      <div className={cn("flex items-center justify-between", depth > 0 && "pl-4")}>
        <Link
          to={item.href}
          onClick={onNavigate}
          className={cn(
            "flex-1 py-3 text-base font-medium text-navy",
            depth > 0 && "text-sm text-navy/80",
          )}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("cta.contraer") : t("cta.expandir")}
            aria-expanded={open}
            className="p-2 text-navy/80"
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-150 ease-out",
                open && "rotate-180",
              )}
            />
          </button>
        )}
      </div>
      {hasChildren && open && (
        <div className="border-l border-border pl-3">
          {item.children!.map((child) => (
            <MobileNavAccordionItem
              key={child.label}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TransparentHeader() {
  const scrolled = useScrolled(8);
  const location = useLocation();
  const { t } = useTranslation();
  const lang = useLang();
  const navItems = getNavItems(t, lang);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openWizard } = useContactWizard();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const iconDark = !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex h-20 w-full items-center justify-between px-6 backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-200 ease-out md:px-12",
        scrolled || mobileOpen
          ? "border-b border-border bg-white/95 shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Link to={lang === "en" ? "/en" : "/"} className="relative flex h-16 aspect-[5401/3300] items-center">
        <Img
          src="/assets/logos-cyrrus/cyrrus-logo-blanco.png"
          alt="Cyrrus Consulting Services"
          width={140}
          height={44}
          loading="eager"
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out",
            iconDark ? "opacity-100" : "opacity-0",
          )}
          sizes="104px"
        />
        <Img
          src="/assets/logos-cyrrus/cyrrus-logo-color.webp"
          alt="Cyrrus Consulting Services"
          width={140}
          height={44}
          loading="eager"
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out",
            iconDark ? "opacity-0" : "opacity-100",
          )}
          sizes="104px"
        />
      </Link>
      <NavMenu items={navItems} variant={scrolled ? "light" : "dark"} />
      <div className="flex items-center gap-2">
        <LanguageSwitcher
          variant={scrolled ? "light" : "dark"}
          className="hidden lg:inline-flex"
        />
        <BorderButton
          variant={scrolled ? "dark" : "light"}
          dot
          className="hidden lg:inline-flex"
          onClick={openWizard}
        >
          {t("cta.agendarConversacion")}
        </BorderButton>
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? t("cta.cerrarMenu") : t("cta.abrirMenu")}
          aria-expanded={mobileOpen}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            iconDark ? "text-white" : "text-navy",
          )}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-20 z-40 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-border bg-background shadow-lg transition-[opacity,transform] duration-150 ease-out lg:hidden",
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav className="flex flex-col divide-y divide-border px-6">
          {navItems.map((item) => (
            <MobileNavAccordionItem
              key={item.label}
              item={item}
              onNavigate={() => setMobileOpen(false)}
            />
          ))}
        </nav>
        <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-5">
          <BorderButton
            variant="dark"
            size="sm"
            dot
            className="flex-1 justify-center"
            onClick={() => {
              setMobileOpen(false);
              openWizard();
            }}
          >
            {t("cta.agendarConversacion")}
          </BorderButton>
          <LanguageSwitcher onNavigate={() => setMobileOpen(false)} />
        </div>
      </div>
    </header>
  );
}
