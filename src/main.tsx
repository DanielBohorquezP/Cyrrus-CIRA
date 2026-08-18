import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
// First import on purpose: it may rewrite the URL, and both './i18n' and the
// router below read location as they initialise. ES module side effects run in
// import order, so this is the one place that ordering is guaranteed.
import './lib/initial-language'
import './index.css'
import './i18n'
import App, { preloadRouteChunk } from './App.tsx'

// Every route ships as fully-rendered static HTML (see scripts/prerender.mjs),
// so the page a visitor sees is already painted before React runs. What React
// does next is the whole performance story for this site.
//
// It used to call createRoot().render(), which *discards* the container's
// children and builds the ~1,000-element tree again from nothing. Measured on a
// 4x-throttled CPU that was ~700ms of blocking time — and blocking time it
// accounted for essentially all of: with scripts blocked, the same HTML and CSS
// produce zero. React was re-doing, in JavaScript, work the browser had already
// finished, and forcing a second full layout on top.
//
// hydrateRoot walks the markup that's already there and attaches to it instead.
// The DOM isn't rebuilt and the layout isn't redone; React only wires up
// events and state.
//
// For that to hold, the static HTML has to match React's *first* render, which
// is why the deferred/client-only bits opt out of prerender capture — see
// src/lib/prerender.ts. If it ever stops matching, React reports a recoverable
// error and rebuilds the subtree: slower, but never broken, and the fallback
// below keeps a genuinely empty container working too.
const container = document.getElementById('root')!

// Hydration is only valid when the markup already in the container is for the
// page we're about to render. It isn't when a first-time visitor with a
// non-Spanish browser lands on "/": the document served was the Spanish one,
// and initial-language.ts has just rewritten the URL to /en. React would find a
// mismatch in every text node, so render fresh instead — still only one pass,
// where this case used to cost two.
const documentLang = document.documentElement.lang
const targetLang = window.location.pathname === '/en' || window.location.pathname.startsWith('/en/') ? 'en' : 'es'

if (container.firstChild && documentLang === targetLang) {
  // Wait for this route's code-split chunk before hydrating. A lazy route that
  // isn't loaded yet suspends on its first render, and React can't hydrate a
  // suspended boundary — it discards the markup and rebuilds, which is the one
  // thing we're here to avoid. The page is already painted, so this costs a
  // fetch before the page becomes interactive, not before it becomes visible.
  preloadRouteChunk(window.location.pathname).then(() => {
    hydrateRoot(
      container,
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
} else {
  // The dev server and the pristine build shell both serve an empty #root.
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
