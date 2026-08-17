import { cn } from "@/lib/utils";

interface OrbitVisualProps {
  className?: string;
}

// Lightweight CSS-only replacement for the Spline robot on the Intelligence
// Lab hero: pure DOM + CSS animation, no WebGL runtime/scene fetch, so it's
// far cheaper on both bundle size and per-frame render cost.
//
// Sized via container-query units (cqmin) rather than %/aspect-square so the
// rings stay perfect circles even when the wrapper isn't square — a plain
// height-driven aspect-square stretched into an oval in the hero's wide,
// short slot.
export function OrbitVisual({ className }: OrbitVisualProps) {
  return (
    <div className={cn("flex items-center justify-center [container-type:size]", className)}>
      <div className="relative h-[85cqmin] w-[85cqmin]">
        <div className="absolute inset-0 rounded-full border border-cyan/25" />
        <div className="absolute inset-[16%] rounded-full border border-cyan/40" />
        <div className="absolute inset-[32%] animate-[spin_14s_linear_infinite] rounded-full border border-dashed border-cyan/60" />

        <div className="absolute inset-[42%] rounded-full bg-cyan/30 blur-xl" />
        <div className="absolute inset-[46%] rounded-full bg-cyan shadow-[0_0_30px_8px_rgba(63,182,232,0.5)]" />

        <div className="absolute inset-0 animate-[spin_18s_linear_infinite]">
          <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_12px_3px_rgba(63,182,232,0.6)]" />
        </div>
        <div className="absolute inset-[16%] animate-[spin_12s_linear_infinite_reverse]">
          <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]" />
        </div>
      </div>
    </div>
  );
}
