import { useParams, Navigate } from "react-router-dom";
import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { getWorkshopBySlug } from "@/lib/workshops-data";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function CursoDetalle() {
  const { curso } = useParams();
  const entry = getWorkshopBySlug(curso);
  const meta = entry
    ? (routeMeta as Record<string, { title: string; description: string }>)[
        `/leadership-academy/${entry.slug}`
      ]
    : undefined;

  usePageMeta({
    title: meta?.title ?? entry?.title ?? "Leadership Academy | Cyrrus",
    description: meta?.description ?? entry?.intro ?? "",
    jsonLd: entry
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Course",
            "@id": `https://www.cyrruscs.com/leadership-academy/${entry.slug}#course`,
            url: `https://www.cyrruscs.com/leadership-academy/${entry.slug}`,
            name: entry.title,
            provider: { "@id": "https://www.cyrruscs.com/#organization" },
            description: meta?.description ?? entry.intro,
            areaServed: "LATAM",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Inicio",
                item: "https://www.cyrruscs.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Leadership Academy",
                item: "https://www.cyrruscs.com/leadership-academy",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: entry.title,
                item: `https://www.cyrruscs.com/leadership-academy/${entry.slug}`,
              },
            ],
          },
        ]
      : undefined,
  });

  if (!entry) return <Navigate to="/leadership-academy" replace />;

  return (
    <>
      <SiteHeader />
      <PageHero eyebrow={entry.eyebrow} title={entry.title} description={entry.intro} />
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-12 space-y-6 text-lg leading-relaxed text-gray">
          {entry.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
      <FinalCta />
      <Footer />
    </>
  );
}
