import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
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
  /** `centered`: heading above the list (service pages). `split`: heading left, list right (Home). */
  layout?: "centered" | "split";
  className?: string;
}

/**
 * The accordion itself: one answer open at a time, +/− indicator, navy rule on
 * top and 1px separators. The first answer starts open. The answers are always
 * in the DOM (collapsed with grid rows, `inert` while closed), so crawlers and
 * the FAQPage schema see the same text users do.
 */
export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="border-t border-navy">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.question} className="border-b border-line-2">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-${index}`}
                className="flex w-full items-start justify-between gap-6 py-6 text-left font-heading text-lg font-medium leading-snug text-navy"
              >
                {faq.question}
                <span aria-hidden="true" className="text-2xl font-light leading-none text-blue">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`${baseId}-${index}`}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-7 pr-12 text-[17px] leading-[1.75] text-slate">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Generic FAQ section reused across pages — pass page-specific eyebrow/title/faqs. */
export function FaqSection({
  eyebrow,
  title = "Preguntas frecuentes",
  faqs,
  layout = "centered",
  className,
}: FaqSectionProps) {
  // metodo-cira is always loaded (see CORE_NS in src/i18n/index.ts), so this
  // reuses CiraFaq's own otherQuestion/ctaLabel copy without a new namespace.
  const { t } = useTranslation("metodo-cira");
  const split = layout === "split";

  const followUp = (
    <Reveal delay={0.15} className="mt-12">
      <p className="text-[17px] text-slate">{t("faq.otherQuestion")}</p>
      <div className="mt-4">
        <ContactCtaButton label={t("faq.ctaLabel")} variant="dark" />
      </div>
    </Reveal>
  );

  if (split) {
    return (
      <section className={cn("section-y w-full bg-mist", className)}>
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-24 gap-y-14">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="t-h2 mt-5 text-navy">{title}</h2>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <FaqAccordion faqs={faqs} />
            </Reveal>
            {followUp}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("section-y w-full bg-white", className)}>
      <div className="mx-auto w-full max-w-[960px] px-[clamp(24px,5vw,64px)]">
        <Reveal className="text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="t-h2 mt-5 text-navy">{title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <FaqAccordion faqs={faqs} />
        </Reveal>
        {followUp}
      </div>
    </section>
  );
}
