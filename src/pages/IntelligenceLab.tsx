import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { ShieldCheck, Network, Bot } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Gobierno de IA corporativo",
    description:
      "Políticas, roles y controles claros sobre cómo se usa la inteligencia artificial dentro de su organización — quién decide, quién audita, qué datos pueden tocarse y cuáles no.",
  },
  {
    icon: Network,
    title: "Arquitectura de IA empresarial",
    description:
      "El diseño técnico que conecta modelos, datos y sistemas existentes de forma segura y escalable, evitando la proliferación descontrolada de herramientas sueltas.",
  },
  {
    icon: Bot,
    title: "Automatización de procesos con agentes de IA",
    description:
      "Agentes especializados que ejecutan tareas dentro de cada fase de CIRA — diagnóstico, evaluación de proveedores, monitoreo de riesgo, medición de adopción — bajo el mismo marco de gobierno.",
  },
];

const phaseLinks = [
  { phase: "Construir", href: "/metodo-cira#construir", note: "diagnóstico y análisis de datos" },
  { phase: "Identificar", href: "/metodo-cira#identificar", note: "evaluación de proveedores en paralelo" },
  { phase: "Realizar", href: "/metodo-cira#realizar", note: "monitoreo de riesgo en tiempo real" },
  { phase: "Adoptar", href: "/metodo-cira#adoptar", note: "medición continua del clima organizacional" },
];

export default function IntelligenceLab() {
  usePageMeta({
    title: "Cyrrus Intelligence Lab | Gobierno y Arquitectura de IA",
    description:
      "Cyrrus Intelligence Lab es la capa de gobierno de IA corporativo y arquitectura de IA empresarial que sostiene las 4 fases del método CIRA — no un catálogo de chatbots, sino la infraestructura que hace posible la implementación de IA en procesos de negocio.",
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="El cómo"
        title="No es un catálogo de chatbots. Es la infraestructura que sostiene CIRA."
        description="Cyrrus Intelligence Lab es la capa de gobierno de IA corporativo y arquitectura de IA empresarial que corre de forma transversal por debajo de las 4 fases del método — la razón por la que Cyrrus llega a resultados más rápido que el resto del mercado."
      />

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
                <motion.div
                  key={pillar.title}
                  variants={staggerItem}
                  className="rounded-2xl border border-border bg-card p-8"
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
                </motion.div>
              );
            })}
          </RevealGroup>
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
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
