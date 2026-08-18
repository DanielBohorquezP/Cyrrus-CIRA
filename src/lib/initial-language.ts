import { LANG_STORAGE_KEY } from "@/lib/language";
import { isPrerender } from "@/lib/prerender";

/**
 * Decides, before React renders anything, whether a first-time visitor landing
 * on "/" belongs on the English site.
 *
 * This used to be a `useEffect` inside LanguageProvider, which meant the
 * sequence for anyone whose browser isn't set to Spanish was: render the entire
 * Spanish page, then call navigate("/en"), then render the entire English page
 * — two full passes over ~1,000 elements, back to back, in the load window.
 * (It's also the path Lighthouse itself takes: headless Chrome reports en-US
 * and starts with an empty profile, so the score was being measured on the
 * double render.)
 *
 * Rewriting the URL before the first render collapses that to one pass. The
 * visitor ends up on the same URL with the same content; they just never see
 * the Spanish version get built and thrown away.
 *
 * replaceState rather than a router navigate, because the router doesn't exist
 * yet — that's the whole point. BrowserRouter reads location on mount, so it
 * comes up on the corrected URL, and there's no extra history entry for the
 * back button to catch on.
 *
 * Only "/" is ever considered: every other path states its language explicitly,
 * and a stored preference (set here or by the language switcher) always wins,
 * so this runs at most once per visitor.
 */
export function resolveInitialLanguage(): void {
  if (typeof window === "undefined") return;
  // The prerenderer seeds its own preference and captures the canonical
  // document for a known URL — it must never redirect. See src/lib/prerender.ts.
  if (isPrerender()) return;
  if (window.location.pathname !== "/") return;

  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  } catch {
    // Storage blocked (private mode, etc.) — leave the visitor on the
    // canonical Spanish page rather than guessing on every single load.
    return;
  }
  if (stored) return;

  const browserLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
  const prefersSpanish = browserLangs.some((l) => l.toLowerCase().startsWith("es"));

  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, prefersSpanish ? "es" : "en");
  } catch {
    // Non-fatal: the detection just re-runs next visit.
  }

  if (!prefersSpanish) {
    window.history.replaceState(null, "", "/en");
  }
}

resolveInitialLanguage();
