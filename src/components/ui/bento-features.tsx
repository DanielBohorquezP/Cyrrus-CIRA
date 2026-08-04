import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SpiralConfig {
  points: number;
  dotRadius: number;
  duration: number;
  gradient: "none" | "grayscale";
  color: string;
  pulseEffect: boolean;
  opacityMin: number;
  opacityMax: number;
  sizeMin: number;
  sizeMax: number;
}

export interface BentoFeature {
  title: string;
  blurb: string;
  meta?: string;
  href?: string;
  span?: string;
  visual?: ReactNode;
}

export interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  footer?: string;
  features: BentoFeature[];
}

const DEFAULT_SPANS = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
];

export function FeaturesSection({
  title = "Features",
  subtitle = "Bento layout. Minimal. Monochrome.",
  footer = "Built with reliability, speed, and taste.",
  features,
}: FeaturesSectionProps) {
  const spiralRef = useRef<HTMLDivElement>(null);

  const [cfg] = useState<SpiralConfig>({
    points: 800,
    dotRadius: 1.6,
    duration: 3,
    gradient: "none",
    color: "#ffffff",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.9,
    sizeMin: 0.5,
    sizeMax: 1.35,
  });

  const gradients = useMemo(
    () => ({
      none: [] as string[],
      grayscale: ["#ffffff", "#999999", "#333333"],
    }),
    []
  );

  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 620;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    if (cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");
      gradients[cfg.gradient].forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });
      defs.appendChild(g);
      svg.appendChild(defs);
    }

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute(
        "fill",
        cfg.gradient === "none" ? cfg.color : "url(#spiralGradient)"
      );
      c.setAttribute("opacity", "0.6");

      if (cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute(
          "values",
          `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`
        );
        animR.setAttribute("dur", `${cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute(
          "values",
          `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`
        );
        animO.setAttribute("dur", `${cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg, gradients]);

  return (
    <div className="relative w-full">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, color-mix(in srgb, var(--cyan) 35%, var(--navy)) 0%, var(--navy) 35%, #020818 75%, #000000 100%)",
        }}
      />

      <section className="relative mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-32 text-white">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
          style={{ mixBlendMode: "screen" }}
        >
          <div ref={spiralRef} />
        </div>

        <header className="relative mb-10 flex items-end justify-between border-b border-white/20 pb-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/70">
              {subtitle}
            </p>
          </div>
        </header>

        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-6 auto-rows-[minmax(120px,auto)]">
          {features.map((f, i) => (
            <BentoCard
              key={f.title}
              span={f.span ?? DEFAULT_SPANS[i % DEFAULT_SPANS.length]}
              title={f.title}
              blurb={f.blurb}
              meta={f.meta}
              href={f.href}
              visual={f.visual}
            />
          ))}
        </div>

        <footer className="relative mt-16 border-t border-white/10 pt-6 text-xs text-white/50">
          {footer}
        </footer>
      </section>
    </div>
  );
}

function BentoCard({
  span = "",
  title,
  blurb,
  meta,
  href,
  visual,
}: BentoFeature) {
  const content = visual ? (
    <>
      <div className="flex h-full w-full items-center justify-center">
        {visual}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 pt-10">
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40">&bull;</span>
          <h3 className="text-base md:text-lg font-semibold leading-tight">
            {title}
          </h3>
          {meta && (
            <span className="ml-auto rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/60">
              {meta}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-white/70 max-w-prose">{blurb}</p>
      </div>
    </>
  ) : (
    <>
      <header className="mb-2 flex items-center gap-3">
        <span className="text-xs text-white/40">&bull;</span>
        <h3 className="text-base md:text-lg font-semibold leading-tight">
          {title}
        </h3>
        {meta && (
          <span className="ml-auto rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/60">
            {meta}
          </span>
        )}
      </header>
      <p className="text-sm text-white/70 max-w-prose">{blurb}</p>

      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
        <div
          className="absolute -inset-1 rounded-2xl border border-white/10"
          style={{
            maskImage:
              "radial-gradient(180px_180px_at_var(--x,50%)_var(--y,50%),white,transparent)",
          }}
        />
      </div>
    </>
  );

  const className = cn(
    "group relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 transition hover:border-white/40",
    visual ? "p-0" : "p-5",
    span
  );

  if (href) {
    return (
      <Link to={href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}

export default FeaturesSection;
