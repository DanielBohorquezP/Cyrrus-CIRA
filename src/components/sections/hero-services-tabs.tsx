import { useTranslation } from "react-i18next";
import { TabbedPanels, type TabPanel } from "@/components/ui/tabbed-panels";

const images = [
  "/assets/decoracion/IMG_20200313_092643427.jpg",
  "/assets/decoracion/Cyrrus.jpg",
  "/assets/decoracion/IMG_20230228_091011.jpg",
];

export function HeroServicesTabs() {
  const { t } = useTranslation("home");
  const panels = t("servicesTabs.panels", { returnObjects: true }) as TabPanel[];
  const panelsWithImages = panels.map((panel, index) => ({
    ...panel,
    image: images[index],
  }));

  return <TabbedPanels panels={panelsWithImages} />;
}
