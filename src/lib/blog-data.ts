export interface BlogPostEntry {
  slug: string;
  coverImage: string;
  /** ISO date (YYYY-MM-DD). Drives the displayed date and the BlogPosting JSON-LD. */
  publishedAt: string;
  /**
   * The service page (pillar) this article's cluster belongs to — canonical
   * Spanish path. Pass through langPath() for the EN route. Used to render
   * the "related service" link on the article and keep cluster ↔ pillar
   * cross-linking in sync (see PLAN.md Fase 5.2).
   */
  pillarHref: string;
  /** i18n key into the `common:nav` namespace for the pillar's label. */
  pillarLabelKey: string;
}

export const blogPosts: BlogPostEntry[] = [
  {
    slug: "por-que-fracasan-los-proyectos-de-transformacion-digital",
    coverImage: "/assets/decoracion/IMG_20240822_085440_710.jpg",
    publishedAt: "2026-09-08",
    pillarHref: "/metodo-cira/gestion-del-cambio",
    pillarLabelKey: "gestionCambio",
  },
  {
    slug: "como-elegir-una-consultora-estrategica-confiable",
    coverImage: "/assets/decoracion/IMG-20240215-WA0022.jpg",
    publishedAt: "2026-09-10",
    pillarHref: "/metodo-cira/estrategia",
    pillarLabelKey: "estrategia",
  },
  {
    slug: "gobierno-de-ia-corporativo-en-la-empresa",
    coverImage: "/assets/decoracion/evento-ia-tecnologia.jpeg",
    publishedAt: "2026-09-12",
    pillarHref: "/intelligence-lab/gobierno-de-ia",
    pillarLabelKey: "gobiernoIA",
  },
];

export function getBlogPostBySlug(slug: string | undefined) {
  return blogPosts.find((p) => p.slug === slug);
}
