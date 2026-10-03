export interface BlogPostEntry {
  slug: string;
  coverImage: string;
  /** ISO date (YYYY-MM-DD). Drives the displayed date and the BlogPosting JSON-LD. */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD) of the last substantive edit. Optional; drives dateModified, falling back to publishedAt. */
  updatedAt?: string;
  /**
   * The service page (pillar) this article's cluster belongs to — canonical
   * Spanish path. Pass through langPath() for the EN route. Used to render
   * the "related service" link on the article and keep cluster ↔ pillar
   * cross-linking in sync (see PLAN.md Fase 5.2).
   */
  pillarHref: string;
  /** i18n key into the `common:nav` namespace for the pillar's label. */
  pillarLabelKey: string;
  /**
   * Body-block indexes (0-based, shared across ES/EN — `body` has the same
   * length and type sequence in both locales) right before which a
   * mid-article "service CTA" card renders — one near the 1/3 mark, one near
   * the 2/3 mark, both chosen at an existing `h2` boundary so the card reads
   * as a section break rather than an interruption. Paired positionally with
   * `serviceCtaImages` and with `posts.<slug>.serviceCtas` in blog.json.
   */
  serviceCtaIndexes: [number, number];
  /** One image per CTA above, reused from the pillar service page itself so
   *  the promo photo matches the page the CTA links to. */
  serviceCtaImages: [string, string];
}

export const blogPosts: BlogPostEntry[] = [
  {
    slug: "por-que-fracasan-los-proyectos-de-transformacion-digital",
    coverImage: "/assets/decoracion/1785866331023.jpg",
    publishedAt: "2026-09-08",
    pillarHref: "/metodo-cira/gestion-del-cambio",
    pillarLabelKey: "gestionCambio",
    serviceCtaIndexes: [25, 55],
    serviceCtaImages: [
      "/assets/decoracion/evento-jackson-moderador.jpeg",
      "/assets/decoracion/Trabajo.jpg",
    ],
  },
  {
    slug: "como-elegir-una-consultora-estrategica-confiable",
    coverImage: "/assets/decoracion/IMG-20240215-WA0022.jpg",
    publishedAt: "2026-09-10",
    pillarHref: "/metodo-cira/estrategia",
    pillarLabelKey: "estrategia",
    serviceCtaIndexes: [29, 53],
    serviceCtaImages: [
      "/assets/decoracion/IMG_20200313_092604173.jpg",
      "/assets/decoracion/IMG_20230227_164810.jpg",
    ],
  },
  {
    slug: "gobierno-de-ia-corporativo-en-la-empresa",
    coverImage: "/assets/decoracion/evento-ia-tecnologia.jpeg",
    publishedAt: "2026-09-12",
    pillarHref: "/intelligence-lab/gobierno-de-ia",
    pillarLabelKey: "gobiernoIA",
    serviceCtaIndexes: [30, 56],
    serviceCtaImages: [
      "/assets/decoracion/IMG_20230228_083642.jpg",
      "/assets/decoracion/1785866224151.jpg",
    ],
  },
  {
    slug: "gerencia-de-proyectos-cuando-contratar-una-pmo-externa",
    coverImage: "/assets/decoracion/IMG_20230705_122802.jpg",
    publishedAt: "2026-09-22",
    pillarHref: "/metodo-cira/gestion-de-proyectos",
    pillarLabelKey: "gerenciaProyectos",
    serviceCtaIndexes: [14, 25],
    serviceCtaImages: [
      "/assets/decoracion/IMG_20200313_092713184.jpg",
      "/assets/decoracion/IMG_20230228_091017.jpg",
    ],
  },
  {
    slug: "que-es-un-erp-guia-para-elegirlo",
    coverImage: "/assets/decoracion/IMG_20230228_082627.jpg",
    publishedAt: "2026-10-03",
    pillarHref: "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp",
    pillarLabelKey: "seleccionSoluciones",
    serviceCtaIndexes: [34, 59],
    serviceCtaImages: [
      "/assets/decoracion/1785866224286.jpg",
      "/assets/decoracion/IMG_20230228_091017.jpg",
    ],
  },
  {
    slug: "que-es-una-pmo-funciones-tipos-cuando-necesitarla",
    coverImage: "/assets/decoracion/Trabajo.jpg",
    publishedAt: "2026-10-03",
    pillarHref: "/metodo-cira/gestion-de-proyectos",
    pillarLabelKey: "gerenciaProyectos",
    serviceCtaIndexes: [20, 52],
    serviceCtaImages: [
      "/assets/decoracion/IMG_20200313_092713184.jpg",
      "/assets/decoracion/IMG_20230228_091017.jpg",
    ],
  },
];

export function getBlogPostBySlug(slug: string | undefined) {
  return blogPosts.find((p) => p.slug === slug);
}
