import { useTranslation } from "react-i18next";
import { BorderButton } from "@/components/ui/border-button";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.47 15.04L2 22l5.1-1.34A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.03.8.81-2.95-.2-.31a8.2 8.2 0 1 1 6.9 3.79Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.3-.23.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.55.67 2.16.72 2.94.6.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.23-.16-.47-.28Z" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  /** `light` on navy/photo sections, `dark` on white ones (same as BorderButton). */
  variant?: "light" | "dark";
  size?: "default" | "sm" | "lg";
  className?: string;
  /** Where on the site the click came from, for the analytics event. */
  source: string;
  /** First message of the chat. Defaults to a generic greeting in the page language. */
  message?: string;
}

/** Outline button that opens a WhatsApp chat with Cyrrus in a new tab. */
export function WhatsAppButton({ variant = "dark", size = "default", className, source, message }: WhatsAppButtonProps) {
  const { t } = useTranslation();
  return (
    <BorderButton asChild variant={variant} size={size} className={className}>
      <a
        href={whatsappUrl(message ?? t("cta.whatsappMessage"))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { source })}
      >
        <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" />
        {t("cta.whatsapp")}
      </a>
    </BorderButton>
  );
}
