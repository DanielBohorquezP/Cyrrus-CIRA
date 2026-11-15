import { useTranslation } from "react-i18next";
import { langPath, useLang } from "@/lib/language";
import { usePageMeta } from "@/lib/use-page-meta";
import { ShaderHero } from "@/components/ui/shader-hero";
import { SectionHeader } from "@/components/ui/section-header";
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
      <TransparentHeader />
      <main id="contenido">
      <div className="relative">
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
          metrics={t("trustBar.metrics", { returnObjects: true }) as { value: string; label: string }[]}
        />
      </div>
      <TrustBar />
      <section id="servicios" className="cv-section section-y [--cv-h:1000px]">
        <div className="container-site">
          <SectionHeader
            eyebrow={t("servicesIntro.eyebrow")}
            title={t("servicesIntro.title")}
            description={t("servicesIntro.description")}
            align="start"
          />
          <div className="mt-20">
            <HeroServicesTabs />
          </div>
        </div>
      </section>
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
        layout="split"
      />
      <PerspectivasPreview />
      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
