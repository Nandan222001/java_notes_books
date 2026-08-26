/* ===== CHAPTER 71 · DSA: Interview Wildcards ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 71, 'DSA: Interview Wildcards');

/* Problem 391 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q391 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 391 · MEDIUM</span>Next Permutation</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Dictionary Order</span><span class="pill">Suffix Pivot</span></div>
<p class="dropcap">Rearrange the number array into the NEXT lexicographic permutation. If none exists (fully descending), return the FIRST (ascending). Must be in-place, O(1) extra.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[1,2,3] → [1,3,2]
[3,2,1] → [1,2,3]
[1,1,5] → [1,5,1]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 100 · one pass + reverse suffix only</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Walk from the right until a[i] &lt; a[i+1] — the PIVOT. Swap it with the smallest tail value strictly bigger than it, then REVERSE everything right of the pivot spot.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public void nextPermutation(int[] a) {
    int i = a.length - 2;
    while (i &gt;= 0 &amp;&amp; a[i] &gt;= a[i + 1]) i--;   // find pivot
    if (i &gt;= 0) {
        int j = a.length - 1;
        while (a[j] &lt;= a[i]) j--;              // first bigger
        swap(a, i, j);
    }
    reverse(a, i + 1);                         // sort suffix
}
private void swap(int[] a, int x, int y) {
    int t = a[x]; a[x] = a[y]; a[y] = t;
}
private void reverse(int[] a, int from) {
    for (int l = from, r = a.length - 1; l &lt; r; l++, r--)
        swap(a, l, r);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[1, 5, 8, 4, 7, 6, 5, 3, 1]</code></p>
<table class="tbl">
<tr><th>step</th><th>detail</th><th>array</th></tr>
<tr><td>find pivot</td><td>a[4]=7? no…a[3]=4 &lt; a[4]=7 → pivot idx 3</td><td>suffix [7,6,5,3,1] is descending ✓</td></tr>
<tr><td>find successor</td><td>first-from-right with value &gt; 4: skip 3, 1 → a[6]=5 → j=6</td><td>swap 4 ↔ 5</td></tr>
<tr><td>after swap</td><td>head [1,5,8,<b>5</b>,7,6,<b>4</b>,3,1]</td><td>tail still descending</td></tr>
<tr><td>reverse tail</td><td>reverse positions 4..8</td><td>[1,5,8,5,1,3,4,6,7] ✓ next perm</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each scan moves monotonically. Space: O(1), fully in place.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>You're reading odometer-like name lists in dictionary order. The digits in the long DESCENDING tail are already at their last arrangement — nothing there can grow. So step left to the first digit that CAN grow (the pivot), trade it for the smallest available digit from that tail which is still bigger, and then re-sort the tail by simply flipping it (it's backwards!). If every digit is descending, the whole list flips to the smallest.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The descending suffix is MAXIMAL; swapping the pivot with its ceiling-successor keeps the head minimal-growth, and reversing the still-descending tail sorts it — three linear scans, zero sorting library.</div>`});

/* Problem 392 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q392 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 392 · HARD</span>Longest Valid Parentheses</h2>
<div class="pillrow"><span class="pill" style="--pc:#d62828">HARD</span><span class="pill">Index Stack + Fault Line</span><span class="pill">Distance to Barrier</span></div>
<p class="dropcap">A string contains only <code>(</code> and <code>)</code>. Return the length of the longest CONTIGUOUS well-formed substring.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"(()"    → 2   ("()")
")()())" → 4   ("()()")</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 ≤ n ≤ 3×10⁴ · single pass preferred</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Stack INDICES, not chars. Keep a sentinel "fault line" at the bottom; when a <code>)</code> matches, the valid stretch runs back to the index now on top.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int longestValidParentheses(String s) {
    Deque&lt;Integer&gt; st = new ArrayDeque&lt;&gt;();
    st.push(-1);                    // fault-line sentinel
    int best = 0;
    for (int i = 0; i &lt; s.length(); i++) {
        if (s.charAt(i) == '(') {
            st.push(i);
        } else {                    // closing bracket
            st.pop();               // consume its partner-or-barrier
            if (st.isEmpty())
                st.push(i);         // permanent break here
            else
                best = Math.max(best, i - st.peek());
        }
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>") ( ) ( ) )"</code> — stack shown bottom→top</p>
<table class="tbl">
<tr><th>i</th><th>char</th><th>stack after</th><th>best update</th></tr>
<tr><td>0</td><td>)</td><td>[0]</td><td>pop −1 → empty → barrier 0</td></tr>
<tr><td>1</td><td>(</td><td>[0, 1]</td><td>—</td></tr>
<tr><td>2</td><td>)</td><td>[0]</td><td>best = 2 − 0 = 2</td></tr>
<tr><td>3</td><td>(</td><td>[0, 3]</td><td>—</td></tr>
<tr><td>4</td><td>)</td><td>[0]</td><td>best = 4 − 0 = <b>4</b> ✓</td></tr>
<tr><td>5</td><td>)</td><td>[5]</td><td>pop barrier → new fault line 5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each index pushed/popped once. Space: O(n).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A bricklaying inspector walking along a half-built wall of brackets. Under his clipboard he keeps ONE sticky note marking the last CRACK in the wall. Every open bracket drops a pin; every close bracket removes the newest pin — and if any pins remain above the crack, the flawless section he just walked over measures exactly from the crack to the topmost surviving pin. An unmatched close bracket moves the crack itself.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Storing indices turns the stack into a measuring tape: valid length = current position MINUS whatever survived underneath — and the sentinel converts "no opener left" into a clean barrier case.</div>`});

/* Problem 393 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q393 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 393 · MEDIUM</span>Simplify Path</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Stack Resolution</span><span class="pill">Token Rules</span></div>
<p class="dropcap">Convert an absolute Unix-style <code>path</code> into its CANONICAL form: resolve <code>.</code> (stay), <code>..</code> (up one), and repeated slashes. It must start with a single slash and end without one.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>/home/            → /home
/../               → /
/home//foo/        → /home/foo
/a/./b/../../c/    → /c
/a/../../b/../c//.// → /c</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ path.length ≤ 3000 · valid chars: letters, digits, . _ /</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Split on <code>/</code>, then treat the folder stack as a directory walk: name → push, empty/dot → skip, dotdot → pop if possible.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public String simplifyPath(String path) {
    Deque&lt;String&gt; st = new ArrayDeque&lt;&gt;();
    for (String part : path.split("/")) {
        if (part.isEmpty() || part.equals(".")) continue;
        if (part.equals("..")) {
            if (!st.isEmpty()) st.pop();   // climb up
        } else {
            st.push(part);                 // descend into dir
        }
    }
    StringBuilder out = new StringBuilder();
    for (String dir : st) out.insert(0, "/" + dir);
    return out.length() == 0 ? "/" : out.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>/a/./b/../../c/</code></p>
<table class="tbl">
<tr><th>token</th><th>rule applied</th><th>stack (bottom→top)</th></tr>
<tr><td>"a"</td><td>push</td><td>[a]</td></tr>
<tr><td>"."</td><td>skip</td><td>[a]</td></tr>
<tr><td>"b"</td><td>push</td><td>[a, b]</td></tr>
<tr><td>".."</td><td>pop → b gone</td><td>[a]</td></tr>
<tr><td>".."</td><td>pop → a gone</td><td>[]</td></tr>
<tr><td>"c"</td><td>push</td><td>[c]</td></tr>
<tr><td colspan="3">rebuild → <b>/c</b> ✓ &nbsp;(empty stack would yield "/")</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n) for tokens and stack.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>You're giving turn-by-turn directions to someone walking down corridors: each name is "walk into room X", a single dot means "stand still", and a double dot means "back up one room" — but backing out of the front door just leaves you at the entrance, never above it. At the end you read the rooms visited from entrance inward to write the clean route.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The split-and-simulate pattern: canonicalisation is just filtering tokens through three rules; the stack IS the filesystem depth, and popping guards handle the root-overflow edge.</div>`});

/* Problem 394 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q394 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 394 · HARD</span>Remove Invalid Parentheses</h2>
<div class="pillrow"><span class="pill" style="--pc:#d62828">HARD</span><span class="pill">BFS by Deletions</span><span class="pill">Level = Answer Count</span></div>
<p class="dropcap">Delete the MINIMUM number of brackets so every remaining string is valid. Return ALL distinct results — there may be several.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>"()())()" → ["(())()", "()()()"]
"(a)())()" → ["(a())()", "(a)()()"]
")("       → [""]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ n ≤ 25 · letters stay untouched · answers deduplicated</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>BFS over DELETION COUNT: level 0 = original; each edge removes one bracket. The first level containing ANY valid string is the answer — everything valid on it, nothing deeper.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; removeInvalidParentheses(String s) {
    List&lt;String&gt; ans = new ArrayList&lt;&gt;();
    Set&lt;String&gt; seen = new HashSet&lt;&gt;(Set.of(s));
    Queue&lt;String&gt; q = new ArrayDeque&lt;&gt;(List.of(s));
    while (!q.isEmpty()) {
        boolean found = false;
        for (int sz = q.size(); sz &gt; 0; sz--) {
            String cur = q.poll();
            if (isValid(cur)) {
                ans.add(cur); found = true;
            }
            if (found) continue;          // deeper = worse
            for (int i = 0; i &lt; cur.length(); i++) {
                char c = cur.charAt(i);
                if (c != '(' &amp;&amp; c != ')') continue;
                String nxt = cur.substring(0, i)
                           + cur.substring(i + 1);
                if (seen.add(nxt)) q.offer(nxt);
            }
        }
        if (found) return ans;            // this level only
    }
    ans.add("");                          // delete everything
    return ans;
}
private boolean isValid(String t) {
    int open = 0;
    for (char c : t.toCharArray()) {
        if (c == '(') open++;
        else if (c == ')' &amp;&amp; --open &lt; 0) return false;
    }
    return open == 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"(a)())()"</code></p>
<table class="tbl">
<tr><th>level</th><th>queue contents</th><th>valid found?</th></tr>
<tr><td>0</td><td>(a)())()</td><td>no — extra ) at idx 5</td></tr>
<tr><td>1</td><td>one deletion per bracket spot, deduped (e.g. a)())(), (a())(), (a)()(), (a)))() …)</td><td>(a())() ✓ and (a)()() ✓ → STOP here</td></tr>
</table>
<p class="fs13">Answer: <code>["(a())()", "(a)()()"]</code> — each reached by deleting exactly one surplus <b>)</b> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Worst case exponential (n ≤ 25 keeps it bounded); BFS guarantees MINIMAL deletions. Space: O(level width).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A rescue operation by distance: ring zero is the broken fence as-is. Each ring outward removes exactly one plank somewhere. The moment any ring contains a fully sound fence, you stop — going deeper would only mean removing more planks than necessary. A guest register (the set) makes sure you never inspect the same fence design twice.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>BFS levels ARE the optimisation metric: "minimum deletions" becomes "first valid level". Dedup via a set of strings is what turns brute force into interview-acceptable.</div>`});

/* Problem 395 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q395 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 395 · MEDIUM</span>Random Pick with Weight</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Prefix Sums</span><span class="pill">Weighted Binary Search</span></div>
<p class="dropcap">Preprocess weights so <code>pickIndex()</code> returns index <code>i</code> with probability proportional to <code>w[i]</code>, in O(log n) per call.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>w = [1, 3]
pickIndex() ×100 ≈ 25× index 0 · 75× index 1
w = [1, 3, 2] → chances 1/6, 3/6, 2/6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>≤ 10⁴ calls · 1 ≤ w[i] ≤ 10⁵ · uniform randomness allowed</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Lay all tickets end-to-end: prefix sums mark SEGMENT boundaries. Draw one uniform ticket number, then binary-search which segment swallowed it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>class Solution {
    private final int[] pre;
    private final int total;
    private final Random rnd = new Random();

    public Solution(int[] w) {
        pre = new int[w.length];       // cumulative fence
        pre[0] = w[0];
        for (int i = 1; i &lt; w.length; i++)
            pre[i] = pre[i - 1] + w[i];
        total = pre[w.length - 1];
    }
    public int pickIndex() {
        int t = rnd.nextInt(total) + 1;   // ticket 1..total
        int lo = 0, hi = pre.length - 1;
        while (lo &lt; hi) {                 // first pre ≥ t
            int mid = (lo + hi) &gt;&gt;&gt; 1;
            if (pre[mid] &gt;= t) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>w = [1, 3]</code> → pre = [1, 4], total = 4</p>
<table class="tbl">
<tr><th>ticket t</th><th>segment test</th><th>picked</th><th>share</th></tr>
<tr><td>t = 1</td><td>pre[0]=1 ≥ 1</td><td>index 0</td><td rowspan="3">1/4 vs 3/4 ✓</td></tr>
<tr><td>t ∈ {2,3,4}</td><td>pre[0]=1 &lt; t ≤ pre[1]=4</td><td>index 1</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Constructor O(n); pickIndex O(log n). Space: O(n) for prefix sums.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A charity raffle: everyone buys DIFFERENT numbers of tickets, but the drum still draws one plain ticket fairly. Prefix sums staple everyone's tickets into one long strip — Alice owns tickets 1–1, Bob 2–4. Draw any number from 1 to total; whoever's stretch of the strip it lands on wins. Finding the owner fast = flipping to the middle of a phone book, not reading every name.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Cumulative fences convert WEIGHTS into WIDTHS: sampling becomes uniform-over-length, and "whose width?" is the classic lower-bound binary search.</div>`});

/* Problem 396 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q396 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 396 · MEDIUM</span>Fraction to Recurring Decimal</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Long Division</span><span class="pill">Remainder Memory</span></div>
<p class="dropcap">Render numerator ÷ denominator as a string. If the decimal REPEATS forever, wrap the repeating block in parentheses.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>1/2   → "0.5"
2/1   → "2"
2/3   → "0.(6)"
4/333 → "0.(012)"
-50/8 → "-6.25"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>−2³¹ ≤ num, den ≤ 2³¹−1 · den ≠ 0 — use longs internally</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Do school-style long division digit by digit. If a REMAINDER ever reappears, the digits from its first appearance onward will loop forever — bracket them.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public String fractionToDecimal(long num, long den) {
    if (num == 0) return "0";
    StringBuilder sb = new StringBuilder();
    if (num &lt; 0 ^ den &lt; 0) sb.append('-');
    num = Math.abs(num); den = Math.abs(den);
    sb.append(num / den);            // integer part
    long rem = num % den;
    if (rem == 0) return sb.toString();
    sb.append('.');
    Map&lt;Long, Integer&gt; seen = new HashMap&lt;&gt;();
    while (rem != 0) {
        if (seen.containsKey(rem)) {     // history repeats!
            sb.insert(seen.get(rem), "(").append(')');
            break;
        }
        seen.put(rem, sb.length());      // bookmark spot
        rem *= 10;
        sb.append(rem / den);            // next digit
        rem %= den;
    }
    return sb.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>4 / 333</code> — integer part "0.", remainder starts at 4</p>
<table class="tbl">
<tr><th>round</th><th>seen before?</th><th>digit = rem×10/333</th><th>sb / new rem</th></tr>
<tr><td>1</td><td>rem 4 — no → mark at pos 2</td><td>40/333 = 0</td><td>"0.0" · rem 40</td></tr>
<tr><td>2</td><td>rem 40 — no → mark pos 3</td><td>400/333 = 1</td><td>"0.01" · rem 67</td></tr>
<tr><td>3</td><td>rem 67 — no → mark pos 4</td><td>670/333 = 2</td><td>"0.012" · rem 4</td></tr>
<tr><td>4</td><td>rem 4 — YES at pos 2!</td><td>insert "(" at 2, add ")"</td><td><b>"0.(012)"</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(den) — remainders can only repeat after ≤ den rounds (pigeonhole). Space: O(den).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>It's the pencil-and-paper division you learned at school, plus a detective's notebook: each leftover amount gets a bookmark of WHEN it was first seen. Leftovers drive every future digit, so the instant one shows up twice, the whole dance between those visits plays on repeat forever — slam brackets around exactly that stretch and stop.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The remainder is the FULL STATE of long division — only finitely many exist, so repetition is inevitable and detectable. Sign handling via XOR and long arithmetic dodge overflow traps.</div>`});

/* Problem 397 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q397 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 397 · HARD</span>Reconstruct Itinerary</h2>
<div class="pillrow"><span class="pill" style="--pc:#d62828">HARD</span><span class="pill">Euler Path</span><span class="pill">Hierholzer + Min-Heap</span></div>
<p class="dropcap">Tickets are one-way pairs <code>[from, to]</code>. Starting at <code>"JFK"</code>, use EVERY ticket EXACTLY once and return the full itinerary — lexicographically smallest among valid ones.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],
 ["ATL","JFK"],["ATL","SFO"]]
→ ["JFK","ATL","JFK","SFO","ATL","SFO"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ tickets ≤ 300 · an Euler path is guaranteed to exist</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This is an Euler PATH. Greedily fly the alphabetically smallest destination; when stuck, PREPEND the current airport (postorder). Reversed postorder = the route.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public List&lt;String&gt; findItinerary(List&lt;List&lt;String&gt;&gt; ts) {
    Map&lt;String, PriorityQueue&lt;String&gt;&gt; g = new HashMap&lt;&gt;();
    for (List&lt;String&gt; t : ts)
        g.computeIfAbsent(t.get(0),
            k -&gt; new PriorityQueue&lt;&gt;()).add(t.get(1));
    LinkedList&lt;String&gt; route = new LinkedList&lt;&gt;();
    dfs("JFK", g, route);
    return route;
}
private void dfs(String ap, Map&lt;String, PriorityQueue&lt;String&gt;&gt; g,
                 LinkedList&lt;String&gt; route) {
    PriorityQueue&lt;String&gt; out = g.get(ap);
    while (out != null &amp;&amp; !out.isEmpty())   // burn tickets
        dfs(out.poll(), g, route);
    route.addFirst(ap);                     // postorder prepend
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Flights above — PQs after build: JFK{ATL,SFO} · ATL{JFK,SFO} · SFO{ATL}</p>
<table class="tbl">
<tr><th>call chain</th><th>ticket burned</th><th>prepend → route</th></tr>
<tr><td>JFK→ATL→JFK→SFO→ATL→SFO</td><td>all five, greedily smallest-first</td><td>SFO finishes first</td></tr>
<tr><td>unwind (postorder)</td><td>—</td><td>SFO · then ATL · SFO · JFK · ATL · JFK</td></tr>
<tr><td colspan="3">final read: <b>JFK, ATL, JFK, SFO, ATL, SFO</b> ✓ every ticket once</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(E log E) — heap pops dominate. Space: O(E).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A compulsively tidy traveller always boards the alphabetically cheapest flight out of town. Sometimes that greed strands her somewhere with no way onward — so she writes her current city on a sticky note and piles it up, walking back down her memory until some earlier stop still has an unused ticket. When everything's spent, she peels the sticky notes off the pile BOTTOM-FIRST: that reading is the complete round trip.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Hierholzer's trick converts a naive "try all orders" into linear-ish work: dead ends are recorded lazily in postorder and REVERSED, which magically splices side-trips back into the main route.</div>`});

/* Problem 398 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q398 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 398 · HARD</span>Bus Routes</h2>
<div class="pillrow"><span class="pill" style="--pc:#d62828">HARD</span><span class="pill">BFS on ROUTES</span><span class="pill">Reframed Nodes</span></div>
<p class="dropcap">Routes are stop arrays (each bus loops its route forever). Find the MINIMUM number of BUSES boarded to travel from <code>source</code> to <code>target</code>. Impossible → −1.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>routes = [[1,2,7],[3,6,7]], source=1, target=6
→ 2   (bus 1 from 1→7, transfer, bus 2 7→6)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 ≤ routes.length ≤ 500 · stops ≤ 10⁵ distinct — stop-graph BFS would blow up</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>The NODES are buses, not stops! Boarding a route = visiting a node; you can leave at ANY of its stops. Map each stop → routes serving it for O(1) transfers.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>public int numBusesToDestination(int[][] routes,
                                 int src, int dst) {
    if (src == dst) return 0;
    Map&lt;Integer, List&lt;Integer&gt;&gt; stop2bus = new HashMap&lt;&gt;();
    for (int b = 0; b &lt; routes.length; b++)
        for (int s : routes[b])
            stop2bus.computeIfAbsent(s,
                k -&gt; new ArrayList&lt;&gt;()).add(b);
    Queue&lt;Integer&gt; q = new ArrayDeque&lt;&gt;();
    Set&lt;Integer&gt; ridden = new HashSet&lt;&gt;();
    q.offer(src);                       // BFS over stops…
    int buses = 0;
    while (!q.isEmpty()) {
        buses++;                        // …but pay per BUS
        for (int sz = q.size(); sz &gt; 0; sz--) {
            int stop = q.poll();
            for (int b : stop2bus.getOrDefault(stop,
                                              List.of())) {
                if (!ridden.add(b)) continue;
                for (int next : routes[b]) {
                    if (next == dst) return buses;
                    q.offer(next);
                }
            }
        }
    }
    return -1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<table class="tbl">
<tr><th>wave</th><th>buses boarded</th><th>frontier after</th></tr>
<tr><td>1</td><td>bus 0 (serves stop 1) — all its stops queued {2,7}</td><td>{2,7}</td></tr>
<tr><td>2</td><td>stop 7 → bus 1 — all its stops {3,6,<b>target!</b>}</td><td>return <b>2</b> ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(total stops × avg routes/stop) ≈ linear in input. Space: same.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>You don't count every street corner — you count VEHICLES. Think of each bus line as one big moving room: once aboard, you may hop off at any door it passes. So explore rooms layer by layer: which lines can I catch where I stand, then which new lines do THOSE deliver me to? The first wave that delivers your destination tells how many fares you paid. Marking a line as 'already rode' stops you re-boarding the same room forever.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Choosing the right STATE is everything: stop-level edges explode, but "routes as nodes + stop-to-line index" collapses the graph — the answer counts boardings, so measure in boardings.</div>`});

/* Problem 399 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q399 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 399 · HARD</span>Longest Increasing Path in a Matrix</h2>
<div class="pillrow"><span class="pill" style="--pc:#d62828">HARD</span><span class="pill">DFS + Memoisation</span><span class="pill">Implicit DAG</span></div>
<p class="dropcap">Move up/down/left/right to STRICTLY larger values. Return the length of the longest such path (cells counted, may start anywhere).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>[[9,9,4]
 [6,6,8]   → 4   (path 1 → 2 → 6 → 9)
 [2,1,1]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m,n ≤ 200 · values ≤ 2³¹−1 · strictness forbids revisits</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>"Strictly increasing" makes moves one-way — the grid IS a DAG. Memoise each cell's best run; answer = max over all cells. No visited set needed.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>private static final int[][] D =
    {{1,0},{-1,0},{0,1},{0,-1}};

public int longestIncreasingPath(int[][] m) {
    int best = 0;
    Integer[][] memo = new Integer[m.length][m[0].length];
    for (int r = 0; r &lt; m.length; r++)
        for (int c = 0; c &lt; m[0].length; c++)
            best = Math.max(best, dfs(m, memo, r, c));
    return best;
}
private int dfs(int[][] m, Integer[][] memo, int r, int c) {
    if (memo[r][c] != null) return memo[r][c]; // cached run
    int best = 1;                              // cell itself
    for (int[] d : D) {
        int nr = r + d[0], nc = c + d[1];
        if (nr &gt;= 0 &amp;&amp; nr &lt; m.length &amp;&amp; nc &gt;= 0
            &amp;&amp; nc &lt; m[0].length &amp;&amp; m[nr][nc] &gt; m[r][c])
            best = Math.max(best, 1 + dfs(m, memo, nr, nc));
    }
    return memo[r][c] = best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Grid: [[9,9,4],[6,6,8],[2,1,1]] — probing cell (2,1)=1</p>
<table class="tbl">
<tr><th>cell</th><th>larger neighbours</th><th>memo value</th></tr>
<tr><td>(2,1)=1</td><td>up (1,1)? 6&gt;1 ✓ → needs its own…</td><td>pending</td></tr>
<tr><td>(1,1)=6</td><td>up (0,1)=9 ✓ · right (1,2)=8 ✓</td><td>—</td></tr>
<tr><td>(0,1)=9 / (1,2)=8</td><td>no larger neighbour</td><td>1 · 1</td></tr>
<tr><td>(1,1)=6 resolves</td><td>max(1+1, 1+1)</td><td>2</td></tr>
<tr><td>(2,0)=2</td><td>up (1,0)=6 ✓</td><td>1 + memo(1,0)=2 → 3</td></tr>
<tr><td>(2,1)=1 resolves</td><td>left (2,0)=2 → 1+3 = <b>4</b> · up (1,1)=6 → 1+2 = 3</td><td>4 — global best ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — each cell's DFS computed once, cached forever. Space: O(m·n) memo + recursion depth.</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>A mountain-hopping surveyor asks every plateau: "longest ever-upward trek STARTING here?" Each answer is written on a signpost (the memo). Because you can only climb HIGHER, you can never loop back to your own footsteps — so answers never go stale and every signpost is painted exactly once. The park's best trek is the proudest signpost of all.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Strict monotonicity ⇒ acyclicity: the DAG property replaces a visited array entirely. Memo-on-return turns exponential re-exploration into two linear passes per cell.</div>`});

/* Problem 400 */
B.spread(
{ kicker: 'DSA · INTERVIEW WILDCARDS', head: 'Q400 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 400 · HARD</span>Integer to English Words <span style="font-size:.55em;letter-spacing:.12em">★ THE FINALE</span></h2>
<div class="pillrow"><span class="pill" style="--pc:#d62828">HARD</span><span class="pill">Triplet Chopping</span><span class="pill">Edge-Case Gauntlet</span></div>
<p class="dropcap">Convert a non-negative integer under 2³¹ into ENGLISH WORDS — spaces exact, no trailing junk, zero handled specially.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>123       → "One Hundred Twenty Three"
12345     → "Twelve Thousand Three Hundred Forty Five"
1234567   → "One Million Two Hundred Thirty Four
             Thousand Five Hundred Sixty Seven"
1000010   → "One Million Ten"
0         → "Zero"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 ≤ num ≤ 2³¹−1 · no leading/trailing spaces · correct hyphen-free style</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Read it like COMMAS: chop triplets from the right. Each triplet speaks the same tiny grammar (X Hundred Y-tens Z); only its SURNAME changes — Thousand, Million, Billion. Empty triplets stay silent.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<pre class="code" data-lang="java"><code>private static final String[] BELOW = {"",
    "One","Two","Three","Four","Five","Six","Seven",
    "Eight","Nine","Ten","Eleven","Twelve","Thirteen",
    "Fourteen","Fifteen","Sixteen","Seventeen",
    "Eighteen","Nineteen"};
private static final String[] TENS = {"","", "Twenty",
    "Thirty","Forty","Fifty","Sixty","Seventy",
    "Eighty","Ninety"};

public String numberToWords(int num) {
    if (num == 0) return "Zero";
    String[] surnames = {"", "Thousand", "Million", "Billion"};
    String out = "";
    int tier = 0;
    while (num &gt; 0) {
        int chunk = num % 1000;
        if (chunk &gt; 0) {                       // silent empties
            String piece = three(chunk);
            if (!surnames[tier].isEmpty())
                piece += " " + surnames[tier];
            out = out.isEmpty() ? piece
                                : piece + " " + out;
        }
        num /= 1000; tier++;
    }
    return out;
}
private String three(int n) {
    List&lt;String&gt; p = new ArrayList&lt;&gt;();
    if (n &gt;= 100) {
        p.add(BELOW[n / 100]); p.add("Hundred");
        n %= 100;
    }
    if (n &gt;= 20) { p.add(TENS[n / 10]); n %= 10; }
    if (n &gt; 0)   p.add(BELOW[n]);
    return String.join(" ", p);
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>1,234,567</code> → chunks 567 · 234 · 1</p>
<table class="tbl">
<tr><th>tier</th><th>chunk</th><th>three(chunk)</th><th>surname</th><th>out after prepend</th></tr>
<tr><td>0</td><td>567</td><td>Five Hundred Sixty Seven</td><td>—</td><td>Five Hundred Sixty Seven</td></tr>
<tr><td>1</td><td>234</td><td>Two Hundred Thirty Four</td><td>Thousand</td><td>… Thousand Five Hundred … ✓</td></tr>
<tr><td>2</td><td>1</td><td>One</td><td>Million</td><td><b>One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven</b></td></tr>
<tr><td colspan="5">edge: 1000010 → chunk 010 = 10 speaks "Ten" (not "Zero Ten"); chunk 000 stays SILENT ✓</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) — at most 4 tiers of fixed work. Space: O(1).</div>
<div class="callout note"><span class="ct">🧒 In Plain Words</span>You already speak this algorithm — it's how commas are read aloud! Slice the digits into groups of three from the right; each group gets recited with the same nursery rhyme ("hundreds word, tens word, little word") and then stamped with its family name — thousand, million, billion. A completely blank group simply isn't spoken, which is why a million and ten never mumble about their empty thousands.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The triplet grammar is closed under recursion: mastering just [below-20, tens, hundred] plus FOUR surnames covers every 32-bit integer. The whole problem is edge-case hygiene — Zero, silent tiers, and exact spacing.</div>`});
})();