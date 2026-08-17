import { useTranslation } from "react-i18next";
import { Layers, Users, Zap } from "lucide-react";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";

interface Reason {
  title: string;
  description: string;
}

const icons = [Layers, Zap, Users];

export function WhyCyrrus() {
  const { t } = useTranslation("home");
  const reasons = t("whyCyrrus.reasons", { returnObjects: true }) as Reason[];

  return (
    <section className="cv-section w-full bg-light-blue/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-base font-bold uppercase tracking-wider text-blue">
            {t("whyCyrrus.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {t("whyCyrrus.title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = icons[index];
            return (
              <RevealItem
                key={reason.title}
                index={index}
                className="flex flex-col items-start"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy">
                  <Icon className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-navy">
                  {reason.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray">
                  {reason.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
