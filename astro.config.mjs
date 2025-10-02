// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://genzeroworkfest.it",
  output: "server",
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()],
  },

  server: {
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  },

  adapter: cloudflare(),
});
