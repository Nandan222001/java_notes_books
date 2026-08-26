/* DSA question-bank audit — checks every DSA problem spread for completeness:
   left page = question (example, constraints, hint) · right page = approach,
   java code, dry-run table, complexity, key insight. Also verifies global
   problem numbering continuity and prints a per-chapter summary. */
global.window = {};
const fs = require('fs');

const base = ['registry.js','c00-front.js','c01-foundations.js','c02-oop.js','c03-collections.js',
 'c04-java8-concurrency.js','c05-jvm-io.js','c06-solid-patterns-lld.js',
 'c07-spring-rest-jpa.js','c08-microservices.js','c09-data-hld.js','c10-devops-cloud.js'];

const idxHtml = fs.readFileSync('index.html', 'utf8');
const dsaFiles = [...idxHtml.matchAll(/js\/content\/(c12-dsa-[\w-]+\.js)/g)].map(m => m[1]);
if (dsaFiles.length < 24) throw new Error('expected at least 24 dsa files, found ' + dsaFiles.length);

[...base, ...dsaFiles, 'c11-playbook.js']
  .forEach(f => eval(fs.readFileSync('js/content/' + f, 'utf8')));

const B = window.BOOK;

/* map every spread index -> owning chapter (chapter.idx = first spread of that chapter) */
const chStarts = B.chapters.map((c, i) => ({ num: c.num, partId: c.partId, title: c.title, idx: c.idx, end: i + 1 < B.chapters.length ? B.chapters[i + 1].idx : B.spreads.length }));
function ownerOf(spreadIdx) {
  for (const ch of chStarts) if (spreadIdx >= ch.idx && spreadIdx < ch.end) return ch;
  return null;
}

const stripTags = h => h.replace(/<[^>]+>/g, ' ');
const JARGON = /\b(hash ?map|hash ?set|pointer|recursion|recursive|memoiz|big.?o|O\([^)]*\)|array|stack|queue|heap|trie|graph|node|bit|xor|dp\b|dynamic programming|binary search|sliding window|backtrack|union.?find|BFS|DFS|complexity|amortized)\b/gi;

let problems = [], issues = [], prevNum = 0, dupes = 0;
const titleSeen = new Set();
let titleDupes = 0;

B.spreads.forEach((s, i) => {
  const ch = ownerOf(i);
  if (!ch || ch.partId !== 'pd') return;                    // every DSA problem-bank chapter
  const L = s.left, R = s.right;
  const p = { spread: i, chapter: ch.num, chTitle: ch.title };

  const m = L.html.match(/PROBLEM\s+(\d+)\s*·\s*(EASY|MEDIUM|HARD)/i);
  p.num = m ? +m[1] : null;
  p.diff = m ? m[1] && m[2].toUpperCase() : '?';
  const t = L.html.match(/<\/span>([^<]+)<\/h2>/);
  p.title = t ? t[1].trim() : '?';
  const tKey = p.title.toLowerCase();
  if (titleSeen.has(tKey)) { p.titleDup = true; titleDupes++; }
  else titleSeen.add(tKey);

  const checks = {
    qStatement: /<p class="dropcap">/.test(L.html),
    example:    /class="sec">Example</.test(L.html),
    constraints:/class="sec">Constraints</.test(L.html),
    hint:       /📝 Hint/.test(L.html),
    dryRunSide: R.kicker === 'DRY RUN & TRACE',
    approach:   /class="sec">Approach</.test(R.html),
    javaCode:   /<pre class="code" data-lang="java">/.test(R.html),
    dryRunTable:/class="sec">Dry Run</.test(R.html) && /<table class="tbl">/.test(R.html.split(/class="sec">Dry Run</)[1] || ''),
    complexity: /⏱️ Complexity/.test(R.html),
    insight:    /🎯 Key Insight/.test(R.html)
  };
  // plain-language requirement: every problem must carry a non-technical analogy block
  p.plainWords = /🧒 In Plain Words/.test(R.html);
  p.checks = checks;
  p.fail = Object.entries(checks).filter(([, ok]) => !ok).map(([k]) => k);

  // plain-language signal: ratio of analogy/simple words vs jargon in right-page prose
  const prose = stripTags(R.html.replace(/<pre[\s\S]*?<\/pre>/g, ' ').replace(/<code[\s\S]*?<\/code>/g, ' '));
  const words = prose.toLowerCase().match(/[a-z][a-z'-]+/g) || [];
  const jargonHits = (prose.match(JARGON) || []).length;
  const simpleHits = (prose.match(/\b(imagine|think of|like a|just like|picture|in short|simply|essentially|so basically|in other words|remember|note that|means)\b/gi) || []).length;
  p.jargonRatio = words.length ? +(jargonHits / Math.max(words.length, 1)).toFixed(3) : 0;
  p.simpleWords = simpleHits;

  // numbering continuity
  if (p.num != null) {
    if (p.num !== prevNum + 1) {
      if (problems.some(x => x.num === p.num)) { dupes++; p.dup = true; }
      else p.gapAfter = prevNum;
    }
    prevNum = p.num;
  }
  problems.push(p);
  if (p.fail.length || p.dup || p.titleDup) issues.push(p);
});

/* ---- report ---- */
const byChapter = {};
problems.forEach(p => {
  byChapter[p.chapter] = byChapter[p.chapter] || { title: p.chTitle, n: 0, bad: [] };
  byChapter[p.chapter].n++;
  if (p.fail.length) byChapter[p.chapter].bad.push(`Q${p.num}:${p.fail.join(',')}`);
});

console.log('=== TOTALS ===');
console.log(JSON.stringify({
  dsaProblems: problems.length,
  target: 400,
  shortfall: 400 - problems.length,
  numberingLast: prevNum,
  duplicates: dupes,
  titleDuplicates: titleDupes,
  fullyComplete: problems.filter(p => !p.fail.length).length,
  withIssues: problems.filter(p => p.fail.length).length,
  zeroJargonFlag: problems.filter(p => p.jargonRatio === 0).length,
  plainWordsPresent: problems.filter(p => p.plainWords).length,
  plainWordsMissing: problems.filter(p => !p.plainWords).length
}, null, 1));

console.log('\n=== PER CHAPTER ===');
Object.keys(byChapter).sort((a, b) => a - b).forEach(k => {
  const c = byChapter[k];
  console.log(String(k).padStart(3), c.title.padEnd(46), String(c.n).padStart(3) + ' Qs', c.bad.length ? 'ISSUES: ' + c.bad.join(' | ') : '✓');
});

console.log('\n=== PROBLEM ISSUES (per-question) ===');
if (!issues.length) console.log('none — every problem passes all structural checks ✓');
issues.forEach(p => console.log(`Q${String(p.num).padStart(3)} ch${p.chapter} [${p.title}]${p.titleDup ? ' ← DUPLICATE TITLE' : ''} → ${p.fail.join(', ')}`));

console.log('\n=== PLAIN-LANGUAGE SAMPLE (jargon density, lower = simpler) ===');
const sample = problems.filter((_, i) => i % 20 === 0);
sample.forEach(p =>
  console.log(`Q${String(p.num).padStart(3)} jargon=${String(p.jargonRatio).padEnd(6)} simplePhrases=${p.simpleWords}  ${p.title}`));
const avg = problems.reduce((a, p) => a + p.jargonRatio, 0) / problems.length;
console.log('average jargon ratio across bank:', avg.toFixed(3));

/* numbering gaps detail */
const gapped = problems.filter(p => p.gapAfter !== undefined);
if (gapped.length) {
  console.log('\n=== NUMBERING GAPS ===');
  gapped.forEach(p => console.log(`after #${p.gapAfter} comes #${p.num} (${p.title})`));
}
