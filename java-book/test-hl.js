/* Runtime test for js/highlight.js — catches RegExp construction errors */
global.window = {};
const fs = require('fs');
eval(fs.readFileSync('js/highlight.js', 'utf8'));
const H = window.HL;
if (!H || !H.highlight) throw new Error('HL missing');

const samples = {
  java: 'class A { /* hi */ int x=5; @Override String s="hi"; List<A> l; boolean b=a&&b; }',
  sql: "SELECT * FROM t WHERE x=1 AND y='z' -- note",
  yaml: 'key:\n  nested: value # cmt',
  bash: 'docker run -it img sh # run it',
  json: '{"k": [1, true, null]}',
  xml: '<!-- c --><a href="x">t</a>',
  props: 'app.name=demo\n# comment'
};
Object.keys(samples).forEach(k => {
  const out = H.highlight(samples[k], k);
  const spans = (out.match(/tk-/g) || []).length;
  if (!out || out.indexOf('tk-') === -1) throw new Error('no tokens for ' + k);
  if (k === 'java' && spans < 6) throw new Error('java under-tokenized: ' + spans);
  console.log('OK  ', k.padEnd(6), '→', out.length, 'chars, spans:', spans);
});
console.log('\nsample(java):', H.highlight('int x = 5; // hi', 'java'));
console.log('\nALL LANGUAGES PASS ✅');