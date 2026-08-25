/* Book assembly verification — mirrors book.js logic */
global.window = {};
const fs = require('fs');
['registry.js','c00-front.js','c01-foundations.js','c02-oop.js','c03-collections.js',
 'c04-java8-concurrency.js','c05-jvm-io.js','c06-solid-patterns-lld.js',
 'c07-spring-rest-jpa.js','c08-microservices.js','c09-data-hld.js',
 'c10-devops-cloud.js','c11-playbook.js']
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
