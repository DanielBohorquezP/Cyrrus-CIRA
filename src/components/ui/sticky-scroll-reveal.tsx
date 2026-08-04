import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
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
    <div ref={ref} className="relative" style={{ height: `${content.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-12">
          <div className="relative h-64 md:h-80">
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
                  Método CIRA
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
              "relative hidden h-[26rem] w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-navy/10 lg:block",
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

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center gap-2 md:hidden">
          {content.map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                activeCard === index ? "bg-cyan" : "bg-navy/20",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
