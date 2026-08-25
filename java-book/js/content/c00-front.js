/* ===== Front matter: parts, About-the-book spread, TOC placeholder ===== */
(function () {
  var B = window.BOOK;

  B.part('p1', 'Part I · Core Foundations', '#26418f');
  B.part('p2', 'Part II · Advanced Java', '#6a1b9a');
  B.part('p3', 'Part III · LLD & Design Patterns', '#b28900');
  B.part('p4', 'Part IV · Spring Boot & Microservices', '#2e7d32');
  B.part('p5', 'Part V · Data & System Design (HLD)', '#c0392b');
  B.part('p6', 'Part VI · DevOps, Docker & Cloud', '#00695c');
  B.part('pd', 'Part VII · DSA Problem Bank', '#d81b60');
  B.part('pf', 'Finale · Interview Playbook', '#e76f00');

  /* ---- Spread 0 : About / how to use ---- */
  B.spread(
    { kicker: 'WELCOME, FUTURE FAANG ENGINEER', head: 'Read Me First',
      html:
      '<h2 class="chap"><span class="chnum">ABOUT THIS BOOK</span>Your One Book To Crack It All</h2>' +
      '<p class="dropcap">Most people fail Java interviews not because they are weak, but because their knowledge is <strong>scattered</strong> — ten YouTube playlists, forty tabs, zero structure. This book fixes exactly that. It walks you from <em>“what is a variable?”</em> all the way to <em>“design Instagram’s feed”</em>, in one continuous, carefully ordered story.</p>' +
      '<h3 class="sec">Who is this for?</h3>' +
      '<ul><li><strong>Students</strong> starting Java from absolute zero.</li>' +
      '<li><strong>Working devs</strong> revising before an interview marathon.</li>' +
      '<li><strong>Anyone targeting</strong> product companies (FAANG / FAANG-like) or service-company interviews alike.</li></ul>' +
      '<h3 class="sec">The golden rule of every spread</h3>' +
      '<p>The book always faces you as a two-page spread:</p>' +
      '<table class="tbl"><tr><th>Left page</th><th>Right page</th></tr>' +
      '<tr><td><strong>Theory</strong> — crisp explanations, code, tables, traps.</td>' +
      '<td><strong>Visuals</strong> — diagrams, cheat-sheets, memory hooks and the <em>Interview Radar</em>: questions examiners actually ask.</td></tr></table>' +
      '<h3 class="sec">How to study (honest advice)</h3>' +
      '<ul><li>Read left page ➜ glance right diagram ➜ close eyes ➜ explain it aloud. If you can’t, re-read.</li>' +
      '<li>Type every code sample yourself once. Muscle memory is real memory.</li>' +
      '<li>Before interviews, revisit only the <strong>Interview Radar</strong> boxes — they compress the whole book.</li></ul>' +
      '<div class="callout hook"><span class="ct">🎯 Memory hooks</span>Purple boxes give you silly-but-unforgettable mnemonics. They work. Use them.</div>' },
    { kicker: 'YOUR ROADMAP', head: 'Six Parts · Thirty-Three Chapters',
      html:
      '<div class="figframe"><div class="figtitle">The journey · Zero → Hero</div>' +
      '<div class="timeline">' +
      '<div class="tl-item"><b>Part I · Foundations</b> — variables → OOP → exceptions. The alphabet.</div>' +
      '<div class="tl-item"><b>Part II · Advanced</b> — Collections, Streams, Threads, JVM internals. Where most interviews live.</div>' +
      '<div class="tl-item"><b>Part III · Design</b> — SOLID, patterns, full LLD walkthroughs.</div>' +
      '<div class="tl-item"><b>Part IV · Backend</b> — Spring Boot, REST, JPA, microservices.</div>' +
      '<div class="tl-item"><b>Part V · Scale</b> — SQL/NoSQL, caching, sharding, Kafka, system design.</div>' +
      '<div class="tl-item"><b>Part VI · Ship it</b> — Git, Docker, Kubernetes, AWS, CI/CD.</div>' +
      '<div class="tl-item"><b>Finale</b> — resume, DSA-in-Java strategy, STAR stories, 30-day war plan.</div>' +
      '</div></div>' +
      '<h3 class="sec">Legend — learn these symbols</h3>' +
      '<div class="grid g2">' +
      '<div class="cardx" style="--rc:#256c29"><span class="tagchip" style="--rc:#256c29">💡 TIP</span>Battle-tested practical advice.</div>' +
      '<div class="cardx" style="--rc:#b71c1c"><span class="tagchip" style="--rc:#b71c1c">⚠️ TRAP</span>Mistakes interviewers love you to make.</div>' +
      '<div class="cardx" style="--rc:#155fae"><span class="tagchip" style="--rc:#155fae">📌 NOTE</span>Facts worth memorizing verbatim.</div>' +
      '<div class="cardx" style="--rc:#9c5200"><span class="tagchip" style="--rc:#9c5200">📡 INTERVIEW RADAR</span>Real questions + model answers.</div>' +
      '</div>' +
      '<div class="callout tip"><span class="ct">💡 Controls</span>Flip pages by clicking the arrows, the page corners, dragging the slider — or press <strong>← →</strong>. Press <strong>/</strong> to search, <strong>T</strong> for contents, <strong>N</strong> for night mode.</div>' });

  /* ---- Spread 1 : Table of Contents (placeholder — engine fills it) ---- */
  B.spread(
    { kicker: 'TABLE OF CONTENTS', head: '', html: '' },
    { kicker: 'TABLE OF CONTENTS', head: '', html: '' });
})();
