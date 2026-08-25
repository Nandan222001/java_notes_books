/* ===== CHAPTER 39 · DSA: Dynamic Programming (1D) ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 39, 'DSA: Dynamic Programming (1D)');

/* Problem 071 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q071 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 071 · EASY</span>Climbing Stairs</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">DP</span></div>
<p class="dropcap">You're climbing a staircase with <code>n</code> steps. Each move you can climb 1 or 2 steps. How many distinct ways can you reach the top?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 4
Output: 5
Explanation: (1,1,1,1), (1,1,2), (1,2,1), (2,1,1), (2,2)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 45</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The ways to reach step n is the sum of the ways to reach step n-1 and step n-2 — sound familiar? It's Fibonacci in disguise.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Let <code>dp[i]</code> be the number of ways to reach step i. Base cases <code>dp[1]=1, dp[2]=2</code>; then <code>dp[i] = dp[i-1] + dp[i-2]</code> since the last move was either a 1-step or a 2-step.</p>
<pre class="code" data-lang="java"><code>public int climbStairs(int n) {
    if (n &lt;= 2) return n;
    int[] dp = new int[n + 1];
    dp[1] = 1; dp[2] = 2;
    for (int i = 3; i &lt;= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 4</code></p>
<table class="tbl">
<tr><th>i</th><th>dp[i-1]</th><th>dp[i-2]</th><th>dp[i]</th></tr>
<tr><td>1</td><td>—</td><td>—</td><td>1</td></tr>
<tr><td>2</td><td>—</td><td>—</td><td>2</td></tr>
<tr><td>3</td><td>2</td><td>1</td><td>3</td></tr>
<tr><td>4</td><td>3</td><td>2</td><td>5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n), reducible to O(1) with two rolling variables.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever "count the ways" has an overlapping recursive structure, write the recurrence first — the code follows directly.</div>`});

/* Problem 072 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q072 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 072 · MEDIUM</span>House Robber</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">ARRAY</span></div>
<p class="dropcap">You're a robber planning heists along a street. Each house <code>i</code> holds <code>nums[i]</code> cash, but adjacent houses share a connected alarm system — rob two neighbors on the same night and the police get called. Return the maximum money you can rob without triggering an alarm.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house0 (2) + house2 (9) + house4 (1) = 12</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 100</li><li>0 &lt;= nums[i] &lt;= 400</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>At house i you either skip it (keep dp[i-1]) or rob it (dp[i-2] + nums[i]) — take the better of the two.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Let <code>dp[i]</code> be the max loot achievable using houses <code>0..i</code>. Either house i is skipped (<code>dp[i-1]</code>) or robbed, adding <code>nums[i]</code> to the best total from two houses back (<code>dp[i-2] + nums[i]</code>). Base cases: <code>dp[0] = nums[0]</code>, <code>dp[1] = max(nums[0], nums[1])</code>.</p>
<pre class="code" data-lang="java"><code>public int rob(int[] nums) {
    int n = nums.length;
    if (n == 1) return nums[0];
    int[] dp = new int[n];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (int i = 2; i &lt; n; i++)
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    return dp[n - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [2,7,9,3,1]</code></p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>dp[i-1]</th><th>dp[i-2]+nums[i]</th><th>dp[i]</th></tr>
<tr><td>0</td><td>2</td><td>—</td><td>—</td><td>2</td></tr>
<tr><td>1</td><td>7</td><td>—</td><td>—</td><td>7</td></tr>
<tr><td>2</td><td>9</td><td>7</td><td>2+9=11</td><td>11</td></tr>
<tr><td>3</td><td>3</td><td>11</td><td>7+3=10</td><td>11</td></tr>
<tr><td>4</td><td>1</td><td>11</td><td>11+1=12</td><td>12</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n), reducible to O(1) using two rolling variables instead of an array.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Skip it or take it" at every index is the DP fingerprint for non-adjacent selection problems.</div>`});

/* Problem 073 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q073 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 073 · MEDIUM</span>House Robber II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">ARRAY</span></div>
<p class="dropcap">Same street, but now it's a circle — house 0 and the last house are neighbors too. Return the maximum money you can rob without robbing two adjacent houses, where "adjacent" wraps around the ends.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [2,3,2,5]
Output: 8
Explanation: Rob house1 (3) + house3 (5) = 8. House0 and house3 can't
both be taken since the street loops back on itself.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 100</li><li>0 &lt;= nums[i] &lt;= 1000</li><li>If <code>nums.length == 1</code>, simply return <code>nums[0]</code>.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A circle only means house0 and the last house can't both be robbed — run the linear House Robber twice, once excluding the last house and once excluding the first, then take the max.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Break the circle into two linear subproblems: rob houses <code>[0, n-2]</code> (excludes the last house) or houses <code>[1, n-1]</code> (excludes the first). Run the ordinary House Robber 1D dp on each range and return the larger result.</p>
<pre class="code" data-lang="java"><code>public int rob(int[] nums) {
    int n = nums.length;
    if (n == 1) return nums[0];
    return Math.max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
}

private int robLinear(int[] nums, int lo, int hi) {
    int len = hi - lo + 1;
    int[] dp = new int[len];
    dp[0] = nums[lo];
    if (len &gt; 1) dp[1] = Math.max(nums[lo], nums[lo + 1]);
    for (int i = 2; i &lt; len; i++)
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[lo + i]);
    return dp[len - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [2,3,2,5]</code></p>
<table class="tbl">
<tr><th>Case</th><th>i</th><th>house value</th><th>dp[i-1]</th><th>dp[i-2]+val</th><th>dp[i]</th></tr>
<tr><td>A: houses[0..2]=[2,3,2]</td><td>0</td><td>2</td><td>—</td><td>—</td><td>2</td></tr>
<tr><td></td><td>1</td><td>3</td><td>—</td><td>—</td><td>3</td></tr>
<tr><td></td><td>2</td><td>2</td><td>3</td><td>2+2=4</td><td>4</td></tr>
<tr><td>B: houses[1..3]=[3,2,5]</td><td>0</td><td>3</td><td>—</td><td>—</td><td>3</td></tr>
<tr><td></td><td>1</td><td>2</td><td>—</td><td>—</td><td>3</td></tr>
<tr><td></td><td>2</td><td>5</td><td>3</td><td>3+5=8</td><td>8</td></tr>
</table>
<p class="fs13">Result = max(Case A = 4, Case B = 8) = <b>8</b>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — two linear passes. Space: O(n), reducible to O(1) with rolling variables per pass.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Breaking a circular constraint into two linear DP subproblems is a recurring trick — reach for it whenever "the ends touch."</div>`});

/* Problem 074 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q074 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 074 · MEDIUM</span>Longest Increasing Subsequence</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">ARRAY</span></div>
<p class="dropcap">Given an integer array, find the length of the longest strictly increasing subsequence. Elements of the subsequence need not be contiguous, but must keep their original relative order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The LIS is [2,3,7,101] (or [2,3,7,18]) — length 4.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 2500</li><li>-10^4 &lt;= nums[i] &lt;= 10^4</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i] = length of the LIS ending exactly at index i. For every earlier index j with nums[j] &lt; nums[i], dp[i] can extend dp[j] by one.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[i] holds the LIS length ending at index i. Initialize every dp[i] = 1 (the element alone counts as length 1). For each i, scan all j &lt; i; whenever nums[j] &lt; nums[i], dp[i] = max(dp[i], dp[j] + 1). The final answer is the max across the whole dp array — not necessarily dp[n-1].</p>
<pre class="code" data-lang="java"><code>public int lengthOfLIS(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    int best = 1;
    for (int i = 1; i &lt; n; i++) {
        for (int j = 0; j &lt; i; j++)
            if (nums[j] &lt; nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
        best = Math.max(best, dp[i]);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [10,9,2,5,3,7,101,18]</code></p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>best j (nums[j]&lt;nums[i])</th><th>dp[i]</th></tr>
<tr><td>0</td><td>10</td><td>none</td><td>1</td></tr>
<tr><td>1</td><td>9</td><td>none</td><td>1</td></tr>
<tr><td>2</td><td>2</td><td>none</td><td>1</td></tr>
<tr><td>3</td><td>5</td><td>j=2 (val 2, dp 1)</td><td>2</td></tr>
<tr><td>4</td><td>3</td><td>j=2 (val 2, dp 1)</td><td>2</td></tr>
<tr><td>5</td><td>7</td><td>j=3/4 (dp 2)</td><td>3</td></tr>
<tr><td>6</td><td>101</td><td>j=5 (val 7, dp 3)</td><td>4</td></tr>
<tr><td>7</td><td>18</td><td>j=5 (val 7, dp 3)</td><td>4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(n) for dp. A patience-sorting variant with binary search reaches O(n log n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"dp[i] = best ending exactly at i" — not "best using the first i elements" — is the pattern whenever a subsequence must terminate at a fixed index.</div>`});

/* Problem 075 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q075 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 075 · MEDIUM</span>Coin Change</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">UNBOUNDED KNAPSACK</span></div>
<p class="dropcap">You're given coin denominations and a target amount. Using an unlimited supply of each coin, return the fewest coins needed to make up that amount exactly — or <code>-1</code> if it's impossible.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= coins.length &lt;= 12</li><li>1 &lt;= coins[i] &lt;= 2³¹-1</li><li>0 &lt;= amount &lt;= 10^4</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[a] = 1 + min(dp[a-c]) over every coin c &lt;= a. Each coin can be reused freely — this is the unbounded knapsack recurrence.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[a] is the minimum coins to form amount a, with dp[0] = 0. Fill dp for a = 1..amount; for every coin c &lt;= a, dp[a] = min(dp[a], dp[a-c] + 1). Seed all non-zero entries with a sentinel (amount+1, standing in for "infinity").</p>
<pre class="code" data-lang="java"><code>public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int a = 1; a &lt;= amount; a++)
        for (int c : coins)
            if (c &lt;= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    return dp[amount] &gt; amount ? -1 : dp[amount];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>coins = [1,2,5], amount = 11</code></p>
<table class="tbl">
<tr><th>a</th><th>via coin 1</th><th>via coin 2</th><th>via coin 5</th><th>dp[a]</th></tr>
<tr><td>0</td><td>—</td><td>—</td><td>—</td><td>0</td></tr>
<tr><td>1</td><td>dp0+1=1</td><td>—</td><td>—</td><td>1</td></tr>
<tr><td>2</td><td>dp1+1=2</td><td>dp0+1=1</td><td>—</td><td>1</td></tr>
<tr><td>3</td><td>dp2+1=2</td><td>dp1+1=2</td><td>—</td><td>2</td></tr>
<tr><td>4</td><td>dp3+1=3</td><td>dp2+1=2</td><td>—</td><td>2</td></tr>
<tr><td>5</td><td>dp4+1=3</td><td>dp3+1=3</td><td>dp0+1=1</td><td>1</td></tr>
<tr><td>6</td><td>dp5+1=2</td><td>dp4+1=3</td><td>dp1+1=2</td><td>2</td></tr>
<tr><td>7</td><td>dp6+1=3</td><td>dp5+1=2</td><td>dp2+1=2</td><td>2</td></tr>
<tr><td>8</td><td>dp7+1=3</td><td>dp6+1=3</td><td>dp3+1=3</td><td>3</td></tr>
<tr><td>9</td><td>dp8+1=4</td><td>dp7+1=3</td><td>dp4+1=3</td><td>3</td></tr>
<tr><td>10</td><td>dp9+1=4</td><td>dp8+1=4</td><td>dp5+1=2</td><td>2</td></tr>
<tr><td>11</td><td>dp10+1=3</td><td>dp9+1=4</td><td>dp6+1=3</td><td>3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(amount × coins.length). Space: O(amount).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>dp[a-c]+1 across every coin is the unbounded-knapsack shape — the same recurrence reappears in "minimum perfect squares" and "min jumps to reach n."</div>`});

/* Problem 076 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q076 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 076 · MEDIUM</span>Maximum Subarray</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">KADANE'S</span></div>
<p class="dropcap">Given an integer array (it may contain negatives), find the contiguous subarray with the largest sum and return that sum.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10^5</li><li>-10^4 &lt;= nums[i] &lt;= 10^4</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i] = best sum of a subarray ENDING at i. At each step, either extend the running subarray or restart fresh at nums[i] — whichever is larger.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[i] = max(nums[i], dp[i-1] + nums[i]) — extend the previous run, or abandon it and restart at i when the running sum has turned into dead weight. Track the maximum dp[i] seen across the whole array; this is Kadane's algorithm.</p>
<pre class="code" data-lang="java"><code>public int maxSubArray(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    dp[0] = nums[0];
    int best = dp[0];
    for (int i = 1; i &lt; n; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        best = Math.max(best, dp[i]);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [-2,1,-3,4,-1,2,1,-5,4]</code></p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>dp[i-1]+nums[i]</th><th>dp[i]</th></tr>
<tr><td>0</td><td>-2</td><td>—</td><td>-2</td></tr>
<tr><td>1</td><td>1</td><td>-2+1=-1</td><td>1</td></tr>
<tr><td>2</td><td>-3</td><td>1-3=-2</td><td>-2</td></tr>
<tr><td>3</td><td>4</td><td>-2+4=2</td><td>4</td></tr>
<tr><td>4</td><td>-1</td><td>4-1=3</td><td>3</td></tr>
<tr><td>5</td><td>2</td><td>3+2=5</td><td>5</td></tr>
<tr><td>6</td><td>1</td><td>5+1=6</td><td><b>6</b></td></tr>
<tr><td>7</td><td>-5</td><td>6-5=1</td><td>1</td></tr>
<tr><td>8</td><td>4</td><td>1+4=5</td><td>5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n), trivially O(1) since only dp[i-1] is ever read.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Extend or restart" is the archetypal 1D DP move — the same idea powers Maximum Product Subarray with a sign-tracking twist.</div>`});

/* Problem 077 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q077 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 077 · MEDIUM</span>Word Break</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">STRING</span><span class="pill">HASH SET</span></div>
<p class="dropcap">Given a string <code>s</code> and a dictionary of words, determine whether <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words. Dictionary words may be reused any number of times.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: "leetcode" = "leet" + "code"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 300</li><li>1 &lt;= wordDict.length &lt;= 1000</li><li>1 &lt;= wordDict[i].length &lt;= 20, lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i] means "s[0..i) is fully segmentable." dp[i] is true if some earlier split point j has dp[j] true AND s[j..i) is a dictionary word.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[0] = true (an empty prefix trivially segments). For each end position i from 1..n, try every split point j &lt; i: if dp[j] is true and the substring s[j,i) is in the dictionary, set dp[i] = true. A HashSet gives O(1) word lookups.</p>
<pre class="code" data-lang="java"><code>public boolean wordBreak(String s, List&lt;String&gt; wordDict) {
    Set&lt;String&gt; dict = new HashSet&lt;&gt;(wordDict);
    int n = s.length();
    boolean[] dp = new boolean[n + 1];
    dp[0] = true;
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 0; j &lt; i; j++) {
            if (dp[j] &amp;&amp; dict.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "leetcode"</code>, dict = {"leet","code"}</p>
<table class="tbl">
<tr><th>i</th><th>s[0..i)</th><th>split that works</th><th>dp[i]</th></tr>
<tr><td>0</td><td>""</td><td>base case</td><td>true</td></tr>
<tr><td>1</td><td>"l"</td><td>none</td><td>false</td></tr>
<tr><td>2</td><td>"le"</td><td>none</td><td>false</td></tr>
<tr><td>3</td><td>"lee"</td><td>none</td><td>false</td></tr>
<tr><td>4</td><td>"leet"</td><td>j=0, "leet" ∈ dict</td><td>true</td></tr>
<tr><td>5</td><td>"leetc"</td><td>none</td><td>false</td></tr>
<tr><td>6</td><td>"leetco"</td><td>none</td><td>false</td></tr>
<tr><td>7</td><td>"leetcod"</td><td>none</td><td>false</td></tr>
<tr><td>8</td><td>"leetcode"</td><td>j=4, "code" ∈ dict</td><td>true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n² · avg word length) for the substring checks. Space: O(n) for dp plus the dictionary set.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"dp[i] = can I cleanly stop right before position i" is a distinct flavor from "dp[i] = value ending at i" — pin down which one a problem wants before coding.</div>`});

/* Problem 078 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q078 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 078 · MEDIUM</span>Decode Ways</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">STRING</span></div>
<p class="dropcap">A message of digits maps to letters via <code>A=1 ... Z=26</code>. Given a digit string <code>s</code>, count the number of ways it can be decoded. A group with a leading zero (like "06") is never valid.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "12226"
Output: 8
Explanation: Valid splits include "1 2 2 2 6", "12 2 2 6", "1 22 2 6",
"12 22 6", "1 2 22 6", and three more — 8 total.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 100</li><li>s consists of digits, possibly including '0'</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i] = ways to decode the first i characters. A valid trailing single digit (1-9) contributes dp[i-1]; a valid trailing two-digit group (10-26) contributes dp[i-2].</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[0] = 1 (empty prefix, one trivial way). dp[1] = 1 if s[0] != '0' else 0. For i &gt;= 2, inspect the last one and two characters: if the last digit is non-zero, add dp[i-1]; if the last two digits form 10-26, add dp[i-2].</p>
<pre class="code" data-lang="java"><code>public int numDecodings(String s) {
    int n = s.length();
    int[] dp = new int[n + 1];
    dp[0] = 1;
    dp[1] = s.charAt(0) != '0' ? 1 : 0;
    for (int i = 2; i &lt;= n; i++) {
        int one = s.charAt(i - 1) - '0';
        int two = Integer.parseInt(s.substring(i - 2, i));
        if (one &gt;= 1) dp[i] += dp[i - 1];
        if (two &gt;= 10 &amp;&amp; two &lt;= 26) dp[i] += dp[i - 2];
    }
    return dp[n];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "12226"</code></p>
<table class="tbl">
<tr><th>i</th><th>last digit</th><th>last 2 digits</th><th>+dp[i-1]?</th><th>+dp[i-2]?</th><th>dp[i]</th></tr>
<tr><td>0</td><td>—</td><td>—</td><td>—</td><td>—</td><td>1</td></tr>
<tr><td>1</td><td>'1' ✓</td><td>—</td><td>—</td><td>—</td><td>1</td></tr>
<tr><td>2</td><td>'2' ✓</td><td>"12" ✓</td><td>+1</td><td>+1</td><td>2</td></tr>
<tr><td>3</td><td>'2' ✓</td><td>"22" ✓</td><td>+2</td><td>+1</td><td>3</td></tr>
<tr><td>4</td><td>'2' ✓</td><td>"22" ✓</td><td>+3</td><td>+2</td><td>5</td></tr>
<tr><td>5</td><td>'6' ✓</td><td>"26" ✓</td><td>+5</td><td>+3</td><td><b>8</b></td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n), reducible to O(1) with two rolling variables.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Watch the leading-zero trap: "0" alone, or any two-digit group starting with '0' (e.g. "05"), contributes nothing — the #1 bug source in this problem.</div>`});

/* Problem 079 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q079 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 079 · MEDIUM</span>Partition Equal Subset Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">0/1 KNAPSACK</span></div>
<p class="dropcap">Given a positive-integer array, determine whether it can be partitioned into two subsets whose sums are equal. Every element must belong to exactly one subset.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,5,11,5]
Output: true
Explanation: {1,5,5} and {11} both sum to 11.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 200</li><li>1 &lt;= nums[i] &lt;= 100</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>If the total sum is odd, return false immediately — it can never split evenly. Otherwise this is 0/1 knapsack: can some subset hit exactly target = sum/2?</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>target = sum/2. dp[j] = true if some subset of the numbers processed so far sums to exactly j. dp[0] = true. For each number, update dp from high j down to num — descending order ensures each number is used at most once (the classic 0/1 knapsack trick with a 1D array).</p>
<pre class="code" data-lang="java"><code>public boolean canPartition(int[] nums) {
    int sum = 0;
    for (int x : nums) sum += x;
    if (sum % 2 != 0) return false;
    int target = sum / 2;
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;
    for (int num : nums) {
        for (int j = target; j &gt;= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,5,11,5]</code>, sum = 22 (even), target = 11</p>
<table class="tbl">
<tr><th>step</th><th>num processed</th><th>sums reachable so far</th><th>dp[target]</th></tr>
<tr><td>0</td><td>— (init)</td><td>{0}</td><td>false</td></tr>
<tr><td>1</td><td>1</td><td>{0,1}</td><td>false</td></tr>
<tr><td>2</td><td>5</td><td>{0,1,5,6}</td><td>false</td></tr>
<tr><td>3</td><td>11</td><td>{0,1,5,6,11}</td><td><b>true</b></td></tr>
<tr><td>4</td><td>5</td><td>{0,1,5,6,10,11}</td><td>true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n × target). Space: O(target).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The descending inner loop (j from target down to num) is what makes this 0/1 — looping ascending instead silently turns it into unbounded knapsack, a favorite "spot the bug" interview twist.</div>`});

/* Problem 080 */
B.spread(
{ kicker: 'DSA · DYNAMIC PROGRAMMING', head: 'Q080 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 080 · MEDIUM</span>Jump Game</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">GREEDY</span><span class="pill">ARRAY</span></div>
<p class="dropcap">Given an array where <code>nums[i]</code> is the maximum jump length from index <code>i</code>, determine whether you can reach the last index starting from index 0.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index0 to index1, then 3 steps to the last index.

Contrast: nums = [3,2,1,0,4] -> false (stuck at index3, which has a 0).</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10^4</li><li>0 &lt;= nums[i] &lt;= 10^5</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i] = true if index i is reachable at all. It's reachable if some earlier reachable index j can jump at least as far as i, i.e. j + nums[j] &gt;= i.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[0] = true. For each i, scan earlier reachable indices j &lt; i; if dp[j] is true and j + nums[j] &gt;= i, then dp[i] = true. The answer is dp[n-1]. (A greedy single pass tracking the farthest reachable index also solves this in O(n) — the dp[] framing just makes the reachability recurrence explicit.)</p>
<pre class="code" data-lang="java"><code>public boolean canJump(int[] nums) {
    int n = nums.length;
    boolean[] dp = new boolean[n];
    dp[0] = true;
    for (int i = 1; i &lt; n; i++) {
        for (int j = 0; j &lt; i; j++) {
            if (dp[j] &amp;&amp; j + nums[j] &gt;= i) { dp[i] = true; break; }
        }
    }
    return dp[n - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [2,3,1,1,4]</code></p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>reachable via j (j+nums[j])</th><th>dp[i]</th></tr>
<tr><td>0</td><td>2</td><td>base case</td><td>true</td></tr>
<tr><td>1</td><td>3</td><td>j=0: 0+2=2 &gt;= 1</td><td>true</td></tr>
<tr><td>2</td><td>1</td><td>j=0: 0+2=2 &gt;= 2</td><td>true</td></tr>
<tr><td>3</td><td>1</td><td>j=1: 1+3=4 &gt;= 3</td><td>true</td></tr>
<tr><td>4</td><td>4</td><td>j=1: 1+3=4 &gt;= 4</td><td><b>true</b></td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) for this DP framing; the greedy farthest-reach variant does it in O(n). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Many "can I get there" problems have both a DP formulation (explicit, O(n²)) and a greedy one-pass formulation (implicit, O(n)) — know both, and know why the greedy shortcut is safe (once index i is reachable, its whole jump range becomes available).</div>`});

})();
