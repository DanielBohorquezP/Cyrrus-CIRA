import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuLink,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
  MotionNavigationMenuChevron,
  useNavigationMenuSub,
} from "@/components/ui/motion-navigation-menu";
import { ComingSoon } from "@/components/ui/coming-soon";
import type { NavChild, NavItem } from "@/lib/nav-config";
import { useLang } from "@/lib/language";
import { cn } from "@/lib/utils";

/**
 * The desktop nav, rendered from the same getNavItems() tree the old
 * NavDropdown used — six top-level sections, their subpages, and the third
 * level under Selección de Soluciones.
 *
 * The panel starts sized to just its subpage list — no reserved blank space.
 * Hovering the one row that has its own children (Selección de Soluciones)
 * grows the panel to the right in place to reveal that third level; hovering
 * any other row collapses it straight back down.
 */

interface NavMenuProps {
  items: NavItem[];
  variant: "dark" | "light";
}

/** A row in the left column of a panel. */
function ChildRow({
  child,
  active,
  hasChildren,
  expanded,
  onActivate,
}: {
  child: NavChild;
  active: boolean;
  hasChildren: boolean;
  expanded: boolean;
  onActivate?: () => void;
}) {
  const body = (
    <>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-medium text-navy">{child.label}</span>
        {child.description && (
          <span className="text-xs leading-snug text-gray/70">{child.description}</span>
        )}
      </span>
      {hasChildren ? (
        <ChevronRight
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 shrink-0 self-center text-gray/50 transition-transform duration-200 ease-out",
            expanded && "translate-x-0.5 text-cyan-ink",
          )}
        />
      ) : (
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 self-center text-gray/30 opacity-0 transition-[transform,color,opacity] duration-200 ease-out group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-cyan-ink group-hover/row:opacity-100"
        />
      )}
    </>
  );

  // flex-row is explicit: MotionNavigationMenuLink's base class is flex-col, so
  // without it the label block and the chevron stack instead of sitting on one
  // line.
  const rowClass =
    "group/row flex w-[17.5rem] flex-row items-center justify-between gap-3 rounded-lg px-3 py-2 text-left";

  const lang = useLang();

  if (child.comingSoon) {
    return (
      <ComingSoon
        className={cn(rowClass, "opacity-70")}
        message={lang === "en" ? "Coming soon" : "Próximamente"}
      >
        {body}
      </ComingSoon>
    );
  }

  return (
    <MotionNavigationMenuLink
      asChild
      className={cn(rowClass, active && "bg-cyan/10")}
    >
      <Link to={child.href} onPointerEnter={onActivate} onFocus={onActivate}>
        {body}
      </Link>
    </MotionNavigationMenuLink>
  );
}

/** The panel for one top-level section. */
function SectionPanel({ item }: { item: NavItem }) {
  const location = useLocation();
  // Shared with MotionNavigationMenu, not local useState: this component
  // renders twice per open — once visibly, once as an invisible twin the menu
  // measures to know how wide to morph the real panel to (see
  // motion-navigation-menu.tsx). Local state would only ever update the copy
  // being hovered, so the twin's measurement would never grow to match — the
  // third-level column would open in the visible panel but get clipped at the
  // old (narrower) width. Reading from shared context keeps both in sync.
  const { subValue, openSub } = useNavigationMenuSub();
  const children = item.children ?? [];
  // The one child that has its own children — Selección de Soluciones today.
  const branch = children.find((c) => c.children?.length);
  const grandchildren = branch?.children ?? [];
  const expanded = !!branch && subValue === branch.href;

  return (
    <div className="flex">
      <div className="flex flex-col">
        <p className="px-3 pt-1 pb-1.5 text-[11px] font-semibold tracking-wider text-gray/60 uppercase">
          {item.label}
        </p>
        {children.map((child) => (
          <ChildRow
            key={child.href}
            child={child}
            active={location.pathname === child.href}
            hasChildren={!!child.children?.length}
            expanded={!!child.children?.length && subValue === child.href}
            // Only rows with children open a branch. Plain rows deliberately
            // don't close one: a real diagonal mouse path from "Selección de
            // Soluciones" toward a lower third-level link passes back over
            // "Gerencia de Proyectos" on the way (their rows overlap
            // horizontally), and that used to collapse the branch mid-transit,
            // which cascaded into the whole panel closing. With only one
            // expandable row there's nothing to resolve by auto-closing on
            // hover — it only needs to close when the section changes or the
            // whole menu closes, both handled in MotionNavigationMenu already.
            onActivate={child.children?.length ? () => openSub(child.href) : undefined}
          />
        ))}
      </div>

      {/* Only rendered while expanded — not always-mounted-and-faded — so the
          panel's own natural width (what MotionNavigationMenu measures and
          morphs to) is just the left column normally, and only grows to
          include this once it's actually showing. */}
      {expanded && branch && grandchildren.length > 0 && (
        <div className="ml-2 flex flex-col border-l border-border/60 pl-2">
          <p className="px-3 pt-1 pb-1.5 text-[11px] font-semibold tracking-wider text-cyan-ink uppercase">
            {branch.label}
          </p>
          {grandchildren.map((grandchild) => (
            <ChildRow
              key={grandchild.href}
              child={grandchild}
              active={location.pathname === grandchild.href}
              hasChildren={false}
              expanded={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function NavMenu({ items, variant }: NavMenuProps) {
  const location = useLocation();
  const lang = useLang();
  const dark = variant === "dark";

  const triggerClass = dark
    ? "text-white/85 hover:text-white data-[state=open]:text-white"
    : "text-navy/80 hover:text-navy data-[state=open]:text-navy";

  return (
    <MotionNavigationMenu
      className="hidden lg:flex"
      aria-label={lang === "en" ? "Main navigation" : "Navegación principal"}
    >
      <MotionNavigationMenuList className="gap-0.5">
        {items.map((item) => {
          const isActiveSection = location.pathname.startsWith(item.href);
          const dot = (
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200",
                isActiveSection ? "bg-cyan" : "bg-transparent",
              )}
            />
          );

          if (!item.children?.length) {
            return (
              <MotionNavigationMenuItem key={item.label}>
                <MotionNavigationMenuLink
                  asChild
                  className={cn(
                    "h-9 flex-row items-center gap-1.5 px-3 py-2 text-sm font-medium",
                    triggerClass,
                  )}
                >
                  <Link to={item.href}>
                    {dot}
                    {item.label}
                  </Link>
                </MotionNavigationMenuLink>
              </MotionNavigationMenuItem>
            );
          }

          return (
            <MotionNavigationMenuItem key={item.label} value={item.href}>
              {/* asChild keeps the trigger a real Link: hovering opens the
                  panel, clicking still goes to the section page. */}
              <MotionNavigationMenuTrigger asChild className={triggerClass}>
                <Link to={item.href}>
                  {dot}
                  {item.label}
                  <MotionNavigationMenuChevron />
                </Link>
              </MotionNavigationMenuTrigger>
              <MotionNavigationMenuContent>
                <SectionPanel item={item} />
              </MotionNavigationMenuContent>
            </MotionNavigationMenuItem>
          );
        })}
      </MotionNavigationMenuList>
    </MotionNavigationMenu>
  );
}
