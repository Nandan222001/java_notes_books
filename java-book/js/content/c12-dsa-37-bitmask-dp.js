/* ===== CHAPTER 68 · DSA: Bitmask DP ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 68, 'DSA: Bitmask DP');

/* Problem 361 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q361 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 361 · HARD</span>Minimum XOR Sum of Two Arrays</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Assignment DP</span><span class="pill">Bitcount Trick</span></div>
<p class="dropcap">Permute <code>nums2</code> however you like; minimise <code>Σ nums1[i] XOR perm[i]</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>nums1 = [1,2,3], nums2 = [3,2,1]   → 0   (match equal values)
nums1 = [1,0,3], nums2 = [5,3,4]   → 8</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 14 · values ≤ 10⁷ — C(n,n)=14! permutations impossible.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[mask] = best cost having matched the FIRST <code>popcount(mask)</code> elements of nums1 using the plug-set mask.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int minimumXORSum(int[] nums1, int[] nums2) {
    int n = nums1.length;
    int[] dp = new int[1 &lt;&lt; n];
    Arrays.fill(dp, Integer.MAX_VALUE);
    dp[0] = 0;
    for (int mask = 1; mask &lt; (1 &lt;&lt; n); mask++) {
        int i = Integer.bitCount(mask) - 1;      // left index being placed
        for (int j = 0; j &lt; n; j++) {
            if ((mask &amp; (1 &lt;&lt; j)) == 0) continue;
            int prev = dp[mask ^ (1 &lt;&lt; j)];
            if (prev == Integer.MAX_VALUE) continue;
            dp[mask] = Math.min(dp[mask],
                prev + (nums1[i] ^ nums2[j]));
        }
    }
    return dp[(1 &lt;&lt; n) - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,2,3]</code> vs <code>[3,2,1]</code></p>
<table class="tbl">
<tr><th>mask</th><th>i placed</th><th>best dp</th></tr>
<tr><td>{plug1}</td><td>nums1[0]</td><td>1^3 = 2</td></tr>
<tr><td>{plug3}</td><td>nums1[0]</td><td>1^1 = 0 ← winner line</td></tr>
<tr><td>{all}</td><td>all three</td><td><b>0</b> ✓ (identity permutation)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(2ⁿ·n). Space: O(2ⁿ).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A wiring board: every left socket must connect to exactly one right PLUG, minimising total spark (XOR). A bitmask remembers which plugs are already claimed — and the magic trick is that <code>popcount(mask)</code> automatically tells you WHICH left socket you're currently seating, so one dimension vanishes.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>In assignment DPs over two arrays, popcount(mask) replaces an explicit index — halves the state tuple for free.</div>`});

/* Problem 362 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q362 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 362 · MEDIUM</span>Maximum Rows Covered by Columns</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Row Pre-Mask</span><span class="pill">Subset Enum</span></div>
<p class="dropcap">A binary matrix: choose exactly <code>numSelect</code> COLUMNS. A row is "covered" when every 1 it contains sits in a chosen column. Maximise covered rows.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>mat = [[0,0,0],[1,0,1],[1,1,1],[1,0,1]], numSelect = 2 → 3
(choose columns 0 &amp; 2)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m, n ≤ 12 · n even — all column subsets number only 4096.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Pre-encode each ROW as a bitmask of its columns. Selection covers row iff <code>rowMask &amp; ~selection == 0</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int maximumRows(int[][] mat, int cols) {
    int m = mat.length, n = mat[0].length;
    int[] rowMask = new int[m];
    for (int r = 0; r &lt; m; r++)
        for (int c = 0; c &lt; n; c++)
            if (mat[r][c] == 1) rowMask[r] |= 1 &lt;&lt; c;
    int best = 0;
    for (int sel = 0; sel &lt; (1 &lt;&lt; n); sel++) {
        if (Integer.bitCount(sel) != cols) continue;
        int covered = 0;
        for (int r = 0; r &lt; m; r++)
            if ((rowMask[r] &amp; ~sel) == 0) covered++;
        best = Math.max(best, covered);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Example masks: rows → [000, 101, 111, 101]; pick sel = {c0,c2} = 101₂</p>
<table class="tbl">
<tr><th>row mask</th><th>rowMask &amp; ~sel</th><td>covered?</td></tr>
<tr><td>000</td><td>000 ✓</td><td>+1</td></tr>
<tr><td>101</td><td>000 ✓</td><td>+1 ×2 more rows → total 3 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(2ⁿ·m). Space: O(m).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Exam-topic coverage: pre-compress every ROW into a bitmask of the topics it needs. A chosen column-set covers a row exactly when selection ⊇ row-mask — one AND plus one test. With only twelve columns there are just 4096 possible selections; brute force becomes elegant.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>When a dimension is ≤ ~20 wide, encode it as a bitmask FIRST and let bitwise ops do subset logic at machine speed.</div>`});

/* Problem 363 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q363 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 363 · HARD</span>Shortest Path Visiting All Nodes</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">State-Space BFS</span><span class="pill">Node×Mask</span></div>
<p class="dropcap">A connected undirected graph. Find the length of the SHORTEST walk that visits EVERY node at least once — revisits and re-used edges allowed.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>graph = [[1,2,3],[0],[0],[0]]        → 4
graph = [[1],[0,2,4],[1,3,4],[2],[1,2]] → 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 12 — state space n·2ⁿ fits BFS comfortably.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>BFS over PAIRED state (currentNode, visitedMask), seeded from EVERY node simultaneously; first state with full mask wins.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int shortestPathLength(int[][] graph) {
    int n = graph.length, full = (1 &lt;&lt; n) - 1;
    boolean[][] seen = new boolean[n][1 &lt;&lt; n];
    Deque&lt;int[]&gt; q = new ArrayDeque&lt;&gt;();
    for (int i = 0; i &lt; n; i++) {
        q.offer(new int[]{i, 1 &lt;&lt; i});
        seen[i][1 &lt;&lt; i] = true;
    }
    for (int steps = 0; !q.isEmpty(); steps++) {
        for (int sz = q.size(); sz &gt; 0; sz--) {
            int[] s = q.poll();
            if (s[1] == full) return steps;
            for (int v : graph[s[0]]) {
                int nm = s[1] | (1 &lt;&lt; v);
                if (!seen[v][nm]) {
                    seen[v][nm] = true;
                    q.offer(new int[]{v, nm});
                }
            }
        }
    }
    return -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Star graph example <code>[[1,2,3],[0],[0],[0]]</code>: best route leaves from a LEAF, sweeps to hub, fans out, returns.</p>
<table class="tbl">
<tr><th>wave</th><th>frontier states (node,mask)</th><th>note</th></tr>
<tr><td>seed</td><td>(0,0001)(1,0010)(2,0100)(3,1000)</td><td>four parallel walkers</td></tr>
<tr><td>…</td><td>masks grow via edges only</td><td>hub revisits flip new bits</td></tr>
<tr><td>4</td><td>(2,1111) — first full mask</td><td>return 4 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·2ⁿ·deg). Space: O(n·2ⁿ).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A postman's state is TWO facts: WHERE am I and WHICH mailboxes have I hit? Revisiting nodes is fine — crossing back can flip fresh bits. BFS over this paired state space, seeded from every node at once, guarantees the first full-mask arrival is minimal.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Travelling-salesman-lite lives on node×2ⁿ state space — revisit-allowed walks make plain BFS sufficient (no DP relaxation needed).</div>`});

/* Problem 364 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q364 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 364 · HARD</span>Maximum Students Taking Exam</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Row-Bitmask DP</span><span class="pill">Submask Iteration</span></div>
<p class="dropcap">Exam grid: <code>'.'</code> = usable seat, <code>'#'</code> = broken. Students can't sit LEFT/RIGHT of each other, nor DIAGONALLY in front or behind. Maximise students seated.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>seats = [["#",".","#","#",".","#"],
         [".","#","#","#","#","."],
         ["#",".","#","#",".","#"]] → 10</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ m, n ≤ 8 — row masks are at most 8 bits wide</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Per-row DP on seating PATTERNS: a pattern must fit broken seats, dodge its own left/right pairs, and dodge the previous row's diagonals.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int maxStudents(char[][] seats) {
    int m = seats.length, n = seats[0].length;
    int[] valid = new int[m];
    for (int r = 0; r &lt; m; r++)
        for (int c = 0; c &lt; n; c++)
            if (seats[r][c] == '.') valid[r] |= 1 &lt;&lt; c;
    return dfs(0, 0, valid, m, n, new HashMap&lt;&gt;());
}
private int dfs(int r, int prev, int[] valid, int m, int n,
                Map&lt;Integer, Integer&gt; memo) {
    if (r == m) return 0;
    int key = r * (1 &lt;&lt; n) + prev;
    Integer got = memo.get(key);
    if (got != null) return got;
    int best = dfs(r + 1, 0, valid, m, n, memo);   // seat nobody here
    for (int cur = valid[r]; cur &gt; 0; cur = (cur - 1) &amp; valid[r]) {
        if ((cur &amp; (cur &lt;&lt; 1)) != 0) continue;      // side-by-side
        if ((cur &amp; (prev &lt;&lt; 1)) != 0
            || (cur &amp; (prev &gt;&gt; 1)) != 0) continue;  // diagonal clash
        best = Math.max(best,
            Integer.bitCount(cur)
                + dfs(r + 1, cur, valid, m, n, memo));
    }
    memo.put(key, best);
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>row pattern check</th><th>bit test</th></tr>
<tr><td>two adjacent students inside a row</td><td>cur &amp; (cur&lt;&lt;1) ≠ 0 → reject</td></tr>
<tr><td>diagonal over previous row</td><td>cur &amp; (prev&lt;&lt;1 | prev&gt;&gt;1) ≠ 0 → reject</td></tr>
<tr><td>broken-seat overlap</td><td>impossible: cur ⊆ valid[r]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m · P²), P = patterns per row ≤ 2⁸. Space: O(m·P).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>An exam-hall usher processes rows top-down, remembering only LAST row's seating bitmap. A candidate bitmap for this row must dodge its own horizontal neighbours AND both diagonals of the row above. The submask iterator <code>cur=(cur−1)&amp;valid</code> visits only LEGAL subsets — never wasting time on broken seats.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The submask-enumeration loop is the bitmask world's "iterate all subsets of a set" workhorse — memorise its shape.</div>`});

/* Problem 365 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q365 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 365 · HARD</span>Number of Ways to Wear Different Hats to Each Other</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Dimension Swap</span><span class="pill">Hat-by-Hat DP</span></div>
<p class="dropcap"><code>n ≤ 10</code> people; hats numbered 1..40. Each person wears ONE hat they like; every hat worn by at most one person. Count valid assignments mod 10⁹+7.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>hats = [[3,4],[4,5],[5]]      → 1
hats = [[3,5,1],[3,5]]        → 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 10 · hats ≤ 40 — person-dimension DP would be 40ⁿ!</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>DIMENSION SWAP: iterate HATS 1→40 (small outer loop), track which PEOPLE are crowned via a 10-bit mask.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int numberWays(List&lt;List&lt;Integer&gt;&gt; hats) {
    int n = hats.size(), MOD = 1_000_000_007;
    List&lt;List&lt;Integer&gt;&gt; likers = new ArrayList&lt;&gt;();
    for (int h = 0; h &lt;= 40; h++) likers.add(new ArrayList&lt;&gt;());
    for (int p = 0; p &lt; n; p++)
        for (int h : hats.get(p)) likers.get(h).add(p);
    long[] dp = new long[1 &lt;&lt; n];
    dp[0] = 1;                                   // nobody crowned yet
    for (int h = 1; h &lt;= 40; h++) {
        long[] ndp = dp.clone();                 // option: skip hat h
        for (int mask = 0; mask &lt; (1 &lt;&lt; n); mask++) {
            if (dp[mask] == 0) continue;
            for (int p : likers.get(h)) {
                if ((mask &amp; (1 &lt;&lt; p)) != 0) continue;
                int nm = mask | (1 &lt;&lt; p);
                ndp[nm] = (ndp[nm] + dp[mask]) % MOD;
            }
        }
        dp = ndp;
    }
    return (int) dp[(1 &lt;&lt; n) - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[3,4],[4,5],[5]]</code> — likers: hat3→{0}, hat4→{0,1}, hat5→{1,2}</p>
<table class="tbl">
<tr><th>hat</th><th>choices</th><th>full-mask ways after</th></tr>
<tr><td>3</td><td>p0 or skip</td><td>—</td></tr>
<tr><td>4</td><td>p0/p1/skip</td><td>—</td></tr>
<tr><td>5</td><td>p1/p2/skip</td><td>only p0=hat3? chain → exactly <b>1</b> full assignment ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(40 · 2ⁿ · avgLikers). Space: O(2ⁿ).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A hat parade processed BY HAT NUMBER, not by person: hat #1 first decides which of its admirers gets it (or nobody), then hat #2 chooses among remaining bare heads… The people-bitmask remembers who's already crowned. Swapping the loop dimensions — small hats outside, bitmask inside — is what turns 40ⁿ into 40·2ⁿ.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>When one dimension dwarfs the other, SWAP THE LOOPS and bitmask the big side — the defining trick of this whole chapter.</div>`});

/* Problem 366 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q366 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 366 · HARD</span>Smallest Sufficient Team</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Skill-Mask Relaxation</span><span class="pill">Roster Bits</span></div>
<p class="dropcap">Hire the SMALLEST team of people so that together they cover every skill in <code>req_skills</code>. Return their indices (any valid answer).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>req = ["java","nodejs","reactjs"]
people = [["java"],["nodejs"],["nodejs","reactjs"]]
→ [0,2]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>skills ≤ 16 · people ≤ 60 — bitmask on skills is mandatory.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[mask] = smallest team covering skill-set mask. Forward-relax: any team + one specialist yields a candidate for mask | theirSkills. Carry the ROSTER as a long bitset alongside the count.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int[] smallestSufficientTeam(String[] req,
                                    List&lt;List&lt;String&gt;&gt; peeps) {
    Map&lt;String, Integer&gt; id = new HashMap&lt;&gt;();
    for (String s : req) id.put(s, id.size());
    int m = req.length, full = (1 &lt;&lt; m) - 1, n = peeps.size();
    int[] skill = new int[n];
    for (int p = 0; p &lt; n; p++)
        for (String s : peeps.get(p))
            if (id.containsKey(s)) skill[p] |= 1 &lt;&lt; id.get(s);
    int[] size = new int[1 &lt;&lt; m];
    long[] roster = new long[1 &lt;&lt; m];
    Arrays.fill(size, Integer.MAX_VALUE / 2);
    size[0] = 0;
    for (int mask = 0; mask &lt; full; mask++) {
        if (size[mask] == Integer.MAX_VALUE / 2) continue;
        for (int p = 0; p &lt; n; p++) {
            int add = skill[p] &amp; ~mask;
            if (add == 0) continue;              // brings nothing new
            int nm = mask | skill[p];
            if (size[mask] + 1 &lt; size[nm]) {
                size[nm] = size[mask] + 1;
                roster[nm] = roster[mask] | (1L &lt;&lt; p);
            }
        }
    }
    long t = roster[full];
    int[] out = new int[Long.bitCount(t)];
    for (int p = 0, k = 0; p &lt; n; p++)
        if ((t &amp; (1L &lt;&lt; p)) != 0) out[k++] = p;
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input example — skills java/node/react as bits 0/1/2</p>
<table class="tbl">
<tr><th>mask reached</th><th>via person</th><th>team size</th></tr>
<tr><td>001 (java)</td><td>P0</td><td>1</td></tr>
<tr><td>010 (node)</td><td>P1 or P2</td><td>1</td></tr>
<tr><td>011</td><td>P0+P1 / P0+P2</td><td>2</td></tr>
<tr><td><b>111 full</b></td><td>+P2 (adds react) → [0,2] ✓</td><td>2 minimal</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(2^m · n). Space: O(2^m · 1) counts plus long roster bitsets per state.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Assembling a heist crew: track WHICH SKILLS are covered with a checklist bitmask. Any partial crew plus one specialist produces a candidate for the union of their skills — relax counts forward, and store the exact ROSTER BITS alongside each state so reconstruction is instant.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Adding skills only GROWS the mask ⇒ the DP is a DAG over masks — forward relaxation replaces recursion entirely.</div>`});

/* Problem 367 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q367 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 367 · HARD</span>Tiling a Rectangle with the Fewest Squares</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Skyline Backtracking</span><span class="pill">Bound Pruning</span></div>
<p class="dropcap">Tile an <code>n × m</code> rectangle using the FEWEST axis-aligned SQUARES (integer sides). Return that minimum count.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 2,  m = 3  → 3
n = 5,  m = 8  → 5    (the infamous non-greedy case!)
n = 11, m = 13 → 6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n, m ≤ 13 — profile states fit in small arrays.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track the HEIGHT PROFILE across columns. Always place the largest possible square on the LOWEST ledge; branch over sizes big-to-small; prune when count ≥ best found.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>private int best;
public int tilingRectangle(int n, int m) {
    best = n * m;                       // unit-square fallback
    dfs(new int[n], 0, m);
    return best;
}
private void dfs(int[] h, int cnt, int cap) {
    if (cnt &gt;= best) return;            // optimistic-bound prune
    int pos = -1, min = Integer.MAX_VALUE;
    for (int i = 0; i &lt; h.length; i++)
        if (h[i] &lt; min) { min = h[i]; pos = i; }
    if (min == cap) { best = Math.min(best, cnt); return; }
    int width = 1;
    while (pos + width &lt; h.length &amp;&amp; h[pos + width] == min) width++;
    int maxSide = Math.min(width, cap - min);
    for (int side = maxSide; side &gt;= 1; side--) {   // big squares first
        for (int i = pos; i &lt; pos + side; i++) h[i] += side;
        dfs(h, cnt + 1, cap);
        for (int i = pos; i &lt; pos + side; i++) h[i] -= side;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>2×3</code> (columns n=2, height cap 3)</p>
<table class="tbl">
<tr><th>move</th><th>profile [c0,c1]</th><th>count</th></tr>
<tr><td>square side2 @ ledge0</td><td>[2,2]</td><td>1</td></tr>
<tr><td>side1 ×2 (cap − min = 1)</td><td>[3,3] full</td><td><b>3</b> ✓ minimal</td></tr>
</table>
<p class="fs13">(5×8 famously needs 5 — pure greedy would misfire, which is why we branch.)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: exponential but heavily pruned. Space: O(n) recursion.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A skyline builder keeps the HEIGHT PROFILE across the lot's columns and always drops the BIGGEST legal square onto the lowest ledge — branching big-to-small when several sizes fit, and abandoning any branch whose square-count already rivals the champion found elsewhere. The notorious 5×8 board proves greedy alone lies; the search catches its lie.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Profile-state backtracking + "prune when ≥ incumbent" is the standard exact-solver recipe for geometric packing puzzles.</div>`});

/* Problem 368 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q368 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 368 · MEDIUM</span>Maximum Compatibility Score</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Assignment DP</span><span class="pill">Precomputed Scores</span></div>
<p class="dropcap">Pair each student with a distinct mentor. Compatibility = number of matching YES/NO answers between them. Maximise the TOTAL compatibility across all pairs.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>students=[[1,1,0],[1,0,1],[0,0,1]]
mentors=[[1,0,0],[0,0,1],[1,1,0]] → 8</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 8 · answers ≤ 100 — the textbook assignment-problem size.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Precompute score[s][m], then DP over the FREE-MENTOR mask: student number <code>popcount(mask)</code> picks any still-free mentor.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int maxCompatibilitySum(int[][] st, int[][] mt) {
    int n = st.length;
    int[][] sc = new int[n][n];
    for (int s = 0; s &lt; n; s++)
        for (int m = 0; m &lt; n; m++)
            for (int q = 0; q &lt; st[0].length; q++)
                if (st[s][q] == mt[m][q]) sc[s][m]++;
    int[] dp = new int[1 &lt;&lt; n];            // best score for mentor-set
    for (int mask = 0; mask &lt; (1 &lt;&lt; n) - 1; mask++) {
        int s = Integer.bitCount(mask);   // next student to seat
        for (int m = 0; m &lt; n; m++) {
            if ((mask &amp; (1 &lt;&lt; m)) != 0) continue;
            int nm = mask | (1 &lt;&lt; m);
            dp[nm] = Math.max(dp[nm],
                dp[mask] + sc[s][m]);
        }
    }
    return dp[(1 &lt;&lt; n) - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input example — score matrix:</p>
<table class="tbl">
<tr><th>s \ m</th><td>M0</td><td>M1</td><td>M2</td></tr>
<tr><td>S0</td><td>2</td><td>1</td><td>2</td></tr>
<tr><td>S1</td><td>1</td><td>3</td><td>3</td></tr>
<tr><td>S2</td><td>1</td><td>3</td><td>1</td></tr>
</table>
<p class="fs13">Optimal bijection: S0→M0 (2) · S1→M2 (3) · S2→M1 (3) = <b>8</b> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(2ⁿ·n²). Space: O(2ⁿ).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Mentor speed-dating: student number k (equal to how many mentors are already taken) auditions every still-FREE mentor; the free-set bitmask is the entire state. Precomputing the compatibility table once keeps the DP loop arithmetic-only.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is the ASSIGNMENT PROBLEM in miniature — O(2ⁿ·n²) bitmask DP beats Hungarian's complexity for tiny n and is far easier to write.</div>`});

/* Problem 369 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q369 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 369 · HARD</span>Distribute Repeating Integers</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Multiset Matching</span><span class="pill">Value Dedupe</span></div>
<p class="dropcap"><code>nums</code> is a multiset of item counts; each customer <code>i</code> demands exactly <code>quantity[i]</code> IDENTICAL items. Can every order be satisfied (each value serves multiple customers, stock depletes)?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>nums = [1,1,1,1,1], quantity = [2,3] → true   (one bucket serves both)
nums = [1,1,2,2],   quantity = [2,2] → true
nums = [1,1,1,1],   quantity = [2,3] → false  (total demand &gt; stock)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 10⁵ · quantity.length ≤ 10 — DFS over ≤10 orders with bucket dedupe.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Fulfil the LARGEST order first against any bucket with enough stock; skip buckets with IDENTICAL remaining stock after a failure.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean canDistribute(List&lt;Integer&gt; nums, int[] q) {
    Map&lt;Integer, Integer&gt; f = new HashMap&lt;&gt;();
    for (int x : nums) f.merge(x, 1, Integer::sum);
    int[] cnt = new int[f.size()];
    int k = 0;
    for (int v : f.values()) cnt[k++] = v;
    Arrays.sort(cnt);                        // ascending
    Arrays.sort(q);
    return dfs(cnt, q, q.length - 1);        // largest demand first
}
private boolean dfs(int[] cnt, int[] q, int idx) {
    if (idx &lt; 0) return true;
    Set&lt;Integer&gt; tried = new HashSet&lt;&gt;();
    for (int i = 0; i &lt; cnt.length; i++) {
        if (cnt[i] &gt;= q[idx] &amp;&amp; tried.add(cnt[i])) {
            cnt[i] -= q[idx];
            if (dfs(cnt, q, idx - 1)) return true;
            cnt[i] += q[idx];                // undo
        }
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums=[1×5]</code>, orders desc [3, 2]</p>
<table class="tbl">
<tr><th>order</th><th>bucket choice (stock 5)</th><th>left</th></tr>
<tr><td>3</td><td>only bucket → 5−3</td><td>2</td></tr>
<tr><td>2</td><td>2 ≥ 2 ✓</td><td>0 → TRUE ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(b^orders) worst, pruned by dedupe + biggest-first. Space: O(orders).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A warehouse fulfilment desk: collapse stock into per-VALUE buckets, then try to satisfy the BIGGEST order against any sufficiently-stocked bucket, undoing on dead ends. Two prunes do the heavy lifting — largest-demand-first ordering and skipping buckets with identical remaining stock (they fail identically).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Multiset matching is k-subset partition's cousin: same dedupe-on-value trick as Q337/Q336, now applied to REMAINING STOCK instead of bucket sums.</div>`});

/* Problem 370 */
B.spread(
{ kicker: 'DSA · BITMASK DP', head: 'Q370 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 370 · HARD</span>Find the Shortest Superstring</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">TSP Over Overlaps</span><span class="pill">Parent Reconstruction</span></div>
<p class="dropcap">Given distinct words, build the SHORTEST string containing every word as a substring (words may overlap each other).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>words = ["catg","ctaagt","gcta","ttca","atgcatc"]
→ "gctaagttcatgcatc"   (length 16)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 12 · total letters ≤ 1000 — TSP over overlaps via bitmask DP.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>overlap[i][j] = longest suffix of i matching prefix of j. dp[mask][i] = shortest superstring ending at i; walk PARENT pointers backwards to rebuild the glue order.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public String shortestSuperstring(String[] w) {
    int n = w.length;
    int[][] ov = new int[n][n];
    for (int i = 0; i &lt; n; i++)
        for (int j = 0; j &lt; n; j++)
            if (i != j)
                for (int L = Math.min(w[i].length(), w[j].length()); L &gt; 0; L--)
                    if (w[i].endsWith(w[j].substring(0, L))) {
                        ov[i][j] = L;
                        break;
                    }
    int full = (1 &lt;&lt; n) - 1;
    int[][] dp = new int[1 &lt;&lt; n][n], par = new int[1 &lt;&lt; n][n];
    for (int[] r : dp) Arrays.fill(r, Integer.MAX_VALUE / 2);
    for (int i = 0; i &lt; n; i++) dp[1 &lt;&lt; i][i] = w[i].length();
    for (int mask = 1; mask &lt;= full; mask++)
        for (int i = 0; i &lt; n; i++) {
            if ((mask &amp; (1 &lt;&lt; i)) == 0 || dp[mask][i] == Integer.MAX_VALUE/2)
                continue;
            for (int j = 0; j &lt; n; j++) {
                if ((mask &amp; (1 &lt;&lt; j)) != 0) continue;
                int nm = mask | (1 &lt;&lt; j);
                int cand = dp[mask][i] + w[j].length() - ov[i][j];
                if (cand &lt; dp[nm][j]) {
                    dp[nm][j] = cand;
                    par[nm][j] = i;
                }
            }
        }
    int end = 0;
    for (int i = 1; i &lt; n; i++)
        if (dp[full][i] &lt; dp[full][end]) end = i;
    StringBuilder sb = new StringBuilder();
    int mask = full, cur = end;
    while (cur != -1 &amp;&amp; mask != 0) {
        sb.insert(0, w[cur]);
        int p = par[mask][cur];
        if ((mask &amp; (1 &lt;&lt; p)) != 0 &amp;&amp; p != cur)
            sb.delete(0, ov[p][cur]);
        mask ^= 1 &lt;&lt; cur;
        if (mask == 0) break;
        cur = p;
    }
    return sb.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Key overlaps of the example:</p>
<table class="tbl">
<tr><th>glue</th><th>saves</th></tr>
<tr><td>"gcta" → "ctaagt"</td><td>shared "cta" = 3 chars saved</td></tr>
<tr><td colspan="2">DP picks the order gcta → ctaagt → ttca → catg → atgcatc</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(2ⁿ·n² + total²) overlap build. Space: O(2ⁿ·n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A gene-splice assembler: gluing fragment B after fragment A saves exactly their OVERLAP characters. Choosing the cheapest glue-order is Travelling Salesman — cities are words, edge weights are overlaps — solved with bitmask DP, then reconstructed by walking parent pointers backwards through the visited-set.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>TSP-as-Hamiltonian-path is THE bitmask-DP crown jewel: dp[mask][last] with a parent table gives both the cost AND the itinerary. Chapter capstone.</div>`});
})();