// Client case studies, one page each at /experiencia/<slug>.
//
// The copy lives in the "paginas" namespace under `casos.<slug>`; this file
// holds what isn't translated. Video dates and durations come from each
// video's YouTube page and feed the VideoObject JSON-LD — keep them exact,
// Google rejects a VideoObject whose uploadDate it can't reconcile.
//
// scripts/prerender.mjs and generate-sitemap.mjs read the routes from
// src/lib/route-meta.json, so a new case also needs its entry there.

export interface CaseVideo {
  id: string;
  /** ISO 8601, as YouTube reports it. */
  uploadDate: string;
  /** ISO 8601 duration. */
  duration: string;
}

export interface CaseStudyEntry {
  slug: string;
  /** Name of the file under public/assets/logos-clientes (see client-logos.ts). */
  logo: string;
  videos: CaseVideo[];
  /** Spanish service paths the case links to, in display order. */
  services: string[];
}

export const caseStudies: CaseStudyEntry[] = [
  {
    slug: "3-castillos",
    logo: "3 Castillos",
    videos: [
      { id: "X-XO1T35RK4", uploadDate: "2022-02-13T21:00:11-08:00", duration: "PT1M50S" },
      { id: "7czOH9eH6lw", uploadDate: "2022-01-30T21:00:11-08:00", duration: "PT1M34S" },
      { id: "C8aDacFpwBY", uploadDate: "2022-02-06T21:00:11-08:00", duration: "PT1M45S" },
    ],
    services: [
      "/servicios/estrategia",
      "/servicios/seleccion-de-soluciones/seleccion-de-software/erp",
      "/servicios/gerencia-de-proyectos",
      "/servicios/gestion-del-cambio",
    ],
  },
  {
    slug: "morelco",
    logo: "Morelco",
    videos: [{ id: "2oWuE5RFskI", uploadDate: "2022-01-23T21:00:30-08:00", duration: "PT1M59S" }],
    services: ["/servicios/gestion-del-cambio", "/servicios/estrategia"],
  },
];

export function getCaseStudyBySlug(slug: string | undefined) {
  return caseStudies.find((c) => c.slug === slug);
}
