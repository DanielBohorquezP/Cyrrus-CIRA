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
let browser = await chromium.launch(launchOptions);

const rendered = new Map();
let failures = 0;

// Heavy routes (3D/physics chunks) can crash the whole Chromium process on
// memory-constrained build machines (e.g. Vercel's 2-core runners), not just
// time out — so browser.newPage() itself can throw. Relaunch if that happens
// instead of letting it crash the whole prerender script.
async function ensureBrowser() {
  if (!browser.isConnected()) {
    console.warn("prerender: browser disconnected — relaunching");
    browser = await chromium.launch(launchOptions);
  }
}

// One fresh page per route: reusing a single page across all 54 routes means
// a goto() that times out on a slow/shared build machine leaves that
// navigation stuck in-flight, and the *next* iteration's goto() on the same
// page then reports itself as "interrupted by another navigation" —
// cascading failures for every route after the first slow one, even though
// nothing is actually wrong with those pages.
async function tryRenderRoute(route) {
  let page;
  try {
    await ensureBrowser();
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
    // Some dynamically-imported libraries (e.g. react-spline) inject resource
    // hints using an absolute URL derived from location.origin, which at
    // capture time is this ephemeral local server — rewrite to root-relative
    // so the shipped HTML doesn't point at a dead 127.0.0.1 address.
    const html = (await page.content()).split(baseUrl).join("");
    rendered.set(route, html);
    console.log(`prerender: rendered ${route}`);
    return true;
  } catch (err) {
    console.warn(`prerender: attempt failed for ${route} — ${err.message.split("\n")[0]}`);
    return false;
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
  }
}

for (const route of routes) {
  const ok = (await tryRenderRoute(route)) || (await tryRenderRoute(route));
  if (!ok) {
    failures += 1;
    console.error(`prerender: FAILED ${route} after retry`);
  }
}

let notFoundHtml = null;
{
  let page;
  try {
    await ensureBrowser();
    page = await browser.newPage();
    await page.goto(`${baseUrl}${notFoundRoute}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForFunction(
      () => {
        const h1 = document.querySelector("h1");
        return !!h1 && h1.textContent.trim().length > 0;
      },
      { timeout: 20000 },
    );
    await page.waitForTimeout(600);
    notFoundHtml = (await page.content()).split(baseUrl).join("");
  } catch (err) {
    console.warn(`prerender: 404 page render failed — ${err.message.split("\n")[0]}`);
  } finally {
    if (page) await page.close().catch(() => {});
  }
}

await browser.close();
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
