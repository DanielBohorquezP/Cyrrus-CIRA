/**
 * One IntersectionObserver for every scroll reveal on the page.
 *
 * This replaces framer-motion's `whileInView`, which Lighthouse blamed for
 * 145ms of *forced reflow* on the home page: each motion component measures
 * itself on mount, and a page with dozens of them interleaves reads and writes
 * until the browser has to re-layout over and over. A single shared observer
 * batches all the intersection work off the main thread, and revealing an
 * element is one `classList.add` — no React state, no re-render, no measure.
 */

/** Marks that JS is running, so the pre-reveal offset only applies when
 *  something is actually able to animate it away. Without this the offset
 *  would be baked into the prerendered HTML for no-JS visitors forever. */
if (typeof document !== "undefined") {
  document.documentElement.classList.add("reveal-ready");
}

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        // Reveals are one-shot (framer's `viewport={{ once: true }}`), so drop
        // the element as soon as it fires and keep the observer set small.
        observer?.unobserve(entry.target);
      }
    },
    // threshold 0 + a bottom inset instead of framer's `amount: 0.3`: a
    // percentage threshold never fires for elements taller than the viewport,
    // which several of the long section wrappers are.
    { rootMargin: "0px 0px -10% 0px" },
  );

  return observer;
}

/** Reveals `node` the first time it scrolls into view. Returns a cleanup fn. */
export function observeReveal(node: Element): () => void {
  // Already revealed by the prerender or a previous mount — nothing to watch.
  if (node.classList.contains("is-revealed")) return () => {};

  const obs = getObserver();
  if (!obs) {
    // No IntersectionObserver (very old browser): show everything immediately
    // rather than leaving content sitting at its pre-reveal offset.
    node.classList.add("is-revealed");
    return () => {};
  }

  obs.observe(node);
  return () => obs.unobserve(node);
}
