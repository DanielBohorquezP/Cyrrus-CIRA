import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  eyebrow: string;
  title?: string;
  faqs: FaqItem[];
}

function FaqRow({ question, answer }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-navy/10 py-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-navy">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-cyan-ink transition-transform duration-150 ease-out",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/80">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Generic FAQ section (white bg, accordion rows) reused across detail pages — pass page-specific eyebrow/title/faqs. */
export function FaqSection({ eyebrow, title = "Preguntas frecuentes", faqs }: FaqSectionProps) {
  // metodo-cira is always loaded (see CORE_NS in src/i18n/index.ts), so this
  // reuses CiraFaq's own otherQuestion/ctaLabel copy without a new namespace.
  const { t } = useTranslation("metodo-cira");
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <Reveal>
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-ink">
            {eyebrow}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {faqs.map((faq) => (
            <FaqRow key={faq.question} {...faq} />
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <p className="text-base text-navy/80">{t("faq.otherQuestion")}</p>
          <div className="mt-4">
            <ContactCtaButton label={t("faq.ctaLabel")} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
