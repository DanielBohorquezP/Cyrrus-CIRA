import { LogoMarquee } from "@/components/ui/logo-marquee";

/**
 * Navy band with the client logos scrolling by. The headline figures that used
 * to sit beside the logos now live in the Home hero (ShaderHero `metrics`).
 */
export function TrustBar() {
  return (
    <section
      className="cv-section w-full bg-navy py-11 [--cv-h:116px]"
    >
      <div className="container-site">
        <LogoMarquee />
      </div>
    </section>
  );
}
