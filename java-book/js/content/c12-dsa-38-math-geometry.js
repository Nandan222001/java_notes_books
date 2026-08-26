/* ===== CHAPTER 69 · DSA: Math II — Geometry & Combinatorics ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 69, 'DSA: Math II — Geometry');

/* Problem 371 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q371 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 371 · MEDIUM</span>Angle Between Hands of a Clock</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Arithmetic</span><span class="pill">Shorter Arc</span></div>
<p class="dropcap">Given clock hands at <code>hour</code> and <code>minutes</code>, return the SMALLER angle between them in degrees.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>hour=12, min=30 → 165
hour=3,  min=15 → 7.5</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ hour ≤ 12 · 0 ≤ minutes ≤ 59</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Minute hand sweeps 6°/min; hour hand 30°/hour PLUS 0.5°/min. Take the shorter of the two arcs.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public double angleClock(int hour, int minutes) {
    double handH = (hour % 12) * 30 + minutes * 0.5;
    double handM = minutes * 6.0;
    double diff = Math.abs(handH - handM);
    return Math.min(diff, 360 - diff);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>hour=3, min=15</code></p>
<table class="tbl">
<tr><th>hand</th><th>position</th></tr>
<tr><td>hour</td><td>3×30 + 15×0.5 = 97.5°</td></tr>
<tr><td>minute</td><td>15×6 = 90°</td></tr>
<tr><td>gap</td><td>|97.5 − 90| = 7.5° (< 180 → keep) ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Two runners on a circular track: the MINUTE hand sprints 6 degrees per minute while the HOUR hand strolls half a degree per minute. Measure how far apart they stand, then always report the SHORTER way round the circle.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The sneaky part is the hour hand DRIFTING with the minutes (+0.5°/min) — forgetting that drift is the classic bug.</div>`});

/* Problem 372 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q372 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 372 · MEDIUM</span>Minimum Area Rectangle</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Diagonal Pairs</span><span class="pill">Hash Set</span></div>
<p class="dropcap">Given distinct points, find the minimum AREA of an AXIS-ALIGNED rectangle whose four corners are all in the set — or 0 if none exists.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[1,1],[1,3],[3,1],[3,3],[2,2]] → 4
[[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]] → 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ points ≤ 500 · coordinates ≤ 4×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every rectangle hides behind its DIAGONAL: pick two opposite corners; the other two are pure arithmetic — verify both exist in a point-set.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int minAreaRect(int[][] pts) {
    Set&lt;Long&gt; seen = new HashSet&lt;&gt;();
    for (int[] p : pts) seen.add(p[0] * 40001L + p[1]);
    int best = Integer.MAX_VALUE;
    for (int i = 0; i &lt; pts.length; i++)
        for (int j = i + 1; j &lt; pts.length; j++) {
            int[] p = pts[i], q = pts[j];
            if (p[0] == q[0] || p[1] == q[1]) continue;   // not diagonal
            boolean c1 = seen.contains(p[0] * 40001L + q[1]);
            boolean c2 = seen.contains(q[0] * 40001L + p[1]);
            if (c1 &amp;&amp; c2)
                best = Math.min(best,
                    Math.abs(p[0] - q[0]) * Math.abs(p[1] - q[1]));
        }
    return best == Integer.MAX_VALUE ? 0 : best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,1],[1,3],[3,1],[3,3],…]</code> — pair (1,1)-(3,3) as diagonal:</p>
<table class="tbl">
<tr><th>needed corners</th><th>in set?</th></tr>
<tr><td>(1,3) and (3,1)</td><td>both ✓ → area |1−3|×|1−3| = 4 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Every axis-aligned rectangle can be named by its two OPPOSITE corners alone — the other two are just arithmetic. So walk point pairs as candidate diagonals and ask the hash-set whether the twin corners exist. Packing (x, y) into one long key keeps lookups single-shot.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Diagonal determines the rectangle" halves the search: n² pairs instead of n⁴ corner combinations.</div>`});

/* Problem 373 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q373 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 373 · HARD</span>Max Points on a Line</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Slope Normalisation</span><span class="pill">GCD Reduction</span></div>
<p class="dropcap">Return the maximum number of points that lie on ONE straight line.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[1,1],[2,2],[3,3]] → 3
[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]] → 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁴ · coordinates fit a 32-bit int</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>PIN one point as origin; describe every partner by its slope as a GCD-REDUCED fraction with canonical sign. Equal fractions = same line through the pin.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int maxPoints(int[][] pts) {
    int n = pts.length, best = 1;
    Map&lt;String, Integer&gt; slope = new HashMap&lt;&gt;();
    for (int i = 0; i &lt; n; i++) {
        slope.clear();
        int dup = 0, localBest = 0;
        for (int j = i + 1; j &lt; n; j++) {
            int dx = pts[j][0] - pts[i][0];
            int dy = pts[j][1] - pts[i][1];
            if (dx == 0 &amp;&amp; dy == 0) { dup++; continue; }
            int g = gcf(dx, dy);
            dx /= g; dy /= g;
            if (dx &lt; 0) { dx = -dx; dy = -dy; }   // canonical direction
            localBest = Math.max(localBest,
                slope.merge(dx + "#" + dy, 1, Integer::sum));
        }
        best = Math.max(best, localBest + dup + 1);
    }
    return best;
}
private int gcf(int a, int b) { return b == 0 ? a : gcf(b, a % b); }</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,1],[3,2],[5,3],[4,1]]</code>, anchor (1,1):</p>
<table class="tbl">
<tr><th>partner</th><th>(dx,dy)</th><th>reduced slope</th></tr>
<tr><td>(3,2)</td><td>(2,1)</td><td>2#1 ✓ line of 2 so far</td></tr>
<tr><td>(5,3)</td><td>(4,2)</td><td>÷2 → 2#1 ✓ same line → count 2 (+dup+1 = 4 total)</td></tr>
<tr><td>(4,1)</td><td>(3,0)</td><td>3#0 different bucket</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n² log C). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Pin each point to a corkboard as an ORIGIN and describe every partner purely by SLOPE — reduced to lowest terms with a fixed sign so "2/1" and "(−2)/(−1)" land in the SAME bucket. Points sharing a bucket sit on one straight line through the pin; duplicates ride along free.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Floating-point slopes (0.33333 vs 1/3) WILL misclassify at scale — exact integer fractions via gcd are the professional answer.</div>`});

/* Problem 374 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q374 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 374 · MEDIUM</span>Mirror Reflection</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Parity</span><span class="pill">Room Unfolding</span></div>
<p class="dropcap">A laser fires from corner (0,0) of a <code>p × q</code> mirrored room toward (p, q) and bounces forever. Three receptors sit at corners: 0 = [0, p] (top-left), 1 = [p, q] (top-right), 2 = [p, 0] (bottom-right). Which receptor catches the ray FIRST?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>p = 2, q = 1 → 2
p = 1, q = 1 → 1
p = 1, q = 2 → 0</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ p, q ≤ 1000 · guaranteed the ray hits a receptor eventually</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>UNFOLD the room instead of bouncing the ray: tile mirrored rooms into an infinite corridor and let the ray fly STRAIGHT; which receptor it lands on is pure parity of the room copies.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int mirrorReflection(int p, int q) {
    while (q % 2 == 0 &amp;&amp; p % 2 == 0) {   // strip common powers of two
        q /= 2;
        p /= 2;
    }
    if (q % 2 == 0 &amp;&amp; p % 2 == 1) return 0;
    if (q % 2 == 1 &amp;&amp; p % 2 == 1) return 1;
    return 2;                             // q odd, p even
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>p=2, q=1</code> — no common factor to strip.</p>
<table class="tbl">
<tr><th>parity readout</th><th>meaning (rooms crossed)</th><th>receptor</th></tr>
<tr><td>p even · q odd</td><td>lands on a BOTTOM-corner copy after odd vertical rooms</td><td><b>2</b> ✓ bottom-right</td></tr>
<tr><td>p odd · q odd</td><td>top-right copy — straight shot</td><td>1</td></tr>
<tr><td>p odd · q even</td><td>top-left copy</td><td>0</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log(max(p,q))) halving loop. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Instead of simulating ricochets, MIRROR THE ROOM: tile reflected copies of the chamber into an endless corridor and let the ray travel in one perfectly straight line. Whichever copy's receptor-corner it lands on tells you — via simple ODD/EVEN counting of rooms crossed horizontally and vertically — which original corner wins.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Reflect the world, not the ray" turns optics into parity arithmetic — a beloved trick for billiards-and-mirrors problems everywhere.</div>`});

/* Problem 375 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q375 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 375 · HARD</span>Reaching Points</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Reverse Euclidean</span><span class="pill">Modulo Descent</span></div>
<p class="dropcap">Starting at <code>(sx, sy)</code>, each move transforms the point into <code>(x + y, y)</code> or <code>(x, x + y)</code>. Can you EVER reach <code>(tx, ty)</code>? Values up to 10⁹ — forward search is hopeless.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>(1,1) → (3,5) : true    (1,1)→(1,2)→(3,2)→(3,5)
(1,1) → (2,2) : false
(1,1) → (1,1) : true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ sx, sy, tx, ty ≤ 10⁹</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Work BACKWARDS: undoing a move means subtracting the smaller coordinate from the larger — repeated subtraction is DIVISION in disguise (<code>%=</code>).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean reachingPoints(int sx, int sy, int tx, int ty) {
    while (tx &gt; sx &amp;&amp; ty &gt; sy) {
        if (tx &gt; ty) tx %= ty;
        else         ty %= tx;
    }
    if (tx == sx) return ty &gt;= sy &amp;&amp; (ty - sy) % sx == 0;
    if (ty == sy) return tx &gt;= sx &amp;&amp; (tx - sx) % sy == 0;
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s=(1,1), t=(3,5)</code></p>
<table class="tbl">
<tr><th>backward step</th><th>point</th></tr>
<tr><td>ty %= tx → 5 % 3 = 2</td><td>(3, 2)</td></tr>
<tr><td>tx %= ty → 3 % 2 = 1</td><td>(1, 2) — x pinned at start ✓</td></tr>
<tr><td>final check</td><td>ty=2 ≥ sy=1 and (2−1) % 1 == 0 → TRUE ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log(max)) — Euclidean descent. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Solve the maze BACKWARDS. Forward you add coordinates; backwards you subtract the smaller from the larger — and when that subtraction would repeat a million times, division does it in ONE step (modulo). Once one coordinate is pinned at its starting value, a simple divisibility check finishes the job.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Giant inputs + additive moves = reverse with modulo. The Euclidean algorithm is secretly a reachability solver.</div>`});

/* Problem 376 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q376 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 376 · MEDIUM</span>Valid Square</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Six Distances</span><span class="pill">Squared Math</span></div>
<p class="dropcap">Four points in any order — do they form a SQUARE (sides may be tilted)?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[0,0],[1,1],[1,0],[0,1] → true
[0,0],[1,1],[1,0],[0,12]? → false
all four identical      → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>coordinates in [0, 10⁴] — squared distances fit long.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A square's six pairwise distances sort as: FOUR equal sides followed by TWO equal diagonals exactly DOUBLE the side². Zero distance means coincident points.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean validSquare(int[] p1, int[] p2,
                           int[] p3, int[] p4) {
    int[][] P = {p1, p2, p3, p4};
    long[] d = new long[6];
    int k = 0;
    for (int i = 0; i &lt; 4; i++)
        for (int j = i + 1; j &lt; 4; j++)
            d[k++] = dist2(P[i], P[j]);
    Arrays.sort(d);
    return d[0] &gt; 0
        &amp;&amp; d[0] == d[1] &amp;&amp; d[1] == d[2] &amp;&amp; d[2] == d[3]
        &amp;&amp; d[4] == d[5]
        &amp;&amp; d[4] == 2 * d[0];
}
private long dist2(int[] a, int[] b) {
    long dx = a[0] - b[0], dy = a[1] - b[1];
    return dx * dx + dy * dy;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: unit square corners</p>
<table class="tbl">
<tr><th>sorted distances²</th><td>1</td><td>1</td><td>1</td><td>1</td><td>2</td><td>2</td></tr>
</table>
<p class="fs13">d[0]=1 &gt; 0 · four sides equal · diagonals 2 = 2×side ✓ TRUE</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) (6 distances). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A square's fingerprint is its six pairwise distances: FOUR equal short ones (the sides) and TWO equal long ones (the diagonals), with each diagonal EXACTLY double the side-squared. Sorting the six numbers and pattern-matching "aaaa bb" settles it — no trigonometry, no floating point.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Comparing SQUARED distances dodges sqrt rounding entirely — and the d[0] &gt; 0 guard catches the sneaky all-identical-points case.</div>`});

/* Problem 377 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q377 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 377 · MEDIUM</span>Permutation Sequence</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Factorial Number System</span><span class="pill">Block Skipping</span></div>
<p class="dropcap">The set <code>[1..n]</code> contains exactly n! permutations in sorted order. Return the <code>k</code>-th (1-indexed) WITHOUT generating any others.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n=3, k=3 → "213"   (123, 132, | 213 ←, …)
n=4, k=9 → "2314"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 9 · 1 ≤ k ≤ n!</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Fixing the leading digit owns exactly (n−1)! permutations. Divide (k−1) by (n−1)! to see WHICH digit leads, remove it from the pool, repeat on the remainder.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public String getPermutation(int n, int k) {
    List&lt;Integer&gt; digits = new ArrayList&lt;&gt;();
    int[] fact = new int[n];
    fact[0] = 1;
    for (int i = 1; i &lt; n; i++) fact[i] = fact[i-1] * i;
    for (int i = 1; i &lt;= n; i++) digits.add(i);
    StringBuilder sb = new StringBuilder();
    k--;                             // switch to 0-based
    for (int pos = n - 1; pos &gt;= 0; pos--) {
        int idx = k / fact[pos];     // which block am I in?
        sb.append(digits.remove(idx));
        k %= fact[pos];              // distance inside block
    }
    return sb.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n=3, k=3</code> → k becomes 2 · facts [1,1,2]</p>
<table class="tbl">
<tr><th>pos</th><th>fact[pos]</th><th>idx = k/fact</th><th>pick</th><th>k' = k%fact</th><th>sb</th></tr>
<tr><td>2</td><td>2</td><td>2/2 = 1</td><td><b>2</b></td><td>0</td><td>"2"</td></tr>
<tr><td>1</td><td>1</td><td>0/1 = 0</td><td><b>1</b></td><td>0</td><td>"21"</td></tr>
<tr><td>0</td><td>1</td><td>0/1 = 0</td><td><b>3</b></td><td>0</td><td>"213" ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>O(n²) — the list removal dominates at n ≤ 9. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A phone book of ALL possible names in alphabet order, and you must open the book straight at entry k. Each choice of first letter owns an equal shelf of entries — (n−1)! of them. So divide to find which SHELF k sits on (that fixes the first letter), then recurse inside that shelf with what's left of your page counter. You never flip through pages; you teleport between shelves.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is just WRITING k−1 in factorial base: digits of k−1 in (n−1)!, (n−2)!… ARE the selection indices — combinatorics masquerading as arithmetic.</div>`});


/* Problem 378 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q378 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 378 · HARD</span>Count Digit One</h2>
<div class="pillrow"><span class="pill" style="--pc:#d62828">HARD</span><span class="pill">Column Audit</span><span class="pill">high·cur·low Split</span></div>
<p class="dropcap">Count how many times the digit <b>1</b> appears across ALL integers from 1 to <code>n</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n=13 → 6    // 1, 10, 11(twice), 12, 13
n=0  → 0</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 ≤ n ≤ 10⁹ — brute force listing is hopeless</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Audit each DECIMAL COLUMN separately. Split n around a column into high | cur | low; each column contributes on every full rotation plus partial credit when cur == 1.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int countDigitOne(int n) {
    long place = 1;                 // 1, 10, 100 …
    int count = 0;
    while (place &lt;= n) {
        long high = n / (place * 10);
        long cur  = (n / place) % 10;
        long low  = n % place;
        if (cur == 0)      count += high * place;
        else if (cur == 1) count += high * place + low + 1;
        else               count += (high + 1) * place;
        place *= 10;
    }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 13</code></p>
<table class="tbl">
<tr><th>place</th><th>high</th><th>cur</th><th>low</th><th>formula</th><th>added</th></tr>
<tr><td>1s</td><td>1</td><td>3 (&gt;1)</td><td>0</td><td>(1+1)×1</td><td>2 → count 2</td></tr>
<tr><td>10s</td><td>0</td><td>1 (==1)</td><td>3</td><td>0×10 + 3 + 1</td><td>4 → count 6 ✓</td></tr>
<tr><td colspan="6">ones seen: units of {1,11} = 2 · tens of {10,11,12,13} = 4 → total 6</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log₁₀ n) — one pass over columns. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Imagine an old car odometer and you collect how often the '1' numeral shows, wheel by wheel. For EACH wheel: wheels to the LEFT spin through full rotations regardless (count those wholesale); the current wheel either passed its '1' already this rotation, hasn't reached it, or is sitting ON it right now — in which case the wheels to the RIGHT contribute whatever's currently showing. No listing, just three numbers per wheel.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The high·cur·low split counts a pattern per COLUMN instead of per NUMBER — the standard trick for every "count digit X up to N" problem.</div>`});

/* Problem 379 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q379 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 379 · HARD</span>Nth Magical Number</h2>
<div class="pillrow"><span class="pill" style="--pc:#d62828">HARD</span><span class="pill">Inclusion-Exclusion</span><span class="pill">Binary Search</span></div>
<p class="dropcap">A positive integer is MAGICAL if divisible by <code>a</code> or <code>b</code>. Return the nth magical number modulo 10⁹+7.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n=1, a=2, b=3 → 2
n=4, a=2, b=3 → 6
n=5, a=2, b=4 → 10</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁹ · 2 ≤ a, b ≤ 4×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>COUNTING beats listing: magical numbers ≤ x total x/a + x/b − x/lcm(a,b). The tally only climbs — binary-search the smallest x whose count reaches n.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int nthMagicalNumber(int n, int a, int b) {
    final long MOD = 1_000_000_007L;
    long g = gcd(a, b);
    long L = a / g * b;              // lcm(a, b)
    long lo = 1, hi = (long) n * Math.min(a, b);
    while (lo &lt; hi) {
        long mid = lo + (hi - lo) / 2;
        if (mid / a + mid / b - mid / L &gt;= n) hi = mid;
        else lo = mid + 1;
    }
    return (int) (lo % MOD);
}
private long gcd(long a, long b) {
    return b == 0 ? a : gcd(b, a % b);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n=4, a=2, b=3</code> → L = 6, hi = 12</p>
<table class="tbl">
<tr><th>mid</th><th>mid/2 + mid/3 − mid/6</th><th>vs n = 4</th></tr>
<tr><td>6</td><td>3 + 2 − 1 = 4</td><td>≥ 4 → hi = 6</td></tr>
<tr><td>3</td><td>1 + 1 − 0 = 2</td><td>&lt; 4 → lo = 4</td></tr>
<tr><td>5</td><td>2 + 1 − 0 = 3</td><td>&lt; 4 → lo = 6</td></tr>
<tr><td colspan="3">lo == hi == 6 → answer <b>6</b> ✓ (sequence 2,3,4,6)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log(n·min(a,b))) — ~45 probes even at extremes. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Two food stalls ring bells every a and every b minutes; you want the time of the nth bell. Don't listen bell-by-bell a billion times — ask any candidate minute: "how many bells have rung so far?" That tally is multiples of a, PLUS multiples of b, MINUS the moments both ring together. Since the tally only ever goes up, a simple higher-lower guessing game pins the exact minute in about forty questions.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Inclusion–exclusion turns union counting into three divisions, and monotonicity makes it binary-searchable. hi = n·min(a,b) can reach 4×10¹³ — longs are mandatory.</div>`});

/* Problem 380 */
B.spread(
{ kicker: 'DSA · MATH & GEOMETRY II', head: 'Q380 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 380 · HARD</span>Poor Pigs — Poison Detection</h2>
<div class="pillrow"><span class="pill" style="--pc:#d62828">HARD</span><span class="pill">Information Theory</span><span class="pill">Base-(r+1)</span></div>
<p class="dropcap">One of <code>buckets</code> pails is poisoned. A pig dies within <code>minutesToDie</code> of sipping poison; you have <code>minutesToTest</code> total. Find the MINIMUM pigs that guarantees identifying the poisoned pail.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>buckets=1000, die=15, test=60 → 5
buckets=4,    die=15, test=15 → 2
buckets=1,    die=15, test=15 → 0  (only one pail — no test needed)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ buckets ≤ 1000 · minutesToTest is a multiple of minutesToDie</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A pig isn't a yes/no probe — it has (rounds+1) possible FATES: die in round 1 … round r, or survive everything. So p pigs distinguish (rounds+1)^p outcomes.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int poorPigs(int buckets, int minutesToDie,
                    int minutesToTest) {
    int states = minutesToTest / minutesToDie + 1;
    int pigs = 0;
    while (Math.pow(states, pigs) &lt; buckets) pigs++;
    return pigs;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>buckets=1000, die=15, test=60</code> → rounds = 4, states = 5</p>
<table class="tbl">
<tr><th>pigs</th><th>5^p</th><th>covers 1000?</th></tr>
<tr><td>1</td><td>5</td><td>no ✗</td></tr>
<tr><td>2</td><td>25</td><td>no ✗</td></tr>
<tr><td>3</td><td>125</td><td>no ✗</td></tr>
<tr><td>4</td><td>625</td><td>no ✗</td></tr>
<tr><td>5</td><td>3125</td><td>yes ✓ → answer <b>5</b></td></tr>
</table>
<p class="fs13">Sanity: die=test=15 → states = 1+1 = 2 (pure binary); 2² = 4 ≥ 4 → 2 pigs ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log buckets) loop steps. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Think of each pig as a tiny survey form with five possible answers when there's time for four rounds: "I died in sip-round 1, 2, 3 or 4… or I'm still fine." Stack five forms and their combined answers spell out one exact bucket among 5×5×5×5×5 = 3125 possibilities. Number the buckets like an odometer — each pig sips according to ITS digit only.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Pigs aren't test strips — they're DIGITS in base-(rounds+1). It's information capacity, not chemistry: every extra round multiplies what each pig can say.</div>`});
})();