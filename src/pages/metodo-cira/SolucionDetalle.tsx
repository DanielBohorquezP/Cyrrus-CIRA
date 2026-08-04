import { useParams, Navigate } from "react-router-dom";
import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { getSolutionBySlug } from "@/lib/solutions-data";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function SolucionDetalle() {
  const { solucion } = useParams();
  const entry = getSolutionBySlug(solucion);
  const meta = entry
    ? (routeMeta as Record<string, { title: string; description: string }>)[
        `/metodo-cira/seleccion-de-soluciones/${entry.slug}`
      ]
    : undefined;

  usePageMeta({
    title: meta?.title ?? "Selección de Soluciones | Cyrrus",
    description: meta?.description ?? "",
    jsonLd: entry
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: `Consultoría de selección de ${entry.label}`,
            name: entry.label,
            provider: { "@id": "https://www.cyrruscs.com/#organization" },
            description: meta?.description,
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
                name: "Método CIRA",
                item: "https://www.cyrruscs.com/metodo-cira",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Selección de Soluciones",
                item: "https://www.cyrruscs.com/metodo-cira/seleccion-de-soluciones",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: entry.label,
                item: `https://www.cyrruscs.com/metodo-cira/seleccion-de-soluciones/${entry.slug}`,
              },
            ],
          },
        ]
      : undefined,
  });

  if (!entry) return <Navigate to="/metodo-cira/seleccion-de-soluciones" replace />;

  return (
    <>
      <SiteHeader />
      <PageHero eyebrow={entry.eyebrow} title={`Consultoría de selección de ${entry.label}`} description={entry.intro} />
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
