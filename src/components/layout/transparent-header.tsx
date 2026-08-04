import { Link } from "react-router-dom";
import { BorderButton } from "@/components/ui/border-button";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { navItems } from "@/lib/nav-config";
import { useScrolled } from "@/lib/use-scrolled";
import { cn } from "@/lib/utils";

export function TransparentHeader() {
  const scrolled = useScrolled(8);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex h-20 w-full items-center justify-between px-6 backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-200 ease-out md:px-12",
        scrolled ? "border-b border-border bg-white/95 shadow-sm" : "border-b border-transparent bg-transparent",
      )}
    >
      <Link to="/" className="relative flex h-11 aspect-[5401/3300] items-center">
        <img
          src="/assets/logos-cyrrus/cyrrus-logo-blanco.png"
          alt="Cyrrus Consulting Services"
          width={140}
          height={44}
          loading="eager"
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out",
            scrolled ? "opacity-0" : "opacity-100",
          )}
        />
        <img
          src="/assets/logos-cyrrus/cyrrus-logo-color.png"
          alt="Cyrrus Consulting Services"
          width={140}
          height={44}
          loading="eager"
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <NavDropdown key={item.label} item={item} variant={scrolled ? "light" : "dark"} />
        ))}
      </nav>
      <BorderButton asChild variant={scrolled ? "dark" : "light"} dot>
        <Link to="/contacto">Agendar conversación</Link>
      </BorderButton>
    </header>
  );
}
