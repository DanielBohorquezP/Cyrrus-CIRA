import { Layers, Users, Zap } from "lucide-react";
import { RevealGroup, staggerItem, Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Layers,
    title: "Un solo método, de punta a punta",
    description:
      "El negocio no se fragmenta entre proveedores distintos para cada fase. Estrategia, selección, ejecución y adopción bajo un mismo ciclo.",
  },
  {
    icon: Zap,
    title: "Velocidad radical vía IA en cada fase",
    description:
      "Gobierno, arquitectura y agentes integrados en Strategy, Select, Project Management y Change Management — no como servicio aparte.",
  },
  {
    icon: Users,
    title: "Capacidad que se queda en el cliente",
    description:
      "Leadership Academy garantiza que la velocidad no dependa solo de Cyrrus: su equipo aprende a operar bajo el mismo modelo.",
  },
];

export function WhyCyrrus() {
  return (
    <section className="w-full bg-light-blue/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue">
            ¿Por qué Cyrrus?
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            No implementamos inteligencia artificial. Gobernamos cada fase de
            su transformación con ella.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={staggerItem}
                className="flex flex-col items-start"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy">
                  <Icon className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-navy">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
