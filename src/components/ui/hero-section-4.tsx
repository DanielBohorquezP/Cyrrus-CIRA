import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  imageUrl: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      eyebrow,
      title,
      subtitle,
      primaryButtonText,
      primaryButtonHref,
      secondaryButtonText,
      secondaryButtonHref,
      imageUrl,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn("relative w-full pb-16 pt-40 md:pb-24 md:pt-48", className)}
        {...props}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
          <motion.div
            className="max-w-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {eyebrow && (
              <motion.span
                className="text-base font-bold uppercase tracking-wider text-cyan"
                variants={itemVariants}
              >
                {eyebrow}
              </motion.span>
            )}

            <motion.h1
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="bg-cyan px-8 text-base font-semibold text-navy hover:bg-cyan/90"
              >
                <HeroLink href={primaryButtonHref}>
                  {primaryButtonText}
                </HeroLink>
              </Button>
              <HeroLink
                href={secondaryButtonHref}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-cyan"
              >
                {secondaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </HeroLink>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
