import { ArrowRight } from "lucide-react";
import { BorderButton } from "@/components/ui/border-button";
import { useContactWizard } from "@/lib/contact-wizard-context";

interface ContactCtaButtonProps {
  label?: string;
  variant?: "dark" | "light";
  className?: string;
  /** Values to seed the wizard's fields with when it opens (e.g. preselect
   *  a specific workshop's "servicio" option). */
  prefill?: Record<string, string>;
}

export function ContactCtaButton({
  label = "Agendar conversación",
  variant = "dark",
  className,
  prefill,
}: ContactCtaButtonProps) {
  const { openWizard } = useContactWizard();
  return (
    <BorderButton variant={variant} className={className} dot onClick={() => openWizard(prefill)}>
      {label}
      <ArrowRight className="h-4 w-4" />
    </BorderButton>
  );
}
