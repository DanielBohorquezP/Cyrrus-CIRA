import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Compass, Cpu, GraduationCap } from "lucide-react";
import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

const levels = [
  {
    id: "metodo-cira",
    level: "Nivel 1",
    icon: Compass,
    title: "Método CIRA",
    description:
      "El negocio: qué se logra. Construir · Identificar · Realizar · Adoptar — el ciclo completo de toda transformación, de punta a punta.",
    href: "/metodo-cira",
    emphasis: true,
  },
  {
    id: "intelligence-lab",
    level: "Nivel 2",
    icon: Cpu,
    title: "Cyrrus Intelligence Lab",
    description:
      "El cómo: gobierno y arquitectura de inteligencia artificial, corriendo de forma transversal a las 4 fases de CIRA.",
    href: "/intelligence-lab",
    emphasis: false,
  },
  {
    id: "leadership-academy",
    level: "Nivel 3",
    icon: GraduationCap,
    title: "Leadership Academy",
    description:
      "Quién lo sostiene: el equipo del cliente aprende a operar bajo el mismo modelo de gobierno, para que la velocidad no dependa solo de Cyrrus.",
    href: "/leadership-academy",
    emphasis: false,
  },
];

export function ThreeLevels() {
  return (
    <section className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue">
            Cómo trabajamos
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Un modelo, no una lista de servicios sueltos.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray">
            El negocio manda, el método lo estructura, la IA lo acelera y la
            Academia lo sostiene en el tiempo.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {levels.map((item) => {
            const Icon = item.icon;
            return (
              <MotionLink
                key={item.title}
                to={item.href}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={cn(
                  "group relative flex flex-col rounded-2xl border p-8 shadow-sm transition-colors",
                  item.emphasis
                    ? "border-navy/10 bg-navy text-white"
                    : "border-border bg-card text-card-foreground hover:border-blue/30"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    item.emphasis ? "bg-white/10" : "bg-light-blue"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6",
                      item.emphasis ? "text-cyan" : "text-blue"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "mt-6 text-xs font-semibold uppercase tracking-wider",
                    item.emphasis ? "text-cyan" : "text-blue"
                  )}
                >
                  {item.level}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p
                  className={cn(
                    "mt-3 flex-1 text-sm leading-relaxed",
                    item.emphasis ? "text-white/75" : "text-gray"
                  )}
                >
                  {item.description}
                </p>
                <div
                  className={cn(
                    "mt-6 flex items-center gap-1.5 text-sm font-medium",
                    item.emphasis ? "text-white" : "text-navy"
                  )}
                >
                  Conocer más
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </MotionLink>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
