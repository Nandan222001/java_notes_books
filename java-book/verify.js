/* Book assembly verification — mirrors book.js logic */
global.window = {};
const fs = require('fs');
['registry.js','c00-front.js','c01-foundations.js','c02-oop.js','c03-collections.js',
 'c04-java8-concurrency.js','c05-jvm-io.js','c06-solid-patterns-lld.js',
 'c07-spring-rest-jpa.js','c08-microservices.js','c09-data-hld.js',
 'c10-devops-cloud.js',
 'c12-dsa-01-arrays-hashing.js','c12-dsa-02-two-pointers.js','c12-dsa-03-sliding-window.js',
 'c12-dsa-04-stack-queue.js','c12-dsa-05-binary-search.js','c12-dsa-06-linked-list.js',
 'c12-dsa-07-trees.js','c12-dsa-08-dp-1d.js','c12-dsa-09-heaps.js','c12-dsa-10-backtracking.js',
 'c12-dsa-11-graphs-bfs-dfs.js','c12-dsa-12-graphs-advanced.js','c12-dsa-13-tries.js',
 'c12-dsa-14-bit-manipulation.js','c12-dsa-15-greedy.js','c12-dsa-16-trees-bst-advanced.js',
 'c12-dsa-17-dp-2d-knapsack.js','c12-dsa-18-dp-strings.js','c12-dsa-19-math.js',
 'c12-dsa-20-matrix.js','c12-dsa-21-design.js','c12-dsa-22-sorting-searching.js',
 'c12-dsa-23-advanced-structures.js','c12-dsa-24-divide-conquer.js',
 'c12-dsa-25-string-classic.js',
 'c12-dsa-26-prefix-sum.js',
 'c12-dsa-27-two-heaps.js',
 'c12-dsa-28-cyclic-inplace.js',
 'c12-dsa-29-dp-stocks.js',
 'c12-dsa-30-game-theory.js',
 'c12-dsa-31-string-matching.js',
 'c12-dsa-32-simulation.js',
 'c11-playbook.js']
.forEach(f => eval(fs.readFileSync('js/content/' + f, 'utf8')));

const B = window.BOOK;
const pages = 2 * B.spreads.length + 2;
let prev = -1, bad = 0;
B.chapters.forEach(c => { if (c.idx <= prev) bad++; prev = c.idx; });
console.log(JSON.stringify({
  parts: B.order.length,
  chapters: B.chapters.length,
  spreads: B.spreads.length,
  pages,
  pagesEven: pages % 2 === 0,
  sheets: pages / 2,
  chapterOrderOK: bad === 0,
  malformed: B.spreads.filter(s => !s.left || !s.right ||
    typeof s.left.html !== 'string' || typeof s.right.html !== 'string').length
}, null, 1));
B.chapters.forEach(c =>
  console.log(String(c.num).padStart(2, '0'), ('p.' + (2 * c.idx + 1)).padStart(6), c.partId.padEnd(3), c.title));
