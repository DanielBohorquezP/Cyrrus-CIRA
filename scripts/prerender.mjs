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
const solutionSlugs = [...solutionsSrc.matchAll(/slug:\s*"([a-z-]+)"/g)].map((m) => m[1]);

const workshopsSrc = await readFile(path.join(rootDir, "src/lib/workshops-data.ts"), "utf-8");
const workshopSlugs = [...workshopsSrc.matchAll(/slug:\s*"([a-z-]+)"/g)].map((m) => m[1]);

const extraRoutes = ["/privacidad", "/cookies", "/en", "/en/metodo-cira"];

const routes = [
  ...new Set([
    ...Object.keys(routeMeta),
    ...solutionSlugs.map((slug) => `/metodo-cira/seleccion-de-soluciones/${slug}`),
    ...workshopSlugs.map((slug) => `/leadership-academy/${slug}`),
    ...extraRoutes,
  ]),
];

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
const browser = await chromium.launch(launchOptions);
const page = await browser.newPage();

const rendered = new Map();
let failures = 0;

for (const route of routes) {
  try {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForFunction(
      () => {
        const h1 = document.querySelector("h1");
        return !!h1 && h1.textContent.trim().length > 0;
      },
      { timeout: 10000 },
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
  } catch (err) {
    failures += 1;
    console.error(`prerender: FAILED ${route} — ${err.message.split("\n")[0]}`);
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

console.log(`prerender: wrote fully-rendered HTML for ${written}/${routes.length} routes.`);
if (failures > 0) {
  console.warn(`prerender: ${failures} route(s) failed to render and were left as the plain build output.`);
  process.exitCode = 1;
}
