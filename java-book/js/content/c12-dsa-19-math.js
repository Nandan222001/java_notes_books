/* ===== CHAPTER 50 · DSA: Math & Number Theory ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 50, 'DSA: Math & Number Theory');

/* Problem 181 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q181 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 181 · MEDIUM</span>Pow(x, n)</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Math</span><span class="pill">Recursion</span></div>
<p class="dropcap">Implement <code>pow(x, n)</code>, computing <code>x</code> raised to the integer power <code>n</code>, without using a built-in power function.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: x = 2.0, n = 10
Output: 1024.0</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>-100.0 &lt; x &lt; 100.0</li><li>-2³¹ &lt;= n &lt;= 2³¹-1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Squaring the base and halving the exponent each step gets you to O(log n) instead of multiplying n times — and remember negative n means 1/x^(-n).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Fast exponentiation: if n is even, x^n = (x²)^(n/2); if odd, x^n = x · x^(n-1). Walk the bits of n from least to most significant, squaring the base each round and folding it into the result only when that bit is set. Cast n to <code>long</code> first so negating <code>Integer.MIN_VALUE</code> doesn't overflow.</p>
<pre class="code" data-lang="java"><code>public double myPow(double x, int n) {
    long N = n;
    if (N &lt; 0) { x = 1 / x; N = -N; }
    double result = 1.0, cur = x;
    while (N &gt; 0) {
        if ((N &amp; 1) == 1) result *= cur;
        cur *= cur;
        N &gt;&gt;= 1;
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>x = 2.0, n = 10</code> (binary 1010)</p>
<table class="tbl">
<tr><th>N</th><th>N &amp; 1</th><th>result</th><th>cur after squaring</th></tr>
<tr><td>10</td><td>0</td><td>1</td><td>4</td></tr>
<tr><td>5</td><td>1</td><td>4</td><td>16</td></tr>
<tr><td>2</td><td>0</td><td>4</td><td>256</td></tr>
<tr><td>1</td><td>1</td><td>1024</td><td>65536</td></tr>
<tr><td>0</td><td>—</td><td>1024</td><td>loop ends</td></tr>
</table>
<p class="fs13">Final <code>result = 1024.0</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Binary exponentiation" — decompose the exponent into its binary representation and multiply in only the powers-of-two terms that are set.</div>`});

/* Problem 182 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q182 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 182 · MEDIUM</span>Greatest Common Divisor of Strings</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Math</span></div>
<p class="dropcap">For two strings <code>s</code> and <code>t</code>, we say "<code>t</code> divides <code>s</code>" if and only if <code>s = t + t + ... + t</code> (<code>t</code> concatenated with itself one or more times). Given two strings <code>str1</code> and <code>str2</code>, return the largest string <code>x</code> such that <code>x</code> divides both <code>str1</code> and <code>str2</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= str1.length, str2.length &lt;= 1000</li><li>str1 and str2 consist of uppercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>If a common divisor string exists at all, <code>str1 + str2</code> must equal <code>str2 + str1</code>. The answer's length is then simply <code>gcd(len1, len2)</code> — the same GCD you'd compute on the lengths as integers.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>First check <code>str1 + str2 == str2 + str1</code> — if it fails, no common divisor string can exist (their "periods" don't align), so return <code>""</code>. Otherwise the GCD string is the prefix of length <code>gcd(str1.length(), str2.length())</code>, found with the classic Euclidean algorithm on the two lengths.</p>
<pre class="code" data-lang="java"><code>public String gcdOfStrings(String str1, String str2) {
    if (!(str1 + str2).equals(str2 + str1)) return "";
    int gcdLen = gcd(str1.length(), str2.length());
    return str1.substring(0, gcdLen);
}
private int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>str1 = "ABCABC"</code> (len 6), <code>str2 = "ABC"</code> (len 3)</p>
<table class="tbl">
<tr><th>Check</th><th>Value</th></tr>
<tr><td>str1 + str2</td><td>"ABCABCABC"</td></tr>
<tr><td>str2 + str1</td><td>"ABCABCABC"</td></tr>
<tr><td>equal?</td><td>yes → proceed</td></tr>
<tr><td>gcd(6, 3)</td><td>gcd(3, 6%3=0) = 3</td></tr>
<tr><td>str1.substring(0, 3)</td><td>"ABC"</td></tr>
</table>
<p class="fs13">Returns <code>"ABC"</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m + n) for the string concatenation/comparison, O(log(min(m,n))) for the GCD. Space: O(m + n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The concatenation-order equality test is the standard way to smuggle a "periodicity" check on strings into a simple integer GCD problem.</div>`});

/* Problem 183 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q183 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 183 · MEDIUM</span>Count Primes</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Math</span><span class="pill">Sieve</span></div>
<p class="dropcap">Given an integer <code>n</code>, return the number of prime numbers that are strictly less than <code>n</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 10
Output: 4
Explanation: primes below 10 are 2, 3, 5, 7</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= n &lt;= 5×10⁶</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Testing each number for primality individually is too slow at this scale. The Sieve of Eratosthenes marks all multiples of every prime as composite in one pass, in O(n log log n).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build a boolean array <code>isComposite[0..n-1]</code>. Starting from 2, for every index still marked prime, mark all of its multiples (starting at i²  since smaller multiples were already struck by smaller primes) as composite. Count the indices left unmarked.</p>
<pre class="code" data-lang="java"><code>public int countPrimes(int n) {
    if (n &lt; 3) return 0;
    boolean[] composite = new boolean[n];
    int count = 0;
    for (int i = 2; i &lt; n; i++) {
        if (!composite[i]) {
            count++;
            for (long j = (long) i * i; j &lt; n; j += i) {
                composite[(int) j] = true;
            }
        }
    }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 10</code> → sieve indices 2..9</p>
<table class="tbl">
<tr><th>i</th><th>composite[i]?</th><th>action</th><th>count</th></tr>
<tr><td>2</td><td>false</td><td>prime; mark 4,6,8</td><td>1</td></tr>
<tr><td>3</td><td>false</td><td>prime; mark 9</td><td>2</td></tr>
<tr><td>4</td><td>true</td><td>skip</td><td>2</td></tr>
<tr><td>5</td><td>false</td><td>prime; 25 ≥ 10, nothing to mark</td><td>3</td></tr>
<tr><td>6</td><td>true</td><td>skip</td><td>3</td></tr>
<tr><td>7</td><td>false</td><td>prime; 49 ≥ 10, nothing to mark</td><td>4</td></tr>
<tr><td>8, 9</td><td>true, true</td><td>skip both</td><td>4</td></tr>
</table>
<p class="fs13">Final <code>count = 4</code> — matches expected output (2, 3, 5, 7)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log log n). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Starting the inner marking loop at <code>i*i</code> instead of <code>2*i</code> is what keeps the sieve near-linear — every smaller multiple was already struck out by a smaller prime factor.</div>`});

/* Problem 184 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q184 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 184 · EASY</span>Roman to Integer</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Math</span><span class="pill">String</span></div>
<p class="dropcap">Roman numerals use symbols <code>I, V, X, L, C, D, M</code> for <code>1, 5, 10, 50, 100, 500, 1000</code>. Six pairs use subtractive notation (<code>IV</code>=4, <code>IX</code>=9, <code>XL</code>=40, <code>XC</code>=90, <code>CD</code>=400, <code>CM</code>=900). Given a valid Roman numeral string, convert it to an integer.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "MCMXCIV"
Output: 1994
Explanation: M + CM + XC + IV = 1000 + 900 + 90 + 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 15</li><li>s is a valid Roman numeral in the range [1, 3999]</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Scan left to right. If a symbol's value is smaller than the value right after it, that symbol is being subtracted rather than added.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Map each symbol to its value. Walk the string once: whenever the current symbol's value is less than the next symbol's value, subtract it (it's part of a subtractive pair like IV); otherwise add it. This handles every case in a single left-to-right pass with no lookback.</p>
<pre class="code" data-lang="java"><code>public int romanToInt(String s) {
    Map&lt;Character, Integer&gt; val = Map.of(
        'I', 1, 'V', 5, 'X', 10, 'L', 50,
        'C', 100, 'D', 500, 'M', 1000);
    int total = 0;
    for (int i = 0; i &lt; s.length(); i++) {
        int cur = val.get(s.charAt(i));
        if (i + 1 &lt; s.length() &amp;&amp; cur &lt; val.get(s.charAt(i + 1))) {
            total -= cur;
        } else {
            total += cur;
        }
    }
    return total;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "MCMXCIV"</code></p>
<table class="tbl">
<tr><th>char</th><th>value</th><th>next value</th><th>action</th><th>total</th></tr>
<tr><td>M</td><td>1000</td><td>100</td><td>+1000</td><td>1000</td></tr>
<tr><td>C</td><td>100</td><td>1000</td><td>-100</td><td>900</td></tr>
<tr><td>M</td><td>1000</td><td>10</td><td>+1000</td><td>1900</td></tr>
<tr><td>X</td><td>10</td><td>100</td><td>-10</td><td>1890</td></tr>
<tr><td>C</td><td>100</td><td>1</td><td>+100</td><td>1990</td></tr>
<tr><td>I</td><td>1</td><td>5</td><td>-1</td><td>1989</td></tr>
<tr><td>V</td><td>5</td><td>—</td><td>+5</td><td>1994</td></tr>
</table>
<p class="fs13">Final <code>total = 1994</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Peek right, compare, decide add or subtract" avoids a special-case table of the six subtractive pairs entirely.</div>`});

/* Problem 185 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q185 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 185 · MEDIUM</span>Integer to Roman</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Math</span><span class="pill">String</span><span class="pill">Greedy</span></div>
<p class="dropcap">Given an integer, convert it to a Roman numeral string.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: num = 1994
Output: "MCMXCIV"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= num &lt;= 3999</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>List every symbol value from largest to smallest, including the six subtractive combos (CM, CD, XC, XL, IX, IV), then greedily subtract the largest one that still fits.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Precompute parallel arrays of values and symbols in descending order, with the subtractive pairs folded in as single units (1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1). Repeatedly append the symbol for the largest value that is <code>&lt;= num</code> and subtract it, until num reaches 0. Greedy works because each value is chosen to always be usable before any smaller one is needed.</p>
<pre class="code" data-lang="java"><code>public String intToRoman(int num) {
    int[] vals = {1000,900,500,400,100,90,50,40,10,9,5,4,1};
    String[] syms = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i &lt; vals.length &amp;&amp; num &gt; 0; i++) {
        while (num &gt;= vals[i]) {
            num -= vals[i];
            sb.append(syms[i]);
        }
    }
    return sb.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>num = 1994</code></p>
<table class="tbl">
<tr><th>value used</th><th>symbol</th><th>num before</th><th>num after</th></tr>
<tr><td>1000</td><td>M</td><td>1994</td><td>994</td></tr>
<tr><td>900</td><td>CM</td><td>994</td><td>94</td></tr>
<tr><td>90</td><td>XC</td><td>94</td><td>4</td></tr>
<tr><td>4</td><td>IV</td><td>4</td><td>0</td></tr>
</table>
<p class="fs13">Result built: <code>"M" + "CM" + "XC" + "IV" = "MCMXCIV"</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) (at most 13 symbol checks, bounded by the 3999 constraint). Space: O(1) beyond the output.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Folding the subtractive pairs (CM, XC, IV, ...) into the same value/symbol table as the plain numerals turns a messy case analysis into one uniform greedy loop.</div>`});

/* Problem 186 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q186 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 186 · EASY</span>Excel Sheet Column Number</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Math</span><span class="pill">String</span></div>
<p class="dropcap">Given a string <code>columnTitle</code> that represents a column title as it appears in an Excel sheet, return its corresponding column number (A → 1, B → 2, ..., Z → 26, AA → 27, AB → 28, ...).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: columnTitle = "AB"
Output: 28</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= columnTitle.length &lt;= 7</li><li>columnTitle consists only of uppercase English letters</li><li>1 &lt;= result &lt;= 2³¹ - 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This is base-26 conversion, except the digits run 1-26 instead of 0-25 — treat it like reading a number left to right: <code>result = result * 26 + digit</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Process the string left to right. Each character contributes <code>(c - 'A' + 1)</code> as its digit value, and every existing digit shifts up one base-26 place before the new digit is added — exactly like decimal <code>result = result * 10 + digit</code>, just with base 26.</p>
<pre class="code" data-lang="java"><code>public int titleToNumber(String columnTitle) {
    int result = 0;
    for (char c : columnTitle.toCharArray()) {
        result = result * 26 + (c - 'A' + 1);
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>columnTitle = "AB"</code></p>
<table class="tbl">
<tr><th>char</th><th>digit (c-'A'+1)</th><th>result = result*26 + digit</th></tr>
<tr><td>A</td><td>1</td><td>0*26 + 1 = 1</td></tr>
<tr><td>B</td><td>2</td><td>1*26 + 2 = 28</td></tr>
</table>
<p class="fs13">Final <code>result = 28</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Any "spreadsheet column" or "bijective base-k" numbering problem reduces to standard positional-notation conversion once you notice the digits are 1-indexed instead of 0-indexed.</div>`});

/* Problem 187 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q187 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 187 · EASY</span>Happy Number</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Math</span><span class="pill">Two Pointers</span><span class="pill">Hash Set</span></div>
<p class="dropcap">A happy number is defined by this process: starting with a positive integer, replace it by the sum of the squares of its digits. Repeat until the number equals 1 (happy), or it loops endlessly in a cycle that never reaches 1 (not happy). Return <code>true</code> if <code>n</code> is happy.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 19
Output: true
Explanation: 1²+9²=82 → 8²+2²=68 → 6²+8²=100 → 1²+0²+0²=1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 2³¹ - 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The sequence either reaches 1 or falls into a repeating cycle — this is structurally a linked-list cycle-detection problem, so Floyd's slow/fast pointer trick applies, or simply track seen values in a set.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Repeatedly compute the sum of squared digits. Track every value seen in a <code>HashSet</code> — if the sum ever repeats before hitting 1, we're in a cycle and the number is not happy; if it reaches exactly 1, it is happy.</p>
<pre class="code" data-lang="java"><code>public boolean isHappy(int n) {
    Set&lt;Integer&gt; seen = new HashSet&lt;&gt;();
    while (n != 1 &amp;&amp; seen.add(n)) {
        int sum = 0;
        while (n &gt; 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        n = sum;
    }
    return n == 1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 19</code></p>
<table class="tbl">
<tr><th>n</th><th>digit squares</th><th>next n</th><th>seen so far</th></tr>
<tr><td>19</td><td>1²+9²=1+81</td><td>82</td><td>{19}</td></tr>
<tr><td>82</td><td>8²+2²=64+4</td><td>68</td><td>{19,82}</td></tr>
<tr><td>68</td><td>6²+8²=36+64</td><td>100</td><td>{19,82,68}</td></tr>
<tr><td>100</td><td>1²+0²+0²=1</td><td>1</td><td>{19,82,68,100}</td></tr>
</table>
<p class="fs13">Loop exits because <code>n == 1</code> → returns <code>true</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n) per digit-square step, small constant number of steps before repeat or reaching 1. Space: O(log n) for the seen set (or O(1) with Floyd's cycle detection).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Any "keep applying a deterministic function to a number" problem is secretly cycle detection — reuse the fast/slow pointer or visited-set pattern from linked lists.</div>`});

/* Problem 188 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q188 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 188 · MEDIUM</span>Factorial Trailing Zeroes</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Math</span></div>
<p class="dropcap">Given an integer <code>n</code>, return the number of trailing zeroes in <code>n!</code>. Your solution should be efficient enough that it does not compute the factorial directly.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= n &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Trailing zeroes come from factors of 10 = 2×5 in n!. Factors of 2 are always far more abundant than factors of 5, so the zero count is just the total count of 5s among 1..n — including extra 5s from 25, 125, etc.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Count how many multiples of 5 are <code>&lt;= n</code>, then multiples of 25 (each contributes one extra factor of 5 beyond the first), then 125, and so on until the divisor exceeds n. Summing <code>n/5 + n/25 + n/125 + ...</code> gives the total power of 5 dividing n!, which equals the trailing zero count.</p>
<pre class="code" data-lang="java"><code>public int trailingZeroes(int n) {
    int count = 0;
    for (long div = 5; div &lt;= n; div *= 5) {
        count += n / div;
    }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 130</code></p>
<table class="tbl">
<tr><th>div</th><th>n / div</th><th>running count</th></tr>
<tr><td>5</td><td>130/5 = 26</td><td>26</td></tr>
<tr><td>25</td><td>130/25 = 5</td><td>31</td></tr>
<tr><td>125</td><td>130/125 = 1</td><td>32</td></tr>
<tr><td>625</td><td>625 &gt; 130, stop</td><td>32</td></tr>
</table>
<p class="fs13">130! has <code>32</code> trailing zeroes</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log₅ n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Legendre's formula — the exponent of a prime p in n! is <code>Σ floor(n/pᵏ)</code> — is the general tool behind this and any "count factors of p in n!" question.</div>`});

/* Problem 189 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q189 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 189 · MEDIUM</span>Multiply Strings</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Math</span><span class="pill">String</span><span class="pill">Simulation</span></div>
<p class="dropcap">Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return the product of <code>num1</code> and <code>num2</code>, also as a string. You must not use any built-in BigInteger library or convert the inputs directly to integers.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: num1 = "123", num2 = "456"
Output: "56088"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= num1.length, num2.length &lt;= 200</li><li>num1 and num2 consist of digits only</li><li>Neither has leading zeros except the number "0" itself</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Do it exactly like grade-school long multiplication: the product of the digit at position i in num1 and the digit at position j in num2 always lands at positions <code>i+j</code> and <code>i+j+1</code> of a result array sized <code>len1+len2</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>A product of an <code>m</code>-digit and <code>n</code>-digit number has at most <code>m+n</code> digits. Allocate an int array of that size. For every pair of digits <code>(i, j)</code>, multiply them, add into <code>result[i+j+1]</code> (the low digit), and carry the overflow into <code>result[i+j]</code>. After all pairs, sweep the array into a final digit string, skipping leading zeros.</p>
<pre class="code" data-lang="java"><code>public String multiply(String num1, String num2) {
    int m = num1.length(), n = num2.length();
    int[] result = new int[m + n];
    for (int i = m - 1; i &gt;= 0; i--) {
        for (int j = n - 1; j &gt;= 0; j--) {
            int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
            int sum = mul + result[i + j + 1];
            result[i + j + 1] = sum % 10;
            result[i + j] += sum / 10;
        }
    }
    StringBuilder sb = new StringBuilder();
    for (int d : result) {
        if (!(sb.length() == 0 &amp;&amp; d == 0)) sb.append(d);
    }
    return sb.length() == 0 ? "0" : sb.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>num1 = "12", num2 = "34"</code> (expect 12×34 = 408)</p>
<table class="tbl">
<tr><th>i, j</th><th>digits</th><th>mul</th><th>result[i+j+1] update</th><th>carry into result[i+j]</th></tr>
<tr><td>i=1,j=1</td><td>2×4</td><td>8</td><td>result[3]=8</td><td>result[2]+=0</td></tr>
<tr><td>i=1,j=0</td><td>2×3</td><td>6</td><td>result[2]=0+6=6</td><td>result[1]+=0</td></tr>
<tr><td>i=0,j=1</td><td>1×4</td><td>4</td><td>result[2]=6+4=10→0, carry 1</td><td>result[1]+=1</td></tr>
<tr><td>i=0,j=0</td><td>1×3</td><td>3</td><td>result[1]=0+1+3=4</td><td>result[0]+=0</td></tr>
</table>
<p class="fs13">Array = <code>[0,4,0,8]</code> → strip leading zero → <code>"408"</code> — matches 12×34</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m×n). Space: O(m+n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Digit i of num1 times digit j of num2 always contributes to exactly positions i+j and i+j+1 of the result — that fixed index mapping is what makes simulating long multiplication in O(1) extra passes possible.</div>`});

/* Problem 190 */
B.spread(
{ kicker: 'DSA · MATH & NUMBER THEORY', head: 'Q190 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 190 · MEDIUM</span>Reverse Integer</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Math</span></div>
<p class="dropcap">Given a signed 32-bit integer <code>x</code>, return <code>x</code> with its digits reversed. If reversing causes the value to go outside the signed 32-bit integer range <code>[-2³¹, 2³¹-1]</code>, return 0.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: x = -123
Output: -321

Input: x = 1534236469
Output: 0 (reversal overflows 32-bit range)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>-2³¹ &lt;= x &lt;= 2³¹ - 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>You cannot safely build the reversed number as a 64-bit long and check range at the very end in some languages' constraints — practice checking for overflow before each digit is appended, using <code>Integer.MAX_VALUE</code>/<code>MIN_VALUE</code> boundaries.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Pop digits off <code>x</code> with <code>% 10</code> and <code>/ 10</code>, pushing each into <code>result = result * 10 + digit</code>. Before every push, check whether <code>result</code> would overflow <code>Integer.MAX_VALUE</code> (2147483647) or underflow <code>Integer.MIN_VALUE</code> (-2147483648) — if so, return 0 immediately rather than let it wrap.</p>
<pre class="code" data-lang="java"><code>public int reverse(int x) {
    int result = 0;
    while (x != 0) {
        int digit = x % 10;
        x /= 10;
        if (result &gt; Integer.MAX_VALUE / 10 ||
            (result == Integer.MAX_VALUE / 10 &amp;&amp; digit &gt; 7)) return 0;
        if (result &lt; Integer.MIN_VALUE / 10 ||
            (result == Integer.MIN_VALUE / 10 &amp;&amp; digit &lt; -8)) return 0;
        result = result * 10 + digit;
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>x = -123</code></p>
<table class="tbl">
<tr><th>x before</th><th>digit</th><th>x after</th><th>overflow check</th><th>result</th></tr>
<tr><td>-123</td><td>-3</td><td>-12</td><td>0 within bounds</td><td>0*10-3 = -3</td></tr>
<tr><td>-12</td><td>-2</td><td>-1</td><td>-3 within bounds</td><td>-3*10-2 = -32</td></tr>
<tr><td>-1</td><td>-1</td><td>0</td><td>-32 within bounds</td><td>-32*10-1 = -321</td></tr>
</table>
<p class="fs13">x is now 0 → loop ends, return <code>result = -321</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log₁₀ x) — one pass per digit. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Check <code>result &gt; MAX/10</code> (and the equality edge case on the last digit) BEFORE multiplying — testing after the fact is too late, since the multiplication itself has already overflowed.</div>`});

})();
