// Data-driven step list for the contact wizard modal
// (src/components/contact-wizard/contact-wizard-modal.tsx). Adding/reordering a
// step or field is a matter of editing this array; the component has no
// per-field branching beyond `type`.
//
// Two steps on purpose: first the AREA the visitor needs help with (seven cards,
// not a 16-line dropdown), then who they are and how to reach them. Nothing else
// is asked up front; company size and job title were dropped.

export interface WizardFieldOption {
  value: string;
  labelKey: string;
  descriptionKey?: string;
}

export interface WizardField {
  id: string;
  type: "choice" | "textarea" | "text" | "tel" | "email";
  labelKey: string;
  /** An example value shown in the input. */
  placeholderKey?: string;
  autoComplete?: string;
  required?: boolean;
  options?: WizardFieldOption[];
}

export interface WizardStep {
  id: string;
  titleKey: string;
  /** `grid`: two fields per row on wide screens; `stack`: one per row. */
  layout: "stack" | "grid";
  fields: WizardField[];
}

/** Area values. Pages prefill `servicio` with one of these (or a legacy value, see normalizeServicio). */
export const WIZARD_AREAS = [
  "estrategia",
  "seleccion-soluciones",
  "proyectos",
  "cambio",
  "ia",
  "capacitacion",
  "no-se",
] as const;

export const CONTACT_WIZARD_STEPS: WizardStep[] = [
  {
    id: "servicio",
    titleKey: "steps.servicio.title",
    layout: "stack",
    fields: [
      {
        id: "servicio",
        type: "choice",
        labelKey: "steps.servicio.fields.servicio",
        required: true,
        options: [
          { value: "estrategia", labelKey: "steps.servicio.options.estrategia.label", descriptionKey: "steps.servicio.options.estrategia.description" },
          { value: "seleccion-soluciones", labelKey: "steps.servicio.options.seleccionSoluciones.label", descriptionKey: "steps.servicio.options.seleccionSoluciones.description" },
          { value: "proyectos", labelKey: "steps.servicio.options.proyectos.label", descriptionKey: "steps.servicio.options.proyectos.description" },
          { value: "cambio", labelKey: "steps.servicio.options.cambio.label", descriptionKey: "steps.servicio.options.cambio.description" },
          { value: "ia", labelKey: "steps.servicio.options.ia.label", descriptionKey: "steps.servicio.options.ia.description" },
          { value: "capacitacion", labelKey: "steps.servicio.options.capacitacion.label", descriptionKey: "steps.servicio.options.capacitacion.description" },
          { value: "no-se", labelKey: "steps.servicio.options.noSe.label", descriptionKey: "steps.servicio.options.noSe.description" },
        ],
      },
      {
        id: "mensaje",
        type: "textarea",
        labelKey: "steps.servicio.fields.mensaje",
        placeholderKey: "steps.servicio.placeholders.mensaje",
        required: false,
      },
    ],
  },
  {
    id: "contacto",
    titleKey: "steps.contacto.title",
    layout: "grid",
    fields: [
      {
        id: "nombre",
        type: "text",
        labelKey: "steps.contacto.fields.nombre",
        placeholderKey: "steps.contacto.placeholders.nombre",
        autoComplete: "name",
        required: true,
      },
      {
        id: "empresa",
        type: "text",
        labelKey: "steps.contacto.fields.empresa",
        placeholderKey: "steps.contacto.placeholders.empresa",
        autoComplete: "organization",
        required: true,
      },
      {
        id: "email",
        type: "email",
        labelKey: "steps.contacto.fields.email",
        placeholderKey: "steps.contacto.placeholders.email",
        autoComplete: "email",
        required: false,
      },
      {
        id: "telefono",
        type: "tel",
        labelKey: "steps.contacto.fields.telefono",
        placeholderKey: "steps.contacto.placeholders.telefono",
        autoComplete: "tel",
        required: false,
      },
    ],
  },
];

/** The last step requires at least one of these to be filled — checked by
 *  the wizard component itself since it's a cross-field rule, not a
 *  per-field one. */
export const LAST_STEP_AT_LEAST_ONE_OF = ["telefono", "email"];

/** Maps the values older CTAs still pass (`metodo-cira-seleccion-soluciones`,
 *  `leadership-academy-iso-27001`, `intelligence-lab-…`) to the new areas. */
export function normalizeServicio(value: string | undefined): string {
  if (!value) return "";
  if ((WIZARD_AREAS as readonly string[]).includes(value)) return value;
  if (value.startsWith("leadership-academy")) return "capacitacion";
  if (value.startsWith("intelligence-lab")) return "ia";
  if (value.includes("seleccion-soluciones")) return "seleccion-soluciones";
  if (value.includes("gestion-proyectos")) return "proyectos";
  if (value.includes("gestion-cambio")) return "cambio";
  if (value.includes("estrategia")) return "estrategia";
  return "";
}
