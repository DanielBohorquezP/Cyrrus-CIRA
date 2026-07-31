import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Método CIRA", href: "/metodo-cira" },
  { label: "Cyrrus Intelligence Lab", href: "/intelligence-lab" },
  { label: "Leadership Academy", href: "/leadership-academy" },
  { label: "Experiencia", href: "/experiencia" },
  { label: "Perspectivas", href: "/perspectivas" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border bg-background/90 px-6 backdrop-blur-md md:px-12">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/assets/logos-cyrrus/cyrrus-logo-color.svg"
          alt="Cyrrus Consulting Services"
          className="h-7 w-auto"
        />
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-sm font-medium text-gray transition-colors hover:text-navy"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Button asChild size="sm" className="bg-navy text-white hover:bg-navy/90">
        <Link to="/contacto">Agendar conversación</Link>
      </Button>
    </header>
  );
}
