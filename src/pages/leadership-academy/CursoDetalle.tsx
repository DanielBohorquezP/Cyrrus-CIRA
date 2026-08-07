import { useParams, Navigate } from "react-router-dom";
import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { getWorkshopBySlug } from "@/lib/workshops-data";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";

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
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-4">
            <img
              src="/assets/decoracion/IMG-20240215-WA0030.jpg"
              alt="Taller de formación ejecutiva de Cyrrus Leadership Academy"
              width={400}
              height={500}
              loading="lazy"
              className="h-56 w-full rounded-2xl object-cover md:h-full"
            />
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-gray md:col-span-8">
            {entry.body.map((p) => (
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
