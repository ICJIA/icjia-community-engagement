import type { APIRoute } from 'astro';

// Native /sitemap.xml. Static pages under src/pages are auto-enumerated, so the
// sitemap stays current as routes are added with NO manual step. Only dynamic
// ([slug]) routes need to be listed by hand in EXTRA_ROUTES below.
const FALLBACK_ORIGIN = 'https://icjia-community-engagement.netlify.app';
const EXTRA_ROUTES: string[] = [];

const pageModules = import.meta.glob('./**/*.{astro,md,mdx,html}');
const staticRoutes = Object.keys(pageModules)
  .filter(
    (p) => !/\/_/.test(p) && !/\[.+\]/.test(p) && !/\/404\.(astro|md|mdx|html)$/.test(p)
  )
  .map((p) =>
    p
      .replace(/^\.\//, '/')
      .replace(/\/index\.(astro|md|mdx|html)$/, '/')
      .replace(/\.(astro|md|mdx|html)$/, '/')
  )
  .map((u) => (u === '' ? '/' : u));

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(FALLBACK_ORIGIN)).origin;
  const routes = [...new Set([...staticRoutes, ...EXTRA_ROUTES])].sort();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((u) => `  <url><loc>${origin}${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
