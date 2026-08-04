import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.cyrruscs.com";

const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

interface PageMeta {
  title: string;
  description: string;
  /** Optional JSON-LD structured data (e.g. a Service schema) injected for this page only. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Optional page-specific social share image (absolute URL). Falls back to the site default. */
  image?: string;
}

export function usePageMeta({ title, description, jsonLd, image }: PageMeta) {
  const { pathname } = useLocation();
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : undefined;
  const jsonLdKey = jsonLdArray ? JSON.stringify(jsonLdArray) : undefined;
  const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname.replace(/\/$/, "")}` || SITE_URL;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let descriptionMeta = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionMeta?.getAttribute("content") ?? "";
    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.setAttribute("name", "description");
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute("content", description);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonicalLink?.getAttribute("href") ?? "";
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    const ogTagConfig: Array<[string, string]> = [
      ["og:title", title],
      ["og:description", description],
      ["og:url", canonicalUrl],
      ["og:image", image ?? DEFAULT_OG_IMAGE],
    ];
    const previousOg: Array<{ el: Element; value: string }> = [];
    for (const [property, content] of ogTagConfig) {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      previousOg.push({ el, value: el.getAttribute("content") ?? "" });
      el.setAttribute("content", content);
    }

    const scripts: HTMLScriptElement[] = [];
    if (jsonLdArray) {
      for (const entry of jsonLdArray) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(entry);
        script.dataset.pageJsonLd = "true";
        document.head.appendChild(script);
        scripts.push(script);
      }
    }

    return () => {
      document.title = previousTitle;
      descriptionMeta?.setAttribute("content", previousDescription);
      canonicalLink?.setAttribute("href", previousCanonical);
      for (const { el, value } of previousOg) {
        el.setAttribute("content", value);
      }
      for (const script of scripts) {
        script.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, jsonLdKey, canonicalUrl]);
}
