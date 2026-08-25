/* ===== CHAPTERS 48–49 · Interview Playbook & Finale ===== */
(function () {
var B = window.BOOK;
B.chapter('pf', 48, 'The Interview Playbook');

/* spread 1 */
B.spread(
{ kicker: 'FINALE · INTERVIEW PLAYBOOK', head: 'Ch 48 · Strategy',
html: `<h2 class="chap"><span class="chnum">CHAPTER 48</span>The Playbook — Turning Knowledge Into Offers 🎯</h2>
<h3 class="sec">Resume bullets that survive 6-second scans</h3>
<p><b>X-Y-Z:</b> “Built <em>X</em> using <em>Y</em> improving <em>Z by N%</em>.” Numbers beat adjectives; projects beat course lists; GitHub link must show clean commits.</p>
<h3 class="sec">DSA rounds — Java-specific edge</h3>
<ul>
<li>Default to <code>ArrayList</code>, reach for <code>HashMap/HashSet</code> when counting/lookup appears, <code>ArrayDeque</code> for stacks/queues, <code>PriorityQueue</code> for top-k.</li>
<li>Master the big five patterns: Two Pointers · Sliding Window · Binary Search on answer · BFS/DFS grids-graphs · DP (1-D first).</li>
<li>Narrate: restate → brute force aloud → optimize → state complexity → THEN type. Silence reads as panic.</li>
<li>Edge cases you announce unprompted: empty input, single element, duplicates, overflow (use long!), negatives.</li>
</ul>
<h3 class="sec">Core-Java & system rounds</h3>
<p>This book's <strong>Interview Radar</strong> boxes ARE the syllabus — revise them the night before. For HLD, rehearse ONE design end-to-end (URL shortener here!) until transitions feel natural.</p>`},
{ kicker: 'VISUAL GUIDE', head: '30-Day War Plan',
html: `<div class="figframe"><div class="figtitle">Four weeks, four battles 💪</div>
<svg class="diagram" viewBox="0 0 540 120">
  <rect x="10" y="26" width="118" height="66" rx="10" class="dg"/><text x="69" y="48" text-anchor="middle" class="dt" font-weight="700">WEEK 1</text><text x="69" y="68" text-anchor="middle" class="dts">Part I + II core</text><text x="69" y="84" text-anchor="middle" class="dts">50 easy-medium DSA</text>
  <rect x="146" y="26" width="118" height="66" rx="10" class="do_"/><text x="205" y="48" text-anchor="middle" class="dt" font-weight="700">WEEK 2</text><text x="205" y="68" text-anchor="middle" class="dts">Collections·Streams·Threads</text><text x="205" y="84" text-anchor="middle" class="dts">JVM internals ×2 revision</text>
  <rect x="282" y="26" width="118" height="66" rx="10" class="dp"/><text x="341" y="48" text-anchor="middle" class="dt" font-weight="700">WEEK 3</text><text x="341" y="68" text-anchor="middle" class="dts">Spring·REST·MS·DB</text><text x="341" y="84" text-anchor="middle" class="dts">1 LLD daily</text>
  <rect x="418" y="26" width="112" height="66" rx="10" class="dr2"/><text x="474" y="48" text-anchor="middle" class="dt" font-weight="700">WEEK 4</text><text x="474" y="68" text-anchor="middle" class="dts">HLD drills + mocks</text><text x="474" y="84" text-anchor="middle" class="dts">Radar boxes ×3 passes</text>
  <path d="M130 59 h14 M266 59 h14 M402 59 h14" class="dl"/>
</svg></div>
<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><h5>⭐ S.T.A.R. stories (behavioral)</h5><p>Situation · Task · Action · Result — prewrite 6: conflict · failure · deadline · leadership · disagreement · initiative. Reuse shamelessly.</p></div>
<div class="cardx" style="--rc:#b71c1c"><h5>🪤 Top rejection causes</h5><ul><li>Silent problem-solving</li><li>No complexity analysis</li><li>Shallow “why” behind frameworks</li><li>Blaming teammates in stories</li></ul></div>
</div>
<div class="callout tip"><span class="ct">💡 Mock cadence</span>2 mocks/week minimum (Pramp/peers). Record yourself — filler words and dead air vanish fast when confronted.</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“An interview is open-book 📖 — if the book is your prepared stories.”</div>`});

/* Chapter 48 · spread 2 — the rounds & the close */
B.spread(
{ kicker: 'FINALE · INTERVIEW PLAYBOOK', head: 'Ch 48 · Round Day',
html: `<h2 class="chap"><span class="chnum">CHAPTER 48 · CONT.</span>Round-Day Script &amp; The Close</h2>
<h3 class="sec">HLD round, minute-by-minute script</h3>
<p>0–5 restate requirements &amp; assumptions ➜ 5–10 estimates aloud ➜ 10–15 API + schema ➜ 15–30 draw boxes while NARRATING choices ➜ 30–40 deep-dive the risky part ➜ 40–45 bottlenecks, monitoring, “what would I change at 10×”.</p>
<h3 class="sec">Saying “I don't know” like a senior</h3>
<p>“I haven't used X, but based on Y I'd expect Z — does that match?” Reasoning aloud converts ignorance into signal. Never bluff specifics.</p>
<h3 class="sec">Your questions (yes, they're evaluated)</h3>
<ul>
<li>“What does the on-call rotation look like?”</li><li>“Biggest technical debt on this team?”</li><li>“How do decisions get made — RFCs, leads, consensus?”</li><li>“What would success look like in 6 months?”</li>
</ul>
<h3 class="sec">Offer talk, one paragraph</h3>
<p>Get competing timelines aligned, discuss TOTAL comp (base/bonus/stock), anchor with market data, be warm but firm: “I'm excited; to sign this week I'd need base at X.” Silence is leverage — use pauses.</p>`},
{ kicker: 'VISUAL GUIDE', head: 'Final Checklist',
html: `<div class="grid g2">
<div class="cardx" style="--rc:#26418f"><h5>🌙 Night before</h5><ul><li>Radar boxes skim ×1</li><li>Two STAR stories rehearsed</li><li>Laptop/cam/audio tested</li><li>Sleep &gt; cramming — memory consolidates 😴</li></ul></div>
<div class="cardx" style="--rc:#256c29"><h5>☀️ Hour before</h5><ul><li>Water + rough paper + pen</li><li>IDE shortcuts warmed up</li><li>Breathe 4-7-8 ×3 rounds</li><li>Posture: shoulders back, smile</li></ul></div>
<div class="cardx" style="--rc:#b28900"><h5>✉️ After</h5><ul><li>Thank-you note ≤ 5 lines</li><li>Name one discussion point specifically</li><li>If rejected: politely request feedback — gold dust.</li></ul></div>
<div class="cardx" style="--rc:#c0392b"><h5>🔁 If no offer</h5><p>Log every question within 24 h into your “miss file”. Re-attempt cold in 72 h — spaced repetition applies to interviews too.</p></div>
</div>
<div class="figframe"><div class="figtitle">The offer funnel — expect it, don't fear it</div>
<svg class="diagram" viewBox="0 0 540 92">
  <rect x="12" y="26" width="100" height="40" rx="20" class="dg"/><text x="62" y="51" text-anchor="middle" class="dts">apply ×25</text>
  <rect x="128" y="26" width="104" height="40" rx="20" class="do_"/><text x="180" y="51" text-anchor="middle" class="dts">OA ×8</text>
  <rect x="248" y="26" width="110" height="40" rx="20" class="dp"/><text x="303" y="51" text-anchor="middle" class="dts">loops ×4</text>
  <rect x="374" y="26" width="152" height="40" rx="20" fill="#ffe9c9" stroke="#cf9040"/><text x="450" y="51" text-anchor="middle" class="dts">OFFERS 1–3 🎉</text>
  <path d="M114 46 h12 M234 46 h12 M360 46 h12" class="dl"/>
</svg></div>
<div class="callout radar"><span class="ct">📡 Interview Radar</span>
<div class="qa"><div class="q">Stuck mid-problem with time bleeding?</div><div class="a">State brute force + code it cleanly, mark optimization TODO, narrate the better approach verbally. Partial correct &gt; silent blank.</div></div>
<div class="qa"><div class="q">Interviewer keeps pushing deeper?</div><div class="a">That's a GOOD sign — they're probing ceiling. Stay curious, think out loud, concede unknown edges honestly.</div></div>
</div>
<div class="callout hook"><span class="ct">🎯 Memory hook</span>“Companies hire SIGNALS: clarity, honesty, momentum. Broadcast all three 🔊.”</div>`});
/* ===== CHAPTER 49 · The Finish Line ===== */
B.chapter('pf', 49, 'The Finish Line');
B.spread(
{ kicker: 'EPILOGUE', head: 'You Made It',
html: `<h2 class="chap"><span class="chnum">CHAPTER 49 · THE END</span>A Letter To The Reader Who Finished</h2>
<p class="dropcap">If you've turned this final page, you hold more interview-ready Java knowledge than most engineers refresh yearly. From a humble <code>public static void main</code> to circuit breakers singing across microservices — the map is yours. What separates offers from wishes is only <strong>repetition and reps</strong>.</p>
<h3 class="sec">Build these three portfolio projects 🛠️</h3>
<ul>
<li><b>URL shortener</b> — Spring Boot + Redis + Postgres + Docker Compose + tests (this book designed it!).</li>
<li><b>Mini e-commerce</b> — order/payment/inventory services + Kafka saga + outbox + Resilience4j + tracing demo.</li>
<li><b>Realtime chat / leaderboard</b> — WebSocket or virtual threads + Redis sorted sets — fun &amp; differentiating.</li>
</ul>
<h3 class="sec">Keep the streak alive</h3>
<ul>
<li>Contribute ONE PR monthly to an OSS Java repo — docs count!</li>
<li>Re-read this book's Interview Radars quarterly (spaced repetition 😉).</li>
<li>Teach one concept weekly — blog post, junior session, thread. Teaching is the final boss of learning.</li>
</ul>`},
{ kicker: 'CERTIFICATE OF GRIT', head: 'Claim It',
html: `<div class="cert">
<div style="font:700 11px 'Fira Code',monospace;letter-spacing:.3em;color:#a34e00">JAVA · ZERO → FAANG</div>
<h2 style="font-family:'Playfair Display',serif;margin:8px 0 2px;font-size:26px;color:#201509">Certificate of Completion</h2>
<p style="font-style:italic;margin:2px 0 10px">proudly presented to</p>
<div style="border-bottom:2px dotted #8a7763;width:70%;margin:0 auto 12px;font:600 20px 'Playfair Display',serif">&nbsp;</div>
<p style="font-size:13.5px;margin:0">who journeyed from <b>Hello, World</b> to <b>System Design</b>,<br>and lived to flip every page. Now go get that offer. ☕🚀</p>
</div>
<div class="figframe"><div class="figtitle">Where each part pays off</div>
<table class="tbl">
<tr><th>Round</th><th>Chapters to thank</th></tr>
<tr><td>Online assessment / DSA</td><td>I · II (collections speed!) + practice reps</td></tr>
<tr><td>Core Java screen</td><td>I · II radars — verbatim gold</td></tr>
<tr><td>LLD round</td><td>III (SOLID · patterns · parking lot)</td></tr>
<tr><td>Framework deep-dive</td><td>IV (Spring / REST / JPA / MS)</td></tr>
<tr><td>HLD round</td><td>V (+ the URL-shortener script)</td></tr>
<tr><td>Hiring-manager chat</td><td>VI projects + Finale stories</td></tr>
</table></div>
<div class="callout tip"><span class="ct">💡 One last secret</span>Nobody FEELS ready. The ready-feeling arrives during interviews you already prepped for. Book one today 📅.</div>
<p class="center" style="font:italic 600 17px 'Crimson Pro',serif;margin-top:14px">— The End. Now write your beginning. ☕</p>`});
})();
