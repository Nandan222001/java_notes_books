/* Remote data source over plain REST — no SDK, zero extra payload. */
(function () {
'use strict';
var cfg = window.BOOK_DB || {}, url = null, key = null, S = 0;
var cache = new Map();        /* spreadIdx -> {l:{...}, r:{...}} */
var inflight = new Map();     /* lo-hi -> promise */

function hdr() { return { apikey: key, Authorization: 'Bearer ' + key }; }
function get(path) {
  return fetch(url + '/rest/v1/' + path, { headers: hdr() }).then(function (r) {
    if (!r.ok) return r.text().then(function (t) {
      return Promise.reject(new Error('HTTP ' + r.status + ' ' + t.slice(0, 140)));
    });
    return r.json();
  });
}

window.BOOK_SRC = {
  remote: true,
  /* metadata bootstrap: parts + chapters only (~10 KB) */
  init: function () {
    if (!(cfg.enabled && cfg.url && cfg.anonKey))
      return Promise.reject(new Error('BOOK_DB disabled'));
    url = cfg.url.replace(/\/+$/, '');
    key = cfg.anonKey;
    return Promise.all([
      get('book_parts?order=ord.asc'),
      get('book_chapters?order=num.asc')
    ]).then(function (rs) {
      var parts = rs[0], chs = rs[1];
      var Smax = chs.length ? Math.max.apply(null,
        chs.map(function (c) { return c.idx; })) + 1 : 0;
      var BK = window.BOOK = {
        parts: {}, order: parts.map(function (p) { return p.part_id; }),
        chapters: chs.map(function (c) {
          return { partId: c.part_id, num: c.num, title: c.title, idx: c.idx };
        }), spreads: [],
        part: function () {}, chapter: function () {}, spread: function () {}
      };
      parts.forEach(function (p) {
        BK.parts[p.part_id] = { id: p.part_id, label: p.label, color: p.color };
      });
      for (var i = 0; i < Smax; i++)
        BK.spreads.push({ left: null, right: null });   /* lazy shells */
      S = Smax;
      return BK;
    });
  },
  /* returns Promise<{l:{kicker,head,html}, r:{...}}> — batches ±3 neighbours */
  requestSpread: function (idx) {
    if (idx < 0 || idx >= S) return Promise.resolve(null);
    if (cache.has(idx)) return Promise.resolve(cache.get(idx));
    var lo = Math.max(0, idx - 3), hi = Math.min(S - 1, idx + 3);
    var kk = lo + '-' + hi, pend = inflight.get(kk);
    if (pend) return pend;
    pend = get('book_spreads?idx=gte.' + lo + '&idx=lte.' + hi +
               '&select=idx,l_kicker,l_head,l_html,r_kicker,r_head,r_html&order=idx.asc')
      .then(function (rows) {
        rows.forEach(function (r) {
          cache.set(r.idx, {
            l: { kicker: r.l_kicker, head: r.l_head, html: r.l_html },
            r: { kicker: r.r_kicker, head: r.r_head, html: r.r_html }
          });
        });
        inflight.delete(kk);
        return cache.get(idx) || null;
      })
      .catch(function (e) { inflight.delete(kk); throw e; });
    inflight.set(kk, pend);
    return pend;
  },
  search: function (q) {
    q = (q || '').trim();
    if (q.length < 2) return Promise.resolve([]);
    return get('rpc/search_spreads?q=' + encodeURIComponent(q) + '&lim=22')
      .then(function (rows) {
        return rows.map(function (row) {
          var l = row.ln || '', r = row.rn || '';
          var pickRight = r.replace(/\s+/g, '').length > l.replace(/\s+/g, '').length;
          return {
            flips: row.idx + 1,
            num: pickRight ? 2 * row.idx + 2 : 2 * row.idx + 1,
            txt: (pickRight ? r : l)
          };
        });
      });
  },
  cacheSize: function () { return cache.size; }
};
function null_() { return Promise.resolve(null); }
})();