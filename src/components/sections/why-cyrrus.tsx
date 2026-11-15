import { useTranslation } from "react-i18next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";

interface Reason {
  title: string;
  description: string;
}

export function WhyCyrrus() {
  const { t } = useTranslation("home");
  const reasons = t("whyCyrrus.reasons", { returnObjects: true }) as Reason[];
  // The title is two sentences; the second one carries the point, so it gets the accent colour.
  const [lead, ...rest] = t("whyCyrrus.title").split(/(?<=\.)\s+/);

  return (
    <section className="cv-section section-y w-full bg-mist">
      <div className="container-site">
        <Reveal>
          <Eyebrow>{t("whyCyrrus.eyebrow")}</Eyebrow>
          <h2 className="t-h2 mt-6 max-w-[960px] font-medium text-navy">
            {rest.length > 0 ? (
              <>
                {`${lead} `}<span className="text-blue">{rest.join(" ")}</span>
              </>
            ) : (
              lead
            )}
          </h2>
        </Reveal>

        <RevealGroup className="mt-20 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-14">
          {reasons.map((reason, index) => (
            <RevealItem key={reason.title} index={index}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy font-heading text-sm font-semibold text-sky">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-[18px] font-heading text-[22px] font-semibold leading-[1.3] text-balance text-navy">
                {reason.title}
              </h3>
              <p className="mt-4 text-[17px] leading-[1.7] text-slate">{reason.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
