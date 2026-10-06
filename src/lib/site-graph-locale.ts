import type { Lang } from "@/lib/language";

/**
 * Localizes the site-wide JSON-LD graph (Organization, offices, WebSite) that
 * index.html ships in Spanish for every route.
 *
 * The script sits in <head>, outside the React root, so rewriting it never
 * touches hydration. What matters is the static HTML: the prerenderer
 * serializes the live DOM, so each /en page ships the English graph and each
 * Spanish page a Spanish-only description. A page loaded from /en HTML keeps
 * the English graph if the visitor then switches language client-side —
 * harmless, since crawlers read each URL's own HTML.
 */

const SITE = "https://cyrruscs.com";

const EN = {
  description:
    "Strategic consulting and AI-driven digital transformation through the CIRA methodology: Build, Identify, Realize, Adopt.",
  catalogName: "Cyrrus consulting services (CIRA method)",
  services: {
    Estrategia: "Strategy",
    "Selección de soluciones": "Solution selection",
    "Gerencia de proyectos": "Project management",
    "Gestión del cambio": "Change management",
    "Presencia digital": "Digital presence",
  } as Record<string, string>,
  places: {
    Perú: "Peru",
    "Estados Unidos": "United States",
    Brasil: "Brazil",
    Panamá: "Panama",
    Centroamérica: "Central America",
    México: "Mexico",
    "República Dominicana": "Dominican Republic",
  } as Record<string, string>,
  knowsAbout: [
    "Strategic business consulting",
    "Digital transformation",
    "Corporate AI governance",
    "Enterprise software selection",
    "Project management",
    "Organizational change management",
  ],
};

type Node = Record<string, unknown>;

let original: string | null = null;

function findScript(): HTMLScriptElement | null {
  for (const s of document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')) {
    if (s.textContent?.includes(`${SITE}/#organization`)) return s;
  }
  return null;
}

function toEnglish(graph: Node[]): Node[] {
  return graph.map((node) => {
    if (node["@id"] !== `${SITE}/#organization`) return node;
    const org = { ...node };
    org.description = EN.description;
    const catalog = org.hasOfferCatalog as Node | undefined;
    if (catalog) {
      org.hasOfferCatalog = {
        ...catalog,
        name: EN.catalogName,
        itemListElement: (catalog.itemListElement as Node[]).map((offer) => {
          const service = offer.itemOffered as Node;
          return {
            ...offer,
            itemOffered: {
              ...service,
              name: EN.services[service.name as string] ?? service.name,
              url: (service.url as string).replace(`${SITE}/`, `${SITE}/en/`),
            },
          };
        }),
      };
    }
    if (Array.isArray(org.areaServed)) {
      org.areaServed = (org.areaServed as Node[]).map((p) => ({
        ...p,
        name: EN.places[p.name as string] ?? p.name,
      }));
    }
    org.knowsAbout = EN.knowsAbout;
    return org;
  });
}

function toSpanish(graph: Node[]): Node[] {
  return graph.map((node) => {
    if (node["@id"] !== `${SITE}/#organization` || !Array.isArray(node.description)) return node;
    const es = (node.description as Node[]).find((d) => d["@language"] === "es");
    return { ...node, description: es?.["@value"] ?? node.description };
  });
}

export function localizeSiteGraph(lang: Lang) {
  const script = findScript();
  if (!script) return;
  original ??= script.textContent ?? "";
  try {
    const data = JSON.parse(original) as { "@graph": Node[] };
    const graph = lang === "en" ? toEnglish(data["@graph"]) : toSpanish(data["@graph"]);
    script.textContent = JSON.stringify({ ...data, "@graph": graph });
  } catch {
    // Leave the shipped graph as it is rather than break it.
  }
}
