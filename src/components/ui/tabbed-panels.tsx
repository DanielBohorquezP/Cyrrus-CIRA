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
    <div
      ref={rootRef}
      className={cn(
        "navy-radial-bg flex w-full flex-wrap overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(10,44,99,0.35)]",
        className,
      )}
    >
      <div
        role="tablist"
        aria-label="Servicios de Cyrrus"
        aria-orientation="vertical"
        className="box-border flex flex-[1_1_280px] flex-col gap-0.5 p-[clamp(24px,3vw,40px)] md:py-[clamp(28px,3.5vw,48px)]"
      >
        {panels.map((p, index) => {
          const selected = active === index;
          return (
            <button
              key={p.id}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={selected ? `panel-${p.id}` : undefined}
              id={`tab-${p.id}`}
              onClick={() => handleSelect(index)}
              className={cn(
                "grid grid-cols-[36px_1fr_16px] items-center gap-3 rounded-xl border-l-[3px] px-[18px] py-4 text-left font-heading transition-[background-color,color,border-color] duration-150 ease-out",
                selected
                  ? "border-sky bg-white/[0.08] text-white"
                  : "border-transparent text-white/70 hover:bg-white/[0.06] hover:text-white",
              )}
            >
              <span className="text-[13px] font-semibold text-sky">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-base font-semibold">{p.tabLabel}</span>
              <span aria-hidden="true" className={cn("text-sm", selected ? "opacity-100" : "opacity-0")}>
                →
              </span>
            </button>
          );
        })}
      </div>

      {/* `key` on both columns is what replays the CSS entrance: changing it
          remounts the subtree, so the animation runs from the top on every tab
          change. This is enter-only — the outgoing panel is replaced rather
          than faded out, which is what AnimatePresence `mode="wait"` was
          sequencing before. */}
      <div className="box-border flex min-w-0 flex-[2_1_420px] flex-col gap-[clamp(24px,3vw,36px)] p-[clamp(20px,2.4vw,32px)]">
        <div key={panel.id + "-image"} className="panel-image-enter">
          <Link to={panel.href} className="block overflow-hidden rounded-2xl" tabIndex={-1} aria-hidden="true">
            <Img
              src={panel.image}
              alt=""
              width={640}
              height={280}
              sizes="(min-width: 1280px) 760px, (min-width: 768px) 60vw, 100vw"
              className="aspect-[16/7] w-full rounded-2xl object-cover"
            />
          </Link>
        </div>
        <div
          key={panel.id}
          role="tabpanel"
          id={`panel-${panel.id}`}
          aria-labelledby={`tab-${panel.id}`}
          className="panel-enter max-w-[640px] px-[clamp(4px,1.5vw,24px)] pb-[clamp(8px,1.5vw,20px)]"
        >
          <span
            className="panel-enter-child block font-heading text-sm font-bold uppercase tracking-[0.06em] text-sky"
            style={{ "--panel-delay": "50ms" } as React.CSSProperties}
          >
            {panel.eyebrow}
          </span>
          <h3
            className="panel-enter-child mt-3.5 font-heading text-[clamp(26px,2.8vw,38px)] font-bold leading-[1.15] tracking-[-0.02em] text-balance text-white"
            style={{ "--panel-delay": "100ms" } as React.CSSProperties}
          >
            {panel.title}
          </h3>
          <p
            className="panel-enter-child mt-4 text-lg leading-[1.7] text-white/80"
            style={{ "--panel-delay": "150ms" } as React.CSSProperties}
          >
            {panel.description}
          </p>
          <div
            className="panel-enter-child mt-8"
            style={{ "--panel-delay": "200ms" } as React.CSSProperties}
          >
            <BorderButton asChild variant="light" size="lg" dot>
              <Link to={panel.href}>{panel.buttonText}</Link>
            </BorderButton>
          </div>
        </div>
      </div>
    </div>
  );
}
