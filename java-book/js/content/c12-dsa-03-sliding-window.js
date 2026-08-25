/* ===== CHAPTER 34 · DSA: Sliding Window ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 34, 'DSA: Sliding Window');

/* Problem 021 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q021 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 021 · EASY</span>Best Time to Buy and Sell Stock</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Sliding Window</span></div>
<p class="dropcap">Given an array <code>prices</code> where <code>prices[i]</code> is the stock price on day i, find the maximum profit from buying on one day and selling on a later day. Return 0 if no profit is possible.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: buy on day 2 (price=1), sell on day 5 (price=6), profit = 5</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= prices.length &lt;= 10⁵</li><li>0 &lt;= prices[i] &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track the lowest price seen so far as you scan left to right — the window's left edge only ever moves forward.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>This is a one-sided sliding window: keep the minimum price seen so far as the window's implicit left edge, and at every day compute the profit if we sold today, tracking the best.</p>
<pre class="code" data-lang="java"><code>public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE, best = 0;
    for (int p : prices) {
        minPrice = Math.min(minPrice, p);
        best = Math.max(best, p - minPrice);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>prices = [7,1,5,3,6,4]</code></p>
<table class="tbl">
<tr><th>price</th><th>minPrice</th><th>p - minPrice</th><th>best</th></tr>
<tr><td>7</td><td>7</td><td>0</td><td>0</td></tr>
<tr><td>1</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>5</td><td>1</td><td>4</td><td>4</td></tr>
<tr><td>3</td><td>1</td><td>2</td><td>4</td></tr>
<tr><td>6</td><td>1</td><td>5</td><td>5</td></tr>
<tr><td>4</td><td>1</td><td>3</td><td>5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one pass. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>You never need to try every (buy,sell) pair — only the best sell price relative to the cheapest price seen before it.</div>`});

/* Problem 022 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q022 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 022 · MEDIUM</span>Longest Substring Without Repeating Characters</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Sliding Window</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given a string <code>s</code>, find the length of the longest substring without repeating characters.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "abcabcbb"
Output: 3
Explanation: the answer is "abc", with length 3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= s.length &lt;= 5 × 10⁴</li><li>s consists of English letters, digits, symbols and spaces</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Store the last seen index of each character. On a repeat, jump the left edge straight past the previous occurrence instead of stepping one at a time.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Variable-size window: expand right always, tracking each character's last seen index. When the incoming character was last seen inside the current window, jump left directly to one past that index — no need to shrink character by character.</p>
<pre class="code" data-lang="java"><code>public int lengthOfLongestSubstring(String s) {
    Map&lt;Character,Integer&gt; last = new HashMap&lt;&gt;();
    int left = 0, best = 0;
    for (int right = 0; right &lt; s.length(); right++) {
        char c = s.charAt(right);
        if (last.containsKey(c) &amp;&amp; last.get(c) &gt;= left) {
            left = last.get(c) + 1;
        }
        last.put(c, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "abcabcbb"</code></p>
<table class="tbl">
<tr><th>right</th><th>char</th><th>left</th><th>window</th><th>best</th></tr>
<tr><td>0</td><td>a</td><td>0</td><td>"a"</td><td>1</td></tr>
<tr><td>1</td><td>b</td><td>0</td><td>"ab"</td><td>2</td></tr>
<tr><td>2</td><td>c</td><td>0</td><td>"abc"</td><td>3</td></tr>
<tr><td>3</td><td>a</td><td>1 (jump)</td><td>"bca"</td><td>3</td></tr>
<tr><td>4</td><td>b</td><td>2 (jump)</td><td>"cab"</td><td>3</td></tr>
<tr><td>5</td><td>c</td><td>3 (jump)</td><td>"abc"</td><td>3</td></tr>
<tr><td>6</td><td>b</td><td>5 (jump)</td><td>"cb"</td><td>3</td></tr>
<tr><td>7</td><td>b</td><td>7 (jump)</td><td>"b"</td><td>3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each character visited once. Space: O(min(n, charset size)).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Longest substring with no repeats" and "at most k distinct" and "at most k repeats" are all the same expand-right, conditionally-shrink-left skeleton — only the violation check changes.</div>`});

/* Problem 023 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q023 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 023 · MEDIUM</span>Longest Repeating Character Replacement</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Sliding Window</span></div>
<p class="dropcap">Given a string <code>s</code> consisting of uppercase letters and an integer <code>k</code>, you may replace at most <code>k</code> characters with any other uppercase letter. Return the length of the longest substring containing the same letter after such replacements.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' to form
"AABBBBA". The substring "BBBB" has length 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 10⁵</li><li>s consists of only uppercase English letters</li><li>0 &lt;= k &lt;= s.length</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A window is achievable if (window length) − (count of its most frequent letter) &lt;= k — that's exactly how many characters you'd need to flip.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Track a 26-letter frequency count and <code>maxFreq</code>, the highest single-letter count seen anywhere in the window so far. A window of length L needs at most <code>L - maxFreq</code> replacements; shrink from the left whenever that exceeds k. <code>maxFreq</code> is never decreased on shrink — it can only help a later, larger window, never invalidate the answer already recorded.</p>
<pre class="code" data-lang="java"><code>public int characterReplacement(String s, int k) {
    int[] count = new int[26];
    int left = 0, maxFreq = 0, best = 0;
    for (int right = 0; right &lt; s.length(); right++) {
        count[s.charAt(right) - 'A']++;
        maxFreq = Math.max(maxFreq, count[s.charAt(right) - 'A']);
        while (right - left + 1 - maxFreq &gt; k) {
            count[s.charAt(left) - 'A']--;
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "AABABBA", k = 1</code></p>
<table class="tbl">
<tr><th>right</th><th>char</th><th>maxFreq</th><th>window len</th><th>left</th><th>best</th></tr>
<tr><td>0</td><td>A</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>A</td><td>2</td><td>2</td><td>0</td><td>2</td></tr>
<tr><td>2</td><td>B</td><td>2</td><td>3</td><td>0</td><td>3</td></tr>
<tr><td>3</td><td>A</td><td>3</td><td>4</td><td>0</td><td>4</td></tr>
<tr><td>4</td><td>B</td><td>3</td><td>5→4 (shrink)</td><td>1</td><td>4</td></tr>
<tr><td>5</td><td>B</td><td>3</td><td>5→4 (shrink)</td><td>2</td><td>4</td></tr>
<tr><td>6</td><td>A</td><td>3</td><td>5→4 (shrink)</td><td>3</td><td>4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) — fixed 26-slot array.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The formula <code>windowSize - maxFreq &lt;= k</code> is the one line that turns several different-sounding "replace up to k characters" problems into the same template.</div>`});

/* Problem 024 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q024 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 024 · MEDIUM</span>Permutation in String</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Sliding Window</span><span class="pill">Frequency Array</span></div>
<p class="dropcap">Given two strings <code>s1</code> and <code>s2</code>, return <code>true</code> if <code>s2</code> contains a permutation of <code>s1</code> as a contiguous substring.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains "ba", a permutation of s1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s1.length, s2.length &lt;= 10⁴</li><li>s1 and s2 consist of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A permutation of s1 is any substring of s2 with exactly the same letter counts — no sorting or generating permutations needed.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Slide a fixed window of length <code>s1.length()</code> across <code>s2</code>. Build a 26-slot frequency array for s1 and one for the current window; after each slide (add the new right character, remove the old left character), an array-equality check answers "is this window a permutation of s1?" in O(26).</p>
<pre class="code" data-lang="java"><code>public boolean checkInclusion(String s1, String s2) {
    int n = s1.length(), m = s2.length();
    if (n &gt; m) return false;
    int[] need = new int[26], window = new int[26];
    for (char c : s1.toCharArray()) need[c - 'a']++;
    for (int i = 0; i &lt; n; i++) window[s2.charAt(i) - 'a']++;
    if (Arrays.equals(need, window)) return true;
    for (int right = n; right &lt; m; right++) {
        window[s2.charAt(right) - 'a']++;
        window[s2.charAt(right - n) - 'a']--;
        if (Arrays.equals(need, window)) return true;
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s1 = "ab", s2 = "eidbaooo"</code> — window length 2, need = {a:1, b:1}</p>
<table class="tbl">
<tr><th>right</th><th>added</th><th>removed</th><th>window substring</th><th>matches need?</th></tr>
<tr><td>1 (init)</td><td>—</td><td>—</td><td>"ei"</td><td>no</td></tr>
<tr><td>2</td><td>d</td><td>e</td><td>"id"</td><td>no</td></tr>
<tr><td>3</td><td>b</td><td>i</td><td>"db"</td><td>no</td></tr>
<tr><td>4</td><td>a</td><td>d</td><td>"ba"</td><td>yes → return true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m) — s2's length; each slide does O(26) work. Space: O(1) — two fixed 26-slot arrays.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Any "is X a rearrangement of Y" question inside a fixed-length window collapses to comparing two small frequency arrays — never sort or enumerate permutations.</div>`});

/* Problem 025 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q025 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 025 · HARD</span>Minimum Window Substring</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">String</span><span class="pill">Sliding Window</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given strings <code>s</code> and <code>t</code>, return the smallest substring of <code>s</code> that contains every character of <code>t</code> (including duplicates). Return an empty string if no such window exists.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: "BANC" is the smallest window of s containing
'A', 'B', and 'C' from t</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == s.length, n == t.length</li><li>1 &lt;= m, n &lt;= 10⁵</li><li>s and t consist of uppercase and lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track how many of t's distinct characters currently meet their required count ("have"). Once have equals t's distinct count, shrink greedily — every shrink is a chance at a smaller answer.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Expand right, incrementing a window frequency map. Every time a character's window count exactly reaches its needed count, bump <code>have</code>. Once <code>have == required</code> (the window is valid), enter a shrink loop: record the window if it beats the best-so-far, then remove the left character and advance left, dropping <code>have</code> only if that removal breaks a satisfied requirement.</p>
<pre class="code" data-lang="java"><code>public String minWindow(String s, String t) {
    if (s.isEmpty() || t.isEmpty()) return "";
    Map&lt;Character,Integer&gt; need = new HashMap&lt;&gt;();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
    Map&lt;Character,Integer&gt; window = new HashMap&lt;&gt;();
    int required = need.size(), have = 0;
    int left = 0, bestLen = Integer.MAX_VALUE, bestLeft = 0;
    for (int right = 0; right &lt; s.length(); right++) {
        char c = s.charAt(right);
        window.merge(c, 1, Integer::sum);
        if (need.containsKey(c) &amp;&amp; window.get(c).intValue() == need.get(c).intValue()) {
            have++;
        }
        while (have == required) {
            if (right - left + 1 &lt; bestLen) {
                bestLen = right - left + 1;
                bestLeft = left;
            }
            char lc = s.charAt(left);
            window.put(lc, window.get(lc) - 1);
            if (need.containsKey(lc) &amp;&amp; window.get(lc) &lt; need.get(lc)) {
                have--;
            }
            left++;
        }
    }
    return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestLeft, bestLeft + bestLen);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "ADOBECODEBANC", t = "ABC"</code> — need = {A:1,B:1,C:1}, required = 3</p>
<table class="tbl">
<tr><th>right</th><th>char</th><th>left range</th><th>window</th><th>bestLen</th></tr>
<tr><td>5</td><td>C</td><td>0 → 1</td><td>"ADOBEC" valid, shrinks once</td><td>6</td></tr>
<tr><td>10</td><td>A</td><td>1 → 6</td><td>valid again, shrinks (no len &lt; 6 found)</td><td>6</td></tr>
<tr><td>12</td><td>C</td><td>6 → 8</td><td>"EBANC" (len 5) beats 6</td><td>5</td></tr>
<tr><td>12</td><td>C</td><td>8 → 9</td><td>"BANC" (len 4) beats 5</td><td>4</td></tr>
<tr><td>12</td><td>C</td><td>9 → 10</td><td>have drops to 2, shrink stops</td><td>4</td></tr>
</table>
<p class="fs13">Final answer: <code>s.substring(9, 13)</code> = <code>"BANC"</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m + n) — left and right pointers each traverse s at most once. Space: O(distinct chars in t).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"have == required" is the reusable validity check for every variable-window-with-a-target problem — swap the target definition and the same skeleton solves a whole family.</div>`});

/* Problem 026 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q026 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 026 · HARD</span>Sliding Window Maximum</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Array</span><span class="pill">Sliding Window</span><span class="pill">Monotonic Deque</span></div>
<p class="dropcap">Given an array <code>nums</code> and a window size <code>k</code>, return an array of the maximum value inside each window as it slides from the left end of the array to the right.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: windows are [1,3,-1] [3,-1,-3] [-1,-3,5]
[-3,5,3] [5,3,6] [3,6,7] → maxes 3,3,5,5,6,7</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁵</li><li>-10⁴ &lt;= nums[i] &lt;= 10⁴</li><li>1 &lt;= k &lt;= nums.length</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A brute-force max per window is O(n·k). A deque that only ever keeps "possible future maxes" gets you to O(n).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain a deque of indices whose values are strictly decreasing from front to back. Before pushing index i, pop any trailing indices whose values are ≤ <code>nums[i]</code> — they can never be a window's max again. Pop the front index once it falls outside the window. The front of the deque is always the current window's maximum.</p>
<pre class="code" data-lang="java"><code>public int[] maxSlidingWindow(int[] nums, int k) {
    Deque&lt;Integer&gt; dq = new ArrayDeque&lt;&gt;(); // indices, values decreasing
    int n = nums.length;
    int[] res = new int[n - k + 1];
    for (int i = 0; i &lt; n; i++) {
        while (!dq.isEmpty() &amp;&amp; nums[dq.peekLast()] &lt;= nums[i]) dq.pollLast();
        dq.offerLast(i);
        if (dq.peekFirst() &lt;= i - k) dq.pollFirst();
        if (i &gt;= k - 1) res[i - k + 1] = nums[dq.peekFirst()];
    }
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,3,-1,-3,5,3,6,7], k = 3</code></p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>deque after step (indices)</th><th>window max</th></tr>
<tr><td>0</td><td>1</td><td>[0]</td><td>—</td></tr>
<tr><td>1</td><td>3</td><td>[1] (0 popped)</td><td>—</td></tr>
<tr><td>2</td><td>-1</td><td>[1,2]</td><td>3</td></tr>
<tr><td>3</td><td>-3</td><td>[1,2,3]</td><td>3</td></tr>
<tr><td>4</td><td>5</td><td>[4] (1,2,3 popped)</td><td>5</td></tr>
<tr><td>5</td><td>3</td><td>[4,5]</td><td>5</td></tr>
<tr><td>6</td><td>6</td><td>[6] (4,5 popped)</td><td>6</td></tr>
<tr><td>7</td><td>7</td><td>[7] (6 popped)</td><td>7</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each index is pushed and popped at most once. Space: O(k) for the deque.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A monotonic deque is the go-to structure whenever you need "max/min of every window" without paying O(k) per window — each element does O(1) amortized work across the whole scan.</div>`});

/* Problem 027 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q027 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 027 · MEDIUM</span>Fruit Into Baskets</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Sliding Window</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Trees are arranged in a row; <code>fruits[i]</code> is the fruit type at tree i. You have exactly 2 baskets, each holds unlimited fruit of a single type. Starting at any tree, pick exactly one fruit per tree moving right, stopping the moment a third fruit type would be needed. Return the maximum number of fruits you can collect.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: picking from index 1 gives [2,3,2,2] — 4 fruits
using baskets for type 2 and type 3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= fruits.length &lt;= 10⁵</li><li>0 &lt;= fruits[i] &lt; fruits.length</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Strip the story away: this is "longest subarray containing at most 2 distinct values."</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep a hash map of fruit type → count inside the window. Expand right freely; the moment the map holds 3 distinct keys, shrink from the left — decrementing and removing zeroed entries — until only 2 distinct types remain.</p>
<pre class="code" data-lang="java"><code>public int totalFruit(int[] fruits) {
    Map&lt;Integer,Integer&gt; count = new HashMap&lt;&gt;();
    int left = 0, best = 0;
    for (int right = 0; right &lt; fruits.length; right++) {
        count.merge(fruits[right], 1, Integer::sum);
        while (count.size() &gt; 2) {
            int lt = fruits[left];
            count.put(lt, count.get(lt) - 1);
            if (count.get(lt) == 0) count.remove(lt);
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>fruits = [1,2,3,2,2]</code></p>
<table class="tbl">
<tr><th>right</th><th>val</th><th>distinct types</th><th>left</th><th>window len</th><th>best</th></tr>
<tr><td>0</td><td>1</td><td>{1}</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>2</td><td>{1,2}</td><td>0</td><td>2</td><td>2</td></tr>
<tr><td>2</td><td>3</td><td>{1,2,3}→{2,3} shrink</td><td>1</td><td>2</td><td>2</td></tr>
<tr><td>3</td><td>2</td><td>{2,3}</td><td>1</td><td>3</td><td>3</td></tr>
<tr><td>4</td><td>2</td><td>{2,3}</td><td>1</td><td>4</td><td>4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) — the map holds at most 3 keys at any moment.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"At most K distinct" is a general pattern: K=1 gives the longest run of one value, K=2 is this problem's baskets — same map-and-shrink skeleton, only K changes.</div>`});

/* Problem 028 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q028 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 028 · MEDIUM</span>Max Consecutive Ones III</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Sliding Window</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given a binary array <code>nums</code> and an integer <code>k</code>, return the maximum number of consecutive 1's in the array if you can flip at most <code>k</code> zeros to ones.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: flip the 0's at index 4 and 5 → the run
[1,1,1,1,1,1] from index 5 to 10 has length 6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁵</li><li>nums[i] is 0 or 1</li><li>0 &lt;= k &lt;= nums.length</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Count zeros inside the window instead of ones — the window is valid exactly while that count is ≤ k.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Expand right unconditionally, counting zeros in the window. Only shrink from the left when the zero count exceeds k. Because the window never needs to shrink below its best-ever size, <code>best</code> only ever grows — one pass suffices.</p>
<pre class="code" data-lang="java"><code>public int longestOnes(int[] nums, int k) {
    int left = 0, zeros = 0, best = 0;
    for (int right = 0; right &lt; nums.length; right++) {
        if (nums[right] == 0) zeros++;
        while (zeros &gt; k) {
            if (nums[left] == 0) zeros--;
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2</code></p>
<table class="tbl">
<tr><th>right</th><th>val</th><th>zeros</th><th>left</th><th>window len</th><th>best</th></tr>
<tr><td>3</td><td>0</td><td>1</td><td>0</td><td>4</td><td>4</td></tr>
<tr><td>4</td><td>0</td><td>2</td><td>0</td><td>5</td><td>5</td></tr>
<tr><td>5</td><td>0</td><td>3→2 shrink</td><td>4</td><td>2</td><td>5</td></tr>
<tr><td>9</td><td>1</td><td>2</td><td>4</td><td>6</td><td>6</td></tr>
<tr><td>10</td><td>0</td><td>3→2 shrink</td><td>5</td><td>6</td><td>6</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Flipping k zeros to extend a run of ones is the same "budget" pattern as Longest Repeating Character Replacement — count what you're not allowed too much of, and shrink only when the budget breaks.</div>`});

/* Problem 029 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q029 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 029 · MEDIUM</span>Find All Anagrams in a String</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Sliding Window</span><span class="pill">Frequency Array</span></div>
<p class="dropcap">Given two strings <code>s</code> and <code>p</code>, return the starting indices of all of <code>p</code>'s anagrams in <code>s</code>, in any order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation: s[0..2] = "cba" and s[6..8] = "bac" are both
anagrams of "abc"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length, p.length &lt;= 3 × 10⁴</li><li>s and p consist of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This is Permutation in String run at every window position instead of stopping at the first match — collect instead of returning early.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Slide a fixed window of length <code>p.length()</code> across <code>s</code>, maintaining 26-slot frequency arrays for <code>p</code> and the current window. After each slide, compare the arrays; every equal position is recorded as an anagram start index.</p>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; findAnagrams(String s, String p) {
    List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
    int n = s.length(), m = p.length();
    if (m &gt; n) return res;
    int[] need = new int[26], window = new int[26];
    for (char c : p.toCharArray()) need[c - 'a']++;
    for (int i = 0; i &lt; m; i++) window[s.charAt(i) - 'a']++;
    if (Arrays.equals(need, window)) res.add(0);
    for (int right = m; right &lt; n; right++) {
        window[s.charAt(right) - 'a']++;
        window[s.charAt(right - m) - 'a']--;
        if (Arrays.equals(need, window)) res.add(right - m + 1);
    }
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "cbaebabacd", p = "abc"</code> — window length 3</p>
<table class="tbl">
<tr><th>right</th><th>window substring</th><th>anagram of "abc"?</th><th>res so far</th></tr>
<tr><td>2 (init)</td><td>"cba"</td><td>yes</td><td>[0]</td></tr>
<tr><td>3</td><td>"bae"</td><td>no</td><td>[0]</td></tr>
<tr><td>5</td><td>"eba"</td><td>no</td><td>[0]</td></tr>
<tr><td>6</td><td>"bab"</td><td>no</td><td>[0]</td></tr>
<tr><td>7</td><td>"aba"</td><td>no</td><td>[0]</td></tr>
<tr><td>8</td><td>"bac"</td><td>yes</td><td>[0,6]</td></tr>
<tr><td>9</td><td>"acd"</td><td>no</td><td>[0,6]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each slide does O(26) array work. Space: O(1) — two fixed 26-slot arrays.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Return the first match" and "return every match" are the same fixed-window scan — the only difference is whether you return immediately or append to a list.</div>`});

/* Problem 030 */
B.spread(
{ kicker: 'DSA · SLIDING WINDOW', head: 'Q030 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 030 · MEDIUM</span>Longest Subarray with Sum At Most K</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Sliding Window</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given an array <code>nums</code> of positive integers and an integer <code>k</code>, return the length of the longest contiguous subarray whose sum is less than or equal to <code>k</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [3,1,2,1,1,1,4], k = 5
Output: 4
Explanation: the subarray [2,1,1,1] (indices 2-5) sums to 5
and has length 4 — no longer window sums to at most 5</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁵</li><li>1 &lt;= nums[i] &lt;= 10⁴</li><li>1 &lt;= k &lt;= 10⁹</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every element is positive, so the running sum only grows as the window expands and only shrinks as it contracts — that monotonicity is what makes two pointers valid here.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Expand right, adding to a running sum. Whenever the sum exceeds k, shrink from the left — subtracting elements — until it's back within budget. Because all values are positive, this two-pointer scan never needs to revisit a position, unlike the general (signed) version which requires prefix sums instead.</p>
<pre class="code" data-lang="java"><code>public int longestSubarray(int[] nums, int k) {
    int left = 0, sum = 0, best = 0;
    for (int right = 0; right &lt; nums.length; right++) {
        sum += nums[right];
        while (sum &gt; k) {
            sum -= nums[left];
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [3,1,2,1,1,1,4], k = 5</code></p>
<table class="tbl">
<tr><th>right</th><th>val</th><th>sum</th><th>left</th><th>window len</th><th>best</th></tr>
<tr><td>0</td><td>3</td><td>3</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>4</td><td>0</td><td>2</td><td>2</td></tr>
<tr><td>2</td><td>2</td><td>6→3 shrink</td><td>1</td><td>2</td><td>2</td></tr>
<tr><td>3</td><td>1</td><td>4</td><td>1</td><td>3</td><td>3</td></tr>
<tr><td>4</td><td>1</td><td>5</td><td>1</td><td>4</td><td>4</td></tr>
<tr><td>5</td><td>1</td><td>6→5 shrink</td><td>2</td><td>4</td><td>4</td></tr>
<tr><td>6</td><td>4</td><td>9→5 shrink</td><td>5</td><td>2</td><td>4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — left and right each traverse the array at most once. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Sum &lt;= k" only slides cleanly with non-negative numbers. The moment negatives enter, the window stops being monotonic — you'd need prefix sums plus a different structure instead.</div>`});

})();
