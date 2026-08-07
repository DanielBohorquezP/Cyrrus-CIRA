import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

const variants: Variants = {
  // No opacity here on purpose: content must stay visible even if this
  // JS never runs (slow load, prerendered HTML before hydration, etc.) —
  // only the position animates, so nothing ever depends on JS to appear.
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  // Same reasoning as the Reveal variants above: never hide content behind
  // opacity, only offset its position.
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
