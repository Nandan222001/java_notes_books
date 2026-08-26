/* ===== CHAPTER 53 · DSA: Sorting & Searching ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 53, 'DSA: Sorting & Searching');

/* Problem 211 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q211 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 211 · MEDIUM</span>Merge Sort</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sorting</span><span class="pill">Divide &amp; Conquer</span></div>
<p class="dropcap">Implement merge sort from scratch: sort an integer array in ascending order in O(n log n) time using the classic divide-and-conquer merge algorithm (no built-in sort allowed).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [5,2,3,1]
Output: [1,2,3,5]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 5×10⁴</li><li>-5×10⁴ &lt;= nums[i] &lt;= 5×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Split the array in half recursively down to single elements (already "sorted"), then merge sorted halves back together by repeatedly taking the smaller front element.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Recursively split the array into halves until each piece has 1 element, then merge adjacent sorted pieces by comparing their front elements and appending the smaller one, repeating until both pieces are exhausted.</p>
<pre class="code" data-lang="java"><code>public int[] sortArray(int[] nums) {
    if (nums.length &lt;= 1) return nums;
    int mid = nums.length / 2;
    int[] left = sortArray(Arrays.copyOfRange(nums, 0, mid));
    int[] right = sortArray(Arrays.copyOfRange(nums, mid, nums.length));
    return merge(left, right);
}
private int[] merge(int[] a, int[] b) {
    int[] res = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;
    while (i &lt; a.length &amp;&amp; j &lt; b.length)
        res[k++] = (a[i] &lt;= b[j]) ? a[i++] : b[j++];
    while (i &lt; a.length) res[k++] = a[i++];
    while (j &lt; b.length) res[k++] = b[j++];
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [5,2,3,1]</code></p>
<table class="tbl">
<tr><th>step</th><th>action</th></tr>
<tr><td>split</td><td>[5,2] and [3,1]</td></tr>
<tr><td>split further</td><td>[5],[2] and [3],[1]</td></tr>
<tr><td>merge [5],[2]</td><td>→ [2,5]</td></tr>
<tr><td>merge [3],[1]</td><td>→ [1,3]</td></tr>
<tr><td>merge [2,5],[1,3]</td><td>compare 2&gt;1→take 1; 2&lt;3→take 2; 5&gt;3→take 3; take 5 → [1,2,3,5]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) always. Space: O(n) for the merge buffers.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Merge sort's guarantee is worst-case O(n log n) regardless of input — unlike quicksort, it never degrades to O(n²), at the cost of not being in-place.</div>`});

/* Problem 212 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q212 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 212 · MEDIUM</span>Quick Sort</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sorting</span><span class="pill">Divide &amp; Conquer</span></div>
<p class="dropcap">Implement quick sort from scratch: sort an integer array in ascending order in place, using the classic Lomuto (or Hoare) partition scheme around a pivot (no built-in sort allowed).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [5,2,3,1]
Output: [1,2,3,5]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 5×10⁴</li><li>-5×10⁴ &lt;= nums[i] &lt;= 5×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Pick a pivot (e.g. the last element), partition the array so everything smaller ends up left of it and everything larger ends up right of it, then recurse on both sides — the pivot is now in its final sorted position.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Lomuto partition: pick the last element as pivot, walk the range keeping an index <code>i</code> marking the boundary of elements known to be <code>&lt;=</code> pivot, swapping qualifying elements into that boundary. Finally swap the pivot into place at <code>i+1</code> and recurse on the two sides split by that final pivot position.</p>
<pre class="code" data-lang="java"><code>public void quickSort(int[] nums, int lo, int hi) {
    if (lo &gt;= hi) return;
    int p = partition(nums, lo, hi);
    quickSort(nums, lo, p - 1);
    quickSort(nums, p + 1, hi);
}
private int partition(int[] nums, int lo, int hi) {
    int pivot = nums[hi];
    int i = lo - 1;
    for (int j = lo; j &lt; hi; j++) {
        if (nums[j] &lt;= pivot) {
            i++;
            int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
        }
    }
    int t = nums[i + 1]; nums[i + 1] = nums[hi]; nums[hi] = t;
    return i + 1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [5,2,3,1]</code>, pivot = last element = 1</p>
<table class="tbl">
<tr><th>j</th><th>nums[j]</th><th>&lt;= pivot(1)?</th><th>i after</th><th>array after swap</th></tr>
<tr><td>0</td><td>5</td><td>no</td><td>-1</td><td>[5,2,3,1]</td></tr>
<tr><td>1</td><td>2</td><td>no</td><td>-1</td><td>[5,2,3,1]</td></tr>
<tr><td>2</td><td>3</td><td>no</td><td>-1</td><td>[5,2,3,1]</td></tr>
<tr><td>end</td><td>swap nums[i+1]=nums[0] with pivot nums[3]</td><td>—</td><td>—</td><td>[1,2,3,5], pivot index=0</td></tr>
</table>
<p class="fs13">Recurse on [lo=0,hi=-1] (empty, skip) and [lo=1,hi=3] → sub-array [2,3,5] is already in relative order, no further swaps needed.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) average, O(n²) worst case (already-sorted input with a bad pivot choice). Space: O(log n) recursion stack — sorts in place.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Quicksort's worst case comes from consistently picking an extreme pivot on sorted/nearly-sorted data — randomizing the pivot (or using median-of-three) makes O(n²) practically unreachable.</div>`});

/* Problem 213 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q213 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 213 · MEDIUM</span>Sort an Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sorting</span></div>
<p class="dropcap">Given an array of integers <code>nums</code>, sort it in ascending order and return it. Solve it without using a built-in sort — implement any O(n log n) comparison sort yourself.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 5×10⁴</li><li>-5×10⁴ &lt;= nums[i] &lt;= 5×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Any O(n log n) sort works — merge sort is a safe, worst-case-guaranteed choice; heap sort is another in-place O(n log n) option if you want to avoid recursion.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>This is the generic "implement a sort" wrapper — merge sort is used here for a guaranteed O(n log n) bound with no worst-case blowup. Split into halves recursively, then merge sorted halves using an auxiliary buffer.</p>
<pre class="code" data-lang="java"><code>public int[] sortArray(int[] nums) {
    int[] aux = new int[nums.length];
    mergeSort(nums, aux, 0, nums.length - 1);
    return nums;
}
private void mergeSort(int[] a, int[] aux, int lo, int hi) {
    if (lo &gt;= hi) return;
    int mid = (lo + hi) / 2;
    mergeSort(a, aux, lo, mid);
    mergeSort(a, aux, mid + 1, hi);
    int i = lo, j = mid + 1, k = lo;
    while (i &lt;= mid &amp;&amp; j &lt;= hi) aux[k++] = (a[i] &lt;= a[j]) ? a[i++] : a[j++];
    while (i &lt;= mid) aux[k++] = a[i++];
    while (j &lt;= hi) aux[k++] = a[j++];
    for (k = lo; k &lt;= hi; k++) a[k] = aux[k];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [5,1,1,2,0,0]</code></p>
<table class="tbl">
<tr><th>step</th><th>range</th><th>result</th></tr>
<tr><td>split</td><td>[0,5]</td><td>-&gt; [0,2] and [3,5]</td></tr>
<tr><td>sort left half</td><td>[5,1,1]</td><td>-&gt; [1,1,5]</td></tr>
<tr><td>sort right half</td><td>[2,0,0]</td><td>-&gt; [0,0,2]</td></tr>
<tr><td>merge</td><td>[1,1,5] + [0,0,2]</td><td>0,0,1,1,2,5</td></tr>
</table>
<p class="fs13">Merge trace: compare 1 vs 0 → take 0; 1 vs 0 → take 0; 1 vs 2 → take 1; 1 vs 2 → take 1; 5 vs 2 → take 2; take remaining 5. Result: <code>[0,0,1,1,2,5]</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n). Space: O(n) auxiliary buffer.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Reusing one auxiliary array across all merge calls (instead of allocating new arrays per call, as in the naive version) is what turns merge sort from O(n log n) time / O(n log n) allocations into O(n log n) time / O(n) total space.</div>`});

/* Problem 214 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q214 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 214 · MEDIUM</span>Kth Largest Element in a Stream</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Heap</span><span class="pill">Design</span></div>
<p class="dropcap">Design a class that finds the <code>k</code>th largest element in a growing stream of numbers (not the kth distinct). <code>KthLargest(int k, int[] nums)</code> initializes the object with the integer <code>k</code> and an initial stream of numbers. <code>int add(int val)</code> appends <code>val</code> to the stream and returns the current kth largest element.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: k = 3, nums = [4,5,8,2], then add(3), add(5), add(10), add(9), add(4)
Output: 4, 5, 5, 8, 8
Explanation: after add(3): stream {2,3,4,5,8}, 3rd largest = 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= k &lt;= 10⁴</li><li>0 &lt;= nums.length &lt;= 10⁴</li><li>-10⁴ &lt;= nums[i], val &lt;= 10⁴</li><li>At least k elements exist in the stream when add is first called.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep a min-heap capped at size k across the whole object's lifetime — its root is always the current kth largest, and each add only costs O(log k), unlike re-sorting the whole stream every call.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Store a min-heap capped at size k as instance state. The constructor offers every initial number (trimming the heap back to size k after each). <code>add</code> offers the new value, pops if the heap exceeds k, and returns <code>peek()</code> — the smallest of the top k, i.e. the kth largest overall.</p>
<pre class="code" data-lang="java"><code>class KthLargest {
    PriorityQueue&lt;Integer&gt; minHeap;
    int k;
    public KthLargest(int k, int[] nums) {
        this.k = k;
        minHeap = new PriorityQueue&lt;&gt;();
        for (int n : nums) add(n);
    }
    public int add(int val) {
        minHeap.offer(val);
        if (minHeap.size() &gt; k) minHeap.poll();
        return minHeap.peek();
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Init: <code>k=3, nums=[4,5,8,2]</code> → heap fills/trims to size 3: after 4,5,8,2 offered (trim &gt;3) → heap = [4,5,8]</p>
<table class="tbl">
<tr><th>call</th><th>heap after offer</th><th>size &gt; 3?</th><th>heap after trim</th><th>peek (return)</th></tr>
<tr><td>add(3)</td><td>[3,4,5,8]</td><td>yes</td><td>[4,5,8]</td><td>4</td></tr>
<tr><td>add(5)</td><td>[4,5,5,8]</td><td>yes</td><td>[5,5,8]</td><td>5</td></tr>
<tr><td>add(10)</td><td>[5,5,8,10]</td><td>yes</td><td>[5,8,10]</td><td>5</td></tr>
<tr><td>add(9)</td><td>[5,8,9,10]</td><td>yes</td><td>[8,9,10]</td><td>8</td></tr>
<tr><td>add(4)</td><td>[4,8,9,10]</td><td>yes</td><td>[8,9,10]</td><td>8</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log k) per add. Space: O(k) for the heap.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The static "Kth Largest in an Array" problem builds one heap once; this design variant persists the heap as object state so each streamed add stays cheap instead of re-scanning everything.</div>`});

/* Problem 215 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q215 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 215 · MEDIUM</span>Wiggle Sort II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sorting</span><span class="pill">Array</span></div>
<p class="dropcap">Given an integer array <code>nums</code>, reorder it in place so that <code>nums[0] &lt; nums[1] &gt; nums[2] &lt; nums[3]...</code> (strictly alternating, no equal adjacent elements).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
Explanation: 1&lt;6&gt;1&lt;5&gt;1&lt;4 — one of several valid answers.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 5×10⁴</li><li>0 &lt;= nums[i] &lt;= 5000</li><li>It is guaranteed that a valid answer exists.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort the array, then split the sorted values into a "smaller half" and a "larger half"; interleave them by placing the smaller half (reversed) at even indices and the larger half (reversed) at odd indices — reversing each half keeps equal values from landing adjacent.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort a copy of the array. Fill even indices (0,2,4,...) from the end of the lower half backward, and odd indices (1,3,5,...) from the end of the upper half backward. Placing larger values first (from the back of each half) at the smaller-index end of each group pushes any duplicate values apart, guaranteeing strict alternation.</p>
<pre class="code" data-lang="java"><code>public void wiggleSort(int[] nums) {
    int n = nums.length;
    int[] sorted = nums.clone();
    Arrays.sort(sorted);
    int mid = (n + 1) / 2;
    int lo = mid - 1, hi = n - 1;
    for (int i = 0; i &lt; n; i++) {
        nums[i] = (i % 2 == 0) ? sorted[lo--] : sorted[hi--];
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,5,1,1,6,4]</code>, n=6, sorted = [1,1,1,4,5,6], mid=3, lo=2, hi=5</p>
<table class="tbl">
<tr><th>i</th><th>even/odd</th><th>picked from sorted</th><th>nums[i]</th><th>lo/hi after</th></tr>
<tr><td>0</td><td>even</td><td>sorted[lo=2]=1</td><td>1</td><td>lo=1</td></tr>
<tr><td>1</td><td>odd</td><td>sorted[hi=5]=6</td><td>6</td><td>hi=4</td></tr>
<tr><td>2</td><td>even</td><td>sorted[lo=1]=1</td><td>1</td><td>lo=0</td></tr>
<tr><td>3</td><td>odd</td><td>sorted[hi=4]=5</td><td>5</td><td>hi=3</td></tr>
<tr><td>4</td><td>even</td><td>sorted[lo=0]=1</td><td>1</td><td>lo=-1</td></tr>
<tr><td>5</td><td>odd</td><td>sorted[hi=3]=4</td><td>4</td><td>hi=2</td></tr>
</table>
<p class="fs13">Result: <code>[1,6,1,5,1,4]</code> — check: 1&lt;6&gt;1&lt;5&gt;1&lt;4, all strict.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) for the sort. Space: O(n) for the sorted copy.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Filling even slots from the low half's tail and odd slots from the high half's tail is a "separate duplicates by index parity" trick — the median value (likeliest to repeat) ends up spread across both halves' boundary, never adjacent to itself.</div>`});

/* Problem 216 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q216 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 216 · MEDIUM</span>Sort Characters By Frequency</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sorting</span><span class="pill">Heap</span><span class="pill">Hash Table</span></div>
<p class="dropcap">Given a string <code>s</code>, sort it in decreasing order based on the frequency of characters, and return the sorted string. If multiple characters have the same frequency, they may appear in any order relative to each other.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice, 'r' and 't' once each; 'e' must come first.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 5×10⁵</li><li>s consists of uppercase/lowercase letters and digits.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Count frequencies with a HashMap, then either sort the distinct characters by frequency or bucket them by frequency (bucket sort) since frequency is bounded by string length.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Count each character's frequency into a map, then push every entry into a max-heap ordered by frequency. Repeatedly pop the most frequent character and append it that many times, until the heap is empty.</p>
<pre class="code" data-lang="java"><code>public String frequencySort(String s) {
    Map&lt;Character, Integer&gt; freq = new HashMap&lt;&gt;();
    for (char c : s.toCharArray()) freq.merge(c, 1, Integer::sum);

    PriorityQueue&lt;Character&gt; maxHeap =
        new PriorityQueue&lt;&gt;((a, b) -&gt; freq.get(b) - freq.get(a));
    maxHeap.addAll(freq.keySet());

    StringBuilder sb = new StringBuilder();
    while (!maxHeap.isEmpty()) {
        char c = maxHeap.poll();
        for (int i = 0; i &lt; freq.get(c); i++) sb.append(c);
    }
    return sb.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "tree"</code> — freq: t=1, r=1, e=2</p>
<table class="tbl">
<tr><th>heap order (by freq)</th><th>popped</th><th>appended</th><th>sb so far</th></tr>
<tr><td>[e(2), t(1), r(1)]</td><td>e</td><td>"ee" (2 times)</td><td>"ee"</td></tr>
<tr><td>[t(1), r(1)]</td><td>t</td><td>"t" (1 time)</td><td>"eet"</td></tr>
<tr><td>[r(1)]</td><td>r</td><td>"r" (1 time)</td><td>"eetr"</td></tr>
</table>
<p class="fs13">Result: <code>"eetr"</code> — any ordering of the tied t/r after ee is valid (e.g. "eert" too).</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n + d log d), d = distinct characters (d ≤ n). Space: O(n) for the output.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Since frequency is bounded by <code>s.length</code>, a bucket-sort (array of lists indexed by frequency, scanned from high to low) achieves this in O(n) time instead of O(d log d) — swap the heap for buckets when max performance matters.</div>`});

/* Problem 217 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q217 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 217 · MEDIUM</span>H-Index</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Sorting</span><span class="pill">Array</span></div>
<p class="dropcap">Given an array <code>citations</code> where <code>citations[i]</code> is the number of citations for the researcher's <code>i</code>th paper, return the researcher's h-index: the maximum value <code>h</code> such that the researcher has published at least <code>h</code> papers that have each been cited at least <code>h</code> times.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: citations = [3,0,6,1,5]
Output: 3
Explanation: 3 papers have &gt;= 3 citations each (6,5,3), and the remaining
2 papers have &lt;= 3 citations, so h = 3.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= citations.length &lt;= 5000</li><li>0 &lt;= citations[i] &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort descending: scan and find the last position where citations[i] &gt;= (position index + 1) — that count is the h-index. Sorting makes "at least h papers with at least h citations" a simple threshold crossing.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort citations descending. At index <code>i</code> (0-based), we've committed to <code>i+1</code> papers so far; if <code>citations[i] &gt;= i+1</code>, all i+1 of those papers qualify (since the array is sorted descending, everything before it is at least as large). Track the largest such <code>i+1</code>.</p>
<pre class="code" data-lang="java"><code>public int hIndex(int[] citations) {
    Integer[] c = Arrays.stream(citations).boxed().toArray(Integer[]::new);
    Arrays.sort(c, Collections.reverseOrder());
    int h = 0;
    for (int i = 0; i &lt; c.length; i++) {
        if (c[i] &gt;= i + 1) h = i + 1;
        else break;
    }
    return h;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>citations = [3,0,6,1,5]</code>, sorted descending = [6,5,3,1,0]</p>
<table class="tbl">
<tr><th>i</th><th>c[i]</th><th>i+1</th><th>c[i] &gt;= i+1?</th><th>h</th></tr>
<tr><td>0</td><td>6</td><td>1</td><td>yes</td><td>1</td></tr>
<tr><td>1</td><td>5</td><td>2</td><td>yes</td><td>2</td></tr>
<tr><td>2</td><td>3</td><td>3</td><td>yes</td><td>3</td></tr>
<tr><td>3</td><td>1</td><td>4</td><td>no</td><td>3 (break)</td></tr>
</table>
<p class="fs13">Loop breaks at i=3 (1 &lt; 4) — final h-index = <code>3</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) for the sort. Space: O(n) for the boxed copy (O(1) extra if sorting a primitive array in reverse manually).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>H-index is really a threshold-crossing search — once sorted, it can also be found with binary search in O(log n) after the sort, or in O(n) with counting-sort-style buckets capped at n, avoiding the comparison sort entirely.</div>`});

/* Problem 218 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q218 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 218 · EASY</span>Meeting Rooms</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Sorting</span><span class="pill">Intervals</span></div>
<p class="dropcap">Given an array of meeting time intervals <code>[start, end]</code>, determine if a person could attend all meetings (i.e. no two meetings overlap).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: intervals = [[0,30],[5,10],[15,20]]
Output: false
Explanation: [0,30] overlaps both [5,10] and [15,20].</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= intervals.length &lt;= 10⁴</li><li>0 &lt;= start &lt; end &lt;= 10⁶</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort meetings by start time; if any meeting starts before the previous one ends, the person can't attend both. One linear scan after sorting is all that's needed — no heap required.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort intervals by start time. Walk through consecutive pairs: if the current meeting's start is strictly less than the previous meeting's end, they overlap and attending all is impossible. If no such pair is found, return true.</p>
<pre class="code" data-lang="java"><code>public boolean canAttendMeetings(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -&gt; a[0] - b[0]);
    for (int i = 1; i &lt; intervals.length; i++) {
        if (intervals[i][0] &lt; intervals[i - 1][1]) return false;
    }
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>intervals = [[0,30],[5,10],[15,20]]</code>, sorted by start (already sorted)</p>
<table class="tbl">
<tr><th>i</th><th>intervals[i]</th><th>intervals[i-1]</th><th>start &lt; prev end?</th><th>result</th></tr>
<tr><td>1</td><td>[5,10]</td><td>[0,30]</td><td>5 &lt; 30 → yes</td><td>return false</td></tr>
</table>
<p class="fs13">Overlap detected immediately at i=1 — [5,10] starts before [0,30] ends. Output: <code>false</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) for the sort. Space: O(1) extra (O(log n)–O(n) for the sort itself, implementation-dependent).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is the "yes/no" sibling of Meeting Rooms II — no heap is needed because you only need to detect the first overlap, not count concurrent rooms; sort + single pass suffices.</div>`});

/* Problem 219 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q219 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 219 · MEDIUM</span>Find the Duplicate Number</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Binary Search</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given an array <code>nums</code> containing <code>n + 1</code> integers where each integer is in the range <code>[1, n]</code> inclusive, there is exactly one repeated number (possibly repeated more than once). Find it — without modifying the array, and using only O(1) extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,3,4,2,2]
Output: 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 10⁵</li><li>nums.length == n + 1</li><li>1 &lt;= nums[i] &lt;= n</li><li>Exactly one integer appears more than once (at least twice), the rest exactly once.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Treat the array as a function <code>f(i) = nums[i]</code> mapping indices to values — the duplicate value creates a cycle, so this becomes Floyd's cycle-detection ("tortoise and hare"), the same trick used to detect a cycle in a linked list.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>View <code>nums</code> as a linked list where node <code>i</code> points to node <code>nums[i]</code>. Because a value repeats, this "list" has a cycle, and the cycle's entry point is exactly the duplicate number. Phase 1: move slow one step (<code>slow = nums[slow]</code>) and fast two steps (<code>fast = nums[nums[fast]]</code>) until they meet inside the cycle. Phase 2: reset one pointer to the start; advance both one step at a time — they meet at the cycle's entrance, the duplicate.</p>
<pre class="code" data-lang="java"><code>public int findDuplicate(int[] nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,3,4,2,2]</code> (indices 0-4)</p>
<table class="tbl">
<tr><th>phase</th><th>step</th><th>slow</th><th>fast</th></tr>
<tr><td>1</td><td>init</td><td>nums[0]=1</td><td>nums[0]=1</td></tr>
<tr><td>1</td><td>1</td><td>nums[1]=3</td><td>nums[nums[1]]=nums[3]=2</td></tr>
<tr><td>1</td><td>2</td><td>nums[3]=2</td><td>nums[nums[2]]=nums[4]=2</td></tr>
<tr><td>1</td><td>meet</td><td>2</td><td>2 — slow==fast, exit phase 1</td></tr>
<tr><td>2</td><td>reset slow=nums[0]=1</td><td>1</td><td>2</td></tr>
<tr><td>2</td><td>step</td><td>nums[1]=3</td><td>nums[2]=4</td></tr>
<tr><td>2</td><td>step</td><td>nums[3]=2</td><td>nums[4]=2</td></tr>
<tr><td>2</td><td>meet</td><td>2</td><td>2 — return 2</td></tr>
</table>
<p class="fs13">Both pointers converge on <code>2</code> — the duplicate.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) — no modification, no extra structures.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Array where values are indices" is a disguised linked list — whenever a problem bans extra space and array mutation but a repeated/missing value is involved, check whether Floyd's cycle detection applies.</div>`});

/* Problem 220 */
B.spread(
{ kicker: 'DSA · SORTING & SEARCHING', head: 'Q220 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 220 · EASY</span>Relative Sort Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Sorting</span><span class="pill">Array</span></div>
<p class="dropcap">Given two arrays <code>arr1</code> and <code>arr2</code>, where <code>arr2</code>'s elements are distinct and each also appears in <code>arr1</code>, sort <code>arr1</code> so that items appear in the relative order defined by <code>arr2</code>. Elements not present in <code>arr2</code> go at the end, sorted ascending.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= arr1.length, arr2.length &lt;= 1000</li><li>0 &lt;= arr1[i], arr2[i] &lt;= 1000</li><li>All elements of arr2 are distinct and each appears in arr1.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Build a custom comparator: map each value in arr2 to its rank; anything not in arr2 gets a rank of "infinity" (sorted after everything, by actual value). Sort arr1 with that comparator.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Map each value in <code>arr2</code> to its index (its desired rank). Sort <code>arr1</code> with a comparator: if both values have a rank, compare ranks; if only one has a rank, it comes first; if neither has a rank, compare the raw values (natural ascending order) for the trailing "leftover" group.</p>
<pre class="code" data-lang="java"><code>public int[] relativeSortArray(int[] arr1, int[] arr2) {
    Map&lt;Integer, Integer&gt; rank = new HashMap&lt;&gt;();
    for (int i = 0; i &lt; arr2.length; i++) rank.put(arr2[i], i);

    Integer[] boxed = Arrays.stream(arr1).boxed().toArray(Integer[]::new);
    Arrays.sort(boxed, (a, b) -&gt; {
        boolean inA = rank.containsKey(a), inB = rank.containsKey(b);
        if (inA &amp;&amp; inB) return rank.get(a) - rank.get(b);
        if (inA) return -1;
        if (inB) return 1;
        return a - b;
    });
    for (int i = 0; i &lt; arr1.length; i++) arr1[i] = boxed[i];
    return arr1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]</code></p>
<p class="fs13">rank map: 2→0, 1→1, 4→2, 3→3, 9→4, 6→5</p>
<table class="tbl">
<tr><th>group</th><th>values</th><th>sort key</th><th>ordered</th></tr>
<tr><td>ranked (in arr2)</td><td>2,2,2,1,4,3,3,9,6</td><td>by rank (2:0, 1:1, 4:2, 3:3, 9:4, 6:5)</td><td>2,2,2,1,4,3,3,9,6</td></tr>
<tr><td>unranked (not in arr2)</td><td>7,19</td><td>by value ascending</td><td>7,19</td></tr>
<tr><td>combined</td><td>—</td><td>ranked group, then unranked group</td><td>2,2,2,1,4,3,3,9,6,7,19</td></tr>
</table>
<p class="fs13">Result: <code>[2,2,2,1,4,3,3,9,6,7,19]</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n + m) for the sort plus building the rank map (m = arr2.length). Space: O(n + m).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Since values are bounded (0–1000), a counting-sort variant (count occurrences, emit ranked values in arr2's order, then emit remaining values ascending) solves this in O(n + range) time, avoiding the comparator entirely.</div>`});

})();
