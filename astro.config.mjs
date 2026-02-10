import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import markdoc from "@astrojs/markdoc";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://promptmarketing.com",
  integrations: [
    icon(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    markdoc(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});
