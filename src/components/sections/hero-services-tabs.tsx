import { useTranslation } from "react-i18next";
import { TabbedPanels, type TabPanel } from "@/components/ui/tabbed-panels";
import { langPath, useLang } from "@/lib/language";

// WebP, resized to ~2x the 552x288 slot they render in. One per tab, same
// order as servicesTabs.panels in home.json.
const images = [
  "/assets/decoracion/IMG_20200313_092643427.webp",
  "/assets/decoracion/evento-panel-universidad-bolivar.jpeg",
  "/assets/decoracion/IMG_20200313_092701647.jpg",
  "/assets/decoracion/1785866331023.jpg",
  "/assets/decoracion/Cyrrus.webp",
  "/assets/decoracion/IMG_20230228_091011.webp",
];

export function HeroServicesTabs() {
  const { t } = useTranslation("home");
  const lang = useLang();
  const panels = t("servicesTabs.panels", { returnObjects: true }) as TabPanel[];
  // hrefs come from the locale files as canonical Spanish paths; the
  // language prefix belongs to routing, not to translation data.
  const panelsWithImages = panels.map((panel, index) => ({
    ...panel,
    href: langPath(panel.href, lang),
    image: images[index],
  }));

  return <TabbedPanels panels={panelsWithImages} />;
}
