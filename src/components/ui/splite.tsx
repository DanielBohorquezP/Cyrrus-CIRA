import { Suspense, lazy, useEffect, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idle = hasIdleCallback
      ? window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
      : window.setTimeout(() => setReady(true), 200);

    return () => {
      if (hasIdleCallback) {
        window.cancelIdleCallback(idle as number);
      } else {
        window.clearTimeout(idle as number);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="h-24 w-24 rounded-full bg-cyan/10 blur-2xl" />
      </div>

      {ready && (
        <Suspense fallback={null}>
          <div
            className={`h-full w-full transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Spline scene={scene} className={className} onLoad={() => setLoaded(true)} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
