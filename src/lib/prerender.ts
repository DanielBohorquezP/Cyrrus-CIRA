/**
 * True while scripts/prerender.mjs is capturing this page in headless Chromium.
 *
 * The static HTML in dist/ is now hydrated rather than re-rendered from scratch
 * (see src/main.tsx), which means it has to match what React produces on its
 * *first* render — not what the page looks like a second later. Anything that
 * mounts on a timer, on idle, or on an IntersectionObserver callback would
 * otherwise get baked into the snapshot and then be missing from React's first
 * pass, and hydration would throw the whole subtree away and rebuild it — the
 * exact cost hydrating was meant to avoid.
 *
 * So each of those deferred mounts checks this flag and stays in its initial
 * state during capture. Everything it gates is decorative (the WebGL hero
 * gradient, the dot spiral, the cookie banner), so the prerendered markup that
 * crawlers and AI agents read loses nothing that carries meaning — and gets a
 * few KB smaller.
 *
 * The flag is set by an init script in scripts/prerender.mjs, which runs before
 * any page script, so it is already in place by the time React first renders.
 */
declare global {
  interface Window {
    __CYRRUS_PRERENDER__?: boolean;
  }
}

export function isPrerender(): boolean {
  return typeof window !== "undefined" && window.__CYRRUS_PRERENDER__ === true;
}
