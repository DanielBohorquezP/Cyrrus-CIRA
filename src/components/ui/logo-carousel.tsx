import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LogoCarouselProps {
  items: ReactNode[];
  /** Second copy of `items` that makes the marquee loop. Pass a variant whose
   *  images carry alt="" so the duplicate adds no repeated alt text; it is
   *  also hidden from assistive tech with aria-hidden. Defaults to `items`. */
  duplicateItems?: ReactNode[];
  className?: string;
  speed?: number;
}

export function LogoCarousel({
  items,
  duplicateItems,
  className,
  speed = 28,
}: LogoCarouselProps) {
  return (
    <div className={cn("group relative w-full overflow-hidden", className)}>
      <div
        className="flex w-max items-center gap-10 motion-safe:animate-[logo-marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center justify-center">
            {item}
          </div>
        ))}
        {(duplicateItems ?? items).map((item, i) => (
          <div key={`dup-${i}`} aria-hidden="true" className="flex shrink-0 items-center justify-center">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
