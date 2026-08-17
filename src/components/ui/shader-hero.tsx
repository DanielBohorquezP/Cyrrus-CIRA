import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BorderButton } from "@/components/ui/border-button";

interface ShaderHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  titleAccent: string;
  titleBold: string;
  titleLight?: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  badgeText?: string;
}

/** How long the hero animates on load before freezing into a still frame. */
const SETTLE_MS = 3000;

function HeroLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

const ShaderHero = React.forwardRef<HTMLDivElement, ShaderHeroProps>(
  (
    {
      className,
      eyebrow = "Metodología CIRA",
      titleAccent,
      titleBold,
      titleLight,
      subtitle,
      primaryButtonText,
      primaryButtonHref,
      secondaryButtonText,
      secondaryButtonHref,
      badgeText = "Cyrrus Consulting Services",
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    // The shader used to animate forever, which meant the page never reached a
    // visually stable frame: Lighthouse's Speed Index is derived from
    // frame-to-frame visual completeness, so a permanently-moving full-viewport
    // element pins SI to the length of the trace (10.2s, scoring 0/10) and kept
    // ~29s of main-thread work alive. It now plays its entrance, settles, and
    // only wakes back up when someone actually engages with the hero.
    const [hasSettled, setHasSettled] = useState(false);
    const [inView, setInView] = useState(true);
    const [pageVisible, setPageVisible] = useState(true);

    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const sync = () => setReducedMotion(mq.matches);
      sync();
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
      const timer = window.setTimeout(() => setHasSettled(true), SETTLE_MS);
      return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const onEnter = () => setIsHovering(true);
      const onLeave = () => setIsHovering(false);
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      // Scrolling past the hero used to leave the WebGL surface rendering at
      // full rate behind the rest of the page. Keep the observer connected so
      // it can pause and resume, rather than latching on first sight.
      const observer = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { rootMargin: "100px" },
      );
      observer.observe(container);

      const onVisibility = () => setPageVisible(!document.hidden);
      document.addEventListener("visibilitychange", onVisibility);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }, []);

    // The shader is the expensive one, so it also has to earn its frames by
    // being hovered once it has settled. The small CSS decorations are free,
    // so they only need the visibility gates.
    const isDecorAnimating = !reducedMotion && inView && pageVisible;
    const isAnimating = isDecorAnimating && (isHovering || !hasSettled);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "relative min-h-screen w-full overflow-hidden bg-navy",
          className
        )}
        {...props}
      >
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={["#020818", "#0a2c63", "#1b6fc2", "#123a7d", "#3fb6e8"]}
          // speed 0 holds the last rendered frame rather than clearing, so
          // freezing is invisible — the gradient is simply still. This covers
          // reduced-motion users, the post-settle resting state, scrolling the
          // hero out of view, and backgrounded tabs.
          speed={isAnimating ? 0.25 : 0}
          // The library defaults to minPixelRatio 2, so a 1350x940 desktop hero
          // was shading ~5M pixels every frame and never let the main thread go
          // quiet (41s of work; PageSpeed gave up with DEADLINE_EXCEEDED). This
          // is a soft blurred gradient, so rendering at 1x and capping the
          // buffer is visually indistinguishable and far cheaper per frame.
          minPixelRatio={1}
          maxPixelCount={1280 * 720}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />

        <main className="absolute bottom-10 left-6 z-20 max-w-2xl md:bottom-16 md:left-12">
          {/* No opacity in any of these entrance animations, for the same
              reason Reveal avoids it (see src/components/ui/reveal.tsx): the
              prerender bakes the finished state into the static HTML, so
              fading in from 0 made framer-motion blank out already-painted
              text on mount. That deferred the LCP element ("Consulting")
              behind hydration plus a 0.35s delay and a 0.8s fade — a
              2,330ms LCP render delay and a visible flash. Only y animates. */}
          <motion.div
            className="relative mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 leading-[0.95] tracking-tight text-white"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <span
              // Own line-height, not the h1's tight leading-[0.95]: this span
              // is gradient-filled via background-clip, so a line box shorter
              // than the font's descender extent clips descenders (e.g. the
              // "g" in "Strategic") instead of just tightening whitespace.
              className="block text-3xl font-light leading-[1.2] tracking-wide sm:text-4xl md:text-5xl"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #3fb6e8 40%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {titleAccent}
            </span>
            <span className="block text-5xl font-black drop-shadow-2xl sm:text-6xl md:text-7xl">
              {titleBold}
            </span>
            {titleLight && (
              <span className="block text-3xl font-light italic text-white/80 sm:text-4xl md:text-5xl">
                {titleLight}
              </span>
            )}
          </motion.h1>

          <motion.p
            className="mb-8 max-w-lg text-base font-light leading-relaxed text-white/70 md:text-lg"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <BorderButton asChild variant="light" size="lg" className="px-8" dot>
              <HeroLink href={primaryButtonHref}>
                {primaryButtonText}
              </HeroLink>
            </BorderButton>
            <HeroLink
              href={secondaryButtonHref}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              {secondaryButtonText}
              <ArrowRight className="h-4 w-4" />
            </HeroLink>
          </motion.div>
        </main>

        {/* The ring and the circling wordmark were framer-motion `repeat:
            Infinity` loops, which tick a requestAnimationFrame callback on the
            main thread for as long as the page is open. As pure CSS keyframes
            over transform/opacity only, the compositor owns them and the main
            thread stays free — so they can keep running without costing TBT.
            They still stop when the hero scrolls away, the tab is hidden, or
            the visitor asked for reduced motion. */}
        <div
          className="absolute bottom-8 right-8 z-30 hidden md:block"
          data-motion={isDecorAnimating ? "on" : "off"}
        >
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="hero-badge-ring absolute h-[60px] w-[60px] rounded-full border-2 border-cyan/70" />
            <div className="absolute h-[60px] w-[60px] rounded-full bg-gradient-to-br from-cyan/40 via-blue/30 to-navy/40 backdrop-blur-sm" />
            <svg
              className="hero-badge-spin absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="shader-hero-circle"
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                />
              </defs>
              <text className="fill-white/70 text-[9px] font-medium uppercase tracking-widest">
                <textPath href="#shader-hero-circle" startOffset="0%">
                  {badgeText} • {badgeText} •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

ShaderHero.displayName = "ShaderHero";

export { ShaderHero };
