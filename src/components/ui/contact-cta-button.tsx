import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BorderButton } from "@/components/ui/border-button";

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
  return (
    <BorderButton asChild variant={variant} className={className} dot>
      <Link to="/contacto#formulario">
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </BorderButton>
  );
}
