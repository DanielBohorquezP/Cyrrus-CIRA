import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section id="contacto" className="w-full bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Listo para conectar la decisión con la ejecución?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Agende una conversación estratégica con nuestro equipo. Sin
            formularios genéricos — una conversación real sobre el reto de su
            organización.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Button
            asChild
            size="lg"
            className="mt-8 gap-2 bg-white text-navy hover:bg-white/90"
          >
            <Link to="/contacto">
              Agendar conversación estratégica
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
