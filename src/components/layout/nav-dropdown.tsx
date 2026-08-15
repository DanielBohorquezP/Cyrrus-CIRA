import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { NavChild, NavItem } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { ComingSoon } from "@/components/ui/coming-soon";

let splinePrefetched = false;
function prefetchIntelligenceLabVisual() {
  if (splinePrefetched) return;
  splinePrefetched = true;
  // Kick off the (large) 3D runtime bundle as soon as the user shows intent
  // to visit Intelligence Lab, so it's already cached by the time they land.
  import("@splinetool/react-spline");
}

interface NavDropdownProps {
  item: NavItem;
  variant: "dark" | "light";
}

function TimelineRow({
  href,
  label,
  description,
  active,
  isLast,
  hasChildren,
  comingSoon,
  onEnter,
  onLeave,
  onFocus,
  onBlur,
  open,
}: {
  href: string;
  label: string;
  description?: string;
  active: boolean;
  isLast: boolean;
  hasChildren?: boolean;
  comingSoon?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onFocus?: () => void;
  onBlur?: (e: React.FocusEvent) => void;
  open?: boolean;
}) {
  const content = (
    <>
      <span className="flex flex-col gap-0.5">
        <span>{label}</span>
        {description && (
          <span className="text-xs font-normal text-gray/60">{description}</span>
        )}
      </span>
      {hasChildren && (
        <ChevronRight
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-sky-600"
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <div
      className="group relative flex"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* timeline rail */}
      <div className="relative flex w-6 flex-none flex-col items-center">
        <span
          className={cn(
            "mt-[1.15rem] h-1.5 w-1.5 shrink-0 rounded-full ring-4 transition-colors duration-200",
            active || open
              ? "bg-sky-500 ring-sky-500/15"
              : "bg-border ring-transparent group-hover:bg-sky-500/60 group-hover:ring-sky-500/10",
          )}
        />
        {!isLast && (
          <span className="w-px flex-1 bg-gradient-to-b from-border to-border/40" aria-hidden="true" />
        )}
      </div>

      {comingSoon ? (
        <ComingSoon className="flex flex-1 items-start justify-between gap-2 py-3 pr-4 text-sm font-medium text-navy/80">
          {content}
        </ComingSoon>
      ) : (
        <Link
          to={href}
          className="flex flex-1 items-start justify-between gap-2 py-3 pr-4 text-sm font-medium text-navy/90 transition-colors group-hover:text-navy"
          aria-haspopup={hasChildren ? "true" : undefined}
          aria-expanded={hasChildren ? open : undefined}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {content}
        </Link>
      )}
    </div>
  );
}

function NavChildRow({ child, isLast }: { child: NavChild; isLast: boolean }) {
  const [subOpen, setSubOpen] = useState(false);
  const location = useLocation();
  const active = location.pathname === child.href;

  if (!child.children?.length) {
    return (
      <TimelineRow
        href={child.href}
        label={child.label}
        description={child.description}
        active={active}
        isLast={isLast}
        comingSoon={child.comingSoon}
      />
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setSubOpen(true)}
      onMouseLeave={() => setSubOpen(false)}
    >
      <TimelineRow
        href={child.href}
        label={child.label}
        description={child.description}
        active={active}
        isLast={isLast}
        hasChildren
        open={subOpen}
        onFocus={() => setSubOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setSubOpen(false);
        }}
      />
      <div
        className={cn(
          "absolute left-full top-0 z-50 w-72 pl-3 transition-all duration-200 ease-out",
          subOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-2 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-white/95 p-2 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] ring-1 ring-black/5 backdrop-blur-xl">
          <p className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-gray/60">
            {child.label}
          </p>
          <div className="flex flex-col">
            {child.children.map((grandchild, i) => (
              <TimelineRow
                key={grandchild.href}
                href={grandchild.href}
                label={grandchild.label}
                description={grandchild.description}
                active={location.pathname === grandchild.href}
                isLast={i === child.children!.length - 1}
                comingSoon={grandchild.comingSoon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavDropdown({ item, variant }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActiveSection = location.pathname.startsWith(item.href);

  const linkClass =
    variant === "dark"
      ? "text-white/85 hover:text-white"
      : "text-navy/80 hover:text-navy";

  if (!item.children?.length) {
    return (
      <Link
        key={item.label}
        to={item.href}
        className={cn(
          "relative inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors",
          linkClass,
        )}
      >
        {item.label}
        <span
          className={cn(
            "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200",
            isActiveSection && "scale-x-100",
          )}
        />
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setOpen(true);
        if (item.href === "/intelligence-lab") prefetchIntelligenceLabVisual();
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.href}
        className={cn(
          "relative inline-flex items-center gap-1.5 py-2 text-sm font-medium transition-colors",
          linkClass,
        )}
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={() => {
          setOpen(true);
          if (item.href === "/intelligence-lab") prefetchIntelligenceLabVisual();
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
        }}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors duration-200",
            isActiveSection ? "bg-sky-500" : "bg-transparent",
          )}
          aria-hidden="true"
        />
        {item.label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
        <span
          className={cn(
            "absolute -bottom-0.5 left-3 right-0 h-px origin-left scale-x-0 bg-current transition-transform duration-200",
            isActiveSection && "scale-x-100",
          )}
        />
      </Link>
      <div
        className={cn(
          "absolute left-0 top-full z-40 w-80 pt-3 transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1.5 opacity-0",
        )}
      >
        <div className="rounded-2xl border border-border/60 bg-white/95 p-2 shadow-[0_24px_60px_-14px_rgba(15,23,42,0.3)] ring-1 ring-black/5 backdrop-blur-xl">
          <p className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-gray/60">
            {item.label}
          </p>
          <div className="flex flex-col">
            {item.children.map((child, i) => (
              <NavChildRow key={child.href} child={child} isLast={i === item.children!.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
