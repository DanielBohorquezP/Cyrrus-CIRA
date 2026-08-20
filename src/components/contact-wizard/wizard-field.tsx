import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { WizardField } from "@/lib/contact-wizard-config";

type TFn = (key: string, options?: Record<string, unknown>) => string;

interface WizardFieldControlProps {
  field: WizardField;
  value: string;
  onChange: (value: string) => void;
  t: TFn;
  /** Disables the staggered entrance animation for the choice cards when
   *  the user has prefers-reduced-motion set. */
  reduceMotion: boolean;
}

// Shared with contact-wizard-modal.tsx's field-level stagger — kept local
// (rather than a shared module) since it's four lines and the two call
// sites animate different things (fields vs. choice cards).
const cardContainerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};
const cardItemVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
};

/** Renders one field of a wizard step — the field `type` decides the control,
 *  the step component decides layout (single field vs. a 2-up grid). */
export function WizardFieldControl({ field, value, onChange, t, reduceMotion }: WizardFieldControlProps) {
  if (field.type === "choice") {
    return (
      <motion.div
        role="radiogroup"
        aria-label={t(field.labelKey)}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        variants={reduceMotion ? undefined : cardContainerVariants}
        initial={reduceMotion ? undefined : "initial"}
        animate={reduceMotion ? undefined : "animate"}
      >
        {field.options?.map((option) => {
          const selected = value === option.value;
          return (
            <motion.button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              variants={reduceMotion ? undefined : cardItemVariants}
              className={cn(
                "flex min-h-[44px] flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-[border-color,background-color,box-shadow] duration-150 ease-out",
                selected
                  ? "border-blue bg-light-blue shadow-sm"
                  : "border-border bg-background hover:border-blue/40 hover:bg-light-blue/40",
              )}
            >
              <span className="text-sm font-semibold text-navy">{t(option.labelKey)}</span>
              {option.descriptionKey && (
                <span className="text-xs leading-relaxed text-gray">
                  {t(option.descriptionKey)}
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    );
  }

  const label = (
    <label htmlFor={field.id} className="text-sm font-medium text-navy">
      {t(field.labelKey)}
      {field.required && (
        <span aria-hidden="true" className="text-destructive">
          {" "}
          *
        </span>
      )}
    </label>
  );

  if (field.type === "select") {
    return (
      <div className="flex flex-col gap-1.5">
        {label}
        <select
          id={field.id}
          name={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 rounded-md border border-border bg-white px-3 text-sm text-navy outline-none transition-[border-color,box-shadow] duration-150 focus:border-blue focus:ring-2 focus:ring-blue/20"
        >
          <option value="" disabled>
            {t("sizeOptions.placeholder")}
          </option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.labelKey)}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label}
      <input
        id={field.id}
        name={field.id}
        type={field.type}
        autoComplete={field.autoComplete}
        placeholder={field.placeholderKey ? t(field.placeholderKey) : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-md border border-border bg-white px-3 text-sm text-navy outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground/60 focus:border-blue focus:ring-2 focus:ring-blue/20"
      />
    </div>
  );
}
