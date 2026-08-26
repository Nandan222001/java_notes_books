/* ===== CHAPTER 67 · DSA: Heaps II — Scheduling Patterns ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 67, 'DSA: Heaps II — Scheduling');

/* Problem 351 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q351 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 351 · MEDIUM</span>Single-Threaded CPU</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Event Simulation</span><span class="pill">Priority Queue</span></div>
<p class="dropcap">A single-core CPU receives tasks <code>[enqueueTime, processingTime]</code>. When idle it runs the QUEUED task with the SHORTEST processing time (ties: lowest index). Return execution order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>tasks = [[1,2],[2,4],[3,2],[4,1]]
→ [0,2,3,1]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁵ · enqueue/processing up to 10⁹ — simulate smartly, don't tick!</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort by arrival; between jobs JUMP the clock straight to the next enqueue when the heap sits empty.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int[] getOrder(int[][] tasks) {
    int n = tasks.length;
    int[][] t = new int[n][3];
    for (int i = 0; i &lt; n; i++) t[i] = new int[]{tasks[i][0], tasks[i][1], i};
    Arrays.sort(t, (a, b) -&gt; a[0] - b[0]);          // by arrival
    PriorityQueue&lt;int[]&gt; pq = new PriorityQueue&lt;&gt;((a, b) -&gt;
        a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]);   // proc, then idx
    long time = 0;
    int[] out = new int[n];
    int i = 0, k = 0;
    while (k &lt; n || !pq.isEmpty()) {
        if (pq.isEmpty() &amp;&amp; time &lt; t[i][0]) time = t[i][0];
        while (i &lt; n &amp;&amp; t[i][0] &lt;= time) pq.offer(t[i++]);
        int[] job = pq.poll();
        out[k++] = job[2];
        time += job[1];
    }
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,2],[2,4],[3,2],[4,1]]</code></p>
<table class="tbl">
<tr><th>clock</th><th>heap offer/poll</th><th>runs</th></tr>
<tr><td>t=1</td><td>offer T0 → poll T0</td><td>job 0, clock → 3</td></tr>
<tr><td>t=3</td><td>offer T1,T2 → poll T2 (shorter)</td><td>job 2, clock → 5</td></tr>
<tr><td>t=5</td><td>offer T3 → poll T3 (1&lt;4)</td><td>job 3, clock → 6</td></tr>
<tr><td>t=6</td><td>poll T1</td><td>order [0,2,3,1] ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A lone barista glances at every WAITING order and brews the quickest one — oldest ticket wins ties. When nobody's waiting she doesn't stand around ticking seconds: she time-travels straight to the next customer's arrival instant.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Event simulation without tick-loops: sort arrivals, drain the ready-heap between them, and let <code>time</code> teleport across idle gaps.</div>`});

/* Problem 352 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q352 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 352 · MEDIUM</span>Furthest Building You Can Reach</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Bounded Min-Heap</span><span class="pill">Retroactive Greedy</span></div>
<p class="dropcap">Moving to an equal-or-shorter building is free. Climbing UP a difference <code>d</code> costs either <code>d</code> bricks or ONE ladder (covers any height). Given limited bricks and ladders, how far can you travel?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1 → 4
heights = [4,12,2,7,3,18,20,3,19], bricks=10, ladders=2 → 7</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ heights.length ≤ 10⁵ · values ≤ 10⁹ — greedy assignment order matters!</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep a min-heap of the LADDER-worthiest jumps (size ≤ ladders). Overflow evicts the SMALLEST jump back onto the brick bill.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int furthestBuilding(int[] h, int bricks, int ladders) {
    PriorityQueue&lt;Integer&gt; jumps = new PriorityQueue&lt;&gt;();
    for (int i = 1; i &lt; h.length; i++) {
        int d = h[i] - h[i - 1];
        if (d &lt;= 0) continue;                  // downhill is free
        jumps.offer(d);
        if (jumps.size() &gt; ladders)
            bricks -= jumps.poll();            // smallest leap pays bricks
        if (bricks &lt; 0) return i - 1;
    }
    return h.length - 1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[4,2,7,6,9,14,12]</code>, bricks 5, ladders 1</p>
<table class="tbl">
<tr><th>i</th><th>up-jump d</th><th>heap / brick bill</th><th>verdict</th></tr>
<tr><td>2</td><td>+5</td><td>{5} · bricks 5</td><td>ok</td></tr>
<tr><td>4</td><td>+3 → heap {5,3} overflows</td><td>evict 3 → bricks 2</td><td>ok</td></tr>
<tr><td>5</td><td>+5 → evict 5 → bricks −3 ✗</td><td colspan="2">return i−1 = <b>4</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log l). Space: O(l).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Parkour budgeting: every upward leap costs either its exact height in BRICKS or one MAGIC LADDER. Keep your ladders for the BIGGEST leaps you've seen SO FAR — when a new bigger jump arrives, the bounded min-heap demotes the smallest previous jump back onto your brick bill. Deciding "which jump deserved the ladder" lazily beats predicting it upfront.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Retroactive resource assignment via a size-capped heap: commit greedily now, re-optimise past choices whenever a stronger candidate arrives.</div>`});

/* Problem 353 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q353 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 353 · MEDIUM</span>K Pairs With Smallest Sums</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">K-Way Merge</span><span class="pill">Implicit Matrix</span></div>
<p class="dropcap">Two ASCENDING arrays. A pair is one element from each; its sum is the pair value. Return the <code>k</code> pairs with the SMALLEST sums.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>a = [1,7,11], b = [2,4,6], k = 3
→ [[1,2],[1,4],[1,6]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>arrays ≤ 10⁵ · k ≤ 10⁴ · full cross-product would be 10¹⁰ — merge lazily!</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Seed each of the first min(len_a, k) ROWS with (a[i] + b[0]). Popping a champion pushes that row's NEXT column candidate.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; kSmallestPairs(int[] a, int[] b, int k) {
    List&lt;List&lt;Integer&gt;&gt; out = new ArrayList&lt;&gt;();
    PriorityQueue&lt;int[]&gt; pq = new PriorityQueue&lt;&gt;(
        (x, y) -&gt; x[0] - y[0]);               // {sum, i, j}
    for (int i = 0; i &lt; Math.min(a.length, k); i++)
        pq.offer(new int[]{a[i] + b[0], i, 0});
    while (k-- &gt; 0 &amp;&amp; !pq.isEmpty()) {
        int[] top = pq.poll();
        out.add(Arrays.asList(a[top[1]], b[top[2]]));
        if (top[2] + 1 &lt; b.length)
            pq.offer(new int[]{
                a[top[1]] + b[top[2] + 1], top[1], top[2] + 1});
    }
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>a=[1,7,11], b=[2,4,6], k=3</code></p>
<table class="tbl">
<tr><th>pop</th><th>sum</th><th>push next in row i</th></tr>
<tr><td>(i0,j0)</td><td>1+2 = 3 ✓</td><td>(1+4, 0,1)</td></tr>
<tr><td>(i0,j1)</td><td>1+4 = 5 ✓</td><td>(1+6, 0,2)</td></tr>
<tr><td>(i0,j2)</td><td>1+6 = 7 ✓ → done [3 pops]</td><td>—</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(k log(min(n,k))). Space: O(min(n,k)).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Two sorted vending rows form an invisible SUM MATRIX. The cheapest item of every row stands in column zero — so start a tournament with just those champions. Each time a champion is tasted, that row fields its NEXT item. Only k pops ever happen; the other billion combos stay asleep.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Treat the implicit n×m sum-matrix as m sorted lists and run the classic K-WAY MERGE — materialising nothing until popped.</div>`});

/* Problem 354 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q354 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 354 · MEDIUM</span>Maximum Number of Events That Can Be Attended</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sweep Line</span><span class="pill">Earliest-Deadline-First</span></div>
<p class="dropcap">Events span day ranges <code>[start, end]</code>; you may attend ONE event per day (any single day inside its range). Maximise events attended.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[1,2],[2,3],[3,4]] → 3   (day1·ev1, day2·ev2, day3·ev3)
[[1,2],[2,3],[3,4],[1,2]] → 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 10⁵ · days up to 10⁵ — don't iterate every possible day blindly without pruning.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sweep day by day: register events OPENING today into a min-heap of end dates; evict expired ones; attend whichever closes SOONEST.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int maxEvents(int[][] events) {
    Arrays.sort(events, (a, b) -&gt; a[0] - b[0]);
    PriorityQueue&lt;Integer&gt; ends = new PriorityQueue&lt;&gt;();
    int attended = 0, day = 1, i = 0, n = events.length;
    while (i &lt; n || !ends.isEmpty()) {
        while (i &lt; n &amp;&amp; events[i][0] == day)
            ends.offer(events[i++][1]);
        while (!ends.isEmpty() &amp;&amp; ends.peek() &lt; day)
            ends.poll();                        // expired
        if (!ends.isEmpty()) { ends.poll(); attended++; }
        day++;
    }
    return attended;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,2],[2,3],[3,4]]</code></p>
<table class="tbl">
<tr><th>day</th><th>open today → heap</th><th>attend (earliest end)</th></tr>
<tr><td>1</td><td>{2} [end of ev1]</td><td>attend ev1 (ends today)</td></tr>
<tr><td>2</td><td>+ ev2 ends 3</td><td>attend ev2</td></tr>
<tr><td>3</td><td>+ ev3 ends 4</td><td>attend ev3 ✓ total 3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A conference-goer wakes each morning: FIRST registers everything opening TODAY, THEN throws away sessions that expired overnight, and FINALLY attends the one closing SOONEST. Never procrastinate on the tightest deadline — classic Earliest-Deadline-First scheduling.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Sweep-line over time + earliest-deadline-first is the optimal single-machine interval scheduling template; the heap IS the deadline clock.</div>`});

/* Problem 355 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q355 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 355 · MEDIUM</span>Maximum Average Pass Ratio</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Marginal Gain</span><span class="pill">Dynamic Re-rank</span></div>
<p class="dropcap">Classes hold <code>[pass, total]</code> students. Distribute <code>k</code> EXTRA brilliant students (each boosts one class's pass by exactly 1) to MAXIMISE the average pass ratio across all classes.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>classes = [[1,2],[3,5],[2,2]], extra = 2 → 0.78333
(give both to [1,2] → 3/4 and 4/5 → (0.75+0.8+1)/3)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 10⁵ · extra ≤ 10⁵ — re-ranking per gift must stay O(log n)</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Rank classes by their GAIN from one extra student: Δ = (p+1)/(t+1) − p/t. Hand each gift to the current max, then push the UPDATED class back for re-ranking.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public double maxAverageRatio(int[][] cls, int extra) {
    PriorityQueue&lt;int[]&gt; pq = new PriorityQueue&lt;&gt;((a, b) -&gt;
        Double.compare(gain(b[0], b[1]), gain(a[0], a[1])));
    for (int[] c : cls) pq.offer(c);
    while (extra-- &gt; 0) {
        int[] c = pq.poll();
        c[0]++;
        c[1]++;
        pq.offer(c);                            // re-enter with new gain
    }
    double sum = 0;
    while (!pq.isEmpty()) {
        int[] c = pq.poll();
        sum += (double) c[0] / c[1];
    }
    return sum / cls.length;
}
private double gain(int p, int t) {
    return (double) (p + 1) / (t + 1) - (double) p / t;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,2],[3,5],[2,2]], extra = 2</code></p>
<table class="tbl">
<tr><th>gift</th><th>gains now</th><th>winner</th><th>class after</th></tr>
<tr><td>#1</td><td>½→⅔ (+.1667) · ⅗→⅔ (+.0667) · perfect (0)</td><td>[1,2]</td><td>[2,3]</td></tr>
<tr><td>#2</td><td>⅔→¾ (+.0833) wins again</td><td>[2,3]</td><td>[3,4]</td></tr>
<tr><td colspan="4">avg = (¾ + ⅗ + 1)/3 ≈ 0.78333 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O((n + k) log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Tutoring-hour auction: every class bids how much its pass ratio would JUMP from one extra student. Diminishing returns mean a struggling-but-close class outbids an already-perfect one (whose bid is zero). After each gift the winner RE-BIDS with its new numbers — the heap keeps the auction honest.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Marginal-gain greedy requires DYNAMIC reordering after every allocation — exactly what a priority queue is born for.</div>`});

/* Problem 356 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q356 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 356 · MEDIUM</span>Meeting Rooms III</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Dual Heaps</span><span class="pill">Delayed Meetings</span></div>
<p class="dropcap"><code>n</code> rooms, meetings sorted by start. Assign each meeting to the LOWEST-numbered free room; if none are free, DELAY it until a room opens (earliest end, then lowest index) — the delayed meeting keeps its original DURATION. Return the room hosting the most meetings.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]] → 0
(room 0: mtgs 0 &amp; 3; room 1: mtgs 1 &amp; 2)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 100 · 1 ≤ meetings ≤ 5×10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Two heaps: FREE rooms (min index) and BUSY rooms (min end-time). Delayed meetings extend into freed time preserving duration.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int mostBooked(int n, int[][] meetings) {
    Arrays.sort(meetings, (a, b) -&gt; a[0] - b[0]);
    PriorityQueue&lt;Integer&gt; free = new PriorityQueue&lt;&gt;();
    for (int r = 0; r &lt; n; r++) free.offer(r);
    PriorityQueue&lt;long[]&gt; busy = new PriorityQueue&lt;&gt;((a, b) -&gt;
        a[0] != b[0] ? Long.compare(a[0], b[0])
                     : Long.compare(a[1], b[1]));
    int[] used = new int[n];
    for (int[] m : meetings) {
        while (!busy.isEmpty() &amp;&amp; busy.peek()[0] &lt;= m[0])
            free.offer((int) busy.poll()[1]);       // release finished
        if (!free.isEmpty()) {                      // start on time
            int room = free.poll();
            used[room]++;
            busy.offer(new long[]{m[1], room});
        } else {                                    // delay: inherit earliest
            long[] freed = busy.poll();
            used[(int) freed[1]]++;
            busy.offer(new long[]{freed[0] + (m[1] - m[0]), freed[1]});
        }
    }
    int best = 0;
    for (int r = 1; r &lt; n; r++) if (used[r] &gt; used[best]) best = r;
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n=2, [[0,10],[1,5],[2,7],[3,4]]</code></p>
<table class="tbl">
<tr><th>meeting</th><th>decision</th><th>rooms' next-free</th></tr>
<tr><td>[0,10]</td><td>room 0</td><td>r0@10, r1@0</td></tr>
<tr><td>[1,5]</td><td>room 1</td><td>r0@10, r1@5</td></tr>
<tr><td>[2,7]</td><td>none free → wait for r1 → runs [5..12]</td><td>r0@10, r1@12</td></tr>
<tr><td>[3,4]</td><td>wait → r0 frees @10 → runs [10..14]</td><td>counts: r0=2, r1=2 → tie → room <b>0</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m log(m + n)). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A conference clerk keeps two clipboards: VACANT rooms sorted by number, and RUNNING clocks sorted by finish time. Each meeting takes the smallest-numbered vacant room; when every clock is still ticking, the meeting queues up and inherits whichever room frees FIRST — its end time slides by exactly how late it started.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Dual-heap resource pools (identity-ordered free list vs time-ordered busy list) model any "assign-or-delay" scheduler cleanly.</div>`});

/* Problem 357 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q357 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 357 · MEDIUM</span>Total Cost to Hire K Workers</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Dual Window Heaps</span><span class="pill">Overlap Fallback</span></div>
<p class="dropcap">Hire <code>k</code> workers from a cost line. Each round, candidates are the FIRST <code>candidates</code> and the LAST <code>candidates</code> in line; hire whichever is cheapest (tie: the earlier index), then remove them. Return total cost.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4 → 11
(hire cost-2 at idx3, cost-2 at idx5, then cost-7)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 10⁵ · k ≤ n · candidates ≤ n</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Two heaps watch the FRONT window and BACK window. Compare their tops each round; refill the winning side from its edge. When windows overlap, everything is one pool — just take global minimums.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public long totalCost(int[] costs, int k, int cand) {
    int n = costs.length, i = 0, j = n - 1;
    PriorityQueue&lt;Integer&gt; head = new PriorityQueue&lt;&gt;(),
                            tail = new PriorityQueue&lt;&gt;();
    for (int t = 0; t &lt; cand &amp;&amp; i &lt;= j; t++) head.offer(costs[i++]);
    for (int t = 0; t &lt; cand &amp;&amp; i &lt;= j; t++) tail.offer(costs[j--]);
    long total = 0;
    while (k-- &gt; 0) {
        boolean useHead = tail.isEmpty() ? true
            : head.isEmpty() ? false
            : head.peek() &lt;= tail.peek();      // tie → earlier index wins
        PriorityQueue&lt;Integer&gt; q = useHead ? head : tail;
        total += q.poll();
        if (i &lt;= j) {
            if (useHead) q.offer(costs[i++]);
            else         q.offer(costs[j--]);
        }
    }
    return total;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input example — head heap {17,12,10,2}, tail heap {8,20,11,2} after seeding</p>
<table class="tbl">
<tr><th>round</th><th>head top vs tail top</th><th>hire / refill side</th></tr>
<tr><td>1</td><td>2 vs 2 (head earlier)</td><td>hire 2 ← head; slide i→ idx4 (7)</td></tr>
<tr><td>2</td><td>7 vs 2</td><td>hire 2 ← tail; slide j→ idx5 (11)</td></tr>
<tr><td>3</td><td>7 vs 8</td><td>hire 7 ← head → <b>total 11</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O((k + c) log c). Space: O(c).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A hiring hall splits the candidate line into a FRONT window and a BACK window. Every round you compare the cheapest face visible in each window and sign that person, sliding that side's window one step inward to reveal the next face. When windows overlap into one crowd, forget sides and simply take global minimums.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The overlap fallback (single-pool mode) is the bug magnet here — test k near n before anything else.</div>`});

/* Problem 358 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q358 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 358 · HARD</span>Minimum Interval to Include Each Query</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Offline Sweep</span><span class="pill">Lazy Expiry</span></div>
<p class="dropcap">Intervals <code>[left_i, right_i]</code>; for each query value q return the size of the SMALLEST interval containing q (or −1).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>intervals = [[1,4],[2,4],[3,6],[4,4]]
queries = [2,3,4,5] → [3,3,1,4]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n, m ≤ 10⁵ — per-query scanning is O(n·m), too slow.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>OFFLINE trick: sort queries; sweep intervals left-to-right so each enters the heap once; heap orders by SIZE; lazily pop intervals whose right end already fell behind the current query.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int[] minInterval(int[][] iv, int[] qs) {
    Integer[] ord = new Integer[qs.length];
    for (int i = 0; i &lt; ord.length; i++) ord[i] = i;
    Arrays.sort(ord, (x, y) -&gt; qs[x] - qs[y]);
    Arrays.sort(iv, (x, y) -&gt; x[0] - y[0]);
    int[] ans = new int[qs.length];
    PriorityQueue&lt;int[]&gt; live = new PriorityQueue&lt;&gt;(
        (a, b) -&gt; (a[1] - a[0]) - (b[1] - b[0]));   // smallest size on top
    int i = 0;
    for (int qi : ord) {
        while (i &lt; iv.length &amp;&amp; iv[i][0] &lt;= qs[qi])
            live.offer(iv[i++]);                    // stage everything started
        while (!live.isEmpty() &amp;&amp; live.peek()[1] &lt; qs[qi])
            live.poll();                            // expired forever
        ans[qi] = live.isEmpty() ? -1
                 : live.peek()[1] - live.peek()[0] + 1;
    }
    return ans;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Queries sorted: 2, 3, 4, 5</p>
<table class="tbl">
<tr><th>query</th><th>staged now</th><th>live top</th><th>answer</th></tr>
<tr><td>2</td><td>[1,4],[2,4]</td><td>[2,4] size 3</td><td>3</td></tr>
<tr><td>3</td><td>+ [3,6]</td><td>size 4 loses to size 3 → still [2,4]</td><td>3</td></tr>
<tr><td>4</td><td>+ [4,4] (size 1)</td><td>[4,4]</td><td><b>1</b></td></tr>
<tr><td>5</td><td>nothing left to stage</td><td>expired evicted → smallest live is [3,6]</td><td><b>4</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n + m log m). Space: O(n + m).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A theatre casting director processes auditions in HEIGHT order so every interval enters the stage exactly once. The heap holds only actors whose RANGE still covers the current query, ranked SHORTEST-range-first; anyone whose range has fallen behind the spotlight gets evicted permanently. Answer per query = peek the heap.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>OFFLINE query sorting converts "answer many questions against many objects" into one monotone sweep with amortised heap operations.</div>`});

/* Problem 359 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q359 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 359 · MEDIUM</span>Maximum Subsequence Score</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Fix-the-Min Sweep</span><span class="pill">Top-k Trim</span></div>
<p class="dropcap">Pick a subsequence of EXACTLY <code>k</code> indices. Its score = <code>(Σ nums1[picked]) × min(nums2[picked])</code>. Return the maximum possible score (64-bit).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3 → 12
(pick idx {1,2,3}: sum 6 × min 2)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 10⁵ · k ≤ n — trying every subsequence is C(n,k), hopeless.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sweep nums2 DESCENDING so each visited element IS the minimum of its candidate pool; keep the k fattest nums1 partners in a min-heap.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public long maxScore(int[] n1, int[] n2, int k) {
    int n = n1.length;
    Integer[] ord = new Integer[n];
    for (int i = 0; i &lt; n; i++) ord[i] = i;
    Arrays.sort(ord, (x, y) -&gt; n2[y] - n2[x]);   // multipliers desc
    PriorityQueue&lt;Integer&gt; small = new PriorityQueue&lt;&gt;();
    long sum = 0, best = 0;
    for (int idx : ord) {
        small.offer(n1[idx]);
        sum += n1[idx];
        if (small.size() &gt; k) sum -= small.poll(); // keep k fattest
        if (small.size() == k)
            best = Math.max(best, sum * (long) n2[idx]);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Pairs sorted by nums2 DESC: idx3(n2=4), idx2(3), idx0(2), idx1(1)</p>
<table class="tbl">
<tr><th>min-floor (n2)</th><th>heap after trim to k=3</th><th>cand score</th></tr>
<tr><td>4 (idx3)</td><td>{2}</td><td>k not met</td></tr>
<tr><td>3 (idx2)</td><td>{2,3}</td><td>not met</td></tr>
<tr><td>2 (idx0)</td><td>{2,3,1} sum 6</td><td>6 × 2 = <b>12</b> ✓ best</td></tr>
<tr><td>1 (idx1)</td><td>trim evicts 1 → {2,3,3} sum 8 × 1 = 8</td><td>12 stays ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(k).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Freeze WHICH element is the team's weakest multiplier by sweeping multipliers from high to low — at each freeze, the eligible pool is everyone AT or ABOVE that floor. Keep only the k FATTEST scores from that pool (a min-heap trims the runts); multiply once and move on. The best floor across the sweep is your answer.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Fix-the-minimum then optimise the rest" turns subset selection into a single sorted sweep with a rolling top-k heap — Q264/Q265's skeleton minus the eviction cap of size exactly k−1.</div>`});

/* Problem 360 */
B.spread(
{ kicker: 'DSA · HEAP SCHEDULING', head: 'Q360 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 360 · HARD</span>Maximum Number of Robots Within Budget</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Sliding Window</span><span class="pill">Monotonic Deque</span></div>
<p class="dropcap">Robots run CONSECUTIVELY (sorted by availability). For a consecutive window, cost = <code>max(chargeTimes) + k × Σ runningCosts</code> where k = window size. Given <code>budget</code>, return the maximum number of CONSECUTIVE robots that can run within it.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>chargeTimes=[3,6,1,3,4], runningCosts=[2,1,3,4,5], budget=25 → 3
(window robots {3,6,1}: max 6 + 3×6 = 24 ≤ 25)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 5×10⁴ · values ≤ 10⁵ · budget ≤ 10¹⁵ — O(n²) window sums TLE.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Slide a window keeping a MONOTONIC DEQUE of decreasing charge times — its front is always the window's max. Shrink from the left while the bill busts the budget; track the widest legal window.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int maximumRobots(int[] charge, int[] run, long budget) {
    Deque&lt;Integer&gt; dq = new ArrayDeque&lt;&gt;();   // indices, charges DECREASING
    long runSum = 0;
    int best = 0, l = 0;
    for (int r = 0; r &lt; charge.length; r++) {
        runSum += run[r];
        while (!dq.isEmpty() &amp;&amp; charge[dq.peekLast()] &lt;= charge[r])
            dq.pollLast();
        dq.addLast(r);
        while (!dq.isEmpty()
               &amp;&amp; charge[dq.peekFirst()]
                  + (long)(r - l + 1) * runSum &gt; budget) {
            if (dq.peekFirst() == l) dq.pollFirst();   // max leaves window
            runSum -= run[l++];
        }
        best = Math.max(best, r - l + 1);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>charge=[3,6,1,3,4], run=[2,1,3,4,5], budget=25</code></p>
<table class="tbl">
<tr><th>r added</th><th>window [l..r]</th><th>bill = max + k·runSum</th><th>best</th></tr>
<tr><td>0</td><td>[3] · 3 + 1×2 = 5 ✓</td><td>best 1</td></tr>
<tr><td>1</td><td>[3,6] · 6 + 2×3 = 12 ✓</td><td>best 2</td></tr>
<tr><td>2</td><td>[3,6,1] · 6 + 3×6 = 24 ✓</td><td><b>3</b></td></tr>
<tr><td>3</td><td>[3,6,1,3] · 6 + 4×10 = 46 ✗ shrink → l=1: 6+27 ✗ → l=2: 6+20 ✗… l=3: 3+9 ✓</td><td>best stays 3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each index enters/leaves deque once. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A robot-fleet accountant slides a window along a chronologically queued line. The weekly bill has two parts: the PRICIEST battery swap anywhere in the window (kept at the front of a monotonic deque) plus COUNT times the running-watts total. When the bill busts the budget, robots are evicted from the LEFT until it fits again — and the accountant remembers the widest legal crowd ever assembled.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Monotonic deque answers "window max in O(1)" while two-pointer shrinking keeps sums rolling — the standard hard combo when both a MAX term and an AGGREGATE term share one window. Chapter capstone.</div>`});
})();