/* ===== CHAPTERS 1–2 · Java Basics & Variables ===== */
(function () {
var B = window.BOOK;
B.chapter('p1', 1, 'What Is Java & How It Runs');

B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 1 · Meet Java',
html: `<h2 class="chap"><span class="chnum">CHAPTER 01</span>What Is Java &amp; How It Runs</h2>
<p class="dropcap">Java is a <strong>class-based, object-oriented language</strong> built for reliability at massive scale. Its superpower is <span class="hl">WORA — Write Once, Run Anywhere</span>: code compiles once into <em>bytecode</em>, and any machine with a JVM executes it unchanged.</p>
<h3 class="sec">Why Java conquered the world</h3>
<ul>
<li><strong>Platform independent</strong> — same bytecode on Windows, macOS, Linux.</li>
<li><strong>Object-oriented</strong> — models real systems as interacting classes.</li>
<li><strong>Memory managed</strong> — the Garbage Collector frees unused objects.</li>
<li><strong>Multithreaded</strong> — built-in threads for parallel work.</li>
<li><strong>Secure &amp; robust</strong> — no pointer math, bytecode verification, strong typing.</li>
<li><strong>Ecosystem king</strong> — Android, Spring, Kafka, Hadoop: banks &amp; FAANG run on it.</li>
</ul>
<h3 class="sec">JDK ⊃ JRE ⊃ JVM — never confuse them</h3>
<table class="tbl">
<tr><th>Layer</th><th>Contains</th><th>Needed by</th></tr>
<tr><td><b>JVM</b></td><td>Bytecode executor + memory, GC, threads</td><td>The engine itself</td></tr>
<tr><td><b>JRE</b></td><td>JVM + standard libraries</td><td>Users who only <em>run</em> apps</td></tr>
<tr><td><b>JDK</b></td><td>JRE + tools (<code>javac</code>, <code>jar</code>, <code>javadoc</code>)</td><td><b>You</b>, the developer</td></tr>
</table>
<h3 class="sec">First program, dissected</h3>
<pre class="code" data-lang="java"><code>public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, FAANG!");
    }
}</code></pre>
<ul class="fs13">
<li><code>class Hello</code> — all code lives in classes; file name must match the public class.</li>
<li><code>main(...)</code> — fixed entry point: <code>public static void main(String[])</code>.</li>
<li><code>System.out.println</code> — print line to console.</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'From Source To Screen',
html: `<div class="figframe"><div class="figtitle">Compilation pipeline</div>
<svg class="diagram" viewBox="0 0 540 168">
  <rect x="6" y="62" width="88" height="46" rx="9" class="db"/><text x="50" y="82" text-anchor="middle" class="dt">Hello.java</text><text x="50" y="97" text-anchor="middle" class="dts">your source</text>
  <path d="M96 85 h30" class="dl"/><polygon points="126,85 118,81 118,89" fill="#8a5a33"/>
  <rect x="128" y="62" width="70" height="46" rx="9" class="dg"/><text x="163" y="90" text-anchor="middle" class="dt">javac</text>
  <path d="M200 85 h30" class="dl"/><polygon points="230,85 222,81 222,89" fill="#8a5a33"/>
  <rect x="232" y="62" width="92" height="46" rx="9" class="dp"/><text x="278" y="82" text-anchor="middle" class="dt">Hello.class</text><text x="278" y="97" text-anchor="middle" class="dts">BYTECODE</text>
  <path d="M326 85 h30" class="dl"/><polygon points="356,85 348,81 348,89" fill="#8a5a33"/>
  <rect x="358" y="62" width="76" height="46" rx="9" class="do_"/><text x="396" y="90" text-anchor="middle" class="dt">JVM</text>
  <path d="M436 85 h26" class="dl"/><polygon points="462,85 454,81 454,89" fill="#8a5a33"/>
  <rect x="464" y="14" width="72" height="34" rx="8" class="db"/><text x="500" y="36" text-anchor="middle" class="dt">Windows ✔</text>
  <rect x="464" y="68" width="72" height="34" rx="8" class="db"/><text x="500" y="90" text-anchor="middle" class="dt">macOS ✔</text>
  <rect x="464" y="122" width="72" height="34" rx="8" class="db"/><text x="500" y="144" text-anchor="middle" class="dt">Linux ✔</text>
  <text x="278" y="26" text-anchor="middle" class="da">compile ONCE</text><text x="430" y="26" text-anchor="middle" class="da">run ANYWHERE</text>
</svg></div>
<div class="figframe"><div class="figtitle">Nesting — what's inside what</div>
<svg class="diagram" viewBox="0 0 540 118">
  <rect x="4" y="4" width="532" height="110" rx="12" class="dr2"/><text x="18" y="24" class="dt" font-weight="700">JDK — development kit</text>
  <rect x="22" y="34" width="496" height="70" rx="10" class="db"/><text x="36" y="54" class="dt" font-weight="700">JRE — runtime env</text>
  <rect x="40" y="62" width="250" height="34" rx="8" class="dg"/><text x="165" y="84" text-anchor="middle" class="dt">JVM — executor</text>
  <rect x="304" y="62" width="200" height="34" rx="8" fill="none" stroke="#a9713a" stroke-dasharray="4 3"/><text x="404" y="84" text-anchor="middle" class="dts">tools: javac · jar · jdb · javadoc</text>
</svg></div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>Papa <b>JDK</b> buys the toolbox, mama <b>JRE</b> cooks the food (libraries), baby <b>JVM</b> eats and does the work.</div>`});

/* Chapter 1 · spread 2 — how the JVM actually executes */
B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 1 · Inside The Run',
html: `<h2 class="chap"><span class="chnum">CHAPTER 01 · CONT.</span>How The JVM Executes Your Code</h2>
<h3 class="sec">Life of a program</h3>
<div class="timeline">
<div class="tl-item"><b>Loading</b> — ClassLoader reads <code>.class</code> files from disk / jar / network.</div>
<div class="tl-item"><b>Linking</b> — <em>Verify</em> bytecode safety ➜ <em>Prepare</em> statics with defaults ➜ <em>Resolve</em> references.</div>
<div class="tl-item"><b>Initialization</b> — static blocks run; static fields get real values. Then <code>main()</code>.</div>
<div class="tl-item"><b>Execution</b> — interpreter runs bytecode; <strong>JIT</strong> promotes hot code to optimized native code.</div>
</div>
<h3 class="sec">Interpreter vs JIT — the interview favourite</h3>
<p>The interpreter starts instantly but is slow per line. The JIT watches for “hot” methods and compiles them to machine code with optimizations like inlining — so long-running code gets faster the more it runs.</p>
<h3 class="sec">Running from the terminal</h3>
<pre class="code" data-lang="bash"><code>javac Hello.java      # produces Hello.class (bytecode)
java Hello            # RUN — note: NO .class extension!
java Hello arg1 arg2  # args arrive in String[] args</code></pre>
<h3 class="sec">Beginner error decoder</h3>
<table class="tbl">
<tr><th>Error</th><th>Cause → fix</th></tr>
<tr><td><code>'javac' not recognized</code></td><td>JDK missing / PATH not set — reinstall JDK, add its <code>/bin</code> to PATH.</td></tr>
<tr><td><code>class Hello is public, should be declared in…</code></td><td>File name ≠ public class name → rename file.</td></tr>
<tr><td><code>NoClassDefFoundError</code></td><td>Class present at compile-time but missing at runtime → fix classpath/jar.</td></tr>
<tr><td><code>Main method not found</code></td><td>Signature must be exactly <code>public static void main(String[])</code>.</td></tr>
</table>`},
{ kicker: 'VISUAL GUIDE', head: 'Execution Cheat Sheet',
html: `<div class="figframe"><div class="figtitle">Interpreter vs JIT compiler</div>
<svg class="diagram" viewBox="0 0 540 120">
  <rect x="8" y="14" width="150" height="92" rx="10" class="db"/><text x="83" y="36" text-anchor="middle" class="dt" font-weight="700">INTERPRETER</text><text x="83" y="56" text-anchor="middle" class="dts">reads bytecode line by</text><text x="83" y="72" text-anchor="middle" class="dts">line · instant startup</text><text x="83" y="94" text-anchor="middle" class="da">slow for hot loops</text>
  <rect x="196" y="14" width="150" height="92" rx="10" class="do_"/><text x="271" y="36" text-anchor="middle" class="dt" font-weight="700">JIT COMPILER</text><text x="271" y="56" text-anchor="middle" class="dts">finds “hot” methods →</text><text x="271" y="72" text-anchor="middle" class="dts">native machine code</text><text x="271" y="94" text-anchor="middle" class="da">inlining · optimization</text>
  <rect x="384" y="14" width="150" height="92" rx="10" class="dg"/><text x="459" y="36" text-anchor="middle" class="dt" font-weight="700">RESULT 🚀</text><text x="459" y="58" text-anchor="middle" class="dts">fast startup AND</text><text x="459" y="74" text-anchor="middle" class="dts">peak throughput</text>
  <path d="M160 60 h32 M350 60 h30" class="dl"/><polygon points="196,60 188,56 188,64" fill="#8a5a33"/><polygon points="384,60 376,56 376,64" fill="#8a5a33"/>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><h5>⌨️ Command cheat</h5><ul><li><code>java -version</code> — check install</li><li><code>javac A.java</code> — compile</li><li><code>java A</code> — run (no ext!)</li><li><code>java -jar app.jar</code> — run jar</li></ul></div>
<div class="cardx" style="--rc:#6a1b9a"><h5>🧠 main() trivia</h5><ul><li>You may <b>overload</b> main — JVM calls only the exact signature.</li><li><code>static</code> = no object needed.</li><li>Exit code via <code>System.exit(1)</code>.</li></ul></div>
</div>
<div class="callout warn"><span class="ct">⚠️ Classic trap</span><code>java Hello.class</code> ❌ → “Could not find or load main class”. Correct: <code>java Hello</code> ✔</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">What is bytecode?</div><div class="a">Platform-neutral, stack-based instruction set (.class) understood by every JVM — the contract behind WORA.</div></div>
<div class="qa"><div class="q">Why is Java called secure?</div><div class="a">No pointer arithmetic, array bounds checks, bytecode verifier, automatic memory management.</div></div>
<div class="qa"><div class="q">Can we overload main()? Is order guaranteed?</div><div class="a">Yes you can overload; JVM always invokes the exact <code>String[]</code> variant first.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span><b>javac = translator</b> who writes the script; <b>JVM = actor</b> who performs it on any stage.</div>`});

/* ===== CHAPTER 2 · Variables, Data Types & Operators ===== */
B.chapter('p1', 2, 'Variables, Data Types & Operators');

B.spread(
{ kicker: 'PART I · FOUNDATIONS', head: 'Ch 2 · Data In Memory',
html: `<h2 class="chap"><span class="chnum">CHAPTER 02</span>Variables, Primitives &amp; Operators</h2>
<p class="dropcap">A variable is a <strong>named box in memory with a fixed type</strong>. Java is statically typed — the compiler knows every box’s type before runtime, killing whole categories of bugs at compile time.</p>
<h3 class="sec">The 8 primitives — memorize cold</h3>
<table class="tbl">
<tr><th>Type</th><th>Size</th><th>Range / values</th><th>Default</th></tr>
<tr><td><code>byte</code></td><td>1 B</td><td>−128 … 127</td><td>0</td></tr>
<tr><td><code>short</code></td><td>2 B</td><td>−32,768 … 32,767</td><td>0</td></tr>
<tr><td><code>int</code></td><td>4 B</td><td>≈ ±2.14 billion</td><td>0</td></tr>
<tr><td><code>long</code></td><td>8 B</td><td>huge — suffix <code>L</code></td><td>0L</td></tr>
<tr><td><code>float</code></td><td>4 B</td><td>~6-7 digits, suffix <code>f</code></td><td>0.0f</td></tr>
<tr><td><code>double</code></td><td>8 B</td><td>~15 digits (default)</td><td>0.0d</td></tr>
<tr><td><code>char</code></td><td>2 B</td><td>one Unicode char <code>'A'</code></td><td>'\\u0000'</td></tr>
<tr><td><code>boolean</code></td><td>JVM-dep.</td><td>true / false only</td><td>false</td></tr>
</table>
<h3 class="sec">Casting &amp; overflow surprise</h3>
<pre class="code" data-lang="java"><code>long big  = someInt;        // widening: automatic ✔
int back  = (int) bigLong;  // narrowing: manual cast

int max = Integer.MAX_VALUE;
System.out.println(max + 1);   // -2147483648 → wraps!</code></pre>
<h3 class="sec">Operators to narrate fluently</h3>
<ul>
<li><strong>Arithmetic</strong> <code>+ - * / %</code> — integer division truncates: <code>7/2 == 3</code>; <code>%</code> keeps dividend’s sign (<code>-7%2 == -1</code>).</li>
<li><strong>Short-circuit</strong> <code>&amp;&amp; ||</code> — right side skipped when decided → <code>s != null &amp;&amp; s.length()&gt;0</code> is safe.</li>
<li><strong>Ternary</strong> <code>cond ? a : b</code> · <strong>Increment</strong>: <code>i++</code> yields old value, <code>++i</code> new value.</li>
<li><code>var x = 10;</code> — local inference; still strongly typed int!</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'Sizes, Traps & Radar',
html: `<div class="figframe"><div class="figtitle">Primitive sizes — memory ruler</div>
<svg class="diagram" viewBox="0 0 540 96">
  <rect x="6"   y="20" width="30"  height="40" rx="6" class="db"/><text x="21"  y="44" text-anchor="middle" class="dt">b</text>
  <rect x="42"  y="20" width="46"  height="40" rx="6" class="dg"/><text x="65"  y="44" text-anchor="middle" class="dt">s</text>
  <rect x="94"  y="20" width="78"  height="40" rx="6" class="do_"/><text x="133" y="44" text-anchor="middle" class="dt">int</text>
  <rect x="178" y="20" width="140" height="40" rx="6" class="dp"/><text x="248" y="44" text-anchor="middle" class="dt">long</text>
  <rect x="324" y="20" width="78"  height="40" rx="6" class="dr2"/><text x="363" y="44" text-anchor="middle" class="dt">float</text>
  <rect x="408" y="20" width="126" height="40" rx="6" class="db"/><text x="471" y="44" text-anchor="middle" class="dt">double</text>
  <text x="21" y="80" text-anchor="middle" class="dts">1B</text><text x="65" y="80" text-anchor="middle" class="dts">2B</text><text x="133" y="80" text-anchor="middle" class="dts">4B</text><text x="248" y="80" text-anchor="middle" class="dts">8B</text><text x="363" y="80" text-anchor="middle" class="dts">4B</text><text x="471" y="80" text-anchor="middle" class="dts">8B</text>
</svg><p class="center dts" style="margin:2px 0 0">char = 2 bytes (Unicode!) · boolean = JVM-dependent</p></div>
<div class="grid g2">
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Trap #1 · integer division</h5><p><code>90+95/2 == 137</code> but <code>(90+95)/2 == 92</code>. Parentheses decide fate.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Trap #2 · float math</h5><p><code>0.1 + 0.2 != 0.3</code> in binary floating point. Money → <b>BigDecimal</b> or cents-as-long.</p></div>
<div class="cardx" style="--rc:#155fae"><h5>📌 char is secretly numeric</h5><p><code>char c='A'; c+=1;</code> → <code>'B'</code> (Unicode 65→66).</p></div>
<div class="cardx" style="--rc:#256c29"><h5>✔ Defaults — where?</h5><p>Fields get defaults automatically; <b>locals don't</b> — unassigned local = compile error.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why is char 2 bytes in Java?</div><div class="a">Java uses Unicode (UTF-16 internally) for world scripts, not just ASCII's 128 symbols.</div></div>
<div class="qa"><div class="q">Difference between ++i and i++?</div><div class="a">Pre-increment returns the NEW value; post-increment yields the OLD value then increments.</div></div>
<div class="qa"><div class="q">&amp;&amp; vs &amp; with booleans?</div><div class="a"><code>&amp;&amp;</code> short-circuits (skips right side when left decides) preventing NPEs &amp; wasted calls; <code>&amp;</code> always evaluates both.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>Sizes chant: “<b>byte-short-int-long = 1-2-4-8</b>; float drinks less than double.”</div>`});

})();
