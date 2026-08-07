import { Suspense, lazy, useEffect } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  useEffect(() => {
    // The Spline JS runtime only requests the scene file once it has
    // downloaded, parsed, and run — so today the scene fetch starts only
    // after that. Preloading it here lets the browser fetch the scene data
    // in parallel with the runtime bundle instead of waiting for it.
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "fetch";
    link.crossOrigin = "anonymous";
    link.href = scene;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [scene]);

  return (
    <div className="relative h-full w-full">
      <Suspense fallback={null}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </div>
  );
}
