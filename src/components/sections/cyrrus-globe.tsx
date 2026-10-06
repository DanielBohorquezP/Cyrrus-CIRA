import { GlobePulse } from "@/components/ui/cobe-globe-pulse";
import { ClientOnly } from "@/components/ui/client-only";

// The 15 markets in the Organization's areaServed (index.html). Keep both in sync.
const countryMarkers = [
  { id: "mexico", location: [19.43, -99.13] as [number, number], delay: 0 },
  { id: "guatemala", location: [14.63, -90.51] as [number, number], delay: 0.15 },
  { id: "centroamerica", location: [9.93, -84.08] as [number, number], delay: 0.3 },
  { id: "panama", location: [8.98, -79.52] as [number, number], delay: 0.45 },
  { id: "republica-dominicana", location: [18.49, -69.93] as [number, number], delay: 0.6 },
  { id: "puerto-rico", location: [18.47, -66.11] as [number, number], delay: 0.75 },
  { id: "venezuela", location: [10.48, -66.9] as [number, number], delay: 0.9 },
  { id: "colombia", location: [4.71, -74.07] as [number, number], delay: 1.05 },
  { id: "ecuador", location: [-0.18, -78.47] as [number, number], delay: 1.2 },
  { id: "peru", location: [-12.05, -77.04] as [number, number], delay: 1.35 },
  { id: "brasil", location: [-15.79, -47.88] as [number, number], delay: 1.5 },
  { id: "chile", location: [-33.45, -70.67] as [number, number], delay: 1.65 },
  { id: "argentina", location: [-34.6, -58.38] as [number, number], delay: 1.8 },
  { id: "uruguay", location: [-34.9, -56.16] as [number, number], delay: 1.95 },
  { id: "estados-unidos", location: [38.9, -77.04] as [number, number], delay: 2.1 },
];

export function CyrrusGlobe() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      {/* The canvas mounts after hydration: cobe writes its own attributes and
          positions every marker from live measurements, so this subtree can
          never match prerendered markup. See ClientOnly. The placeholder holds
          the same square box, so nothing moves when it arrives. */}
      <div className="w-full max-w-[420px]">
        <ClientOnly fallback={<div className="aspect-square w-full" />}>
          <GlobePulse markers={countryMarkers} speed={0.0035} />
        </ClientOnly>
      </div>
    </div>
  );
}
