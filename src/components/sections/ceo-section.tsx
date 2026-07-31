import { Reveal } from "@/components/ui/reveal";

export function CeoSection() {
  return (
    <section className="w-full bg-navy py-24 md:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 text-center md:px-12">
        <Reveal>
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80"
            alt="CEO de Cyrrus Consulting Services"
            className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white/10"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="text-2xl font-medium leading-snug text-white sm:text-3xl">
            "Las organizaciones no fallan por falta de estrategia ni de
            tecnología. Fallan cuando nadie conecta la decisión con la
            ejecución. CIRA existe para cerrar exactamente esa brecha."
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <div>
            <div className="text-sm font-semibold text-white">
              CEO &amp; Fundador
            </div>
            <div className="text-sm text-white/60">
              Cyrrus Consulting Services
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
