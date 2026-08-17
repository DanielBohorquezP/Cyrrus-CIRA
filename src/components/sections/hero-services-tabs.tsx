import { useTranslation } from "react-i18next";
import { TabbedPanels, type TabPanel } from "@/components/ui/tabbed-panels";

// WebP, resized to ~2x the 552x288 slot they render in. The originals were
// full-resolution JPEGs (1536x1024 and 1600x720, 298 KB combined) being scaled
// down in the browser.
const images = [
  "/assets/decoracion/IMG_20200313_092643427.webp",
  "/assets/decoracion/Cyrrus.webp",
  "/assets/decoracion/IMG_20230228_091011.webp",
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
