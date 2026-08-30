import type { WizardField, WizardFieldOption } from "@/lib/contact-wizard-config";

type TFn = (key: string, options?: Record<string, unknown>) => string;

interface WizardFieldControlProps {
  field: WizardField;
  value: string;
  onChange: (value: string) => void;
  t: TFn;
}

/** Folds a flat, group-ordered options array into <optgroup> buckets —
 *  consecutive options sharing a groupKey become one group, in the order
 *  they first appear. Assumes the config keeps same-group options adjacent
 *  (true for every field defined in contact-wizard-config.ts today). */
function groupedOptions(options: WizardFieldOption[]): { groupKey: string; options: WizardFieldOption[] }[] {
  const groups: { groupKey: string; options: WizardFieldOption[] }[] = [];
  for (const option of options) {
    const last = groups[groups.length - 1];
    if (last?.groupKey === option.groupKey) {
      last.options.push(option);
    } else {
      groups.push({ groupKey: option.groupKey ?? "", options: [option] });
    }
  }
  return groups;
}

/** Renders one field of a wizard step — the field `type` decides the control,
 *  the step component decides layout (single field vs. a 2-up grid). */
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

  if (field.type === "select") {
    const hasGroups = field.options?.some((option) => option.groupKey);
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
            {t(field.placeholderKey ?? "sizeOptions.placeholder")}
          </option>
          {hasGroups
            ? groupedOptions(field.options ?? []).map((group) => (
                <optgroup key={group.groupKey} label={t(group.groupKey)}>
                  {group.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </option>
                  ))}
                </optgroup>
              ))
            : field.options?.map((option) => (
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
