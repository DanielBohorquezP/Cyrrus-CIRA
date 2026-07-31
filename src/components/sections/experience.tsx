import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";

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

export function Experience() {
  return (
    <section id="experiencia" className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue">
            Experiencia
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Presencia multinacional, criterio local.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
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

        <Reveal delay={0.15} className="mt-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-gray">
            Industrias donde operamos
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-border bg-light-blue/50 px-4 py-2 text-sm font-medium text-navy"
              >
                {industry}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-16 border-t border-border pt-12">
          <div className="text-sm font-semibold uppercase tracking-wider text-gray">
            Empresas que han confiado en Cyrrus
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex h-16 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-xs text-muted-foreground"
              >
                Logo cliente
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Logos pendientes — se cargarán en{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              public/assets/logos-clientes/
            </code>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
