// Post-build step: renders every route in a real (headless) browser and writes
// the fully-rendered HTML — not just <head> tags — as a static index.html per
// route. This is what makes body content, per-route JSON-LD, and meta tags
// visible to crawlers/AI agents that don't execute JavaScript. Real users still
// get the same JS bundle and React re-renders over the static markup on load
// (createRoot, not hydrateRoot — so there's no hydration-mismatch risk, just a
// normal client re-render on top of already-visible content).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, createReadStream, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright";

const rootDir = path.resolve(import.meta.dirname, "..");
const distDir = path.join(rootDir, "dist");

if (!existsSync(distDir)) {
  console.error("dist/ not found — run `vite build` before prerender.");
  process.exit(1);
}

const routeMeta = JSON.parse(
  await readFile(path.join(rootDir, "src/lib/route-meta.json"), "utf-8"),
);

const solutionsSrc = await readFile(path.join(rootDir, "src/lib/solutions-data.ts"), "utf-8");
const solutionSlugs = [...solutionsSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);

const workshopsSrc = await readFile(path.join(rootDir, "src/lib/workshops-data.ts"), "utf-8");
const workshopSlugs = [...workshopsSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);

const extraRoutes = ["/privacidad", "/cookies"];

// Rendered separately below and written to dist/404.html (Vercel's static
// not-found convention), not into the routes list — it must never appear in
// the sitemap or get an ES/EN pair like a real page.
const notFoundRoute = "/not-found-preview-only";

// Spanish routes (default, unprefixed).
const esRoutes = [
  ...new Set([
    ...Object.keys(routeMeta),
    ...solutionSlugs.map((slug) => `/metodo-cira/seleccion-de-soluciones/${slug}`),
    ...workshopSlugs.map((slug) => `/leadership-academy/${slug}`),
    ...extraRoutes,
  ]),
];

// Every ES route now has an /en counterpart at the same slug.
const enRoutes = esRoutes.map((r) => (r === "/" ? "/en" : `/en${r}`));

const routes = [...esRoutes, ...enRoutes];

// --- static file server over dist/, with SPA fallback to the pristine shell ---
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

const shellHtml = await readFile(path.join(distDir, "index.html"), "utf-8");

// The modulepreload hints Vite's *build* emitted — i.e. the chunks that are
// genuinely on the critical path. Anything beyond this set got injected at
// runtime by Vite's dynamic-import preload helper while the page ran here, and
// must not survive into the shipped HTML: baking one in turns a deliberately
// deferred chunk (the WebGL hero shader, for one) back into a critical-path
// download *and compile* for every visitor, which is the opposite of why it
// was deferred. See the `useDeferredMount` comment in shader-hero.tsx.
const shellPreloads = [
  ...shellHtml.matchAll(/<link\b[^>]*\brel="modulepreload"[^>]*>/g),
].flatMap((m) => {
  const href = /\bhref="([^"]+)"/.exec(m[0]);
  return href ? [href[1]] : [];
});

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const filePath = path.join(distDir, urlPath);
  const ext = path.extname(filePath);

  if (ext && existsSync(filePath) && statSync(filePath).isFile()) {
    res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
    createReadStream(filePath).pipe(res);
    return;
  }

  // Any non-asset path (a route) always gets the pristine shell so React
  // Router renders the requested route fresh, regardless of what we've
  // already written to disk for other routes.
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(shellHtml);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const baseUrl = `http://127.0.0.1:${port}`;

// @sparticuz/chromium's default args target AWS Lambda, where a browser
// renders one page and dies with the invocation. Two of them break a
// long-lived Playwright session that drives 54 pages in sequence:
//
//   --single-process  runs the renderer *inside* the browser process, so
//                     closing the last page tears down the whole browser.
//                     Every route then failed its first newPage() with
//                     "Target page, context or browser has been closed",
//                     survived only via relaunch-and-retry, and periodically
//                     wedged the build entirely.
//   --no-zygote       its companion flag for that same single-process model.
//
// Everything else it ships (swiftshader GPU, no-sandbox, cache sizing) is
// what makes the binary work in a container, so keep those.
const LAMBDA_PROCESS_MODEL_ARGS = new Set(["--single-process", "--no-zygote"]);

// Vercel's build container has no apt-get / root access, so Playwright's
// bundled Chromium can't load its shared libs there. @sparticuz/chromium is a
// self-contained build made for exactly this (serverless/CI, no system deps).
let launchOptions = {};
if (process.env.VERCEL) {
  const { default: sparticuzChromium } = await import("@sparticuz/chromium");
  launchOptions = {
    executablePath: await sparticuzChromium.executablePath(),
    args: sparticuzChromium.args.filter((arg) => !LAMBDA_PROCESS_MODEL_ARGS.has(arg)),
  };
}

// Belt-and-braces around the fix above: a Chromium that dies or wedges can
// leave Playwright calls hanging indefinitely rather than erroring — the
// browser object still reports isConnected() === true while its IPC channel
// is dead, so Playwright's own `timeout` options never fire because the
// request that would trigger them never lands. withTimeout is a wall-clock
// backstop so no single operation can stall the whole build.
function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function launchBrowser() {
  return withTimeout(chromium.launch(launchOptions), 30000, "browser launch");
}

// If the process is wedged (not just gracefully closed), browser.close() can
// hang too — SIGKILL the underlying process as a last resort so a relaunch
// always gets a clean slate instead of piling up zombie Chromium processes.
async function killBrowser(instance) {
  if (!instance) return;
  try {
    await withTimeout(instance.close(), 5000, "browser close");
  } catch {
    instance.process()?.kill("SIGKILL");
  }
}

let browser = await launchBrowser();
let renderedSinceRestart = 0;
// Cap how long memory is allowed to creep across relaunches — Chromium on
// this class of build machine doesn't fully release memory between renders
// of the heavy 3D/physics routes, so a periodic clean restart (not just
// reactive relaunch-on-crash) keeps the whole run bounded.
const MAX_RENDERS_BEFORE_RESTART = 8;

// Heavy routes (3D/physics chunks) can crash the whole Chromium process on
// memory-constrained build machines (e.g. Vercel's 2-core runners), not just
// time out — so browser.newPage() itself can throw. Relaunch if that happens
// instead of letting it crash the whole prerender script.
async function ensureBrowser({ force = false } = {}) {
  if (force || !browser.isConnected() || renderedSinceRestart >= MAX_RENDERS_BEFORE_RESTART) {
    console.warn(`prerender: ${force ? "forcing" : "browser disconnected —"} relaunch`);
    await killBrowser(browser);
    browser = await launchBrowser();
    renderedSinceRestart = 0;
  }
}

const rendered = new Map();
let failures = 0;

/** Trailing-slash-insensitive route key, so "/en/" and "/en" compare equal. */
function normalizeRoute(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

// One fresh page per route: reusing a single page across all 54 routes means
// a goto() that times out on a slow/shared build machine leaves that
// navigation stuck in-flight, and the *next* iteration's goto() on the same
// page then reports itself as "interrupted by another navigation" —
// cascading failures for every route after the first slow one, even though
// nothing is actually wrong with those pages.
async function tryRenderRoute(route, { forceFreshBrowser = false } = {}) {
  let page;
  try {
    await ensureBrowser({ force: forceFreshBrowser });
    await withTimeout(
      (async () => {
        // Render as a Spanish visitor. Headless Chromium reports
        // navigator.language === "en-US", which tripped the one-time
        // browser-language auto-detect in LanguageProvider: rendering "/" would
        // redirect to "/en" and we'd write the *English* home page to
        // dist/index.html, lang="en" and all. Every no-JS crawler and AI agent
        // hitting the Spanish canonical URL got English markup.
        page = await browser.newPage({ locale: "es-CO" });
        // The locale above fixes the detection, but the detection shouldn't run
        // at all here: the prerenderer is generating the canonical document for
        // a known URL, not simulating a visitor who might prefer another
        // language. Seeding the stored preference short-circuits it outright, so
        // the output can't depend on what the build machine's Chromium reports.
        // Only "/" ever consults this — LanguageProvider returns early for every
        // /en route regardless of the value.
        await page.addInitScript(() => {
          try {
            window.localStorage.setItem("cyrrus-lang-pref", "es");
          } catch {
            // Storage blocked — the locale above is still in effect.
          }
        });
        await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
        await page.waitForFunction(
          () => {
            const h1 = document.querySelector("h1");
            return !!h1 && h1.textContent.trim().length > 0;
          },
          { timeout: 20000 },
        );
        // Let framer-motion / layout-effect driven content (JSON-LD injection,
        // late-mounted sections) settle before capturing.
        await page.waitForTimeout(600);

        // Whatever we capture gets written to dist/<route>/index.html, so it
        // has to actually *be* that route. A client-side redirect during
        // render means we'd file one page's markup under another page's URL —
        // which is exactly how the English home page ended up at dist/
        // index.html and went unnoticed. Fail the attempt instead.
        const landed = normalizeRoute(new URL(page.url()).pathname);
        if (landed !== normalizeRoute(route)) {
          throw new Error(`redirected to ${landed} (expected ${normalizeRoute(route)})`);
        }
      })(),
      55000,
      `render ${route}`,
    );
    // Drop the modulepreloads Vite's runtime helper added for chunks that only
    // loaded because this prerender pass sat on the page long enough for their
    // deferred/lazy triggers to fire (see shellPreloads above).
    await withTimeout(
      page.evaluate((keep) => {
        for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
          const href = new URL(link.getAttribute("href"), location.href).pathname;
          if (!keep.includes(href)) link.remove();
        }
      }, shellPreloads),
      10000,
      `prune preloads ${route}`,
    );
    // Some dynamically-imported libraries (e.g. react-spline) inject resource
    // hints using an absolute URL derived from location.origin, which at
    // capture time is this ephemeral local server — rewrite to root-relative
    // so the shipped HTML doesn't point at a dead 127.0.0.1 address.
    const html = (await withTimeout(page.content(), 10000, `read content ${route}`)).split(baseUrl).join("");
    rendered.set(route, html);
    renderedSinceRestart += 1;
    console.log(`prerender: rendered ${route}`);
    return true;
  } catch (err) {
    console.warn(`prerender: attempt failed for ${route} — ${err.message.split("\n")[0]}`);
    return false;
  } finally {
    if (page) {
      await withTimeout(page.close(), 5000, `close page ${route}`).catch(() => {});
    }
  }
}

for (const route of routes) {
  // A failed first attempt might mean the browser is wedged, not just that
  // this one page crashed — force a full relaunch before retrying so the
  // retry isn't racing the same zombie process.
  const ok = (await tryRenderRoute(route)) || (await tryRenderRoute(route, { forceFreshBrowser: true }));
  if (!ok) {
    failures += 1;
    console.error(`prerender: FAILED ${route} after retry`);
  }
}

const notFoundOk =
  (await tryRenderRoute(notFoundRoute)) || (await tryRenderRoute(notFoundRoute, { forceFreshBrowser: true }));
const notFoundHtml = notFoundOk ? rendered.get(notFoundRoute) : null;
rendered.delete(notFoundRoute); // never let it land in dist/<route>/index.html — only dist/404.html

await killBrowser(browser);
await new Promise((resolve) => server.close(resolve));

let written = 0;
for (const [route, html] of rendered) {
  const outDir = route === "/" ? distDir : path.join(distDir, route.slice(1));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html, "utf-8");
  written += 1;
}

if (notFoundHtml) {
  // Vercel serves this for any unmatched clean URL with a real 404 status,
  // as long as no catch-all rewrite intercepts the request first.
  await writeFile(path.join(distDir, "404.html"), notFoundHtml, "utf-8");
  console.log("prerender: wrote dist/404.html");
} else {
  console.warn("prerender: dist/404.html NOT written — unmatched routes will fall back to the SPA shell.");
}

console.log(`prerender: wrote fully-rendered HTML for ${written}/${routes.length} routes.`);
if (failures > 0) {
  console.warn(`prerender: ${failures} route(s) failed to render and were left as the plain build output.`);
  process.exitCode = 1;
}
