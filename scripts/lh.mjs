// Local Lighthouse harness: serves dist/ the way Vercel does (clean URLs,
// gzip, immutable asset caching) and runs Lighthouse against it.
//
//   node scripts/lh.mjs                 # mobile, "/"
//   node scripts/lh.mjs --desktop       # desktop preset
//   node scripts/lh.mjs --route /experiencia --runs 3
//
// Absolute numbers won't match PageSpeed (different machine, different
// network), but the throttling is Lighthouse's own, so movement between runs
// is meaningful — which is the point when iterating on Total Blocking Time.
import { createReadStream, existsSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const rootDir = path.resolve(import.meta.dirname, "..");
const distDir = path.join(rootDir, "dist");

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const desktop = args.includes("--desktop");
// Accepts "en" or "/en" — Git Bash rewrites a leading slash into a Windows path.
const route = `/${flag("route", "").replace(/^\/+/, "")}`;
const runs = Number(flag("runs", 1));
// PageSpeed runs an en-US Chrome with an empty profile, which is what triggers
// the browser-language redirect on "/". Pass --lang to reproduce that here;
// without it you get whatever locale this machine happens to use.
const lang = flag("lang", "");

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
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg", ".xml", ".txt"]);

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  let filePath = path.join(distDir, urlPath);

  // Vercel's clean-URL behaviour: /experiencia -> /experiencia/index.html
  if (!path.extname(filePath)) {
    const asDir = path.join(filePath, "index.html");
    filePath = existsSync(asDir) ? asDir : path.join(distDir, "404.html");
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.statusCode = 404;
    res.end("not found");
    return;
  }

  const ext = path.extname(filePath);
  res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
  res.setHeader(
    "Cache-Control",
    urlPath.startsWith("/assets/") && /-[A-Za-z0-9_-]{8,}\./.test(urlPath)
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
  );

  if (COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] || "")) {
    res.setHeader("Content-Encoding", "gzip");
    createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
    return;
  }
  createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const url = `http://127.0.0.1:${port}${route}`;

const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-sandbox", ...(lang ? [`--lang=${lang}`, `--accept-lang=${lang}`] : [])],
});

const results = [];
for (let i = 0; i < runs; i += 1) {
  const { lhr } = await lighthouse(
    url,
    { port: chrome.port, output: "json", logLevel: "error" },
    desktop ? (await import("lighthouse/core/config/desktop-config.js")).default : undefined,
  );
  results.push(lhr);
}

await chrome.kill();
await new Promise((resolve) => server.close(resolve));

const median = (nums) => nums.slice().sort((a, b) => a - b)[Math.floor(nums.length / 2)];
const metric = (id) => median(results.map((r) => r.audits[id].numericValue));

const perf = median(results.map((r) => r.categories.performance.score * 100));

console.log(`\n  ${desktop ? "DESKTOP" : "MOBILE "}  ${route}   (${runs} run${runs > 1 ? "s" : ""}, median)`);
console.log(`  ${"-".repeat(46)}`);
console.log(`  Performance          ${Math.round(perf)}`);
console.log(`  FCP                  ${(metric("first-contentful-paint") / 1000).toFixed(2)} s`);
console.log(`  LCP                  ${(metric("largest-contentful-paint") / 1000).toFixed(2)} s`);
console.log(`  TBT                  ${Math.round(metric("total-blocking-time"))} ms`);
console.log(`  CLS                  ${metric("cumulative-layout-shift").toFixed(3)}`);
console.log(`  Speed Index          ${(metric("speed-index") / 1000).toFixed(2)} s`);

// Where the main thread actually went — the breakdown that matters for TBT.
const breakdown = results[0].audits["mainthread-work-breakdown"];
console.log(`\n  Main-thread work     ${(breakdown.numericValue / 1000).toFixed(2)} s`);
for (const item of breakdown.details?.items ?? []) {
  console.log(`    ${item.groupLabel.padEnd(30)} ${Math.round(item.duration)} ms`);
}

const longTasks = results[0].audits["long-tasks"]?.details?.items ?? [];
if (longTasks.length) {
  console.log(`\n  Longest tasks`);
  for (const t of longTasks.slice(0, 8)) {
    console.log(`    ${String(Math.round(t.duration)).padStart(5)} ms  ${t.url.replace(/^https?:\/\/[^/]+/, "")}`);
  }
}
