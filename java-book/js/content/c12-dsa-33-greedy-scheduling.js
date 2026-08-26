/* ===== CHAPTER 64 · DSA: Greedy II — Scheduling & Assignment ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 64, 'DSA: Greedy II — Scheduling');

/* Problem 321 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q321 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 321 · MEDIUM</span>Queue Reconstruction by Height</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sort + Insert</span><span class="pill">Constraint Ordering</span></div>
<p class="dropcap">Each person <code>[h, k]</code> states: "<code>k</code> people in FRONT of me are at least my height." Rebuild the queue satisfying everyone.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
→ [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 2000 · heights distinct enough · guaranteed solvable</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Seat people TALLEST first (ties: smaller k first); each newcomer slides into index exactly k.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int[][] reconstructQueue(int[][] people) {
    Arrays.sort(people, (a, b) -&gt;
        a[0] != b[0] ? b[0] - a[0] : a[1] - b[1]);
    List&lt;int[]&gt; line = new ArrayList&lt;&gt;();
    for (int[] p : people) line.add(p[1], p);
    return line.toArray(new int[0][]);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Insertion order after sort: (7,0)(7,1)(6,1)(5,0)(5,2)(4,4)</p>
<table class="tbl">
<tr><th>insert</th><th>at index</th><th>line so far</th></tr>
<tr><td>(7,0)</td><td>0</td><td>[7,0]</td></tr>
<tr><td>(7,1)</td><td>1</td><td>[7,0][7,1]</td></tr>
<tr><td>(6,1)</td><td>1</td><td>[7,0][6,1][7,1]</td></tr>
<tr><td>(5,0)</td><td>0</td><td>[5,0][7,0][6,1][7,1]</td></tr>
<tr><td>(5,2),(4,4)</td><td>2, then 4</td><td>[5,0][7,0][5,2][6,1][4,4][7,1] ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) for list insertions. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Cinema seating built from the TALLEST row backwards: tall folks claim seats first because NOBODY taller can still cut in front of them — their head-counts are already final. Each shorter guest then walks to precisely their numbered seat; everyone already seated is TALLER, so shorter arrivals are invisible to them and the arithmetic holds.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Process the least-constrained first": tallest-first freezes one dimension, turning the other (k) into a literal insertion index.</div>`});

/* Problem 322 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q322 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 322 · MEDIUM</span>Min Deletions to Make Frequencies Unique</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sort + Clamp</span><span class="pill">Greedy</span></div>
<p class="dropcap">Delete the minimum number of characters so that NO TWO letters share the same frequency (a frequency of 0 is fine).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"aab"      → 0
"aaabbbcc" → 2   (freqs 3,3,2 → 3,2,1)
"ceabaacb" → 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 10⁵ · lowercase</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort counts descending; walk from loudest down, clamping each count to at most one BELOW the previous kept count.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int minDeletions(String s) {
    int[] cnt = new int[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    Arrays.sort(cnt);
    int del = 0, prev = Integer.MAX_VALUE;
    for (int i = 25; i &gt;= 0 &amp;&amp; cnt[i] &gt; 0; i--) {
        int keep = Math.min(cnt[i], prev - 1);
        if (keep &lt; 0) keep = 0;
        del += cnt[i] - keep;
        prev = keep;
    }
    return del;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"aaabbbcc"</code> — sorted counts desc: [3, 3, 2]</p>
<table class="tbl">
<tr><th>count</th><th>allowed max (prev−1)</th><th>keep / delete</th></tr>
<tr><td>3</td><td>∞</td><td>keep 3, delete 0</td></tr>
<tr><td>3</td><td>2</td><td>keep 2, delete 1</td></tr>
<tr><td>2</td><td>1</td><td>keep 1, delete 1 → total 2 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n + 26 log 26). Space: O(26).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Radio-station volumes must all be DIFFERENT. The loudest station keeps full blast; every next station is turned down to just below its neighbour — or switched off entirely if the dial is crowded. Every notch you shave off equals one deleted character, and shaving from the top down guarantees nobody gets clipped twice.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Make all distinct with min removals" sorts values and enforces a strictly-decreasing ceiling — the same clamp pattern powers interval-unique and priority-dedup problems.</div>`});

/* Problem 323 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q323 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 323 · MEDIUM</span>Reduce Array Size to The Half</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Frequency Sort</span><span class="pill">Greedy</span></div>
<p class="dropcap">You may remove whole VALUE-GROUPS from <code>arr</code>. Return the minimum number of distinct values removed so that the remaining array is at most half the original length.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[3,3,3,3,5,5,5,2,2,7] → 2   (remove 3s and 5s → 5 left of 10)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ arr.length ≤ 10⁵ · even length</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort frequencies DESCENDING; evict biggest groups until the removal counter crosses half.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int minSetSize(int[] arr) {
    Map&lt;Integer, Integer&gt; f = new HashMap&lt;&gt;();
    for (int x : arr) f.merge(x, 1, Integer::sum);
    List&lt;Integer&gt; counts = new ArrayList&lt;&gt;(f.values());
    Collections.sort(counts, Collections.reverseOrder());
    int removed = 0;
    for (int taken = 1; ; taken++) {
        removed += counts.get(taken - 1);
        if (removed * 2 &gt;= arr.length) return taken;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[3,3,3,3,5,5,5,2,2,7]</code> — freqs desc: [4, 3, 2, 1]</p>
<table class="tbl">
<tr><th>evict group</th><th>size</th><th>removed so far</th><th>half = 5?</th></tr>
<tr><td>value 3</td><td>4</td><td>4</td><td>no (8 &gt; 5)</td></tr>
<tr><td>value 5</td><td>3</td><td>7</td><td>7 ≥ 5 ✓ → return 2</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Decluttering a closet: to clear HALF the wardrobe with the fewest decisions, evict entire CATEGORIES starting with the bulkiest pile. Every swap of "small pile now" for "big pile later" only delays the goal — so biggest-first is provably optimal.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Group-level greedy on sorted frequencies: the exchange argument is trivial because piles are independent — the pattern behind top-k coverage problems everywhere.</div>`});

/* Problem 324 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q324 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 324 · MEDIUM</span>Two City Scheduling</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sort by Delta</span><span class="pill">Assignment</span></div>
<p class="dropcap"><code>2n</code> people each quote a flying cost to city A and to city B: <code>[costA, costB]</code>. Exactly n must go to EACH city. Minimise total cost.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[10,20],[30,200],[400,50],[30,20]] → 110
(A: [10,20] &amp; [30,200]; B: [400,50] &amp; [30,20])</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2n people · 1 ≤ n ≤ 100 · costs ≤ 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Rank by <code>costA − costB</code>: the most A-eager fill A first, the rest fly B. Sending anyone else would only widen the bill.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int twoCitySchedCost(int[][] costs) {
    Arrays.sort(costs, (x, y) -&gt;
        (x[0] - x[1]) - (y[0] - y[1]));
    int total = 0, half = costs.length / 2;
    for (int i = 0; i &lt; costs.length; i++)
        total += i &lt; half ? costs[i][0] : costs[i][1];
    return total;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Deltas (A−B): −170, −10, +10, +350 → sorted order as listed</p>
<table class="tbl">
<tr><th>person</th><th>A−B</th><th>assigned</th><th>pays</th></tr>
<tr><td>[30,200]</td><td>−170</td><td>A</td><td>30</td></tr>
<tr><td>[10,20]</td><td>−10</td><td>A</td><td>10</td></tr>
<tr><td>[30,20]</td><td>+10</td><td>B</td><td>20</td></tr>
<tr><td>[400,50]</td><td>+350</td><td>B</td><td>50 → total 110 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(1) extra (in-place sort).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A company relocating staff to two offices. Rank everyone by how much they PREFER city A over city B — the price GAP, not the absolute price. The most A-homesick employees fill office A; the rest barely suffer in B. Swapping any A-assigned person with any B-assigned person would only inflate the total, so the ranking is safe.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Capped assignment (exactly n per side) melts under DELTA sorting: relative preference is the only thing that matters once both caps are respected.</div>`});

/* Problem 325 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q325 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 325 · EASY</span>Min Cost to Move Chips to The Same Position</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Parity</span><span class="pill">Invariant</span></div>
<p class="dropcap">Chips sit at given positions on a number line. Moving a chip by <strong>±2 is FREE</strong>; by ±1 costs 1. Return the minimum total cost to gather ALL chips on one position.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[2,2,2,3,3]      → 2
[1,1000000000]   → 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ position.length ≤ 100 · 1 ≤ position[i] ≤ 10⁹</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>±2 hops never change parity — so every chip can reach ITS OWN parity class for free. Gather on the smaller class; those few cross over at cost 1 each.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int minCostToMoveChips(int[] pos) {
    int odd = 0, even = 0;
    for (int p : pos) {
        if ((p &amp; 1) == 1) odd++;
        else even++;
    }
    return Math.min(odd, even);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[2,2,2,3,3]</code></p>
<table class="tbl">
<tr><th>parity bucket</th><th>chips</th><th>cost note</th></tr>
<tr><td>even (position 2)</td><td>3</td><td>already together — free</td></tr>
<tr><td>odd (position 3)</td><td>2</td><td>each pays exactly 1 → total 2 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Checkers slide FREE in twos: any chip can wander within its own PARITY neighbourhood forever without spending a coin. So the whole game reduces to two buckets — odd positions and even positions. Park everyone on the smaller bucket; the minority chips each pay exactly one coin to cross the street.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A single invariant (moves of length 2 preserve parity) collapses a billion-wide line into two buckets — invariants before algorithms.</div>`});

/* Problem 326 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q326 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 326 · MEDIUM</span>Boats to Save People</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sort + Two Pointers</span><span class="pill">Pairing Greedy</span></div>
<p class="dropcap">Each rescue boat carries at MOST two people, total weight ≤ <code>limit</code>. Given everyone's weight, return the minimum number of boats.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>people = [3,2,2,1], limit = 3 → 3
([1,2], [2], [3])</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ people.length ≤ 5×10⁴ · 1 ≤ people[i] ≤ limit ≤ 3×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort. The HEAVIEST person must sail; pair them with the LIGHTEST if the boat can hold both — otherwise they row solo.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int numRescueBoats(int[] people, int limit) {
    Arrays.sort(people);
    int l = 0, r = people.length - 1, boats = 0;
    while (l &lt;= r) {
        if (people[l] + people[r] &lt;= limit) l++;  // light one rides along
        r--;                                      // heavy one always sails
        boats++;
    }
    return boats;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: sorted <code>[1,2,2,3]</code>, limit = 3</p>
<table class="tbl">
<tr><th>pair attempt</th><th>sum</th><th>boat</th></tr>
<tr><td>1 + 3</td><td>4 ✗</td><td>[3] alone</td></tr>
<tr><td>1 + 2</td><td>3 ✓</td><td>[1,2]</td></tr>
<tr><td>— last</td><td>2</td><td>[2] → total 3 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Limited dinghies seat only TWO survivors. The heaviest person MUST sail this trip no matter what — so try to squeeze the LIGHTEST survivor beside them as ballast-buddy. If even the lightest overloads the boat, the heavy one rows solo and nobody blames you. Light partners never help anyone else better.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Heaviest must leave now" fixes one end; "lightest is the most shareable companion" fixes the other — the exchange argument writes itself in both directions.</div>`});

/* Problem 327 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q327 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 327 · MEDIUM</span>Advantage Shuffle</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sort + Greedy Match</span><span class="pill">Tian Ji Racing</span></div>
<p class="dropcap">Permute array <code>A</code> to maximise the number of positions where <code>A[i] &gt; B[i]</code>. Return any optimal arrangement.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>A = [2,7,11,15], B = [1,10,4,11]
→ [2,11,7,15]   (wins at all four positions)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁵ · values ≤ 10⁹ · B fixed, A permuted</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Process B from LARGEST down: race your biggest A against it if you can win; otherwise sacrifice your SMALLEST A as fodder.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int[] advantageCount(int[] A, int[] B) {
    int n = A.length;
    Integer[] ord = new Integer[n];
    for (int i = 0; i &lt; n; i++) ord[i] = i;
    Arrays.sort(ord, (x, y) -&gt; B[x] - B[y]);
    Arrays.sort(A);
    int[] ans = new int[n];
    int lo = 0, hi = n - 1;
    for (int t = n - 1; t &gt;= 0; t--) {
        int idx = ord[t];
        if (A[hi] &gt; B[idx]) ans[idx] = A[hi--];   // win with smallest margin
        else                 ans[idx] = A[lo++];  // feed the sacrificial lamb
    }
    return ans;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">B ranked desc: B[3]=11, B[1]=10, B[2]=4, B[0]=1 · A sorted: [2,7,11,15]</p>
<table class="tbl">
<tr><th>rival B</th><th>our biggest left</th><th>verdict</th><th>place</th></tr>
<tr><td>11</td><td>15 &gt; 11 ✓</td><td>win</td><td>idx3 ← 15</td></tr>
<tr><td>10</td><td>11 &gt; 10 ✓</td><td>win</td><td>idx1 ← 11</td></tr>
<tr><td>4</td><td>7 &gt; 4 ✓</td><td>win</td><td>idx2 ← 7</td></tr>
<tr><td>1</td><td>2 &gt; 1 ✓</td><td>win → [2,11,7,15] ✓</td><td>idx0 ← 2</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>The ancient Tian Ji horse-racing strategy: against each of the rival's horses — starting from their STRONGEST — either beat it by the slimmest possible margin using your closest faster horse, or deliberately burn your SLOWEST nag on it. Every sacrifice protects a genuine winning chance elsewhere; sorting both stables makes each call obvious.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Sacrifice logic lives in two pointers: <code>hi</code> spends real winners efficiently, <code>lo</code> converts hopeless races into free disposal. Works for any "beat threshold" matching.</div>`});

/* Problem 328 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q328 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 328 · MEDIUM</span>Maximum Swap</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Last-Occurrence Table</span><span class="pill">Greedy Scan</span></div>
<p class="dropcap">Swap exactly TWO digits of a number (or swap none) to make it as LARGE as possible.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>2736 → 7236   (swap 2 and 7)
9973 → 9973   (already maximal)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 ≤ num ≤ 10⁸</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Record the LAST index of each digit. Scanning left, at the first digit you can improve, grab the LARGEST larger digit to its right (its last copy) and swap.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int maximumSwap(int num) {
    char[] c = String.valueOf(num).toCharArray();
    int[] last = new int[10];
    for (int i = 0; i &lt; c.length; i++) last[c[i] - '0'] = i;
    for (int i = 0; i &lt; c.length; i++)
        for (int d = 9; d &gt; c[i] - '0'; d--)
            if (last[d] &gt; i) {                 // bigger digit lives to the right
                char t = c[i];
                c[i] = c[last[d]];
                c[last[d]] = t;
                return Integer.parseInt(new String(c));
            }
    return num;                                // digits already descending
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>2736</code> — last occurrences: 2@0, 7@1, 3@2, 6@3</p>
<table class="tbl">
<tr><th>i</th><th>digit</th><th>larger digit right?</th><th>action</th></tr>
<tr><td>0</td><td>2</td><td>9..3 → digit 7 sits at idx 1</td><td>swap → 7236 ✓ return</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·10) ≈ O(n). Space: O(n) char buffer.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>One-shot lottery upgrade: walk your ticket from the left and stop at the FIRST slot that could be improved. There, grab the BIGGEST digit available anywhere to its right — taking its LAST copy so higher-value positions stay untouched. If every digit already towers over everything to its right (descending order), the ticket is already a jackpot.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Earliest improvable position × largest available replacement" is provably optimal for one swap — last-occurrence lookup makes the hunt O(10) per position.</div>`});

/* Problem 329 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q329 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 329 · HARD</span>Patching Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Coverage Frontier</span><span class="pill">Greedy Proof</span></div>
<p class="dropcap">Given a sorted positive array, add the fewest PATCH numbers so every integer in <code>[1, n]</code> can be represented as a subset sum.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[1,3],   n = 6  → 1    (add 2 → cover 1..6)
[1,5,10], n = 20 → 2
[1,2,2],  n = 5  → 0</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 2³¹−1 · array sorted · length ≤ 1000 — long arithmetic required!</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Maintain a coverage frontier <code>reach</code>: everything in [1, reach] is makeable. If the next coin ≤ reach+1, absorb it; otherwise the gap forces patching EXACTLY reach+1.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int minPatches(int[] nums, int n) {
    long reach = 0;
    int i = 0, added = 0;
    while (reach &lt; n) {
        if (i &lt; nums.length &amp;&amp; nums[i] &lt;= reach + 1)
            reach += nums[i++];          // extend frontier for free
        else {
            reach += reach + 1;          // mint the forced patch
            added++;
        }
    }
    return added;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,3], n = 6</code></p>
<table class="tbl">
<tr><th>step</th><th>next coin / gap</th><th>reach after</th><th>action</th></tr>
<tr><td>1</td><td>coin 1 ≤ reach+1 = 1</td><td>1</td><td>absorb</td></tr>
<tr><td>2</td><td>coin 3 &gt; gap at reach+1 = 2</td><td>3</td><td>PATCH 2 minted ✓</td></tr>
<tr><td>3</td><td>coin 3 ≤ 4</td><td>6 ≥ 6 done ✓</td><td>absorb → added 1</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(len(nums) + log n) patches each doubling. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Vending-machine coin coverage: suppose your coins already make EVERY amount up to REACH. The instant you meet a coin bigger than REACH+1 there's an unfixable hole at exactly REACH+1 — so you mint precisely that value (never anything else!), instantly DOUBLING your frontier. Small coins first, gaps patched at their exact seam.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The invariant "makeable ⊇ [1, reach]" turns subset-sum existence into one comparison. Patching reach+1 is FORCED (smaller won't fill the hole) and OPTIMAL (it doubles the frontier) — greedy with both necessity and sufficiency proven.</div>`});

/* Problem 330 */
B.spread(
{ kicker: 'DSA · GREEDY SCHEDULING', head: 'Q330 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 330 · HARD</span>Minimum Number of Taps to Open to Water a Garden</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Interval Cover</span><span class="pill">Jump Game II</span></div>
<p class="dropcap">A garden spans <code>[0, n]</code>. Tap <code>i</code> (at position i) wets the interval <code>[i − ranges[i], i + ranges[i]]</code>. Open the FEWEST taps so every garden point gets wet — or return <code>-1</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 5, ranges = [3,4,2,1,1,0] → 1    (tap 1 alone covers [−3..5])
n = 3, ranges = [0,0,0,0]     → -1   (no tap wets anything)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 ≤ n ≤ 10⁴ · 0 ≤ ranges[i] ≤ 100</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Project every tap into a rightmost-reach table per coordinate, then play JUMP GAME II across it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int minTaps(int n, int[] ranges) {
    int[] reach = new int[n + 1];               // best right edge from coord l
    for (int i = 0; i &lt;= n; i++) {
        int l = Math.max(0, i - ranges[i]);
        reach[l] = Math.max(reach[l], i + ranges[i]);
    }
    int taps = 0, curEnd = 0, farEnd = 0;
    for (int i = 0; i &lt;= n; i++) {
        if (i &gt; farEnd) return -1;              // stranded gap
        farEnd = Math.max(farEnd, reach[i]);
        if (i == curEnd &amp;&amp; curEnd &lt; n) {
            taps++;
            curEnd = farEnd;
            if (curEnd &gt;= n) return taps;
        }
    }
    return taps;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n=5, ranges=[3,4,2,1,1,0]</code></p>
<table class="tbl">
<tr><th>tap i</th><th>wets interval</th><th>reach[l] update</th></tr>
<tr><td>0</td><td>[0..3]</td><td>reach[0] = max(·, 3)</td></tr>
<tr><td>1</td><td>[0..5]</td><td>reach[0] = <b>5</b></td></tr>
<tr><td>sweep i=0</td><td colspan="2">farEnd 5 ≥ n at first jump → open ONE tap ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Sprinkler leapfrog: squash each tap's wet circle into a flat INTERVAL, then record for every lawn coordinate "the farthest point any tap starting here can reach". Now hop like Jump Game II — always leap to the farthest frontier — counting leaps. A coordinate you can't even stand on means an unwaterable gap: return −1.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Minimum-interval-cover IS Jump Game II wearing gardening gloves: project intervals onto their left endpoints as rightmost-reaches and reuse the greedy leap template verbatim.</div>`});
})();