/* ===== CHAPTERS 28–31 · Git, Docker, K8s, Cloud ===== */
(function () {
var B = window.BOOK;
B.chapter('p6', 28, 'Git Essentials');

/* Chapter 28 */
B.spread(
{ kicker: 'PART VI · DEVOPS & CLOUD', head: 'Ch 28 · Git',
html: `<h2 class="chap"><span class="chnum">CHAPTER 28</span>Git — The Time Machine Every Team Runs On</h2>
<p class="dropcap">Git stores <strong>snapshots, not diffs</strong>. A commit is an immutable node pointing to its parent — branches are just movable stickers on nodes. Internalize this and every command stops being magic.</p>
<h3 class="sec">Daily dozen</h3>
<pre class="code" data-lang="bash"><code>git switch -c feat/paypal        # branch + move
git add -p                       # stage in hunks (review!)
git commit -m "feat: paypal gateway"
git pull --rebase origin main    # linear history, no merge bubbles
git push -u origin feat/paypal   # open PR → review → squash-merge
git log --oneline --graph --all
git restore --staged file        # unstage safely
git reset --soft HEAD~1          # undo commit, keep changes
git reflog                       # your safety net 🪢
git stash push -m wip            # park work mid-flight</code></pre>
<h3 class="sec">Team workflows</h3>
<ul>
<li><b>GitHub flow:</b> main is truth → short-lived feature branches → PR review → squash → deploy (CI/CD friendly).</li>
<li><b>Trunk-based:</b> tiny branches merged daily behind flags — FAANG favorite.</li>
<li>Resolve conflicts locally, rebase onto main, force-push ONLY your own branch (<code>--force-with-lease</code>).</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'Branch Model',
html: `<div class="figframe"><div class="figtitle">GitHub flow in one picture</div>
<svg class="diagram" viewBox="0 0 540 140">
  <circle cx="30" cy="70" r="11" class="do_"/><circle cx="90" cy="70" r="11" class="do_"/><circle cx="330" cy="70" r="11" class="do_"/><circle cx="420" cy="70" r="11" class="do_"/><circle cx="500" cy="70" r="11" fill="#e9c46a" stroke="#a9713a"/>
  <path d="M41 70 h38 M101 70 h218 M341 70 h68 M431 70 h58" class="dl"/>
  <text x="60" y="98" text-anchor="middle" class="dts">main ───────────────────────────────▶ deploy 🚀</text>
  <path d="M95 62 C130 20 190 20 220 52" class="dl"/><circle cx="222" cy="54" r="10" class="dp"/>
  <path d="M232 50 C260 26 290 30 322 62" class="dl"/><text x="196" y="16" text-anchor="middle" class="dts">feature branch → PR → squash</text>
  <text x="252" y="44" class="dts">rebase first!</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 Commit hygiene</h5><p>Conventional commits (<code>feat:</code>/<code>fix:</code>/<code>chore:</code>) power auto-changelogs and readable history.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Rebase rule</h5><p>Never rewrite PUBLIC/shared branches — rebase only your unmerged work.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">merge vs rebase?</div><div class="a">Merge preserves true topology (extra commit); rebase replays commits for a linear story — cleaner logs, rewrites hashes.</div></div>
<div class="qa"><div class="q">How do you undo “already pushed” mistakes?</div><div class="a"><code>git revert</code> creates inverse commit (safe). <code>reset</code>+force-push only on private branches.</div></div>
<div class="qa"><div class="q">What is a detached HEAD?</div><div class="a">You checked out a commit, not a branch — commits made there are orphans until you branch them.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Branches are stickers 🏷️ on snapshot dots — nothing else exists.”</div>`});

/* ===== CHAPTER 29 · Docker ===== */
B.chapter('p6', 29, 'Docker & Containers');

/* spread 1 */
B.spread(
{ kicker: 'PART VI · DEVOPS & CLOUD', head: 'Ch 29 · Containers',
html: `<h2 class="chap"><span class="chnum">CHAPTER 29</span>Docker — Ship The Machine With The App 🐳</h2>
<p class="dropcap">A VM virtualizes hardware (guest OS per box, GBs heavy). A <strong>container</strong> virtualizes only the OS view — processes share the host kernel inside isolated namespaces+cgroups. Result: MB-sized, millisecond-starting “ships” 🚢.</p>
<table class="tbl">
<tr><th></th><th>VM</th><th>Container</th></tr>
<tr><td>Guest OS</td><td class="no-tx">Full copy each</td><td class="yes">None — shared kernel</td></tr>
<tr><td>Size / boot</td><td>GBs / minutes</td><td class="yes">MBs / ms</td></tr>
<tr><td>Density per host</td><td>~10s</td><td class="yes">~100s+</td></tr>
</table>
<h3 class="sec">Images are stacked layers</h3>
<pre class="code" data-lang="bash"><code>docker build -t shop/api:1.0 .
docker run -d -p 8080:8080 -e SPRING_PROFILES_ACTIVE=prod shop/api:1.0
docker ps · logs -f · exec -it sh   # operate living containers
docker compose up                    # app + db + redis locally</code></pre>
<pre class="code" data-lang="bash"><code># layer-cache friendly ordering ⭐ deps BEFORE your code
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline      # cached unless pom changes!
COPY src ./src
RUN mvn -q package

FROM eclipse-temurin:21-jre       # slim runtime only
COPY --from=build /app/target/app.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]</code></pre>`},
{ kicker: 'VISUAL GUIDE', head: 'Layer Cake',
html: `<div class="figframe"><div class="figtitle">Image layers → one container</div>
<svg class="diagram" viewBox="0 0 540 150">
  <rect x="70" y="104" width="180" height="30" rx="6" class="db"/><text x="160" y="124" text-anchor="middle" class="dts">base OS (ubuntu-slim)</text>
  <rect x="70" y="74" width="180" height="28" rx="6" class="dg"/><text x="160" y="93" text-anchor="middle" class="dts">JRE 21 layer</text>
  <rect x="70" y="46" width="180" height="26" rx="6" class="do_"/><text x="160" y="64" text-anchor="middle" class="dts">app.jar layer (yours)</text>
  <rect x="70" y="16" width="180" height="28" rx="6" fill="#ffe9c9" stroke="#cf9040" stroke-dasharray="5 4"/><text x="160" y="35" text-anchor="middle" class="dts">writable layer (ephemeral)</text>
  <path d="M252 90 h44" class="dl"/><polygon points="300,90 292,86 292,94" fill="#8a5a33"/>
  <rect x="304" y="58" width="222" height="66" rx="10" class="dp"/><text x="415" y="82" text-anchor="middle" class="dt" font-weight="700">SHARED LAYERS ♻</text>
  <text x="415" y="102" text-anchor="middle" class="dts">same base across containers = disk savings</text>
  <text x="415" y="118" text-anchor="middle" class="da">& rebuild speed via cache</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 CMD vs ENTRYPOINT</h5><p>ENTRYPOINT = fixed program; CMD = default args you may override at <code>docker run</code>.</p></div>
<div class="cardx" style="--rc:#256c29"><h5>💾 Volumes</h5><p>Named volumes for DB data (managed), bind mounts for dev hot-reload. Containers are cattle 🐄 — state lives outside.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 root user</h5><p>Add <code>USER 1001</code>; drop caps; scan images (trivy) — supply-chain questions love this.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Image vs container?</div><div class="a">Image = immutable layered template; container = running instance adding a thin writable layer.</div></div>
<div class="qa"><div class="q">Why multi-stage builds?</div><div class="a">Compile with JDK/Maven stage, ship only jar+JRE stage — final image ~200 MB instead of ~1 GB, smaller attack surface.</div></div>
<div class="qa"><div class="q">COPY order matter?</div><div class="a">Hugely — layers cache top-down; put rarely-changing steps (deps) before frequently-changing source.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Image = frozen recipe 📜 in layers; container = tonight's dish 🍲 (plus scribbles on a sticky note).”</div>`});

/* Chapter 29 · spread 2 — compose, networking, ops */
B.spread(
{ kicker: 'PART VI · DEVOPS & CLOUD', head: 'Ch 29 · Compose & Ops',
html: `<h2 class="chap"><span class="chnum">CHAPTER 29 · CONT.</span>Docker Compose &amp; Container Ops</h2>
<p class="dropcap">One app container is a toy; systems need app + DB + cache + broker. <strong>Compose</strong> declares the whole neighborhood in one YAML and wires a private network automatically.</p>
<pre class="code" data-lang="yaml"><code>services:
  api:
    build: .
    ports: ["8080:8080"]
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/shop
    depends_on:
      db: { condition: service_healthy }
  db:
    image: postgres:16
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
volumes: { pgdata: }</code></pre>
<ul>
<li><b>Service DNS:</b> containers reach each other BY NAME on the compose network (<code>jdbc:postgresql://db…</code>) — no IPs.</li>
<li><b>Healthchecks</b> gate startup order — the polite version of sleep(10).</li>
<li><b>Logs &amp; limits:</b> json-file rotation, <code>--memory --cpus</code> caps so one noisy jar can't starve neighbors.</li>
<li><b>Secrets:</b> never bake .env into images — inject at runtime (vaults/K8s secrets).</li>
</ul>
<h3 class="sec">Production checklist ✅</h3>
<ul>
<li>Multi-stage build · non-root USER · pinned digests not :latest</li>
<li>JVM in containers: use <code>-XX:MaxRAMPercentage=75</code>, respect cgroup limits (container-aware since JDK 10+)</li>
<li>Graceful shutdown: SIGTERM handler closes pool before exit</li>
</ul>`},
{ kicker: 'VISUAL GUIDE', head: 'Compose Topology',
html: `<div class="figframe"><div class="figtitle">What “docker compose up” builds</div>
<svg class="diagram" viewBox="0 0 540 160">
  <rect x="14" y="14" width="512" height="132" rx="12" class="dg"/><text x="270" y="34" text-anchor="middle" class="dt" font-weight="700">bridge network “shop_default”</text>
  <rect x="44" y="52" width="120" height="60" rx="9" class="do_"/><text x="104" y="76" text-anchor="middle" class="dts" font-weight="700">api 🌶</text><text x="104" y="94" text-anchor="middle" class="dts">8080 exposed</text>
  <rect x="220" y="52" width="120" height="60" rx="9" class="db"/><text x="280" y="76" text-anchor="middle" class="dts" font-weight="700">db 🐘</text><text x="280" y="94" text-anchor="middle" class="dts">volume pgdata 💾</text>
  <rect x="396" y="52" width="110" height="60" rx="9" class="dp"/><text x="451" y="76" text-anchor="middle" class="dts" font-weight="700">redis ⚡</text><text x="451" y="94" text-anchor="middle" class="dts">cache</text>
  <path d="M166 82 h52 M342 82 h52" class="dl"/>
  <text x="196" y="74" text-anchor="middle" class="dts">by name!</text><text x="368" y="74" text-anchor="middle" class="dts">tcp 5432</text>
  <text x="270" y="136" text-anchor="middle" class="dts">host ➜ -p 8080:8080 ➜ only api answers outside 🔓</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>🧰 Debug kit</h5><ul><li><code>compose logs -f api</code></li><li><code>docker exec -it api sh</code></li><li><code>stats</code> live CPU/mem</li><li><code>events</code> lifecycle stream</li></ul></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 JVM ignores limits?</h5><p>Pre-JDK10 ergonomics misread cgroups → OOMKilled pods. Modern JDK sees them; still set heap % explicitly.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Container dies randomly in prod — investigate?</div><div class="a"><code>docker inspect</code> exit code + OOMKilled flag, memory caps vs JVM heap, logs tail, healthcheck flaps — then fix limits/graceful shutdown.</div></div>
<div class="qa"><div class="q">Compose vs Kubernetes?</div><div class="a">Compose = single-host dev orchestration; K8s = multi-node scheduling, self-healing, scaling — next chapter 😉.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>Compose chant: “<b>Name them · Health-gate them · Volume their memories · Cap their appetites 🍰</b>”.</div>`});

/* ===== CHAPTER 30 · Kubernetes ===== */
B.chapter('p6', 30, 'Kubernetes Basics');
B.spread(
{ kicker: 'PART VI · DEVOPS & CLOUD', head: 'Ch 30 · K8s',
html: `<h2 class="chap"><span class="chnum">CHAPTER 30</span>Kubernetes — The Self-Healing Fleet 🛳️</h2>
<p class="dropcap">Docker runs containers; <strong>Kubernetes</strong> runs <em>fleets</em>: scheduling across nodes, restarting dead pods, scaling on load, rolling releases. You declare DESIRED state in YAML; controllers reconcile reality toward it forever.</p>
<h3 class="sec">Objects you must name-drop fluently</h3>
<ul>
<li><b>Pod</b> — smallest unit: one or more containers sharing IP+volumes.</li>
<li><b>Deployment</b> — owns ReplicaSets → N identical pods; rolling updates &amp; rollbacks.</li>
<li><b>Service</b> — stable virtual IP/DNS over wobbling pods (ClusterIP internal · LoadBalancer cloud).</li>
<li><b>Ingress</b> — HTTP router/TLS front door.</li>
<li><b>ConfigMap / Secret</b> — config &amp; credentials injected as env/files.</li>
<li><b>HPA</b> — autoscaler watching CPU/metrics → changes replica count.</li>
</ul>
<pre class="code" data-lang="bash"><code>kubectl get pods -o wide · logs -f POD · describe pod POD
kubectl apply -f deploy.yaml        # declarative ⭐
kubectl rollout undo deploy/api     # instant rollback
kubectl scale deploy/api --replicas=6
kubectl port-forward svc/api 8080:8080   # local poke</code></pre>
<h3 class="sec">Probes — health as code</h3>
<p><strong>Liveness</strong> fails → kubelet RESTARTS container. <strong>Readiness</strong> fails → removed from Service endpoints (no traffic) but not killed. <strong>Startup</strong> shields slow-booting JVMs from premature kills.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Cluster Picture',
html: `<div class="figframe"><div class="figtitle">Control plane + workers</div>
<svg class="diagram" viewBox="0 0 540 200">
  <rect x="14" y="12" width="512" height="52" rx="11" class="dg"/><text x="270" y="32" text-anchor="middle" class="dt" font-weight="700">CONTROL PLANE</text>
  <text x="60" y="52" class="dts">API server 🚪</text><text x="180" y="52" class="dts">etcd 💾 desired state</text><text x="330" y="52" class="dts">Scheduler 🧭</text><text x="440" y="52" class="dts">Controllers 🔁</text>
  <rect x="14" y="76" width="244" height="112" rx="11" class="db"/><text x="136" y="96" text-anchor="middle" class="dts" font-weight="700">NODE-1 (kubelet)</text>
  <rect x="28" y="104" width="100" height="30" rx="7" class="do_"/><text x="78" y="124" text-anchor="middle" class="dts">pod api-a</text>
  <rect x="140" y="104" width="100" height="30" rx="7" class="do_"/><text x="190" y="124" text-anchor="middle" class="dts">pod api-b</text>
  <text x="136" y="160" text-anchor="middle" class="dts">Service VIP → endpoints ✔ ready only</text>
  <rect x="272" y="76" width="254" height="112" rx="11" class="db"/><text x="399" y="96" text-anchor="middle" class="dts" font-weight="700">NODE-2</text>
  <rect x="286" y="104" width="100" height="30" rx="7" class="dp"/><text x="336" y="124" text-anchor="middle" class="dts">pod api-c</text>
  <rect x="398" y="104" width="114" height="30" rx="7" class="dr2"/><text x="455" y="118" text-anchor="middle" class="dts">crashed ✖</text>
  <text x="455" y="130" text-anchor="middle" class="da">replaced automatically ♻</text>
  <path d="M270 64 v12 M138 88 v16 M399 88 v16" class="dl dash"/>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>🔄 Rolling update anatomy</h5><p>New ReplicaSet spins pod → waits READY probe → old set scales down, surge continues → history kept for <code>undo</code>.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 CrashLoopBackOff</h5><p>App dies at boot: bad config/secret, DB unreachable, OOM at limits — read <code>describe</code> events BEFORE guessing.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Deployment vs StatefulSet?</div><div class="a">Deployments: interchangeable stateless pods. StatefulSet: stable names + ordered boot + per-pod volumes (kafka, zookeeper). Databases? Often managed services instead.</div></div>
<div class="qa"><div class="q">What is a sidecar?</div><div class="a">Helper container in the same pod sharing network/volumes — log shippers, proxies (Envoy/Istio), auth agents.</div></div>
<div class="qa"><div class="q">Requests vs limits?</div><div class="a">Request = guaranteed reservation for scheduling; limit = ceiling; exceeding memory limit → OOMKill, exceeding CPU → throttled.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“K8s is a hotel manager 🏨 — your YAML is the booking; staff keep rooms exactly as promised.”</div>`});

/* ===== CHAPTER 31 · Cloud & CI/CD ===== */
B.chapter('p6', 31, 'Cloud (AWS) & CI/CD');

/* spread 1 */
B.spread(
{ kicker: 'PART VI · DEVOPS & CLOUD', head: 'Ch 31 · Cloud Core',
html: `<h2 class="chap"><span class="chnum">CHAPTER 31</span>Cloud — Renting Data Centers By The Second ☁️</h2>
<p class="dropcap">Cloud = elastic infrastructure billed per use, spread across <strong>Regions → Availability Zones</strong> (independent data centers). Design for AZ failure and you've answered half of all cloud interview questions.</p>
<h3 class="sec">The AWS starter seven</h3>
<table class="tbl">
<tr><th>Service</th><th>Job</th><th>Interview nugget</th></tr>
<tr><td><b>EC2</b> (+ASG)</td><td>Virtual machines</td><td>Auto Scaling Groups + ALB = classic HA web tier</td></tr>
<tr><td><b>Lambda</b></td><td>Serverless functions</td><td>Pay-per-ms; cold starts → keep jars lean / SnapStart</td></tr>
<tr><td><b>S3</b></td><td>Object storage</td><td>Infinite flat namespace; lifecycle tiers cut cost</td></tr>
<tr><td><b>RDS / Aurora</b></td><td>Managed SQL</td><td>Multi-AZ standby failover ~60 s</td></tr>
<tr><td><b>DynamoDB</b></td><td>KV at any scale</td><td>Partition-key design decides performance</td></tr>
<tr><td><b>VPC</b></td><td>Your private network</td><td>Public subnet = LB only; app/DB private ✔</td></tr>
<tr><td><b>IAM</b></td><td>Identity &amp; permissions</td><td>ROLES over access keys — never hardcode creds!</td></tr>
</table>
<p class="fs13">📌 Twelve-factor app: config via env vars, stateless processes, disposable services, logs as streams.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Reference Architecture',
html: `<div class="figframe"><div class="figtitle">Classic resilient web stack (one region)</div>
<svg class="diagram" viewBox="0 0 540 190">
  <rect x="12" y="14" width="96" height="34" rx="8" class="db"/><text x="60" y="36" text-anchor="middle" class="dts">USERS 🌍</text>
  <path d="M110 31 h22" class="dl"/>
  <rect x="134" y="14" width="120" height="34" rx="8" class="dp"/><text x="194" y="36" text-anchor="middle" class="dts">Route53 DNS</text>
  <path d="M256 31 h22" class="dl"/>
  <rect x="280" y="14" width="110" height="34" rx="8" class="do_"/><text x="335" y="36" text-anchor="middle" class="dts">CloudFront CDN</text>
  <path d="M392 31 h22" class="dl"/><polygon points="416,31 408,27 408,35" fill="#8a5a33"/>
  <rect x="418" y="14" width="108" height="34" rx="8" class="dr2"/><text x="472" y="36" text-anchor="middle" class="dts">ALB (public)</text>
  <path d="M472 50 v22" class="dl"/><polygon points="472,74 468,66 476,66" fill="#8a5a33"/>
  <rect x="150" y="76" width="380" height="44" rx="10" class="dg"/><text x="340" y="94" text-anchor="middle" class="dts" font-weight="700">PRIVATE SUBNETS · ASG: EC2 ×N across AZ-a / AZ-b</text>
  <text x="340" y="112" text-anchor="middle" class="dts">(or Lambda behind function URL)</text>
  <path d="M340 122 v18" class="dl"/><polygon points="340,142 336,134 344,134" fill="#8a5a33"/>
  <rect x="150" y="144" width="170" height="36" rx="9" class="db"/><text x="235" y="167" text-anchor="middle" class="dts">RDS MULTI-AZ 🐘🐘</text>
  <rect x="360" y="144" width="170" height="36" rx="9" class="dp"/><text x="445" y="167" text-anchor="middle" class="dts">S3 assets · ElastiCache ⚡</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>💸 Cost sense (they test it)</h5><ul><li>Right-size after metrics, don't guess</li><li>Reserved/Savings plans = steady baselines</li><li>S3 tiering + lifecycle for logs</li></ul></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Hardcoded credentials</h5><p>Leaked GitHub keys are #1 breach vector — IAM roles inject temp creds automatically.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Multi-AZ vs multi-region?</div><div class="a">AZ: HA inside a region (sync replica, minutes RTO). Region: disaster recovery (async replication, DNS failover, RPO in seconds-minutes).</div></div>
<div class="qa"><div class="q">Lambda vs EC2 for an API?</div><div class="a">Spiky/low traffic or event-driven → Lambda (zero idle cost). Steady high throughput → containers on ECS/EKS often cheaper + warmer.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Cloud = electricity 💡 — you flip switches (scale), pay per watt, and never own the power plant.”</div>`});

/* Chapter 31 · spread 2 — CI/CD & observability */
B.spread(
{ kicker: 'PART VI · DEVOPS & CLOUD', head: 'Ch 31 · Ship It',
html: `<h2 class="chap"><span class="chnum">CHAPTER 31 · CONT.</span>CI/CD &amp; Observability</h2>
<h3 class="sec">The pipeline everyone expects</h3>
<div class="timeline">
<div class="tl-item"><b>Push</b> → PR opens on GitHub/GitLab.</div>
<div class="tl-item"><b>CI:</b> build ➜ unit tests ➜ static scan (SonarQube/CodeQL) ➜ SCA + image scan.</div>
<div class="tl-item"><b>Package:</b> docker build → push tag = commit SHA (immutable!).</div>
<div class="tl-item"><b>CD:</b> auto-deploy dev → manual gate staging → <strong>canary</strong> 5% prod traffic → full rollout or auto-rollback on SLO burn.</div>
</div>
<pre class="code" data-lang="yaml"><code>name: api-ci
on: { push: { branches: [main] } }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: '21' }
      - run: mvn -B verify
      - run: docker build -t registry/api:\${{ github.sha }} .
      - run: docker push registry/api:\${{ github.sha }}</code></pre>
<h3 class="sec">Observability trio 🔭</h3>
<p><strong>Metrics</strong> Prometheus + Grafana dashboards · <strong>Logs</strong> Loki/ELK with correlation IDs · <strong>Traces</strong> OpenTelemetry → Jaeger. Alert on <em>SLO burn-rate</em>, not CPU vanity graphs.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Deploy Strategies',
html: `<table class="tbl">
<tr><th>Strategy</th><th>Mechanics</th><th>Best when</th></tr>
<tr><td><b>Blue-Green</b></td><td>Two full stacks, flip LB at once</td><td>Instant rollback, 2× cost during switch</td></tr>
<tr><td><b>Canary ⭐</b></td><td>Traffic % ramp 1→5→25→100 with metrics gate</td><td>Catch regressions on real users safely</td></tr>
<tr><td>Rolling</td><td>K8s default pod-by-pod</td><td>Simple stateless services</td></tr>
</table>
<div class="figframe"><div class="figtitle">Canary in action 🐤</div>
<svg class="diagram" viewBox="0 0 540 110">
  <rect x="14" y="30" width="90" height="40" rx="9" class="db"/><text x="59" y="55" text-anchor="middle" class="dts">users</text>
  <path d="M106 50 h26" class="dl"/><polygon points="134,50 126,46 126,54" fill="#8a5a33"/>
  <rect x="136" y="30" width="96" height="40" rx="9" class="dr2"/><text x="184" y="55" text-anchor="middle" class="dts">LB split 95/5</text>
  <path d="M234 44 h28 M234 60 h28" class="dl"/>
  <rect x="264" y="20" width="120" height="34" rx="8" class="do_"/><text x="324" y="42" text-anchor="middle" class="dts">v1 · 95% ✔ stable</text>
  <rect x="264" y="64" width="120" height="34" rx="8" class="dp"/><text x="324" y="86" text-anchor="middle" class="dts">v2 · 5% 🔍 watch</text>
  <path d="M386 80 h24 M410 80 h18" class="dl"/><polygon points="430,80 422,76 422,84" fill="#8a5a33"/>
  <rect x="432" y="62" width="98" height="36" rx="8" fill="#ffe9c9" stroke="#cf9040"/><text x="481" y="85" text-anchor="middle" class="dts">SLO ok → 100%</text>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#155fae"><h5>📌 DORA metrics flex</h5><p>Deploy frequency ↑ · lead time ↓ · change-failure ↓ · MTTR ↓ — quote these to sound senior.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Alert fatigue kills</h5><p>Every alert must be actionable &amp; page-worthy; everything else → dashboards/tickets.</p></div>
</div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Prod deploy goes bad — first 10 minutes?</div><div class="a">Rollback FIRST (revert deploy/tag), then diagnose calmly — restoring service beats root-causing live.</div></div>
<div class="qa"><div class="q">What gates a production release?</div><div class="a">Green pipeline incl. security scans, staging soak, change ticket/approval, rollback plan documented.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Ship small 🚢 ship often — the canary sings first 🐤 so users never scream.”</div>`});

})();
