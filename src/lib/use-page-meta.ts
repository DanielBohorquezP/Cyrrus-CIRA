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
  /** Set true to keep an unfinished/placeholder page out of search indexes. */
  noindex?: boolean;
  /**
   * Path of this page's translated counterpart in the other language (e.g. "/en/metodo-cira"
   * from "/metodo-cira", or vice-versa). Emits hreflang alternates + x-default when set.
   */
  alternatePath?: string;
}

export function usePageMeta({ title, description, jsonLd, image, noindex, alternatePath }: PageMeta) {
  const { pathname } = useLocation();
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : undefined;
  const jsonLdKey = jsonLdArray ? JSON.stringify(jsonLdArray) : undefined;
  const canonicalUrl = pathname === "/" ? `${SITE_URL}/` : `${SITE_URL}${pathname.replace(/\/$/, "")}` || SITE_URL;
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

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

    let robotsMeta = document.querySelector('meta[name="robots"]');
    const previousRobots = robotsMeta?.getAttribute("content") ?? null;
    const hadRobotsMeta = !!robotsMeta;
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.setAttribute("name", "robots");
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute("content", "noindex, follow");
    }

    const ogTagConfig: Array<[string, string]> = [
      ["og:title", title],
      ["og:description", description],
      ["og:url", canonicalUrl],
      ["og:image", image ?? DEFAULT_OG_IMAGE],
      // index.html hardcodes es_CO, which is right for the Spanish pages and
      // wrong for every /en one — a scraper reading an English page was told it
      // was Colombian Spanish. Managed per-page here like the rest of the OG
      // tags; the static tag stays as the shell's default.
      ["og:locale", isEnglish ? "en_US" : "es_CO"],
      ["og:locale:alternate", isEnglish ? "es_CO" : "en_US"],
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

    const twitterTagConfig: Array<[string, string]> = [
      ["twitter:title", title],
      ["twitter:description", description],
      ["twitter:image", image ?? DEFAULT_OG_IMAGE],
    ];
    const previousTwitter: Array<{ el: Element; value: string }> = [];
    for (const [name, content] of twitterTagConfig) {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      previousTwitter.push({ el, value: el.getAttribute("content") ?? "" });
      el.setAttribute("content", content);
    }

    const hreflangLinks: HTMLLinkElement[] = [];
    if (alternatePath) {
      const esUrl = isEnglish ? `${SITE_URL}${alternatePath}` : canonicalUrl;
      const enUrl = isEnglish ? canonicalUrl : `${SITE_URL}${alternatePath}`;
      const alternates: Array<[string, string]> = [
        ["es", esUrl],
        ["en", enUrl],
        ["x-default", esUrl],
      ];
      for (const [hreflang, href] of alternates) {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", hreflang);
        link.setAttribute("href", href);
        document.head.appendChild(link);
        hreflangLinks.push(link);
      }
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
      if (noindex) {
        if (hadRobotsMeta && previousRobots !== null) {
          robotsMeta?.setAttribute("content", previousRobots);
        } else {
          robotsMeta?.remove();
        }
      }
      for (const { el, value } of previousOg) {
        el.setAttribute("content", value);
      }
      for (const { el, value } of previousTwitter) {
        el.setAttribute("content", value);
      }
      for (const script of scripts) {
        script.remove();
      }
      for (const link of hreflangLinks) {
        link.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, jsonLdKey, canonicalUrl, noindex, alternatePath, isEnglish]);
}
