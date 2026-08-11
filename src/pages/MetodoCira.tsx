import { Link } from "react-router-dom";
import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { BorderButton } from "@/components/ui/border-button";
import { CiraSocialProof } from "@/components/sections/cira-social-proof";
import { CiraFaq } from "@/components/sections/cira-faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { CircularCarousel } from "@/components/ui/circular-carousel";

const phases = [
  {
    id: "construir",
    letter: "C",
    title: "Construir la estrategia",
    question: "¿Hacia dónde vamos?",
    service: "Strategy",
    href: "/metodo-cira/planeacion-estrategica",
    ctaText: "Ver Estrategia en detalle",
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
    image:
      "/assets/decoracion/Portada.jpg",
  },
  {
    id: "identificar",
    letter: "I",
    title: "Identificar la mejor solución",
    question: "¿Con qué lo logramos?",
    service: "Select",
    href: "/metodo-cira/seleccion-de-soluciones",
    ctaText: "Ver Selección de Soluciones en detalle",
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
    image:
      "/assets/decoracion/evento-panel-universidad-bolivar.jpeg",
  },
  {
    id: "realizar",
    letter: "R",
    title: "Realizar el proyecto",
    question: "¿Cómo lo ejecutamos sin fallar?",
    service: "Project Management",
    href: "/metodo-cira/gestion-de-proyectos",
    ctaText: "Ver Gerencia de Proyectos en detalle",
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
    image:
      "/assets/decoracion/IMG_20200313_092701647.jpg",
  },
  {
    id: "adoptar",
    letter: "A",
    title: "Adoptar el cambio",
    question: "¿Cómo hacemos que se quede?",
    service: "Change Management",
    href: "/metodo-cira/gestion-del-cambio",
    ctaText: "Ver Gestión del Cambio en detalle",
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
    image:
      "/assets/decoracion/1785866331023.jpg",
  },
];

const stickyContent = phases.map((p) => ({
  title: p.title,
  description: `${p.problem} ${p.how}`,
  content: (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-6"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(6,17,41,0.92), rgba(6,17,41,0.4)), url(${p.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
          {p.service}
        </span>
      </div>
      <div>
        <p className="text-sm leading-relaxed text-white/90">{p.outcome}</p>
        <BorderButton asChild variant="light" size="sm" className="mt-4" dot>
          <Link to={p.href}>
            {p.ctaText}
          </Link>
        </BorderButton>
      </div>
    </div>
  ),
}));

const meta = routeMeta["/metodo-cira"];

export default function MetodoCira() {
  usePageMeta({
    title: meta.title,
    description: meta.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Consultoría de transformación digital",
        name: "Método CIRA",
        provider: { "@id": "https://www.cyrruscs.com/#organization" },
        description: meta.description,
        areaServed: "LATAM",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Fases del Método CIRA",
          itemListElement: phases.map((p, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: p.title,
              url: `https://www.cyrruscs.com${p.href}`,
            },
          })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://www.cyrruscs.com/metodo-cira#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Duración por fase",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Depende del alcance y tamaño de la organización, pero como referencia: Construir (estrategia) suele tomar de 4 a 8 semanas, Identificar (selección de solución) de 6 a 12 semanas, Realizar (proyecto) varía según el proyecto ejecutado, y Adoptar (cambio) se trabaja de forma transversal desde el día uno.",
            },
          },
          {
            "@type": "Question",
            name: "Contratación por fase, no todo o nada",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cada fase — Strategy, Select, Project Management y Change Management — se contrata de forma independiente. La mayoría de nuestros clientes empieza por una sola fase y expande el alcance cuando ve el resultado.",
            },
          },
          {
            "@type": "Question",
            name: "Ya eligieron proveedor y no están seguros",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Evaluamos la decisión con los mismos criterios objetivos, incluso si el proceso ya empezó. Somos 100% agnósticos: no tenemos alianzas comerciales ni comisiones con fabricantes de ERP, CRM, HCM u otras soluciones empresariales.",
            },
          },
          {
            "@type": "Question",
            name: "Adopción, no otro piloto abandonado",
            acceptedAnswer: {
              "@type": "Answer",
              text: "La IA se mide con la misma disciplina de gobierno que el resto del método — no es una capa aparte. Acelera tareas dentro de cada fase: diagnóstico en Construir, evaluación paralela de proveedores en Identificar, monitoreo de riesgo en tiempo real en Realizar, y medición continua de adopción en Adoptar.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cyrruscs.com/" },
          { "@type": "ListItem", position: 2, name: "Método CIRA", item: "https://www.cyrruscs.com/metodo-cira" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow="Método CIRA"
        title="¿Qué es el Método CIRA? El ciclo completo de su transformación"
        description="Método CIRA es la metodología propia de Cyrrus que unifica las cuatro fases de transformación digital — Construir, Identificar, Realizar, Adoptar — bajo un solo equipo responsable de principio a fin, con inteligencia artificial acelerando cada fase."
        showVisual={false}
        visual={
          <CircularCarousel
            items={phases.map((p) => ({
              id: p.id,
              tag: p.letter,
              title: p.title.split(" ")[0],
              description: p.outcome,
            }))}
          />
        }
      >
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-cyan backdrop-blur-sm">
          CIRA
        </span>
        <div className="mt-6">
          <ContactCtaButton variant="light" />
        </div>
      </IntelligenceLabHero>

      <StickyScroll content={stickyContent} />

      <CiraSocialProof />

      <CiraFaq />

      <FinalCta />
      <Footer />
    </>
  );
}
