import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface ContactWizardContextValue {
  isOpen: boolean;
  /** Values to seed step fields with (e.g. `{ servicio: "leadership-academy-iso-27001" }`
   *  from a per-workshop "me interesa" CTA) — read by ContactWizardModal when it opens. */
  prefill: Record<string, string> | undefined;
  openWizard: (prefill?: Record<string, string>) => void;
  closeWizard: () => void;
}

const ContactWizardContext = createContext<ContactWizardContextValue | null>(null);

/** Mounted once near the root (see App.tsx) so any CTA anywhere in the tree
 *  can open the contact wizard modal without threading props through pages. */
export function ContactWizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<Record<string, string> | undefined>(undefined);
  const openWizard = useCallback((values?: Record<string, string>) => {
    setPrefill(values);
    setIsOpen(true);
    trackEvent("wizard_open", values);
  }, []);
  const closeWizard = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, prefill, openWizard, closeWizard }),
    [isOpen, prefill, openWizard, closeWizard],
  );

  return (
    <ContactWizardContext.Provider value={value}>
      {children}
    </ContactWizardContext.Provider>
  );
}

export function useContactWizard() {
  const ctx = useContext(ContactWizardContext);
  if (!ctx) {
    throw new Error("useContactWizard must be used within a ContactWizardProvider");
  }
  return ctx;
}
