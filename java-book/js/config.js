/* Supabase content backend — fill in YOUR project values and set enabled:true.
 * The ANON key is public-safe (RLS allows read-only). NEVER put the
 * service-role key here; that one stays inside supabase/migrate.mjs runs.
 * With enabled:false (or when offline/unreachable) the book transparently
 * falls back to the bundled js/content files. */
window.BOOK_DB = {
  enabled: false,
  url: '',            // e.g. 'https://abcd1234.supabase.co'
  anonKey: ''         // Project Settings → API → anon/public
};