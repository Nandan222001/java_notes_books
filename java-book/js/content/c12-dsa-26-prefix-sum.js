/* ===== CHAPTER 57 · DSA: Prefix Sum & Difference Array ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 57, 'DSA: Prefix Sum & Difference Array');

/* Problem 251 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q251 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 251 · EASY</span>Find Pivot Index</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Prefix Sum</span></div>
<p class="dropcap">Given an array <code>nums</code>, return the <strong>leftmost pivot index</strong>: the position where the sum of everything strictly to its LEFT equals the sum of everything strictly to its RIGHT. If no such index exists, return <code>-1</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,7,3,6,5,6]
Output: 3   (1+7+3 = 11 and 5+6 = 11)
Input: nums = [2,1,-1]
Output: 0   (empty left = 0, right = 1 + (-1) = 0)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁴</li><li>-1000 &lt;= nums[i] &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Compute the grand total once. While walking, if <code>leftSum × 2 == total − nums[i]</code>, you're standing on the balance point.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Total once up front, then one pass carrying the running left sum — the right side never needs recomputing because <code>right = total − left − nums[i]</code>.</p>
<pre class="code" data-lang="java"><code>public int pivotIndex(int[] nums) {
    int total = 0;
    for (int x : nums) total += x;
    int left = 0;
    for (int i = 0; i &lt; nums.length; i++) {
        if (left * 2 == total - nums[i]) return i;
        left += nums[i];
    }
    return -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,7,3,6,5,6]</code>, total = 28</p>
<table class="tbl">
<tr><th>i</th><th>left×2</th><th>total−nums[i]</th><th>verdict / left after</th></tr>
<tr><td>0</td><td>0</td><td>27</td><td>no → left = 1</td></tr>
<tr><td>1</td><td>2</td><td>21</td><td>no → left = 8</td></tr>
<tr><td>2</td><td>16</td><td>19</td><td>no → left = 11</td></tr>
<tr><td>3</td><td>22</td><td>22</td><td>MATCH → return 3 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — two passes. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Pretend the numbers are stones laid on a playground seesaw. Walk from the left picking nothing up; just before lifting EACH stone, ask: "do the stones behind me weigh exactly as much as the stones ahead?" The first spot where the plank balances is your fulcrum.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Doubling replaces subtraction: <code>left×2 == total − nums[i]</code> tests both sides at once without ever building a right-side sum — the same move powers half the prefix-sum family.</div>`});

/* Problem 252 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q252 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 252 · EASY</span>Running Sum of 1d Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Prefix Sum</span></div>
<p class="dropcap">Given an array <code>nums</code>, return the <strong>running sum</strong>: position <code>i</code> of the answer holds <code>nums[0] + … + nums[i]</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,2,3,4]
Output: [1,3,6,10]
Input: nums = [1,1,1,1,1]
Output: [1,2,3,4,5]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 1000</li><li>-10⁶ &lt;= nums[i] &lt;= 10⁶</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>One accumulator is all you need — and you may overwrite the input in place: <code>nums[i] += nums[i−1]</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sweep left to right folding each element into its neighbour: after the sweep, every slot holds the total of everything up to and including itself.</p>
<pre class="code" data-lang="java"><code>public int[] runningSum(int[] nums) {
    for (int i = 1; i &lt; nums.length; i++)
        nums[i] += nums[i - 1];
    return nums;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,2,3,4]</code></p>
<table class="tbl">
<tr><th>i</th><th>nums[i-1]</th><th>+nums[i]</th><th>array now</th></tr>
<tr><td>1</td><td>1</td><td>2 → 3</td><td>[1,3,3,4]</td></tr>
<tr><td>2</td><td>3</td><td>3 → 6</td><td>[1,3,6,4]</td></tr>
<tr><td>3</td><td>6</td><td>4 → 10</td><td>[1,3,6,10] ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) when done in place.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Think of a highway toll booth ledger: each sign doesn't show TODAY'S fee — it shows TOTAL money collected so far since the start of the road. Every booth just adds today's coins onto yesterday's running number.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This tiny transform is the gateway drug to the whole prefix-sum family: any range sum becomes a single subtraction, <code>pre[r] − pre[l−1]</code>.</div>`});

/* Problem 253 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q253 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 253 · MEDIUM</span>Continuous Subarray Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Prefix Sum</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given an integer array and an integer <code>k</code>, return <code>true</code> if there is a subarray of length <strong>at least 2</strong> whose elements sum to a multiple of <code>k</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [23,2,4,6,7], k = 6 → true   ([2,4] sums to 6)
Input: nums = [23,2,6,4,7], k = 13 → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁵ · 1 &lt;= k &lt;= 2³¹−1</li><li>0 &lt;= nums[i] &lt;= 10⁹ — brute force O(n²) will TLE</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>If two prefix sums have the SAME remainder mod k, the chunk between them is a multiple of k. Remember only the FIRST index of each remainder so the gap can reach size 2.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Carry the running prefix modulo k in a map from remainder → earliest index (seed remainder 0 at index −1 for the empty prefix). When a remainder reappears and the indices are ≥ 2 apart, the stretch between them is exactly the wanted subarray.</p>
<pre class="code" data-lang="java"><code>public boolean checkSubarraySum(int[] nums, int k) {
    Map&lt;Integer, Integer&gt; first = new HashMap&lt;&gt;();
    first.put(0, -1);                       // empty prefix
    int rem = 0;
    for (int i = 0; i &lt; nums.length; i++) {
        rem = (rem + nums[i]) % k;
        Integer j = first.get(rem);
        if (j == null) first.put(rem, i);
        else if (i - j &gt;= 2) return true;
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[23,2,4,6,7], k=6</code></p>
<table class="tbl">
<tr><th>i</th><th>x</th><th>rem mod 6</th><th>map state / verdict</th></tr>
<tr><td>0</td><td>23</td><td>5</td><td>new → {0:−1, 5:0}</td></tr>
<tr><td>1</td><td>2</td><td>1</td><td>new → …, 1:1</td></tr>
<tr><td>2</td><td>4</td><td>5</td><td>seen @0, gap 2 → TRUE ✓ ([2,4])</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(min(n,k)) remainders.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Picture a clock face with k hours. Start walking around it — one step per unit eaten from the array. If you find yourself standing on the SAME clock number twice, everything you stepped over in between added up to whole laps of the clock… a multiple of k! You just need the two visits to be at least two steps apart.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Sum divisible by k" is really "prefix remainders collide". Storing the EARLIEST position of each remainder maximizes every future gap — that single choice turns the length-2 requirement into one comparison.</div>`});

/* Problem 254 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q254 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 254 · MEDIUM</span>Contiguous Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Prefix Sum</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given a binary array, find the longest contiguous subarray containing an <strong>equal number of 0s and 1s</strong>. Return its length.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: [0,1]       → 2
Input: [0,1,0]    → 2   ([0,1] or [1,0])</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁵ · nums[i] is 0 or 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Count +1 for every 1 and −1 for every 0. When the running balance repeats its earlier value, the chunk in between had perfectly equal counts.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>A balance accumulator (+1/−1) turns "equal zeros and ones" into "same balance seen before". Store the FIRST index of each balance value; on a repeat, the distance is a candidate answer.</p>
<pre class="code" data-lang="java"><code>public int findMaxLength(int[] nums) {
    Map&lt;Integer, Integer&gt; first = new HashMap&lt;&gt;();
    first.put(0, -1);                       // balanced empty prefix
    int bal = 0, best = 0;
    for (int i = 0; i &lt; nums.length; i++) {
        bal += nums[i] == 1 ? 1 : -1;
        Integer j = first.get(bal);
        if (j == null) first.put(bal, i);
        else best = Math.max(best, i - j);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[0,1,0]</code></p>
<table class="tbl">
<tr><th>i</th><th>x</th><th>balance</th><th>map / verdict</th></tr>
<tr><td>0</td><td>0</td><td>−1</td><td>new → {0:−1, −1:0}</td></tr>
<tr><td>1</td><td>1</td><td>0</td><td>seen @−1 → len 1−(−1)=2 → best 2</td></tr>
<tr><td>2</td><td>0</td><td>−1</td><td>seen @0 → len 2 → best stays 2 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n) distinct balances.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Watch a tug-of-war scoreboard: team ONE scores +1 each round it wins, team ZERO scores −1. Whenever the total score you see now matches one you saw earlier, the rounds BETWEEN were perfectly even — nobody gained. The widest such gap between two identical scores is your answer.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Reframing beats counting: instead of checking every window's zero/one tally (O(n²)), collapse both facts into one number — the balance — and hunt repeated values. Same trick as Q253 wearing different clothes.</div>`});

/* Problem 255 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q255 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 255 · MEDIUM</span>Subarray Sums Divisible by K</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Prefix Sum</span><span class="pill">Counting</span></div>
<p class="dropcap">Given an integer array <code>nums</code> and integer <code>k</code>, return the number of non-empty subarrays whose sum is divisible by <code>k</code>. Negative numbers are allowed.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7   ([4,5,0,-2,-3,1], [5], [5,0], [5,0,-2,-3], [0], [0,-2,-3], [-2,-3])</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 3×10⁴</li><li>-10⁴ &lt;= nums[i] &lt;= 10⁴ · 2 &lt;= k &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Count how often each prefix remainder occurs — every PAIR of equal remainders forms one valid subarray. Normalise negatives into <code>[0,k)</code> before counting.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sweep once keeping the running remainder mod k (with the double-mod trick so negatives land in range). At each step, add how many previous prefixes shared this exact remainder — each match closes a divisible window ending here.</p>
<pre class="code" data-lang="java"><code>public int subarraysDivByK(int[] nums, int k) {
    int[] seen = new int[k];
    seen[0] = 1;                            // empty prefix
    int rem = 0, ans = 0;
    for (int x : nums) {
        rem = ((rem + x) % k + k) % k;      // safe for negatives
        ans += seen[rem];
        seen[rem]++;
    }
    return ans;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[4,5,0,-2,-3,1], k=5</code></p>
<table class="tbl">
<tr><th>x</th><th>rem</th><th>matches added</th><th>ans</th></tr>
<tr><td>4</td><td>4</td><td>seen[4]=0</td><td>0</td></tr>
<tr><td>5</td><td>4</td><td>+1</td><td>1</td></tr>
<tr><td>0</td><td>4</td><td>+2</td><td>3</td></tr>
<tr><td>-2</td><td>2</td><td>+0</td><td>3</td></tr>
<tr><td>-3</td><td>(2−3+5)%5=4</td><td>+3</td><td>6</td></tr>
<tr><td>1</td><td>0</td><td>+1 (seed)</td><td>7 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n + k). Space: O(k).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>People queue up around a circular track with k numbered benches. Every arrival notes its bench. When someone lands on a bench where N people already stand, that's N new pairs whose walkers covered whole laps between them — count those handshakes. The double-mod is just making sure a walker who steps BACKWARD still gets seated on a proper bench, never on bench "minus one".</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Switch from "find one" to "count all": instead of storing the first index per remainder, store HOW MANY — and add on every repeat. Same skeleton as Q253/Q254, third costume change.</div>`});

/* Problem 256 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q256 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 256 · MEDIUM</span>Product of the Last K Numbers</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Design</span><span class="pill">Prefix Product</span></div>
<p class="dropcap">Design a class receiving a stream of integers (<code>add(num)</code>) and answering <code>getProduct(k)</code> — the product of the last <code>k</code> numbers, where a <code>0</code> poisons any window containing it.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>add(3); add(1); add(2); add(5); add(4)
getProduct(2) → 20    (5 × 4)
getProduct(3) → 40    (2 × 5 × 4)
add(0) ; getProduct(2) → 0
getProduct(3) → 40? NO → after reset only new numbers count</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>at most 4×10⁴ calls; each add is 0..100; k ≤ current length</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Prefix products make any window one division: <code>pre[n−1] / pre[n−1−k]</code>. A zero breaks division — so RESET the table when it appears.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep prefix products with a sentinel 1 at the front. When a zero arrives, clear everything back to the sentinel — any window that would reach across the zero is worthless, and shorter windows never touch it.</p>
<pre class="code" data-lang="java"><code>class ProductOfNumbers {
    private List&lt;Long&gt; pre = new ArrayList&lt;&gt;(List.of(1L));

    public void add(int num) {
        if (num == 0) { pre.clear(); pre.add(1L); }   // poisoned history
        else pre.add(pre.get(pre.size() - 1) * num);
    }
    public int getProduct(int k) {
        int n = pre.size() - 1;
        return k &gt;= n ? 0 : (int)(pre.get(n) / pre.get(n - k));
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Adds: <code>3,1,2,5,4</code> then queries</p>
<table class="tbl">
<tr><th>call</th><th>prefix list</th><th>answer</th></tr>
<tr><td>adds…</td><td>[1, 3, 3, 6, 30, 120]</td><td>—</td></tr>
<tr><td>getProduct(2)</td><td>120 ÷ 6</td><td>20 ✓</td></tr>
<tr><td>add(0)</td><td>[1] (reset!)</td><td>—</td></tr>
<tr><td>getProduct(2)</td><td>k=2 ≥ n=0</td><td>0 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) per operation amortized. Space: O(n) live prefix entries.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A bakery ledger where every row shows TOTAL buns baked since opening. This week's production = latest row divided by the row from a week ago. But if one batch burns completely (a zero), you tear off the whole ledger and start fresh — anything counting backwards into that burnt day was garbage anyway.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Zeros kill division-based prefix tricks. Instead of tracking "where are the zeros", CLEARING on zero is both simpler and faster — the data structure self-heals in O(1).</div>`});

/* Problem 257 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q257 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 257 · MEDIUM</span>Corporate Flight Bookings</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Difference Array</span><span class="pill">Sweep</span></div>
<p class="dropcap">There are <code>n</code> flights numbered 1..n. Each booking <code>[i, j, seats]</code> reserves <code>seats</code> seats on EVERY flight from i through j inclusive. Return the total seats reserved per flight.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
Output: [10,55,45,25,25]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 2×10⁴ · 1 &lt;= bookings.length &lt;= 2×10⁴</li><li>1 &lt;= i &lt;= j &lt;= n · 1 &lt;= seats ≤ 10⁴ — naive per-flight marking is O(n·m)</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Don't paint every flight in the range. Record "+seats at boarding gate i, −seats right AFTER gate j", then sweep once accumulating — the running total IS each flight's load.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Difference array: stamp only the two ENDS of every booking, then a single left-to-right accumulation rebuilds the exact per-flight counts in O(n + m).</p>
<pre class="code" data-lang="java"><code>public int[] corpFlightBookings(int[][] bookings, int n) {
    int[] diff = new int[n + 1];            // extra slot for j == n
    for (int[] b : bookings) {
        diff[b[0] - 1] += b[2];
        diff[b[1]]     -= b[2];
    }
    int[] res = new int[n];
    int cur = 0;
    for (int i = 0; i &lt; n; i++) { cur += diff[i]; res[i] = cur; }
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,2,10],[2,3,20],[2,5,25]]</code></p>
<table class="tbl">
<tr><th>flight</th><th>delta</th><th>running total</th></tr>
<tr><td>1</td><td>+10</td><td>10</td></tr>
<tr><td>2</td><td>+45 (−10 later? no: +20+25)</td><td>55</td></tr>
<tr><td>3</td><td>−10</td><td>45</td></tr>
<tr><td>4</td><td>−20</td><td>25</td></tr>
<tr><td>5</td><td>0</td><td>25 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m + n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A hotel doesn't repaint its occupancy board for every room in "rooms 2–7 are ours". The front desk just writes two tiny notes on one long strip: "+5 guests ARRIVE at door 2" and "−5 LEAVE after door 7". Walking down the corridor once, keeping a tally as notes fly by, gives every doorway's headcount instantly.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Range-add problems flip beautifully into point-writes: O(range) work becomes O(1) at both ends. This difference array is THE tool behind car-pooling, calendar-merging and skyline sweeps.</div>`});

/* Problem 258 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q258 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 258 · MEDIUM</span>Car Pooling</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Difference Array</span><span class="pill">Sweep</span></div>
<p class="dropcap">A car drives only eastward on a route with stops 0..1000. Each trip <code>[num, from, to]</code> picks up <code>num</code> passengers at <code>from</code> and drops them at <code>to</code>. Given a seat capacity, return <code>true</code> if every trip can be satisfied — passengers never exceed capacity at any moment.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>trips = [[2,1,5],[3,3,7]], capacity = 4 → false (stop 3 carries 5)
trips = [[2,1,5],[3,3,7]], capacity = 5 → true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= trips.length ≤ 1000 · 1 &lt;= num ≤ 100 · 0 ≤ from &lt; to ≤ 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Same move as flight bookings: +num at pickup stop, −num at drop stop, then sweep and watch the occupancy never exceed capacity.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Stamp pickups/drop-offs into a station-sized delta array, then walk stations in order tracking current passenger count.</p>
<pre class="code" data-lang="java"><code>public boolean carPooling(int[][] trips, int capacity) {
    int[] delta = new int[1001];
    for (int[] t : trips) {
        delta[t[1]] += t[0];
        delta[t[2]] -= t[0];
    }
    int cur = 0;
    for (int d : delta) {
        cur += d;
        if (cur &gt; capacity) return false;
    }
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[2,1,5],[3,3,7]], cap=4</code></p>
<table class="tbl">
<tr><th>stop</th><th>delta</th><th>onboard</th><th>verdict</th></tr>
<tr><td>1</td><td>+2</td><td>2</td><td>ok</td></tr>
<tr><td>3</td><td>+3</td><td>5</td><td>5 &gt; 4 → FALSE ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m + 1001). Space: O(1001).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>The bus driver doesn't replay each booking during the ride. The dispatcher pins sticky notes on the route map: "+2 at stop 1", "−2 at stop 5", "+3 at stop 3", "−3 at stop 7". Driving past, the driver just keeps a running headcount of notes flying by — if the bus ever feels fuller than its seats, the schedule is impossible.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Dropping a passenger happens BEFORE new pickups are counted at the same stop when we place −num at index <code>to</code> and process left-to-right — order of deltas at equal indices is exactly why this one array suffices.</div>`});

/* Problem 259 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q259 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 259 · HARD</span>Split Array Largest Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Binary Search</span><span class="pill">Greedy Check</span></div>
<p class="dropcap">Split <code>nums</code> into exactly <code>m</code> non-empty CONTIGUOUS pieces so that the LARGEST piece-sum is as small as possible. Return that smallest possible largest sum.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [7,2,5,10,8], m = 2
Output: 18   ([7,2,5] and [10,8])</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length ≤ 1000 · 0 &lt;= nums[i] ≤ 10⁶ · 1 ≤ m ≤ min(50, length)</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Invert the question: "can I split with NO piece exceeding cap X?" — greedy count the pieces. That predicate is monotonic in X, so binary search X between max(nums) and sum(nums).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Search the answer space, not the array. For a candidate cap, sweep greedily packing numbers until adding one more would overflow — each overflow starts a new piece. Fewer than m pieces means cap is generous; shrink it.</p>
<pre class="code" data-lang="java"><code>public int splitArray(int[] nums, int m) {
    long lo = 0, hi = 0;
    for (int x : nums) { lo = Math.max(lo, x); hi += x; }
    while (lo &lt; hi) {
        long mid = (lo + hi) &gt;&gt;&gt; 1;
        if (pieces(nums, mid) &lt;= m) hi = mid;
        else lo = mid + 1;
    }
    return (int) lo;
}
private int pieces(int[] nums, long cap) {
    int need = 1; long cur = 0;
    for (int x : nums) {
        if (cur + x &gt; cap) { need++; cur = x; }
        else cur += x;
    }
    return need;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[7,2,5,10,8], m=2</code></p>
<table class="tbl">
<tr><th>cap tried</th><th>greedy pieces</th><th>move</th></tr>
<tr><td>21</td><td>[7,2,5][10,8] → 2</td><td>≤ m → hi = 21</td></tr>
<tr><td>15</td><td>[7,2,5][10][8] → 3</td><td>&gt; m → lo = 16</td></tr>
<tr><td>18</td><td>[7,2,5][10,8] → 2</td><td>hi = 18</td></tr>
<tr><td>17</td><td>3 pieces</td><td>lo = 18 → answer 18 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · log(sum)). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>You're loading conveyor boxes onto m trucks so the heaviest truck carries as little as possible. You can't try every arrangement — instead you ask a yes/no question: "if no truck may carry more than 300 kg, how many trucks do I NEED?" Pack trucks greedily front-to-back and count. Too few needed? Try lighter caps; too many? Heavier. The boundary of possible is your answer.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Minimise the maximum" screams binary search on the ANSWER. The greedy piece-counter is valid because packing tightly can never hurt — the same template solves Koko-eating-bananas, ship-packages and painters-partition.</div>`});

/* Problem 260 */
B.spread(
{ kicker: 'DSA · PREFIX SUM', head: 'Q260 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 260 · MEDIUM</span>Maximum Points You Can Obtain from Cards</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Prefix Sum</span><span class="pill">Sliding Window</span></div>
<p class="dropcap">Cards lie in a row; you must take EXACTLY <code>k</code> of them, each pick only from either END. Maximise your total points.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12   (take the three RIGHTMOST: 5 + 6 + 1)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ cardPoints.length ≤ 10⁵ · 1 ≤ cardPoints[i] ≤ 10⁴ · 1 ≤ k ≤ length</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Flip it: taking k from the ends means LEAVING n−k contiguous cards in the middle. Minimise that middle window with a sliding sum.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Total minus the smallest contiguous window of size <code>n−k</code> — one prefix total plus one sliding pass, no recursion over "left i / right k−i" cases.</p>
<pre class="code" data-lang="java"><code>public int maxScore(int[] cp, int k) {
    int n = cp.length, total = 0;
    for (int x : cp) total += x;
    int win = 0;
    for (int i = 0; i &lt; n - k; i++) win += cp[i];
    int minWin = win;
    for (int i = n - k; i &lt; n; i++) {
        win += cp[i] - cp[i - (n - k)];
        minWin = Math.min(minWin, win);
    }
    return total - minWin;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,2,3,4,5,6,1], k=3</code> → leave window of 4</p>
<table class="tbl">
<tr><th>window (size 4)</th><th>sum</th><th>min?</th></tr>
<tr><td>[1,2,3,4]</td><td>10</td><td>min ✓</td></tr>
<tr><td>[2,3,4,5]</td><td>14</td><td>—</td></tr>
<tr><td>[3,4,5,6]</td><td>18</td><td>—</td></tr>
<tr><td>[4,5,6,1]</td><td>16</td><td>—</td></tr>
</table>
<p class="fs13">total = 22 → answer 22 − 10 = <b>12</b> ✓ (take 1 + 5 + 6)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Picking k treats from the two ends of a buffet table is really deciding which n−k treats in the MIDDLE stay untouched — and you want the leftovers to be as cheap as possible! Slide a napkin across the middle to find its cheapest stretch; everything else is yours.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Complement thinking turns an awkward "two-ended grab" into a plain fixed-size sliding window — whenever direct enumeration branches wildly, ask what stays BEHIND.</div>`});
})();