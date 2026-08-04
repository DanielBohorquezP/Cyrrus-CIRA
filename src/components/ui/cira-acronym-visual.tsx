import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CiraLetter {
  letter: string;
  word: string;
}

interface CiraAcronymVisualProps {
  letters: CiraLetter[];
  className?: string;
}

const letterVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.15 + i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function CiraAcronymVisual({ letters, className }: CiraAcronymVisualProps) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {letters.map((item, i) => (
          <motion.div
            key={item.letter}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-8 backdrop-blur-sm transition-colors duration-150 ease-out hover:border-cyan/40 sm:px-10 sm:py-10"
          >
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className="bg-gradient-to-b from-white to-cyan bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-7xl"
            >
              {item.letter}
            </motion.span>
            <span className="mt-3 text-center text-xs font-medium uppercase tracking-wider text-white/60 sm:text-sm">
              {item.word}
            </span>
            <span
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--cyan) 18%, transparent), transparent 70%)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
