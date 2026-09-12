export interface BlogPostEntry {
  slug: string;
  coverImage: string;
  /** ISO date (YYYY-MM-DD). Drives the displayed date and the BlogPosting JSON-LD. */
  publishedAt: string;
}

export const blogPosts: BlogPostEntry[] = [
  {
    slug: "por-que-fracasan-los-proyectos-de-transformacion-digital",
    coverImage: "/assets/decoracion/IMG_20240822_085440_710.jpg",
    publishedAt: "2026-09-08",
  },
  {
    slug: "como-elegir-una-consultora-estrategica-confiable",
    coverImage: "/assets/decoracion/IMG-20240215-WA0022.jpg",
    publishedAt: "2026-09-10",
  },
  {
    slug: "gobierno-de-ia-corporativo-en-la-empresa",
    coverImage: "/assets/decoracion/evento-ia-tecnologia.jpeg",
    publishedAt: "2026-09-12",
  },
];

export function getBlogPostBySlug(slug: string | undefined) {
  return blogPosts.find((p) => p.slug === slug);
}
