import type { ReactNode } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowUpRight, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { langPath, useLang, type Lang } from "@/lib/language";
import { getBlogPostBySlug } from "@/lib/blog-data";
import imageManifest from "@/lib/image-manifest.json";
import { useScrollDepthEvent } from "@/lib/use-scroll-depth-event";
import { trackEvent } from "@/lib/analytics";
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
  type: "p" | "h2" | "quote" | "download" | "table";
  text: string;
  /** Contextual links to service pages, in the order they appear in `text`. */
  links?: BlogInlineLink[];
  /** "download" blocks: file under public/, and a one-line description. */
  href?: string;
  note?: string;
  /** "table" blocks: header row and body rows; `text` is the caption. */
  columns?: string[];
  rows?: string[][];
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
  /** Shorter <title> (≤ 51 chars + " | Cyrrus") when `title`, used as the H1, is too long for search results. */
  seoTitle?: string;
  /** 3 one-line takeaways shown in an "In short" box above the body. */
  keyTakeaways?: string[];
  /** External sources for the figures cited in the body. */
  sources?: { label: string; url: string }[];
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
    title: tr?.title ? `${tr.seoTitle ?? tr.title} | Cyrrus` : "Perspectivas | Cyrrus",
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
      <section className="section-y w-full bg-background">
        <div className="container-site grid grid-cols-1 gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,720px)_minmax(0,1fr)]">
          <Reveal className="order-2 space-y-6 text-[19px] leading-[1.75] text-slate lg:order-1">
            {tr.keyTakeaways && tr.keyTakeaways.length > 0 && (
              <aside className="rounded-2xl border border-line bg-mist p-7">
                <div className="font-heading text-sm font-bold uppercase tracking-[0.06em] text-blue">
                  {lang === "en" ? "In short" : "En breve"}
                </div>
                <ul className="mt-3 space-y-2 text-base text-navy">
                  {tr.keyTakeaways.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
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
                  <h2 key={key} className="pt-6 font-heading text-[clamp(24px,2.4vw,30px)] font-bold leading-[1.2] tracking-[-0.02em] text-navy first:pt-0">
                    {block.text}
                  </h2>
                );
              } else if (block.type === "download" && block.href) {
                const href = block.href;
                nodes.push(
                  <a
                    key={key}
                    href={href}
                    download
                    onClick={() => trackEvent("file_download", { file_name: href })}
                    className="group flex items-center gap-4 rounded-2xl border border-line-2 bg-mist p-6 no-underline transition-[border-color] duration-150 ease-out hover:border-blue"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-sky">
                      <Download className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-heading text-lg font-semibold text-navy">{block.text}</span>
                      {block.note && <span className="mt-1 block text-sm text-gray">{block.note}</span>}
                    </span>
                  </a>
                );
              } else if (block.type === "table" && block.columns && block.rows) {
                nodes.push(
                  <figure key={key} className="-mx-1 overflow-x-auto">
                    <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                      <caption className="mb-3 caption-top text-left text-sm font-semibold text-navy">
                        {block.text}
                      </caption>
                      <thead>
                        <tr>
                          {block.columns.map((col) => (
                            <th key={col} scope="col" className="border-b-2 border-navy bg-mist px-3 py-2 font-heading font-semibold text-navy">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row) => (
                          <tr key={row[0]} className="align-top">
                            {row.map((cell, c) =>
                              c === 0 ? (
                                <th key={`${row[0]}-${c}`} scope="row" className="border-b border-border px-3 py-2 font-semibold text-navy">
                                  {cell}
                                </th>
                              ) : (
                                <td key={`${row[0]}-${c}`} className="border-b border-border px-3 py-2 text-gray">
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </figure>
                );
              } else if (block.type === "quote") {
                nodes.push(
                  <blockquote key={key} className="border-l-2 border-sky pl-6 font-heading text-[clamp(22px,2.2vw,26px)] font-light leading-[1.4] text-navy">
                    {block.text}
                  </blockquote>
                );
              } else {
                nodes.push(<p key={key}>{renderInline(block.text, block.links, lang)}</p>);
              }
              return nodes;
            })}
            {tr.sources && tr.sources.length > 0 && (
              <div className="border-t border-border pt-6">
                <h2 className="text-base font-semibold text-navy">{lang === "en" ? "Sources" : "Fuentes"}</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
                  {tr.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue underline underline-offset-4 hover:text-navy"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="space-y-6 border-t-2 border-navy pt-6 lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <Img
                  src="/assets/decoracion/JacksonCEO1.jpeg"
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
              <p className="text-sm leading-relaxed text-muted-foreground">
                {lang === "en"
                  ? "30 years in strategy and IT: Oracle consultant, IT leader at PepsiCo Latin America, Covidien and Coremar, and founder of Cyrrus in 2017. MBA, Universidad del Norte."
                  : "30 años en estrategia y TI: consultor de Oracle, líder de TI en PepsiCo Latinoamérica, Covidien y Coremar, y fundador de Cyrrus en 2017. MBA de la Universidad del Norte."}
              </p>
              <Link
                to={langPath("/quienes-somos", lang)}
                className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-blue hover:text-navy"
              >
                {lang === "en" ? "About the author" : "Sobre el autor"}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
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
