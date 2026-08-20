#!/usr/bin/env node
// Regenerates public/sitemap.xml from the same route source of truth used by
// scripts/prerender.mjs (route-meta.json + solution/workshop slugs), so the
// sitemap can never drift out of sync with what's actually built and indexable.
// Priority/changefreq are preserved from the existing sitemap when a URL was
// already curated there; new URLs fall back to sane defaults.
//
// lastmod is driven by content, not by "did we run this script": each route
// is mapped (CONTENT_SOURCE below) to the i18n JSON subtree that actually
// feeds its <title>/<h1>/copy, and we hash that subtree per language. lastmod
// only advances to today when the hash for that specific route+language
// differs from the one recorded on the previous run (src/lib/sitemap-content-
// hashes.json) — editing one page's copy no longer bumps every URL in
// lockstep, and it no longer freezes a URL's lastmod forever just because
// this script keeps preserving "whatever it said last time".
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const SITE_URL = "https://www.cyrruscs.com";

const routeMeta = JSON.parse(
  await readFile(path.join(rootDir, "src/lib/route-meta.json"), "utf-8"),
);

const solutionsSrc = await readFile(path.join(rootDir, "src/lib/solutions-data.ts"), "utf-8");
const solutionSlugs = [...solutionsSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);

// Workshops still marked "próximamente" (comingSoon: true) are intentionally
// excluded — they're noindex'd in the app and shouldn't be submitted for crawl.
const workshopsSrc = await readFile(path.join(rootDir, "src/lib/workshops-data.ts"), "utf-8");
// Top-level array entries are exactly `  {` at line-start; split there rather
// than matching "slug:" (which also appears in the interface declaration).
const workshopBlocks = workshopsSrc.split(/\r?\n(?=  \{\r?\n)/);
const allWorkshopSlugs = [];
const liveWorkshopSlugs = [];
for (const block of workshopBlocks) {
  const slugMatch = block.match(/slug:\s*"([a-z0-9-]+)"/);
  if (!slugMatch) continue;
  allWorkshopSlugs.push(slugMatch[1]);
  if (/comingSoon:\s*true/.test(block)) continue;
  liveWorkshopSlugs.push(slugMatch[1]);
}
const comingSoonWorkshopSlugs = new Set(allWorkshopSlugs.filter((s) => !liveWorkshopSlugs.includes(s)));

const extraRoutes = ["/privacidad", "/cookies"];

// /perspectivas is noindexed until real articles ship (it's currently an
// empty blog index), so it must not be submitted for crawl. Its /en
// counterpart is derived below and excluded the same way.
const noindexRoutes = new Set(["/perspectivas"]);

const esRoutes = [
  ...new Set([
    ...Object.keys(routeMeta),
    ...solutionSlugs.map((slug) => `/metodo-cira/seleccion-de-soluciones/${slug}`),
    ...extraRoutes,
  ]),
].filter((p) => {
  const workshopSlug = p.match(/^\/leadership-academy\/([a-z0-9-]+)$/)?.[1];
  return !workshopSlug || !comingSoonWorkshopSlugs.has(workshopSlug);
}).filter((p) => !noindexRoutes.has(p));

// Route -> i18n content that determines its lastmod. `ns` is the locale
// namespace file under src/i18n/locales/{es,en}/<ns>.json; `pick` selects one
// or more dot-paths within it (their combined content is hashed); `omit`
// hashes the whole file minus the given top-level keys (used for hub pages
// that share a namespace file with per-slug detail content that isn't theirs
// to react to). No selector = hash the whole namespace file.
//
// Every route in esRoutes must resolve to an entry here (statically, or via
// the workshop-slug pattern below) — an unmapped route logs a warning and
// falls back to "never advance lastmod on its own", so a missing mapping
// fails loud (via the console warning) rather than silently misreporting
// freshness.
const CONTENT_SOURCE = {
  "/": { ns: "home" },
  "/metodo-cira": { ns: "metodo-cira" },
  "/metodo-cira/planeacion-estrategica": { ns: "estrategia" },
  "/metodo-cira/seleccion-de-soluciones": { ns: "seleccion-soluciones", omit: ["detail", "detailMeta"] },
  "/metodo-cira/seleccion-de-soluciones/seleccion-de-software": { ns: "seleccion-de-software" },
  "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp": { ns: "seleccion-productos", pick: ["erp"] },
  "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/crm": { ns: "seleccion-productos", pick: ["crm"] },
  "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/hcm": { ns: "seleccion-productos", pick: ["hcm"] },
  "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/eam": { ns: "seleccion-productos", pick: ["eam"] },
  "/metodo-cira/seleccion-de-soluciones/tecnologias-avanzadas": {
    ns: "seleccion-soluciones",
    pick: ["detailMeta.tecnologias-avanzadas", "detail.entries.tecnologias-avanzadas"],
  },
  "/metodo-cira/seleccion-de-soluciones/infraestructura-tecnologica": {
    ns: "seleccion-soluciones",
    pick: ["detailMeta.infraestructura-tecnologica", "detail.entries.infraestructura-tecnologica"],
  },
  "/metodo-cira/gestion-de-proyectos": { ns: "gestion-proyectos" },
  "/metodo-cira/gestion-del-cambio": { ns: "gestion-cambio" },
  "/intelligence-lab": { ns: "intelligence-lab", pick: ["hub"] },
  "/intelligence-lab/automatizaciones-desarrollo": { ns: "intelligence-lab", pick: ["automatizaciones"] },
  "/intelligence-lab/arquitectura-de-ia": { ns: "intelligence-lab", pick: ["arquitectura"] },
  "/intelligence-lab/gobierno-de-ia": { ns: "intelligence-lab", pick: ["gobierno"] },
  "/presencia-digital": { ns: "presencia-digital", pick: ["hub"] },
  "/presencia-digital/desarrollo-web": { ns: "presencia-digital", pick: ["desarrolloWeb"] },
  "/presencia-digital/seo": { ns: "presencia-digital", pick: ["seo"] },
  "/leadership-academy": { ns: "leadership-academy", pick: ["hub"] },
  "/quienes-somos": { ns: "paginas", pick: ["quienesSomos"] },
  "/experiencia": { ns: "paginas", pick: ["experiencia"] },
  "/perspectivas": { ns: "paginas", pick: ["perspectivas"] },
  "/privacidad": { ns: "legal", pick: ["privacidad"] },
  "/cookies": { ns: "legal", pick: ["cookies"] },
};

function contentSourceFor(esPath) {
  if (CONTENT_SOURCE[esPath]) return CONTENT_SOURCE[esPath];
  const workshopSlug = esPath.match(/^\/leadership-academy\/([a-z0-9-]+)$/)?.[1];
  if (workshopSlug) return { ns: "leadership-academy", pick: [`workshops.${workshopSlug}`] };
  return null;
}

const localeCache = new Map();
async function loadLocale(ns, lang) {
  const key = `${lang}:${ns}`;
  if (!localeCache.has(key)) {
    const raw = await readFile(
      path.join(rootDir, `src/i18n/locales/${lang}/${ns}.json`),
      "utf-8",
    ).catch(() => null);
    localeCache.set(key, raw ? JSON.parse(raw) : null);
  }
  return localeCache.get(key);
}

function getPath(obj, dotted) {
  return dotted.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

function omitKeys(obj, keys) {
  const copy = { ...obj };
  for (const k of keys) delete copy[k];
  return copy;
}

async function computeContentHash(esPath, lang) {
  const spec = contentSourceFor(esPath);
  if (!spec) return null;
  const data = await loadLocale(spec.ns, lang);
  if (!data) return null;
  const subject = spec.pick
    ? spec.pick.map((p) => getPath(data, p))
    : spec.omit
      ? omitKeys(data, spec.omit)
      : data;
  return createHash("sha1").update(JSON.stringify(subject)).digest("hex").slice(0, 12);
}

const unmapped = new Set(esRoutes.filter((p) => !contentSourceFor(p)));
for (const p of unmapped) {
  console.warn(`generate-sitemap: no CONTENT_SOURCE mapping for ${p} — its lastmod will never auto-advance; add an entry.`);
}

// Preserve hand-tuned priority/changefreq from the existing sitemap so
// regenerating doesn't flatten deliberate curation; default for anything new.
const existingXml = await readFile(path.join(rootDir, "public/sitemap.xml"), "utf-8").catch(() => "");
const existing = new Map();
for (const match of existingXml.matchAll(
  /<loc>([^<]+)<\/loc>\s*<lastmod>([^<]*)<\/lastmod>\s*<changefreq>([^<]+)<\/changefreq>\s*<priority>([^<]+)<\/priority>/g,
)) {
  existing.set(match[1], { lastmod: match[2], changefreq: match[3], priority: match[4] });
}

const hashesPath = path.join(rootDir, "src/lib/sitemap-content-hashes.json");
const priorHashes = JSON.parse(await readFile(hashesPath, "utf-8").catch(() => "{}"));
const nextHashes = {};

const today = new Date().toISOString().slice(0, 10);

function entryFor(loc, fallbackPriority, fallbackChangefreq, hash) {
  const prior = existing.get(loc);
  const priorHash = priorHashes[loc];
  let lastmod;
  if (!prior) {
    // Brand-new URL: no history to preserve.
    lastmod = today;
  } else if (hash != null && priorHash != null && hash !== priorHash) {
    // We have a recorded hash from a previous run AND it changed: the
    // content genuinely moved, so the freshness signal should too.
    lastmod = today;
  } else {
    // Either nothing changed, or this is the first run under the new
    // hashing scheme (no priorHash yet) — don't guess, keep what's there.
    lastmod = prior.lastmod;
  }
  if (hash != null) nextHashes[loc] = hash;
  return {
    loc,
    lastmod,
    changefreq: prior?.changefreq ?? fallbackChangefreq,
    priority: prior?.priority ?? fallbackPriority,
  };
}

function urlBlock({ loc, esLoc, enLoc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${esLoc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${esLoc}" />
  </url>`;
}

const blocks = [];
for (const esPath of esRoutes) {
  const enPath = esPath === "/" ? "/en" : `/en${esPath}`;
  const esLoc = `${SITE_URL}${esPath === "/" ? "/" : esPath}`;
  const enLoc = `${SITE_URL}${enPath}`;
  const depth = esPath === "/" ? 0 : esPath.split("/").filter(Boolean).length;
  const esDefaultPriority = esPath === "/" ? "1.0" : Math.max(0.3, 0.9 - depth * 0.15).toFixed(1);
  const enDefaultPriority = esPath === "/" ? "0.9" : Math.max(0.1, Number(esDefaultPriority) - 0.1).toFixed(1);
  const defaultChangefreq = esPath === "/" ? "weekly" : "monthly";

  const esHash = await computeContentHash(esPath, "es");
  const enHash = await computeContentHash(esPath, "en");

  const esEntry = entryFor(esLoc, esDefaultPriority, defaultChangefreq, esHash);
  const enEntry = entryFor(enLoc, enDefaultPriority, defaultChangefreq, enHash);

  blocks.push(urlBlock({ loc: esLoc, esLoc, enLoc, ...esEntry }));
  blocks.push(urlBlock({ loc: enLoc, esLoc, enLoc, ...enEntry }));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Auto-generated by scripts/generate-sitemap.mjs from src/lib/route-meta.json +
  solutions-data.ts + workshops-data.ts (excluding "próximamente" workshops).
  Do not hand-edit URLs/structure here — edit route-meta.json or the data
  files instead and re-run \`node scripts/generate-sitemap.mjs\`.
  Priority/changefreq are preserved for existing URLs across regenerations.
  lastmod advances only when the i18n content that feeds that route actually
  changed (tracked in src/lib/sitemap-content-hashes.json) — see
  CONTENT_SOURCE in this script for the route -> content mapping.
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join("\n")}
</urlset>
`;

await writeFile(path.join(rootDir, "public/sitemap.xml"), xml, "utf-8");
await writeFile(hashesPath, JSON.stringify(nextHashes, null, 2) + "\n", "utf-8");
console.log(`generate-sitemap: wrote ${blocks.length} URLs to public/sitemap.xml`);
