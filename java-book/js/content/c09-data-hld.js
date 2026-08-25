/* ===== CHAPTERS 25–27 · Databases, System Design, Kafka ===== */
(function () {
var B = window.BOOK;
B.chapter('p5', 25, 'Databases: Indexes to Sharding');

/* Chapter 25 · spread 1 */
B.spread(
{ kicker: 'PART V · DATA & SYSTEM DESIGN', head: 'Ch 25 · Relational Core',
html: `<h2 class="chap"><span class="chnum">CHAPTER 25</span>Databases — From WHERE Clause To Write Skew</h2>
<h3 class="sec">Indexes — the B-tree shortcut 🌳</h3>
<ul>
<li>An index is a sorted structure → O(log n) seek instead of O(n) scan.</li>
<li><strong>Composite order matters:</b> index(a,b) serves <code>a=?</code> and <code>a=? AND b=?</code> but NOT bare <code>b=?</code>.</li>
<li>Covering index (query columns all inside index) skips table entirely.</li>
<li>Every index slows INSERT/UPDATE — indexes are rented speed.</li>
</ul>
<pre class="code" data-lang="sql"><code>EXPLAIN ANALYZE
SELECT o.id FROM orders o JOIN users u ON u.id=o.user_id
WHERE u.email = 'a@b.com' ORDER BY o.created_at DESC LIMIT 20;
-- look for: Index Scan ✔ vs Seq Scan ✖, rows estimate drift</code></pre>
<h3 class="sec">ACID &amp; isolation levels</h3>
<table class="tbl">
<tr><th>Level</th><th>Dirty read</th><th>Non-repeat</th><th>Phantom</th></tr>
<tr><td>READ UNCOMMITTED</td><td class="no-tx">possible</td><td class="no-tx">possible</td><td class="no-tx">possible</td></tr>
<tr><td>READ COMMITTED (pg default)</td><td class="yes">safe</td><td class="no-tx">possible</td><td class="no-tx">possible</td></tr>
<tr><td>REPEATABLE READ (mysql default)</td><td class="yes">safe</td><td class="yes">safe</td><td class="mid">varies</td></tr>
<tr><td>SERIALIZABLE</td><td class="yes">safe</td><td class="yes">safe</td><td class="yes">safe</td></tr>
</table>`},
{ kicker: 'VISUAL GUIDE', head: 'Index Anatomy',
html: `<div class="figframe"><div class="figtitle">Clustered vs secondary index lookup</div>
<svg class="diagram" viewBox="0 0 540 140">
  <rect x="16" y="16" width="150" height="100" rx="10" class="db"/><text x="91" y="36" text-anchor="middle" class="dt" font-weight="700">users (heap)</text>
  <text x="30" y="58" class="dts">row id=7 ● email…</text>
  <text x="30" y="78" class="dts">row id=42 ● email…</text>
  <text x="30" y="98" class="dts">row id=91 ● email…</text>
  <rect x="220" y="24" width="130" height="84" rx="10" class="do_"/><text x="285" y="44" text-anchor="middle" class="dt">idx_email B-tree</text>
  <path d="M250 66 h70" class="dl"/><text x="285" y="62" text-anchor="middle" class="dts">'a@b.com' → ptr</text>
  <path d="M352 66 h26" class="dl dash"/><polygon points="380,66 372,62 372,70" fill="#8a5a33"/>
  <circle cx="396" cy="66" r="10" class="dr2"/><text x="396" y="71" text-anchor="middle" class="da">7</text>
  <text x="430" y="52" class="dts">seek O(log n)</text>
  <text x="430" y="72" class="dts">then row fetch</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>🔒 Pessimistic vs optimistic</h5><p><code>SELECT … FOR UPDATE</code> locks rows upfront; optimistic uses @Version check at commit — better for low-contention web apps.</p></div>
<div class="cardx" style="--rc:#256c29"><h5>🏊 HikariCP sizing</h5><p>Pool ≈ cores×2 + spindles rule of thumb; 50 idle connections hurt more than help. Measure!</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 SELECT * disease</h5><p>Kills covering-index chances, ships dead bytes, breaks on schema add — name your columns.</p></div>
<div class="cardx" style="--rc:#b28900"><h5>📌 Normal forms in one line</h5><p>1NF atomic values · 2NF no partial dependency · 3NF no transitive — then denormalize deliberately for reads.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">When would an index NOT be used?</div><div class="a">Low selectivity (gender column), functions wrapping the column, leading wildcard LIKE '%x', tiny tables where scan wins.</div></div>
<div class="qa"><div class="q">Explain a DB deadlock you fixed.</div><div class="a">Two txns locked rows in opposite order → enforce consistent lock ordering + shorter transactions; detect via innodb/pg deadlock logs.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Index = book's back page 📑 — instant topic jump, but every new sentence updates it too.”</div>`});

/* Chapter 25 · spread 2 — scaling reads & writes */
B.spread(
{ kicker: 'PART V · DATA & SYSTEM DESIGN', head: 'Ch 25 · Scale The Data',
html: `<h2 class="chap"><span class="chnum">CHAPTER 25 · CONT.</span>Replication, Sharding &amp; Caching</h2>
<h3 class="sec">Reads: replicate</h3>
<p>Leader handles writes; followers serve reads. Watch <strong>replication lag</strong> (“I updated my profile but it's old?!”) → read-your-own-writes via sticky routing. Quorum idea (R+W&gt;N) trades latency for consistency.</p>
<h3 class="sec">Writes: shard</h3>
<ul>
<li><b>Range sharding</b> (A–M / N–Z): easy ranges, hot-spot risk.</li>
<li><b>Hash sharding:</b> even load, painful range queries.</li>
<li><b>Consistent hashing ⭐:</b> hash ring + virtual nodes — adding/removing a node moves only ~1/N keys (why Cassandra/Dynamo/CDNs love it).</li>
<li>Rebalancing plan &amp; shard-key choice = THE design question.</li>
</ul>
<h3 class="sec">Caching patterns (Redis)</h3>
<table class="tbl">
<tr><th>Pattern</th><th>Mechanics</th><th>Gotcha</th></tr>
<tr><td><b>Cache-aside</b> ⭐ default</td><td>App reads cache → miss → DB → fill cache</td><td>Stale until TTL; stampede on hot miss</td></tr>
<tr><td>Write-through</td><td>Write DB+cache together</td><td>Write latency ↑</td></tr>
<tr><td>Write-behind</td><td>Cache acks, flushes later</td><td>Data-loss window</td></tr>
</table>
<p><b>Stampede fix:</b> per-key mutex/singleflight + jittered TTLs. Eviction: LRU/LFU when memory caps hit.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'The Hash Ring',
html: `<div class="figframe"><div class="figtitle">Consistent hashing — fewest moves 🎡</div>
<svg class="diagram" viewBox="0 0 540 170">
  <circle cx="180" cy="85" r="64" class="dg" fill-opacity=".25"/>
  <circle cx="180" cy="21" r="12" class="do_" /><text x="180" y="8" text-anchor="middle" class="dts">Node A</text>
  <circle cx="244" cy="85" r="12" class="db"/><text x="272" y="89" class="dts">Node B</text>
  <circle cx="180" cy="149" r="12" class="dp"/><text x="180" y="172" text-anchor="middle" class="dts">Node C</text>
  <circle cx="116" cy="85" r="12" class="dr2"/><text x="60" y="89" class="dts">NEW D ✚</text>
  <circle cx="222" cy="43" r="7" fill="#e76f00"/><text x="234" y="36" class="dts">key k → walks clockwise → lands on A… unless D appears between</text>
  <text x="420" y="40" class="dts">Only segment B↔A</text>
  <text x="420" y="58" class="dts">keys re-map to D.</text>
  <text x="420" y="76" class="dts">Everyone else</text>
  <text x="420" y="94" class="dts">stays put ✔</text>
  <text x="420" y="130" class="da">virtual nodes smooth load</text>
</svg></div>
<table class="tbl">
<tr><th>Store family</th><th>Shape</th><th>Reach for</th></tr>
<tr><td>Document (Mongo)</td><td>JSON blobs</td><td>Flexible product catalogs</td></tr>
<tr><td>Wide-column (Cassandra)</td><td>partitioned rows</td><td>Write-heavy telemetry</td></tr>
<tr><td>KV (Redis)</td><td>hash/list/set/sorted-set</td><td>Caches, sessions, leaderboards</td></tr>
<tr><td>Graph (Neo4j)</td><td>nodes+edges</td><td>Social feeds, fraud rings</td></tr>
<tr><td>Search (ES)</td><td>inverted index</td><td>Full-text, log analytics</td></tr>
</table>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why is cache invalidation “hard”?</div><div class="a">Two sources of truth race: DB write + cache update aren't atomic across machines — pick TTLs, event-driven eviction, and accept bounded staleness.</div></div>
<div class="qa"><div class="q">CAP in one breath?</div><div class="a">Under a network partition choose: availability (eventual consistency — carts, likes) or consistency (reject writes — inventory, payments). PACELC adds: no partition? still trade Latency vs Consistency.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Consistent hashing = round carousel 🎡 — new horse joins, only its neighbors shuffle.”</div>`});

/* ===== CHAPTER 26 · System Design Fundamentals ===== */
B.chapter('p5', 26, 'System Design & HLD');

/* spread 1 — the playbook */
B.spread(
{ kicker: 'PART V · DATA & SYSTEM DESIGN', head: 'Ch 26 · The Playbook',
html: `<h2 class="chap"><span class="chnum">CHAPTER 26</span>HLD Interviews — Draw Boxes With Confidence</h2>
<h3 class="sec">The 45-minute skeleton ⭐</h3>
<div class="timeline">
<div class="tl-item"><b>1 · Requirements (5')</b> — functional (“shorten + redirect + analytics?”) &amp; non-functional (scale, latency, availability, consistency).</div>
<div class="tl-item"><b>2 · Estimation (5')</b> — DAU → QPS → storage. Say assumptions aloud!</div>
<div class="tl-item"><b>3 · API + data model (7')</b> — endpoints, entities, indexes, schema.</div>
<div class="tl-item"><b>4 · High-level design (15')</b> — client→LB→services→cache→DB→queues. Draw big.</div>
<div class="tl-item"><b>5 · Deep-dive (10')</b> — the hard part: hot keys, sharding choice, idempotency.</div>
<div class="tl-item"><b>6 · Wrap (3')</b> — bottlenecks, monitoring, trade-offs YOU chose.</div>
</div>
<h3 class="sec">Pocket numbers</h3>
<table class="tbl">
<tr><th>Signal</th><th>Math</th></tr>
<tr><td>1 M DAU</td><td>≈ 12 writes/s average → ×10–20 at peak</td></tr>
<tr><td>Availability</td><td>99.9% = 43 min/mo down · 99.99% = 4.3 min</td></tr>
<tr><td>Storage</td><td>row-size × ops/day × 365 (+30% overhead)</td></tr>
<tr><td>Read:write</td><td>Social feeds 1000:1 · checkout ~1:1</td></tr>
</table>`},
{ kicker: 'VISUAL GUIDE', head: 'The Default Architecture',
html: `<div class="figframe"><div class="figtitle">90% of answers start like this</div>
<svg class="diagram" viewBox="0 0 540 210">
  <rect x="12" y="88" width="74" height="34" rx="8" class="db"/><text x="49" y="110" text-anchor="middle" class="dts">CLIENTS</text>
  <path d="M88 105 h22 M132 105 h20" class="dl"/>
  <rect x="154" y="88" width="86" height="34" rx="8" class="dr2"/><text x="197" y="104" text-anchor="middle" class="dts">LOAD</text><text x="197" y="116" text-anchor="middle" class="dts">BALANCER</text>
  <path d="M242 105 h20" class="dl"/>
  <rect x="264" y="66" width="96" height="34" rx="8" class="do_"/><text x="312" y="88" text-anchor="middle" class="dts">WEB/API ×N</text>
  <rect x="264" y="118" width="96" height="30" rx="8" class="dp"/><text x="312" y="138" text-anchor="middle" class="dts">REDIS cache</text>
  <path d="M362 83 h22 M362 133 h22" class="dl"/>
  <rect x="386" y="60" width="76" height="40" rx="8" class="dg"/><text x="424" y="78" text-anchor="middle" class="dts">PRIMARY</text><text x="424" y="92" text-anchor="middle" class="dts">DB</text>
  <path d="M464 80 h18 v40 h-16" class="dl dash"/><polygon points="448,122 456,118 456,126" fill="#8a5a33"/>
  <rect x="386" y="112" width="76" height="40" rx="8" class="db"/><text x="424" y="130" text-anchor="middle" class="dts">REPLICAS</text><text x="424" y="144" text-anchor="middle" class="dts">(reads)</text>
  <path d="M312 150 v14 h120" class="dl dash"/><rect x="300" y="168" width="180" height="32" rx="8" class="dp"/><text x="390" y="188" text-anchor="middle" class="dts">KAFKA → async workers 🛠</text>
  <rect x="12" y="12" width="200" height="34" rx="8" fill="#fff6df" stroke="#cf9040"/><text x="112" y="34" text-anchor="middle" class="dts">CDN serves static & cached edges ⚡</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><h5>⚖️ Trade-off sentences that score</h5><p>“I choose eventual consistency here to keep p99 under 50 ms.” · “Cache-aside with jittered TTL — stale window acceptable for profiles.”</p></div>
<div class="cardx" style="--rc:#c0392b"><h5>🧮 Worked mini-estimate: URL shortener</h5><p>100 M links/mo → ~40 writes/s (peak 400). Reads ÷ write ×10 ≈ 400–4 k/s. 5-year rows 6 B × 500 B ≈ 3 TB → shard by hash(key).</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Where do juniors lose points?</div><div class="a">Jumping to tech before requirements; silent assumptions; no numbers; ignoring failure modes; no trade-off language.</div></div>
<div class="qa"><div class="q">Horizontal vs vertical scaling?</div><div class="a">Vertical: bigger box (simple, capped). Horizontal: more boxes (unlimited, but needs LB/stateless design/shared-nothing data).</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“<b>Talk 🗣️ → Count 🔢 → Box ▢ → Arrow ↔ → Defend ⚖️</b>” — every HLD ever.</div>`});

/* Chapter 26 · spread 2 — worked example */
B.spread(
{ kicker: 'PART V · DATA & SYSTEM DESIGN', head: 'Ch 26 · Worked Example',
html: `<h2 class="chap"><span class="chnum">CHAPTER 26 · CONT.</span>Design A URL Shortener (10-Minute Version)</h2>
<h3 class="sec">Requirements pinned early</h3>
<p>Shorten long URLs · redirect fast (&lt;50 ms p99) · optional expiry &amp; custom alias · basic click analytics. Read-heavy ≈ <strong>100:1</strong>.</p>
<h3 class="sec">Key generation — the crux</h3>
<ul>
<li><b>Base62 of a global counter</b> (DB sequence / Redis INCR / range server): 7 chars = 62⁷ ≈ <b>3.5 trillion</b> keys ✔ zero collisions, enumerable though.</li>
<li><b>Random 7-char ID:</b> collision-probability negligible until billions; retry-on-insert-conflict. Prefer when unpredictability matters (private links).</li>
</ul>
<pre class="code" data-lang="sql"><code>CREATE TABLE links (
  code        CHAR(7) PRIMARY KEY,
  long_url    TEXT NOT NULL,
  owner_id    BIGINT,
  expires_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now()
);
-- clicks stream to KAFKA → rollups in ClickHouse (never block redirect)</code></pre>
<h3 class="sec">Redirect path is sacred 🛣️</h3>
<p>Edge cache / Redis (<code>GET code → url</code>, TTL 24 h) → miss → replica DB → 301 permanent (cacheable, loses click count) vs 302 temporary (keeps analytics). State the trade-off!</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Two Flows',
html: `<div class="figframe"><div class="figtitle">Create ➜ Redirect</div>
<svg class="diagram" viewBox="0 0 540 168">
  <rect x="12" y="18" width="96" height="34" rx="8" class="db"/><text x="60" y="40" text-anchor="middle" class="dts">POST /links</text>
  <path d="M110 35 h24" class="dl"/><polygon points="136,35 128,31 128,39" fill="#8a5a33"/>
  <rect x="138" y="18" width="120" height="34" rx="8" class="do_"/><text x="198" y="40" text-anchor="middle" class="dts">ID GEN (counter)</text>
  <path d="M260 35 h24" class="dl"/><polygon points="286,35 278,31 278,39" fill="#8a5a33"/>
  <rect x="288" y="18" width="96" height="34" rx="8" class="dg"/><text x="336" y="40" text-anchor="middle" class="dts">INSERT row</text>
  <path d="M386 35 h24" class="dl"/><polygon points="412,35 404,31 404,39" fill="#8a5a33"/>
  <rect x="414" y="18" width="112" height="34" rx="8" class="dp"/><text x="470" y="40" text-anchor="middle" class="dts">201 {code:"aB3xK9z"}</text>
  <rect x="12" y="96" width="96" height="34" rx="8" class="db"/><text x="60" y="118" text-anchor="middle" class="dts">GET /aB3xK9z</text>
  <path d="M110 113 h24" class="dl"/><polygon points="136,113 128,109 128,117" fill="#8a5a33"/>
  <rect x="138" y="96" width="130" height="34" rx="8" class="dp"/><text x="203" y="118" text-anchor="middle" class="dts">REDIS hit? ⚡ 95%</text>
  <path d="M270 113 h22" class="dl"/><polygon points="294,113 286,109 286,117" fill="#8a5a33"/>
  <rect x="296" y="96" width="100" height="34" rx="8" class="dr2"/><text x="346" y="118" text-anchor="middle" class="dts">miss→REPLICA</text>
  <path d="M398 113 h20" class="dl"/>
  <rect x="420" y="96" width="106" height="34" rx="8" class="do_"/><text x="473" y="118" text-anchor="middle" class="dts">302 + log click</text>
  <text x="270" y="156" text-anchor="middle" class="dts">clicks fire-and-forget to KAFKA — never inline into redirect path</text>
</svg></div>
<div class="pillrow">
<span class="pill" style="--pc:#26418f">Stateless API ×N</span><span class="pill" style="--pc:#2e7d32">Redis hot set</span><span class="pill" style="--pc:#6a1b9a">Hash-shard by code</span><span class="pill" style="--pc:#c0392b">Rate-limit per IP</span><span class="pill" style="--pc:#b28900">Idempotent create</span>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Custom aliases?</div><div class="a">Reserve namespace: INSERT … ON CONFLICT DO NOTHING → 409 if taken; validate charset; extra rate-limit (abuse magnet).</div></div>
<div class="qa"><div class="q">Expired links cleanup?</div><div class="a">Lazy delete on read + periodic sweeper / TTL-style index on expires_at; keep tombstone for metrics.</div></div>
<div class="qa"><div class="q">What breaks first at 10× traffic?</div><div class="a">Redis memory/hot-key NIC then DB connection pool — answer shows you think in bottlenecks, not buzzwords.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Tiny key 🔑, giant door 🚪 — optimize ONLY the read path.”</div>`});

/* ===== CHAPTER 27 · Kafka & Event-Driven Systems ===== */
B.chapter('p5', 27, 'Kafka & Event-Driven Design');
B.spread(
{ kicker: 'PART V · DATA & SYSTEM DESIGN', head: 'Ch 27 · Kafka',
html: `<h2 class="chap"><span class="chnum">CHAPTER 27</span>Kafka — The Commit Log That Runs The World 📚</h2>
<p class="dropcap">Kafka is an <strong>append-only, distributed log</strong>. Producers append records to <em>topics</em>; consumers pull at their own pace remembering their <em>offsets</em>. It decouples services in time (offline consumers OK), load (absorb spikes) and space (many readers of the same stream).</p>
<h3 class="sec">The mental model</h3>
<ul>
<li><b>Topic</b> → split into <b>partitions</b> (the unit of parallelism &amp; ordering).</li>
<li><b>Producer:</b> key hash → partition. Same key ⇒ same partition ⇒ <strong>ordered</strong> per key.</li>
<li><b>Consumer group:</b> each partition owned by ONE member → scale workers up to partition count.</li>
<li><b>Offsets:</b> consumers commit bookmarks; replay = rewind the bookmark.</li>
<li><b>Brokers replicate</b> partitions; leader serves writes, ISR set defines durability (<code>acks=all</code>).</li>
</ul>
<pre class="code" data-lang="java"><code>kafkaTemplate.send("orders",
    orderId,            // key ⇒ per-order ordering ⭐
    OrderCreatedEvent.newBuilder()...build());</code></pre>
<h3 class="sec">Delivery semantics</h3>
<table class="tbl">
<tr><th>Guarantee</th><th>How</th><th>Cost</th></tr>
<tr><td>At-most-once</td><td>commit offset first</td><td class="no-tx">may lose msgs</td></tr>
<tr><td><b>At-least-once</b></td><td>process first, then commit</td><td>duplicates → consumer idempotency ⭐</td></tr>
<tr><td>Effectively-once</td><td>idempotent producer + transactions / dedupe store</td><td>latency &amp; complexity ↑</td></tr>
</table>`},
{ kicker: 'VISUAL GUIDE', head: 'Partitions In Action',
html: `<div class="figframe"><div class="figtitle">Topic “orders” · 3 partitions · one group</div>
<svg class="diagram" viewBox="0 0 540 170">
  <rect x="16" y="16" width="150" height="34" rx="8" class="db"/><text x="91" y="38" text-anchor="middle" class="dts">P0 ▸ m1 m2 m3 ▸▸</text>
  <rect x="16" y="66" width="150" height="34" rx="8" class="do_"/><text x="91" y="88" text-anchor="middle" class="dts">P1 ▸ m4 m5 ▸▸</text>
  <rect x="16" y="116" width="150" height="34" rx="8" class="dp"/><text x="91" y="138" text-anchor="middle" class="dts">P2 ▸ m6 ▸▸</text>
  <path d="M168 33 C230 40 260 52 300 60 M168 83 h130 M168 133 C230 126 260 114 300 106" class="dl"/>
  <polygon points="302,62 293,58 295,66" fill="#8a5a33"/><polygon points="300,84 292,80 296,88" fill="#8a5a33"/><polygon points="302,104 293,102 297,110" fill="#8a5a33"/>
  <rect x="306" y="48" width="100" height="28" rx="8" class="dg"/><text x="356" y="67" text-anchor="middle" class="dts">consumer-1</text>
  <rect x="306" y="92" width="100" height="28" rx="8" class="dg"/><text x="356" y="111" text-anchor="middle" class="dts">consumer-2</text>
  <rect x="420" y="70" width="108" height="30" rx="8" fill="#ffe9c9" stroke="#cf9040"/><text x="474" y="90" text-anchor="middle" class="dts">group “billing”</text>
  <text x="270" y="164" text-anchor="middle" class="dts">3rd member would idle — parallelism ≤ partitions!</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><h5>📌 Retention ≠ consumption</h5><p>Logs persist days-to-forever regardless of reads; new service can replay history from minute zero 🔁.</p></div>
<div class="cardx" style="--rc:#b28900"><h5>📌 Kafka vs RabbitMQ</h5><p>Kafka: high throughput, replay, stream state. Rabbit: smart routing/queues, per-message TTL, lower latency RPC-ish tasks.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">How do you keep per-customer order?</div><div class="a">Key by customerId → same partition → single writer thread per partition processes sequentially.</div></div>
<div class="qa"><div class="q">Consumer lag is growing — act?</div><div class="a">Check slow handlers (DB?), scale members up to partition count, increase max.poll interval/batch tuning, or add partitions (mind key distribution!).</div></div>
<div class="qa"><div class="q">Why is “exactly once” quoted?</div><div class="a">End-to-end it's effectively-once via idempotent producer + transactional read-process-write loops or downstream dedupe keys.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Kafka = library 📚: librarians (producers) shelve by subject (key); readers (consumers) hold bookmarks (offsets).”</div>`});
})();
