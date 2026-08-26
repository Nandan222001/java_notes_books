/* Finds template-literal imbalance: reports every line whose backtick count flips INSIDE/outside state */
const fs = require('fs');
const files = process.argv.slice(2);
if (!files.length) {
  console.log('usage: node check-ticks.js <file.js> [...]');
  process.exit(0);
}
files.forEach(f => {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  let inside = false;
  let spans = [];
  lines.forEach((ln, i) => {
    const ticks = (ln.match(/`/g) || []).length;
    if (ticks % 2 === 1) {           // odd count toggles state
      if (!inside) spans.push({ openLine: i + 1 });
      else spans[spans.length - 1].closeLine = i + 1;
      inside = !inside;
    }
  });
  console.log('== ' + f + ' ==');
  console.log(inside
    ? 'STILL INSIDE A TEMPLATE AT EOF — unterminated literal opened at line '
      + (spans.length ? spans[spans.length - 1].openLine : '?')
    : 'balanced (' + spans.length + ' template literals)');
  // flag suspiciously LONG spans (a missed close swallows many spreads)
  spans.forEach(s => {
    const len = (s.closeLine || lines.length) - s.openLine;
    if (len > 60)
      console.log('  suspicious span: line ' + s.openLine +
        ' → ' + (s.closeLine || 'EOF') + ' (' + len + ' lines)');
  });
});