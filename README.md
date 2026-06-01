# ICJIA Community Engagement Hub

Landing page for the **Illinois Criminal Justice Information Authority (ICJIA)
Community Engagement Hub** — a central space for news, engagement
opportunities, public safety updates, grantee conversations, and
community-centered resources.

> **Status:** v0.1.0 — landing page only, with **placeholder/dummy content**.
> This is the starting point for a project that will expand. The design is a
> faithful port of `docs/C - Editorial Infographic.html`.

## Stack

- **[Astro 6](https://astro.build)** — static output (`output: 'static'`).
- **[Tailwind CSS 4](https://tailwindcss.com)** — via the `@tailwindcss/vite`
  plugin; layout and styling are utility-first.
- **[Alpine.js](https://alpinejs.dev) (CSP build)** — `@alpinejs/csp`, so the
  site needs **no `'unsafe-eval'`** in its Content Security Policy.
- **Self-hosted fonts** — Inter + JetBrains Mono (variable) via `@fontsource`.
- **[astro-seo](https://github.com/jonasmerlin/astro-seo)** + `@astrojs/sitemap`.

## Prerequisites

- **Node 22** (see [`.nvmrc`](.nvmrc) → `nvm use`).
- **pnpm 10** (`corepack enable` will honor the `packageManager` pin).

## Getting started

```sh
nvm use                      # Node 22
pnpm install --dir astro     # install dependencies

# Recommended: launches on http://localhost:8080/ (frees the port + clears
# stale caches first). 4321 is left free for other local Astro projects.
./start-dev-server.sh

# …or run the dev server directly:
cd astro && pnpm dev --port 8080
```

## Scripts (run inside `astro/`)

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Astro dev server (add `--port 8080`). |
| `pnpm build` | Production build to `astro/dist/`. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm csp-hashes` | Print sha256 hashes of inline scripts for the CSP. |

## Project structure

```
icjia-community-engagement/
├── astro/
│   ├── src/
│   │   ├── components/      # Header, Hero, QuickLinks, News, FocusAreas,
│   │   │                    #   Events, Subscribe, Footer, ThemeToggle, CivicMark
│   │   ├── data/content.ts  # all dummy content (single source of truth)
│   │   ├── layouts/BaseLayout.astro
│   │   ├── pages/index.astro
│   │   ├── scripts/alpine.ts # Alpine CSP components (theme toggle, news filter)
│   │   └── styles/global.css # Tailwind entry + theme tokens (+ .is-light)
│   ├── public/              # favicon.svg, robots.txt
│   ├── scripts/csp-hashes.mjs
│   └── package.json
├── docs/                    # design source + Astro migration checklist
├── netlify.toml             # build + CSP + headers + trailing-slash rewrites
├── start-dev-server.sh      # dev launcher (port 8080)
├── .nvmrc · LICENSE · CHANGELOG.md · README.md
```

## Theming (dark / light)

The theme is a set of CSS custom properties defined in
`src/styles/global.css`. Defaults are the dark palette; a `.is-light` class on
`<html>` re-assigns the same tokens, so every Tailwind utility (`bg-bg`,
`text-fg`, `border-line`, …) flips automatically. The toggle persists the
choice to `localStorage` (`icjia-theme`) and an inline `<head>` script applies
it **before first paint** to avoid a flash. Dark is the default.

## Deployment (Netlify)

`netlify.toml` builds from the `astro/` base (`pnpm build`) and publishes
`astro/dist`. It also defines:

- A **strict, hash-based Content Security Policy** (no `unsafe-eval`,
  no `unsafe-inline` for scripts). The only inline script is the no-flash
  theme setter, allow-listed by sha256.
- **Trailing-slash reconciliation** — `status = 200` rewrites so `/foo` and
  `/foo/` both return 200 (no 301, no 404) with a single consistent canonical.

### Updating the CSP after changing an inline script

```sh
pnpm --dir astro build
pnpm --dir astro csp-hashes      # prints the sha256 to paste
# → replace the script-src hash in BOTH CSP blocks of netlify.toml
```

## Accessibility & audits

First-pass Lighthouse (mobile, local production preview):
**Performance 98 · Accessibility 100 · Best Practices 100 · SEO 100**.
axe-core (WCAG 2.1 AA) reports **0 violations in both the dark and light
themes**.

Foundations: skip link to `#main`, semantic landmarks
(`header`/`nav`/`main`/`footer`), visible `focus-visible` rings, an associated
`<label>` on the subscribe field, `lang="en"`, and the theme applied before
first paint. On-accent button text uses pure black for a 4.70:1 ratio (the
demo's near-black `#0A0F1E` was 4.27:1 and failed AA).

## Versioning

This project keeps a [`CHANGELOG.md`](CHANGELOG.md). **Update the README and
the changelog with every version**, and verify the README still matches the
code on each release.

## License

[MIT](LICENSE) © 2026 Illinois Criminal Justice Information Authority.
