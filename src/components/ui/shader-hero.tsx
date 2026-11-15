import * as React from "react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BorderButton, SecondaryButton } from "@/components/ui/border-button";
import { isPrerender } from "@/lib/prerender";

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
  onPrimaryButtonClick: () => void;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  /** Headline figures shown beside the copy (stacked under it on narrow screens). */
  metrics?: { value: string; label: string }[];
}

/** How long the hero animates once mounted before freezing into a still frame. */
const SETTLE_MS = 3000;

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
    // Never during a prerender capture: the still CSS gradient is what belongs
    // in the static HTML, and mounting the shader there would put it in the
    // snapshot that hydration has to match. See src/lib/prerender.ts.
    if (isPrerender()) return;

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
      onPrimaryButtonClick,
      secondaryButtonText,
      secondaryButtonHref,
      metrics = [],
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
        <div className="hero-still-gradient absolute inset-0" />

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

        <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1280px] flex-col justify-end px-[clamp(24px,5vw,64px)] pb-16 pt-40 md:pb-20">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-16 gap-y-14">
            <div className="max-w-[720px]">
              {/* No opacity in any of these entrance animations, for the same
                  reason Reveal avoids it (see src/components/ui/reveal.tsx): the
                  prerender bakes the finished state into the static HTML, so
                  fading in from 0 made framer-motion blank out already-painted
                  text on mount. That deferred the LCP element ("Consulting")
                  behind hydration plus a 0.35s delay and a 0.8s fade — a
                  2,330ms LCP render delay and a visible flash. Only y animates. */}
              <div
                className="hero-rise inline-flex items-center rounded-full border border-white/10 bg-white/5 px-[18px] py-2"
                style={{ "--hero-rise-delay": "200ms" } as React.CSSProperties}
              >
                <span className="font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-sky">
                  {eyebrow}
                </span>
              </div>

              <h1
                className="hero-rise mt-7 font-heading leading-[0.95] tracking-[-0.02em] text-white"
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
                  className="hero-accent-gradient block text-[clamp(32px,4vw,52px)] font-light leading-[1.2] tracking-[0.01em]"
                >
                  {titleAccent}
                </span>
                <span className="block text-[clamp(52px,7.4vw,96px)] font-extrabold tracking-[-0.03em]">
                  {titleBold}
                </span>
                {titleLight && (
                  <span className="mt-2 block text-[clamp(30px,3.8vw,50px)] font-light italic leading-[1.15] text-white/80">
                    {titleLight}
                  </span>
                )}
              </h1>

              <p
                className="hero-rise mt-8 max-w-[560px] text-[clamp(18px,1.7vw,20px)] leading-[1.6] text-white/75"
                style={{ "--hero-rise-delay": "550ms" } as React.CSSProperties}
              >
                {subtitle}
              </p>

              <div
                className="hero-rise mt-11 flex flex-wrap items-center gap-x-7 gap-y-5"
                style={{ "--hero-rise-delay": "700ms" } as React.CSSProperties}
              >
                <BorderButton variant="light" size="lg" dot onClick={onPrimaryButtonClick}>
                  {primaryButtonText}
                </BorderButton>
                {secondaryButtonHref.startsWith("/") ? (
                  <SecondaryButton asChild>
                    <Link to={secondaryButtonHref}>{secondaryButtonText}</Link>
                  </SecondaryButton>
                ) : (
                  <SecondaryButton href={secondaryButtonHref}>{secondaryButtonText}</SecondaryButton>
                )}
              </div>
            </div>

            {metrics.length > 0 && (
              <dl
                className="hero-rise m-0 grid border-t border-white/20"
                style={{ "--hero-rise-delay": "800ms" } as React.CSSProperties}
              >
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="grid grid-cols-[minmax(96px,120px)_1fr] items-baseline gap-6 border-b border-white/20 py-5"
                  >
                    <dd className="font-heading text-[clamp(36px,3.4vw,44px)] font-light tracking-[-0.02em] text-white">
                      {metric.value}
                    </dd>
                    <dt className="font-heading text-[13px] font-medium uppercase tracking-[0.1em] text-white/75">
                      {metric.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ShaderHero.displayName = "ShaderHero";

export { ShaderHero };
