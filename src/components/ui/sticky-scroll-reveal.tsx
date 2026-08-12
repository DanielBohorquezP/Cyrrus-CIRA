import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export const StickyScroll = ({
  content,
  contentClassName,
  eyebrow = "Método CIRA",
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  eyebrow?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <>
      {/* Mobile/tablet: simple stacked cards, no scroll-pin or cross-fade. */}
      <div className="space-y-6 px-6 py-4 md:hidden">
        {content.map((item) => (
          <Reveal key={item.title}>
            <div
              className={cn(
                "relative h-56 w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-navy/10 sm:h-72",
                contentClassName,
              )}
            >
              {item.content ?? null}
            </div>
            <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-cyan">
              {eyebrow}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-navy">{item.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-navy/70">{item.description}</p>
          </Reveal>
        ))}
      </div>

      {/* Desktop: scroll-pinned cross-fade experience. */}
      <div ref={ref} className="relative hidden md:block" style={{ height: `${content.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-white">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-16 px-6 md:px-12">
            <div className="relative h-80">
              {content.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="absolute inset-0 flex flex-col justify-center"
                  initial={false}
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    y: activeCard === index ? 0 : 24,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                    {eyebrow}
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">
                    {item.title}
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-navy/70">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div
              className={cn(
                "relative h-80 w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-navy/10 lg:h-[26rem]",
                contentClassName,
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {content[activeCard].content ?? null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
