/* ===== CHAPTER 12 · Collections Framework (Part 1) ===== */
(function () {
var B = window.BOOK;
B.chapter('p2', 12, 'Collections Framework');

B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 12 · The Toolbox',
html: `<h2 class="chap"><span class="chnum">CHAPTER 12</span>Collections Framework — Java’s Swiss Army</h2>
<p class="dropcap">Real apps juggle millions of objects. The <strong>Collections Framework</strong> gives you ready-made data structures with a common spirit: <code>Iterable</code> → <code>Collection</code> → <em>List</em>, <em>Set</em>, <em>Queue</em>; maps live beside it because they're key-value pairs, not collections of single elements.</p>
<h3 class="sec">List — ordered, index-based</h3>
<ul>
<li><strong>ArrayList</strong> — dynamic array; O(1) get/set; amortized O(1) add; slow middle inserts. <em>Default choice.</em></li>
<li><strong>LinkedList</strong> — doubly-linked; O(1) ends, O(n) index; also Deque. Rarely wins in practice.</li>
<li><strong>CopyOnWriteArrayList</strong> — snapshot-per-read for read-heavy threading.</li>
</ul>
<h3 class="sec">Set — uniqueness enforced</h3>
<ul>
<li><strong>HashSet</strong> — unordered, O(1) add/contains (hash).</li>
<li><strong>LinkedHashSet</strong> — keeps insertion order.</li>
<li><strong>TreeSet</strong> — sorted (Red-Black tree), O(log n).</li>
</ul>
<h3 class="sec">Queue / Deque</h3>
<p><strong>ArrayDeque</strong> for stacks &amp; queues (faster than Stack/LinkedList!), <strong>PriorityQueue</strong> = binary heap → top-k problems.</p>
<pre class="code" data-lang="java"><code>List&lt;String&gt; names = new ArrayList&lt;&gt;();
names.add("Asha"); names.add("Ravi");
Set&lt;Integer&gt; uniq = new TreeSet&lt;&gt;(List.of(3,1,2)); // [1,2,3]
Deque&lt;Integer&gt; st = new ArrayDeque&lt;&gt;();
st.push(1); st.push(2); st.pop();                  // LIFO</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'The Family Tree',
html: `<div class="figframe"><div class="figtitle">Collections hierarchy (learn to draw this!)</div>
<svg class="diagram" viewBox="0 0 540 210">
  <rect x="200" y="6" width="120" height="30" rx="8" class="db"/><text x="260" y="26" text-anchor="middle" class="dt">Iterable</text>
  <path d="M260 36 v14" class="dl"/><polygon points="260,54 256,46 264,46" fill="#8a5a33"/>
  <rect x="196" y="56" width="128" height="30" rx="8" class="db"/><text x="260" y="76" text-anchor="middle" class="dt">Collection</text>
  <path d="M150 108 C150 96 200 96 236 88 M370 108 C370 96 320 96 284 88 M260 108 V90" class="dl"/>
  <polygon points="236,90 228,86 232,94" fill="#8a5a33"/><polygon points="284,90 276,86 280,94" fill="#8a5a33"/><polygon points="260,92 256,84 264,84" fill="#8a5a33"/>
  <rect x="96" y="112" width="110" height="28" rx="8" class="do_"/><text x="151" y="131" text-anchor="middle" class="dt">List</text>
  <rect x="212" y="112" width="100" height="28" rx="8" class="dp"/><text x="262" y="131" text-anchor="middle" class="dt">Set</text>
  <rect x="330" y="112" width="116" height="28" rx="8" class="dr2"/><text x="388" y="131" text-anchor="middle" class="dt">Queue</text>
  <text x="151" y="158" text-anchor="middle" class="dts">ArrayList · LinkedList · CopyOnWrite</text>
  <text x="262" y="172" text-anchor="middle" class="dts">HashSet · Linked · TreeSet</text>
  <text x="388" y="158" text-anchor="middle" class="dts">PriorityQueue · Deque/ArrayDeque</text>
  <rect x="196" y="182" width="128" height="24" rx="8" class="dg"/><text x="260" y="198" text-anchor="middle" class="dt">Map (separate!)</text>
  <text x="452" y="199" class="dts">HashMap·TreeMap·LinkedHM</text>
</svg></div>
<div class="callout tip"><span class="ct">💡 Choose in 5 seconds</span>Need order+duplicates → <b>ArrayList</b> · Uniqueness → <b>HashSet</b> · Sorted → <b>TreeSet</b> · Key→Value → <b>HashMap</b> · FIFO/LIFO → <b>ArrayDeque</b> · Top-k → <b>PriorityQueue</b>.</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why doesn't Map extend Collection?</div><div class="a">Collections hold single elements; Map holds mappings (pairs). Different contract — entrySet/keySet/values bridge them.</div></div>
<div class="qa"><div class="q">ArrayList vs LinkedList when?</div><div class="a">Almost always ArrayList (cache-friendly, O(1) random). LinkedList only for heavy head/tail deque usage — and ArrayDeque beats it there too.</div></div>
<div class="qa"><div class="q">Vector vs ArrayList?</div><div class="a">Vector = legacy synchronized ArrayList; use ArrayList + explicit locking/concurrent collections instead.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>L</b>ist loves Line-order, <b>S</b>et hates Same-ness, <b>M</b>ap matches pairs 🔑”.</div>`});

/* Chapter 12 · spread 2 — HashMap internals */
B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 12 · HashMap Internals',
html: `<h2 class="chap"><span class="chnum">CHAPTER 12 · CONT.</span>HashMap — Buckets, Trees &amp; Magic Masks</h2>
<p class="dropcap">HashMap = <strong>array of buckets</strong> (<code>Node[] table</code>). Default capacity 16, load-factor 0.75 → resize to double when entries cross 12. This one structure decides many screening rounds.</p>
<h3 class="sec">The put() journey</h3>
<div class="timeline">
<div class="tl-item"><b>Hash spreading</b> — <code>h ^ (h &gt;&gt;&gt; 16)</code> mixes high bits so similar keys scatter.</div>
<div class="tl-item"><b>Index</b> — <code>(n−1) &amp; hash</code>: valid because n is a power of two → cheap bitmask.</div>
<div class="tl-item"><b>Bucket visit</b> — empty? place node. Same key (== then equals)? replace value. Else chain it.</div>
<div class="tl-item"><b>Treeify</b> — bin reaching <strong>8 nodes (capacity ≥ 64)</strong> becomes red-black tree → O(log n).</div>
<div class="tl-item"><b>Resize</b> — past threshold, capacity ×2; bins split into low/high lists without rehashing.</div>
</div>
<h3 class="sec">The sacred contract</h3>
<p>Equals keys MUST share hashCode. Override only hashCode → duplicate “equal” keys pile in. Only equals → entries vanish forever. Both or nothing!</p>
<pre class="code" data-lang="java"><code>Map&lt;String,Integer&gt; m = new HashMap&lt;&gt;();
m.put("a",1); m.put("a",2);          // replaces → {a=2}
m.getOrDefault("b", 0);              // 0, no NPE dance
m.merge("c", 1, Integer::sum);       // counting idiom ⭐</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'Inside A HashMap',
html: `<div class="figframe"><div class="figtitle">Buckets, chains &amp; treeification</div>
<svg class="diagram" viewBox="0 0 540 170">
  <rect x="10" y="10" width="60" height="24" rx="5" class="db"/><text x="40" y="27" text-anchor="middle" class="dts">bucket 0</text>
  <rect x="80" y="10" width="60" height="24" rx="5" class="db"/><text x="110" y="27" text-anchor="middle" class="dts">1</text>
  <rect x="150" y="10" width="60" height="24" rx="5" class="do_"/><text x="180" y="27" text-anchor="middle" class="dts">2 ●</text>
  <rect x="220" y="10" width="60" height="24" rx="5" class="db"/><text x="250" y="27" text-anchor="middle" class="dts">3</text>
  <text x="300" y="27" class="dts">… up to n−1</text>
  <path d="M180 34 v18" class="dl"/>
  <rect x="146" y="52" width="68" height="22" rx="6" class="dp"/><text x="180" y="67" text-anchor="middle" class="dts">(k1,v1)</text>
  <path d="M180 74 v14" class="dl"/><polygon points="180,90 176,83 184,83" fill="#8a5a33"/>
  <rect x="146" y="92" width="68" height="22" rx="6" class="dp"/><text x="180" y="107" text-anchor="middle" class="dts">(k2,v2)</text>
  <path d="M214 103 h40" class="dl dash"/><text x="258" y="107" class="dts">chain… at 8 nodes:</text>
  <path d="M370 96 L400 70 L430 96 Z" class="dr2" fill-opacity=".25"/><text x="400" y="118" text-anchor="middle" class="dts">red-black tree</text>
  <text x="400" y="134" text-anchor="middle" class="da">O(n) → O(log n)</text>
  <text x="270" y="156" text-anchor="middle" class="dts">index = (n−1) &amp; hash  •  resize = ×2</text>
</svg></div>
<table class="tbl">
<tr><th>Op</th><th>Average</th><th>Worst (chain)</th><th>Worst (tree)</th></tr>
<tr><td>get</td><td class="yes">O(1)</td><td class="no-tx">O(n)</td><td class="mid">O(log n)</td></tr>
<tr><td>put</td><td class="yes">O(1)</td><td class="no-tx">O(n)</td><td class="mid">O(log n)</td></tr>
</table>
<div class="callout warn"><span class="ct">⚠️ Fail-fast iterators</span>Structural change while iterating a HashMap/ArrayList → <code>ConcurrentModificationException</code>. Use <code>Iterator.remove()</code>, <code>removeIf()</code>, or ConcurrentHashMap/CopyOnWriteArrayList for concurrency.</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why power-of-2 capacity?</div><div class="a">So <code>(n−1) &amp; hash</code> is a perfect modulo mask — bit-op speed + uniform spread.</div></div>
<div class="qa"><div class="q">Why treeify at 8?</div><div class="a">Bin sizes follow Poisson(λ≈0.5): hitting 8 is ~1-in-10-million under good hashing — if it happens, hashing is bad, so pay tree cost.</div></div>
<div class="qa"><div class="q">What if you override only hashCode? only equals?</div><div class="a">Only hashCode → unequal objects collide into same bucket but equals() keeps them “different” → duplicates in HashSet! Only equals → lookups miss entirely.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>16</b> friends at a <b>.75</b> party 🎉 — when the <b>12th</b> arrives, buy a bigger house (×2).”</div>`});

/* ===== CHAPTER 13 · Generics ===== */
B.chapter('p2', 13, 'Generics & PECS');
B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 13 · Generics',
html: `<h2 class="chap"><span class="chnum">CHAPTER 13</span>Generics — Types As Parameters</h2>
<p class="dropcap">Generics push type errors from runtime to <strong>compile time</strong> and delete cast noise. <code>List&lt;String&gt;</code> promises strings forever; the compiler polices every insert.</p>
<h3 class="sec">Vocabulary &amp; syntax</h3>
<ul>
<li><b>Type params:</b> <code>T</code>Type · <code>E</code>Element · <code>K,V</code>Key/Value · <code>R</code>Return.</li>
<li><b>Bounded:</b> <code>&lt;T extends Comparable&lt;T&gt;&gt;</code> restricts to sortable types.</li>
<li><b>Generic method:</b> <code>static &lt;T&gt; T first(List&lt;T&gt; xs)</code>.</li>
</ul>
<h3 class="sec">Wildcards + PECS rule ⭐</h3>
<pre class="code" data-lang="java"><code>// PRODUCER (you only READ from it) → extends
double sum(List&lt;? extends Number&gt; src) {...}

// CONSUMER (you only WRITE into it) → super
void fill(List&lt;? super Integer&gt; dst) { dst.add(42); }

List&lt;? extends Object&gt; ro = List.of(1, "x"); // read as Object
List&lt;? super Integer&gt;  wo = new ArrayList&lt;Number&gt;();</code></pre>
<h3 class="sec">Type erasure — the plot twist</h3>
<p>Generics are a <em>compile-time</em> costume: after compilation <code>List&lt;String&gt;</code> is plain <code>List</code>. Consequences you must recite: ❌ <code>new T()</code>, ❌ <code>T.class</code>, ❌ <code>new T[]</code>, ❌ primitive type args (<code>List&lt;int&gt;</code>), ❌ two overloads differing only by generic parameter.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'PECS Cheat Sheet',
html: `<div class="figframe"><div class="figtitle">Producer Extends · Consumer Super</div>
<svg class="diagram" viewBox="0 0 540 130">
  <rect x="16" y="24" width="150" height="70" rx="10" class="do_"/><text x="91" y="50" text-anchor="middle" class="dt" font-weight="700">PRODUCER</text><text x="91" y="72" text-anchor="middle" class="dts">you read FROM it</text>
  <rect x="196" y="38" width="150" height="44" rx="10" class="db"/><text x="271" y="57" text-anchor="middle" class="dt">? extends Number</text><text x="271" y="73" text-anchor="middle" class="dts">Integer…Double all fine</text>
  <path d="M168 59 h24" class="dl"/><polygon points="194,59 186,55 186,63" fill="#8a5a33"/>
  <path d="M348 59 h24" class="dl"/><polygon points="374,59 366,55 366,63" fill="#8a5a33"/>
  <rect x="376" y="24" width="150" height="70" rx="10" class="dp"/><text x="451" y="50" text-anchor="middle" class="dt" font-weight="700">CONSUMER</text><text x="451" y="72" text-anchor="middle" class="dts">you write INTO it</text>
  <text x="270" y="118" text-anchor="middle" class="da">? super Integer accepts Integer & its ancestors</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 Erasure proof</h5><p><code>new ArrayList&lt;String&gt;().getClass() == new ArrayList&lt;Integer&gt;().getClass()</code> → <b>true</b>!</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Invariance vs arrays</h5><p><code>List&lt;Object&gt;</code> is NOT <code>List&lt;String&gt;</code>'s parent (compile-safe!); arrays ARE covariant (runtime explosions).</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">List&lt;Object&gt; vs List&lt;?&gt;?</div><div class="a">First: a list whose elements must be Object (can add anything). Second: unknown-type snapshot — you can't add (except null), only read as Object.</div></div>
<div class="qa"><div class="q">Why can't generics take primitives?</div><div class="a">Erasure replaces T with Object; primitives aren't Objects → autoboxing wrappers fill the gap.</div></div>
<div class="qa"><div class="q">What is heap pollution?</div><div class="a">A variable of parametrized type referring to an object of wrong parameter type (varargs/raw misuse) → ClassCastException far from the crime scene.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>P</b>roducers <b>E</b>xtend the menu, <b>C</b>onsumers <b>S</b>uper-size the order 🍔”.</div>`});
})();
