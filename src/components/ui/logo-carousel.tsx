import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LogoCarouselProps {
  items: ReactNode[];
  className?: string;
  speed?: number;
}

export function LogoCarousel({
  items,
  className,
  speed = 28,
}: LogoCarouselProps) {
  return (
    <div className={cn("group relative w-full overflow-hidden", className)}>
      <div
        className="flex w-max items-center gap-10 motion-safe:animate-[logo-marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex shrink-0 items-center justify-center">
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes logo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
