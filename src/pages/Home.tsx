import { useNavigate } from "react-router-dom";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { Button } from "@/components/ui/button";
import { ThreeLevels } from "@/components/sections/three-levels";
import { CiraJourney } from "@/components/sections/cira-journey";
import { WhyCyrrus } from "@/components/sections/why-cyrrus";
import { Testimonials } from "@/components/sections/testimonials";
import { CeoSection } from "@/components/sections/ceo-section";
import { Experience } from "@/components/sections/experience";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

const navLinks = [
  { label: "Método CIRA", href: "/metodo-cira" },
  { label: "Cyrrus Intelligence Lab", href: "/intelligence-lab" },
  { label: "Leadership Academy", href: "/leadership-academy" },
  { label: "Experiencia", href: "/experiencia" },
  { label: "Perspectivas", href: "/perspectivas" },
];

export default function Home() {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate("/contacto");
  };

  const handleSecondaryCtaClick = () => {
    navigate("/metodo-cira");
  };

  return (
    <>
      <AnimatedHero
        backgroundImageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80"
        logo={
          <img
            src="/assets/logos-cyrrus/cyrrus-logo-blanco.svg"
            alt="Cyrrus Consulting Services"
            className="h-7 w-auto"
          />
        }
        navLinks={navLinks}
        topRightAction={
          <Button
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
            onClick={handleCtaClick}
          >
            Agendar conversación
          </Button>
        }
        title="De la decisión a la adopción, sin perder nada en el camino."
        description="Construimos la estrategia, elegimos la solución correcta, ejecutamos el proyecto y logramos que su equipo lo adopte — con inteligencia artificial corriendo en cada fase, para que su organización avance a la velocidad que el mercado ya exige."
        ctaButton={{
          text: "Agendar conversación estratégica",
          onClick: handleCtaClick,
        }}
        secondaryCta={{
          text: "Conocer el método CIRA",
          onClick: handleSecondaryCtaClick,
        }}
      />
      <ThreeLevels />
      <CiraJourney />
      <WhyCyrrus />
      <Testimonials />
      <CeoSection />
      <Experience />
      <FinalCta />
      <Footer />
    </>
  );
}
