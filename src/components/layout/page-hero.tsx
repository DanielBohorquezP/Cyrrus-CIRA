import * as React from "react";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { Img } from "@/components/ui/img";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  /** Optional photo shown beside the copy (right on desktop, below on mobile). Switches the hero to a two-column layout. */
  image?: { src: string; alt: string };
  /** Visible breadcrumb trail, shown above the eyebrow. Omit on top-level pages. */
  breadcrumbs?: BreadcrumbItem[];
}

// The entrance uses the same CSS `hero-rise` keyframes as ShaderHero
// (src/index.css): transform only, never opacity. framer-motion's
// `initial={{ opacity: 0 }}` was baked into the prerendered HTML, so every
// interior page shipped its H1 — the LCP element — invisible until hydration.
export function PageHero({ eyebrow, title, description, children, image, breadcrumbs }: PageHeroProps) {
  const copy = (
    <div className={image ? "" : "mx-auto max-w-4xl px-6 md:px-12"}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} className="mb-5" />
      )}
      <span
        className="hero-rise inline-block text-base font-bold uppercase tracking-wider text-cyan"
        style={{ "--hero-rise-y": "12px", "--hero-rise-duration": "500ms" } as React.CSSProperties}
      >
        {eyebrow}
      </span>
      <h1
        className="hero-rise mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
        style={{ "--hero-rise-y": "16px", "--hero-rise-delay": "50ms" } as React.CSSProperties}
      >
        {title}
      </h1>
      <p
        className="hero-rise mt-5 max-w-2xl text-lg leading-relaxed text-white/75"
        style={{ "--hero-rise-y": "16px", "--hero-rise-delay": "100ms" } as React.CSSProperties}
      >
        {description}
      </p>
      {children && (
        <div
          className="hero-rise mt-8"
          style={{ "--hero-rise-y": "16px", "--hero-rise-delay": "150ms" } as React.CSSProperties}
        >
          {children}
        </div>
      )}
    </div>
  );

  if (!image) {
    return <AnimatedNavyBackground className="py-20 md:py-28">{copy}</AnimatedNavyBackground>;
  }

  return (
    <AnimatedNavyBackground className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-12 md:px-12">
        {copy}
        {/* The hero photo is the page's LCP element, so it skips the generic
            100vw default: `sizes` matches this column's real rendered width
            (half of max-w-6xl above the md breakpoint, full width below it),
            and fetchPriority tells the browser to fetch it ahead of
            below-the-fold images instead of at default priority. */}
        <div
          className="hero-rise"
          style={{ "--hero-rise-y": "16px", "--hero-rise-delay": "100ms" } as React.CSSProperties}
        >
          <Img
            src={image.src}
            alt={image.alt}
            width={560}
            height={420}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 504px, 100vw"
            className="h-56 w-full rounded-2xl object-cover shadow-xl ring-1 ring-white/10 sm:h-72 md:h-96"
          />
        </div>
      </div>
    </AnimatedNavyBackground>
  );
}
