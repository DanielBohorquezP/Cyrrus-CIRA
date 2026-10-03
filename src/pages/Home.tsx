import { useTranslation } from "react-i18next";
import { langPath, useLang } from "@/lib/language";
import { usePageMeta } from "@/lib/use-page-meta";
import { ShaderHero } from "@/components/ui/shader-hero";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { TransparentHeader } from "@/components/layout/transparent-header";
import { HeroServicesTabs } from "@/components/sections/hero-services-tabs";
import { TrustBar } from "@/components/sections/trust-bar";
import { CyrrusAbout } from "@/components/sections/cyrrus-about";
import { CiraJourney } from "@/components/sections/cira-journey";
import { WhyCyrrus } from "@/components/sections/why-cyrrus";
import { Testimonials } from "@/components/sections/testimonials";
import { CeoSection } from "@/components/sections/ceo-section";
import { Experience } from "@/components/sections/experience";
import { FaqSection, type FaqItem } from "@/components/sections/faq-section";
import { PerspectivasPreview } from "@/components/sections/perspectivas-preview";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { useContactWizard } from "@/lib/contact-wizard-context";

export default function Home() {
  const { t } = useTranslation("home");
  const lang = useLang();
  const { openWizard } = useContactWizard();
  const faqs = t("faq.items", { returnObjects: true }) as FaqItem[];

  const siteUrl = "https://cyrruscs.com";
  const pagePath = lang === "en" ? "/en" : "/";

  usePageMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    alternatePath: lang === "en" ? "/" : "/en",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${siteUrl}${pagePath}#webpage`,
        url: `${siteUrl}${pagePath}`,
        name: t("meta.title"),
        description: t("meta.description"),
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        inLanguage: lang === "en" ? "en" : "es",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${siteUrl}${pagePath}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  });

  return (
    <>
      <div className="relative">
        <TransparentHeader />
        <ShaderHero
          eyebrow={t("hero.eyebrow")}
          titleAccent={t("hero.titleAccent")}
          titleBold={t("hero.titleBold")}
          titleLight={t("hero.titleLight")}
          subtitle={t("hero.subtitle")}
          primaryButtonText={t("hero.primaryButtonText")}
          onPrimaryButtonClick={openWizard}
          secondaryButtonText={t("hero.secondaryButtonText")}
          secondaryButtonHref={langPath("/metodo-cira", lang)}
          badgeText={t("hero.badgeText")}
        />
      </div>
      <TrustBar />
      <AnimatedNavyBackground
        id="servicios"
        className="cv-section px-6 py-14 md:px-12 [--cv-h:1000px]"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-wider text-cyan">
              {t("servicesIntro.eyebrow")}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {t("servicesIntro.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              {t("servicesIntro.description")}
            </p>
          </div>
          <HeroServicesTabs />
        </div>
      </AnimatedNavyBackground>
      <WhyCyrrus />
      <CyrrusAbout />
      <CiraJourney />
      <Testimonials />
      <CeoSection />
      <Experience />
      <FaqSection
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        faqs={faqs}
      />
      <PerspectivasPreview />
      <FinalCta />
      <Footer />
    </>
  );
}
