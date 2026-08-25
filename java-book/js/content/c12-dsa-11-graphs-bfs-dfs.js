/* ===== CHAPTER 42 · DSA: Graphs — BFS, DFS & Topological Sort ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 42, 'DSA: Graphs — BFS, DFS & Topological Sort');

/* Problem 101 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q101 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 101 · MEDIUM</span>Number of Islands</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">BFS/DFS</span></div>
<p class="dropcap">Given an <code>m x n</code> binary grid <code>grid</code> where <code>'1'</code> is land and <code>'0'</code> is water, return the number of islands — groups of horizontally/vertically connected land cells.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: grid = [["1","1","0"],["1","0","0"],["0","0","1"]]
Output: 2
Explanation: the top-left connected block is one island; the bottom-right '1' is a separate island</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= m, n &lt;= 300</li><li>grid[i][j] is '0' or '1'</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Scan every cell; whenever you find unvisited land, that's a NEW island — flood-fill (DFS or BFS) to sink the whole connected blob so it's never counted again.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Scan cells left-to-right, top-to-bottom. On an unvisited land cell, increment the island count and DFS outward in 4 directions, marking every connected land cell as visited (sinking it to '0') so it's never double-counted.</p>
<pre class="code" data-lang="java"><code>public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r &lt; grid.length; r++)
        for (int c = 0; c &lt; grid[0].length; c++)
            if (grid[r][c] == '1') { count++; sink(grid, r, c); }
    return count;
}
private void sink(char[][] grid, int r, int c) {
    if (r &lt; 0 || c &lt; 0 || r &gt;= grid.length || c &gt;= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0';
    sink(grid, r + 1, c); sink(grid, r - 1, c);
    sink(grid, r, c + 1); sink(grid, r, c - 1);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>grid = [[1,1,0],[1,0,0],[0,0,1]]</code></p>
<table class="tbl">
<tr><th>cell (r,c)</th><th>value</th><th>action</th></tr>
<tr><td>0,0</td><td>1</td><td>new island, count=1 → sink floods (0,0),(0,1),(1,0)</td></tr>
<tr><td>0,1</td><td>0 (sunk)</td><td>skip</td></tr>
<tr><td>1,0</td><td>0 (sunk)</td><td>skip</td></tr>
<tr><td>2,2</td><td>1</td><td>new island, count=2 → sink floods (2,2) alone</td></tr>
</table>
<p class="fs13">Final: <code>count = 2</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — every cell visited once. Space: O(m·n) worst-case recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Count connected components" on a grid is always outer-scan + flood-fill — the flood-fill direction (DFS vs BFS) rarely matters, only that visited cells get marked.</div>`});

/* Problem 102 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q102 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 102 · MEDIUM</span>Max Area of Island</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">DFS</span></div>
<p class="dropcap">Given an <code>m x n</code> binary grid <code>grid</code>, an island is a group of <code>1</code>'s (land) connected horizontally/vertically. Return the maximum area (cell count) among all islands in the grid, or 0 if there are none.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: grid = [[1,1,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: the top-left 3-cell blob (0,0)-(0,1)-(1,1) is the largest island; the lone (2,2) has area 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= m, n &lt;= 50</li><li>grid[i][j] is 0 or 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Same flood-fill as Number of Islands, but instead of just counting islands, have the DFS return "1 + area of every direction it flooded" so each call reports its own island's size.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Scan every cell; on unvisited land, DFS outward summing 1 (for the current cell) plus the areas returned by all 4 neighbor calls, sinking each visited cell to 0 as you go. Track the running maximum across all islands found.</p>
<pre class="code" data-lang="java"><code>public int maxAreaOfIsland(int[][] grid) {
    int max = 0;
    for (int r = 0; r &lt; grid.length; r++)
        for (int c = 0; c &lt; grid[0].length; c++)
            if (grid[r][c] == 1) max = Math.max(max, area(grid, r, c));
    return max;
}
private int area(int[][] grid, int r, int c) {
    if (r &lt; 0 || c &lt; 0 || r &gt;= grid.length || c &gt;= grid[0].length || grid[r][c] == 0) return 0;
    grid[r][c] = 0;
    return 1 + area(grid, r + 1, c) + area(grid, r - 1, c)
              + area(grid, r, c + 1) + area(grid, r, c - 1);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>grid = [[1,1,0],[0,1,0],[0,0,1]]</code></p>
<table class="tbl">
<tr><th>call</th><th>neighbor sum</th><th>returns</th></tr>
<tr><td>area(1,1)</td><td>1 + 0+0+0+0 (all neighbors 0 or unmarked-empty)</td><td>1</td></tr>
<tr><td>area(0,1)</td><td>1 + area(1,1)=1 (others 0)</td><td>2</td></tr>
<tr><td>area(0,0)</td><td>1 + area(0,1)=2 (others 0)</td><td>3</td></tr>
<tr><td>area(2,2)</td><td>1 + 0+0+0+0 (isolated)</td><td>1</td></tr>
</table>
<p class="fs13">max = max(3, 1) = <code>3</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — every cell visited once. Space: O(m·n) worst-case recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever a flood-fill needs to report a value back up (area, perimeter, whether it touches an edge), make the DFS return that value instead of relying on a shared counter — it composes far more cleanly.</div>`});

/* Problem 103 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q103 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 103 · MEDIUM</span>Clone Graph</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">DFS</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given a reference node in a connected undirected graph (each node has an <code>int val</code> and a <code>List&lt;Node&gt; neighbors</code>), return a deep copy of the entire graph.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: nodes 1-2-3-4 form a 4-cycle (1↔2, 2↔3, 3↔4, 4↔1); the clone must reproduce that exact wiring on new node objects</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 100</li><li>Node.val is unique for each node, 1 to 100</li><li>the graph is connected; no repeated edges or self-loops</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The graph can have cycles, so plain recursion without a "seen" map would loop forever. Keep a HashMap from original node → its clone, and return the cached clone the moment a node is revisited.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>DFS from the given node. Before recursing, create the clone and store it in the map immediately — that's what breaks the cycle: the next time a neighbor's DFS call hits an already-mapped node, it returns the cached clone instead of recursing again.</p>
<pre class="code" data-lang="java"><code>public Node cloneGraph(Node node) {
    if (node == null) return null;
    return dfs(node, new HashMap&lt;&gt;());
}
private Node dfs(Node node, Map&lt;Node, Node&gt; visited) {
    if (visited.containsKey(node)) return visited.get(node);
    Node clone = new Node(node.val);
    visited.put(node, clone);
    for (Node nb : node.neighbors) {
        clone.neighbors.add(dfs(nb, visited));
    }
    return clone;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: node 1, edges 1-2, 2-3, 3-4, 4-1 (a 4-cycle) — dfs(1) is the entry call</p>
<table class="tbl">
<tr><th>call</th><th>map before call</th><th>neighbors visited</th><th>returns</th></tr>
<tr><td>dfs(1)</td><td>{}</td><td>create c1, map={1:c1} → recurse dfs(2), dfs(4)</td><td>c1</td></tr>
<tr><td>dfs(2)</td><td>{1:c1}</td><td>create c2, map+={2:c2} → dfs(1) cached→c1; recurse dfs(3)</td><td>c2</td></tr>
<tr><td>dfs(3)</td><td>{1:c1,2:c2}</td><td>create c3, map+={3:c3} → dfs(2) cached→c2; recurse dfs(4)</td><td>c3</td></tr>
<tr><td>dfs(4)</td><td>{1:c1,2:c2,3:c3}</td><td>create c4, map+={4:c4} → dfs(1) cached→c1; dfs(3) cached→c3</td><td>c4</td></tr>
</table>
<p class="fs13">Unwinding: c4.neighbors=[c1,c3], c3.neighbors=[c2,c4], c2.neighbors=[c1,c3], c1.neighbors=[c2,c4] — the cycle is reproduced exactly on fresh objects.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(V+E) — each node cloned once, each edge traversed once. Space: O(V) for the map plus recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Deep copy a structure that may contain cycles" always reduces to DFS/BFS + a visited-to-clone map — insert into the map BEFORE recursing into neighbors, or the cycle breaks the second time around.</div>`});

/* Problem 104 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q104 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 104 · MEDIUM</span>Course Schedule</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Topological Sort</span><span class="pill">DFS</span></div>
<p class="dropcap">There are <code>numCourses</code> courses labeled <code>0</code> to <code>numCourses-1</code>. Given prerequisite pairs <code>[a, b]</code> meaning "to take a you must first take b," return true if it's possible to finish all courses — i.e. the prerequisite graph has no cycle.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: numCourses = 3, prerequisites = [[1,0],[2,1],[0,2]]
Output: false
Explanation: 0 needs 2, 2 needs 1, 1 needs 0 — a cycle, so none of the three can ever be taken first</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= numCourses &lt;= 2000</li><li>0 &lt;= prerequisites.length &lt;= 5000</li><li>0 &lt;= a, b &lt; numCourses; a != b; pairs are unique</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Build a directed graph (b → a, "b enables a") and run DFS with 3 states per node: unvisited, currently-on-the-recursion-stack ("visiting"), and fully-done. Hitting a "visiting" node again means you've found a cycle.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>DFS cycle detection with a 3-color state array. Marking a node "visiting" (state 1) before recursing into its neighbors, and only "done" (state 2) after all of them return, means re-encountering a "visiting" node proves a back-edge — a cycle.</p>
<pre class="code" data-lang="java"><code>public boolean canFinish(int numCourses, int[][] prerequisites) {
    List&lt;List&lt;Integer&gt;&gt; graph = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; numCourses; i++) graph.add(new ArrayList&lt;&gt;());
    for (int[] p : prerequisites) graph.get(p[1]).add(p[0]); // b -> a
    int[] state = new int[numCourses]; // 0=unvisited,1=visiting,2=done
    for (int i = 0; i &lt; numCourses; i++)
        if (state[i] == 0 &amp;&amp; hasCycle(graph, state, i)) return false;
    return true;
}
private boolean hasCycle(List&lt;List&lt;Integer&gt;&gt; graph, int[] state, int node) {
    state[node] = 1;
    for (int next : graph.get(node)) {
        if (state[next] == 1) return true;
        if (state[next] == 0 &amp;&amp; hasCycle(graph, state, next)) return true;
    }
    state[node] = 2;
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: prerequisites = [[1,0],[2,1],[0,2]] → graph edges 0→1, 1→2, 2→0</p>
<table class="tbl">
<tr><th>node entered</th><th>state set</th><th>neighbor checked</th><th>outcome</th></tr>
<tr><td>hasCycle(0)</td><td>state[0]=1 (visiting)</td><td>0's neighbor 1 is unvisited</td><td>recurse hasCycle(1)</td></tr>
<tr><td>hasCycle(1)</td><td>state[1]=1 (visiting)</td><td>1's neighbor 2 is unvisited</td><td>recurse hasCycle(2)</td></tr>
<tr><td>hasCycle(2)</td><td>state[2]=1 (visiting)</td><td>2's neighbor 0 has state 1 (visiting!)</td><td>cycle found → return true</td></tr>
</table>
<p class="fs13">true propagates back through hasCycle(1) and hasCycle(0) → <code>canFinish</code> returns <code>false</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(V+E) — each node/edge visited once thanks to the "done" state pruning. Space: O(V+E) for the graph plus O(V) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A 2-state visited array can't distinguish "on my current path" from "explored earlier in a different branch" — that's what causes false-positive cycle detection. The 3rd "done" state is what makes DAG cycle detection correct.</div>`});

/* Problem 105 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q105 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 105 · MEDIUM</span>Course Schedule II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Topological Sort</span><span class="pill">BFS</span></div>
<p class="dropcap">Same setup as Course Schedule, but return an actual valid ordering of the <code>numCourses</code> courses that satisfies every prerequisite. If no valid ordering exists (a cycle), return an empty array.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,1,2,3]
Explanation: 0 has no prerequisites; 1 and 2 both need 0; 3 needs both 1 and 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= numCourses &lt;= 2000</li><li>0 &lt;= prerequisites.length &lt;= 5000</li><li>0 &lt;= a, b &lt; numCourses; a != b; pairs are unique</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Kahn's algorithm: track each node's indegree (# of unmet prerequisites), seed a queue with every 0-indegree node, and repeatedly pop one, append it to the order, and decrement its neighbors' indegree — enqueueing any that just hit 0.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Kahn's algorithm — BFS-based topological sort. Nodes with indegree 0 have no unmet prerequisite, so they can go first; removing them from the graph (decrementing their neighbors' indegree) reveals the next batch of 0-indegree nodes. If fewer than <code>numCourses</code> nodes ever get dequeued, a cycle exists.</p>
<pre class="code" data-lang="java"><code>public int[] findOrder(int numCourses, int[][] prerequisites) {
    List&lt;List&lt;Integer&gt;&gt; graph = new ArrayList&lt;&gt;();
    int[] indegree = new int[numCourses];
    for (int i = 0; i &lt; numCourses; i++) graph.add(new ArrayList&lt;&gt;());
    for (int[] p : prerequisites) { graph.get(p[1]).add(p[0]); indegree[p[0]]++; }
    Queue&lt;Integer&gt; queue = new LinkedList&lt;&gt;();
    for (int i = 0; i &lt; numCourses; i++) if (indegree[i] == 0) queue.offer(i);
    int[] order = new int[numCourses];
    int idx = 0;
    while (!queue.isEmpty()) {
        int course = queue.poll();
        order[idx++] = course;
        for (int next : graph.get(course))
            if (--indegree[next] == 0) queue.offer(next);
    }
    return idx == numCourses ? order : new int[0];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: prerequisites = [[1,0],[2,0],[3,1],[3,2]] → indegree = [0,1,1,2], graph: 0→[1,2], 1→[3], 2→[3]</p>
<table class="tbl">
<tr><th>step</th><th>polled</th><th>order so far</th><th>queue after</th></tr>
<tr><td>1</td><td>0</td><td>[0]</td><td>indegree[1]→0, indegree[2]→0 → [1,2]</td></tr>
<tr><td>2</td><td>1</td><td>[0,1]</td><td>indegree[3]→1 (not 0 yet) → [2]</td></tr>
<tr><td>3</td><td>2</td><td>[0,1,2]</td><td>indegree[3]→0 → [3]</td></tr>
<tr><td>4</td><td>3</td><td>[0,1,2,3]</td><td>no neighbors → []</td></tr>
</table>
<p class="fs13">idx = 4 = numCourses → return <code>[0,1,2,3]</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(V+E) — each node dequeued once, each edge relaxed once. Space: O(V+E) for the graph, indegree array, and queue.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>DFS-based topo sort (post-order, then reverse) and Kahn's BFS both work — but Kahn's is the one that naturally detects a cycle for free: if <code>idx</code> never reaches <code>numCourses</code>, some nodes' indegree never hit 0, meaning they're stuck in a cycle.</div>`});

/* Problem 106 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q106 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 106 · MEDIUM</span>Pacific Atlantic Water Flow</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Multi-Source DFS</span></div>
<p class="dropcap">An <code>m x n</code> grid <code>heights</code> represents a landscape; the Pacific touches the top and left edges, the Atlantic touches the bottom and right edges. Water flows from a cell to a 4-directionally adjacent cell only if that neighbor's height is <b>less than or equal to</b> the current cell's. Return all cells from which water can reach BOTH oceans.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: heights = [[1,2,3],[8,9,4],[7,6,5]]
Output: [[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
Explanation: every cell except (0,0)=1 and (0,1)=2 can reach both oceans</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= m, n &lt;= 200</li><li>0 &lt;= heights[i][j] &lt;= 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Checking "can this cell reach the ocean" forward, per cell, is O((mn)²). Flip it: flood-fill BACKWARD from each ocean's border cells, moving to a neighbor only if its height is >= current — that's the reverse of "flows downhill to the ocean."</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Run two multi-source DFS floods: one seeded from every top-row/left-column cell (Pacific-reachable), one from every bottom-row/right-column cell (Atlantic-reachable). Each flood only steps to a neighbor whose height &gt;= the current cell (equivalent to "water could have flowed the other way, downhill, into the ocean"). A cell in the final answer is one both floods marked.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; pacificAtlantic(int[][] heights) {
    int m = heights.length, n = heights[0].length;
    boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];
    for (int i = 0; i &lt; m; i++) {
        dfs(heights, pac, i, 0, heights[i][0]);
        dfs(heights, atl, i, n - 1, heights[i][n - 1]);
    }
    for (int j = 0; j &lt; n; j++) {
        dfs(heights, pac, 0, j, heights[0][j]);
        dfs(heights, atl, m - 1, j, heights[m - 1][j]);
    }
    List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; m; i++) for (int j = 0; j &lt; n; j++)
        if (pac[i][j] &amp;&amp; atl[i][j]) res.add(Arrays.asList(i, j));
    return res;
}
private void dfs(int[][] h, boolean[][] seen, int r, int c, int prev) {
    if (r &lt; 0 || c &lt; 0 || r &gt;= h.length || c &gt;= h[0].length || seen[r][c] || h[r][c] &lt; prev) return;
    seen[r][c] = true;
    dfs(h, seen, r + 1, c, h[r][c]); dfs(h, seen, r - 1, c, h[r][c]);
    dfs(h, seen, r, c + 1, h[r][c]); dfs(h, seen, r, c - 1, h[r][c]);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>heights = [[1,2,3],[8,9,4],[7,6,5]]</code> — Pacific floods from row 0 &amp; col 0; Atlantic floods from row 2 &amp; col 2</p>
<table class="tbl">
<tr><th>cell</th><th>height</th><th>Pacific?</th><th>Atlantic?</th><th>in answer?</th></tr>
<tr><td>(0,0)</td><td>1</td><td>yes (border)</td><td>no</td><td>—</td></tr>
<tr><td>(0,1)</td><td>2</td><td>yes (border)</td><td>no</td><td>—</td></tr>
<tr><td>(0,2)</td><td>3</td><td>yes (border)</td><td>yes (border)</td><td>✓</td></tr>
<tr><td>(1,0)</td><td>8</td><td>yes (border)</td><td>yes, via (2,0)=7&lt;8 reverse-reachable</td><td>✓</td></tr>
<tr><td>(1,1)</td><td>9</td><td>yes, via (0,1)=2&lt;9</td><td>yes, via (2,1)=6&lt;9</td><td>✓</td></tr>
<tr><td>(2,1)</td><td>6</td><td>yes, via (1,1)=9&gt;6</td><td>yes (border)</td><td>✓</td></tr>
</table>
<p class="fs13">Full answer: <code>[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]</code> — everything except (0,0) and (0,1), which never reach the Atlantic border.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — each of the two floods visits every cell at most once. Space: O(m·n) for the two visited grids plus recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Which cells can reach ALL of several targets" is almost always cheaper as "flood from each target, then intersect" rather than "flood from each cell, check all targets" — turn the per-cell search inside out.</div>`});

/* Problem 107 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q107 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 107 · MEDIUM</span>Rotting Oranges</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Multi-Source BFS</span></div>
<p class="dropcap">A grid cell is <code>0</code> (empty), <code>1</code> (fresh orange), or <code>2</code> (rotten orange). Every minute, any fresh orange 4-directionally adjacent to a rotten one becomes rotten. Return the minimum minutes until no fresh orange remains, or -1 if that's impossible.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Explanation: rot spreads outward from (0,0) one ring per minute; the far corner (2,2) is reached last, at minute 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= rows, cols &lt;= 10</li><li>grid[i][j] is 0, 1, or 2</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Seed a BFS queue with EVERY rotten orange at once (multi-source, not one-at-a-time), then process level by level — each full level of the queue corresponds to exactly one minute passing.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Multi-source level-order BFS. All initially-rotten cells start in the queue at minute 0; each while-loop iteration drains the current queue snapshot (one minute), rotting and enqueueing every fresh neighbor found. Stop when the queue empties or no fresh oranges remain.</p>
<pre class="code" data-lang="java"><code>public int orangesRotting(int[][] grid) {
    int rows = grid.length, cols = grid[0].length, fresh = 0;
    Queue&lt;int[]&gt; queue = new LinkedList&lt;&gt;();
    for (int r = 0; r &lt; rows; r++) for (int c = 0; c &lt; cols; c++) {
        if (grid[r][c] == 2) queue.offer(new int[]{r, c});
        else if (grid[r][c] == 1) fresh++;
    }
    int minutes = 0;
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!queue.isEmpty() &amp;&amp; fresh &gt; 0) {
        int size = queue.size();
        for (int i = 0; i &lt; size; i++) {
            int[] cell = queue.poll();
            for (int[] d : dirs) {
                int nr = cell[0] + d[0], nc = cell[1] + d[1];
                if (nr &gt;= 0 &amp;&amp; nc &gt;= 0 &amp;&amp; nr &lt; rows &amp;&amp; nc &lt; cols &amp;&amp; grid[nr][nc] == 1) {
                    grid[nr][nc] = 2; fresh--; queue.offer(new int[]{nr, nc});
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>grid = [[2,1,1],[1,1,0],[0,1,1]]</code> — starts with 1 rotten, 6 fresh</p>
<table class="tbl">
<tr><th>minute</th><th>queue processed</th><th>newly rotted</th><th>fresh left</th></tr>
<tr><td>1</td><td>(0,0)</td><td>(1,0), (0,1)</td><td>4</td></tr>
<tr><td>2</td><td>(1,0), (0,1)</td><td>(1,1), (0,2)</td><td>2</td></tr>
<tr><td>3</td><td>(1,1), (0,2)</td><td>(2,1)</td><td>1</td></tr>
<tr><td>4</td><td>(2,1)</td><td>(2,2)</td><td>0</td></tr>
</table>
<p class="fs13">fresh hits 0 after minute 4 → return <code>4</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — every cell enqueued/rotted at most once. Space: O(m·n) for the queue.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Multiple simultaneous starting points spreading outward together" is multi-source BFS — seed ALL sources before the first level, don't BFS from them one at a time (that would compute wrong, sequential distances).</div>`});

/* Problem 108 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q108 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 108 · MEDIUM</span>Surrounded Regions</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">DFS</span></div>
<p class="dropcap">Given an <code>m x n</code> board of <code>'X'</code> and <code>'O'</code>, flip every <code>'O'</code> to <code>'X'</code> that is NOT connected (4-directionally) to any <code>'O'</code> on the border. Border-connected regions are "safe" and stay <code>'O'</code>. Modify the board in place.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: board = [["X","X","X","X"],
                 ["X","O","O","X"],
                 ["X","X","O","X"],
                 ["X","O","X","X"]]
Output:        [["X","X","X","X"],
                 ["X","X","X","X"],
                 ["X","X","X","X"],
                 ["X","O","X","X"]]
Explanation: the interior 3-cell 'O' region is captured; the border 'O' at (3,1) survives</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= m, n &lt;= 200</li><li>board[i][j] is 'X' or 'O'</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Flood-filling to find "captured" regions directly is backwards. Instead flood-fill from every border 'O' to find the SAFE cells first, then flip everything else in one final pass.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>DFS from every border cell that is 'O', temporarily marking each reached cell <code>'#'</code> (safe, don't touch). Then one final sweep: any remaining <code>'O'</code> was never border-connected, so flip it to <code>'X'</code>; any <code>'#'</code> was safe, so flip it back to <code>'O'</code>.</p>
<pre class="code" data-lang="java"><code>public void solve(char[][] board) {
    int rows = board.length, cols = board[0].length;
    for (int r = 0; r &lt; rows; r++) { markSafe(board, r, 0); markSafe(board, r, cols - 1); }
    for (int c = 0; c &lt; cols; c++) { markSafe(board, 0, c); markSafe(board, rows - 1, c); }
    for (int r = 0; r &lt; rows; r++) for (int c = 0; c &lt; cols; c++) {
        if (board[r][c] == 'O') board[r][c] = 'X';
        else if (board[r][c] == '#') board[r][c] = 'O';
    }
}
private void markSafe(char[][] board, int r, int c) {
    if (r &lt; 0 || c &lt; 0 || r &gt;= board.length || c &gt;= board[0].length || board[r][c] != 'O') return;
    board[r][c] = '#';
    markSafe(board, r + 1, c); markSafe(board, r - 1, c);
    markSafe(board, r, c + 1); markSafe(board, r, c - 1);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: the 4x4 board from the example, where (3,1) is the only border cell that is 'O'</p>
<table class="tbl">
<tr><th>step</th><th>action</th><th>effect</th></tr>
<tr><td>1</td><td>border scan hits (3,1) = 'O'</td><td>markSafe(3,1) → board[3][1] = '#'</td></tr>
<tr><td>2</td><td>markSafe checks (3,1)'s neighbors</td><td>(2,1) and (3,0) are 'X' → recursion stops there, no further marks</td></tr>
<tr><td>3</td><td>final sweep reaches (1,1),(1,2),(2,2)</td><td>still 'O' (never marked) → flipped to 'X' (captured)</td></tr>
<tr><td>4</td><td>final sweep reaches (3,1)</td><td>is '#' → flipped back to 'O' (border-safe)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — border DFS plus one full sweep, both linear in board size. Space: O(m·n) worst-case recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Find what's trapped" is often easier as "find what's NOT trapped (reachable from the boundary), then everything else is trapped" — the same flip applies to Pacific Atlantic and any "reachable from the edge" grid problem.</div>`});

/* Problem 109 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q109 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 109 · HARD</span>Word Ladder</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Graph</span><span class="pill">BFS</span></div>
<p class="dropcap">Given <code>beginWord</code>, <code>endWord</code>, and a dictionary <code>wordList</code>, return the length of the shortest transformation sequence from <code>beginWord</code> to <code>endWord</code> where each step changes exactly one letter and every intermediate word must be in <code>wordList</code>. Return 0 if no such sequence exists.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: hit -&gt; hot -&gt; dot -&gt; dog -&gt; cog is 5 words long</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= beginWord.length &lt;= 10; endWord.length == beginWord.length</li><li>1 &lt;= wordList.length &lt;= 5000; all lowercase letters, all entries unique</li><li>beginWord != endWord</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Treat each word as a graph node, with an edge between two words that differ by exactly one letter. "Shortest transformation sequence" is then just shortest path in an unweighted graph — BFS. Generate neighbors by trying all 26 letters at each position rather than comparing against every dictionary word.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Level-order BFS starting from beginWord. At each word, try substituting every position with 'a'..'z'; any resulting word present in the (mutable) word set is an unvisited neighbor — enqueue it and remove it from the set so it's never revisited. The level at which endWord is popped is the answer.</p>
<pre class="code" data-lang="java"><code>public int ladderLength(String beginWord, String endWord, List&lt;String&gt; wordList) {
    Set&lt;String&gt; words = new HashSet&lt;&gt;(wordList);
    if (!words.contains(endWord)) return 0;
    Queue&lt;String&gt; queue = new LinkedList&lt;&gt;();
    queue.offer(beginWord);
    words.remove(beginWord);
    int steps = 1;
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i &lt; size; i++) {
            String word = queue.poll();
            if (word.equals(endWord)) return steps;
            char[] chars = word.toCharArray();
            for (int j = 0; j &lt; chars.length; j++) {
                char orig = chars[j];
                for (char ch = 'a'; ch &lt;= 'z'; ch++) {
                    chars[j] = ch;
                    String next = new String(chars);
                    if (words.contains(next)) { words.remove(next); queue.offer(next); }
                }
                chars[j] = orig;
            }
        }
        steps++;
    }
    return 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: hit → cog, wordList = {hot, dot, dog, lot, log, cog}</p>
<table class="tbl">
<tr><th>level (steps)</th><th>queue</th><th>check</th><th>new words found</th></tr>
<tr><td>1</td><td>[hit]</td><td>hit ≠ cog</td><td>hot</td></tr>
<tr><td>2</td><td>[hot]</td><td>hot ≠ cog</td><td>dot, lot</td></tr>
<tr><td>3</td><td>[dot, lot]</td><td>both ≠ cog</td><td>dog, log</td></tr>
<tr><td>4</td><td>[dog, log]</td><td>both ≠ cog</td><td>cog (found from dog; log's "cog" already removed from the set)</td></tr>
<tr><td>5</td><td>[cog]</td><td>cog == cog</td><td>return 5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(N · L² ) — N words, L letters each; L positions × 26 letters × O(L) to build each candidate string. Space: O(N · L) for the word set and queue.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Generating candidates ('a'..'z' per position) beats comparing the current word against every dictionary word — that swaps an O(N·L) neighbor scan for O(26·L), which matters once N gets large.</div>`});

/* Problem 110 */
B.spread(
{ kicker: 'DSA · GRAPHS: BFS & DFS', head: 'Q110 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 110 · MEDIUM</span>01 Matrix</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Multi-Source BFS</span></div>
<p class="dropcap">Given an <code>m x n</code> binary matrix <code>mat</code>, return a matrix of the same size where each cell holds the distance (in 4-directional steps) to its nearest <code>0</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output:      [[0,0,0],[0,1,0],[1,2,1]]
Explanation: the center 1 is one step from a 0; the bottom-middle 1 is two steps from the nearest 0</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= m, n &lt;= 10⁴; 1 &lt;= m·n &lt;= 10⁴</li><li>mat[i][j] is 0 or 1</li><li>at least one cell is 0</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>BFS-ing outward from every 1 to find its nearest 0 is slow and repeats work. Flip it: seed a BFS queue with EVERY 0 at once (distance 0), then expand outward — the first time BFS reaches any cell is guaranteed to be via the shortest path.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Multi-source BFS. Initialize every 0-cell's distance to 0 and enqueue all of them together; mark every 1-cell as unvisited (-1). Pop cells in FIFO order and relax each unvisited neighbor to <code>current distance + 1</code>, enqueueing it — first-touch is always shortest since all sources start simultaneously.</p>
<pre class="code" data-lang="java"><code>public int[][] updateMatrix(int[][] mat) {
    int rows = mat.length, cols = mat[0].length;
    int[][] dist = new int[rows][cols];
    Queue&lt;int[]&gt; queue = new LinkedList&lt;&gt;();
    for (int r = 0; r &lt; rows; r++) for (int c = 0; c &lt; cols; c++) {
        if (mat[r][c] == 0) queue.offer(new int[]{r, c});
        else dist[r][c] = -1;
    }
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] d : dirs) {
            int nr = cell[0] + d[0], nc = cell[1] + d[1];
            if (nr &gt;= 0 &amp;&amp; nc &gt;= 0 &amp;&amp; nr &lt; rows &amp;&amp; nc &lt; cols &amp;&amp; dist[nr][nc] == -1) {
                dist[nr][nc] = dist[cell[0]][cell[1]] + 1;
                queue.offer(new int[]{nr, nc});
            }
        }
    }
    return dist;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>mat = [[0,0,0],[0,1,0],[1,1,1]]</code> — 5 zero-cells seeded at distance 0</p>
<table class="tbl">
<tr><th>popped</th><th>dist</th><th>newly discovered</th></tr>
<tr><td>(0,0)</td><td>0</td><td>—</td></tr>
<tr><td>(0,1)</td><td>0</td><td>(1,1) → dist 1</td></tr>
<tr><td>(0,2)</td><td>0</td><td>—</td></tr>
<tr><td>(1,0)</td><td>0</td><td>(2,0) → dist 1</td></tr>
<tr><td>(1,2)</td><td>0</td><td>(2,2) → dist 1</td></tr>
<tr><td>(1,1)</td><td>1</td><td>(2,1) → dist 2</td></tr>
<tr><td>(2,0)</td><td>1</td><td>—</td></tr>
<tr><td>(2,2)</td><td>1</td><td>—</td></tr>
</table>
<p class="fs13">Final: <code>[[0,0,0],[0,1,0],[1,2,1]]</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — every cell enqueued and relaxed at most once. Space: O(m·n) for the queue and distance grid.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever a problem asks for "distance to nearest X" over many cells at once, multi-source BFS from all X's simultaneously is the O(m·n) answer — running single-source BFS from each cell individually would be O((m·n)²).</div>`});

})();
