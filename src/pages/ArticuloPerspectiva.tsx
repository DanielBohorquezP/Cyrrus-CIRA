import type { ReactNode } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { langPath, useLang, type Lang } from "@/lib/language";
import { getBlogPostBySlug } from "@/lib/blog-data";
import imageManifest from "@/lib/image-manifest.json";
import { useScrollDepthEvent } from "@/lib/use-scroll-depth-event";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { Img } from "@/components/ui/img";
import { ArticleServiceCta } from "@/components/sections/article-service-cta";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/blog";

interface BlogInlineLink {
  /** Exact substring of the block's `text` that becomes the anchor. */
  text: string;
  /** Canonical Spanish path; passed through langPath() for the EN route. */
  href: string;
}

interface BlogBodyBlock {
  type: "p" | "h2" | "quote";
  text: string;
  /** Contextual links to service pages, in the order they appear in `text`. */
  links?: BlogInlineLink[];
}

/**
 * Splits a paragraph around its link anchors. Each piece is one whole string,
 * so the prerendered HTML has exactly one text node between elements — see
 * the hydration rules in CLAUDE.md.
 */
function renderInline(text: string, links: BlogInlineLink[] | undefined, lang: Lang): ReactNode {
  if (!links?.length) return text;
  const nodes: ReactNode[] = [];
  let rest = text;
  links.forEach((link, i) => {
    const at = rest.indexOf(link.text);
    if (at === -1) return;
    if (at > 0) nodes.push(rest.slice(0, at));
    nodes.push(
      <Link
        key={`link-${i}`}
        to={langPath(link.href, lang)}
        className="font-medium text-blue underline underline-offset-4 hover:text-navy"
      >
        {link.text}
      </Link>
    );
    rest = rest.slice(at + link.text.length);
  });
  if (rest) nodes.push(rest);
  return nodes;
}

interface BlogServiceCta {
  title: string;
  description: string;
  checklist: [string, string];
  ctaLabel: string;
  imageAlt: string;
}

interface BlogPostTranslation {
  title: string;
  label: string;
  excerpt: string;
  metaDescription: string;
  intro: string;
  body: BlogBodyBlock[];
  /** Copy for the 2 mid-article service-promo cards — see
   *  BlogPostEntry.serviceCtaIndexes in blog-data.ts for where they render. */
  serviceCtas: [BlogServiceCta, BlogServiceCta];
}

export default function ArticuloPerspectiva() {
  const { articulo } = useParams();
  const { t } = useTranslation("blog");
  const { t: tHome } = useTranslation("home");
  const lang = useLang();
  const entry = getBlogPostBySlug(articulo);
  const coverSize = entry
    ? (imageManifest as Record<string, number[]>)[encodeURI(entry.coverImage)]
    : undefined;
  const tr = entry ? (t(`posts.${entry.slug}`, { returnObjects: true }) as BlogPostTranslation) : undefined;

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/perspectivas" : "/perspectivas";
  const pagePath = entry ? `${hubPath}/${entry.slug}` : hubPath;

  const dateFormatter = new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const displayDate = entry ? dateFormatter.format(new Date(`${entry.publishedAt}T00:00:00Z`)) : "";

  usePageMeta({
    title: tr?.title ? `${tr.title} | Cyrrus` : "Perspectivas | Cyrrus",
    description: tr?.metaDescription ?? "",
    alternatePath: entry
      ? lang === "en"
        ? `/perspectivas/${entry.slug}`
        : `/en/perspectivas/${entry.slug}`
      : undefined,
    jsonLd:
      entry && tr
        ? [
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `${siteUrl}${pagePath}#article`,
              url: `${siteUrl}${pagePath}`,
              headline: tr.title,
              description: tr.excerpt,
              image: {
                "@type": "ImageObject",
                url: `${siteUrl}${entry.coverImage}`,
                ...(coverSize && { width: coverSize[0], height: coverSize[1] }),
              },
              datePublished: entry.publishedAt,
              dateModified: entry.updatedAt ?? entry.publishedAt,
              inLanguage: lang === "en" ? "en" : "es",
              // The full Person (bio, education, sameAs) lives on /quienes-somos
              // under this @id; repeating its fields here only lets them drift.
              author: {
                "@type": "Person",
                "@id": `${siteUrl}/quienes-somos#jackson-bohorquez`,
                url: `${siteUrl}/quienes-somos`,
                name: tHome("ceo.name"),
              },
              publisher: { "@id": `${siteUrl}/#organization` },
              isPartOf: { "@id": `${siteUrl}/#website` },
              mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}${pagePath}` },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
                { "@type": "ListItem", position: 2, name: lang === "en" ? "Insights" : "Perspectivas", item: `${siteUrl}${hubPath}` },
                { "@type": "ListItem", position: 3, name: tr.title, item: `${siteUrl}${pagePath}` },
              ],
            },
          ]
        : undefined,
  });

  useScrollDepthEvent("article_read", entry ? { slug: entry.slug } : null);

  if (!entry || !tr) return <Navigate to={hubPath} replace />;

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: lang === "en" ? "Insights" : "Perspectivas", href: hubPath },
    { label: tr.title },
  ];

  return (
    <>
      <SiteHeader />
      <main id="contenido">
      <PageHero
        eyebrow={tr.label}
        title={tr.title}
        description={tr.intro}
        image={{ src: entry.coverImage, alt: tr.title }}
        breadcrumbs={breadcrumbItems}
      />
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-12 md:px-12">
          <Reveal className="order-2 space-y-6 text-lg leading-relaxed text-gray md:order-1 md:col-span-8">
            {tr.body.flatMap((block, i) => {
              const nodes: ReactNode[] = [];
              const ctaIndex = entry.serviceCtaIndexes.indexOf(i);
              if (ctaIndex !== -1) {
                const cta = tr.serviceCtas[ctaIndex];
                nodes.push(
                  <ArticleServiceCta
                    key={`cta-${ctaIndex}`}
                    title={cta.title}
                    description={cta.description}
                    checklist={cta.checklist}
                    ctaLabel={cta.ctaLabel}
                    href={langPath(entry.pillarHref, lang)}
                    image={{ src: entry.serviceCtaImages[ctaIndex], alt: cta.imageAlt }}
                  />
                );
              }
              const key = `${block.type}-${i}`;
              if (block.type === "h2") {
                nodes.push(
                  <h2 key={key} className="pt-4 text-2xl font-semibold text-navy first:pt-0">
                    {block.text}
                  </h2>
                );
              } else if (block.type === "quote") {
                nodes.push(
                  <blockquote key={key} className="border-l-4 border-cyan pl-6 text-xl font-medium italic text-navy">
                    {block.text}
                  </blockquote>
                );
              } else {
                nodes.push(<p key={key}>{renderInline(block.text, block.links, lang)}</p>);
              }
              return nodes;
            })}
          </Reveal>
          <Reveal delay={0.1} className="order-1 md:order-2 md:col-span-4">
            <div className="space-y-6 rounded-2xl border border-border bg-white p-6 shadow-sm md:sticky md:top-28">
              <div className="flex items-center gap-3">
                <Img
                  src="/assets/decoracion/JacksonCEO1.webp"
                  alt={tHome("ceo.photoAlt")}
                  width={56}
                  height={56}
                  sizes="56px"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-navy">{tHome("ceo.name")}</div>
                  <div className="text-xs text-muted-foreground">{tHome("ceo.role")}</div>
                </div>
              </div>
              <div className="border-t border-border pt-4 text-sm text-muted-foreground">
                <span className="font-medium text-navy">{lang === "en" ? "Published" : "Publicado"}</span>
                {` · ${displayDate}`}
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray">
                  {lang === "en" ? "Related service" : "Servicio relacionado"}
                </div>
                <Link
                  to={langPath(entry.pillarHref, lang)}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue underline-offset-4 hover:underline"
                >
                  {t(`nav.${entry.pillarLabelKey}`, { ns: "common" })}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
