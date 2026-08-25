/* ===== CHAPTER 32 · DSA: Arrays & Hashing ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 32, 'DSA: Arrays & Hashing');

/* Problem 001 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q001 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 001 · EASY</span>Two Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers that add up to <code>target</code>. Assume exactly one solution exists, and you may not use the same element twice.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 &lt;= nums.length &lt;= 10⁴</li><li>Exactly one valid answer exists</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Brute force is O(n²). Can a hash map get you O(n) in one pass?</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Walk the array once. For each value, check whether <code>target - nums[i]</code> was already seen; if so, we found our pair. Otherwise, remember this value's index and keep going.</p>
<pre class="code" data-lang="java"><code>public int[] twoSum(int[] nums, int target) {
    Map&lt;Integer, Integer&gt; seen = new HashMap&lt;&gt;();
    for (int i = 0; i &lt; nums.length; i++) {
        int need = target - nums[i];
        if (seen.containsKey(need)) return new int[]{seen.get(need), i};
        seen.put(nums[i], i);
    }
    throw new IllegalArgumentException("no solution");
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [2,7,11,15], target = 9</code></p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>need</th><th>seen before this step</th><th>action</th></tr>
<tr><td>0</td><td>2</td><td>7</td><td>{}</td><td>not found → put(2,0)</td></tr>
<tr><td>1</td><td>7</td><td>2</td><td>{2:0}</td><td>found! return [0,1]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one pass. Space: O(n) — the hash map.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Trading space for time: remembering what you've seen turns an O(n²) search into O(1) average lookups.</div>`});

/* Problem 002 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q002 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 002 · EASY</span>Contains Duplicate</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Hash Set</span></div>
<p class="dropcap">Given an integer array <code>nums</code>, return <code>true</code> if any value appears at least twice in the array, and return <code>false</code> if every element is distinct.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,2,3,1]
Output: true
Explanation: 1 appears at index 0 and index 3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁵</li><li>-10⁹ &lt;= nums[i] &lt;= 10⁹</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A <code>Set</code>'s <code>add()</code> already tells you whether the element was already there — no separate lookup needed.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Insert every number into a <code>HashSet</code>. <code>Set.add(x)</code> returns <code>false</code> when <code>x</code> was already present — that's the duplicate, caught in the same pass that builds the set.</p>
<pre class="code" data-lang="java"><code>public boolean containsDuplicate(int[] nums) {
    Set&lt;Integer&gt; seen = new HashSet&lt;&gt;();
    for (int n : nums) {
        if (!seen.add(n)) return true;
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,2,3,1]</code></p>
<table class="tbl">
<tr><th>i</th><th>num</th><th>seen before</th><th>add(num) returns</th><th>action</th></tr>
<tr><td>0</td><td>1</td><td>{}</td><td>true</td><td>continue</td></tr>
<tr><td>1</td><td>2</td><td>{1}</td><td>true</td><td>continue</td></tr>
<tr><td>2</td><td>3</td><td>{1,2}</td><td>true</td><td>continue</td></tr>
<tr><td>3</td><td>1</td><td>{1,2,3}</td><td>false</td><td>return true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) average — hash set insert/lookup is O(1). Space: O(n) worst case.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Sorting first also works (O(n log n), O(1) extra space) — mention the trade-off if the interviewer asks for a no-extra-memory variant.</div>`});

/* Problem 003 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q003 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 003 · EASY</span>Valid Anagram</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">String</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code> — same characters, same frequencies, possibly reordered.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length, t.length &lt;= 5 × 10⁴</li><li>Both strings consist of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Different lengths can never be anagrams — check that first and exit early. Otherwise, count letters.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Since the alphabet is fixed (lowercase a–z), use a 26-slot counter instead of a full hash map. Increment for every letter of <code>s</code>, decrement for every letter of <code>t</code> at the same position pass; if every slot returns to zero, the multisets match.</p>
<pre class="code" data-lang="java"><code>public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i &lt; s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "cat", t = "act"</code></p>
<table class="tbl">
<tr><th>i</th><th>s[i]</th><th>t[i]</th><th>count[a]</th><th>count[c]</th><th>count[t]</th></tr>
<tr><td>0</td><td>c</td><td>a</td><td>-1</td><td>1</td><td>0</td></tr>
<tr><td>1</td><td>a</td><td>c</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>2</td><td>t</td><td>t</td><td>0</td><td>0</td><td>0</td></tr>
</table>
<p class="fs13">All 26 slots are 0 at the end → <code>true</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) — the counter array is a fixed 26 ints.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A fixed, bounded alphabet is your cue to trade a HashMap for a plain array — same idea, far less overhead.</div>`});

/* Problem 004 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q004 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 004 · MEDIUM</span>Group Anagrams</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given an array of strings <code>strs</code>, group the anagrams together. Return the groups in any order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["eat","tea","ate"],["tan","nat"],["bat"]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= strs.length &lt;= 10⁴</li><li>0 &lt;= strs[i].length &lt;= 100, lowercase letters only</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Anagrams share a canonical form. What single value could you compute from a word that is identical for every one of its rearrangements?</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort each word's characters to get a canonical key — all anagrams collapse to the same key. Bucket words into a map keyed by that string, then return the map's values.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;String&gt;&gt; groupAnagrams(String[] strs) {
    Map&lt;String, List&lt;String&gt;&gt; map = new HashMap&lt;&gt;();
    for (String s : strs) {
        char[] c = s.toCharArray();
        Arrays.sort(c);
        String key = new String(c);
        map.computeIfAbsent(key, k -&gt; new ArrayList&lt;&gt;()).add(s);
    }
    return new ArrayList&lt;&gt;(map.values());
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>["eat","tea","tan","ate","nat","bat"]</code></p>
<table class="tbl">
<tr><th>word</th><th>sorted key</th><th>map state after insert</th></tr>
<tr><td>eat</td><td>aet</td><td>{aet:[eat]}</td></tr>
<tr><td>tea</td><td>aet</td><td>{aet:[eat,tea]}</td></tr>
<tr><td>tan</td><td>ant</td><td>{aet:[eat,tea], ant:[tan]}</td></tr>
<tr><td>ate</td><td>aet</td><td>{aet:[eat,tea,ate], ant:[tan]}</td></tr>
<tr><td>nat</td><td>ant</td><td>{aet:[eat,tea,ate], ant:[tan,nat]}</td></tr>
<tr><td>bat</td><td>abt</td><td>{aet:[...], ant:[...], abt:[bat]}</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · k log k) — n words, each sorted (k = word length). Space: O(n · k).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>For an O(n·k) version, key by a 26-length character-count string instead of sorting — trades sort time for a fixed-size scan.</div>`});

/* Problem 005 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q005 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 005 · MEDIUM</span>Top K Frequent Elements</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Bucket Sort</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements. Answer order does not matter.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁵</li><li><code>k</code> is always valid: <code>1 &lt;= k &lt;= number of distinct elements</code></li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A heap gives O(n log k). Can you do O(n) instead by noticing frequency can never exceed <code>nums.length</code>?</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Count frequencies with a map. Since max possible frequency is <code>n</code>, build an array of buckets indexed by frequency (bucket sort), then walk from the highest frequency down, collecting numbers until we have <code>k</code>.</p>
<pre class="code" data-lang="java"><code>public int[] topKFrequent(int[] nums, int k) {
    Map&lt;Integer, Integer&gt; count = new HashMap&lt;&gt;();
    for (int n : nums) count.merge(n, 1, Integer::sum);

    List&lt;Integer&gt;[] buckets = new List[nums.length + 1];
    for (int i = 0; i &lt; buckets.length; i++) buckets[i] = new ArrayList&lt;&gt;();
    for (var e : count.entrySet()) buckets[e.getValue()].add(e.getKey());

    int[] res = new int[k];
    int idx = 0;
    for (int freq = buckets.length - 1; freq &gt;= 0 &amp;&amp; idx &lt; k; freq--) {
        for (int num : buckets[freq]) {
            if (idx &lt; k) res[idx++] = num;
        }
    }
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,1,1,2,2,3], k = 2</code> — counts: {1:3, 2:2, 3:1}, buckets sized 7 (indices 0..6)</p>
<table class="tbl">
<tr><th>freq (walked high→low)</th><th>bucket[freq]</th><th>idx before</th><th>action</th></tr>
<tr><td>6, 5, 4</td><td>[] (empty)</td><td>0</td><td>skip</td></tr>
<tr><td>3</td><td>[1]</td><td>0</td><td>res[0]=1 → idx=1</td></tr>
<tr><td>2</td><td>[2]</td><td>1</td><td>res[1]=2 → idx=2 (== k, stop)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — counting + bucket fill + bounded bucket walk. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Whenever a value is capped by <code>n</code> (here, frequency), that cap is a hint you can bucket/count-sort instead of comparison-sort or heap.</div>`});

/* Problem 006 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q006 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 006 · MEDIUM</span>Product of Array Except Self</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Prefix / Suffix</span></div>
<p class="dropcap">Given an integer array <code>nums</code>, return an array <code>answer</code> where <code>answer[i]</code> equals the product of every element of <code>nums</code> except <code>nums[i]</code> — without using division, in O(n) time.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,2,3,4]
Output: [24,12,8,6]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 &lt;= nums.length &lt;= 10⁵</li><li>The product of any prefix/suffix fits in a 32-bit integer</li><li>Division is not allowed</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span><code>answer[i] = (product of everything to the left of i) × (product of everything to the right of i)</code>. Compute those two passes separately.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Pass 1 (left→right): <code>res[i]</code> becomes the product of everything <em>before</em> index <code>i</code>. Pass 2 (right→left): multiply each <code>res[i]</code> by a running product of everything <em>after</em> index <code>i</code>. No division, one output array doubles as scratch space.</p>
<pre class="code" data-lang="java"><code>public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];
    res[0] = 1;
    for (int i = 1; i &lt; n; i++) res[i] = res[i - 1] * nums[i - 1];

    int right = 1;
    for (int i = n - 1; i &gt;= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,2,3,4]</code> — prefix pass gives <code>res = [1,1,2,6]</code></p>
<table class="tbl">
<tr><th>phase / i</th><th>right before</th><th>res[i] *= right</th><th>right *= nums[i]</th></tr>
<tr><td>suffix, i=3</td><td>1</td><td>6 × 1 = 6</td><td>right = 1×4 = 4</td></tr>
<tr><td>suffix, i=2</td><td>4</td><td>2 × 4 = 8</td><td>right = 4×3 = 12</td></tr>
<tr><td>suffix, i=1</td><td>12</td><td>1 × 12 = 12</td><td>right = 12×2 = 24</td></tr>
<tr><td>suffix, i=0</td><td>24</td><td>1 × 24 = 24</td><td>right = 24×1 = 24</td></tr>
</table>
<p class="fs13">Final <code>res = [24, 12, 8, 6]</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — two passes. Space: O(1) extra (output array doesn't count).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Everything except position i" almost always decomposes into a left-scan and a right-scan meeting at i.</div>`});

/* Problem 007 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q007 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 007 · MEDIUM</span>Valid Sudoku</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Hash Set</span><span class="pill">Matrix</span></div>
<p class="dropcap">Given a 9×9 Sudoku board, determine if it is valid so far: only the <em>filled</em> cells need to be checked, per the rules — each row, each column, and each of the nine 3×3 sub-boxes must contain the digits 1-9 with no repeats. <code>'.'</code> marks an empty cell.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: board rows start ["5","3",".",".","7",...], ["6",".",".","1","9","5",...], ...
Output: true  (no row/column/box has a repeated digit)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>board.length == board[i].length == 9</li><li>board[i][j] is a digit 1-9 or '.'</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>You need three families of "seen" sets — one per row, one per column, one per 3×3 box. The box index from <code>(r, c)</code> is <code>(r/3)*3 + c/3</code> using integer division.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Give every row, column, and box its own <code>HashSet&lt;Character&gt;</code>. Scan the board once; for each filled cell, try to <code>add</code> its digit into all three relevant sets. If any <code>add</code> returns <code>false</code>, that digit was already there — the board is invalid.</p>
<pre class="code" data-lang="java"><code>public boolean isValidSudoku(char[][] board) {
    Set&lt;Character&gt;[] rows = new HashSet[9], cols = new HashSet[9], boxes = new HashSet[9];
    for (int i = 0; i &lt; 9; i++) { rows[i] = new HashSet&lt;&gt;(); cols[i] = new HashSet&lt;&gt;(); boxes[i] = new HashSet&lt;&gt;(); }

    for (int r = 0; r &lt; 9; r++) {
        for (int c = 0; c &lt; 9; c++) {
            char v = board[r][c];
            if (v == '.') continue;
            int b = (r / 3) * 3 + (c / 3);
            if (!rows[r].add(v) || !cols[c].add(v) || !boxes[b].add(v)) return false;
        }
    }
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input snippet: <code>board[0] = ['5','3','5',...]</code> (a deliberately invalid row — two 5's)</p>
<table class="tbl">
<tr><th>r,c</th><th>v</th><th>box b</th><th>rows[r].add(v)</th><th>cols[c].add(v)</th><th>boxes[b].add(v)</th><th>result</th></tr>
<tr><td>0,0</td><td>5</td><td>0</td><td>true (new)</td><td>true</td><td>true</td><td>continue</td></tr>
<tr><td>0,1</td><td>3</td><td>0</td><td>true (new)</td><td>true</td><td>true</td><td>continue</td></tr>
<tr><td>0,2</td><td>5</td><td>0</td><td>false (dup!)</td><td>—</td><td>—</td><td>return false</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) — the board is always 81 cells. Space: O(1) — 27 sets, bounded size.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The box-index formula <code>(r/3)*3 + c/3</code> is worth memorizing cold — it's the recurring trick for flattening any 3×3-of-3×3 grid.</div>`});

/* Problem 008 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q008 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 008 · MEDIUM</span>Longest Consecutive Sequence</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Hash Set</span></div>
<p class="dropcap">Given an unsorted array of integers <code>nums</code>, return the length of the longest run of consecutive integers (order in the array does not matter). Must run in O(n) time — sorting first is O(n log n) and won't pass the follow-up.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: the run is [1,2,3,4]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= nums.length &lt;= 10⁵</li><li>-10⁹ &lt;= nums[i] &lt;= 10⁹</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Put everything in a set for O(1) lookups. Only bother extending a run from numbers that are the <em>start</em> of one — i.e. where <code>n-1</code> is NOT in the set.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Dump all numbers into a <code>HashSet</code>. For each number, if its predecessor <code>n-1</code> isn't in the set, it's a sequence start — walk forward (<code>n+1, n+2, ...</code>) counting how far the run goes. Every number is only ever the "start" of at most one scan, so the total work across all starts is O(n), not O(n²).</p>
<pre class="code" data-lang="java"><code>public int longestConsecutive(int[] nums) {
    Set&lt;Integer&gt; set = new HashSet&lt;&gt;();
    for (int n : nums) set.add(n);

    int longest = 0;
    for (int n : set) {
        if (!set.contains(n - 1)) {           // n starts a run
            int length = 1;
            while (set.contains(n + length)) length++;
            longest = Math.max(longest, length);
        }
    }
    return longest;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [100,4,200,1,3,2]</code> — set = {100,4,200,1,3,2}</p>
<table class="tbl">
<tr><th>n</th><th>contains(n-1)?</th><th>is a start?</th><th>run length found</th><th>longest so far</th></tr>
<tr><td>100</td><td>false</td><td>yes</td><td>1</td><td>1</td></tr>
<tr><td>4</td><td>true (3 present)</td><td>no</td><td>—</td><td>1</td></tr>
<tr><td>200</td><td>false</td><td>yes</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>false</td><td>yes</td><td>4 (1→2→3→4)</td><td>4</td></tr>
<tr><td>3</td><td>true (2 present)</td><td>no</td><td>—</td><td>4</td></tr>
<tr><td>2</td><td>true (1 present)</td><td>no</td><td>—</td><td>4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — amortized, each number is visited a constant number of times. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Only start scanning from a true start" is the trick that turns an apparent O(n²) into O(n) — every element gets extended at most once, total.</div>`});

/* Problem 009 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q009 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 009 · EASY</span>Majority Element (Boyer-Moore Voting)</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Boyer-Moore</span></div>
<p class="dropcap">Given an array <code>nums</code> of size <code>n</code>, return the majority element — the value that appears <strong>more than</strong> <code>⌊n / 2⌋</code> times. You may assume a majority element always exists. Solve it in O(n) time and O(1) extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [2,2,1,1,1,2,2]
Output: 2
Explanation: 2 appears 4 times out of 7 (&gt; 3.5)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 5 × 10⁴</li><li>A majority element is guaranteed to exist</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A hash-map count works but costs O(n) space. Can you keep just a single "current candidate" and a running counter instead?</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Boyer-Moore voting: keep a <code>candidate</code> and a <code>count</code>. Matching the candidate increments the count; disagreeing decrements it. When count hits zero, adopt the current number as the new candidate. Because the true majority element outnumbers everything else combined, it's guaranteed to survive as the final candidate.</p>
<pre class="code" data-lang="java"><code>public int majorityElement(int[] nums) {
    int count = 0, candidate = 0;
    for (int n : nums) {
        if (count == 0) candidate = n;
        count += (n == candidate) ? 1 : -1;
    }
    return candidate;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [2,2,1,1,1,2,2]</code></p>
<table class="tbl">
<tr><th>i</th><th>num</th><th>count before</th><th>candidate before</th><th>candidate after</th><th>count after</th></tr>
<tr><td>0</td><td>2</td><td>0</td><td>—</td><td>2</td><td>1</td></tr>
<tr><td>1</td><td>2</td><td>1</td><td>2</td><td>2</td><td>2</td></tr>
<tr><td>2</td><td>1</td><td>2</td><td>2</td><td>2</td><td>1</td></tr>
<tr><td>3</td><td>1</td><td>1</td><td>2</td><td>2</td><td>0</td></tr>
<tr><td>4</td><td>1</td><td>0</td><td>2</td><td>1</td><td>1</td></tr>
<tr><td>5</td><td>2</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>6</td><td>2</td><td>0</td><td>1</td><td>2</td><td>1</td></tr>
</table>
<p class="fs13">Final candidate = <code>2</code> — matches expected output.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one pass. Space: O(1) — two variables, no map.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Think of it as pairwise cancellation: a true majority element cannot be fully "cancelled out" by every other value combined, so it's always the last one standing.</div>`});

/* Problem 010 */
B.spread(
{ kicker: 'DSA · ARRAYS & HASHING', head: 'Q010 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 010 · MEDIUM</span>Subarray Sum Equals K</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Prefix Sum</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given an array of integers <code>nums</code> and an integer <code>k</code>, return the total number of contiguous subarrays whose elements sum to exactly <code>k</code>. Values may be negative.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [1,1,1], k = 2
Output: 2
Explanation: subarrays [1,1] (indices 0-1) and [1,1] (indices 1-2)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 2 × 10⁴</li><li>-1000 &lt;= nums[i] &lt;= 1000, -10⁷ &lt;= k &lt;= 10⁷</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Negative numbers rule out the sliding-window trick. Instead, think in prefix sums: subarray (i, j] sums to k exactly when <code>prefix[j] - prefix[i] == k</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep a running prefix <code>sum</code> and a map of "how many times has this prefix sum occurred so far" (seeded with <code>{0: 1}</code> for the empty prefix). At each index, the number of valid subarrays ending here equals how many earlier prefixes equal <code>sum - k</code> — because that's exactly the condition for the slice between them to sum to <code>k</code>.</p>
<pre class="code" data-lang="java"><code>public int subarraySum(int[] nums, int k) {
    Map&lt;Integer, Integer&gt; prefixCount = new HashMap&lt;&gt;();
    prefixCount.put(0, 1);
    int sum = 0, count = 0;
    for (int n : nums) {
        sum += n;
        count += prefixCount.getOrDefault(sum - k, 0);
        prefixCount.merge(sum, 1, Integer::sum);
    }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,1,1], k = 2</code> — start: prefixCount = {0:1}, sum = 0, count = 0</p>
<table class="tbl">
<tr><th>i</th><th>n</th><th>sum</th><th>need = sum-k</th><th>prefixCount.get(need)</th><th>count after</th><th>prefixCount after merge</th></tr>
<tr><td>0</td><td>1</td><td>1</td><td>-1</td><td>0</td><td>0</td><td>{0:1, 1:1}</td></tr>
<tr><td>1</td><td>1</td><td>2</td><td>0</td><td>1</td><td>1</td><td>{0:1, 1:1, 2:1}</td></tr>
<tr><td>2</td><td>1</td><td>3</td><td>1</td><td>1</td><td>2</td><td>{0:1, 1:1, 2:1, 3:1}</td></tr>
</table>
<p class="fs13">Final <code>count = 2</code> — matches the two [1,1] subarrays.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one pass, O(1) map operations. Space: O(n) — up to n distinct prefix sums.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Subarray sums to k" almost always means: convert to prefix sums, then it's really Two Sum on the prefix array — that reframe is the whole problem.</div>`});

})();
