const GA_ID = "G-YJ7NG91347";

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

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
