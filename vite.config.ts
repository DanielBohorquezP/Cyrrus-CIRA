import path from "node:path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
          if (id.includes("/src/i18n/locales/")) return "locales";
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
