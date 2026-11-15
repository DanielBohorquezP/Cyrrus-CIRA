import { useTranslation } from "react-i18next";
import { CyrrusGlobe } from "@/components/sections/cyrrus-globe";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

function RuledList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="border-b-2 border-navy pb-4 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-navy">
        {label}
      </p>
      <ul className="grid grid-cols-2 gap-x-6">
        {items.map((item) => (
          <li key={item} className="border-b border-line py-2.5 text-base text-slate">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Experience() {
  const { t } = useTranslation("home");
  const countries = t("experience.countries", { returnObjects: true }) as string[];
  const industries = t("experience.industries", { returnObjects: true }) as string[];

  return (
    <section id="experiencia" className="cv-section section-y w-full bg-background">
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-x-24 gap-y-16">
        <Reveal>
          <Eyebrow>{t("experience.eyebrow")}</Eyebrow>
          <h2 className="t-h2 mt-6 text-navy">{t("experience.title")}</h2>
          <p className="t-lead mt-6 text-slate">{t("experience.subtitle")}</p>
          <p className="mt-6 text-sm text-slate">{t("experience.footerNote")}</p>
          <div className="mt-10 w-full max-w-[440px]">
            <CyrrusGlobe />
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] content-start gap-12"
        >
          <RuledList label={t("experience.paisesLabel")} items={countries} />
          <RuledList label={t("experience.sectoresLabel")} items={industries} />
        </Reveal>
      </div>
    </section>
  );
}
