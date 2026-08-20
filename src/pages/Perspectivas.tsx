import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Blog7 } from "@/components/ui/blog7";
import { upcomingTopics } from "@/lib/perspectivas-topics";
import { useContactWizard } from "@/lib/contact-wizard-context";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/paginas";

export default function Perspectivas() {
  const { t } = useTranslation("paginas");
  const lang = useLang();
  const { openWizard } = useContactWizard();

  const siteUrl = "https://www.cyrruscs.com";
  const pagePath = lang === "en" ? "/en/perspectivas" : "/perspectivas";

  usePageMeta({
    title: t("perspectivas.meta.title"),
    description: t("perspectivas.meta.description"),
    alternatePath: lang === "en" ? "/perspectivas" : "/en/perspectivas",
    // TODO: remove noindex once real articles are published on this page.
    noindex: true,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${siteUrl}${pagePath}#blog`,
        url: `${siteUrl}${pagePath}`,
        name: t("perspectivas.meta.title"),
        description: t("perspectivas.meta.description"),
        publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: lang === "en" ? "en" : "es",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${lang === "en" ? "/en" : "/"}` },
          { "@type": "ListItem", position: 2, name: t("perspectivas.meta.title"), item: `${siteUrl}${pagePath}` },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />

      <Blog7
        tagline={t("perspectivas.tagline")}
        headingAs="h1"
        heading={t("perspectivas.heading")}
        description={t("perspectivas.description")}
        buttonText={t("perspectivas.buttonText")}
        onButtonClick={openWizard}
        posts={upcomingTopics}
      />

      <FinalCta />
      <Footer />
    </>
  );
}
