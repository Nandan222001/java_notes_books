/* ===== CHAPTER 24 · Microservices ===== */
(function () {
var B = window.BOOK;
B.chapter('p4', 24, 'Microservices Architecture');

B.spread(
{ kicker: 'PART IV · SPRING & MICROSERVICES', head: 'Ch 24 · Decompose',
html: `<h2 class="chap"><span class="chnum">CHAPTER 24</span>Monolith ➜ Microservices, Honestly</h2>
<p class="dropcap">A monolith deploys as ONE app — simple to build/debug until teams collide and one bug redeploys everything. Microservices split by <strong>business capability</strong> (bounded contexts): each service owns its data, deploys alone, scales alone. The price: a distributed system's complexity tax.</p>
<table class="tbl">
<tr><th></th><th>Monolith</th><th>Microservices</th></tr>
<tr><td>Deploy</td><td class="yes">One unit</td><td>Independent per service</td></tr>
<tr><td>Data</td><td>Shared DB</td><td class="mid">Database-per-service</td></tr>
<tr><td>Scale</td><td>Whole app clone</td><td>Hot services only 💪</td></tr>
<tr><td>Debugging</td><td class="yes">One stack trace</td><td class="no-tx">Needs tracing infra</td></tr>
<tr><td>Fits</td><td>Small teams, early stage</td><td>Many teams, org-scale</td></tr>
</table>
<h3 class="sec">The supporting cast</h3>
<ul>
<li><strong>API Gateway</strong> — single entry: routing, auth, rate-limit, TLS offload (Spring Cloud Gateway / Kong).</li>
<li><strong>Service discovery</strong> — services register &amp; find each other (Eureka, Consul, or K8s DNS).</li>
<li><strong>Config server</strong> — externalized config per env (Spring Cloud Config / vaults).</li>
<li><strong>Sync talk</strong> REST/gRPC; <strong>async talk</strong> events via Kafka/RabbitMQ (looser coupling ⭐).</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'Topology Map',
html: `<div class="figframe"><div class="figtitle">Gateway-fronted microservice landscape</div>
<svg class="diagram" viewBox="0 0 540 190">
  <rect x="210" y="8" width="120" height="34" rx="9" class="db"/><text x="270" y="30" text-anchor="middle" class="dt">CLIENTS 🌍</text>
  <path d="M270 42 v14" class="dl"/><polygon points="270,58 266,50 274,50" fill="#8a5a33"/>
  <rect x="196" y="60" width="148" height="34" rx="9" class="dr2"/><text x="270" y="82" text-anchor="middle" class="dt">API GATEWAY 🚪</text>
  <text x="356" y="82" class="dts">auth · route · rate-limit</text>
  <path d="M180 94 L120 118 M270 96 v20 M360 94 L430 118" class="dl"/>
  <polygon points="116,122 114,113 123,117" fill="#8a5a33"/><polygon points="270,120 266,112 274,112" fill="#8a5a33"/><polygon points="434,122 426,117 431,113" fill="#8a5a33"/>
  <rect x="56" y="124" width="110" height="44" rx="9" class="do_"/><text x="111" y="142" text-anchor="middle" class="dts">ORDER SVC</text><text x="111" y="158" text-anchor="middle" class="dts">🗄 own DB</text>
  <rect x="212" y="124" width="116" height="44" rx="9" class="dp"/><text x="270" y="142" text-anchor="middle" class="dts">PAYMENT SVC</text><text x="270" y="158" text-anchor="middle" class="dts">🗄 own DB</text>
  <rect x="374" y="124" width="110" height="44" rx="9" class="dg"/><text x="429" y="142" text-anchor="middle" class="dts">INVENTORY SVC</text><text x="429" y="158" text-anchor="middle" class="dts">🗄 own DB</text>
  <path d="M170 146 h38 M330 146 h40" class="dl dash"/><text x="270" y="184" text-anchor="middle" class="dts">async events between them via KAFKA 📣</text>
</svg></div>
<div class="callout tip"><span class="ct">💡 Start monolith-first</span>Split when team pain demands it. “Microservices are a solution to organizational problems, not technical ones.”</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why database-per-service?</div><div class="a">Shared schema couples deploys & tech choices; owning data keeps autonomy — integration happens via APIs/events, not joins.</div></div>
<div class="qa"><div class="q">Sync or async between services?</div><div class="a">Sync (REST/gRPC) for queries needing instant answers; async events for state changes/workflows — fewer cascading failures.</div></div>
<div class="qa"><div class="q">How do services authenticate each other?</div><div class="a">Gateway validates user JWT once, forwards claims; service-to-service uses mTLS or token relay (OAuth2 client-credentials).</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>Microservices = apartments 🏢: own kitchen (DB), own door (deploy) — but you need a lobby guard (gateway) and mailroom (Kafka).</div>`});

/* Chapter 24 · spread 2 — resilience & data patterns */
B.spread(
{ kicker: 'PART IV · SPRING & MICROSERVICES', head: 'Ch 24 · Survive Failure',
html: `<h2 class="chap"><span class="chnum">CHAPTER 24 · CONT.</span>Resilience Patterns &amp; Distributed Data</h2>
<h3 class="sec">Expect failure — engineer for it</h3>
<ul>
<li><strong>Timeouts everywhere</strong> — a call without timeout hangs forever.</li>
<li><strong>Retry + backoff + jitter</strong> — retry transient blips; never hammer a dying service.</li>
<li><strong>Circuit breaker</strong> — trip after N failures; fail FAST until probe succeeds (Resilience4j states below).</li>
<li><strong>Bulkhead</strong> — separate pools per dependency so one sink doesn't drown the ship.</li>
<li><strong>Fallbacks</strong> — cached/default response when degraded.</li>
</ul>
<h3 class="sec">Transactions across services?</h3>
<p>No 2-phase-commit across the internet! Use <strong>Saga</strong>: local transactions + compensating actions. Coordinate by <em>choreography</em> (events) or <em>orchestration</em> (central conductor). Pair with the <strong>Outbox pattern</strong>: write event to an outbox table in the SAME transaction, relay publishes later → no lost updates.</p>
<h3 class="sec">Observability trio 🔭</h3>
<p><strong>Metrics</strong> (Prometheus/Grafana) · <strong>Structured logs</strong> (correlation IDs!) · <strong>Distributed traces</strong> (Micrometer Tracing → Zipkin/Tempo): one ID stitches a request across 12 services.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Circuit Breaker & Saga',
html: `<div class="figframe"><div class="figtitle">Circuit breaker states</div>
<svg class="diagram" viewBox="0 0 540 128">
  <rect x="16" y="44" width="120" height="40" rx="9" class="do_"/><text x="76" y="68" text-anchor="middle" class="dt">CLOSED ✔</text>
  <path d="M140 64 h36" class="dl"/><polygon points="178,64 170,60 170,68" fill="#8a5a33"/>
  <rect x="180" y="44" width="110" height="40" rx="9" class="dr2"/><text x="235" y="62" text-anchor="middle" class="dt">OPEN 🚫</text><text x="235" y="78" text-anchor="middle" class="dts">fail fast</text>
  <path d="M294 64 h36" class="dl"/><polygon points="332,64 324,60 324,68" fill="#8a5a33"/>
  <rect x="334" y="44" width="120" height="40" rx="9" class="db"/><text x="394" y="62" text-anchor="middle" class="dt">HALF-OPEN 🤞</text><text x="394" y="78" text-anchor="middle" class="dts">probe requests</text>
  <path d="M394 42 C360 14 200 10 90 40" class="dl dash"/><text x="240" y="18" text-anchor="middle" class="dts">successes → CLOSED · failures → OPEN again</text>
  <text x="470" y="66" class="dts">after cooldown</text>
</svg></div>
<div class="figframe"><div class="figtitle">Saga: order → payment → inventory (choreography)</div>
<svg class="diagram" viewBox="0 0 540 96">
  <rect x="10" y="30" width="104" height="36" rx="9" class="do_"/><text x="62" y="52" text-anchor="middle" class="dts">ORDER ✓ created</text>
  <path d="M116 48 h30" class="dl"/><text x="131" y="40" class="dts">📣 event</text>
  <rect x="148" y="30" width="118" height="36" rx="9" class="do_"/><text x="207" y="52" text-anchor="middle" class="dts">PAYMENT ✓ charged</text>
  <path d="M268 48 h30" class="dl"/><text x="283" y="40" class="dts">📣 event</text>
  <rect x="300" y="30" width="126" height="36" rx="9" class="dr2"/><text x="363" y="52" text-anchor="middle" class="dts">INVENTORY ✗ failed!</text>
  <path d="M300 70 C250 92 150 92 66 70" class="dl dash"/><text x="182" y="94" text-anchor="middle" class="dts">compensate: refund 💸 + cancel order ↩</text>
</svg></div>
<div class="callout warn"><span class="ct">⚠️ Exactly-once is a myth</span>Networks duplicate messages — make consumers <strong>idempotent</strong> (dedupe keys / processed-id table) and accept at-least-once.</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Why avoid distributed 2PC?</div><div class="a">Coordinator blocking + locks held across network partitions kill availability; sagas trade atomicity for liveness with compensation.</div></div>
<div class="qa"><div class="q">What solves double-publishing?</div><div class="a">Outbox: event row commits atomically with state change; separate relay publishes at-least-once; consumers dedupe.</div></div>
<div class="qa"><div class="q">Readiness vs liveness probe?</div><div class="a">Liveness: “process alive?” restart if dead. Readiness: “can serve traffic?” gate routing during warm-up/deps-down.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>Resilience chant: “<b>Time it · Retry politely · Trip the fuse ⚡ · Wall the bulkheads 🚢 · Degrade gracefully</b>”.</div>`});
})();
