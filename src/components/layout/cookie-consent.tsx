import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BorderButton } from "@/components/ui/border-button";

const STORAGE_KEY = "cyrrus-cookie-consent";

export type CookieConsentValue = "accepted" | "rejected";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) {
      setVisible(true);
    }
  }, []);

  function choose(value: CookieConsentValue) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] sm:flex-row sm:items-center sm:p-6">
            <p className="flex-1 text-base leading-relaxed text-gray">
              Usamos cookies estrictamente necesarias para que este sitio funcione. Solo si usted lo
              acepta, usamos también cookies de Google Analytics y otras herramientas para entender
              cómo se usa el sitio. Puede leer más en nuestra{" "}
              <Link to="/cookies" className="text-blue underline underline-offset-2">
                Política de Cookies
              </Link>
              .
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="text-sm font-medium text-gray transition-colors hover:text-navy"
              >
                Rechazar
              </button>
              <BorderButton variant="dark" size="sm" onClick={() => choose("accepted")}>
                Aceptar
              </BorderButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
