/* Supabase content backend.
 * YOUR PROJECT URL is prefilled. Remaining steps:
 *   1) Project Settings → API → copy the "anon public" key → paste below
 *   2) run:  node supabase/migrate.mjs --dburi "postgresql://…/postgres"
 *      (from java-book/, after  npm i pg  one time)
 *   3) flip enabled to true, deploy
 * The anon key is public-safe (RLS allows read-only). NEVER put the
 * service-role key or the database password here. With enabled:false,
 * unreachable server, or file:// protocol, the book transparently falls
 * back to the bundled js/content files. */
window.BOOK_DB = {
  enabled: false,
  url: 'https://xddhhybyviuntnnymfbo.supabase.co',
  anonKey: ''         // ← paste your anon/public key here
};