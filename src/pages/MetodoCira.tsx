import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { PhaseSection } from "@/components/sections/phase-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";

const phases = [
  {
    id: "construir",
    letter: "C",
    title: "Construir la estrategia",
    question: "¿Hacia dónde vamos?",
    service: "Strategy",
    problem:
      "Se define una estrategia... pero nadie sabe cómo bajarla a la operación. Nuestra consultoría de planeación estratégica conecta la visión del negocio con un plan ejecutable, no con un documento que queda en un cajón.",
    how: "Diagnóstico profundo del negocio, definición de prioridades y hoja de ruta accionable — como CTO as a Service o CIO as a Service cuando la organización no tiene esa capacidad interna.",
    outcome:
      "Una estrategia de TI y transformación digital clara, priorizada y con métricas de éxito definidas desde el día uno.",
    aiAccelerator:
      "IA aplicada a diagnóstico y análisis de datos para decisiones estratégicas más rápidas y mejor fundamentadas.",
    keywords: [
      "consultoría de planeación estratégica",
      "CTO as a Service",
      "CIO as a Service",
    ],
  },
  {
    id: "identificar",
    letter: "I",
    title: "Identificar la mejor solución",
    question: "¿Con qué lo logramos?",
    service: "Select",
    problem:
      "Se compra tecnología por moda, no por ajuste real al negocio. Nuestra consultoría de selección de ERP y de software empresarial parte siempre de los requerimientos del negocio, no del catálogo del proveedor.",
    how: "Evaluación de proveedores tecnológicos 100% agnóstica, con criterios objetivos y comparables, sin sesgos comerciales hacia ninguna marca.",
    outcome:
      "La solución correcta para su organización, seleccionada en semanas y no en meses, con el riesgo de una mala decisión tecnológica minimizado.",
    aiAccelerator:
      "IA para evaluar proveedores y soluciones en paralelo, reduciendo drásticamente los tiempos de selección.",
    keywords: [
      "selección de software empresarial",
      "consultoría selección de ERP",
      "evaluación de proveedores tecnológicos",
    ],
    reverse: true,
  },
  {
    id: "realizar",
    letter: "R",
    title: "Realizar el proyecto",
    question: "¿Cómo lo ejecutamos sin fallar?",
    service: "Project Management",
    problem:
      "El proyecto se atrasa, se sale de presupuesto, nadie asume el riesgo. Nuestra gerencia de proyectos actúa como PMO externo, con responsabilidad real sobre el resultado.",
    how: "Gobierno de proyecto, aseguramiento de calidad y gestión de riesgo activa durante toda la ejecución — no solo reportes de estado.",
    outcome:
      "Un proyecto que se entrega en el tiempo y presupuesto acordado, con visibilidad total del avance en cada momento.",
    aiAccelerator:
      "Agentes que monitorean el riesgo del proyecto en tiempo real y anticipan desviaciones antes de que se conviertan en crisis.",
    keywords: [
      "gerencia de proyectos consultoría",
      "PMO externo",
      "aseguramiento de calidad de proyectos",
    ],
  },
  {
    id: "adoptar",
    letter: "A",
    title: "Adoptar el cambio",
    question: "¿Cómo hacemos que se quede?",
    service: "Change Management",
    problem:
      "El sistema queda instalado, pero el equipo no lo adopta. Nuestra gestión del cambio organizacional trabaja la adopción desde el día uno del proyecto, no como una actividad de cierre.",
    how: "Gestión del cambio integrada a la ejecución, con foco en minimizar riesgos en transformación digital derivados de la resistencia al cambio.",
    outcome:
      "Adopción de tecnología en empresas medible y sostenida, con un equipo capaz de operar el nuevo modelo sin depender permanentemente de Cyrrus.",
    aiAccelerator:
      "IA que mide el clima organizacional y la curva de adopción de forma continua, no solo al cierre del proyecto.",
    keywords: [
      "gestión del cambio organizacional",
      "adopción de tecnología en empresas",
      "minimizar riesgos en transformación digital",
    ],
    reverse: true,
  },
];

export default function MetodoCira() {
  usePageMeta({
    title: "Método CIRA | Cyrrus Consulting Services",
    description:
      "CIRA: Construir, Identificar, Realizar, Adoptar. El ciclo completo de transformación empresarial, con inteligencia artificial acelerando cada fase — consultoría de planeación estratégica, selección de software, PMO externo y gestión del cambio.",
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="El qué"
        title="CIRA no es un acrónimo decorativo. Es el ciclo completo de su transformación."
        description="Le da a Cyrrus una razón de ser que no depende de una tecnología de turno: vendemos el ciclo completo — Construir, Identificar, Realizar, Adoptar — con inteligencia artificial acelerando cada tramo."
      >
        <div className="flex flex-wrap gap-3">
          {phases.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {p.letter} — {p.title}
            </a>
          ))}
        </div>
      </PageHero>

      {phases.map((phase) => (
        <PhaseSection key={phase.id} {...phase} />
      ))}

      <section className="w-full bg-background py-16 text-center">
        <Button
          size="lg"
          className="bg-navy text-white hover:bg-navy/90"
          onClick={() =>
            document
              .getElementById("construir")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Volver al inicio del método
        </Button>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
}
