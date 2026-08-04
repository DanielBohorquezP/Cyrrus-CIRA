import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BorderButton } from "@/components/ui/border-button";
import { AnimatedNavyBackground } from "@/components/ui/animated-navy-background";

interface About3Props {
  title?: string;
  description?: string;
  children?: ReactNode;
  /** When set, renders a single full-width image instead of the mainImage + breakout + secondaryImage grid. */
  singleImage?: {
    src: string;
    alt: string;
  };
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const defaultAchievements = [
  { label: "Companies Supported", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" },
];

export const About3 = ({
  title = "About Us",
  description = "Shadcnblocks is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
  singleImage,
  mainImage,
  secondaryImage,
  breakout,
  companiesTitle = "Valued by clients worldwide",
  companies = [],
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements = defaultAchievements,
  children,
}: About3Props = {}) => {
  const isInternalUrl = (url: string) => url.startsWith("/");

  return (
    <AnimatedNavyBackground className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-white/70">{description}</p>
        </div>
        {singleImage && (
          <img
            src={singleImage.src}
            alt={singleImage.alt}
            width={960}
            height={480}
            loading="lazy"
            className="max-h-[480px] w-full rounded-xl object-cover"
          />
        )}
        {!singleImage && mainImage && breakout && secondaryImage && (
          <div className="grid gap-7 lg:grid-cols-3">
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              width={800}
              height={620}
              loading="lazy"
              className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
            />
            <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
              <div className="flex flex-col justify-between gap-6 rounded-xl border border-white/10 bg-white/5 p-7 md:w-1/2 lg:w-auto">
                <img
                  src={breakout.src}
                  alt={breakout.alt}
                  width={100}
                  height={40}
                  loading="lazy"
                  className="mr-auto h-10"
                />
                <div>
                  <p className="mb-2 text-lg font-semibold text-white">
                    {breakout.title}
                  </p>
                  <p className="text-white/70">{breakout.description}</p>
                </div>
                {breakout.buttonUrl && isInternalUrl(breakout.buttonUrl) ? (
                  <BorderButton variant="light" className="mr-auto" asChild dot>
                    <Link to={breakout.buttonUrl}>{breakout.buttonText}</Link>
                  </BorderButton>
                ) : (
                  <BorderButton variant="light" className="mr-auto" asChild dot>
                    <a
                      href={breakout.buttonUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {breakout.buttonText}
                    </a>
                  </BorderButton>
                )}
              </div>
              <img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                width={400}
                height={620}
                loading="lazy"
                className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
              />
            </div>
          </div>
        )}

        {children && <div className="mt-14">{children}</div>}

        {companies.length > 0 && (
          <div className="py-20">
            <p className="text-center text-white/60">{companiesTitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              {companies.map((company, idx) => (
                <div
                  className="flex items-center gap-3"
                  key={company.src + idx}
                >
                  <img
                    src={company.src}
                    alt={company.alt}
                    width={120}
                    height={32}
                    loading="lazy"
                    className="h-6 w-auto md:h-8 brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {achievements.length > 0 && (
          <div className="relative mt-14 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-10 md:p-16">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h3 className="text-3xl font-semibold text-white md:text-4xl">
                {achievementsTitle}
              </h3>
              <p className="max-w-screen-sm text-white/70">
                {achievementsDescription}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap justify-between gap-10 text-center md:text-left">
              {achievements.map((item, idx) => (
                <div className="flex flex-col gap-4" key={item.label + idx}>
                  <p className="text-white/60">{item.label}</p>
                  <span className="text-4xl font-semibold text-cyan md:text-5xl">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block" />
          </div>
        )}
      </div>
    </AnimatedNavyBackground>
  );
};
