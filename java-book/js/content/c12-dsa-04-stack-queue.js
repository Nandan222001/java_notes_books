/* ===== CHAPTER 35 · DSA: Stack & Queue ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 35, 'DSA: Stack & Queue');

/* Problem 001 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q001 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 001 · EASY</span>Valid Parentheses</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Stack</span><span class="pill">String</span></div>
<p class="dropcap">Given a string <code>s</code> containing just the characters <code>()[]{}</code>, determine if the input string is valid — every opening bracket is closed by the same type of bracket, in the correct order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "{[()]}"
Output: true
Explanation: every bracket closes its most recent matching opener</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 10⁴</li><li>s consists only of bracket characters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A stack naturally models "most recently opened, must close first" — that's exactly LIFO order.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Push every opening bracket. On a closing bracket, pop and check it matches; a mismatch or empty stack means invalid. At the end, the stack must be empty.</p>
<pre class="code" data-lang="java"><code>public boolean isValid(String s) {
    Deque&lt;Character&gt; st = new ArrayDeque&lt;&gt;();
    Map&lt;Character, Character&gt; pairs = Map.of(')', '(', ']', '[', '}', '{');
    for (char c : s.toCharArray()) {
        if (pairs.containsValue(c)) st.push(c);
        else {
            if (st.isEmpty() || st.pop() != pairs.get(c)) return false;
        }
    }
    return st.isEmpty();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "{[()]}"</code></p>
<table class="tbl">
<tr><th>char</th><th>action</th><th>stack after</th></tr>
<tr><td>{</td><td>push</td><td>[ { ]</td></tr>
<tr><td>[</td><td>push</td><td>[ {, [ ]</td></tr>
<tr><td>(</td><td>push</td><td>[ {, [, ( ]</td></tr>
<tr><td>)</td><td>pop '(' matches</td><td>[ {, [ ]</td></tr>
<tr><td>]</td><td>pop '[' matches</td><td>[ { ]</td></tr>
<tr><td>}</td><td>pop '{' matches</td><td>[ ] → empty → true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n) worst case (all openers).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Most recent unmatched thing must resolve first" is the signature of a stack problem.</div>`});

/* Problem 002 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q002 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 002 · MEDIUM</span>Min Stack</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Stack</span><span class="pill">Design</span></div>
<p class="dropcap">Design a stack that supports <code>push</code>, <code>pop</code>, <code>top</code>, and retrieving the minimum element — all in O(1) time.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>MinStack st = new MinStack();
st.push(-2); st.push(0); st.push(-3);
st.getMin(); // -3
st.pop();
st.top();    // 0
st.getMin(); // -2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>-2³¹ &lt;= val &lt;= 2³¹ - 1</li><li>Methods called are always valid on a non-empty stack</li><li>At most 3 * 10⁴ calls total</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep a second stack that always mirrors "the minimum seen so far at this depth" alongside the main one.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain two stacks: the data stack, and a min-stack where each push stores the minimum between the new value and the current top-of-min. Popping both together keeps them perfectly in sync, so <code>getMin()</code> is just peeking the min-stack.</p>
<pre class="code" data-lang="java"><code>class MinStack {
    private Deque&lt;Integer&gt; data = new ArrayDeque&lt;&gt;();
    private Deque&lt;Integer&gt; min = new ArrayDeque&lt;&gt;();
    public void push(int val) {
        data.push(val);
        min.push(min.isEmpty() ? val : Math.min(val, min.peek()));
    }
    public void pop() { data.pop(); min.pop(); }
    public int top() { return data.peek(); }
    public int getMin() { return min.peek(); }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Ops: push(-2), push(0), push(-3), getMin, pop, top, getMin</p>
<table class="tbl">
<tr><th>op</th><th>data stack</th><th>min stack</th><th>result</th></tr>
<tr><td>push(-2)</td><td>[ -2 ]</td><td>[ -2 ]</td><td>-</td></tr>
<tr><td>push(0)</td><td>[ -2, 0 ]</td><td>[ -2, -2 ]</td><td>-</td></tr>
<tr><td>push(-3)</td><td>[ -2, 0, -3 ]</td><td>[ -2, -2, -3 ]</td><td>-</td></tr>
<tr><td>getMin()</td><td>[ -2, 0, -3 ]</td><td>[ -2, -2, -3 ]</td><td>-3</td></tr>
<tr><td>pop()</td><td>[ -2, 0 ]</td><td>[ -2, -2 ]</td><td>-</td></tr>
<tr><td>top()</td><td>[ -2, 0 ]</td><td>[ -2, -2 ]</td><td>0</td></tr>
<tr><td>getMin()</td><td>[ -2, 0 ]</td><td>[ -2, -2 ]</td><td>-2</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) for every operation. Space: O(n) for the auxiliary min-stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Track a running invariant per-frame (not globally) so popping never loses history — a shadow stack fixes it.</div>`});

/* Problem 003 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q003 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 003 · MEDIUM</span>Evaluate Reverse Polish Notation</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Stack</span><span class="pill">Math</span></div>
<p class="dropcap">Evaluate an arithmetic expression given in Reverse Polish Notation (postfix). Valid operators are <code>+ - * /</code>; division between two integers truncates toward zero.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= tokens.length &lt;= 10⁴</li><li>tokens is either an operator or an integer literal</li><li>the expression is always valid</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Postfix expressions evaluate left-to-right with a stack: numbers get pushed, operators pop two operands and push the result.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Scan tokens left to right. Push numbers. On an operator, pop the top two values (b then a, so order is a op b), compute, and push the result back. The final and only stack value is the answer.</p>
<pre class="code" data-lang="java"><code>public int evalRPN(String[] tokens) {
    Deque&lt;Integer&gt; st = new ArrayDeque&lt;&gt;();
    for (String t : tokens) {
        switch (t) {
            case "+": { int b = st.pop(), a = st.pop(); st.push(a + b); break; }
            case "-": { int b = st.pop(), a = st.pop(); st.push(a - b); break; }
            case "*": { int b = st.pop(), a = st.pop(); st.push(a * b); break; }
            case "/": { int b = st.pop(), a = st.pop(); st.push(a / b); break; }
            default:  st.push(Integer.parseInt(t));
        }
    }
    return st.pop();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>["2","1","+","3","*"]</code></p>
<table class="tbl">
<tr><th>token</th><th>action</th><th>stack after</th></tr>
<tr><td>2</td><td>push</td><td>[ 2 ]</td></tr>
<tr><td>1</td><td>push</td><td>[ 2, 1 ]</td></tr>
<tr><td>+</td><td>pop 1, pop 2 → push 3</td><td>[ 3 ]</td></tr>
<tr><td>3</td><td>push</td><td>[ 3, 3 ]</td></tr>
<tr><td>*</td><td>pop 3, pop 3 → push 9</td><td>[ 9 ] → return 9</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n) worst case for the operand stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Postfix notation is stack-native — no parentheses or precedence rules needed since order is already encoded.</div>`});

/* Problem 004 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q004 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 004 · MEDIUM</span>Daily Temperatures</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Monotonic Stack</span><span class="pill">Array</span></div>
<p class="dropcap">Given an array <code>temperatures</code>, return an array <code>answer</code> where <code>answer[i]</code> is the number of days you'd have to wait after day <code>i</code> to get a warmer temperature. If there is no future warmer day, <code>answer[i] = 0</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= temperatures.length &lt;= 10⁵</li><li>30 &lt;= temperatures[i] &lt;= 100</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Keep a stack of indices whose warmer day hasn't been found yet — a decreasing-temperature stack.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain a stack of indices with temperatures in decreasing order. For each new day, while the current temperature beats the temperature at the stack's top index, pop it and record the day-gap. Push the current index at the end regardless.</p>
<pre class="code" data-lang="java"><code>public int[] dailyTemperatures(int[] temps) {
    int n = temps.length;
    int[] ans = new int[n];
    Deque&lt;Integer&gt; st = new ArrayDeque&lt;&gt;(); // indices, decreasing temps
    for (int i = 0; i &lt; n; i++) {
        while (!st.isEmpty() &amp;&amp; temps[i] &gt; temps[st.peek()]) {
            int j = st.pop();
            ans[j] = i - j;
        }
        st.push(i);
    }
    return ans;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[73,74,75,71,69,72,76,73]</code> (indices 0..7)</p>
<table class="tbl">
<tr><th>i (temp)</th><th>action</th><th>stack after (indices)</th></tr>
<tr><td>0 (73)</td><td>push 0</td><td>[ 0 ]</td></tr>
<tr><td>1 (74)</td><td>pop 0 → ans[0]=1; push 1</td><td>[ 1 ]</td></tr>
<tr><td>2 (75)</td><td>pop 1 → ans[1]=1; push 2</td><td>[ 2 ]</td></tr>
<tr><td>3 (71)</td><td>push 3</td><td>[ 2, 3 ]</td></tr>
<tr><td>4 (69)</td><td>push 4</td><td>[ 2, 3, 4 ]</td></tr>
<tr><td>5 (72)</td><td>pop 4→ans[4]=1, pop 3→ans[3]=2; push 5</td><td>[ 2, 5 ]</td></tr>
<tr><td>6 (76)</td><td>pop 5→ans[5]=1, pop 2→ans[2]=4; push 6</td><td>[ 6 ]</td></tr>
<tr><td>7 (73)</td><td>push 7 (76 &gt; 73, no pop)</td><td>[ 6, 7 ] → ans=[1,1,4,2,1,1,0,0]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each index is pushed and popped at most once. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Next greater element" pattern: a monotonic decreasing stack resolves every element's answer exactly once, amortized O(1) per element.</div>`});

/* Problem 005 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q005 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 005 · MEDIUM</span>Next Greater Element I</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Monotonic Stack</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Given two arrays <code>nums1</code> and <code>nums2</code> (distinct elements, <code>nums1</code> is a subset of <code>nums2</code>), for each element of <code>nums1</code> find the next greater element to its right in <code>nums2</code>. If none exists, output -1.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: 4 has no greater to its right; 1's next greater is 3; 2 has none</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums1.length &lt;= nums2.length &lt;= 1000</li><li>all integers in both arrays are distinct</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Precompute "next greater" for every element of nums2 once with a monotonic stack, then just look values up for nums1.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Scan <code>nums2</code> left to right with a stack holding values that are still waiting for their next greater element. Whenever the current value exceeds the stack's top, that top has found its answer — pop it and map it. Unresolved values map to -1. Then answer <code>nums1</code> via lookups.</p>
<pre class="code" data-lang="java"><code>public int[] nextGreaterElement(int[] nums1, int[] nums2) {
    Map&lt;Integer, Integer&gt; nge = new HashMap&lt;&gt;();
    Deque&lt;Integer&gt; st = new ArrayDeque&lt;&gt;();
    for (int x : nums2) {
        while (!st.isEmpty() &amp;&amp; x &gt; st.peek()) nge.put(st.pop(), x);
        st.push(x);
    }
    while (!st.isEmpty()) nge.put(st.pop(), -1);
    int[] ans = new int[nums1.length];
    for (int i = 0; i &lt; nums1.length; i++) ans[i] = nge.get(nums1[i]);
    return ans;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums2 = [1,3,4,2]</code></p>
<table class="tbl">
<tr><th>x</th><th>action</th><th>stack after</th><th>map so far</th></tr>
<tr><td>1</td><td>push</td><td>[ 1 ]</td><td>{}</td></tr>
<tr><td>3</td><td>pop 1 → nge[1]=3; push 3</td><td>[ 3 ]</td><td>{1:3}</td></tr>
<tr><td>4</td><td>pop 3 → nge[3]=4; push 4</td><td>[ 4 ]</td><td>{1:3, 3:4}</td></tr>
<tr><td>2</td><td>2 &lt; 4, no pop; push 2</td><td>[ 4, 2 ]</td><td>{1:3, 3:4}</td></tr>
<tr><td>end</td><td>drain stack → -1</td><td>[ ]</td><td>{1:3, 3:4, 4:-1, 2:-1}</td></tr>
</table>
<p class="fs13">Lookup for <code>nums1 = [4,1,2]</code> → <code>[-1, 3, -1]</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n + m). Space: O(n) for the map and stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Decouple "compute once for all elements" (monotonic stack over nums2) from "answer queries" (hash lookup) — avoids recomputation per nums1 element.</div>`});

/* Problem 006 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q006 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 006 · HARD</span>Largest Rectangle in Histogram</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Monotonic Stack</span><span class="pill">Array</span></div>
<p class="dropcap">Given an array <code>heights</code> representing histogram bar heights where each bar has width 1, find the area of the largest rectangle that fits entirely within the histogram.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: rectangle spans indices 2..3 (heights 5,6), width 2, min height 5 → 10</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= heights.length &lt;= 10⁵</li><li>0 &lt;= heights[i] &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>For each bar, its max rectangle extends until the first shorter bar on each side. A monotonic increasing stack finds both boundaries in one pass.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep a stack of indices with increasing heights. When a shorter bar appears, pop the top — its rectangle's right boundary is the current index, and its left boundary is the new stack top (or -1 if empty). Track the max area found. Append a sentinel 0 to flush the stack at the end.</p>
<pre class="code" data-lang="java"><code>public int largestRectangleArea(int[] heights) {
    Deque&lt;Integer&gt; st = new ArrayDeque&lt;&gt;(); // indices, increasing heights
    int n = heights.length, max = 0;
    for (int i = 0; i &lt;= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.isEmpty() &amp;&amp; heights[st.peek()] &gt;= h) {
            int height = heights[st.pop()];
            int width = st.isEmpty() ? i : i - st.peek() - 1;
            max = Math.max(max, height * width);
        }
        st.push(i);
    }
    return max;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[2,1,5,6,2,3]</code> (sentinel 0 appended at i=6)</p>
<table class="tbl">
<tr><th>i (h)</th><th>action</th><th>stack after (indices)</th><th>max</th></tr>
<tr><td>0 (2)</td><td>push 0</td><td>[ 0 ]</td><td>0</td></tr>
<tr><td>1 (1)</td><td>pop 0: h=2,w=1→2; push 1</td><td>[ 1 ]</td><td>2</td></tr>
<tr><td>2 (5)</td><td>push 2</td><td>[ 1, 2 ]</td><td>2</td></tr>
<tr><td>3 (6)</td><td>push 3</td><td>[ 1, 2, 3 ]</td><td>2</td></tr>
<tr><td>4 (2)</td><td>pop 3: h=6,w=1→6; pop 2: h=5,w=2→10; push 4</td><td>[ 1, 4 ]</td><td>10</td></tr>
<tr><td>5 (3)</td><td>push 5</td><td>[ 1, 4, 5 ]</td><td>10</td></tr>
<tr><td>6 (0)</td><td>pop 5: h=3,w=1→3; pop 4: h=2,w=4→8; pop 1: h=1,w=6→6</td><td>[ ] → push 6</td><td>10</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each index pushed/popped once. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Width = distance to the nearest shorter bar on each side" turns a seemingly O(n²) problem into one monotonic-stack pass.</div>`});

/* Problem 007 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q007 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 007 · EASY</span>Implement Queue using Stacks</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Stack</span><span class="pill">Queue</span><span class="pill">Design</span></div>
<p class="dropcap">Implement a FIFO queue using only two stacks. Support <code>push(x)</code>, <code>pop()</code>, <code>peek()</code>, and <code>empty()</code> using standard stack operations.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>MyQueue q = new MyQueue();
q.push(1); q.push(2);
q.peek(); // 1
q.pop();  // 1
q.empty(); // false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= x &lt;= 9</li><li>at most 100 calls to push, pop, peek, empty</li><li>pop and peek are only called on non-empty queues</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Reversing a stack's order twice restores FIFO order — pour "in" into "out" only when "out" runs dry.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Use two stacks: <code>in</code> for pushes, <code>out</code> for pops/peeks. Pushing always goes to <code>in</code>. When <code>out</code> is empty and a pop/peek is requested, dump all of <code>in</code> into <code>out</code> — this reverses order once, turning LIFO into FIFO. Amortized O(1) since each element is moved at most twice total.</p>
<pre class="code" data-lang="java"><code>class MyQueue {
    private Deque&lt;Integer&gt; in = new ArrayDeque&lt;&gt;();
    private Deque&lt;Integer&gt; out = new ArrayDeque&lt;&gt;();
    public void push(int x) { in.push(x); }
    public int pop() { peek(); return out.pop(); }
    public int peek() {
        if (out.isEmpty()) while (!in.isEmpty()) out.push(in.pop());
        return out.peek();
    }
    public boolean empty() { return in.isEmpty() &amp;&amp; out.isEmpty(); }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Ops: push(1), push(2), peek, pop, push(3), pop</p>
<table class="tbl">
<tr><th>op</th><th>in</th><th>out</th><th>result</th></tr>
<tr><td>push(1)</td><td>[ 1 ]</td><td>[ ]</td><td>-</td></tr>
<tr><td>push(2)</td><td>[ 1, 2 ]</td><td>[ ]</td><td>-</td></tr>
<tr><td>peek()</td><td>[ ]</td><td>[ 1, 2 ] (reversed)</td><td>1</td></tr>
<tr><td>pop()</td><td>[ ]</td><td>[ 2 ]</td><td>1</td></tr>
<tr><td>push(3)</td><td>[ 3 ]</td><td>[ 2 ]</td><td>-</td></tr>
<tr><td>pop()</td><td>[ 3 ]</td><td>[ ]</td><td>2</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) amortized per op (each element moves in→out at most once). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Two stacks = one reversal = FIFO. Only refill <code>out</code> when it's empty, never eagerly — that's what makes it amortized O(1) instead of O(n) every time.</div>`});

/* Problem 008 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q008 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 008 · MEDIUM</span>Asteroid Collision</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Stack</span><span class="pill">Simulation</span></div>
<p class="dropcap">Given an array <code>asteroids</code> where the sign indicates direction (positive = right, negative = left) and magnitude = size, simulate collisions: two asteroids moving toward each other collide, the smaller explodes, equal sizes both explode. Return the state after all collisions.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: 10 and -5 collide, -5 explodes (10 survives, unaffected by 5)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 &lt;= asteroids.length &lt;= 10⁴</li><li>-1000 &lt;= asteroids[i] &lt;= 1000</li><li>asteroids[i] != 0</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A collision only happens when a right-moving asteroid on the stack meets an incoming left-moving one — model surviving right-movers with a stack.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Push each asteroid unless it collides. A collision only occurs when the current asteroid moves left (negative) while the stack top moves right (positive). Resolve by popping smaller right-movers; if magnitudes are equal both are destroyed; if the stack top is bigger, the current asteroid is destroyed and nothing is pushed.</p>
<pre class="code" data-lang="java"><code>public int[] asteroidCollision(int[] asteroids) {
    Deque&lt;Integer&gt; st = new ArrayDeque&lt;&gt;();
    for (int a : asteroids) {
        boolean alive = true;
        while (alive &amp;&amp; a &lt; 0 &amp;&amp; !st.isEmpty() &amp;&amp; st.peek() &gt; 0) {
            int top = st.peek();
            if (top &lt; -a) { st.pop(); }               // top explodes, a survives, keep checking
            else if (top == -a) { st.pop(); alive = false; } // both explode
            else { alive = false; }                     // a explodes
        }
        if (alive) st.push(a);
    }
    int[] res = new int[st.size()];
    for (int i = res.length - 1; i &gt;= 0; i--) res[i] = st.pop();
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>[5, 10, -5]</code></p>
<table class="tbl">
<tr><th>asteroid</th><th>action</th><th>stack after</th></tr>
<tr><td>5</td><td>stack empty or top negative → push</td><td>[ 5 ]</td></tr>
<tr><td>10</td><td>top 5 &gt; 0 but current 10 &gt; 0 (not opposing) → push</td><td>[ 5, 10 ]</td></tr>
<tr><td>-5</td><td>top=10 &gt; 5=-a → top survives, -5 explodes (alive=false)</td><td>[ 5, 10 ]</td></tr>
</table>
<p class="fs13">Final stack bottom→top = <code>[5, 10]</code> → output <code>[5, 10]</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each asteroid pushed and popped at most once. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Only "right-then-left" adjacency can collide; a stack of survivors moving right is exactly what a left-mover needs to check against.</div>`});

/* Problem 009 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q009 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 009 · MEDIUM</span>Decode String</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Stack</span><span class="pill">String</span><span class="pill">Recursion</span></div>
<p class="dropcap">Given an encoded string in the form <code>k[encoded_string]</code> — meaning the <code>encoded_string</code> inside brackets is repeated <code>k</code> times — return the fully decoded string. Encodings can be nested.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "3[a2[c]]"
Output: "accaccacc"
Explanation: 2[c] = "cc" → a+"cc" = "acc" → 3["acc"] = "accaccacc"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 30</li><li>s is a valid encoding, k is a positive integer</li><li>input contains no extra whitespace, digits only for repeat counts</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every <code>[</code> starts a new nested "scope" whose result eventually gets multiplied and appended to the scope enclosing it — push/pop scopes with a stack.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Walk the string maintaining a current number and current built string. On <code>[</code>, push the current string and number onto stacks, then reset both for the nested scope. On <code>]</code>, pop the enclosing string and repeat count, and append <code>count</code> copies of the just-finished inner string to it.</p>
<pre class="code" data-lang="java"><code>public String decodeString(String s) {
    Deque&lt;Integer&gt; counts = new ArrayDeque&lt;&gt;();
    Deque&lt;StringBuilder&gt; strs = new ArrayDeque&lt;&gt;();
    StringBuilder cur = new StringBuilder();
    int num = 0;
    for (char c : s.toCharArray()) {
        if (Character.isDigit(c)) num = num * 10 + (c - '0');
        else if (c == '[') {
            counts.push(num); strs.push(cur);
            num = 0; cur = new StringBuilder();
        } else if (c == ']') {
            StringBuilder prev = strs.pop();
            int k = counts.pop();
            for (int i = 0; i &lt; k; i++) prev.append(cur);
            cur = prev;
        } else cur.append(c);
    }
    return cur.toString();
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"3[a2[c]]"</code></p>
<table class="tbl">
<tr><th>char</th><th>action</th><th>cur / stacks after</th></tr>
<tr><td>3</td><td>num=3</td><td>cur="", num=3</td></tr>
<tr><td>[</td><td>push(3,""); reset</td><td>counts=[3], strs=[""], cur=""</td></tr>
<tr><td>a</td><td>append</td><td>cur="a"</td></tr>
<tr><td>2</td><td>num=2</td><td>cur="a", num=2</td></tr>
<tr><td>[</td><td>push(2,"a"); reset</td><td>counts=[3,2], strs=["","a"], cur=""</td></tr>
<tr><td>c</td><td>append</td><td>cur="c"</td></tr>
<tr><td>]</td><td>pop("a",2) → "a"+"c"*2</td><td>cur="acc"; counts=[3], strs=[""]</td></tr>
<tr><td>]</td><td>pop("",3) → ""+"acc"*3</td><td>cur="accaccacc"; stacks empty</td></tr>
</table>
<p class="fs13">Return <code>"accaccacc"</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · maxK) for building the output. Space: O(n) for the stacks and result.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Nested brackets are a call-stack in disguise — every <code>[</code> is "save context, recurse"; every <code>]</code> is "return and merge into caller".</div>`});

/* Problem 010 */
B.spread(
{ kicker: 'DSA · STACK & QUEUE', head: 'Q010 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 010 · MEDIUM</span>Basic Calculator II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Stack</span><span class="pill">String</span><span class="pill">Math</span></div>
<p class="dropcap">Evaluate a simple expression string containing non-negative integers, <code>+ - * /</code>, and spaces (no parentheses). Integer division truncates toward zero. Standard operator precedence applies (<code>*</code> and <code>/</code> before <code>+</code> and <code>-</code>).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "3+2*2"
Output: 7
Explanation: 2*2=4 evaluated first, then 3+4=7</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 3 * 10⁵</li><li>s consists of digits, '+','-','*','/', and spaces</li><li>expression is valid, answer fits in a 32-bit integer</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Push each number's signed contribution onto a stack; for <code>*</code>/<code>/</code>, fold immediately into the previous stack value instead of pushing separately — then the final answer is just the stack's sum.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Parse numbers while tracking the operator that precedes each one. For <code>+</code> push the number, for <code>-</code> push its negation — deferring the addition. For <code>*</code>/<code>/</code>, pop the last pushed value, apply the operator against the new number, and push the result back — this resolves higher precedence immediately without a separate expression tree. Sum the stack at the end.</p>
<pre class="code" data-lang="java"><code>public int calculate(String s) {
    Deque&lt;Integer&gt; st = new ArrayDeque&lt;&gt;();
    int num = 0;
    char op = '+';
    for (int i = 0; i &lt; s.length(); i++) {
        char c = s.charAt(i);
        if (Character.isDigit(c)) num = num * 10 + (c - '0');
        if ((!Character.isDigit(c) &amp;&amp; c != ' ') || i == s.length() - 1) {
            switch (op) {
                case '+': st.push(num); break;
                case '-': st.push(-num); break;
                case '*': st.push(st.pop() * num); break;
                case '/': st.push(st.pop() / num); break;
            }
            op = c;
            num = 0;
        }
    }
    int sum = 0;
    for (int v : st) sum += v;
    return sum;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>"3+2*2"</code></p>
<table class="tbl">
<tr><th>i (char)</th><th>action</th><th>stack after</th></tr>
<tr><td>0 ('3')</td><td>num=3</td><td>[ ]</td></tr>
<tr><td>1 ('+')</td><td>op was '+' → push 3; op='+'; num=0</td><td>[ 3 ]</td></tr>
<tr><td>2 ('2')</td><td>num=2</td><td>[ 3 ]</td></tr>
<tr><td>3 ('*')</td><td>op was '+' → push 2; op='*'; num=0</td><td>[ 3, 2 ]</td></tr>
<tr><td>4 ('2', last)</td><td>num=2; end-of-string → op='*': pop 2 → push 2*2=4</td><td>[ 3, 4 ]</td></tr>
</table>
<p class="fs13">Sum stack: 3 + 4 = <code>7</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(n) worst case for the stack.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Precedence without a parse tree: fold <code>*</code>/<code>/</code> into the stack top the instant you see them, so only same-precedence <code>+</code>/<code>-</code> terms remain to sum at the end.</div>`});

})();
