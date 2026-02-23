import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
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
    sanity({
      projectId: 'pbui2f8s',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});
