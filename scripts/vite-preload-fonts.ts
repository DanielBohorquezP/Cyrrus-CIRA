import type { Plugin } from "vite";

/**
 * Injects `<link rel="preload">` for the handful of font files that are needed
 * to paint the top of the page.
 *
 * The fonts are self-hosted and `@import`ed from src/index.css, which means the
 * browser can't even know they exist until it has downloaded and parsed the
 * stylesheet. PageSpeed's dependency tree showed exactly that: the CSS lands at
 * ~295ms and every woff2 starts at ~630ms, one full round trip later, on the
 * critical path to first paint. A preload hint in the HTML moves that discovery
 * to the moment the document starts parsing, so the fonts download alongside
 * the CSS instead of after it.
 *
 * Only the faces that render above the fold are listed. Preloading all seven
 * would push ~94KB of fonts ahead of the stylesheet itself and make things
 * worse — the rest are still requested normally, just later, which is correct
 * for type that isn't on screen yet.
 *
 * Vite hashes the emitted filenames, so the match is by prefix against the
 * final bundle rather than by a path written out by hand.
 */
const PRELOAD = [
  // Body copy — the hero subtitle and everything under it.
  "carlito-latin-400-normal",
  // Headings. 400 also backs the `font-light` hero headline, which has no 300
  // face loaded and is synthesised from this one.
  "poppins-latin-400-normal",
  // The hero's `font-black` headline, likewise synthesised from the heaviest
  // face that is actually loaded.
  "poppins-latin-800-normal",
];

export function preloadFonts(): Plugin {
  return {
    name: "cyrrus-preload-fonts",
    apply: "build",
    enforce: "post",
    transformIndexHtml(html, ctx) {
      const files = Object.keys(ctx.bundle ?? {});

      const tags = PRELOAD.flatMap((prefix) => {
        const file = files.find(
          (f) => f.endsWith(".woff2") && f.includes(prefix),
        );
        if (!file) {
          // A renamed or dropped @fontsource import shouldn't fail the build,
          // but it should be visible — a silently missing preload is a
          // regression nobody would notice.
          this.warn(`preload-fonts: no built font matched "${prefix}"`);
          return [];
        }
        return [
          {
            tag: "link",
            attrs: {
              rel: "preload",
              as: "font",
              type: "font/woff2",
              href: `/${file}`,
              // Fonts are always fetched in CORS mode, even same-origin. Without
              // this the preload is a second, separate request rather than a
              // warm cache entry for the real one.
              crossorigin: "",
            },
            injectTo: "head-prepend" as const,
          },
        ];
      });

      return { html, tags };
    },
  };
}
