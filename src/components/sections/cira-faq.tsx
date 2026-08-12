import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ContactCtaButton } from "@/components/ui/contact-cta-button";
import { cn } from "@/lib/utils";

interface Faq {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: Faq) {
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
            "h-5 w-5 shrink-0 text-cyan transition-transform duration-150 ease-out",
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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/70">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CiraFaq() {
  const { t } = useTranslation("metodo-cira");
  const faqs = t("faq.items", { returnObjects: true }) as Faq[];

  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
            {t("faq.eyebrow")}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">
            {t("faq.title")}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <p className="text-base text-navy/70">{t("faq.otherQuestion")}</p>
          <div className="mt-4">
            <ContactCtaButton label={t("faq.ctaLabel")} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
