import { BorderButton } from "@/components/ui/border-button";
import { useContactWizard } from "@/lib/contact-wizard-context";

interface ContactCtaButtonProps {
  label?: string;
  variant?: "dark" | "light";
  size?: "default" | "sm" | "lg";
  className?: string;
  /** Values to seed the wizard's fields with when it opens (e.g. preselect
   *  a specific workshop's "servicio" option). */
  prefill?: Record<string, string>;
}

/** The standard "open the contact wizard" CTA: the 56px outline pill with the sky dot. */
export function ContactCtaButton({
  label = "Agendar conversación",
  variant = "dark",
  size = "lg",
  className,
  prefill,
}: ContactCtaButtonProps) {
  const { openWizard } = useContactWizard();
  return (
    <BorderButton variant={variant} size={size} className={className} dot onClick={() => openWizard(prefill)}>
      {label}
    </BorderButton>
  );
}
