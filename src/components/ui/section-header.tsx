import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  /** Supporting text, shown to the right of the heading on wide screens. */
  description?: string;
  tone?: "light" | "dark";
  /** Align the two columns on their baselines (`end`) or their tops (`start`). */
  align?: "start" | "end";
  className?: string;
}

/** Eyebrow + h2 on the left, supporting text on the right; one column below ~800px. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "end",
  className,
}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "grid gap-x-24 gap-y-6",
        description && "grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))]",
        align === "end" ? "items-end" : "items-start",
        className,
      )}
    >
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2 className={cn("t-h2 mt-5", dark ? "text-white" : "text-navy")}>{title}</h2>
      </div>
      {description && (
        <p className={cn("t-lead", dark ? "text-white/75" : "text-slate")}>{description}</p>
      )}
    </Reveal>
  );
}
