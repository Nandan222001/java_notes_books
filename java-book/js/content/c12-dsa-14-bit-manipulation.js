/* ===== CHAPTER 45 · DSA: Bit Manipulation ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 45, 'DSA: Bit Manipulation');

/* Problem 131 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q131 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 131 · EASY</span>Single Number</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Given a non-empty array <code>nums</code> where every element appears exactly twice except for one, find that single one. Must run in linear time with O(1) extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [4,1,2,1,2]
Output: 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 3×10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>XOR-ing a number with itself gives 0, and XOR is commutative/associative — XOR the whole array and every pair cancels out.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>XOR all elements together. Since <code>x ^ x = 0</code> and <code>x ^ 0 = x</code>, every duplicated pair cancels to zero, leaving only the unpaired element in the running XOR.</p>
<pre class="code" data-lang="java"><code>public int singleNumber(int[] nums) {
    int result = 0;
    for (int n : nums) result ^= n;
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [4,1,2,1,2]</code></p>
<table class="tbl">
<tr><th>n</th><th>result before</th><th>result = result ^ n</th></tr>
<tr><td>4</td><td>0</td><td>4</td></tr>
<tr><td>1</td><td>4</td><td>5</td></tr>
<tr><td>2</td><td>5</td><td>7</td></tr>
<tr><td>1</td><td>7</td><td>6</td></tr>
<tr><td>2</td><td>6</td><td>4</td></tr>
</table>
<p class="fs13">Final <code>result = 4</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever "everything appears twice except one" shows up, XOR is almost always the intended O(1)-space trick.</div>`});

/* Problem 132 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q132 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 132 · MEDIUM</span>Single Number II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Given an integer array <code>nums</code> where every element appears exactly <strong>three</strong> times except for one, which appears exactly once, find that single element. Must run in linear time with O(1) extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [2,2,3,2]
Output: 3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 3×10⁴</li><li>-2³¹ &lt;= nums[i] &lt;= 2³¹ - 1</li><li>Each element appears exactly three times except one, which appears once</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Plain XOR only cancels pairs. Track each bit's occurrence count mod 3 instead — a two-variable state machine (<code>ones</code>, <code>twos</code>) does this in one pass.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>ones</code> holds the bits seen exactly once so far (mod 3), <code>twos</code> the bits seen exactly twice. On each new number, a bit that reaches "three" is cleared from both via the <code>&amp; ~</code> masks. After processing every element, bits appearing three times cancel completely and <code>ones</code> holds the answer.</p>
<pre class="code" data-lang="java"><code>public int singleNumber(int[] nums) {
    int ones = 0, twos = 0;
    for (int n : nums) {
        ones = (ones ^ n) &amp; ~twos;
        twos = (twos ^ n) &amp; ~ones;
    }
    return ones;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [2,2,3,2]</code></p>
<table class="tbl">
<tr><th>n</th><th>ones</th><th>twos</th><th>note</th></tr>
<tr><td>2</td><td>2</td><td>0</td><td>ones=(0^2)&amp;~0=2; twos=(0^2)&amp;~2=0</td></tr>
<tr><td>2</td><td>0</td><td>2</td><td>ones=(2^2)&amp;~0=0; twos=(0^2)&amp;~0=2</td></tr>
<tr><td>3</td><td>1</td><td>0</td><td>ones=(0^3)&amp;~2=1; twos=(2^3)&amp;~1=0</td></tr>
<tr><td>2</td><td>3</td><td>0</td><td>ones=(1^2)&amp;~0=3; twos=(0^2)&amp;~3=0</td></tr>
</table>
<p class="fs13">Final <code>ones = 3</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The "appears k times except one" family generalizes: track counts mod k per bit, either with a k-state bitmask machine or by summing each bit position across all 32 bits.</div>`});

/* Problem 133 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q133 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 133 · EASY</span>Number of 1 Bits</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Write a function that takes an unsigned integer and returns the number of <code>1</code> bits it has (also known as the Hamming weight).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input (binary): 00000000000000000000000000001011
Output: 3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>The input is a 32-bit unsigned integer</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span><code>n &amp; (n-1)</code> clears the lowest set bit of <code>n</code>. Count how many times you can do that before <code>n</code> becomes 0.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Subtracting 1 from <code>n</code> flips every trailing zero to 1 and the lowest set bit to 0; ANDing with the original <code>n</code> therefore clears exactly that one bit. Repeating until <code>n</code> is 0 counts the set bits directly, without ever scanning zero bits.</p>
<pre class="code" data-lang="java"><code>public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &amp;= (n - 1);
        count++;
    }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 1011</code> (binary, decimal 11)</p>
<table class="tbl">
<tr><th>n (before)</th><th>n - 1</th><th>n &amp; (n-1)</th><th>count</th></tr>
<tr><td>1011</td><td>1010</td><td>1010</td><td>1</td></tr>
<tr><td>1010</td><td>1001</td><td>1000</td><td>2</td></tr>
<tr><td>1000</td><td>0111</td><td>0000</td><td>3</td></tr>
</table>
<p class="fs13">n is now 0 → loop ends, return <code>count = 3</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(k) where k is the number of set bits (≤ 32). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span><code>n &amp; (n-1)</code> — "drop the lowest set bit" — is the single most reused one-liner in bit manipulation; it also powers Power of Two and Counting Bits.</div>`});

/* Problem 134 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q134 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 134 · EASY</span>Counting Bits</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Dynamic Programming</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Given an integer <code>n</code>, return an array <code>ans</code> of length <code>n + 1</code> where <code>ans[i]</code> is the number of <code>1</code> bits in the binary representation of <code>i</code>, for every <code>i</code> from 0 to <code>n</code>. Aim for a single O(n) pass, ideally without calling a built-in popcount per element.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 5
Output: [0,1,1,2,1,2]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= n &lt;= 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every integer <code>i</code> is <code>i &gt;&gt; 1</code> with one extra bit tacked on. Reuse the already-computed answer for <code>i &gt;&gt; 1</code> instead of recounting from scratch.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>This is DP riding on a bit-shift recurrence: <code>dp[i] = dp[i &gt;&gt; 1] + (i &amp; 1)</code>. Right-shifting <code>i</code> by one drops its last bit, so its popcount is the popcount of that smaller prefix plus whatever bit just fell off — which is exactly <code>i &amp; 1</code>.</p>
<pre class="code" data-lang="java"><code>public int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i &lt;= n; i++) {
        dp[i] = dp[i &gt;&gt; 1] + (i &amp; 1);
    }
    return dp;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 5</code></p>
<table class="tbl">
<tr><th>i</th><th>i &gt;&gt; 1</th><th>dp[i&gt;&gt;1]</th><th>i &amp; 1</th><th>dp[i]</th></tr>
<tr><td>0</td><td>—</td><td>—</td><td>—</td><td>0 (base)</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>2</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>3</td><td>1</td><td>1</td><td>1</td><td>2</td></tr>
<tr><td>4</td><td>2</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>5</td><td>2</td><td>1</td><td>1</td><td>2</td></tr>
</table>
<p class="fs13">Final <code>dp = [0,1,1,2,1,2]</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n) for the output (O(1) extra).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Build the answer for i from an already-solved smaller i" turns an O(n log n) per-element popcount loop into a clean O(n) DP.</div>`});

/* Problem 135 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q135 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 135 · EASY</span>Reverse Bits</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Reverse the bits of a given 32-bit unsigned integer.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input:  00000010100101000001111010011100
Output: 00111001011110000010100101000000</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>The input is a 32-bit unsigned integer</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Build the result one bit at a time: shift the result left to make room, drop in <code>n</code>'s lowest bit, then shift <code>n</code> right (unsigned) to expose the next one. 32 iterations reverses the whole word.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Peel the lowest bit off <code>n</code> with <code>n &amp; 1</code>, append it to the low end of a growing <code>result</code> that is itself shifted left each round (so the first bit peeled off ends up highest), then shift <code>n</code> right with the <em>unsigned</em> operator <code>&gt;&gt;&gt;</code> so no sign bit leaks in. After 32 rounds every bit has moved to its mirrored position.</p>
<pre class="code" data-lang="java"><code>public int reverseBits(int n) {
    int result = 0;
    for (int i = 0; i &lt; 32; i++) {
        result &lt;&lt;= 1;
        result |= (n &amp; 1);
        n &gt;&gt;&gt;= 1;
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Illustrating with an 8-bit slice <code>n = 10011100</code> — the real loop does exactly this, 32 times</p>
<table class="tbl">
<tr><th>step</th><th>n &amp; 1</th><th>result (after)</th><th>n (after &gt;&gt;&gt;1)</th></tr>
<tr><td>1</td><td>0</td><td>0</td><td>0100111</td></tr>
<tr><td>2</td><td>0</td><td>00</td><td>0010011</td></tr>
<tr><td>3</td><td>1</td><td>001</td><td>0001001</td></tr>
<tr><td>4</td><td>1</td><td>0011</td><td>0000100</td></tr>
<tr><td>5</td><td>1</td><td>00111</td><td>0000010</td></tr>
<tr><td>6</td><td>0</td><td>001110</td><td>0000001</td></tr>
<tr><td>7</td><td>0</td><td>0011100</td><td>0000000</td></tr>
<tr><td>8</td><td>1</td><td>00111001</td><td>0000000</td></tr>
</table>
<p class="fs13">Final <code>result = 00111001</code> — the exact reverse of <code>10011100</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(32) = O(1). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Always reach for <code>&gt;&gt;&gt;</code>, not <code>&gt;&gt;</code>, when shifting bits you intend to reinterpret as unsigned — the arithmetic right shift sign-extends and silently corrupts the high bits.</div>`});

/* Problem 136 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q136 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 136 · EASY</span>Missing Number</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Given an array <code>nums</code> containing <code>n</code> distinct numbers taken from the range <code>[0, n]</code>, return the one number in that range missing from the array.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [3,0,1]
Output: 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == nums.length</li><li>1 &lt;= n &lt;= 10⁴</li><li>0 &lt;= nums[i] &lt;= n, all values distinct</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>XOR the indices 0..n with the array values together — every present number cancels with its matching index, leaving only the missing one.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Start an accumulator at <code>n</code> (the one index with no array slot), then XOR in both <code>i</code> and <code>nums[i]</code> for every position. Every value that actually appears gets XOR-ed once as an index and once as a value, canceling to zero — only the missing number survives unpaired.</p>
<pre class="code" data-lang="java"><code>public int missingNumber(int[] nums) {
    int result = nums.length;
    for (int i = 0; i &lt; nums.length; i++) {
        result ^= i ^ nums[i];
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [3,0,1]</code>, n = 3 (result starts at 3)</p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>result before</th><th>result = result^i^nums[i]</th></tr>
<tr><td>0</td><td>3</td><td>3</td><td>3^0^3 = 0</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>0^1^0 = 1</td></tr>
<tr><td>2</td><td>1</td><td>1</td><td>1^2^1 = 2</td></tr>
</table>
<p class="fs13">Final <code>result = 2</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Seeding the accumulator with the one "extra" index (<code>n</code>) before the loop is what makes indices and values pair up perfectly — no separate sum-formula or hash set needed.</div>`});

/* Problem 137 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q137 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 137 · MEDIUM</span>Sum of Two Integers</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Math</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Given two integers <code>a</code> and <code>b</code>, return their sum without using the operators <code>+</code> or <code>-</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: a = 2, b = 3
Output: 5</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>-1000 &lt;= a, b &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>XOR adds bits without carrying; AND-then-shift-left computes exactly the carry that XOR dropped. Feed that carry back in and repeat until there's no carry left.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>a ^ b</code> is addition ignoring carries; <code>(a &amp; b) &lt;&lt; 1</code> is exactly the carry that step should have produced. Treat the carry as a new number to add to the XOR result and repeat — this is literally how ripple-carry addition works, just expressed with bitwise ops instead of hardware gates.</p>
<pre class="code" data-lang="java"><code>public int getSum(int a, int b) {
    while (b != 0) {
        int carry = (a &amp; b) &lt;&lt; 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>a = 2 (010), b = 3 (011)</code></p>
<table class="tbl">
<tr><th>a</th><th>b</th><th>carry = (a&amp;b)&lt;&lt;1</th><th>new a = a^b</th><th>new b = carry</th></tr>
<tr><td>010</td><td>011</td><td>(010&amp;011=010)&lt;&lt;1 = 100</td><td>010^011 = 001</td><td>100</td></tr>
<tr><td>001</td><td>100</td><td>(001&amp;100=000)&lt;&lt;1 = 000</td><td>001^100 = 101</td><td>000</td></tr>
</table>
<p class="fs13">b is now 0 → loop ends, return <code>a = 101 = 5</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) — bounded by 32 bit-widths in the worst case. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>XOR is "add without carry", AND-shift-left is "the carry alone" — decomposing addition this way is the same idea a full-adder circuit implements in hardware.</div>`});

/* Problem 138 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q138 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 138 · EASY</span>Power of Two</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Math</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Given an integer <code>n</code>, return <code>true</code> if it is a power of two. Otherwise, return <code>false</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 16
Output: true
Explanation: 16 = 2⁴</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>-2³¹ &lt;= n &lt;= 2³¹ - 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A power of two has exactly one bit set. That means <code>n &amp; (n-1)</code> — the "clear lowest set bit" trick — must produce 0, provided n is positive.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Any power of two has binary form <code>1000...0</code> — a single set bit. Subtracting 1 flips that bit off and every bit below it on, so ANDing with the original leaves 0 only when there was exactly one set bit to begin with. The <code>n &gt; 0</code> guard rules out zero and negatives, which would otherwise pass the AND check spuriously.</p>
<pre class="code" data-lang="java"><code>public boolean isPowerOfTwo(int n) {
    return n &gt; 0 &amp;&amp; (n &amp; (n - 1)) == 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>n</th><th>binary</th><th>n - 1</th><th>n &amp; (n-1)</th><th>isPowerOfTwo</th></tr>
<tr><td>16</td><td>10000</td><td>01111</td><td>00000</td><td>true</td></tr>
<tr><td>1</td><td>00001</td><td>00000</td><td>00000</td><td>true</td></tr>
<tr><td>3</td><td>00011</td><td>00010</td><td>00010</td><td>false</td></tr>
<tr><td>0</td><td>—</td><td>—</td><td>—</td><td>false (n&gt;0 fails, short-circuits)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Exactly one bit set" is a recurring signature (powers of two, single-bit flags) and <code>n &amp; (n-1) == 0</code> is the standard one-line test for it.</div>`});

/* Problem 139 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q139 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 139 · MEDIUM</span>Bitwise AND of Numbers Range</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Given two integers <code>left</code> and <code>right</code> that represent the range <code>[left, right]</code>, return the bitwise AND of all numbers in this range, inclusive.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: left = 5, right = 7
Output: 4
Explanation: 5 &amp; 6 &amp; 7 = 101 &amp; 110 &amp; 111 = 100 = 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= left &lt;= right &lt;= 2³¹ - 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>ANDing a long run of consecutive numbers zeroes out every bit that ever differs between two numbers in the range. Only the shared binary prefix of <code>left</code> and <code>right</code> survives.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>As numbers increment through the range, every bit position that isn't identical across the whole span gets zeroed by at least one AND. So the answer is just the common binary prefix of <code>left</code> and <code>right</code> with the differing suffix bits zeroed out. Right-shift both until they're equal (that's the shared prefix), counting the shifts, then shift the result back left by that count.</p>
<pre class="code" data-lang="java"><code>public int rangeBitwiseAnd(int left, int right) {
    int shift = 0;
    while (left != right) {
        left &gt;&gt;= 1;
        right &gt;&gt;= 1;
        shift++;
    }
    return left &lt;&lt; shift;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>left = 5 (101), right = 7 (111)</code></p>
<table class="tbl">
<tr><th>shift</th><th>left</th><th>right</th><th>equal?</th></tr>
<tr><td>0</td><td>101</td><td>111</td><td>no → shift both right, shift=1</td></tr>
<tr><td>1</td><td>010</td><td>011</td><td>no → shift both right, shift=2</td></tr>
<tr><td>2</td><td>001</td><td>001</td><td>yes → stop</td></tr>
</table>
<p class="fs13">Result: <code>left &lt;&lt; shift = 001 &lt;&lt; 2 = 100 = 4</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log(right)) — at most 32 shifts. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"AND across a whole range" reduces to "find the longest common binary prefix" — a pattern that also shows up in longest-common-prefix and Trie-style problems.</div>`});

/* Problem 140 */
B.spread(
{ kicker: 'DSA · BIT MANIPULATION', head: 'Q140 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 140 · MEDIUM</span>Single Number III</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Given an integer array <code>nums</code> in which exactly two elements appear only once and all the other elements appear exactly twice, find the two elements that appear only once. Return them in any order, in linear time with O(1) extra space (excluding the output).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,2,1,3,2,5]
Output: [3,5]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 &lt;= nums.length &lt;= 3×10⁴</li><li>-2³¹ &lt;= nums[i] &lt;= 2³¹ - 1</li><li>Exactly two elements appear once; every other element appears exactly twice</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>XOR everything first — the pairs cancel and you're left with <code>a ^ b</code>. Any bit still set there is a bit where <code>a</code> and <code>b</code> differ; use one such bit to split the whole array into two groups, one containing <code>a</code>, the other <code>b</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>XOR the whole array to get <code>xorAll = a ^ b</code> (all paired numbers cancel). Isolate its lowest set bit with <code>xorAll &amp; (-xorAll)</code> — that bit must differ between <code>a</code> and <code>b</code>, since a shared bit would have canceled inside <code>xorAll</code> too. Partition the array by whether each number has that bit set, and XOR within each partition; every pair lands in the same partition and cancels, leaving <code>a</code> in one group and <code>b</code> in the other.</p>
<pre class="code" data-lang="java"><code>public int[] singleNumber(int[] nums) {
    int xorAll = 0;
    for (int n : nums) xorAll ^= n;
    int diffBit = xorAll &amp; (-xorAll);
    int a = 0, b = 0;
    for (int n : nums) {
        if ((n &amp; diffBit) != 0) a ^= n;
        else b ^= n;
    }
    return new int[]{a, b};
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,2,1,3,2,5]</code> — xorAll = 1^2^1^3^2^5 = 6 (110), diffBit = 6 &amp; -6 = 2 (010)</p>
<table class="tbl">
<tr><th>n</th><th>n &amp; diffBit</th><th>group</th><th>a</th><th>b</th></tr>
<tr><td>1</td><td>0</td><td>b</td><td>0</td><td>1</td></tr>
<tr><td>2</td><td>2</td><td>a</td><td>2</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>b</td><td>2</td><td>0</td></tr>
<tr><td>3</td><td>2</td><td>a</td><td>1</td><td>0</td></tr>
<tr><td>2</td><td>2</td><td>a</td><td>3</td><td>0</td></tr>
<tr><td>5</td><td>0</td><td>b</td><td>3</td><td>5</td></tr>
</table>
<p class="fs13">Final <code>a = 3, b = 5</code> → <code>[3, 5]</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — two linear passes. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"XOR to combine, then use the lowest set bit of the result to split the group" is the standard escalation from Single Number to its "two missing/unique values" variants.</div>`});

})();
