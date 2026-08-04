import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/reveal";
import { BorderButton } from "@/components/ui/border-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";

export function FinalCta() {
  return (
    <AnimatedNavyBackground id="contacto" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Listo para conectar la decisión con la ejecución?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Complete el formulario y coordinamos una llamada con el equipo
            adecuado del lado de Cyrrus para hablar del reto de su
            organización.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <BorderButton asChild variant="light" size="lg" className="mt-8" dot>
            <Link to="/contacto#formulario">
              Agendar conversación estratégica
            </Link>
          </BorderButton>
        </Reveal>
      </div>
    </AnimatedNavyBackground>
  );
}
