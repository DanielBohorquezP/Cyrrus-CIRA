import type { ComponentPropsWithoutRef } from "react";
import manifest from "@/lib/image-manifest.json";

/** Kept in step with WIDTHS / NEAR_ORIGINAL in scripts/optimize-images.mjs. The
 *  two have to agree: the script decides which files exist, this decides which
 *  ones to ask for. */
const WIDTHS = [400, 640, 960, 1280, 1600];
const NEAR_ORIGINAL = 0.88;

type Manifest = Record<string, [number, number]>;
// The JSON import widens `[w, h]` to number[]; the file is generated, so the
// pair shape is guaranteed by scripts/optimize-images.mjs rather than by TS.
const images = manifest as unknown as Manifest;

/** `/assets/x/y.jpg` -> `/assets/x/opt/y` — where the derivatives live. */
function optBase(src: string): string {
  const slash = src.lastIndexOf("/");
  const dir = src.slice(0, slash);
  const file = src.slice(slash + 1).replace(/\.[^.]+$/, "");
  return `${dir}/opt/${file}`;
}

function variantsFor(intrinsicWidth: number): number[] {
  const widths = WIDTHS.filter((w) => w < intrinsicWidth * NEAR_ORIGINAL);
  widths.push(intrinsicWidth);
  return widths;
}

interface ImgProps extends Omit<ComponentPropsWithoutRef<"img">, "srcSet"> {
  src: string;
  alt: string;
  /**
   * The slot's rendered width, per breakpoint — e.g.
   * `"(min-width: 768px) 560px, 100vw"`. Get this roughly right: it's what the
   * browser uses to pick a candidate, and the default of `100vw` makes a phone
   * download an image wide enough to fill the screen edge to edge even when the
   * slot is a third of that.
   */
  sizes?: string;
}

/**
 * An `<img>` that serves a size appropriate to the slot it renders in.
 *
 * The photos in public/assets/decoracion are 1600px camera originals, and they
 * were being sent at full size into slots 300-640 CSS px wide — a 269KB JPEG to
 * fill a space that needs 35KB. scripts/optimize-images.mjs pre-renders each one
 * at several widths as WebP; this picks between them with `srcset`.
 *
 * Anything not in the manifest (an SVG, a new file added without running the
 * script) falls through to a plain `<img>` with the original `src`, so a missing
 * entry degrades to exactly the old behaviour rather than to a broken image.
 *
 * `width`/`height` default to the intrinsic size so the browser can reserve the
 * right box before the bytes arrive; pass them explicitly to override the
 * aspect ratio the layout actually uses.
 */
export function Img({ src, alt, sizes = "100vw", width, height, loading, ...rest }: ImgProps) {
  const entry = images[src];

  if (!entry) {
    return <img src={src} alt={alt} width={width} height={height} loading={loading} {...rest} />;
  }

  const [intrinsicWidth, intrinsicHeight] = entry;
  const base = optBase(src);
  const widths = variantsFor(intrinsicWidth);
  const srcSet = widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");

  return (
    <img
      // The largest variant as the plain `src`: it's only ever used by browsers
      // that ignore srcset, which in practice means none of them.
      src={`${base}-${widths[widths.length - 1]}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width ?? intrinsicWidth}
      height={height ?? intrinsicHeight}
      loading={loading ?? "lazy"}
      decoding="async"
      {...rest}
    />
  );
}
