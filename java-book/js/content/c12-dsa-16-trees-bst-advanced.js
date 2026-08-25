/* ===== CHAPTER 47 · DSA: Trees II — BST & Advanced ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 47, 'DSA: Trees II — BST & Advanced');

/* Problem 151 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q151 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 151 · MEDIUM</span>Insert into a Binary Search Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Tree</span><span class="pill">BST</span></div>
<p class="dropcap">Given the root of a BST and a value val, insert val into the tree such that the resulting tree is still a valid BST. There may be multiple valid trees — return the root of any one of them.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
Explanation: 5 becomes the left child of 7 (since 3 &lt; 5 &lt; 7)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 10⁴</li><li>-10⁸ &lt;= Node.val, val &lt;= 10⁸</li><li>all node values are unique; it is guaranteed val does not already exist</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The BST property tells you exactly which direction to go at every node — follow it down until you fall off the tree, then attach the new node right there.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Recurse: if the current node is null, this is where val belongs — return a new node. Otherwise go left if val &lt; node.val, right otherwise, and reattach the (possibly modified) subtree pointer on the way back up.</p>
<pre class="code" data-lang="java"><code>public TreeNode insertIntoBST(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val &lt; root.val) root.left = insertIntoBST(root.left, val);
    else root.right = insertIntoBST(root.right, val);
    return root;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [4,2,7,1,3], val = 5</code> — 4 has children 2,7; 2 has children 1,3</p>
<table class="tbl">
<tr><th>call</th><th>compare</th><th>action</th></tr>
<tr><td>insertIntoBST(4,5)</td><td>5 &gt;= 4</td><td>root.right = insertIntoBST(7,5)</td></tr>
<tr><td>insertIntoBST(7,5)</td><td>5 &lt; 7</td><td>root.left = insertIntoBST(null,5)</td></tr>
<tr><td>insertIntoBST(null,5)</td><td>root == null</td><td>return new TreeNode(5)</td></tr>
<tr><td>back at 7</td><td>—</td><td>7.left = new node 5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(h), h = tree height (O(log n) balanced, O(n) worst case skewed). Space: O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>BST insertion never rebalances or backtracks — the ordering property alone determines one unambiguous path, and the new node is always attached as a leaf.</div>`});

/* Problem 152 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q152 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 152 · MEDIUM</span>Delete Node in a BST</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Tree</span><span class="pill">BST</span></div>
<p class="dropcap">Given the root of a BST and a key, delete the node with that value from the tree and return the new root, keeping it a valid BST. There may be multiple valid resulting trees — return any of them.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: node 3 has two children (2,4); replace it with its in-order successor 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 10⁴</li><li>-10⁵ &lt;= Node.val, key &lt;= 10⁵</li><li>each node's value is unique</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Three cases once you find the node: no children (delete it), one child (replace it with that child), two children (replace its value with the in-order successor — the min of its right subtree — then delete that successor instead).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Search for key like a normal BST lookup. At the match: if a child is missing, splice the other one up. If both exist, copy the smallest value from the right subtree into this node, then recursively delete that duplicate from the right subtree.</p>
<pre class="code" data-lang="java"><code>public TreeNode deleteNode(TreeNode root, int key) {
    if (root == null) return null;
    if (key &lt; root.val) root.left = deleteNode(root.left, key);
    else if (key &gt; root.val) root.right = deleteNode(root.right, key);
    else {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        TreeNode succ = root.right;
        while (succ.left != null) succ = succ.left;
        root.val = succ.val;
        root.right = deleteNode(root.right, succ.val);
    }
    return root;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [5,3,6,2,4,null,7], key = 3</code> — 3 has children 2,4; 6 has right child 7</p>
<table class="tbl">
<tr><th>call</th><th>compare</th><th>action</th></tr>
<tr><td>deleteNode(5,3)</td><td>3 &lt; 5</td><td>root.left = deleteNode(3,3)</td></tr>
<tr><td>deleteNode(3,3)</td><td>match; both children exist</td><td>successor = min of right subtree (4) → succ = 4</td></tr>
<tr><td>—</td><td>root.val = 4</td><td>root.right = deleteNode(4,4)</td></tr>
<tr><td>deleteNode(4,4)</td><td>match; no children</td><td>return null</td></tr>
<tr><td>back at old node 3 (now valued 4)</td><td>—</td><td>right = null → node becomes [4, left=2, right=null]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(h) — one search plus, at most, one more descent to find the successor. Space: O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Copying the successor's value and deleting it recursively is cleaner than juggling raw pointers — it reduces the hard two-child case back to a one-child (or leaf) deletion.</div>`});

/* Problem 153 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q153 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 153 · EASY</span>Convert Sorted Array to Binary Search Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Tree</span><span class="pill">BST</span></div>
<p class="dropcap">Given an integer array nums sorted in strictly ascending order, build a height-balanced BST from it. There may be multiple valid answers — return any.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: pick the middle element as root, recurse on each half</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁴</li><li>-10⁴ &lt;= nums[i] &lt;= 10⁴</li><li>nums is sorted in strictly increasing order</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Always pick the middle element of the current range as the subtree's root — that automatically balances left and right halves, and recursing gives balance at every level too.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Recurse on index ranges [lo, hi]: pick mid = lo + (hi-lo)/2 as the root, recurse for the left range [lo, mid-1] and right range [mid+1, hi]. An empty range (lo &gt; hi) returns null.</p>
<pre class="code" data-lang="java"><code>public TreeNode sortedArrayToBST(int[] nums) {
    return build(nums, 0, nums.length - 1);
}
private TreeNode build(int[] nums, int lo, int hi) {
    if (lo &gt; hi) return null;
    int mid = lo + (hi - lo) / 2;
    TreeNode node = new TreeNode(nums[mid]);
    node.left = build(nums, lo, mid - 1);
    node.right = build(nums, mid + 1, hi);
    return node;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [-10,-3,0,5,9]</code> (indices 0..4)</p>
<table class="tbl">
<tr><th>range [lo,hi]</th><th>mid</th><th>root value</th><th>recurse</th></tr>
<tr><td>[0,4]</td><td>2</td><td>0</td><td>left=[0,1], right=[3,4]</td></tr>
<tr><td>[0,1]</td><td>0</td><td>-10</td><td>left=[0,-1]=null, right=[1,1]</td></tr>
<tr><td>[1,1]</td><td>1</td><td>-3</td><td>leaf → -10.right = -3</td></tr>
<tr><td>[3,4]</td><td>3</td><td>5</td><td>left=[3,2]=null, right=[4,4]</td></tr>
<tr><td>[4,4]</td><td>4</td><td>9</td><td>leaf → 5.right = 9</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — every index visited once. Space: O(log n) recursion stack for the balanced result, plus O(n) for the output tree.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Sorted array → balanced BST" is just divide-and-conquer on indices, mirroring merge sort's split — the middle-element choice is what guarantees O(log n) height.</div>`});

/* Problem 154 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q154 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 154 · MEDIUM</span>Construct Binary Tree from Preorder and Inorder Traversal</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Tree</span><span class="pill">DFS</span></div>
<p class="dropcap">Given two integer arrays preorder and inorder representing the preorder and inorder traversal of the same binary tree (no duplicate values), construct and return the tree.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
Explanation: preorder's first value (3) is always the root</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= tree nodes &lt;= 3000</li><li>preorder and inorder consist of unique values</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Preorder's first element is always the current subtree's root. Find that value in inorder — everything to its left is the left subtree (in inorder), everything to its right is the right subtree. Use a hashmap for O(1) lookup instead of scanning inorder each time.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain a global preorder index that only ever advances. Map each inorder value to its index up front. At each call, pop the next preorder value as root, locate it in inorder to split the range, then build left before right (matching preorder's own root-left-right order).</p>
<pre class="code" data-lang="java"><code>int preIdx = 0;
Map&lt;Integer,Integer&gt; idxMap = new HashMap&lt;&gt;();
public TreeNode buildTree(int[] preorder, int[] inorder) {
    for (int i = 0; i &lt; inorder.length; i++) idxMap.put(inorder[i], i);
    return build(preorder, 0, inorder.length - 1);
}
private TreeNode build(int[] preorder, int inLo, int inHi) {
    if (inLo &gt; inHi) return null;
    int rootVal = preorder[preIdx++];
    TreeNode node = new TreeNode(rootVal);
    int mid = idxMap.get(rootVal);
    node.left = build(preorder, inLo, mid - 1);
    node.right = build(preorder, mid + 1, inHi);
    return node;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]</code></p>
<table class="tbl">
<tr><th>call (inLo,inHi)</th><th>preIdx used</th><th>rootVal</th><th>mid in inorder</th><th>splits into</th></tr>
<tr><td>(0,4)</td><td>0 → 1</td><td>3</td><td>1</td><td>left=(0,0), right=(2,4)</td></tr>
<tr><td>(0,0)</td><td>1 → 2</td><td>9</td><td>0</td><td>leaf (empty ranges both sides)</td></tr>
<tr><td>(2,4)</td><td>2 → 3</td><td>20</td><td>3</td><td>left=(2,2), right=(4,4)</td></tr>
<tr><td>(2,2)</td><td>3 → 4</td><td>15</td><td>2</td><td>leaf</td></tr>
<tr><td>(4,4)</td><td>4 → 5</td><td>7</td><td>4</td><td>leaf</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — with the hashmap, each node is built in O(1) beyond its own call. Space: O(n) for the map plus O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Preorder gives you "who's the root," inorder gives you "how to split into left/right" — that pairing is the general recipe; postorder+inorder works the same way, just popping from the end of postorder instead.</div>`});

/* Problem 155 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q155 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 155 · HARD</span>Serialize and Deserialize Binary Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Tree</span><span class="pill">Design</span></div>
<p class="dropcap">Design an algorithm to serialize a binary tree to a single string, and deserialize that string back to the exact same tree structure. No constraint on the serialization format — only that it round-trips correctly.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [1,2,3,null,null,4,5]
serialize(root) → "1,2,N,N,3,4,N,N,5,N,N,"
deserialize(that string) → [1,2,3,null,null,4,5]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 10⁴</li><li>-1000 &lt;= Node.val &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Preorder traversal that explicitly writes a sentinel (like "N") for every null child encodes the full tree shape unambiguously — no need for inorder as a second traversal.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Serialize with preorder DFS, appending "N" for nulls, comma-separated. Deserialize by splitting on commas into a queue and consuming it with the mirror-image preorder recursion: pop a token, if "N" return null, else build a node and recurse for left then right.</p>
<pre class="code" data-lang="java"><code>public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    ser(root, sb);
    return sb.toString();
}
private void ser(TreeNode node, StringBuilder sb) {
    if (node == null) { sb.append("N,"); return; }
    sb.append(node.val).append(",");
    ser(node.left, sb);
    ser(node.right, sb);
}
public TreeNode deserialize(String data) {
    Deque&lt;String&gt; q = new ArrayDeque&lt;&gt;(Arrays.asList(data.split(",")));
    return deser(q);
}
private TreeNode deser(Deque&lt;String&gt; q) {
    String val = q.poll();
    if (val.equals("N")) return null;
    TreeNode node = new TreeNode(Integer.parseInt(val));
    node.left = deser(q);
    node.right = deser(q);
    return node;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [1,2,3,null,null,4,5]</code> — 1 has children 2(leaf),3; 3 has children 4,5(leaves)</p>
<table class="tbl">
<tr><th>step</th><th>action</th><th>string built so far</th></tr>
<tr><td>ser(1)</td><td>write 1, recurse left(2) then right(3)</td><td>"1,"</td></tr>
<tr><td>ser(2)</td><td>write 2, both children null</td><td>"1,2,N,N,"</td></tr>
<tr><td>ser(3)</td><td>write 3, recurse left(4) then right(5)</td><td>"1,2,N,N,3,"</td></tr>
<tr><td>ser(4), ser(5)</td><td>write 4 and 5, all their children null</td><td>"1,2,N,N,3,4,N,N,5,N,N,"</td></tr>
</table>
<p class="fs13">Deserialize replays the same order: poll "1" → node 1; poll "2" → node 2, its two "N" polls give null children; back up, poll "3" → node 3; poll "4" → leaf; poll "5" → leaf. Reconstructs the original tree exactly.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) for both serialize and deserialize. Space: O(n) for the string/queue plus O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Explicit null markers turn preorder into a uniquely-decodable format on its own — that's the whole trick, and it generalizes to any tree, not just binary ones.</div>`});

/* Problem 156 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q156 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 156 · MEDIUM</span>Binary Tree Right Side View</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Tree</span><span class="pill">BFS</span></div>
<p class="dropcap">Given the root of a binary tree, imagine standing on the right side of it — return the values of the nodes you can see, ordered from top to bottom (the last node of each level).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
Explanation: level 0 → 1, level 1 → 3 (rightmost), level 2 → 4 (rightmost)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 100</li><li>-100 &lt;= Node.val &lt;= 100</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>BFS level by level and keep only the last node processed at each level — or DFS right-before-left and record the first node your recursion reaches at each new depth.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Level-order BFS, snapshotting queue size per level exactly like level-order traversal. Within each level's inner loop, the value on the last iteration (i == size-1) is the one visible from the right, so only that gets added to the result.</p>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; rightSideView(TreeNode root) {
    List&lt;Integer&gt; result = new ArrayList&lt;&gt;();
    if (root == null) return result;
    Queue&lt;TreeNode&gt; queue = new LinkedList&lt;&gt;();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i &lt; size; i++) {
            TreeNode node = queue.poll();
            if (i == size - 1) result.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [1,2,3,null,5,null,4]</code> — 1 has children 2,3; 2 has right child 5; 3 has right child 4</p>
<table class="tbl">
<tr><th>level</th><th>queue processed</th><th>last node (i==size-1)</th><th>result so far</th></tr>
<tr><td>0</td><td>[1]</td><td>1</td><td>[1]</td></tr>
<tr><td>1</td><td>[2,3]</td><td>3</td><td>[1,3]</td></tr>
<tr><td>2</td><td>[5,4]</td><td>4</td><td>[1,3,4]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — every node enqueued/dequeued once. Space: O(n) worst case for the queue (a full last level).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Same "snapshot size per level" BFS skeleton as level-order traversal — right side view just asks for a different slice (the last item) of each level instead of the whole level.</div>`});

/* Problem 157 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q157 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 157 · MEDIUM</span>Count Good Nodes in Binary Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Tree</span><span class="pill">DFS</span></div>
<p class="dropcap">Given the root of a binary tree, a node X is "good" if no node on the path from the root to X has a value greater than X's value. Return the count of good nodes.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [3,1,4,3,null,1,5]
Output: 4
Explanation: root(3), left-left(3), right(4), right-right(5) are good; 1's are blocked by the 3 above them</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 10⁵</li><li>-4·10⁴ &lt;= Node.val &lt;= 4·10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Carry the maximum value seen so far along the current root-to-node path as you DFS down — a node is good exactly when its value is &gt;= that running max.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>DFS passing down the max value seen on the path so far. At each node, compare against that max: if the node qualifies, count it, then recurse into both children with the max updated to include this node's value.</p>
<pre class="code" data-lang="java"><code>public int goodNodes(TreeNode root) {
    return dfs(root, Integer.MIN_VALUE);
}
private int dfs(TreeNode node, int maxSoFar) {
    if (node == null) return 0;
    int count = (node.val &gt;= maxSoFar) ? 1 : 0;
    int newMax = Math.max(maxSoFar, node.val);
    count += dfs(node.left, newMax);
    count += dfs(node.right, newMax);
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [3,1,4,3,null,1,5]</code> — 3 has children 1,4; 1(left) has left child 3; 4 has children 1,5</p>
<table class="tbl">
<tr><th>node</th><th>maxSoFar</th><th>good?</th><th>newMax passed down</th></tr>
<tr><td>3 (root)</td><td>-∞</td><td>yes (count=1)</td><td>3</td></tr>
<tr><td>1 (left child)</td><td>3</td><td>1&gt;=3? no</td><td>3</td></tr>
<tr><td>3 (left-left)</td><td>3</td><td>3&gt;=3? yes (count=2)</td><td>3</td></tr>
<tr><td>4 (right child)</td><td>3</td><td>4&gt;=3? yes (count=3)</td><td>4</td></tr>
<tr><td>1 (right-left)</td><td>4</td><td>1&gt;=4? no</td><td>4</td></tr>
<tr><td>5 (right-right)</td><td>4</td><td>5&gt;=4? yes (count=4)</td><td>5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one visit per node. Space: O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Threading extra state (here, "max value on the path so far") down through DFS parameters is a reusable pattern anytime a node's answer depends on its ancestors, not just its descendants.</div>`});

/* Problem 158 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q158 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 158 · HARD</span>Binary Tree Maximum Path Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Tree</span><span class="pill">DFS</span></div>
<p class="dropcap">Given the root of a binary tree, return the maximum path sum of any non-empty path. A path is any sequence of nodes connected by edges, where each node appears at most once, and it need not pass through the root.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: the path 15 → 20 → 7 gives 15+20+7 = 42</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 3·10⁴</li><li>-1000 &lt;= Node.val &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Two different quantities per node: the best path that can be extended upward to a parent (at most one child branch), versus the best path "through" this node as a peak (both branches, used only to update a global max — never returned upward).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Post-order DFS returning the best downward single-branch gain from each node (clamped at 0 to discard negative branches). At every node, before returning, update a global max using left-gain + right-gain + node.val — the best path that peaks here.</p>
<pre class="code" data-lang="java"><code>int maxSum = Integer.MIN_VALUE;
public int maxPathSum(TreeNode root) {
    gain(root);
    return maxSum;
}
private int gain(TreeNode node) {
    if (node == null) return 0;
    int left = Math.max(gain(node.left), 0);
    int right = Math.max(gain(node.right), 0);
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [-10,9,20,null,null,15,7]</code> — -10 has children 9(leaf),20; 20 has children 15,7(leaves)</p>
<table class="tbl">
<tr><th>node</th><th>left gain</th><th>right gain</th><th>maxSum update</th><th>returns</th></tr>
<tr><td>9</td><td>0</td><td>0</td><td>max(-∞, 9)=9</td><td>9</td></tr>
<tr><td>15</td><td>0</td><td>0</td><td>max(9, 15)=15</td><td>15</td></tr>
<tr><td>7</td><td>0</td><td>0</td><td>max(15, 7)=15</td><td>7</td></tr>
<tr><td>20</td><td>15</td><td>7</td><td>max(15, 20+15+7=42)=42</td><td>20+15=35</td></tr>
<tr><td>-10</td><td>9</td><td>35</td><td>max(42, -10+9+35=34)=42</td><td>-10+35=25</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one visit per node. Space: O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The "return one branch, but use both branches to update a side-channel max" pattern is the diameter trick generalized to weighted nodes — whenever "best path through here" and "best path returnable to my parent" differ, split them exactly like this.</div>`});

/* Problem 159 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q159 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 159 · EASY</span>Two Sum IV - Input is a BST</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Tree</span><span class="pill">BST</span></div>
<p class="dropcap">Given the root of a BST and an integer k, return true if there exist two distinct nodes in the tree whose values sum to exactly k.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [5,3,6,2,4,null,7], k = 9
Output: true
Explanation: 5 + 4 = 9 (nodes with values 5 and 4 both exist)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 10⁴</li><li>-10⁴ &lt;= Node.val &lt;= 10⁴</li><li>root is guaranteed to be a valid BST; -10⁵ &lt;= k &lt;= 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This is just the classic array two-sum in disguise. DFS the tree while keeping a HashSet of values seen so far — at each node check whether (k - node.val) is already in the set before adding node.val to it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Any traversal order works since we only need "does a complement exist anywhere," not position. DFS the whole tree, maintaining a HashSet: at each node, if k - node.val is already in the set, a pair was found; otherwise add node.val and keep going.</p>
<pre class="code" data-lang="java"><code>public boolean findTarget(TreeNode root, int k) {
    return dfs(root, k, new HashSet&lt;&gt;());
}
private boolean dfs(TreeNode node, int k, Set&lt;Integer&gt; seen) {
    if (node == null) return false;
    if (seen.contains(k - node.val)) return true;
    seen.add(node.val);
    return dfs(node.left, k, seen) || dfs(node.right, k, seen);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [5,3,6,2,4,null,7], k = 9</code> — preorder visit: 5,3,2,4,6,7</p>
<table class="tbl">
<tr><th>node</th><th>need (9-val)</th><th>in seen?</th><th>seen after</th></tr>
<tr><td>5</td><td>4</td><td>no</td><td>{5}</td></tr>
<tr><td>3</td><td>6</td><td>no</td><td>{5,3}</td></tr>
<tr><td>2</td><td>7</td><td>no</td><td>{5,3,2}</td></tr>
<tr><td>4</td><td>5</td><td>yes → return true</td><td>—</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — visits at most every node once. Space: O(n) for the HashSet plus O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Don't over-think the BST structure here — a two-pointer approach on the sorted in-order sequence also works in O(n) time/O(n) space and avoids the hash set, but the plain "seen-set DFS" is the fastest to write correctly.</div>`});

/* Problem 160 */
B.spread(
{ kicker: 'DSA · TREES II', head: 'Q160 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 160 · HARD</span>Recover Binary Search Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Tree</span><span class="pill">BST</span></div>
<p class="dropcap">The values of exactly two nodes in a BST were swapped by mistake, corrupting the BST property. Recover the tree in-place without changing its structure — swap the two node's values back so the tree becomes a valid BST again.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: nodes with values 1 and 3 were swapped; swapping them back fixes the BST</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 &lt;= number of nodes &lt;= 1000</li><li>-2³¹ &lt;= Node.val &lt;= 2³¹-1</li><li>exactly two nodes have had their values swapped</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>An in-order traversal of a valid BST is strictly increasing. Walk it while tracking the previous node; every place the sequence dips (prev.val &gt; cur.val) marks one of the two swapped nodes — the first dip's earlier node and the last dip's later node are exactly the two to swap back.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Iterative in-order traversal (Morris or stack-based) tracking prev. On the first violation (prev.val &gt; cur.val), record first=prev and second=cur. On any further violation, update second=cur (handles the adjacent-swap case where only one dip occurs, vs the two-dip case for non-adjacent nodes). Swap first.val and second.val at the end.</p>
<pre class="code" data-lang="java"><code>public void recoverTree(TreeNode root) {
    TreeNode first = null, second = null, prev = null;
    Deque&lt;TreeNode&gt; stack = new ArrayDeque&lt;&gt;();
    TreeNode cur = root;
    while (cur != null || !stack.isEmpty()) {
        while (cur != null) { stack.push(cur); cur = cur.left; }
        cur = stack.pop();
        if (prev != null &amp;&amp; prev.val &gt; cur.val) {
            if (first == null) first = prev;
            second = cur;
        }
        prev = cur;
        cur = cur.right;
    }
    int tmp = first.val; first.val = second.val; second.val = tmp;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [1,3,null,null,2]</code> — 1 has right child 3; 3 has left child 2. In-order visits: 1, 3, 2</p>
<table class="tbl">
<tr><th>cur popped</th><th>prev</th><th>prev.val &gt; cur.val?</th><th>first / second</th></tr>
<tr><td>1</td><td>null</td><td>n/a (prev null)</td><td>first=null, second=null</td></tr>
<tr><td>3</td><td>1</td><td>1&gt;3? no</td><td>unchanged; prev=3</td></tr>
<tr><td>2</td><td>3</td><td>3&gt;2? yes</td><td>first=3 (prev), second=2 (cur)</td></tr>
</table>
<p class="fs13">Loop ends. Swap first.val (3) and second.val (2) → tree becomes [1,2,null,null,3], correctly ordered as 1,2,3 in-order.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one in-order pass. Space: O(h) for the explicit stack (O(1) if using Morris traversal instead).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"First violation's earlier node, last violation's later node" handles both cases uniformly — adjacent swaps produce exactly one dip (first and second come from the same dip), non-adjacent swaps produce two dips spanning the corrupted region.</div>`});

})();
