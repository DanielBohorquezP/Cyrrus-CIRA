import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export function Testimonials() {
  const { t } = useTranslation("home");
  const testimonials = t("testimonials.items", { returnObjects: true }) as Testimonial[];

  return (
    <section className="cv-section w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="max-w-2xl">
          <span className="text-base font-bold uppercase tracking-wider text-blue">
            {t("testimonials.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {t("testimonials.title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealItem
              as="figure"
              key={t.author}
              index={i}
              className="flex flex-col rounded-2xl border border-border bg-card p-8"
            >
              <Quote className="h-6 w-6 text-cyan-ink" strokeWidth={2.5} />
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-semibold text-navy">
                  {t.author}
                </div>
                <div className="text-sm text-gray">{t.company}</div>
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
