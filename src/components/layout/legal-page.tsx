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
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <Reveal>
            <p className="text-sm text-muted-foreground">
              Última actualización: {lastUpdated}
            </p>
            <div className="prose-legal mt-8 space-y-8">{children}</div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
