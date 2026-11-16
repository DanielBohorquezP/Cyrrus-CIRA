import { useTranslation } from "react-i18next";
import { WhatsAppIcon } from "@/components/ui/whatsapp-button";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Round WhatsApp button pinned to the bottom-right corner of every page.
 *
 * It is plain static markup (no state, no effect, no animation beyond a hover
 * nudge), so the prerendered HTML and React's first render are identical and it
 * costs nothing on load. It sits below the cookie banner and the contact
 * dialog (both z-50) so neither is ever covered by it.
 */
export function FloatingWhatsApp() {
  const { t } = useTranslation();
  return (
    <a
      href={whatsappUrl(t("cta.whatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("cta.whatsapp")}
      title={t("cta.whatsapp")}
      onClick={() => trackEvent("whatsapp_click", { source: "floating" })}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-[transform] duration-150 ease-out hover:scale-105 sm:right-6 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] print:hidden"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
