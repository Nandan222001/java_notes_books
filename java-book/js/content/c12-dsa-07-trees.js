/* ===== CHAPTER 38 · DSA: Trees ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 38, 'DSA: Trees');

/* Problem 061 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q061 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 061 · EASY</span>Maximum Depth of Binary Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Tree</span><span class="pill">DFS</span></div>
<p class="dropcap">Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from root down to the farthest leaf.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [3,9,20,null,null,15,7]
Output: 3
Explanation: 3 → 20 → 15 (or 3 → 20 → 7) is the longest root-to-leaf path</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The depth of a tree is just 1 + the deeper of its two subtrees' depths — a one-line recursive definition.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Classic post-order recursion: a null node has depth 0; otherwise depth is 1 plus the max of the left and right subtree depths.</p>
<pre class="code" data-lang="java"><code>public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [3,9,20,null,null,15,7]</code> (9 is a leaf; 20 has children 15, 7)</p>
<table class="tbl">
<tr><th>call</th><th>left depth</th><th>right depth</th><th>returns</th></tr>
<tr><td>maxDepth(9)</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>maxDepth(15)</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>maxDepth(7)</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>maxDepth(20)</td><td>1 (from 15)</td><td>1 (from 7)</td><td>2</td></tr>
<tr><td>maxDepth(3)</td><td>1 (from 9)</td><td>2 (from 20)</td><td>3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — every node visited once. Space: O(h) — recursion stack, h = tree height.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Most tree problems fall out of "what do I need from my children before I can answer for myself?" — that's the recursive definition.</div>`});

/* Problem 062 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q062 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 062 · EASY</span>Invert Binary Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Tree</span><span class="pill">DFS</span></div>
<p class="dropcap">Given the root of a binary tree, invert it — swap every node's left and right child, recursively — and return the root of the mirrored tree.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input:  root = [4,2,7,1,3,6,9]
Output:       [4,7,2,9,6,3,1]
Explanation: children of every node are swapped, left-right</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 100</li><li>-100 &lt;= Node.val &lt;= 100</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Invert both subtrees first, then swap the two (now-inverted) results onto the current node.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Post-order recursion: recursively invert the left and right subtrees, then swap the two pointers on the current node before returning it.</p>
<pre class="code" data-lang="java"><code>public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode left = invertTree(root.left);
    TreeNode right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [4,2,7,1,3,6,9]</code> (2 has children 1,3; 7 has children 6,9)</p>
<table class="tbl">
<tr><th>call</th><th>left result</th><th>right result</th><th>swap applied</th></tr>
<tr><td>invertTree(1)</td><td>—</td><td>—</td><td>leaf, returns 1</td></tr>
<tr><td>invertTree(3)</td><td>—</td><td>—</td><td>leaf, returns 3</td></tr>
<tr><td>invertTree(2)</td><td>1</td><td>3</td><td>2.left=3, 2.right=1</td></tr>
<tr><td>invertTree(6)</td><td>—</td><td>—</td><td>leaf, returns 6</td></tr>
<tr><td>invertTree(9)</td><td>—</td><td>—</td><td>leaf, returns 9</td></tr>
<tr><td>invertTree(7)</td><td>6</td><td>9</td><td>7.left=9, 7.right=6</td></tr>
<tr><td>invertTree(4)</td><td>2</td><td>7</td><td>4.left=7, 4.right=2</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — every node visited once. Space: O(h) — recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Order doesn't matter — pre-order (swap first, then recurse) works identically. Even BFS with a queue, swapping children as you dequeue, solves it.</div>`});

/* Problem 063 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q063 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 063 · EASY</span>Diameter of Binary Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Tree</span><span class="pill">DFS</span></div>
<p class="dropcap">Given the root of a binary tree, return the length (number of edges) of the diameter — the longest path between any two nodes in the tree. This path may or may not pass through the root.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [1,2,3,4,5]
Output: 3
Explanation: the longest path is [4,2,1,3] (or [5,2,1,3]) — 3 edges</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The longest path through any single node equals leftHeight + rightHeight. Compute heights bottom-up and track the max sum seen at any node.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Reuse the height-computation recursion, but at every node update a global (or instance) max with left height + right height — the best path "through" that node — before returning 1 + max(left, right) upward.</p>
<pre class="code" data-lang="java"><code>int diameter = 0;
public int diameterOfBinaryTree(TreeNode root) {
    height(root);
    return diameter;
}
private int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left);
    int right = height(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [1,2,3,4,5]</code> — 1 has children 2,3; 2 has children 4,5</p>
<table class="tbl">
<tr><th>node</th><th>left h</th><th>right h</th><th>diameter so far</th><th>returns</th></tr>
<tr><td>4</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>5</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>2</td><td>1</td><td>1</td><td>2</td><td>2</td></tr>
<tr><td>3</td><td>0</td><td>0</td><td>2</td><td>1</td></tr>
<tr><td>1</td><td>2</td><td>1</td><td>3</td><td>3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one height computation per node. Space: O(h) — recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The diameter almost never passes through the root — resist the urge to just compute leftHeight(root)+rightHeight(root); track the max at every node instead.</div>`});

/* Problem 064 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q064 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 064 · EASY</span>Balanced Binary Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Tree</span><span class="pill">DFS</span></div>
<p class="dropcap">Given the root of a binary tree, determine if it is height-balanced — for every node, the depths of its left and right subtrees differ by no more than 1.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [3,9,20,null,null,15,7]
Output: true
Explanation: every node's two subtree heights differ by at most 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 5000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A naive solution recomputes height at every node → O(n²). Instead compute height bottom-up and bail out early with a -1 sentinel the moment imbalance is found.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Post-order height computation that doubles as a balance check: return -1 the instant any subtree is unbalanced, and propagate that -1 straight up without doing further work.</p>
<pre class="code" data-lang="java"><code>public boolean isBalanced(TreeNode root) {
    return height(root) != -1;
}
private int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left);
    if (left == -1) return -1;
    int right = height(node.right);
    if (right == -1) return -1;
    if (Math.abs(left - right) &gt; 1) return -1;
    return 1 + Math.max(left, right);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [3,9,20,null,null,15,7]</code></p>
<table class="tbl">
<tr><th>node</th><th>left h</th><th>right h</th><th>|diff|</th><th>returns</th></tr>
<tr><td>9</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>15</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>7</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>20</td><td>1</td><td>1</td><td>0</td><td>2</td></tr>
<tr><td>3</td><td>1</td><td>2</td><td>1</td><td>3 → balanced</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) with the -1 short-circuit (vs O(n²) recomputing height per node naively). Space: O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Overloading the return value (real height, or -1 as a "failed" signal) is a recurring trick to fuse a check into a single bottom-up pass.</div>`});

/* Problem 065 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q065 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 065 · EASY</span>Same Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Tree</span><span class="pill">DFS</span></div>
<p class="dropcap">Given the roots of two binary trees p and q, return true if they are structurally identical and every corresponding pair of nodes has the same value.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: p = [1,2,3,4,5], q = [1,2,3,4,6]
Output: false
Explanation: leaf 5 in p vs leaf 6 in q — values differ at that position</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes in each tree &lt;= 100</li><li>-10⁴ &lt;= Node.val &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Two trees match iff both roots are null, or both are non-null with equal values AND matching left subtrees AND matching right subtrees.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Mirror the shape of both trees with simultaneous recursion. Java's <code>&amp;&amp;</code> short-circuits — the moment the left subtree comparison returns false, the right subtree call is never made.</p>
<pre class="code" data-lang="java"><code>public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null &amp;&amp; q == null) return true;
    if (p == null || q == null) return false;
    if (p.val != q.val) return false;
    return isSameTree(p.left, q.left) &amp;&amp; isSameTree(p.right, q.right);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>p = [1,2,3,4,5]</code>, <code>q = [1,2,3,4,6]</code> — trees match everywhere except the rightmost leaf (5 vs 6)</p>
<table class="tbl">
<tr><th>call</th><th>check</th><th>returns</th></tr>
<tr><td>isSameTree(4,4)</td><td>4==4, both leaves</td><td>true</td></tr>
<tr><td>isSameTree(5,6)</td><td>5≠6</td><td>false</td></tr>
<tr><td>isSameTree(2,2)</td><td>2==2; left=true, right=false</td><td>false</td></tr>
<tr><td>isSameTree(3,3)</td><td>never called</td><td>short-circuited by <code>&amp;&amp;</code></td></tr>
<tr><td>isSameTree(1,1)</td><td>1==1; left=false → right skipped</td><td>false</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(min(m,n)) — stops early on mismatch. Space: O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Watch for the <code>&amp;&amp;</code> short-circuit in dry runs — interviewers love asking "does isSameTree(3,3) get called?" to check you actually understand Java evaluation order, not just the algorithm.</div>`});

/* Problem 066 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q066 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 066 · EASY</span>Subtree of Another Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Tree</span><span class="pill">DFS</span></div>
<p class="dropcap">Given the roots of two binary trees root and subRoot, return true if there exists a subtree of root (a node and all of its descendants) that is structurally identical to subRoot, value for value.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true
Explanation: the subtree rooted at node 4 matches subRoot exactly</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nodes in root &lt;= 2000</li><li>1 &lt;= nodes in subRoot &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Reuse "Same Tree" as a helper: walk every node of root, and at each one ask "does the tree rooted here equal subRoot?"</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>At each node of root, run the isSameTree check against subRoot; if it fails, recurse into root's left and right children (via <code>||</code>, so the search stops at the first match).</p>
<pre class="code" data-lang="java"><code>public boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (root == null) return false;
    if (isSameTree(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
private boolean isSameTree(TreeNode a, TreeNode b) {
    if (a == null &amp;&amp; b == null) return true;
    if (a == null || b == null) return false;
    return a.val == b.val &amp;&amp; isSameTree(a.left, b.left) &amp;&amp; isSameTree(a.right, b.right);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [3,4,5,1,2]</code> (4 has children 1,2), <code>subRoot = [4,1,2]</code></p>
<table class="tbl">
<tr><th>call</th><th>check</th><th>result</th></tr>
<tr><td>isSameTree(3,4)</td><td>3≠4</td><td>false</td></tr>
<tr><td>isSameTree(4,4)</td><td>4==4; isSameTree(1,1)=true, isSameTree(2,2)=true</td><td>true</td></tr>
<tr><td>isSubtree(4,subRoot)</td><td>isSameTree found a match</td><td>true (found!)</td></tr>
<tr><td>isSubtree(5,subRoot)</td><td>never called</td><td>short-circuited by <code>||</code></td></tr>
<tr><td>isSubtree(3,subRoot)</td><td>isSameTree false, then left branch true</td><td>true (final)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) worst case (m,n = node counts) — an isSameTree check at every node. Space: O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Is X a subtree of Y" almost always decomposes into "does isSameTree(node, X) hold for some node in Y" — string-serializing both trees (KMP substring match) is the O(m+n) upgrade if asked.</div>`});

/* Problem 067 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q067 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 067 · MEDIUM</span>Binary Tree Level Order Traversal</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Tree</span><span class="pill">BFS</span></div>
<p class="dropcap">Given the root of a binary tree, return the level order traversal of its node values — grouped level by level, left to right within each level.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Explanation: level 0 is just the root; level 1 is 9,20; level 2 is 15,7</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 2000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>BFS with a queue naturally processes one level at a time — snapshot the queue's size before draining it, and everything you poll in that batch belongs to the same level.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Standard queue-based BFS. At the top of each while-loop iteration, capture <code>queue.size()</code> — that's exactly how many nodes belong to the current level, before any of their children get enqueued and blur the boundary.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; levelOrder(TreeNode root) {
    List&lt;List&lt;Integer&gt;&gt; result = new ArrayList&lt;&gt;();
    if (root == null) return result;
    Queue&lt;TreeNode&gt; queue = new LinkedList&lt;&gt;();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List&lt;Integer&gt; level = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [3,9,20,null,null,15,7]</code></p>
<table class="tbl">
<tr><th>level</th><th>queue at start</th><th>processed</th><th>queue at end</th></tr>
<tr><td>0</td><td>[3]</td><td>3 → level=[3], enqueue 9,20</td><td>[9,20]</td></tr>
<tr><td>1</td><td>[9,20]</td><td>9,20 → level=[9,20], enqueue 15,7</td><td>[15,7]</td></tr>
<tr><td>2</td><td>[15,7]</td><td>15,7 → level=[15,7], no children</td><td>[]</td></tr>
</table>
<p class="fs13">Queue empties → loop ends. <code>result = [[3],[9,20],[15,7]]</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — every node enqueued and dequeued once. Space: O(n) — worst case the last level holds ~n/2 nodes.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The "snapshot size before the loop" trick is the difference between plain BFS and level-aware BFS — reuse it for zigzag traversal, right-side view, and min-depth.</div>`});

/* Problem 068 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q068 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 068 · MEDIUM</span>Validate Binary Search Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Tree</span><span class="pill">BST</span></div>
<p class="dropcap">Given the root of a binary tree, determine if it is a valid binary search tree — every node's left subtree contains only values strictly less than the node, its right subtree only values strictly greater, and both subtrees are themselves valid BSTs.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: node 4 is the right child of 5, but 4 &lt; 5 — violates the BST property</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Checking only immediate children isn't enough — a node deep in a left subtree can still violate a bound set way up near the root. Carry a (lower, upper) range down through the recursion.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Recurse with an open range (lower, upper) that narrows on the way down: going left tightens the upper bound to the parent's value; going right tightens the lower bound. Use <code>long</code> bounds to dodge overflow at <code>Integer.MIN/MAX_VALUE</code>.</p>
<pre class="code" data-lang="java"><code>public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
private boolean validate(TreeNode node, long lower, long upper) {
    if (node == null) return true;
    if (node.val &lt;= lower || node.val &gt;= upper) return false;
    return validate(node.left, lower, node.val) &amp;&amp; validate(node.right, node.val, upper);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [5,1,4,null,null,3,6]</code> — 5 has children 1(leaf) and 4; 4 has children 3,6</p>
<table class="tbl">
<tr><th>call</th><th>range</th><th>check</th><th>returns</th></tr>
<tr><td>validate(1, ...)</td><td>(-∞, 5)</td><td>1 in range; leaf</td><td>true</td></tr>
<tr><td>validate(4, ...)</td><td>(5, +∞)</td><td>4 &lt;= 5 → violates lower bound</td><td>false</td></tr>
<tr><td>validate(3,·) / validate(6,·)</td><td>—</td><td>never invoked</td><td>short-circuited by node 4's failure</td></tr>
<tr><td>validate(5, ...)</td><td>(-∞, +∞)</td><td>left=true, right=false</td><td>false</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one visit per node. Space: O(h) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The classic bug is comparing only parent vs child. The fix that always works: an in-order traversal of a valid BST is strictly increasing — track the previous value and compare, if recursion-with-bounds feels shaky.</div>`});

/* Problem 069 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q069 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 069 · MEDIUM</span>Kth Smallest Element in a BST</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Tree</span><span class="pill">BST</span></div>
<p class="dropcap">Given the root of a binary search tree and an integer k, return the k-th smallest value among all node values in the tree (1-indexed).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
Explanation: in-order traversal gives 1,2,3,4,5,6 — the 3rd value is 3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 10⁴</li><li>1 &lt;= k &lt;= number of nodes</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>In-order traversal of a BST visits values in sorted order — you just need the k-th value it emits, so stop as soon as you hit it instead of collecting everything.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Iterative in-order traversal with an explicit stack: push all left descendants first, then pop-count-check-go right. This lets you return the instant the k-th node is popped, without visiting the rest of the tree.</p>
<pre class="code" data-lang="java"><code>public int kthSmallest(TreeNode root, int k) {
    Deque&lt;TreeNode&gt; stack = new ArrayDeque&lt;&gt;();
    TreeNode cur = root;
    int count = 0;
    while (cur != null || !stack.isEmpty()) {
        while (cur != null) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        count++;
        if (count == k) return cur.val;
        cur = cur.right;
    }
    return -1; // unreachable for valid k
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [5,3,6,2,4,null,null,1]</code>, k = 3 — 3 has children 2,4; 2 has left child 1</p>
<table class="tbl">
<tr><th>step</th><th>stack (top first)</th><th>popped</th><th>count</th><th>action</th></tr>
<tr><td>1</td><td>push 5,3,2,1</td><td>—</td><td>0</td><td>descend left from 5 down to 1</td></tr>
<tr><td>2</td><td>[5,3,2]</td><td>1</td><td>1</td><td>1≠k; 1 has no right child</td></tr>
<tr><td>3</td><td>[5,3]</td><td>2</td><td>2</td><td>2≠k; 2 has no right child</td></tr>
<tr><td>4</td><td>[5]</td><td>3</td><td>3</td><td>count==k → return 3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(h+k) — descend once (O(h)), then k pops. Space: O(h) for the stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"In-order = sorted order" is THE BST fact — recognize it and half the BST problem catalog (kth smallest, validate, closest value, range sum) collapses to "do an in-order traversal, then a trivial check."</div>`});

/* Problem 070 */
B.spread(
{ kicker: 'DSA · TREES', head: 'Q070 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 070 · MEDIUM</span>Lowest Common Ancestor of a Binary Search Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Tree</span><span class="pill">BST</span></div>
<p class="dropcap">Given the root of a BST and two nodes p and q that both exist in the tree, return their lowest common ancestor (LCA) — the deepest node that has both p and q as descendants (a node can be a descendant of itself).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: 2 and 8 are p's and q's own values — they diverge right at the root</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 &lt;= number of nodes &lt;= 10⁵</li><li>all Node.val are unique; p and q both exist in the BST</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Don't do a generic tree LCA search — use the BST ordering. If both p and q are smaller than the current node, the LCA must be in the left subtree; if both are larger, it's in the right subtree; otherwise the paths just split, so the current node IS the LCA.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Iterative walk from the root, no recursion needed: at each node, compare p.val and q.val against cur.val to decide whether to step left, step right, or stop — the BST property means the path never has to backtrack.</p>
<pre class="code" data-lang="java"><code>public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    TreeNode cur = root;
    while (cur != null) {
        if (p.val &lt; cur.val &amp;&amp; q.val &lt; cur.val) cur = cur.left;
        else if (p.val &gt; cur.val &amp;&amp; q.val &gt; cur.val) cur = cur.right;
        else return cur;
    }
    return null; // unreachable given valid p, q
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>root = [6,2,8,0,4,7,9,null,null,3,5]</code> (2 has children 0,4; 4 has children 3,5), p = 3, q = 5</p>
<table class="tbl">
<tr><th>step</th><th>cur</th><th>both &lt; cur?</th><th>both &gt; cur?</th><th>action</th></tr>
<tr><td>1</td><td>6</td><td>3&lt;6 and 5&lt;6 → true</td><td>—</td><td>both less → go left to 2</td></tr>
<tr><td>2</td><td>2</td><td>3&lt;2 → false</td><td>3&gt;2 and 5&gt;2 → true</td><td>both greater → go right to 4</td></tr>
<tr><td>3</td><td>4</td><td>3&lt;4 true, 5&lt;4 false → not both</td><td>3&gt;4 → false → not both</td><td>else → return 4 (LCA)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(h) — one path from root to the split point. Space: O(1) iterative (O(h) if written recursively).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The generic binary tree LCA (LeetCode 236) needs full DFS on both sides — O(n). The BST version needs only ordering comparisons — O(h). Always ask "is this a BST?" before reaching for the harder algorithm.</div>`});

})();
