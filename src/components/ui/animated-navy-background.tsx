import { forwardRef, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isPrerender } from "@/lib/prerender";

interface AnimatedNavyBackgroundProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

const SIZE = 620;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const N = 90;
const DOT = 1.6;
const CENTER = SIZE / 2;
const PADDING = 4;
const MAX_R = CENTER - PADDING - DOT;
const DURATION = 3;

/**
 * How many bands the spiral is split into — and, therefore, how many CSS
 * animations the whole effect costs.
 *
 * It used to be one animation per dot. 90 concurrent animations on SVG
 * `<circle>` elements is not something Blink can hand to the compositor, so
 * every frame recalculated style for 90 elements on the main thread: measured
 * at ~190ms of blocking time from this component alone, and the source of
 * Lighthouse's "avoid non-composited animations" flag. Grouping the dots by
 * radius and animating eight plain `<div>` wrappers instead gets that to eight
 * composited opacity animations, which cost the main thread nothing.
 *
 * Eight is enough steps that the wave still reads as continuous rather than as
 * rings switching on and off.
 */
const BANDS = 8;

/** The dots, bucketed by radius. Band index doubles as the animation delay
 *  step, so brightness still sweeps from the centre outwards exactly as it did
 *  when the delay was computed per dot. */
const bands = Array.from({ length: BANDS }, () => [] as { cx: string; cy: string }[]);

for (let i = 0; i < N; i += 1) {
  const idx = i + 0.5;
  const frac = idx / N;
  const r = Math.sqrt(frac) * MAX_R;
  const theta = idx * GOLDEN_ANGLE;
  const band = Math.min(BANDS - 1, Math.floor(frac * BANDS));
  bands[band].push({
    cx: (CENTER + r * Math.cos(theta)).toFixed(3),
    cy: (CENTER + r * Math.sin(theta)).toFixed(3),
  });
}

/** Navy radial gradient with a pulsing dot spiral overlay — the animated background used across full-bleed navy sections. The spiral mounts lazily on first approach and pauses whenever the section is off-screen or the tab is hidden — the Home page alone stacks four instances. */
export const AnimatedNavyBackground = forwardRef<HTMLElement, AnimatedNavyBackgroundProps>(
  function AnimatedNavyBackground({ children, className, ...props }, ref) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // `hasMounted` latches on first approach so scrolling back never re-pays the
  // cost of building the spiral; `isVisible` keeps toggling so the animation
  // can actually stop once the section leaves the viewport.
  const [hasMounted, setHasMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    // Leave the spiral unmounted in the prerendered snapshot so it matches
    // React's first render on the client — see src/lib/prerender.ts.
    if (isPrerender()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setHasMounted(true);
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);

    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const isAnimating = isVisible && pageVisible;

  return (
    <section ref={ref} className={cn("relative w-full", className)} {...props}>
      <div className="navy-radial-bg absolute inset-0 z-0" />
      <div
        ref={wrapperRef}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
        style={{ mixBlendMode: "screen" }}
        data-motion={isAnimating ? "on" : "off"}
      >
        {hasMounted && (
          <div className="relative" style={{ width: SIZE, height: SIZE }}>
            {bands.map((dots, band) => (
              // One composited opacity animation per band. The wrapper is a
              // plain div rather than an SVG <g> on purpose: Blink composites
              // opacity animations on HTML elements, but runs them on the main
              // thread for SVG children.
              <div
                key={band}
                className="navy-dot-pulse absolute inset-0"
                style={{ animationDelay: `${((band / BANDS) * DURATION).toFixed(3)}s` }}
              >
                <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                  {dots.map((dot, i) => (
                    <circle key={i} cx={dot.cx} cy={dot.cy} r={DOT} fill="#ffffff" />
                  ))}
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
  }
);
