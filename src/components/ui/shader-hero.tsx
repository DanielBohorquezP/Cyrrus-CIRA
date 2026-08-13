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
    const [, setIsActive] = useState(false);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const onEnter = () => setIsActive(true);
      const onLeave = () => setIsActive(false);
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      };
    }, []);

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
          speed={0.25}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />

        <main className="absolute bottom-10 left-6 z-20 max-w-2xl md:bottom-16 md:left-12">
          <motion.div
            className="relative mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 leading-[0.95] tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

        <div className="absolute bottom-8 right-8 z-30 hidden md:block">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <motion.div
              className="absolute h-[60px] w-[60px] rounded-full border-2 border-cyan/70"
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0.2, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute h-[60px] w-[60px] rounded-full bg-gradient-to-br from-cyan/40 via-blue/30 to-navy/40 backdrop-blur-sm" />
            <motion.svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              style={{ transform: "scale(1.6)" }}
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
            </motion.svg>
          </div>
        </div>
      </div>
    );
  }
);

ShaderHero.displayName = "ShaderHero";

export { ShaderHero };
