/* ===== CHAPTER 66 · DSA: Graphs III — Grid Variants ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 66, 'DSA: Grids & Graphs III');

/* Problem 341 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q341 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 341 · EASY</span>Flood Fill</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">DFS / BFS</span><span class="pill">Component Fill</span></div>
<p class="dropcap">Like a paint-bucket tool: recolour the pixel at <code>(sr, sc)</code> plus every pixel 4-directionally connected to it through the SAME original colour.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>image = [[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2
→ [[2,2,2],[2,2,0],[2,0,1]]   (the "2" pixels form one blob)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ m, n ≤ 50 · 0 ≤ image[i][j], color ≤ 2¹⁶−1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The guard <code>old != newColor</code> before starting is what stops infinite self-recoloring.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int[][] floodFill(int[][] img, int sr, int sc, int nc) {
    int old = img[sr][sc];
    if (old != nc) dfs(img, sr, sc, old, nc);
    return img;
}
private void dfs(int[][] m, int r, int c, int old, int nc) {
    if (r &lt; 0 || r &gt;= m.length || c &lt; 0
        || c &gt;= m[0].length || m[r][c] != old) return;
    m[r][c] = nc;
    dfs(m, r + 1, c, old, nc);
    dfs(m, r - 1, c, old, nc);
    dfs(m, r, c + 1, old, nc);
    dfs(m, r, c - 1, old, nc);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Click at (1,1), old colour = 1</p>
<table class="tbl">
<tr><th>cell</th><th>colour before</th><th>fate</th></tr>
<tr><td>(1,1)</td><td>1</td><td>splash → 2</td></tr>
<tr><td>(0,0),(0,1),(0,2),(1,0),(2,0)</td><td>1</td><td>reachable chain → all become 2</td></tr>
<tr><td>(2,1),(1,2),(2,2)</td><td>0 ≠ 1</td><td>walls — untouched ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — each pixel visited ≤ once. Space: O(m·n) worst recursion.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>MS Paint's bucket: click a pixel and the splash floods outward through every SAME-coloured neighbour until walls of different colours stop it. The tiny guard at the top — "skip if the bucket colour equals the floor colour" — is what keeps the paint from endlessly re-splashing itself.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Every grid-traversal problem you'll meet later (islands, bridges, enclaves) is this fill wearing costumes — master the guard conditions and the rest is vocabulary.</div>`});

/* Problem 342 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q342 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 342 · MEDIUM</span>Walls and Gates</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Multi-Source BFS</span><span class="pill">Wavefront</span></div>
<p class="dropcap">Grid holds walls (<code>-1</code>), gates (<code>0</code>) and empty rooms (<code>INF</code>). Fill every empty room with the distance to its NEAREST gate.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>INF  -1   0  INF        3  -1   0   1
INF INF INF  -1    →   2   3   4  -1
INF  -1 INF  -1        1  -1   5  -1
  0 INF INF INF        0  -1   6   7</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m, n ≤ 250 · gates ≥ 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Seed the queue with ALL gates at once and let ONE wavefront expand — each room records the first wave that reaches it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public void wallsAndGates(int[][] rooms) {
    int[][] D = {{1,0},{-1,0},{0,1},{0,-1}};
    Queue&lt;int[]&gt; q = new ArrayDeque&lt;&gt;();
    for (int r = 0; r &lt; rooms.length; r++)
        for (int c = 0; c &lt; rooms[0].length; c++)
            if (rooms[r][c] == 0) q.offer(new int[]{r, c});
    while (!q.isEmpty()) {
        int[] p = q.poll();
        for (int[] d : D) {
            int nr = p[0] + d[0], nc = p[1] + d[1];
            if (nr &lt; 0 || nc &lt; 0 || nr &gt;= rooms.length
                || nc &gt;= rooms[0].length
                || rooms[nr][nc] != Integer.MAX_VALUE) continue;
            rooms[nr][nc] = rooms[p[0]][p[1]] + 1;
            q.offer(new int[]{nr, nc});
        }
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>wave</th><th>frontier</th><th>writes</th></tr>
<tr><td>seed</td><td>both gates (distance 0)</td><td>—</td></tr>
<tr><td>1</td><td>cells adjacent to a gate</td><td>distance 1 written</td></tr>
<tr><td>k</td><td>ring at distance k</td><td>INF cells only — walls &amp; claimed rooms skipped</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — every room enqueued once. Space: O(m·n) queue worst case.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Fire-alarm sirens ring SIMULTANEOUSLY at every mall exit. Each shopper scribbles down the first siren they hear — that number is exactly their nearest-exit distance. One synchronised wave beats running a separate search for every shopper.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Multi-source BFS = single-source BFS with many seeds. "Distance to nearest X" problems should ALWAYS trigger this inversion instinct.</div>`});

/* Problem 343 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q343 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 343 · MEDIUM</span>Count Sub Islands</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Island Traversal</span><span class="pill">Flag-as-you-go</span></div>
<p class="dropcap">Two grids of 0/1 (water/land). An island in <code>grid2</code> is a <strong>sub-island</strong> if EVERY one of its cells is also land in <code>grid1</code>. Count sub-islands of grid2.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,1,1]]
grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,1,0]]
→ 3    (all three grid2 islands sit fully on grid1 land)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n, m ≤ 500</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Walk each grid2 island once; the moment any cell sits on grid1 WATER, stamp the island bad — but keep walking to erase it from future checks. Count only unstamped islands.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int countSubIslands(int[][] g1, int[][] g2) {
    int n = g2.length, m = g2[0].length, count = 0;
    int[][] D = {{1,0},{-1,0},{0,1},{0,-1}};
    for (int r = 0; r &lt; n; r++)
        for (int c = 0; c &lt; m; c++)
            if (g2[r][c] == 1) {
                boolean ok = true;
                Deque&lt;int[]&gt; q = new ArrayDeque&lt;&gt;();
                q.push(new int[]{r, c});
                g2[r][c] = 0;
                while (!q.isEmpty()) {
                    int[] p = q.pop();
                    if (g1[p[0]][p[1]] != 1) ok = false;   // leak onto water!
                    for (int[] d : D) {
                        int nr = p[0] + d[0], nc = p[1] + d[1];
                        if (nr &lt; 0 || nc &lt; 0 || nr &gt;= n || nc &gt;= m
                            || g2[nr][nc] != 1) continue;
                        g2[nr][nc] = 0;
                        q.push(new int[]{nr, nc});
                    }
                }
                if (ok) count++;
            }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>grid2 island</th><th>during walk</th><th>verdict</th></tr>
<tr><td>island A</td><td>every cell checks land on g1</td><td>never leaked → count++ ✓</td></tr>
<tr><td>island B</td><td>one cell hit g1-water → ok=false</td><td>walk CONTINUES to erase, but no tally</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n) queue worst case.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>An archipelago audit: inspect every island drawn on MAP-2. The instant any of its sand lies on MAP-1's water, stamp it "NOT a sub-island" — yet finish the walk anyway so its cells are erased and never re-audited. Only islands that stayed fully on MAP-1's land earn a tally mark.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Flag-during-traversal merges the "validate" and "consume" passes into ONE sweep — no second scan, no visited matrix.</div>`});

/* Problem 344 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q344 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 344 · MEDIUM</span>As Far from Land as Possible</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Multi-Source BFS</span><span class="pill">Wave Levels</span></div>
<p class="dropcap">An n×n grid of water (0) and land (1). Find the water cell whose distance to the NEAREST land cell is maximal — return that distance (Manhattan, 4-directional). Impossible ⇒ −1.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>grid = [[1,0,1],[0,0,0],[1,0,1]] → 2   (centre cell)
all-land or all-water → -1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 100 · grids of only 0s and 1s — both extremes must return −1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Seed the wave with ALL land cells; each BFS level claims one more ring of water. The LAST level number is the answer.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int maxDistance(int[][] grid) {
    int n = grid.length;
    Deque&lt;int[]&gt; q = new ArrayDeque&lt;&gt;();
    for (int r = 0; r &lt; n; r++)
        for (int c = 0; c &lt; n; c++)
            if (grid[r][c] == 1) q.offer(new int[]{r, c});
    if (q.size() == 0 || q.size() == n * n) return -1;
    int dist = -1;
    int[][] D = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!q.isEmpty()) {
        dist++;
        for (int sz = q.size(); sz &gt; 0; sz--) {
            int[] p = q.poll();
            for (int[] d : D) {
                int nr = p[0] + d[0], nc = p[1] + d[1];
                if (nr &gt;= 0 &amp;&amp; nc &gt;= 0 &amp;&amp; nr &lt; n &amp;&amp; nc &lt; n
                    &amp;&amp; grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;          // claim the water
                    q.offer(new int[]{nr, nc});
                }
            }
        }
    }
    return dist;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,0,1],[0,0,0],[1,0,1]]</code></p>
<table class="tbl">
<tr><th>wave</th><th>newly claimed water</th><th>dist after wave</th></tr>
<tr><td>seed</td><td>four corners are land</td><td>−1</td></tr>
<tr><td>1</td><td>(0,1),(1,0),(1,2),(2,1)</td><td>0</td></tr>
<tr><td>2</td><td>centre (1,1)</td><td>1</td></tr>
<tr><td>3</td><td>nothing new — loop ends</td><td><b>2</b> ✓ returned</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(n²).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Lighthouses on EVERY island flash simultaneously. The answer is how many flashes pass before the loneliest patch of open water finally sees light — the last wavefront to arrive marks maximum remoteness.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Furthest FROM nearest X" = multi-source BFS run to exhaustion; the final wave index IS the minimax distance. Same skeleton as Q342, reading the last wave instead of writing distances.</div>`});

/* Problem 345 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q345 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 345 · MEDIUM</span>Shortest Bridge</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DFS + BFS Hybrid</span><span class="pill">Expanding Rings</span></div>
<p class="dropcap">Exactly TWO islands sit in the grid. Flip the minimum number of water cells to land so they connect. Return that count.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[0,1],[1,0]] → 1
[[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]] → 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 ≤ n ≤ 100 · exactly two islands guaranteed</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Phase 1: DFS-paint the FIRST island with marker 2 while queuing its cells. Phase 2: BFS lets the paint DRIP through water one ring per step; touching a cell worth 1 (island two) ends it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int shortestBridge(int[][] g) {
    int n = g.length;
    Deque&lt;int[]&gt; q = new ArrayDeque&lt;&gt;();
    for (int r = 0; r &lt; n; r++)
        for (int c = 0; c &lt; n; c++)
            if (g[r][c] == 1) { dfs(g, r, c, q); r = n; break; }
    int[][] D = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!q.isEmpty()) {
        int[] p = q.poll();
        for (int[] d : D) {
            int nr = p[0] + d[0], nc = p[1] + d[1];
            if (nr &lt; 0 || nc &lt; 0 || nr &gt;= n || nc &gt;= n) continue;
            if (g[nr][nc] == 1) return g[p[0]][p[1]] - 2;   // island #2!
            if (g[nr][nc] == 0) {
                g[nr][nc] = g[p[0]][p[1]] + 1;
                q.offer(new int[]{nr, nc});
            }
        }
    }
    return -1;
}
private void dfs(int[][] g, int r, int c, Deque&lt;int[]&gt; q) {
    int n = g.length;
    if (r &lt; 0 || c &lt; 0 || r &gt;= n || c &gt;= n || g[r][c] != 1) return;
    g[r][c] = 2;
    q.offer(new int[]{r, c});
    dfs(g, r+1, c, q); dfs(g, r-1, c, q);
    dfs(g, r, c+1, q); dfs(g, r, c-1, q);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[0,1],[1,0]]</code></p>
<table class="tbl">
<tr><th>phase</th><th>event</th><th>grid values</th></tr>
<tr><td>DFS stamp</td><td>(0,1) painted 2 &amp; queued</td><td>[0,2],[1,0]</td></tr>
<tr><td>BFS ring 1</td><td>(0,0),(1,1) become 3</td><td>[3,2],[1,3]</td></tr>
<tr><td>BFS poll (1,1)</td><td>(1,0)==1 → island #2 hit!</td><td>return 3 − 2 = <b>1</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(n²).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Two islands, one bridge budget. Paint the FIRST island a marker colour and station its whole shoreline in a queue as ferry docks. Then let the paint DRIP outward into water one ring per tick — the drip that first touches island #2 tells you exactly how many tiles must become bridge.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Storing DISTANCE INSIDE the cell value (marker 2 + ring number) eliminates a visited matrix — the grid is its own memo table.</div>`});

/* Problem 346 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q346 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 346 · MEDIUM</span>Number of Enclaves</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Boundary Flood</span><span class="pill">Reverse Thinking</span></div>
<p class="dropcap">A land cell can WALK off the grid if it connects (4-dir) to any boundary land tile. Count the land cells that CANNOT escape — the enclaves.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[0,0,0,0],
 [1,0,1,0],
 [0,1,1,0],
 [0,0,0,0]] → 3   (the middle 2×2-ish blob minus its edge-touching cells)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ m, n ≤ 500</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Flip the question: flood ALL land reachable FROM THE BOUNDARY into sea; whatever 1s survive are trapped — just count them.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int numEnclaves(int[][] g) {
    int n = g.length, m = g[0].length;
    for (int r = 0; r &lt; n; r++) { erase(g, r, 0); erase(g, r, m - 1); }
    for (int c = 0; c &lt; m; c++) { erase(g, 0, c); erase(g, n - 1, c); }
    int count = 0;
    for (int[] row : g) for (int v : row) count += v;
    return count;
}
private void erase(int[][] g, int r, int c) {
    if (r &lt; 0 || c &lt; 0 || r &gt;= g.length
        || c &gt;= g[0].length || g[r][c] != 1) return;
    g[r][c] = 0;
    erase(g, r + 1, c); erase(g, r - 1, c);
    erase(g, r, c + 1); erase(g, r, c - 1);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>phase</th><th>action</th></tr>
<tr><td>boundary sweep</td><td>every border land cell floods its whole connected blob into sea</td></tr>
<tr><td>tally pass</td><td>sum remaining 1s → <b>3</b> ✓ (the interior trio)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n) recursion worst case.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Island prisoners: any land connected to the COASTLINE lets you escape, so first drown every coastal blob. Whatever inland islands remain are the trapped population — a simple sum counts them.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Reversal beats bookkeeping: instead of testing "can THIS cell escape?" per cell (expensive), eliminate everything that CAN'T be an answer in one coastal sweep.</div>`});

/* Problem 347 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q347 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 347 · EASY</span>Island Perimeter</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Local Counting</span><span class="pill">No Traversal</span></div>
<p class="dropcap">One island sits in the grid. Return the length of its perimeter — no traversal required.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0]] → 16</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ m, n ≤ 100 · exactly one island · no lakes inside it</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every land tile starts owning FOUR edges; each edge shared with another land tile disappears from BOTH inventories — subtract 2 per adjacency. Checking only UP and LEFT avoids double-counting.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int islandPerimeter(int[][] g) {
    int peri = 0;
    for (int r = 0; r &lt; g.length; r++)
        for (int c = 0; c &lt; g[0].length; c++)
            if (g[r][c] == 1) {
                peri += 4;
                if (r &gt; 0 &amp;&amp; g[r - 1][c] == 1) peri -= 2;
                if (c &gt; 0 &amp;&amp; g[r][c - 1] == 1) peri -= 2;
            }
    return peri;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input example: island has 6 land cells, 4 shared edges (adjacencies)</p>
<table class="tbl">
<tr><th>quantity</th><th>value</th></tr>
<tr><td>gross edges: 6 cells × 4</td><td>24</td></tr>
<tr><td>shared adjacencies ×2 each: 4 × 2</td><td>−8</td></tr>
<tr><td>perimeter</td><td><b>16</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Fence-post accounting: every land tile begins owning four wooden planks. Whenever TWO land tiles share an edge, that plank vanishes from both owners' sheds — subtract two at once. No island-hopping search is needed because perimeter is a purely LOCAL property.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Checking only UP and LEFT neighbours counts every shared edge exactly once — directional bookkeeping replaces visited-arrays.</div>`});

/* Problem 348 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q348 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 348 · MEDIUM</span>Keys and Rooms</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Reachability</span><span class="pill">DFS Stack</span></div>
<p class="dropcap"><code>rooms[i]</code> lists the keys found inside room i (key j opens room j). You start in room 0 — can you visit EVERY room?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[1],[2],[3],[]]        → true   (0→1→2→3)
[[1,3],[3,0,1],[2],[0]] → false  (room 2 unreachable)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == rooms.length · 1 ≤ n ≤ 1000 · keys within range, no repeats per room</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Pure graph reachability: rooms are nodes, keys are directed edges. A visited flag is mandatory or key cycles loop forever.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean canVisitAllRooms(List&lt;List&lt;Integer&gt;&gt; rooms) {
    boolean[] seen = new boolean[rooms.size()];
    seen[0] = true;
    Deque&lt;Integer&gt; stack = new ArrayDeque&lt;&gt;();
    stack.push(0);
    int count = 1;
    while (!stack.isEmpty()) {
        for (int key : rooms.get(stack.pop())) {
            if (!seen[key]) {
                seen[key] = true;
                count++;
                stack.push(key);
            }
        }
    }
    return count == rooms.size();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1],[2],[3],[]]</code></p>
<table class="tbl">
<tr><th>pop room</th><th>keys found</th><th>newly opened</th><th>count</th></tr>
<tr><td>0</td><td>{1}</td><td>1</td><td>2</td></tr>
<tr><td>1</td><td>{2}</td><td>2</td><td>3</td></tr>
<tr><td>2</td><td>{3}</td><td>3</td><td>4 → all ✓ true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n + keys). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A hotel treasure hunt: walk into a room, pocket its keys, queue the newly-unlocked doors. It's plain reachability on a directed graph where keys ARE the edges — the visited flag is what stops you re-entering the same corridor forever.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Many "simulation" stories are secretly graph problems; translating nouns (rooms/keys) into nodes/edges is the entire difficulty.</div>`});

/* Problem 349 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q349 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 349 · MEDIUM</span>Find Eventual Safe States</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Reverse Topology</span><span class="pill">Peel Safe</span></div>
<p class="dropcap">A node is <strong>terminal</strong> if it has no outgoing edges. A node is <strong>safe</strong> if EVERY path from it (however long) ends at a terminal. Return all safe nodes in ascending order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>graph = [[1,2],[2,3],[5],[0],[5],[],[]]
→ [2,4,5,6]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n ≤ 10⁴ · Σ edges ≤ 4×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Work BACKWARDS: seed terminals as safe; a room becomes safe when ALL its outgoing edges point to already-safe rooms. Reverse-graph + out-degree peeling does this in one sweep.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; eventualSafeNodes(int[][] graph) {
    int n = graph.length;
    List&lt;List&lt;Integer&gt;&gt; rev = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; n; i++) rev.add(new ArrayList&lt;&gt;());
    int[] outDeg = new int[n];
    for (int u = 0; u &lt; n; u++) {
        outDeg[u] = graph[u].length;
        for (int v : graph[u]) rev.get(v).add(u);
    }
    Deque&lt;Integer&gt; q = new ArrayDeque&lt;&gt;();
    boolean[] safe = new boolean[n];
    for (int i = 0; i &lt; n; i++)
        if (outDeg[i] == 0) { q.offer(i); safe[i] = true; }
    while (!q.isEmpty()) {
        int v = q.poll();
        for (int u : rev.get(v))
            if (--outDeg[u] == 0) { safe[u] = true; q.offer(u); }
    }
    List&lt;Integer&gt; out = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; n; i++) if (safe[i]) out.add(i);
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input example — peel order:</p>
<table class="tbl">
<tr><th>wave</th><th>newly safe</th><th>why</th></tr>
<tr><td>0</td><td>5, 6</td><td>terminals (no exits)</td></tr>
<tr><td>1</td><td>4, 2</td><td>all their edges land on {5} / {5}</td></tr>
<tr><td>2</td><td>— stops —</td><td>1 needs 3; 3 loops into 0; 0 loops into 1 → unsafe forever ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n + edges). Space: O(n + edges).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Maze rooms get stamped SAFE when every corridor out of them eventually reaches an exit. Work backwards from the known exits: any room whose ALL corridors point to already-stamped rooms earns its own stamp — like peeling onions inward. Rooms tangled in cycles can never collect the stamps they'd need.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"All paths avoid cycles into doom" is the complement of cycle membership — reverse-topology peeling computes exactly the non-cycle-dependent set in linear time.</div>`});

/* Problem 350 */
B.spread(
{ kicker: 'DSA · GRIDS & GRAPHS III', head: 'Q350 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 350 · MEDIUM</span>Minimum Genetic Mutation</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Implicit-Graph BFS</span><span class="pill">Word Ladder</span></div>
<p class="dropcap">A gene is an 8-character string over A/C/G/T. One mutation changes a SINGLE character. Mutations are only legal if the result exists in the <code>bank</code>. Return the fewest mutations to turn <code>start</code> into <code>end</code> — or −1.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>start "AACCGGTT", end "AACCGGTA", bank ["AACCGGTA"] → 1
start "AACCGGTT", end "AAACGGTA",
bank ["AACCGGTA","AACCGCTA","AAACGGTA"] → 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>bank ≤ 10 · genes exactly 8 chars over A C G T</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>From each gene try all 8×3 = 24 single-letter swaps; BFS in waves — first arrival at <code>end</code> is minimal. A seen-set stops re-visits.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int minMutation(String start, String end, String[] bank) {
    Set&lt;String&gt; pool = new HashSet&lt;&gt;(Arrays.asList(bank));
    if (!pool.contains(end)) return -1;
    char[] G = {'A', 'C', 'G', 'T'};
    Deque&lt;String&gt; q = new ArrayDeque&lt;&gt;();
    Set&lt;String&gt; seen = new HashSet&lt;&gt;();
    q.offer(start); seen.add(start);
    for (int steps = 1; !q.isEmpty(); steps++) {
        for (int sz = q.size(); sz &gt; 0; sz--) {
            char[] cur = q.poll().toCharArray();
            for (int i = 0; i &lt; cur.length; i++) {
                char old = cur[i];
                for (char g : G) {
                    cur[i] = g;
                    String nxt = new String(cur);
                    if (nxt.equals(end)) return steps;
                    if (!pool.contains(nxt) || !seen.add(nxt)) continue;
                    q.offer(nxt);
                }
                cur[i] = old;
            }
        }
    }
    return -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"AACCGGTT"</code> → <code>"AAACGGTA"</code></p>
<table class="tbl">
<tr><th>wave</th><th>frontier</th></tr>
<tr><td>1</td><td>AACCGGTA queued (one flip); AACCGCTA rejected — it needs two flips</td></tr>
<tr><td>2</td><td>from AACCGGTA, flip index 2 C→A → hits AAACGGTA → return <b>2</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(bank·8·4). Space: O(bank).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A gene-editing lab may change ONE letter per experiment, using ONLY recipes from the approved bank, hunting the target strain in as few edits as possible. Breadth-first waves guarantee the first time you synthesise the target, no shorter recipe existed — it's Word Ladder wearing a biology coat.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>An IMPLICIT graph (edges generated on the fly by substitution) needs no adjacency list — the character alphabet IS the edge factory.</div>`});
})();