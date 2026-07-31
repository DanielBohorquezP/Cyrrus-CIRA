import { Reveal } from "@/components/ui/reveal";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhaseSectionProps {
  id: string;
  letter: string;
  title: string;
  question: string;
  service: string;
  problem: string;
  how: string;
  outcome: string;
  aiAccelerator: string;
  keywords: string[];
  reverse?: boolean;
}

export function PhaseSection({
  id,
  letter,
  title,
  question,
  service,
  problem,
  how,
  outcome,
  aiAccelerator,
  keywords,
  reverse = false,
}: PhaseSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-20 md:py-24 scroll-mt-20",
        reverse ? "bg-light-blue/40" : "bg-background"
      )}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <Reveal>
            <div className="flex md:flex-col items-center md:items-start gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy text-2xl font-bold text-white">
                {letter}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                {service}
              </span>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                {title}
              </h2>
              <p className="mt-2 text-sm font-medium text-gray">{question}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground">
                {problem}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-navy">
                  Cómo trabajamos
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray">{how}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-navy">
                  Qué obtiene su organización
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray">
                  {outcome}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 flex gap-4 rounded-2xl border border-navy/10 bg-navy p-6">
                <Sparkles className="h-5 w-5 shrink-0 text-cyan" />
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan">
                    Cómo acelera la IA esta fase
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    {aiAccelerator}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-6 flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {kw}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
