# Ellie Language Site

Source code for the [Ellie Language](https://ellie-lang.org) website.

Built with [Astro](https://astro.build) and deployed to
[Cloudflare Pages](https://pages.cloudflare.com) via the
[`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
adapter.

## Architecture

- Marketing pages (`/`, `/about`, `/releases`, `/wip`, `404`, `500`) are
  **prerendered** to static HTML at build time.
- The blog (`/blog`, `/blog/[name]`) and the RSS feed (`/rss`) are **rendered
  on demand** (`export const prerender = false`). They pull content from the
  external [EllieBlog](https://github.com/behemehal/EllieBlog) repository at
  request time, so new posts appear without rebuilding this site.

## Development

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
```

## Build & preview

```bash
npm run build    # output to ./dist
npm run preview  # serve the build locally with Wrangler (Cloudflare runtime)
```

## Deploy

### Option 1 — Git integration (recommended)

Connect the repository in the Cloudflare Pages dashboard with:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`

The adapter emits the on-demand routes as Pages Functions automatically.

### Option 2 — Direct upload

```bash
npm run deploy   # runs `astro build` then `wrangler pages deploy ./dist`
```
