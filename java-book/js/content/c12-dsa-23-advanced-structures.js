/* ===== CHAPTER 54 · DSA: Advanced Data Structures ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 54, 'DSA: Advanced Data Structures');

/* Problem 221 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q221 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 221 · EASY</span>Range Sum Query - Immutable</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Prefix Sum</span><span class="pill">Design</span></div>
<p class="dropcap">Given an integer array <code>nums</code> that never changes, design a class supporting <code>sumRange(left, right)</code> — the sum of elements between indices left and right, inclusive — with many repeated queries.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>nums = [-2,0,3,-5,2,-1]
sumRange(0,2) &rarr; 1   (-2+0+3)
sumRange(2,5) &rarr; -1  (3-5+2-1)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁴</li><li>-10⁵ &lt;= nums[i] &lt;= 10⁵</li><li>up to 10⁴ calls to sumRange</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Precompute a running prefix-sum array once; then any range sum is just a subtraction of two prefix values, O(1) per query.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build <code>prefix[i] = sum of nums[0..i-1]</code> once in the constructor. Then <code>sumRange(l, r) = prefix[r+1] - prefix[l]</code> — the sum up through r, minus everything before l.</p>
<pre class="code" data-lang="java"><code>class NumArray {
    private int[] prefix;
    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i &lt; nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];
    }
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [-2,0,3,-5,2,-1]</code></p>
<table class="tbl">
<tr><th>i</th><th>prefix[i]</th></tr>
<tr><td>0</td><td>0</td></tr>
<tr><td>1</td><td>-2</td></tr>
<tr><td>2</td><td>-2</td></tr>
<tr><td>3</td><td>1</td></tr>
<tr><td>4</td><td>-4</td></tr>
<tr><td>5</td><td>-2</td></tr>
<tr><td>6</td><td>-3</td></tr>
</table>
<p class="fs13"><code>sumRange(0,2) = prefix[3]-prefix[0] = 1-0 = 1</code> ✓ &nbsp; <code>sumRange(2,5) = prefix[6]-prefix[2] = -3-(-2) = -1</code> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) build, O(1) per query. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Immutable + many range queries" is always a prefix-sum signal — the moment updates enter the picture, you need a Fenwick Tree instead (next problem).</div>`});

/* Problem 222 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q222 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 222 · MEDIUM</span>Range Sum Query - Mutable</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Fenwick Tree</span><span class="pill">Design</span></div>
<p class="dropcap">Design a class over an integer array <code>nums</code> supporting two operations, interleaved in any order: <code>update(index, val)</code> sets <code>nums[index] = val</code>, and <code>sumRange(left, right)</code> returns the sum of elements from left to right, inclusive.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>nums = [1,3,5]
sumRange(0,2) &rarr; 9        (1+3+5)
update(1,2)                  // nums = [1,2,5]
sumRange(0,2) &rarr; 8        (1+2+5)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 3×10⁴</li><li>up to 3×10⁴ calls total to update and sumRange</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A plain prefix-sum array makes update O(n) since everything after it must shift. A Binary Indexed Tree (Fenwick Tree) gives both update and prefix-sum query in O(log n) using the low-bit trick <code>i &amp; (-i)</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>A Fenwick Tree stores partial sums in a 1-indexed array <code>tree</code>, where <code>tree[i]</code> covers a range of size <code>i &amp; (-i)</code> (its lowest set bit) ending at <code>i</code>. To <b>update</b> index i, add the delta to <code>tree[i]</code> then hop to <code>i += i &amp; (-i)</code>, repeating until past n — each hop lands on an ancestor range that also contains i. To get a <b>prefix sum</b> up to i, add <code>tree[i]</code> then hop to <code>i -= i &amp; (-i)</code> until i reaches 0. <code>sumRange(l,r) = prefixSum(r+1) - prefixSum(l)</code>.</p>
<pre class="code" data-lang="java"><code>class NumArray {
    int[] nums, tree; int n;
    public NumArray(int[] nums) {
        n = nums.length;
        this.nums = new int[n];
        tree = new int[n + 1];
        for (int i = 0; i &lt; n; i++) update(i, nums[i]);
    }
    public void update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        for (int i = index + 1; i &lt;= n; i += i &amp; (-i)) tree[i] += delta;
    }
    private int prefixSum(int i) {
        int sum = 0;
        for (; i &gt; 0; i -= i &amp; (-i)) sum += tree[i];
        return sum;
    }
    public int sumRange(int left, int right) {
        return prefixSum(right + 1) - prefixSum(left);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,3,5]</code>, n=3. Build calls update(0,1), update(1,3), update(2,5).</p>
<table class="tbl">
<tr><th>op</th><th>index+1, delta</th><th>tree indices touched (i += i&amp;-i)</th><th>tree[1..3] after</th></tr>
<tr><td>update(0,1)</td><td>i=1, delta=1</td><td>1&rarr;2&rarr;(4&gt;3 stop)</td><td>[1,1,0]</td></tr>
<tr><td>update(1,3)</td><td>i=2, delta=3</td><td>2&rarr;(4&gt;3 stop)</td><td>[1,4,0]</td></tr>
<tr><td>update(2,5)</td><td>i=3, delta=5</td><td>3&rarr;(4&gt;3 stop)</td><td>[1,4,5]</td></tr>
</table>
<p class="fs13"><code>sumRange(0,2)</code>: prefixSum(3) = tree[3]+tree[2] (3&rarr;i-=3&amp;-3=1&rarr;wait: 3-(3&amp;-3)=3-1=2, then 2-(2&amp;-2)=2-2=0) = 5+4 = 9 ✓. After <code>update(1,2)</code> (delta = 2-3 = -1, touches i=2 only, tree[2]=4-1=3): <code>sumRange(0,2)</code> = tree[3]+tree[2] = 5+3 = 8 ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n) per update or query, O(n log n) build. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span><code>i &amp; (-i)</code> isolates the lowest set bit, which is exactly the size of the range <code>tree[i]</code> owns — adding it walks up to the next ancestor on update, subtracting it walks down to the next covered chunk on query.</div>`});

/* Problem 223 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q223 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 223 · MEDIUM</span>Range Sum Query 2D - Immutable</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">2D Prefix Sum</span><span class="pill">Design</span></div>
<p class="dropcap">Given a 2D matrix <code>matrix</code> that never changes, design a class supporting <code>sumRegion(row1, col1, row2, col2)</code> — the sum of all elements inside the rectangle defined by upper-left <code>(row1,col1)</code> and lower-right <code>(row2,col2)</code>, inclusive — with many repeated queries.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>matrix = [[3,0,1,4,2],
          [5,6,3,2,1],
          [1,2,0,1,5],
          [4,1,0,1,7],
          [1,0,3,0,5]]
sumRegion(2,1,4,3) &rarr; 8   (rows2-4, cols1-3: 2+0+1+1+0+1+0+3=8)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= rows, cols &lt;= 200</li><li>up to 10⁴ calls to sumRegion</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Extend the 1D prefix-sum trick to two dimensions: precompute <code>prefix[r][c]</code> = sum of everything strictly above-left of (r,c), then any rectangle is four prefix lookups via inclusion-exclusion.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build a <code>(rows+1) x (cols+1)</code> prefix table where <code>prefix[r][c]</code> = sum of the submatrix from (0,0) to (r-1,c-1). Fill it with <code>prefix[r][c] = matrix[r-1][c-1] + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1]</code> (the last term corrects for double-counting the overlap). A query is inclusion-exclusion on four corners of that table.</p>
<pre class="code" data-lang="java"><code>class NumMatrix {
    int[][] prefix;
    public NumMatrix(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        prefix = new int[rows + 1][cols + 1];
        for (int r = 1; r &lt;= rows; r++)
            for (int c = 1; c &lt;= cols; c++)
                prefix[r][c] = matrix[r-1][c-1] + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1];
    }
    public int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2+1][col2+1] - prefix[row1][col2+1] - prefix[row2+1][col1] + prefix[row1][col1];
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix</code> as above. Query <code>sumRegion(2,1,4,3)</code>.</p>
<table class="tbl">
<tr><th>prefix term</th><th>meaning</th><th>value</th></tr>
<tr><td>prefix[5][4]</td><td>sum of rows0-4, cols0-3</td><td>38</td></tr>
<tr><td>prefix[2][4]</td><td>sum of rows0-1, cols0-3</td><td>24</td></tr>
<tr><td>prefix[5][1]</td><td>sum of rows0-4, col0</td><td>14</td></tr>
<tr><td>prefix[2][1]</td><td>sum of rows0-1, col0</td><td>8</td></tr>
</table>
<p class="fs13"><code>sumRegion(2,1,4,3) = prefix[5][4] - prefix[2][4] - prefix[5][1] + prefix[2][1] = 38 - 24 - 14 + 8 = 8</code> — matches the direct sum 2+0+1+1+0+1+0+3=8 ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(rows·cols) build, O(1) per query. Space: O(rows·cols).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>2D range sum is 1D prefix sum applied twice — the <code>-prefix[r1][c2+1]-prefix[r2+1][c1]+prefix[r1][c1]</code> pattern is the standard inclusion-exclusion shape for any 2D rectangle query (also used in 2D difference arrays for range updates).</div>`});

/* Problem 224 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q224 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 224 · HARD</span>Count of Smaller Numbers After Self</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Fenwick Tree</span><span class="pill">Coordinate Compression</span></div>
<p class="dropcap">Given an integer array <code>nums</code>, return an array <code>counts</code> where <code>counts[i]</code> is the number of elements to the right of index i that are strictly smaller than <code>nums[i]</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation: right of 5: {2,6,1}, 2 smaller (2,1)
right of 2: {6,1}, 1 smaller (1)
right of 6: {1}, 1 smaller (1)
right of 1: {}, 0 smaller</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁵</li><li>-10⁴ &lt;= nums[i] &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Process the array right to left, maintaining a frequency Fenwick Tree over compressed (ranked) values. For each element, query how many strictly smaller values have already been inserted, then insert it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Coordinate-compress <code>nums</code> into ranks 1..m (sorted unique values). Walk right to left: before inserting <code>nums[i]</code>, query the Fenwick Tree's prefix sum up to <code>rank(nums[i]) - 1</code> — that count is exactly how many already-inserted (i.e., to-the-right) values are strictly smaller. Then insert <code>nums[i]</code> by adding 1 at its rank.</p>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; countSmaller(int[] nums) {
    int n = nums.length;
    int[] sorted = nums.clone();
    Arrays.sort(sorted);
    // rank(v) = 1 + count of sorted values &lt; v (1-indexed for Fenwick)
    int[] tree = new int[n + 1];
    Integer[] result = new Integer[n];
    for (int i = n - 1; i &gt;= 0; i--) {
        int rank = lowerBound(sorted, nums[i]) + 1;
        result[i] = query(tree, rank - 1);
        update(tree, rank, n);
    }
    return Arrays.asList(result);
}
private void update(int[] tree, int i, int n) {
    for (; i &lt;= n; i += i &amp; (-i)) tree[i]++;
}
private int query(int[] tree, int i) {
    int sum = 0;
    for (; i &gt; 0; i -= i &amp; (-i)) sum += tree[i];
    return sum;
}
private int lowerBound(int[] a, int target) {
    int lo = 0, hi = a.length;
    while (lo &lt; hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] &lt; target) lo = mid + 1; else hi = mid;
    }
    return lo;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [5,2,6,1]</code>. Sorted unique: <code>[1,2,5,6]</code> &rarr; ranks: 1&rarr;1, 2&rarr;2, 5&rarr;3, 6&rarr;4. Process i=3&rarr;0 (right to left).</p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>rank</th><th>query(rank-1)</th><th>result[i]</th><th>tree after update(rank)</th></tr>
<tr><td>3</td><td>1</td><td>1</td><td>query(0)=0</td><td>0</td><td>rank1 has count 1</td></tr>
<tr><td>2</td><td>6</td><td>4</td><td>query(3)=1 (just rank1)</td><td>1</td><td>rank4 has count 1</td></tr>
<tr><td>1</td><td>2</td><td>2</td><td>query(1)=1 (rank1 only)</td><td>1</td><td>rank2 has count 1</td></tr>
<tr><td>0</td><td>5</td><td>3</td><td>query(2)=2 (rank1+rank2)</td><td>2</td><td>rank3 has count 1</td></tr>
</table>
<p class="fs13">result built as [2,1,1,0] — matches expected output ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — sort plus n Fenwick ops. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Count smaller/larger elements seen so far" while scanning is a Fenwick-over-ranks pattern — compress values to ranks first, then every query/update is O(log n) instead of an O(n) linear scan.</div>`});

/* Problem 225 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q225 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 225 · MEDIUM</span>Design a Stack With Increment Operation</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Stack</span><span class="pill">Design</span></div>
<p class="dropcap">Design a stack with a maximum capacity <code>maxSize</code> supporting: <code>push(x)</code> (no-op if full), <code>pop()</code> (returns -1 if empty), and <code>increment(k, val)</code> — add <code>val</code> to each of the bottom <code>k</code> elements (or all of them, if fewer than k exist).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>CustomStack(3); push(1); push(2); pop() &rarr; 2
push(2); push(3); push(4);   // stack full at [1,2,3]
increment(5,100);            // bottom 5 (all 3) get +100 &rarr; [101,102,103]
pop() &rarr; 103; pop() &rarr; 102; pop() &rarr; 101; pop() &rarr; -1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= maxSize &lt;= 1000</li><li>up to 1000 calls total across push, pop, increment</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Eagerly applying increment to k elements every call costs O(k). Instead, defer the work: store a lazy "increment owed" per stack position, and only fold it in when that element is actually popped.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Use an array-backed stack plus a parallel <code>inc[]</code> array of lazy increments, one per index. <code>increment(k, val)</code> just does <code>inc[min(k, size)-1] += val</code> — O(1). On <code>pop()</code>, apply <code>inc[size-1]</code> to the top element before removing it, then push that pending increment down onto the new top (<code>inc[size-2] += inc[size-1]</code>) so lower elements still receive it later.</p>
<pre class="code" data-lang="java"><code>class CustomStack {
    int[] stack, inc;
    int size = 0, maxSize;
    public CustomStack(int maxSize) {
        this.maxSize = maxSize;
        stack = new int[maxSize];
        inc = new int[maxSize];
    }
    public void push(int x) {
        if (size &lt; maxSize) stack[size++] = x;
    }
    public int pop() {
        if (size == 0) return -1;
        int i = size - 1;
        int val = stack[i] + inc[i];
        if (i &gt; 0) inc[i - 1] += inc[i];
        inc[i] = 0;
        size--;
        return val;
    }
    public void increment(int k, int val) {
        int i = Math.min(k, size) - 1;
        if (i &gt;= 0) inc[i] += val;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Ops: <code>push(1),push(2),push(3),increment(2,100),pop(),pop(),pop()</code> (maxSize=3)</p>
<table class="tbl">
<tr><th>op</th><th>stack[0..size)</th><th>inc[0..size)</th><th>returned</th></tr>
<tr><td>push(1),push(2),push(3)</td><td>[1,2,3]</td><td>[0,0,0]</td><td>-</td></tr>
<tr><td>increment(2,100)</td><td>[1,2,3]</td><td>[0,100,0]</td><td>-</td></tr>
<tr><td>pop()</td><td>[1,2]</td><td>[0,100]</td><td>3+0=3</td></tr>
<tr><td>pop()</td><td>[1]</td><td>[100]</td><td>2+100=102; inc[0]+=100</td></tr>
<tr><td>pop()</td><td>[]</td><td>[]</td><td>1+100=101</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) for every operation. Space: O(maxSize).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Lazy propagation — record "owed" work at one index and only pay it when that index is touched, pushing the debt down to the neighbor — turns an O(k) range update into O(1); the same idea powers segment-tree lazy propagation.</div>`});

/* Problem 226 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q226 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 226 · MEDIUM</span>Online Stock Span</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Monotonic Stack</span><span class="pill">Design</span></div>
<p class="dropcap">Design a class that collects daily stock prices one at a time via <code>next(price)</code>, returning the stock's <b>span</b> for that day — the number of consecutive days (including today) up to and including today where the price was less than or equal to today's price.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>prices: 100, 80, 60, 70, 60, 75, 85
spans:  1,   1,  1,  2,  1,  4,  6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= price &lt;= 10⁵</li><li>up to 10⁴ calls to next</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep a stack of (price, span) pairs. Before pushing today's price, pop and absorb every stacked price that is <code>&lt;=</code> today's — each absorbed entry's span folds into today's span since it's part of an unbroken smaller-or-equal run.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain a monotonically decreasing stack of <code>(price, span)</code>. On each <code>next(price)</code>, start <code>span = 1</code>; while the stack's top price is <code>&lt;= price</code>, pop it and add its span (those days are absorbed into today's contiguous run). Push <code>(price, span)</code> and return span. Amortized O(1) per call — each price is pushed once and popped at most once across all calls.</p>
<pre class="code" data-lang="java"><code>class StockSpanner {
    Deque&lt;int[]&gt; stack = new ArrayDeque&lt;&gt;(); // {price, span}
    public int next(int price) {
        int span = 1;
        while (!stack.isEmpty() &amp;&amp; stack.peek()[0] &lt;= price) {
            span += stack.pop()[1];
        }
        stack.push(new int[]{price, span});
        return span;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Calls: <code>next(100),next(80),next(60),next(70),next(60),next(75),next(85)</code></p>
<table class="tbl">
<tr><th>price</th><th>popped (price,span)</th><th>span returned</th><th>stack after (top first)</th></tr>
<tr><td>100</td><td>none</td><td>1</td><td>[(100,1)]</td></tr>
<tr><td>80</td><td>none (100&gt;80)</td><td>1</td><td>[(80,1),(100,1)]</td></tr>
<tr><td>60</td><td>none (80&gt;60)</td><td>1</td><td>[(60,1),(80,1),(100,1)]</td></tr>
<tr><td>70</td><td>(60,1)</td><td>2</td><td>[(70,2),(80,1),(100,1)]</td></tr>
<tr><td>60</td><td>none (70&gt;60)</td><td>1</td><td>[(60,1),(70,2),(80,1),(100,1)]</td></tr>
<tr><td>75</td><td>(60,1),(70,2)</td><td>4</td><td>[(75,4),(80,1),(100,1)]</td></tr>
<tr><td>85</td><td>(75,4),(80,1)</td><td>6</td><td>[(85,6),(100,1)]</td></tr>
</table>
<p class="fs13">Spans emitted: <code>1,1,1,2,1,4,6</code> — matches expected ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) amortized per call (each element pushed and popped once total). Space: O(n) worst case.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A monotonic stack that "absorbs" smaller-or-equal predecessors and carries forward their accumulated weight is the same idea used in Largest Rectangle in Histogram — span is just a running count instead of a running area.</div>`});

/* Problem 227 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q227 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 227 · HARD</span>Maximum Frequency Stack</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Stack</span><span class="pill">Hash Map</span><span class="pill">Design</span></div>
<p class="dropcap">Design a stack-like class <code>FreqStack</code> supporting <code>push(val)</code> and <code>pop()</code>, where <code>pop()</code> removes and returns the most frequent element in the stack; on a tie, the one closest to the top (most recently pushed among the tied elements) wins.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>push(5); push(7); push(5); push(7); push(4); push(5);
pop() &rarr; 5   // freq 3, highest
pop() &rarr; 7   // freq 2, and pushed more recently than remaining
pop() &rarr; 5   // freq 2 now (after one 5 removed), tie broken by recency
pop() &rarr; 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= val &lt;= 10⁹</li><li>at most 2×10⁴ calls total to push and pop</li><li>pop is called only when the stack is non-empty</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track each value's current frequency in a map, and group values by frequency into per-frequency stacks — a value's position within its frequency-group stack naturally preserves push order for tie-breaking.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep <code>freq[val]</code> = current count, and <code>group[f]</code> = a stack of all values whose frequency reached exactly f, in push order. Also track <code>maxFreq</code>. On <code>push(val)</code>: bump <code>freq[val]</code>, push val onto <code>group[freq[val]]</code>, update maxFreq. On <code>pop()</code>: pop from <code>group[maxFreq]</code> (top of the highest-frequency, most-recent group), decrement that value's freq, and if its group is now empty, decrement maxFreq.</p>
<pre class="code" data-lang="java"><code>class FreqStack {
    Map&lt;Integer, Integer&gt; freq = new HashMap&lt;&gt;();
    Map&lt;Integer, Deque&lt;Integer&gt;&gt; group = new HashMap&lt;&gt;();
    int maxFreq = 0;

    public void push(int val) {
        int f = freq.merge(val, 1, Integer::sum);
        maxFreq = Math.max(maxFreq, f);
        group.computeIfAbsent(f, k -&gt; new ArrayDeque&lt;&gt;()).push(val);
    }
    public int pop() {
        int val = group.get(maxFreq).pop();
        freq.merge(val, -1, Integer::sum);
        if (group.get(maxFreq).isEmpty()) maxFreq--;
        return val;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Ops: <code>push(5),push(7),push(5),push(7),push(4),push(5)</code> then three pops</p>
<table class="tbl">
<tr><th>op</th><th>freq map</th><th>group[maxFreq] top</th><th>maxFreq</th><th>result</th></tr>
<tr><td>push(5)</td><td>{5:1}</td><td>group[1]=[5]</td><td>1</td><td>-</td></tr>
<tr><td>push(7)</td><td>{5:1,7:1}</td><td>group[1]=[7,5]</td><td>1</td><td>-</td></tr>
<tr><td>push(5)</td><td>{5:2,7:1}</td><td>group[2]=[5]</td><td>2</td><td>-</td></tr>
<tr><td>push(7)</td><td>{5:2,7:2}</td><td>group[2]=[7,5]</td><td>2</td><td>-</td></tr>
<tr><td>push(4)</td><td>{5:2,7:2,4:1}</td><td>group[2]=[7,5]</td><td>2</td><td>-</td></tr>
<tr><td>push(5)</td><td>{5:3,7:2,4:1}</td><td>group[3]=[5]</td><td>3</td><td>-</td></tr>
<tr><td>pop()</td><td>{5:2,...}</td><td>group[3] empty &rarr; maxFreq=2</td><td>2</td><td>5</td></tr>
<tr><td>pop()</td><td>{7:1,...}</td><td>group[2]=[5] left</td><td>2</td><td>7</td></tr>
<tr><td>pop()</td><td>{5:1,...}</td><td>group[2] empty &rarr; maxFreq=1</td><td>1</td><td>5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) per push/pop. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Bucketing elements by a changing property (here, frequency) into per-bucket stacks turns "find max-priority, tie-break by recency" into O(1) — the same bucket trick appears in LFU Cache.</div>`});

/* Problem 228 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q228 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 228 · HARD</span>Sliding Window Median</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Two Heaps</span><span class="pill">Sliding Window</span></div>
<p class="dropcap">Given an array <code>nums</code> and a window size <code>k</code>, return the median of each contiguous window of size k as it slides from the left edge to the right edge of the array.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [1,-1,-1,3,5,6]
Explanation: windows [1,3,-1]&rarr;1, [3,-1,-3]&rarr;-1, [-1,-3,5]&rarr;-1,
[-3,5,3]&rarr;3, [5,3,6]&rarr;5, [3,6,7]&rarr;6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= k &lt;= nums.length &lt;= 10⁵</li><li>-2³¹ &lt;= nums[i] &lt;= 2³¹-1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Extend the "two balanced heaps" median-finder with removal support: since a plain heap can't delete an arbitrary element in O(log n), use lazy deletion — mark a value for removal and only actually pop it once it surfaces at the top.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep a max-heap <code>lo</code> for the smaller half and min-heap <code>hi</code> for the larger half, sizes balanced (differ by at most 1), exactly like Find Median from Data Stream. To slide the window: add the new value to the correct heap and rebalance, then lazily delete the outgoing value (a HashMap counts pending removals per value); before reading a heap's top or rebalancing, "clean" it by popping off any values whose pending-removal count is positive.</p>
<pre class="code" data-lang="java"><code>class Solution {
    PriorityQueue&lt;Integer&gt; lo = new PriorityQueue&lt;&gt;(Collections.reverseOrder());
    PriorityQueue&lt;Integer&gt; hi = new PriorityQueue&lt;&gt;();
    Map&lt;Integer, Integer&gt; delayed = new HashMap&lt;&gt;();
    int loSize = 0, hiSize = 0;

    public double[] medianSlidingWindow(int[] nums, int k) {
        for (int i = 0; i &lt; k; i++) addNum(nums[i]);
        List&lt;Double&gt; res = new ArrayList&lt;&gt;();
        res.add(getMedian(k));
        for (int i = k; i &lt; nums.length; i++) {
            addNum(nums[i]);
            removeNum(nums[i - k]);
            rebalance();
            res.add(getMedian(k));
        }
        double[] out = new double[res.size()];
        for (int i = 0; i &lt; out.length; i++) out[i] = res.get(i);
        return out;
    }
    private void addNum(int num) {
        if (lo.isEmpty() || num &lt;= lo.peek()) { lo.offer(num); loSize++; }
        else { hi.offer(num); hiSize++; }
        rebalance();
    }
    private void removeNum(int num) {
        delayed.merge(num, 1, Integer::sum);
        if (num &lt;= lo.peek()) loSize--; else hiSize--;
    }
    private void rebalance() {
        prune(lo); prune(hi);
        while (loSize &gt; hiSize + 1) { hi.offer(lo.poll()); loSize--; hiSize++; prune(lo); }
        while (loSize &lt; hiSize) { lo.offer(hi.poll()); hiSize--; loSize++; prune(hi); }
    }
    private void prune(PriorityQueue&lt;Integer&gt; heap) {
        while (!heap.isEmpty() &amp;&amp; delayed.getOrDefault(heap.peek(), 0) &gt; 0) {
            delayed.merge(heap.peek(), -1, Integer::sum);
            heap.poll();
        }
    }
    private double getMedian(int k) {
        return k % 2 == 1 ? lo.peek() : ((long) lo.peek() + hi.peek()) / 2.0;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,3,-1,-3,5], k = 3</code> — first window and one slide</p>
<table class="tbl">
<tr><th>step</th><th>action</th><th>lo (max-heap)</th><th>hi (min-heap)</th><th>median</th></tr>
<tr><td>init</td><td>add 1,3,-1</td><td>[-1,1]</td><td>[3]</td><td>lo top = 1</td></tr>
<tr><td>slide</td><td>add -3; remove 1 (lazy)</td><td>[-1,-3] (loSize incl. lazily-marked 1)</td><td>[1,3]</td><td>rebalance next</td></tr>
<tr><td>after rebalance</td><td>prune drops 1 from hi when exposed</td><td>[-3,-1]</td><td>[3]</td><td>lo top = -1</td></tr>
</table>
<p class="fs13">First two medians: <code>1, -1</code> — matches the expected sequence's first two values ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log k) — each of the n slides does O(log k) heap work. Space: O(k).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Lazy deletion — mark-and-skip instead of true removal — is how you bolt a "remove arbitrary element" capability onto a heap without ever supporting it directly; it's the standard escape hatch whenever a sliding window needs heap-backed statistics.</div>`});

/* Problem 229 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q229 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 229 · MEDIUM</span>My Calendar I</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">TreeMap</span><span class="pill">Intervals</span><span class="pill">Design</span></div>
<p class="dropcap">Design a class <code>MyCalendar</code> where <code>book(start, end)</code> books an event covering <code>[start, end)</code> and returns <code>true</code> if it can be added without overlapping any previously booked event, or <code>false</code> (without booking it) if it double-books.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>book(10,20) &rarr; true
book(15,25) &rarr; false   // overlaps [10,20)
book(20,30) &rarr; true    // touches but doesn't overlap [10,20)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= start &lt; end &lt;= 10⁹</li><li>up to 1000 calls to book</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Store booked intervals keyed by start time in a <code>TreeMap</code>. For a new [start,end), only the interval immediately before and after (via floorKey/ceilingKey) can possibly overlap it — check just those two instead of scanning everything.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>A <code>TreeMap&lt;Integer,Integer&gt;</code> maps each booked start to its end, kept sorted by start. For <code>book(start,end)</code>: find the entry with the largest start <code>&lt;= start</code> (floorEntry) — if it exists and its end <code>&gt; start</code>, they overlap. Find the entry with the smallest start <code>&gt;= start</code> (ceilingEntry) — if it exists and its start <code>&lt; end</code>, they overlap. If neither overlaps, insert and return true.</p>
<pre class="code" data-lang="java"><code>class MyCalendar {
    TreeMap&lt;Integer, Integer&gt; events = new TreeMap&lt;&gt;();

    public boolean book(int start, int end) {
        Map.Entry&lt;Integer, Integer&gt; prev = events.floorEntry(start);
        if (prev != null &amp;&amp; prev.getValue() &gt; start) return false;
        Map.Entry&lt;Integer, Integer&gt; next = events.ceilingEntry(start);
        if (next != null &amp;&amp; next.getKey() &lt; end) return false;
        events.put(start, end);
        return true;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Calls: <code>book(10,20), book(15,25), book(20,30)</code></p>
<table class="tbl">
<tr><th>call</th><th>floorEntry(start)</th><th>overlap?</th><th>ceilingEntry(start)</th><th>overlap?</th><th>result</th><th>map after</th></tr>
<tr><td>book(10,20)</td><td>none</td><td>no</td><td>none</td><td>no</td><td>true</td><td>{10:20}</td></tr>
<tr><td>book(15,25)</td><td>(10,20)</td><td>20&gt;15 yes</td><td>-</td><td>-</td><td>false</td><td>{10:20}</td></tr>
<tr><td>book(20,30)</td><td>(10,20)</td><td>20&gt;20? no</td><td>none</td><td>no</td><td>true</td><td>{10:20, 20:30}</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n) per booking (TreeMap floor/ceiling). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A sorted map turns "does this interval overlap any existing one" into checking just the two neighbors around the insertion point — no need to scan the whole booked set, since only adjacent intervals in sorted order can possibly touch a new one.</div>`});

/* Problem 230 */
B.spread(
{ kicker: 'DSA · ADVANCED STRUCTURES', head: 'Q230 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 230 · MEDIUM</span>My Calendar II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Line Sweep</span><span class="pill">Intervals</span><span class="pill">Design</span></div>
<p class="dropcap">Design a class <code>MyCalendarTwo</code> where <code>book(start, end)</code> books an event <code>[start, end)</code>, allowing a <b>double</b> booking (two events overlapping) but never a <b>triple</b> booking (three events all overlapping at some point in time). Return <code>true</code> if the booking succeeds, <code>false</code> otherwise.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>book(10,20) &rarr; true
book(50,60) &rarr; true
book(10,40) &rarr; true    // double-books [10,20) — allowed
book(5,15)  &rarr; false   // would triple-book [10,15)
book(5,10)  &rarr; true    // touches but doesn't overlap [10,...)
book(25,55) &rarr; true    // double-books [50,55) only — fine</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= start &lt; end &lt;= 10⁹</li><li>up to 1000 calls to book</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track overlap counts with a sweep-line difference map: bump +1 at each event's start and -1 at its end, then walk the running prefix sum — if it ever exceeds 2 anywhere, this booking would triple-book, so reject and undo.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep a <code>TreeMap&lt;Integer,Integer&gt;</code> of delta events: <code>+1</code> at start, <code>-1</code> at end, for every booked event. To try booking <code>[start,end)</code>: apply its +1/-1 deltas, then sweep the map computing the running sum; if the running sum ever exceeds 2, this booking causes a triple overlap — undo the deltas and return false. Otherwise leave the deltas in place and return true.</p>
<pre class="code" data-lang="java"><code>class MyCalendarTwo {
    TreeMap&lt;Integer, Integer&gt; delta = new TreeMap&lt;&gt;();

    public boolean book(int start, int end) {
        delta.merge(start, 1, Integer::sum);
        delta.merge(end, -1, Integer::sum);
        int running = 0;
        for (int change : delta.values()) {
            running += change;
            if (running &gt; 2) {
                delta.merge(start, -1, Integer::sum);
                delta.merge(end, 1, Integer::sum);
                return false;
            }
        }
        return true;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Calls: <code>book(10,20), book(10,40), book(5,15)</code></p>
<table class="tbl">
<tr><th>call</th><th>delta map after applying</th><th>max running sum</th><th>&gt;2?</th><th>result</th></tr>
<tr><td>book(10,20)</td><td>{10:1, 20:-1}</td><td>1</td><td>no</td><td>true</td></tr>
<tr><td>book(10,40)</td><td>{10:2, 20:-1, 40:-1}</td><td>2</td><td>no</td><td>true</td></tr>
<tr><td>book(5,15)</td><td>{5:1, 10:2, 15:-1, 20:-1, 40:-1}</td><td>at 10: 1+2=3</td><td>yes</td><td>false, deltas undone</td></tr>
</table>
<p class="fs13">After the rejected call, map reverts to <code>{5:0(removed), 10:2, 15:0(removed), 20:-1, 40:-1}</code> i.e. back to <code>{10:2, 20:-1, 40:-1}</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) per booking (sweeping up to n delta points). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Counting "how many intervals cover this point" is the classic sweep-line signature: encode each interval as a +1/-1 pair at its endpoints and read overlap depth off the running prefix sum — the same technique generalizes to "K-booking" for any K by changing the threshold.</div>`});

})();
