import { useTranslation } from "react-i18next";
import { FaqSection, type FaqItem } from "@/components/sections/faq-section";

export function CiraFaq() {
  const { t } = useTranslation("metodo-cira");
  const faqs = t("faq.items", { returnObjects: true }) as FaqItem[];

  return <FaqSection layout="split" eyebrow={t("faq.eyebrow")} title={t("faq.title")} faqs={faqs} className="bg-background" />;
}
