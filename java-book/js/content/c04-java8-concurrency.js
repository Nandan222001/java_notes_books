/* ===== CHAPTERS 14–15 · Java 8 Features & Concurrency ===== */
(function () {
var B = window.BOOK;
B.chapter('p2', 14, 'Java 8: Lambdas, Streams & Optional');

/* Chapter 14 · spread 1 */
B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 14 · Functional Java',
html: `<h2 class="chap"><span class="chnum">CHAPTER 14</span>Lambdas &amp; The Stream Assembly Line</h2>
<p class="dropcap">Java 8 turned verbose loops into declarative pipelines. A <strong>lambda</strong> is an inline implementation of a <strong>functional interface</strong> (exactly one abstract method): <code>(a, b) -&gt; a + b</code>. Variables it uses must be <em>effectively final</em>.</p>
<h3 class="sec">The four musketeers (+friends)</h3>
<table class="tbl">
<tr><th>Interface</th><th>Method</th><th>Answers</th></tr>
<tr><td><code>Predicate&lt;T&gt;</code></td><td>test(T)</td><td>true/false? (filter)</td></tr>
<tr><td><code>Function&lt;T,R&gt;</code></td><td>apply(T)</td><td>transform to R (map)</td></tr>
<tr><td><code>Consumer&lt;T&gt;</code></td><td>accept(T)</td><td>do side-effect (forEach)</td></tr>
<tr><td><code>Supplier&lt;T&gt;</code></td><td>get()</td><td>produce a value (factory)</td></tr>
</table>
<h3 class="sec">Streams — lazy, functional pipelines</h3>
<pre class="code" data-lang="java"><code>List&lt;String&gt; top = names.stream()
    .filter(n -&gt; n.length() &gt; 3)      // intermediate (lazy)
    .map(String::toUpperCase)         // method reference
    .sorted()
    .limit(5)
    .collect(Collectors.toList());    // terminal (pulls the chain)

int total = nums.stream().mapToInt(Integer::intValue).sum();
Map&lt;Dept,List&lt;Emp&gt;&gt; byDept =
    emps.stream().collect(groupingBy(Emp::dept));</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'The Stream Pipeline',
html: `<div class="figframe"><div class="figtitle">Assembly line 🏭 — nothing moves until the terminal op</div>
<svg class="diagram" viewBox="0 0 540 120">
  <rect x="8" y="40" width="86" height="40" rx="9" class="dg"/><text x="51" y="64" text-anchor="middle" class="dt">source</text>
  <path d="M96 60 h26" class="dl"/><polygon points="124,60 116,56 116,64" fill="#8a5a33"/>
  <rect x="126" y="40" width="92" height="40" rx="9" class="do_"/><text x="172" y="58" text-anchor="middle" class="dt">filter ✔</text><text x="172" y="72" text-anchor="middle" class="dts">lazy</text>
  <path d="M220 60 h26" class="dl"/><polygon points="248,60 240,56 240,64" fill="#8a5a33"/>
  <rect x="250" y="40" width="92" height="40" rx="9" class="do_"/><text x="296" y="58" text-anchor="middle" class="dt">map 🔧</text><text x="296" y="72" text-anchor="middle" class="dts">lazy</text>
  <path d="M344 60 h26" class="dl"/><polygon points="372,60 364,56 364,64" fill="#8a5a33"/>
  <rect x="374" y="40" width="76" height="40" rx="9" class="dr2"/><text x="412" y="58" text-anchor="middle" class="dt">sorted</text><text x="412" y="72" text-anchor="middle" class="dts">stateful</text>
  <path d="M452 60 h22" class="dl"/><polygon points="476,60 468,56 468,64" fill="#8a5a33"/>
  <rect x="478" y="40" width="56" height="40" rx="9" class="dp"/><text x="506" y="58" text-anchor="middle" class="dt">collect</text><text x="506" y="72" text-anchor="middle" class="dts">EAGER</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 Laziness proof</h5><p><code>stream.filter(x-&gt;{log;true}).findFirst()</code> runs filter exactly ONCE — later items never touched.</p></div>
<div class="cardx" style="--rc:#256c29"><h5>⭐ groupingBy recipes</h5><ul><li>count: <code>groupingBy(k, counting())</code></li><li>sum: <code>groupingBy(k, summingInt(v))</code></li><li>join names: <code>mapping(getName, joining(","))</code></li></ul></div>
</div>
<div class="callout warn"><span class="ct">⚠️ parallelStream()</span>Not free lunch: needs BIG data + stateless ops + thread-safe collectors; blocking I/O inside parallel streams starves the shared ForkJoin pool.</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Intermediate vs terminal ops?</div><div class="a">Intermediate (filter/map/sorted) are lazy &amp; return streams; terminal (collect/forEach/reduce/findFirst) trigger execution &amp; consume the stream.</div></div>
<div class="qa"><div class="q">Is a stream reusable?</div><div class="a">No — one terminal op consumes it; reuse throws IllegalStateException. Get a fresh stream from the source.</div></div>
<div class="qa"><div class="q">flatMap vs map?</div><div class="a">map transforms each element 1:1; flatMap flattens nested streams (List&lt;List&lt;T&gt;&gt; → single pipeline) — “map then unwrap”.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Filter the junk, map the paint, pack the boxes 📦.”</div>`});

/* Chapter 14 · spread 2 — Optional, Date-Time, CompletableFuture */
B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 14 · Optional · Dates · Async',
html: `<h2 class="chap"><span class="chnum">CHAPTER 14 · CONT.</span>Optional, Dates &amp; Promises Of The Future</h2>
<h3 class="sec">Optional — “maybe” as a TYPE</h3>
<pre class="code" data-lang="java"><code>Optional&lt;User&gt; u = repo.findByEmail(mail);   // may be empty
u.map(User::getAddress)
 .map(Address::getCity)
 .orElse("UNKNOWN");                          // safe chain ⭐

repo.findById(id).orElseThrow(() -&gt; new NotFoundException());</code></pre>
<div class="callout warn"><span class="ct">⚠️ orElse vs orElseGet</span><code>orElse(expensive())</code> ALWAYS calls expensive() even when value present; <code>orElseGet(()-&gt;expensive())</code> runs only when needed. Interview gold.</div>
<p><b>Rules:</b> great as a <em>return</em> type; avoid as field/method-param (breaks JPA/serialization). Never call <code>get()</code> blindly.</p>
<h3 class="sec">java.time — dates done right (immutable!)</h3>
<table class="tbl">
<tr><th>Need</th><th>Type</th></tr>
<tr><td>Birthday / due-date only</td><td><code>LocalDate.now().plusDays(30)</code></td></tr>
<tr><td>Timestamped events (UTC)</td><td><code>Instant.now()</code>, <code>ZonedDateTime</code></td></tr>
<tr><td>Amount of time</td><td><code>Duration</code> (time-based), <code>Period</code> (date-based)</td></tr>
<tr><td>Format</td><td><code>DateTimeFormatter.ofPattern("dd-MM-yyyy")</code></td></tr>
</table>`},
{ kicker: 'VISUAL GUIDE', head: 'Async Cheat Sheet',
html: `<div class="figframe"><div class="figtitle">CompletableFuture — non-blocking composition</div>
<svg class="diagram" viewBox="0 0 540 118">
  <rect x="8" y="36" width="104" height="44" rx="9" class="dg"/><text x="60" y="55" text-anchor="middle" class="dt">supplyAsync</text><text x="60" y="70" text-anchor="middle" class="dts">fetch user 🔀</text>
  <path d="M114 58 h26" class="dl"/><polygon points="142,58 134,54 134,62" fill="#8a5a33"/>
  <rect x="144" y="36" width="96" height="44" rx="9" class="do_"/><text x="192" y="55" text-anchor="middle" class="dt">thenApply</text><text x="192" y="70" text-anchor="middle" class="dts">map result</text>
  <path d="M242 58 h26" class="dl"/><polygon points="270,58 262,54 262,62" fill="#8a5a33"/>
  <rect x="272" y="36" width="100" height="44" rx="9" class="dp"/><text x="322" y="55" text-anchor="middle" class="dt">thenCompose</text><text x="322" y="70" text-anchor="middle" class="dts">chain another</text>
  <path d="M374 58 h26" class="dl"/><polygon points="402,58 394,54 394,62" fill="#8a5a33"/>
  <rect x="404" y="36" width="128" height="44" rx="9" class="db"/><text x="468" y="55" text-anchor="middle" class="dt">thenAccept</text><text x="468" y="70" text-anchor="middle" class="dts">consume · exceptionally()</text>
  <text x="270" y="102" text-anchor="middle" class="da">thenCombine(a,b) joins two futures · allOf(...) waits for many</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Future.get() blocks</h5><p>Classic <code>Future</code> freezes the caller thread. CompletableFuture chains callbacks instead — no thread parked.</p></div>
<div class="cardx" style="--rc:#256c29"><h5>✔ One-liner wins</h5><ul><li><code>Optional.ofNullable(x)</code></li><li><code>list.stream().findFirst().orElse(default)</code></li><li><code>LocalDate.parse("2026-01-31")</code> ISO built-in</li></ul></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why can't Optional replace all nulls?</div><div class="a">It's designed for return types only; as a field it adds allocation, breaks entities/serialization, and hides intent elsewhere.</div></div>
<div class="qa"><div class="q">thenApply vs thenCompose?</div><div class="a">thenApply maps value→value; thenCompose chains a function returning another future (avoids nested futures).</div></div>
<div class="qa"><div class="q">Are LocalDate objects mutable?</div><div class="a">No — every plusDays/with returns a NEW instance; thread-safe by design.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>orElse</b> always cooks 🍳 even when food exists; <b>orElseGet</b> cooks only if hungry.”</div>`});

/* ===== CHAPTER 15 · Multithreading & Concurrency ===== */
B.chapter('p2', 15, 'Multithreading & Concurrency');

B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 15 · Threads',
html: `<h2 class="chap"><span class="chnum">CHAPTER 15</span>Threads — Doing Two Things At Once</h2>
<p class="dropcap">A <strong>process</strong> has its own memory; <strong>threads</strong> share their process's heap but keep private stacks. Shared mutable state = power + danger. Concurrency bugs are the #1 senior-level filter.</p>
<h3 class="sec">Creating a thread</h3>
<pre class="code" data-lang="java"><code>Thread t = new Thread(() -&gt; System.out.println("work!"));
t.start();                    // NEW thread runs the lambda
// t.run();                  // ❌ just calls method on CURRENT thread

ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -&gt; "result");  // real apps use pools, never raw threads</code></pre>
<h3 class="sec">Race conditions &amp; the fix ladder</h3>
<pre class="code" data-lang="java"><code>class Counter { int x = 0;
  synchronized void inc() { x++; }   // fix #1: mutual exclusion
}
AtomicInteger ai = new AtomicInteger();
ai.incrementAndGet();                // fix #2: lock-free CAS
volatile boolean stop = false;       // fix #3: visibility flag only</code></pre>
<p><b>synchronized</b> gives exclusion AND visibility (monitor lock). <b>volatile</b> only guarantees reads see latest write — useless for <code>i++</code>. <b>wait()/notify()</b>: must hold that object's monitor and always wait inside a <code>while</code> loop (spurious wakeups!).</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Thread Lifecycle',
html: `<div class="figframe"><div class="figtitle">Thread state machine (draw it live!)</div>
<svg class="diagram" viewBox="0 0 540 168">
  <rect x="10" y="20" width="76" height="30" rx="8" class="db"/><text x="48" y="40" text-anchor="middle" class="dt">NEW</text>
  <path d="M88 35 h34" class="dl"/><text x="96" y="28" class="dts">start()</text><polygon points="124,35 116,31 116,39" fill="#8a5a33"/>
  <rect x="126" y="20" width="110" height="30" rx="8" class="do_"/><text x="181" y="40" text-anchor="middle" class="dt">RUNNABLE ⇄</text>
  <path d="M238 35 h44" class="dl"/><polygon points="284,35 276,31 276,39" fill="#8a5a33"/><text x="252" y="26" class="dts">scheduler picks</text>
  <rect x="286" y="20" width="104" height="30" rx="8" class="dp"/><text x="338" y="40" text-anchor="middle" class="dt">RUNNING ▶</text>
  <path d="M392 35 h30" class="dl"/><polygon points="424,35 416,31 416,39" fill="#8a5a33"/>
  <rect x="426" y="20" width="106" height="30" rx="8" class="dg"/><text x="479" y="40" text-anchor="middle" class="dt">TERMINATED ✝</text>
  <rect x="150" y="92" width="130" height="30" rx="8" class="dr2"/><text x="215" y="112" text-anchor="middle" class="dts">BLOCKED / WAITING</text>
  <path d="M300 50 C290 80 260 92 240 100" class="dl dash"/><text x="296" y="84" class="dts">lock busy / wait() / join()</text>
  <path d="M180 90 C190 70 200 62 214 52" class="dl dash"/><text x="120" y="86" class="dts">notify() / lock free</text>
  <text x="270" y="152" text-anchor="middle" class="dts">TIMED_WAITING = same but with timeout (sleep(1000), wait(ms))</text>
</svg></div>
<table class="tbl">
<tr><th>Tool</th><th>Exclusion</th><th>Visibility</th><th>Blocking?</th></tr>
<tr><td><code>volatile</code></td><td class="no-tx">No</td><td class="yes">Yes</td><td>No</td></tr>
<tr><td><code>AtomicInteger…</code></td><td class="yes">CAS</td><td class="yes">Yes</td><td>No (retry)</td></tr>
<tr><td><code>synchronized</code></td><td class="yes">Yes</td><td class="yes">Yes</td><td>Yes</td></tr>
<tr><td><code>ReentrantLock.tryLock()</code></td><td class="yes">Yes</td><td class="yes">Yes</td><td>Optional/fair</td></tr>
</table>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">start() vs run()?</div><div class="a">start() asks the scheduler for a NEW call stack (real parallelism); run() executes inline like any method.</div></div>
<div class="qa"><div class="q">Why wait() inside while?</div><div class="a">Spurious wakeups + condition may be stolen between notify and reacquire — recheck before proceeding.</div></div>
<div class="qa"><div class="q">Is volatile long safe?</div><div class="a">Since Java 5, volatile long/double reads-writes are atomic; WITHOUT volatile they may tear on 32-bit JVMs.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>start()</b> rings the newborn bell 🔔; <b>run()</b> is just a boring phone call.”</div>`});

/* Chapter 15 · spread 2 — executors, locks, coordination */
B.spread(
{ kicker: 'PART II · ADVANCED JAVA', head: 'Ch 15 · Pools & Locks',
html: `<h2 class="chap"><span class="chnum">CHAPTER 15 · CONT.</span>Thread Pools, Locks &amp; Teamwork</h2>
<p class="dropcap">Threads are expensive (≈1 MB stack each). The <strong>ExecutorService</strong> reuses a fixed crew instead of spawning mobs. Production rule: never raw threads — always pools.</p>
<h3 class="sec">ThreadPoolExecutor anatomy</h3>
<pre class="code" data-lang="java"><code>new ThreadPoolExecutor(
    core,            // permanent staff
    max,             // overflow hiring limit
    keepAlive, unit, // when overflow workers go home
    new ArrayBlockingQueue&lt;&gt;(100),   // waiting applicants
    new ThreadPoolExecutor.CallerRunsPolicy()); // reject plan</code></pre>
<ul>
<li><b>Sizing:</b> CPU-bound ≈ cores+1 · IO-bound ≈ cores × (1 + wait/compute).</li>
<li><b>Rejections:</b> Abort(throw) · CallerRuns(backpressure!) · Discard.</li>
<li><b>Always</b> call <code>shutdown()</code>; else JVM may hang.</li>
</ul>
<h3 class="sec">Coordination toolbox</h3>
<table class="tbl">
<tr><th>Tool</th><th>Shape</th><th>Use</th></tr>
<tr><td><code>CountDownLatch</code></td><td>one-shot gate</td><td>Wait for N setups to finish</td></tr>
<tr><td><code>CyclicBarrier</code></td><td>reusable rendezvous</td><td>N peers sync each round</td></tr>
<tr><td><code>Semaphore(n)</code></td><td>permits pool</td><td>Limit DB/API concurrency</td></tr>
<tr><td><code>BlockingQueue</code></td><td>producer↔consumer</td><td>Decouple speeds safely</td></tr>
<tr><td><code>ReadWriteLock</code></td><td>many-read/one-write</td><td>Read-mostly config caches</td></tr>
</table>`},
{ kicker: 'VISUAL GUIDE', head: 'Pools & Gates',
html: `<div class="figframe"><div class="figtitle">Task flow through a bounded pool</div>
<svg class="diagram" viewBox="0 0 540 150">
  <rect x="10" y="55" width="96" height="40" rx="9" class="dg"/><text x="58" y="79" text-anchor="middle" class="dts">submit(task)</text>
  <path d="M108 75 h26" class="dl"/><polygon points="136,75 128,71 128,79" fill="#8a5a33"/>
  <rect x="138" y="30" width="104" height="40" rx="9" class="do_"/><text x="190" y="48" text-anchor="middle" class="dts">CORE threads busy?</text><text x="190" y="62" text-anchor="middle" class="da">else run NOW</text>
  <path d="M244 50 C270 40 290 34 310 30" class="dl dash"/><text x="266" y="30" class="dts">full → QUEUE</text>
  <rect x="312" y="18" width="92" height="34" rx="9" class="db"/><text x="358" y="40" text-anchor="middle" class="dts">QUEUE (100)</text>
  <path d="M406 35 h26" class="dl"/><polygon points="434,35 426,31 426,39" fill="#8a5a33"/>
  <text x="452" y="24" class="dts">queue FULL too →</text>
  <rect x="436" y="42" width="96" height="40" rx="9" class="dr2"/><text x="484" y="60" text-anchor="middle" class="dts">hire up to MAX,</text><text x="484" y="74" text-anchor="middle" class="dts">else REJECT 🚫</text>
  <text x="270" y="120" text-anchor="middle" class="dts">CallerRunsPolicy = caller executes task itself → natural backpressure 💪</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><h5>🚦 Latch vs Barrier</h5><p><b>Latch:</b> “open when all ready” (event waits). <b>Barrier:</b> “meet at checkpoint every lap” (peers wait for each other).</p></div>
<div class="cardx" style="--rc:#6a1b9a"><h5>⚡ Virtual Threads (Java 21)</h5><p><code>Executors.newVirtualThreadPerTaskExecutor()</code> — millions of cheap threads that park on blocking I/O without OS cost. Don't pool them!</p></div>
</div>
<div class="callout warn"><span class="ct">⚠️ submit() swallows exceptions</span>The Throwable hides inside the Future until get() — always log via afterExecute/uncaught handler.</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">execute() vs submit()?</div><div class="a">execute(Runnable): fire-and-forget. submit(): returns Future (Runnable or Callable) capturing result AND exceptions.</div></div>
<div class="qa"><div class="q">Why is Executors.newCachedThreadPool risky in prod?</div><div class="a">Unbounded threads under burst load → thread explosion/OOM. Bound everything explicitly.</div></div>
<div class="qa"><div class="q">ReentrantLock over synchronized — when?</div><div class="a">When you need tryLock-timeouts, fairness, interruptible waits, or multiple Conditions; otherwise synchronized is simpler &amp; JIT-friendly.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>Pipeline chant: “<b>Core</b> works first → <b>Queue</b> waits → <b>Max</b> overtime → <b>Reject</b> politely 🚫.”</div>`});
})();
