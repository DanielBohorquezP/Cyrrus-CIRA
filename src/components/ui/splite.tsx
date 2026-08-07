import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className="relative h-full w-full">
      <Suspense fallback={null}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </div>
  );
}
