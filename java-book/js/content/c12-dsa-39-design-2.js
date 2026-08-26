/* ===== CHAPTER 70 · DSA: Design II — Iterators & Rate Limiters ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 70, 'DSA: Design II — Iterators & Limits');

/* Problem 381 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q381 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 381 · MEDIUM</span>Peeking Iterator</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Lookahead Cache</span><span class="pill">Iterator Protocol</span></div>
<p class="dropcap">Given an <code>Iterator</code> exposing only <code>next()</code> and <code>hasNext()</code>, wrap it in one that ALSO supports <code>peek()</code> — see the next element WITHOUT advancing.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>iterator = [1, 2, 3]
peek()    → 1   (stream untouched)
next()    → 1
next()    → 2
hasNext() → true
next()    → 3
hasNext() → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>all values valid integers · O(1) extra space beyond one cached element</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Pull ONE element into a cache slot at construction. peek reads the slot; next hands the slot over, then quietly refills it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class PeekingIterator implements Iterator&lt;Integer&gt; {
    private Integer cached;          // one-ahead slot
    private Iterator&lt;Integer&gt; it;

    public PeekingIterator(Iterator&lt;Integer&gt; it) {
        this.it = it;
        cached = it.hasNext() ? it.next() : null;
    }
    public Integer peek() { return cached; }

    public Integer next() {
        Integer out = cached;        // hand off the hold
        cached = it.hasNext() ? it.next() : null;
        return out;
    }
    public boolean hasNext() { return cached != null; }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Stream: <code>[1, 2, 3]</code> — constructor pre-pulls</p>
<table class="tbl">
<tr><th>call</th><th>cached</th><th>returned</th></tr>
<tr><td>(constructor)</td><td>1</td><td>—</td></tr>
<tr><td>peek()</td><td>1</td><td>1 ✓ no advance</td></tr>
<tr><td>next()</td><td>2 ← refilled</td><td>1</td></tr>
<tr><td>next()</td><td>3 ← refilled</td><td>2</td></tr>
<tr><td>hasNext()</td><td>3 ≠ null</td><td>true ✓</td></tr>
<tr><td>next()</td><td>null (exhausted)</td><td>3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>All three operations O(1) time. Space: O(1) — exactly one slot.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A card dealer who lets you glance at the top card: he holds the NEXT card under his thumb the whole time. Glancing (peek) just tilts it; taking it (next) slides it across while his other hand quietly picks up the following card. You never see him touch the deck mid-trick.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A single-slot lookahead upgrades any forward-only stream into a rewindable-by-one stream — the exact mechanism inside real tokenizers and parsers.</div>`});

/* Problem 382 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q382 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 382 · MEDIUM</span>Flatten Nested List Iterator</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Lazy Stack</span><span class="pill">Recursive Structure</span></div>
<p class="dropcap">Each element of a list is either an integer OR another nested list. Build an iterator that yields the integers in LEFT-TO-RIGHT flattened order — without flattening everything up front.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[1,1], 2, [1,1]] → 1, 1, 2, 1, 1
[1, [4, [6]]]     → 1, 4, 6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>total elements ≤ 10⁵ · nesting arbitrary depth · lazy evaluation preferred</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Push items REVERSED onto a stack. Before every answer, keep exploding whatever list sits on top until a plain integer surfaces.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public class NestedIterator implements Iterator&lt;Integer&gt; {
    private Deque&lt;NestedInteger&gt; st = new ArrayDeque&lt;&gt;();

    public NestedIterator(List&lt;NestedInteger&gt; nested) {
        for (int i = nested.size() - 1; i &gt;= 0; i--)
            st.push(nested.get(i));
    }
    public Integer next() {
        makeReady();                 // guarantee int on top
        return st.pop().getInteger();
    }
    public boolean hasNext() {
        makeReady();
        return !st.isEmpty();
    }
    private void makeReady() {
        while (!st.isEmpty() &amp;&amp; !st.peek().isInteger()) {
            List&lt;NestedInteger&gt; box = st.pop().getList();
            for (int i = box.size() - 1; i &gt;= 0; i--)
                st.push(box.get(i)); // reversed: first on top
        }
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,1], 2, [1,1]]</code></p>
<table class="tbl">
<tr><th>step</th><th>stack (top → left)</th><th>yields</th></tr>
<tr><td>init</td><td>[1,1] · 2 · [1,1]</td><td>—</td></tr>
<tr><td>explode top</td><td>1 · 1 · 2 · [1,1]</td><td>—</td></tr>
<tr><td>next ×2</td><td>2 · [1,1]</td><td>1, 1 ✓</td></tr>
<tr><td>next</td><td>[1,1]</td><td>2 ✓</td></tr>
<tr><td>hasNext → explode</td><td>1 · 1</td><td>true ✓</td></tr>
<tr><td>next ×2</td><td>empty</td><td>1, 1 ✓ done</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Each item is pushed/popped O(1) times overall — amortized O(1) per call. Space: O(depth + breadth of one level).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Russian dolls on a desk: whenever the top object is a BOX (not a number), open it and spread its contents back on the pile UPSIDE-DOWN so its first item is now on top. Repeat until a plain number stares at you — hand that out. Nothing gets unpacked until someone actually asks for it.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Laziness is the feature: work happens only between requests, and each atom is touched once. The reversed push turns "open a box" into constant-time stack surgery.</div>`});

/* Problem 383 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q383 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 383 · MEDIUM</span>Flatten 2D Vector</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Two Cursors</span><span class="pill">Lazy Row Skip</span></div>
<p class="dropcap">Wrap a 2D vector (rows may be EMPTY) in an iterator exposing <code>next()</code> and <code>hasNext()</code>, walking values row-major without copying anything.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>vec = [[1,2],[3],[],[4]]
next() → 1 · next() → 2
next() → 3          // skips empty row transparently
next() → 4
hasNext() → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n rows × m cols ≤ 10⁵ · O(1) extra space · amortised O(1) per call</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Two cursors: row and column. Normalise BEFORE answering each call — advance until you sit on a real value or fall off the end.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public class Vector2D {
    private int[][] v;
    private int row = 0, col = 0;

    public Vector2D(int[][] vec) { v = vec; }

    public int next() {
        settle();                    // guarantee valid spot
        return v[row][col++];
    }
    public boolean hasNext() {
        settle();
        return row &lt; v.length;
    }
    private void settle() {          // hop past empty rows
        while (row &lt; v.length &amp;&amp; col == v[row].length) {
            row++; col = 0;
        }
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,2], [3], [], [4]]</code></p>
<table class="tbl">
<tr><th>call</th><th>settle action</th><th>(row,col)</th><th>returns</th></tr>
<tr><td>next()</td><td>—</td><td>(0,0)</td><td>1</td></tr>
<tr><td>next()</td><td>—</td><td>(0,1)</td><td>2</td></tr>
<tr><td>next()</td><td>col==2==len → row1</td><td>(1,0)</td><td>3</td></tr>
<tr><td>hasNext()</td><td>row2 empty → row3</td><td>(3,0)</td><td>true ✓</td></tr>
<tr><td>next()</td><td>—</td><td>(3,0)</td><td>4</td></tr>
<tr><td>hasNext()</td><td>col==1==len → row4 = end</td><td>(4,0)</td><td>false ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Amortised O(1) per call — each cell settled-over at most once ever. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Reading a book whose chapters sometimes have BLANK pages. Two fingers mark your place: which chapter, which line. Whenever someone asks "is there more?", slide forward across any blank pages first — then answer honestly. Nobody ever photocopies the book; your fingers just never stop on emptiness.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Settle-before-answer is THE iterator idiom: normalisation lives in ONE private helper both methods call, so invariant drift becomes impossible. Work skipped today is charged tomorrow — hence amortised.</div>`});

/* Problem 384 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q384 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 384 · MEDIUM</span>Snapshot Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Versioned History</span><span class="pill">Binary Search on Snap ID</span></div>
<p class="dropcap">Implement <code>set(index, val)</code>, <code>snap()</code> (returns an id), and <code>get(index, snap_id)</code> — the value the cell had AT that snapshot. Full copies are far too slow.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>len = 3
set(0,5); snap() → 0; set(0,6)
get(0,0) → 5   (value as of snapshot 0)
snap() → 1
get(0,1) → 6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ length ≤ 5×10⁴ · ≤ 5×10⁴ total calls · snap ids increase 0,1,2…</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Never copy. Each cell keeps a CHANGELOG of (snapId, value). Reading a past version = binary-search the changelog for the last entry at-or-before that id.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class SnapshotArray {
    private final List&lt;int[]&gt;[] hist;   // per-cell changelog
    private int snapId = 0;

    public SnapshotArray(int length) {
        hist = new List[length];
        for (int i = 0; i &lt; length; i++)
            hist[i] = new ArrayList&lt;&gt;();
    }
    public void set(int index, int val) {
        List&lt;int[]&gt; h = hist[index];
        if (!h.isEmpty() &amp;&amp; h.get(h.size()-1)[0] == snapId)
            h.get(h.size()-1)[1] = val; // amend same snapshot
        else
            h.add(new int[]{snapId, val});
    }
    public int snap() { return snapId++; }

    public int get(int index, int id) {
        List&lt;int[]&gt; h = hist[index];
        int lo = 0, hi = h.size() - 1, ans = 0;
        while (lo &lt;= hi) {              // last entry ≤ id
            int mid = (lo + hi) &gt;&gt;&gt; 1;
            if (h.get(mid)[0] &lt;= id) {
                ans = h.get(mid)[1]; lo = mid + 1;
            } else hi = mid - 1;
        }
        return ans;                     // 0 if untouched
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>set(0,5)</code> · <code>snap()</code> → 0 · <code>set(0,6)</code> — cell 0's changelog becomes <code>[(0,5),(1,6)]</code></p>
<table class="tbl">
<tr><th>call</th><th>changelog of cell 0</th><th>result</th></tr>
<tr><td>set(0,5)</td><td>[(0,5)]</td><td>—</td></tr>
<tr><td>snap()</td><td>[(0,5)]</td><td>returns 0 ✓</td></tr>
<tr><td>set(0,6)</td><td>[(0,5),(1,6)]</td><td>—</td></tr>
<tr><td>get(0,0)</td><td>last ≤ 0 → (0,5)</td><td>5 ✓</td></tr>
<tr><td>snap(); get(0,1)</td><td>last ≤ 1 → (1,6)</td><td>6 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>set/snap O(1); get O(log changes). Space: O(total sets) — never proportional to snapshots.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A lab notebook per test tube instead of photographing the whole shelf every hour: each tube only writes down "as of round X, my reading was Y". To answer "what was it in round 7?", flip that tube's notebook to the LAST entry numbered 7 or earlier — a quick finger-scan because entries are always in order.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Copy-on-read is a trap; append-only history + binary search is the pattern behind git, databases (MVCC), and undo stacks alike.</div>`});

/* Problem 385 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q385 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 385 · EASY</span>Logger Rate Limiter</h2>
<div class="pillrow"><span class="pill" style="--pc:#2a9d8f">EASY</span><span class="pill">Expiry Map</span><span class="pill">Deduplication Window</span></div>
<p class="dropcap">A logger must print each UNIQUE message at most once per 10-second window: <code>shouldPrintMessage(ts, msg)</code> returns true only if this message wasn't printed in the last 10 seconds.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>(1,"bug")   → true
(2,"bug")   → false  (within 10s of t=1)
(11,"bug")  → true   (window elapsed)
(11,"typo") → true   (first sight)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>timestamps strictly increasing · ≤ 10⁴ calls</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep ONE map: message → earliest timestamp when it may print again (last print + 10).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class Logger {
    private final Map&lt;String, Integer&gt; nextOk =
        new HashMap&lt;&gt;();

    public boolean shouldPrintMessage(int ts, String msg) {
        Integer ok = nextOk.get(msg);
        if (ok != null &amp;&amp; ts &lt; ok) return false;
        nextOk.put(msg, ts + 10);    // re-arm the window
        return true;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>call</th><th>nextOk["bug"]</th><th>decision</th></tr>
<tr><td>(1, "bug")</td><td>— → set 11</td><td>true ✓</td></tr>
<tr><td>(2, "bug")</td><td>11 · 2 &lt; 11</td><td>false ✓</td></tr>
<tr><td>(10, "bug")</td><td>11 · 10 &lt; 11</td><td>false ✓</td></tr>
<tr><td>(11, "bug")</td><td>11 · 11 ≥ 11 → re-arm to 21</td><td>true ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>O(1) average per call. Space: O(distinct messages) — production variant evicts entries older than ts−9.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A club bouncer with a notebook: after letting someone in, he writes the earliest time they may return (now plus ten). When they show up earlier, he just points at the notebook and shakes his head — no memory of anything else needed.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Store DEADLINES, not histories — inverting "when was it last seen?" into "when may it return?" makes every decision a single lookup-plus-compare.</div>`});

/* Problem 386 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q386 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 386 · MEDIUM</span>Token-Bucket Rate Limiter</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Lazy Refill</span><span class="pill">Burst Tolerance</span></div>
<p class="dropcap">Design a limiter allowing <code>perSecond</code> requests on average, tolerating short BURSTS up to <code>capacity</code>: <code>allowRequest(now)</code> returns true/false. Must be thread-safe and O(1).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>capacity=5, perSecond=2, bucket starts full
t=0.0  five rapid hits → true×5   (burst drains bucket)
t=0.1  sixth hit       → false    (only ~0.2 tokens accrued)
t=0.6  next hit        → true     (≈1.2 tokens by then)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>O(1) memory — no request logs · safe across threads</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Don't run a refill timer. On EACH call, top the bucket up by elapsed-time × rate, clamp at capacity, then spend one token.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class TokenBucket {
    private final long capacity, perSecond;
    private double tokens;
    private long lastRefill;             // nanos

    public TokenBucket(long capacity, long perSecond) {
        this.capacity = capacity;
        this.perSecond = perSecond;
        this.tokens = capacity;          // start full
        this.lastRefill = System.nanoTime();
    }
    public synchronized boolean allowRequest(long now) {
        double gained =
            (now - lastRefill) / 1e9 * perSecond;
        tokens = Math.min(capacity, tokens + gained);
        lastRefill = now;                // lazy checkpoint
        if (tokens &gt;= 1) { tokens -= 1; return true; }
        return false;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">capacity = 5, rate = 2/s, start tokens = 5</p>
<table class="tbl">
<tr><th>call</th><th>refill math</th><th>tokens after −1</th><th>verdict</th></tr>
<tr><td>t=0.0 ×5</td><td>+0 each</td><td>4 → 3 → 2 → 1 → 0</td><td>true ×5 ✓ burst</td></tr>
<tr><td>t=0.1</td><td>+0.2 → 0.2</td><td>— (&lt; 1)</td><td>false ✓</td></tr>
<tr><td>t=0.6</td><td>+1.0 → 1.2</td><td>0.2</td><td>true ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>O(1) time and O(1) space regardless of traffic volume — the whole design fits in two numbers.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A leaky piggy bank: coins (tokens) drip in at a steady rate, but it never overflows. Each request must drop one coin in to pass. Save up during quiet times and you can splurge a handful all at once (a burst) — then you're broke until the drip refills your stash.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Laziness beats timers: compute "what SHOULD have accrued" on demand from elapsed time. synchronized makes read-refill-spend atomic; capacity IS the burst allowance.</div>`});

/* Problem 387 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q387 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 387 · MEDIUM</span>Design Hit Counter</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Ring Buffer</span><span class="pill">Fixed Window</span></div>
<p class="dropcap">Count hits in the PAST FIVE MINUTES (300 seconds): <code>hit(timestamp)</code> records one hit, <code>getHits(timestamp)</code> returns how many of the recorded hits fall within [ts−299, ts].</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>hit(1); hit(2); hit(3)
getHits(4)   → 3
hit(300)
getHits(300) → 4
getHits(301) → 3   (t=1 dropped out of the window)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>timestamps non-decreasing · multiple hits may share a second</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Only 300 seconds exist — use two arrays of length 300: one stores WHICH second each slot represents, the other its count. Slot = ts % 300.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class HitCounter {
    private final int[] times = new int[300];
    private final int[] hits  = new int[300];

    public void hit(int ts) {
        int i = ts % 300;
        if (times[i] != ts) {       // stale slot → reset
            times[i] = ts; hits[i] = 1;
        } else hits[i]++;
    }
    public int getHits(int ts) {
        int total = 0;
        for (int i = 0; i &lt; 300; i++)
            if (ts - times[i] &lt; 300) total += hits[i];
        return total;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">hits at t = 1, 2, 3, 300</p>
<table class="tbl">
<tr><th>call</th><th>slots alive</th><th>sum</th></tr>
<tr><td>hit(1)→slot 1 · hit(2)→slot 2 · hit(3)→slot 3</td><td>{1:1, 2:1, 3:1}</td><td>—</td></tr>
<tr><td>getHits(4): all ts−times &lt; 300</td><td>{1,2,3}</td><td>3 ✓</td></tr>
<tr><td>hit(300)→slot 0 (fresh!)</td><td>{1:1, 2:1, 3:1, 0:1}</td><td>—</td></tr>
<tr><td>getHits(300)</td><td>all four</td><td>4 ✓</td></tr>
<tr><td>getHits(301): 301−1=300 ≥ 300 → slot 1 dead</td><td>{2,3,0}</td><td>3 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>hit O(1); getHits O(300) = O(window), independent of total traffic. Space: O(300).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A wall of 300 pigeonholes, one per second of the window. A new bang drops a marble into hole "second mod 300" — if that hole still remembers an OLD second, wipe it first. To answer "how many lately?", walk the whole wall once and ignore holes carrying expired dates. The wall never grows, no matter how famous you get.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Bounded time-window ⇒ bounded memory. The modulo ring recycles slots forever, and storing the timestamp IN the slot detects staleness for free.</div>`});

/* Problem 388 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q388 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 388 · MEDIUM</span>Design Browser History</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array + Cursor</span><span class="pill">Forward Truncation</span></div>
<p class="dropcap">Start at a homepage. Support <code>visit(url)</code>, <code>back(steps)</code>, <code>forward(steps)</code>. Visiting a NEW page destroys everything reachable via forward — classic browser semantics.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>home = "a"
visit("b"); visit("c")
back(1)    → "b"
visit("d") // "c" branch is gone
forward(2) → "d"  (can't pass the new frontier)
back(2)    → "a"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>≤ 5000 calls · steps may overshoot — clamp, never crash</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>One array + one cursor. Track how far FORWARD is legal (frontier); visiting rewrites past the cursor and slams the frontier shut.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class BrowserHistory {
    private final List&lt;String&gt; hist = new ArrayList&lt;&gt;();
    private int cur = 0;        // current position
    private int furthest = 0;   // forward frontier

    public BrowserHistory(String home) {
        hist.add(home);
    }
    public void visit(String url) {
        cur++;
        if (cur == hist.size()) hist.add(url);
        else hist.set(cur, url);     // overwrite old branch
        furthest = cur;              // forward history dies
    }
    public String back(int steps) {
        cur = Math.max(0, cur - steps);
        return hist.get(cur);
    }
    public String forward(int steps) {
        cur = Math.min(furthest, cur + steps);
        return hist.get(cur);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>call</th><th>array</th><th>cur / frontier</th></tr>
<tr><td>init "a"</td><td>[a]</td><td>0 / 0</td></tr>
<tr><td>visit b · visit c</td><td>[a, b, c]</td><td>2 / 2</td></tr>
<tr><td>back(1)</td><td>[a, b, c]</td><td>1 → returns <b>b</b> ✓</td></tr>
<tr><td>visit d</td><td>[a, b, <s>c</s>→d] (set overwrites)</td><td>2 / 2 ← c unreachable ✓</td></tr>
<tr><td>forward(2): min(2, 2+2)=2</td><td>[a, b, d]</td><td>2 → returns <b>d</b> ✓</td></tr>
<tr><td>back(2): max(0, 0)</td><td>[a, b, d]</td><td>0 → returns <b>a</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>All operations O(1) amortized. Space: O(visited pages on the live spine).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A bookmark ribbon in one long book: the ribbon marks your page. Going back slides it left; forward slides it right but never past the newest chapter. Starting a fresh visit GLUES OVER all pages after your ribbon with the new story — you can't ever turn forward into chapters that were overwritten.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The frontier variable IS the design: without it, forward() would happily resurrect dead branches. Overwrite-in-place keeps memory flat where two stacks would balloon.</div>`});

/* Problem 389 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q389 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 389 · EASY</span>Moving Average from Data Stream</h2>
<div class="pillrow"><span class="pill" style="--pc:#2a9d8f">EASY</span><span class="pill">Sliding Window Queue</span><span class="pill">Running Sum</span></div>
<p class="dropcap">Given a stream of integers, <code>next(val)</code> returns the average of the last <code>size</code> values (or all of them if fewer have arrived).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>size = 3
next(1) → 1        (window [1])
next(10) → 5.5     (window [1,10])
next(3) → 4.67     (window [1,10,3])
next(5) → 6.0      (window [10,3,5] — 1 evicted)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>≤ 10⁴ calls · O(1) per call required — no re-summing the window</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Fixed-size ring + a running sum: add the newcomer, subtract the retiree, never touch the rest.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class MovingAverage {
    private final int[] win;
    private int n = 0;          // items so far (≤ size)
    private int head = 0;       // oldest slot once full
    private long sum = 0;

    public MovingAverage(int size) { win = new int[size]; }

    public double next(int val) {
        if (n &lt; win.length) {   // still filling up
            sum += val; win[n++] = val;
        } else {                // full → replace oldest
            sum -= win[head];
            sum += val;
            win[head] = val;
            head = (head + 1) % win.length;
        }
        return (double) sum / n;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">size = 3, stream 1 · 10 · 3 · 5</p>
<table class="tbl">
<tr><th>next()</th><th>window</th><th>sum</th><th>average</th></tr>
<tr><td>1</td><td>[1]</td><td>1</td><td>1.0 ✓</td></tr>
<tr><td>10</td><td>[1, 10]</td><td>11</td><td>5.5 ✓</td></tr>
<tr><td>3</td><td>[1, 10, 3]</td><td>14</td><td>14/3 ≈ 4.67 ✓</td></tr>
<tr><td>5 (full)</td><td>evict 1 → [10, 3, 5]</td><td>14 − 1 + 5 = 18</td><td>6.0 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>O(1) time per next(); space O(size).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A turnstile counter at a small fair with room to remember only 'size' visitors: when a newcomer arrives and the hall is FULL, quietly show the OLDEST one out the back door while noting both exits and entries on a single tally board — the average is just tally ÷ people-inside. Nobody ever re-counts the whole crowd.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Additive bookkeeping turns "recompute a window" into "+in −out". The modulo head makes an array behave like a queue without any shifting.</div>`});

/* Problem 390 */
B.spread(
{ kicker: 'DSA · DESIGN II', head: 'Q390 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 390 · MEDIUM</span>Authentication Manager</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">TTL Map</span><span class="pill">Lazy Expiry</span></div>
<p class="dropcap">Tokens live for <code>timeToLive</code> seconds from creation or last renewal. Implement <code>generate(id, t)</code>, <code>renew(id, t)</code> (only if still unexpired), and <code>countUnexpiredTokens(t)</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>ttl = 5
generate("aaa", 1)
renew("aaa", 2)      // ok → dies at 7
generate("bbb", 7)
renew("bbb", 10)     // expires 12 &gt; 10 → alive → new death at 15
countUnexpired(15)   → 0   ("aaa" died at 7, "bbb" at 15)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ ttl ≤ 10⁵ · ≤ 2×10⁵ calls · times strictly increasing</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Store DEATH TIMES: id → expiry = t + ttl. Renewal only rewrites when exp &gt; current time; counting is one sweep of values.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class AuthenticationManager {
    private final int ttl;
    private final Map&lt;String, Integer&gt; expires =
        new HashMap&lt;&gt;();

    public AuthenticationManager(int timeToLive) {
        ttl = timeToLive;
    }
    public void generate(String id, int t) {
        expires.put(id, t + ttl);
    }
    public void renew(String id, int t) {
        Integer exp = expires.get(id);
        if (exp != null &amp;&amp; exp &gt; t)
            expires.put(id, t + ttl);   // fresh lease
    }
    public int countUnexpiredTokens(int t) {
        int count = 0;
        for (int exp : expires.values())
            if (exp &gt; t) count++;
        return count;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">ttl = 5</p>
<table class="tbl">
<tr><th>call</th><th>map after</th><th>note</th></tr>
<tr><td>generate("aaa",1)</td><td>{aaa:6}</td><td>dies at 6</td></tr>
<tr><td>renew("aaa",2): 6 &gt; 2 ✓</td><td>{aaa:7}</td><td>new death 7</td></tr>
<tr><td>generate("bbb",7)</td><td>{aaa:7, bbb:12}</td><td>—</td></tr>
<tr><td>countUnexpired(8): aaa 7≤8 ✗ · bbb 12&gt;8 ✓</td><td>—</td><td>returns <b>1</b></td></tr>
<tr><td>renew("aaa",9): 7 &gt; 9 ✗ ignored</td><td>{aaa:7, bbb:12}</td><td>no zombie revival ✓</td></tr>
<tr><td>countUnexpired(15): bbb 12≤15 ✗</td><td>—</td><td>returns <b>0</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>generate/renew O(1); count O(tokens). Space: O(distinct tokens).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A parking-lot chalkboard: each car gets its leave-by time chalked next to its plate. Renewing means erasing and writing a later time — but only if the old time hasn't already passed (no reviving towed cars). Counting present cars is just strolling the board checking who's still within their chalked deadline.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Lazily-expired maps store deadlines rather than deleting on schedule — the same TTL philosophy as cache entries and DNS records. Strictly-increasing timestamps guarantee the comparisons stay honest.</div>`});
})();