import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHero } from "@/components/layout/page-hero";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
}

/** Shared article layout for legal/policy pages (privacidad, cookies). */
export function LegalPage({ eyebrow, title, description, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="section-y w-full bg-background">
        <div className="mx-auto w-full max-w-[720px] px-[clamp(24px,5vw,64px)]">
          <Reveal>
            <p className="font-heading text-[13px] font-medium tracking-[0.04em] text-[#5b6472]">
              {/* One string: literal text beside an expression is two adjacent
                  text nodes to React but a single one once the page has been
                  serialised to HTML, which fails hydration for the whole tree. */}
              {`Última actualización: ${lastUpdated}`}
            </p>
            <div className="prose-legal mt-8 space-y-8">{children}</div>
          </Reveal>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
