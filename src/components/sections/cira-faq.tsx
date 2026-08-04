import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Duración por fase",
    answer:
      "Depende del alcance y tamaño de la organización, pero como referencia: Construir (estrategia) suele tomar de 4 a 8 semanas, Identificar (selección de solución) de 6 a 12 semanas, Realizar (proyecto) varía según el proyecto ejecutado, y Adoptar (cambio) se trabaja de forma transversal desde el día uno.",
  },
  {
    question: "Contratación por fase, no todo o nada",
    answer:
      "Cada fase — Strategy, Select, Project Management y Change Management — se contrata de forma independiente. La mayoría de nuestros clientes empieza por una sola fase y expande el alcance cuando ve el resultado.",
  },
  {
    question: "Ya eligieron proveedor y no están seguros",
    answer:
      "Evaluamos la decisión con los mismos criterios objetivos, incluso si el proceso ya empezó. Somos 100% agnósticos: no tenemos alianzas comerciales ni comisiones con fabricantes de ERP, CRM, HCM u otras soluciones empresariales.",
  },
  {
    question: "Adopción, no otro piloto abandonado",
    answer:
      "La IA se mide con la misma disciplina de gobierno que el resto del método — no es una capa aparte. Acelera tareas dentro de cada fase: diagnóstico en Construir, evaluación paralela de proveedores en Identificar, monitoreo de riesgo en tiempo real en Realizar, y medición continua de adopción en Adoptar.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-navy/10 py-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-navy">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-cyan transition-transform duration-150 ease-out",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/70">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CiraFaq() {
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
            Método CIRA
          </span>
          <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">
            Preguntas frecuentes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <p className="text-base text-navy/70">¿Tiene otra pregunta?</p>
          <div className="mt-4">
            <ContactCtaButton label="Escríbanos" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
