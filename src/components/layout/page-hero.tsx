import * as React from "react";
import { motion } from "framer-motion";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { Img } from "@/components/ui/img";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  /** Optional photo shown beside the copy (right on desktop, below on mobile). Switches the hero to a two-column layout. */
  image?: { src: string; alt: string };
}

export function PageHero({ eyebrow, title, description, children, image }: PageHeroProps) {
  const copy = (
    <div className={image ? "" : "mx-auto max-w-4xl px-6 md:px-12"}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-base font-bold uppercase tracking-wider text-cyan"
      >
        {eyebrow}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75"
      >
        {description}
      </motion.p>
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="mt-8"
        >
          {children}
        </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
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
        </motion.div>
      </div>
    </AnimatedNavyBackground>
  );
}
