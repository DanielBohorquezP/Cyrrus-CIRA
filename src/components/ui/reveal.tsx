import * as React from "react";
import { useEffect, useRef } from "react";
import { observeReveal } from "@/lib/reveal-observer";
import { cn } from "@/lib/utils";

/**
 * Scroll reveals, in CSS.
 *
 * These were framer-motion `whileInView` components. Every call site animated
 * exactly one thing — a 20-24px rise on `transform` — and paid for it with
 * 124KB of framer-motion parse+eval on the critical path plus the forced
 * reflows documented in src/lib/reveal-observer.ts. The animation itself is now
 * a compositor-only CSS transition toggled by one shared IntersectionObserver.
 *
 * No opacity here on purpose, same as the framer version: content must stay
 * visible even if this JS never runs (slow load, prerendered HTML before the
 * client re-render), so only the position animates.
 */

/** Shared ref + observer wiring for both Reveal and RevealGroup. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return observeReveal(node);
  }, []);
  return ref;
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait after the element enters view. */
  delay?: number;
  /** Pixels to rise from. Defaults to 24. */
  y?: number;
}

export function Reveal({ children, className, delay = 0, y }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        {
          ...(delay ? { "--reveal-delay": `${delay}s` } : null),
          ...(y != null ? { "--reveal-y": `${y}px` } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/**
 * Reveals its children in sequence. Children opt in by rendering `RevealItem`
 * (or any element with the `reveal-item` class); the stagger is a per-child
 * transition-delay driven off `--reveal-i`, so the group only costs one
 * observer entry no matter how many items it holds.
 */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("reveal-group", className)}>
      {children}
    </div>
  );
}

type RevealItemProps<T extends React.ElementType> = {
  /**
   * Position in the group. Only needed to override the default, which CSS
   * derives from the element's `nth-child` position (see index.css) — so the
   * common case of mapping over a list needs no index plumbing at all.
   */
  index?: number;
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "index" | "className" | "children">;

/**
 * A staggered child of RevealGroup. `as` picks the tag so call sites keep their
 * semantics (li, figure, article) instead of everything becoming a div.
 */
export function RevealItem<T extends React.ElementType = "div">({
  index,
  as,
  className,
  children,
  style,
  ...props
}: RevealItemProps<T> & { style?: React.CSSProperties }) {
  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag
      className={cn("reveal-item", className)}
      style={
        index != null
          ? ({ ...style, "--reveal-i": index } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {children}
    </Tag>
  );
}
