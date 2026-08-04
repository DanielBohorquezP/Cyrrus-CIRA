import { TabbedPanels, type TabPanel } from "@/components/ui/tabbed-panels";

const panels: TabPanel[] = [
  {
    id: "consultoria-estrategica",
    tabLabel: "Consultoría Estratégica",
    eyebrow: "Consultoría de planeación estratégica",
    title: "Consultoría Estratégica",
    description:
      "Construimos la estrategia, seleccionamos la solución correcta y ejecutamos el proyecto sin fallar — el ciclo completo de consultoría, disponible también como CTO as a Service o CIO as a Service.",
    href: "/metodo-cira",
    buttonText: "Conocer el método CIRA",
    image:
      "/assets/decoracion/evento-planeacion-estrategica.jpeg",
  },
  {
    id: "ia-empresarial",
    tabLabel: "IA Empresarial",
    eyebrow: "Gobierno de IA corporativo",
    title: "Inteligencia Artificial Empresarial",
    description:
      "Gobierno y arquitectura de IA aplicados a procesos de negocio reales — la capa que acelera cada fase de su transformación, no un catálogo de chatbots sueltos.",
    href: "/intelligence-lab",
    buttonText: "Conocer Cyrrus Intelligence Lab",
    image:
      "/assets/decoracion/evento-ia-tecnologia.jpeg",
  },
  {
    id: "gestion-del-cambio",
    tabLabel: "Gestión del Cambio",
    eyebrow: "Gestión del cambio organizacional",
    title: "Gestión del Cambio y Liderazgo",
    description:
      "Talleres ejecutivos y capacitación gerencial para que la adopción de su transformación se sostenga en el tiempo, sin depender permanentemente de Cyrrus.",
    href: "/leadership-academy",
    buttonText: "Conocer Leadership Academy",
    image:
      "/assets/decoracion/evento-gestion-del-cambio.jpeg",
  },
];

export function HeroServicesTabs() {
  return <TabbedPanels panels={panels} />;
}
