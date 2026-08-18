import path from "node:path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { preloadFonts } from './scripts/vite-preload-fonts.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  json: {
    // The 24 locale files are ~150KB of JSON. Vite's default is to inline them
    // as ES object literals, which V8 has to run through its full JS parser;
    // `stringify` emits `JSON.parse("...")` instead, and JSON.parse is several
    // times faster for payloads this size. Same values either way.
    stringify: true,
  },
  build: {
    rollupOptions: {
      output: {
        // The entry chunk was 440KB parsed in one go. Total Blocking Time sums
        // (duration - 50ms) over every long task, so one 400ms eval is far
        // worse than three 130ms ones even at identical total work. These
        // splits also mean a copy change to a locale file doesn't invalidate
        // the React vendor chunk in visitors' caches.
        manualChunks(id) {
          // Only the three namespaces src/i18n/index.ts bundles eagerly are
          // grouped here. The rest are side-effect-imported by the route that
          // needs them (src/i18n/ns/*.ts), and naming them here would drag all
          // ~150KB of JSON back onto the critical path — the exact thing that
          // split was for. Left unnamed, rollup files each one with the lazy
          // route chunk that imports it.
          if (/\/src\/i18n\/locales\/(es|en)\/(common|home|metodo-cira)\.json/.test(id)) {
            return "locales";
          }
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) {
            return "react-vendor";
          }
          if (/node_modules\/(i18next|react-i18next)\//.test(id)) {
            return "i18n-vendor";
          }
          if (id.includes("node_modules/react-router")) return "router";
        },
      },
    },
  },
})
