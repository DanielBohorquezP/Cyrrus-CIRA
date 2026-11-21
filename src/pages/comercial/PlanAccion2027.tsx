import { createServiceChildPage } from "@/components/layout/service-child-page";
// Registers this route's translation namespace (see Comercial.tsx).
import "@/i18n/ns/comercial";

// The service under Comercial. Editorial rules from the client (2026-11-20):
// not tied to CIRA (no method link), no promised growth figures, no
// testimonials from other services. One CTA only, so no secondary hero link.
export default createServiceChildPage({
  ns: "comercial",
  key: "plan2027",
  path: "/servicios/comercial/plan-de-accion-2027",
  parent: { path: "/servicios/comercial", label: { es: "Comercial", en: "Commercial" } },
  heroLink: null,
  eyebrow: { es: "Comercial", en: "Commercial" },
  heroImage: {
    src: "/assets/decoracion/estrategia-comercial-mar.jpg",
    alt: "Costa y mar abierto bajo un cielo despejado",
  },
  bodyImage: {
    src: "/assets/decoracion/estrategia-comercial-niebla.jpg",
    alt: "Camino entre montañas y niebla al amanecer",
  },
  relatedPaths: ["/servicios/comercial"],
});
