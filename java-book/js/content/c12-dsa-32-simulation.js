/* ===== CHAPTER 63 · DSA: Simulation & Construction ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 63, 'DSA: Simulation & Construction');

/* Problem 311 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q311 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 311 · HARD</span>Text Justification</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Greedy Packing</span><span class="pill">Edge Cases</span></div>
<p class="dropcap">Pack words into lines of exactly <code>maxWidth</code>: greedily fit as many as possible, then spread extra spaces EVENLY between words (leftmost gaps get surplus). Last line and single-word lines are left-justified and space-padded.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>words = ["This","is","an","example","of","text","justification."], width 16
"This    is    an"
"example  of text"
"justification.  "</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ words.length ≤ 300 · 1 ≤ maxWidth ≤ 100 · every word fits</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Two phases per line: GREEDY word-packing by projected length, then ARITHMETIC space distribution — base gap plus remainder sprinkled left-to-right.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; fullJustify(String[] w, int mw) {
    List&lt;String&gt; out = new ArrayList&lt;&gt;();
    int i = 0, n = w.length;
    while (i &lt; n) {
        int len = w[i].length(), j = i + 1;
        while (j &lt; n &amp;&amp; len + 1 + w[j].length() &lt;= mw)
            len += 1 + w[j++].length();
        StringBuilder sb = new StringBuilder(w[i]);
        int gaps = j - i - 1;
        if (j == n || gaps == 0) {                       // flush-left cases
            for (int k = i + 1; k &lt; j; k++) sb.append(' ').append(w[k]);
            while (sb.length() &lt; mw) sb.append(' ');
        } else {
            int space = (mw - len) / gaps + 1, big = (mw - len) % gaps;
            for (int k = i + 1; k &lt; j; k++) {
                for (int s = 0; s &lt; space; s++) sb.append(' ');
                if (big-- &gt; 0) sb.append(' ');
                sb.append(w[k]);
            }
        }
        out.add(sb.toString());
        i = j;
    }
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Line 1 of the example: packed {This, is, an}, letters 8, slack 8, gaps 2</p>
<table class="tbl">
<tr><th>quantity</th><th>value</th></tr>
<tr><td>letters + baseline gaps (len)</td><td>8 + 2 = 10</td></tr>
<tr><td>slack spaces = 16 − 10</td><td>6</td></tr>
<tr><td>per gap = 6/2 + 1 baseline</td><td>4 spaces each</td></tr>
<tr><td>result</td><td>"This    is    an" ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(total characters). Space: O(maxWidth) per line.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>An old newspaper typesetter: slam words onto the line until the next one would stick out, then pull the GAPS tight like drawstrings so both margins snap perfectly straight — the leftmost gaps absorb any leftover pixels. Paragraph endings are gentler: just left-align and trail off with quiet spaces.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The code is easy; the SPEC is hard. Every clause ("last line", "single word", "evenly, leftmost heavier") maps to exactly one branch — enumerate them BEFORE coding.</div>`});

/* Problem 312 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q312 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 312 · MEDIUM</span>Robot Bounded in Circle</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">State Machine</span><span class="pill">Geometry</span></div>
<p class="dropcap">A robot runs an instruction string of <code>G</code> (straight), <code>L</code>/<code>R</code> turns INFINITELY many times. Return <code>true</code> if it stays inside some bounded circle.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"GGLLGG" → true   (returns to origin facing south)
"GG"     → false  (drifts north forever)
"GL"     → true   (traces a square)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ instructions.length ≤ 100</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Run the string ONCE. Bounded ⇔ back at origin OR no longer facing north.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean isRobotBounded(String ins) {
    int x = 0, y = 0, d = 0;              // 0=N 1=E 2=S 3=W
    int[] dx = {0, 1, 0, -1}, dy = {1, 0, -1, 0};
    for (char c : ins.toCharArray()) {
        if (c == 'G') { x += dx[d]; y += dy[d]; }
        else d = (d + (c == 'R' ? 1 : 3)) % 4;
    }
    return (x == 0 &amp;&amp; y == 0) || d != 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"GGLLGG"</code></p>
<table class="tbl">
<tr><th>step</th><th>action</th><th>(x, y)</th><th>facing</th></tr>
<tr><td>G, G</td><td>north twice</td><td>(0, 2)</td><td>N</td></tr>
<tr><td>L, L</td><td>two lefts</td><td>(0, 2)</td><td>S</td></tr>
<tr><td>G, G</td><td>south twice</td><td>(0, 0)</td><td>S → true ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) for one pass. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A dancer following choreography on graph paper, repeated forever. After ONE complete routine either she's back on her starting tile (perfect loop) or she's FACING A DIFFERENT WAY — because a turned dancer re-runs the routine on a tilted, shifted square and eventually walks a box around her original spot. Only a dancer still staring north escapes to infinity.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Infinity detection collapses to a single-pass vector test: displaced AND heading unchanged is the ONLY escape. Simulating "infinitely" was never necessary.</div>`});

/* Problem 313 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q313 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 313 · EASY</span>Water Bottles</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Simulation</span><span class="pill">Div/Mod</span></div>
<p class="dropcap">You own <code>numBottles</code> full water bottles. Drinking one yields an empty; every <code>numExchange</code> empties can be traded for ONE full bottle. How many bottles can you drink in total?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>numBottles = 9, numExchange = 3 → 13
numBottles = 15, numExchange = 4 → 19</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ numBottles, numExchange ≤ 100</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Drink everything first; then loop <code>fresh = empties / exchange</code>, add to totals, and carry the remainder forward.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int numWaterBottles(int nb, int ne) {
    int total = nb, empty = nb;
    while (empty &gt;= ne) {
        int fresh = empty / ne;
        total   += fresh;
        empty    = empty % ne + fresh;
    }
    return total;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nb=9, ne=3</code></p>
<table class="tbl">
<tr><th>round</th><th>traded</th><th>drunk total</th><th>empties after</th></tr>
<tr><td>start</td><td>—</td><td>9</td><td>9</td></tr>
<tr><td>1</td><td>9/3 = 3 new</td><td>12</td><td>0 + 3 = 3</td></tr>
<tr><td>2</td><td>3/3 = 1 new</td><td>13</td><td>1 → stop ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(log n) — empties shrink by factor ne each loop. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Lemonade-stand recycling: chug your whole crate, then keep trading stacks of empties for refills until the leftovers can't afford another trade. Each round the leftover pile shrinks to remainders plus the newly-drunk bottles — a shrinking spiral that always lands.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Pure div/mod simulation — but notice the geometric-decay structure (empties ÷ ne each round) is WHY the loop terminates so fast.</div>`});

/* Problem 314 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q314 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 314 · MEDIUM</span>Champagne Tower</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Flow DP</span><span class="pill">Triangle</span></div>
<p class="dropcap">A pyramid of champagne coupes: row r holds r+1 glasses. Pour <code>poured</code> litres on the TOP glass; each glass holds 1 litre, and excess froths EQUALLY into the two glasses below it. How full is glass <code>(queryRow, queryGlass)</code>?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>poured=1, (1,1) → 0
poured=2, (1,1) → 0.5
poured=100000009, (33,17) → 1.0</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 ≤ poured ≤ 10⁹ · 0 ≤ queryRow ≤ 99</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sweep rows keeping only current-row amounts; each glass passes <code>max(0, amount − 1) / 2</code> to each child.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public double champagneTower(int poured, int row, int glass) {
    double[] cur = new double[row + 2];
    cur[0] = poured;
    for (int r = 0; r &lt; row; r++) {
        double[] nxt = new double[row + 2];
        for (int c = 0; c &lt;= r; c++) {
            double spill = Math.max(0.0, cur[c] - 1) / 2;
            nxt[c]     += spill;
            nxt[c + 1] += spill;
        }
        cur = nxt;
    }
    return Math.min(1.0, cur[glass]);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>poured = 4</code></p>
<table class="tbl">
<tr><th>row</th><th>amounts per glass</th></tr>
<tr><td>0</td><td>[4] → spills 1.5 each side</td></tr>
<tr><td>1</td><td>[1.5, 1.5] → each spills 0.25</td></tr>
<tr><td>2</td><td>[0.25, 0.5, 0.25]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(row²). Space: O(row).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>The wedding-cake of coupe glasses: every glass can hold exactly ONE glassful; anything extra fizzes over SPLIT EQUALLY to its two children below. Nobody needs a plan — just track how much liquid lands in each glass, row by row, and cap the answer at one glassful because nobody drinks from an overflowing cup twice.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Flow conservation over a triangle: only the CURRENT row matters as state — a rolling 1-D array replaces any imaginary 100×100 grid.</div>`});

/* Problem 315 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q315 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 315 · EASY</span>Find Triangular Sum of an Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">In-Place Shrink</span></div>
<p class="dropcap">Repeatedly build a NEW array of length n−1 where each entry is <code>(nums[i] + nums[i+1]) % 10</code>, until one number remains. Return it.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[1,2,3,4,5]
→ [3,5,7,9] → [8,2,6] → [0,8] → 8</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ nums.length ≤ 1000 · 0 ≤ nums[i] ≤ 9</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Shrink the array IN PLACE: each pass overwrites the prefix with pair sums; the live length drops by one per pass.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int triangularSum(int[] nums) {
    for (int end = nums.length - 1; end &gt; 0; end--)
        for (int i = 0; i &lt; end; i++)
            nums[i] = (nums[i] + nums[i + 1]) % 10;
    return nums[0];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,2,3,4,5]</code></p>
<table class="tbl">
<tr><th>pass</th><th>live array</th></tr>
<tr><td>1</td><td>[3,5,7,9]</td></tr>
<tr><td>2</td><td>[8,2,6]</td></tr>
<tr><td>3</td><td>[0,8]</td></tr>
<tr><td>4</td><td>[8] → answer 8 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(1) in place.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Pascal's triangle played BACKWARDS: each round merges every neighbouring pair and keeps only the last digit — like folding a paper strip over and over until a single corner remains. (Mathematically the survivor is a binomial-coefficient blend of all originals, but simulating is cheaper than combinatorics.)</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The triangle IS Pascal's row mod 10 — so the final digit equals <code>(Σ C(n−1,k)·nums[k]) % 10</code>. Simulation is still the pragmatic interview answer.</div>`});

/* Problem 316 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q316 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 316 · EASY</span>Design an Ordered Stream</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Design</span><span class="pill">Pointer Amortization</span></div>
<p class="dropcap">A stream of <code>n</code> slots receives <code>insert(id, value)</code> calls in RANDOM order. Each call returns the run of values starting at the current pointer that is now CONTIGUOUSLY filled; the pointer then jumps past them.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>OrderedStream os = new OrderedStream(5)
os.insert(3,"cc") → []
os.insert(1,"aa") → ["aa"]
os.insert(2,"bb") → ["bb","cc"]
os.insert(5,"ee") → []
os.insert(4,"dd") → ["dd","ee"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 1000 · ids are a permutation of 1..n</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A simple array plus a pointer. After storing, advance while slots are non-null and collect what you pass.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class OrderedStream {
    private String[] slot;
    private int ptr = 1;                       // 1-based
    public OrderedStream(int n) { slot = new String[n + 1]; }
    public List&lt;String&gt; insert(int id, String value) {
        slot[id] = value;
        List&lt;String&gt; out = new ArrayList&lt;&gt;();
        while (ptr &lt; slot.length &amp;&amp; slot[ptr] != null)
            out.add(slot[ptr++]);
        return out;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>call</th><th>slot state (1..5)</th><th>ptr before→after</th><th>returns</th></tr>
<tr><td>(3,"cc")</td><td>_ _ cc _ _</td><td>1→1</td><td>[]</td></tr>
<tr><td>(1,"aa")</td><td>aa _ cc _ _</td><td>1→2</td><td>[aa]</td></tr>
<tr><td>(2,"bb")</td><td>aa bb cc _ _</td><td>2→4</td><td>[bb, cc]</td></tr>
<tr><td>(5,"ee")</td><td>… _ ee</td><td>4→4</td><td>[]</td></tr>
<tr><td>(4,"dd")</td><td>full</td><td>4→6</td><td>[dd, ee] ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Amortized O(1): the pointer crosses each slot exactly once over the stream's life. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Jigsaw pieces arrive shuffled onto a numbered board with a CURSOR resting on square 1. Place a piece anywhere — usually nothing happens. But the instant you fill the square under the cursor, it glides forward across every already-filled square, popping that whole run of pieces into your hand as it goes.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The pointer never moves backwards, so total work across ALL inserts is O(n) even though single calls can return long runs — amortized analysis in its friendliest costume.</div>`});

/* Problem 317 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q317 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 317 · MEDIUM</span>Sequential Digits</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Constructive</span><span class="pill">Bounded Enum</span></div>
<p class="dropcap">A <strong>sequential number</strong> has every digit exactly one more than the previous (123, 2345…). Return ALL sequential numbers in <code>[low, high]</code>, sorted.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>low = 100, high = 300 → [123, 234]
low = 1000, high = 13000 → [1234,2345,3456,4567,5678,6789,12345]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>10 ≤ low ≤ high ≤ 10⁹ — scanning every integer is hopeless</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>CONSTRUCT, don't scan: start from each digit 1–9 and keep appending the next consecutive digit while under the ceiling. Barely 40 candidates exist in the universe.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; sequentialDigits(int low, int high) {
    List&lt;Integer&gt; out = new ArrayList&lt;&gt;();
    for (int s = 1; s &lt;= 9; s++) {
        int num = s;
        for (int d = s + 1; d &lt;= 9 &amp;&amp; num &lt;= high; d++) {
            num = num * 10 + d;
            if (num &gt;= low) out.add(num);
        }
    }
    Collections.sort(out);
    return out;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>low=100, high=300</code></p>
<table class="tbl">
<tr><th>start digit</th><th>built values ≤ high</th><th>in window?</th></tr>
<tr><td>1</td><td>12 → 123 → 1234(stop)</td><td>123 ✓</td></tr>
<tr><td>2</td><td>23 → 234 → 2345(stop)</td><td>234 ✓</td></tr>
<tr><td>3..9</td><td>34, 45 … all &lt; low or overshoot</td><td>— → sorted [123, 234] ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1)-ish — at most ~40 candidates ever exist. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Staircase numbers grow by always bolting on the NEXT stair: pick any starting step from 1 to 9, then glue digits upward until you'd leap past the roof. Collect whichever staircases land inside your window and sort them — the entire species has fewer than forty-five members, so construction crushes any billion-strong sweep.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>When a property is STRUCTURAL (digits follow a rule), enumerate generators instead of testing candidates — the candidate space collapses from 10⁹ to a constant.</div>`});

/* Problem 318 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q318 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 318 · MEDIUM</span>Count Sorted Vowel Strings</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Counting DP</span><span class="pill">Stars &amp; Bars</span></div>
<p class="dropcap">Count strings of length <code>n</code> over vowels {a, e, i, o, u} whose letters are sorted NON-DECREASING.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 1 → 5
n = 2 → 15
n = 33 → 66045</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 50</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Tally how many valid strings END in each vowel; each new letter appends anything at-or-after its predecessor — a running prefix sum does the bookkeeping.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int countVowelStrings(int n) {
    int[] cnt = {1, 1, 1, 1, 1};          // endings a e i o u
    for (int len = 2; len &lt;= n; len++) {
        int run = 0;
        for (int v = 0; v &lt; 5; v++) {     // prefix sums left→right
            run += cnt[v];
            cnt[v] = run;
        }
    }
    return cnt[4];                         // grand total
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 2</code></p>
<table class="tbl">
<tr><th>ends with</th><td>a</td><td>e</td><td>i</td><td>o</td><td>u</td></tr>
<tr><td>len 1 counts</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>len 2 (prefix sums)</td><td>1</td><td>2</td><td>3</td><td>4</td><td><b>5</b></td></tr>
</table>
<p class="fs13">total = cnt[u] = 15 ✓ (= C(2+4, 4) = C(6, 4) = C(6, 2))</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(5n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Vowel soup with a sorting rule: build words where the vowels never step BACKWARDS. After round one, every vowel is fair game. Each later letter may reuse anything AT or AFTER its predecessor, so tallying running totals from left to right keeps the books balanced — and the rightmost bucket quietly accumulates the grand total.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is stars-and-bars in disguise: non-decreasing length-n words over k letters = C(n+k−1, k−1) = C(n+4, 4). Simulation double-checks the closed form.</div>`});

/* Problem 319 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q319 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 319 · MEDIUM</span>Rotate Function</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Incremental Delta</span><span class="pill">Math</span></div>
<p class="dropcap">Define <code>F(k) = Σ i · nums[(i+k) mod n]</code> for rotations k = 0..n−1. Return the MAXIMUM F(k).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>nums = [4,3,2,6]
F(0)=25, F(1)=16, F(2)=23, F(3)=26 → answer 26</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁵ · −100 ≤ nums[i] ≤ 100 — O(n²) is too slow at the top end</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Rotating once moves every element UP one multiplier (gaining Σ total) except the one falling off hook n−1, which loses (n−1)× its value — net delta <code>sum − n·nums[n−k]</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int maxRotateFunction(int[] nums) {
    long sum = 0, f = 0;
    int n = nums.length;
    for (int i = 0; i &lt; n; i++) {
        sum += nums[i];
        f  += (long) i * nums[i];
    }
    long best = f;
    for (int k = 1; k &lt; n; k++) {
        f += sum - (long) n * nums[n - k];
        best = Math.max(best, f);
    }
    return (int) best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[4,3,2,6]</code>, sum = 15, F(0) = 25</p>
<table class="tbl">
<tr><th>k</th><th>delta = sum − n·nums[n−k]</th><th>F(k)</th></tr>
<tr><td>1</td><td>15 − 4·6 = −9</td><td>16</td></tr>
<tr><td>2</td><td>15 − 4·2 = +7</td><td>23</td></tr>
<tr><td>3</td><td>15 − 4·3 = +3</td><td><b>26</b> ✓ max</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A turntable with weights hanging from hooks numbered 0 upward. One click of rotation raises EVERY weight's hook number — collectively worth the whole crate's weight in score — but the weight sliding off the LAST hook not only stops earning, it owed (n−1)× itself. So each click's profit is simply "crate sum minus n × the departing weight". Spin around the circle once, remembering the best moment.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Incremental deltas beat re-computation: whenever a transform shifts ALL coefficients predictably, derive F(k) from F(k−1) with O(1) arithmetic — and use <code>long</code>, because scores reach ~10¹⁰.</div>`});

/* Problem 320 */
B.spread(
{ kicker: 'DSA · SIMULATION', head: 'Q320 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 320 · MEDIUM</span>Last Moment Before All Ants Fall Out of a Plank</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Reduction</span><span class="pill">Brain Teaser</span></div>
<p class="dropcap">Ants walk on a plank of length <code>n</code> at speed 1. <code>left[]</code> holds positions moving LEFT, <code>right[]</code> positions moving RIGHT. When two ants meet they turn around — but the plank tips when the LAST ant falls off. Return that last falling moment (0 if no ants).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 4, left = [4,3], right = [0,1] → 4
n = 7, left = [],   right = [0,1,2] → 7   (ant @0 crosses the whole plank)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁴ · positions distinct · all lists valid</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Collisions are an ILLUSION: two identical ants bouncing off each other look exactly like two ants PASSING THROUGH each other. So every ant just walks to its own end — answer is the longest such walk.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int getLastMoment(int n, int[] left, int[] right) {
    int t = 0;
    for (int p : left)  t = Math.max(t, p);        // walks p steps to edge 0
    for (int p : right) t = Math.max(t, n - p);    // walks n−p to edge n
    return t;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n=4, left=[4,3], right=[0,1]</code></p>
<table class="tbl">
<tr><th>ant</th><th>walks toward</th><th>steps needed</th></tr>
<tr><td>left @4</td><td>edge 0</td><td>4</td></tr>
<tr><td>left @3</td><td>edge 0</td><td>3</td></tr>
<tr><td>right @0</td><td>edge 4</td><td>4</td></tr>
<tr><td>right @1</td><td>edge 4</td><td>3 → max = <b>4</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Bumper cars driven by identical twins wearing name tags: when two collide and both reverse, that's INDISTINGUISHABLE from them politely swapping name tags and continuing. Since ants are interchangeable, collisions simply don't matter — every ant strolls straight to its own end of the plank, and the slowest stroll sets the closing time.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The pass-through/swap equivalence dissolves ALL interaction in one sentence — the most elegant reduction in this whole chapter. Spotting it turns a simulation nightmare into a max() call.</div>`});
})();