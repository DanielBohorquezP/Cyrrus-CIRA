import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { getSolutionBySlug, solutionsClosingQuote, solutionsClosingIcon as ClosingIcon } from "@/lib/solutions-data";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";

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
      <PageHero
        eyebrow={entry.eyebrow}
        title={`Consultoría de selección de ${entry.label}`}
        description={entry.intro}
      >
        <ContactCtaButton variant="light" label="Hablemos de su selección" />
      </PageHero>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-4">
              <img
                src={entry.image}
                alt={entry.label}
                width={480}
                height={600}
                loading="lazy"
                className="h-64 w-full rounded-2xl object-cover md:h-full"
                style={{ objectPosition: entry.imagePosition ?? "center" }}
              />
            </Reveal>
            <div className="md:col-span-8">
              <Reveal className="max-w-2xl">
                <span className="text-sm font-semibold uppercase tracking-wider text-blue">
                  ¿Qué ayudamos a seleccionar?
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  {entry.label}
                </h2>
              </Reveal>

              <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {entry.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      variants={staggerItem}
                      className="rounded-2xl border border-border bg-card p-7"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                        <Icon className="h-5 w-5 text-cyan" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray">{item.description}</p>
                    </motion.div>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {entry.stat && (
        <AnimatedNavyBackground className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
            <Reveal>
              <span className="text-6xl font-bold tracking-tight text-cyan sm:text-7xl">
                {entry.stat.value}
              </span>
              <p className="mt-4 text-lg leading-relaxed text-white/85">
                {entry.stat.description}
              </p>
              <span className="mt-3 block text-sm font-medium uppercase tracking-wider text-white/50">
                {entry.stat.source}
              </span>
            </Reveal>
          </div>
        </AnimatedNavyBackground>
      )}

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <Reveal>
            <ClosingIcon className="mx-auto h-8 w-8 text-blue" />
            <p className="mt-6 border-l-2 border-cyan pl-6 text-left text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              &ldquo;{solutionsClosingQuote}&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
