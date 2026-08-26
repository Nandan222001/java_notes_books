/* ===== CHAPTER 62 · DSA: String Matching ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 62, 'DSA: String Matching');

/* Problem 301 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q301 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 301 · EASY</span>First Occurrence in a String</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Two Pointers</span><span class="pill">KMP intro</span></div>
<p class="dropcap">Return the index of the FIRST occurrence of <code>needle</code> inside <code>haystack</code>, or <code>-1</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>haystack = "sadbutsad", needle = "sad"   → 0
haystack = "leetcode",    needle = "leeto" → -1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ lengths ≤ 10⁴ · lowercase English</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Slide the needle across every legal offset; verify character by character.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int strStr(String hay, String needle) {
    int n = hay.length(), m = needle.length();
    for (int i = 0; i + m &lt;= n; i++) {
        int j = 0;
        while (j &lt; m &amp;&amp; hay.charAt(i + j) == needle.charAt(j)) j++;
        if (j == m) return i;
    }
    return -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"hello" / "ll"</code></p>
<table class="tbl">
<tr><th>i</th><th>window</th><th>match?</th></tr>
<tr><td>0</td><td>he…</td><td>h ≠ l ✗</td></tr>
<tr><td>1</td><td>el…</td><td>e ≠ l ✗</td></tr>
<tr><td>2</td><td>ll</td><td>j reaches m → return 2 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·m) worst, fast in practice. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Sliding a WORD-SHAPED stencil along a fence: line it up at each plank position and check letters one by one — first perfect fit announces its position. At this input scale the honest stencil wins; the fancy machinery comes next chapter-page.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Clean brute force is a legitimate interview answer at 10⁴ scale — but be ready to name its cure: KMP precomputes the needle's SELF-OVERLAP so mismatches never re-read haystack characters (see Q305).</div>`});

/* Problem 302 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q302 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 302 · EASY</span>Repeated Substring Pattern</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">String</span><span class="pill">Periodicity</span></div>
<p class="dropcap">Return <code>true</code> if <code>s</code> is built by repeating a substring at least twice (<code>"abab"</code> = "ab" × 2).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"abab"        → true   ("ab" × 2)
"aba"         → false
"abcabcabcabc" → true  ("abc" × 4)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Famous one-liner: search for s inside <code>s + s</code>, skipping position 0 — a hit BEFORE the halfway seam exposes the period.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean repeatedSubstringPattern(String s) {
    return (s + s).indexOf(s, 1) &lt; s.length();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>s</th><th>s + s</th><th>first re-find ≥ 1</th><th>&lt; len?</th></tr>
<tr><td>"abab"</td><td>"abababab"</td><td>index 2</td><td>2 &lt; 4 → true ✓</td></tr>
<tr><td>"aba"</td><td>"abaaba"</td><td>index 3 (= len)</td><td>false ✓</td></tr>
<tr><td>"aaa"</td><td>"aaaaaa"</td><td>index 1</td><td>true ✓ ("a" × 3)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) worst with naive indexOf, typically linear. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Wrapping-paper test: print the bracelet pattern TWICE on one strip. If the original design shows up again EARLY (before the strip's own length runs out), the paper is made of repeats — like folding wallpaper whose print self-aligns partway down. A non-repeating design only reappears exactly one full length later.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Concatenation converts "is periodic?" into "does it occur early inside its double?" — one search replaces divisor enumeration.</div>`});

/* Problem 303 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q303 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 303 · MEDIUM</span>Repeated String Match</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Simulation</span><span class="pill">Bounding</span></div>
<p class="dropcap">Repeat string <code>a</code> the minimum number of times so that <code>b</code> becomes a substring of the repetition. Impossible ⇒ <code>-1</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>a = "abcd", b = "cdabcdab" → 3
a = "a",    b = "aa"       → 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ a.length ≤ 10⁴ · 1 ≤ b.length ≤ 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Tile until the shelf is at least as long as b; if not found, ONE extra tile is the last hope — beyond that it's provably impossible.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int repeatedStringMatch(String a, String b) {
    StringBuilder sb = new StringBuilder();
    int count = 0;
    while (sb.length() &lt; b.length()) { sb.append(a); count++; }
    if (sb.indexOf(b) &gt;= 0) return count;
    sb.append(a); count++;
    return sb.indexOf(b) &gt;= 0 ? count : -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>a="abcd", b="cdabcdab"</code></p>
<table class="tbl">
<tr><th>tiles</th><th>shelf</th><th>contains b?</th></tr>
<tr><td>×2 (len 8 ≥ 8)</td><td>"abcdabcd"</td><td>no</td></tr>
<tr><td>×3 (last chance)</td><td>"abcdabcdabcd"</td><td>at index 2 ✓ → return 3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(len_b + k·len_a), k ≤ ceil + 1. Space: O(shelf).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Tiling a shelf with one repeating patterned board. Keep adding boards until the shelf is LONGER than your target design — a match can't need more than that plus one spare board, because any match must START within the first board's width. Needing yet another board proves the design simply isn't printed on this pattern.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Bounding before searching turns "infinite repetition?" into two fixed indexOf calls — recognise when a math cap makes simulation safe.</div>`});

/* Problem 304 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q304 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 304 · HARD</span>Shortest Palindrome</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">KMP Failure Function</span></div>
<p class="dropcap">You may add characters ONLY BEFORE <code>s</code>. Return the shortest palindrome obtainable.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"aacecaaa" → "aaacecaaa"
"abcd"     → "dcbabcd"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 ≤ s.length ≤ 5×10⁴ — O(n²) prepending fails; need linear.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Build t = s + '#' + reverse(s). The last cell of t's KMP failure table = longest prefix of s that is palindromic. Mirror only the leftover tail onto the front.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public String shortestPalindrome(String s) {
    int n = s.length();
    if (n == 0) return s;
    String rev = new StringBuilder(s).reverse().toString();
    int[] lps = buildLps(s + "#" + rev);
    int p = lps[lps.length - 1];          // longest palindromic head
    return new StringBuilder(s.substring(p))
           .reverse().append(s).toString();
}
private int[] buildLps(String t) {
    int n = t.length(), len = 0;
    int[] lps = new int[n];
    for (int i = 1; i &lt; n; ) {
        if (t.charAt(i) == t.charAt(len)) lps[i++] = ++len;
        else if (len &gt; 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    return lps;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "abcd"</code> → t = <code>"abcd#dcba"</code></p>
<table class="tbl">
<tr><th>t index</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
<tr><th>char</th><td>a</td><td>b</td><td>c</td><td>d</td><td>#</td><td>d</td><td>c</td><td>b</td><td>a</td></tr>
<tr><th>lps</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>1</b></td></tr>
</table>
<p class="fs13">p = 1 → keep head "a", mirror tail "bcd" → "dcb"+"abcd" ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A broken necklace may only gain beads on its LEFT end, and must read the same both ways afterwards. So ask: how long is the head that ALREADY reads as a palindrome? Glue a reversed copy of whatever dangles past that head onto the front — nothing duplicated, nothing wasted. The '#'-separator stops fake overlaps from sneaking across the seam between string and mirror.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The KMP failure table answers "longest self-overlap ending here" — pointed at s+#+rev(s), its final cell IS the longest palindromic prefix. One preprocessing tool, two hard problems (next page too).</div>`});

/* Problem 305 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q305 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 305 · HARD</span>Longest Happy Prefix</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">KMP LPS</span></div>
<p class="dropcap">A <strong>happy prefix</strong> is a non-empty prefix of <code>s</code> that is ALSO a suffix, without being the whole string. Return the longest one — or <code>""</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"level"  → "l"
"ababab" → "abab"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 10⁵ · lowercase English</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This IS the KMP failure table exposed as a problem: lps[n−1] is exactly the answer.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public String longestPrefix(String s) {
    int n = s.length(), len = 0;
    int[] lps = new int[n];
    for (int i = 1; i &lt; n; ) {
        if (s.charAt(i) == s.charAt(len)) lps[i++] = ++len;
        else if (len &gt; 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    return s.substring(0, lps[n - 1]);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"ababab"</code></p>
<table class="tbl">
<tr><th>i</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
<tr><th>char</th><td>a</td><td>b</td><td>a</td><td>b</td><td>a</td><td>b</td></tr>
<tr><th>lps</th><td>0</td><td>0</td><td>1</td><td>2</td><td>3</td><td><b>4</b></td></tr>
</table>
<p class="fs13">answer = first 4 chars = "abab" ✓ ("aba" fails head/tail check at i=5)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — len only ever falls via precomputed links. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Candy-wrapper slogan hunt: find the LONGEST slogan printed both at the START and at the END of the wrapper without covering it entirely — like "ababab", whose head "abab" reappears as its tail. The failure table remembers, for every cut position, the longest self-overlap achieved so far; the final entry is your trophy.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The mysterious <code>len = lps[len − 1]</code> fallback is the heart of KMP: when extension fails, hop to the NEXT-longest self-overlap instead of restarting — amortised linear because len can rise at most once per step.</div>`});

/* Problem 306 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q306 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 306 · MEDIUM</span>Repeated DNA Sequences</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Rolling Window</span><span class="pill">Hash Set</span></div>
<p class="dropcap">DNA letters A/C/G/T form a string. Return every 10-letter substring that occurs MORE THAN ONCE (each listed once, any order).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
→ ["AAAAACCCCC","CCCCCAAAAA"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 10⁵ · consists only of A, C, G, T</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A fixed 10-wide sliding window plus a set of seen windows; <code>add()</code>'s boolean tells you it's a repeat. Memory hogs can encode each window as a 20-bit number.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; findRepeatedDnaSequences(String s) {
    Set&lt;String&gt; seen = new HashSet&lt;&gt;(), dup = new HashSet&lt;&gt;();
    for (int i = 0; i + 10 &lt;= s.length(); i++) {
        String w = s.substring(i, i + 10);
        if (!seen.add(w)) dup.add(w);
    }
    return new ArrayList&lt;&gt;(dup);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Windows of the example (first hits):</p>
<table class="tbl">
<tr><th>window</th><th>seen.add returns</th><th>action</th></tr>
<tr><td>AAAAACCCCC (i=0)</td><td>true</td><td>stored</td></tr>
<tr><td>…CCCCCAAAAA (i=5)</td><td>true</td><td>stored</td></tr>
<tr><td>AAAAACCCCC (i=10)</td><td>false!</td><td>duplicates list ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·10) with substrings, O(n) with bit-encoding. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>An airport scanner reads every 10-letter luggage tag through a fixed window. Its photo album is a guest-list SET: when a tag arrives that's ALREADY in the album, the scanner shouts "repeat!". Memory-savvy engineers shrink each tag to a single number by encoding A=00, C=01, G=10, T=11 — a fingerprint instead of a photograph, and the oldest letter slides out with two bit-shifts.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Fixed-width windows + a seen-set solves "repeated patterns"; the 2-bit encoding is the classic Rabin-Karp rolling hash made concrete — subtract the outgoing letter's contribution, shift, add the incoming one.</div>`});

/* Problem 307 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q307 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 307 · HARD</span>Longest Chunked Palindrome Decomposition</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Greedy</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Split <code>s</code> into consecutive chunks <code>v1, v2, …, vk</code> where each <code>v_i</code> equals its mirror chunk <code>v_{k−i+1}</code>. Maximise <code>k</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"ghiabcdefhelloadamhelloabcdefghi" → 7
"antaprezatepzapreanta"            → 11
"merchant"                          → 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 4000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Greedily clip the SHORTEST matching (prefix, suffix) pair off both ends — worth +2 chunks; a stubborn centre is worth +1. Shortest-first is provably optimal.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int longestDecomposition(String text) {
    int ans = 0, l = 0, r = text.length();
    while (l &lt; r) {
        int w = 1;
        while (w &lt;= r - l - w &amp;&amp;
               !text.substring(l, l + w)
                    .equals(text.substring(r - w, r))) w++;
        if (w &gt; r - l - w) { ans++; break; }   // centre chunk
        ans += 2; l += w; r -= w;
    }
    return ans;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"aba"</code></p>
<table class="tbl">
<tr><th>round</th><th>left window</th><th>right window</th><th>match?</th><th>score</th></tr>
<tr><td>1</td><td>"a"</td><td>"a"</td><td>✓</td><td>+2, shrink to "b"</td></tr>
<tr><td>2</td><td colspan="2">single centre "b"</td><td>—</td><td>+1 → total 3 ✓</td></tr>
</table>
<p class="fs13">The long example pairs: ghi|abcdef|hello|adam|hello|abcdef|ghi = 7 ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) worst (string compares), fast typically. Space: O(w) per compare.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Folding a beaded bracelet into mirrored wings: snip the SHORTEST bead-run whose left end matches its right end — that's one matched wing-pair, two points. Whatever unpaired beads sit lonely in the middle count once. Snipping shortest-first never hurts: any valid longer pairing can be split INTO the shorter ones without losing points.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The exchange argument ("shortest pair ⊆ any alternative pair") converts an exponential partition search into a linear two-pointer stroll.</div>`});

/* Problem 308 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q308 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 308 · MEDIUM</span>Distinct Echo Substrings</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Window Compare</span><span class="pill">Set Dedupe</span></div>
<p class="dropcap">Count DISTINCT substrings <code>t</code> of <code>s</code> that are an <strong>echo</strong>: some half <code>a</code> repeated twice, <code>t = a + a</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"abcabcabc"        → 3   (abcabc, bcabca, cabcabc)
"leetcodeleetcode" → 2   ("ee", "leetcodeleetcode")</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 2000 · lowercase</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>For every half-length and start, compare the two halves WITHOUT copying (<code>regionMatches</code>); collect full echoes in a set.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int distinctEchoSubstrings(String s) {
    Set&lt;String&gt; seen = new HashSet&lt;&gt;();
    int n = s.length();
    for (int len = 1; len * 2 &lt;= n; len++)
        for (int i = 0; i + 2 * len &lt;= n; i++)
            if (s.regionMatches(i, s, i + len, len))
                seen.add(s.substring(i, i + 2 * len));
    return seen.size();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"abcabcabc"</code></p>
<table class="tbl">
<tr><th>len</th><th>i</th><th>half1 / half2</th><th>echo?</th></tr>
<tr><td>1</td><td>any</td><td>no letter repeats adjacently</td><td>none found</td></tr>
<tr><td>3</td><td>0</td><td>abc / abc</td><td>✓ add "abcabc"</td></tr>
<tr><td>3</td><td>1..3</td><td>…</td><td>+ "bcabca", + "cabcabc" → total 3 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) window pairs with O(len) compares — fast equals keeps it inside limits. Space: O(n²) set worst case.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Echo-spotting in a canyon: slide a window of EVEN width and ask whether its second half perfectly mimics the first. <code>regionMatches</code> is a zero-photocopy comparator — it checks letters in place instead of building throwaway copies. A guest-list set makes sure each unique echo shakes hands once.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Doubling structure means every echo is found by pairing equal halves — enumerate HALF-lengths rather than full lengths to halve the search space.</div>`});

/* Problem 309 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q309 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 309 · EASY</span>String Matching in an Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Nested Contains</span></div>
<p class="dropcap">Given a list of words, return every word that is a SUBSTRING of some OTHER word in the list.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>["mass","as","hero","superhero"]
→ ["as","hero"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ words.length ≤ 100 · 1 ≤ words[i].length ≤ 30 · all distinct</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every short word checks itself against each LONGER word with <code>contains</code>; first hit retires it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; stringMatching(String[] words) {
    List&lt;String&gt; out = new ArrayList&lt;&gt;();
    for (String w : words)
        for (String o : words)
            if (w.length() &lt; o.length() &amp;&amp; o.contains(w)) {
                out.add(w);
                break;                 // listed once
            }
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>w</th><th>longer hosts found</th><th>added?</th></tr>
<tr><td>"mass"</td><td>none</td><td>—</td></tr>
<tr><td>"as"</td><td>"mass", "superhero"</td><td>✓ (break early)</td></tr>
<tr><td>"hero"</td><td>"superhero"</td><td>✓</td></tr>
<tr><td>"superhero"</td><td>none longer</td><td>— → ["as","hero"] ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n² · L). Space: O(1) beyond output.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Nesting-dolls inspection: each word tries to hide inside every BIGGER word. The moment one fits somewhere — even tucked inside "superhero" — it joins the nested list and stops trying. Tiny inputs make politeness cheap.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Match the tool to the constraint budget: at n ≤ 100 and length ≤ 30, the quadratic scan beats any suffix-automaton ceremony. Over-engineering is also a code smell.</div>`});

/* Problem 310 */
B.spread(
{ kicker: 'DSA · STRING MATCHING', head: 'Q310 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 310 · HARD</span>Sum of Scores of Built Strings</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Z-Algorithm</span><span class="pill">Contribution Math</span></div>
<p class="dropcap">Build <code>t</code> by appending characters of <code>s</code> one at a time. Each build's SCORE = total length of every prefix of the current <code>t</code> that is also a SUFFIX of it. Sum scores over all n builds.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>s = "aa"   → 4    ("a":1 + "aa": 1+2)
s = "aba"  → 7    (builds score 1 · 2 · 4)
s = "aaaa" → 20   (1 · 3 · 6 · 10)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ s.length ≤ 10⁵ — O(n²) rescanning TLEs; need O(n).</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Z-array stores each suffix's full match length ONCE. Each position p then contributes a triangle-number ramp while its match grows with k, then a flat z[p] per later build.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public long sumScores(String s) {
    int n = s.length();
    int[] z = zArray(s);
    long ans = (long) n * (n + 1) / 2;      // whole-string term each round
    for (int p = 1; p &lt; n; p++) {
        int zp = z[p], D = n - p + 1;
        int top = Math.min(D, zp);
        ans += (long) top * (top + 1) / 2 - 1
             + (long) zp * Math.max(0, D - zp);
    }
    return ans;
}
private int[] zArray(String s) {
    int n = s.length();
    int[] z = new int[n];
    z[0] = n;
    for (int i = 1, l = 0, r = 0; i &lt; n; i++) {
        if (i &lt; r) z[i] = Math.min(r - i, z[i - l]);
        while (i + z[i] &lt; n
               &amp;&amp; s.charAt(z[i]) == s.charAt(i + z[i])) z[i]++;
        if (i + z[i] &gt; r) { l = i; r = i + z[i]; }
    }
    return z;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"aaaa"</code>, z = [4, 3, 2, 1]</p>
<table class="tbl">
<tr><th>position p</th><td>base (p=0)</td><td>p = 1</td><td>p = 2</td><td>p = 3</td></tr>
<tr><th>z[p]</th><td>whole string</td><td>3</td><td>2</td><td>1</td></tr>
<tr><th>lifetime add</th><td>T(4) = 10</td><td>T(3) = 6</td><td>T(2) = 3</td><td>T(1) = 1</td></tr>
</table>
<p class="fs13">total = 10 + 6 + 3 + 1 = <b>20</b> ✓ (the four build scores were 1, 3, 6, 10)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A chant grows one letter per round; each round's score counts EVERY head-to-tail rhyme of the current chant, including the whole chant itself. Instead of re-hunting rhymes every round, the Z-array measures each starting position's match length ONCE. Arithmetic then totals that position's lifetime contribution: a triangle-number bonus while its rhyme is still growing, then a flat rate for every remaining round — like switching from hourly pay to salary.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Flip "recompute per round" into "lifetime contribution per position" — Z-array + closed-form sums turns an O(n²) scoreboard into pure arithmetic. Chapter capstone: LPS, rolling hash and Z all descend from one idea — self-overlap precomputation.</div>`});
})();