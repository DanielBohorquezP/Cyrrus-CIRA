import { forwardRef, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

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

const dots = Array.from({ length: N }, (_, i) => {
  const idx = i + 0.5;
  const frac = idx / N;
  const r = Math.sqrt(frac) * MAX_R;
  const theta = idx * GOLDEN_ANGLE;
  return {
    cx: CENTER + r * Math.cos(theta),
    cy: CENTER + r * Math.sin(theta),
    delay: frac * DURATION,
  };
});

/** Navy radial gradient with a pulsing dot spiral overlay — the animated background used across full-bleed navy sections. Dots are CSS-animated (not SMIL) and only start once the section is visible, to keep it cheap when several instances are on one page. */
export const AnimatedNavyBackground = forwardRef<HTMLElement, AnimatedNavyBackgroundProps>(
  function AnimatedNavyBackground({ children, className, ...props }, ref) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={cn("relative w-full", className)} {...props}>
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, color-mix(in srgb, var(--cyan) 35%, var(--navy)) 0%, var(--navy) 35%, #020818 75%, #000000 100%)",
        }}
      />
      <div
        ref={wrapperRef}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
        style={{ mixBlendMode: "screen" }}
      >
        {isVisible && (
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            {dots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.cx.toFixed(3)}
                cy={dot.cy.toFixed(3)}
                r={DOT}
                fill="#ffffff"
                className="navy-dot-pulse"
                style={{ animationDelay: `${dot.delay.toFixed(3)}s` }}
              />
            ))}
          </svg>
        )}
      </div>
      <style>{`
        @keyframes navy-dot-pulse {
          0%, 100% { transform: scale(0.5); opacity: 0.25; }
          50% { transform: scale(1.35); opacity: 0.9; }
        }
        .navy-dot-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: navy-dot-pulse ${DURATION}s ease-in-out infinite;
        }
      `}</style>
      <div className="relative z-10">{children}</div>
    </section>
  );
  }
);
