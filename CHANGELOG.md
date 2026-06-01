# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
