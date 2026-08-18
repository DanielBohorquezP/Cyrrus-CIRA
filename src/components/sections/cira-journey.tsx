import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/reveal";
import { BorderButton } from "@/components/ui/border-button";
import { useLang } from "@/lib/language";

interface Step {
  letter: string;
  word: string;
  title: string;
  description: string;
}

export function CiraJourney() {
  const { t } = useTranslation("home");
  const lang = useLang();
  const steps = t("ciraJourney.steps", { returnObjects: true }) as Step[];

  return (
    <section className="cv-section w-full bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue">
            {t("ciraJourney.title")}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            {t("ciraJourney.eyebrow")}
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
              <span className="cira-initial-outline block text-5xl font-bold leading-none text-light-blue">
                {step.letter}
              </span>
              <span className="mt-5 block text-sm font-bold uppercase tracking-wider text-gray">
                {step.word}
              </span>
              <h3 className="mt-1.5 text-lg font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-gray">
                {step.description}
              </p>
              <span className="sr-only">{t("ciraJourney.stepOf", { n: index + 1 })}</span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-16 text-center">
          <BorderButton asChild variant="dark" size="lg" dot>
            <Link to={lang === "en" ? "/en/metodo-cira" : "/metodo-cira"}>
              {t("ciraJourney.buttonText")}
            </Link>
          </BorderButton>
        </Reveal>
      </div>
    </section>
  );
}
