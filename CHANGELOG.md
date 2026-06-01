# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] — 2026-06-01

Infographic section chrome.

### Added

- Shared `SectionHeader` component giving every section an "instrument panel"
  header: a numbered rule (01–05), the § label, a right-aligned stat callout
  derived from live data counts ("5 updates", "4 priorities", "3 upcoming",
  "8,420 subscribers", …), and the heading. Adds per-section visual definition
  while keeping the shaded section bands — verified Perf 98 / a11y 100.

[0.3.0]: https://github.com/ICJIA/icjia-community-engagement/releases/tag/v0.3.0

## [0.2.0] — 2026-06-01

Branding, SEO, and icons.

### Added

- Official **ICJIA wordmark** (converted from the supplied EPS) in the header
  and footer, theme-aware via an `IcjiaWordmark` component — white on the dark
  theme, brand-black on the light theme.
- **Full SEO**: Open Graph + Twitter Card meta, canonical, and JSON-LD
  (`GovernmentOrganization` + `WebSite`, with `<`-escaped serialization).
- Branded **1200×630 Open Graph image** (`og-image.png`, authored as SVG in
  `assets/og-image.svg`, rasterized with `rsvg-convert`).
- Complete **favicon set**: `favicon.svg`, multi-size `favicon.ico` (3 KB),
  `favicon-16/32.png`, `apple-touch-icon.png`, `icon-192/512.png`, and
  `site.webmanifest`.
- README banner (OG image) + status badges.
- Native **`/sitemap.xml`** route that auto-enumerates static pages (replaces
  `@astrojs/sitemap`); `robots.txt` points at it.
- **Astro image optimization** wired (`sharp` installed + allow-listed) so
  `<Image>` / `<Picture>` optimize future raster imagery.

### Changed

- Hero headline is now **bold**.
- Deepened the dark theme's base background (`#0a0f1e` → `#06090f`) so the
  shaded surface sections read as distinct bands.
- CSS is inlined at build (`inlineStylesheets: 'always'`) — no render-blocking
  stylesheet → mobile Performance ≥ 95 (98 with production compression).
- Replaced the placeholder civic mark with the official ICJIA logo throughout
  (removed `CivicMark`).

### Fixed

- Removed a blanket `/:slug` trailing-slash rewrite from `netlify.toml` that —
  with `force` — would have shadowed root files (`/favicon.ico`,
  `/og-image.png`, `/sitemap.xml`) and 404'd them on deploy. Trailing-slash
  rewrites are now documented per-route.

[0.2.0]: https://github.com/ICJIA/icjia-community-engagement/releases/tag/v0.2.0

## [0.1.0] — 2026-06-01

Initial landing page (dummy data) — the starting point for the project.

### Added

- Landing page for the **ICJIA Community Engagement Hub**, built with Astro 6,
  Tailwind CSS 4, and Alpine.js (CSP build).
- Faithful port of the `docs/C - Editorial Infographic.html` design: sticky
  header, hero, "Start here" quick links, News & announcements (with tab
  filtering), Focus areas, Engagement calendar, Subscribe form, and footer —
  all with placeholder content.
- **Dark/light theme toggle** with no-flash first paint and `localStorage`
  persistence (key `icjia-theme`); dark is the default, matching the demo.
- Self-hosted **Inter** + **JetBrains Mono** (variable) via `@fontsource`.
- Tailwind 4 theme tokens with a `.is-light` override so utilities flip with
  the theme; layout and styling are utility-first.
- Netlify config (`netlify.toml`): build settings, **strict hash-based CSP**
  (no `unsafe-eval`), security headers, and trailing-slash 200-rewrites.
- Accessibility: skip link, semantic landmarks, visible focus states,
  associated form label, `lang="en"`.
- Tooling: pnpm pin + `engines`, Node 22 (`.nvmrc`), `start-dev-server.sh`
  (port 8080), `scripts/csp-hashes.mjs`, sitemap, `astro-seo`, MIT license.

### Changed

- On-accent button text is pure black (4.70:1, passes WCAG AA) instead of the
  demo's `#0A0F1E` (4.27:1, failed AA) — visually identical.

### Verified

- Lighthouse (mobile, local production preview): Performance 98,
  Accessibility 100, Best Practices 100, SEO 100.
- axe-core WCAG 2.1 AA: 0 violations in both dark and light themes.
- Pixel parity with `docs/C - Editorial Infographic.html` confirmed in both
  themes.

[0.1.0]: https://github.com/ICJIA/icjia-community-engagement/releases/tag/v0.1.0
