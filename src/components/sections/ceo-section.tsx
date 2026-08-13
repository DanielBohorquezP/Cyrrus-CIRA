import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";

export function CeoSection() {
  const { t } = useTranslation("home");
  return (
    <AnimatedNavyBackground className="py-24 md:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 text-center md:px-12">
        <Reveal>
          <img
            src="/assets/decoracion/JacksonCEO1.jpeg"
            alt={t("ceo.photoAlt")}
            width={96}
            height={96}
            loading="eager"
            className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white/10"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="text-2xl font-medium leading-snug text-white sm:text-3xl">
            {t("ceo.quote")}
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <div>
            <div className="text-sm font-semibold text-white">
              {t("ceo.name")}
            </div>
            <div className="text-sm text-white/60">
              {t("ceo.role")}
            </div>
          </div>
        </Reveal>
      </div>
    </AnimatedNavyBackground>
  );
}
