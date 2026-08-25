/* ===== CHAPTER 21 · Spring Core & Boot ===== */
(function () {
var B = window.BOOK;
B.chapter('p4', 21, 'Spring Core & Spring Boot');

B.spread(
{ kicker: 'PART IV · SPRING & MICROSERVICES', head: 'Ch 21 · IoC & Beans',
html: `<h2 class="chap"><span class="chnum">CHAPTER 21</span>Spring Core — Inversion Of Everything Boring</h2>
<p class="dropcap">You don't <code>new</code> your dependencies — the <strong>IoC container</strong> builds objects (“beans”), wires them together, and manages their whole life. You declare <em>what</em>; Spring decides <em>how &amp; when</em>.</p>
<h3 class="sec">Constructor injection — the winner</h3>
<pre class="code" data-lang="java"><code>@Service
public class OrderService {
    private final PaymentGateway pay;   // final ⇒ immutable ✔
    private final Mailer mailer;

    public OrderService(PaymentGateway pay, Mailer mailer) {
        this.pay = pay; this.mailer = mailer;   // testable, NPE-safe
    }
}</code></pre>
<ul>
<li><strong>Field injection</strong> (<code>@Autowired</code> on field) hides dependencies, blocks <code>final</code>, complicates unit tests — avoid.</li>
<li><strong>Stereotypes:</b> <code>@Component</code> generic · <code>@Service</code> business · <code>@Repository</code> adds exception translation · <code>@Controller/@RestController</code> web.</li>
<li><strong>Java config:</strong> <code>@Configuration</code> + <code>@Bean</code> for third-party classes you can't annotate.</li>
<li><strong>Profiles:</strong> <code>@Profile("prod")</code> swap implementations per environment.</li>
</ul>
<h3 class="sec">Bean lifecycle (short version)</h3>
<p>Instantiate ➜ inject dependencies ➜ <code>@PostConstruct</code> init ➜ ready ➜ <code>@PreDestroy</code> cleanup. Aware-interfaces &amp; BeanPostProcessors hook around these steps (that's how <code>@Transactional</code> proxies appear!).</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Container Wiring',
html: `<div class="figframe"><div class="figtitle">The container cooks — you just order 🍽️</div>
<svg class="diagram" viewBox="0 0 540 140">
  <rect x="150" y="10" width="240" height="118" rx="12" class="dg"/><text x="270" y="30" text-anchor="middle" class="dt" font-weight="700">ApplicationContext (IoC)</text>
  <rect x="170" y="44" width="92" height="32" rx="8" class="do_"/><text x="216" y="64" text-anchor="middle" class="dts">OrderService</text>
  <rect x="170" y="86" width="92" height="32" rx="8" class="db"/><text x="216" y="106" text-anchor="middle" class="dts">PaymentGateway</text>
  <rect x="290" y="86" width="84" height="32" rx="8" class="dp"/><text x="332" y="106" text-anchor="middle" class="dts">Mailer</text>
  <path d="M216 78 v6 M262 100 h24" class="dl"/>
  <rect x="14" y="44" width="110" height="60" rx="10" class="dr2"/><text x="69" y="68" text-anchor="middle" class="dts">@RestController</text><text x="69" y="88" text-anchor="middle" class="da">HTTP in ⚡</text>
  <path d="M126 74 h22" class="dl dash"/>
  <text x="452" y="66" class="dts">singleton by default</text><text x="452" y="84" class="dts">(one bean per container)</text>
</svg></div>
<table class="tbl">
<tr><th>Scope</th><th>Instances</th><th>Note</th></tr>
<tr><td>singleton</td><td>1 per container</td><td>Default — keep stateless!</td></tr>
<tr><td>prototype</td><td>every get()</td><td>Spring won't call destroy</td></tr>
<tr><td>request / session</td><td>per HTTP unit</td><td>Web apps only</td></tr>
</table>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">BeanFactory vs ApplicationContext?</div><div class="a">BeanFactory = lazy basic container. ApplicationContext adds eager init, events, i18n, AOP integration — always use it in apps.</div></div>
<div class="qa"><div class="q">How does @Transactional work?</div><div class="a">A BeanPostProcessor wraps your bean in a JDK/CGLIB proxy; the proxy opens/commits/rolls back a transaction around the method.</div></div>
<div class="qa"><div class="q">Circular dependency A↔B?</div><div class="a">Boot ≥2.6 fails fast by default — good! Fix the design; last resort @Lazy or setter injection.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Spring is a restaurant 🍽️ — menu = interfaces, kitchen = container, dishes = beans served fresh (or singleton!).”</div>`});

/* Chapter 21 · spread 2 — Spring Boot */
B.spread(
{ kicker: 'PART IV · SPRING & MICROSERVICES', head: 'Ch 21 · Boot Magic',
html: `<h2 class="chap"><span class="chnum">CHAPTER 21 · CONT.</span>Spring Boot — Convention With Superpowers</h2>
<p class="dropcap">Boot removes ceremony: <strong>starters</strong> bundle compatible dependencies, <strong>auto-configuration</strong> wires sane defaults you can override, an <strong>embedded server</strong> makes the jar runnable, and <strong>actuator</strong> ships production endpoints.</p>
<h3 class="sec">How auto-configuration actually works</h3>
<ol>
<li><code>@SpringBootApplication</code> = <code>@Configuration</code>+<code>@ComponentScan</code>+<code>@EnableAutoConfiguration</code>.</li>
<li>Auto-config classes live in <code>META-INF/.../AutoConfiguration.imports</code>.</li>
<li>Each is guarded by <code>@ConditionalOnClass/@ConditionalOnMissingBean/@ConditionalOnProperty</code> — “if HSQL is on classpath and you didn't define a DataSource, here's one”.</li>
<li>Your beans always win over defaults.</li>
</ol>
<h3 class="sec">application.yml — layered truth</h3>
<pre class="code" data-lang="yaml"><code>spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/shop
  jpa:
    hibernate.ddl-auto: validate
server:
  port: 8080
management:
  endpoints.web.exposure.include: health,info,metrics
app:
  feature-x: true          # your own typed props via @ConfigurationProperties</code></pre>
<p><b>Precedence:</b> CLI args ➜ env vars ➜ profile yml ➜ application.yml ➜ defaults.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Boot Cheat Sheet',
html: `<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><h5>🚀 Starters = bundles</h5><ul><li><code>spring-boot-starter-web</code> REST+Tomcat</li><li><code>-data-jpa</code> Hibernate+Hikari</li><li><code>-security</code> filters+JWT hooks</li><li><code>-test</code> JUnit5+Mockito</li></ul></div>
<div class="cardx" style="--rc:#256c29"><h5>🩺 Actuator essentials</h5><ul><li><code>/health</code> liveness/readiness</li><li><code>/metrics</code> Prometheus feed</li><li><code>/env,/beans</code> debug (secure them!)</li></ul></div>
<div class="cardx" style="--rc:#155fae"><h5>🧪 Test slices</h5><p><code>@WebMvcTest</code> controllers only · <code>@DataJpaTest</code> repos on H2 · full <code>@SpringBootTest</code> sparingly (slow).</p></div>
<div class="cardx" style="--rc:#b28900"><h5>📦 Fat jar anatomy</h5><p>Nested-jar loader runs your app: <code>java -jar app.jar</code> — no external Tomcat, container-friendly.</p></div>
</div>
<div class="callout warn"><span class="ct">⚠️ ddl-auto in prod</span>Never <code>update/create</code> against production schemas — use Flyway/Liquibase migrations; keep <code>validate</code>.</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">What makes Boot opinionated?</div><div class="a">Chosen defaults (Tomcat, Jackson, HikariCP) + conditional auto-config — fewer decisions, consistent setups.</div></div>
<div class="qa"><div class="q">Devtools vs profiles?</div><div class="a">Devtools = dev-only restart/live-reload conveniences, disabled when packaged. Profiles = environment-specific configuration identity.</div></div>
<div class="qa"><div class="q">@Value vs @ConfigurationProperties?</div><div class="a">@Value for single scalars; ConfigurationProperties binds typed hierarchies with validation — prefer it for app config blocks.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>Boot recipe: “<b>Starter</b> brings food, <b>Auto-config</b> cooks it, <b>yml</b> seasons it, <b>Actuator</b> tastes it 🥄.”</div>`});

/* ===== CHAPTER 22 · REST API Mastery ===== */
B.chapter('p4', 22, 'REST API Design');
B.spread(
{ kicker: 'PART IV · SPRING & MICROSERVICES', head: 'Ch 22 · REST',
html: `<h2 class="chap"><span class="chnum">CHAPTER 22</span>REST APIs — Resources, Verbs &amp; Statuses</h2>
<p class="dropcap">REST models <strong>nouns (resources)</strong> addressed by URIs, manipulated through HTTP verbs whose semantics carry the meaning. Plural nouns, no verbs in paths, hierarchy shallow.</p>
<table class="tbl">
<tr><th>Verb</th><th>Meaning</th><th>Safe?</th><th>Idempotent?</th></tr>
<tr><td>GET</td><td>read</td><td class="yes">yes</td><td class="yes">yes</td></tr>
<tr><td>POST</td><td>create / process</td><td class="no-tx">no</td><td class="no-tx">no ⚠️</td></tr>
<tr><td>PUT</td><td>full replace</td><td class="no-tx">no</td><td class="yes">yes</td></tr>
<tr><td>PATCH</td><td>partial update</td><td class="no-tx">no</td><td class="mid">usually</td></tr>
<tr><td>DELETE</td><td>remove</td><td class="no-tx">no</td><td class="yes">yes</td></tr>
</table>
<pre class="code" data-lang="java"><code>@RestController
@RequestMapping("/api/v1/orders")
class OrderController {
    @GetMapping("/{id}") OrderDto get(@PathVariable Long id) {...}
    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    OrderDto create(@Valid @RequestBody CreateOrder req) {...}
    @PatchMapping("/{id}") OrderDto patch(...) {...}
}
@RestControllerAdvice class Errors {
  @ExceptionHandler(NotFoundException.class)
  ProblemDetail nf(NotFoundException e){ return ProblemDetail
      .forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage()); }
}</code></pre>
<p class="fs13">📌 Statuses worth memorizing: 200/201/204 · 400 validation · 401 unauthenticated · 403 forbidden · 404 · 409 conflict · 422 semantic error · 429 throttled · 500/503.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Design Cheat Sheet',
html: `<table class="tbl">
<tr><th>❌ Smelly</th><th>✔ RESTful</th></tr>
<tr><td><code>POST /getOrders?id=3</code></td><td><code>GET /orders/3</code></td></tr>
<tr><td><code>POST /deleteUser</code></td><td><code>DELETE /users/7</code></td></tr>
<tr><td><code>POST /users/7/makeAdmin</code></td><td><code>PATCH /users/7 {"role":"ADMIN"}</code></td></tr>
<tr><td>200 with error body</td><td>proper 4xx + ProblemDetail</td></tr>
</table>
<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><h5>🧭 Pagination standard</h5><p><code>GET /orders?page=2&amp;size=20&amp;sort=createdAt,desc</code> → return page metadata + links.</p></div>
<div class="cardx" style="--rc:#6a1b9a"><h5>🏷 Versioning options</h5><ul><li>Path: <code>/v1/orders</code> (clearest)</li><li>Header: <code>Accept-version: 1</code></li><li>Date-based headers at scale</li></ul></div>
<div class="cardx" style="--rc:#155fae"><h5>🔐 Idempotency-Key header</h5><p>Clients retry POSTs safely: server stores key→result once; replays return stored response (payments 101).</p></div>
<div class="cardx" style="--rc:#b28900"><h5>📄 OpenAPI/Swagger</h5><p>springdoc-openapi generates live docs + UI from annotations — contract-first discussions made easy.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">PUT vs PATCH?</div><div class="a">PUT replaces the whole representation (send every field); PATCH applies partial diff. PUT idempotent by definition; PATCH usually but depends on semantics.</div></div>
<div class="qa"><div class="q">401 vs 403?</div><div class="a">401 “who are you?” (missing/invalid credentials); 403 “I know you — still no” (insufficient rights).</div></div>
<div class="qa"><div class="q">POST twice created duplicates — fix?</div><div class="a">Idempotency-Key header + dedupe store, or design natural keys so retry conflicts as 409 instead of duplicating.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“URLs are NOUNS 🔤, methods are VERBS 💬, statuses are MOODS 😤.”</div>`});

/* ===== CHAPTER 23 · JPA & Hibernate ===== */
B.chapter('p4', 23, 'JPA & Hibernate');
B.spread(
{ kicker: 'PART IV · SPRING & MICROSERVICES', head: 'Ch 23 · JPA',
html: `<h2 class="chap"><span class="chnum">CHAPTER 23</span>JPA/Hibernate — Objects Meet Tables</h2>
<pre class="code" data-lang="java"><code>@Entity @Table(name = "orders")
class Order {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    @ManyToOne(fetch = FetchType.LAZY)          // ⭐ always explicit
    Customer customer;
    @OneToMany(mappedBy = "order", cascade = ALL, orphanRemoval = true)
    List&lt;OrderLine&gt; lines = new ArrayList&lt;&gt;();
}</code></pre>
<ul>
<li><b>Owning side:</b> the side WITHOUT <code>mappedBy</code> holds the FK column — sync BOTH sides in code.</li>
<li><b>N+1 killer:</b> 100 orders × lazy customer = 101 queries! Fix: <code>join fetch</code> JPQL, <code>@EntityGraph</code>, or <code>default_batch_fetch_size</code>.</li>
<li><b>Persistence context:</b> first-level cache; same row → same instance; dirty checking auto-UPDATEs managed entities at flush.</li>
<li><b>States:</b> transient (new) → managed (attached) → detached (context closed) → removed.</li>
<li><b>SEQUENCE beats IDENTITY</b> for batching (IDENTITY disables JDBC batching).</li>
</ul>
<pre class="code" data-lang="java"><code>@Transactional(readOnly = true)
List&lt;Order&gt; open() {
  return em.createQuery("select o from Order o join fetch o.customer"
        + " where o.status = :s", Order.class)
        .setParameter("s", OPEN).getResultList();
}</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'Transactions & Traps',
html: `<table class="tbl">
<tr><th>@Transactional propagation</th><th>Behaviour when tx exists</th></tr>
<tr><td>REQUIRED (default)</td><td>join it</td></tr>
<tr><td>REQUIRES_NEW</td><td>suspend outer, start fresh ✔ audit logs</td></tr>
<tr><td>NESTED</td><td>savepoint inside outer</td></tr>
<tr><td>SUPPORTS / MANDATORY / NEVER</td><td>optional / demand / forbid</td></tr>
</table>
<div class="grid g2">
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Rollback rule surprise</h5><p>Only RuntimeException/Error roll back by default — checked exceptions COMMIT unless <code>rollbackFor</code> says otherwise!</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Self-invocation</h5><p>Calling <code>this.transactionalMethod()</code> skips the proxy → no transaction. Extract bean or use self-injection carefully.</p></div>
<div class="cardx" style="--rc:#155fae"><h5>📌 save vs saveAndFlush</h5><p>save queues SQL; saveAndFlush forces now — needed when a native query in same tx must see it.</p></div>
<div class="cardx" style="--rc:#6a1b9a"><h5>📌 Optimistic locking</h5><p><code>@Version Long version;</code> → UPDATE … WHERE version=? ; stale writes fail with OptimisticLockException.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">getReferenceById vs findById?</div><div class="a">getReference returns a lazy proxy WITHOUT hitting DB (throws on access if missing); findById loads eagerly and returns Optional.</div></div>
<div class="qa"><div class="q">Why avoid EAGER collections?</div><div class="a">Cartesian-product joins explode rows/memory across every load; LAZY + targeted fetch joins keep queries purposeful.</div></div>
<div class="qa"><div class="q">First vs second level cache?</div><div class="a">L1: per-EntityManager identity map (always on). L2: shared across contexts via Ehcache/Redis — opt-in, mind invalidation.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“The OWNING side carries the foreign key 🔑 — mappedBy is just its mirror.”</div>`});
})();
