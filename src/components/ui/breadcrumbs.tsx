import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  /** Omitted (or on the last item) renders as plain text, not a link. */
  href?: string;
}

/**
 * Visible breadcrumb trail for internal pages 2+ levels deep. Pass the same
 * items used to build the page's BreadcrumbList JSON-LD (see
 * PlaneacionEstrategica.tsx for the pattern) minus the site-absolute URLs —
 * this component takes in-app paths, not full https:// URLs.
 */
export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/50", className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0 text-white/30" />}
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="transition-colors duration-150 ease-out hover:text-white/80"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-white/70" : undefined}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
