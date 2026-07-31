import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Blog7 } from "@/components/ui/blog7";

const upcomingTopics = [
  {
    id: "post-1",
    title:
      "Por qué fracasan los proyectos de transformación digital (y cómo evitarlo)",
    summary:
      "Las organizaciones no fallan por falta de estrategia ni de tecnología. Fallan cuando nadie conecta la decisión con la ejecución. Un análisis de los puntos de quiebre más comunes en las 4 fases de toda transformación.",
    label: "Transformación digital",
    author: "Equipo Cyrrus",
    published: "Próximamente",
    url: "/perspectivas",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "post-2",
    title: "Cómo elegir una consultora estratégica confiable",
    summary:
      "Criterios objetivos para comparar firmas de consultoría más allá del logo o el tamaño: metodología propia, acompañamiento de punta a punta y evidencia real de resultados.",
    label: "Consultoría estratégica",
    author: "Equipo Cyrrus",
    published: "Próximamente",
    url: "/perspectivas",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "post-3",
    title: "Qué es el gobierno de IA corporativo y por qué su empresa lo necesita",
    summary:
      "Antes de adoptar herramientas de inteligencia artificial, las organizaciones necesitan un marco de gobierno: quién decide, quién audita y qué datos pueden tocarse.",
    label: "Gobierno de IA",
    author: "Equipo Cyrrus",
    published: "Próximamente",
    url: "/perspectivas",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
  },
];

export default function Perspectivas() {
  usePageMeta({
    title: "Perspectivas | Cyrrus Consulting Services",
    description:
      "Perspectivas de Cyrrus: análisis y contenido de autoridad sobre transformación digital, gobierno de IA y gestión del cambio. Calendario editorial en desarrollo.",
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Autoridad y contenido"
        title="Perspectivas"
        description="El espacio editorial de Cyrrus: análisis sobre por qué fracasan los proyectos de transformación digital, cómo elegir una consultora confiable, y el pensamiento detrás del método CIRA."
      />

      <Blog7
        tagline="Calendario editorial en construcción"
        heading="Próximos temas en Perspectivas"
        description="Estamos preparando el contenido de autoridad que responderá las preguntas que el mercado ya está haciendo — desde el diagnóstico hasta el seguimiento de resultados. Estos son los primeros temas en desarrollo."
        buttonText="¿Quiere sugerir un tema?"
        buttonUrl="/contacto"
        posts={upcomingTopics}
      />

      <FinalCta />
      <Footer />
    </>
  );
}
