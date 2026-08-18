import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { getWorkshopBySlug } from "@/lib/workshops-data";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/leadership-academy";
import { Img } from "@/components/ui/img";

interface WorkshopTranslation {
  title: string;
  shortDescription: string;
  intro: string;
  body: string[];
}

export default function CursoDetalle() {
  const { curso } = useParams();
  const { t } = useTranslation("leadership-academy");
  const lang = useLang();
  const prefix = lang === "en" ? "/en" : "";
  const entry = getWorkshopBySlug(curso);
  const tr = entry ? (t(`workshops.${entry.slug}`, { returnObjects: true }) as WorkshopTranslation) : undefined;

  const siteUrl = "https://www.cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/leadership-academy" : "/leadership-academy";
  const pagePath = entry ? `${prefix}/leadership-academy/${entry.slug}` : hubPath;

  usePageMeta({
    title: tr?.title ?? (lang === "en" ? "Leadership Academy | Cyrrus" : "Leadership Academy | Cyrrus"),
    description: tr?.intro ?? "",
    noindex: entry?.comingSoon,
    alternatePath: entry
      ? lang === "en"
        ? `/leadership-academy/${entry.slug}`
        : `/en/leadership-academy/${entry.slug}`
      : undefined,
    jsonLd:
      entry && tr
        ? [
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "@id": `${siteUrl}${pagePath}#course`,
              url: `${siteUrl}${pagePath}`,
              name: tr.title,
              provider: { "@id": `${siteUrl}/#organization` },
              description: tr.intro,
              areaServed: "LATAM",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
                { "@type": "ListItem", position: 2, name: "Leadership Academy", item: `${siteUrl}${hubPath}` },
                { "@type": "ListItem", position: 3, name: tr.title, item: `${siteUrl}${pagePath}` },
              ],
            },
          ]
        : undefined,
  });

  if (!entry || !tr) return <Navigate to={hubPath} replace />;

  return (
    <>
      <SiteHeader />
      <PageHero eyebrow={entry.eyebrow} title={tr.title} description={tr.intro} />
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-4">
            <Img
              src="/assets/decoracion/IMG-20240215-WA0030.jpg"
              alt="Taller de formación ejecutiva de Cyrrus Leadership Academy"
              width={400}
              height={500}
                  className="h-56 w-full rounded-2xl object-cover md:h-full"
              sizes="(min-width: 1152px) 528px, (min-width: 768px) 46vw, calc(100vw - 3rem)"
            />
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-gray md:col-span-8">
            {tr.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>
      <FinalCta />
      <Footer />
    </>
  );
}
