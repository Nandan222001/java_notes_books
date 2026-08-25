/* ===== CHAPTER 43 · DSA: Graphs — Union-Find, MST & Shortest Path ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 43, 'DSA: Graphs — Union-Find, MST & Shortest Path');

/* Problem 111 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q111 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 111 · MEDIUM</span>Number of Connected Components in an Undirected Graph</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Union-Find</span></div>
<p class="dropcap">Given <code>n</code> nodes labeled 0 to n-1 and a list of undirected edges, return the number of connected components in the graph.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
Explanation: {0,1,2} form one component, {3,4} form another</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 2000</li><li>0 &lt;= edges.length &lt;= n(n-1)/2</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Union-Find (Disjoint Set Union) tracks which nodes belong to the same group in near-O(1) per operation — union every edge's endpoints, then count distinct roots.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Initialize each node as its own parent. For every edge, union its two endpoints (with path compression for speed). At the end, count how many nodes are their own root — that's the component count.</p>
<pre class="code" data-lang="java"><code>public int countComponents(int n, int[][] edges) {
    int[] parent = new int[n];
    for (int i = 0; i &lt; n; i++) parent[i] = i;
    for (int[] e : edges) union(parent, e[0], e[1]);
    int count = 0;
    for (int i = 0; i &lt; n; i++) if (find(parent, i) == i) count++;
    return count;
}
private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]); // path compression
    return parent[x];
}
private void union(int[] parent, int a, int b) {
    int ra = find(parent, a), rb = find(parent, b);
    if (ra != rb) parent[ra] = rb;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 5, edges = [[0,1],[1,2],[3,4]]</code></p>
<table class="tbl">
<tr><th>edge</th><th>find(a)</th><th>find(b)</th><th>parent[] after</th></tr>
<tr><td>[0,1]</td><td>0</td><td>1</td><td>[1,1,2,3,4]</td></tr>
<tr><td>[1,2]</td><td>1</td><td>2</td><td>[1,2,2,3,4]</td></tr>
<tr><td>[3,4]</td><td>3</td><td>4</td><td>[1,2,2,4,4]</td></tr>
</table>
<p class="fs13">Roots: find(0)=2, find(1)=2, find(2)=2, find(3)=4, find(4)=4 → distinct roots {2,4} → <code>count = 2</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(E · α(n)) — near O(E) with path compression. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever a problem is about "which things end up grouped together" under repeated merges, suspect Union-Find before reaching for BFS/DFS.</div>`});

/* Problem 112 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q112 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 112 · MEDIUM</span>Redundant Connection</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Union-Find</span></div>
<p class="dropcap">A tree with <code>n</code> nodes had one extra edge added, creating exactly one cycle. Given <code>edges</code> (added in order, 1-indexed node labels), return the edge that, if removed, restores a tree. If several edges could be removed, return the one that occurs last in the input.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Explanation: [1,2] and [1,3] already connect all 3 nodes; [2,3] closes a cycle</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == edges.length</li><li>3 &lt;= n &lt;= 1000</li><li>edges[i].length == 2, 1 &lt;= a[i], b[i] &lt;= n</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Process edges left to right, unioning endpoints. The moment an edge's two endpoints already share a root, that edge is the redundant one — return it immediately.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Union-Find with path compression again, but this time <code>union</code> reports whether the two nodes were already connected <em>before</em> merging. The first edge where that's true is the answer — a tree has exactly n-1 edges, so exactly one edge closes a cycle.</p>
<pre class="code" data-lang="java"><code>public int[] findRedundantConnection(int[][] edges) {
    int n = edges.length;
    int[] parent = new int[n + 1];
    for (int i = 0; i &lt;= n; i++) parent[i] = i;
    for (int[] e : edges) {
        int ra = find(parent, e[0]), rb = find(parent, e[1]);
        if (ra == rb) return e;      // already connected → cycle edge
        parent[ra] = rb;
    }
    return new int[0]; // unreachable for valid input
}
private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>edges = [[1,2],[1,3],[2,3]]</code></p>
<table class="tbl">
<tr><th>edge</th><th>find(a)</th><th>find(b)</th><th>action</th></tr>
<tr><td>[1,2]</td><td>1</td><td>2</td><td>different → union, parent[1]=2</td></tr>
<tr><td>[1,3]</td><td>2</td><td>3</td><td>different → union, parent[2]=3</td></tr>
<tr><td>[2,3]</td><td>3</td><td>3</td><td>same root → return [2,3]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · α(n)). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Make <code>union</code> return a boolean ("did this merge two already-connected sets?") — that single bit answers cycle-detection questions directly, no separate DFS needed.</div>`});

/* Problem 113 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q113 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 113 · MEDIUM</span>Graph Valid Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Union-Find</span></div>
<p class="dropcap">Given <code>n</code> nodes labeled 0 to n-1 and a list of undirected <code>edges</code>, determine whether these edges form a valid tree (connected, and no cycles).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true
Explanation: 4 edges, 5 nodes, connected, no cycle → valid tree</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 2000</li><li>0 &lt;= edges.length &lt;= 5000</li><li>edges has no self-loops or duplicate edges</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A valid tree on n nodes has <strong>exactly</strong> n-1 edges AND is fully connected. Check the edge count first (cheap), then union everything and confirm one single component remains.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Fail fast if <code>edges.length != n - 1</code> — a tree can't have more or fewer. Otherwise union every edge; if any union finds the endpoints already connected, a cycle exists and it can't be a tree. If no cycle is found and the edge count matches, connectivity is guaranteed.</p>
<pre class="code" data-lang="java"><code>public boolean validTree(int n, int[][] edges) {
    if (edges.length != n - 1) return false;
    int[] parent = new int[n];
    for (int i = 0; i &lt; n; i++) parent[i] = i;
    for (int[] e : edges) {
        int ra = find(parent, e[0]), rb = find(parent, e[1]);
        if (ra == rb) return false;  // cycle
        parent[ra] = rb;
    }
    return true;
}
private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]</code> — edge count 4 == n-1 = 4, so proceed</p>
<table class="tbl">
<tr><th>edge</th><th>find(a)</th><th>find(b)</th><th>action</th></tr>
<tr><td>[0,1]</td><td>0</td><td>1</td><td>union, parent[0]=1</td></tr>
<tr><td>[0,2]</td><td>1</td><td>2</td><td>union, parent[1]=2</td></tr>
<tr><td>[0,3]</td><td>2</td><td>3</td><td>union, parent[2]=3</td></tr>
<tr><td>[1,4]</td><td>3</td><td>4</td><td>union, parent[3]=4</td></tr>
</table>
<p class="fs13">No cycle found across all 4 edges → return <code>true</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · α(n)). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Valid tree" is really two independent checks fused together: exactly n-1 edges (no extra edges to cause a cycle) and connectivity (Union-Find ends in one component).</div>`});

/* Problem 114 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q114 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 114 · MEDIUM</span>Accounts Merge</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Union-Find</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Each account is <code>[name, email1, email2, ...]</code>. Two accounts belong to the same person if they share at least one email. Merge all accounts belonging to the same person into one, with the name first and emails sorted ascending.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: accounts = [["John","j1@x.com","j2@x.com"],
                    ["John","j3@x.com"],
                    ["John","j1@x.com","j4@x.com"]]
Output: [["John","j1@x.com","j2@x.com","j4@x.com"], ["John","j3@x.com"]]
Explanation: accounts 0 and 2 share j1@x.com, so they merge; account 1 is a different John</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= accounts.length &lt;= 1000</li><li>2 &lt;= accounts[i].length &lt;= 10</li><li>1 &lt;= accounts[i][j].length &lt;= 30</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Union-Find, but the elements being unioned are emails, not indices. Union every email in an account with the account's first email, then group emails by root and re-attach the owning name.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Map each email to a numeric id and its owner name. For each account, union all its emails with the first email. Then group emails by find-root into buckets, sort each bucket, and prepend the owner's name.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;String&gt;&gt; accountsMerge(List&lt;List&lt;String&gt;&gt; accounts) {
    Map&lt;String, Integer&gt; emailToId = new HashMap&lt;&gt;();
    Map&lt;String, String&gt; emailToName = new HashMap&lt;&gt;();
    int id = 0;
    for (List&lt;String&gt; acc : accounts) {
        String name = acc.get(0);
        for (int i = 1; i &lt; acc.size(); i++) {
            String email = acc.get(i);
            emailToName.put(email, name);
            emailToId.putIfAbsent(email, id++);
        }
    }
    int[] parent = new int[id];
    for (int i = 0; i &lt; id; i++) parent[i] = i;
    for (List&lt;String&gt; acc : accounts) {
        int first = emailToId.get(acc.get(1));
        for (int i = 2; i &lt; acc.size(); i++) union(parent, first, emailToId.get(acc.get(i)));
    }
    Map&lt;Integer, TreeSet&lt;String&gt;&gt; groups = new HashMap&lt;&gt;();
    for (String email : emailToId.keySet()) {
        int root = find(parent, emailToId.get(email));
        groups.computeIfAbsent(root, k -&gt; new TreeSet&lt;&gt;()).add(email);
    }
    List&lt;List&lt;String&gt;&gt; result = new ArrayList&lt;&gt;();
    for (var entry : groups.entrySet()) {
        List&lt;String&gt; merged = new ArrayList&lt;&gt;();
        String anyEmail = entry.getValue().first();
        merged.add(emailToName.get(anyEmail));
        merged.addAll(entry.getValue());
        result.add(merged);
    }
    return result;
}
private int find(int[] p, int x) { return p[x] == x ? x : (p[x] = find(p, p[x])); }
private void union(int[] p, int a, int b) { p[find(p, a)] = find(p, b); }</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Ids: j1=0, j2=1, j3=2, j4=3</p>
<table class="tbl">
<tr><th>account</th><th>unions</th><th>parent[] after</th></tr>
<tr><td>["John",j1,j2]</td><td>union(0,1)</td><td>[1,1,2,3]</td></tr>
<tr><td>["John",j3]</td><td>none (single email)</td><td>[1,1,2,3]</td></tr>
<tr><td>["John",j1,j4]</td><td>union(0,3)</td><td>find(0)=1 → parent[1]=3 → [1,3,2,3]</td></tr>
</table>
<p class="fs13">Roots: find(0)=3, find(1)=3, find(2)=2, find(3)=3 → group{3}={j1,j2,j4}, group{2}={j3} → matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(N·K·log(N·K)) for N accounts, K emails each (sorting dominates). Space: O(N·K).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Union-Find isn't limited to integer node ids — map any hashable entity (emails, strings, coordinates) to an integer id first, and the same DSU machinery applies unchanged.</div>`});

/* Problem 115 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q115 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 115 · MEDIUM</span>Network Delay Time</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Dijkstra</span><span class="pill">Priority Queue</span></div>
<p class="dropcap">There are <code>n</code> network nodes labeled 1 to n. <code>times[i] = [u, v, w]</code> means a signal takes <code>w</code> time to travel from node u to node v. A signal is sent from node <code>k</code>. Return the time for all n nodes to receive it, or -1 if impossible.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
Explanation: node 2 reaches 1 and 3 at time 1, then 4 at time 2 (via 3) — max = 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= k &lt;= n &lt;= 100</li><li>1 &lt;= times.length &lt;= 6000</li><li>1 &lt;= w &lt;= 100, no self-loops, no duplicate edges</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Classic single-source shortest path on a weighted directed graph — run Dijkstra's algorithm from k with a min-heap keyed on distance, then answer is the max finalized distance (or -1 if any node is unreached).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build an adjacency list. Use a <code>PriorityQueue&lt;int[]&gt;</code> ordered by distance, starting with <code>(k, 0)</code>. Pop the closest unvisited node, finalize its distance, and relax its outgoing edges. The answer is the largest finalized distance, or -1 if fewer than n nodes were finalized.</p>
<pre class="code" data-lang="java"><code>public int networkDelayTime(int[][] times, int n, int k) {
    List&lt;List&lt;int[]&gt;&gt; adj = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt;= n; i++) adj.add(new ArrayList&lt;&gt;());
    for (int[] t : times) adj.get(t[0]).add(new int[]{t[1], t[2]});

    int[] dist = new int[n + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    PriorityQueue&lt;int[]&gt; pq = new PriorityQueue&lt;&gt;((a, b) -&gt; a[1] - b[1]);
    pq.offer(new int[]{k, 0});
    boolean[] visited = new boolean[n + 1];
    int reached = 0, maxDist = 0;

    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int node = cur[0], d = cur[1];
        if (visited[node]) continue;
        visited[node] = true;
        reached++; maxDist = Math.max(maxDist, d);
        for (int[] nb : adj.get(node)) {
            int next = nb[0], w = nb[1];
            if (d + w &lt; dist[next]) { dist[next] = d + w; pq.offer(new int[]{next, d + w}); }
        }
    }
    return reached == n ? maxDist : -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2</code></p>
<table class="tbl">
<tr><th>pop (node,dist)</th><th>visited?</th><th>relax</th><th>pq after</th></tr>
<tr><td>(2,0)</td><td>no → finalize, maxDist=0</td><td>1→1, 3→1</td><td>[(1,1),(3,1)]</td></tr>
<tr><td>(1,1)</td><td>no → finalize, maxDist=1</td><td>no outgoing edges</td><td>[(3,1)]</td></tr>
<tr><td>(3,1)</td><td>no → finalize, maxDist=1</td><td>4→2</td><td>[(4,2)]</td></tr>
<tr><td>(4,2)</td><td>no → finalize, maxDist=2</td><td>none</td><td>[]</td></tr>
</table>
<p class="fs13">reached = 4 == n → return <code>maxDist = 2</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(E log V) with a binary heap. Space: O(V + E).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Dijkstra's greedy correctness relies on non-negative weights — the first time a node is popped from the heap, its distance is final, so a simple <code>visited</code> check is enough to skip stale entries.</div>`});

/* Problem 116 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q116 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 116 · MEDIUM</span>Cheapest Flights Within K Stops</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Bellman-Ford</span><span class="pill">BFS</span></div>
<p class="dropcap">There are <code>n</code> cities and <code>flights[i] = [from, to, price]</code>. Find the cheapest price from <code>src</code> to <code>dst</code> with at most <code>k</code> stops (i.e., at most k+1 edges). Return -1 if no such route exists.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation: 0→1→3 costs 100+600=700 within 1 stop (cheaper 0→1→2→3=400 needs 2 stops, too many)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 100</li><li>0 &lt;= flights.length &lt;= (n·(n-1))/2</li><li>0 &lt;= src, dst, k &lt;= n-1, src != dst</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Plain Dijkstra doesn't respect the stop limit because it finalizes by cost, not by hop count. Instead run a Bellman-Ford-style relaxation capped at k+1 rounds — relax ALL edges each round using last round's distances (not this round's), so a round never uses more than one extra hop.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Run k+1 rounds of edge relaxation (k+1 allowed edges total). Each round must relax against a <em>snapshot</em> of the previous round's distances — updating <code>dist</code> in place mid-round would let a single round chain multiple hops, silently ignoring the stop limit.</p>
<pre class="code" data-lang="java"><code>public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    for (int round = 0; round &lt;= k; round++) {
        int[] next = dist.clone();
        for (int[] f : flights) {
            int u = f[0], v = f[1], price = f[2];
            if (dist[u] != Integer.MAX_VALUE &amp;&amp; dist[u] + price &lt; next[v]) {
                next[v] = dist[u] + price;
            }
        }
        dist = next;
    }
    return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>src = 0, dst = 3, k = 1</code> (2 rounds allowed: round 0 and round 1)</p>
<table class="tbl">
<tr><th>round</th><th>relaxations applied</th><th>dist[] after (0,1,2,3)</th></tr>
<tr><td>start</td><td>—</td><td>[0,∞,∞,∞]</td></tr>
<tr><td>0</td><td>0→1: next[1]=100; 0→? others need dist[0]... only edge from 0 is 0→1</td><td>[0,100,∞,∞]</td></tr>
<tr><td>1</td><td>1→2: next[2]=200; 1→3: next[3]=100+600=700; 2→3, 2→0 skipped (dist[2]=∞ still)</td><td>[0,100,200,700]</td></tr>
</table>
<p class="fs13">dist[3] = 700 → return <code>700</code> (matches: 0→1→3 in exactly 1 stop)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(k · E). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever a shortest-path problem adds "at most K edges/stops", greedy Dijkstra breaks — bound the relaxation by rounds instead, cloning distances so each round represents exactly one extra edge.</div>`});

/* Problem 117 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q117 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 117 · HARD</span>Min Cost to Connect All Points</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Graph</span><span class="pill">MST</span><span class="pill">Prim's</span></div>
<p class="dropcap">Given <code>points[i] = [xi, yi]</code>, the cost to connect two points is their Manhattan distance. Return the minimum total cost to connect all points such that there is a path between every pair (a minimum spanning tree).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= points.length &lt;= 1000</li><li>-10⁶ &lt;= xi, yi &lt;= 10⁶</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The graph is complete (every pair of points is a potential edge weighted by Manhattan distance) — build the MST with Prim's algorithm, growing one tree by always adding the cheapest edge that connects a new point.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Start the MST at point 0. Maintain <code>minDist[i]</code> = cheapest known edge connecting point i to the growing tree. Repeatedly pick the closest unvisited point, add its distance to the answer, then relax <code>minDist</code> for all other unvisited points against the newly added one — an O(n²) Prim's, well within n &lt;= 1000.</p>
<pre class="code" data-lang="java"><code>public int minCostConnectPoints(int[][] points) {
    int n = points.length;
    int[] minDist = new int[n];
    Arrays.fill(minDist, Integer.MAX_VALUE);
    boolean[] inMST = new boolean[n];
    minDist[0] = 0;
    int total = 0;
    for (int i = 0; i &lt; n; i++) {
        int u = -1;
        for (int j = 0; j &lt; n; j++) if (!inMST[j] &amp;&amp; (u == -1 || minDist[j] &lt; minDist[u])) u = j;
        inMST[u] = true;
        total += minDist[u];
        for (int v = 0; v &lt; n; v++) {
            if (!inMST[v]) {
                int d = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
                if (d &lt; minDist[v]) minDist[v] = d;
            }
        }
    }
    return total;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>points = [[0,0],[2,2],[3,10],[5,2],[7,0]]</code> (labels 0..4)</p>
<table class="tbl">
<tr><th>step</th><th>pick u</th><th>edge cost</th><th>total</th><th>minDist[] updated for remaining</th></tr>
<tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1:4, 2:13, 3:7, 4:7</td></tr>
<tr><td>2</td><td>1 (dist 4)</td><td>4</td><td>4</td><td>2:9, 3:3, 4:7 (via 1)</td></tr>
<tr><td>3</td><td>3 (dist 3)</td><td>3</td><td>7</td><td>2:9, 4:4 (via 3)</td></tr>
<tr><td>4</td><td>4 (dist 4)</td><td>4</td><td>11</td><td>2:9 unchanged</td></tr>
<tr><td>5</td><td>2 (dist 9)</td><td>9</td><td>20</td><td>—</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) (dense-graph Prim's, no heap needed for n ≤ 1000). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>For dense/complete graphs, array-based Prim's (O(n²)) beats a heap-based approach — the heap's log factor isn't worth it when almost every edge exists anyway.</div>`});

/* Problem 118 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q118 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 118 · HARD</span>Swim in Rising Water</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Graph</span><span class="pill">Binary Search</span><span class="pill">BFS</span></div>
<p class="dropcap">An <code>n x n</code> grid has elevation <code>grid[i][j]</code>. At time <code>t</code>, water level is t and you may move to any adjacent cell (4-directionally) whose elevation is <code>&lt;= t</code>. Starting at (0,0), return the minimum time to reach (n-1,n-1).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: grid = [[0,2],[1,3]]
Output: 3
Explanation: at t=3 all cells (0,1,2,3) are reachable, forming a path from (0,0) to (1,1)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == grid.length == grid[i].length</li><li>1 &lt;= n &lt;= 50</li><li>0 &lt;= grid[i][j] &lt; n²</li><li>all elevations distinct</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>"Can we reach the end by time t?" is monotonic in t — binary search t, and for each candidate BFS/DFS through cells with elevation &lt;= t. Equivalently, a Dijkstra-style approach tracks the minimum "max elevation seen so far" per cell with a min-heap.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Treat it as Dijkstra where the "distance" to a cell is the minimum possible maximum elevation along any path to it. Pop the cell with the smallest such value from a min-heap; for each neighbor, its candidate value is <code>max(current cost, neighbor's elevation)</code>. The value popped for the destination is the answer.</p>
<pre class="code" data-lang="java"><code>public int swimInWater(int[][] grid) {
    int n = grid.length;
    int[][] best = new int[n][n];
    for (int[] row : best) Arrays.fill(row, Integer.MAX_VALUE);
    best[0][0] = grid[0][0];
    PriorityQueue&lt;int[]&gt; pq = new PriorityQueue&lt;&gt;((a, b) -&gt; a[0] - b[0]);
    pq.offer(new int[]{grid[0][0], 0, 0});
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int cost = cur[0], r = cur[1], c = cur[2];
        if (r == n - 1 &amp;&amp; c == n - 1) return cost;
        if (cost &gt; best[r][c]) continue;
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr &lt; 0 || nr &gt;= n || nc &lt; 0 || nc &gt;= n) continue;
            int nextCost = Math.max(cost, grid[nr][nc]);
            if (nextCost &lt; best[nr][nc]) {
                best[nr][nc] = nextCost;
                pq.offer(new int[]{nextCost, nr, nc});
            }
        }
    }
    return -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>grid = [[0,2],[1,3]]</code></p>
<table class="tbl">
<tr><th>pop (cost,r,c)</th><th>action</th><th>pq after</th></tr>
<tr><td>(0,0,0)</td><td>relax (0,1)→max(0,2)=2; (1,0)→max(0,1)=1</td><td>[(1,1,0),(2,0,1)]</td></tr>
<tr><td>(1,1,0)</td><td>relax (1,1)→max(1,3)=3</td><td>[(2,0,1),(3,1,1)]</td></tr>
<tr><td>(2,0,1)</td><td>relax (1,1)→max(2,3)=3, not &lt; existing 3, skip</td><td>[(3,1,1)]</td></tr>
<tr><td>(3,1,1)</td><td>destination reached → return 3</td><td>—</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n² log n). Space: O(n²).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Minimize the maximum edge/cell weight along a path" is a Dijkstra variant — swap the relaxation rule from <code>cost + weight</code> to <code>max(cost, weight)</code> and everything else stays identical.</div>`});

/* Problem 119 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q119 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 119 · MEDIUM</span>Path with Maximum Probability</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">Dijkstra</span></div>
<p class="dropcap">Given an undirected graph with <code>n</code> nodes, edges <code>[a,b]</code> each with a success probability, find the path from <code>start</code> to <code>end</code> with maximum probability of success (product of edge probabilities along the path). Return 0 if no path exists.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25
Explanation: path 0→1→2 gives 0.5*0.5=0.25, beating the direct edge 0→2 at 0.2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 &lt;= n &lt;= 10⁴</li><li>0 &lt;= start, end &lt; n, start != end</li><li>0 &lt;= succProb[i] &lt;= 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This is Dijkstra with the relaxation flipped: instead of minimizing summed distance, maximize the multiplied probability. Use a max-heap (or a min-heap on negated probability) and relax with <code>prob[u] * edgeProb</code> whenever it beats <code>prob[v]</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build an adjacency list with probabilities as edge weights. Run Dijkstra from <code>start</code> using a max-heap ordered by current best probability; pop the node with the highest probability, and relax neighbors by multiplying (not adding). Since probabilities only shrink or stay equal when multiplied by values &lt;= 1, this greedy approach is valid exactly like standard Dijkstra.</p>
<pre class="code" data-lang="java"><code>public double maxProbability(int n, int[][] edges, double[] succProb, int start, int end) {
    List&lt;List&lt;double[]&gt;&gt; adj = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; n; i++) adj.add(new ArrayList&lt;&gt;());
    for (int i = 0; i &lt; edges.length; i++) {
        int a = edges[i][0], b = edges[i][1];
        adj.get(a).add(new double[]{b, succProb[i]});
        adj.get(b).add(new double[]{a, succProb[i]});
    }
    double[] prob = new double[n];
    prob[start] = 1.0;
    PriorityQueue&lt;double[]&gt; pq = new PriorityQueue&lt;&gt;((x, y) -&gt; Double.compare(y[1], x[1]));
    pq.offer(new double[]{start, 1.0});
    boolean[] visited = new boolean[n];
    while (!pq.isEmpty()) {
        double[] cur = pq.poll();
        int node = (int) cur[0];
        if (visited[node]) continue;
        visited[node] = true;
        if (node == end) return cur[1];
        for (double[] nb : adj.get(node)) {
            int next = (int) nb[0];
            double p = prob[node] * nb[1];
            if (p &gt; prob[next]) { prob[next] = p; pq.offer(new double[]{next, p}); }
        }
    }
    return 0.0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n=3, edges=[[0,1],[1,2],[0,2]], succProb=[0.5,0.5,0.2], start=0, end=2</code></p>
<table class="tbl">
<tr><th>pop (node,prob)</th><th>relax</th><th>pq after</th></tr>
<tr><td>(0,1.0)</td><td>1→1.0*0.5=0.5; 2→1.0*0.2=0.2</td><td>[(1,0.5),(2,0.2)]</td></tr>
<tr><td>(1,0.5)</td><td>2→0.5*0.5=0.25 &gt; 0.2 → update</td><td>[(2,0.25),(2,0.2)]</td></tr>
<tr><td>(2,0.25)</td><td>node==end → return 0.25</td><td>—</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(E log V). Space: O(V + E).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Dijkstra generalizes to any relaxation that is monotonic and "only gets worse" when extended — sum with non-negative weights, or product with factors in [0,1], both qualify.</div>`});

/* Problem 120 */
B.spread(
{ kicker: 'DSA · GRAPHS: ADVANCED', head: 'Q120 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 120 · MEDIUM</span>Evaluate Division</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Graph</span><span class="pill">DFS/BFS</span><span class="pill">Weighted Graph</span></div>
<p class="dropcap">Given equations <code>Aᵢ / Bᵢ = valuesᵢ</code> and a list of <code>queries</code>, answer each query <code>Cⱼ / Dⱼ</code>, or -1.0 if it can't be determined from the given equations.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"]]
Output: [6.0, 0.5, -1.0]
Explanation: a/c = (a/b)*(b/c) = 2*3 = 6; b/a = 1/2 = 0.5; e is unknown → -1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= equations.length &lt;= 20</li><li>0.0 &lt; values[i] &lt;= 20.0</li><li>1 &lt;= queries.length &lt;= 20</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Model each equation as a directed weighted edge: A→B with weight value, and B→A with weight 1/value. Answering a query is just a DFS/BFS from C to D, multiplying edge weights along the path.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build a graph mapping each variable to its neighbors and the division ratio to reach them. For each query, DFS from the numerator toward the denominator, accumulating a running product; return -1 if either variable is unseen or no path connects them.</p>
<pre class="code" data-lang="java"><code>public double[] calcEquation(List&lt;List&lt;String&gt;&gt; equations, double[] values, List&lt;List&lt;String&gt;&gt; queries) {
    Map&lt;String, List&lt;Object[]&gt;&gt; graph = new HashMap&lt;&gt;();
    for (int i = 0; i &lt; equations.size(); i++) {
        String a = equations.get(i).get(0), b = equations.get(i).get(1);
        graph.computeIfAbsent(a, k -&gt; new ArrayList&lt;&gt;()).add(new Object[]{b, values[i]});
        graph.computeIfAbsent(b, k -&gt; new ArrayList&lt;&gt;()).add(new Object[]{a, 1.0 / values[i]});
    }
    double[] results = new double[queries.size()];
    for (int i = 0; i &lt; queries.size(); i++) {
        String src = queries.get(i).get(0), dst = queries.get(i).get(1);
        if (!graph.containsKey(src) || !graph.containsKey(dst)) { results[i] = -1.0; continue; }
        results[i] = dfs(graph, src, dst, new HashSet&lt;&gt;(), 1.0);
    }
    return results;
}
private double dfs(Map&lt;String, List&lt;Object[]&gt;&gt; graph, String cur, String target, Set&lt;String&gt; visited, double acc) {
    if (cur.equals(target)) return acc;
    visited.add(cur);
    for (Object[] edge : graph.get(cur)) {
        String next = (String) edge[0];
        double weight = (double) edge[1];
        if (!visited.contains(next)) {
            double res = dfs(graph, next, target, visited, acc * weight);
            if (res != -1.0) return res;
        }
    }
    return -1.0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Graph edges: a→b (2.0), b→a (0.5), b→c (3.0), c→b (0.333...). Query: <code>a / c</code></p>
<table class="tbl">
<tr><th>dfs call</th><th>acc</th><th>action</th></tr>
<tr><td>dfs(a, target=c, acc=1.0)</td><td>1.0</td><td>a != c, visit neighbor b (weight 2.0)</td></tr>
<tr><td>dfs(b, target=c, acc=2.0)</td><td>2.0</td><td>b != c, visit neighbor c (weight 3.0)</td></tr>
<tr><td>dfs(c, target=c, acc=6.0)</td><td>6.0</td><td>c == c → return 6.0</td></tr>
</table>
<p class="fs13">Result for query ["a","c"] = <code>6.0</code> (matches expected)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(Q · (V + E)) for Q queries. Space: O(V + E).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Ratios chain multiplicatively along a path the same way distances chain additively — build the reciprocal reverse edge for every equation so the graph is traversable in both directions.</div>`});

})();
