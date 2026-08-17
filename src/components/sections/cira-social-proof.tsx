import { useTranslation } from "react-i18next";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";

interface Stat {
  value: string;
  label: string;
}

export function CiraSocialProof() {
  const { t } = useTranslation("metodo-cira");
  const stats = t("socialProof.stats", { returnObjects: true }) as Stat[];

  return (
    <AnimatedNavyBackground className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
        <Reveal>
          <span className="text-sm font-bold uppercase tracking-wider text-cyan">
            {t("socialProof.eyebrow")}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            {t("socialProof.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            {t("socialProof.description")}
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="px-4">
              <dd className="bg-gradient-to-br from-cyan to-white bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
                {stat.value}
              </dd>
              <span className="mt-3 block text-base leading-relaxed text-white/70">
                {stat.label}
              </span>
              <span className="mx-auto mt-4 block h-[3px] w-9 rounded-full bg-cyan" />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.2} className="mt-14">
          <ContactCtaButton variant="light" label={t("socialProof.ctaLabel")} />
        </Reveal>
      </div>
    </AnimatedNavyBackground>
  );
}
