import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/reveal";
import { BorderButton } from "@/components/ui/border-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { useContactWizard } from "@/lib/contact-wizard-context";
import { langPath, useLang } from "@/lib/language";

/** `showDiagnostic` is turned off on the diagnostic page itself, which would otherwise link to itself. */
export function FinalCta({ showDiagnostic = true }: { showDiagnostic?: boolean }) {
  const { t } = useTranslation("home");
  const lang = useLang();
  const { openWizard } = useContactWizard();
  return (
    <AnimatedNavyBackground id="contacto" className="cv-section section-y">
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-24 gap-y-12">
        <Reveal>
          <h2 className="font-heading text-[clamp(34px,4.4vw,60px)] font-bold leading-[1.06] tracking-[-0.03em] text-balance text-white">
            {t("finalCta.title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-lead text-white/80">{t("finalCta.description")}</p>
          <BorderButton variant="light" size="lg" className="mt-9" dot onClick={() => openWizard()}>
            {t("finalCta.buttonText")}
          </BorderButton>
          {showDiagnostic && (
            <p className="mt-7 text-base text-white/70">
              {`${t("finalCta.diagnosticText")} `}<Link
                to={langPath("/diagnostico", lang)}
                className="font-bold text-white underline underline-offset-4"
              >
                {t("finalCta.diagnosticLink")}
              </Link>
            </p>
          )}
        </Reveal>
      </div>
    </AnimatedNavyBackground>
  );
}
