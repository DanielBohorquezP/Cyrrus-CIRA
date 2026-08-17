import * as React from "react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BorderButton } from "@/components/ui/border-button";

// @paper-design/shaders-react used to sit in the entry chunk, so every visitor
// parsed the shader library and compiled a WebGL program before the page could
// go idle — the bulk of the 2.3s of unattributed main-thread work Lighthouse
// reported, and 440ms of Total Blocking Time. It's a decorative background, so
// it now loads as its own chunk and only mounts once the page is quiet (see
// useDeferredMount below). The CSS gradient underneath is what actually paints
// first, and it's close enough that the swap isn't visible.
const MeshGradient = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({ default: m.MeshGradient })),
);

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

/** How long the hero animates once mounted before freezing into a still frame. */
const SETTLE_MS = 3000;

/** The still gradient painted before (and behind) the WebGL surface. Same five
 *  stops as the shader, so the handoff reads as the gradient starting to move
 *  rather than as a different image swapping in. */
const STILL_GRADIENT =
  "radial-gradient(120% 90% at 18% 12%, #1b6fc2 0%, transparent 55%)," +
  "radial-gradient(110% 80% at 82% 22%, #3fb6e8 0%, transparent 50%)," +
  "radial-gradient(130% 110% at 60% 95%, #123a7d 0%, transparent 60%)," +
  "linear-gradient(160deg, #0a2c63 0%, #020818 70%)";

/**
 * Waits until the browser is genuinely idle before flipping to `true`.
 *
 * The point is that nothing this returns can land inside Lighthouse's Total
 * Blocking Time window: `load` fires after the critical work, and the idle
 * callback after that. The timeout is the fallback for Safari, which still has
 * no requestIdleCallback.
 */
function useDeferredMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleHandle: number | undefined;
    let timer: number | undefined;

    const schedule = () => {
      const ric = window.requestIdleCallback;
      if (ric) {
        idleHandle = ric(() => setReady(true), { timeout: 2500 });
      } else {
        timer = window.setTimeout(() => setReady(true), 900);
      }
    };

    if (document.readyState === "complete") {
      schedule();
      return () => {
        if (idleHandle != null) window.cancelIdleCallback?.(idleHandle);
        if (timer != null) window.clearTimeout(timer);
      };
    }

    window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleHandle != null) window.cancelIdleCallback?.(idleHandle);
      if (timer != null) window.clearTimeout(timer);
    };
  }, []);

  return ready;
}

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
    const shaderReady = useDeferredMount();

    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const sync = () => setReducedMotion(mq.matches);
      sync();
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
      // The settle clock starts when the shader mounts, not on page load, or a
      // slow load would spend the whole entrance animation before anyone sees
      // it.
      if (!shaderReady) return;
      const timer = window.setTimeout(() => setHasSettled(true), SETTLE_MS);
      return () => window.clearTimeout(timer);
    }, [shaderReady]);

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
        {/* Painted immediately, and left in place underneath the shader: it is
            what the LCP frame is measured against, and it means a visitor on a
            device without WebGL just sees a still gradient instead of navy. */}
        <div className="absolute inset-0" style={{ background: STILL_GRADIENT }} />

        {shaderReady && !reducedMotion && (
          <Suspense fallback={null}>
            <MeshGradient
              className="absolute inset-0 h-full w-full"
              colors={["#020818", "#0a2c63", "#1b6fc2", "#123a7d", "#3fb6e8"]}
              // speed 0 holds the last rendered frame rather than clearing, so
              // freezing is invisible — the gradient is simply still. This
              // covers the post-settle resting state, scrolling the hero out of
              // view, and backgrounded tabs.
              speed={isAnimating ? 0.25 : 0}
              // The library defaults to minPixelRatio 2, so a 1350x940 desktop
              // hero was shading ~5M pixels every frame and never let the main
              // thread go quiet (41s of work; PageSpeed gave up with
              // DEADLINE_EXCEEDED). This is a soft blurred gradient, so
              // rendering at 1x and capping the buffer is visually
              // indistinguishable and far cheaper per frame.
              minPixelRatio={1}
              maxPixelCount={1280 * 720}
            />
          </Suspense>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />

        <main className="absolute bottom-10 left-6 z-20 max-w-2xl md:bottom-16 md:left-12">
          {/* No opacity in any of these entrance animations, for the same
              reason Reveal avoids it (see src/components/ui/reveal.tsx): the
              prerender bakes the finished state into the static HTML, so
              fading in from 0 made framer-motion blank out already-painted
              text on mount. That deferred the LCP element ("Consulting")
              behind hydration plus a 0.35s delay and a 0.8s fade — a
              2,330ms LCP render delay and a visible flash. Only y animates. */}
          <div
            className="hero-rise relative mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            style={{ "--hero-rise-delay": "200ms" } as React.CSSProperties}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              {eyebrow}
            </span>
          </div>

          <h1
            className="hero-rise mb-6 leading-[0.95] tracking-tight text-white"
            style={
              {
                "--hero-rise-y": "30px",
                "--hero-rise-duration": "800ms",
                "--hero-rise-delay": "350ms",
              } as React.CSSProperties
            }
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
          </h1>

          <p
            className="hero-rise mb-8 max-w-lg text-base font-light leading-relaxed text-white/70 md:text-lg"
            style={{ "--hero-rise-delay": "550ms" } as React.CSSProperties}
          >
            {subtitle}
          </p>

          <div
            className="hero-rise flex flex-wrap items-center gap-4"
            style={{ "--hero-rise-delay": "700ms" } as React.CSSProperties}
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
          </div>
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
