import { ShaderHero } from "@/components/ui/shader-hero";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";
import { TransparentHeader } from "@/components/layout/transparent-header";
import { HeroServicesTabs } from "@/components/sections/hero-services-tabs";
import { TrustBar } from "@/components/sections/trust-bar";
import { CyrrusAbout } from "@/components/sections/cyrrus-about";
import { CiraJourney } from "@/components/sections/cira-journey";
import { WhyCyrrus } from "@/components/sections/why-cyrrus";
import { Testimonials } from "@/components/sections/testimonials";
import { CeoSection } from "@/components/sections/ceo-section";
import { Experience } from "@/components/sections/experience";
import { PerspectivasPreview } from "@/components/sections/perspectivas-preview";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <div className="relative">
        <TransparentHeader />
        <ShaderHero
          eyebrow="Metodología CIRA"
          titleAccent="Consultoría"
          titleBold="Estratégica"
          titleLight="con IA integrada"
          subtitle="Construimos la estrategia, elegimos la solución correcta y logramos su adopción."
          primaryButtonText="Agendar conversación estratégica"
          primaryButtonHref="/contacto"
          secondaryButtonText="Conocer el método CIRA"
          secondaryButtonHref="/metodo-cira"
          badgeText="Cyrrus Consulting Services"
        />
      </div>
      <TrustBar />
      <AnimatedNavyBackground className="px-6 py-14 md:px-12">
        <div className="mx-auto max-w-6xl">
          <HeroServicesTabs />
        </div>
      </AnimatedNavyBackground>
      <CiraJourney />
      <CyrrusAbout />
      <WhyCyrrus />
      <CeoSection />
      <Testimonials />
      <Experience />
      <PerspectivasPreview />
      <FinalCta />
      <Footer />
    </>
  );
}
