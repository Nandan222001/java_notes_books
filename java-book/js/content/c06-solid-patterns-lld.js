/* ===== CHAPTER 18 · SOLID Principles ===== */
(function () {
var B = window.BOOK;
B.chapter('p3', 18, 'SOLID Principles');

B.spread(
{ kicker: 'PART III · LLD & DESIGN', head: 'Ch 18 · SOLID',
html: `<h2 class="chap"><span class="chnum">CHAPTER 18</span>SOLID — Five Laws Of Clean Design</h2>
<p class="dropcap">LLD interviews are 30% patterns and <strong>70% SOLID reasoning</strong>. Recite each letter with a smell + a fix.</p>
<h3 class="sec">S · Single Responsibility</h3>
<p>One class, <strong>one reason to change</strong>, one owning actor. Smell: <code>UserService</code> validating + saving + emailing. Fix: split into <code>UserValidator</code>, <code>UserRepository</code>, <code>EmailService</code>.</p>
<h3 class="sec">O · Open-Closed</h3>
<p>Open for extension, closed for modification. Smell: giant <code>switch(paymentType)</code> edited every festival season. Fix: a <code>PaymentStrategy</code> interface; new types plug in as new classes.</p>
<h3 class="sec">L · Liskov Substitution</h3>
<p>A subtype must work anywhere its parent works — no surprise exceptions or weakened behavior. Classic crime: <code>Square extends Rectangle</code> breaks setters' expectations.</p>
<h3 class="sec">I · Interface Segregation</h3>
<p>No client forced to implement what it doesn't need. Fat <code>Worker{work();eat();sleep()}</code> forces <code>Robot</code> to fake sleeping. Split into role-sized interfaces.</p>
<h3 class="sec">D · Dependency Inversion</h3>
<p>High-level policy depends on <strong>abstractions</strong>, not concrete classes; details implement those abstractions. This is exactly what Spring's DI automates.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'SOLID Cards',
html: `<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><span class="tagchip" style="--rc:#26418f">S</span><h5>Single Responsibility</h5><p>🧱 One job per class.<br><em>Smell:</em> “Manager” classes doing everything.</p></div>
<div class="cardx" style="--rc:#256c29"><span class="tagchip" style="--rc:#256c29">O</span><h5>Open-Closed</h5><p>🎯 Add features by ADDING classes.<br><em>Smell:</em> ever-growing if/else on type.</p></div>
<div class="cardx" style="--rc:#b28900"><span class="tagchip" style="--rc:#b28900">L</span><h5>Liskov Substitution</h5><p>🦎 Child passes parent's auditions.<br><em>Smell:</em> subtype throwing UnsupportedOperationException.</p></div>
<div class="cardx" style="--rc:#6a1b9a"><span class="tagchip" style="--rc:#6a1b9a">I</span><h5>Interface Segregation</h5><p>🔌 Many small plugs, not one mega-socket.<br><em>Smell:</em> empty/throwing method bodies.</p></div>
<div class="cardx" style="--rc:#c0392b"><span class="tagchip" style="--rc:#c0392b">D</span><h5>Dependency Inversion</h5><p>🏛️ Policy owns the contract, details obey.<br><em>Smell:</em> <code>new MySQLRepo()</code> hardcoded in services.</p></div>
<div class="cardx"><h5>💬 Interview line that scores</h5><p>“In my parking-lot LLD, fee calculation violates OCP until I extract a FeeStrategy — then adding weekend pricing touches zero existing classes.”</p></div>
</div>
<pre class="code" data-lang="java"><code>// DIP + OCP in action
interface Notification { void send(String msg); }
class EmailN implements Notification {...}
class SlackN  implements Notification {...}

class OrderService {                       // high-level policy
    private final Notification notify;     // depends on ABSTRACTION
    OrderService(Notification n) { this.notify = n; }
}</code></pre>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Which principle does Strategy pattern serve?</div><div class="a">OCP (add strategies without editing context) plus DIP (context holds the abstraction).</div></div>
<div class="qa"><div class="q">Is SOLID only about classes?</div><div class="a">No — scale it up: microservices with one responsibility, REST APIs extended via versioning, libraries exposing interfaces.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>One Job · Add Don't Bend · Kids Keep Promises · Small Plugs · Trust Contracts</b>”.</div>`});

/* ===== CHAPTER 19 · Design Patterns ===== */
B.chapter('p3', 19, 'Design Patterns That Get Asked');

/* spread 1 — creational */
B.spread(
{ kicker: 'PART III · LLD & DESIGN', head: 'Ch 19 · Creational',
html: `<h2 class="chap"><span class="chnum">CHAPTER 19</span>Creational Patterns — Making Objects Rightly</h2>
<h3 class="sec">Singleton — exactly one instance</h3>
<pre class="code" data-lang="java"><code>// ⭐ enum singleton — reflection &amp; serialization proof
enum Config { INSTANCE;
    private final Properties props = load();
    String get(String k) { return props.getProperty(k); }
}
// classic double-checked locking (know WHY volatile!)
class Db {
    private static volatile Db inst;
    private Db() {}
    static Db get() {
        if (inst == null)
            synchronized (Db.class) {
                if (inst == null) inst = new Db(); // re-check!
            }
        return inst;
    }
}</code></pre>
<p><b>Ways it breaks:</b> reflection (<code>setAccessible</code>) → enum immune; cloning → throw; serialization → <code>readResolve()</code>.</p>
<h3 class="sec">Factory Method &amp; Abstract Factory</h3>
<ul>
<li><strong>Factory:</strong> one method decides WHICH subclass to return — callers stay decoupled. <code>Calendar.getInstance()</code>, JDBC drivers.</li>
<li><strong>Abstract Factory:</strong> a factory that returns a FAMILY of matching products (UIFactory → WinButton+WinMenu / MacButton+MacMenu).</li>
</ul>
<h3 class="sec">Builder — telescoping constructor killer</h3>
<pre class="code" data-lang="java"><code>Pizza p = Pizza.builder()
    .size(LARGE).cheese(EXTRA).olives(true)
    .build();   // readable, immutable result</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'Pattern Cards',
html: `<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><span class="tagchip">SINGLETON</span><p>One king 👑 per JVM.<br>JDK: <code>Runtime.getRuntime()</code></p></div>
<div class="cardx" style="--rc:#256c29"><span class="tagchip">FACTORY METHOD</span><p>Subclass picks the product.<br>JDK: <code>valueOf()</code>, <code>getInstance()</code></p></div>
<div class="cardx" style="--rc:#6a1b9a"><span class="tagchip">ABSTRACT FACTORY</span><p>Families of products together 🧩.<br>Swing look-and-feel kits.</p></div>
<div class="cardx" style="--rc:#b28900"><span class="tagchip">BUILDER</span><p>Step-by-step construction of immutables.<br>JDK: <code>StringBuilder</code>, Lombok @Builder.</p></div>
<div class="cardx" style="--rc:#c0392b"><span class="tagchip">PROTOTYPE</span><p>Clone instead of rebuild expensive objects.<br><code>Object.clone()</code></p></div>
<div class="cardx"><h5>🧠 Singleton quiz answers</h5><ul><li>Why volatile in DCL? Prevents half-built object publication (JMM reordering).</li><li>Holder idiom? Inner class loads lazily via JVM lock — thread-safe, no sync cost.</li></ul></div>
</div>
<div class="figframe"><div class="figtitle">Builder flow</div>
<svg class="diagram" viewBox="0 0 540 84">
  <rect x="12" y="22" width="86" height="36" rx="8" class="dg"/><text x="55" y="45" text-anchor="middle" class="dts">builder()</text>
  <path d="M100 40 h26" class="dl"/><polygon points="128,40 120,36 120,44" fill="#8a5a33"/>
  <rect x="130" y="22" width="96" height="36" rx="8" class="do_"/><text x="178" y="45" text-anchor="middle" class="dts">.size()…fluent</text>
  <path d="M228 40 h26" class="dl"/><polygon points="256,40 248,36 248,44" fill="#8a5a33"/>
  <rect x="258" y="22" width="86" height="36" rx="8" class="dp"/><text x="301" y="45" text-anchor="middle" class="dts">.build()</text>
  <path d="M346 40 h26" class="dl"/><polygon points="374,40 366,36 366,44" fill="#8a5a33"/>
  <rect x="376" y="22" width="110" height="36" rx="8" class="db"/><text x="431" y="45" text-anchor="middle" class="dts">immutable object ✔</text>
</svg></div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Which singleton would you ship today?</div><div class="a">Enum for pure singletons; otherwise Spring's container-managed bean IS the singleton (scope) with none of the pitfalls.</div></div>
<div class="qa"><div class="q">Builder vs telescoping ctor?</div><div class="a">Readability + optional params without 6 constructor overloads; validates once at build().</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>Creational trio: “<b>One King 👑 · One Gate 🏭 · One Recipe 📋</b>”.</div>`});

/* Chapter 19 · spread 2 — structural + behavioral */
B.spread(
{ kicker: 'PART III · LLD & DESIGN', head: 'Ch 19 · Structural & Behavioral',
html: `<h2 class="chap"><span class="chnum">CHAPTER 19 · CONT.</span>Wrapping &amp; Talking Patterns</h2>
<h3 class="sec">Structural — how objects CONNECT</h3>
<ul>
<li><strong>Adapter</strong> 🔌 — translate an incompatible interface. <code>InputStreamReader</code> adapts bytes→chars.</li>
<li><strong>Decorator</strong> 🎁 — stack behavior while keeping the interface: every layer of <code>java.io</code>.</li>
<li><strong>Facade</strong> 🎬 — one friendly button over a messy subsystem (<code>orderFacade.checkout()</code>).</li>
<li><strong>Proxy</strong> 🕶️ — stand-in controlling access: lazy loading, security, remoting — the heart of Spring AOP.</li>
</ul>
<h3 class="sec">Behavioral — how objects TALK</h3>
<ul>
<li><strong>Strategy</strong> — swappable algorithms behind one interface (<code>Comparator</code>, payments, fee rules).</li>
<li><strong>Observer</strong> — publishers notify subscribers (Swing events; the idea behind Kafka).</li>
<li><strong>Template Method</strong> — parent fixes the skeleton, children fill steps (<code>JdbcTemplate</code> handles boilerplate).</li>
<li><strong>Command</strong> — action as an object → queues, undo, logs (<code>Runnable</code>!).</li>
<li><strong>State</strong> — behavior switches with internal state machines (OrderStatus flows).</li>
<li><strong>Chain of Responsibility</strong> — pass request along handlers until one accepts (Servlet filters, middleware).</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'Pattern Map & Radar',
html: `<div class="figframe"><div class="figtitle">The 23-pattern map (know these boxes)</div>
<svg class="diagram" viewBox="0 0 540 150">
  <rect x="10" y="12" width="164" height="126" rx="10" class="do_"/><text x="92" y="32" text-anchor="middle" class="dt" font-weight="700">CREATIONAL</text>
  <text x="24" y="52" class="dts">Singleton·Factory·AbstractF</text><text x="24" y="70" class="dts">Builder·Prototype</text>
  <rect x="188" y="12" width="160" height="126" rx="10" class="dg"/><text x="268" y="32" text-anchor="middle" class="dt" font-weight="700">STRUCTURAL</text>
  <text x="200" y="52" class="dts">Adapter·Decorator·Facade</text><text x="200" y="70" class="dts">Proxy·Composite·Bridge</text><text x="200" y="88" class="dts">Flyweight</text>
  <rect x="362" y="12" width="168" height="126" rx="10" class="dp"/><text x="446" y="32" text-anchor="middle" class="dt" font-weight="700">BEHAVIORAL</text>
  <text x="374" y="52" class="dts">Strategy·Observer·Template</text><text x="374" y="70" class="dts">Command·State·CoR</text><text x="374" y="88" class="dts">Iterator·Mediator…</text>
</svg></div>
<pre class="code" data-lang="java"><code>// Strategy kills if/else ladders
interface Fee { double calc(double amt); }
class WeekendFee implements Fee { public double calc(double a){ return a*0.02; } }

class Checkout {
    private final Fee fee;                    // injected strategy
    double total(double amt){ return amt + fee.calc(amt); }
}</code></pre>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 Real-world anchors</h5><p>Comparator→Strategy · SwingListener→Observer · ServletFilter→CoR · SpringProxy→Proxy/AOP · java.io→Decorator.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Decorator vs Proxy</h5><p>Same structure, different INTENT: decorator ADDS behavior you opt into; proxy CONTROLS access invisibly.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Which pattern did YOU use? (prepare!)</div><div class="a">Story formula: problem (switch hell) → pattern chosen & why (OCP) → outcome (adding X took one file). Concrete &gt; fancy.</div></div>
<div class="qa"><div class="q">Observer vs Pub/Sub messaging?</div><div class="a">Same contract shape; in-process uses direct references (events), distributed adds broker durability/replay — that's Kafka's Observer at scale.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>Adapter translates 🌐 · Decorator wraps 🎁 · Facade simplifies 🎬 · Proxy guards 🕶️ · Strategy swaps 🔄 · Observer shouts 📣</b>”.</div>`});

/* ===== CHAPTER 20 · LLD Masterclass ===== */
B.chapter('p3', 20, 'LLD: Parking Lot & Friends');

B.spread(
{ kicker: 'PART III · LLD & DESIGN', head: 'Ch 20 · The Method',
html: `<h2 class="chap"><span class="chnum">CHAPTER 20</span>LLD Interviews — A Repeatable Battle Plan</h2>
<p class="dropcap">LLD = design classes &amp; interactions for ONE feature. Interviewers grade <strong>SOLID thinking</strong>, not compilable code.</p>
<h3 class="sec">The 6-step framework ⭐</h3>
<div class="timeline">
<div class="tl-item"><b>1 · Clarify (2 min)</b> — scope, assumptions, edges aloud (“multi-floor? bikes? pre-booking?”).</div>
<div class="tl-item"><b>2 · Nouns → classes</b> — ParkingLot, Floor, Spot, Vehicle, Ticket.</div>
<div class="tl-item"><b>3 · Verbs → methods</b> — park(), unpark(), findSpot().</div>
<div class="tl-item"><b>4 · Relationships</b> — has-a, is-a, uses-a.</div>
<div class="tl-item"><b>5 · SOLID pass</b> — pricing → FeeStrategy; vehicle types → polymorphism, not enum-if-hell.</div>
<div class="tl-item"><b>6 · Concurrency & edges</b> — two gates racing for last spot → per-floor locks/atomics.</div>
</div>
<h3 class="sec">Relationship arrows (UML-lite)</h3>
<p><strong>Association</strong> “uses” · <strong>Aggregation</strong> ◇ “has, but survives” (Team→Player) · <strong>Composition</strong> ◆ “owns, dies together” (House→Room) · hollow ▷ = inheritance.</p>
<h3 class="sec">The classic ask list</h3>
<p>Parking lot · Elevator · Splitwise · Vending machine · Tic-tac-toe/Chess · BookMyShow seats · LRU cache · Rate limiter · Logger · Snake&amp;Ladder.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Warm-up: LRU Cache',
html: `<div class="figframe"><div class="figtitle">LRU = HashMap speed + DLL order 🧩</div>
<svg class="diagram" viewBox="0 0 540 130">
  <rect x="14" y="40" width="120" height="46" rx="9" class="db"/><text x="74" y="60" text-anchor="middle" class="dt">HashMap</text><text x="74" y="76" text-anchor="middle" class="dts">key → node O(1)</text>
  <path d="M136 63 h30" class="dl"/><polygon points="168,63 160,59 160,67" fill="#8a5a33"/>
  <rect x="196" y="24" width="70" height="34" rx="8" class="do_"/><text x="231" y="46" text-anchor="middle" class="dts">MRU ★</text>
  <path d="M268 41 h120 M392 41 h-124" class="dl"/>
  <circle cx="286" cy="41" r="7" fill="#8a5a33"/><circle cx="330" cy="41" r="7" fill="#8a5a33"/><circle cx="374" cy="41" r="7" fill="#8a5a33"/>
  <rect x="394" y="24" width="70" height="34" rx="8" class="dr2"/><text x="429" y="46" text-anchor="middle" class="dts">LRU ⏳</text>
  <text x="270" y="84" text-anchor="middle" class="dts">doubly-linked list: evict tail, promote head on every get/put</text>
  <text x="270" y="108" text-anchor="middle" class="da">get O(1) · put O(1) — LinkedHashMap(accessOrder=true) does it for you!</text>
</svg></div>
<pre class="code" data-lang="java"><code>class LRUCache&lt;K,V&gt; extends LinkedHashMap&lt;K,V&gt; {
    private final int cap;
    LRUCache(int cap){ super(cap, .75f, true); this.cap = cap; }
    protected boolean removeEldestEntry(Map.Entry&lt;K,V&gt; e){ return size() &gt; cap; }
}</code></pre>
<div class="pillrow">
<span class="pill" style="--pc:#26418f">Parking Lot</span><span class="pill" style="--pc:#2e7d32">Elevator</span><span class="pill" style="--pc:#6a1b9a">Splitwise</span><span class="pill" style="--pc:#c0392b">BookMyShow</span><span class="pill" style="--pc:#b28900">Rate Limiter</span><span class="pill" style="--pc:#00695c">Vending Machine</span><span class="pill" style="--pc:#e76f00">Logger</span><span class="pill" style="--pc:#26418f">Tic-Tac-Toe</span>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Composition vs inheritance here?</div><div class="a">Prefer composition (“has-a” strategies/repos); inheritance only for true is-a with substitutability (LSP!).</div></div>
<div class="qa"><div class="q">Why do interviewers love LRU?</div><div class="a">One object compressing HashMap internals + doubly-linked lists + O(1) reasoning.</div></div>
</div>`});

/* Chapter 20 · spread 2 — worked example */
B.spread(
{ kicker: 'PART III · LLD & DESIGN', head: 'Ch 20 · Worked Example',
html: `<h2 class="chap"><span class="chnum">CHAPTER 20 · CONT.</span>The Parking Lot, Fully Designed 🅿️</h2>
<h3 class="sec">Classes &amp; responsibilities</h3>
<ul>
<li><b>ParkingLot</b> — facade: <code>park(vehicle)</code>, <code>unpark(ticket)</code>; holds Floors.</li>
<li><b>Floor</b> — owns Spots; <code>findAvailable(type)</code>.</li>
<li><b>Spot</b> — <code>SpotType {BIKE, CAR, TRUCK, EV}</code> + occupied flag (atomic!).</li>
<li><b>Vehicle</b> abstract → Car/Bike/Truck polymorphism (no instanceof chains).</li>
<li><b>Ticket</b> — vehicle, spot, entryTime (immutable value object).</li>
<li><b>FeeStrategy</b> interface — Hourly / Flat / Weekend pricing injected.</li>
<li><b>DisplayBoard</b> — free-count per type, updated on events.</li>
</ul>
<pre class="code" data-lang="java"><code>public Ticket park(Vehicle v) {
    Floor f = finder.findFloorWithSpot(v.type())   // strategy
                  .orElseThrow(NoSpaceException::new);
    Spot s = f.lockAndOccupy(v.type());            // atomic ✔
    return new Ticket(v, s, Instant.now());
}
public Bill unpark(Ticket t) {
    t.spot().release();
    return new Bill(t, feeStrategy.calc(t.duration()));
}</code></pre>
<p><b>Concurrency:</b> two entry gates racing for the last CAR spot → occupy via <code>AtomicBoolean.compareAndSet</code> per spot, or DB row-level lock if distributed.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Class Diagram',
html: `<div class="figframe"><div class="figtitle">UML you can redraw in 90 seconds</div>
<svg class="diagram" viewBox="0 0 540 210">
  <rect x="14" y="14" width="120" height="44" rx="8" class="dg"/><text x="74" y="32" text-anchor="middle" class="dts" font-weight="700">ParkingLot</text><text x="74" y="48" text-anchor="middle" class="dts">◆─ floors</text>
  <path d="M74 58 v22" class="dl"/><polygon points="74,84 70,76 78,76" fill="#8a5a33"/>
  <rect x="14" y="86" width="120" height="40" rx="8" class="db"/><text x="74" y="104" text-anchor="middle" class="dts" font-weight="700">Floor</text><text x="74" y="118" text-anchor="middle" class="dts">spots[]</text>
  <path d="M134 106 h26" class="dl"/><polygon points="162,106 154,102 154,110" fill="#8a5a33"/>
  <rect x="164" y="86" width="104" height="40" rx="8" class="do_"/><text x="216" y="104" text-anchor="middle" class="dts" font-weight="700">Spot</text><text x="216" y="118" text-anchor="middle" class="dts">type · CAS flag</text>
  <path d="M270 96 C310 80 330 66 356 52" class="dl dash"/><text x="316" y="62" class="dts">fits ▸</text>
  <rect x="358" y="24" width="110" height="38" rx="8" class="dp"/><text x="413" y="42" text-anchor="middle" class="dts" font-weight="700">«abstract» Vehicle</text><text x="413" y="56" text-anchor="middle" class="dts">plate · type()</text>
  <path d="M396 62 l-10 16 M430 62 l10 16" class="dl"/><text x="376" y="88" class="dts">◁ Car</text><text x="446" y="88" class="dts">Bike ▷</text>
  <path d="M216 126 v20" class="dl"/>
  <rect x="150" y="148" width="132" height="40" rx="8" class="dr2"/><text x="216" y="166" text-anchor="middle" class="dts" font-weight="700">Ticket «immutable»</text><text x="216" y="180" text-anchor="middle" class="dts">entryTime · spot · veh</text>
  <rect x="330" y="148" width="140" height="40" rx="8" class="dg"/><text x="400" y="166" text-anchor="middle" class="dts" font-weight="700">«interface» FeeStrategy</text><text x="400" y="180" text-anchor="middle" class="dts">Hourly | Flat | Weekend</text>
  <path d="M284 168 h44" class="dl dash"/><text x="306" y="160" class="dts">uses</text>
</svg></div>
<table class="tbl">
<tr><th>FeeStrategy</th><th>Rule</th></tr>
<tr><td>Hourly</td><td>₹50 first hr + ₹30 each next</td></tr>
<tr><td>Flat day pass</td><td>₹200 regardless</td></tr>
<tr><td>Weekend surge</td><td>hourly ×1.5 (decorates another!)</td></tr>
</table>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Multiple entry gates?</div><div class="a">Single node: CAS per spot. Distributed: central allocation service or DB unique constraint + retry — mention trade-off aloud!</div></div>
<div class="qa"><div class="q">Where did patterns appear?</div><div class="a">Facade(ParkingLot) · Strategy(Fee/finder) · Polymorphic substitution(Vehicle) · Value object(Ticket) — name them proactively.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“LLD recipe: <b>Nouns are boxes, verbs are doors, SOLID is the paint 🎨, concurrency is the lock 🔐</b>.”</div>`});
})();
