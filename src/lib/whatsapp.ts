/** Cyrrus's WhatsApp line (international format, digits only, as wa.me expects). */
export const WHATSAPP_NUMBER = "573175730635";
/** Same number as shown to people. */
export const WHATSAPP_DISPLAY = "+57 317 5730635";

/** wa.me link that opens a chat with the number and a pre-filled first message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
