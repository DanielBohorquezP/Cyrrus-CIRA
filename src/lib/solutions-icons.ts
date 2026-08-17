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
  "tecnologias-maduras": "/assets/decoracion/1785866224286.jpg",
  "tecnologias-avanzadas": "/assets/decoracion/1785872413278.jpg",
  "infraestructura-tecnologica": "/assets/decoracion/IMG_20230705_122802.jpg",
};

export const solutionDetailImages: Record<string, { image: string; imagePosition?: string }> = {
  "tecnologias-maduras": { image: "/assets/decoracion/1785872413166.jpg" },
  "tecnologias-avanzadas": { image: "/assets/decoracion/Cascosss.jpg", imagePosition: "center 42%" },
  "infraestructura-tecnologica": { image: "/assets/decoracion/IMG_20230227_164308.jpg" },
};

export const solutionItemIcons: Record<string, LucideIcon[]> = {
  "tecnologias-maduras": [Boxes, Users, UserCog, Layers3],
  "tecnologias-avanzadas": [Sparkles, Workflow, Link2],
  "infraestructura-tecnologica": [ShieldCheck, Cloud, Wifi, LifeBuoy],
};

export const solutionsClosingIcon = HeartHandshake;

export const solutionSlugs = ["tecnologias-maduras", "tecnologias-avanzadas", "infraestructura-tecnologica"] as const;
