/* ===== CHAPTER 3 · Control Flow ===== */
(function () {
var B = window.BOOK;
B.chapter('p1', 3, 'Control Flow: if, switch & Loops');

B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 3 · Decisions & Repetition',
html: `<h2 class="chap"><span class="chnum">CHAPTER 03</span>Control Flow — Teaching Code To Decide &amp; Repeat</h2>
<h3 class="sec">Decisions</h3>
<pre class="code" data-lang="java"><code>int score = 85;
if (score >= 90)      System.out.println("A");
else if (score >= 75) System.out.println("B");   // ← prints
else                  System.out.println("C");

// Modern switch EXPRESSION (Java 14+) — arrow, no fall-through
String day = "SAT";
String type = switch (day) {
    case "SAT", "SUN" -> "WEEKEND";
    case "MON"        -> "GRIND DAY";
    default           -> { yield "WEEKDAY"; }   // block needs yield
};</code></pre>
<div class="callout warn"><span class="ct">⚠️ Old-switch fall-through</span>Classic <code>case X:</code> falls into next case without <code>break;</code> — the #1 cause of silent bugs. Arrow switch fixes this forever.</div>
<h3 class="sec">Loops — pick the right tool</h3>
<table class="tbl">
<tr><th>Loop</th><th>Use when…</th></tr>
<tr><td><code>for</code></td><td>You know the count (indexes, matrices)</td></tr>
<tr><td><code>while</code></td><td>Condition known only at runtime (input, retry)</td></tr>
<tr><td><code>do-while</code></td><td>Body must run ≥ once (menus)</td></tr>
<tr><td><code>for-each</code></td><td>Visit every element of array/collection</td></tr>
</table>
<pre class="code" data-lang="java"><code>outer:                       // labeled break exits BOTH loops
for (int i = 1; i <= 3; i++)
    for (int j = 1; j <= 3; j++) {
        if (i * j == 6) break outer;
        if (j == 2)     continue;    // skip this j only
        System.out.print(i + "" + j + " ");
    }                            // prints 11 21 31</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'Flowcharts & Chooser',
html: `<div class="figframe"><div class="figtitle">Three shapes you must picture instantly</div>
<svg class="diagram" viewBox="0 0 540 190">
  <ellipse cx="52" cy="30" rx="34" ry="16" class="dg"/><text x="52" y="35" text-anchor="middle" class="dts">start</text>
  <path d="M52 46 v18" class="dl"/><polygon points="52,68 48,60 56,60" fill="#8a5a33"/>
  <path d="M20 70 h64 l-12 26 h-64 z" transform="translate(12,0)" class="dp"/><text x="52" y="90" text-anchor="middle" class="dts">cond?</text>
  <path d="M52 100 v22" class="dl"/><text x="62" y="116" class="dts">true ↓</text>
  <rect x="24" y="124" width="56" height="28" rx="6" class="do_"/><text x="52" y="142" text-anchor="middle" class="dts">body</text>
  <path d="M84 84 h44 v54 h-44" class="dl dash"/><text x="112" y="80" class="dts">false</text>
  <text x="52" y="176" text-anchor="middle" class="dts">if / else-if ladder</text>

  <circle cx="200" cy="30" r="15" class="dr2"/><text x="200" y="35" text-anchor="middle" class="dts">init</text>
  <path d="M200 45 v14" class="dl"/>
  <path d="M172 61 h56 l-10 22 h-56 z" transform="translate(10,0)" class="dp"/><text x="206" y="78" text-anchor="middle" class="dts">cond?</text>
  <path d="M206 87 v18" class="dl"/><text x="216" y="101" class="dts">true</text>
  <rect x="178" y="106" width="56" height="26" rx="6" class="do_"/><text x="206" y="123" text-anchor="middle" class="dts">body</text>
  <path d="M234 119 h34 l0,-47 h-24" class="dl"/><polygon points="240,72 248,68 248,76" fill="#8a5a33"/><text x="258" y="98" class="dts">update</text>
  <text x="206" y="176" text-anchor="middle" class="dts">for / while loop</text>

  <path d="M330 70 h64 l-12 26 h-64 z" transform="translate(12,0)" class="dp"/><text x="400" y="90" text-anchor="middle" class="dts">match?</text>
  <rect x="360" y="118" width="80" height="26" rx="6" class="do_"/><text x="400" y="135" text-anchor="middle" class="dts">case body</text>
  <path d="M400 96 v18" class="dl"/><text x="410" y="112" class="dts">hit</text>
  <path d="M444 84 h50 v47 h-48" class="dl dash"/><text x="470" y="78" class="dts">no match</text>
  <text x="400" y="176" text-anchor="middle" class="dts">switch — arrow style never falls through</text>
</svg></div>
<div class="callout tip"><span class="ct">💡 Loop chooser</span>Counting → <b>for</b> · Unknown reps → <b>while</b> · Menus → <b>do-while</b> · Collections → <b>for-each</b>. Nested exit → <b>labeled break</b>.</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Can we switch on String?</div><div class="a">Yes since Java 7 (uses equals/hashCode internally). Also valid: int, enum, char, and since 7: String; NOT long/float/boolean.</div></div>
<div class="qa"><div class="q">for vs while — any real difference?</div><div class="a">Semantics equal; <code>for</code> scopes the loop variable nicely. But a constant-false condition like <code>while(false){}</code> makes following code unreachable → compile error.</div></div>
<div class="qa"><div class="q">Difference break vs continue?</div><div class="a">break leaves the loop entirely; continue skips to the next iteration.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span><b>“switch = signboard 🪧 (jump straight to case), if = fork 🍴 (test each road)”</b>.</div>`});

/* ===== CHAPTER 4 · Arrays ===== */
B.chapter('p1', 4, 'Arrays: Fixed Boxes In A Row');
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 4 · Arrays',
html: `<h2 class="chap"><span class="chnum">CHAPTER 04</span>Arrays — Indexed Boxes, Frozen Size</h2>
<p class="dropcap">An array is a <strong>fixed-length container of same-type elements</strong>, stored contiguously and addressed by index — giving <span class="hl">O(1) random access</span>. It is an object, so it lives on the heap and its size can never change after creation.</p>
<pre class="code" data-lang="java"><code>int[] a = new int[5];            // [0,0,0,0,0] defaults!
int[] b = {7, 8, 9};             // literal form
int[][] grid = new int[3][4];    // rectangular
int[][] jag  = new int[3][];     // jagged rows allowed

for (int x : b) System.out.print(x);   // for-each walk
System.out.println(b.length);          // property, NOT method</code></pre>
<div class="callout warn"><span class="ct">⚠️ Three classics</span><code>arr.length</code> vs <code>str.length()</code> vs <code>list.size()</code> — mixing them is a rite of passage. And index 5 on a size-5 array → <code>ArrayIndexOutOfBoundsException</code>.</div>
<h3 class="sec">Moves you'll reuse forever</h3>
<pre class="code" data-lang="java"><code>// max element
int max = a[0];
for (int x : a) if (x > max) max = x;

// reverse in place (two pointers)
for (int i = 0, j = a.length - 1; i < j; i++, j--) {
    int t = a[i]; a[i] = a[j]; a[j] = t;
}</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'Memory Picture & Radar',
html: `<div class="figframe"><div class="figtitle">int[] b = {7,8,9} in memory</div>
<svg class="diagram" viewBox="0 0 540 104">
  <text x="10" y="30" class="dts">b ─────►</text>
  <rect x="92" y="8" width="80" height="42" rx="7" class="db"/><text x="132" y="35" text-anchor="middle" class="dt">7</text><text x="132" y="68" text-anchor="middle" class="dts">index 0</text>
  <rect x="182" y="8" width="80" height="42" rx="7" class="db"/><text x="222" y="35" text-anchor="middle" class="dt">8</text><text x="222" y="68" text-anchor="middle" class="dts">index 1</text>
  <rect x="272" y="8" width="80" height="42" rx="7" class="db"/><text x="312" y="35" text-anchor="middle" class="dt">9</text><text x="312" y="68" text-anchor="middle" class="dts">index 2</text>
  <rect x="420" y="6" width="110" height="30" rx="6" class="dg"/><text x="475" y="26" text-anchor="middle" class="dts">O(1) access ⚡</text>
  <text x="380" y="30" class="dts">addr = base+i·4B</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Arrays.asList()</h5><p>Returns fixed-size list backed by the array — <code>add()/remove()</code> throw UnsupportedOperationException.</p></div>
<div class="cardx" style="--rc:#b28900"><h5>🪤 Covariance trap</h5><p><code>Object[] o = new String[1]</code> compiles; storing an Integer explodes at RUNTIME (ArrayStoreException).</p></div>
<div class="cardx" style="--rc:#155fae"><h5>📌 Utility belt</h5><p><code>Arrays.toString/sort/fill/copyOf/equals/deepToString</code> cover 90% of needs.</p></div>
<div class="cardx" style="--rc:#256c29"><h5>✔ Defaults apply</h5><p>Fresh arrays are zeroed: numeric→0, boolean→false, refs→null.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Array vs ArrayList?</div><div class="a">Array: fixed size, primitives ok, faster. ArrayList: dynamic (grows ~1.5×), generics, rich API — backed by an internal array.</div></div>
<div class="qa"><div class="q">Is a 2-D array one block?</div><div class="a">No — it's an array OF row-arrays; rows may differ in length.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Arrays hate change — size frozen at birth 💍.”</div>`});

/* ===== CHAPTER 5 · Strings ===== */
B.chapter('p1', 5, 'Strings Deep Dive');
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 5 · Strings',
html: `<h2 class="chap"><span class="chnum">CHAPTER 05</span>Strings — Immutable Royalty 👑</h2>
<p class="dropcap"><code>String</code> is an <strong>immutable</strong> object: every “modification” returns a brand-new string. Immutability buys security (paths/class names can't be mutated mid-use), thread-safety, cached hash codes (perfect HashMap keys!) and enables the famous <span class="hl">String Pool</span> reuse.</p>
<h3 class="sec">Pool rules — count objects like a pro</h3>
<pre class="code" data-lang="java"><code>String a = "hello";          // pool object #1
String b = "hello";          // REUSES pool #1 → a == b ✔
String c = new String("hello"); // NEW heap copy #2
System.out.println(a == b);      // true  (same ref)
System.out.println(a == c);      // false (different refs)
System.out.println(a.equals(c)); // true  (same chars)
String d = c.intern();           // hands back pool copy
System.out.println(a == d);      // true</code></pre>
<h3 class="sec">Mutable siblings — when you DO need to edit</h3>
<table class="tbl">
<tr><th>Class</th><th>Mutable?</th><th>Thread-safe?</th><th>Use for</th></tr>
<tr><td><code>StringBuilder</code></td><td class="yes">Yes</td><td class="no-tx">No</td><td>Building strings in loops — fast default</td></tr>
<tr><td><code>StringBuffer</code></td><td class="yes">Yes</td><td class="yes">Yes (synchronized)</td><td>Legacy shared scenarios</td></tr>
<tr><td><code>String</code></td><td class="no-tx">No</td><td class="yes">Yes</td><td>Values, keys, constants</td></tr>
</table>
<div class="callout warn"><span class="ct">⚠️ Loop concatenation</span><code>s += x;</code> inside a loop copies everything each pass → <b>O(n²)</b>. Use <code>StringBuilder.append()</code> → O(n).</div>`},
{ kicker: 'VISUAL GUIDE', head: 'The String Pool',
html: `<div class="figframe"><div class="figtitle">Where literals live vs new String()</div>
<svg class="diagram" viewBox="0 0 540 150">
  <rect x="14" y="14" width="180" height="120" rx="10" class="dg"/><text x="104" y="34" text-anchor="middle" class="dt" font-weight="700">STRING POOL (heap)</text>
  <rect x="52" y="52" width="104" height="30" rx="7" fill="#fff8e8" stroke="#26418f"/><text x="104" y="72" text-anchor="middle" class="dt">"hello"</text>
  <text x="30" y="122" class="dts">one shared object</text>
  <rect x="330" y="14" width="190" height="120" rx="10" class="dr2"/><text x="425" y="34" text-anchor="middle" class="dt" font-weight="700">new String("hello")</text>
  <rect x="368" y="52" width="104" height="30" rx="7" fill="#fff8e8" stroke="#c0392b"/><text x="420" y="72" text-anchor="middle" class="dt">heap copy</text>
  <path d="M156 67 C230 40 300 40 364 60" class="dl dash"/><text x="258" y="38" text-anchor="middle" class="dts">intern() returns pool twin</text>
  <text x="250" y="112" text-anchor="middle" class="dts">== compares arrows • equals compares contents</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>🧮 Object-count quiz</h5><p><code>new String("hi")</code> creates <b>2 objects</b>: pool literal "hi" + heap copy.</p></div>
<div class="cardx" style="--rc:#256c29"><h5>⚡ Palindrome trick</h5><p><code>s.contentEquals(new StringBuilder(s).reverse())</code> — one-liner interviews love.</p></div>
</div>
<pre class="code" data-lang="java"><code>var sb = new StringBuilder("FAANG");
sb.reverse();                       // GNAAF
String tb = """
    select * from users             // text blocks (Java 15+)
    where age > %d""".formatted(18);</code></pre>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why is String immutable &amp; final?</div><div class="a">Security (no tampering with file/DB/class names), safe sharing in pool, cached hashCode for HashMap keys, inherent thread-safety.</div></div>
<div class="qa"><div class="q">How many objects in <code>"a"+"b"</code>?</div><div class="a">If both are compile-time literals → folded to ONE constant "ab". With variables at runtime → new String each concat (use Builder!).</div></div>
<div class="qa"><div class="q">equals() vs ==?</div><div class="a">== compares references (arrows); equals() compares character contents. For strings ALWAYS use equals.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Strings wear crowns 👑 — nobody edits them; only fresh copies replace them.”</div>`});

/* ===== CHAPTER 6 · Methods, Stack & Heap ===== */
B.chapter('p1', 6, 'Methods, Stack & Pass-By-Value');
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 6 · Methods',
html: `<h2 class="chap"><span class="chnum">CHAPTER 06</span>Methods, Stack Frames &amp; The Photocopier Truth</h2>
<p class="dropcap">Every method call pushes a <strong>stack frame</strong> (locals + parameters) onto the calling thread's stack; returning pops it. Java is <strong>ALWAYS pass-by-value</strong> — for objects, the value copied is the <em>reference</em> (arrow), not the object.</p>
<pre class="code" data-lang="java"><code>void tryFail(StringBuilder sb) {
    sb.append(" changed");   // visible ✔ (same object)
    sb = new StringBuilder("new"); // caller NEVER sees this
}
void overloading(int x) {}          // compile-time binding
void overloading(long x) {}         // by arg types/count/order —
void overloading(int... xs) {}      // NOT by return type alone</code></pre>
<ul>
<li><b>Overload resolution order:</b> exact match ➜ widening ➜ boxing ➜ varargs.</li>
<li><b>Varargs</b> must be the last parameter; treat as array inside.</li>
<li><b>Recursion</b> needs a base case — else <code>StackOverflowError</code> (frames exhaust).</li>
<li><code>static</code> members belong to the CLASS — no instance needed, can't touch instance state directly.</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'Arrows & Frames',
html: `<div class="figframe"><div class="figtitle">Pass-by-value, visualised 📄</div>
<svg class="diagram" viewBox="0 0 540 130">
  <rect x="14" y="20" width="150" height="86" rx="10" class="db"/><text x="89" y="42" text-anchor="middle" class="dts" font-weight="700">caller frame</text>
  <text x="30" y="66" class="dts">sb ──┐</text>
  <rect x="220" y="20" width="160" height="86" rx="10" class="do_"/><text x="300" y="42" text-anchor="middle" class="dts" font-weight="700">callee frame (copy)</text>
  <text x="236" y="66" class="dts">sb' ──┐ same arrow!</text>
  <circle cx="452" cy="63" r="34" class="dp"/><text x="452" y="60" text-anchor="middle" class="dts">StringBuilder</text><text x="452" y="76" text-anchor="middle" class="dts">object on heap</text>
  <path d="M70 70 C120 110 380 112 420 74 M290 70 C320 100 400 96 420 78" class="dl"/>
  <text x="270" y="126" text-anchor="middle" class="da">reassigning sb' bends ONLY the copy — original arrow untouched</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 Swap myth</h5><p><code>swap(a,b)</code> with two Object params CANNOT swap caller's references — photocopies can't redraw your originals.</p></div>
<div class="cardx" style="--rc:#256c29"><h5>✔ Mutate-through-copy</h5><p>Callee CAN change the object's CONTENTS (fields, lists) — that's why collections passed in come back modified.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 int → long overload trap</h5><p><code>m(5)</code> picks <code>(int)</code>; delete it and 5 widens to long silently — know resolution order cold.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Is Java pass-by-reference?</div><div class="a">No — pass-by-value where object values ARE references. Mutation visible, reassignment invisible.</div></div>
<div class="qa"><div class="q">Where do locals vs objects live?</div><div class="a">Locals/primitives in the stack frame; objects always on the heap (escape analysis may optimize later).</div></div>
<div class="qa"><div class="q">Can static method be overridden?</div><div class="a">No — they're hidden, not overridden; binding is static (compile-time) by reference type.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Java photocopies the ticket 🎟️ — the seat (object) is shared, the paper (reference) is yours.”</div>`});

/* ===== CHAPTER 7 · Classes, Objects & Constructors ===== */
B.chapter('p1', 7, 'Classes, Objects & Constructors');
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 7 · Classes',
html: `<h2 class="chap"><span class="chnum">CHAPTER 07</span>Classes — Blueprints That Birth Objects</h2>
<p class="dropcap">A <strong>class</strong> is the blueprint; an <strong>object</strong> is a house built from it, living on the heap with its own field values. The <strong>constructor</strong> is the builder: same name as class, <em>no return type</em>, runs on every <code>new</code>.</p>
<pre class="code" data-lang="java"><code>public class BankAccount {
    private final String owner;      // encapsulated state
    private long balancePaise;

    public BankAccount(String owner) {           // primary
        this(owner, 0);                          // chaining ⭐
    }
    public BankAccount(String owner, long paise) {
        this.owner = owner;
        this.balancePaise = paise;
    }
    public void deposit(long amt) { balancePaise += amt; }
}</code></pre>
<h3 class="sec">Initialization order — asked CONSTANTLY</h3>
<div class="timeline">
<div class="tl-item"><b>1.</b> Static fields defaults ➜ static initializers/blocks — ONCE per class.</div>
<div class="tl-item"><b>2.</b> Per object: instance fields defaults ➜ instance initializer blocks.</div>
<div class="tl-item"><b>3.</b> Constructor body (after any <code>this(...)</code>/implicit <code>super()</code>).</div>
</div>
<h3 class="sec">Records — immutable data in one line</h3>
<pre class="code" data-lang="java"><code>record Point(int x, int y) {}          // ctor+getters+equals+
Point p = new Point(3,4);              // hashCode+toString free!</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'Birth Of An Object',
html: `<div class="figframe"><div class="figtitle">new BankAccount("Asha", 500)</div>
<svg class="diagram" viewBox="0 0 540 120">
  <rect x="12" y="30" width="104" height="44" rx="9" class="db"/><text x="64" y="49" text-anchor="middle" class="dts">statics ready?</text><text x="64" y="64" text-anchor="middle" class="dts">(once per class)</text>
  <path d="M118 52 h24" class="dl"/><polygon points="144,52 136,48 136,56" fill="#8a5a33"/>
  <rect x="146" y="30" width="110" height="44" rx="9" class="do_"/><text x="201" y="49" text-anchor="middle" class="dts">heap space alloc</text><text x="201" y="64" text-anchor="middle" class="dts">fields ← defaults</text>
  <path d="M258 52 h24" class="dl"/><polygon points="284,52 276,48 276,56" fill="#8a5a33"/>
  <rect x="286" y="30" width="112" height="44" rx="9" class="dp"/><text x="342" y="49" text-anchor="middle" class="dts">initializers run</text><text x="342" y="64" text-anchor="middle" class="dts">then ctor body</text>
  <path d="M400 52 h24" class="dl"/><polygon points="426,52 418,48 418,56" fill="#8a5a33"/>
  <rect x="428" y="30" width="100" height="44" rx="9" class="dg"/><text x="478" y="55" text-anchor="middle" class="dt">REFERENCE ✔</text>
  <text x="270" y="102" text-anchor="middle" class="dts">this() chains constructors and MUST be the first statement</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 Default constructor</h5><p>Compiler adds a no-arg one ONLY if you define none. Add ANY ctor → the freebie vanishes (classic compile-error source).</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Private constructors</h5><p>Fully legal — used for singletons/utilities/factories; blocks external <code>new</code>.</p></div>
<div class="cardx" style="--rc:#256c29"><h5>✔ Records vs Lombok</h5><p>Records: language-level shallow immutables, perfect DTOs/values. Lombok: annotation magic for mutable classes.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Can a constructor be final/static/abstract?</div><div class="a">No to all — ctors aren't inherited so final/abstract are meaningless; static would clash with “runs on instance creation”.</div></div>
<div class="qa"><div class="q">What does this() do? super() vs this()?</div><div class="a">this() calls a sibling ctor of the SAME class; super() calls parent's. Only one allowed, both must be first line.</div></div>
<div class="qa"><div class="q">Why prefer records for DTOs?</div><div class="a">Immutable by construction, value-based equals/hashCode, zero boilerplate — fewer bugs, thread-safe.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Constructor = birth certificate 📜 — must carry the class name, never announces a return type.”</div>`});

/* ===== CHAPTER 8 · Four Pillars of OOP ===== */
B.chapter('p1', 8, 'Four Pillars of OOP');

/* spread 1 */
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 8 · Pillars I & II',
html: `<h2 class="chap"><span class="chnum">CHAPTER 08</span>The Four Pillars — Encapsulation &amp; Inheritance</h2>
<p class="dropcap">Every OOP interview opens here. Answer with definitions PLUS a reason each pillar exists.</p>
<h3 class="sec">1 · Encapsulation 🔒</h3>
<p>Hide state behind behavior: <code>private</code> fields + validating methods. Why? Invariants stay true (“balance can't go negative”), implementation can change freely, thread-safety becomes possible.</p>
<h3 class="sec">2 · Inheritance 🧬</h3>
<p><code>class Car extends Vehicle</code> — child inherits members, may <strong>extend</strong> behavior and <strong>override</strong> it. Java allows single class-inheritance (+ multi-level, hierarchical) but multiple via interfaces only.</p>
<pre class="code" data-lang="java"><code>class Vehicle {
    protected String name;
    void start() { System.out.println(name + " ignition"); }
}
class EVCar extends Vehicle {
    @Override void start() {                 // redefinition
        super.start();                        // reuse parent step
        System.out.println("…silent ⚡");
    }
}</code></pre>
<div class="callout warn"><span class="ct">⚠️ Inheritance tax</span>Inheritance couples child to parent forever. Favor <strong>composition</strong> (“has-a”) unless a true permanent “is-a” exists — the famous “prefer composition” rule.</div>`},
{ kicker: 'VISUAL GUIDE', head: 'Pillars Map',
html: `<div class="figframe"><div class="figtitle">The temple 🛕 — four pillars hold every design</div>
<svg class="diagram" viewBox="0 0 540 150">
  <rect x="60" y="14" width="420" height="30" rx="8" fill="#ffe9c9" stroke="#a9713a"/><text x="270" y="34" text-anchor="middle" class="dt" font-weight="700">GOOD OBJECT-ORIENTED DESIGN</text>
  <rect x="70" y="58" width="90" height="76" rx="6" class="do_"/><text x="115" y="86" text-anchor="middle" class="dt">ENCAP 🔒</text><text x="115" y="104" text-anchor="middle" class="dts">guard state</text>
  <rect x="180" y="58" width="90" height="76" rx="6" class="dg"/><text x="225" y="86" text-anchor="middle" class="dt">INHERIT 🧬</text><text x="225" y="104" text-anchor="middle" class="dts">reuse is-a</text>
  <rect x="290" y="58" width="90" height="76" rx="6" class="dp"/><text x="335" y="86" text-anchor="middle" class="dt">POLY 🎭</text><text x="335" y="104" text-anchor="middle" class="dts">one face many acts</text>
  <rect x="400" y="58" width="90" height="76" rx="6" class="dr2"/><text x="445" y="86" text-anchor="middle" class="dt">ABSTRACT 🎨</text><text x="445" y="104" text-anchor="middle" class="dts">hide how</text>
  <path d="M270 44 v12" class="dl"/>
</svg></div>
<table class="tbl">
<tr><th>Reusing?</th><th>Use</th></tr>
<tr><td>Code reuse across truly-same-kind</td><td>Inheritance (rare!)</td></tr>
<tr><td>Reuse by delegating to helper</td><td>Composition ⭐</td></tr>
<tr><td>Shared CONTRACT without shared code</td><td>Interface</td></tr>
</table>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why no multiple inheritance of classes?</div><div class="a">Diamond problem ambiguity (two parents define same method — whose?). Interfaces default methods resolve via ClassInterface wins / must override rule.</div></div>
<div class="qa"><div class="q">super.start() meaning?</div><div class="a">Invoke parent's version explicitly — typical template-style reuse before/after your additions.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>Pillars chant: “<b>Hide it 🔒 · Extend it 🧬 · Swap it 🎭 · Sketch it 🎨</b>”.</div>`});

/* Chapter 8 · spread 2 */
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 8 · Pillars III & IV',
html: `<h2 class="chap"><span class="chnum">CHAPTER 08 · CONT.</span>Polymorphism &amp; Abstraction</h2>
<h3 class="sec">3 · Polymorphism 🎭 — one call, many shapes</h3>
<p><strong>Overriding</strong> = runtime polymorphism: the OBJECT's class decides which method runs (dynamic dispatch). <strong>Overloading</strong> = compile-time: the REFERENCE/signature decides. Different beasts!</p>
<pre class="code" data-lang="java"><code>Vehicle v = new EVCar();     // reference Vehicle, object EVCar
v.start();                    // → EVCar's version ⚡ (virtual call)

static void wash(Vehicle x) {...}   // overload picked at
static void wash(EVCar x) {...}     // COMPILE time by declared type</code></pre>
<h4>Override rules checklist (@Override enforces!)</h4>
<ul>
<li>Same name + parameters; covariant return allowed.</li>
<li>Access can WIDEN, never narrow; can't override <code>final/static/private</code>.</li>
<li>Checked exceptions may only NARROW.</li>
</ul>
<h3 class="sec">4 · Abstraction 🎨 — expose WHAT, hide HOW</h3>
<p>Abstract classes &amp; interfaces let callers program against intent while implementations evolve behind the wall (see next chapter for the showdown).</p>
<h3 class="sec">instanceof pattern matching (16+)</h3>
<pre class="code" data-lang="java"><code>if (v instanceof EVCar ev) {      // cast + bind in one step
    ev.charge();
}</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'Dispatch Table',
html: `<div class="figframe"><div class="figtitle">Dynamic dispatch — JVM picks by OBJECT type</div>
<svg class="diagram" viewBox="0 0 540 140">
  <rect x="20" y="20" width="150" height="44" rx="9" class="db"/><text x="95" y="46" text-anchor="middle" class="dts">Vehicle v ──┐</text>
  <rect x="220" y="12" width="130" height="34" rx="9" class="do_"/><text x="285" y="34" text-anchor="middle" class="dts">EVCar object @heap</text>
  <rect x="220" y="58" width="130" height="30" rx="7" class="dp"/><text x="285" y="78" text-anchor="middle" class="dts">vtable: start→⚡ver</text>
  <path d="M172 42 C210 36 214 32 218 30 M172 50 C210 56 214 62 218 70" class="dl"/>
  <rect x="400" y="30" width="126" height="60" rx="9" class="dg"/><text x="463" y="54" text-anchor="middle" class="dts">v.start()</text><text x="463" y="72" text-anchor="middle" class="da">runs EVCar's ⚡</text>
  <path d="M352 72 h46" class="dl"/><polygon points="400,74 392,70 392,78" fill="#8a5a33"/>
  <text x="270" y="122" text-anchor="middle" class="dts">compile-time = reference type (overloads) • runtime = object type (overrides)</text>
</svg></div>
<table class="tbl">
<tr><th></th><th>Overload</th><th>Override</th></tr>
<tr><td>Binding</td><td>Compile time</td><td class="yes">Runtime ⭐</td></tr>
<tr><td>Signature</td><td>must DIFFER</td><td>must MATCH</td></tr>
<tr><td>Return-only change?</td><td class="no-tx">Not enough</td><td>covariant ok</td></tr>
<tr><td>Also called</td><td>static poly</td><td>dynamic poly</td></tr>
</table>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Can you override a static method?</div><div class="a">No — static methods are HIDDEN (reference-type binding); @Override fails to compile on them.</div></div>
<div class="qa"><div class="q">Why is String concat via Object ref weird?</div><div class="a">“+” compiles per DECLARED type overloads; runtime behavior of methods still dynamic — know which decision happens WHEN.</div></div>
<div class="qa"><div class="q">Virtual methods meaning?</div><div class="a">All non-static/final/private Java methods are virtual — dispatched via runtime vtable, enabling polymorphism by default.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>OverLOAD = loaded at compile 🏋️ · OverRIDE = decided at ride-time 🎢</b>”.</div>`});

/* ===== CHAPTER 9 · Abstract vs Interface ===== */
B.chapter('p1', 9, 'Abstract Class vs Interface');
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 9 · Abstract & Interface',
html: `<h2 class="chap"><span class="chnum">CHAPTER 09</span>Abstract Class vs Interface — The Showdown</h2>
<p class="dropcap">Both create abstraction but answer different questions: an <strong>abstract class</strong> says <em>“you ARE one of us”</em> (shared identity + state + skeleton); an <strong>interface</strong> says <em>“you CAN do this”</em> (pure capability).</p>
<table class="tbl">
<tr><th></th><th>abstract class</th><th>interface</th></tr>
<tr><td>Inherit</td><td class="no-tx">extends ONE</td><td class="yes">implement MANY ✔</td></tr>
<tr><td>Fields</td><td>any (state!)</td><td><code>public static final</code> only</td></tr>
<tr><td>Constructors</td><td class="yes">yes (for chaining)</td><td class="no-tx">never</td></tr>
<tr><td>Bodies</td><td>concrete + abstract</td><td>abstract + default/static/private (8+)</td></tr>
<tr><td>Use when</td><td>closely-related IS-A family shares code/state</td><td>unrelated types share a CAPABILITY</td></tr>
</table>
<pre class="code" data-lang="java"><code>interface Payable {
    Money amount();
    default String receipt() { return "PAY " + amount(); } // evolution
}
abstract class Payment {                       // template skeleton
    protected final Money amt;
    protected Payment(Money a){ this.amt = a; }
    public final Money amount(){ return amt; } // concrete
    protected abstract void settle();          // subclass fills
}</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'Decision Flow',
html: `<div class="figframe"><div class="figtitle">Which do I reach for?</div>
<svg class="diagram" viewBox="0 0 540 130">
  <rect x="12" y="44" width="120" height="40" rx="9" class="db"/><text x="72" y="68" text-anchor="middle" class="dts">Shared STATE needed?</text>
  <path d="M134 56 h34 M134 74 h34" class="dl"/><text x="146" y="50" class="dts">yes</text><text x="146" y="90" class="dts">no</text>
  <rect x="172" y="34" width="150" height="40" rx="9" class="do_"/><text x="247" y="58" text-anchor="middle" class="dts">ABSTRACT CLASS 🏗️</text>
  <rect x="172" y="82" width="150" height="40" rx="9" class="dg"/><text x="247" y="106" text-anchor="middle" class="dts">INTERFACE 🔌 (+default)</text>
  <path d="M324 54 h30 M324 102 h30" class="dl"/><polygon points="356,54 348,50 348,58" fill="#8a5a33"/><polygon points="356,102 348,98 348,106" fill="#8a5a33"/>
  <text x="456" y="48" text-anchor="middle" class="dts">family of same-kind types</text><text x="456" y="64" text-anchor="middle" class="dts">evolving together</text>
  <text x="460" y="96" text-anchor="middle" class="dts">capability across</text><text x="460" y="112" text-anchor="middle" class="dts">UNRELATED types ✔</text>
</svg></div>
<pre class="code" data-lang="java"><code>// Diamond with default methods — resolve EXPLICITLY
interface A { default String hi(){ return "A"; } }
interface B { default String hi(){ return "B"; } }
class C implements A, B {
    @Override public String hi(){ return A.super.hi() + B.super.hi(); }
}</code></pre>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 Sealed types (17+)</h5><p><code>sealed interface Shape permits Circle, Square</code> → exhaustive switch without default; algebraic data types in Java!</p></div>
<div class="cardx" style="--rc:#b28900"><h5>📌 Functional & marker</h5><p>One abstract method → lambda-ready (@FunctionalInterface). Zero methods → tag interface (Serializable).</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why did Java 8 add default methods?</div><div class="a">Interface EVOLUTION: add methods to shipped interfaces (Collection.stream!) without breaking millions of implementations.</div></div>
<div class="qa"><div class="q">Can an interface have constructors?</div><div class="a">Never — cannot be instantiated; even abstract classes have ctors because subclasses chain them.</div></div>
<div class="qa"><div class="q">Interface or abstract base for Payment in LLD?</div><div class="a">Capability varies per vendor → interface + strategies; shared workflow AND state across subtypes → abstract base. Voice the trade-off.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>Abstract = half-built house 🏗️ (extend me) · Interface = power socket 🔌 (plug anything)</b>”.</div>`});

/* ===== CHAPTER 10 · Exceptions ===== */
B.chapter('p1', 10, 'Exception Handling');
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 10 · Exceptions',
html: `<h2 class="chap"><span class="chnum">CHAPTER 10</span>Exceptions — Failing Loudly &amp; Politely</h2>
<p class="dropcap">Everything throwable descends from <strong>Throwable</strong>: <code>Error</code> (JVM despair — don't catch) and <code>Exception</code>. Checked exceptions force compile-time handling; unchecked (<code>RuntimeException</code>) signal programmer bugs.</p>
<h3 class="sec">The full toolkit</h3>
<pre class="code" data-lang="java"><code>try (var conn = ds.getConnection();          // AutoCloseable ⭐
     var ps  = conn.prepareStatement(sql)) {
    ...
} catch (SQLException | TimeoutException e) { // multi-catch
    throw new DataAccessException("load failed", e); // WRAP, don't swallow
} finally {
    audit.markDone();                          // cleanup on EVERY path
}

class InsufficientFunds extends RuntimeException {
    InsufficientFunds(String m){ super(m); }   // custom unchecked
}</code></pre>
<ul>
<li><b>Catch order:</b> most-specific FIRST — parent after child = compile error.</li>
<li><b>try-with-resources:</b> closes in REVERSE order; close-failures become <em>suppressed</em>, primary exception preserved.</li>
<li><b>throw</b> raises one; <b>throws</b> declares possibility in signature.</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'Hierarchy & Traps',
html: `<div class="figframe"><div class="figtitle">Throwable family tree</div>
<svg class="diagram" viewBox="0 0 540 140">
  <rect x="200" y="10" width="140" height="32" rx="8" class="db"/><text x="270" y="31" text-anchor="middle" class="dt">Throwable</text>
  <path d="M160 42 C180 62 210 66 236 70 M380 42 C360 62 330 66 304 70" class="dl"/>
  <rect x="80" y="72" width="170" height="44" rx="9" class="dr2"/><text x="165" y="90" text-anchor="middle" class="dts" font-weight="700">Error ❌ don't catch</text><text x="165" y="106" text-anchor="middle" class="dts">OOM · StackOverflow · Linkage</text>
  <rect x="290" y="72" width="176" height="52" rx="9" class="do_"/><text x="378" y="90" text-anchor="middle" class="dts" font-weight="700">Exception</text>
  <text x="304" y="107" class="dts">checked: IOException, SQLException…</text>
  <text x="304" y="120" class="dts">unchecked: NPE, IllegalArgument…</text>
</svg></div>
<table class="tbl">
<tr><th>finally quirk</th><th>Reality</th></tr>
<tr><td><code>return</code> inside finally</td><td class="no-tx">swallows exceptions + overrides try's return — NEVER</td></tr>
<tr><td><code>System.exit()</code></td><td>JVM halts → finally skipped</td></tr>
<tr><td>otherwise</td><td class="yes">always runs — even after return/throw ✔</td></tr>
</table>
<div class="callout warn"><span class="ct">⚠️ The #1 sin</span><code>catch (Exception e) {}</code> buries crime scenes. Log-or-wrap — never ignore silently.</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Checked vs unchecked — which would you design with?</div><div class="a">Modern practice: runtime exceptions for domain failures (caller rarely fixes IO anyway); checked only where recovery is realistic (retryable fetch).</div></div>
<div class="qa"><div class="q">Why are exceptions costly?</div><div class="a">fillInStackTrace captures frames — microseconds each. Never use them for control flow in hot loops.</div></div>
<div class="qa"><div class="q">What are suppressed exceptions?</div><div class="a">try-with-resources: if body throws AND close() throws too, the close exception attaches via getSuppressed() — nothing is lost.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Checked = umbrella ☂️ the compiler forces you to carry; Unchecked = surprise rain 🌧️ meaning YOUR bug.”</div>`});

/* ===== CHAPTER 11 · equals/hashCode & Immutability ===== */
B.chapter('p1', 11, 'equals(), hashCode() & Wrappers');
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 11 · Identity',
html: `<h2 class="chap"><span class="chnum">CHAPTER 11</span>equals(), hashCode() &amp; The Integer Cache Trap</h2>
<p class="dropcap">Hash-based collections ask two questions per object: <strong>“which bucket?”</strong> (hashCode) then <strong>“are you THE one?”</strong> (equals). Break the contract and entries vanish or duplicate.</p>
<h3 class="sec">The contract ⭐</h3>
<ul>
<li><code>a.equals(b) == true</code> ⟹ <code>a.hashCode() == b.hashCode()</code> — mandatory direction.</li>
<li>Equal hashes alone prove nothing (collisions are legal).</li>
<li>Override BOTH together (IDE generates consistent pairs); never let mutable fields participate — a key that changes after insertion is lost forever.</li>
</ul>
<h3 class="sec">Wrapper traps — the 127 club 🎪</h3>
<pre class="code" data-lang="java"><code>Integer a = 127, b = 127;
System.out.println(a == b);    // TRUE — cached pool −128..127!
Integer x = 128, y = 128;
System.out.println(x == y);    // FALSE — new objects
System.out.println(x.equals(y)); // TRUE ✔ always compare with equals

int big = Integer.MAX_VALUE + 1;      // wraps negative
long ok  = 2_000_000_000L * 2;        // widen BEFORE multiplying</code></pre>
<h3 class="sec">Immutability recipe 🍱</h3>
<ul>
<li>final class (or all-final methods) · final fields · no setters · defensive copies of mutable inputs/outputs · constructor validates everything.</li>
<li>Free rewards: thread-safety, safe HashMap keys, cacheable instances (String/Integer prove it).</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'Buckets & Caches',
html: `<div class="figframe"><div class="figtitle">Why hashCode decides fate in HashSet</div>
<svg class="diagram" viewBox="0 0 540 120">
  <rect x="16" y="20" width="70" height="26" rx="6" class="db"/><text x="51" y="38" text-anchor="middle" class="dts">bkt 0</text>
  <rect x="16" y="52" width="70" height="26" rx="6" class="do_"/><text x="51" y="70" text-anchor="middle" class="dts">bkt 1 ●</text>
  <rect x="16" y="84" width="70" height="26" rx="6" class="db"/><text x="51" y="102" text-anchor="middle" class="dts">bkt 2</text>
  <path d="M150 65 h40" class="dl"/><polygon points="192,65 184,61 184,69" fill="#8a5a33"/>
  <circle cx="230" cy="65" r="22" class="dp"/><text x="230" y="70" text-anchor="middle" class="dts">obj A</text>
  <path d="M254 65 h60" class="dl"/><polygon points="316,65 308,61 308,69" fill="#8a5a33"/>
  <rect x="320" y="48" width="200" height="34" rx="8" class="dg"/><text x="420" y="70" text-anchor="middle" class="dts">equals(A)? → duplicate rejected ✔</text>
  <text x="270" y="112" text-anchor="middle" class="da">override equals WITHOUT hashCode → “equal” twins land in DIFFERENT buckets → set holds both!</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 Objects utility belt</h5><p><code>Objects.equals(a,b)</code> null-safe · <code>Objects.hash(...)</code> tidy hashCode · <code>requireNonNull(x)</code> guard rails.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 BigDecimal equality</h5><p><code>equals</code> compares scale too: <code>2.0 ≠ 2.00</code>! For values use <code>compareTo()==0</code>.</p></div>
<div class="cardx" style="--rc:#b28900"><h5>📌 String switch magic</h5><p>Switch on String works via hashCode + equals verification — contract in action.</p></div>
<div class="cardx" style="--rc:#6a1b9a"><h5>📌 Autoboxing cost</h5><p><code>Long sum</code> in loops boxes every step — prefer primitive accumulators (Effective Java #6!).</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">What if you override ONLY hashCode?</div><div class="a">Colliding “equal” objects still differ by equals → HashSet keeps duplicates. Only-equals → lookups miss. Both, always.</div></div>
<div class="qa"><div class="q">Why is String a great map key?</div><div class="a">Immutable ⇒ hash never changes, safely cached at construction, pool reuses instances.</div></div>
<div class="qa"><div class="q">127==127 true but 128==128 false — explain!</div><div class="a">Integer.valueOf caches −128..127 (JLS mandate), so small values share objects; beyond, == compares distinct heap addresses.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>Bucket question = hashCode 🔖 · Boss question = equals 🤝</b> — answer both or lose your entry.”</div>`});
})();
