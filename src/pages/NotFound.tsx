import { Link } from "react-router-dom";
import { useLang } from "@/lib/language";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/sections/footer";
import { BorderButton } from "@/components/ui/border-button";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  const lang = useLang();
  const isEn = lang === "en";

  usePageMeta({
    title: isEn ? "Page not found | Cyrrus Consulting Services" : "Página no encontrada | Cyrrus Consulting Services",
    description: isEn
      ? "The page you're looking for doesn't exist or has moved."
      : "La página que buscas no existe o fue movida.",
    noindex: true,
    noCanonical: true,
  });

  return (
    <>
      <SiteHeader />
      <main id="contenido">
      <section className="section-y flex min-h-[60vh] w-full flex-col items-center justify-center bg-background px-6 text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="t-h2 mt-5 text-navy">
          {isEn ? "Page not found" : "Página no encontrada"}
        </h1>
        <p className="t-lead mt-6 max-w-md text-slate">
          {isEn
            ? "The page you're looking for doesn't exist or has moved."
            : "La página que buscas no existe o fue movida."}
        </p>
        <BorderButton asChild variant="dark" size="lg" className="mt-10" dot>
          <Link to={isEn ? "/en" : "/"}>{isEn ? "Back to home" : "Volver al inicio"}</Link>
        </BorderButton>
      </section>
      </main>
      <Footer />
    </>
  );
}
