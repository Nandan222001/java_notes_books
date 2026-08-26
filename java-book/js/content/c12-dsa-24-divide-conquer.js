/* ===== CHAPTER 55 · DSA: Divide & Conquer ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 55, 'DSA: Divide & Conquer');

/* Problem 231 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q231 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 231 · MEDIUM</span>Different Ways to Add Parentheses</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Divide &amp; Conquer</span><span class="pill">Recursion</span></div>
<p class="dropcap">Given a string <code>expression</code> of numbers and operators <code>+ - *</code>, return all possible results from computing every way to group numbers via parentheses.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: expression = "2-1-1"
Output: [0,2]
Explanation: ((2-1)-1)=0, (2-(1-1))=2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= expression.length &lt;= 20</li><li>expression contains digits and the operators + - *</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every operator you find is a potential "split point": recursively compute all results of the left part and right part, then combine them with that operator.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Scan the string; every time an operator is seen, recursively solve the left substring and right substring independently (each returns a list of possible values), then combine every left result with every right result using that operator. A substring with no operators is a base case: just the number itself.</p>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; diffWaysToCompute(String expression) {
    List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; expression.length(); i++) {
        char c = expression.charAt(i);
        if (c == '+' || c == '-' || c == '*') {
            List&lt;Integer&gt; left = diffWaysToCompute(expression.substring(0, i));
            List&lt;Integer&gt; right = diffWaysToCompute(expression.substring(i + 1));
            for (int l : left) for (int r : right) {
                if (c == '+') res.add(l + r);
                else if (c == '-') res.add(l - r);
                else res.add(l * r);
            }
        }
    }
    if (res.isEmpty()) res.add(Integer.parseInt(expression));
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>expression = "2-1-1"</code></p>
<table class="tbl">
<tr><th>split at</th><th>left results</th><th>right results</th><th>combined</th></tr>
<tr><td>i=1 ('-')</td><td>diffWays("2")=[2]</td><td>diffWays("1-1")=[0]</td><td>2-0=2</td></tr>
<tr><td>i=3 ('-')</td><td>diffWays("2-1")=[1]</td><td>diffWays("1")=[1]</td><td>1-1=0</td></tr>
</table>
<p class="fs13">Combined results: <code>[2, 0]</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: exponential (Catalan-number growth), fine for small expressions. Space: proportional to result count.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"All ways to parenthesize" is always solved by treating every operator as a candidate root of an expression tree and recursing on both sides.</div>`});

/* Problem 232 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q232 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 232 · HARD</span>The Skyline Problem</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Divide &amp; Conquer</span><span class="pill">Merge</span></div>
<p class="dropcap">Given <code>buildings</code> as triples <code>[left, right, height]</code>, return the <b>skyline</b> — the outline formed by all buildings together — as a list of <code>[x, height]</code> "key points" where the height changes, in left-to-right order, ending with height 0.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: buildings = [[2,9,10],[3,7,15],[5,12,12]]
Output: [[2,10],[3,15],[7,12],[12,0]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= buildings.length &lt;= 10⁴</li><li>0 &lt;= left &lt; right &lt;= 2³¹-1</li><li>1 &lt;= height &lt;= 2³¹-1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Split the buildings into two halves, recursively compute each half's skyline, then merge the two skylines like a merge-sort merge step — at every x where either skyline changes, the merged height is the max of the two current heights.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Base case: one building <code>[l,r,h]</code> becomes the two-point skyline <code>[[l,h],[r,0]]</code>. Otherwise split the buildings array in half by index, recursively get each half's skyline, and merge: walk both key-point lists with two pointers, tracking the "current height contributed by each side" (h1, h2); at every x-coordinate encountered, emit a point only if <code>max(h1,h2)</code> differs from the last emitted height.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; getSkyline(int[][] buildings) {
    return divide(buildings, 0, buildings.length - 1);
}
private List&lt;List&lt;Integer&gt;&gt; divide(int[][] b, int lo, int hi) {
    if (lo &gt; hi) return new ArrayList&lt;&gt;();
    if (lo == hi) {
        List&lt;List&lt;Integer&gt;&gt; r = new ArrayList&lt;&gt;();
        r.add(Arrays.asList(b[lo][0], b[lo][2]));
        r.add(Arrays.asList(b[lo][1], 0));
        return r;
    }
    int mid = (lo + hi) / 2;
    return merge(divide(b, lo, mid), divide(b, mid + 1, hi));
}
private List&lt;List&lt;Integer&gt;&gt; merge(List&lt;List&lt;Integer&gt;&gt; left, List&lt;List&lt;Integer&gt;&gt; right) {
    List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();
    int i = 0, j = 0, h1 = 0, h2 = 0;
    while (i &lt; left.size() &amp;&amp; j &lt; right.size()) {
        int x1 = left.get(i).get(0), x2 = right.get(j).get(0), x;
        if (x1 &lt; x2) { x = x1; h1 = left.get(i).get(1); i++; }
        else if (x2 &lt; x1) { x = x2; h2 = right.get(j).get(1); j++; }
        else { x = x1; h1 = left.get(i).get(1); h2 = right.get(j).get(1); i++; j++; }
        int h = Math.max(h1, h2);
        if (res.isEmpty() || !res.get(res.size() - 1).get(1).equals(h)) res.add(Arrays.asList(x, h));
    }
    while (i &lt; left.size()) res.add(left.get(i++));
    while (j &lt; right.size()) res.add(right.get(j++));
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[2,9,10],[3,7,15],[5,12,12]]</code>. Left half skyline = <code>[[2,10],[3,15],[7,10],[9,0]]</code>, right half skyline = <code>[[5,12],[12,0]]</code>. Final merge:</p>
<table class="tbl">
<tr><th>x</th><th>h1 (left side)</th><th>h2 (right side)</th><th>h=max</th><th>emitted?</th></tr>
<tr><td>2</td><td>10</td><td>0</td><td>10</td><td>yes &rarr; [2,10]</td></tr>
<tr><td>3</td><td>15</td><td>0</td><td>15</td><td>yes &rarr; [3,15]</td></tr>
<tr><td>5</td><td>15</td><td>12</td><td>15</td><td>no (same as last)</td></tr>
<tr><td>7</td><td>10</td><td>12</td><td>12</td><td>yes &rarr; [7,12]</td></tr>
<tr><td>9</td><td>0</td><td>12</td><td>12</td><td>no (same as last)</td></tr>
<tr><td>12</td><td>-</td><td>0</td><td>0</td><td>yes (leftover) &rarr; [12,0]</td></tr>
</table>
<p class="fs13">Result: <code>[[2,10],[3,15],[7,12],[12,0]]</code> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — merge-sort recurrence with O(n) merges. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Skylines merge exactly like sorted lists merge — the only twist is tracking "current height per side" instead of "current value per side", and de-duping consecutive equal heights.</div>`});

/* Problem 233 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q233 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 233 · HARD</span>Count of Range Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Merge Sort</span><span class="pill">Prefix Sum</span></div>
<p class="dropcap">Given an integer array <code>nums</code> and two integers <code>lower</code> and <code>upper</code>, return the number of range sums that lie in <code>[lower, upper]</code> inclusive. A range sum <code>S(i, j)</code> is the sum of <code>nums[i..j]</code> for <code>i &lt;= j</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3
Explanation: the ranges are [0,0]&rarr;-2, [2,2]&rarr;-1, [0,2]&rarr;2 — all in [-2,2]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁵</li><li>-2³¹ &lt;= nums[i] &lt;= 2³¹-1</li><li>-10⁵ &lt;= lower &lt;= upper &lt;= 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every range sum is <code>prefix[j+1] - prefix[i]</code>. So the question becomes "count pairs of prefix sums whose difference falls in [lower, upper]" — a job for merge sort: count cross-pairs while merging, same shape as counting inversions.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build the prefix-sum array (length n+1). Merge-sort it; at each merge step, before actually merging, for every left-half prefix <code>sums[i]</code> use two sliding pointers over the (already-sorted) right half to count how many <code>sums[j]</code> satisfy <code>lower &lt;= sums[j]-sums[i] &lt;= upper</code> — since the right half is sorted, both pointers only move forward, giving O(n) work per merge level.</p>
<pre class="code" data-lang="java"><code>public int countRangeSum(int[] nums, int lower, int upper) {
    long[] sums = new long[nums.length + 1];
    for (int i = 0; i &lt; nums.length; i++) sums[i + 1] = sums[i] + nums[i];
    return mergeCount(sums, 0, sums.length - 1, lower, upper);
}
private int mergeCount(long[] sums, int lo, int hi, int lower, int upper) {
    if (lo &gt;= hi) return 0;
    int mid = (lo + hi) / 2;
    int count = mergeCount(sums, lo, mid, lower, upper) + mergeCount(sums, mid + 1, hi, lower, upper);
    int j = mid + 1, k = mid + 1;
    for (int i = lo; i &lt;= mid; i++) {
        while (j &lt;= hi &amp;&amp; sums[j] - sums[i] &lt; lower) j++;
        while (k &lt;= hi &amp;&amp; sums[k] - sums[i] &lt;= upper) k++;
        count += k - j;
    }
    long[] merged = new long[hi - lo + 1];
    int a = lo, b = mid + 1, idx = 0;
    while (a &lt;= mid &amp;&amp; b &lt;= hi) merged[idx++] = sums[a] &lt;= sums[b] ? sums[a++] : sums[b++];
    while (a &lt;= mid) merged[idx++] = sums[a++];
    while (b &lt;= hi) merged[idx++] = sums[b++];
    System.arraycopy(merged, 0, sums, lo, merged.length);
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums=[-2,5,-1]</code>, lower=-2, upper=2. Prefix sums: <code>[0,-2,3,2]</code>.</p>
<table class="tbl">
<tr><th>step</th><th>segment</th><th>count-phase window</th><th>count added</th></tr>
<tr><td>mergeCount(0,1)</td><td>sums[0..1]=[0,-2]</td><td>i=0(val 0): j,k end at [1,2)</td><td>+1</td></tr>
<tr><td>mergeCount(2,3)</td><td>sums[2..3]=[3,2]</td><td>i=2(val 3): j,k end at [3,4)</td><td>+1</td></tr>
<tr><td>mergeCount(0,3) top</td><td>sorted halves [-2,0] | [2,3]</td><td>i=1(val 0): j,k end at [2,3)</td><td>+1</td></tr>
</table>
<p class="fs13">Total count = 1+1+1 = 3 ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Any "count pairs satisfying a monotone condition on a difference/sum" problem — this, Count of Smaller Numbers After Self, Reverse Pairs — reduces to the same merge-sort skeleton: count cross-pairs during the merge, before the merge overwrites the order.</div>`});

/* Problem 234 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q234 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 234 · MEDIUM</span>Majority Element II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Divide &amp; Conquer</span><span class="pill">Pigeonhole</span></div>
<p class="dropcap">Given an integer array <code>nums</code> of size n, return all elements that appear <b>more than</b> <code>⌊n/3⌋</code> times. (Unlike the classic Majority Element, which allows only one answer bounded by n/2, here up to two distinct values can qualify.)</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [3,2,3]
Output: [3]
Explanation: n=3, threshold = n/3 = 1; 3 appears 2 times &gt; 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 5×10⁴</li><li>-10⁹ &lt;= nums[i] &lt;= 10⁹</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>By pigeonhole, at most 2 elements can each appear more than n/3 times in any subarray. Split the array in half; any true &gt;n/3 element of the whole must also be a &gt;(half-size)/3 "local majority" of at least one half (weighted-average argument) — so recurse, collect candidates from both halves, then verify each by an actual count over the combined range.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Recursively split <code>[lo,hi]</code> in half. Base case (single element) trivially "locally majority" of itself. Combine: union the (at most 2) candidates from each half, then for each unique candidate, count its true occurrences across the merged <code>[lo,hi]</code> and keep it only if that count exceeds <code>(hi-lo+1)/3</code>. Pigeonhole guarantees at most 2 candidates ever survive a filter step, and at the root the threshold is exactly n/3 — so the root call's output is the final answer directly.</p>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; majorityElement(int[] nums) {
    return divide(nums, 0, nums.length - 1);
}
private List&lt;Integer&gt; divide(int[] nums, int lo, int hi) {
    if (lo == hi) return new ArrayList&lt;&gt;(List.of(nums[lo]));
    int mid = (lo + hi) / 2;
    Set&lt;Integer&gt; merged = new LinkedHashSet&lt;&gt;();
    merged.addAll(divide(nums, lo, mid));
    merged.addAll(divide(nums, mid + 1, hi));
    List&lt;Integer&gt; result = new ArrayList&lt;&gt;();
    int size = hi - lo + 1;
    for (int c : merged) if (countIn(nums, lo, hi, c) &gt; size / 3) result.add(c);
    return result;
}
private int countIn(int[] nums, int lo, int hi, int val) {
    int c = 0;
    for (int i = lo; i &lt;= hi; i++) if (nums[i] == val) c++;
    return c;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [3,2,3]</code> (indices 0,1,2)</p>
<table class="tbl">
<tr><th>call</th><th>left cand.</th><th>right cand.</th><th>merged</th><th>size, threshold</th><th>kept</th></tr>
<tr><td>divide(0,1)</td><td>[3] (base)</td><td>[2] (base)</td><td>{3,2}</td><td>size2, thr=0</td><td>count(3)=1&gt;0, count(2)=1&gt;0 &rarr; [3,2]</td></tr>
<tr><td>divide(0,2) root</td><td>[3,2]</td><td>[3] (base, idx2)</td><td>{3,2}</td><td>size3, thr=1</td><td>count(3)=2&gt;1 kept; count(2)=1&gt;1? no &rarr; [3]</td></tr>
</table>
<p class="fs13">Final answer: <code>[3]</code> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — each of the O(log n) merge levels does O(n) counting work. Space: O(log n) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The "&gt;n/k local-majority survives in a half" weighted-average argument is what lets Boyer-Moore-style voting generalize to divide-and-conquer form for any threshold, not just n/2.</div>`});

/* Problem 235 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q235 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 235 · MEDIUM</span>Construct Quad Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Divide &amp; Conquer</span><span class="pill">Tree</span></div>
<p class="dropcap">Given an <code>n x n</code> binary grid (n a power of 2), build a Quad-Tree: if every cell in a region has the same value, that region is a leaf storing that value; otherwise split it into four equal quadrants (top-left, top-right, bottom-left, bottom-right) and recurse.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: grid = [[0,1],[1,1]]
Output: an internal (non-leaf) root with 4 leaf children:
  topLeft=leaf(0), topRight=leaf(1), bottomLeft=leaf(1), bottomRight=leaf(1)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == grid.length == grid[i].length</li><li>n is a power of 2, 1 &lt;= n &lt;= 64</li><li>grid[i][j] is 0 or 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Recurse on the four quadrants of the current square; if all four returned nodes are leaves with the same value, collapse them into a single leaf instead of keeping the internal node.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Track the current square as <code>(row, col, size)</code>. Base case <code>size==1</code>: a leaf holding <code>grid[row][col]</code>. Otherwise split into four <code>size/2</code> quadrants, recurse on each, then check if all four children are leaves with the same value — if so, collapse to one leaf; otherwise build an internal node with those four children.</p>
<pre class="code" data-lang="java"><code>class Node {
    public boolean val, isLeaf;
    public Node topLeft, topRight, bottomLeft, bottomRight;
    public Node(boolean val, boolean isLeaf) { this.val = val; this.isLeaf = isLeaf; }
    public Node(boolean val, boolean isLeaf, Node tl, Node tr, Node bl, Node br) {
        this.val = val; this.isLeaf = isLeaf;
        topLeft = tl; topRight = tr; bottomLeft = bl; bottomRight = br;
    }
}
public Node construct(int[][] grid) {
    return build(grid, 0, 0, grid.length);
}
private Node build(int[][] grid, int row, int col, int size) {
    if (size == 1) return new Node(grid[row][col] == 1, true);
    int half = size / 2;
    Node tl = build(grid, row, col, half);
    Node tr = build(grid, row, col + half, half);
    Node bl = build(grid, row + half, col, half);
    Node br = build(grid, row + half, col + half, half);
    if (tl.isLeaf &amp;&amp; tr.isLeaf &amp;&amp; bl.isLeaf &amp;&amp; br.isLeaf
        &amp;&amp; tl.val == tr.val &amp;&amp; tr.val == bl.val &amp;&amp; bl.val == br.val) {
        return new Node(tl.val, true);
    }
    return new Node(true, false, tl, tr, bl, br);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>grid = [[0,1],[1,1]]</code>, root call <code>build(grid,0,0,2)</code></p>
<table class="tbl">
<tr><th>call</th><th>region</th><th>grid value</th><th>result</th></tr>
<tr><td>build(0,0,1)</td><td>row0,col0</td><td>grid[0][0]=0</td><td>leaf(val=false)</td></tr>
<tr><td>build(0,1,1)</td><td>row0,col1</td><td>grid[0][1]=1</td><td>leaf(val=true)</td></tr>
<tr><td>build(1,0,1)</td><td>row1,col0</td><td>grid[1][0]=1</td><td>leaf(val=true)</td></tr>
<tr><td>build(1,1,1)</td><td>row1,col1</td><td>grid[1][1]=1</td><td>leaf(val=true)</td></tr>
<tr><td>build(0,0,2) combine</td><td>whole grid</td><td>tl=false, tr=bl=br=true (not all equal)</td><td>internal node, isLeaf=false, 4 leaf children</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n² log n) worst case (each level does O(n²) work checking cells, O(log n) levels). Space: O(n²) for the tree.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Split a grid into quadrants, recurse, and collapse uniform children" is the same shape as merging in the Skyline problem — build first, then decide bottom-up whether the combined result can simplify.</div>`});

/* Problem 236 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q236 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 236 · MEDIUM</span>Convert Sorted List to Binary Search Tree</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Linked List</span><span class="pill">Fast &amp; Slow Pointers</span></div>
<p class="dropcap">Given the head of a singly linked list where elements are sorted in ascending order, convert it to a <b>height-balanced</b> binary search tree. (Unlike converting a sorted <i>array</i>, there's no O(1) random access to the middle — it must be located by traversal.)</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: head = [-10,-3,0,5,9]
Output (one valid answer): root=0, left subtree=(-3 with left -10),
                            right subtree=(9 with left 5)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 2×10⁴</li><li>-10⁵ &lt;= Node.val &lt;= 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Find the middle node with the classic slow/fast pointer trick (fast moves 2 steps for every 1 of slow), make it the root, then recurse: everything before the middle becomes the left subtree, everything after becomes the right subtree.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Use <code>slow</code>/<code>fast</code> pointers, plus <code>prev</code> trailing one behind slow. When fast runs off the end, slow sits on the middle node. Cut the list by setting <code>prev.next = null</code>, so the original list splits cleanly into a left half (before slow) and a right half (<code>slow.next</code> onward). Build the root from slow's value, then recurse on both halves.</p>
<pre class="code" data-lang="java"><code>public TreeNode sortedListToBST(ListNode head) {
    if (head == null) return null;
    if (head.next == null) return new TreeNode(head.val);
    ListNode prev = null, slow = head, fast = head;
    while (fast != null &amp;&amp; fast.next != null) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    prev.next = null; // splits the list: left half ends here
    TreeNode root = new TreeNode(slow.val);
    root.left = sortedListToBST(head);
    root.right = sortedListToBST(slow.next);
    return root;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[-10,-3,0,5,9]</code></p>
<table class="tbl">
<tr><th>call</th><th>list segment</th><th>slow/fast &rarr; mid (prev cuts here)</th><th>root val</th><th>left half</th><th>right half</th></tr>
<tr><td>top</td><td>[-10,-3,0,5,9]</td><td>slow=0, prev=-3</td><td>0</td><td>[-10,-3]</td><td>[5,9]</td></tr>
<tr><td>left</td><td>[-10,-3]</td><td>slow=-3, prev=-10</td><td>-3</td><td>[-10]</td><td>null</td></tr>
<tr><td>right</td><td>[5,9]</td><td>slow=9, prev=5</td><td>9</td><td>[5]</td><td>null</td></tr>
<tr><td>leaf</td><td>[-10]</td><td>single node</td><td>-10</td><td>-</td><td>-</td></tr>
<tr><td>leaf</td><td>[5]</td><td>single node</td><td>5</td><td>-</td><td>-</td></tr>
</table>
<p class="fs13">Resulting tree: <code>0</code> with left <code>-3(-10, &middot;)</code> and right <code>9(5, &middot;)</code> — height-balanced ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — finding the middle costs O(k) at a level with k nodes, summed over O(log n) levels. Space: O(log n) recursion stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Slow/fast pointers are the linked-list substitute for array midpoint indexing — whenever a D&amp;C problem needs "the middle" of a structure without random access, reach for this pattern first.</div>`});

/* Problem 237 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q237 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 237 · MEDIUM</span>Beautiful Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Divide &amp; Conquer</span><span class="pill">Construction</span></div>
<p class="dropcap">An array <code>nums</code> of distinct positive integers is <b>beautiful</b> if for every pair of indices <code>i &lt; k &lt; j</code>, it's never true that <code>nums[k] * 2 == nums[i] + nums[j]</code> (no index is the exact arithmetic mean of two others around it). Given <code>n</code>, return any beautiful array containing exactly the numbers <code>1..n</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 4
Output: [2,1,4,3]  (one valid beautiful array)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>If odd numbers occupy the left part and even numbers occupy the right part, odd+even can never be even, so no cross pair can average to a value in between — meaning you only need each half to independently be beautiful, recursively.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build a beautiful array for size n by taking a beautiful array of size <code>ceil(n/2)</code> and mapping each value <code>x &rarr; 2x-1</code> (all odd), followed by a beautiful array of size <code>floor(n/2)</code> mapped <code>x &rarr; 2x</code> (all even). Since odd+odd and even+even preserve the beautiful property under this affine map, and odd never averages with even to land in between (parity mismatch), the concatenation stays beautiful.</p>
<pre class="code" data-lang="java"><code>public int[] beautifulArray(int n) {
    return helper(n);
}
private int[] helper(int n) {
    if (n == 1) return new int[]{1};
    int[] result = new int[n];
    int idx = 0;
    for (int x : helper((n + 1) / 2)) result[idx++] = 2 * x - 1; // odds
    for (int x : helper(n / 2)) result[idx++] = 2 * x;           // evens
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Building up to <code>n=5</code></p>
<table class="tbl">
<tr><th>call</th><th>splits into</th><th>odd part (2x-1)</th><th>even part (2x)</th><th>result</th></tr>
<tr><td>helper(1)</td><td>base case</td><td>-</td><td>-</td><td>[1]</td></tr>
<tr><td>helper(2)</td><td>helper(1), helper(1)</td><td>[1]&rarr;[1]</td><td>[1]&rarr;[2]</td><td>[1,2]</td></tr>
<tr><td>helper(3)</td><td>helper(2), helper(1)</td><td>[1,2]&rarr;[1,3]</td><td>[1]&rarr;[2]</td><td>[1,3,2]</td></tr>
<tr><td>helper(5)</td><td>helper(3), helper(2)</td><td>[1,3,2]&rarr;[1,5,3]</td><td>[1,2]&rarr;[2,4]</td><td>[1,5,3,2,4]</td></tr>
</table>
<p class="fs13">Spot-checking <code>[1,5,3,2,4]</code>: every triple i&lt;k&lt;j has <code>2*nums[k] &ne; nums[i]+nums[j]</code> — e.g. i=0,k=1,j=2: 2*5=10 vs 1+3=4 ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) without memoization, O(n) with memoized subresults. Space: O(n log n) recursion (or O(n) memoized).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Splitting by parity instead of by position is the trick — it turns "avoid arithmetic-mean triples" into a property that's automatically preserved by affine transforms, so a tiny base case bootstraps arbitrarily large beautiful arrays.</div>`});

/* Problem 238 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q238 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 238 · HARD</span>Super Egg Drop</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Divide &amp; Conquer</span><span class="pill">Binary Search</span><span class="pill">DP</span></div>
<p class="dropcap">You're given <code>k</code> identical eggs and a building with <code>n</code> floors. There's a critical floor <code>f</code> (0 &lt;= f &lt;= n) such that an egg breaks if dropped from above f and survives if dropped from f or below. Find the minimum number of moves needed, in the worst case, to determine <code>f</code> exactly.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: k = 2, n = 6
Output: 3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= k &lt;= 100</li><li>1 &lt;= n &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Let dp(k,n) = min worst-case moves. Dropping from floor x splits into "breaks" (dp(k-1,x-1)) and "survives" (dp(k,n-x)); dp(k,n) = 1 + min over x of max of those two. Since one branch grows with x and the other shrinks, binary-search for the crossover x instead of trying every floor.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>dp(k-1, x-1)</code> (egg breaks, search below x) increases as x grows; <code>dp(k, n-x)</code> (egg survives, search above x) decreases as x grows. Their max is minimized near where the two curves cross, so binary-search x instead of a linear scan — turning the O(k·n²) DP into O(k·n log n). Memoize on (k, n) since subproblems repeat.</p>
<pre class="code" data-lang="java"><code>Map&lt;Integer, Integer&gt; memo = new HashMap&lt;&gt;();
public int superEggDrop(int k, int n) { return dp(k, n); }
private int dp(int k, int n) {
    if (n == 0) return 0;
    if (k == 1) return n;
    int key = k * 10000 + n;
    if (memo.containsKey(key)) return memo.get(key);
    int lo = 1, hi = n, res = Integer.MAX_VALUE;
    while (lo &lt;= hi) {
        int mid = (lo + hi) / 2;
        int broken = dp(k - 1, mid - 1);
        int notBroken = dp(k, n - mid);
        res = Math.min(res, Math.max(broken, notBroken) + 1);
        if (broken &gt; notBroken) hi = mid - 1; else lo = mid + 1;
    }
    memo.put(key, res);
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>k=2, n=6</code> — binary search inside <code>dp(2,6)</code> (using memoized dp(1,x)=x and dp(2,y) computed the same way)</p>
<table class="tbl">
<tr><th>mid tried</th><th>broken=dp(1,mid-1)</th><th>notBroken=dp(2,6-mid)</th><th>worst=max+1</th><th>next range</th></tr>
<tr><td>3</td><td>dp(1,2)=2</td><td>dp(2,3)=2</td><td>3</td><td>equal &rarr; lo=4</td></tr>
<tr><td>5</td><td>dp(1,4)=4</td><td>dp(2,1)=1</td><td>5</td><td>broken&gt;notBroken &rarr; hi=4</td></tr>
<tr><td>4</td><td>dp(1,3)=3</td><td>dp(2,2)=2</td><td>4</td><td>broken&gt;notBroken &rarr; hi=3, loop ends</td></tr>
</table>
<p class="fs13">Best worst-case seen = 3 &rarr; <code>dp(2,6) = 3</code> ✓ (matches the known closed form: smallest m with m(m+1)/2 &gt;= n)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(k·n log n). Space: O(k·n) memo table.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever a DP's transition minimizes the max of one increasing and one decreasing function of the split point, binary search on the split point turns a quadratic scan into a logarithmic one — this pattern reappears anywhere you'd otherwise loop over "every possible split."</div>`});

/* Problem 239 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q239 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 239 · HARD</span>Reverse Pairs</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Merge Sort</span><span class="pill">Divide &amp; Conquer</span></div>
<p class="dropcap">Given an integer array <code>nums</code>, return the number of <b>reverse pairs</b> — pairs <code>(i, j)</code> with <code>i &lt; j</code> and <code>nums[i] &gt; 2 * nums[j]</code>. (Distinct from Count of Smaller Numbers After Self, which compares values directly rather than doubled.)</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,3,2,3,1]
Output: 2
Explanation: (i=1,j=4): 3 &gt; 2*1=2 ; (i=3,j=4): 3 &gt; 2*1=2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 5×10⁴</li><li>-2³¹ &lt;= nums[i] &lt;= 2³¹-1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Merge-sort the array. Every reverse pair either sits entirely within the left half, entirely within the right half, or has i in the left half and j in the right half — count that last "cross" case, using a sliding pointer over the already-sorted right half, right before the merge step overwrites the order.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Recursively sort-and-count both halves. Before merging <code>[lo,mid]</code> with <code>[mid+1,hi]</code> (both now internally sorted), for each <code>i</code> in the left half advance a pointer <code>j</code> over the right half while <code>nums[i] &gt; 2*nums[j]</code> holds — since the right half is sorted ascending, j only moves forward across all i, giving O(n) counting per level. Then perform the normal merge to keep the range sorted for the parent call.</p>
<pre class="code" data-lang="java"><code>public int reversePairs(int[] nums) {
    return mergeSort(nums, 0, nums.length - 1);
}
private int mergeSort(int[] nums, int lo, int hi) {
    if (lo &gt;= hi) return 0;
    int mid = (lo + hi) / 2;
    int count = mergeSort(nums, lo, mid) + mergeSort(nums, mid + 1, hi);
    int j = mid + 1;
    for (int i = lo; i &lt;= mid; i++) {
        while (j &lt;= hi &amp;&amp; (long) nums[i] &gt; 2L * nums[j]) j++;
        count += j - (mid + 1);
    }
    int[] merged = new int[hi - lo + 1];
    int a = lo, b = mid + 1, idx = 0;
    while (a &lt;= mid &amp;&amp; b &lt;= hi) merged[idx++] = nums[a] &lt;= nums[b] ? nums[a++] : nums[b++];
    while (a &lt;= mid) merged[idx++] = nums[a++];
    while (b &lt;= hi) merged[idx++] = nums[b++];
    System.arraycopy(merged, 0, nums, lo, merged.length);
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,3,2,3,1]</code></p>
<table class="tbl">
<tr><th>step</th><th>detail</th><th>count added</th></tr>
<tr><td>mergeSort(0,1) on [1,3]</td><td>i=0(val1): 1&gt;6? no &rarr; j stays</td><td>+0</td></tr>
<tr><td>mergeSort(0,2) on [1,3]|[2]</td><td>i=0(1),i=1(3): both fail the &gt; test vs 2</td><td>+0</td></tr>
<tr><td>mergeSort(3,4) on [3]|[1]</td><td>i=3(val3): 3&gt;2*1=2 yes &rarr; j advances past</td><td>+1</td></tr>
<tr><td>top i=0 (val1) vs right[1,3]</td><td>1&gt;2*1=2? no</td><td>+0</td></tr>
<tr><td>top i=1 (val2) vs right[1,3]</td><td>2&gt;2*1=2? no (not strict)</td><td>+0</td></tr>
<tr><td>top i=2 (val3) vs right[1,3]</td><td>3&gt;2*1=2 yes (j&rarr;past 1); 3&gt;2*3=6? no &rarr; stop</td><td>+1</td></tr>
</table>
<p class="fs13">Total = 0+0+1+0+0+1 = 2 ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Count-during-merge only works because the sub-halves are already sorted before the cross-count step — sort first (implicitly, via recursion), count second, merge third; getting that order wrong breaks the two-pointer monotonicity.</div>`});

/* Problem 240 */
B.spread(
{ kicker: 'DSA · DIVIDE & CONQUER', head: 'Q240 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 240 · HARD</span>Closest Pair of Points</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Divide &amp; Conquer</span><span class="pill">Geometry</span></div>
<p class="dropcap">Given <code>n</code> points on a 2D plane, find the smallest Euclidean distance between any two distinct points. The classic computational-geometry divide-and-conquer algorithm solves this in O(n log n), versus O(n&sup2;) for the brute-force check of every pair.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: points = [[2,3],[12,30],[40,50],[5,1],[12,10],[3,4]]
Output: &radic;2 &asymp; 1.41421356
Explanation: closest pair is (2,3) and (3,4)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 &lt;= n &lt;= 10⁵</li><li>-10⁹ &lt;= x, y &lt;= 10⁹</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort points by x, split into left and right halves, recursively find each half's closest distance d. The true minimum could still be a cross-boundary pair, but only within a vertical "strip" of width 2d around the midline — sort just that strip by y and check a small bounded number of neighbors per point.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort all points by x once upfront. Base case (&le;3 points): brute force. Otherwise split at the median x, recurse on both halves to get <code>d = min(dLeft, dRight)</code>. Build a "strip" of points within <code>d</code> horizontally of the midline, sort it by y, and for each point check only the next few points in y-order (geometry guarantees at most a handful can be within d) — any closer cross-pair must live entirely inside this strip.</p>
<pre class="code" data-lang="java"><code>public double closestPair(int[][] points) {
    int[][] byX = points.clone();
    Arrays.sort(byX, (a, b) -&gt; a[0] - b[0]);
    return solve(byX, 0, byX.length - 1);
}
private double solve(int[][] pts, int lo, int hi) {
    if (hi - lo &lt;= 2) return bruteForce(pts, lo, hi);
    int mid = (lo + hi) / 2;
    int midX = pts[mid][0];
    double d = Math.min(solve(pts, lo, mid), solve(pts, mid + 1, hi));
    List&lt;int[]&gt; strip = new ArrayList&lt;&gt;();
    for (int i = lo; i &lt;= hi; i++)
        if (Math.abs(pts[i][0] - midX) &lt; d) strip.add(pts[i]);
    strip.sort((a, b) -&gt; a[1] - b[1]);
    for (int i = 0; i &lt; strip.size(); i++)
        for (int j = i + 1; j &lt; strip.size() &amp;&amp; (strip.get(j)[1] - strip.get(i)[1]) &lt; d; j++)
            d = Math.min(d, dist(strip.get(i), strip.get(j)));
    return d;
}
private double bruteForce(int[][] pts, int lo, int hi) {
    double min = Double.MAX_VALUE;
    for (int i = lo; i &lt;= hi; i++)
        for (int j = i + 1; j &lt;= hi; j++) min = Math.min(min, dist(pts[i], pts[j]));
    return min;
}
private double dist(int[] a, int[] b) {
    double dx = a[0] - b[0], dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input sorted by x: <code>[(2,3),(3,4),(5,1),(12,10),(12,30),(40,50)]</code></p>
<table class="tbl">
<tr><th>step</th><th>segment</th><th>result</th></tr>
<tr><td>solve(0,2) brute</td><td>(2,3),(3,4),(5,1)</td><td>min = dist((2,3),(3,4)) = &radic;2 &asymp; 1.414</td></tr>
<tr><td>solve(3,5) brute</td><td>(12,10),(12,30),(40,50)</td><td>min = dist((12,10),(12,30)) = 20</td></tr>
<tr><td>combine</td><td>d = min(1.414, 20), midX = 5</td><td>d = 1.414</td></tr>
<tr><td>strip check</td><td>points with |x-5| &lt; 1.414</td><td>only (5,1) qualifies &rarr; no pair to test</td></tr>
<tr><td>final</td><td>-</td><td>closest pair = (2,3),(3,4), distance &radic;2 &asymp; 1.4142</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — the strip scan is O(n) per level because each point only ever compares against O(1) neighbors, by a packing argument. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The strip trick is the geometric analog of the merge-sort "cross-pair" count: split the search space, solve each side, then bound the boundary-crossing work with a provable small constant instead of scanning everything.</div>`});

})();
