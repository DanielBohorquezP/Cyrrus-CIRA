// Data-driven step list for the contact wizard modal
// (src/components/contact-wizard/contact-wizard.tsx). Adding/reordering a
// step or field is a matter of editing this array — the component itself
// has no per-field branching beyond `type`.

export interface WizardFieldOption {
  value: string;
  labelKey: string;
  descriptionKey?: string;
  /** i18n key for this option's <optgroup> label. Options must be grouped
   *  consecutively in the array — see groupedOptions() in wizard-field.tsx. */
  groupKey?: string;
}

export interface WizardField {
  id: string;
  type: "select" | "text" | "tel" | "email";
  labelKey: string;
  /** i18n key for a placeholder: the disabled first <option> (select) or an
   *  example value shown in the input (text/tel/email). */
  placeholderKey?: string;
  autoComplete?: string;
  required?: boolean;
  options?: WizardFieldOption[];
}

export interface WizardStep {
  id: string;
  titleKey: string;
  fields: WizardField[];
}

export const CONTACT_WIZARD_STEPS: WizardStep[] = [
  {
    id: "servicio",
    titleKey: "steps.servicio.title",
    fields: [
      {
        id: "servicio",
        type: "select",
        labelKey: "steps.servicio.fields.servicio",
        placeholderKey: "steps.servicio.placeholder",
        required: true,
        options: [
          {
            value: "metodo-cira-estrategia",
            labelKey: "steps.servicio.options.estrategia.label",
            groupKey: "steps.servicio.groups.metodoCira",
          },
          {
            value: "metodo-cira-seleccion-soluciones",
            labelKey: "steps.servicio.options.seleccionSoluciones.label",
            groupKey: "steps.servicio.groups.metodoCira",
          },
          {
            value: "metodo-cira-gestion-proyectos",
            labelKey: "steps.servicio.options.gestionProyectos.label",
            groupKey: "steps.servicio.groups.metodoCira",
          },
          {
            value: "intelligence-lab-automatizacion-ia",
            labelKey: "steps.servicio.options.automatizacionIA.label",
            groupKey: "steps.servicio.groups.intelligenceLab",
          },
          {
            value: "intelligence-lab-arquitectura-ia",
            labelKey: "steps.servicio.options.arquitecturaIA.label",
            groupKey: "steps.servicio.groups.intelligenceLab",
          },
          {
            value: "intelligence-lab-gobierno-ia",
            labelKey: "steps.servicio.options.gobiernoIA.label",
            groupKey: "steps.servicio.groups.intelligenceLab",
          },
          {
            value: "leadership-academy-gestion-cambio",
            labelKey: "steps.servicio.options.gestionCambio.label",
            groupKey: "steps.servicio.groups.leadershipAcademy",
          },
          {
            value: "presencia-digital-desarrollo-web",
            labelKey: "steps.servicio.options.desarrolloWeb.label",
            groupKey: "steps.servicio.groups.presenciaDigital",
          },
          {
            value: "presencia-digital-seo",
            labelKey: "steps.servicio.options.seo.label",
            groupKey: "steps.servicio.groups.presenciaDigital",
          },
        ],
      },
    ],
  },
  {
    id: "empresa",
    titleKey: "steps.empresa.title",
    fields: [
      {
        id: "empresa",
        type: "text",
        labelKey: "steps.empresa.fields.empresa",
        placeholderKey: "steps.empresa.placeholders.empresa",
        autoComplete: "organization",
        required: true,
      },
      {
        id: "tamanoEmpresa",
        type: "select",
        labelKey: "steps.empresa.fields.tamanoEmpresa",
        required: true,
        placeholderKey: "sizeOptions.placeholder",
        options: [
          { value: "50-100", labelKey: "sizeOptions.r1" },
          { value: "101-250", labelKey: "sizeOptions.r2" },
          { value: "251-500", labelKey: "sizeOptions.r3" },
          { value: "501-1000", labelKey: "sizeOptions.r4" },
          { value: "1000+", labelKey: "sizeOptions.r5" },
        ],
      },
    ],
  },
  {
    id: "persona",
    titleKey: "steps.persona.title",
    fields: [
      {
        id: "nombre",
        type: "text",
        labelKey: "steps.persona.fields.nombre",
        placeholderKey: "steps.persona.placeholders.nombre",
        autoComplete: "name",
        required: true,
      },
      {
        id: "rol",
        type: "text",
        labelKey: "steps.persona.fields.rol",
        placeholderKey: "steps.persona.placeholders.rol",
        autoComplete: "organization-title",
        required: false,
      },
    ],
  },
  {
    id: "contacto",
    titleKey: "steps.contacto.title",
    fields: [
      {
        id: "telefono",
        type: "tel",
        labelKey: "steps.contacto.fields.telefono",
        placeholderKey: "steps.contacto.placeholders.telefono",
        autoComplete: "tel",
        required: false,
      },
      {
        id: "email",
        type: "email",
        labelKey: "steps.contacto.fields.email",
        placeholderKey: "steps.contacto.placeholders.email",
        autoComplete: "email",
        required: false,
      },
    ],
  },
];

/** The last step requires at least one of these to be filled — checked by
 *  the wizard component itself since it's a cross-field rule, not a
 *  per-field one. */
export const LAST_STEP_AT_LEAST_ONE_OF = ["telefono", "email"];
