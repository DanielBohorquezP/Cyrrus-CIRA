import { Link } from "react-router-dom";
import { BorderButton } from "@/components/ui/border-button";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { navItems } from "@/lib/nav-config";
import { useScrolled } from "@/lib/use-scrolled";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const scrolled = useScrolled(8);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b bg-background/95 px-6 backdrop-blur-md transition-[box-shadow,border-color] duration-100 ease-out md:px-12",
        scrolled ? "border-border shadow-sm" : "border-transparent",
      )}
    >
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/assets/logos-cyrrus/cyrrus-logo-color.png"
          alt="Cyrrus Consulting Services"
          width={140}
          height={44}
          loading="eager"
          className="h-11 w-auto"
        />
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <NavDropdown key={item.label} item={item} variant="light" />
        ))}
      </nav>
      <BorderButton asChild variant="dark" size="sm" dot>
        <Link to="/contacto">Agendar conversación</Link>
      </BorderButton>
    </header>
  );
}
