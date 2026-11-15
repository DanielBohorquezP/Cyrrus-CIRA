import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
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
    <section className="cv-section section-y w-full bg-background">
      <div className="container-site">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>{t("ciraJourney.title")}</Eyebrow>
            <h2 className="t-h2 mt-6 text-navy">{t("ciraJourney.eyebrow")}</h2>
          </div>
          <BorderButton asChild variant="dark" dot className="h-[52px]">
            <Link to={lang === "en" ? "/en/metodo-cira" : "/metodo-cira"}>
              {t("ciraJourney.buttonText")}
            </Link>
          </BorderButton>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-[72px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] border-l border-line"
        >
          {steps.map((step, index) => (
            <div key={step.letter} className="border-r border-line px-8 py-2">
              <span className="cira-initial-outline block font-heading text-[clamp(88px,9vw,120px)] font-bold leading-none tracking-[-0.04em] text-light-blue">
                {step.letter}
              </span>
              <p className="mt-5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-cyan-ink">
                {t("ciraJourney.stepOf", { n: index + 1 })}
                <span aria-hidden="true"> · </span>
                {step.word}
              </p>
              <h3 className="mt-2.5 font-heading text-[21px] font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-[17px] leading-[1.65] text-slate">{step.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
