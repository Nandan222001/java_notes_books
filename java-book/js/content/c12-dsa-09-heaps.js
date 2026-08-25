/* ===== CHAPTER 40 · DSA: Heaps & Priority Queue ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 40, 'DSA: Heaps & Priority Queue');

/* Problem 081 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q081 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 081 · MEDIUM</span>Kth Largest Element in an Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Heap</span></div>
<p class="dropcap">Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>th largest element in the array (the kth largest in sorted order, not the kth distinct element).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Explanation: sorted descending is [6,5,4,3,2,1]; the 2nd largest is 5</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= k &lt;= nums.length &lt;= 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>You don't need to fully sort — a min-heap of size k tracks exactly the k largest elements seen so far.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain a min-heap capped at size k. Push every element; whenever the heap exceeds size k, pop the smallest. After processing everything, the heap's root is the kth largest.</p>
<pre class="code" data-lang="java"><code>public int findKthLargest(int[] nums, int k) {
    PriorityQueue&lt;Integer&gt; minHeap = new PriorityQueue&lt;&gt;();
    for (int n : nums) {
        minHeap.offer(n);
        if (minHeap.size() &gt; k) minHeap.poll();
    }
    return minHeap.peek();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [3,2,1,5,6,4], k = 2</code></p>
<table class="tbl">
<tr><th>n</th><th>heap after offer</th><th>size &gt; k?</th><th>heap after poll (if any)</th></tr>
<tr><td>3</td><td>[3]</td><td>no</td><td>[3]</td></tr>
<tr><td>2</td><td>[2,3]</td><td>no</td><td>[2,3]</td></tr>
<tr><td>1</td><td>[1,2,3]</td><td>yes</td><td>[2,3]</td></tr>
<tr><td>5</td><td>[2,3,5]</td><td>yes</td><td>[3,5]</td></tr>
<tr><td>6</td><td>[3,5,6]</td><td>yes</td><td>[5,6]</td></tr>
<tr><td>4</td><td>[4,5,6]</td><td>yes</td><td>[5,6]</td></tr>
</table>
<p class="fs13">Final heap root (smallest of the top 2) = <code>5</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log k). Space: O(k).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A size-capped min-heap is the standard tool for "top k largest" — it never needs to hold more than k elements at once.</div>`});

/* Problem 082 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q082 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 082 · EASY</span>Last Stone Weight</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Heap</span><span class="pill">Simulation</span></div>
<p class="dropcap">You have an array of stone weights. Repeatedly pick the two heaviest stones, smash them together: if they're equal both are destroyed, otherwise the lighter stone is destroyed and the heavier one loses weight equal to the lighter one's. Return the weight of the last stone left, or <code>0</code> if none remain.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 7&amp;8 -&gt; 1 leaves [2,4,1,1,1]; 4&amp;2 -&gt; 2 leaves [2,1,1,1];
2&amp;1 -&gt; 1 leaves [1,1,1]; 1&amp;1 -&gt; 0 leaves [1]. Answer: 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= stones.length &lt;= 30</li><li>1 &lt;= stones[i] &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>"Always grab the two largest" screams max-heap — Java's PriorityQueue is a min-heap by default, so invert the comparator or negate the values.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Load every stone into a max-heap. While at least two stones remain, poll the two largest, and if their difference is nonzero push it back. When at most one stone remains, that's the answer (or 0 if empty).</p>
<pre class="code" data-lang="java"><code>public int lastStoneWeight(int[] stones) {
    PriorityQueue&lt;Integer&gt; maxHeap = new PriorityQueue&lt;&gt;(Collections.reverseOrder());
    for (int s : stones) maxHeap.offer(s);
    while (maxHeap.size() &gt; 1) {
        int a = maxHeap.poll();
        int b = maxHeap.poll();
        if (a != b) maxHeap.offer(a - b);
    }
    return maxHeap.isEmpty() ? 0 : maxHeap.peek();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>stones = [2,7,4,1,8,1]</code></p>
<table class="tbl">
<tr><th>step</th><th>heap before</th><th>a, b polled</th><th>pushed back</th><th>heap after</th></tr>
<tr><td>1</td><td>[8,7,4,2,1,1]</td><td>8, 7</td><td>1</td><td>[4,2,1,1,1]</td></tr>
<tr><td>2</td><td>[4,2,1,1,1]</td><td>4, 2</td><td>2</td><td>[2,1,1,1]</td></tr>
<tr><td>3</td><td>[2,1,1,1]</td><td>2, 1</td><td>1</td><td>[1,1,1]</td></tr>
<tr><td>4</td><td>[1,1,1]</td><td>1, 1</td><td>none (equal)</td><td>[1]</td></tr>
</table>
<p class="fs13">Heap size is now 1 -&gt; return <code>1</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — each of the n smashes does two O(log n) heap ops. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Repeatedly combine the two extreme elements" is the max-heap simulation pattern — the same shape reappears in Huffman-style merge-cost problems.</div>`});

/* Problem 083 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q083 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 083 · MEDIUM</span>K Closest Points to Origin</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Heap</span><span class="pill">Array</span></div>
<p class="dropcap">Given an array of points on the X-Y plane and an integer <code>k</code>, return the <code>k</code> points closest to the origin <code>(0, 0)</code>, in any order. Distance is the usual Euclidean distance.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation: dist([1,3]) = sqrt(10) ≈ 3.16, dist([-2,2]) = sqrt(8) ≈ 2.83
[-2,2] is closer, so it's the 1 closest point.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= k &lt;= points.length &lt;= 10⁴</li><li>-10⁴ &lt;= x, y &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Skip the square root — comparing squared distances gives the same ordering and avoids floating point. Use a max-heap of size k, same shape as Kth Largest.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep a max-heap (ordered by squared distance, farthest on top) capped at size k. Offer every point; whenever the heap exceeds k, pop the farthest. What remains are the k closest points.</p>
<pre class="code" data-lang="java"><code>public int[][] kClosest(int[][] points, int k) {
    PriorityQueue&lt;int[]&gt; maxHeap = new PriorityQueue&lt;&gt;(
        (a, b) -&gt; (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1]));
    for (int[] p : points) {
        maxHeap.offer(p);
        if (maxHeap.size() &gt; k) maxHeap.poll();
    }
    return maxHeap.toArray(new int[k][]);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>points = [[3,3],[5,-1],[-2,4]], k = 2</code></p>
<table class="tbl">
<tr><th>point</th><th>dist²</th><th>heap after offer (by dist²)</th><th>size &gt; k?</th><th>heap after poll</th></tr>
<tr><td>[3,3]</td><td>18</td><td>[(18)]</td><td>no</td><td>[(18)]</td></tr>
<tr><td>[5,-1]</td><td>26</td><td>[(26),(18)]</td><td>no</td><td>[(26),(18)]</td></tr>
<tr><td>[-2,4]</td><td>20</td><td>[(26),(18),(20)]</td><td>yes</td><td>[(20),(18)]</td></tr>
</table>
<p class="fs13">Remaining: <code>[-2,4]</code> (dist² 20) and <code>[3,3]</code> (dist² 18)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log k). Space: O(k).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"k closest" uses a max-heap to evict the farthest, while "k largest" uses a min-heap to evict the smallest — the eviction direction always opposes what you're keeping.</div>`});

/* Problem 084 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q084 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 084 · HARD</span>Find Median from Data Stream</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Heap</span><span class="pill">Design</span></div>
<p class="dropcap">Design a data structure that supports adding integers from a stream one at a time and, at any point, returning the median of all elements added so far.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>addNum(1); addNum(2);
findMedian() -&gt; 1.5   // {1,2}
addNum(3);
findMedian() -&gt; 2.0   // {1,2,3}</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>-10⁵ &lt;= num &lt;= 10⁵</li><li>Up to 5×10⁴ calls total to addNum and findMedian.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Split the stream across two heaps: a max-heap for the smaller half, a min-heap for the larger half. Keep them balanced in size — the median lives at the boundary.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>lo</code> is a max-heap holding the smaller half; <code>hi</code> is a min-heap holding the larger half, sizes never differing by more than 1. Every new number goes into <code>lo</code> first, then its max is shifted into <code>hi</code> to keep order; if <code>hi</code> outgrows <code>lo</code>, shift its min back. The median is <code>lo.peek()</code> (odd total) or the average of both peeks (even total).</p>
<pre class="code" data-lang="java"><code>class MedianFinder {
    PriorityQueue&lt;Integer&gt; lo = new PriorityQueue&lt;&gt;(Collections.reverseOrder());
    PriorityQueue&lt;Integer&gt; hi = new PriorityQueue&lt;&gt;();

    public void addNum(int num) {
        lo.offer(num);
        hi.offer(lo.poll());
        if (hi.size() &gt; lo.size()) lo.offer(hi.poll());
    }

    public double findMedian() {
        if (lo.size() &gt; hi.size()) return lo.peek();
        return (lo.peek() + hi.peek()) / 2.0;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Stream: <code>addNum(5), addNum(15), addNum(1), addNum(3)</code></p>
<table class="tbl">
<tr><th>num</th><th>lo (max-heap)</th><th>hi (min-heap)</th><th>median</th></tr>
<tr><td>5</td><td>[5]</td><td>[]</td><td>5</td></tr>
<tr><td>15</td><td>[5]</td><td>[15]</td><td>10.0</td></tr>
<tr><td>1</td><td>[1,5]</td><td>[15]</td><td>5</td></tr>
<tr><td>3</td><td>[1,3]</td><td>[5,15]</td><td>4.0</td></tr>
</table>
<p class="fs13">Trace for num=1: offer 1 into lo -&gt; lo=[1,5]; poll lo's max (5) into hi -&gt; hi=[5,15]; hi.size(2) &gt; lo.size(1), so shift hi's min (5) back -&gt; lo=[1,5], hi=[15].</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n) per addNum, O(1) per findMedian. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The "two heaps, balanced at the middle" pattern is the go-to design whenever a running statistic needs the middle of a growing stream, not just its extremes.</div>`});

/* Problem 085 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q085 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 085 · MEDIUM</span>Task Scheduler</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Heap</span><span class="pill">Greedy</span></div>
<p class="dropcap">Given an array of CPU tasks (each a letter) and a cooldown <code>n</code>, where the same task must be separated by at least <code>n</code> intervals, find the minimum number of intervals (including idle slots) needed to finish all tasks.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A -&gt; B -&gt; idle -&gt; A -&gt; B -&gt; idle -&gt; A -&gt; B</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= tasks.length &lt;= 10⁴</li><li>tasks[i] is an uppercase English letter.</li><li>0 &lt;= n &lt;= 100</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Greedily schedule the most frequent remaining task first — a max-heap on frequency naturally gives you that at every step.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Count task frequencies, load them into a max-heap. Simulate in chunks of <code>n+1</code> slots: each round, pop up to <code>n+1</code> of the currently most-frequent tasks, decrement their counts, and hold the ones still &gt; 0 in a waiting list to re-offer after the round. Count every slot used, including idle ones, until the heap and waiting list are both empty.</p>
<pre class="code" data-lang="java"><code>public int leastInterval(char[] tasks, int n) {
    int[] freq = new int[26];
    for (char t : tasks) freq[t - 'A']++;
    PriorityQueue&lt;Integer&gt; maxHeap = new PriorityQueue&lt;&gt;(Collections.reverseOrder());
    for (int f : freq) if (f &gt; 0) maxHeap.offer(f);

    int time = 0;
    while (!maxHeap.isEmpty()) {
        List&lt;Integer&gt; waiting = new ArrayList&lt;&gt;();
        int slots = n + 1;
        while (slots &gt; 0 &amp;&amp; (!maxHeap.isEmpty() || !waiting.isEmpty())) {
            if (!maxHeap.isEmpty()) {
                int cnt = maxHeap.poll() - 1;
                if (cnt &gt; 0) waiting.add(cnt);
            }
            time++;
            slots--;
        }
        maxHeap.addAll(waiting);
    }
    return time;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>tasks = ["A","A","A","B","B","B"], n = 2</code> — freq A=3, B=3</p>
<table class="tbl">
<tr><th>round</th><th>heap start</th><th>tasks placed (3 slots)</th><th>time after</th><th>heap end of round</th></tr>
<tr><td>1</td><td>[3,3] (A,B)</td><td>A(3-&gt;2), B(3-&gt;2), idle</td><td>3</td><td>[2,2]</td></tr>
<tr><td>2</td><td>[2,2]</td><td>A(2-&gt;1), B(2-&gt;1), idle</td><td>6</td><td>[1,1]</td></tr>
<tr><td>3</td><td>[1,1]</td><td>A(1-&gt;0), B(1-&gt;0)</td><td>8</td><td>[]</td></tr>
</table>
<p class="fs13">Round 3 needs only 2 slots since nothing remains after — heap and waiting list both empty, loop ends. Total time = <code>8</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(T) where T is total intervals (at most 26 distinct task types bounds the heap work). Space: O(1) — at most 26 heap entries.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Always schedule the currently-most-frequent task — a greedy choice provably optimal here — and a max-heap is exactly the structure that hands you "most frequent" for free at every step.</div>`});

/* Problem 086 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q086 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 086 · MEDIUM</span>Reorganize String</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Heap</span><span class="pill">Greedy</span><span class="pill">String</span></div>
<p class="dropcap">Given a string <code>s</code>, rearrange its characters so that no two adjacent characters are the same. Return any valid rearrangement, or an empty string if none is possible.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "aab"
Output: "aba"
Explanation: "aab" itself is invalid (two a's adjacent); "aba" separates them.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 500</li><li>s consists of lowercase English letters only.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Always place the currently most frequent remaining character, but never let it repeat back-to-back — hold the just-used character out of the heap for one round.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Count frequencies, load non-zero ones into a max-heap. Repeatedly pop the most frequent character and append it; hold the previously-appended character back for exactly one turn, then re-offer it if it still has count left. If at any point the heap is empty but a held character still needs placing, no valid arrangement exists.</p>
<pre class="code" data-lang="java"><code>public String reorganizeString(String s) {
    int[] freq = new int[26];
    for (char c : s.toCharArray()) freq[c - 'a']++;
    PriorityQueue&lt;int[]&gt; maxHeap = new PriorityQueue&lt;&gt;((a, b) -&gt; b[1] - a[1]);
    for (int i = 0; i &lt; 26; i++) if (freq[i] &gt; 0) maxHeap.offer(new int[]{i, freq[i]});

    StringBuilder sb = new StringBuilder();
    int[] prev = null;
    while (!maxHeap.isEmpty()) {
        int[] cur = maxHeap.poll();
        sb.append((char) ('a' + cur[0]));
        cur[1]--;
        if (prev != null &amp;&amp; prev[1] &gt; 0) maxHeap.offer(prev);
        prev = cur;
    }
    return sb.length() == s.length() ? sb.toString() : "";
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "aab"</code> — freq a=2, b=1</p>
<table class="tbl">
<tr><th>step</th><th>heap before</th><th>popped (char,cnt)</th><th>appended</th><th>prev re-offered?</th></tr>
<tr><td>1</td><td>[(a,2),(b,1)]</td><td>(a,2)-&gt;(a,1)</td><td>"a"</td><td>prev=null, no</td></tr>
<tr><td>2</td><td>[(b,1)]</td><td>(b,1)-&gt;(b,0)</td><td>"ab"</td><td>yes, (a,1) offered</td></tr>
<tr><td>3</td><td>[(a,1)]</td><td>(a,1)-&gt;(a,0)</td><td>"aba"</td><td>(b,0) not re-offered</td></tr>
</table>
<p class="fs13">Heap empty, sb.length()=3 = s.length() -&gt; result <code>"aba"</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log 26) ≈ O(n). Space: O(1) extra beyond the output (at most 26 heap entries).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The "hold the last-used item out for one round" trick generalizes Task Scheduler's idea to string rearrangement — both stem from the same greedy-most-frequent-first family.</div>`});

/* Problem 087 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q087 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 087 · MEDIUM</span>Ugly Number II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Heap</span><span class="pill">Math</span></div>
<p class="dropcap">An ugly number is a positive integer whose only prime factors are 2, 3, and 5. Given an integer <code>n</code>, return the <code>n</code>th ugly number (1 is conventionally the 1st ugly number).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 10
Output: 12
Explanation: [1,2,3,4,5,6,8,9,10,12] are the first 10 ugly numbers.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 1690</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every ugly number, except 1, is 2, 3, or 5 times a smaller ugly number. Generate candidates with a min-heap and a visited set to avoid duplicates like 2×3 and 3×2.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Seed a min-heap with 1. Repeatedly pop the smallest value — that's the next ugly number in order — and push its ×2, ×3, ×5 multiples if not already seen (a HashSet blocks duplicates such as 6 arriving from both 2×3 and 3×2). After popping n times, the popped value is the answer.</p>
<pre class="code" data-lang="java"><code>public int nthUglyNumber(int n) {
    PriorityQueue&lt;Long&gt; minHeap = new PriorityQueue&lt;&gt;();
    Set&lt;Long&gt; seen = new HashSet&lt;&gt;();
    int[] factors = {2, 3, 5};
    minHeap.offer(1L);
    seen.add(1L);
    long ugly = 1;
    for (int i = 0; i &lt; n; i++) {
        ugly = minHeap.poll();
        for (int f : factors) {
            long next = ugly * f;
            if (seen.add(next)) minHeap.offer(next);
        }
    }
    return (int) ugly;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 7</code></p>
<table class="tbl">
<tr><th>pop #</th><th>popped (ugly)</th><th>new pushes (×2,×3,×5)</th><th>heap after (sorted)</th></tr>
<tr><td>1</td><td>1</td><td>2,3,5</td><td>[2,3,5]</td></tr>
<tr><td>2</td><td>2</td><td>4,6,10</td><td>[3,4,5,6,10]</td></tr>
<tr><td>3</td><td>3</td><td>6(dup),9,15</td><td>[4,5,6,9,10,15]</td></tr>
<tr><td>4</td><td>4</td><td>8,12,20</td><td>[5,6,8,9,10,12,15,20]</td></tr>
<tr><td>5</td><td>5</td><td>10(dup),15(dup),25</td><td>[6,8,9,10,12,15,20,25]</td></tr>
<tr><td>6</td><td>6</td><td>12(dup),18,30</td><td>[8,9,10,12,15,18,20,25,30]</td></tr>
<tr><td>7</td><td>8</td><td>16,24,40</td><td>[9,10,12,15,16,18,20,24,25,30,40]</td></tr>
</table>
<p class="fs13">7th popped value = <code>8</code> (the 7th ugly number).</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — up to 3 pushes per pop, each O(log n). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Generate candidates from what you've already confirmed" via a min-heap is the same engine behind Super Ugly Number and k-th smallest product problems — dedupe with a seen-set to keep it correct.</div>`});

/* Problem 088 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q088 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 088 · HARD</span>Smallest Range Covering Elements from K Lists</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Heap</span><span class="pill">Sliding Window</span></div>
<p class="dropcap">You have <code>k</code> lists of sorted integers. Find the smallest range <code>[a, b]</code> such that at least one number from each of the <code>k</code> lists falls inside <code>[a, b]</code>. If multiple ranges tie on length, return the one with the smaller <code>a</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 20 from list2, 24 from list1, 22 from list3 all lie in [20,24].</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>nums.length == k, 1 &lt;= k &lt;= 3500</li><li>Each list is sorted ascending.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep one pointer per list, one element from each in a min-heap. The heap's min and the running max of included elements bound a valid range — always advance the pointer of whichever list holds the current minimum.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Push the first element of every list into a min-heap as <code>{value, listIndex, elementIndex}</code>, tracking the current max across all pushed elements. At each step, the heap's min and the tracked max form a candidate range covering all k lists; record it if it beats the best so far. Pop the min, advance that list's pointer, push its next element and update max — stop when any list is exhausted.</p>
<pre class="code" data-lang="java"><code>public int[] smallestRange(List&lt;List&lt;Integer&gt;&gt; nums) {
    PriorityQueue&lt;int[]&gt; minHeap = new PriorityQueue&lt;&gt;((a, b) -&gt; a[0] - b[0]);
    int max = Integer.MIN_VALUE;
    for (int i = 0; i &lt; nums.size(); i++) {
        minHeap.offer(new int[]{nums.get(i).get(0), i, 0});
        max = Math.max(max, nums.get(i).get(0));
    }
    int[] best = {minHeap.peek()[0], max};
    while (true) {
        int[] top = minHeap.poll();
        int list = top[1], idx = top[2];
        if (max - top[0] &lt; best[1] - best[0]) best = new int[]{top[0], max};
        if (idx + 1 == nums.get(list).size()) break;
        int next = nums.get(list).get(idx + 1);
        minHeap.offer(new int[]{next, list, idx + 1});
        max = Math.max(max, next);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]</code> — init heap {4(L0),0(L1),5(L2)}, max=5, best=[0,5] (len5)</p>
<table class="tbl">
<tr><th>step</th><th>popped (val, list)</th><th>max at that point</th><th>candidate range (len)</th><th>best after</th></tr>
<tr><td>1</td><td>(0, L1)</td><td>5</td><td>[0,5] (5)</td><td>[0,5] — not shorter</td></tr>
<tr><td>2</td><td>(4, L0)</td><td>9</td><td>[4,9] (5)</td><td>[0,5] — not shorter</td></tr>
<tr><td>3</td><td>(5, L2)</td><td>10</td><td>[5,10] (5)</td><td>[0,5] — not shorter</td></tr>
<tr><td>4</td><td>(9, L1)</td><td>18</td><td>[9,18] (9)</td><td>[0,5] — not shorter</td></tr>
<tr><td>5</td><td>(10, L0)</td><td>18</td><td>[10,18] (8)</td><td>[0,5] — not shorter</td></tr>
<tr><td>6</td><td>(12, L1)</td><td>18</td><td>[12,18] (6)</td><td>[0,5] — not shorter</td></tr>
<tr><td>7</td><td>(15, L0)</td><td>20</td><td>[15,20] (5)</td><td>[0,5] — not shorter</td></tr>
<tr><td>8</td><td>(18, L2)</td><td>24</td><td>[18,24] (6)</td><td>[0,5] — not shorter</td></tr>
<tr><td>9</td><td>(20, L1)</td><td>24</td><td>[20,24] (4)</td><td><b>[20,24]</b> — L1 exhausted, stop</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(N log k), N = total elements across all lists. Space: O(k).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Merging k sorted streams with a min-heap while tracking a running max turns "cover one from each list" into a moving window — advance only the pointer behind the current minimum, since it's the only one that can shrink the range.</div>`});

/* Problem 089 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q089 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 089 · MEDIUM</span>Meeting Rooms II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Heap</span><span class="pill">Intervals</span><span class="pill">Greedy</span></div>
<p class="dropcap">Given an array of meeting time intervals <code>[start, end]</code>, find the minimum number of conference rooms required so that no two overlapping meetings share a room.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
Explanation: [0,30] overlaps both others, but [5,10] and [15,20] don't
overlap each other, so they can share a second room.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= intervals.length &lt;= 10⁴</li><li>0 &lt;= start &lt; end &lt;= 10⁶</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort meetings by start time. Track room end-times in a min-heap: for each new meeting, if the earliest-ending room is already free (its end &lt;= this start), reuse it; otherwise allocate a new room.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort meetings by start time. A min-heap holds the end times of rooms currently in use. For each meeting, if the heap's smallest end time is <code>&lt;=</code> this meeting's start, that room has freed up — pop it (reuse) then push the new end time; otherwise push the new end time without popping (a fresh room). The heap's final size is the room count.</p>
<pre class="code" data-lang="java"><code>public int minMeetingRooms(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -&gt; a[0] - b[0]);
    PriorityQueue&lt;Integer&gt; endTimes = new PriorityQueue&lt;&gt;();
    for (int[] m : intervals) {
        if (!endTimes.isEmpty() &amp;&amp; endTimes.peek() &lt;= m[0]) {
            endTimes.poll();
        }
        endTimes.offer(m[1]);
    }
    return endTimes.size();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input (sorted by start): <code>[[0,30],[5,10],[15,20]]</code></p>
<table class="tbl">
<tr><th>meeting</th><th>heap min end</th><th>min &lt;= start?</th><th>action</th><th>heap after</th></tr>
<tr><td>[0,30]</td><td>— (empty)</td><td>n/a</td><td>new room, push 30</td><td>[30]</td></tr>
<tr><td>[5,10]</td><td>30</td><td>30&lt;=5? no</td><td>new room, push 10</td><td>[10,30]</td></tr>
<tr><td>[15,20]</td><td>10</td><td>10&lt;=15? yes</td><td>reuse: pop 10, push 20</td><td>[20,30]</td></tr>
</table>
<p class="fs13">Final heap size = <code>2</code> rooms.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — sort plus n heap operations. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The heap always holds exactly "rooms currently occupied" — its peek is the room that frees up soonest, so checking just the peek (not the whole heap) is enough to decide reuse vs. new room.</div>`});

/* Problem 090 */
B.spread(
{ kicker: 'DSA · HEAPS & PRIORITY QUEUE', head: 'Q090 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 090 · HARD</span>IPO (Maximize Capital)</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Heap</span><span class="pill">Greedy</span></div>
<p class="dropcap">You have initial capital <code>w</code> and can complete at most <code>k</code> distinct projects. Project <code>i</code> needs capital <code>capital[i]</code> to start and yields pure profit <code>profit[i]</code> on completion (added to your capital). Pick up to <code>k</code> projects, in any order, to maximize final capital.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: Start with w=0, only project0 (needs 0) is affordable; profit 1
brings w to 1. Now project1 and project2 (needs 1) are affordable; pick the
higher-profit one, project2 (profit 3), for w = 4. k=2 projects used.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= k &lt;= 10⁵</li><li>0 &lt;= w &lt;= 10⁹</li><li>profit.length == capital.length &lt;= 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort projects by required capital. At each of the k rounds, among all projects you can currently afford, greedily pick the one with the highest profit — a max-heap on profit, refilled as capital grows, gives you that instantly.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort projects by required capital ascending. Use a pointer to push every project affordable at the current capital into a max-heap keyed on profit. Repeat k times: push all newly-affordable projects, pop the highest-profit one and add it to capital (skip the round if the heap is empty — nothing affordable). Return the final capital.</p>
<pre class="code" data-lang="java"><code>public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
    int n = profits.length;
    int[][] projects = new int[n][2];
    for (int i = 0; i &lt; n; i++) projects[i] = new int[]{capital[i], profits[i]};
    Arrays.sort(projects, (a, b) -&gt; a[0] - b[0]);

    PriorityQueue&lt;Integer&gt; maxProfit = new PriorityQueue&lt;&gt;(Collections.reverseOrder());
    int i = 0;
    for (int round = 0; round &lt; k; round++) {
        while (i &lt; n &amp;&amp; projects[i][0] &lt;= w) {
            maxProfit.offer(projects[i][1]);
            i++;
        }
        if (maxProfit.isEmpty()) break;
        w += maxProfit.poll();
    }
    return w;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>k=2, w=0</code>, projects sorted by capital: <code>(cap=0,profit=1), (cap=1,profit=2), (cap=1,profit=3)</code></p>
<table class="tbl">
<tr><th>round</th><th>w before</th><th>newly affordable pushed</th><th>heap</th><th>popped profit</th><th>w after</th></tr>
<tr><td>1</td><td>0</td><td>(cap0,profit1)</td><td>[1]</td><td>1</td><td>1</td></tr>
<tr><td>2</td><td>1</td><td>(cap1,profit2), (cap1,profit3)</td><td>[3,2]</td><td>3</td><td>4</td></tr>
</table>
<p class="fs13">k rounds complete -&gt; final capital = <code>4</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) for the sort plus O(n log n) for heap ops across all rounds. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Two-pointer-into-heap is a durable combo: sort to control eligibility, heap to instantly grab the best among everything currently eligible — the same shape solves "job scheduling with prerequisites" style problems.</div>`});

})();
