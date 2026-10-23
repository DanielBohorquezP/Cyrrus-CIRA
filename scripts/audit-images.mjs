// Recorre las rutas del sitio ya servido (node scripts/serve-dist.mjs, puerto 4178)
// y lista las imágenes que se muestran más grandes que su resolución real.
//   node scripts/audit-images.mjs [factor]   (factor mínimo natural/mostrado, por defecto 1)
import { readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const base = "http://localhost:4178";
const minRatio = Number(process.argv[2] ?? 1);
const sitemap = await readFile(path.resolve(import.meta.dirname, "../public/sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const found = new Map();
for (const route of routes) {
  await page.goto(base + route, { waitUntil: "load" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(500);
  const imgs = await page.evaluate(() =>
    [...document.images].map((i) => ({
      src: i.currentSrc || i.src,
      nw: i.naturalWidth,
      nh: i.naturalHeight,
      w: i.getBoundingClientRect().width,
      h: i.getBoundingClientRect().height,
      fit: getComputedStyle(i).objectFit,
      sizes: i.getAttribute("sizes"),
      tag: i.closest("[class]")?.parentElement?.className?.toString().slice(0, 40) ?? "",
    })).filter((i) => i.w > 40 && i.nw > 0),
  );
  for (const i of imgs) {
    // naturalWidth viene dividido por la densidad del srcset: el ancho real del
    // archivo es el sufijo -NNN de la variante (o naturalWidth si no lo tiene)
    const m = /-(\d+)\.webp$/.exec(i.src);
    const fw = m ? Number(m[1]) : i.nw;
    const fh = fw * (i.nh / i.nw);
    // con object-fit: cover la escala real es la mayor de las dos razones
    const scale = i.fit === "cover" ? Math.max(i.w / fw, i.h / fh) : i.w / fw;
    const ratio = 1 / scale;
    if (ratio < minRatio) {
      const key = i.src.replace(base, "");
      const e = found.get(key) ?? { ratio, routes: [], info: `${Math.round(i.w)}x${Math.round(i.h)} slot, archivo ${Math.round(fw)}x${Math.round(fh)}, sizes="${i.sizes}"` };
      e.ratio = Math.min(e.ratio, ratio);
      e.routes.push(route);
      found.set(key, e);
    }
  }
}
await browser.close();
for (const [src, e] of [...found].sort((a, b) => a[1].ratio - b[1].ratio)) {
  console.log(`${e.ratio.toFixed(2)}x  ${src}\n      ${[...new Set(e.routes)].slice(0, 4).join(" ")} (${new Set(e.routes).size} rutas)
      ${e.info}`);
}
console.log(`\n${routes.length} rutas revisadas, ${found.size} imágenes por debajo de ${minRatio}x`);
