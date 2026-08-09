import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// Marketing pages are prerendered to static HTML; the blog list, blog posts
// and the RSS feed opt into on-demand rendering (`export const prerender = false`)
// so content pulled from the external EllieBlog repo stays fresh without a rebuild.
export default defineConfig({
  site: "https://www.ellie-lang.org",
  output: "static",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
});
