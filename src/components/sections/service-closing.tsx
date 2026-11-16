import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Img } from "@/components/ui/img";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { langPath, useLang } from "@/lib/language";
import type { RelatedItem } from "@/components/sections/related-services";

interface ServiceClosingProps {
  eyebrow: string;
  items: RelatedItem[];
  ctaLabel?: string;
}

/** Closing band of a service page: related services as ruled rows, then the logo and the CTA. */
export function ServiceClosing({ eyebrow, items, ctaLabel }: ServiceClosingProps) {
  const { t } = useTranslation("home");
  const lang = useLang();
  return (
    <AnimatedNavyBackground id="contacto" className="cv-section section-y">
      <div className="container-site">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <RevealGroup className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] border-t border-white/25">
          {items.map((item, index) => (
            <RevealItem key={item.title}>
              <Link
                to={item.href}
                className="group flex h-full flex-col gap-3 border-b border-white/25 py-8 pr-8 text-white"
              >
                <span className="font-heading text-[13px] font-semibold text-sky">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-[22px] font-semibold group-hover:text-sky">{`${item.title} ↗`}</h3>
                {item.description && (
                  <p className="text-[17px] leading-[1.6] text-white/75">{item.description}</p>
                )}
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-[72px] flex flex-wrap items-center justify-between gap-6">
          <Img
            src="/assets/logos-cyrrus/cyrrus-logo-blanco.png"
            alt="Cyrrus"
            height={36}
            sizes="120px"
            className="h-9 w-auto"
          />
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <ContactCtaButton variant="light" label={ctaLabel} />
            <p className="text-base text-white/70">
              {`${t("finalCta.diagnosticText")} `}<Link
                to={langPath("/diagnostico", lang)}
                className="font-bold text-white underline underline-offset-4"
              >
                {t("finalCta.diagnosticLink")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AnimatedNavyBackground>
  );
}
