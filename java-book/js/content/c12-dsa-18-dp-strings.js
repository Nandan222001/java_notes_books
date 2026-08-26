/* ===== CHAPTER 49 · DSA: Dynamic Programming — Strings ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 49, 'DSA: Dynamic Programming — Strings');

/* Problem 171 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q171 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 171 · MEDIUM</span>Longest Palindromic Subsequence</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">DP</span></div>
<p class="dropcap">Given a string <code>s</code>, find the length of the longest palindromic SUBSEQUENCE (characters need not be contiguous, but must keep relative order).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "bbbab"
Output: 4
Explanation: one longest palindromic subsequence is "bbbb"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Define dp[i][j] = longest palindromic subsequence length within s[i..j]. If the end characters match, they both join the palindrome; otherwise take the best of dropping either end.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Fill dp[i][j] for increasing substring lengths. Base case: dp[i][i] = 1 (single character). If s[i] == s[j], dp[i][j] = dp[i+1][j-1] + 2; otherwise dp[i][j] = max(dp[i+1][j], dp[i][j-1]).</p>
<pre class="code" data-lang="java"><code>public int longestPalindromeSubseq(String s) {
    int n = s.length();
    int[][] dp = new int[n][n];
    for (int i = n - 1; i &gt;= 0; i--) {
        dp[i][i] = 1;
        for (int j = i + 1; j &lt; n; j++) {
            if (s.charAt(i) == s.charAt(j)) dp[i][j] = dp[i + 1][j - 1] + 2;
            else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
    }
    return dp[0][n - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "bbbab"</code> (indices 0-4)</p>
<table class="tbl">
<tr><th>i,j</th><th>s[i],s[j]</th><th>action</th><th>dp[i][j]</th></tr>
<tr><td>4,4</td><td>—</td><td>base case</td><td>1</td></tr>
<tr><td>3,4</td><td>a,b</td><td>mismatch → max(dp[4][4],dp[3][3])</td><td>1</td></tr>
<tr><td>2,4</td><td>b,b</td><td>match → dp[3][3]+2</td><td>3</td></tr>
<tr><td>0,4</td><td>b,b</td><td>match → dp[1][3]+2 = 2+2</td><td>4</td></tr>
</table>
<p class="fs13">Final answer <code>dp[0][4] = 4</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(n²).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Any "longest palindromic X" problem over a single string reduces to this same interval-DP shape — the only variation is what happens on a character match.</div>`});

/* Problem 172 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q172 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 172 · HARD</span>Distinct Subsequences</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">String</span><span class="pill">DP</span><span class="pill">Two Strings</span></div>
<p class="dropcap">Given two strings <code>s</code> and <code>t</code>, return the number of distinct subsequences of <code>s</code> that equal <code>t</code>. A subsequence keeps relative order but need not be contiguous.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "babgbag", t = "bag"
Output: 5
Explanation: the 5 ways pick "b" and "g" from different positions,
each paired with one of the "a" characters in between.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length, t.length &lt;= 1000</li><li>s and t consist of English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i][j] = ways to form t[0..j) using s[0..i). Character s[i-1] can either be skipped (dp[i-1][j]) or, when it matches t[j-1], also used to extend a match (dp[i-1][j-1]).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[i][0] = 1 for every i — an empty target string is formed exactly one way (skip everything). Then dp[i][j] = dp[i-1][j] (don't use s[i-1]) plus dp[i-1][j-1] when s[i-1] == t[j-1] (also use s[i-1] as the matching character).</p>
<pre class="code" data-lang="java"><code>public int numDistinct(String s, String t) {
    int n = s.length(), m = t.length();
    int[][] dp = new int[n + 1][m + 1];
    for (int i = 0; i &lt;= n; i++) dp[i][0] = 1;
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            dp[i][j] = dp[i - 1][j];
            if (s.charAt(i - 1) == t.charAt(j - 1)) dp[i][j] += dp[i - 1][j - 1];
        }
    }
    return dp[n][m];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "babgbag", t = "bag"</code></p>
<table class="tbl">
<tr><th>i</th><th>s[i-1]</th><th>dp[i]["b"]</th><th>dp[i]["ba"]</th><th>dp[i]["bag"]</th></tr>
<tr><td>0</td><td>—</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>1</td><td>b</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>2</td><td>a</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>3</td><td>b</td><td>2</td><td>1</td><td>0</td></tr>
<tr><td>4</td><td>g</td><td>2</td><td>1</td><td>1</td></tr>
<tr><td>5</td><td>b</td><td>3</td><td>1</td><td>1</td></tr>
<tr><td>6</td><td>a</td><td>3</td><td>4</td><td>1</td></tr>
<tr><td>7</td><td>g</td><td>3</td><td>4</td><td><b>5</b></td></tr>
</table>
<p class="fs13">Final answer <code>dp[7][3] = 5</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·m). Space: O(n·m), reducible to O(m) with a 1D rolling row iterated right-to-left.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Skip or also-match" is Distinct Subsequences' fingerprint — every s-character casts a vote to skip, and a second vote to match only when characters agree.</div>`});

/* Problem 173 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q173 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 173 · HARD</span>Wildcard Matching</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">String</span><span class="pill">DP</span><span class="pill">Pattern Matching</span></div>
<p class="dropcap">Given an input string <code>s</code> and a pattern <code>p</code>, implement wildcard matching that supports <code>?</code> (matches any single character) and <code>*</code> (matches any sequence of characters, including the empty sequence). The match must cover the entire input string.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "adceb", p = "*a*b"
Output: true
Explanation: "*" matches "", "a" matches "a", "*" matches "dce", "b" matches "b"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= s.length, p.length &lt;= 2000</li><li>s consists of lowercase English letters</li><li>p consists of lowercase English letters, '?', '*'</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i][j] = true if s[0..i) matches p[0..j). When p[j-1] is '*' it can either match nothing (dp[i][j-1]) or absorb one more character of s while staying put (dp[i-1][j]).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[0][0] = true. A leading run of '*' characters in p can match an empty prefix, so dp[0][j] = dp[0][j-1] when p[j-1] == '*'. For i,j &gt;= 1: if p[j-1] == '*', dp[i][j] = dp[i-1][j] || dp[i][j-1]; otherwise (a literal or '?') dp[i][j] = dp[i-1][j-1] when the characters agree.</p>
<pre class="code" data-lang="java"><code>public boolean isMatch(String s, String p) {
    int n = s.length(), m = p.length();
    boolean[][] dp = new boolean[n + 1][m + 1];
    dp[0][0] = true;
    for (int j = 1; j &lt;= m; j++)
        if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 1];
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            char pc = p.charAt(j - 1);
            if (pc == '*') dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            else if (pc == '?' || pc == s.charAt(i - 1)) dp[i][j] = dp[i - 1][j - 1];
        }
    }
    return dp[n][m];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "adceb", p = "*a*b"</code> — dp rows show p-prefixes "", *, *a, *a*, *a*b</p>
<table class="tbl">
<tr><th>i</th><th>s[i-1]</th><th>""</th><th>*</th><th>*a</th><th>*a*</th><th>*a*b</th></tr>
<tr><td>0</td><td>—</td><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td></tr>
<tr><td>1</td><td>a</td><td>F</td><td>T</td><td>T</td><td>T</td><td>F</td></tr>
<tr><td>2</td><td>d</td><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>3</td><td>c</td><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>4</td><td>e</td><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>5</td><td>b</td><td>F</td><td>T</td><td>F</td><td>T</td><td><b>T</b></td></tr>
</table>
<p class="fs13">Final answer <code>dp[5][4] = true</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·m). Space: O(n·m), reducible to O(m) with a rolling row.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>'*' is the only symbol that ever looks two directions at once (dp[i-1][j] AND dp[i][j-1]) — every other pattern character only ever looks diagonally back.</div>`});

/* Problem 174 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q174 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 174 · HARD</span>Regular Expression Matching</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">String</span><span class="pill">DP</span><span class="pill">Pattern Matching</span></div>
<p class="dropcap">Given a string <code>s</code> and a pattern <code>p</code>, implement regular expression matching supporting <code>.</code> (matches any single character) and <code>*</code> (matches zero or more of the PRECEDING element). The match must cover the entire input string.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "aab", p = "c*a*b"
Output: true
Explanation: "c*" repeats 'c' zero times (matches ""), "a*" repeats 'a'
twice (matches "aa"), then "b" matches "b" — together "aab".</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 20, 1 &lt;= p.length &lt;= 30</li><li>s consists of lowercase English letters</li><li>p consists of lowercase English letters, '.', '*'; every '*' is preceded by a valid character</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i][j] = true if s[0..i) matches p[0..j). A trailing '*' in p either erases itself and the element before it (zero occurrences: dp[i][j-2]) or, if that element matches s[i-1], consumes one character of s while staying on the same pattern position (dp[i-1][j]).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[0][0] = true; a pattern like "a*b*" can match empty when every element has a trailing '*', so dp[0][j] = dp[0][j-2] whenever p[j-1] == '*'. For i,j &gt;= 1 with p[j-1] == '*': zero = dp[i][j-2]; more = (prev element matches s[i-1]) &amp;&amp; dp[i-1][j]; dp[i][j] = zero || more. Otherwise, for '.' or a literal match: dp[i][j] = dp[i-1][j-1].</p>
<pre class="code" data-lang="java"><code>public boolean isMatch(String s, String p) {
    int n = s.length(), m = p.length();
    boolean[][] dp = new boolean[n + 1][m + 1];
    dp[0][0] = true;
    for (int j = 1; j &lt;= m; j++)
        if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            char pc = p.charAt(j - 1);
            if (pc == '*') {
                boolean zero = dp[i][j - 2];
                char prev = p.charAt(j - 2);
                boolean more = (prev == '.' || prev == s.charAt(i - 1)) &amp;&amp; dp[i - 1][j];
                dp[i][j] = zero || more;
            } else if (pc == '.' || pc == s.charAt(i - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    return dp[n][m];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "aab", p = "c*a*b"</code> — dp columns show p-prefixes "", c, c*, c*a, c*a*, c*a*b</p>
<table class="tbl">
<tr><th>i</th><th>s[i-1]</th><th>""</th><th>c</th><th>c*</th><th>c*a</th><th>c*a*</th><th>c*a*b</th></tr>
<tr><td>0</td><td>—</td><td>T</td><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>1</td><td>a</td><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td><td>F</td></tr>
<tr><td>2</td><td>a</td><td>F</td><td>F</td><td>F</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>3</td><td>b</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td><b>T</b></td></tr>
</table>
<p class="fs13">Final answer <code>dp[3][5] = true</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·m). Space: O(n·m).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Regex '*' binds to the element before it, not the string position — always resolve it as "zero of the previous element" vs "one more of it," never as a standalone wildcard like in Wildcard Matching.</div>`});

/* Problem 175 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q175 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 175 · MEDIUM</span>Delete Operation for Two Strings</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">DP</span><span class="pill">LCS</span></div>
<p class="dropcap">Given two strings <code>word1</code> and <code>word2</code>, return the minimum number of steps required to make them equal, where one step deletes exactly one character from either string.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: delete "s" from "sea" and "t" from "eat", leaving "ea" in both</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= word1.length, word2.length &lt;= 500</li><li>word1 and word2 consist of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every character NOT in the Longest Common Subsequence of the two words must be deleted from whichever word it belongs to. Find the LCS length, then the answer is (n - lcs) + (m - lcs).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Run the classic LCS dp: dp[i][j] = dp[i-1][j-1] + 1 when word1[i-1] == word2[j-1], else max(dp[i-1][j], dp[i][j-1]). Once dp[n][m] gives the LCS length, every leftover character in each word (the ones outside that shared subsequence) must be deleted.</p>
<pre class="code" data-lang="java"><code>public int minDistance(String word1, String word2) {
    int n = word1.length(), m = word2.length();
    int[][] dp = new int[n + 1][m + 1];
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    int lcs = dp[n][m];
    return (n - lcs) + (m - lcs);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>word1 = "sea", word2 = "eat"</code></p>
<table class="tbl">
<tr><th>word1 \\ word2</th><th>""</th><th>e</th><th>ea</th><th>eat</th></tr>
<tr><td>""</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>s</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>se</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>sea</td><td>0</td><td>1</td><td>2</td><td>2</td></tr>
</table>
<p class="fs13">LCS = dp[3][3] = 2 ("ea"). Deletions = (3-2) + (3-2) = <b>2</b>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·m). Space: O(n·m), reducible to O(m) with a rolling row.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Recognizing "minimum deletions to equalize two strings" as "n + m - 2·LCS" turns an edit-distance-flavored problem back into a one-line LCS lookup.</div>`});

/* Problem 176 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q176 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 176 · MEDIUM</span>Minimum ASCII Delete Sum for Two Strings</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">DP</span><span class="pill">LCS Variant</span></div>
<p class="dropcap">Given two strings <code>s1</code> and <code>s2</code>, return the lowest ASCII sum of deleted characters needed to make the two strings equal.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s1 = "sea", s2 = "eat"
Output: 231
Explanation: deleting "s" (115) from "sea" and "t" (116) from "eat"
leaves "ea" in both, for a total ASCII sum of 231. No cheaper
sequence of deletions makes the strings equal.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= s1.length, s2.length &lt;= 1000</li><li>s1 and s2 consist of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Same shape as plain LCS-based deletion, but every deletion now costs the character's ASCII value instead of a flat 1. Matching characters are free; mismatches take the cheaper of the two possible deletions.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>dp[i][j] = minimum ASCII sum of deletions to make s1[0..i) and s2[0..j) equal. Base rows/columns accumulate forced deletions of one whole string against an empty other. On a character match, dp[i][j] = dp[i-1][j-1] (free). On a mismatch, take the cheaper of deleting s1[i-1] or s2[j-1].</p>
<pre class="code" data-lang="java"><code>public int minimumDeleteSum(String s1, String s2) {
    int n = s1.length(), m = s2.length();
    int[][] dp = new int[n + 1][m + 1];
    for (int i = 1; i &lt;= n; i++) dp[i][0] = dp[i - 1][0] + s1.charAt(i - 1);
    for (int j = 1; j &lt;= m; j++) dp[0][j] = dp[0][j - 1] + s2.charAt(j - 1);
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = Math.min(dp[i - 1][j] + s1.charAt(i - 1), dp[i][j - 1] + s2.charAt(j - 1));
        }
    }
    return dp[n][m];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s1 = "sea", s2 = "eat"</code> ('s'=115, 'e'=101, 'a'=97, 't'=116)</p>
<table class="tbl">
<tr><th>s1 \\ s2</th><th>""</th><th>e</th><th>a</th><th>t</th></tr>
<tr><td>""</td><td>0</td><td>101</td><td>198</td><td>314</td></tr>
<tr><td>s</td><td>115</td><td>216</td><td>313</td><td>429</td></tr>
<tr><td>e</td><td>216</td><td>115</td><td>212</td><td>328</td></tr>
<tr><td>a</td><td>313</td><td>212</td><td>115</td><td><b>231</b></td></tr>
</table>
<p class="fs13">Final answer <code>dp[3][3] = 231</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·m). Space: O(n·m), reducible to O(m) with a rolling row.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Swapping a "cost of 1" for "cost of ascii value" is a drop-in generalization — the recurrence shape never changes, only what gets added at a mismatch.</div>`});

/* Problem 177 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q177 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 177 · HARD</span>Scramble String</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">String</span><span class="pill">DP</span><span class="pill">Recursion + Memo</span></div>
<p class="dropcap">A string can be scrambled by recursively splitting it into two non-empty substrings at any point, then optionally swapping the two halves before recursing into each. Given <code>s1</code> and <code>s2</code> of equal length, return true if <code>s2</code> is a scrambled version of <code>s1</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s1 = "abcd", s2 = "cdab"
Output: true
Explanation: split "abcd" into "ab" + "cd", swap the halves to get
"cd" + "ab" = "cdab" — each half already matches itself, no further
recursion needed.</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s1.length &lt;= 30</li><li>s2.length == s1.length</li><li>s1 and s2 consist of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Memoize on the pair (s1, s2). At every split point i, s2 scramble-matches s1 if EITHER the non-swapped halves both recursively match OR the swapped halves do. A character-count mismatch is an instant false — check it first to prune most branches for free.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Base case: equal strings always match. Otherwise compare sorted character arrays — a mismatch there means no split can ever work, so return false immediately. Else try every split index i from 1 to n-1: either (s1[0,i) matches s2[0,i) AND s1[i,n) matches s2[i,n)) — no swap — or (s1[0,i) matches s2[n-i,n) AND s1[i,n) matches s2[0,n-i)) — swapped. Memoize by the string pair so overlapping subcalls are computed once.</p>
<pre class="code" data-lang="java"><code>public boolean isScramble(String s1, String s2) {
    Map&lt;String, Boolean&gt; memo = new HashMap&lt;&gt;();
    return helper(s1, s2, memo);
}

private boolean helper(String s1, String s2, Map&lt;String, Boolean&gt; memo) {
    if (s1.equals(s2)) return true;
    String key = s1 + "#" + s2;
    if (memo.containsKey(key)) return memo.get(key);
    char[] c1 = s1.toCharArray(), c2 = s2.toCharArray();
    Arrays.sort(c1); Arrays.sort(c2);
    if (!Arrays.equals(c1, c2)) { memo.put(key, false); return false; }
    int n = s1.length();
    boolean result = false;
    for (int i = 1; i &lt; n &amp;&amp; !result; i++) {
        boolean noSwap = helper(s1.substring(0, i), s2.substring(0, i), memo)
                       &amp;&amp; helper(s1.substring(i), s2.substring(i), memo);
        boolean swap = helper(s1.substring(0, i), s2.substring(n - i), memo)
                     &amp;&amp; helper(s1.substring(i), s2.substring(0, n - i), memo);
        result = noSwap || swap;
    }
    memo.put(key, result);
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s1 = "abcd", s2 = "cdab"</code></p>
<table class="tbl">
<tr><th>split i</th><th>check</th><th>pieces compared</th><th>result</th></tr>
<tr><td>1</td><td>no-swap</td><td>"a" vs "c"</td><td>charset mismatch → false</td></tr>
<tr><td>1</td><td>swap</td><td>"a" vs "b"</td><td>charset mismatch → false</td></tr>
<tr><td>2</td><td>no-swap</td><td>"ab" vs "cd"</td><td>charset mismatch → false</td></tr>
<tr><td>2</td><td>swap</td><td>"ab"~"ab", "cd"~"cd"</td><td>both equal → <b>true</b>, stop</td></tr>
</table>
<p class="fs13">Split i=2 with a swap succeeds, so <code>isScramble("abcd","cdab") = true</code>.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n⁴) in the worst case (n split points at each of O(n³) distinct substring-pair states). Space: O(n³) for the memo table.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The character-multiset check isn't just an optimization — it's what keeps this from exploding into pure exponential recursion on longer strings.</div>`});

/* Problem 178 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q178 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 178 · HARD</span>Word Break II</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">String</span><span class="pill">DP</span><span class="pill">Backtracking</span></div>
<p class="dropcap">Given a string <code>s</code> and a dictionary of words <code>wordDict</code>, add spaces in <code>s</code> to construct every possible sentence where each word is a valid dictionary word. Return all such sentences, in any order. The same dictionary word may be reused any number of times.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "catsand", wordDict = ["cat","cats","and","sand"]
Output: ["cats and","cat sand"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 20</li><li>1 &lt;= wordDict.length &lt;= 1000</li><li>1 &lt;= wordDict[i].length &lt;= 10</li><li>s and wordDict[i] consist of lowercase English letters; all words in wordDict are unique</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Memoize on the start index. helper(start) returns every way to break s[start..n) into dictionary words; helper(n) is the base case returning one empty sentence. Every matching prefix word combines with each sentence the recursive call on the remainder returns.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>helper(start) tries every end position where s[start,end) is a dictionary word, recurses on helper(end) for the remainder, and prepends the matched word to each returned suffix sentence (joined by a space, unless the suffix is empty). A Map&lt;Integer, List&lt;String&gt;&gt; memo caches results per start index so shared suffixes are only solved once.</p>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; wordBreak(String s, List&lt;String&gt; wordDict) {
    Set&lt;String&gt; dict = new HashSet&lt;&gt;(wordDict);
    Map&lt;Integer, List&lt;String&gt;&gt; memo = new HashMap&lt;&gt;();
    return helper(s, 0, dict, memo);
}

private List&lt;String&gt; helper(String s, int start, Set&lt;String&gt; dict, Map&lt;Integer, List&lt;String&gt;&gt; memo) {
    if (memo.containsKey(start)) return memo.get(start);
    List&lt;String&gt; result = new ArrayList&lt;&gt;();
    if (start == s.length()) { result.add(""); return result; }
    for (int end = start + 1; end &lt;= s.length(); end++) {
        String word = s.substring(start, end);
        if (dict.contains(word)) {
            for (String rest : helper(s, end, dict, memo)) {
                result.add(rest.isEmpty() ? word : word + " " + rest);
            }
        }
    }
    memo.put(start, result);
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "catsand"</code>, dict = {"cat","cats","and","sand"} (indices 0-6, n=7)</p>
<table class="tbl">
<tr><th>start</th><th>matching word(s)</th><th>combine with</th><th>dp[start]</th></tr>
<tr><td>7</td><td>base case</td><td>—</td><td>[""]</td></tr>
<tr><td>6</td><td>"d" — none</td><td>—</td><td>[]</td></tr>
<tr><td>5</td><td>"nd" — none</td><td>—</td><td>[]</td></tr>
<tr><td>4</td><td>"and" ✓</td><td>+ dp[7]</td><td>["and"]</td></tr>
<tr><td>3</td><td>"sand" ✓</td><td>+ dp[7]</td><td>["sand"]</td></tr>
<tr><td>2</td><td>"tsand"... — none</td><td>—</td><td>[]</td></tr>
<tr><td>1</td><td>"atsand"... — none</td><td>—</td><td>[]</td></tr>
<tr><td>0</td><td>"cat" ✓, "cats" ✓</td><td>+ dp[3], + dp[4]</td><td>["cat sand","cats and"]</td></tr>
</table>
<p class="fs13">Final answer <code>dp[0] = ["cat sand", "cats and"]</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n² + 2ⁿ) worst case for pathological dictionaries, but the memo makes typical inputs O(n²) plus output size. Space: O(n × number of sentences).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Word Break I asks "can I stop cleanly" (boolean dp); Word Break II asks "show me every way" (dp of lists) — same split points, but the memo now stores constructed answers instead of a yes/no.</div>`});

/* Problem 179 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q179 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 179 · HARD</span>Palindrome Partitioning II</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">String</span><span class="pill">DP</span><span class="pill">Interval DP</span></div>
<p class="dropcap">Given a string <code>s</code>, partition it so every substring of the partition is a palindrome. Return the minimum number of cuts needed to achieve such a partition.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "aab"
Output: 1
Explanation: one cut gives ["aa","b"], and both pieces are palindromes</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 2000</li><li>s consists of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Precompute isPal[i][j] for every substring with interval DP. Then cuts[i] = fewest cuts for the prefix s[0..i]: 0 if that whole prefix is already a palindrome, otherwise the best of cuts[j-1] + 1 over every split point j where s[j..i] is a palindrome.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Two-phase DP. Phase 1: fill isPal[i][j] — true when s[i] == s[j] and either the gap is length &lt;= 1 or isPal[i+1][j-1] is true. Phase 2: fill cuts[i] left to right; if isPal[0][i] is true, cuts[i] = 0 (no cut needed at all); otherwise scan split points j from 1 to i and take the minimum cuts[j-1] + 1 among positions where s[j..i] is a palindrome.</p>
<pre class="code" data-lang="java"><code>public int minCut(String s) {
    int n = s.length();
    boolean[][] isPal = new boolean[n][n];
    for (int i = 0; i &lt; n; i++) isPal[i][i] = true;
    for (int len = 2; len &lt;= n; len++) {
        for (int i = 0; i + len - 1 &lt; n; i++) {
            int j = i + len - 1;
            if (s.charAt(i) == s.charAt(j) &amp;&amp; (len == 2 || isPal[i + 1][j - 1])) isPal[i][j] = true;
        }
    }
    int[] cuts = new int[n];
    for (int i = 0; i &lt; n; i++) {
        if (isPal[0][i]) { cuts[i] = 0; continue; }
        cuts[i] = Integer.MAX_VALUE;
        for (int j = 1; j &lt;= i; j++) {
            if (isPal[j][i]) cuts[i] = Math.min(cuts[i], cuts[j - 1] + 1);
        }
    }
    return cuts[n - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "aab"</code></p>
<table class="tbl">
<tr><th>i</th><th>j</th><th>check</th><th>isPal</th><th>cuts[i]</th></tr>
<tr><td>0</td><td>0</td><td>isPal[0][0]="a" (fast path)</td><td>true</td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>isPal[0][1]="aa" (fast path)</td><td>true</td><td>0</td></tr>
<tr><td>2</td><td>1</td><td>isPal[1][2]="ab"</td><td>false — skip</td><td>—</td></tr>
<tr><td>2</td><td>2</td><td>isPal[2][2]="b" → cuts[1]+1=0+1</td><td>true</td><td><b>1</b></td></tr>
</table>
<p class="fs13">Final answer <code>cuts[2] = 1</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) for both phases. Space: O(n²) for isPal, O(n) for cuts.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Precomputing an O(n²) palindrome table before the 1D cuts pass is what keeps this from degrading into checking palindromicity from scratch on every split — an O(n³) trap easy to fall into.</div>`});

/* Problem 180 */
B.spread(
{ kicker: 'DSA · DP: STRINGS', head: 'Q180 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 180 · MEDIUM</span>Palindromic Substrings</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">DP</span><span class="pill">Interval DP</span></div>
<p class="dropcap">Given a string <code>s</code>, return the number of palindromic substrings in it. A substring is a contiguous run of characters, and occurrences at different positions count separately even when the text is identical.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "aaa"
Output: 6
Explanation: "a","a","a","aa","aa","aaa" — 6 palindromic substrings</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 1000</li><li>s consists of lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>dp[i][j] = true if s[i..j] is a palindrome: the outer characters must match, and the inside (dp[i+1][j-1]) must also be a palindrome (or there is no meaningful inside, for length &lt;= 2). Count every dp[i][j] that comes out true.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Iterate i from n-1 down to 0 and j from i up to n-1, so the inner cell dp[i+1][j-1] is always already computed by the time it's needed. dp[i][j] is true when s[i] == s[j] and either j - i &lt; 2 (length 1 or 2, no inside to check) or dp[i+1][j-1] is true. Every true cell increments the running count.</p>
<pre class="code" data-lang="java"><code>public int countSubstrings(String s) {
    int n = s.length();
    boolean[][] dp = new boolean[n][n];
    int count = 0;
    for (int i = n - 1; i &gt;= 0; i--) {
        for (int j = i; j &lt; n; j++) {
            if (s.charAt(i) == s.charAt(j) &amp;&amp; (j - i &lt; 2 || dp[i + 1][j - 1])) {
                dp[i][j] = true;
                count++;
            }
        }
    }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "aaa"</code> (indices 0,1,2)</p>
<table class="tbl">
<tr><th>i</th><th>j</th><th>s[i..j]</th><th>check</th><th>count</th></tr>
<tr><td>2</td><td>2</td><td>"a"</td><td>length 1 → palindrome</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>"a"</td><td>length 1 → palindrome</td><td>2</td></tr>
<tr><td>1</td><td>2</td><td>"aa"</td><td>length 2, ends match → palindrome</td><td>3</td></tr>
<tr><td>0</td><td>0</td><td>"a"</td><td>length 1 → palindrome</td><td>4</td></tr>
<tr><td>0</td><td>1</td><td>"aa"</td><td>length 2, ends match → palindrome</td><td>5</td></tr>
<tr><td>0</td><td>2</td><td>"aaa"</td><td>ends match &amp; dp[1][1]=true → palindrome</td><td><b>6</b></td></tr>
</table>
<p class="fs13">Final answer: <b>6</b> palindromic substrings</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(n²), reducible to O(n) or O(1) with the expand-around-center technique instead of a table.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is the exact same isPal table used to solve Palindrome Partitioning II — once you've built it for one string problem, recognize it as reusable machinery, not a one-off.</div>`});

})();
