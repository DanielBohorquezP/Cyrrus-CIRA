import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BorderButton } from "@/components/ui/border-button";

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
            {active === index && (
              <motion.span
                layoutId="tabbed-panels-underline"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-cyan"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative grid grid-cols-1 items-center gap-8 overflow-hidden py-8 md:grid-cols-2 md:gap-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={panel.id}
            role="tabpanel"
            id={`panel-${panel.id}`}
            aria-labelledby={`tab-${panel.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-sm font-bold uppercase tracking-wider text-cyan"
            >
              {panel.eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-3 text-2xl font-bold text-white md:text-3xl"
            >
              {panel.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-4 text-base leading-relaxed text-white/70"
            >
              {panel.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-8"
            >
              <BorderButton asChild variant="light" size="lg" className="px-8" dot>
                <Link to={panel.href}>
                  {panel.buttonText}
                </Link>
              </BorderButton>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={panel.id + "-image"}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
              to={panel.href}
              className="block overflow-hidden rounded-xl"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src={panel.image}
                alt={panel.title}
                width={640}
                height={288}
                loading="lazy"
                className="h-56 w-full rounded-xl object-cover md:h-72"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
