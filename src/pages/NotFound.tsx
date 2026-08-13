import { Link } from "react-router-dom";
import { useLang } from "@/lib/language";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/sections/footer";
import { BorderButton } from "@/components/ui/border-button";

export default function NotFound() {
  const lang = useLang();
  const isEn = lang === "en";

  usePageMeta({
    title: isEn ? "Page not found | Cyrrus Consulting Services" : "Página no encontrada | Cyrrus Consulting Services",
    description: isEn
      ? "The page you're looking for doesn't exist or has moved."
      : "La página que buscas no existe o fue movida.",
    noindex: true,
  });

  return (
    <>
      <SiteHeader />
      <section className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-background px-6 py-24 text-center md:py-32">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-navy md:text-4xl">
          {isEn ? "Page not found" : "Página no encontrada"}
        </h1>
        <p className="mt-4 max-w-md text-gray">
          {isEn
            ? "The page you're looking for doesn't exist or has moved."
            : "La página que buscas no existe o fue movida."}
        </p>
        <BorderButton asChild variant="dark" className="mt-8" dot>
          <Link to={isEn ? "/en" : "/"}>{isEn ? "Back to home" : "Volver al inicio"}</Link>
        </BorderButton>
      </section>
      <Footer />
    </>
  );
}
