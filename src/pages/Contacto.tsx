import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

export default function Contacto() {
  usePageMeta({
    title: "Contacto | Agendar conversación estratégica | Cyrrus",
    description:
      "Agende una conversación estratégica con Cyrrus Consulting Services. Sin formularios genéricos — una conversación real sobre el reto de transformación de su organización.",
  });

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Conversemos"
        title="Sin formularios genéricos."
        description="Prefiere una conversación real sobre el reto de su organización antes que un formulario que nadie lee. Escríbanos y coordinamos una llamada con el equipo adecuado del lado de Cyrrus."
      />

      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-12">
          <Reveal className="flex flex-col rounded-2xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-blue">
              <Mail className="h-6 w-6 text-blue" />
            </div>
            <h2 className="mt-6 text-lg font-semibold text-navy">
              Escríbanos directamente
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray">
              Cuéntenos en dos líneas el reto que está enfrentando. Respondemos
              personalmente, no con un autoresponder.
            </p>
            <Button
              asChild
              className="mt-6 w-fit bg-navy text-white hover:bg-navy/90"
            >
              <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>
            </Button>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col rounded-2xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-blue">
              <MessageCircle className="h-6 w-6 text-blue" />
            </div>
            <h2 className="mt-6 text-lg font-semibold text-navy">
              Agende una conversación
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray">
              30 minutos con nuestro equipo para entender su contexto y decirle
              honestamente si CIRA es lo que necesita.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 w-fit border-navy text-navy hover:bg-light-blue"
            >
              <a href="mailto:contacto@cyrruscs.com?subject=Agendar%20conversación%20estratégica">
                Agendar conversación
              </a>
            </Button>
          </Reveal>
        </div>

        <p className="mx-auto mt-10 max-w-4xl px-6 text-center text-xs text-muted-foreground md:px-12">
          Correo y enlace de agenda son provisionales — reemplazar por los
          canales reales de contacto de Cyrrus.
        </p>
      </section>

      <Footer />
    </>
  );
}
