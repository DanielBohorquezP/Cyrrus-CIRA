import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  /** `light` sits on white/mist (blue); `dark` sits on navy/photo (sky). */
  tone?: "light" | "dark";
  as?: ElementType;
  className?: string;
}

/** The small uppercase label above a heading. */
export function Eyebrow({ children, tone = "light", as, className }: EyebrowProps) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cn(
        "block font-heading text-sm font-bold uppercase tracking-[0.06em]",
        tone === "dark" ? "text-sky" : "text-blue",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
