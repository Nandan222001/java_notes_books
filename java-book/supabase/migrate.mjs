/* ============================================================
 * migrate.mjs — one-time upload of bundled book content.
 * Run LOCALLY ONLY (needs the service-role key, never ship it):
 *
 *   node supabase/migrate.mjs --url https://xyz.supabase.co \
 *                             --service <SERVICE_ROLE_KEY>
 *   add --dry to preview row counts without uploading
 * ============================================================ */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');

const argv = process.argv.slice(2);
const arg = k => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const URL = arg('--url') || process.env.SUPABASE_URL;
const KEY = arg('--service') || process.env.SUPABASE_SERVICE_KEY;
const DRY = argv.includes('--dry');
if (!URL || !KEY) {
  console.error('Usage: node supabase/migrate.mjs --url https://xxx.supabase.co --service <SERVICE_ROLE_KEY> [--dry]');
  console.error('(or set SUPABASE_URL / SUPABASE_SERVICE_KEY env vars)');
  process.exit(1);
}

/* ---- assemble window.BOOK exactly like verify.js does ---- */
global.window = {};
const V6 = readFileSync(join(ROOT, 'index.html'), 'utf8');
const files = [...V6.matchAll(/js\/content\/([\w-]+\.js)\?v=\d+/g)].map(m => m[1]);
files.forEach(f => eval(readFileSync(join(ROOT, 'js/content', f), 'utf8')));
const B = global.window.BOOK;

const parts = B.order.map((part_id, ord) => ({ part_id, ...B.parts[part_id], ord }));
const chapters = B.chapters.map(c => ({ num: c.num, part_id: c.partId, title: c.title, idx: c.idx }));
const spreads = B.spreads.map((s, idx) => ({
  idx,
  l_kicker: s.left.kicker || '', l_head: s.left.head || '', l_html: s.left.html || '',
  r_kicker: s.right.kicker || '', r_head: s.right.head || '', r_html: s.right.html || ''
}));

console.log(`Assembled from ${files.length} content files →`);
console.log(`  parts    : ${parts.length}`);
console.log(`  chapters : ${chapters.length}`);
console.log(`  spreads  : ${spreads.length} (${spreads.length * 2} pages)`);
if (DRY) { console.log('\n--dry — nothing uploaded.'); process.exit(0); }

/* ---- REST uploader (no SDK needed) ---- */
const H = {
  apikey: KEY, Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates'
};
async function put(table, rows) {
  const r = await fetch(`${URL}/rest/v1/${table}`, { method: 'POST', headers: H, body: JSON.stringify(rows) });
  if (!r.ok) throw new Error(`${table}: HTTP ${r.status} — ${(await r.text()).slice(0, 200)}`);
}

try {
  await fetch(`${URL}/rest/v1/`, { method: 'HEAD', headers: H });   // sanity ping
} catch (e) { console.error('Cannot reach Supabase:', e.message); process.exit(1); }

let t0 = Date.now();
await put('book_parts', parts);
await put('book_chapters', chapters);
for (let i = 0; i < spreads.length; i += 50) {
  await put('book_spreads', spreads.slice(i, i + 50));
  process.stdout.write(`\rspreads… ${Math.min(i + 50, spreads.length)}/${spreads.length}`);
}
console.log(`\n✅ Upload complete in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log('Re-run anytime to refresh content (merge-duplicates upsert).');
