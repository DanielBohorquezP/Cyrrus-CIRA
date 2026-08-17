import { useTranslation } from "react-i18next";
import { Blog7 } from "@/components/ui/blog7";
import { upcomingTopics } from "@/lib/perspectivas-topics";
import { langPath, useLang } from "@/lib/language";

export function PerspectivasPreview() {
  const { t } = useTranslation("home");
  const lang = useLang();
  return (
    <Blog7
      tagline={t("perspectivasPreview.tagline")}
      heading={t("perspectivasPreview.heading")}
      description={t("perspectivasPreview.description")}
      buttonText={t("perspectivasPreview.buttonText")}
      buttonUrl={langPath("/perspectivas", lang)}
      posts={upcomingTopics.slice(0, 4)}
    />
  );
}
