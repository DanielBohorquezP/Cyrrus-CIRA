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

    // prod.spline.design only gets hit from this one component (Intelligence
    // Lab's hero), so the connection is opened here instead of as a global
    // index.html preconnect — a sitewide tag was flagged by PageSpeed as
    // "unused" on every other page.
    const origin = new URL(scene).origin;
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.crossOrigin = "anonymous";
    preconnect.href = origin;
    document.head.appendChild(preconnect);

    return () => {
      link.remove();
      preconnect.remove();
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
