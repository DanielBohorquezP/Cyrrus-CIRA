import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { motion } from "framer-motion";
import { ShieldCheck, Network, Bot, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Gobierno de IA corporativo",
    description:
      "Nadie en la organización puede explicar qué modelo tomó qué decisión, ni con qué datos. Definimos quién decide, quién audita y qué datos pueden tocarse y cuáles no.",
    href: "/intelligence-lab/gobierno-de-ia",
  },
  {
    icon: Network,
    title: "Arquitectura de IA empresarial",
    description:
      "Cinco herramientas de IA, compradas por cinco áreas distintas, que no se hablan entre sí. Diseñamos la arquitectura que conecta modelos, datos y sistemas existentes de forma segura y escalable.",
    href: "/intelligence-lab/arquitectura-de-ia",
  },
  {
    icon: Bot,
    title: "Automatización de procesos con agentes de IA",
    description:
      "Agentes que hacen una demo impecable y no tocan un proceso real del negocio. Los nuestros ejecutan tareas dentro de cada fase de CIRA — diagnóstico, evaluación de proveedores, monitoreo de riesgo, medición de adopción — bajo el mismo marco de gobierno.",
    href: "/intelligence-lab/automatizaciones-desarrollo",
  },
];

const phaseLinks = [
  { phase: "Construir", href: "/metodo-cira#construir", note: "Meses de diagnóstico manual, decisiones basadas en la última reunión." },
  { phase: "Identificar", href: "/metodo-cira#identificar", note: "Evaluar proveedores uno por uno mientras la decisión se enfría." },
  { phase: "Realizar", href: "/metodo-cira#realizar", note: "El riesgo del proyecto se descubre en el reporte de la semana, no en el momento en que ocurre." },
  { phase: "Adoptar", href: "/metodo-cira#adoptar", note: "Nadie mide la adopción hasta que el proyecto ya cerró." },
];

export default function IntelligenceLab() {
  usePageMeta({
    title: "Gobierno de IA Corporativo | Cyrrus Intelligence Lab",
    description:
      "Cyrrus Intelligence Lab es la capa de gobierno de IA corporativo y arquitectura de IA empresarial que sostiene las 4 fases del método CIRA — no un catálogo de chatbots, sino la infraestructura que hace posible la implementación de IA en procesos de negocio.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Gobierno de inteligencia artificial corporativo",
        name: "Cyrrus Intelligence Lab",
        provider: { "@id": "https://www.cyrruscs.com/#organization" },
        description:
          "Gobierno de IA corporativo y arquitectura de IA empresarial, transversal a las 4 fases del método CIRA.",
        areaServed: "LATAM",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cyrruscs.com/" },
          { "@type": "ListItem", position: 2, name: "Cyrrus Intelligence Lab", item: "https://www.cyrruscs.com/intelligence-lab" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow="Cyrrus Intelligence Lab"
        title="Gobierno de IA corporativo y arquitectura de IA empresarial"
        description="Su equipo ya usa IA sin que nadie audite qué datos toca ni quién responde si falla. Antes de la siguiente herramienta, necesita gobierno — no otro piloto suelto. Cyrrus Intelligence Lab es la capa de gobierno de IA corporativo y arquitectura de IA empresarial que corre de forma transversal por debajo de las 4 fases del método."
      >
        <ContactCtaButton variant="light" />
      </IntelligenceLabHero>

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Los tres pilares
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Gobierno primero. Herramientas después.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray">
              La mayoría de las iniciativas de IA fallan porque empiezan por la
              herramienta. Nosotros empezamos por el marco de gobierno que
              hace que esa herramienta sea segura, auditable y escalable.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.title} variants={staggerItem}>
                  <Link
                    to={pillar.href}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-blue/30"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-blue">
                      <Icon className="h-6 w-6 text-blue" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-navy">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray">
                      {pillar.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
                      Ver más
                      <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-12">
            <ContactCtaButton />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Transversal a CIRA
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Un mismo motor, corriendo en las cuatro fases.
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {phaseLinks.map((item) => (
              <motion.a
                key={item.phase}
                href={item.href}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-blue/30"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                  {item.phase}
                </span>
                <span className="mt-3 text-sm leading-relaxed text-gray">
                  {item.note}
                </span>
              </motion.a>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-12">
            <ContactCtaButton />
          </Reveal>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
