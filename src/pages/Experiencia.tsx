import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const stats = [
  { value: "+17", label: "países con presencia" },
  { value: "4", label: "fases, un solo método" },
  { value: "60%", label: "diagnóstico más rápido con IA" },
];

const industries = [
  "Manufactura",
  "Servicios financieros",
  "Energía",
  "Oil & Gas",
  "Retail",
  "Salud",
];

const team = [
  { role: "CEO & Fundador" },
  { role: "Directora de Cyrrus Intelligence Lab" },
  { role: "Director de Leadership Academy" },
  { role: "Directora de Operaciones" },
];

export default function Experiencia() {
  usePageMeta({
    title: "Experiencia | Consultoría multinacional LATAM | Cyrrus",
    description:
      "Cyrrus: consultoría multinacional con presencia en +17 países. Casos de éxito en transformación digital para manufactura, servicios financieros, energía y oil & gas. Conozca al equipo detrás del método CIRA.",
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Prueba social"
        title="Consultoría multinacional LATAM, con presencia en +17 países."
        description="Casos de éxito en transformación digital a través de industrias, un equipo de liderazgo con trayectoria real ejecutando el método CIRA, y las empresas que ya confiaron en nosotros."
      />

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="rounded-2xl border border-border bg-card p-8 text-center"
              >
                <div className="text-4xl font-bold text-navy">{stat.value}</div>
                <div className="mt-2 text-sm text-gray">{stat.label}</div>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-16">
            <div className="text-sm font-semibold uppercase tracking-wider text-gray">
              Industrias donde operamos
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-border bg-light-blue/50 px-4 py-2 text-sm font-medium text-navy"
                >
                  Consultoría para {industry.toLowerCase()}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Liderazgo
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              El equipo detrás del método.
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <motion.div
                key={member.role}
                variants={staggerItem}
                className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card p-6 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-light-blue">
                  <User className="h-7 w-7 text-blue" />
                </div>
                <div className="mt-4 text-sm font-semibold text-navy">
                  {member.role}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Foto y nombre pendientes
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Confianza
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Empresas que han confiado en Cyrrus.
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex h-16 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-xs text-muted-foreground"
              >
                Logo cliente
              </motion.div>
            ))}
          </RevealGroup>
          <p className="mt-4 text-xs text-muted-foreground">
            Logos pendientes — se cargarán en{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              public/assets/logos-clientes/
            </code>
            .
          </p>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
