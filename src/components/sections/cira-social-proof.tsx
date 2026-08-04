import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";

const stats = [
  { value: "+17", label: "países con proyectos ejecutados" },
  { value: "100%", label: "agnósticos: sin sesgo comercial hacia ninguna marca" },
  { value: "60%", label: "más rápido el diagnóstico, con IA integrada al método" },
];

export function CiraSocialProof() {
  return (
    <AnimatedNavyBackground className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
            Método CIRA
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Cómo trabajamos
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            La mayoría de estos proyectos no fracasa por la tecnología. Fracasa por el
            sesgo de quien la vendió. Por eso definimos primero los requerimientos del
            negocio y solo después comparamos proveedores, con criterios objetivos y
            medibles — el mismo equipo acompaña las cuatro fases del ciclo, con
            inteligencia artificial acelerando cada tramo.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="px-4">
              <dd className="bg-gradient-to-br from-cyan to-white bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
                {stat.value}
              </dd>
              <span className="mt-3 block text-sm leading-relaxed text-white/70">
                {stat.label}
              </span>
              <span className="mx-auto mt-4 block h-[3px] w-9 rounded-full bg-cyan" />
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.2} className="mt-14">
          <ContactCtaButton variant="light" label="Agendar conversación" />
        </Reveal>
      </div>
    </AnimatedNavyBackground>
  );
}
