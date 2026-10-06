import { useTranslation } from "react-i18next";
import { Building2, Globe2 } from "lucide-react";
import { CyrrusGlobe } from "@/components/sections/cyrrus-globe";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  const { t } = useTranslation("home");
  const countries = t("experience.countries", { returnObjects: true }) as string[];
  const industries = t("experience.industries", { returnObjects: true }) as string[];

  return (
    <section id="experiencia" className="cv-section w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-base font-bold uppercase tracking-wider text-blue">
            {t("experience.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {t("experience.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray">
            {t("experience.subtitle")}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-6 w-full max-w-xl">
          <CyrrusGlobe />
        </Reveal>

        <div className="mx-auto mt-4 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-navy">
                <Globe2 className="h-5 w-5 text-cyan" />
              </div>
              <div>
                <div className="text-4xl font-bold tracking-tight text-navy">
                  15+
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-blue">
                  {t("experience.paisesLabel")}
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {countries.map((country) => (
                <span
                  key={country}
                  className="rounded-full bg-light-blue px-3 py-1 text-xs font-medium text-navy"
                >
                  {country}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-navy">
                <Building2 className="h-5 w-5 text-cyan" />
              </div>
              <div>
                <div className="text-4xl font-bold tracking-tight text-navy">
                  {industries.length}
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-blue">
                  {t("experience.sectoresLabel")}
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full bg-light-blue px-3 py-1 text-xs font-medium text-navy"
                >
                  {industry}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <p className="mt-10 text-center text-sm text-gray">
          {t("experience.footerNote")}
        </p>
      </div>
    </section>
  );
}
