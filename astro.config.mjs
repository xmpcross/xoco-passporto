// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import rehypeSlug from "rehype-slug";
import { siteConfig } from "./src/config/site.ts";

export default defineConfig({
  site: siteConfig.siteUrl,
  // The search page is query-driven and marked noindex, so keep it out of the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes("/search/") }), mdx()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
