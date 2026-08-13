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

// Vercel's build container has no apt-get / root access, so Playwright's
// bundled Chromium can't load its shared libs there. @sparticuz/chromium is a
// self-contained build made for exactly this (serverless/CI, no system deps).
let launchOptions = {};
if (process.env.VERCEL) {
  const { default: sparticuzChromium } = await import("@sparticuz/chromium");
  launchOptions = {
    executablePath: await sparticuzChromium.executablePath(),
    args: sparticuzChromium.args,
  };
}
// Every Playwright/Chromium call below (launch, newPage, goto, close — even
// the ones that carry their own `timeout` option) has been observed to hang
// indefinitely instead of erroring once the build machine is memory-starved:
// the browser process is still technically alive (isConnected() === true)
// but its IPC channel is dead, so Playwright's own timeouts never fire
// because the request that would trigger them never lands. withTimeout is a
// wall-clock backstop around the whole operation so a wedged browser can
// never stall the build past `ms`, regardless of what's hung inside.
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
        page = await browser.newPage();
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
      })(),
      55000,
      `render ${route}`,
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
