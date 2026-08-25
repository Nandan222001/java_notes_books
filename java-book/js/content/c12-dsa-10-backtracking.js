/* ===== CHAPTER 41 · DSA: Backtracking ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 41, 'DSA: Backtracking');

/* Problem 091 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q091 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 091 · MEDIUM</span>Subsets</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Backtracking</span></div>
<p class="dropcap">Given an integer array <code>nums</code> of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10</li><li>all elements distinct</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>At each index you have exactly two choices: include it in the current subset, or don't. Explore both.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Recurse over indices; at each step, record the current path as a valid subset (every partial path is itself a valid answer), then try including <code>nums[i]</code> and recursing, then backtrack by removing it and moving to the next index.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; subsets(int[] nums) {
    List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();
    backtrack(nums, 0, new ArrayList&lt;&gt;(), res);
    return res;
}
private void backtrack(int[] nums, int start, List&lt;Integer&gt; path, List&lt;List&lt;Integer&gt;&gt; res) {
    res.add(new ArrayList&lt;&gt;(path));
    for (int i = start; i &lt; nums.length; i++) {
        path.add(nums[i]);
        backtrack(nums, i + 1, path, res);
        path.remove(path.size() - 1);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,2,3]</code> (partial trace)</p>
<table class="tbl">
<tr><th>path</th><th>action</th></tr>
<tr><td>[]</td><td>record [] → recurse start=0</td></tr>
<tr><td>[1]</td><td>record [1] → recurse start=1</td></tr>
<tr><td>[1,2]</td><td>record [1,2] → recurse start=2</td></tr>
<tr><td>[1,2,3]</td><td>record [1,2,3] → no more indices, backtrack</td></tr>
<tr><td>[1,2]</td><td>backtrack removed 3, loop ends, backtrack</td></tr>
<tr><td>[1]</td><td>backtrack removed 2, try i=2 → [1,3] recorded, ...</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · 2ⁿ) — 2ⁿ subsets, O(n) to copy each. Space: O(n) recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Every node visited in the recursion tree IS an answer here — you don't wait for a "complete" path like in permutations.</div>`});

/* Problem 092 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q092 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 092 · MEDIUM</span>Subsets II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Backtracking</span><span class="pill">Sorting</span></div>
<p class="dropcap">Given an integer array <code>nums</code> that may contain duplicates, return all possible subsets (the power set) — the solution set must not contain duplicate subsets.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10</li><li>-10 &lt;= nums[i] &lt;= 10</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort first so equal values sit next to each other. At each recursion level, skip a value if it equals the previous sibling already tried at this same level — that's what actually causes duplicate subsets.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort <code>nums</code>. Same template as Subsets, but inside the for-loop skip index <code>i</code> when <code>i &gt; start</code> and <code>nums[i] == nums[i-1]</code> — meaning this exact value was already the first choice tried at this recursion level, so trying it again would generate an identical subset.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; subsetsWithDup(int[] nums) {
    Arrays.sort(nums);
    List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();
    backtrack(nums, 0, new ArrayList&lt;&gt;(), res);
    return res;
}
private void backtrack(int[] nums, int start, List&lt;Integer&gt; path, List&lt;List&lt;Integer&gt;&gt; res) {
    res.add(new ArrayList&lt;&gt;(path));
    for (int i = start; i &lt; nums.length; i++) {
        if (i &gt; start &amp;&amp; nums[i] == nums[i - 1]) continue;
        path.add(nums[i]);
        backtrack(nums, i + 1, path, res);
        path.remove(path.size() - 1);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,2,2]</code> (sorted)</p>
<table class="tbl">
<tr><th>path</th><th>action</th></tr>
<tr><td>[]</td><td>record [] → recurse start=0</td></tr>
<tr><td>[1]</td><td>record [1] → recurse start=1</td></tr>
<tr><td>[1,2]</td><td>i=1 record → recurse start=2</td></tr>
<tr><td>[1,2,2]</td><td>i=2 record → backtrack twice to []</td></tr>
<tr><td>[2]</td><td>i=1 at top level, record [2] → recurse start=2</td></tr>
<tr><td>[2,2]</td><td>i=2 record → backtrack; i=2 again at top level skipped (dup of i=1)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · 2ⁿ) worst case. Space: O(n) recursion depth (excluding output).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The dedup guard is <code>i &gt; start</code>, not <code>i &gt; 0</code> — it only blocks re-picking the same value as a sibling at the current level, not picking it again deeper in the same branch.</div>`});

/* Problem 093 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q093 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 093 · MEDIUM</span>Permutations</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Backtracking</span></div>
<p class="dropcap">Given an array <code>nums</code> of distinct integers, return all possible permutations, in any order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 6</li><li>all elements distinct</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Unlike Subsets, order matters and every element must be used. Track "used" elements with a boolean array, and only record the path once it's full length.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>At each call, if the path already has <code>nums.length</code> elements, record it and return — that's the only valid time to record. Otherwise, try every unused element as the next slot: mark it used, add it to the path, recurse, then undo both on the way back.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; permute(int[] nums) {
    List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();
    boolean[] used = new boolean[nums.length];
    backtrack(nums, used, new ArrayList&lt;&gt;(), res);
    return res;
}
private void backtrack(int[] nums, boolean[] used, List&lt;Integer&gt; path, List&lt;List&lt;Integer&gt;&gt; res) {
    if (path.size() == nums.length) {
        res.add(new ArrayList&lt;&gt;(path));
        return;
    }
    for (int i = 0; i &lt; nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        path.add(nums[i]);
        backtrack(nums, used, path, res);
        path.remove(path.size() - 1);
        used[i] = false;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,2,3]</code> (partial trace)</p>
<table class="tbl">
<tr><th>path</th><th>used</th><th>action</th></tr>
<tr><td>[]</td><td>{}</td><td>try i=0 → 1</td></tr>
<tr><td>[1]</td><td>{1}</td><td>try i=1 → 2</td></tr>
<tr><td>[1,2]</td><td>{1,2}</td><td>try i=2 → 3</td></tr>
<tr><td>[1,2,3]</td><td>{1,2,3}</td><td>size==3 → record, return</td></tr>
<tr><td>[1,2]</td><td>{1,2}</td><td>backtrack 3, loop ends, backtrack</td></tr>
<tr><td>[1]</td><td>{1}</td><td>backtrack 2, try i=2 → [1,3], then [1,3,2]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · n!) — n! permutations, O(n) to copy each. Space: O(n) for used[] and recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Permutations recurse by "which slot is next" over all indices with a used[] filter, not by "start index" like Subsets — order is part of the answer, so you can't just move forward.</div>`});

/* Problem 094 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q094 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 094 · MEDIUM</span>Combination Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Backtracking</span></div>
<p class="dropcap">Given a distinct array <code>candidates</code> and a target integer, return all unique combinations of <code>candidates</code> where the chosen numbers sum to <code>target</code>. The same number may be chosen from <code>candidates</code> an unlimited number of times. Two combinations are unique if the frequency of at least one chosen number differs.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= candidates.length &lt;= 30</li><li>2 &lt;= candidates[i] &lt;= 40, all distinct</li><li>1 &lt;= target &lt;= 40</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Since numbers can repeat, recurse with the SAME index (not index+1) when you pick a candidate — that's what allows reuse while still avoiding permutation-style duplicates.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Track a running <code>remaining</code> target. At each index, if <code>candidates[i] &lt;= remaining</code>, choose it, recurse from the SAME index i (reuse allowed), then undo. If remaining hits 0, record the path; if it goes negative, prune. Sorting first lets you break early once a candidate exceeds remaining.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; combinationSum(int[] candidates, int target) {
    Arrays.sort(candidates);
    List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();
    backtrack(candidates, target, 0, new ArrayList&lt;&gt;(), res);
    return res;
}
private void backtrack(int[] c, int remaining, int start, List&lt;Integer&gt; path, List&lt;List&lt;Integer&gt;&gt; res) {
    if (remaining == 0) { res.add(new ArrayList&lt;&gt;(path)); return; }
    for (int i = start; i &lt; c.length; i++) {
        if (c[i] &gt; remaining) break;
        path.add(c[i]);
        backtrack(c, remaining - c[i], i, path, res);
        path.remove(path.size() - 1);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>candidates = [2,3,6,7], target = 7</code></p>
<table class="tbl">
<tr><th>path</th><th>remaining</th><th>action</th></tr>
<tr><td>[]</td><td>7</td><td>i=0 pick 2 → remaining 5</td></tr>
<tr><td>[2]</td><td>5</td><td>i=0 pick 2 again → remaining 3</td></tr>
<tr><td>[2,2]</td><td>3</td><td>i=0 pick 2 → remaining 1, then 6&gt;1 break, backtrack</td></tr>
<tr><td>[2,2]</td><td>3</td><td>i=1 pick 3 → remaining 0 → record [2,2,3]</td></tr>
<tr><td>[]</td><td>7</td><td>i=3 pick 7 → remaining 0 → record [7]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(2^target) worst case branching. Space: O(target) recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Reuse the same element" in backtracking = recurse with <code>start</code> unchanged; "use each element once" = recurse with <code>start = i+1</code>. That single index tweak is the whole difference between this problem and Combination Sum II.</div>`});

/* Problem 095 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q095 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 095 · MEDIUM</span>Combination Sum II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Backtracking</span><span class="pill">Sorting</span></div>
<p class="dropcap">Given a collection <code>candidates</code> that may contain duplicates and a target integer, return all unique combinations where the numbers sum to <code>target</code>. Each number in <code>candidates</code> may be used at most once in a combination.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= candidates.length &lt;= 100</li><li>1 &lt;= candidates[i] &lt;= 50</li><li>1 &lt;= target &lt;= 30</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort first. Recurse from <code>i+1</code> (each element used once), and skip an index if it equals the previous sibling tried at the same recursion level, exactly like Subsets II.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort <code>candidates</code>. Same shape as Combination Sum, but recurse from <code>i + 1</code> (no reuse), and inside the loop skip <code>i &gt; start &amp;&amp; c[i] == c[i-1]</code> to avoid generating the same combination from duplicate values sitting side by side.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; combinationSum2(int[] candidates, int target) {
    Arrays.sort(candidates);
    List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();
    backtrack(candidates, target, 0, new ArrayList&lt;&gt;(), res);
    return res;
}
private void backtrack(int[] c, int remaining, int start, List&lt;Integer&gt; path, List&lt;List&lt;Integer&gt;&gt; res) {
    if (remaining == 0) { res.add(new ArrayList&lt;&gt;(path)); return; }
    for (int i = start; i &lt; c.length; i++) {
        if (c[i] &gt; remaining) break;
        if (i &gt; start &amp;&amp; c[i] == c[i - 1]) continue;
        path.add(c[i]);
        backtrack(c, remaining - c[i], i + 1, path, res);
        path.remove(path.size() - 1);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: sorted <code>candidates = [1,1,2,5,6,7,10], target = 8</code></p>
<table class="tbl">
<tr><th>path</th><th>remaining</th><th>action</th></tr>
<tr><td>[]</td><td>8</td><td>i=0 pick 1 → remaining 7</td></tr>
<tr><td>[1]</td><td>7</td><td>i=1 pick 1 (i&gt;start but ok, different branch) → remaining 6</td></tr>
<tr><td>[1,1]</td><td>6</td><td>i=4 pick 6 → remaining 0 → record [1,1,6]</td></tr>
<tr><td>[1]</td><td>7</td><td>backtrack; i=2 pick 2 → remaining 5</td></tr>
<tr><td>[1,2]</td><td>5</td><td>i=3 pick 5 → remaining 0 → record [1,2,5]</td></tr>
<tr><td>[1]</td><td>7</td><td>i=5 pick 7 → remaining 0 → record [1,7]</td></tr>
<tr><td>[]</td><td>8</td><td>i=1 pick 1 (top level, i&gt;start=0, c[1]==c[0]) → skipped</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(2ⁿ) worst case. Space: O(n) recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The skip check compares against the SIBLING at the same level (<code>i &gt; start</code>), never against an ancestor — a duplicate value can still appear deeper in one branch, like [1,1,6] above.</div>`});

/* Problem 096 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q096 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 096 · MEDIUM</span>Word Search</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Matrix</span><span class="pill">Backtracking</span><span class="pill">DFS</span></div>
<p class="dropcap">Given an <code>m x n</code> grid of characters <code>board</code> and a string <code>word</code>, return true if <code>word</code> exists in the grid. The word must be built from letters of sequentially adjacent cells (horizontally or vertically neighboring), and the same cell may not be reused within one word.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: board = [["A","B","C","E"],
                ["S","F","C","S"],
                ["A","D","E","E"]],
       word = "ABCCED"
Output: true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= board.length, board[i].length &lt;= 6</li><li>1 &lt;= word.length &lt;= 15</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Try every cell as a starting point. DFS in 4 directions matching characters one by one; mark a cell visited before recursing and un-mark it right after — the classic "grid backtracking" pattern.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dfs(r, c, idx) succeeds if <code>board[r][c] == word.charAt(idx)</code> and the rest of the word matches from a neighbor. Temporarily overwrite the cell (e.g. with '#') to mark it visited without extra memory, recurse into all 4 directions, then restore the original character on the way back — the backtracking step.</p>
<pre class="code" data-lang="java"><code>public boolean exist(char[][] board, String word) {
    int m = board.length, n = board[0].length;
    for (int r = 0; r &lt; m; r++)
        for (int c = 0; c &lt; n; c++)
            if (dfs(board, word, r, c, 0)) return true;
    return false;
}
private boolean dfs(char[][] b, String word, int r, int c, int idx) {
    if (idx == word.length()) return true;
    if (r &lt; 0 || r &gt;= b.length || c &lt; 0 || c &gt;= b[0].length || b[r][c] != word.charAt(idx))
        return false;
    char tmp = b[r][c];
    b[r][c] = '#';
    boolean found = dfs(b, word, r + 1, c, idx + 1) || dfs(b, word, r - 1, c, idx + 1)
                 || dfs(b, word, r, c + 1, idx + 1) || dfs(b, word, r, c - 1, idx + 1);
    b[r][c] = tmp;
    return found;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>word = "ABCCED"</code>, start at (0,0)='A'</p>
<table class="tbl">
<tr><th>idx</th><th>cell (r,c)</th><th>char</th><th>match?</th></tr>
<tr><td>0</td><td>(0,0)</td><td>'A'</td><td>yes, mark '#', try neighbors</td></tr>
<tr><td>1</td><td>(0,1)</td><td>'B'</td><td>yes, mark '#'</td></tr>
<tr><td>2</td><td>(0,2)</td><td>'C'</td><td>yes, mark '#'</td></tr>
<tr><td>3</td><td>(1,2)</td><td>'C'</td><td>yes, mark '#'</td></tr>
<tr><td>4</td><td>(2,2)</td><td>'E'</td><td>yes, mark '#'</td></tr>
<tr><td>5</td><td>(2,1)</td><td>'D'</td><td>yes → idx==6==length → return true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n·4^L) where L = word length. Space: O(L) recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Overwriting the cell in place is a memory-free visited-set — but you must restore it on every exit path, including early returns, or later starting points see corrupted state.</div>`});

/* Problem 097 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q097 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 097 · MEDIUM</span>Palindrome Partitioning</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Backtracking</span></div>
<p class="dropcap">Given a string <code>s</code>, partition it such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of <code>s</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 16</li><li>s consists of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>At each start index, try every possible end point for the next piece. Only recurse further if that piece is itself a palindrome — this is a partition-choice backtrack, not an element-choice one.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>backtrack(start) tries every end index <code>i</code> from <code>start</code> to <code>s.length()-1</code>. If <code>s[start..i]</code> is a palindrome, add it to the path and recurse with <code>start = i+1</code>; when <code>start</code> reaches the string's end, the path is a complete valid partition — record it, then backtrack by removing the last piece.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;String&gt;&gt; partition(String s) {
    List&lt;List&lt;String&gt;&gt; res = new ArrayList&lt;&gt;();
    backtrack(s, 0, new ArrayList&lt;&gt;(), res);
    return res;
}
private void backtrack(String s, int start, List&lt;String&gt; path, List&lt;List&lt;String&gt;&gt; res) {
    if (start == s.length()) { res.add(new ArrayList&lt;&gt;(path)); return; }
    for (int i = start; i &lt; s.length(); i++) {
        if (!isPalindrome(s, start, i)) continue;
        path.add(s.substring(start, i + 1));
        backtrack(s, i + 1, path, res);
        path.remove(path.size() - 1);
    }
}
private boolean isPalindrome(String s, int lo, int hi) {
    while (lo &lt; hi) if (s.charAt(lo++) != s.charAt(hi--)) return false;
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "aab"</code></p>
<table class="tbl">
<tr><th>path</th><th>start</th><th>action</th></tr>
<tr><td>[]</td><td>0</td><td>i=0 "a" palindrome → path=["a"], recurse start=1</td></tr>
<tr><td>["a"]</td><td>1</td><td>i=1 "a" palindrome → path=["a","a"], recurse start=2</td></tr>
<tr><td>["a","a"]</td><td>2</td><td>i=2 "b" palindrome → path=["a","a","b"], start=3</td></tr>
<tr><td>["a","a","b"]</td><td>3</td><td>start==len → record ["a","a","b"]</td></tr>
<tr><td>["a"]</td><td>1</td><td>backtrack; i=2 "ab" not palindrome → skip</td></tr>
<tr><td>[]</td><td>0</td><td>backtrack; i=1 "aa" palindrome → path=["aa"], recurse start=2 → record ["aa","b"]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · 2ⁿ) worst case for partitions, plus O(n) per palindrome check. Space: O(n) recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The recursion variable here is "next cut position," not "next element" — recognize this pattern whenever a problem asks to partition a sequence under a per-piece constraint.</div>`});

/* Problem 098 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q098 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 098 · HARD</span>N-Queens</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Backtracking</span><span class="pill">Matrix</span></div>
<p class="dropcap">Place <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other (no shared row, column, or diagonal). Return all distinct solutions, each as a list of strings where <code>'Q'</code> marks a queen and <code>'.'</code> an empty square.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],
         ["..Q.","Q...","...Q",".Q.."]]
(2 distinct solutions)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 9</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Place exactly one queen per row. Track occupied columns and both diagonals (col-row and col+row are constant along a diagonal) in boolean sets for O(1) conflict checks.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Recurse row by row. At row <code>r</code>, try every column <code>c</code>; if <code>c</code>, the diagonal <code>r-c</code>, and the anti-diagonal <code>r+c</code> are all free, place the queen (mark all three, set <code>board[r][c]='Q'</code>), recurse to row <code>r+1</code>, then undo all three marks. When <code>r == n</code>, every row has a queen — record the board.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;String&gt;&gt; solveNQueens(int n) {
    List&lt;List&lt;String&gt;&gt; res = new ArrayList&lt;&gt;();
    char[][] board = new char[n][n];
    for (char[] row : board) Arrays.fill(row, '.');
    boolean[] cols = new boolean[n], diag1 = new boolean[2 * n], diag2 = new boolean[2 * n];
    backtrack(board, 0, n, cols, diag1, diag2, res);
    return res;
}
private void backtrack(char[][] b, int r, int n, boolean[] cols, boolean[] d1, boolean[] d2, List&lt;List&lt;String&gt;&gt; res) {
    if (r == n) {
        List&lt;String&gt; sol = new ArrayList&lt;&gt;();
        for (char[] row : b) sol.add(new String(row));
        res.add(sol);
        return;
    }
    for (int c = 0; c &lt; n; c++) {
        int i1 = r - c + n, i2 = r + c;
        if (cols[c] || d1[i1] || d2[i2]) continue;
        cols[c] = d1[i1] = d2[i2] = true;
        b[r][c] = 'Q';
        backtrack(b, r + 1, n, cols, d1, d2, res);
        b[r][c] = '.';
        cols[c] = d1[i1] = d2[i2] = false;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 4</code> (partial trace, first solution)</p>
<table class="tbl">
<tr><th>row</th><th>col tried</th><th>conflict?</th><th>action</th></tr>
<tr><td>0</td><td>c=1</td><td>no</td><td>place Q at (0,1), recurse row=1</td></tr>
<tr><td>1</td><td>c=3</td><td>no</td><td>place Q at (1,3), recurse row=2</td></tr>
<tr><td>2</td><td>c=0</td><td>no</td><td>place Q at (2,0), recurse row=3</td></tr>
<tr><td>3</td><td>c=0,1,3</td><td>all conflict</td><td>c=2 no conflict → place Q at (3,2)</td></tr>
<tr><td>4</td><td>—</td><td>—</td><td>r==n → record [".Q..","...Q","Q...","..Q."]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n!) roughly, pruned heavily by conflict checks. Space: O(n) for the boolean sets and recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Encoding a diagonal as a single integer (r-c offset by n, or r+c) turns an O(n) conflict scan into O(1) — a trick worth reusing anywhere "diagonal" constraints show up.</div>`});

/* Problem 099 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q099 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 099 · MEDIUM</span>Letter Combinations of a Phone Number</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Backtracking</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given a string <code>digits</code> containing digits from 2-9, return all possible letter combinations the number could represent, using the standard telephone keypad mapping. Return an empty list if <code>digits</code> is empty.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= digits.length &lt;= 4</li><li>digits[i] is a digit in ['2','9']</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>At each digit position you pick one of that digit's 3-4 letters, then move to the next digit. Full path length equals digits.length — the recursion depth is fixed by the input.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>A fixed lookup array maps digit → letters. backtrack(idx) recurses over positions in <code>digits</code>; when <code>idx == digits.length()</code>, the path is a complete combination — record it. Otherwise loop over every letter for <code>digits.charAt(idx)</code>, append, recurse to <code>idx+1</code>, then remove the last char (StringBuilder as the mutable path).</p>
<pre class="code" data-lang="java"><code>private static final String[] MAP = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};

public List&lt;String&gt; letterCombinations(String digits) {
    List&lt;String&gt; res = new ArrayList&lt;&gt;();
    if (digits.isEmpty()) return res;
    backtrack(digits, 0, new StringBuilder(), res);
    return res;
}
private void backtrack(String digits, int idx, StringBuilder path, List&lt;String&gt; res) {
    if (idx == digits.length()) { res.add(path.toString()); return; }
    String letters = MAP[digits.charAt(idx) - '0'];
    for (char ch : letters.toCharArray()) {
        path.append(ch);
        backtrack(digits, idx + 1, path, res);
        path.deleteCharAt(path.length() - 1);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>digits = "23"</code> ('2'→"abc", '3'→"def")</p>
<table class="tbl">
<tr><th>path</th><th>idx</th><th>action</th></tr>
<tr><td>""</td><td>0</td><td>try 'a' → path="a"</td></tr>
<tr><td>"a"</td><td>1</td><td>try 'd' → path="ad"</td></tr>
<tr><td>"ad"</td><td>2</td><td>idx==2==len → record "ad"</td></tr>
<tr><td>"a"</td><td>1</td><td>backtrack; try 'e' → record "ae"; try 'f' → record "af"</td></tr>
<tr><td>""</td><td>0</td><td>backtrack; try 'b' → path="b", then "bd","be","bf" recorded</td></tr>
<tr><td>""</td><td>0</td><td>try 'c' → "cd","ce","cf" recorded — 9 total</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(4^n · n) where n = digits.length (up to 4 letters per digit). Space: O(n) recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is Cartesian-product backtracking — recursing "one fixed-choice-set per position," the same shape reused for IP address restoration or generating all binary strings from wildcard patterns.</div>`});

/* Problem 100 */
B.spread(
{ kicker: 'DSA · BACKTRACKING', head: 'Q100 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 100 · MEDIUM</span>Generate Parentheses</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Backtracking</span></div>
<p class="dropcap">Given <code>n</code> pairs of parentheses, generate all combinations of well-formed (balanced) parentheses.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 8</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track counts of '(' and ')' used so far instead of validating after the fact. Add '(' whenever open &lt; n; add ')' only whenever close &lt; open — that inequality is what guarantees well-formedness at every step, not just at the end.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>backtrack(open, close) builds the string one character at a time. Two guarded choices at each step: append '(' if <code>open &lt; n</code> (increment open); append ')' if <code>close &lt; open</code> (increment close, since a close can only follow an unmatched open). When the path length reaches <code>2n</code>, it's a complete valid combination — record it.</p>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; generateParenthesis(int n) {
    List&lt;String&gt; res = new ArrayList&lt;&gt;();
    backtrack(new StringBuilder(), 0, 0, n, res);
    return res;
}
private void backtrack(StringBuilder path, int open, int close, int n, List&lt;String&gt; res) {
    if (path.length() == 2 * n) { res.add(path.toString()); return; }
    if (open &lt; n) {
        path.append('(');
        backtrack(path, open + 1, close, n, res);
        path.deleteCharAt(path.length() - 1);
    }
    if (close &lt; open) {
        path.append(')');
        backtrack(path, open, close + 1, n, res);
        path.deleteCharAt(path.length() - 1);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 2</code></p>
<table class="tbl">
<tr><th>path</th><th>open/close</th><th>action</th></tr>
<tr><td>""</td><td>0/0</td><td>open&lt;2 → append '(' → "("</td></tr>
<tr><td>"("</td><td>1/0</td><td>open&lt;2 → append '(' → "(("</td></tr>
<tr><td>"(("</td><td>2/0</td><td>open==2 skip; close&lt;open → ')' → "(()"</td></tr>
<tr><td>"(()"</td><td>2/1</td><td>close&lt;open → ')' → "(())"</td></tr>
<tr><td>"(())"</td><td>2/2</td><td>len==4 → record "(())"</td></tr>
<tr><td>"("</td><td>1/0</td><td>backtrack twice; close&lt;open → ')' → "()" then '(' → "()(" → "()()"</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(4ⁿ / √n) — the nth Catalan number, times O(n) to build each string. Space: O(n) recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Baking the validity rule (<code>close &lt; open</code>) directly into which branches are even explored prunes the tree to only well-formed results — far cheaper than generating everything and filtering after.</div>`});

})();
