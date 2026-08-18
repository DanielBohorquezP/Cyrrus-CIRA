// Generates responsive WebP derivatives for every image the app actually
// references, plus src/lib/image-manifest.json describing them.
//
// Why this exists: the photos in public/assets/decoracion are camera/export
// originals — 1600px wide JPEGs of 100-270KB — and they were being served at
// full size into slots that are 300-640 CSS px wide. PageSpeed flagged it
// ("this image file is larger than it needs to be"), but the bigger cost is
// the one it doesn't score: on a phone every one of those is a multi-hundred-KB
// download and a full-resolution decode, which is what makes the gallery pages
// feel like they're loading forever.
//
// Run it with `npm run images`. Output is committed alongside the originals,
// so neither `vite build` nor the Vercel deploy needs sharp — the build stays
// exactly as fast as it was, and a deploy can never fail on a native binary
// that didn't compile for the build container.
//
// It is incremental: a derivative is only re-encoded when it's missing or
// older than its source, so re-running after adding one photo takes a second.
import { readFile, writeFile, readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(rootDir, "public");
const manifestPath = path.join(rootDir, "src/lib/image-manifest.json");

/** Widths to emit. Capped per-image at the original's width — upscaling a
 *  1600px source to 1920 invents detail and costs bytes for nothing. */
export const WIDTHS = [400, 640, 960, 1280, 1600];

/** Skip a width that lands within 12% of the original: the byte saving doesn't
 *  pay for an extra file and an extra srcset candidate. */
export const NEAR_ORIGINAL = 0.88;

const QUALITY = 74;

/** Images that must keep their exact identity/dimensions and are never served
 *  through <Img>: social-card art read by scrapers, and favicons. */
const EXCLUDE = new Set(["/assets/og-image.png"]);

const IMAGE_RE = /\/assets\/[A-Za-z0-9._%/-]+\.(?:webp|jpg|jpeg|png|JPG|JPEG|PNG)/g;

/** Every image path literal that appears anywhere in src/. */
async function collectReferencedPaths() {
  const found = new Set();

  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (!/\.(tsx?|css|json|html)$/.test(entry.name)) continue;
      const text = await readFile(full, "utf-8");
      for (const match of text.matchAll(IMAGE_RE)) found.add(match[0]);
    }
  }

  await walk(path.join(rootDir, "src"));

  // The client-logo grids build their src at runtime from a name list
  // (`/assets/logos-clientes/${name}.webp`), so no literal path for them ever
  // appears in the source — enumerate that directory directly instead.
  const logosDir = path.join(publicDir, "assets/logos-clientes");
  if (existsSync(logosDir)) {
    for (const name of await readdir(logosDir)) {
      if (/\.(webp|png|jpe?g)$/i.test(name)) {
        found.add(`/assets/logos-clientes/${encodeURIComponent(name)}`);
      }
    }
  }

  return [...found].filter((p) => !EXCLUDE.has(p)).sort();
}

/** True when `out` is missing or older than `src` — the incremental check. */
async function isStale(src, out) {
  if (!existsSync(out)) return true;
  const [a, b] = await Promise.all([stat(src), stat(out)]);
  return a.mtimeMs > b.mtimeMs;
}

const referenced = await collectReferencedPaths();
const manifest = {};
let encoded = 0;
let reused = 0;
let missing = 0;
let sourceBytes = 0;
let outputBytes = 0;

for (const ref of referenced) {
  const decoded = decodeURIComponent(ref);
  const srcFile = path.join(publicDir, decoded);

  if (!existsSync(srcFile)) {
    console.warn(`images: referenced but not on disk — ${ref}`);
    missing += 1;
    continue;
  }

  const meta = await sharp(srcFile).metadata();
  const { width, height } = meta;
  if (!width || !height) {
    console.warn(`images: unreadable dimensions — ${ref}`);
    missing += 1;
    continue;
  }

  const dir = path.posix.dirname(decoded);
  const base = path.posix.basename(decoded).replace(/\.[^.]+$/, "");
  const outDir = path.join(publicDir, dir, "opt");
  await mkdir(outDir, { recursive: true });

  const widths = WIDTHS.filter((w) => w < width * NEAR_ORIGINAL);
  widths.push(width);

  sourceBytes += (await stat(srcFile)).size;

  for (const w of widths) {
    const outName = `${base}-${w}.webp`;
    const outFile = path.join(outDir, outName);

    if (await isStale(srcFile, outFile)) {
      await sharp(srcFile)
        .resize({ width: w, withoutEnlargement: true })
        // effort 6 is sharp's max for WebP: slower to encode (this script runs
        // by hand, not per build) in exchange for a smaller file forever.
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(outFile);
      encoded += 1;
    } else {
      reused += 1;
    }
    outputBytes += (await stat(outFile)).size;
  }

  // Just the intrinsic size, as a two-element array. The derivative paths and
  // the width ladder both follow from it by the same rules the component
  // applies (see variantsFor() in src/components/ui/img.tsx), so storing them
  // would only be a second copy to keep in sync — and this manifest is imported
  // by the entry chunk, where every duplicated byte is parsed on load.
  manifest[ref] = [width, height];
}

// One line per image — readable in a diff without being three times the size.
const body = Object.entries(manifest)
  .map(([key, [w, h]]) => `  ${JSON.stringify(key)}: [${w}, ${h}]`)
  .join(",\n");
await writeFile(manifestPath, `{\n${body}\n}\n`, "utf-8");

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
console.log(
  `images: ${referenced.length} sources → ${encoded} encoded, ${reused} up to date` +
    (missing ? `, ${missing} missing` : ""),
);
console.log(`images: ${mb(sourceBytes)} of originals → ${mb(outputBytes)} across all widths`);
console.log(`images: wrote ${path.relative(rootDir, manifestPath)}`);
