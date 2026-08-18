import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BorderButton } from "@/components/ui/border-button";
import { Img } from "@/components/ui/img";

export interface TabPanel {
  id: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  buttonText: string;
  image: string;
}

interface TabbedPanelsProps {
  panels: TabPanel[];
  className?: string;
  /** Milliseconds between automatic slide changes. Set to 0 to disable autoplay. */
  autoPlayInterval?: number;
}

export function TabbedPanels({
  panels,
  className,
  autoPlayInterval = 6000,
}: TabbedPanelsProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // Autoplay used to run for the lifetime of the page, cross-fading full-size
  // photos behind whatever the visitor was actually reading further down.
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && !document.hidden),
      { threshold: 0.2 },
    );
    observer.observe(node);

    const onVisibility = () => {
      if (document.hidden) setIsActive(false);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!autoPlayInterval || !isActive) return;

    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % panels.length);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlayInterval, panels.length, isActive]);

  const handleSelect = (index: number) => {
    setActive(index);
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoPlayInterval && isActive) {
      timerRef.current = setInterval(() => {
        setActive((current) => (current + 1) % panels.length);
      }, autoPlayInterval);
    }
  };

  const panel = panels[active];

  return (
    <div ref={rootRef} className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label="Servicios de Cyrrus"
        className="flex flex-wrap gap-2 border-b border-white/15"
      >
        {panels.map((p, index) => (
          <button
            key={p.id}
            role="tab"
            type="button"
            aria-selected={active === index}
            aria-controls={active === index ? `panel-${p.id}` : undefined}
            id={`tab-${p.id}`}
            onClick={() => handleSelect(index)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors md:text-base",
              active === index
                ? "text-white"
                : "text-white/50 hover:text-white/80"
            )}
          >
            {p.tabLabel}
            {/* framer's `layoutId` underline slid between tabs, which meant
                shipping the whole shared-layout engine (and its per-frame
                measuring) to the home page for a 2px rule. This one wipes in
                from the left on the active tab instead — same affordance,
                composited, no JS. */}
            {active === index && (
              <span className="tab-underline absolute inset-x-0 -bottom-px h-0.5 origin-left bg-cyan" />
            )}
          </button>
        ))}
      </div>

      {/* `key` on both columns is what replays the CSS entrance: changing it
          remounts the subtree, so the animation runs from the top on every tab
          change. This is enter-only — the outgoing panel is replaced rather
          than faded out, which is what AnimatePresence `mode="wait"` was
          sequencing before. */}
      <div className="relative grid grid-cols-1 items-center gap-8 overflow-hidden py-8 md:grid-cols-2 md:gap-12">
        <div
          key={panel.id}
          role="tabpanel"
          id={`panel-${panel.id}`}
          aria-labelledby={`tab-${panel.id}`}
          className="panel-enter"
        >
          <span
            className="panel-enter-child text-sm font-bold uppercase tracking-wider text-cyan"
            style={{ "--panel-delay": "50ms" } as React.CSSProperties}
          >
            {panel.eyebrow}
          </span>
          <h2
            className="panel-enter-child mt-3 text-2xl font-bold text-white md:text-3xl"
            style={{ "--panel-delay": "100ms" } as React.CSSProperties}
          >
            {panel.title}
          </h2>
          <p
            className="panel-enter-child mt-4 text-base leading-relaxed text-white/70"
            style={{ "--panel-delay": "150ms" } as React.CSSProperties}
          >
            {panel.description}
          </p>
          <div
            className="panel-enter-child mt-8"
            style={{ "--panel-delay": "200ms" } as React.CSSProperties}
          >
            <BorderButton asChild variant="light" size="lg" className="px-8" dot>
              <Link to={panel.href}>
                {panel.buttonText}
              </Link>
            </BorderButton>
          </div>
        </div>

        <div key={panel.id + "-image"} className="panel-image-enter">
          <Link
            to={panel.href}
            className="block overflow-hidden rounded-xl"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Img
              src={panel.image}
              alt={panel.title}
              width={640}
              height={288}
              sizes="(min-width: 768px) 640px, 100vw"
              className="h-56 w-full rounded-xl object-cover md:h-72"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
