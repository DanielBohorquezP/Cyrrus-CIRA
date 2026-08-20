import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { BorderButton } from "@/components/ui/border-button";
import { cn } from "@/lib/utils";
import { useContactWizard } from "@/lib/contact-wizard-context";
import {
  CONTACT_WIZARD_STEPS,
  LAST_STEP_AT_LEAST_ONE_OF,
} from "@/lib/contact-wizard-config";
import { WizardFieldControl } from "./wizard-field";
// Registers this namespace. Side-effect import: it must run before this
// component renders so the copy is in i18next's store. Loaded here (not
// per-route) because the modal is mounted once near the app root and can be
// opened from any page — see src/lib/contact-wizard-context.tsx.
import "@/i18n/ns/contact-wizard";

const WEB3FORMS_ACCESS_KEY = "12bc1ce9-5114-4a56-8e62-15d72909c577";
const BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/36a682fd69fa4a078116c9fb6e022758@cyrruscs.com/meetingtype/4zB0n7tCSUWh4tWE1YWKlg2?anonymous&ismsaljsauthenabled&ep=mlink";

type Status = "idle" | "submitting" | "success" | "error";

function emptyValues(): Record<string, string> {
  const values: Record<string, string> = {};
  for (const step of CONTACT_WIZARD_STEPS) {
    for (const field of step.fields) values[field.id] = "";
  }
  return values;
}

/**
 * The multi-step contact wizard, mounted once near the app root
 * (src/App.tsx) and opened from any CTA via useContactWizard().openWizard().
 * Replaces the old /contacto page — see src/lib/contact-wizard-config.ts for
 * the step/field data and CLAUDE.md for why nothing here needs isPrerender()/
 * ClientOnly (it starts closed and only mounts real content on a click that
 * can't happen during static prerender capture).
 */
export function ContactWizardModal() {
  const { t } = useTranslation("contact-wizard");
  const { isOpen, closeWizard } = useContactWizard();
  const reduceMotion = useReducedMotion();

  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Record<string, string>>(emptyValues);
  const [stepError, setStepError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const totalSteps = CONTACT_WIZARD_STEPS.length;
  const step = CONTACT_WIZARD_STEPS[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;

  function resetWizard() {
    setStepIndex(0);
    setValues(emptyValues());
    setStepError(null);
    setStatus("idle");
  }

  function handleOpenChange(open: boolean) {
    if (open) return;
    closeWizard();
    // Reset after the close transition finishes so the content doesn't
    // visibly jump back to step 1 while the dialog is still fading out.
    window.setTimeout(resetWizard, 200);
  }

  function setValue(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
    setStepError(null);
  }

  function validateStep(): boolean {
    for (const field of step.fields) {
      if (field.required && !values[field.id].trim()) {
        setStepError(t("requiredError"));
        return false;
      }
    }
    if (isLastStep) {
      const hasContactInfo = LAST_STEP_AT_LEAST_ONE_OF.some((id) => values[id]?.trim());
      if (!hasContactInfo) {
        setStepError(t("steps.contacto.atLeastOneError"));
        return false;
      }
    }
    return true;
  }

  async function submit() {
    setStatus("submitting");
    try {
      const serviceOption = CONTACT_WIZARD_STEPS[0].fields[0].options?.find(
        (option) => option.value === values.servicio,
      );
      const serviceLabel = serviceOption ? t(serviceOption.labelKey) : values.servicio;

      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append(
        "subject",
        `Nueva consulta desde cyrruscs.com — ${serviceLabel} — ${values.nombre}`,
      );
      formData.append("from_name", "Wizard de contacto — Cyrrus");
      formData.append("botcheck", "");
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }
      formData.append("servicio_label", serviceLabel);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  function handleStepSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validateStep()) return;
    if (isLastStep) {
      void submit();
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function handleBack() {
    setStepError(null);
    setStatus("idle");
    setStepIndex((i) => Math.max(0, i - 1));
  }

  const stepTransition = reduceMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" as const };
  // Staggers the fields within a step so each one visibly "appears" in turn
  // instead of the whole block popping in at once — same entrance pattern
  // for all 4 steps (the choice cards on step 1 stagger the same way, see
  // wizard-field.tsx).
  const fieldsContainerVariants = { initial: {}, animate: { transition: { staggerChildren: 0.08 } } };
  const fieldItemVariants = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="sr-only">{t("dialogTitle")}</DialogTitle>
          <DialogDescription className="sr-only">{t("dialogTitle")}</DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stepTransition}
            className="flex flex-col items-center gap-3 py-6 text-center"
          >
            <CheckCircle2 className="h-12 w-12 text-blue" />
            <h2 className="text-lg font-semibold text-navy">{t("success.title")}</h2>
            <p className="max-w-sm text-sm leading-relaxed text-gray">
              {t("success.description")}
            </p>

            <div className="mt-3 w-full max-w-sm rounded-xl border border-muted bg-muted/30 p-4 text-left">
              <p className="text-sm font-semibold text-navy">{t("success.bookCall.title")}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray">
                {t("success.bookCall.description")}
              </p>
              <BorderButton
                asChild
                variant="dark"
                dot
                size="sm"
                className="mt-3"
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  {t("success.bookCall.cta")}
                </a>
              </BorderButton>
            </div>

            <BorderButton
              type="button"
              variant="light"
              size="sm"
              className="mt-1"
              onClick={() => handleOpenChange(false)}
            >
              {t("success.close")}
            </BorderButton>
          </motion.div>
        ) : (
          <form onSubmit={handleStepSubmit} noValidate>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("nav.step", { current: stepIndex + 1, total: totalSteps })}
            </p>
            <div className="mt-2 flex gap-1.5">
              {CONTACT_WIZARD_STEPS.map((s, i) => (
                <span
                  key={s.id}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-[background-color] duration-200",
                    i <= stepIndex ? "bg-blue" : "bg-muted",
                  )}
                />
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.id}
                initial={reduceMotion ? undefined : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                transition={stepTransition}
                className="mt-5"
              >
                <h2 className="text-lg font-semibold text-navy">{t(step.titleKey)}</h2>

                <motion.div
                  className={cn(
                    "mt-4",
                    step.fields.length > 1 && "grid grid-cols-1 gap-4 sm:grid-cols-2",
                  )}
                  variants={reduceMotion ? undefined : fieldsContainerVariants}
                  initial={reduceMotion ? undefined : "initial"}
                  animate={reduceMotion ? undefined : "animate"}
                >
                  {step.fields.map((field) =>
                    // "choice" (the step-1 service cards) animates its own
                    // options with its own stagger — wrapping it in another
                    // fade+stagger layer here would double up the motion.
                    field.type === "choice" ? (
                      <WizardFieldControl
                        key={field.id}
                        field={field}
                        value={values[field.id]}
                        onChange={(v) => setValue(field.id, v)}
                        t={t}
                        reduceMotion={!!reduceMotion}
                      />
                    ) : (
                      <motion.div key={field.id} variants={reduceMotion ? undefined : fieldItemVariants}>
                        <WizardFieldControl
                          field={field}
                          value={values[field.id]}
                          onChange={(v) => setValue(field.id, v)}
                          t={t}
                          reduceMotion={!!reduceMotion}
                        />
                      </motion.div>
                    ),
                  )}
                </motion.div>

                {step.id === "contacto" && !stepError && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {t("steps.contacto.atLeastOneNote")}
                  </p>
                )}

                {stepError && <p className="mt-3 text-sm text-destructive">{stepError}</p>}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between gap-3">
              {stepIndex > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm font-medium text-gray transition-colors duration-150 hover:text-navy"
                >
                  {t("nav.back")}
                </button>
              ) : (
                <span />
              )}

              <BorderButton type="submit" variant="dark" dot disabled={status === "submitting"}>
                {status === "submitting"
                  ? t("nav.sending")
                  : isLastStep
                    ? t("nav.submit")
                    : t("nav.next")}
              </BorderButton>
            </div>

            {status === "error" && <p className="mt-3 text-sm text-destructive">{t("submitError")}</p>}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
