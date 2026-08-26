/* ===== CHAPTER 59 · DSA: Cyclic Sort & In-Place Tricks ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 59, 'DSA: Cyclic Sort & In-Place Tricks');

/* Problem 271 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q271 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 271 · EASY</span>Find All Numbers Disappeared in an Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Index-as-Hash</span></div>
<p class="dropcap">An array of length <code>n</code> holds integers in <code>[1, n]</code>, some appearing TWICE and others missing entirely. Return all numbers in <code>[1, n]</code> that never appear — using O(1) extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == nums.length · 1 &lt;= n &lt;= 10⁵ · 1 &lt;= nums[i] &lt;= n</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every value IS a valid index. Visit index |value|−1 and NEGATE what lives there; slots still positive afterwards were never visited.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>The sign bit becomes a free presence-flag. Pass 1 flips flags for seen numbers; pass 2 collects untouched slots.</p>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; findDisappearedNumbers(int[] nums) {
    for (int x : nums) {
        int idx = Math.abs(x) - 1;
        if (nums[idx] &gt; 0) nums[idx] = -nums[idx];
    }
    List&lt;Integer&gt; out = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; nums.length; i++)
        if (nums[i] &gt; 0) out.add(i + 1);
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[4,3,2,7,8,2,3,1]</code> — after pass 1:</p>
<table class="tbl">
<tr><th>visit value</th><th>marks index</th><th>array after</th></tr>
<tr><td>4</td><td>3</td><td>[4,3,2,<b>-7</b>,8,2,3,1]</td></tr>
<tr><td>3, 2, 7, 8…</td><td>2, 1, 6, 7</td><td>[<b>-4</b>,<b>-3</b>,<b>-2</b>,-7,8,2,<b>-3</b>,<b>-1</b>]</td></tr>
<tr><td>2, 3 again</td><td>1, 2 (already −)</td><td>no change</td></tr>
</table>
<p class="fs13">Slots 4 and 5 stayed positive → missing <code>[5,6]</code> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) extra (output excluded).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Classroom attendance: each arriving student FLIPS the name-card of their own seat number to "present". After the bell, whichever cards still face UP belong to empty seats — the seating chart itself kept the register, no separate list needed.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>When values are bounded by the array size, THE ARRAY IS YOUR HASH TABLE — indices are free keys and the sign bit is a free boolean.</div>`});

/* Problem 272 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q272 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 272 · MEDIUM</span>Find All Duplicates in an Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Index-as-Hash</span></div>
<p class="dropcap">Integers in <code>[1, n]</code> appear once or TWICE. Return every value that appears twice — O(n) time, O(1) extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == length · 1 ≤ n ≤ 10⁵ · each element appears once or twice</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Same sign-flip as Q271 — but now a SECOND flip attempt is the alarm: the slot is already negative → this number came around before.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Negation pass where re-encountering a negative slot reports its index+1 as a duplicate.</p>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; findDuplicates(int[] nums) {
    List&lt;Integer&gt; out = new ArrayList&lt;&gt;();
    for (int x : nums) {
        int idx = Math.abs(x) - 1;
        if (nums[idx] &lt; 0) out.add(idx + 1);   // second visit!
        else nums[idx] = -nums[idx];
    }
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[4,3,2,7,8,2,3,1]</code></p>
<table class="tbl">
<tr><th>x</th><th>slot idx+1</th><th>state</th><th>action</th></tr>
<tr><td>4,3,2,7,8,1…</td><td>3,2,1,6,7,0</td><td>fresh</td><td>flip to −</td></tr>
<tr><td>2 (again)</td><td>slot 1</td><td>already −</td><td>DUP → add 2</td></tr>
<tr><td>3 (again)</td><td>slot 2</td><td>already −</td><td>DUP → add 3 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) extra.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A hotel hands out room keys numbered by LOCKER. Each guest flips their locker's flag DOWN claiming it. When a guest arrives and finds the flag ALREADY down — that key was double-booked! The lockers themselves caught the collision.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The negation trick has two modes on one skeleton: surviving positives answer "who's MISSING", double-visits answer "who's DUPLICATED". Same hardware, different read-out.</div>`});

/* Problem 273 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q273 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 273 · EASY</span>Set Mismatch</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Index-as-Hash</span></div>
<p class="dropcap">The set <code>s = {1..n}</code> suffered one accident: one number was DUPLICATED into another's slot, so exactly one number is duplicated and one is MISSING. Return <code>[duplicate, missing]</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,2,2,4]
Output: [2,3]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 ≤ n ≤ 10⁴ · 1 ≤ nums[i] ≤ n</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>One negation pass finds BOTH: the double-flip collision names the duplicate; the surviving positive slot names the missing.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Mark with sign flips; catch the re-visit as duplicate, then scan for the unmarked slot.</p>
<pre class="code" data-lang="java"><code>public int[] findErrorNums(int[] nums) {
    int[] ans = new int[2];
    for (int x : nums) {
        int idx = Math.abs(x) - 1;
        if (nums[idx] &lt; 0) ans[0] = idx + 1;   // collided
        else nums[idx] = -nums[idx];
    }
    for (int i = 0; i &lt; nums.length; i++)
        if (nums[i] &gt; 0) { ans[1] = i + 1; break; }
    return ans;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,2,2,4]</code></p>
<table class="tbl">
<tr><th>x</th><th>slot</th><th>effect</th></tr>
<tr><td>1</td><td>idx 0</td><td>flip → [-1,…]</td></tr>
<tr><td>2</td><td>idx 1</td><td>flip → [-1,-2,…]</td></tr>
<tr><td>2 again</td><td>idx 1</td><td>already − → dup = 2 ✓</td></tr>
<tr><td>4</td><td>idx 3</td><td>flip → [-1,-2,2,-4]</td></tr>
<tr><td>scan</td><td>idx 2 still +</td><td>missing = 3 ✓ → [2,3]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Badge roll-call at a convention: badges are numbered by HOOK. One badge got stamped onto its hook TWICE (the second stamp attempt bounces — "already claimed!"), and afterwards precisely ONE hook still shows its flag up — that's the badge that vanished in the mix-up.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Q271 and Q272 fused into a single pass: collisions expose the duplicate while leftover positives expose the gap — two answers for the price of one sweep.</div>`});

/* Problem 274 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q274 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 274 · HARD</span>First Missing Positive</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Cyclic Placement</span><span class="pill">In-Place</span></div>
<p class="dropcap">Return the smallest positive integer NOT present in the array — in <strong>O(n)</strong> time and <strong>O(1)</strong> space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[1,2,0]       → 3
[3,4,-1,1]    → 1
[7,8,9,11,12] → 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁵ · −2³¹ ≤ nums[i] ≤ 2³¹−1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The answer lies in [1, n+1]. Try to put every value v (1..n) at index v−1 by swapping; afterwards the first index whose value ≠ i+1 is the answer.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Cyclic placement: while the current slot's value belongs in range AND isn't already home, swap it toward its rightful index. Each swap permanently seats ≥ 1 element → total work stays linear despite the inner loop.</p>
<pre class="code" data-lang="java"><code>public int firstMissingPositive(int[] nums) {
    int i = 0;
    while (i &lt; nums.length) {
        int v = nums[i];
        if (v &gt; 0 &amp;&amp; v &lt;= nums.length &amp;&amp; nums[v - 1] != v) {
            nums[i] = nums[v - 1];      // evict whoever sits there
            nums[v - 1] = v;            // seat v in its home slot
        } else i++;
    }
    for (i = 0; i &lt; nums.length; i++)
        if (nums[i] != i + 1) return i + 1;
    return nums.length + 1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[3,4,-1,1]</code></p>
<table class="tbl">
<tr><th>i</th><th>v</th><th>action</th><th>array</th></tr>
<tr><td>0</td><td>3</td><td>seat @idx2, take −1 back</td><td>[-1,4,3,1]</td></tr>
<tr><td>0</td><td>−1</td><td>out of range → advance</td><td>same</td></tr>
<tr><td>1</td><td>4</td><td>seat @idx3, take 1</td><td>[-1,1,3,4]</td></tr>
<tr><td>1</td><td>1</td><td>seat @idx0, take −1</td><td>[1,-1,3,4]</td></tr>
<tr><td>scan</td><td>—</td><td>nums[1] ≠ 2</td><td>return 1 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each swap homes one element forever. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A coat-check attendant insists every coat with ticket ≤ number-of-hooks hangs on ITS OWN hook. Holding a coat, she swaps it with whatever occupies its hook; that displaced coat goes into her hand and the process repeats until it lands somewhere or proves homeless (ticket out of range or duplicate). Afterwards, the FIRST empty hook number is the smallest missing ticket.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Index as destination" turns sorting into seating: the guard <code>nums[v-1] != v</code> prevents infinite loops on duplicates, and amortised counting keeps the double loop honest at O(n).</div>`});

/* Problem 275 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q275 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 275 · EASY</span>Kth Missing Positive Number</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Binary Search</span><span class="pill">Math</span></div>
<p class="dropcap">A STRICTLY increasing positive array has holes in the natural number line. Return the <code>k</code>-th missing positive number.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>arr = [2,3,4,7,11], k = 5 → 9
arr = [1,2,3,4],    k = 2 → 6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ arr.length ≤ 1000 · 1 ≤ arr[i] ≤ 1000 · strictly increasing</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>At index i the count of missing numbers BEFORE arr[i] is <code>arr[i] − 1 − i</code> — a monotonic value, so binary-search where it reaches k.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Binary search on the "holes so far" function; when the loop ends, <code>lo</code> elements are present and exactly k holes precede position lo — answer is <code>lo + k</code>.</p>
<pre class="code" data-lang="java"><code>public int findKthPositive(int[] arr, int k) {
    int lo = 0, hi = arr.length - 1;
    while (lo &lt;= hi) {
        int mid = (lo + hi) &gt;&gt;&gt; 1;
        if (arr[mid] - 1 - mid &lt; k) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo + k;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[2,3,4,7,11], k=5</code> (missing counts: 1,2,3,5,8)</p>
<table class="tbl">
<tr><th>lo..hi</th><th>mid</th><th>count(mid)</th><th>move</th></tr>
<tr><td>0..4</td><td>2</td><td>4−1−2 = 1</td><td>&lt; k → lo = 3</td></tr>
<tr><td>3..4</td><td>3</td><td>7−1−3 = 3</td><td>&lt; k → lo = 4</td></tr>
<tr><td>4..4</td><td>4</td><td>11−1−4 = 6</td><td>≥ k → hi = 3 stop</td></tr>
</table>
<p class="fs13">answer = lo + k = 4 + 5 = <b>9</b> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A bus timetable with skipped route numbers: at each listed stop you can instantly compute how many numbers were jumped SO FAR. Binary-search the first stop where that skip-count reaches k — the wanted ghost-number lives just between two stops, deduced by arithmetic instead of counting one-by-one.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever a quantity derived from a sorted array is itself sorted ("missing before index i"), binary search applies even though no VALUE is being searched — here we hunt a POSITION.</div>`});

/* Problem 276 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q276 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 276 · MEDIUM</span>Remove Duplicates from Sorted Array II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Two Pointers</span><span class="pill">In-Place</span></div>
<p class="dropcap">A sorted array may keep each value at most TWICE (in place, O(1) memory). Compact it and return the new length; order of kept elements must stay sorted.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>nums = [1,1,1,2,2,3]        → length 5, [1,1,2,2,3,…]
nums = [0,0,1,1,1,1,2,3,3]  → length 7, [0,0,1,1,2,3,3,…]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ nums.length ≤ 10⁴ · sorted non-decreasing</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A write-pointer collects survivors. A newcomer is welcome iff it differs from the element TWO slots behind the write head.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Slow pointer <code>w</code> marks where the next survivor lands; comparing candidate with <code>nums[w−2]</code> enforces "max two copies" for any run.</p>
<pre class="code" data-lang="java"><code>public int removeDuplicates(int[] nums) {
    int w = 0;
    for (int x : nums) {
        if (w &lt; 2 || x != nums[w - 2]) nums[w++] = x;
    }
    return w;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,1,1,2,2,3]</code></p>
<table class="tbl">
<tr><th>x</th><th>w</th><th>x == nums[w−2]?</th><th>action → array prefix</th></tr>
<tr><td>1</td><td>0</td><td>(w&lt;2) yes</td><td>write → [1]</td></tr>
<tr><td>1</td><td>1</td><td>(w&lt;2) yes</td><td>write → [1,1]</td></tr>
<tr><td>1</td><td>2</td><td>= nums[0]=1 ✗</td><td>skip</td></tr>
<tr><td>2, 2</td><td>2→4</td><td>≠ both times</td><td>[1,1,2,2]</td></tr>
<tr><td>3</td><td>4</td><td>≠ nums[2]=2</td><td>write → len 5 ✓ [1,1,2,2,3]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A queue bouncer allows at most TWO people wearing each identical outfit. He checks every newcomer against the person TWO places back in the approved line — same outfit means this would be a THIRD copy, so they're turned away. Since arrivals come pre-sorted by outfit, one comparison suffices.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The "look back K slots" pattern generalises instantly: allow at most K duplicates by comparing with <code>nums[w−K]</code>. One line change, new problem solved.</div>`});

/* Problem 277 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q277 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 277 · MEDIUM</span>Rotate Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Reversal Trick</span><span class="pill">In-Place</span></div>
<p class="dropcap">Rotate the array to the RIGHT by <code>k</code> steps, in place with O(1) extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>nums = [1,2,3,4,5,6,7], k = 3 → [5,6,7,1,2,3,4]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ nums.length ≤ 10⁵ · 0 ≤ k ≤ 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Three flips do it: reverse the WHOLE array, then reverse the first k, then the rest. And never forget <code>k %= n</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>The reversal triple moves each element exactly twice — no auxiliary buffer, no juggling cycles.</p>
<pre class="code" data-lang="java"><code>public void rotate(int[] nums, int k) {
    int n = nums.length;
    k %= n;
    if (k == 0) return;
    rev(nums, 0, n - 1);
    rev(nums, 0, k - 1);
    rev(nums, k, n - 1);
}
private void rev(int[] a, int l, int r) {
    while (l &lt; r) {
        int t = a[l]; a[l++] = a[r]; a[r--] = t;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,2,3,4,5,6,7], k=3</code></p>
<table class="tbl">
<tr><th>step</th><th>range flipped</th><th>array now</th></tr>
<tr><td>1</td><td>whole [0..6]</td><td>[7,6,5,4,3,2,1]</td></tr>
<tr><td>2</td><td>first 3 [0..2]</td><td>[5,6,7,4,3,2,1]</td></tr>
<tr><td>3</td><td>rest [3..6]</td><td>[5,6,7,1,2,3,4] ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Pancake-flip magic on a stack: flip the ENTIRE stack upside down, then flip just the top k pancakes back upright, then flip the remaining pile upright too. Three wrist-flicks and the bottom slice has migrated to the top — no second plate required.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A reversal is a rotation's half-brother: composing three reversals equals one rotation while touching every element only twice — the classic answer when interviewers demand O(1) space.</div>`});

/* Problem 278 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q278 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 278 · MEDIUM</span>Reverse Words in a String</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Parsing</span></div>
<p class="dropcap">Reverse the ORDER of words. Collapse runs of spaces to one, trim leading/trailing spaces.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input:  "  the sky is blue  "
Output: "blue is sky the"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 10⁴ · contains letters/digits/spaces · at least one word</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Trim → split on whitespace runs (regex <code>\s+</code>) → join the pieces walking backwards with single spaces.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Let the regex splitter normalise messy spacing; then rebuild from the last word to the first.</p>
<pre class="code" data-lang="java"><code>public String reverseWords(String s) {
    String[] parts = s.trim().split("\s+");
    StringBuilder sb = new StringBuilder();
    for (int i = parts.length - 1; i &gt;= 0; i--) {
        sb.append(parts[i]);
        if (i &gt; 0) sb.append(' ');
    }
    return sb.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"  hello   world  "</code></p>
<table class="tbl">
<tr><th>phase</th><th>value</th></tr>
<tr><td>trim</td><td>"hello   world"</td></tr>
<tr><td>split \s+</td><td>["hello", "world"]</td></tr>
<tr><td>walk backwards</td><td>"world" + " " + "hello" ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Reading a train starting from the CABOOSE: first unload loose cargo (extra spaces), then walk the cars from last to first, coupling each pair with exactly one spacer — the engine ends up at the back and the caboose leads the way.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Delegating whitespace chaos to <code>\s+</code> keeps the logic pure; interviewers respect candidates who spot where NOT to hand-roll parsing.</div>`});

/* Problem 279 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q279 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 279 · EASY</span>Reverse Words in a String III</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">String</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Reverse EVERY word's letters, but keep word ORDER and single spaces exactly as they are.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input:  "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 10⁴ · words separated by single spaces · no leading/trailing spaces</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Convert to a char array; detect each word's end at the space (or end of string), then mirror that segment in place with two pointers.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>One scan finds word boundaries; each boundary triggers an in-place mirror of [start, i−1].</p>
<pre class="code" data-lang="java"><code>public String reverseWords(String s) {
    char[] c = s.toCharArray();
    int n = c.length, start = 0;
    for (int i = 0; i &lt;= n; i++) {
        if (i == n || c[i] == ' ') {
            for (int l = start, r = i - 1; l &lt; r; l++, r--) {
                char t = c[l]; c[l] = c[r]; c[r] = t;
            }
            start = i + 1;
        }
    }
    return new String(c);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"abc def"</code></p>
<table class="tbl">
<tr><th>i</th><th>event</th><th>segment flipped</th><th>array</th></tr>
<tr><td>3</td><td>space → close "abc"</td><td>[a..c] ↔ [c..a]</td><td>"cba def"</td></tr>
<tr><td>7 (=n)</td><td>end → close "def"</td><td>[d..f] ↔ [f..d]</td><td>"cba fed" ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each character mirrored once. Space: O(n) for the char copy.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A mirror maze inside each train carriage: every carriage flips its passengers left-to-right, but the CARRIAGES themselves stay in the same order on the track. Step off and your name reads backwards — yet you boarded exactly where you started.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The loop running to <code>i == n</code> treats end-of-string as a virtual space — one sentinel removes all special-casing of the final word.</div>`});

/* Problem 280 */
B.spread(
{ kicker: 'DSA · CYCLIC SORT', head: 'Q280 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 280 · EASY</span>Squares of a Sorted Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Two Pointers</span><span class="pill">No Sort Call</span></div>
<p class="dropcap">Given a NON-DECREASING array (negatives allowed), return the array of each element SQUARED, also sorted non-decreasing — ideally in O(n).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ nums.length ≤ 10⁴ · sorted non-decreasing · values up to 10⁴ in magnitude</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The LARGEST square must come from one of the two ENDS. Two pointers compete; the winner fills the output from the BACK.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Left/right pointers bracket the biggest magnitudes; each round writes the bigger square into the next-from-last empty slot.</p>
<pre class="code" data-lang="java"><code>public int[] sortedSquares(int[] nums) {
    int n = nums.length, l = 0, r = n - 1;
    int[] out = new int[n];
    for (int p = n - 1; p &gt;= 0; p--) {
        if (Math.abs(nums[l]) &gt; Math.abs(nums[r]))
            out[p] = nums[l] * nums[l++];
        else
            out[p] = nums[r] * nums[r--];
    }
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[-4,-1,0,3,10]</code></p>
<table class="tbl">
<tr><th>p</th><th>|left| vs |right|</th><th>writes</th><th>out so far</th></tr>
<tr><td>4</td><td>4 vs 10</td><td>10² = 100, r→3</td><td>[_,_,_,_,100]</td></tr>
<tr><td>3</td><td>4 vs 3</td><td>(−4)² = 16, l→1</td><td>[_,_,_,16,100]</td></tr>
<tr><td>2</td><td>1 vs 3</td><td>3² = 9, r→2</td><td>[_,_,9,16,100]</td></tr>
<tr><td>1</td><td>1 vs 0</td><td>(−1)² = 1, l→2</td><td>[_,1,9,16,100]</td></tr>
<tr><td>0</td><td>meet at 0</td><td>0² = 0</td><td>[0,1,9,16,100] ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n) for the output only.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A valley path: negatives climb on the left slope, positives descend on the right. The FARTHER a hiker stands from the flat middle, the bigger their square — and those farthest always stand at the trail's two ends. Two guides start at both ends; whoever is farther from the middle claims the topmost remaining trophy shelf, stepping inward as they go.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Squaring makes the input "mountain-shaped", so maxima live at the ends — filling output right-to-left converts that fact directly into a sorted result with zero comparisons wasted.</div>`});
})();