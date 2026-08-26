/* ===== CHAPTER 56 · DSA: String Algorithms — Classic ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 56, 'DSA: Strings — Classic Toolkit');

/* Problem 241 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q241 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 241 · EASY</span>Longest Common Prefix</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">String</span><span class="pill">Vertical Scan</span></div>
<p class="dropcap">Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string <code>""</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: strs = ["flower","flow","flight"]
Output: "fl"
Input: strs = ["dog","racecar","car"]
Output: ""  (no common prefix)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= strs.length &lt;= 200</li><li>0 &lt;= strs[i].length &lt;= 200</li><li>all lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The answer can never be longer than the shortest string — compare character columns across words and stop at the first mismatch.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Take the first word as the candidate prefix. For every other word, shrink the candidate from the right until that word starts with it. First empty candidate means no common prefix.</p>
<pre class="code" data-lang="java"><code>public String longestCommonPrefix(String[] strs) {
    String prefix = strs[0];
    for (int i = 1; i &lt; strs.length; i++) {
        while (!strs[i].startsWith(prefix))
            prefix = prefix.substring(0, prefix.length() - 1);
        if (prefix.isEmpty()) return "";
    }
    return prefix;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>["flower","flow","flight"]</code></p>
<table class="tbl">
<tr><th>word</th><th>candidate prefix</th><th>startsWith?</th><th>action</th></tr>
<tr><td>flow</td><td>"flower"</td><td>no</td><td>shrink → "flowe" no → "flow" yes</td></tr>
<tr><td>flight</td><td>"flow"</td><td>no</td><td>shrink → "flo" no → "fl" yes</td></tr>
<tr><td>— done</td><td>"fl"</td><td>—</td><td>return "fl"</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(S) where S = total characters (worst case). Space: O(1) extra beyond the prefix.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Imagine a row of people holding name tags. Read the tags letter-by-letter from the left and keep only the letters EVERYONE shares — the moment one tag differs, every later letter is disqualified. It's like asking three friends how their day stories begin: "After bre…" — whatever all three have in common is your answer.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A prefix that fails for ANY word fails for all — so shrinking one letter at a time is always safe, and each chop brings you closer to the shortest word's length.</div>`});

/* Problem 242 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q242 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 242 · EASY</span>Length of Last Word</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">String</span><span class="pill">Scan</span></div>
<p class="dropcap">Given a string <code>s</code> consisting of words and spaces, return the length of the <strong>last</strong> word in the string. A word is a maximal substring of non-space characters.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "Hello World"
Output: 5  ("World")
Input: s = "   fly me   to   the moon  "
Output: 4  ("moon")</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 10⁴</li><li>s contains English letters and spaces; at least one word exists</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Scan from the RIGHT: hop over trailing spaces first, then count letters until you hit a space or the start.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Start a pointer at the last character. Phase 1: skip spaces. Phase 2: count non-space characters moving left until a space or index −1.</p>
<pre class="code" data-lang="java"><code>public int lengthOfLastWord(String s) {
    int i = s.length() - 1;
    while (i &gt;= 0 &amp;&amp; s.charAt(i) == ' ') i--;
    int len = 0;
    while (i &gt;= 0 &amp;&amp; s.charAt(i) != ' ') { len++; i--; }
    return len;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"Hello World "</code></p>
<table class="tbl">
<tr><th>i</th><th>char</th><th>phase</th><th>action</th></tr>
<tr><td>11</td><td>' '</td><td>skip</td><td>i--</td></tr>
<tr><td>10</td><td>'d'</td><td>count</td><td>len=1</td></tr>
<tr><td>9→7</td><td>l,r,o,W</td><td>count</td><td>len=5</td></tr>
<tr><td>6</td><td>' '</td><td>stop</td><td>return 5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) worst case, usually far less. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Think of the sentence as a train. To measure the LAST carriage, walk backwards from the rear past any empty couplings (the stray spaces), then count windows until you reach the gap before the previous carriage. No need to inspect the whole train!</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Backwards scanning means trailing junk costs nothing — you touch only the spaces after the last word plus that word itself.</div>`});

/* Problem 243 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q243 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 243 · EASY</span>Add Binary</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">String</span><span class="pill">Math</span></div>
<p class="dropcap">Given two binary strings <code>a</code> and <code>b</code>, return their sum as a binary string — without converting the whole strings to integers.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: a = "11", b = "1"
Output: "100"
Input: a = "1010", b = "1011"
Output: "10101"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= a.length, b.length &lt;= 10⁴</li><li>consists only of '0'/'1'; no leading zeros except "0" itself</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Add right-to-left like school addition; each column's total is digitA + digitB + carry. Write <code>total % 2</code>, carry <code>total / 2</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Two pointers walk both strings from the last character. Each round gather bitA + bitB + carry (missing bits count as 0), append <code>sum &amp; 1</code> to the result and set <code>carry = sum &gt;&gt; 1</code>. Reverse at the end.</p>
<pre class="code" data-lang="java"><code>public String addBinary(String a, String b) {
    StringBuilder sb = new StringBuilder();
    int i = a.length() - 1, j = b.length() - 1, carry = 0;
    while (i &gt;= 0 || j &gt;= 0 || carry &gt; 0) {
        int sum = carry;
        if (i &gt;= 0) sum += a.charAt(i--) - '0';
        if (j &gt;= 0) sum += b.charAt(j--) - '0';
        sb.append(sum % 2);
        carry = sum / 2;
    }
    return sb.reverse().toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>a="11", b="1"</code></p>
<table class="tbl">
<tr><th>i,j</th><th>bits</th><th>+carry</th><th>write</th><th>carry out</th></tr>
<tr><td>1,0</td><td>1+1</td><td>0 → 2</td><td>0</td><td>1</td></tr>
<tr><td>0,—</td><td>1</td><td>1 → 2</td><td>0</td><td>1</td></tr>
<tr><td>—,—</td><td>—</td><td>1</td><td>1</td><td>0 stop</td></tr>
</table>
<p class="fs13">Collected "001" → reversed → <code>"100"</code> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(max(m,n)). Space: O(max(m,n)) for the result.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Picture rows of piggy banks, one column per position, counted from the RIGHT. Two coins in any bank get exchanged: one coin stays, one travels to the bank on its left — that travelling coin is the famous "carry the one" from school math, just wearing binary clothes.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>In base-2 the exchange rule is brutally simple: any column totalling 2 or 3 keeps its odd part (<code>%2</code>) and ships exactly one coin left (<code>/2</code>) — never more.</div>`});

/* Problem 244 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q244 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 244 · EASY</span>Add Strings</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">String</span><span class="pill">Simulation</span></div>
<p class="dropcap">Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return the sum of them as a string. You may not use any built-in big-integer library.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: num1 = "456", num2 = "77"
Output: "533"
Input: num1 = "0",  num2 = "0"
Output: "0"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= num1.length, num2.length &lt;= 10⁴</li><li>digits only; no leading zeros except "0" itself</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The Add Binary carry machine works here too — just base 10: write <code>sum % 10</code>, carry <code>sum / 10</code>. Convert chars with <code>c - '0'</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Schoolbook column addition on characters. Pointers start at each number's last digit; loop while either has digits or a carry remains; append <code>total % 10</code>, keep <code>total / 10</code>; reverse the collected digits.</p>
<pre class="code" data-lang="java"><code>public String addStrings(String num1, String num2) {
    StringBuilder sb = new StringBuilder();
    int i = num1.length() - 1, j = num2.length() - 1, carry = 0;
    while (i &gt;= 0 || j &gt;= 0 || carry &gt; 0) {
        int sum = carry;
        if (i &gt;= 0) sum += num1.charAt(i--) - '0';
        if (j &gt;= 0) sum += num2.charAt(j--) - '0';
        sb.append(sum % 10);
        carry = sum / 10;
    }
    return sb.reverse().toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"456" + "77"</code></p>
<table class="tbl">
<tr><th>i,j</th><th>digits</th><th>+carry</th><th>write</th><th>carry out</th></tr>
<tr><td>2,1</td><td>6+7</td><td>0 → 13</td><td>3</td><td>1</td></tr>
<tr><td>1,0</td><td>5+7</td><td>1 → 13</td><td>3</td><td>1</td></tr>
<tr><td>0,—</td><td>4</td><td>1 → 5</td><td>5</td><td>0 stop</td></tr>
</table>
<p class="fs13">Collected "335" → reversed → <code>"533"</code> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(max(m,n)). Space: O(max(m,n)) for the output.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>The numbers are so long no calculator screen can hold them — so you do EXACTLY what you did in school homework: line them up right-edge first, add one column at a time, and when a column overflows past nine, the extra "ten" walks over to help the next column.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Working digit-by-digit means the numbers never exist as integers at all — overflow becomes impossible by construction, no matter how many thousands of digits arrive.</div>`});

/* Problem 245 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q245 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 245 · MEDIUM</span>Count and Say</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Run-Length</span></div>
<p class="dropcap">The count-and-say sequence starts with <code>"1"</code>. Every later term "reads aloud" the previous one: <code>countAndSay(1) = "1"</code>, and each next term describes the digit runs of the last — e.g. <code>"1211"</code> is read as "one 1, one 2, two 1s" → <code>"111221"</code>. Given <code>n</code>, return the n-th term.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 4
Output: "1211"
(1 → "one 1" = 11 → "two 1s" = 21 → "one 2, one 1" = 1211)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 30</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Build iteratively. To describe a term, scan it grouping CONSECUTIVE equal digits — classic run-length encoding with two pointers.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep the current string; for every round from 2 to n, scan it left to right counting runs of identical digits, appending <code>&lt;count&gt;&lt;digit&gt;</code> pairs to a builder that becomes the next round's input.</p>
<pre class="code" data-lang="java"><code>public String countAndSay(int n) {
    String s = "1";
    for (int k = 2; k &lt;= n; k++) {
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i &lt; s.length()) {
            int j = i;
            while (j &lt; s.length() &amp;&amp; s.charAt(j) == s.charAt(i)) j++;
            sb.append(j - i).append(s.charAt(i));
            i = j;
        }
        s = sb.toString();
    }
    return s;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 4</code></p>
<table class="tbl">
<tr><th>round</th><th>input</th><th>runs seen</th><th>said aloud</th></tr>
<tr><td>1</td><td>1</td><td>—</td><td>"1"</td></tr>
<tr><td>2</td><td>1</td><td>1×'1'</td><td>"11"</td></tr>
<tr><td>3</td><td>11</td><td>2×'1'</td><td>"21"</td></tr>
<tr><td>4</td><td>21</td><td>1×'2', 1×'1'</td><td>"1211" ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(N·L) where L is the length of term n (grows ~linearly per round). Space: O(L).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>It's the telephone game where you must DESCRIBE what you hear before whispering on: "three threes and one five." Your description becomes the next secret message someone else has to describe. You never do math — you only read the previous message out loud, counting repeats like a commentator.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The whole transformation is Run-Length Encoding — group consecutive equals FIRST, then say count-then-digit; mixing the order is the classic bug.</div>`});

/* Problem 246 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q246 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 246 · MEDIUM</span>Compare Version Numbers</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given two version strings like <code>"1.01"</code> and <code>"1.001"</code>, compare them revision by revision. Leading zeros are ignored and a missing revision counts as <code>0</code>. Return <code>-1</code> if version1 is smaller, <code>1</code> if larger, else <code>0</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: v1 = "1.01",   v2 = "1.001"  → 0   (revisions equal)
Input: v1 = "1.0",    v2 = "1.0.0"  → 0   (missing = 0)
Input: v1 = "0.1",    v2 = "1.1"    → -1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= version1.length, version2.length &lt;= 500</li><li>digits and dots only; at least one character per revision</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Parse one numeric chunk between dots from EACH string at a time; strip leading zeros (or accumulate digits as a number), compare, and treat exhausted strings as chunk "0".</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Two pointers walk both strings, each round reading up to the next <code>'.'</code> and accumulating an integer on the fly (<code>val = val*10 + digit</code>) — leading zeros vanish automatically. Compare this round's two values; only if equal continue to the next pair.</p>
<pre class="code" data-lang="java"><code>public int compareVersion(String v1, String v2) {
    int i = 0, j = 0;
    while (i &lt; v1.length() || j &lt; v2.length()) {
        long val1 = 0, val2 = 0;
        while (i &lt; v1.length() &amp;&amp; v1.charAt(i) != '.') val1 = val1 * 10 + (v1.charAt(i++) - '0');
        while (j &lt; v2.length() &amp;&amp; v2.charAt(j) != '.') val2 = val2 * 10 + (v2.charAt(j++) - '0');
        if (val1 != val2) return val1 &lt; val2 ? -1 : 1;
        i++; j++;                      // skip the dots
    }
    return 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>v1="1.01", v2="1.001"</code></p>
<table class="tbl">
<tr><th>round</th><th>val1</th><th>val2</th><th>verdict</th></tr>
<tr><td>1</td><td>1</td><td>1</td><td>equal → next</td></tr>
<tr><td>2</td><td>01→1</td><td>001→1</td><td>equal → next</td></tr>
<tr><td>end</td><td>—</td><td>—</td><td>return 0 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m + n). Space: O(1) — no split arrays needed.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Version tags are like textbook editions: "Chapter 1, print run 01" is the SAME as "print run 1" — front zeros are just decoration. You compare section by section, and if one book simply lacks a section entirely, you pretend it says zero there.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Never compare revision substrings as text ("10" &lt; "9" alphabetically!). Accumulating digits into numbers makes leading zeros disappear for free and keeps ordering mathematically honest.</div>`});

/* Problem 247 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q247 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 247 · MEDIUM</span>String to Integer (atoi)</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">State Machine</span></div>
<p class="dropcap">Implement the C-style <code>atoi</code> conversion: ignore leading whitespace, read an optional <code>+/-</code> sign, then read consecutive digits until a non-digit stops you. Clamp the result to the 32-bit signed range <code>[−2³¹, 2³¹−1]</code>. Return the parsed (or clamped) integer.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"42"             → 42
"   -042"        → -42
"1337c0d3"       → 1337   (stop at 'c')
"words and 987"  → 0      (no digits first)
"-91283472332"   → -2147483648 (clamped)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= s.length &lt;= 200</li><li>s may contain any ASCII characters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Three strict phases in order: skip spaces → capture sign → accumulate digits. Detect overflow DURING accumulation, not after — clamp with respect to the sign.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Index scan with an accumulator kept in <code>long</code>: after spaces/sign, while digits remain multiply by 10 and add. The instant the value escapes the 32-bit window, return the clamped boundary honouring the sign. This "fail fast" also protects huge inputs cheaply.</p>
<pre class="code" data-lang="java"><code>public int myAtoi(String s) {
    int i = 0, n = s.length(), sign = 1;
    while (i &lt; n &amp;&amp; s.charAt(i) == ' ') i++;
    if (i &lt; n &amp;&amp; (s.charAt(i) == '+' || s.charAt(i) == '-'))
        sign = s.charAt(i++) == '-' ? -1 : 1;
    long val = 0;
    while (i &lt; n &amp;&amp; Character.isDigit(s.charAt(i))) {
        val = val * 10 + (s.charAt(i++) - '0');
        if (sign == 1 &amp;&amp; val &gt;= Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (sign == -1 &amp;&amp; -val &lt;= Integer.MIN_VALUE) return Integer.MIN_VALUE;
    }
    return sign * (int) val;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"-91283472332"</code></p>
<table class="tbl">
<tr><th>step</th><th>char</th><th>val</th><th>guard check</th></tr>
<tr><td>skip/spaces</td><td>—</td><td>—</td><td>none present</td></tr>
<tr><td>sign</td><td>'-'</td><td>—</td><td>sign = −1</td></tr>
<tr><td>digits…</td><td>9,1,2,…</td><td>grows</td><td>still inside range</td></tr>
<tr><td>digit '3' #11</td><td>'3'</td><td>91283472332</td><td>−val ≤ MIN → clamp!</td></tr>
</table>
<p class="fs13">Returns <code>-2147483648</code> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>You're a strict customs officer reading one shipment label: first peel off blank tape at the front, notice the +/− stamp, then collect digit crates ONLY while they keep coming — the first junk item freezes everything. If the collected pile exceeds warehouse capacity, you don't count further; you hand over exactly the legal maximum or minimum, depending on the stamp's direction.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The overflow guard must live INSIDE the digit loop — checking only at the end means <code>long</code> could already be poisoned for absurdly long inputs, and interviewers love that follow-up.</div>`});

/* Problem 248 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q248 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 248 · MEDIUM</span>Zigzag Conversion</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Simulation</span></div>
<p class="dropcap">The string <code>"PAYPALISHIRING"</code> is written in a zigzag pattern on <code>numRows</code> rows, then read row by row:</p>
<pre class="code" data-lang="text"><code>P   A   H   N
A P L S I I G
Y   I   R</code></pre>
<p class="dropcap">Return the row-by-row reading: <code>"PAHNAPLSIIGYIR"</code>. Given <code>s</code> and <code>numRows</code>, produce that string.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "PAYPALISHIRING", numRows = 3 → "PAHNAPLSIIGYIR"
Input: s = "A", numRows = 1            → "A"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 1000</li><li>1 &lt;= numRows &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Simulate walking: letters go DOWN until they hit the bottom rail, then UP until the top rail. One direction flag is enough.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>One <code>StringBuilder</code> per row. Walk the characters once, appending each to its current row; bounce the direction flag off the top (row 0) and bottom (row <code>numRows−1</code>) rails; finally concatenate all rows.</p>
<pre class="code" data-lang="java"><code>public String convert(String s, int numRows) {
    if (numRows == 1) return s;
    StringBuilder[] rows = new StringBuilder[numRows];
    for (int r = 0; r &lt; numRows; r++) rows[r] = new StringBuilder();
    int cur = 0, step = 1;
    for (char c : s.toCharArray()) {
        rows[cur].append(c);
        if (cur == 0) step = 1;
        else if (cur == numRows - 1) step = -1;
        cur += step;
    }
    StringBuilder out = new StringBuilder();
    for (StringBuilder sb : rows) out.append(sb);
    return out.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s="PAYPA", numRows=3</code></p>
<table class="tbl">
<tr><th>letter</th><th>row before</th><th>bounce?</th><th>written to</th></tr>
<tr><td>P</td><td>0</td><td>top → down</td><td>row 0</td></tr>
<tr><td>A</td><td>1</td><td>—</td><td>row 1</td></tr>
<tr><td>Y</td><td>2</td><td>bottom → up</td><td>row 2</td></tr>
<tr><td>P</td><td>1</td><td>—</td><td>row 1</td></tr>
<tr><td>A</td><td>0</td><td>top → down</td><td>row 0</td></tr>
</table>
<p class="fs13">rows = ["PA","AP","Y"] → <code>"PAYAP…"</code> ✓ matches pattern prefix.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n) for the row buffers.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>You're painting letters onto a picket fence: brush down the first slat to the bottom, then diagonally up to the top slat, over and over. When you finally read each slat straight down, you get a scrambled secret message — actual WWII-era spies used EXACTLY this trick, called the rail-fence cipher!</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The walk needs just ONE bit of memory — the direction flag. And <code>numRows == 1</code> must be special-cased, or the flag flips forever between rails 0 and 0.</div>`});

/* Problem 249 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q249 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 249 · MEDIUM</span>Validate IP Address</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Parsing</span></div>
<p class="dropcap">Given a string, decide whether it is a valid <strong>IPv4</strong> or <strong>IPv6</strong> address; otherwise return <code>"Neither"</code>.</p>
<ul>
<li><b>IPv4:</b> exactly four decimal numbers 0–255 separated by dots — and <em>no leading zeros</em> (<code>"01"</code> is invalid, <code>"0"</code> is fine).</li>
<li><b>IPv6:</b> exactly eight groups of 1–4 hex digits (<code>0-9 a-f A-F</code>) separated by colons — groups may not start with an extra zero (a lone <code>"0"</code> is allowed).</li>
</ul>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"172.16.254.1"                     → "IPv4"
"2001:0db8:85a3:0:0:8A2E:0370:7334" → "Neither" ("0370" has extra leading zero)
"256.256.256.256"                   → "Neither" (256 &gt; 255)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>input contains printable ASCII only, no whitespace</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Decide the family by counting separators FIRST (3 dots vs 7 colons), then validate each token with a boring mechanical predicate. Split with limit −1 so trailing empty tokens survive.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Count dots/colons to pick the rulebook, split once, then run every token through its checklist: digits-only + no leading zero + value ≤ 255 for IPv4; hex-only + length 1..4 + no padded zero for IPv6.</p>
<pre class="code" data-lang="java"><code>public String validIPAddress(String ip) {
    if (ip.chars().filter(c -&gt; c == '.').count() == 3)
        return v4(ip.split("\\.", -1)) ? "IPv4" : "Neither";
    if (ip.chars().filter(c -&gt; c == ':').count() == 7)
        return v6(ip.split(":", -1)) ? "IPv6" : "Neither";
    return "Neither";
}
private boolean v4(String[] t) {
    if (t.length != 4) return false;
    for (String s : t) {
        if (!s.matches("\\d{1,3}") || (s.length() &gt; 1 &amp;&amp; s.charAt(0) == '0')
            || Integer.parseInt(s) &gt; 255) return false;
    }
    return true;
}
private boolean v6(String[] t) {
    if (t.length != 8) return false;
    for (String s : t) {
        if (!s.matches("[0-9a-fA-F]{1,4}")
            || (s.length() &gt; 1 &amp;&amp; s.charAt(0) == '0')) return false;
    }
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"2001:0db8:85a3:0:0:8A2E:0370:7334"</code></p>
<table class="tbl">
<tr><th>group</th><th>hex?</th><th>len ≤ 4?</th><th>leading zero?</th><th>verdict</th></tr>
<tr><td>2001</td><td>✓</td><td>✓</td><td>—</td><td>pass</td></tr>
<tr><td>0db8</td><td>✓</td><td>✓</td><td>YES ✗</td><td>fail → Neither ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n) for the split tokens.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Think of postal codes: an IPv4 is FOUR boxes, each holding a plain number 0–255 with NO decorative front-zeros ("01" is as wrong as writing your house number as "007"). An IPv6 is EIGHT hex boxes at most four wide with the same no-padding rule. Wrong number of boxes, fancy zeros, or any alien character → the post office stamps it "Neither".</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The traps are all edge-shaped: empty tokens from double separators (split limit −1 catches them), plus/negative signs sneaking into numbers, and the leading-zero rule differing between the two families.</div>`});

/* Problem 250 */
B.spread(
{ kicker: 'DSA · STRING ALGORITHMS', head: 'Q250 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 250 · EASY</span>Isomorphic Strings</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">String</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Two strings <code>s</code> and <code>t</code> are <strong>isomorphic</strong> if characters in <code>s</code> can be REPLACED (one-to-one) to become <code>t</code> — every occurrence of a letter maps to the same letter, and no two different letters share a target. Same length guaranteed. Decide if they are isomorphic.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"egg"   ↔ "add"   → true   (e→a, g→d)
"foo"   ↔ "bar"   → false  (o wants b AND r)
"badc"  ↔ "baba"  → false  (b and d both want b!)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length == t.length &lt;= 5×10⁴</li><li>lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A one-way map is not enough — you need the map in BOTH directions to guarantee one-to-one (a bijection).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep two lookup tables: forward <code>s→t</code> and reverse <code>t→s</code>. For each position, if either table already holds a DIFFERENT partner for these letters, reject immediately; otherwise record both directions.</p>
<pre class="code" data-lang="java"><code>public boolean isIsomorphic(String s, String t) {
    int[] fwd = new int[128], rev = new int[128];
    for (int i = 0; i &lt; s.length(); i++) {
        char a = s.charAt(i), b = t.charAt(i);
        if ((fwd[a] != 0 &amp;&amp; fwd[a] != b) ||
            (rev[b] != 0 &amp;&amp; rev[b] != a)) return false;
        fwd[a] = b; rev[b] = a;
    }
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s="badc", t="baba"</code></p>
<table class="tbl">
<tr><th>i</th><th>a,b</th><th>fwd check</th><th>rev check</th><th>action</th></tr>
<tr><td>0</td><td>b,b</td><td>empty ✓</td><td>empty ✓</td><td>record b↔b</td></tr>
<tr><td>1</td><td>a,a</td><td>✓</td><td>✓</td><td>record a↔a</td></tr>
<tr><td>2</td><td>d,b</td><td>d unmapped ✓</td><td>rev[b]=b ≠ d ✗</td><td>false!</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) — two fixed 128-int tables.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>You're building a decoder ring between two alphabets. Two iron rules make it fair: every symbol in word A must ALWAYS translate to the same symbol in word B, and no two A-symbols may share one B-symbol — exactly like every country having exactly ONE capital city, and no city serving as capital of two countries at once.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The classic bug is mapping only forward — <code>"badc"/"baba"</code> sails through until the REVERSE table exposes the collision. One-to-one means both arrows must be unique; check both or fail both.</div>`});
})();