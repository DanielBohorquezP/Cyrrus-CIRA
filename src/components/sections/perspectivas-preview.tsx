import { useTranslation } from "react-i18next";
import { Blog7 } from "@/components/ui/blog7";
import { upcomingTopics } from "@/lib/perspectivas-topics";

export function PerspectivasPreview() {
  const { t } = useTranslation("home");
  return (
    <Blog7
      tagline={t("perspectivasPreview.tagline")}
      heading={t("perspectivasPreview.heading")}
      description={t("perspectivasPreview.description")}
      buttonText={t("perspectivasPreview.buttonText")}
      buttonUrl="/perspectivas"
      posts={upcomingTopics.slice(0, 4)}
    />
  );
}
