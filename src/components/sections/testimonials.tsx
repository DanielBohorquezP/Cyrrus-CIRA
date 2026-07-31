import { Quote } from "lucide-react";
import { RevealGroup, staggerItem } from "@/components/ui/reveal";
import { Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Cyrrus no llegó con un catálogo de herramientas. Llegó con un método claro que conectó nuestra estrategia con la ejecución, algo que ningún proveedor anterior había logrado.",
    author: "VP de Operaciones",
    company: "Grupo industrial, sector manufactura",
  },
  {
    quote:
      "La diferencia estuvo en la velocidad: lo que normalmente nos tomaba meses de selección de proveedores, con Cyrrus lo resolvimos en semanas gracias a su forma de evaluar en paralelo.",
    author: "Director de Tecnología",
    company: "Compañía de servicios financieros",
  },
  {
    quote:
      "El proyecto no solo se implementó — el equipo lo adoptó. Eso fue lo que realmente cambió el resultado frente a intentos anteriores.",
    author: "Gerente de Transformación",
    company: "Empresa de energía, LATAM",
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue">
            Resultados que hablan
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            La promesa, convertida en prueba.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.figure
              key={t.author}
              variants={staggerItem}
              className="flex flex-col rounded-2xl border border-border bg-card p-8"
            >
              <Quote className="h-6 w-6 text-cyan" strokeWidth={2.5} />
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-semibold text-navy">
                  {t.author}
                </div>
                <div className="text-sm text-gray">{t.company}</div>
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
