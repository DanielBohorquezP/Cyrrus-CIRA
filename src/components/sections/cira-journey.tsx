import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/reveal";
import { BorderButton } from "@/components/ui/border-button";

const steps = [
  {
    letter: "C",
    word: "Construir",
    title: "La estrategia",
    description: "Diagnóstico del negocio y una hoja de ruta accionable.",
  },
  {
    letter: "I",
    word: "Identificar",
    title: "La mejor solución",
    description: "Evaluación 100% agnóstica de proveedores tecnológicos.",
  },
  {
    letter: "R",
    word: "Realizar",
    title: "El proyecto",
    description: "Gobierno de proyecto y aseguramiento de calidad.",
  },
  {
    letter: "A",
    word: "Adoptar",
    title: "El cambio",
    description: "Gestión del cambio integrada desde el día uno.",
  },
];

export function CiraJourney() {
  return (
    <section className="w-full bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue">
            Método CIRA
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Cómo lo hacemos, paso a paso
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-0"
        >
          {steps.map((step, index) => (
            <div
              key={step.letter}
              className="border-border px-0 md:px-8 md:first:pl-0 md:[&:not(:first-child)]:border-l"
            >
              <span
                className="block text-5xl font-bold leading-none text-light-blue"
                style={{ WebkitTextStroke: "1.5px var(--blue)" }}
              >
                {step.letter}
              </span>
              <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-gray">
                {step.word}
              </span>
              <h3 className="mt-1.5 text-lg font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-gray">
                {step.description}
              </p>
              <span className="sr-only">Paso {index + 1} de 4</span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-16 text-center">
          <BorderButton asChild variant="dark" size="lg" dot>
            <Link to="/metodo-cira">
              Conoce la metodología a fondo
            </Link>
          </BorderButton>
        </Reveal>
      </div>
    </section>
  );
}
