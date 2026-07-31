import { Link } from "react-router-dom";

const links = [
  { label: "Método CIRA", href: "/metodo-cira" },
  { label: "Cyrrus Intelligence Lab", href: "/intelligence-lab" },
  { label: "Leadership Academy", href: "/leadership-academy" },
  { label: "Experiencia", href: "/experiencia" },
  { label: "Perspectivas", href: "/perspectivas" },
  { label: "Contacto", href: "/contacto" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <Link to="/">
          <div className="text-lg font-bold text-navy">CYRRUS</div>
          <div className="text-xs text-gray">Consulting Services</div>
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm text-gray transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cyrrus Consulting Services
        </div>
      </div>
    </footer>
  );
}
