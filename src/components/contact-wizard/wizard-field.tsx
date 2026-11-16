import { cn } from "@/lib/utils";
import type { WizardField } from "@/lib/contact-wizard-config";

type TFn = (key: string, options?: Record<string, unknown>) => string;

interface WizardFieldControlProps {
  field: WizardField;
  value: string;
  onChange: (value: string) => void;
  t: TFn;
}

/** Renders one field of a wizard step — the field `type` decides the control,
 *  the step component decides layout (stacked vs. a 2-up grid). */
export function WizardFieldControl({ field, value, onChange, t }: WizardFieldControlProps) {
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

  // The area picker: a handful of cards instead of a long dropdown.
  if (field.type === "choice") {
    const options = field.options ?? [];
    return (
      <div role="radiogroup" aria-label={t(field.labelKey)} className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {options.map((option, index) => {
          const selected = value === option.value;
          const isLast = index === options.length - 1;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-md border px-3.5 py-2.5 text-left outline-none transition-[border-color,background-color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-blue/30",
                selected ? "border-blue bg-light-blue ring-1 ring-blue" : "border-border bg-white hover:border-navy/40",
                isLast && "sm:col-span-3",
              )}
            >
              <span className="block text-sm font-semibold text-navy">{t(option.labelKey)}</span>
              {option.descriptionKey && (
                <span className="mt-0.5 block text-xs leading-snug text-gray">{t(option.descriptionKey)}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-1.5">
        {label}
        <textarea
          id={field.id}
          name={field.id}
          rows={2}
          placeholder={field.placeholderKey ? t(field.placeholderKey) : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="resize-none rounded-md border border-border bg-white px-3 py-2.5 text-sm text-navy outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground/60 focus:border-blue focus:ring-2 focus:ring-blue/20"
        />
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
