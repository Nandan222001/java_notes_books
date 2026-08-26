/* ===== CHAPTER 61 · DSA: Game Theory & Minimax ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 61, 'DSA: Game Theory & Minimax');

/* Problem 291 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q291 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 291 · EASY</span>Nim Game</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Math</span><span class="pill">Cold Positions</span></div>
<p class="dropcap">A pile holds <code>n</code> stones. Alternating turns (you first), each player removes 1, 2 or 3 stones. Whoever takes the LAST stone wins. Do you win with optimal play?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 4 → false   (any 1–3 you take, friend finishes)
n = 1, 2, 3 → true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 2³¹ − 1 — simulation impossible!</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Losing positions repeat every FOUR. Whatever you take from a multiple-of-4, your friend restores the group.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Closed form from cold-position induction.</p>
<pre class="code" data-lang="java"><code>public boolean canWinNim(int n) {
    return n % 4 != 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>n</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
<tr><th>winner</th><td>You</td><td>You</td><td>You</td><td>Friend</td><td>You</td><td>You</td><td>You</td><td>Friend</td></tr>
</table>
<p class="fs13">At 5/6/7 you take down TO 4 and strand the friend there.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Birthday-candle duel: if the pile is an exact MULTIPLE OF FOUR it's cursed — however many candles you blow out (one, two or three), your sneaky friend blows enough to complete another group of four, steering you both back to the curse until they snatch the last flame. Any OTHER count: you blow the remainder first and hand THEM the cursed pile.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Impartial games crack open by identifying COLD POSITIONS (here: multiples of 4) — positions from which every move gifts a warm one. Pattern beats brute force across billion-sized inputs.</div>`});

/* Problem 292 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q292 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 292 · MEDIUM</span>Stone Game</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Interval DP</span><span class="pill">Difference Score</span></div>
<p class="dropcap">An EVEN number of piles in a row, odd total. Alex and Lee take turns (Alex first) removing from either END. Both play optimally — does Alex win?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>piles = [5,3,4,5] → true   (Alex takes both 5s)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 ≤ piles.length ≤ 500 · even · values ≥ 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Score the SPREAD: dp[i][j] = best (current − opponent) over subarray i..j. Positive at the root ⇒ win.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Fill interval table shortest-first; each end choice nets my stone minus the rival's future spread.</p>
<pre class="code" data-lang="java"><code>public boolean stoneGame(int[] piles) {
    int n = piles.length;
    int[][] dp = new int[n][n];
    for (int i = 0; i &lt; n; i++) dp[i][i] = piles[i];
    for (int len = 2; len &lt;= n; len++)
        for (int i = 0, j = i + len - 1; j &lt; n; i++, j++)
            dp[i][j] = Math.max(piles[i] - dp[i + 1][j],
                                piles[j] - dp[i][j - 1]);
    return dp[0][n - 1] &gt; 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[5,3,4,5]</code></p>
<table class="tbl">
<tr><th>interval</th><th>dp value</th><th>reason</th></tr>
<tr><td>[5,3]</td><td>+2</td><td>take 5, drop 3</td></tr>
<tr><td>[4,5]</td><td>+1</td><td>take 5</td></tr>
<tr><td>[3,4]</td><td>−1</td><td>forced trade-off</td></tr>
<tr><td>[5,3,4,5]</td><td><b>+1</b> → true ✓</td><td>take left 5 vs right 5, pick better branch</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(n²).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Sneaky shortcut first: with an EVEN number of piles, Alex can vow to take ONLY even-numbered positions or ONLY odd-numbered ones — one side is guaranteed richer, so Alex always wins! The DP proves it honestly by having each player maximise their LEAD rather than their stash.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Maximise my total" is awkward in zero-sum play; "maximise (mine − yours)" makes both players' moves IDENTICAL in structure — the negamax trick that powers this whole chapter.</div>`});

/* Problem 293 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q293 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 293 · MEDIUM</span>Stone Game II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Memoized Minimax</span><span class="pill">Suffix Sum</span></div>
<p class="dropcap">Piles in a row; parameter <code>M = 1</code>. On your turn take X piles from the LEFT (1 ≤ X ≤ 2M), then <code>M = max(M, X)</code>. Both optimal — return the MAX stones Alice collects.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>piles = [2,7,9,4,4] → 10
(Alice takes pile 2 first, then plays the mirror game to reach 10)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 100 · 1 ≤ piles[i] ≤ 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Suffix sums make "take everything left" instant. Memo on (index, M): my share = suffix − opponent's best reply.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int stoneGameII(int[] piles) {
    int n = piles.length;
    int[] suf = new int[n + 1];
    for (int i = n - 1; i &gt;= 0; i--) suf[i] = suf[i + 1] + piles[i];
    Integer[][] memo = new Integer[n][n + 1];
    return dfs(0, 1, piles, suf, memo);
}
private int dfs(int i, int m, int[] p, int[] suf, Integer[][] memo) {
    if (i == p.length) return 0;
    if (memo[i][m] != null) return memo[i][m];
    int best = 0;
    for (int x = 1; x &lt;= 2 * m &amp;&amp; i + x &lt;= p.length; x++)
        best = Math.max(best,
            suf[i] - dfs(i + x, Math.max(m, x), p, suf, memo));
    return memo[i][m] = best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Key memo cells for <code>[2,7,9,4,4]</code></p>
<table class="tbl">
<tr><th>state (i, M)</th><th>best for mover</th><th>how</th></tr>
<tr><td>(4, any)</td><td>4</td><td>grab the last pile</td></tr>
<tr><td>(2, 2)</td><td>17</td><td>sweep ALL remaining (x up to 4 covers 3 piles)</td></tr>
<tr><td>(1, 1)</td><td>16</td><td>take {7, 9} → rival secures only 8 → 24 − 8</td></tr>
<tr><td>(0, 1) root</td><td>26 − 16 = <b>10</b> ✓</td><td>x = 1 beats x = 2 (which nets 26−17 = 9)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n³) worst, tiny here. Space: O(n²) memo.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>The take-window GROWS as players get greedy (each grab of X widens the cap to max(M, X)). Both kids compute from the back of the row using a magic total per suffix: "everything still on the table minus whatever MY RIVAL can secure after I move." Whoever moves maximises their own slice by minimising that rival figure.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"My gain = suffixTotal − rival's optimum" removes turn bookkeeping entirely: both players run the SAME function, so memo states never care whose move it is.</div>`});

/* Problem 294 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q294 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 294 · MEDIUM</span>Stone Game III</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Negamax</span><span class="pill">Memo</span></div>
<p class="dropcap">A row of stone VALUES (may be negative). Alternating from Alice, each takes 1–3 stones from the LEFT end. Whoever ends with the HIGHER total wins — output <code>"Alice"</code>, <code>"Bob"</code> or <code>"Tie"</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[1,2,3,7]    → "Bob"
[1,2,3,-9]   → "Alice"   [1,2,3,6] → "Tie"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁵ · −1000 ≤ values ≤ 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Difference DP again: best(i) = max over x of (takenSum − best(i+x)). Sign of the root decides the winner.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public String stoneGameIII(int[] v) {
    Integer[] memo = new Integer[v.length + 1];
    int d = dfs(0, v, memo);
    return d &gt; 0 ? "Alice" : d == 0 ? "Tie" : "Bob";
}
private int dfs(int i, int[] v, Integer[] memo) {
    if (i == v.length) return 0;
    if (memo[i] != null) return memo[i];
    int best = Integer.MIN_VALUE, taken = 0;
    for (int x = 0; x &lt; 3 &amp;&amp; i + x &lt; v.length; x++) {
        taken += v[i + x];
        best = Math.max(best, taken - dfs(i + x + 1, v, memo));
    }
    return memo[i] = best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,2,3,7]</code> — suffix cells</p>
<table class="tbl">
<tr><th>best(i)</th><th>value</th><th>best move</th></tr>
<tr><td>i=4 (empty)</td><td>0</td><td>—</td></tr>
<tr><td>i=3</td><td>7</td><td>take the 7</td></tr>
<tr><td>i=2</td><td>max(3−7, 10−0)=10</td><td>take {3,7}</td></tr>
<tr><td>i=1</td><td>max(2−10, 5−7, 12−0)=12</td><td>sweep all three</td></tr>
<tr><td>i=0 root</td><td>max(1−12, 3−10, 6−7)=<b>−1</b> → Bob ✓</td><td>least-bad: take {1,2,3}</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Candy-row draft where some candies taste AWFUL (negative values). Both kids peek up to three-deep; sometimes the smart move is swallowing a bad candy so your rival inherits an even worse board. The scoreboard tracks only the LEAD — and when the lead lands negative, Alice must congratulate Bob.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Negative values break naive greedy instantly; the difference formulation absorbs them for free. Linear memo suffices since each state has just 3 branches.</div>`});

/* Problem 295 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q295 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 295 · HARD</span>Stone Game IV</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">Game DP</span><span class="pill">Squares</span></div>
<p class="dropcap"><code>n</code> stones; on your turn remove any PERFECT-SQUARE count (1, 4, 9, 16…). Player unable to move loses. Alice moves first — does she win?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 1 → true    n = 2 → false
n = 4 → true    n = 7 → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Warm/cold induction: position i is WINNING iff some square jump lands on a LOSING position.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean winnerSquareGame(int n) {
    boolean[] win = new boolean[n + 1];
    for (int i = 1; i &lt;= n; i++)
        for (int s = 1; s * s &lt;= i; s++)
            if (!win[i - s * s]) { win[i] = true; break; }
    return win[n];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>i</th><th>squares tried</th><th>lands on losing?</th><th>win[i]</th></tr>
<tr><td>1</td><td>1 → w0=F</td><td>yes</td><td>T</td></tr>
<tr><td>2</td><td>1 → w1=T</td><td>no</td><td>F</td></tr>
<tr><td>3</td><td>1 → w2=F</td><td>yes</td><td>T</td></tr>
<tr><td>4</td><td>1→w3=T; 4→w0=F</td><td>yes (via 4)</td><td>T</td></tr>
<tr><td>5</td><td>1→w4=T; 4→w1=T</td><td>no</td><td>F</td></tr>
<tr><td>7</td><td>1 → w6=T; 4 → w3=T</td><td>no</td><td>F ✓ matches example</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·√n). Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Lava-tile hopscotch: some stone-counts are SAFE tiles for the player about to move, others are LAVA (every square jump hands the rival a win). You build the map left to right — a tile is safe the moment ANY square-sized leap from it touches lava. Alice simply checks whether tile n is safe.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The cold/warm induction is THE template for impartial take-away games — swap "perfect squares" for any move-set and the same loop answers it.</div>`});

/* Problem 296 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q296 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 296 · MEDIUM</span>Predict the Winner</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Interval DP</span><span class="pill">Difference Score</span></div>
<p class="dropcap">Coins in a row, ANY count. Players alternate taking from either END; Player1 moves first. Can Player1 WIN <em>or tie</em>? (Same total ⇒ tie counts as success.)</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[1,5,2]      → false
[1,5,233,7]  → true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 20 · 0 ≤ nums[i] ≤ 10⁷</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Identical spread-DP to Q292, but the bar is <code>≥ 0</code> because ties favour Player 1.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean PredictTheWinner(int[] nums) {
    int n = nums.length;
    int[][] dp = new int[n][n];
    for (int i = 0; i &lt; n; i++) dp[i][i] = nums[i];
    for (int len = 2; len &lt;= n; len++)
        for (int i = 0, j = i + len - 1; j &lt; n; i++, j++)
            dp[i][j] = Math.max(nums[i] - dp[i + 1][j],
                                nums[j] - dp[i][j - 1]);
    return dp[0][n - 1] &gt;= 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,5,2]</code></p>
<table class="tbl">
<tr><th>interval</th><th>dp (spread)</th></tr>
<tr><td>[1,5]</td><td>max(1−5, 5−1) = 4</td></tr>
<tr><td>[5,2]</td><td>max(5−2, 2−5) = 3</td></tr>
<tr><td>[1,5,2] root</td><td>max(1−3, 2−4) = <b>−2</b> → false ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(n²).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Sidewalk coin-grab where coins may be wildly lopsided. Both players score their LEAD over the rival; Player 1 celebrates ties too, so her victory condition is "final lead not negative". The interval table fills shortest spans first, exactly like Q292 — only the finish line moved.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Reusing a template with one comparison flipped (<code>&gt;0</code> → <code>≥0</code>) is legitimate series-solving — recognise the family, adjust the rule.</div>`});

/* Problem 297 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q297 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 297 · MEDIUM</span>Can I Win</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Bitmask Memo</span><span class="pill">Minimax</span></div>
<p class="dropcap">Integers <code>1..maxChoosableInteger</code> sit on a board — each may be claimed ONCE in the whole game. Players alternate adding a still-unclaimed number to a SHARED running total; whoever first pushes it to ≥ <code>desiredTotal</code> wins. Alice moves first — can she force a win?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>max = 10, target = 11 → false
max = 10, target = 1  → true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ maxChoosable ≤ 20 · 0 ≤ desiredTotal ≤ 300 — memo must key on CLAIM SET, not totals</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The future depends only on WHICH numbers remain — encode that as a bitmask and memoise. Guard the hopeless case sum &lt; target.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Recurse over remaining-target + claim mask; a state is winning if some pick ends the game or strands the rival on a losing state.</p>
<pre class="code" data-lang="java"><code>public boolean canIWin(int mx, int target) {
    int total = mx * (mx + 1) / 2;
    if (target &lt;= 0) return true;
    if (total &lt; target) return false;      // nobody ever finishes
    Boolean[] memo = new Boolean[1 &lt;&lt; mx];
    return dfs(0, mx, target, memo);
}
private boolean dfs(int used, int mx, int need, Boolean[] memo) {
    if (memo[used] != null) return memo[used];
    for (int d = 1; d &lt;= mx; d++) {
        int bit = 1 &lt;&lt; (d - 1);
        if ((used &amp; bit) == 0)
            if (d &gt;= need || !dfs(used | bit, mx, need - d, memo))
                return memo[used] = true;
    }
    return memo[used] = false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Small board: <code>max=3, target=6</code></p>
<table class="tbl">
<tr><th>Alice pick</th><th>rival's board / need</th><th>rival outcome</th></tr>
<tr><td>3 → total 3</td><td>{1,2} needing 3: picks 2 → A plays 1 ✓; picks 1 → A plays 2 ✓</td><td>LOSING either way</td></tr>
<tr><td colspan="3">⇒ Alice wins by opening with 3 → TRUE</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(2^m · m), m ≤ 20. Space: O(2^m).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A corkboard of raffle numbers gets claimed once each as two collectors push one SHARED odometer toward the goal line. With twenty numbers there are far too many orderings — but only 2²⁰ switch-board PATTERNS of claims exist, so we remember each pattern's verdict once. Also spot the trap: if even every number combined can't reach the goal, nobody wins — answer false immediately.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>When history collapses to "which options remain", memoise on the SUBSET bitmask — the signature move for shared-pool turn games.</div>`});

/* Problem 298 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q298 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 298 · EASY</span>Divisor Game</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Parity Proof</span><span class="pill">Cold Positions</span></div>
<p class="dropcap">Chalkboard shows <code>n</code>. Players alternate (Alice first) choosing an <code>x</code> with <code>0 &lt; x &lt; n</code> and <code>n % x == 0</code>, replacing n with <code>n − x</code>. Unable to move ⇒ lose. Does Alice win?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 2 → true    n = 3 → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 1000 — but the proof works for ANY n</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Parity invariant: even boards can always hand back odd; odd boards can ONLY hand back even.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public boolean divisorGame(int n) {
    return n % 2 == 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>n at your turn</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>
<tr><th>mover loses?</th><td>stuck ✗</td><td>x=1 → hand 1 ✓</td><td>only x=1 → hand 2</td><td>x=1 → hand 3 ✓</td><td>x=1 → hand 4</td><td>x=1 → hand 5 ✓</td></tr>
<tr><th>outcome</th><td>LOSE</td><td>WIN</td><td>LOSE</td><td>WIN</td><td>LOSE</td><td>WIN</td></tr>
</table>
<p class="fs13">Why odd boards lose: an odd number has only ODD divisors, so odd − odd = EVEN — the mover is forced to hand the rival a paradise board. Even boards just subtract 1 to ship back a desert.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Even numbers are paradise resorts, odds are deserts. From paradise you can always mail your rival a desert (subtract 1). From a desert every legal move lands on even — so you're forced to mail THEM a resort ticket. Alice prays the chalk starts in paradise; if it does, she keeps shipping deserts until Bob is stuck at 1.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Sometimes ONE invariant sentence outperforms any table: classify positions as paradise/desert and show moves only cross between them in one direction of comfort.</div>`});

/* Problem 299 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q299 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 299 · MEDIUM</span>Guess Number Higher or Lower II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Minimax</span><span class="pill">Interval DP</span></div>
<p class="dropcap">I pick a number in <code>1..n</code>; you guess until correct. Every WRONG guess costs you its face value, and after each miss I tell you higher/lower. What is the MINIMUM cash that GUARANTEES a win no matter which number I chose?</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 10 → 16
n = 1 → 0        n = 2 → 1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 200</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Interval minimax: pivot k costs k plus the WORSE of its two sub-intervals; choose the cheapest such pivot. Never pivot on j itself — a correct guess is free.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int getMoneyAmount(int n) {
    int[][] dp = new int[n + 2][n + 2];
    for (int len = 2; len &lt;= n; len++)
        for (int i = 1, j = len; j &lt;= n; i++, j++) {
            dp[i][j] = Integer.MAX_VALUE;
            for (int k = i; k &lt; j; k++)
                dp[i][j] = Math.min(dp[i][j],
                    k + Math.max(dp[i][k - 1], dp[k + 1][j]));
        }
    return dp[1][n];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 3</code></p>
<table class="tbl">
<tr><th>interval</th><th>pivot options</th><th>dp value</th></tr>
<tr><td>[1,2]</td><td>k=1: 1 + max(0, d[2][2]) = 1</td><td>1</td></tr>
<tr><td>[2,3]</td><td>k=2: 2 + 0 = 2</td><td>2</td></tr>
<tr><td>[1,3] root</td><td>k=1: 1+max(0,2)=3 · k=2: 2+max(0,0)=<b>2</b></td><td>2 ✓ (guess 2 first)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n³). Space: O(n²).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A hostile genie punishes every wrong shout by its face value and answers only "higher/lower". You're planning a decision TREE with a price tag on each wrong branch — so you pick roots whose two sub-trees are balanced in COST, not in size. Sometimes guessing slightly low is cheaper because one side of the tree is naturally cheap anyway.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The defining minimax alternation: YOU minimise across pivots while the ADVERSARY maximises across branches (<code>max</code> of the two sub-intervals). Excluding k = j encodes "correct guesses are free".</div>`});

/* Problem 300 */
B.spread(
{ kicker: 'DSA · GAME THEORY', head: 'Q300 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 300 · MEDIUM</span>Stone Game VII</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Interval DP</span><span class="pill">Prefix Sum</span></div>
<p class="dropcap">A row of stones. On your turn remove an END stone and SCORE the sum of everything REMAINING. Alice moves first; both play optimally to maximise their OWN score minus the rival's. Return Alice's final lead.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[5,3,1,4,2] → 6
[7,90,5,1,100,10,10,2] → 122</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == stones.length · 1 ≤ n ≤ 1000 · 1 ≤ stones[i] ≤ 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Prefix sums give any remaining-window total in O(1). dp[i][j] = best (mine − rival's future spread) — same negamax skeleton as Q292/Q296.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int stoneGameVII(int[] stones) {
    int n = stones.length;
    int[] pre = new int[n + 1];
    for (int i = 0; i &lt; n; i++) pre[i + 1] = pre[i] + stones[i];
    int[][] dp = new int[n][n];
    for (int len = 2; len &lt;= n; len++)
        for (int i = 0, j = i + len - 1; j &lt; n; i++, j++) {
            int takeL = pre[j + 1] - pre[i + 1] - dp[i + 1][j];
            int takeR = pre[j] - pre[i]     - dp[i][j - 1];
            dp[i][j] = Math.max(takeL, takeR);
        }
    return dp[0][n - 1];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Tiny case <code>[3,1]</code> then the real example:</p>
<table class="tbl">
<tr><th>move option</th><th>banked (remaining sum)</th><th>rival spread</th><th>net</th></tr>
<tr><td>remove LEFT 3 → leaves [1]</td><td>1</td><td>dp[1][1] = 0</td><td>+1</td></tr>
<tr><td>remove RIGHT 1 → leaves [3]</td><td>3</td><td>dp[0][0] = 0</td><td><b>+3</b></td></tr>
<tr><td colspan="3">single cells are 0 (removing the last stone banks nothing)</td></tr>
</table>
<p class="fs13">Full run <code>[5,3,1,4,2]</code>: optimal play yields Alice's lead of <b>6</b> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(n²).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A dessert tray that pays you for what you LEAVE BEHIND: slide an end pastry off and bank the tray's new weight. Grabbing the flashiest piece early can starve your future banking, so the smart diner sometimes removes a modest end just to keep the juicy middle paying them again next round.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Rewarding the REMAINING mass flips end-taking intuition on its head — yet the interval-difference template absorbs it with one prefix-sum lookup per transition. Chapter capstone: three Stone Games, one skeleton, three twists.</div>`});
})();