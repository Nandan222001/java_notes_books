/* ===== CHAPTER 46 · DSA: Greedy & Intervals ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 46, 'DSA: Greedy & Intervals');

/* Problem 141 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q141 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 141 · MEDIUM</span>Jump Game II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Greedy</span></div>
<p class="dropcap">Given an array <code>nums</code> where <code>nums[i]</code> is the max jump length from index i, return the MINIMUM number of jumps to reach the last index. You are guaranteed you can always reach it.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [2,3,1,1,4]
Output: 2
Explanation: jump 1 step from index 0 to 1, then 3 steps to the last index</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Think in terms of "levels" like BFS: track the farthest index reachable from the current jump's range, and increment the jump count each time you must move to the next range.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Track <code>curEnd</code> (the boundary of the current jump's reachable range) and <code>farthest</code> (the best reach seen while scanning within that range). When the scan index reaches <code>curEnd</code>, a jump is forced: increment the count and extend <code>curEnd</code> to <code>farthest</code>.</p>
<pre class="code" data-lang="java"><code>public int jump(int[] nums) {
    int jumps = 0, curEnd = 0, farthest = 0;
    for (int i = 0; i &lt; nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i == curEnd) {
            jumps++;
            curEnd = farthest;
        }
    }
    return jumps;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [2,3,1,1,4]</code></p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>farthest</th><th>i==curEnd?</th><th>jumps, curEnd after</th></tr>
<tr><td>0</td><td>2</td><td>2</td><td>yes (curEnd=0)</td><td>jumps=1, curEnd=2</td></tr>
<tr><td>1</td><td>3</td><td>4</td><td>no</td><td>jumps=1, curEnd=2</td></tr>
<tr><td>2</td><td>1</td><td>4</td><td>yes (curEnd=2)</td><td>jumps=2, curEnd=4</td></tr>
<tr><td>3</td><td>1</td><td>4</td><td>no</td><td>jumps=2, curEnd=4</td></tr>
</table>
<p class="fs13">Loop stops at i=4 (length-1) -&gt; <code>jumps = 2</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one pass. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is BFS "level by level" reasoning without an actual queue — each forced boundary crossing is one BFS level, i.e. one jump.</div>`});

/* Problem 142 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q142 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 142 · MEDIUM</span>Gas Station</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Greedy</span></div>
<p class="dropcap">There are <code>n</code> gas stations along a circular route. <code>gas[i]</code> is the fuel available at station i; <code>cost[i]</code> is the fuel needed to travel from station i to station i+1 (station n-1 wraps back to station 0). Starting with an empty tank at some station, return the starting index that lets you travel the whole circuit once, or <code>-1</code> if impossible. The answer is guaranteed unique if it exists.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation: starting at station 3, the tank never goes negative on the
full loop: 4-1, 5-2, 1-3, 2-4, 3-5 (wrapping) all stay non-negative</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == gas.length == cost.length</li><li>1 &lt;= n &lt;= 10⁵</li><li>0 &lt;= gas[i], cost[i] &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>If total gas is less than total cost, no answer exists. Otherwise, the moment a running tank goes negative starting from some candidate, none of the stations between the last reset and that failure point can be the answer either — jump the candidate straight past the failure.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Scan once, tracking a running <code>curTank</code>. The instant <code>curTank</code> dips below zero, every station from the current candidate start up through here would fail at least as badly (each starts with less slack), so discard them all and retry from <code>i+1</code> with a reset tank. A separate <code>totalTank</code> confirms feasibility — if total gas covers total cost, the last surviving candidate is guaranteed to complete the loop.</p>
<pre class="code" data-lang="java"><code>public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalTank = 0, curTank = 0, start = 0;
    for (int i = 0; i &lt; gas.length; i++) {
        int diff = gas[i] - cost[i];
        totalTank += diff;
        curTank += diff;
        if (curTank &lt; 0) {
            start = i + 1;
            curTank = 0;
        }
    }
    return totalTank &gt;= 0 ? start : -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>gas = [1,2,3,4,5], cost = [3,4,5,1,2]</code></p>
<table class="tbl">
<tr><th>i</th><th>diff (gas-cost)</th><th>curTank</th><th>curTank&lt;0?</th><th>start after</th></tr>
<tr><td>0</td><td>1-3=-2</td><td>-2</td><td>yes</td><td>start=1, curTank=0</td></tr>
<tr><td>1</td><td>2-4=-2</td><td>-2</td><td>yes</td><td>start=2, curTank=0</td></tr>
<tr><td>2</td><td>3-5=-2</td><td>-2</td><td>yes</td><td>start=3, curTank=0</td></tr>
<tr><td>3</td><td>4-1=3</td><td>3</td><td>no</td><td>start=3</td></tr>
<tr><td>4</td><td>5-2=3</td><td>6</td><td>no</td><td>start=3</td></tr>
</table>
<p class="fs13">totalTank = -2-2-2+3+3 = 0 &gt;= 0 -&gt; return <code>start = 3</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — single pass. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A prefix-sum failure point invalidates every candidate start up to it in one shot — this "restart just past the failure" trick turns an O(n²) brute force into one linear pass.</div>`});

/* Problem 143 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q143 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 143 · EASY</span>Assign Cookies</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Greedy</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Each child i has a greed factor <code>g[i]</code> — the minimum cookie size that contents them. Each cookie j has size <code>s[j]</code>. A cookie can satisfy child i only if <code>s[j] &gt;= g[i]</code>, and each child gets at most one cookie. Maximize the number of content children.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: only one size-1 cookie can satisfy the least greedy child
(g=1); neither size-1 cookie can satisfy g=2 or g=3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= g.length &lt;= 3×10⁴</li><li>0 &lt;= s.length &lt;= 3×10⁴</li><li>1 &lt;= g[i], s[j] &lt;= 2³¹ - 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort both arrays. The least-greedy child should get the smallest cookie that satisfies them — handing a big cookie to an easy-to-please child wastes it on someone who could be satisfied more cheaply.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort greed factors and cookie sizes ascending. Walk both with pointers: if the current cookie satisfies the current child, assign it and advance both; otherwise this cookie is too small for anyone remaining, so advance only the cookie pointer. The final child pointer value is the count satisfied.</p>
<pre class="code" data-lang="java"><code>public int findContentChildren(int[] g, int[] s) {
    Arrays.sort(g);
    Arrays.sort(s);
    int i = 0, j = 0;
    while (i &lt; g.length &amp;&amp; j &lt; s.length) {
        if (s[j] &gt;= g[i]) i++;
        j++;
    }
    return i;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input (sorted): <code>g = [1,2,3], s = [1,1]</code></p>
<table class="tbl">
<tr><th>j</th><th>s[j]</th><th>g[i] (current)</th><th>s[j]&gt;=g[i]?</th><th>i after</th><th>j after</th></tr>
<tr><td>0</td><td>1</td><td>1</td><td>yes</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>2</td><td>no</td><td>1</td><td>2</td></tr>
</table>
<p class="fs13">j reaches s.length (2) -&gt; loop ends -&gt; return <code>i = 1</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n + m log m) for sorting, O(n+m) for the scan. Space: O(1) extra.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Pairing sorted-smallest-with-sorted-smallest is the classic two-pointer greedy: never spend a large resource on an easy requirement when a smaller one would do just as well.</div>`});

/* Problem 144 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q144 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 144 · MEDIUM</span>Merge Intervals</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Intervals</span><span class="pill">Sorting</span></div>
<p class="dropcap">Given an array of intervals where <code>intervals[i] = [start_i, end_i]</code>, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: [1,3] and [2,6] overlap, so they merge into [1,6]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= intervals.length &lt;= 10⁴</li><li>0 &lt;= start_i &lt;= end_i &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort by start time first — once sorted, any interval that overlaps the one you're building can only be the very next one in order, so a single forward pass suffices.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort intervals by start. Keep a running merged interval at the back of the result list: if the next interval's start is beyond the merged interval's end, it can't overlap, so append it as a new entry; otherwise extend the merged interval's end to the max of the two.</p>
<pre class="code" data-lang="java"><code>public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -&gt; a[0] - b[0]);
    List&lt;int[]&gt; res = new ArrayList&lt;&gt;();
    for (int[] iv : intervals) {
        if (res.isEmpty() || res.get(res.size() - 1)[1] &lt; iv[0]) {
            res.add(iv);
        } else {
            res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], iv[1]);
        }
    }
    return res.toArray(new int[res.size()][]);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input (already sorted by start): <code>[[1,3],[2,6],[8,10],[15,18]]</code></p>
<table class="tbl">
<tr><th>interval</th><th>last merged end</th><th>last end &lt; start?</th><th>action</th><th>result after</th></tr>
<tr><td>[1,3]</td><td>— (empty)</td><td>n/a</td><td>start new</td><td>[[1,3]]</td></tr>
<tr><td>[2,6]</td><td>3</td><td>3&lt;2? no</td><td>extend to max(3,6)=6</td><td>[[1,6]]</td></tr>
<tr><td>[8,10]</td><td>6</td><td>6&lt;8? yes</td><td>start new</td><td>[[1,6],[8,10]]</td></tr>
<tr><td>[15,18]</td><td>10</td><td>10&lt;15? yes</td><td>start new</td><td>[[1,6],[8,10],[15,18]]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — dominated by the sort. Space: O(n) for the output (O(log n) extra for sorting).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Sorting by start turns "does this overlap anything already merged" into "does it overlap only the most recently merged interval" — the foundational trick behind every interval-merging problem.</div>`});

/* Problem 145 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q145 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 145 · MEDIUM</span>Insert Interval</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Intervals</span></div>
<p class="dropcap">You're given a list of non-overlapping intervals sorted by start time, and a new interval. Insert the new interval into the list, merging as necessary, so the result stays sorted and non-overlapping.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: [4,8] overlaps [3,5],[6,7],[8,10], merging them into [3,10]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= intervals.length &lt;= 10⁴</li><li>intervals is sorted by start_i and pairwise non-overlapping</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The input is already sorted, so no re-sort is needed — walk it once in three phases: intervals entirely before the new one, intervals that overlap it, then intervals entirely after.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Copy over every interval that ends before the new interval starts (no overlap possible). Then absorb every interval that overlaps the new interval by expanding its bounds to the min start / max end seen so far. Push the now fully-merged new interval, then copy the remaining intervals untouched.</p>
<pre class="code" data-lang="java"><code>public int[][] insert(int[][] intervals, int[] newInterval) {
    List&lt;int[]&gt; res = new ArrayList&lt;&gt;();
    int i = 0, n = intervals.length;
    while (i &lt; n &amp;&amp; intervals[i][1] &lt; newInterval[0]) {
        res.add(intervals[i++]);
    }
    while (i &lt; n &amp;&amp; intervals[i][0] &lt;= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.add(newInterval);
    while (i &lt; n) {
        res.add(intervals[i++]);
    }
    return res.toArray(new int[res.size()][]);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]</code></p>
<table class="tbl">
<tr><th>interval</th><th>phase</th><th>condition</th><th>action</th><th>newInterval after</th></tr>
<tr><td>[1,2]</td><td>1 (before)</td><td>end 2 &lt; 4? yes</td><td>copy as-is</td><td>[4,8]</td></tr>
<tr><td>[3,5]</td><td>2 (overlap)</td><td>start 3 &lt;= 8? yes</td><td>merge -&gt; [min(4,3),max(8,5)]</td><td>[3,8]</td></tr>
<tr><td>[6,7]</td><td>2 (overlap)</td><td>start 6 &lt;= 8? yes</td><td>merge -&gt; [3,max(8,7)]</td><td>[3,8]</td></tr>
<tr><td>[8,10]</td><td>2 (overlap)</td><td>start 8 &lt;= 8? yes</td><td>merge -&gt; [3,max(8,10)]</td><td>[3,10]</td></tr>
<tr><td>[12,16]</td><td>3 (after)</td><td>start 12 &lt;= 10? no</td><td>push [3,10], then copy as-is</td><td>[3,10]</td></tr>
</table>
<p class="fs13">Result: <code>[[1,2],[3,10],[12,16]]</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — single pass, no sort needed since input is pre-sorted. Space: O(n) for the output.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Because the input arrives pre-sorted, this is Merge Intervals' three-phase special case — that pre-sorted structure is exactly what keeps it linear instead of O(n log n).</div>`});

/* Problem 146 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q146 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 146 · MEDIUM</span>Non-overlapping Intervals</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Intervals</span><span class="pill">Greedy</span></div>
<p class="dropcap">Given an array of intervals, return the minimum number of intervals you must remove so the rest are non-overlapping. Intervals that only touch at an endpoint (e.g. <code>[1,2]</code> and <code>[2,3]</code>) are not considered overlapping.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: remove [1,3]; the remaining [[1,2],[2,3],[3,4]] don't overlap</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= intervals.length &lt;= 10⁵</li><li>-5×10⁴ &lt;= start_i &lt; end_i &lt;= 5×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This is "maximum non-overlapping intervals you can keep" in disguise. Sort by END time and always keep the interval finishing earliest — it leaves the most room for everything after it (classic activity-selection greedy).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort by end time. Greedily keep an interval whenever its start is at or after the end of the last kept interval — finishing earliest leaves maximum room for the rest, which is why sorting by end (not start) makes this greedy provably optimal. Any interval that fails the check overlaps what's already kept, so it must be removed; count removals directly.</p>
<pre class="code" data-lang="java"><code>public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -&gt; a[1] - b[1]);
    int removed = 0;
    int prevEnd = Integer.MIN_VALUE;
    for (int[] iv : intervals) {
        if (iv[0] &gt;= prevEnd) {
            prevEnd = iv[1];
        } else {
            removed++;
        }
    }
    return removed;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input (sorted by end): <code>[[1,2],[2,3],[1,3],[3,4]]</code></p>
<table class="tbl">
<tr><th>interval</th><th>start &gt;= prevEnd?</th><th>action</th><th>prevEnd after</th><th>removed so far</th></tr>
<tr><td>[1,2]</td><td>1 &gt;= -∞? yes</td><td>keep</td><td>2</td><td>0</td></tr>
<tr><td>[2,3]</td><td>2 &gt;= 2? yes</td><td>keep</td><td>3</td><td>0</td></tr>
<tr><td>[1,3]</td><td>1 &gt;= 3? no</td><td>remove</td><td>3 (unchanged)</td><td>1</td></tr>
<tr><td>[3,4]</td><td>3 &gt;= 3? yes</td><td>keep</td><td>4</td><td>1</td></tr>
</table>
<p class="fs13">Final removed count = <code>1</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — dominated by the sort. Space: O(1) extra (O(log n) for sorting).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Sorting by END is what makes activity-selection greedy provably optimal — keeping the earliest-finishing interval always leaves at least as much room as keeping any other valid choice would.</div>`});

/* Problem 147 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q147 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 147 · MEDIUM</span>Minimum Number of Arrows to Burst Balloons</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Intervals</span><span class="pill">Greedy</span></div>
<p class="dropcap">Balloons are given as intervals <code>[x_start, x_end]</code> along a horizontal axis. An arrow shot at position x bursts every balloon with <code>x_start &lt;= x &lt;= x_end</code>. Find the minimum number of arrows needed to burst every balloon.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: shoot at x=6 to burst [2,8] and [1,6];
shoot at x=12 to burst [10,16] and [7,12]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= points.length &lt;= 10⁵</li><li>-2³¹ &lt;= x_start &lt; x_end &lt;= 2³¹ - 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort by end coordinate. One arrow fired at the end of the earliest-finishing balloon bursts every balloon overlapping that point; the first balloon starting after it forces a fresh arrow.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort balloons by end coordinate. Fire the first arrow at the end of the first balloon; any later balloon whose start is at or before that position is already burst by it. The first balloon whose start exceeds the current arrow's position forces a new arrow, placed at that balloon's end.</p>
<pre class="code" data-lang="java"><code>public int findMinArrowShots(int[][] points) {
    if (points.length == 0) return 0;
    Arrays.sort(points, (a, b) -&gt; Integer.compare(a[1], b[1]));
    int arrows = 1;
    int arrowPos = points[0][1];
    for (int[] p : points) {
        if (p[0] &gt; arrowPos) {
            arrows++;
            arrowPos = p[1];
        }
    }
    return arrows;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input (sorted by end): <code>[[1,6],[2,8],[7,12],[10,16]]</code></p>
<table class="tbl">
<tr><th>balloon</th><th>start &gt; arrowPos?</th><th>action</th><th>arrowPos after</th><th>arrows so far</th></tr>
<tr><td>[1,6]</td><td>— (init)</td><td>set first arrow</td><td>6</td><td>1</td></tr>
<tr><td>[2,8]</td><td>2 &gt; 6? no</td><td>same arrow bursts it</td><td>6</td><td>1</td></tr>
<tr><td>[7,12]</td><td>7 &gt; 6? yes</td><td>new arrow</td><td>12</td><td>2</td></tr>
<tr><td>[10,16]</td><td>10 &gt; 12? no</td><td>same arrow bursts it</td><td>12</td><td>2</td></tr>
</table>
<p class="fs13">Final arrows = <code>2</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) — dominated by the sort. Space: O(1) extra.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is Non-overlapping Intervals viewed from the other side — both sort by end and lock in the earliest finishing boundary; here the count of forced boundaries IS the answer, not n minus it.</div>`});

/* Problem 148 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q148 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 148 · MEDIUM</span>Partition Labels</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Greedy</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given a string <code>s</code>, partition it into as many parts as possible so that each letter appears in at most one part. Return a list of the sizes of these parts, in order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "abac"
Output: [3,1]
Explanation: "aba" and "c" — every letter's occurrences stay confined
to a single part</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 500</li><li>s consists of lowercase English letters only</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A partition can't close until every character seen so far has had its LAST occurrence included — precompute each character's last index, then extend the current partition's boundary to the farthest last-occurrence seen while scanning.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Precompute the last index at which each letter occurs. Scan left to right, extending the current partition's end to the last occurrence of every character encountered. Once the scan index reaches that end, the partition is sealed — none of its letters can reappear later — record its length and start a new partition.</p>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; partitionLabels(String s) {
    int[] last = new int[26];
    for (int i = 0; i &lt; s.length(); i++) {
        last[s.charAt(i) - 'a'] = i;
    }
    List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
    int start = 0, end = 0;
    for (int i = 0; i &lt; s.length(); i++) {
        end = Math.max(end, last[s.charAt(i) - 'a']);
        if (i == end) {
            res.add(end - start + 1);
            start = i + 1;
        }
    }
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "abac"</code> — last[a]=2, last[b]=1, last[c]=3</p>
<table class="tbl">
<tr><th>i</th><th>char</th><th>last[char]</th><th>end after</th><th>i==end?</th><th>action</th></tr>
<tr><td>0</td><td>a</td><td>2</td><td>2</td><td>no</td><td>—</td></tr>
<tr><td>1</td><td>b</td><td>1</td><td>2</td><td>no</td><td>—</td></tr>
<tr><td>2</td><td>a</td><td>2</td><td>2</td><td>yes</td><td>add(2-0+1=3), start=3</td></tr>
<tr><td>3</td><td>c</td><td>3</td><td>3</td><td>yes</td><td>add(3-3+1=1), start=4</td></tr>
</table>
<p class="fs13">Result: <code>[3, 1]</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) (26-letter alphabet keeps the lookup O(1)). Space: O(1) extra beyond the output.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Extend the boundary to the farthest requirement seen, cut when you reach it" is the same greedy shape as Jump Game II's level boundary — here the requirement is a character's last occurrence instead of a jump's farthest reach.</div>`});

/* Problem 149 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q149 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 149 · MEDIUM</span>Valid Parenthesis String</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Greedy</span><span class="pill">Stack</span></div>
<p class="dropcap">Given a string <code>s</code> containing only <code>'('</code>, <code>')'</code> and <code>'*'</code>, where <code>'*'</code> may be treated as <code>'('</code>, <code>')'</code>, or an empty string, determine whether <code>s</code> can be interpreted as a valid parentheses string.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "(*))"
Output: true
Explanation: treat the '*' as '(' -&gt; "(())", a valid parentheses string</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 100</li><li>s[i] is '(', ')' or '*'</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Instead of branching on every possible meaning of '*', track a RANGE of possible open-paren counts — a low and a high bound — and update both together while scanning.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Track <code>lo</code> and <code>hi</code>: the minimum and maximum possible count of unmatched open parens, assuming every <code>'*'</code> is chosen optimally so far. <code>'('</code> raises both by 1, <code>')'</code> lowers both by 1, <code>'*'</code> lowers <code>lo</code> and raises <code>hi</code> (it could close, open, or vanish). If <code>hi</code> ever drops below 0, too many closes exist no matter what <code>'*'</code> is assigned — fail immediately. Clamp <code>lo</code> at 0 (a negative <code>lo</code> just means we choose not to close there). The string is valid only if <code>lo</code> can reach exactly 0 by the end.</p>
<pre class="code" data-lang="java"><code>public boolean checkValidString(String s) {
    int lo = 0, hi = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') {
            lo++; hi++;
        } else if (c == ')') {
            lo--; hi--;
        } else {
            lo--; hi++;
        }
        if (hi &lt; 0) return false;
        if (lo &lt; 0) lo = 0;
    }
    return lo == 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "(*))"</code></p>
<table class="tbl">
<tr><th>char</th><th>lo after op</th><th>hi after op</th><th>hi&lt;0?</th><th>lo clamped?</th></tr>
<tr><td>(</td><td>1</td><td>1</td><td>no</td><td>no</td></tr>
<tr><td>*</td><td>0</td><td>2</td><td>no</td><td>no</td></tr>
<tr><td>)</td><td>-1</td><td>1</td><td>no</td><td>yes -&gt; lo=0</td></tr>
<tr><td>)</td><td>-1</td><td>0</td><td>no</td><td>yes -&gt; lo=0</td></tr>
</table>
<p class="fs13">End of scan: lo = 0 -&gt; return <code>true</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Tracking a [lo, hi] range instead of exact counts collapses the exponential branching of '*' into a single linear pass — the same "track a feasible interval, not every possibility" idea used in reachability-style greedy checks.</div>`});

/* Problem 150 */
B.spread(
{ kicker: 'DSA · GREEDY & INTERVALS', head: 'Q150 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 150 · HARD</span>Candy</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Array</span><span class="pill">Greedy</span><span class="pill">Two Pass</span></div>
<p class="dropcap"><code>n</code> children stand in a line, each with a rating value. Every child must get at least one candy, and any child rated higher than an adjacent neighbor must receive more candies than that neighbor. Return the minimum total candies needed.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: ratings = [1,2,2,3,1]
Output: 7
Explanation: one valid distribution is candies = [1,2,1,2,1]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == ratings.length</li><li>1 &lt;= n &lt;= 2×10⁴</li><li>0 &lt;= ratings[i] &lt;= 2×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The rule splits into two independent one-directional constraints — "beat your left neighbor's candy count if you rate higher" and "beat your right neighbor's if you rate higher." Satisfy each with its own linear pass, then combine with max.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Give everyone 1 candy to start. Left-to-right pass: if a child rates higher than the one before them, give one more candy than that neighbor — this alone satisfies the left-side constraint. Right-to-left pass: if a child rates higher than the one after them, raise their count to at least one more than that neighbor's, using max so the left pass's result is never undone. Sum the final array.</p>
<pre class="code" data-lang="java"><code>public int candy(int[] ratings) {
    int n = ratings.length;
    int[] candies = new int[n];
    Arrays.fill(candies, 1);
    for (int i = 1; i &lt; n; i++) {
        if (ratings[i] &gt; ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    for (int i = n - 2; i &gt;= 0; i--) {
        if (ratings[i] &gt; ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    int total = 0;
    for (int c : candies) total += c;
    return total;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>ratings = [1,2,2,3,1]</code></p>
<table class="tbl">
<tr><th>i</th><th>rating</th><th>after left pass</th><th>after right pass (final)</th></tr>
<tr><td>0</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>2</td><td>2</td><td>2</td></tr>
<tr><td>2</td><td>2</td><td>1</td><td>1</td></tr>
<tr><td>3</td><td>3</td><td>2</td><td>2</td></tr>
<tr><td>4</td><td>1</td><td>1</td><td>1</td></tr>
</table>
<p class="fs13">Total = 1+2+1+2+1 = <code>7</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — two linear passes. Space: O(n) for the candies array.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever a constraint splits into independent left-looking and right-looking halves, solve each with its own single pass and merge via max — the same divide-and-combine trick used in Trapping Rain Water.</div>`});

})();
