import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import {
  Brain,
  Rocket,
  ShieldCheck,
  RefreshCw,
  Users2,
  Database,
  Compass,
} from "lucide-react";

const workshops = [
  {
    icon: Brain,
    title: "Taller de IA para directivos",
    description:
      "Cómo tomar decisiones informadas sobre inteligencia artificial sin depender de que el área técnica traduzca cada concepto.",
  },
  {
    icon: Rocket,
    title: "Taller de innovación empresarial",
    description:
      "Metodologías para priorizar iniciativas de innovación con criterio de negocio, no de novedad tecnológica.",
  },
  {
    icon: ShieldCheck,
    title: "Capacitación ISO 27001 para empresas",
    description:
      "Fundamentos de seguridad de la información aplicados al gobierno de datos e IA de la organización.",
  },
  {
    icon: RefreshCw,
    title: "Taller de continuidad de negocio (DRP)",
    description:
      "Cómo diseñar y probar planes de recuperación ante desastres que realmente se ejecutan cuando se necesitan.",
  },
  {
    icon: Users2,
    title: "Gestión del cambio para líderes",
    description:
      "Las herramientas que sostienen la fase de Adopción del método CIRA en manos de los líderes del cliente, no solo de Cyrrus.",
  },
  {
    icon: Database,
    title: "Gobierno de datos para ejecutivos",
    description:
      "Qué decisiones sobre datos le corresponden al liderazgo y cuáles pueden delegarse con controles claros.",
  },
  {
    icon: Compass,
    title: "Liderazgo digital y toma de decisiones",
    description:
      "Cómo liderar equipos durante una transformación sin perder el control del ritmo ni de la calidad de la ejecución.",
  },
];

export default function LeadershipAcademy() {
  usePageMeta({
    title: "Leadership Academy | Talleres para altos ejecutivos | Cyrrus",
    description:
      "Leadership Academy: talleres para altos ejecutivos y capacitación gerencial empresarial que sostienen la fase de Adopción de CIRA. Taller de IA para directivos, innovación empresarial, ISO 27001 y continuidad de negocio (DRP).",
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Quién lo sostiene"
        title="No es un servicio de formación genérico. Es lo que sostiene la adopción en el tiempo."
        description="Leadership Academy son talleres para altos ejecutivos que forman al equipo del cliente para operar bajo el mismo modelo de gobierno de IA que Cyrrus implementa — para que la velocidad no dependa solo de nosotros."
      />

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Capacitación gerencial empresarial
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Siete talleres ejecutivos.
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workshops.map((w) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.title}
                  variants={staggerItem}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-light-blue">
                    <Icon className="h-5 w-5 text-blue" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-navy">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray">
                    {w.description}
                  </p>
                </motion.div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
