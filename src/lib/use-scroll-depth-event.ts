import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires a GA4 event once the visitor scrolls past `threshold` (default 75%)
 * of the document's height — used for "article read" signals. rAF-throttled
 * like useScrolled, and fires at most once per mount.
 *
 * `params` is intentionally left out of the effect's deps: callers pass an
 * inline object, and re-subscribing the scroll listener every render for a
 * value that's static for the life of the page (e.g. an article slug) would
 * just be wasted work.
 */
export function useScrollDepthEvent(
  eventName: string,
  params: Record<string, string | number | boolean> | null,
  threshold = 0.75,
) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!params) return;
    firedRef.current = false;
    let ticking = false;

    const update = () => {
      ticking = false;
      if (firedRef.current) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 1;
      if (ratio >= threshold) {
        firedRef.current = true;
        trackEvent(eventName, params);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, threshold]);
}
