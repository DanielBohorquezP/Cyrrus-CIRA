import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/reveal";
import { BorderButton } from "@/components/ui/border-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { langPath, useLang } from "@/lib/language";

export function FinalCta() {
  const { t } = useTranslation("home");
  const lang = useLang();
  return (
    <AnimatedNavyBackground id="contacto" className="cv-section py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            {t("finalCta.description")}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <BorderButton asChild variant="light" size="lg" className="mt-8" dot>
            <Link to={`${langPath("/contacto", lang)}#formulario`}>
              {t("finalCta.buttonText")}
            </Link>
          </BorderButton>
        </Reveal>
      </div>
    </AnimatedNavyBackground>
  );
}
