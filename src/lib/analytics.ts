const GA_ID = "G-2DE75FWH5E";

let loaded = false;

/**
 * Injects Google Analytics (gtag.js) — only called once the visitor has
 * actually accepted the cookie banner. Previously this loaded unconditionally
 * from a <script> in index.html regardless of consent, which both cost
 * ~65KB + a third-party round trip on every first paint and contradicted
 * the banner's own copy ("solo si usted lo acepta, usamos Analytics").
 */
export function loadAnalytics() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

/**
 * Sends a GA4 custom event. A no-op before consent is given (loadAnalytics()
 * hasn't run yet, so window.gtag doesn't exist) — callers don't need to check
 * consent state themselves.
 */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
