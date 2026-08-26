/* ===== CHAPTER 48 · DSA: Dynamic Programming — 2D Grid & Knapsack ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 48, 'DSA: Dynamic Programming — 2D Grid & Knapsack');

/* Problem 161 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q161 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 161 · MEDIUM</span>Unique Paths</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">GRID</span></div>
<p class="dropcap">A robot sits at the top-left corner of an <code>m x n</code> grid and can only move right or down. How many distinct paths are there to the bottom-right corner?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: m = 3, n = 7
Output: 28</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= m, n &lt;= 100</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The number of ways to reach any cell is the sum of the ways to reach the cell above it and the cell to its left.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build a 2D dp grid where <code>dp[i][j]</code> is the number of ways to reach cell (i,j). The first row and column are all 1 (only one way to walk straight along an edge); every other cell sums its top and left neighbors.</p>
<pre class="code" data-lang="java"><code>public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    for (int i = 0; i &lt; m; i++) dp[i][0] = 1;
    for (int j = 0; j &lt; n; j++) dp[0][j] = 1;
    for (int i = 1; i &lt; m; i++)
        for (int j = 1; j &lt; n; j++)
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    return dp[m - 1][n - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>m = 3, n = 3</code> (small grid for clarity)</p>
<table class="tbl">
<tr><th>row</th><th>dp values</th></tr>
<tr><td>0</td><td>[1, 1, 1]</td></tr>
<tr><td>1</td><td>[1, 2, 3]</td></tr>
<tr><td>2</td><td>[1, 3, 6]</td></tr>
</table>
<p class="fs13">Answer = <code>dp[2][2] = 6</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n), reducible to O(n) with a rolling row.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Count the paths" on a grid with only right/down moves is always this same additive DP — memorize the base case (edges = 1), not just the recurrence.</div>`});

/* Problem 162 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q162 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 162 · MEDIUM</span>Unique Paths II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">GRID</span><span class="pill">OBSTACLES</span></div>
<p class="dropcap">Same robot, same grid, but now some cells contain obstacles marked <code>1</code> in <code>obstacleGrid</code> (open cells are <code>0</code>). The robot still only moves right or down and can never step on an obstacle. Return the number of distinct paths to the bottom-right corner.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: The obstacle at the center forces exactly two routes around it.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == obstacleGrid.length, n == obstacleGrid[i].length</li><li>1 &lt;= m, n &lt;= 100</li><li>obstacleGrid[i][j] is 0 or 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Same recurrence as Unique Paths, but any obstacle cell is forced to dp = 0 — it can never be a stepping stone, so it contributes nothing to cells after it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Same additive dp grid as Unique Paths, except any cell with an obstacle is forced to <code>dp[i][j] = 0</code> instead of summing its neighbors — including the start cell itself, which yields 0 paths overall if it's blocked. Everything else still sums top + left.</p>
<pre class="code" data-lang="java"><code>public int uniquePathsWithObstacles(int[][] obstacleGrid) {
    int m = obstacleGrid.length, n = obstacleGrid[0].length;
    int[][] dp = new int[m][n];
    for (int i = 0; i &lt; m; i++) {
        for (int j = 0; j &lt; n; j++) {
            if (obstacleGrid[i][j] == 1) {
                dp[i][j] = 0;
            } else if (i == 0 &amp;&amp; j == 0) {
                dp[i][j] = 1;
            } else {
                int top = (i &gt; 0) ? dp[i - 1][j] : 0;
                int left = (j &gt; 0) ? dp[i][j - 1] : 0;
                dp[i][j] = top + left;
            }
        }
    }
    return dp[m - 1][n - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]</code></p>
<table class="tbl">
<tr><th>row</th><th>grid row</th><th>dp values</th></tr>
<tr><td>0</td><td>[0,0,0]</td><td>[1, 1, 1]</td></tr>
<tr><td>1</td><td>[0,1,0]</td><td>[1, 0, 1]</td></tr>
<tr><td>2</td><td>[0,0,0]</td><td>[1, 1, 2]</td></tr>
</table>
<p class="fs13">Answer = <code>dp[2][2] = 2</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n), reducible to O(n) with a rolling row.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Obstacles never need a separate pass — clamp the cell to 0 in the same sweep. Watch the edges: an obstacle on row 0 or column 0 kills every cell after it in that line.</div>`});

/* Problem 163 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q163 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 163 · MEDIUM</span>Minimum Path Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">GRID</span></div>
<p class="dropcap">Given an <code>m x n</code> grid filled with non-negative integers, find a path from top-left to bottom-right (moving only right or down) that minimizes the sum of all numbers along it. Return that minimum sum.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Path 1 -&gt; 3 -&gt; 1 -&gt; 1 -&gt; 1 minimizes the sum.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= m, n &lt;= 200</li><li>0 &lt;= grid[i][j] &lt;= 200</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i][j] = grid[i][j] + the cheaper of the cell above or the cell to the left. First row/column can only be reached one way, so they just accumulate.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>dp[i][j]</code> holds the minimum cost to reach cell (i,j). The first row and column accumulate along their single possible route; every other cell adds its own value to <code>min(dp[i-1][j], dp[i][j-1])</code> — the cheaper of arriving from above or from the left.</p>
<pre class="code" data-lang="java"><code>public int minPathSum(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int[][] dp = new int[m][n];
    dp[0][0] = grid[0][0];
    for (int j = 1; j &lt; n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
    for (int i = 1; i &lt; m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
    for (int i = 1; i &lt; m; i++)
        for (int j = 1; j &lt; n; j++)
            dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
    return dp[m - 1][n - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>grid = [[1,3,1],[1,5,1],[4,2,1]]</code></p>
<table class="tbl">
<tr><th>row</th><th>grid row</th><th>dp values</th></tr>
<tr><td>0</td><td>[1,3,1]</td><td>[1, 4, 5]</td></tr>
<tr><td>1</td><td>[1,5,1]</td><td>[2, 7, 6]</td></tr>
<tr><td>2</td><td>[4,2,1]</td><td>[6, 8, 7]</td></tr>
</table>
<p class="fs13">Answer = <code>dp[2][2] = 7</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n), reducible to O(n) with an in-place rolling row.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Unique Paths counts routes with <code>+</code>; Minimum Path Sum picks the cheapest route with <code>min(...)</code> — same grid shape, different aggregator. Recognizing which operator the wording implies is the whole trick.</div>`});

/* Problem 164 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q164 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 164 · MEDIUM</span>Longest Common Subsequence</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">STRING</span></div>
<p class="dropcap">Given two strings <code>text1</code> and <code>text2</code>, return the length of their longest common subsequence — characters that appear in both strings in the same relative order, but not necessarily contiguous. Return 0 if there is none.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The LCS is "ace", length 3.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= text1.length, text2.length &lt;= 1000</li><li>Both strings consist of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i][j] = LCS length between text1's first i chars and text2's first j chars. Matching last characters extend the diagonal; otherwise take the best of dropping one character from either string.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>dp[i][j]</code> is the LCS length between <code>text1[0..i)</code> and <code>text2[0..j)</code>. If the last characters match, extend the diagonal: <code>dp[i][j] = dp[i-1][j-1] + 1</code>. Otherwise the LCS can't use both last characters, so take the better of dropping one: <code>max(dp[i-1][j], dp[i][j-1])</code>.</p>
<pre class="code" data-lang="java"><code>public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i &lt;= m; i++) {
        for (int j = 1; j &lt;= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>text1 = "abcde", text2 = "ace"</code></p>
<table class="tbl">
<tr><th>i (text1 prefix)</th><th>dp[i][0]</th><th>dp[i][1] "a"</th><th>dp[i][2] "ac"</th><th>dp[i][3] "ace"</th></tr>
<tr><td>0 ""</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>1 "a"</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>2 "ab"</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>3 "abc"</td><td>0</td><td>1</td><td>2</td><td>2</td></tr>
<tr><td>4 "abcd"</td><td>0</td><td>1</td><td>2</td><td>2</td></tr>
<tr><td>5 "abcde"</td><td>0</td><td>1</td><td>2</td><td><b>3</b></td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n), reducible to O(n) with two rolling rows.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The "match the diagonal, else max of two neighbors" pattern is the backbone of nearly every two-string DP — Edit Distance and Interleaving String are direct variations of this same grid.</div>`});

/* Problem 165 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q165 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 165 · MEDIUM</span>Edit Distance</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">STRING</span></div>
<p class="dropcap">Given two strings <code>word1</code> and <code>word2</code>, return the minimum number of single-character operations — insert, delete, or replace — needed to transform <code>word1</code> into <code>word2</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: horse -&gt; rorse (replace 'h' with 'r')
rorse -&gt; rose (delete 'r')
rose -&gt; ros (delete 'e')</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= word1.length, word2.length &lt;= 500</li><li>Both strings consist of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i][j] = edits to convert word1's first i chars into word2's first j chars. Matching last chars costs nothing; otherwise take 1 + the cheapest of insert, delete, or replace.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>dp[i][j]</code> is the min edits to turn <code>word1[0..i)</code> into <code>word2[0..j)</code>. Base cases: <code>dp[i][0]=i</code> (delete everything), <code>dp[0][j]=j</code> (insert everything). If the last characters match, no new edit is needed: <code>dp[i][j]=dp[i-1][j-1]</code>. Otherwise take <code>1 + min(replace, delete, insert)</code> = <code>1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])</code>.</p>
<pre class="code" data-lang="java"><code>public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i &lt;= m; i++) dp[i][0] = i;
    for (int j = 0; j &lt;= n; j++) dp[0][j] = j;
    for (int i = 1; i &lt;= m; i++) {
        for (int j = 1; j &lt;= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1],
                                Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        }
    }
    return dp[m][n];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>word1 = "horse", word2 = "ros"</code></p>
<table class="tbl">
<tr><th>i / j</th><th>"" (0)</th><th>"r" (1)</th><th>"ro" (2)</th><th>"ros" (3)</th></tr>
<tr><td>"" (0)</td><td>0</td><td>1</td><td>2</td><td>3</td></tr>
<tr><td>"h" (1)</td><td>1</td><td>1</td><td>2</td><td>3</td></tr>
<tr><td>"ho" (2)</td><td>2</td><td>2</td><td>1</td><td>2</td></tr>
<tr><td>"hor" (3)</td><td>3</td><td>2</td><td>2</td><td>2</td></tr>
<tr><td>"hors" (4)</td><td>4</td><td>3</td><td>3</td><td>2</td></tr>
<tr><td>"horse" (5)</td><td>5</td><td>4</td><td>4</td><td><b>3</b></td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n), reducible to O(n) with two rolling rows.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>All three operations map to one neighbor each: replace = diagonal, delete from word1 = up, insert into word1 = left. Draw the grid and the recurrence becomes obvious.</div>`});

/* Problem 166 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q166 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 166 · MEDIUM</span>Target Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">0/1 KNAPSACK</span></div>
<p class="dropcap">Given an integer array <code>nums</code> and an integer <code>target</code>, assign a <code>+</code> or <code>-</code> sign to each number so that the resulting expression evaluates to <code>target</code>. Return the number of ways to do this.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: The 5 sign assignments summing to 3 are:
-1+1+1+1+1, +1-1+1+1+1, +1+1-1+1+1, +1+1+1-1+1, +1+1+1+1-1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 20</li><li>0 &lt;= nums[i] &lt;= 1000</li><li>0 &lt;= sum(nums) &lt;= 1000</li><li>-1000 &lt;= target &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Split nums into a "+" subset P and a "-" subset N. Since sum(P) - sum(N) = target and sum(P) + sum(N) = total, sum(P) = (target + total) / 2 — this collapses to counting subsets that hit an exact sum, the classic 0/1 knapsack counting DP.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Let <code>sumP = (target + total) / 2</code> be the required sum of the positively-signed subset (return 0 if this isn't a non-negative integer). <code>dp[i][j]</code> = number of ways to pick from the first <code>i</code> numbers so they sum to exactly <code>j</code>. Each number is either excluded (<code>dp[i-1][j]</code>) or included (<code>dp[i-1][j-nums[i-1]]</code>) — the two contributions add.</p>
<pre class="code" data-lang="java"><code>public int findTargetSumWays(int[] nums, int target) {
    int total = 0;
    for (int x : nums) total += x;
    if (Math.abs(target) &gt; total || (total + target) % 2 != 0) return 0;
    int sumP = (total + target) / 2;
    int n = nums.length;
    int[][] dp = new int[n + 1][sumP + 1];
    dp[0][0] = 1;
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 0; j &lt;= sumP; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j &gt;= nums[i - 1]) dp[i][j] += dp[i - 1][j - nums[i - 1]];
        }
    }
    return dp[n][sumP];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,1,1,1,1], target = 3</code> → total = 5, sumP = (3+5)/2 = 4</p>
<table class="tbl">
<tr><th>i (nums used)</th><th>j=0</th><th>j=1</th><th>j=2</th><th>j=3</th><th>j=4</th></tr>
<tr><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>2</td><td>1</td><td>2</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>3</td><td>1</td><td>3</td><td>3</td><td>1</td><td>0</td></tr>
<tr><td>4</td><td>1</td><td>4</td><td>6</td><td>4</td><td>1</td></tr>
<tr><td>5</td><td>1</td><td>5</td><td>10</td><td>10</td><td><b>5</b></td></tr>
</table>
<p class="fs13">Answer = <code>dp[5][4] = 5</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · sumP). Space: O(n · sumP), reducible to O(sumP) with a single rolling row swept right-to-left.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Any "assign +/- signs to hit a target" problem is a disguised subset-sum count — the algebra trick (solve for sumP) is what unlocks the standard knapsack template.</div>`});

/* Problem 167 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q167 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 167 · MEDIUM</span>Interleaving String</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">STRING</span></div>
<p class="dropcap">Given strings <code>s1</code>, <code>s2</code>, and <code>s3</code>, determine whether <code>s3</code> is formed by an interleaving of <code>s1</code> and <code>s2</code> — a merge that preserves the relative order of characters within each source string, but freely interleaves the two.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s1 = "ab", s2 = "bc", s3 = "babc"
Output: true
Explanation: Merge as s2[0] + s1[0] + s1[1] + s2[1] = "b"+"a"+"b"+"c" = "babc".</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= s1.length, s2.length &lt;= 100</li><li>0 &lt;= s3.length &lt;= 200</li><li>All strings consist of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>If s1.length + s2.length != s3.length, it's immediately false. Otherwise dp[i][j] = true if the first i+j characters of s3 can be built from the first i of s1 and first j of s2.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>dp[i][j]</code> means <code>s3[0, i+j)</code> is a valid interleaving of <code>s1[0,i)</code> and <code>s2[0,j)</code>. It's true if either the last character came from <code>s1</code> (<code>dp[i-1][j]</code> true and <code>s1[i-1] == s3[i+j-1]</code>) or from <code>s2</code> (<code>dp[i][j-1]</code> true and <code>s2[j-1] == s3[i+j-1]</code>). Row 0 and column 0 are seeded by matching straight against one source string only.</p>
<pre class="code" data-lang="java"><code>public boolean isInterleave(String s1, String s2, String s3) {
    int m = s1.length(), n = s2.length();
    if (m + n != s3.length()) return false;
    boolean[][] dp = new boolean[m + 1][n + 1];
    dp[0][0] = true;
    for (int i = 1; i &lt;= m; i++)
        dp[i][0] = dp[i - 1][0] &amp;&amp; s1.charAt(i - 1) == s3.charAt(i - 1);
    for (int j = 1; j &lt;= n; j++)
        dp[0][j] = dp[0][j - 1] &amp;&amp; s2.charAt(j - 1) == s3.charAt(j - 1);
    for (int i = 1; i &lt;= m; i++) {
        for (int j = 1; j &lt;= n; j++) {
            dp[i][j] = (dp[i - 1][j] &amp;&amp; s1.charAt(i - 1) == s3.charAt(i + j - 1)) ||
                       (dp[i][j - 1] &amp;&amp; s2.charAt(j - 1) == s3.charAt(i + j - 1));
        }
    }
    return dp[m][n];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s1 = "ab", s2 = "bc", s3 = "babc"</code></p>
<table class="tbl">
<tr><th>i / j</th><th>j=0</th><th>j=1 "b"</th><th>j=2 "bc"</th></tr>
<tr><td>i=0 ""</td><td>T</td><td>T</td><td>F</td></tr>
<tr><td>i=1 "a"</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>i=2 "ab"</td><td>F</td><td>T</td><td><b>T</b></td></tr>
</table>
<p class="fs13">Answer = <code>dp[2][2] = true</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n), reducible to O(n) with a single rolling row.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Because s3's index is always <code>i+j-1</code> (fully determined once i,j are known), only 2 of the 3 strings' positions ever need tracking — the exact same reason the grid is only m×n, not m×n×len(s3).</div>`});

/* Problem 168 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q168 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 168 · MEDIUM</span>Maximal Square</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">GRID</span></div>
<p class="dropcap">Given an <code>m x n</code> binary matrix filled with <code>'0'</code> and <code>'1'</code> characters, find the largest square containing only <code>'1'</code>s and return its area.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [["1","0","1"],["1","1","1"],["1","1","1"]]
Output: 4
Explanation: The bottom-right 2x2 block of 1's is the largest full square.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == matrix.length, n == matrix[i].length</li><li>1 &lt;= m, n &lt;= 300</li><li>matrix[i][j] is '0' or '1'</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i][j] = side length of the largest all-1s square whose bottom-right corner is (i,j). It's bounded by the smallest of its top, left, and top-left diagonal neighbors, plus one.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>If <code>matrix[i][j] == '1'</code>, the largest square ending at (i,j) can only be as big as the smallest of the three squares ending at its top, left, and top-left diagonal neighbors, plus one row/column: <code>dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1</code>. Cells on the first row/column are capped at 1. Track the max side seen; the answer is its square.</p>
<pre class="code" data-lang="java"><code>public int maximalSquare(char[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int[][] dp = new int[m][n];
    int maxSide = 0;
    for (int i = 0; i &lt; m; i++) {
        for (int j = 0; j &lt; n; j++) {
            if (matrix[i][j] == '1') {
                dp[i][j] = (i == 0 || j == 0) ? 1 :
                    Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1])) + 1;
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix = [["1","0","1"],["1","1","1"],["1","1","1"]]</code></p>
<table class="tbl">
<tr><th>row</th><th>matrix row</th><th>dp values</th></tr>
<tr><td>0</td><td>[1,0,1]</td><td>[1, 0, 1]</td></tr>
<tr><td>1</td><td>[1,1,1]</td><td>[1, 1, 1]</td></tr>
<tr><td>2</td><td>[1,1,1]</td><td>[1, 2, 2]</td></tr>
</table>
<p class="fs13">maxSide = 2 → Answer = 2² = <b>4</b></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n), reducible to O(n) with a rolling row plus one saved diagonal value.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The "min of three neighbors" shape appears whenever a square (not rectangle) region has to stay valid in every direction simultaneously — one weak neighbor caps the whole square.</div>`});

/* Problem 169 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q169 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 169 · HARD</span>Dungeon Game</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">DP</span><span class="pill">GRID</span></div>
<p class="dropcap">A knight starts at the top-left of a dungeon grid and must rescue a princess at the bottom-right, moving only right or down. Each cell adds to or subtracts from his health (negative = demon damage, positive = healing potion). His health must stay above 0 at every step. Return the minimum initial health needed to guarantee survival to the princess.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
Output: 7
Explanation: Starting with 7 HP, the path (0,0)-&gt;(0,1)-&gt;(0,2)-&gt;(1,2)-&gt;(2,2)
keeps HP &gt;= 1 the whole way.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == dungeon.length, n == dungeon[i].length</li><li>1 &lt;= m, n &lt;= 200</li><li>-1000 &lt;= dungeon[i][j] &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Working forward from (0,0) doesn't work — the required starting HP depends on the whole future path. Work backward from the princess: dp[i][j] = minimum HP needed on ENTERING cell (i,j).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Fill <code>dp</code> from the bottom-right backward. <code>dp[i][j]</code> is the minimum HP needed upon entering (i,j) to survive the rest of the path with HP never dropping below 1. At the princess cell, <code>dp = max(1, 1 - dungeon[i][j])</code>. Elsewhere, <code>dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j])</code> — take the cheaper of the two onward routes, then undo this cell's effect.</p>
<pre class="code" data-lang="java"><code>public int calculateMinimumHP(int[][] dungeon) {
    int m = dungeon.length, n = dungeon[0].length;
    int[][] dp = new int[m][n];
    for (int i = m - 1; i &gt;= 0; i--) {
        for (int j = n - 1; j &gt;= 0; j--) {
            if (i == m - 1 &amp;&amp; j == n - 1) {
                dp[i][j] = Math.max(1, 1 - dungeon[i][j]);
            } else {
                int right = (j + 1 &lt; n) ? dp[i][j + 1] : Integer.MAX_VALUE;
                int down = (i + 1 &lt; m) ? dp[i + 1][j] : Integer.MAX_VALUE;
                dp[i][j] = Math.max(1, Math.min(right, down) - dungeon[i][j]);
            }
        }
    }
    return dp[0][0];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]</code> — filled bottom-right to top-left</p>
<table class="tbl">
<tr><th>cell (i,j)</th><th>dungeon value</th><th>min(right, down)</th><th>dp[i][j]</th></tr>
<tr><td>(2,2)</td><td>-5</td><td>base case</td><td>max(1,1-(-5))=6</td></tr>
<tr><td>(2,1)</td><td>30</td><td>dp(2,2)=6</td><td>max(1,6-30)=1</td></tr>
<tr><td>(2,0)</td><td>10</td><td>dp(2,1)=1</td><td>max(1,1-10)=1</td></tr>
<tr><td>(1,2)</td><td>1</td><td>dp(2,2)=6</td><td>max(1,6-1)=5</td></tr>
<tr><td>(1,1)</td><td>-10</td><td>min(dp(1,2)=5, dp(2,1)=1)=1</td><td>max(1,1+10)=11</td></tr>
<tr><td>(1,0)</td><td>-5</td><td>min(dp(1,1)=11, dp(2,0)=1)=1</td><td>max(1,1+5)=6</td></tr>
<tr><td>(0,2)</td><td>3</td><td>dp(1,2)=5</td><td>max(1,5-3)=2</td></tr>
<tr><td>(0,1)</td><td>-3</td><td>min(dp(0,2)=2, dp(1,1)=11)=2</td><td>max(1,2+3)=5</td></tr>
<tr><td>(0,0)</td><td>-2</td><td>min(dp(0,1)=5, dp(1,0)=6)=5</td><td><b>max(1,5+2)=7</b></td></tr>
</table>
<p class="fs13">Answer = <code>dp[0][0] = 7</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n), reducible to O(n) with a rolling row.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever the "cost so far" isn't monotonic — health can go up as well as down — forward DP breaks, because the optimal choice depends on the future, not the past. Reverse the traversal direction and the problem becomes ordinary grid DP again.</div>`});

/* Problem 170 */
B.spread(
{ kicker: 'DSA · DP: 2D & KNAPSACK', head: 'Q170 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 170 · MEDIUM</span>Perfect Squares</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">UNBOUNDED KNAPSACK</span></div>
<p class="dropcap">Given an integer <code>n</code>, return the fewest number of perfect square numbers (1, 4, 9, 16, ...) that sum to exactly <code>n</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 8
Output: 2
Explanation: 8 = 4 + 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 10^4</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Treat every perfect square &lt;= n as a reusable "coin". dp[i] = 1 + min(dp[i - s²]) over every square s² &lt;= i — the unbounded knapsack recurrence, same shape as Coin Change.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>dp[i]</code> is the minimum count of perfect squares summing to <code>i</code>, with <code>dp[0] = 0</code>. For each <code>i</code>, try every square <code>s*s &lt;= i</code> and take <code>dp[i] = min(dp[i], dp[i - s*s] + 1)</code>. Because any square can be reused, this is unbounded knapsack over a 1D table — the "grid" here is implicitly amount × candidate-square, exactly like Coin Change.</p>
<pre class="code" data-lang="java"><code>public int numSquares(int n) {
    int[] dp = new int[n + 1];
    Arrays.fill(dp, Integer.MAX_VALUE);
    dp[0] = 0;
    for (int i = 1; i &lt;= n; i++) {
        for (int s = 1; s * s &lt;= i; s++) {
            dp[i] = Math.min(dp[i], dp[i - s * s] + 1);
        }
    }
    return dp[n];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 8</code> (candidate squares &lt;= 8: 1, 4)</p>
<table class="tbl">
<tr><th>i</th><th>via square 1</th><th>via square 4</th><th>dp[i]</th></tr>
<tr><td>0</td><td>—</td><td>—</td><td>0</td></tr>
<tr><td>1</td><td>dp0+1=1</td><td>—</td><td>1</td></tr>
<tr><td>2</td><td>dp1+1=2</td><td>—</td><td>2</td></tr>
<tr><td>3</td><td>dp2+1=3</td><td>—</td><td>3</td></tr>
<tr><td>4</td><td>dp3+1=4</td><td>dp0+1=1</td><td>1</td></tr>
<tr><td>5</td><td>dp4+1=2</td><td>dp1+1=2</td><td>2</td></tr>
<tr><td>6</td><td>dp5+1=3</td><td>dp2+1=3</td><td>3</td></tr>
<tr><td>7</td><td>dp6+1=4</td><td>dp3+1=4</td><td>4</td></tr>
<tr><td>8</td><td>dp7+1=5</td><td>dp4+1=2</td><td><b>2</b></td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·√n). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Minimum count of reusable building blocks summing to a target" is always unbounded knapsack, whether the blocks are coins, squares, or jump lengths — the recurrence is identical, only the candidate set changes.</div>`});

})();
