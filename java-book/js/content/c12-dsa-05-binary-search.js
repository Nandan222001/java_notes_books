/* ===== CHAPTER 36 · DSA: Binary Search ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 36, 'DSA: Binary Search');

/* Problem 041 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q041 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 041 · EASY</span>Binary Search</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Binary Search</span></div>
<p class="dropcap">Given a sorted array <code>nums</code> of distinct integers and a <code>target</code>, return the index of target if found, otherwise -1. Must run in O(log n).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: nums[4] == 9</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁴</li><li>nums is sorted in strictly increasing order</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep a closed range [lo, hi] and halve it every step by comparing against the midpoint.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain <code>lo</code> and <code>hi</code> bounding the possible answer. Compare the middle element to target; discard the half that can't contain it, and repeat until the range is empty.</p>
<pre class="code" data-lang="java"><code>public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo &lt;= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] &lt; target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [-1,0,3,5,9,12], target = 9</code></p>
<table class="tbl">
<tr><th>lo</th><th>hi</th><th>mid</th><th>nums[mid]</th><th>action</th></tr>
<tr><td>0</td><td>5</td><td>2</td><td>3</td><td>3 &lt; 9 → lo=3</td></tr>
<tr><td>3</td><td>5</td><td>4</td><td>9</td><td>match → return 4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Every binary search is really "find the boundary where a monotonic condition flips" — express your problem as that condition.</div>`});

/* Problem 042 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q042 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 042 · MEDIUM</span>Search in Rotated Sorted Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Binary Search</span></div>
<p class="dropcap">An ascending array of <strong>distinct</strong> integers was rotated at an unknown pivot. Given the rotated array <code>nums</code> and a <code>target</code>, return its index, or -1 if absent. Must run in O(log n).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Explanation: nums[4] == 0</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 5000</li><li>-10⁴ &lt;= nums[i] &lt;= 10⁴, all values unique</li><li>nums was originally sorted then rotated at some pivot</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>At any mid, one of the two halves [lo,mid] or [mid,hi] is always normally sorted — check which one and test if target falls in its range.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Even though the whole array isn't sorted, at least one side of any midpoint always is. Detect the sorted side by comparing <code>nums[lo]</code> to <code>nums[mid]</code>; if target lies inside that side's value range, recurse there, otherwise recurse the other side.</p>
<pre class="code" data-lang="java"><code>public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo &lt;= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[lo] &lt;= nums[mid]) {          // left half sorted
            if (nums[lo] &lt;= target &amp;&amp; target &lt; nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {                                // right half sorted
            if (nums[mid] &lt; target &amp;&amp; target &lt;= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [4,5,6,7,0,1,2], target = 0</code></p>
<table class="tbl">
<tr><th>lo</th><th>hi</th><th>mid</th><th>nums[mid]</th><th>action</th></tr>
<tr><td>0</td><td>6</td><td>3</td><td>7</td><td>left sorted (4≤7); 0∉[4,7) → lo=4</td></tr>
<tr><td>4</td><td>6</td><td>5</td><td>1</td><td>left sorted (0≤1); 0∈[0,1) → hi=4</td></tr>
<tr><td>4</td><td>4</td><td>4</td><td>0</td><td>match → return 4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Rotated-array search is plain binary search plus one extra decision: "which half is sorted right now?" — everything else stays the same.</div>`});

/* Problem 043 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q043 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 043 · MEDIUM</span>Find Minimum in Rotated Sorted Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Binary Search</span></div>
<p class="dropcap">Given a rotated ascending array <code>nums</code> of <strong>unique</strong> elements, find the minimum element in O(log n).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: original array was [0,1,2,4,5,6,7], rotated 4 times</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 5000</li><li>-5000 &lt;= nums[i] &lt;= 5000, all values unique</li><li>nums was rotated between 1 and n times</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Compare <code>nums[mid]</code> to <code>nums[hi]</code> (not <code>nums[lo]</code>) — that comparison always tells you which side the rotation pivot is on.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Shrink a half-open range with <code>lo &lt; hi</code>. If <code>nums[mid] &gt; nums[hi]</code>, the minimum must be strictly right of mid, so <code>lo = mid + 1</code>; otherwise the minimum is at mid or to its left, so <code>hi = mid</code>. The loop ends with <code>lo == hi</code> pointing at the minimum.</p>
<pre class="code" data-lang="java"><code>public int findMin(int[] nums) {
    int lo = 0, hi = nums.length - 1;
    while (lo &lt; hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] &gt; nums[hi]) lo = mid + 1;
        else hi = mid;
    }
    return nums[lo];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [4,5,6,7,0,1,2]</code></p>
<table class="tbl">
<tr><th>lo</th><th>hi</th><th>mid</th><th>nums[mid]</th><th>nums[hi]</th><th>action</th></tr>
<tr><td>0</td><td>6</td><td>3</td><td>7</td><td>2</td><td>7&gt;2 → lo=4</td></tr>
<tr><td>4</td><td>6</td><td>5</td><td>1</td><td>2</td><td>1≤2 → hi=5</td></tr>
<tr><td>4</td><td>5</td><td>4</td><td>0</td><td>1</td><td>0≤1 → hi=4</td></tr>
<tr><td>4</td><td>4</td><td>—</td><td>—</td><td>—</td><td>lo==hi → stop, return nums[4]=0</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Comparing against <code>nums[hi]</code> instead of <code>nums[lo]</code> sidesteps the ambiguity of "is mid on the sorted side" — it directly locates the pivot.</div>`});

/* Problem 044 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q044 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 044 · MEDIUM</span>Find First and Last Position of Element in Sorted Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Binary Search</span></div>
<p class="dropcap">Given a sorted array <code>nums</code> (possibly with duplicates) and a <code>target</code>, return <code>[first, last]</code> — the starting and ending index of target's run. Return <code>[-1,-1]</code> if not present. Must run in O(log n).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Explanation: 8 occupies indices 3 and 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= nums.length &lt;= 10⁵</li><li>-10⁹ &lt;= nums[i], target &lt;= 10⁹</li><li>nums is sorted in non-decreasing order</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Write one helper "lowerBound(x)" that finds the leftmost index &gt;= x. Call it with <code>target</code> for the start, and with <code>target + 1</code> (minus one) for the end.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Both the first and last occurrence are "leftmost index satisfying a monotonic predicate" problems in disguise. <code>lowerBound(target)</code> gives the first index; <code>lowerBound(target+1) - 1</code> gives the last, since everything before that boundary is <code>&lt;= target</code>.</p>
<pre class="code" data-lang="java"><code>public int[] searchRange(int[] nums, int target) {
    int first = lowerBound(nums, target);
    if (first == nums.length || nums[first] != target) return new int[]{-1, -1};
    int last = lowerBound(nums, target + 1) - 1;
    return new int[]{first, last};
}
private int lowerBound(int[] nums, int target) {
    int lo = 0, hi = nums.length;
    while (lo &lt; hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] &lt; target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [5,7,7,8,8,10], target = 8</code></p>
<table class="tbl">
<tr><th>call</th><th>lo</th><th>hi</th><th>mid</th><th>nums[mid]</th><th>action</th></tr>
<tr><td>lowerBound(8)</td><td>0</td><td>6</td><td>3</td><td>8</td><td>8≥8 → hi=3</td></tr>
<tr><td>lowerBound(8)</td><td>0</td><td>3</td><td>1</td><td>7</td><td>7&lt;8 → lo=2</td></tr>
<tr><td>lowerBound(8)</td><td>2</td><td>3</td><td>2</td><td>7</td><td>7&lt;8 → lo=3 ⇒ first=3</td></tr>
<tr><td>lowerBound(9)</td><td>0</td><td>6</td><td>3</td><td>8</td><td>8&lt;9 → lo=4</td></tr>
<tr><td>lowerBound(9)</td><td>4</td><td>6</td><td>5</td><td>10</td><td>10≥9 → hi=5</td></tr>
<tr><td>lowerBound(9)</td><td>4</td><td>5</td><td>4</td><td>8</td><td>8&lt;9 → lo=5 ⇒ last=5-1=4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n) (two binary searches). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Master one clean <code>lowerBound</code> helper and you get "first occurrence", "last occurrence", "count of x", and "insert position" all for free.</div>`});

/* Problem 045 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q045 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 045 · MEDIUM</span>Search a 2D Matrix</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Matrix</span><span class="pill">Binary Search</span></div>
<p class="dropcap">Given an <code>m x n</code> matrix where each row is sorted ascending, and the first integer of each row is greater than the last integer of the previous row, determine whether <code>target</code> exists. Must run in O(log(m·n)).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == matrix.length, n == matrix[i].length</li><li>1 &lt;= m, n &lt;= 100</li><li>-10⁴ &lt;= matrix[i][j], target &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The matrix is really one sorted array of length m*n in disguise — convert a linear index to (row, col) with <code>/ n</code> and <code>% n</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Because every row starts higher than the previous row ends, the whole matrix read row-by-row is one ascending sequence. Binary search a virtual index from 0 to m·n-1, mapping each mid to <code>(mid / n, mid % n)</code>.</p>
<pre class="code" data-lang="java"><code>public boolean searchMatrix(int[][] matrix, int target) {
    int m = matrix.length, n = matrix[0].length;
    int lo = 0, hi = m * n - 1;
    while (lo &lt;= hi) {
        int mid = lo + (hi - lo) / 2;
        int val = matrix[mid / n][mid % n];
        if (val == target) return true;
        else if (val &lt; target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3</code> (n=4)</p>
<table class="tbl">
<tr><th>lo</th><th>hi</th><th>mid</th><th>row,col</th><th>val</th><th>action</th></tr>
<tr><td>0</td><td>11</td><td>5</td><td>1,1</td><td>11</td><td>11&gt;3 → hi=4</td></tr>
<tr><td>0</td><td>4</td><td>2</td><td>0,2</td><td>5</td><td>5&gt;3 → hi=1</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>0,0</td><td>1</td><td>1&lt;3 → lo=1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>0,1</td><td>3</td><td>match → return true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log(m·n)). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever 2D data is "sorted end-to-end", flatten it mentally with div/mod instead of writing a 2D search.</div>`});

/* Problem 046 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q046 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 046 · MEDIUM</span>Koko Eating Bananas</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Binary Search On Answer</span></div>
<p class="dropcap">There are <code>piles</code> of bananas and <code>h</code> hours before the guards return. Each hour Koko picks one pile and eats <code>k</code> bananas from it (or the whole pile if it has fewer than <code>k</code>); she eats nothing else that hour. Find the minimum integer <code>k</code> so she finishes every pile within <code>h</code> hours.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: piles = [3,6,7,11], h = 8
Output: 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= piles.length &lt;= 10⁴</li><li>piles.length &lt;= h &lt;= 10⁹</li><li>1 &lt;= piles[i] &lt;= 10⁹</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>"Can Koko finish in ≤ h hours at speed k?" is monotonic in k — false for small k, true for large k. Binary search that boundary instead of trying every speed.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>This is <strong>binary search on the answer</strong>: the search space isn't the array, it's the range of possible speeds <code>[1, max(piles)]</code>. For each candidate speed, compute total hours (ceil-divide each pile) and shrink toward the smallest speed that still fits within <code>h</code>.</p>
<pre class="code" data-lang="java"><code>public int minEatingSpeed(int[] piles, int h) {
    int lo = 1, hi = 0;
    for (int p : piles) hi = Math.max(hi, p);
    while (lo &lt; hi) {
        int mid = lo + (hi - lo) / 2;
        if (hoursNeeded(piles, mid) &lt;= h) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
private long hoursNeeded(int[] piles, int k) {
    long hours = 0;
    for (int p : piles) hours += (p + k - 1) / k;
    return hours;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>piles = [3,6,7,11], h = 8</code> (hi starts at max pile = 11)</p>
<table class="tbl">
<tr><th>lo</th><th>hi</th><th>mid(k)</th><th>hours(k)</th><th>action</th></tr>
<tr><td>1</td><td>11</td><td>6</td><td>6</td><td>6≤8 → hi=6</td></tr>
<tr><td>1</td><td>6</td><td>3</td><td>10</td><td>10&gt;8 → lo=4</td></tr>
<tr><td>4</td><td>6</td><td>5</td><td>8</td><td>8≤8 → hi=5</td></tr>
<tr><td>4</td><td>5</td><td>4</td><td>8</td><td>8≤8 → hi=4</td></tr>
<tr><td>4</td><td>4</td><td>—</td><td>—</td><td>lo==hi → stop, return 4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log(max(piles))). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever a problem asks "find the minimum/maximum value such that a feasibility check passes", suspect binary search on the answer — write the feasibility check first, the search shell is boilerplate.</div>`});

/* Problem 047 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q047 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 047 · HARD</span>Median of Two Sorted Arrays</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Array</span><span class="pill">Binary Search</span><span class="pill">Divide &amp; Conquer</span></div>
<p class="dropcap">Given two sorted arrays <code>nums1</code> (size m) and <code>nums2</code> (size n), return the median of the two arrays combined. Must run in O(log(min(m,n))).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums1 = [1,3,8], nums2 = [7,9,10,11]
Output: 8.0
Explanation: merged = [1,3,7,8,9,10,11] (length 7, odd) → median is the 4th element, 8</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= m, n &lt;= 1000</li><li>1 &lt;= m + n &lt;= 2000</li><li>-10⁶ &lt;= nums1[i], nums2[i] &lt;= 10⁶</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Binary search a cut position <code>i</code> in the smaller array; the matching cut <code>j</code> in the other array is forced by "left half must hold exactly half the elements".</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Search for a partition <code>i</code> in the smaller array <code>a</code> (size m) so that <code>j = half - i</code> in <code>b</code> (size n) makes every element left of both cuts ≤ every element right of both cuts, where <code>half = (m+n+1)/2</code>. When that condition holds, the median is derivable directly from the four border values.</p>
<pre class="code" data-lang="java"><code>public double findMedianSortedArrays(int[] a, int[] b) {
    if (a.length &gt; b.length) return findMedianSortedArrays(b, a);
    int m = a.length, n = b.length;
    int lo = 0, hi = m, half = (m + n + 1) / 2;
    while (lo &lt;= hi) {
        int i = lo + (hi - lo) / 2;
        int j = half - i;
        int aLeft  = (i == 0) ? Integer.MIN_VALUE : a[i - 1];
        int aRight = (i == m) ? Integer.MAX_VALUE : a[i];
        int bLeft  = (j == 0) ? Integer.MIN_VALUE : b[j - 1];
        int bRight = (j == n) ? Integer.MAX_VALUE : b[j];
        if (aLeft &lt;= bRight &amp;&amp; bLeft &lt;= aRight) {
            if ((m + n) % 2 == 1) return Math.max(aLeft, bLeft);
            return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2.0;
        } else if (aLeft &gt; bRight) hi = i - 1;
        else lo = i + 1;
    }
    return -1.0; // unreachable for valid input
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>a = [1,3,8] (m=3), b = [7,9,10,11] (n=4)</code>, half = (3+4+1)/2 = 4</p>
<table class="tbl">
<tr><th>i</th><th>j</th><th>aLeft</th><th>aRight</th><th>bLeft</th><th>bRight</th><th>action</th></tr>
<tr><td>1</td><td>3</td><td>1</td><td>3</td><td>10</td><td>11</td><td>bLeft&gt;aRight (10&gt;3) → lo=2</td></tr>
<tr><td>2</td><td>2</td><td>3</td><td>8</td><td>9</td><td>10</td><td>bLeft&gt;aRight (9&gt;8) → lo=3</td></tr>
<tr><td>3</td><td>1</td><td>8</td><td>+∞</td><td>7</td><td>9</td><td>valid (8≤9, 7≤+∞); odd total → max(8,7)=8</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log(min(m,n))). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Binary search doesn't need a sorted 1D array to search over — here it searches over "partition positions", a completely different kind of monotonic space.</div>`});

/* Problem 048 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q048 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 048 · MEDIUM</span>Peak Index in a Mountain Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Binary Search</span></div>
<p class="dropcap">An array <code>arr</code> is a <em>mountain</em>: it strictly increases then strictly decreases. Return the index of the peak element in O(log n).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: arr = [24,69,100,99,79,78,67,36,26,19]
Output: 2
Explanation: arr[2] = 100 is the peak</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>3 &lt;= arr.length &lt;= 10⁵</li><li>0 &lt;= arr[i] &lt;= 10⁶</li><li>arr is guaranteed to be a mountain array</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>At mid, compare <code>arr[mid]</code> to <code>arr[mid+1]</code>: still climbing means the peak is to the right; already descending means the peak is at mid or to the left.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>The slope direction at any point is a monotonic signal for which half holds the peak — identical shape to the rotated-array problems. Shrink <code>[lo, hi]</code> until they meet at the peak.</p>
<pre class="code" data-lang="java"><code>public int peakIndexInMountainArray(int[] arr) {
    int lo = 0, hi = arr.length - 1;
    while (lo &lt; hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] &lt; arr[mid + 1]) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>arr = [24,69,100,99,79,78,67,36,26,19]</code></p>
<table class="tbl">
<tr><th>lo</th><th>hi</th><th>mid</th><th>arr[mid]</th><th>arr[mid+1]</th><th>action</th></tr>
<tr><td>0</td><td>9</td><td>4</td><td>79</td><td>78</td><td>79&gt;78 (descending) → hi=4</td></tr>
<tr><td>0</td><td>4</td><td>2</td><td>100</td><td>99</td><td>100&gt;99 (descending) → hi=2</td></tr>
<tr><td>0</td><td>2</td><td>1</td><td>69</td><td>100</td><td>69&lt;100 (climbing) → lo=2</td></tr>
<tr><td>2</td><td>2</td><td>—</td><td>—</td><td>—</td><td>lo==hi → stop, return 2</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Any single-peak (unimodal) function over an array can be peak-found with this exact template — no need for the array to be sorted, only unimodal.</div>`});

/* Problem 049 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q049 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 049 · MEDIUM</span>Capacity To Ship Packages Within D Days</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Binary Search On Answer</span></div>
<p class="dropcap">Packages with <code>weights[i]</code> must ship in order, one day's worth at a time, on a ship with a fixed weight <code>capacity</code>. Each day the ship loads packages in order until adding the next would exceed capacity. Find the minimum capacity so all packages ship within <code>days</code> days.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= days &lt;= weights.length &lt;= 5×10⁴</li><li>1 &lt;= weights[i] &lt;= 500</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Capacity must be at least the heaviest single package, and at most the sum of all packages. "Can ship within D days at capacity cap?" is monotonic in cap — binary search it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Binary search on the answer again: search capacities in <code>[max(weights), sum(weights)]</code>. For each candidate capacity, greedily count how many days a linear scan needs, then shrink toward the smallest feasible capacity.</p>
<pre class="code" data-lang="java"><code>public int shipWithinDays(int[] weights, int days) {
    int lo = 0, hi = 0;
    for (int w : weights) { lo = Math.max(lo, w); hi += w; }
    while (lo &lt; hi) {
        int mid = lo + (hi - lo) / 2;
        if (daysNeeded(weights, mid) &lt;= days) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
private int daysNeeded(int[] weights, int cap) {
    int days = 1, load = 0;
    for (int w : weights) {
        if (load + w &gt; cap) { days++; load = 0; }
        load += w;
    }
    return days;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>weights = [1..10], days = 5</code> (lo starts at max=10, hi at sum=55)</p>
<table class="tbl">
<tr><th>lo</th><th>hi</th><th>mid(cap)</th><th>daysNeeded</th><th>action</th></tr>
<tr><td>10</td><td>55</td><td>32</td><td>2</td><td>2≤5 → hi=32</td></tr>
<tr><td>10</td><td>32</td><td>21</td><td>3</td><td>3≤5 → hi=21</td></tr>
<tr><td>10</td><td>21</td><td>15</td><td>5</td><td>5≤5 → hi=15</td></tr>
<tr><td>10</td><td>15</td><td>12</td><td>6</td><td>6&gt;5 → lo=13</td></tr>
<tr><td>13</td><td>15</td><td>14</td><td>6</td><td>6&gt;5 → lo=15</td></tr>
<tr><td>15</td><td>15</td><td>—</td><td>—</td><td>lo==hi → stop, return 15</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log(sum(weights))). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Koko's bananas and this shipping problem are the same template wearing different clothes: bound the answer range, write a feasibility check, binary search the boundary.</div>`});

/* Problem 050 */
B.spread(
{ kicker: 'DSA · BINARY SEARCH', head: 'Q050 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 050 · EASY</span>Sqrt(x)</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Math</span><span class="pill">Binary Search</span></div>
<p class="dropcap">Given a non-negative integer <code>x</code>, return <code>floor(sqrt(x))</code>. You may not use a built-in square root function or floating-point power operator.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: x = 8
Output: 2
Explanation: sqrt(8) ≈ 2.828, floored to 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= x &lt;= 2³¹ - 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Binary search integers <code>mid</code> in <code>[1, x/2]</code> for the largest one with <code>mid*mid &lt;= x</code>; watch for overflow by widening to <code>long</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>The floor square root is the largest integer whose square doesn't exceed <code>x</code> — a textbook "find the last true" binary search over candidate answers. Handle <code>x &lt; 2</code> as a base case since <code>x/2</code> would otherwise be 0.</p>
<pre class="code" data-lang="java"><code>public int mySqrt(int x) {
    if (x &lt; 2) return x;
    int lo = 1, hi = x / 2;
    while (lo &lt;= hi) {
        int mid = lo + (hi - lo) / 2;
        long sq = (long) mid * mid;
        if (sq == x) return mid;
        else if (sq &lt; x) lo = mid + 1;
        else hi = mid - 1;
    }
    return hi; // hi has settled on floor(sqrt(x))
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>x = 8</code> (hi starts at x/2 = 4)</p>
<table class="tbl">
<tr><th>lo</th><th>hi</th><th>mid</th><th>mid*mid</th><th>action</th></tr>
<tr><td>1</td><td>4</td><td>2</td><td>4</td><td>4&lt;8 → lo=3</td></tr>
<tr><td>3</td><td>4</td><td>3</td><td>9</td><td>9&gt;8 → hi=2</td></tr>
<tr><td>3</td><td>2</td><td>—</td><td>—</td><td>lo&gt;hi → stop, return hi=2</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log x). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>When the loop ends with <code>lo &gt; hi</code>, it's <code>hi</code> that holds "the last value that satisfied the condition" — the answer to most "largest value satisfying X" binary searches.</div>`});

})();