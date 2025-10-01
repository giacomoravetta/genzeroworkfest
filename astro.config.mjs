// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://genzeroworkfest.it",
  adapter: cloudflare(),
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
