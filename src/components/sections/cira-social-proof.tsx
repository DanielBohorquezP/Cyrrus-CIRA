import { useTranslation } from "react-i18next";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { DarkStatBand, type Stat } from "@/components/ui/dark-stat-band";

export function CiraSocialProof() {
  const { t } = useTranslation("metodo-cira");
  const stats = t("socialProof.stats", { returnObjects: true }) as Stat[];

  return (
    <DarkStatBand
      eyebrow={t("socialProof.eyebrow")}
      title={t("socialProof.title")}
      description={t("socialProof.description")}
      stats={stats}
    >
      <ContactCtaButton variant="light" label={t("socialProof.ctaLabel")} />
    </DarkStatBand>
  );
}
