import { FeatureSteps } from "@/components/ui/feature-section";

const ciraFeatures = [
  {
    step: "C",
    title: "Construir la estrategia",
    content:
      "Diagnóstico profundo del negocio y una hoja de ruta accionable — IA aplicada al análisis de datos para decisiones más rápidas y mejor fundamentadas.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80",
  },
  {
    step: "I",
    title: "Identificar la mejor solución",
    content:
      "Evaluación 100% agnóstica de proveedores tecnológicos — IA que compara opciones en paralelo, reduciendo drásticamente los tiempos de selección.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
  },
  {
    step: "R",
    title: "Realizar el proyecto",
    content:
      "Gobierno de proyecto y aseguramiento de calidad — agentes que monitorean el riesgo en tiempo real y anticipan desviaciones antes de que escalen.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
  },
  {
    step: "A",
    title: "Adoptar el cambio",
    content:
      "Gestión del cambio integrada desde el día uno — IA que mide el clima organizacional y la curva de adopción de forma continua.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80",
  },
];

export function CiraJourney() {
  return (
    <section className="w-full bg-background">
      <FeatureSteps
        features={ciraFeatures}
        title="El ciclo CIRA, paso a paso"
        autoPlayInterval={4000}
      />
    </section>
  );
}
