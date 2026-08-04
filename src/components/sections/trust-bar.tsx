import { LogoCarousel } from "@/components/ui/logo-carousel";
import { clientLogoNames } from "@/lib/client-logos";

const clientLogos = clientLogoNames.map((name) => (
  <div
    key={name}
    className="flex h-11 w-32 items-center justify-center rounded-md bg-navy p-1.5"
  >
    <img
      src={`/assets/logos-clientes/${encodeURIComponent(name)}.png`}
      alt={name}
      width={160}
      height={80}
      loading="lazy"
      className="h-full w-full object-contain"
    />
  </div>
));

const trustMetrics = [
  { value: "+17", label: "países" },
  { value: "1", label: "metodología propia" },
  { value: "100%", label: "agnóstica en tecnología" },
];

export function TrustBar() {
  return (
    <section className="w-full border-b border-border bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 lg:flex-row lg:justify-between lg:px-12">
        <dl className="flex w-full flex-wrap items-stretch justify-center gap-x-4 gap-y-6 sm:flex-nowrap lg:w-auto lg:justify-start">
          {trustMetrics.map((metric, i) => (
            <div
              key={metric.label}
              className={
                "flex-1 px-4 text-center sm:px-6 lg:text-left" +
                (i > 0 ? " relative sm:before:absolute sm:before:left-0 sm:before:top-1/2 sm:before:h-4/5 sm:before:w-px sm:before:-translate-y-1/2 sm:before:bg-border" : "")
              }
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd className="bg-gradient-to-br from-navy to-blue bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                {metric.value}
              </dd>
              <span className="mt-2 block text-xs font-semibold uppercase tracking-wide text-gray">
                {metric.label}
              </span>
              <span className="mx-auto mt-2.5 block h-[3px] w-9 rounded-full bg-cyan lg:mx-0" />
            </div>
          ))}
        </dl>
        <div className="w-full lg:w-auto">
          <LogoCarousel
            items={clientLogos}
            className="lg:w-[420px]"
            fadeColor="background"
          />
        </div>
      </div>
    </section>
  );
}
