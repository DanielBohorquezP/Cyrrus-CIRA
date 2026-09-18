import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { langPath, useLang } from "@/lib/language";
import { getBlogPostBySlug } from "@/lib/blog-data";
import { useScrollDepthEvent } from "@/lib/use-scroll-depth-event";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { Img } from "@/components/ui/img";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/blog";

interface BlogBodyBlock {
  type: "p" | "h2" | "quote";
  text: string;
}

interface BlogPostTranslation {
  title: string;
  label: string;
  excerpt: string;
  metaDescription: string;
  intro: string;
  body: BlogBodyBlock[];
}

export default function ArticuloPerspectiva() {
  const { articulo } = useParams();
  const { t } = useTranslation("blog");
  const { t: tHome } = useTranslation("home");
  const lang = useLang();
  const entry = getBlogPostBySlug(articulo);
  const tr = entry ? (t(`posts.${entry.slug}`, { returnObjects: true }) as BlogPostTranslation) : undefined;

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/perspectivas" : "/perspectivas";
  const pagePath = entry ? `${hubPath}/${entry.slug}` : hubPath;

  const dateFormatter = new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const displayDate = entry ? dateFormatter.format(new Date(`${entry.publishedAt}T00:00:00`)) : "";

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
              image: `${siteUrl}${entry.coverImage}`,
              datePublished: entry.publishedAt,
              dateModified: entry.publishedAt,
              inLanguage: lang === "en" ? "en" : "es",
              author: {
                "@type": "Person",
                name: tHome("ceo.name"),
                jobTitle: tHome("ceo.role"),
              },
              publisher: { "@id": `${siteUrl}/#organization` },
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
            {tr.body.map((block, i) => {
              const key = `${block.type}-${i}`;
              if (block.type === "h2") {
                return (
                  <h2 key={key} className="pt-4 text-2xl font-semibold text-navy first:pt-0">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={key} className="border-l-4 border-cyan pl-6 text-xl font-medium italic text-navy">
                    {block.text}
                  </blockquote>
                );
              }
              return <p key={key}>{block.text}</p>;
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
      <Footer />
    </>
  );
}
