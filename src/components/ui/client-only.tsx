import { useEffect, useState, type ReactNode } from "react";
import { isPrerender } from "@/lib/prerender";

interface ClientOnlyProps {
  children: ReactNode;
  /** Rendered instead, both in the prerendered HTML and on the first client
   *  render. Give it the same box as the real content so nothing shifts. */
  fallback?: ReactNode;
}

/**
 * Renders `children` only after the page has hydrated.
 *
 * For widgets whose markup is genuinely un-hydratable: a WebGL canvas writes
 * its own attributes, and anything positioned from live measurements produces
 * values that differ every frame. Prerendering that produces markup React can
 * never agree with, and one disagreement makes React discard and rebuild the
 * whole tree — so a single decorative canvas was costing the entire page its
 * hydration.
 *
 * The fallback is what lands in the static HTML *and* what React renders on its
 * first pass, so the two match by construction. `isPrerender()` is what keeps
 * them matching: without it the effect below would fire during capture (the
 * prerenderer waits ~600ms before serialising) and bake the real widget in.
 *
 * Mounting after hydration is also just better for this content — a WebGL
 * context and its first frame are expensive, and neither belongs in the window
 * where the page is trying to become interactive.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isPrerender()) return;
    setMounted(true);
  }, []);

  return <>{mounted ? children : fallback}</>;
}
