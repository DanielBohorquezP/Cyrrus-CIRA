import { Blog7 } from "@/components/ui/blog7";
import { upcomingTopics } from "@/lib/perspectivas-topics";

export function PerspectivasPreview() {
  return (
    <Blog7
      tagline="Perspectivas"
      heading="Pensamiento sobre transformación y gestión del cambio"
      description="Análisis y contenido de autoridad sobre consultoría estratégica, gobierno de IA y gestión del cambio organizacional — las preguntas que el mercado ya está haciendo."
      buttonText="Ver todos los temas"
      buttonUrl="/perspectivas"
      posts={upcomingTopics}
    />
  );
}
