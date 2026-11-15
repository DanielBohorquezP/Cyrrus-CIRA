import * as React from "react";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhotoCaption } from "@/components/ui/photo-caption";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  /** CTAs. Put the primary `BorderButton` first, then an optional `SecondaryButton`. */
  children?: React.ReactNode;
  /**
   * Optional photo. Switches the hero to the split layout: copy on the left,
   * the photo on the right flush with the bottom edge of the hero, rounded only
   * on top, with an optional glass caption.
   */
  image?: { src: string; alt: string; caption?: string; position?: string };
  /** Optional decorative visual (globe, orbit…) in a second column. Ignored when `image` is set. */
  visual?: React.ReactNode;
  /** Visible breadcrumb trail, shown above the eyebrow. Omit on top-level pages. */
  breadcrumbs?: BreadcrumbItem[];
}

// The entrance uses the same CSS `hero-rise` keyframes as ShaderHero
// (src/index.css): transform only, never opacity. framer-motion's
// `initial={{ opacity: 0 }}` was baked into the prerendered HTML, so every
// interior page shipped its H1 — the LCP element — invisible until hydration.
const rise = (y: string, delay?: string) =>
  ({ "--hero-rise-y": y, ...(delay ? { "--hero-rise-delay": delay } : null) }) as React.CSSProperties;

export function PageHero({ eyebrow, title, description, children, image, visual, breadcrumbs }: PageHeroProps) {
  const heading = (
    <>
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} className="mb-5" />}
      <div className="hero-rise" style={{ ...rise("12px"), "--hero-rise-duration": "500ms" } as React.CSSProperties}>
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
      </div>
      <h1
        className={
          image
            ? "t-h1 hero-rise mt-8 max-w-[1100px] text-white"
            : "t-h1 hero-rise mt-6 text-[clamp(38px,4.6vw,64px)] text-white"
        }
        style={rise("16px", "50ms")}
      >
        {title}
      </h1>
    </>
  );

  const body = (
    <div className={image ? "pb-14 md:pb-24" : "max-w-4xl"}>
      <p
        className="hero-rise max-w-2xl text-[clamp(18px,1.7vw,20px)] leading-[1.65] text-white/80"
        style={rise("16px", "100ms")}
      >
        {description}
      </p>
      {children && (
        <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={rise("16px", "150ms")}>
          {children}
        </div>
      )}
    </div>
  );

  if (!image) {
    return (
      <AnimatedNavyBackground className="py-[clamp(64px,8vw,104px)]">
        <div className="container-site">
          {visual ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-16 gap-y-12">
              <div>
                {heading}
                <div className="mt-8">{body}</div>
              </div>
              <div>{visual}</div>
            </div>
          ) : (
            <>
              <div className="max-w-4xl">{heading}</div>
              <div className="mt-8">{body}</div>
            </>
          )}
        </div>
      </AnimatedNavyBackground>
    );
  }

  return (
    <AnimatedNavyBackground className="pt-[clamp(64px,8vw,104px)]">
      <div className="container-site">
        {heading}
        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-20 gap-y-4">
          {body}
          {/* The hero photo is the page's LCP candidate on wide screens, so it skips
              the generic 100vw default: `sizes` matches the column's real rendered
              width, and fetchPriority tells the browser to fetch it ahead of
              below-the-fold images. */}
          <div className="hero-rise" style={rise("16px", "100ms")}>
            <PhotoCaption
              src={image.src}
              alt={image.alt}
              caption={image.caption}
              position={image.position}
              captionStyle="glass"
              aspect="aspect-[5/4]"
              flushBottom
              priority
              sizes="1000px"
            />
          </div>
        </div>
      </div>
    </AnimatedNavyBackground>
  );
}
