import { StrictMode, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'

// The initial render is wrapped in startTransition so React treats it as
// interruptible work and yields to the browser between units, instead of
// building the whole ~1,000-element tree in one 470ms task. Total Blocking
// Time only counts the part of a task past 50ms, so the same work split across
// several short tasks costs far less.
//
// Deferring the commit is free here because the page is prerendered (see
// scripts/prerender.mjs): the static markup is already painted, so First
// Contentful Paint and LCP don't wait on React at all — this only moves when
// the client re-render swaps in underneath what the visitor is already
// looking at.
const root = createRoot(document.getElementById('root')!)
startTransition(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
