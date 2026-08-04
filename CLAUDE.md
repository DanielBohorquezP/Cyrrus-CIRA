# Project guidelines

## Performance: animations & transitions

The site must always feel instant and fluid — never sluggish or janky. Apply this on every change that touches motion, scroll listeners, or transitions:

- **Never `transition-all`.** Name the exact properties (`transition-[background-color,box-shadow,border-color]`). Animating properties that don't change wastes cycles and can trigger layout/paint on unrelated properties.
- **Keep durations short.** 150ms–200ms `ease-out` for UI chrome (headers, nav, hovers). Longer durations (300ms+) read as slow on repeated interactions like scroll-driven state changes.
- **Prefer `opacity`/`transform` over layout-affecting properties.** They're GPU-composited and don't trigger reflow.
- **Don't animate `backdrop-filter`/blur radius.** Blur is expensive to recompute per frame; toggle it as a plain class swap (instant), never as part of a timed transition.
- **Throttle scroll/resize listeners to one update per frame** via `requestAnimationFrame` (see `src/lib/use-scrolled.ts`), and always register with `{ passive: true }`. Only call `setState` when a value actually crosses a meaningful threshold, not on every pixel.
- **Reuse shared hooks** (e.g. `useScrolled`) instead of duplicating scroll logic per component, so fixes/optimizations apply everywhere at once.

When in doubt: build it, then check it in the browser preview by actually scrolling/hovering — don't assume a transition feels fine just because the code looks reasonable.

## Navy sections must use AnimatedNavyBackground

Any full-bleed section with a navy/blue background — hero, CTA, social proof, etc. — must use `AnimatedNavyBackground` (`src/components/ui/animated-navy-background.tsx`) as the section wrapper, not a plain `<section className="bg-navy">`. It renders the radial navy gradient plus the pulsing dot spiral that is now the site's default look for blue sections.

Usage:

```tsx
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";

<AnimatedNavyBackground className="py-24 md:py-32">
  {/* section content */}
</AnimatedNavyBackground>
```

It forwards `id` and other section props, so anchor targets (e.g. `id="contacto"`) keep working. Already applied to `PageHero`, `IntelligenceLabHero`, `CiraSocialProof`, and `FinalCta` — reuse it for any new navy section instead of hardcoding `bg-navy`.
