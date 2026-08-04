import { GlobePulse } from "@/components/ui/cobe-globe-pulse";

const countryMarkers = [
  { id: "mexico", location: [19.43, -99.13] as [number, number], delay: 0 },
  { id: "centroamerica", location: [9.93, -84.08] as [number, number], delay: 0.2 },
  { id: "panama", location: [8.98, -79.52] as [number, number], delay: 0.4 },
  { id: "colombia", location: [4.71, -74.07] as [number, number], delay: 0.6 },
  { id: "ecuador", location: [-0.18, -78.47] as [number, number], delay: 0.8 },
  { id: "peru", location: [-12.05, -77.04] as [number, number], delay: 1 },
  { id: "brasil", location: [-15.79, -47.88] as [number, number], delay: 1.2 },
  { id: "chile", location: [-33.45, -70.67] as [number, number], delay: 1.4 },
  { id: "argentina", location: [-34.6, -58.38] as [number, number], delay: 1.6 },
  { id: "estados-unidos", location: [38.9, -77.04] as [number, number], delay: 1.8 },
];

export function CyrrusGlobe() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
        <GlobePulse markers={countryMarkers} speed={0.0035} />
      </div>
    </div>
  );
}
