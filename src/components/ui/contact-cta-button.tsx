import { ArrowRight } from "lucide-react";
import { BorderButton } from "@/components/ui/border-button";
import { useContactWizard } from "@/lib/contact-wizard-context";

interface ContactCtaButtonProps {
  label?: string;
  variant?: "dark" | "light";
  className?: string;
}

export function ContactCtaButton({
  label = "Agendar conversación",
  variant = "dark",
  className,
}: ContactCtaButtonProps) {
  const { openWizard } = useContactWizard();
  return (
    <BorderButton variant={variant} className={className} dot onClick={openWizard}>
      {label}
      <ArrowRight className="h-4 w-4" />
    </BorderButton>
  );
}
