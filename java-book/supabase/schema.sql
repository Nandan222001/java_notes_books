-- ============================================================
-- JAVA ZERO→FAANG · Supabase schema  (run in the SQL editor)
-- Public READ-ONLY delivery. Writes come only from the local
-- migration script holding the service-role key.
-- ============================================================

create table if not exists book_parts (
  part_id text primary key,
  label   text not null,
  color   text not null,
  ord     int  not null
);

create table if not exists book_chapters (
  num     int primary key,
  part_id text not null references book_parts(part_id),
  title   text not null,
  idx     int  not null unique               -- opening spread index
);

create table if not exists book_spreads (
  idx      int primary key,
  l_kicker text not null default '',
  l_head   text not null default '',
  l_html   text not null,
  r_kicker text not null default '',
  r_head   text not null default '',
  r_html   text not null,
  l_plain  text generated always as
             (regexp_replace(l_html, '<[^>]+>', ' ', 'g')) stored,
  r_plain  text generated always as
             (regexp_replace(r_html, '<[^>]+>', ' ', 'g')) stored,
  fts tsvector generated always as
      (to_tsvector('simple',
         coalesce(regexp_replace(l_html,'<[^>]+>',' ','g'),'')
         || ' ' ||
         coalesce(regexp_replace(r_html,'<[^>]+>',' ','g'),''))) stored
);

create index if not exists book_chapters_part on book_chapters(part_id);
create index if not exists book_spreads_fts   on book_spreads using gin(fts);

-- --------------- full-text search RPC ---------------
-- Returns per-side highlighted snippets so the browser builds UI only.
create or replace function search_spreads(q text, lim int default 22)
returns table (idx int, ln text, rn text)
language sql stable security invoker as $$
  select s.idx,
    ts_headline('simple', s.l_plain, websearch_to_tsquery('simple', q),
                'StartSel=<b>,StopSel=</b>,MaxFragments=1,MaxWords=16,MinWords=6'),
    ts_headline('simple', s.r_plain, websearch_to_tsquery('simple', q),
                'StartSel=<b>,StopSel=</b>,MaxFragments=1,MaxWords=16,MinWords=6')
  from book_spreads s
  where s.fts @@ websearch_to_tsquery('simple', q)
  order by ts_rank(s.fts, websearch_to_tsquery('simple', q)) desc
  limit least(greatest(coalesce(lim,22),1),30);
$$;

-- --------------- public read access ---------------
alter table book_parts    enable row level security;
alter table book_chapters enable row level security;
alter table book_spreads  enable row level security;

drop policy if exists pub_read_parts    on book_parts;
drop policy if exists pub_read_chapters on book_chapters;
drop policy if exists pub_read_spreads  on book_spreads;

create policy pub_read_parts    on book_parts    for select using (true);
create policy pub_read_chapters on book_chapters for select using (true);
create policy pub_read_spreads  on book_spreads  for select using (true);
