import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * A navigation menu with a single panel that slides between triggers and morphs
 * to each panel's size, plus a hover pill that glides between items.
 *
 * Adapted from a framer-motion component. It is CSS-driven here on purpose:
 * both site headers are imported eagerly by every route, so pulling
 * framer-motion in would put 121KB of parse+eval back on the critical path and
 * undo the Total Blocking Time work (see the reveal system in
 * src/components/ui/reveal.tsx for the same reasoning). Everything below
 * animates via CSS transitions; the only JS is a handful of geometry reads that
 * happen on pointer enter — long after load, so they cost TBT nothing.
 *
 * The upstream version also depended on a `Highlight` primitive that wasn't
 * part of the snippet; `useHighlight` here replaces it.
 */

type Rect = { x: number; width: number };

type MenuContextValue = {
  activeValue: string;
  direction: number;
  openValue: (value: string) => void;
  closeMenu: () => void;
  registerContent: (value: string, render: () => React.ReactNode) => () => void;
  registerTrigger: (value: string, node: HTMLElement | null) => void;
  /**
   * A second, nested level of "which one is open" — e.g. a panel row that
   * expands its own sub-list in place. Lives here rather than as local state
   * inside whatever renders the panel, because the panel is rendered TWICE:
   * once visibly, once as an invisible off-screen twin used purely to measure
   * the size to morph to (see the "measure" ref below). Two separate
   * `useState`s would drift — hovering the row in the visible copy would never
   * reach the twin, so the twin's measurement would never reflect the
   * now-wider expanded content. Reading both from this one context keeps them
   * identical always.
   */
  subValue: string;
  openSub: (value: string) => void;
  closeSub: () => void;
};

const MenuContext = React.createContext<MenuContextValue | null>(null);
const ItemContext = React.createContext<{ value?: string }>({});
const HighlightContext = React.createContext<{
  track: (node: HTMLElement | null) => void;
  clear: () => void;
} | null>(null);

/**
 * The gliding hover pill. One absolutely-positioned element whose transform and
 * width follow whichever child is hovered, so N items cost one moving node
 * rather than N background transitions.
 */
function useHighlight() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = React.useState<Rect | null>(null);
  const [visible, setVisible] = React.useState(false);

  const track = React.useCallback((node: HTMLElement | null) => {
    const container = containerRef.current;
    if (!node || !container) return;
    // Two reads on pointer enter. Not per frame, and never during load.
    const a = node.getBoundingClientRect();
    const b = container.getBoundingClientRect();
    setRect({ x: a.left - b.left, width: a.width });
    setVisible(true);
  }, []);

  const clear = React.useCallback(() => setVisible(false), []);

  return { containerRef, rect, visible, track, clear };
}

/** Hook form of the old HighlightItem: returns handlers to spread onto an
 *  element so it drives the pill. A wrapper component would have meant a second
 *  Slot cloning the same child, where only one pointer handler survived. */
function useHighlightItem() {
  const highlight = React.useContext(HighlightContext);
  return React.useMemo(
    () => ({
      onPointerEnter: (event: React.PointerEvent<HTMLElement>) =>
        highlight?.track(event.currentTarget),
      onFocus: (event: React.FocusEvent<HTMLElement>) =>
        highlight?.track(event.currentTarget),
    }),
    [highlight],
  );
}

/** Shared wrapper that paints the pill behind whatever it wraps. */
function Highlight({
  children,
  className,
  pillClassName,
}: {
  children: React.ReactNode;
  className?: string;
  pillClassName?: string;
}) {
  const { containerRef, rect, visible, track, clear } = useHighlight();
  const ctx = React.useMemo(() => ({ track, clear }), [track, clear]);

  return (
    <HighlightContext.Provider value={ctx}>
      <div
        ref={containerRef}
        className={cn("relative", className)}
        onPointerLeave={clear}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 left-0 h-full rounded-lg bg-navy/[0.06]",
            "transition-[transform,width,opacity] duration-200 ease-out",
            pillClassName,
          )}
          style={{
            width: rect?.width ?? 0,
            transform: `translate3d(${rect?.x ?? 0}px, 0, 0)`,
            opacity: visible && rect ? 1 : 0,
          }}
        />
        {children}
      </div>
    </HighlightContext.Provider>
  );
}

type MotionNavigationMenuProps = React.ComponentPropsWithoutRef<"nav"> & {
  /** Extra classes for the sliding panel chrome. */
  viewportClassName?: string;
};

function MotionNavigationMenu({
  className,
  children,
  viewportClassName,
  onPointerLeave,
  onKeyDown,
  ...props
}: MotionNavigationMenuProps) {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const measureRef = React.useRef<HTMLDivElement | null>(null);
  const triggersRef = React.useRef(new Map<string, HTMLElement>());
  // A ref registry, not state: contents re-register on every render (their JSX
  // identity always changes), and doing that through setState would loop.
  const contentsRef = React.useRef(new Map<string, () => React.ReactNode>());
  const lastValueRef = React.useRef("");

  const [activeValue, setActiveValue] = React.useState("");
  const [subValue, setSubValue] = React.useState("");
  const [direction, setDirection] = React.useState(1);
  const [geom, setGeom] = React.useState({ x: 0, width: 0, height: 0 });

  const registerTrigger = React.useCallback((value: string, node: HTMLElement | null) => {
    if (node) triggersRef.current.set(value, node);
    else triggersRef.current.delete(value);
  }, []);

  const registerContent = React.useCallback(
    (value: string, render: () => React.ReactNode) => {
      contentsRef.current.set(value, render);
      return () => {
        contentsRef.current.delete(value);
      };
    },
    [],
  );

  const openValue = React.useCallback((next: string) => {
    if (!next || next === lastValueRef.current) return;
    // Direction comes from the triggers' DOM order, so the panel slides the way
    // the pointer travelled.
    const order = [...triggersRef.current.keys()];
    const from = order.indexOf(lastValueRef.current);
    const to = order.indexOf(next);
    if (from !== -1 && to !== -1) setDirection(to > from ? 1 : -1);
    lastValueRef.current = next;
    setActiveValue(next);
    // A new top-level section never inherits the previous one's expanded row.
    setSubValue("");
  }, []);

  const closeMenu = React.useCallback(() => {
    lastValueRef.current = "";
    setActiveValue("");
    setSubValue("");
  }, []);

  const openSub = React.useCallback((value: string) => setSubValue(value), []);
  const closeSub = React.useCallback(() => setSubValue(""), []);

  // Measure once per open, and again whenever the nested sub-panel opens or
  // closes: the panel's natural size, and where to place its LEFT edge so it
  // sits under its trigger without running off screen.
  //
  // Anchored by the left edge on purpose, not the center: a row expanding its
  // own sub-list (subValue changing) grows the panel's width in place, and
  // centering would have animated that growth outward in both directions —
  // the box visibly sliding left as it also grew right. Anchoring the left
  // edge and only ever growing width to the right matches how the expansion
  // actually reads (see nav-menu.tsx's SectionPanel).
  React.useLayoutEffect(() => {
    if (!activeValue) return;
    const root = rootRef.current;
    const trigger = triggersRef.current.get(activeValue);
    const measure = measureRef.current;
    if (!root || !trigger || !measure) return;

    const rootRect = root.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const { width, height } = measure.getBoundingClientRect();

    const margin = 16;
    let x = triggerRect.left - rootRect.left;
    const left = rootRect.left + x;
    const right = left + width;
    if (left < margin) x += margin - left;
    else if (right > window.innerWidth - margin) x -= right - (window.innerWidth - margin);

    setGeom({ x, width, height });
  }, [activeValue, subValue]);

  React.useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [closeMenu]);

  const ctx = React.useMemo(
    () => ({
      activeValue,
      direction,
      openValue,
      closeMenu,
      registerContent,
      registerTrigger,
      subValue,
      openSub,
      closeSub,
    }),
    [activeValue, direction, openValue, closeMenu, registerContent, registerTrigger, subValue, openSub, closeSub],
  );

  const activeContent = activeValue ? contentsRef.current.get(activeValue) : undefined;

  return (
    <MenuContext.Provider value={ctx}>
      <nav
        ref={rootRef}
        data-slot="navigation-menu"
        className={cn("relative flex max-w-max flex-1 items-center justify-center", className)}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          closeMenu();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === "Escape") closeMenu();
        }}
        {...props}
      >
        {children}

        {/* The panel. Slides on transform, morphs on width/height. Size has to
            animate for the morph to read at all, so it is kept to 200ms and
            confined to hover — it never runs during page load. */}
        <div
          className={cn(
            "absolute top-full left-0 z-50 pt-3",
            // Was always pointer-events-none, including this pt-3 gap between
            // the trigger row and the panel. That gap sits outside nav's own
            // layout box (the panel is absolutely positioned below it), so with
            // events disabled here the browser hit-tests straight through to
            // the page underneath — which isn't a descendant of nav — and
            // nav's onPointerLeave fires mid-crossing. The panel would then
            // close before the pointer ever reached it. Enabling events here
            // while a panel is open keeps the whole gap inside nav's hoverable
            // subtree, so moving from trigger to panel never "leaves" nav.
            activeValue ? "pointer-events-auto" : "pointer-events-none",
          )}
          style={{
            transform: `translate3d(${geom.x}px, 0, 0)`,
            transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            data-slot="navigation-menu-viewport"
            data-state={activeValue ? "open" : "closed"}
            className={cn(
              // Solid, not the old bg-white/95 + backdrop-blur-xl: the panel's
              // positioning wrapper is transformed, and a backdrop-filter inside
              // a transformed ancestor gets its own backdrop root in Chromium —
              // the page behind bled straight through the panel. Solid white is
              // also one less expensive filter per open.
              "relative overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_24px_60px_-14px_rgba(15,23,42,0.3)] ring-1 ring-black/5",
              activeValue ? "pointer-events-auto" : "pointer-events-none",
              "transition-[width,height,opacity,transform] duration-200 ease-out",
              viewportClassName,
            )}
            style={{
              width: activeValue ? geom.width : 0,
              height: activeValue ? geom.height : 0,
              opacity: activeValue ? 1 : 0,
              transform: activeValue ? "scale(1)" : "scale(0.97)",
            }}
          >
            {activeContent && (
              <div
                // Keyed so the enter animation replays per section, and the
                // direction flips with the pointer's travel.
                key={activeValue}
                data-slot="navigation-menu-content"
                className="nav-panel-enter absolute inset-0"
                style={{ "--nav-dir": direction } as React.CSSProperties}
              >
                {activeContent()}
              </div>
            )}
          </div>
        </div>

        {/* Off-screen twin, laid out at natural size, so the panel above knows
            what to morph to before it is visible. */}
        <div
          ref={measureRef}
          aria-hidden="true"
          data-slot="navigation-menu-measure"
          className="pointer-events-none invisible absolute top-full left-0 w-max"
        >
          {activeContent?.()}
        </div>
      </nav>
    </MenuContext.Provider>
  );
}

function MotionNavigationMenuList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return (
    <Highlight className="flex">
      <ul
        data-slot="navigation-menu-list"
        className={cn("relative z-10 flex flex-1 list-none items-center justify-center gap-1", className)}
        {...props}
      />
    </Highlight>
  );
}

function MotionNavigationMenuItem({
  className,
  value,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { value?: string }) {
  const ctx = React.useMemo(() => ({ value }), [value]);
  return (
    <ItemContext.Provider value={ctx}>
      <li
        data-slot="navigation-menu-item"
        data-value={value}
        className={cn("relative", className)}
        {...props}
      />
    </ItemContext.Provider>
  );
}

const motionNavigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center gap-1.5 rounded-lg bg-transparent px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
);

/**
 * The trigger. `asChild` lets the section's own <Link> be the trigger, so
 * hovering opens the panel while clicking still navigates to the section page —
 * the behaviour the previous NavDropdown had.
 *
 * With `asChild` the child is cloned by Radix's Slot, which can only clone a
 * single element — so the chevron is the consumer's to render. It gets
 * `data-state="open"` plus the `group` class from the trigger style, so a
 * `group-data-[state=open]:rotate-180` on the icon is all it takes. See
 * NavMenuChevron below for the ready-made one.
 */
function MotionNavigationMenuTrigger({
  className,
  children,
  asChild,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { asChild?: boolean }) {
  const menu = React.useContext(MenuContext);
  const { value } = React.useContext(ItemContext);
  const highlight = useHighlightItem();
  const isOpen = !!value && menu?.activeValue === value;
  const Comp = asChild ? Slot : "button";

  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (value) menu?.registerTrigger(value, node);
    },
    [menu, value],
  );

  return (
    <Comp
      ref={setRef}
      data-slot="navigation-menu-trigger"
      data-state={isOpen ? "open" : "closed"}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className={cn(motionNavigationMenuTriggerStyle(), className)}
      onPointerEnter={(event: React.PointerEvent<HTMLElement>) => {
        highlight.onPointerEnter(event);
        if (value) menu?.openValue(value);
      }}
      onFocus={(event: React.FocusEvent<HTMLElement>) => {
        highlight.onFocus(event);
        if (value) menu?.openValue(value);
      }}
      {...(asChild ? {} : { type: "button" as const })}
      {...props}
    >
      {children}
    </Comp>
  );
}

/** The chevron for a trigger, rotating off the trigger's own data-state. */
function MotionNavigationMenuChevron({ className }: { className?: string }) {
  return (
    <ChevronDown
      aria-hidden="true"
      className={cn(
        "h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180",
        className,
      )}
    />
  );
}

function MotionNavigationMenuContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const menu = React.useContext(MenuContext);
  const { value } = React.useContext(ItemContext);

  React.useLayoutEffect(() => {
    if (!menu || !value) return;
    return menu.registerContent(value, () => (
      <div className={cn("p-2", className)}>{children}</div>
    ));
  });

  return null;
}

function MotionNavigationMenuLink({
  className,
  asChild,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";
  const highlight = useHighlightItem();
  return (
    <Comp
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-lg p-2 text-sm outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      {...highlight}
      {...props}
    />
  );
}

/**
 * Read/drive the nested "which row is expanded" state from inside panel
 * content (see the big comment on MenuContextValue.subValue for why this has
 * to be shared state rather than something local to whatever renders the
 * panel).
 */
function useNavigationMenuSub() {
  const menu = React.useContext(MenuContext);
  return {
    subValue: menu?.subValue ?? "",
    openSub: menu?.openSub ?? (() => {}),
    closeSub: menu?.closeSub ?? (() => {}),
  };
}

export {
  MotionNavigationMenu,
  MotionNavigationMenuList,
  MotionNavigationMenuItem,
  MotionNavigationMenuContent,
  MotionNavigationMenuTrigger,
  MotionNavigationMenuLink,
  MotionNavigationMenuChevron,
  Highlight,
  motionNavigationMenuTriggerStyle,
  useNavigationMenuSub,
};

export default MotionNavigationMenu;
