import * as React from "react";
import { motion } from "framer-motion";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

interface IntelligenceLabHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  showVisual?: boolean;
  visual?: React.ReactNode;
}

export function IntelligenceLabHero({
  eyebrow,
  title,
  description,
  children,
  showVisual = true,
  visual,
}: IntelligenceLabHeroProps) {
  return (
    <AnimatedNavyBackground className="py-20 md:py-28">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={300} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-12">
        <div>
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
            className="mt-5 max-w-lg text-lg leading-relaxed text-white/75"
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

        <div
          className={cn(
            "relative",
            // Spline needs an explicit height to fill; a custom `visual` (e.g.
            // WorkshopOrbit) sizes itself, so only set a floor — a hard height
            // clipped its lower orbit icons against the section's overflow.
            showVisual
              ? "h-[320px] md:h-[420px]"
              : "flex min-h-[320px] items-center justify-center md:min-h-[420px]",
            !showVisual && !visual && "hidden md:flex",
          )}
        >
          {showVisual ? (
            <div
              className="h-full w-full"
              style={{
                maskImage: "radial-gradient(ellipse 62% 70% at 50% 42%, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 62% 70% at 50% 42%, black 55%, transparent 100%)",
              }}
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          ) : (
            visual ?? <div className="h-full w-full" />
          )}
        </div>
      </div>
    </AnimatedNavyBackground>
  );
}
