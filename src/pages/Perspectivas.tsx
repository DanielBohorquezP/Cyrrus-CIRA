import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
import { SiteHeader } from "@/components/layout/site-header";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Blog7 } from "@/components/ui/blog7";
import { upcomingTopics } from "@/lib/perspectivas-topics";

export default function Perspectivas() {
  const { t } = useTranslation("paginas");
  const lang = useLang();

  usePageMeta({
    title: t("perspectivas.meta.title"),
    description: t("perspectivas.meta.description"),
    alternatePath: lang === "en" ? "/perspectivas" : "/en/perspectivas",
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
        buttonUrl="/contacto"
        posts={upcomingTopics}
      />

      <FinalCta />
      <Footer />
    </>
  );
}
