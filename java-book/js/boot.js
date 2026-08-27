/* Bootstrapper — chooses the data source BEFORE the flip engine loads.
 *   • Supabase configured  → remote mode: pages stream on demand
 *   • otherwise / offline  → bundled js/content files (sequential injection)
 * Either way js/book.js runs LAST against a ready window.BOOK contract. */
(function () {
'use strict';
var V = '?v=6';
var HEAD = document.head;
var cfg = window.BOOK_DB || {};
var LOCAL = ['js/content/registry.js', 'js/content/c00-front.js',
  'js/content/c01-foundations.js', 'js/content/c02-oop.js',
  'js/content/c03-collections.js', 'js/content/c04-java8-concurrency.js',
  'js/content/c05-jvm-io.js', 'js/content/c06-solid-patterns-lld.js',
  'js/content/c07-spring-rest-jpa.js', 'js/content/c08-microservices.js',
  'js/content/c09-data-hld.js', 'js/content/c10-devops-cloud.js',
  'js/content/c12-dsa-01-arrays-hashing.js', 'js/content/c12-dsa-02-two-pointers.js',
  'js/content/c12-dsa-03-sliding-window.js', 'js/content/c12-dsa-04-stack-queue.js',
  'js/content/c12-dsa-05-binary-search.js', 'js/content/c12-dsa-06-linked-list.js',
  'js/content/c12-dsa-07-trees.js', 'js/content/c12-dsa-08-dp-1d.js',
  'js/content/c12-dsa-09-heaps.js', 'js/content/c12-dsa-10-backtracking.js',
  'js/content/c12-dsa-11-graphs-bfs-dfs.js', 'js/content/c12-dsa-12-graphs-advanced.js',
  'js/content/c12-dsa-13-tries.js', 'js/content/c12-dsa-14-bit-manipulation.js',
  'js/content/c12-dsa-15-greedy.js', 'js/content/c12-dsa-16-trees-bst-advanced.js',
  'js/content/c12-dsa-17-dp-2d-knapsack.js', 'js/content/c12-dsa-18-dp-strings.js',
  'js/content/c12-dsa-19-math.js', 'js/content/c12-dsa-20-matrix.js',
  'js/content/c12-dsa-21-design.js', 'js/content/c12-dsa-22-sorting-searching.js',
  'js/content/c12-dsa-23-advanced-structures.js', 'js/content/c12-dsa-24-divide-conquer.js',
  'js/content/c12-dsa-25-string-classic.js', 'js/content/c12-dsa-26-prefix-sum.js',
  'js/content/c12-dsa-27-two-heaps.js', 'js/content/c12-dsa-28-cyclic-inplace.js',
  'js/content/c12-dsa-29-dp-stocks.js', 'js/content/c12-dsa-30-game-theory.js',
  'js/content/c12-dsa-31-string-matching.js', 'js/content/c12-dsa-32-simulation.js',
  'js/content/c12-dsa-33-greedy-scheduling.js', 'js/content/c12-dsa-34-backtracking-2.js',
  'js/content/c12-dsa-35-graphs-grid.js', 'js/content/c12-dsa-36-heaps-scheduling.js',
  'js/content/c12-dsa-37-bitmask-dp.js', 'js/content/c12-dsa-38-math-geometry.js',
  'js/content/c12-dsa-39-design-2.js', 'js/content/c12-dsa-40-wildcards.js',
  'js/content/c11-playbook.js'].map(function (p) { return p + V; });

function inject(src) {
  return new Promise(function (res) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = res; s.onerror = res;
    HEAD.appendChild(s);
  });
}
function finish() { inject('js/book.js' + V); }

function chain(list, i) {
  if (i >= list.length) return finish();
  return inject(list[i]).then(function () { return chain(list, i + 1); });
}
function fallback() {
  console.info('[BOOK] using bundled content files');
  chain(LOCAL, 0);
}

var wantRemote = cfg.enabled && cfg.url && cfg.anonKey
  && location.protocol.indexOf('http') === 0;   /* file:// can't fetch REST */
if (!wantRemote) { fallback(); return; }

var s = document.createElement('script');
s.src = 'js/source-remote.js' + V;
s.onload = function () {
  window.BOOK_SRC.init().then(finish).catch(function (err) {
    console.warn('[BOOK_DB] falling back to bundled content:', err.message || err);
    fallback();
  });
};
s.onerror = fallback;
HEAD.appendChild(s);
})();