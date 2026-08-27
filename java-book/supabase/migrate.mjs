/* ============================================================
 * migrate.mjs — upload bundled book content to Supabase.
 * TWO modes (run LOCALLY ONLY — both carry secrets):
 *
 * A) Direct Postgres:
 *      node supabase/migrate.mjs \
 *        --dburi "postgresql://postgres:PASS@db.xxx.supabase.co:5432/postgres"
 *    Applies schema.sql itself. Needs:  npm i pg   (once)
 *    Passwords containing '@' are handled automatically.
 *
 * B) REST API (service role) — schema.sql via SQL editor first:
 *      node supabase/migrate.mjs --url https://xxx.supabase.co \
 *                                --service <SERVICE_ROLE_KEY>
 *
 * Either way: add --dry to preview counts without writing.
 * ============================================================ */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const argv = process.argv.slice(2);
const arg = k => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const DRY = argv.includes('--dry');

/* ---- assemble window.BOOK exactly like verify.js ---- */
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
if (DRY) { console.log('\n--dry — nothing written.'); process.exit(0); }

/* ---------- normalise / repair a postgres URI ----------
   Accepts passwords containing '@' by splitting at the LAST '@'. */
function fixDbUri(raw) {
  const u = String(raw).trim().replace(/^["']|["']$/g, '');
  const m = u.match(/^postgre?s?:\/\/([^:/@]+):(.+)@([^/@]+):(\d+)\/(.+)$/);
  if (!m) return u;
  const [, user, pass, host, port, db] = m;
  return 'postgres://' + encodeURIComponent(user) + ':' +
         encodeURIComponent(pass) + '@' + host + ':' + port + '/' + db;
}

/* ================= Mode A · direct Postgres ================= */
async function viaPostgres(dbUri) {
  let Client;
  try { ({ Client } = await import('pg')); }
  catch {
    console.error("\nMissing 'pg' driver. One-time setup:\n" +
      '  cd java-book && npm init -y && npm i pg\nthen re-run this command.');
    process.exit(1);
  }
  const uri = fixDbUri(dbUri);
  const c = new Client({ connectionString: uri, ssl: false });
  try { await c.connect(); }
  catch (e) {
    console.error('\nConnection failed:', e.message);
    console.error('Tips: this script auto-encodes @ in the password; if IPv4/IPv6');
    console.error('is blocked, use the session pooler host from Dashboard → Database.');
    process.exit(1);
  }
  const t0 = Date.now();
  console.log('Applying supabase/schema.sql …');
  await c.query(readFileSync(join(HERE, 'schema.sql'), 'utf8'));  // multi-statement OK
  console.log('Uploading parts + chapters …');
  for (const p of parts)
    await c.query(
      `insert into book_parts(part_id,label,color,ord) values ($1,$2,$3,$4)
       on conflict (part_id) do update
         set label=excluded.label,color=excluded.color,ord=excluded.ord`,
      [p.part_id, p.label, p.color, p.ord]);
  for (const ch of chapters)
    await c.query(
      `insert into book_chapters(num,part_id,title,idx) values ($1,$2,$3,$4)
       on conflict (num) do update
         set part_id=excluded.part_id,title=excluded.title,idx=excluded.idx`,
      [ch.num, ch.part_id, ch.title, ch.idx]);
  console.log('Uploading spreads …');
  for (let i = 0; i < spreads.length; i += 20) {
    const chunk = spreads.slice(i, i + 20);
    const vals = [], params = [];
    chunk.forEach((s, j) => {
      const b = j * 7 + 1;
      vals.push(`($${b},$${b+1},$${b+2},$${b+3},$${b+4},$${b+5},$${b+6})`);
      params.push(s.idx, s.l_kicker, s.l_head, s.l_html,
                  s.r_kicker, s.r_head, s.r_html);
    });
    await c.query(
      `insert into book_spreads(idx,l_kicker,l_head,l_html,r_kicker,r_head,r_html)
       values ${vals.join(',')}
       on conflict (idx) do update set
         l_kicker=excluded.l_kicker, l_head=excluded.l_head, l_html=excluded.l_html,
         r_kicker=excluded.r_kicker, r_head=excluded.r_head, r_html=excluded.r_html`,
      params);
    process.stdout.write(`\rspreads… ${Math.min(i + 20, spreads.length)}/${spreads.length}`);
  }
  await c.end();
  console.log(`\n✅ Schema applied + content uploaded in ${((Date.now()-t0)/1000).toFixed(1)}s`);
  console.log('\nLAST STEP — open js/config.js:');
  console.log('  url     : already prefilled for your project');
  console.log('  anonKey : Project Settings → API → "anon public" key');
  console.log('  enabled : true            ← flip this');
}

/* ================= Mode B · REST (service role) ================= */
async function viaRest(URL, KEY) {
  const H = {
    apikey: KEY, Authorization: 'Bearer ' + KEY,
    'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates'
  };
  async function put(table, rows) {
    const r = await fetch(URL + '/rest/v1/' + table,
      { method: 'POST', headers: H, body: JSON.stringify(rows) });
    if (!r.ok)
      throw new Error(table + ': HTTP ' + r.status + ' — ' +
        (await r.text()).slice(0, 200));
  }
  try { await fetch(URL + '/rest/v1/', { method: 'HEAD', headers: H }); }
  catch (e) { console.error('Cannot reach Supabase:', e.message); process.exit(1); }

  /* NOTE: in REST mode schema.sql must be applied via the SQL editor first. */
  const t0 = Date.now();
  await put('book_parts', parts);
  await put('book_chapters', chapters);
  for (let i = 0; i < spreads.length; i += 50) {
    await put('book_spreads', spreads.slice(i, i + 50));
    process.stdout.write(`\rspreads… ${Math.min(i + 50, spreads.length)}/${spreads.length}`);
  }
  console.log(`\n✅ Upload complete in ${((Date.now()-t0)/1000).toFixed(1)}s`);
}

/* ---------------- dispatch ---------------- */
const dbUri = arg('--dburi') || process.env.SUPABASE_DB_URI || null;
const rUrl = arg('--url') || process.env.SUPABASE_URL;
const rKey = arg('--service') || process.env.SUPABASE_SERVICE_KEY;

if (dbUri)            await viaPostgres(dbUri);
else if (rUrl && rKey) await viaRest(rUrl.replace(/\/+$/, ''), rKey);
else {
  console.error('Provide ONE of:');
  console.error('  --dburi "postgresql://user:pass@db.ref.supabase.co:5432/postgres"');
  console.error('  --url https://ref.supabase.co --service SERVICE_ROLE_KEY');
  console.error('(or SUPABASE_DB_URI / SUPABASE_URL+SUPABASE_SERVICE_KEY env vars)');
  console.error('Add --dry anywhere to preview counts only.');
  process.exit(1);
}
