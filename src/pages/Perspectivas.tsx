import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { IntelligenceLabHero } from "@/components/sections/intelligence-lab-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Blog7 } from "@/components/ui/blog7";
import { upcomingTopics } from "@/lib/perspectivas-topics";

export default function Perspectivas() {
  usePageMeta({
    title: "Blog de Transformación Digital y Gobierno de IA | Perspectivas | Cyrrus",
    description:
      "Perspectivas de Cyrrus: análisis y contenido de autoridad sobre transformación digital, gobierno de IA y gestión del cambio. Calendario editorial en desarrollo.",
  });

  return (
    <>
      <SiteHeader />
      <IntelligenceLabHero
        eyebrow="Perspectivas"
        title="Blog de transformación digital, gobierno de IA y gestión del cambio"
        description="El espacio editorial de Cyrrus: análisis sobre por qué fracasan los proyectos de transformación digital, cómo elegir una consultora confiable, y el pensamiento detrás del método CIRA."
        showVisual={false}
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
