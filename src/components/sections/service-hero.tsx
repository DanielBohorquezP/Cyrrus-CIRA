import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Img } from "@/components/ui/img";
import { isPrerender } from "@/lib/prerender";

export interface HeroVideo {
  mp4: string;
  webm?: string;
}

interface ServiceHeroProps {
  eyebrow: string;
  /** The page's single H1. */
  title: string;
  /** Rendered inside the H1 (after a visually hidden colon) so the heading keeps its full keyword text. */
  subtitle?: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  /** The poster while a video loads, or the whole background when there is no video. */
  image: { src: string; alt: string; position?: string };
  video?: HeroVideo;
  /** CTAs: the primary `ContactCtaButton variant="light"` first, then an optional `SecondaryButton`. */
  children?: React.ReactNode;
}

// Same transform-only entrance as PageHero: never fade the H1 in from opacity 0,
// it is the LCP element and the prerendered HTML would ship it invisible.
const rise = (y: string, delay?: string) =>
  ({ "--hero-rise-y": y, ...(delay ? { "--hero-rise-delay": delay } : null) }) as React.CSSProperties;

/**
 * The looping video sits on top of the poster once the page is interactive.
 *
 * It is mounted from an effect (never in the prerendered HTML) so the 3MB-class
 * download does not compete with the poster for LCP, and so the static markup
 * matches React's first render. It stays off for `prefers-reduced-motion` and
 * for data-saver connections; the poster alone is then the background.
 */
function HeroBackdropVideo({ mp4, webm }: HeroVideo) {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPrerender()) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!reduce && !saveData) setEnabled(true);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!enabled || !video) return;
    // React does not reflect `muted` as an attribute, and browsers only honour
    // autoplay for muted media, so set the property and start playback by hand.
    video.muted = true;
    const start = () => void video.play().catch(() => undefined);
    start();
    // Browsers pause autoplaying media while the tab is hidden and some refuse
    // the first call before the source is ready, so retry on both events.
    video.addEventListener("canplay", start);
    document.addEventListener("visibilitychange", start);
    return () => {
      video.removeEventListener("canplay", start);
      document.removeEventListener("visibilitychange", start);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      className="absolute inset-0 -z-10 h-full w-full object-cover [object-position:center_60%]"
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}

/**
 * Hero of the single service-page template: photo or video background under
 * two shades, the (transparent) site menu above it, breadcrumbs, label, a short
 * H1 with a highlighted subtitle, one or two sentences and the CTAs.
 */
export function ServiceHero({
  eyebrow,
  title,
  subtitle,
  description,
  breadcrumbs,
  image,
  video,
  children,
}: ServiceHeroProps) {
  return (
    <section className="relative isolate flex min-h-[min(86vh,760px)] items-end overflow-hidden bg-navy pt-[clamp(120px,12vw,160px)] pb-[clamp(48px,6vw,80px)] text-white">
      <Img
        src={image.src}
        alt={image.alt}
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        style={image.position ? { objectPosition: image.position } : undefined}
        className="absolute inset-0 -z-10 h-full w-full object-cover [object-position:center_60%]"
      />
      {video && <HeroBackdropVideo {...video} />}
      <div aria-hidden="true" className="service-hero-shade absolute inset-0 -z-10" />
      <div aria-hidden="true" className="service-hero-shade-v absolute inset-0 -z-10" />

      <div className="container-site relative">
        <Breadcrumbs items={breadcrumbs} className="text-[13px] text-white/70" />
        <div className="hero-rise mt-[clamp(64px,10vw,140px)]" style={rise("12px")}>
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        </div>
        <h1
          className="hero-rise mt-5 max-w-[820px] font-heading text-[clamp(40px,6vw,88px)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
          style={rise("16px", "50ms")}
        >
          {title}
          {subtitle && (
            <>
              <span className="sr-only">: </span>
              <span className="mt-5 block text-[clamp(24px,2.8vw,38px)] leading-[1.2] font-medium tracking-[-0.02em] text-sky">
                {subtitle}
              </span>
            </>
          )}
        </h1>
        <p
          className="hero-rise mt-7 max-w-[580px] text-lg leading-[1.65] text-white/90 text-pretty"
          style={rise("16px", "100ms")}
        >
          {description}
        </p>
        {children && (
          <div className="hero-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={rise("16px", "150ms")}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
