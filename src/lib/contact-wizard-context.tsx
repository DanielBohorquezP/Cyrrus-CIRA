import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface ContactWizardContextValue {
  isOpen: boolean;
  openWizard: () => void;
  closeWizard: () => void;
}

const ContactWizardContext = createContext<ContactWizardContextValue | null>(null);

/** Mounted once near the root (see App.tsx) so any CTA anywhere in the tree
 *  can open the contact wizard modal without threading props through pages. */
export function ContactWizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openWizard = useCallback(() => setIsOpen(true), []);
  const closeWizard = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openWizard, closeWizard }),
    [isOpen, openWizard, closeWizard],
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
