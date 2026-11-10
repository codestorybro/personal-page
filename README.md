## Getting Started

First, install deps:

```bash
npm install
```

Secondly, run the development server:

```bash
npm run dev
```

## Applications

The main Next.js site lives in `src/`. CodeStoryBro Live is a separate React/Vite + Cloudflare app in `apps/live/`; see its README for local startup and presenter controls. Both apps use the shared `packages/ui/Footer.tsx` and `packages/ui/footer.css`.

The blog is retired. `/blog` and its descendants, including former `/en/blog` and `/pl/blog` URLs, permanently redirect to `/`. The sitemap lists the home page only. YouTube is the primary content channel; LinkedIn is available in Get in touch.
