import {
  CheckCircle2,
  HeartHandshake,
  MessageSquare,
  Users,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import routeMeta from "@/lib/route-meta.json";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { IncludedGrid } from "@/components/sections/included-grid";
import { PageFeatureImage } from "@/components/sections/page-feature-image";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";

const meta = routeMeta["/metodo-cira/gestion-del-cambio"];

const pillars = [
  {
    icon: Users,
    title: "Gestión de stakeholders",
    description:
      "Identificamos y gestionamos a todas las partes interesadas para asegurar su participación activa y apoyo durante el cambio.",
  },
  {
    icon: MessageSquare,
    title: "Plan de comunicación",
    description:
      "Desarrollamos estrategias efectivas para mantener a todos los involucrados informados y comprometidos en cada etapa.",
  },
  {
    icon: GraduationCap,
    title: "Plan de entrenamiento",
    description:
      "Diseñamos planes personalizados para garantizar que el equipo esté preparado y confiado en el uso de la nueva solución.",
  },
  {
    icon: HeartHandshake,
    title: "Gestión del clima",
    description:
      "Monitoreamos y gestionamos el ambiente emocional y cultural del proyecto para fomentar un entorno colaborativo.",
  },
];

const benefits = [
  {
    icon: HeartHandshake,
    title: "Gestión integral de cambios",
    description:
      "Nuestro servicio de Change Management va más allá de lo convencional: se convierte en una oportunidad de transformación positiva y sostenible.",
  },
  {
    icon: Users,
    title: "Embebido en nuestros servicios",
    description:
      "Nuestra metodología garantiza una gestión de cambios perfectamente alineada con la visión corporativa y sus objetivos específicos.",
  },
  {
    icon: MessageSquare,
    title: "Enfoque integral",
    description:
      "Detallamos cada aspecto crítico, desde la gestión de stakeholders hasta el impacto organizacional, asegurando la adopción real de las mejoras.",
  },
  {
    icon: HeartHandshake,
    title: "Gestión proactiva del clima",
    description:
      "Monitoreamos y gestionamos el ambiente emocional y cultural del proyecto, contribuyendo al bienestar general y a un cierre efectivo.",
  },
  {
    icon: GraduationCap,
    title: "Personalización y competencia",
    description:
      "Diseñamos entrenamientos personalizados que garantizan un equipo altamente informado, impulsando una implementación exitosa.",
  },
  {
    icon: CheckCircle2,
    title: "Gestión proactiva del impacto",
    description:
      "Analizamos el impacto organizacional de forma anticipada, minimizando la resistencia en las primeras etapas de adopción de la estrategia corporativa.",
  },
];

export default function GestionDelCambio() {
  usePageMeta({
    title: meta.title,
    description: meta.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Gestión del cambio organizacional",
        name: "Gestión del Cambio",
        provider: { "@id": "https://www.cyrruscs.com/#organization" },
        description: meta.description,
        areaServed: "LATAM",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cyrruscs.com/" },
          { "@type": "ListItem", position: 2, name: "Método CIRA", item: "https://www.cyrruscs.com/metodo-cira" },
          { "@type": "ListItem", position: 3, name: "Gestión del Cambio", item: "https://www.cyrruscs.com/metodo-cira/gestion-del-cambio" },
        ],
      },
    ],
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Método CIRA — Adoptar"
        title="Gestión del cambio y capacitación"
        description="El sistema queda instalado, pero el equipo no lo adopta. Nuestra gestión del cambio organizacional trabaja la adopción desde el día uno del proyecto, no como una actividad de cierre."
      >
        <ContactCtaButton variant="light" label="Gestionar el cambio" />
      </PageHero>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <img
              src="/assets/decoracion/evento-jackson-moderador.jpeg"
              alt="Jackson Bohórquez moderando panel sobre liderazgo y gestión del cambio"
              width={640}
              height={427}
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover shadow-sm md:h-72"
            />
            <span className="mt-6 block text-sm font-semibold uppercase tracking-wider text-blue">
              Adopción, no instalación
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              La adopción se trabaja desde el día uno, no al cierre del proyecto.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <p className="text-lg leading-relaxed text-gray">
              Integramos la gestión del cambio a la ejecución del proyecto, con foco en
              minimizar los riesgos de transformación digital que vienen de la resistencia al
              cambio — y medimos el clima organizacional y la curva de adopción de forma
              continua con IA, no solo al cierre del proyecto.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Medición continua del clima organizacional y la curva de adopción, con IA.",
                "Programas de capacitación, incluida la adopción de IA generativa para alta gerencia.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  <span className="text-base leading-relaxed text-navy/80">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-gray">
              Nuestros programas de capacitación viven en{" "}
              <Link to="/leadership-academy" className="text-navy underline underline-offset-2">
                Cyrrus Leadership Academy
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-light-blue/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              ¿Cómo lo hacemos?
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Cuatro pilares, un solo proceso de adopción
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray">
              Nuestra metodología de Change Management no es un complemento: está embebida
              en nuestros servicios de Strategy, Select y Project Management. Esto asegura
              una gestión de cambios que se alinea perfectamente con la visión y los
              objetivos de su organización.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                    <Icon className="h-5 w-5 text-cyan" />
                  </div>
                  <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray">{item.description}</p>
                </motion.div>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 text-center">
            <ContactCtaButton label="Agendar diagnóstico ejecutivo" />
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-12">
          <Reveal className="md:col-span-5">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue">
              Lo que nos distingue
            </span>
            <p className="mt-4 border-l-2 border-cyan pl-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              Resultados que añaden valor.
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray">
              En Cyrrus CS no vemos el cambio como un obstáculo, sino como una oportunidad
              para el crecimiento y la mejora. Nuestro enfoque integral de Change Management
              impacta la cultura organizacional, flexibilizándola y orientándola hacia el
              éxito continuo.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue">
              Embebido en nuestros servicios
            </h3>
            <ul className="mt-6 space-y-4">
              {[
                "Gestión proactiva del impacto en la organización, minimizando cualquier riesgo operativo.",
                "Metodología holística aplicada a Select, Strategy y Project Management.",
                "Reducción radical de la fricción natural en la adaptación a nuevas métricas y soluciones tecnológicas.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  <span className="text-base leading-relaxed text-navy/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <IncludedGrid
        eyebrow="Beneficios"
        title="Agilidad, transformación y eficiencia"
        items={benefits}
      />

      <PageFeatureImage
        src="/assets/decoracion/Trabajo.jpg"
        alt="Consultor de Cyrrus trabajando en un plan de adopción del cambio"
        caption="Acompañamiento práctico en cada sesión de trabajo, no solo diapositivas."
      />

      <FinalCta />
      <Footer />
    </>
  );
}
