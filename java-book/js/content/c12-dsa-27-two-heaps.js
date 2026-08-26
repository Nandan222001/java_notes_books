/* ===== CHAPTER 58 · DSA: Two Heaps & Streaming ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 58, 'DSA: Two Heaps & Streaming');

/* Problem 261 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q261 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 261 · EASY</span>Minimum Cost to Connect Sticks</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Greedy</span><span class="pill">Min-Heap</span></div>
<p class="dropcap">You have sticks of given lengths. Repeatedly pick TWO sticks and fuse them — the cost of a fusion equals the combined length. Fuse everything into one stick and minimise the TOTAL cost.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: sticks = [2,4,3]
Output: 14   (fuse 2+3=5, then 5+4=9 → 5+9 = 14)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ sticks.length ≤ 10⁴ · 1 ≤ sticks[i] ≤ 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Always fuse the two SHORTEST sticks first — a min-heap hands them to you instantly.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Load every length into a min-heap. While more than one stick remains, pop the two smallest, pay their sum, and push the fused stick back.</p>
<pre class="code" data-lang="java"><code>public int connectSticks(int[] sticks) {
    PriorityQueue&lt;Integer&gt; pq = new PriorityQueue&lt;&gt;();
    for (int s : sticks) pq.offer(s);
    int cost = 0;
    while (pq.size() &gt; 1) {
        int merged = pq.poll() + pq.poll();
        cost += merged;
        pq.offer(merged);
    }
    return cost;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[2,4,3]</code></p>
<table class="tbl">
<tr><th>heap</th><th>fuse</th><th>cost</th></tr>
<tr><td>{2,3,4}</td><td>2+3 = 5</td><td>5</td></tr>
<tr><td>{4,5}</td><td>4+5 = 9</td><td>14 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>You're stapling homework piles together. Every time you staple, you have to LIFT both piles — so lifting the two THINNEST piles costs least, and fat piles get carried around as little as possible. Staple greedily from thin to thick.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This IS Huffman coding in disguise: lengths that survive many fusions should be small, because every fusion re-charges you their whole weight.</div>`});

/* Problem 262 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q262 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 262 · HARD</span>Minimum Number of Refueling Stops</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Greedy</span><span class="pill">Max-Heap</span></div>
<p class="dropcap">A car starts with <code>startFuel</code> litres and must reach <code>target</code> km eastward. Each station <code>[position, fuel]</code> can top you up to FULL when you pass it. Return the MINIMUM number of stations to stop at — or <code>-1</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>target=100, startFuel=10
stations = [[10,60],[20,30],[30,30],[60,40]]
Output: 2   (stop at 10 and at 30)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ target, startFuel ≤ 10⁹ · stations sorted by position</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Retroactive refuelling: drive past stations hoarding their fuel in a max-heap; only when stranded, redeem the BIGGEST voucher you've already passed.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>While the tank can't reach target: push every passed station's fuel into a max-heap, then cash the largest one. Empty heap + still short = impossible.</p>
<pre class="code" data-lang="java"><code>public int minRefuelStops(int target, int startFuel, int[][] st) {
    PriorityQueue&lt;Integer&gt; best =
        new PriorityQueue&lt;&gt;(Collections.reverseOrder());
    long fuel = startFuel;
    int stops = 0, i = 0;
    while (fuel &lt; target) {
        while (i &lt; st.length &amp;&amp; st[i][0] &lt;= fuel)
            best.offer(st[i++][1]);
        if (best.isEmpty()) return -1;
        fuel += best.poll();
        stops++;
    }
    return stops;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>target=100, fuel=10</code></p>
<table class="tbl">
<tr><th>fuel</th><th>passed → heap</th><th>redeem</th><th>stops</th></tr>
<tr><td>10</td><td>@10(60) → {60}</td><td>+60 → 70</td><td>1</td></tr>
<tr><td>70</td><td>@20(30),@30(30) → {30,30}</td><td>+30 → 100</td><td>2 ✓ done</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Your car has a MAGIC TANK: as you drive past a gas station, its fuel turns into a voucher that jumps into your backpack — no stopping needed! Only when the road ahead looks longer than your gauge do you open the backpack and redeem the BIGGEST voucher collected so far. You're effectively time-travelling back to fill up.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Decide later, from everything seen so far, optimally" is the max-heap's signature move. An exchange argument proves redeeming the largest passed station is never worse than any other choice.</div>`});

/* Problem 263 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q263 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 263 · EASY</span>Design a Seat Reservation Manager</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Design</span><span class="pill">Min-Heap / TreeSet</span></div>
<p class="dropcap">Manage <code>n</code> numbered seats. <code>reserve()</code> allocates the LOWEST-numbered free seat; <code>unreserve(seatNo)</code> returns one to the pool.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>SeatManager m = new SeatManager(5)
m.reserve() → 1 ; m.reserve() → 2
m.unreserve(2)
m.reserve() → 2   (returned seat is cheapest again)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁵ · at most 10⁴ calls total</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A min-heap seeded with 1..n answers both calls in O(log n). Bonus: lazily seed with a counter to save memory.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Free seats live in a min-heap — reserve pops its top, unreserve pushes the number back.</p>
<pre class="code" data-lang="java"><code>class SeatManager {
    private PriorityQueue&lt;Integer&gt; free;
    public SeatManager(int n) {
        free = new PriorityQueue&lt;&gt;();
        for (int s = 1; s &lt;= n; s++) free.offer(s);
    }
    public int reserve()      { return free.poll(); }
    public void unreserve(int s) { free.offer(s); }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">n = 5, ops as above</p>
<table class="tbl">
<tr><th>op</th><th>heap top</th><th>result</th></tr>
<tr><td>reserve()</td><td>1</td><td>1</td></tr>
<tr><td>reserve()</td><td>2</td><td>2</td></tr>
<tr><td>unreserve(2)</td><td>{2,3,4,5}</td><td>—</td></tr>
<tr><td>reserve()</td><td>2</td><td>2 ✓ (reused)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n) per op. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A cinema usher keeps returned tickets on a sorted spike: hand out whichever ticket sits on TOP (always the smallest number); a returned ticket slides back into place instantly. Even smarter ushers print nothing until needed — they just remember "next fresh seat = 7" and only keep a tray of early returns sorted.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The lazy variant — a counter for never-touched seats plus a heap ONLY for returns — shrinks memory from O(n) to O(re-allocations), a favourite follow-up.</div>`});

/* Problem 264 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q264 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 264 · HARD</span>Minimum Cost to Hire K Workers</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Sort by Ratio</span><span class="pill">Max-Heap</span></div>
<p class="dropcap">Every worker has <code>quality[i]</code> and <code>wage[i]</code>. Hire exactly <code>k</code> workers paying each at least their demanded wage AND paid proportionally to quality (same wage-per-quality ratio for the whole group). Minimise total wages.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>quality = [10,20,5], wage = [70,50,30], k = 2
Output: 105.00   (ratio 6.0 group: worker3 + worker1 → (5+10) × 6)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 10⁴ · k ≤ n · answers within 10⁻⁵ tolerance</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>In ANY valid group, the worker with the HIGHEST wage/quality ratio sets everyone's rate. Try every worker as that "most demanding" one; pair with the k−1 smallest qualities seen so far.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort workers by ratio ascending. Sweep; maintain a max-heap of the k−1 smallest qualities plus running sum. When size hits k, candidate cost = currentRatio × sumQuality.</p>
<pre class="code" data-lang="java"><code>public double mincostToHireWorkers(int[] q, int[] w, int k) {
    int n = q.length;
    Integer[] ord = new Integer[n];
    for (int i = 0; i &lt; n; i++) ord[i] = i;
    Arrays.sort(ord, (a, b) -&gt; Double.compare(
        (double) w[a] / q[a], (double) w[b] / q[b]));
    PriorityQueue&lt;Integer&gt; bigQ =
        new PriorityQueue&lt;&gt;(Collections.reverseOrder());
    long sumQ = 0; double ans = Double.MAX_VALUE;
    for (int i : ord) {
        bigQ.offer(q[i]); sumQ += q[i];
        if (bigQ.size() &gt; k) sumQ -= bigQ.poll();
        if (bigQ.size() == k)
            ans = Math.min(ans, (double) w[i] / q[i] * sumQ);
    }
    return ans;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>q=[10,20,5], w=[70,50,30]</code> → ratios 7.0 / 2.5 / 6.0, sorted order: #2, #3, #1</p>
<table class="tbl">
<tr><th>worker</th><th>ratio</th><th>heap {q}</th><th>sumQ</th><th>cand</th></tr>
<tr><td>#2</td><td>2.5</td><td>{20}</td><td>20</td><td>k not met</td></tr>
<tr><td>#3</td><td>6.0</td><td>{20,5}</td><td>25</td><td>6×25 = 150</td></tr>
<tr><td>#1</td><td>7.0</td><td>evict 20 → {5,10}</td><td>15</td><td>7×15 = 105 ✓ min</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Crew fairness rule: whoever demands the most PAY PER SKILL POINT sets the hourly rate for the ENTIRE crew. So walk candidates from least demanding to most demanding; when someone becomes "the boss", hire them plus whichever companions have the SMALLEST skills (cheapest to pay at the boss's rate). A fat-skills-first-out heap keeps the companion pool trimmed.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Fix the binding constraint, then optimise the rest" — sorting by ratio makes exactly ONE worker the rate-setter per step, converting a quadratic pairing mess into a linear sweep + heap.</div>`});

/* Problem 265 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q265 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 265 · HARD</span>Maximum Performance of a Team</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Sort + Heap</span><span class="pill">Greedy</span></div>
<p class="dropcap">Engineer i has <code>speed[i]</code> and <code>efficiency[i]</code>. Choose AT MOST <code>k</code> engineers to maximise <b>(sum of speeds) × (minimum efficiency)</b> in the team. Return the answer mod 10⁹+7.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n=6, speed = [2,10,3,1,5,8], eff = [5,4,3,9,7,2], k = 2
Output: 60   ({eff 4, speed 10} × {speed 5}: (10+5) × 4)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ k ≤ n ≤ 10⁵ · speeds/effs ≤ 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Mirror image of hiring workers: walk engineers from HIGHEST to LOWEST efficiency — each becomes the team's minimum. Keep the k−1 fastest companions in a MIN-heap (evict the slowest).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort descending by efficiency; sweep while the min-heap trims the pool to k members; every step's candidate is currentEfficiency × runningSpeedSum.</p>
<pre class="code" data-lang="java"><code>public int maxPerformance(int n, int[] speed, int[] eff, int k) {
    int[][] e = new int[n][2];
    for (int i = 0; i &lt; n; i++) { e[i][0] = eff[i]; e[i][1] = speed[i]; }
    Arrays.sort(e, (a, b) -&gt; b[0] - a[0]);
    PriorityQueue&lt;Integer&gt; slow = new PriorityQueue&lt;&gt;();
    long sumS = 0, best = 0;
    for (int[] x : e) {
        slow.offer(x[1]); sumS += x[1];
        if (slow.size() &gt; k) sumS -= slow.poll();
        best = Math.max(best, (long) x[0] * sumS);
    }
    return (int)(best % 1_000_000_007L);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input as example, sorted desc by eff: (9,s1)(7,s5)(5,s2)(4,s10)(3,s3)(2,s8)</p>
<table class="tbl">
<tr><th>min-eff</th><th>heap {speed}</th><th>sumS</th><th>cand = eff×sum</th></tr>
<tr><td>9</td><td>{1}</td><td>1</td><td>9</td></tr>
<tr><td>7</td><td>{5,1}</td><td>6</td><td>42</td></tr>
<tr><td>5</td><td>evict 1 → {5,2}</td><td>7</td><td>35</td></tr>
<tr><td>4</td><td>evict 2 → {5,10}</td><td>15</td><td>60 ✓ max</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Building a rowing crew: sort rowers from most consistent (highest efficiency floor) down. When a rower joins, they become the crew's WEAK LINK — so pair them with the fastest teammates available and keep only the top-k arms aboard, evicting anyone slower than the newcomers whenever the boat overflows.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Same skeleton as Q264 with signs flipped: there we minimised ratio × sum(quality); here we maximise floor(efficiency) × sum(speed). Learn ONE template, collect TWO hards.</div>`});

/* Problem 266 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q266 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 266 · MEDIUM</span>Longest Happy String</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Greedy</span><span class="pill">Max-Heap</span></div>
<p class="dropcap">Build the LONGEST possible string using at most <code>a</code> 'a's, <code>b</code> 'b's and <code>c</code> 'c's, where no THREE consecutive characters are equal. Return "" if impossible.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: a = 1, b = 1, c = 7
Output: "ccbccacc"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 ≤ a, b, c ≤ 100 · answer length ≤ a+b+c</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Always spend the letter with the LARGEST remaining count — UNLESS it would create a triple; then spend the runner-up once and retry.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Max-heap of (letter, count). Pop the richest; if appending makes three-in-a-row, pop the second-richest instead (returning the first). Decrement whatever you spent and push back if non-zero.</p>
<pre class="code" data-lang="java"><code>public String longestDiverseString(int a, int b, int c) {
    PriorityQueue&lt;int[]&gt; pq =
        new PriorityQueue&lt;&gt;((x, y) -&gt; y[1] - x[1]);
    if (a &gt; 0) pq.offer(new int[]{'a', a});
    if (b &gt; 0) pq.offer(new int[]{'b', b});
    if (c &gt; 0) pq.offer(new int[]{'c', c});
    StringBuilder sb = new StringBuilder();
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int n = sb.length();
        if (n &gt;= 2 &amp;&amp; sb.charAt(n - 1) == top[0]
                  &amp;&amp; sb.charAt(n - 2) == top[0]) {
            if (pq.isEmpty()) break;          // stuck: only triples left
            int[] second = pq.poll();
            sb.append((char) second[0]);
            if (--second[1] &gt; 0) pq.offer(second);
            pq.offer(top);
        } else {
            sb.append((char) top[0]);
            if (--top[1] &gt; 0) pq.offer(top);
        }
    }
    return sb.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>a=1, b=1, c=7</code></p>
<table class="tbl">
<tr><th>step</th><th>richest</th><th>last two</th><th>append</th><th>s = …</th></tr>
<tr><td>1–2</td><td>c(7)</td><td>— / c?</td><td>c, c</td><td>"cc"</td></tr>
<tr><td>3</td><td>c again</td><td>"cc" → triple!</td><td>b instead</td><td>"ccb"</td></tr>
<tr><td>4–5</td><td>c</td><td>"cb"</td><td>c, c</td><td>"ccbcc"</td></tr>
<tr><td>…</td><td>a then c…</td><td>—</td><td>a, c, c</td><td>"ccbccacc" ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O((a+b+c) log 3) ≈ O(n). Space: O(1) heap size.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Snack-jar rule: keep eating your FAVOURITE treat, but never take THREE bites of the same thing in a row. On the third craving you force yourself to switch to the next-best flavour for exactly ONE bite — then dive back into the favourite jar.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The constraint is purely LOCAL (only the last two characters matter), so greedy-with-one-lookahead is optimal — no DP needed when history is this short.</div>`});

/* Problem 267 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q267 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 267 · MEDIUM</span>Top K Frequent Words</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Hash Map</span><span class="pill">Heap</span></div>
<p class="dropcap">Return the <code>k</code> most frequent words, sorted by frequency DESC; ties broken by lexicographic ASC order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i", "love"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ words.length ≤ 10⁴ · k ≤ distinct count · lowercase words</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep a heap of only k survivors whose comparator is INVERTED (fewest votes on top; on ties the alphabetically LATER word on top) — so polling evicts exactly the least deserving.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Count frequencies, then stream every distinct word through a size-k min-heap with a "worst-on-top" ordering. Reverse at the end for descending output.</p>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; topKFrequent(String[] words, int k) {
    Map&lt;String, Integer&gt; freq = new HashMap&lt;&gt;();
    for (String w : words) freq.merge(w, 1, Integer::sum);
    PriorityQueue&lt;String&gt; pq = new PriorityQueue&lt;&gt;((x, y) -&gt; {
        int c = freq.get(x) - freq.get(y);
        return c != 0 ? c : y.compareTo(x);
    });
    for (String w : freq.keySet()) {
        pq.offer(w);
        if (pq.size() &gt; k) pq.poll();       // evict the worst
    }
    LinkedList&lt;String&gt; out = new LinkedList&lt;&gt;();
    while (!pq.isEmpty()) out.addFirst(pq.poll());
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>k = 2</code>, freqs: i=2, love=2, coding=1, leetcode=1</p>
<table class="tbl">
<tr><th>offer</th><th>heap (worst on top)</th><th>action</th></tr>
<tr><td>i(2), love(2)</td><td>{love?, i?} — tie: later word on top</td><td>keep both</td></tr>
<tr><td>coding(1)</td><td>size 3 → poll worst</td><td>coding out</td></tr>
<tr><td>leetcode(1)</td><td>size 3 → poll worst (freq 1, later)</td><td>leetcode out ✓</td></tr>
</table>
<p class="fs13">Final reversed: ["i","love"] ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log k). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A talent show keeps just k finalists. Every new act must beat whoever is currently WORST to stay — fewest votes leaves first, and among equal votes the alphabetically LATER name gets the boot. When the stage finally empties, the survivors walk off already ranked.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The inverted-comparator trick turns a min-heap into a "worst-first eviction" machine — sorting only k elements' worth of work instead of n log n for the whole list.</div>`});

/* Problem 268 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q268 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 268 · EASY</span>Take Gifts From the Richest Pile</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Simulation</span><span class="pill">Max-Heap</span></div>
<p class="dropcap">There are piles of gifts. Every second you pick the RICHEST pile, keep <code>⌊√gifts⌋</code> gifts in it, and leave the rest behind. After <code>k</code> seconds, return the TOTAL gifts remaining.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: gifts = [25,64,9,4,100], k = 4
Output: 29   (100→10, 64→8, 25→5, 10→3 → left {3,4,5,8,9})</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ gifts.length ≤ 10³ · 1 ≤ gifts[i] ≤ 10⁹ · 1 ≤ k ≤ 10³</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A max-heap always surfaces the fattest pile; replace its top with the square-rooted remainder.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Max-heap + k rounds of poll-sqrt-offer, then sum what's left.</p>
<pre class="code" data-lang="java"><code>public long pickGifts(int[] gifts, int k) {
    PriorityQueue&lt;Integer&gt; pq =
        new PriorityQueue&lt;&gt;(Collections.reverseOrder());
    for (int g : gifts) pq.offer(g);
    while (k-- &gt; 0) {
        int top = pq.poll();
        pq.offer((int) Math.sqrt(top));
    }
    long sum = 0;
    for (int g : pq) sum += g;
    return sum;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[25,64,9,4,100], k=4</code></p>
<table class="tbl">
<tr><th>second</th><th>richest</th><th>becomes</th></tr>
<tr><td>1</td><td>100</td><td>10</td></tr>
<tr><td>2</td><td>64</td><td>8</td></tr>
<tr><td>3</td><td>25</td><td>5</td></tr>
<tr><td>4</td><td>10</td><td>3 → sum {3,4,5,8,9} = 29 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n + k log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Birthday piñata game: each round you SMASH the fattest piñata on the table; whatever survives inside shrinks to its square-root. After your four swings you just sweep up everything that's left — the heap makes sure you never accidentally whack a small piñata first.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>√n collapses values brutally fast (10⁹ → ~31 623 → 177 → 13), which is why even a million-sized heap settles after few rounds — greedy hits hardest where it pays most.</div>`});

/* Problem 269 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q269 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 269 · MEDIUM</span>Min Operations to Halve Array Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Greedy</span><span class="pill">Max-Heap</span></div>
<p class="dropcap">In one operation pick any element and HALVE it. Return the MINIMUM number of operations until the array's total sum becomes at most half of its ORIGINAL value.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [5,19,8,1]
Output: 3   (19→9.5, 9.5→4.75, 8→4 → sum 16.25 ≤ 16.5)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ nums.length ≤ 10⁵ · 1 ≤ nums[i] ≤ 10⁷ — answer guaranteed reachable</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Always halve the CURRENT largest number; a max-heap tracks it while you accumulate the total reduction.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Load doubles into a max-heap, keep the running <code>cut</code>; loop popping the biggest, halving it (adding half to cut) until <code>cut ≥ total/2</code>.</p>
<pre class="code" data-lang="java"><code>public int halveArray(int[] nums) {
    PriorityQueue&lt;Double&gt; pq =
        new PriorityQueue&lt;&gt;(Collections.reverseOrder());
    double total = 0;
    for (int x : nums) { pq.offer((double) x); total += x; }
    double target = total / 2, cut = 0;
    int ops = 0;
    while (cut &lt; target) {
        double big = pq.poll();
        cut += big / 2;
        pq.offer(big / 2);
        ops++;
    }
    return ops;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[5,19,8,1]</code>, total 33, target 16.5</p>
<table class="tbl">
<tr><th>op</th><th>halved</th><th>cut += </th><th>total cut</th></tr>
<tr><td>1</td><td>19 → 9.5</td><td>9.5</td><td>9.5</td></tr>
<tr><td>2</td><td>9.5 → 4.75</td><td>4.75</td><td>14.25</td></tr>
<tr><td>3</td><td>8 → 4</td><td>4</td><td>18.25 ≥ 16.5 ✓ stop</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n + k log n), k = answer size. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Diet plan for a buffet table: each week you halve the single BIGGEST calorie dish until the whole table's calories drop under half the original. Attacking the biggest plate always removes the most calories this week — so you reach the goal in the fewest weeks possible.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Greedy optimality here has an exchange proof: any schedule that halves something smaller first can be swapped to halve the bigger one without increasing op count. Max-heap = exchange argument made executable.</div>`});

/* Problem 270 */
B.spread(
{ kicker: 'DSA · TWO HEAPS', head: 'Q270 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 270 · EASY</span>Smallest Number in Infinite Set</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Design</span><span class="pill">Heap + Set</span></div>
<p class="dropcap">Design a set holding ALL positive integers. <code>popSmallest()</code> removes and returns the smallest remaining number; <code>addBack(num)</code> re-inserts a previously removed one (no-op if still present).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>pop → 1 ; pop → 2 ; addBack(1) ; pop → 1
addBack(2) ; pop → 2 ; pop → 3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>at most 1000 calls · numbers ≤ 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Don't materialise infinity: keep a pointer <code>nextFresh</code> plus a small heap of RETURNED numbers only.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>The never-popped integers need no storage — a counter knows them. Returned ones go into a min-heap guarded by a set against duplicates. Pop compares the heap's smallest with the counter.</p>
<pre class="code" data-lang="java"><code>class SmallestInfiniteSet {
    private int nextFresh = 1;
    private PriorityQueue&lt;Integer&gt; back = new PriorityQueue&lt;&gt;();
    private Set&lt;Integer&gt; inHeap = new HashSet&lt;&gt;();

    public int popSmallest() {
        if (!back.isEmpty() &amp;&amp; back.peek() &lt; nextFresh)
            return back.poll();
        return nextFresh++;
    }
    public void addBack(int num) {
        if (num &lt; nextFresh &amp;&amp; inHeap.add(num)) back.offer(num);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Sequence: pop, pop, addBack(1), pop, pop, addBack(2), pop</p>
<table class="tbl">
<tr><th>call</th><th>nextFresh</th><th>heap</th><th>returns</th></tr>
<tr><td>pop</td><td>1→2</td><td>{}</td><td>1</td></tr>
<tr><td>pop</td><td>2→3</td><td>{}</td><td>2</td></tr>
<tr><td>addBack(1)</td><td>3</td><td>{1}</td><td>—</td></tr>
<tr><td>pop</td><td>3</td><td>{}</td><td>1 ✓ (from heap)</td></tr>
<tr><td>addBack(2)</td><td>3</td><td>{2}</td><td>—</td></tr>
<tr><td>pop</td><td>3→4</td><td>{}</td><td>2 ✓</td></tr>
<tr><td>pop</td><td>4→5</td><td>{}</td><td>3 ✓ fresh again</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log m) per op (m = returned items). Space: O(m).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A hotel receptionist with INFINITE rooms numbered 1 upward. She can't remember every room — just a sticky note saying "first never-rented room = 7" plus a small tray of keys guests RETURNED early. Check-in hands over whichever is smaller: the sticky-note room or the smallest tray key. A duplicate return goes straight to lost-and-found (the set).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Represent only what's EXCEPTIONAL (returned keys), let arithmetic describe everything ordinary (the counter). This "lazy infinity" pattern appears everywhere from ID generators to sequence allocators.</div>`});
})();