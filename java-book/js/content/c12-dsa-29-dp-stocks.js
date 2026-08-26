/* ===== CHAPTER 60 · DSA: Stock Series & State Machines ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 60, 'DSA: Stocks & State Machines');

/* Problem 281 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q281 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 281 · MEDIUM</span>Best Time to Buy and Sell Stock II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Greedy</span><span class="pill">Series</span></div>
<p class="dropcap">Unlimited transactions, but you must SELL before buying again. Maximise total profit across the price chart.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[7,1,5,3,6,4] → 7   (buy 1 sell 5 = 4; buy 3 sell 6 = 3)
[1,2,3,4,5]   → 4   (buy day1, sell last)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ prices.length ≤ 3×10⁴ · 0 ≤ prices[i] ≤ 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every upward step is free money: collect <code>max(0, today − yesterday)</code>. Summing rises equals riding each valley-to-peak wave.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>One pass harvesting only positive daily deltas.</p>
<pre class="code" data-lang="java"><code>public int maxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i &lt; prices.length; i++)
        profit += Math.max(0, prices[i] - prices[i - 1]);
    return profit;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,2,3,4,5]</code></p>
<table class="tbl">
<tr><th>step</th><th>delta</th><th>harvested</th><th>total</th></tr>
<tr><td>1→2</td><td>+1</td><td>+1</td><td>1</td></tr>
<tr><td>2→3</td><td>+1</td><td>+1</td><td>2</td></tr>
<tr><td>3→4</td><td>+1</td><td>+1</td><td>3</td></tr>
<tr><td>4→5</td><td>+1</td><td>+1</td><td>4 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Hiking commission: you earn a coin for every UPHILL step you walk, nothing for downhill. The best strategy is obvious — take every uphill step! Chopping big climbs into single steps earns exactly the same as climbing each hill in one go.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This greedy seeds the whole series: when constraints pile on (two trades, cooldowns, fees), we upgrade this one-liner into small state machines — watch chapters below.</div>`});

/* Problem 282 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q282 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 282 · HARD</span>Best Time to Buy and Sell Stock III</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">State Machine</span><span class="pill">Series</span></div>
<p class="dropcap">At most TWO transactions (sell before re-buy). Maximise profit.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[3,3,5,0,0,3,1,4] → 6   (buy0 sell3 = 3; buy1 sell4 = 3)
[1,2,3,4,5]       → 4   (one trade suffices)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 10⁵ · prices ≥ 0</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Four running bests — firstBuy, firstSell, secondBuy, secondSell — each updated from its left neighbour in the same pass.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>A four-state machine; states hold the BEST wallet in each posture ever seen so far. Same-day chaining is harmless (it degenerates to one trade).</p>
<pre class="code" data-lang="java"><code>public int maxProfit(int[] prices) {
    int b1 = Integer.MIN_VALUE, s1 = 0;
    int b2 = Integer.MIN_VALUE, s2 = 0;
    for (int p : prices) {
        b1 = Math.max(b1, -p);
        s1 = Math.max(s1, b1 + p);
        b2 = Math.max(b2, s1 - p);
        s2 = Math.max(s2, b2 + p);
    }
    return s2;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[3,5,0,3,4]</code></p>
<table class="tbl">
<tr><th>p</th><th>b1</th><th>s1</th><th>b2</th><th>s2</th></tr>
<tr><td>3</td><td>−3</td><td>0</td><td>−3</td><td>0</td></tr>
<tr><td>5</td><td>−3</td><td>2</td><td>−3</td><td>2</td></tr>
<tr><td>0</td><td>0</td><td>2</td><td>2</td><td>2</td></tr>
<tr><td>3</td><td>0</td><td>3</td><td>2</td><td>5</td></tr>
<tr><td>4</td><td>0</td><td>4</td><td>2</td><td>6 ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Flea-market flipping, two rounds allowed. You keep FOUR diaries: cheapest first purchase so far; fattest first resale; then (pretending that happened) cheapest second purchase funded by it; fattest final resale. Every new price tag just nudges all four diaries once, in order.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The state machine replaces an O(n²) split-point search ("best single trade left × right"). Ordering updates within a day lets sell→buy chain legally.</div>`});

/* Problem 283 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q283 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 283 · HARD</span>Best Time to Buy and Sell Stock IV</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">State Machine</span><span class="pill">Series</span></div>
<p class="dropcap">At most <code>k</code> transactions now — generalise the two-trade machine.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>k = 2, prices = [2,4,1]      → 2
k = 2, prices = [3,2,6,5,0,3] → 7</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ k ≤ 100 · 0 ≤ n ≤ 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A pair of arrays buy[t]/sell[t], one per trade tier. Shortcut: if k ≥ n/2 the cap is meaningless — harvest every rise like Q281.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Rolling tiers: each day sweeps t = 1..k updating that tier's best-holding and best-sold wallet from tier t−1.</p>
<pre class="code" data-lang="java"><code>public int maxProfit(int k, int[] prices) {
    int n = prices.length;
    if (n == 0 || k == 0) return 0;
    if (k &gt;= n / 2) {                       // effectively unlimited
        int p = 0;
        for (int i = 1; i &lt; n; i++)
            p += Math.max(0, prices[i] - prices[i - 1]);
        return p;
    }
    int[] buy = new int[k + 1], sell = new int[k + 1];
    Arrays.fill(buy, Integer.MIN_VALUE);
    for (int price : prices)
        for (int t = 1; t &lt;= k; t++) {
            buy[t]  = Math.max(buy[t],  sell[t - 1] - price);
            sell[t] = Math.max(sell[t], buy[t] + price);
        }
    return sell[k];
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>k=2, [2,4,1]</code></p>
<table class="tbl">
<tr><th>p</th><th>buy[1]</th><th>sell[1]</th><th>buy[2]</th><th>sell[2]</th></tr>
<tr><td>2</td><td>−2</td><td>0</td><td>−2</td><td>0</td></tr>
<tr><td>4</td><td>−2</td><td>2</td><td>−2</td><td>2</td></tr>
<tr><td>1</td><td>−1</td><td>2</td><td>1</td><td>2 ✓ answer 2</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·k). Space: O(k).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>The flea-market diaries multiply: one BUY diary and one SELL diary per allowed round-trip, each tier funded only by the previous tier's sales. And a wise stallholder notices you can never usefully flip more than half the days' worth of items — beyond that, just pocket every uphill step.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Q281 is this problem with infinite k; Q282 is it with k = 2. One template absorbs the whole family — recognise series problems and reuse the skeleton.</div>`});

/* Problem 284 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q284 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 284 · MEDIUM</span>Best Time with Cooldown</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">State Machine</span><span class="pill">Series</span></div>
<p class="dropcap">Unlimited trades, but after every SELL you must rest exactly one day before buying again. Maximise profit.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[1,2,3,0,2] → 3   (buy1 sell2; cool; buy0 sell2)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 5000 · 0 ≤ prices[i] ≤ 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Three postures: HOLDING a share / just SOLD today (frozen) / RESTING free. Freeze only blocks the buy transition.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Transitions per price: sold = oldHold + p; hold = max(oldHold, oldRest − p); rest = max(oldRest, oldSold). Save the old values first!</p>
<pre class="code" data-lang="java"><code>public int maxProfit(int[] prices) {
    int hold = -prices[0], sold = 0, rest = 0;
    for (int i = 1; i &lt; prices.length; i++) {
        int p = prices[i], preSold = sold, preRest = rest;
        sold = hold + p;
        hold = Math.max(hold, preRest - p);
        rest = Math.max(preRest, preSold);
    }
    return Math.max(sold, rest);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,2,3,0,2]</code> (start: hold −1)</p>
<table class="tbl">
<tr><th>p</th><th>sold</th><th>hold</th><th>rest</th></tr>
<tr><td>2</td><td>1</td><td>−1</td><td>0</td></tr>
<tr><td>3</td><td>2</td><td>−1</td><td>1</td></tr>
<tr><td>0</td><td>−1</td><td>1</td><td>2</td></tr>
<tr><td>2</td><td><b>3</b></td><td>1</td><td>2</td></tr>
</table>
<p class="fs13">answer = max(3, 2) = 3 ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A claw machine that locks your hands for ONE round after you drop a toy into the prize slot. Three postures: clutching a toy (HOLD), hands-tied just after dropping (SOLD-frozen), or idly watching (REST). Your notebook tracks the best ticket-balance achievable in each posture — the freeze simply forbids REST→HOLD on the very next turn.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A cooldown is just an extra STATE between sell and buy. Whenever a rule says "wait", add a posture — never special-case days.</div>`});

/* Problem 285 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q285 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 285 · MEDIUM</span>Best Time with Transaction Fee</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">State Machine</span><span class="pill">Series</span></div>
<p class="dropcap">Unlimited trades; each completed trade costs a flat <code>fee</code>. Maximise net profit.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>prices = [1,3,2,8,4,9], fee = 2 → 8
((8−1)−2) + ((9−4)−2)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 5×10⁴ · 0 &lt; prices[i] ≤ 1000 · 0 ≤ fee ≤ 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Two postures only: HOLDING vs CASH. Subtract the fee exactly once — at the sell transition.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Same two-diary machine as the unlimited case, with the rent deducted on selling day.</p>
<pre class="code" data-lang="java"><code>public int maxProfit(int[] prices, int fee) {
    int hold = -prices[0], cash = 0;
    for (int i = 1; i &lt; prices.length; i++) {
        int p = prices[i];
        hold = Math.max(hold, cash - p);
        cash = Math.max(cash, hold + p - fee);
    }
    return cash;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1,3,2,8,4,9], fee=2</code></p>
<table class="tbl">
<tr><th>p</th><th>hold</th><th>cash</th></tr>
<tr><td>3</td><td>−1</td><td>0</td></tr>
<tr><td>2</td><td>−1</td><td>0</td></tr>
<tr><td>8</td><td>−1</td><td><b>5</b> (−1+8−2)</td></tr>
<tr><td>4</td><td>max(−1, 5−4)=1</td><td>5</td></tr>
<tr><td>9</td><td>1</td><td>max(5, 1+9−2)=<b>8</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A flea market where every COMPLETED sale pays a flat stall rent. You still keep just two diaries — "currently clutching goods" and "currently holding cash" — but the moment you sell, the landlord's fee comes out of that sale before the cash diary updates.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Fees belong at the SELL edge of the state graph (charging at both buy and sell would double-count). Small placement choices like this are what interviewers probe.</div>`});

/* Problem 286 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q286 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 286 · MEDIUM</span>Paint House</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">DP</span><span class="pill">Rolling Min</span></div>
<p class="dropcap">A row of houses; each may be painted red, green or blue at a given cost — but NO two adjacent houses share a colour. Minimise the total painting cost.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>costs = [[17,2,17],[16,16,5],[14,3,19]]
Output: 10   (green 2 + blue 5 + green 3)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == costs.length · 1 ≤ n ≤ 100 · exactly 3 colours</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep three running numbers: cheapest total ending each colour. A new house picks its own cost + the cheaper of the OTHER two endings.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Rolling triple, no matrix needed.</p>
<pre class="code" data-lang="java"><code>public int minCost(int[][] costs) {
    int r = 0, g = 0, b = 0;
    for (int[] c : costs) {
        int nr = c[0] + Math.min(g, b);
        int ng = c[1] + Math.min(r, b);
        int nb = c[2] + Math.min(r, g);
        r = nr; g = ng; b = nb;
    }
    return Math.min(r, Math.min(g, b));
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input as example</p>
<table class="tbl">
<tr><th>house</th><th>R</th><th>G</th><th>B</th></tr>
<tr><td>0</td><td>17</td><td>2</td><td>17</td></tr>
<tr><td>1</td><td>16+min(2,17)=18</td><td>16+min(17,17)=33</td><td>5+min(17,2)=7</td></tr>
<tr><td>2</td><td>14+min(33,7)=21</td><td>3+min(18,7)=<b>10</b></td><td>19+min(18,33)=37</td></tr>
</table>
<p class="fs13">answer = min(21,10,37) = <b>10</b> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·colours). Space: O(colours).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A painter with three cans walks down a street where neighbours must not match. He remembers only THREE figures — "cheapest bill if this house ended red / green / blue". The next house adds its own price to whichever two neighbour-endings it's ALLOWED to reuse.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Not like my left neighbour" shrinks state to a single previous row — the entire DP lives in three integers.</div>`});

/* Problem 287 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q287 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 287 · EASY</span>Paint Fence</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Counting DP</span><span class="pill">Two States</span></div>
<p class="dropcap"><code>n</code> fence posts in a row, <code>k</code> colours. No THREE consecutive posts may match. Count the colourings.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 3, k = 2 → 6
n = 1, k = 2 → 2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 50 · 1 ≤ k ≤ 10⁵ (answer fits int for given bounds)</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track two counters: endings where the LAST post MATCHED its predecessor vs DIFFERED from it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>A match can only follow a difference; a difference can follow anything, times (k−1) colour choices.</p>
<pre class="code" data-lang="java"><code>public int numWays(int n, int k) {
    if (n == 0) return 0;
    int same = 0, diff = k;
    for (int i = 2; i &lt;= n; i++) {
        int nd = (same + diff) * (k - 1);
        same = diff;
        diff = nd;
    }
    return same + diff;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n=3, k=2</code></p>
<table class="tbl">
<tr><th>post i</th><th>same</th><th>diff</th></tr>
<tr><td>1</td><td>0</td><td>2</td></tr>
<tr><td>2</td><td>2</td><td>(0+2)×1 = 2</td></tr>
<tr><td>3</td><td>2</td><td>(2+2)×1 = 4</td></tr>
</table>
<p class="fs13">total = same + diff = 2 + 4 = <b>6</b> ✓ (AAB·ABA·ABB·BBA·BAB·BAA)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Fence-painting rulebook says no three matching panels in a row. You keep two tally marks on your clipboard: panels that REPEATED their neighbour versus panels that SWITCHED. A repeat can only ever follow a switch; a switch can sprout after anything, with (k−1) fresh colour options.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"No three in a row" is a two-state machine — the SAME insight as Q266's longest-happy-string, but counting instead of constructing.</div>`});

/* Problem 288 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q288 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 288 · MEDIUM</span>Knight Dialer</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Adjacency DP</span><span class="pill">Modulo</span></div>
<p class="dropcap">A chess knight sits on a phone keypad. It makes <code>n−1</code> hops, dialing a length-<code>n</code> number (leading zeros fine; hops must be legal knight moves). Count distinct numbers mod 10⁹+7.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>n = 1 → 10
n = 2 → 20
n = 3 → 46</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 5000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Remember only "how many sequences END on each digit". Each new hop collects from that digit's knight-predecessors.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int knightDialer(int n) {
    final int MOD = 1_000_000_007;
    long[] cur = new long[10];
    Arrays.fill(cur, 1);
    int[][] from = {{4,6},{6,8},{7,9},{4,8},{0,3,9},
                    {},{0,1,7},{2,6},{1,3},{2,4}};
    for (int len = 2; len &lt;= n; len++) {
        long[] nxt = new long[10];
        for (int d = 0; d &lt; 10; d++)
            for (int f : from[d])
                nxt[d] = (nxt[d] + cur[f]) % MOD;
        cur = nxt;
    }
    int ans = 0;
    for (long c : cur) ans = (int)((ans + c) % MOD);
    return ans;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">n = 2: every digit starts with count 1; new counts per key = number of knight-neighbours:</p>
<table class="tbl">
<tr><th>digit</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr>
<tr><th>count</th><td>2</td><td>2</td><td>2</td><td>2</td><td>3</td><td>0</td><td>3</td><td>2</td><td>2</td><td>2</td></tr>
</table>
<p class="fs13">sum = 20 ✓ (key 5 unreachable — no neighbours)</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(10·n). Space: O(10).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>The knight composes midnight phone melodies by hopping like a chess piece across the keypad. Instead of tracking whole songs, you keep a tiny scoreboard: "how many melodies END on each of the ten keys". Every extra hop lets each key absorb the counts of the keys a knight could have JUMPED FROM — five never gets visited at all.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A fixed adjacency list converts graph-walking into a 10-slot vector recurrence — and taking modulo at EVERY addition keeps huge counts honest.</div>`});

/* Problem 289 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q289 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 289 · HARD</span>Minimum Swaps To Make Sequences Increasing</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">DP</span><span class="pill">Keep/Swap States</span></div>
<p class="dropcap">Two equal-length arrays must BOTH become strictly increasing. In one operation you may swap nums1[i] with nums2[i] (same index). Return the minimum number of swaps.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>nums1 = [1,3,5,4], nums2 = [1,2,3,7] → 1   (swap index 3)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 ≤ n ≤ 10⁵ · 0 ≤ nums1[i], nums2[i] ≤ 10⁹</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Two states per position: cheapest way ending here with NO swap vs WITH swap. Two legality checks per step: natural alignment and cross-alignment.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>At each i decide which previous states make keep/swap legal; carry costs forward.</p>
<pre class="code" data-lang="java"><code>public int minSwap(int[] a, int[] b) {
    int keep = 0, swap = 1;
    for (int i = 1; i &lt; a.length; i++) {
        int nK = Integer.MAX_VALUE, nS = Integer.MAX_VALUE;
        boolean natural = a[i-1] &lt; a[i] &amp;&amp; b[i-1] &lt; b[i];
        boolean crossed = a[i-1] &lt; b[i] &amp;&amp; b[i-1] &lt; a[i];
        if (natural) {
            nK = Math.min(nK, keep);
            nS = Math.min(nS, swap + 1);
        }
        if (crossed) {
            nK = Math.min(nK, swap);
            nS = Math.min(nS, keep + 1);
        }
        keep = nK; swap = nS;
    }
    return Math.min(keep, swap);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>a=[1,3,5,4], b=[1,2,3,7]</code></p>
<table class="tbl">
<tr><th>i</th><th>natural?</th><th>crossed?</th><th>keep</th><th>swap</th></tr>
<tr><td>1</td><td>✓</td><td>✓</td><td>0</td><td>1</td></tr>
<tr><td>2</td><td>✓</td><td>✗</td><td>0</td><td>2</td></tr>
<tr><td>3</td><td>✗ (5&lt;4 no)</td><td>✓</td><td>min(∞, swap)=<b>2</b></td><td>min(∞, keep+1)=<b>1</b></td></tr>
</table>
<p class="fs13">answer = min(2,1) = <b>1</b> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>Twin escalators must both climb without stumbling. At each landing you either leave riders where they are or swap the two riders across — costing one ticket. Four quick glances decide legality: "did both columns rise naturally?" and "would they still both rise if crossed?" Only then do the two running tallies update.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Legality masks + two-state DP is THE pattern for "pairwise local constraint between two parallel arrays" — greedy fails here because a cheap-looking skip can force expensive swaps later.</div>`});

/* Problem 290 */
B.spread(
{ kicker: 'DSA · STATE-MACHINE DP', head: 'Q290 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 290 · HARD</span>Paint House II</h2>
<div class="pillrow"><span class="pill" style="--pc:#b71c1c">HARD</span><span class="pill">DP</span><span class="pill">Top-Two Trick</span></div>
<p class="dropcap">Paint House, but now with <code>k</code> colours — still no two adjacent houses may match. Minimise total cost. The follow-up demands better than O(n·k²).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>costs = [[1,5,3],[2,9,4]]
Output: 5   (colour0 costs 1 + colour2 costs 4)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 100 · 1 ≤ k ≤ 20</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every colour needs "previous row's cheapest EXCLUDING itself" — which is just the previous SMALLEST unless that smallest sits on the same colour; then use the SECOND smallest.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Carry the previous row's two champions: min1 (+its colour index) and min2. Each cell adds whichever champion it's allowed to reuse.</p>
<pre class="code" data-lang="java"><code>public int minCostII(int[][] costs) {
    int m1 = 0, m2 = 0, mi = -1;          // prev champions
    for (int[] c : costs) {
        int a = Integer.MAX_VALUE, b = Integer.MAX_VALUE, ai = -1;
        for (int j = 0; j &lt; c.length; j++) {
            int val = c[j] + (j == mi ? m2 : m1);
            if (val &lt; a)      { b = a; a = val; ai = j; }
            else if (val &lt; b) { b = val; }
        }
        m1 = a; m2 = b; mi = ai;
    }
    return m1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[[1,5,3],[2,9,4]]</code></p>
<table class="tbl">
<tr><th>row / colour</th><th>adds</th><th>val</th><th>(m1, m2, idx)</th></tr>
<tr><td>r0 · c0</td><td>—</td><td>1</td><td>(1, ∞, 0)</td></tr>
<tr><td>r0 · c1, c2</td><td>—</td><td>5, 3</td><td>(1, 3, 0)</td></tr>
<tr><td>r1 · c0</td><td>blocked → +m2=3</td><td>5</td><td>(5, ∞, 0)</td></tr>
<tr><td>r1 · c1</td><td>+m1=1</td><td>10</td><td>m2=10</td></tr>
<tr><td>r1 · c2</td><td>+m1=1</td><td>4</td><td>m2=4 → ans <b>5</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n·k). Space: O(1) extra.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>An awards ceremony photo: every nominee stands behind YESTERDAY'S winner — except the winner themselves, who must stand behind yesterday's runner-up. Keeping just those two podium names lets the whole parade line up in a single pass, no matter how many colours compete.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Cheapest excluding index j" never needs k candidates — top-two suffices. This exclusion trick upgrades O(nk²) to O(nk) and recurs across many DP problems with self-blocking choices.</div>`});
})();