/* ===== CHAPTERS 16–17 · JVM Internals & I/O ===== */
(function () {
var B = window.BOOK;
B.chapter('p2', 16, 'JVM Internals & Garbage Collection');

/* Chapter 16 · spread 1 */
B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 16 · Memory Model',
html: `<h2 class="chap"><span class="chnum">CHAPTER 16</span>JVM Internals — Class Loading &amp; Memory Areas</h2>
<p class="dropcap">Senior interviews live here. Know the <strong>runtime data areas</strong> and the <strong>classloader delegation</strong> model and you outshine most candidates instantly.</p>
<h3 class="sec">ClassLoader hierarchy &amp; delegation</h3>
<ul>
<li><strong>Bootstrap</strong> — loads core JDK (<code>java.lang.*</code>) from the runtime image.</li>
<li><strong>Platform</strong> (ex-Extension) — JDBC drivers etc.</li>
<li><strong>Application</strong> — your classpath classes; custom loaders extend it.</li>
<li><strong>Parent-first:</strong> a loader asks its parent BEFORE loading itself → guarantees one canonical <code>java.lang.String</code>.</li>
</ul>
<h3 class="sec">Runtime data areas</h3>
<table class="tbl">
<tr><th>Area</th><th>Shared?</th><th>Holds</th></tr>
<tr><td><b>Heap</b></td><td class="yes">Yes</td><td>All objects &amp; arrays; GC playground. Young(Eden+2 Survivors) → Old.</td></tr>
<tr><td><b>Metaspace</b></td><td class="yes">Yes</td><td>Class metadata in NATIVE memory (replaced PermGen since Java 8).</td></tr>
<tr><td><b>Stack</b></td><td class="no-tx">Per thread</td><td>Frames: local vars, operand stack, partial results.</td></tr>
<tr><td><b>PC register</b></td><td class="no-tx">Per thread</td><td>Address of current instruction.</td></tr>
<tr><td><b>Native stack</b></td><td class="no-tx">Per thread</td><td>JNI/native method calls.</td></tr>
</table>
<p class="fs13">📌 String pool moved to the <strong>heap</strong> (since Java 7). Escape analysis may even stack-allocate non-escaping objects.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'The Memory Map',
html: `<div class="figframe"><div class="figtitle">One JVM, many rooms</div>
<svg class="diagram" viewBox="0 0 540 200">
  <rect x="10" y="10" width="300" height="120" rx="11" class="db"/><text x="160" y="30" text-anchor="middle" class="dt" font-weight="700">HEAP (shared · GC-managed)</text>
  <rect x="24" y="42" width="130" height="76" rx="8" class="do_"/><text x="89" y="60" text-anchor="middle" class="dts">YOUNG</text>
  <rect x="34" y="72" width="52" height="38" rx="6" fill="#fff6e0" stroke="#2e7d32"/><text x="60" y="94" text-anchor="middle" class="dts">Eden</text>
  <rect x="92" y="72" width="28" height="38" rx="6" fill="#fff6e0" stroke="#2e7d32"/><text x="106" y="94" text-anchor="middle" class="dts">S0</text>
  <rect x="124" y="72" width="28" height="38" rx="6" fill="#fff6e0" stroke="#2e7d32"/><text x="138" y="94" text-anchor="middle" class="dts">S1</text>
  <rect x="166" y="42" width="132" height="76" rx="8" class="dr2"/><text x="232" y="78" text-anchor="middle" class="dts">OLD / TENURED</text><text x="232" y="96" text-anchor="middle" class="dts">long survivors</text>
  <rect x="330" y="10" width="200" height="56" rx="11" class="dg"/><text x="430" y="32" text-anchor="middle" class="dt" font-weight="700">METASPACE (native)</text><text x="430" y="50" text-anchor="middle" class="dts">class structures · methods bytecode</text>
  <rect x="330" y="76" width="96" height="54" rx="11" class="dp"/><text x="378" y="98" text-anchor="middle" class="dts">THREAD-1 STACK</text><text x="378" y="116" text-anchor="middle" class="dts">frames ↓</text>
  <rect x="436" y="76" width="96" height="54" rx="11" class="dp"/><text x="484" y="98" text-anchor="middle" class="dts">THREAD-2 STACK</text><text x="484" y="116" text-anchor="middle" class="dts">frames ↓</text>
  <text x="270" y="152" text-anchor="middle" class="dts">new Object() → Eden → survives GC → Survivor → Old</text>
  <text x="270" y="172" text-anchor="middle" class="da">Minor GC = Young fast copy · Major/Full GC touches Old</text>
</svg></div>
<div class="callout warn"><span class="ct">⚠️ Two famous crashes</span><code>StackOverflowError</code> = runaway recursion fills ONE thread's stack. <code>OutOfMemoryError</code> = heap/metaspace exhausted globally.</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Metaspace vs PermGen?</div><div class="a">PermGen lived inside the JVM heap with fixed max (OOM: PermGen space). Metaspace uses native memory and grows by default (-XX:MaxMetaspaceSize caps).</div></div>
<div class="qa"><div class="q">Who unloads classes?</div><div class="a">GC removes a class when its ClassLoader becomes unreachable — why leaking custom loaders leaks classes.</div></div>
<div class="qa"><div class="q">Where is the string pool?</div><div class="a">In the HEAP since Java 7 (earlier: PermGen).</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Heap = playground 🛝 (objects), Metaspace = school 🏫 (classes), Stack = each kid's own backpack 🎒.”</div>`});

/* Chapter 16 · spread 2 — Garbage Collection */
B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 16 · Garbage Collection',
html: `<h2 class="chap"><span class="chnum">CHAPTER 16 · CONT.</span>Garbage Collection &amp; Performance Tuning</h2>
<h3 class="sec">Who is “garbage”?</h3>
<p>An object dies when no <em>GC root</em> can reach it: active-thread stacks, static fields, JNI handles. Mark → Sweep/Copy → Compact. The generational hypothesis: <strong>most objects die young</strong>, so scan Young often (cheap, fast copy) and Old rarely.</p>
<h3 class="sec">The collector menu</h3>
<table class="tbl">
<tr><th>Collector</th><th>Style</th><th>Pick when…</th></tr>
<tr><td>Serial</td><td>1 thread STW</td><td>Tiny containers, CLI tools</td></tr>
<tr><td>Parallel</td><td>N threads STW</td><td>Batch jobs craving throughput</td></tr>
<tr><td><b>G1</b> (default)</td><td>Regions, incremental</td><td>Balanced latency+throughput, big heaps</td></tr>
<tr><td>ZGC / Shenandoah</td><td>Concurrent, colored ptrs</td><td>&lt;1 ms pauses, huge heaps (trading)</td></tr>
</table>
<h3 class="sec">Flags you'll actually quote</h3>
<pre class="code" data-lang="bash"><code>-Xms512m -Xmx2g            # initial / max heap
-XX:+UseG1GC -XX:MaxGCPauseMillis=200
-XX:+HeapDumpOnOutOfMemoryError    # prod essential!</code></pre>
<h3 class="sec">Memory-leak suspects lineup</h3>
<ul>
<li>Static collections that only grow (caches without eviction).</li>
<li>Unclosed streams/connections (try-with-resources!).</li>
<li><code>ThreadLocal</code> never removed in pooled threads.</li>
<li>Listeners registered, never unregistered.</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'G1 & Leak Hunting',
html: `<div class="figframe"><div class="figtitle">G1 splits heap into equal regions</div>
<svg class="diagram" viewBox="0 0 540 128">
  <g stroke="#8a5a33" fill="#f6ecd2">
    <rect x="14" y="14" width="60" height="44" rx="5" class="do_"/><rect x="80" y="14" width="60" height="44" rx="5" class="do_"/>
    <rect x="146" y="14" width="60" height="44" rx="5" class="dr2"/><rect x="212" y="14" width="60" height="44" rx="5" class="do_"/>
    <rect x="14" y="64" width="60" height="44" rx="5" class="dr2"/><rect x="80" y="64" width="60" height="44" rx="5" class="do_"/>
    <rect x="146" y="64" width="60" height="44" rx="5" class="do_"/><rect x="212" y="64" width="60" height="44" rx="5" class="dr2"/>
  </g>
  <text x="122" y="42" text-anchor="middle" class="dts">Eden</text><text x="188" y="42" text-anchor="middle" class="dts">Old</text><text x="46" y="92" text-anchor="middle" class="dts">Old</text><text x="254" y="92" text-anchor="middle" class="dts">Humongous</text>
  <rect x="300" y="14" width="230" height="94" rx="10" class="db"/><text x="415" y="38" text-anchor="middle" class="dts">GC ROOTS</text>
  <circle cx="360" cy="60" r="12" class="dg"/><text x="360" y="65" text-anchor="middle" class="dts">S1</text>
  <circle cx="420" cy="60" r="12" fill="#fff" stroke="#8a5a33"/><text x="420" y="65" text-anchor="middle" class="da">✖</text>
  <circle cx="480" cy="60" r="12" class="dg"/><text x="480" y="65" text-anchor="middle" class="dts">S2</text>
  <path d="M372 60 h34 M432 60 h34" class="dl"/>
  <text x="415" y="98" text-anchor="middle" class="dts">unreachable ✖ = collected next pass</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>🔍 Leak autopsy</h5><ol style="margin-left:-10px;padding-left:22px"><li>Capture heap dump (JFR/jmap)</li><li>Open Eclipse MAT</li><li>Dominator tree → biggest retainer</li><li>Trace GC root path</li></ol></div>
<div class="cardx" style="--rc:#b28900"><h5>📌 Reference strengths</h5><p><b>Strong</b> never collects · <b>Soft</b> before OOM (caches) · <b>Weak</b> next GC (WeakHashMap) · <b>Phantom</b> cleanup hooks.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Production throws OutOfMemoryError — walk me through it.</div><div class="a">Confirm which area via logs → heap dump with HeapDumpOnOutOfMemoryError → MAT dominator tree → identify retainer (cache? session?) → fix eviction/close → verify with JFR over load.</div></div>
<div class="qa"><div class="q">G1 vs ZGC?</div><div class="a">G1 balances everywhere (default). ZGC targets strict sub-millisecond pauses on very large heaps by doing almost all work concurrently.</div></div>
<div class="qa"><div class="q">Does finalize() still exist?</div><div class="a">Deprecated-for-removal — unpredictable; use try-with-resources or java.lang.ref.Cleaner.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“G1 = patient gardener 🌱 trimming regions between visitors; ZGC = gardener who trims WHILE guests walk ⚡.”</div>`});

/* ===== CHAPTER 17 · File I/O & Serialization ===== */
B.chapter('p2', 17, 'File I/O & Serialization');
B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 17 · I/O',
html: `<h2 class="chap"><span class="chnum">CHAPTER 17</span>Files, Streams &amp; Serialization</h2>
<p class="dropcap">I/O is about two families: <strong>Byte streams</strong> (<code>InputStream/OutputStream</code>) for binary truth, and <strong>Character streams</strong> (<code>Reader/Writer</code>) for text with encoding. Wrap them in <em>Buffered*</em> to stop syscall ping-pong — buffers are conveyor belts.</p>
<pre class="code" data-lang="java"><code>// try-with-resources closes even on exception ⭐
try (var r = new BufferedReader(new FileReader("in.txt"));
     var w = new BufferedWriter(new FileWriter("out.txt"))) {
    String line;
    while ((line = r.readLine()) != null) w.write(line + "\n");
}</code></pre>
<h3 class="sec">java.nio.file — modern one-liners</h3>
<pre class="code" data-lang="java"><code>Path p = Path.of("data.csv");
List&lt;String&gt; rows = Files.readAllLines(p);
Files.writeString(Path.of("o.txt"), "hello");
try (var st = Files.walk(Path.of("."))) {      // recursive listing
    st.filter(f -&gt; f.toString().endsWith(".java")).forEach(System.out::println);
}</code></pre>
<h3 class="sec">Serialization — objects ⇄ bytes</h3>
<p>Implement <strong>Serializable</strong> (empty marker interface) → <code>ObjectOutputStream.writeObject()</code>. Pin <code>private static final long serialVersionUID</code> or any class change breaks old data with <code>InvalidClassException</code>.</p>
<ul>
<li><code>transient</code> — skip sensitive/derived fields (passwords!). Static fields never serialized.</li>
<li>Records serialize through the canonical constructor (safe by design).</li>
<li>Deserializing untrusted bytes = remote-code-execution risk → use filters / JSON instead.</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'Stream Family & Radar',
html: `<div class="figframe"><div class="figtitle">Who wraps whom</div>
<svg class="diagram" viewBox="0 0 540 118">
  <rect x="14" y="38" width="120" height="44" rx="9" class="db"/><text x="74" y="56" text-anchor="middle" class="dt">FileInputStream</text><text x="74" y="72" text-anchor="middle" class="dts">raw bytes from disk</text>
  <path d="M136 60 h22" class="dl"/><polygon points="160,60 152,56 152,64" fill="#8a5a33"/>
  <rect x="162" y="38" width="130" height="44" rx="9" class="dp"/><text x="227" y="56" text-anchor="middle" class="dt">BufferedInputStream</text><text x="227" y="72" text-anchor="middle" class="dts">8 KB belt 📦</text>
  <path d="M294 60 h22" class="dl"/><polygon points="318,60 310,56 310,64" fill="#8a5a33"/>
  <rect x="320" y="38" width="110" height="44" rx="9" class="do_"/><text x="375" y="56" text-anchor="middle" class="dt">DataInputStream</text><text x="375" y="72" text-anchor="middle" class="dts">readInt/readUTF</text>
  <text x="470" y="52" class="dts">char world:</text>
  <text x="470" y="70" class="dts">Reader ↔ Writer</text>
  <text x="470" y="88" class="dts">(encoding aware)</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 Marker interfaces</h5><p>Serializable/Cloneable carry NO methods — they're tags the runtime checks (<code>instanceof</code>-style permission slips).</p></div>
<div class="cardx" style="--rc:#256c29"><h5>✔ Deep copy trick</h5><p>Serialize object → deserialize copy: instant deep clone without writing clone() plumbing.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 serialVersionUID drift</h5><p>Forget it? Compiler generates one from your class shape — ANY edit invalidates stored streams silently.</p></div>
<div class="cardx" style="--rc:#b28900"><h5>📌 Files.walk leak</h5><p>DirectoryStream/Walk must be closed — always use try-with-resources around walks.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why buffered streams dramatically faster?</div><div class="a">Each raw read/write hits the OS; buffer batches into large chunks — fewer syscalls dominate cost.</div></div>
<div class="qa"><div class="q">transient vs static during serialization?</div><div class="a">Both excluded — but transient belongs to instance state you chose to skip; static is class-level data that was never per-object.</div></div>
<div class="qa"><div class="q">Java vs external formats today?</div><div class="a">Java serialization only for trusted internal data; APIs use JSON/Protobuf/Avro — safer, cross-language, version-tolerant.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Bytes = truth 🎥, Chars = language 📝, Buffers = conveyor belts 📦.”</div>`});

})();
