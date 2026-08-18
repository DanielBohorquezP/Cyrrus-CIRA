// Serves the built dist/ the way Vercel does — clean URLs, 404.html fallback —
// so the prerendered HTML and hydration can be checked locally exactly as they
// behave in production. `npm run dev` serves the un-prerendered shell instead,
// which is a different code path (createRoot, not hydrateRoot; see src/main.tsx).
//
//   npm run build && node scripts/serve-dist.mjs
import { createReadStream, existsSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";

const distDir = path.resolve(import.meta.dirname, "../dist");
const MIME = { ".html":"text/html; charset=utf-8", ".js":"text/javascript", ".css":"text/css",
  ".json":"application/json", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg",
  ".jpeg":"image/jpeg", ".webp":"image/webp", ".woff2":"font/woff2", ".ico":"image/x-icon",
  ".xml":"application/xml", ".txt":"text/plain; charset=utf-8" };

http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  let file = path.join(distDir, urlPath);
  if (!path.extname(file)) {
    const asDir = path.join(file, "index.html");
    file = existsSync(asDir) ? asDir : path.join(distDir, "404.html");
  }
  if (!existsSync(file) || !statSync(file).isFile()) { res.statusCode = 404; return res.end("not found"); }
  res.setHeader("Content-Type", MIME[path.extname(file)] ?? "application/octet-stream");
  createReadStream(file).pipe(res);
}).listen(4178, () => console.log("dist/ on http://localhost:4178"));
