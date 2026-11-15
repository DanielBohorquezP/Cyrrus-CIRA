import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { getWorkshopBySlug } from "@/lib/workshops-data";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { ServiceBody } from "@/components/sections/service-body";
import { BorderButton } from "@/components/ui/border-button";
import { useContactWizard } from "@/lib/contact-wizard-context";
import { trackEvent } from "@/lib/analytics";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/leadership-academy";

interface WorkshopTranslation {
  title: string;
  shortDescription: string;
  intro: string;
  body: string[];
}

export default function CursoDetalle() {
  const { curso } = useParams();
  const { t } = useTranslation("leadership-academy");
  const lang = useLang();
  const { openWizard } = useContactWizard();
  const prefix = lang === "en" ? "/en" : "";
  const entry = getWorkshopBySlug(curso);
  const tr = entry ? (t(`workshops.${entry.slug}`, { returnObjects: true }) as WorkshopTranslation) : undefined;

  const siteUrl = "https://cyrruscs.com";
  const homePath = lang === "en" ? "/en" : "/";
  const hubPath = lang === "en" ? "/en/leadership-academy" : "/leadership-academy";
  const pagePath = entry ? `${prefix}/leadership-academy/${entry.slug}` : hubPath;

  usePageMeta({
    title: tr?.title ? `${tr.title} | Cyrrus` : "Leadership Academy | Cyrrus",
    description: tr?.intro ?? "",
    noindex: entry?.comingSoon,
    alternatePath: entry
      ? lang === "en"
        ? `/leadership-academy/${entry.slug}`
        : `/en/leadership-academy/${entry.slug}`
      : undefined,
    jsonLd:
      entry && tr
        ? [
            ...(entry.comingSoon
              ? []
              : [
                  {
                    "@context": "https://schema.org",
                    "@type": "Course",
                    "@id": `${siteUrl}${pagePath}#course`,
                    url: `${siteUrl}${pagePath}`,
                    name: tr.title,
                    provider: { "@id": `${siteUrl}/#organization` },
                    description: tr.intro,
                    areaServed: "Worldwide",
                  },
                ]),
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: `${siteUrl}${homePath}` },
                { "@type": "ListItem", position: 2, name: "Leadership Academy", item: `${siteUrl}${hubPath}` },
                { "@type": "ListItem", position: 3, name: tr.title, item: `${siteUrl}${pagePath}` },
              ],
            },
          ]
        : undefined,
  });

  if (!entry || !tr) return <Navigate to={hubPath} replace />;

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Inicio", href: homePath },
    { label: "Leadership Academy", href: hubPath },
    { label: tr.title },
  ];

  return (
    <>
      <SiteHeader />
      <main id="contenido">
      <PageHero eyebrow={entry.eyebrow} title={tr.title} description={tr.intro} breadcrumbs={breadcrumbItems} />
      <ServiceBody
        className="bg-background"
        paragraphs={tr.body}
        image={{
          src: "/assets/decoracion/IMG_20200313_092604173.jpg",
          alt: "Taller de formación con un grupo de participantes en un salón",
        }}
      >
        <BorderButton
          type="button"
          variant="dark"
          size="lg"
          dot
          className="mt-3"
          onClick={() => {
            trackEvent("workshop_interest_click", { workshop: entry.slug });
            openWizard({ servicio: `leadership-academy-${entry.slug}` });
          }}
        >
          {t("hub.workshopsSection.interestCta")}
        </BorderButton>
      </ServiceBody>
      <FinalCta />
      </main>
      <Footer />
    </>
  );
}
