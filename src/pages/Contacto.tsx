import { useState } from "react";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { BorderButton } from "@/components/ui/border-button";
import { CheckCircle2, MapPin, Phone } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_ACCESS_KEY = "12bc1ce9-5114-4a56-8e62-15d72909c577";

export default function Contacto() {
  usePageMeta({
    title: "Contacto | Agendar conversación estratégica | Cyrrus",
    description:
      "Agende una conversación estratégica con Cyrrus Consulting Services. Cuéntenos el reto de transformación de su organización y coordinamos una llamada con el equipo adecuado.",
  });

  const [status, setStatus] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const mensaje = (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value.trim();

    if (!nombre || !email || !mensaje) {
      setError("Complete nombre, correo y mensaje.");
      return;
    }

    setError(null);
    setStatus("submitting");

    try {
      const formData = new FormData(form);
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", `Nuevo contacto desde cyrruscs.com — ${nombre}`);
      formData.append("from_name", "Formulario de contacto — Cyrrus");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Contacto"
        title="Agende una consultoría estratégica con Cyrrus"
        description="Cuéntenos el reto de transformación que enfrenta su organización. Respondemos personalmente y coordinamos una llamada con el equipo adecuado del lado de Cyrrus."
      />

      <section id="formulario" className="w-full scroll-mt-24 bg-background py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 md:px-12">
          <Reveal className="rounded-2xl border border-border bg-card p-8 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-blue" />
                <h2 className="mt-4 text-xl font-semibold text-navy">
                  Mensaje recibido
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray">
                  Gracias por escribirnos. Un miembro del equipo de Cyrrus se
                  pondrá en contacto en las próximas 24 horas hábiles.
                </p>
                <BorderButton
                  variant="dark"
                  className="mt-6"
                  onClick={() => setStatus("idle")}
                  dot
                >
                  Enviar otro mensaje
                </BorderButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <h2 className="text-lg font-semibold text-navy">
                  Agendar conversación
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray">
                  30 minutos con nuestro equipo para entender su contexto y
                  decirle honestamente si CIRA es lo que necesita.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nombre" className="text-sm font-medium text-navy">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      className="rounded-md border border-border bg-white px-3 py-2 text-sm text-navy outline-none transition-[border-color,box-shadow] focus:border-blue focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-navy">
                      Correo corporativo
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="rounded-md border border-border bg-white px-3 py-2 text-sm text-navy outline-none transition-[border-color,box-shadow] focus:border-blue focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="empresa" className="text-sm font-medium text-navy">
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      autoComplete="organization"
                      className="rounded-md border border-border bg-white px-3 py-2 text-sm text-navy outline-none transition-[border-color,box-shadow] focus:border-blue focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="telefono" className="text-sm font-medium text-navy">
                      Teléfono (opcional)
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                      className="rounded-md border border-border bg-white px-3 py-2 text-sm text-navy outline-none transition-[border-color,box-shadow] focus:border-blue focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="tamano-empresa" className="text-sm font-medium text-navy">
                      Tamaño de la empresa
                    </label>
                    <select
                      id="tamano-empresa"
                      name="tamanoEmpresa"
                      defaultValue=""
                      className="rounded-md border border-border bg-white px-3 py-2 text-sm text-navy outline-none transition-[border-color,box-shadow] focus:border-blue focus:ring-2 focus:ring-blue/20"
                    >
                      <option value="" disabled>
                        Seleccione un rango
                      </option>
                      <option value="50-100">+50 – 100 empleados</option>
                      <option value="101-250">101 – 250 empleados</option>
                      <option value="251-500">251 – 500 empleados</option>
                      <option value="501-1000">501 – 1000 empleados</option>
                      <option value="1000+">Más de 1000 empleados</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="mensaje" className="text-sm font-medium text-navy">
                      Cuéntenos el reto que está enfrentando
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      className="resize-none rounded-md border border-border bg-white px-3 py-2 text-sm text-navy outline-none transition-[border-color,box-shadow] focus:border-blue focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-4 text-sm text-destructive">{error}</p>
                )}
                {status === "error" && (
                  <p className="mt-4 text-sm text-destructive">
                    No pudimos enviar su mensaje. Intente de nuevo o escríbanos
                    a contacto@cyrruscs.com.
                  </p>
                )}

                <BorderButton
                  type="submit"
                  variant="dark"
                  disabled={status === "submitting"}
                  className="mt-8 w-full sm:w-auto"
                  dot
                >
                  {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
                </BorderButton>
              </form>
            )}
          </Reveal>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            También puede escribirnos directamente a{" "}
            <a href="mailto:contacto@cyrruscs.com" className="underline">
              contacto@cyrruscs.com
            </a>
            .
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 border-t border-border pt-8 text-center text-sm text-gray">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-blue" />
              <span>Cra. 51B #80-58 Oficina 1505, Nte. Centro Historico, Barranquilla, Atlántico</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-blue" />
              <a href="https://wa.me/573175730635" className="hover:text-navy">
                +57 317 5730635 (WhatsApp)
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              También atendemos Bogotá (oficina virtual).
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
