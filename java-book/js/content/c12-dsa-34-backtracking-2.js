/* ===== CHAPTER 65 · DSA: Backtracking II — Pruning & Hard Combos ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 65, 'DSA: Backtracking II');

/* Problem 331 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q331 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 331 · HARD</span>N-Queens II</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Bitmask DFS</span><span class="pill">Diagonals</span></div>
<p class="dropcap">Count the total number of ways to place <code>n</code> non-attacking queens on an <code>n×n</code> board.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 4 → 2
n = 1 → 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 15 — arrays-of-booleans barely pass; bitmasks fly.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Three attack maps as LONG masks: columns, ↘ diagonals (row+col constant), ↗ diagonals (row−col offset by n−1).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int totalNQueens(int n) {
    return dfs(0, 0L, 0L, 0L, n);
}
private int dfs(int row, long cols, long d1, long d2, int n) {
    if (row == n) return 1;
    int count = 0;
    for (int col = 0; col &lt; n; col++) {
        long cb = 1L &lt;&lt; col;
        long b1 = 1L &lt;&lt; (row + col);
        long b2 = 1L &lt;&lt; (row - col + n - 1);
        if ((cols &amp; cb) != 0 || (d1 &amp; b1) != 0
                              || (d2 &amp; b2) != 0) continue;
        count += dfs(row + 1, cols | cb, d1 | b1, d2 | b2, n);
    }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>n</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
<tr><th>solutions</th><td>1</td><td>0</td><td>0</td><td>2</td><td>10</td></tr>
</table>
<p class="fs13">Row-by-row placement means conflicts only need checking against EARLIER rows — exactly what the three masks encode.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n!) worst with heavy pruning. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A chess sentinel places queens row by row and lights THREE lantern strips behind her: one per column, one along each ↘ diagonal (where row+col is constant), one along each ↗ diagonal (row−col constant). A candidate square is safe only when all three lanterns stay dark there — and bitboards make each lantern-check a single AND instruction.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Diagonal identity arithmetic (row±col) plus bitboards = the canonical speed recipe; the same trio powers any "no shared line" board problem.</div>`});

/* Problem 332 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q332 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 332 · MEDIUM</span>Combination Sum III</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DFS</span><span class="pill">Ascending Prune</span></div>
<p class="dropcap">Pick EXACTLY <code>k</code> DISTINCT digits from 1–9 summing to <code>n</code>. Return all such combinations (each once).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>k=3, n=7 → [[1,2,4]]
k=3, n=9 → [[1,2,6],[1,3,5],[2,3,4]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 ≤ k ≤ 9 · 1 ≤ n ≤ 60</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Always pick in ASCENDING order — the start pointer alone eliminates every permutation duplicate. Break the moment a digit overshoots the remaining target.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; combinationSum3(int k, int n) {
    List&lt;List&lt;Integer&gt;&gt; out = new ArrayList&lt;&gt;();
    dfs(k, n, 1, new ArrayDeque&lt;&gt;(), out);
    return out;
}
private void dfs(int k, int n, int start,
                 Deque&lt;Integer&gt; path, List&lt;List&lt;Integer&gt;&gt; out) {
    if (n == 0 &amp;&amp; k == 0) { out.add(new ArrayList&lt;&gt;(path)); return; }
    for (int d = start; d &lt;= 9; d++) {
        if (d &gt; n) break;                    // smallest pick overshoots
        path.push(d);
        dfs(k - 1, n - d, d + 1, path, out); // strictly ascending
        path.pop();
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>k=3, n=7</code></p>
<table class="tbl">
<tr><th>path so far</th><th>remaining k / n</th><th>outcome</th></tr>
<tr><td>[1]</td><td>2 / 6</td><td>dive</td></tr>
<tr><td>[1,2]</td><td>1 / 4</td><td>d=4 completes ✓ [1,2,4]; d≥5 break</td></tr>
<tr><td>[1,3]</td><td>1 / 3</td><td>d must be ≥4 but =3 → dead branch pruned by start</td></tr>
<tr><td>[2,…]</td><td colspan="2">min sum 2+3+4=9 &gt; 7 → nothing survives → answer [[1,2,4]] ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: bounded by C(9,k) ≈ constant. Space: O(k) recursion.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Lottery ticket drafting: choose exactly k DISTINCT numbers from 1–9 that add to n. Always draft in ASCENDING order and no combination can ever appear twice or shuffled. The moment even the SMALLEST remaining digit would overshoot your budget, close that branch — later digits only get bigger.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The ascending-start pointer is backtracking's cheapest de-duplicator: order enforcement replaces visited-sets entirely.</div>`});

/* Problem 333 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q333 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 333 · MEDIUM</span>Restore IP Addresses</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DFS</span><span class="pill">Segment Validation</span></div>
<p class="dropcap">Insert exactly THREE dots into a digit string so every field is a legal IPv4 octet (0–255, no leading zeros unless the field is "0"). Return all valid addresses.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"25525511135" → ["255.255.11.135", "255.255.111.35"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 20 · digits only</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Four parts, each ≤3 digits: validate segment rules (no "01"), backtrack on the StringBuilder with a saved length marker.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; restoreIpAddresses(String s) {
    List&lt;String&gt; out = new ArrayList&lt;&gt;();
    dfs(0, 0, s, new StringBuilder(), out);
    return out;
}
private void dfs(int pos, int part, String s,
                 StringBuilder sb, List&lt;String&gt; out) {
    if (part == 4 || pos == s.length()) {
        if (part == 4 &amp;&amp; pos == s.length()) out.add(sb.toString());
        return;
    }
    for (int len = 1; len &lt;= 3 &amp;&amp; pos + len &lt;= s.length(); len++) {
        String seg = s.substring(pos, pos + len);
        if (len &gt; 1 &amp;&amp; seg.charAt(0) == '0') continue;   // leading zero
        if (Integer.parseInt(seg) &gt; 255) continue;
        int mark = sb.length();
        if (part &gt; 0) sb.append('.');
        sb.append(seg);
        dfs(pos + len, part + 1, s, sb, out);
        sb.setLength(mark);                              // backtrack
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"25525511135"</code></p>
<table class="tbl">
<tr><th>branch</th><th>segments tried</th><th>fate</th></tr>
<tr><td>first octet</td><td>"2","25","255"</td><td>all legal — dive into each</td></tr>
<tr><td>"255" branch</td><td>second "255"</td><td>dive; third ∈ {11 → then "135" ✓, 111 → then "35" ✓}</td></tr>
<tr><td colspan="3">→ "255.255.11.135", "255.255.111.35" ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(3⁴) candidate cuts × O(1) checks ≈ constant-bounded. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A postal clerk slides exactly three dots into a strip of digits so each of four fields reads as a real internet octet: values capped at 255, and decorative front-zeros ("01") are forbidden. The moment a prefix can no longer legally grow into four fields, she lifts the dots back off and tries the next cut.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Fixed depth (4 parts) × fixed width (≤3 digits) bounds the tree by a tiny constant — validation rules ARE the pruning.</div>`});

/* Problem 334 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q334 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 334 · MEDIUM</span>Letter Case Permutation</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Binary Choice Tree</span><span class="pill">In-Place Toggle</span></div>
<p class="dropcap">Every LETTER of <code>s</code> may appear lower- or UPPERCASE; digits stay fixed. Return all possible variants.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"a1b2" → ["a1b2","a1B2","A1b2","A1B2"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 12 · letters and digits</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Skip digit slots; at each letter fork two branches (keep / flip) on a shared char array, restoring after the second dive.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; letterCasePermutation(String s) {
    List&lt;String&gt; out = new ArrayList&lt;&gt;();
    dfs(0, s.toCharArray(), out);
    return out;
}
private void dfs(int i, char[] c, List&lt;String&gt; out) {
    while (i &lt; c.length &amp;&amp; !Character.isLetter(c[i])) i++;
    if (i == c.length) { out.add(new String(c)); return; }
    dfs(i + 1, c, out);                       // keep current case
    c[i] ^= 32;                               // flip: 'a'^32='A'
    dfs(i + 1, c, out);
    c[i] ^= 32;                               // restore for siblings
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"a1b"</code></p>
<table class="tbl">
<tr><th>letter slots</th><th>choices</th><th>emitted</th></tr>
<tr><td>'a' kept</td><td>'b' kept / flipped</td><td>"a1b", "a1B"</td></tr>
<tr><td>'a' flipped</td><td>'b' kept / flipped</td><td>"A1b", "A1B" → 4 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · 2^letters). Space: O(n) recursion + output.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A sign-painter with two paint pots — LOWER-case and UPPER-case — walks the sign slot by slot. Digits are pre-printed and untouchable. At every letter she paints it one way, snaps a photo, repaints the other way for the second photo, then wipes clean so earlier choices stay valid for later letters.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The XOR-32 toggle is a cute ASCII trick (case bit flip), but clarity first: <code>Character.toUpperCase/toLowerCase</code> reads better in interviews.</div>`});

/* Problem 335 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q335 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 335 · MEDIUM</span>Beautiful Arrangement</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DFS by Position</span><span class="pill">Divisibility Prune</span></div>
<p class="dropcap">A permutation <code>p</code> of 1..n is <strong>beautiful</strong> when every position i (1-indexed) satisfies <code>p[i] % i == 0</code> OR <code>i % p[i] == 0</code>. Count beautiful arrangements.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 1 → 1
n = 2 → 2    ([1,2] and [2,1])</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 15</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Fill POSITIONS left to right; try candidates LARGEST first — big numbers trip divisibility checks early, pruning the tree sooner.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int countArrangement(int n) {
    boolean[] used = new boolean[n + 1];
    return dfs(1, n, used);
}
private int dfs(int pos, int n, boolean[] used) {
    if (pos &gt; n) return 1;
    int count = 0;
    for (int v = n; v &gt;= 1; v--) {            // largest first: prune early
        if (!used[v] &amp;&amp; (v % pos == 0 || pos % v == 0)) {
            used[v] = true;
            count += dfs(pos + 1, n, used);
            used[v] = false;
        }
    }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 2</code></p>
<table class="tbl">
<tr><th>pos 1 tries</th><th>pos 2 legal values</th><th>tally</th></tr>
<tr><td>v = 2 ✓ (2 % 1)</td><td>v = 1: pos 2 → 2 % 1 == 0 ✓</td><td>+1</td></tr>
<tr><td>v = 1 ✓ (1%1)</td><td>v = 2 ✓ (2%2==0)</td><td>+1 → total 2 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: far below O(n!) with pruning. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A seat-swap dance: dancer numbered v may stand at position i only when one divides the other — they're musical partners. Fill positions from stage-left; audition LARGEST dancers first because big numbers fail divisibility tests more often, killing doomed branches before they grow.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Even without explicit cuts, CANDIDATE ORDER is a pruning decision — trying restrictive values first collapses failing subtrees at their root.</div>`});

/* Problem 336 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q336 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 336 · MEDIUM</span>Matchsticks to Square</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Bucket DFS</span><span class="pill">Symmetry Prune</span></div>
<p class="dropcap">Use EVERY matchstick exactly once to form a perfect square (four equal sides). Possible?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[1,1,2,2,2] → true    ([1,2] [1,2] [2] [2])
[3,3,3,3,4] → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>4 ≤ sticks.length ≤ 15 · 1 ≤ sticks[i] ≤ 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort DESCENDING; drop each stick into one of four side-buckets that still fits; never try a second EMPTY bucket after an empty one failed.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean makesquare(int[] st) {
    if (st.length &lt; 4) return false;
    long sum = 0;
    for (int x : st) sum += x;
    if (sum % 4 != 0) return false;
    long side = sum / 4;
    Arrays.sort(st);
    for (int l = 0, r = st.length - 1; l &lt; r; l++, r--) {
        int t = st[l]; st[l] = st[r]; st[r] = t;   // descending
    }
    if (st[0] &gt; side) return false;
    long[] sd = new long[4];
    return dfs(0, st, sd, side);
}
private boolean dfs(int i, int[] st, long[] sd, long side) {
    if (i == st.length) return true;
    for (int s = 0; s &lt; 4; s++) {
        if (sd[s] + st[i] &gt; side) continue;
        sd[s] += st[i];
        if (dfs(i + 1, st, sd, side)) return true;
        sd[s] -= st[i];
        if (sd[s] == 0) break;      // empty bucket failed → twins will too
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,1,2,2,2]</code> — side target 8/4 = 2</p>
<table class="tbl">
<tr><th>stick</th><th>buckets after placement</th></tr>
<tr><td>2</td><td>[2,0,0,0]</td></tr>
<tr><td>2</td><td>[2,2,0,0]</td></tr>
<tr><td>2</td><td>[2,2,2,0]</td></tr>
<tr><td>1</td><td>sides 1–3 hold 2 already → lands in EMPTY bucket: [2,2,2,1]</td></tr>
<tr><td>1</td><td>joins the other 1 → [2,2,2,2] ✓ TRUE</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: exponential worst case, pruned hard in practice. Space: O(4).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Four gift boxes must end EXACTLY equal using every stick. Wrap sticks LONGEST-first into whichever box still has room; when a placement fails somewhere down the line, never retry an equally-EMPTY box — identical starting states share identical fates, so skip the twins.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The empty-box symmetry break is pure state deduplication by VALUE — the same idea scales up to k-subset problems on the next page.</div>`});

/* Problem 337 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q337 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 337 · MEDIUM</span>Partition to K Equal Sum Subsets</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Bucket DFS</span><span class="pill">State Dedupe</span></div>
<p class="dropcap">Split ALL numbers into <code>k</code> subsets with EQUAL sums. Possible?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[4,3,2,3,5,2,1], k = 4 → true
([5] · [1,4] · [2,3] · [2,3])</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ k ≤ n ≤ 16 · values ≤ 10⁴ — bitmask DP also viable; DFS is cleaner.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Gems heaviest-first into buckets that fit; skip buckets whose CURRENT LOAD was already tried for this gem (identical loads share fates); empty-bucket break too.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean canPartitionKSubsets(int[] nums, int k) {
    long sum = 0;
    for (int x : nums) sum += x;
    if (sum % k != 0) return false;
    long target = sum / k;
    Arrays.sort(nums);
    for (int l = 0, r = nums.length - 1; l &lt; r; l++, r--) {
        int t = nums[l]; nums[l] = nums[r]; nums[r] = t;
    }
    if (nums[0] &gt; target) return false;
    long[] b = new long[k];
    return dfs(0, nums, b, target);
}
private boolean dfs(int i, int[] nums, long[] b, long target) {
    if (i == nums.length) return true;
    Set&lt;Long&gt; tried = new HashSet&lt;&gt;();
    for (int j = 0; j &lt; b.length; j++) {
        if (b[j] + nums[i] &gt; target || !tried.add(b[j])) continue;
        b[j] += nums[i];
        if (dfs(i + 1, nums, b, target)) return true;
        b[j] -= nums[i];
        if (b[j] == 0) break;              // all-empty twins identical
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[5,4,3,3,2,2,1]</code>, target = 20/4 = 5</p>
<table class="tbl">
<tr><th>gem</th><th>placement</th><th>buckets after</th></tr>
<tr><td>5</td><td>b1 full</td><td>[5,0,0,0]</td></tr>
<tr><td>4,3</td><td>separate empties (+dedupe)</td><td>[5,4,3,0]</td></tr>
<tr><td>3</td><td>b2 would overflow (6&gt;5) → drops into the last empty chest</td><td>[5,4,3,3]</td></tr>
<tr><td>2,2,1</td><td>fill to exactly 5s: [5][4+1][3+2][3+2] ✓ TRUE</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(k^n) naive → heavily pruned. Space: O(k).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Dividing treasure into k IDENTICAL chests: drop gems HEAVIEST-first into any chest with room. Two golden rules kill the exponential blow-up: never re-test a chest whose current LOAD you already failed this gem on (equal loads ⇒ equal futures), and stop trying fresh empty chests once one has failed — they're indistinguishable twins.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Deduplicating bucket VALUES mid-search is a lightweight cousin of bitmask-DP memoisation — often enough at n ≤ 16 and far easier to write under interview pressure.</div>`});

/* Problem 338 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q338 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 338 · HARD</span>Sudoku Solver</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Constraint DFS</span><span class="pill">In-Place Mutate</span></div>
<p class="dropcap">Fill the empty cells (<code>'.'</code>) of a Sudoku board in place so every row, column and 3×3 block contains digits 1–9 exactly once. Exactly one solution is guaranteed.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>classic 9×9 puzzle → solved board written back into the same array</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>board.length == 9 · guaranteed solvable with a unique answer</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Walk the 81 cells as one flat index; at each blank try digits that break no treaty, recurse, erase on failure.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public void solveSudoku(char[][] b) { dfs(b, 0); }
private boolean dfs(char[][] b, int idx) {
    while (idx &lt; 81 &amp;&amp; b[idx / 9][idx % 9] != '.') idx++;
    if (idx == 81) return true;
    int r = idx / 9, c = idx % 9;
    for (char ch = '1'; ch &lt;= '9'; ch++) {
        if (!ok(b, r, c, ch)) continue;
        b[r][c] = ch;
        if (dfs(b, idx + 1)) return true;
        b[r][c] = '.';                    // undo
    }
    return false;
}
private boolean ok(char[][] b, int r, int c, char ch) {
    for (int i = 0; i &lt; 9; i++) {
        if (b[r][i] == ch || b[i][c] == ch) return false;
        if (b[3*(r/3) + i/3][3*(c/3) + i%3] == ch) return false;
    }
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>cell state</th><th>behaviour</th></tr>
<tr><td>filled cell</td><td>skipped instantly via flat-index scan</td></tr>
<tr><td>blank, digit legal</td><td>write it, dive deeper</td></tr>
<tr><td>all 9 digits fail</td><td>erase and return false — caller undoes ITS pick too</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: exponential worst case; unique-solution boards prune fast. Space: O(81) recursion.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A crossword sentry marches through all 81 squares left-to-right, top-to-bottom. At every BLANK she auditions digits 1–9 against three treaties — its row, its column, its 3×3 box. A digit that survives gets inked and she marches on; if the march later hits a dead end, she erases her last ink and tries the next audition number.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The flat-index scan doubles as both "find next blank" AND the recursion spine — no separate candidate search needed. Follow-up: maintain row/col/block bitmasks + pick the MOST-constrained blank first (MRV) for dramatic speedups.</div>`});

/* Problem 339 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q339 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 339 · HARD</span>Expression Add Operators</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Streaming Eval</span><span class="pill">Pending Term</span></div>
<p class="dropcap">Insert <code>+ − ×</code> between digits of <code>s</code> (no reordering) so the expression equals <code>target</code>. Normal precedence applies. Return every valid expression.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"123", 6 → ["1*2*3","1+2+3"]
"232", 8 → ["2*3+2","2+3*2"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 10 · digits only · target fits 32-bit</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Stream-evaluate carrying TWO numbers: settled value + PENDING multiplicative term. On '×' fold cur into pending; on '+'/'−' settle pending first — that's how precedence survives left-to-right DFS.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; addOperators(String s, long target) {
    List&lt;String&gt; out = new ArrayList&lt;&gt;();
    dfs(0, 0, 0, new StringBuilder(), s, target, out);
    return out;
}
private void dfs(int i, long val, long pend, StringBuilder sb,
                 String s, long t, List&lt;String&gt; out) {
    if (i == s.length()) {
        if (val == t) out.add(sb.toString());
        return;
    }
    for (int j = i; j &lt; s.length(); j++) {
        if (j &gt; i &amp;&amp; s.charAt(i) == '0') break;   // leading zero veto
        long cur = Long.parseLong(s.substring(i, j + 1));
        int len = sb.length();
        if (i == 0) { sb.append(cur);
            dfs(j + 1, cur, cur, sb, s, t, out); }
        else {
            sb.append('+').append(cur);
            dfs(j + 1, val + cur, cur, sb, s, t, out);   sb.setLength(len);
            sb.append('-').append(cur);
            dfs(j + 1, val - cur, -cur, sb, s, t, out);  sb.setLength(len);
            sb.append('*').append(cur);
            dfs(j + 1, val - pend + pend * cur,
                        pend * cur, sb, s, t, out);  sb.setLength(len);
        }
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Path building <code>"232"</code> → <code>"2*3+2"</code>, target 8:</p>
<table class="tbl">
<tr><th>op / chunk</th><th>settled val</th><th>pending term</th></tr>
<tr><td>start "2"</td><td>2</td><td>2</td></tr>
<tr><td>*3 → retro-bind</td><td>2−2+6 = 6</td><td>6</td></tr>
<tr><td>+2 → settle pending</td><td><b>8</b> ✓ emit</td><td>—</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(4^n) branch spots (three ops or glue). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A calculator craftsman weaves operators between digits while remembering TWO running figures — the SETTLED total and the LAST multiplicative CHUNK still awaiting its fate. Multiplication must retroactively bind its neighbours before any plus/minus ever sees them, so on '×' he surgically swaps the pending chunk for chunk×digit instead of touching the settled total.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The (value, pending) pair evaluates PRECEDENCE during streaming — no parse trees needed. The saved-StringBuilder-length trick keeps backtracking allocation-free.</div>`});

/* Problem 340 */
B.spread(
{ kicker: 'DSA · BACKTRACKING II', head: 'Q340 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 340 · MEDIUM</span>Splitting a String Into Descending Consecutive Values</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DFS</span><span class="pill">Forced Successor</span></div>
<p class="dropcap">Slice the numeric string into AT LEAST two pieces whose values descend by EXACTLY 1 each (e.g. 5 → 4 → 3). Values may contain decorative leading zeros ("05" = 5) and must fit in a 64-bit range. Possible?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"050043" → true    (05 | 004 | 3  =  5, 4, 3)
"1234"   → false
"1000000000000" → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 20 · digits only</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Only the FIRST slice is a free choice — every later slice's value is FORCED to be previous−1, so mismatches die instantly. Cap slices at ~10 digits to dodge overflow.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean splitString(String s) {
    return dfs(0, -1, 0, s);          // pieces counted; need ≥ 2
}
private boolean dfs(int i, long prev, int pieces, String s) {
    if (i == s.length()) return pieces &gt;= 2;
    for (int j = i; j &lt; s.length(); j++) {
        long cur = Long.parseLong(s.substring(i, j + 1));
        if (pieces == 0 || cur == prev - 1)
            if (dfs(j + 1, cur, pieces + 1, s)) return true;
        if (cur &gt;= 10_000_000_000L) break;   // >10 digits can't fit long-safe chain
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"050043"</code></p>
<table class="tbl">
<tr><th>cut</th><th>value</th><th>expected next</th></tr>
<tr><td>"0"</td><td>0</td><td>next slice must be −1 → branch dies instantly</td></tr>
<tr><td>"05"</td><td>5</td><td>forced 4 → "004" parses to 4 ✓</td></tr>
<tr><td>"004"</td><td>4</td><td>forced 3 → "3" ✓ → TRUE (three pieces)</td></tr>
</table>
<p class="fs13">Note: "1234" fails since every first-cut chain breaks; the 13-char giant overflows past the cap.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) effective — forced successors leave branching only at the first cut. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A staircase codebreaker slices a digit strip into numbers that must descend by EXACTLY ONE. The first slice is a genuine choice; after that every following slice's value is PRE-ORDAINED — one comparison decides life or death. Decorative zeros are just costumes: "004" performs as plain old 4.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>When all but the first decision is DETERMINED by its predecessor, backtracking degenerates into n independent chains — spot forced-successor structures and the search tree flattens itself. Chapter capstone: pruning power grows when constraints do the deciding for you.</div>`});
})();