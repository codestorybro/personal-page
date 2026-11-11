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

The shared header and footer include an EN/PL language selector (Polish by default). `NEXT_PUBLIC_STAGE_URL` configures the Stage link; Live uses `VITE_HOME_URL` for its Home link. Language travels with cross-app links and is remembered locally.

For a production preview alongside an already running Next.js development server, use an isolated build directory to avoid mixing dev and production manifests:

```bash
CODESTORYBRO_DIST_DIR=.next-qa yarn build
CODESTORYBRO_DIST_DIR=.next-qa yarn start --port 3008
```

Live deployment is separate from Vercel: see [apps/live/DEPLOYMENT.md](apps/live/DEPLOYMENT.md). Stage targets `stage.codestorybro.com` on Workers Free + Durable Objects + KV Free (no R2). Current application limits: 1000 participants, 5 questions, 20 MB per original/export PDF, 750 MB total, 100 archived sessions. Main-site Git integration and production branch are configured in the existing Vercel project.
