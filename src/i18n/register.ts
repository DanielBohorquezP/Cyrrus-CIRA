import i18next from "i18next";

type Bundle = Record<string, unknown>;

/**
 * Registers a route-scoped namespace for both languages.
 *
 * Called at module scope from src/i18n/ns/*.ts, which every page imports for
 * its own namespace — so the copy is in i18next's store before the route's
 * component ever renders, and `t()` behaves exactly as it did when all 12
 * namespaces were bundled into the entry chunk.
 *
 * Both languages are registered together on purpose: the language switcher is
 * a client-side navigation between /x and /en/x, which resolves to the same
 * lazy chunk, so an ES-only registration would leave the EN visit rendering
 * raw keys.
 */
export function registerNamespace(ns: string, bundles: { es: Bundle; en: Bundle }) {
  for (const lng of ["es", "en"] as const) {
    if (i18next.hasResourceBundle(lng, ns)) continue;
    // deep = true, overwrite = true — matches how `resources` merges at init.
    i18next.addResourceBundle(lng, ns, bundles[lng], true, true);
  }
}
