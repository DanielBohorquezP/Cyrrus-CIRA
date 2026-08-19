import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Cloud,
  HeartHandshake,
  Layers3,
  LifeBuoy,
  Link2,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  Wifi,
  Workflow,
} from "lucide-react";

export const solutionCategoryImages: Record<string, string> = {
  "seleccion-de-software": "/assets/decoracion/1785866224286.jpg",
  "tecnologias-avanzadas": "/assets/decoracion/1785872413278.jpg",
  "infraestructura-tecnologica": "/assets/decoracion/IMG_20230705_122802.jpg",
};

export const solutionDetailImages: Record<string, { image: string; imagePosition?: string }> = {
  "tecnologias-avanzadas": { image: "/assets/decoracion/Cascosss.jpg", imagePosition: "center 42%" },
  "infraestructura-tecnologica": { image: "/assets/decoracion/IMG_20230227_164308.jpg" },
};

export const solutionItemIcons: Record<string, LucideIcon[]> = {
  "tecnologias-avanzadas": [Sparkles, Workflow, Link2],
  "infraestructura-tecnologica": [ShieldCheck, Cloud, Wifi, LifeBuoy],
};

export const solutionsClosingIcon = HeartHandshake;

// Categories still rendered by the generic SolucionDetalle.tsx template.
// "seleccion-de-software" (formerly "tecnologias-maduras") moved to its own
// bespoke page — see SeleccionDeSoftware.tsx — because it now has 8 distinct
// sections the generic template doesn't support.
export const solutionSlugs = ["tecnologias-avanzadas", "infraestructura-tecnologica"] as const;

// Product slugs for the 4 subpages under Selección de Software.
export const productSlugs = ["erp", "crm", "hcm", "eam"] as const;
export type ProductSlug = (typeof productSlugs)[number];

export const productIcons: Record<ProductSlug, LucideIcon> = {
  erp: Boxes,
  crm: Users,
  hcm: UserCog,
  eam: Layers3,
};

export const productImages: Record<ProductSlug, { image: string; imagePosition?: string }> = {
  erp: { image: "/assets/decoracion/IMG_20230228_082627.jpg" },
  crm: { image: "/assets/decoracion/IMG_20230228_082632.jpg" },
  hcm: { image: "/assets/decoracion/IMG_20230228_083642.jpg" },
  eam: { image: "/assets/decoracion/IMG_20230302_112825.jpg" },
};

export const softwareHubImage = "/assets/decoracion/1785872413166.jpg";
