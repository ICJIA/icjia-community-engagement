// csp-hashes.mjs — walk dist/, find every INLINE EXECUTABLE <script>, and
// print its sha256 plus a ready-to-paste script-src snippet for netlify.toml.
//
// Run from the astro/ directory after a build:
//   pnpm build && pnpm csp-hashes
//
// Non-executable data islands (type="application/json", etc.) and external
// scripts (src=…, covered by 'self') are skipped.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const DIST = path.resolve('dist');
if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `pnpm build` first.');
  process.exit(1);
}

const EXECUTABLE = new Set(['', 'module', 'text/javascript', 'application/javascript']);
const hashes = new Set();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
    } else if (p.endsWith('.html')) {
      const html = fs.readFileSync(p, 'utf8');
      const rx = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
      let m;
      while ((m = rx.exec(html)) !== null) {
        const attrs = m[1];
        const body = m[2];
        if (/\bsrc=/.test(attrs)) continue; // external → 'self'
        const type = (attrs.match(/\btype=["']([^"']+)["']/)?.[1] ?? '').toLowerCase();
        if (!EXECUTABLE.has(type)) continue; // skip JSON/template data islands
        if (body.trim() === '') continue;
        hashes.add('sha256-' + crypto.createHash('sha256').update(body, 'utf8').digest('base64'));
      }
    }
  }
}

walk(DIST);

const list = [...hashes];
console.log(`Found ${list.length} inline executable script hash(es) in dist/:`);
for (const h of list) console.log('  ' + h);
console.log('\nPaste into netlify.toml script-src:');
console.log(`  script-src 'self' ${list.map((h) => `'${h}'`).join(' ')};`);
