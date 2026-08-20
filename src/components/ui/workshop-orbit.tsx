import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComingSoon } from "@/components/ui/coming-soon";

export interface WorkshopOrbitItem {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

interface WorkshopOrbitProps {
  items: WorkshopOrbitItem[];
  className?: string;
}

function useResponsive() {
  const [screenSize, setScreenSize] = React.useState<"xs" | "sm" | "lg">("lg");

  React.useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize("xs");
      else if (width < 768) setScreenSize("sm");
      else setScreenSize("lg");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return screenSize;
}

export function WorkshopOrbit({ items, className }: WorkshopOrbitProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const screenSize = useResponsive();

  // cardWidth is driven by the same xs/sm/lg breakpoints as the orbit itself
  // (480/768px) rather than Tailwind's sm: (640px) — the mismatch between the
  // two used to leave the card stuck at 128px between 480-639px, too narrow
  // to fit the "Ver taller" pill next to both nav arrows without wrapping.
  const { containerRadius, nodeSize, cardWidth } =
    screenSize === "xs"
      ? { containerRadius: 130, nodeSize: 32, cardWidth: 152 }
      : screenSize === "sm"
        ? { containerRadius: 155, nodeSize: 36, cardWidth: 164 }
        : { containerRadius: 190, nodeSize: 40, cardWidth: 176 };

  const containerSize = containerRadius * 2 + nodeSize + 16;

  const getRotation = React.useCallback(
    (index: number) => (index - activeIndex) * (360 / items.length),
    [activeIndex, items.length]
  );

  const next = React.useCallback(
    () => setActiveIndex((i) => (i + 1) % items.length),
    [items.length]
  );
  const prev = React.useCallback(
    () => setActiveIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );

  React.useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isHovering, next]);

  const active = items[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <div
      className={cn("flex flex-col items-center", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Orbit ring */}
        <div
          className="pointer-events-none absolute rounded-full border border-white/10"
          style={{ width: containerRadius * 2, height: containerRadius * 2 }}
        />

        {/* Active workshop card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{ width: cardWidth }}
            className="z-10 rounded-xl border border-white/15 bg-white/[0.07] p-3 text-center shadow-lg backdrop-blur-sm"
          >
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-cyan/15 text-cyan">
              <ActiveIcon className="h-4 w-4" />
            </div>
            <p className="mt-2.5 text-xs font-semibold leading-snug text-white sm:text-sm">
              {active.title}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/60">
              {active.description}
            </p>
            <div className="mt-2.5 flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  prev();
                }}
                className="shrink-0 rounded-full bg-white/10 p-1.5 text-white/80 transition-colors duration-150 hover:bg-white/20"
                aria-label="Taller anterior"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <ComingSoon>
                <span className="whitespace-nowrap rounded-full bg-cyan px-3 py-1 text-[11px] font-semibold text-navy">
                  Ver taller
                </span>
              </ComingSoon>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                className="shrink-0 rounded-full bg-white/10 p-1.5 text-white/80 transition-colors duration-150 hover:bg-white/20"
                aria-label="Siguiente taller"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting icon nodes */}
        {items.map((item, i) => {
          const rotation = getRotation(i);
          const isActive = i === activeIndex;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: isActive ? 0 : Math.abs(i - activeIndex) * 0.04,
              }}
              style={{
                width: nodeSize,
                height: nodeSize,
                position: "absolute",
                top: `calc(50% - ${nodeSize / 2}px)`,
                left: `calc(50% - ${nodeSize / 2}px)`,
                zIndex: isActive ? 20 : 10,
              }}
            >
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="h-full w-full"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={item.title}
                  className={cn(
                    "flex h-full w-full items-center justify-center rounded-full border transition-colors duration-150",
                    isActive
                      ? "border-cyan bg-cyan text-navy shadow-[0_0_0_4px_rgba(63,182,232,0.2)]"
                      : "border-white/20 bg-white/10 text-white/70 hover:border-cyan/60 hover:text-cyan"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="mt-5 flex justify-center gap-1.5">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Ir a ${item.title}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-150",
              index === activeIndex ? "w-4 bg-cyan" : "w-1.5 bg-white/25"
            )}
          />
        ))}
      </div>
    </div>
  );
}
