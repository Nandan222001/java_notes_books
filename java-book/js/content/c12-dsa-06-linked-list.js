/* ===== CHAPTER 37 · DSA: Linked List ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 37, 'DSA: Linked List');

/* Problem 051 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q051 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 051 · EASY</span>Reverse Linked List</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Linked List</span></div>
<p class="dropcap">Given the head of a singly linked list, reverse the list and return the new head.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: 1 → 2 → 3 → 4 → 5 → null
Output: 5 → 4 → 3 → 2 → 1 → null</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 5000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Walk the list once, flipping each node's <code>next</code> pointer to point backwards as you go — you just need to remember "previous."</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep a <code>prev</code> pointer (starts null) and a <code>curr</code> pointer (starts at head). At each node, save its <code>next</code>, point it back to <code>prev</code>, then advance both pointers forward.</p>
<pre class="code" data-lang="java"><code>public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>1 → 2 → 3 → null</code></p>
<table class="tbl">
<tr><th>curr</th><th>next (saved)</th><th>curr.next set to</th><th>prev after</th></tr>
<tr><td>1</td><td>2</td><td>null</td><td>1</td></tr>
<tr><td>2</td><td>3</td><td>1</td><td>2 → 1</td></tr>
<tr><td>3</td><td>null</td><td>2</td><td>3 → 2 → 1</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) — pointers only, in-place.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Reversal is just "flip each arrow" — always save <code>next</code> BEFORE overwriting it, or you lose the rest of the list.</div>`});

/* Problem 052 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q052 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 052 · EASY</span>Merge Two Sorted Lists</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Linked List</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given the heads of two sorted (non-decreasing) linked lists, merge them into one sorted list by splicing existing nodes together, and return its head.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input:  l1 = 1 → 2 → 4,  l2 = 1 → 3 → 4
Output: 1 → 1 → 2 → 3 → 4 → 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= nodes in each list &lt;= 50</li><li>-100 &lt;= Node.val &lt;= 100</li><li>Both lists are sorted in non-decreasing order.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Use a dummy head node so you never special-case "the first node" — just keep a <code>tail</code> pointer and always attach the smaller of the two current heads.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain a dummy node and a <code>tail</code> pointer. Compare <code>l1.val</code> and <code>l2.val</code>, splice the smaller node onto <code>tail.next</code>, and advance that list plus <code>tail</code>. Once one list runs out, attach the remainder of the other in one shot — it's already sorted.</p>
<pre class="code" data-lang="java"><code>public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    while (l1 != null &amp;&amp; l2 != null) {
        if (l1.val &lt;= l2.val) { tail.next = l1; l1 = l1.next; }
        else                   { tail.next = l2; l2 = l2.next; }
        tail = tail.next;
    }
    tail.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>l1 = 1→2→4</code>, <code>l2 = 1→3→4</code></p>
<table class="tbl">
<tr><th>l1 head</th><th>l2 head</th><th>attached</th><th>result so far</th></tr>
<tr><td>1</td><td>1</td><td>l1 (1)</td><td>1</td></tr>
<tr><td>2</td><td>1</td><td>l2 (1)</td><td>1,1</td></tr>
<tr><td>2</td><td>3</td><td>l1 (2)</td><td>1,1,2</td></tr>
<tr><td>4</td><td>3</td><td>l2 (3)</td><td>1,1,2,3</td></tr>
<tr><td>4</td><td>4</td><td>l1 (4)</td><td>1,1,2,3,4</td></tr>
<tr><td colspan="4">l1 exhausted → attach remaining l2 (4) → 1,1,2,3,4,4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m+n). Space: O(1) extra — nodes are re-linked, not copied.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Ties (<code>l1.val == l2.val</code>) go to <code>l1</code> in this template — pick either, just be consistent so the merge stays stable.</div>`});

/* Problem 053 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q053 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 053 · EASY</span>Linked List Cycle</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Fast &amp; Slow Pointers</span></div>
<p class="dropcap">Given the head of a linked list, determine if it has a cycle — i.e. some node's <code>next</code> pointer eventually loops back to a node already visited. Use O(1) extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: 3 → 2 → 0 → -4 → (back to node "2")
Output: true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 10^4</li><li>-10^5 &lt;= Node.val &lt;= 10^5</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Floyd's Tortoise and Hare: a slow pointer moving 1 step and a fast pointer moving 2 steps will always meet inside a cycle — like two runners on a circular track.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>slow</code> advances one node per step, <code>fast</code> advances two. If there's no cycle, <code>fast</code> hits <code>null</code> first. If there IS a cycle, <code>fast</code> re-enters it, laps <code>slow</code>, and they land on the same node — the gap between them shrinks by exactly one each step.</p>
<pre class="code" data-lang="java"><code>public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null &amp;&amp; fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>A(3) → B(2) → C(0) → D(-4) → B</code> (cycle back to B)</p>
<table class="tbl">
<tr><th>iteration</th><th>slow</th><th>fast</th><th>slow == fast?</th></tr>
<tr><td>start</td><td>A</td><td>A</td><td>—</td></tr>
<tr><td>1</td><td>B</td><td>C</td><td>no</td></tr>
<tr><td>2</td><td>C</td><td>B</td><td>no</td></tr>
<tr><td>3</td><td>D</td><td>D</td><td>yes → cycle</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) — no visited-set needed, unlike a HashSet approach.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Fast-slow pointers are the "two runners on a loop track" pattern — it resurfaces in cycle-start-node, middle-of-list, and happy-number problems.</div>`});

/* Problem 054 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q054 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 054 · MEDIUM</span>Remove Nth Node From End of List</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given the head of a linked list, remove the <code>n</code>-th node from the end of the list and return the head — in one pass.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: 1 → 2 → 3 → 4 → 5, n = 2
Output: 1 → 2 → 3 → 5</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 30</li><li>0 &lt;= Node.val &lt;= 100</li><li>1 &lt;= n &lt;= number of nodes</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Give <code>fast</code> a head start of <code>n</code> nodes, then move <code>fast</code> and <code>slow</code> together — when <code>fast</code> hits the end, <code>slow</code> is right before the node to remove.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Use a dummy node before head so removing the true head is not a special case. Advance <code>fast</code> exactly <code>n</code> steps first, opening a gap of <code>n</code>. Then move both pointers together until <code>fast.next</code> is null — <code>slow</code> now sits just before the target node.</p>
<pre class="code" data-lang="java"><code>public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode fast = dummy, slow = dummy;
    for (int i = 0; i &lt; n; i++) fast = fast.next;
    while (fast.next != null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>1→2→3→4→5</code>, n = 2 (dummy → 1 → 2 → 3 → 4 → 5)</p>
<table class="tbl">
<tr><th>step</th><th>fast</th><th>slow</th></tr>
<tr><td>after n=2 head start</td><td>2</td><td>dummy</td></tr>
<tr><td>1</td><td>3</td><td>1</td></tr>
<tr><td>2</td><td>4</td><td>2</td></tr>
<tr><td>3</td><td>5</td><td>3</td></tr>
<tr><td colspan="3">fast.next is null → stop. slow.next = slow.next.next skips node 4 → 1→2→3→5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(L) — one pass, L = list length. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The dummy node trick avoids a null-check for "remove the head" — always reach for it when a list problem might delete node 0.</div>`});

/* Problem 055 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q055 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 055 · MEDIUM</span>Reorder List</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Fast &amp; Slow Pointers</span><span class="pill">In-place Reversal</span></div>
<p class="dropcap">Given a list L0 → L1 → … → Ln-1 → Ln, reorder it in place to L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → … without changing node values.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input:  1 → 2 → 3 → 4 → 5
Output: 1 → 5 → 2 → 4 → 3</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 5 × 10^4</li><li>1 &lt;= Node.val &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Three classic sub-routines chained together: find the middle → reverse the second half → merge the two halves by alternating nodes.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Split the list at its middle (slow/fast pointers), reverse the second half in place, then zip the two halves together — alternately taking one node from the front half and one from the reversed back half.</p>
<pre class="code" data-lang="java"><code>public void reorderList(ListNode head) {
    if (head == null || head.next == null) return;
    ListNode slow = head, fast = head;
    while (fast.next != null &amp;&amp; fast.next.next != null) {
        slow = slow.next; fast = fast.next.next;
    }
    ListNode second = slow.next;
    slow.next = null;
    ListNode prev = null;
    while (second != null) {
        ListNode next = second.next;
        second.next = prev; prev = second; second = next;
    }
    ListNode first = head, l2 = prev;
    while (l2 != null) {
        ListNode t1 = first.next, t2 = l2.next;
        first.next = l2;
        l2.next = t1;
        first = t1; l2 = t2;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>1→2→3→4→5</code> → split at middle (3) → first half <code>1→2→3</code>, reversed second half <code>5→4</code>. Now merge:</p>
<table class="tbl">
<tr><th>step</th><th>first</th><th>l2</th><th>first.next set to</th><th>l2.next set to</th></tr>
<tr><td>1</td><td>1</td><td>5</td><td>5</td><td>2</td></tr>
<tr><td>2</td><td>2</td><td>4</td><td>4</td><td>3</td></tr>
<tr><td colspan="5">l2 becomes null → stop. Result: 1 → 5 → 2 → 4 → 3</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — three linear passes. Space: O(1), all in place.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Find middle → reverse half → merge" is a reusable triple-combo — the same building blocks solve Palindrome Linked List too.</div>`});

/* Problem 056 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q056 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 056 · MEDIUM</span>Add Two Numbers</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Linked List</span><span class="pill">Math</span></div>
<p class="dropcap">Two non-empty linked lists represent two non-negative integers, with digits stored in <strong>reverse order</strong> (ones digit first). Add the two numbers and return the sum as a linked list, in the same reversed format.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input:  l1 = 2 → 4 → 3   (represents 342)
        l2 = 5 → 6 → 4   (represents 465)
Output: 7 → 0 → 8         (represents 807)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes in each list &lt;= 100</li><li>0 &lt;= Node.val &lt;= 9</li><li>No leading zeros, except the number 0 itself.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This is grade-school column addition — walk both lists together, add digits plus carry, emit one output digit per step, and don't forget a trailing carry after both lists end.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Use a dummy head and a running <code>carry</code>. At each step sum whatever digits exist (0 if a list has ended) plus <code>carry</code>, emit <code>sum % 10</code>, and roll <code>sum / 10</code> forward as the new carry. Keep going while either list has nodes OR a carry remains.</p>
<pre class="code" data-lang="java"><code>public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode cur = dummy;
    int carry = 0;
    while (l1 != null || l2 != null || carry != 0) {
        int sum = carry;
        if (l1 != null) { sum += l1.val; l1 = l1.next; }
        if (l2 != null) { sum += l2.val; l2 = l2.next; }
        carry = sum / 10;
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
    }
    return dummy.next;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>l1 = 2→4→3</code>, <code>l2 = 5→6→4</code></p>
<table class="tbl">
<tr><th>l1 digit</th><th>l2 digit</th><th>carry in</th><th>sum</th><th>digit out</th><th>carry out</th></tr>
<tr><td>2</td><td>5</td><td>0</td><td>7</td><td>7</td><td>0</td></tr>
<tr><td>4</td><td>6</td><td>0</td><td>10</td><td>0</td><td>1</td></tr>
<tr><td>3</td><td>4</td><td>1</td><td>8</td><td>8</td><td>0</td></tr>
</table>
<p class="fs13">Both lists and carry exhausted → result <code>7 → 0 → 8</code> (807 = 342 + 465). ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(max(m,n)). Space: O(max(m,n)) for the output list.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Loop condition <code>l1 != null || l2 != null || carry != 0</code> is the whole trick — dropping the carry clause is the #1 bug (misses a final "1→" digit like 5+5=10).</div>`});

/* Problem 057 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q057 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 057 · MEDIUM</span>Copy List with Random Pointer</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Hash Map</span><span class="pill">Linked List</span></div>
<p class="dropcap">A linked list's nodes each have a <code>next</code> pointer and a <code>random</code> pointer that can point to any node in the list, or null. Construct a <strong>deep copy</strong> of the list — new nodes only, correctly wired <code>next</code> and <code>random</code> pointers into the copy.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Node class: { int val; Node next; Node random; }
Input:  A(random→C) → B(random→null) → C(random→A)
Output: a deep copy A'→B'→C' with A'.random=C', C'.random=A'</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= number of nodes &lt;= 1000</li><li>-10^4 &lt;= Node.val &lt;= 10^4</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A HashMap&lt;original, copy&gt; works in O(n) space. For O(1) extra space, interleave copies directly into the original list: A → A' → B → B' → …</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Three passes, O(1) extra space. Pass 1: splice a copy right after each original node. Pass 2: for each original <code>cur</code>, its copy's <code>random</code> is just <code>cur.random.next</code> — the copy that now sits right after the randomly-pointed-to original. Pass 3: unweave the interleaved list back into two separate lists.</p>
<pre class="code" data-lang="java"><code>public Node copyRandomList(Node head) {
    if (head == null) return null;
    for (Node cur = head; cur != null; cur = cur.next.next) {
        Node copy = new Node(cur.val);
        copy.next = cur.next;
        cur.next = copy;
    }
    for (Node cur = head; cur != null; cur = cur.next.next) {
        cur.next.random = (cur.random != null) ? cur.random.next : null;
    }
    Node dummy = new Node(0), copyCur = dummy;
    for (Node cur = head; cur != null; cur = cur.next) {
        copyCur.next = cur.next;
        copyCur = copyCur.next;
        cur.next = cur.next.next;
    }
    return dummy.next;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">After pass 1 interleave: <code>A → A' → B → B' → C → C'</code>. Pass 2, wiring random on copies:</p>
<table class="tbl">
<tr><th>cur (original)</th><th>cur.random</th><th>cur.next (copy)</th><th>copy.random set to</th></tr>
<tr><td>A</td><td>C</td><td>A'</td><td>C.next = C'</td></tr>
<tr><td>B</td><td>null</td><td>B'</td><td>null</td></tr>
<tr><td>C</td><td>A</td><td>C'</td><td>A.next = A'</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — three linear passes. Space: O(1) extra (vs O(n) for the HashMap approach).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Interleave, then the copy is always one hop from its original" is the trick that replaces a hash map with pure pointer arithmetic.</div>`});

/* Problem 058 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q058 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 058 · MEDIUM</span>LRU Cache</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Design</span><span class="pill">Doubly Linked List</span><span class="pill">Hash Map</span></div>
<p class="dropcap">Design a Least Recently Used (LRU) cache with fixed <code>capacity</code>. Support <code>get(key)</code> — return the value or -1, and mark the key as most-recently-used — and <code>put(key, value)</code> — insert/update, evicting the least-recently-used entry if capacity is exceeded. Both operations must run in <strong>O(1)</strong>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>LRUCache cache = new LRUCache(2);
cache.put(1, 1); cache.put(2, 2);
cache.get(1);      // returns 1, and 1 becomes most-recent
cache.put(3, 3);   // capacity full → evicts key 2 (least recent)
cache.get(2);      // returns -1 (evicted)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= capacity &lt;= 3000</li><li>0 &lt;= key, value &lt;= 10^4</li><li>Up to 2 × 10^5 calls to get/put.</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>O(1) lookup needs a HashMap; O(1) reorder-on-use and O(1) evict-the-tail need a doubly linked list with sentinel head/tail nodes — neither alone is enough.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep a <code>HashMap&lt;key, Node&gt;</code> for O(1) lookup and a doubly linked list ordered most-recent (near <code>head</code>) to least-recent (near <code>tail</code>), with dummy <code>head</code>/<code>tail</code> sentinels so removal never null-checks. Every touched key is unlinked and re-inserted at the front; overflow evicts <code>tail.prev</code>.</p>
<pre class="code" data-lang="java"><code>class LRUCache {
    class Node { int key, val; Node prev, next; Node(int k,int v){key=k;val=v;} }
    private final int capacity;
    private final Map&lt;Integer, Node&gt; map = new HashMap&lt;&gt;();
    private final Node head = new Node(0,0), tail = new Node(0,0);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail; tail.prev = head;
    }
    private void remove(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }
    private void addFront(Node n) {
        n.next = head.next; n.prev = head;
        head.next.prev = n; head.next = n;
    }
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node n = map.get(key);
        remove(n); addFront(n);
        return n.val;
    }
    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        Node n = new Node(key, value);
        map.put(key, n);
        addFront(n);
        if (map.size() &gt; capacity) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">capacity = 2 (order shown front→back = most→least recent)</p>
<table class="tbl">
<tr><th>call</th><th>action</th><th>list order</th><th>returns</th></tr>
<tr><td>put(1,1)</td><td>addFront(1)</td><td>[1]</td><td>—</td></tr>
<tr><td>put(2,2)</td><td>addFront(2)</td><td>[2,1]</td><td>—</td></tr>
<tr><td>get(1)</td><td>remove+addFront(1)</td><td>[1,2]</td><td>1</td></tr>
<tr><td>put(3,3)</td><td>addFront(3), evict tail.prev=2</td><td>[3,1]</td><td>—</td></tr>
<tr><td>get(2)</td><td>not in map</td><td>[3,1]</td><td>-1</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) per get/put. Space: O(capacity) for the map + list nodes.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Sentinel head/tail nodes eliminate every "is this the first/last node?" branch — a huge simplification worth memorizing for any O(1) linked-list design.</div>`});

/* Problem 059 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q059 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 059 · HARD</span>Merge k Sorted Lists</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Heap / Priority Queue</span><span class="pill">Divide &amp; Conquer</span></div>
<p class="dropcap">You are given an array of <code>k</code> linked lists, each sorted in ascending order. Merge all the lists into one sorted linked list and return its head.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input:  lists = [[1,4,5], [1,3,4], [2,6]]
Output: 1 → 1 → 2 → 3 → 4 → 4 → 5 → 6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= k &lt;= 10^4</li><li>0 &lt;= length of each list &lt;= 500</li><li>-10^4 &lt;= Node.val &lt;= 10^4</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Repeatedly merging pairs is O(kN). Instead keep a min-heap of the current head of each list — pop the global minimum, push its successor. That's O(N log k).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Seed a min-heap with the head node of every non-empty list, ordered by <code>val</code>. Repeatedly pop the smallest node, append it to the result, and if it has a <code>next</code>, push that into the heap. The heap always holds at most one "frontier" node per list, so it never exceeds size k.</p>
<pre class="code" data-lang="java"><code>public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue&lt;ListNode&gt; pq = new PriorityQueue&lt;&gt;((a, b) -&gt; a.val - b.val);
    for (ListNode node : lists) if (node != null) pq.offer(node);
    ListNode dummy = new ListNode(0), tail = dummy;
    while (!pq.isEmpty()) {
        ListNode min = pq.poll();
        tail.next = min;
        tail = tail.next;
        if (min.next != null) pq.offer(min.next);
    }
    return dummy.next;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Lists: A=[1,4,5], B=[1,3,4], C=[2,6]. Heap starts {A:1, B:1, C:2}.</p>
<table class="tbl">
<tr><th>polled (min)</th><th>appended</th><th>pushed next</th></tr>
<tr><td>A:1</td><td>1</td><td>A:4</td></tr>
<tr><td>B:1</td><td>1</td><td>B:3</td></tr>
<tr><td>C:2</td><td>2</td><td>C:6</td></tr>
<tr><td>B:3</td><td>3</td><td>B:4</td></tr>
<tr><td>A:4</td><td>4</td><td>A:5</td></tr>
<tr><td>B:4</td><td>4</td><td>(B exhausted)</td></tr>
<tr><td>A:5</td><td>5</td><td>(A exhausted)</td></tr>
<tr><td>C:6</td><td>6</td><td>(C exhausted, heap empty)</td></tr>
</table>
<p class="fs13">Result: <code>1 → 1 → 2 → 3 → 4 → 4 → 5 → 6</code> ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(N log k), N = total nodes across all lists. Space: O(k) heap + O(N) output.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A heap capped at size k is the general pattern for "merge k sorted streams" — same idea powers external sorting and k-way file merges.</div>`});

/* Problem 060 */
B.spread(
{ kicker: 'DSA · LINKED LIST', head: 'Q060 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 060 · EASY</span>Palindrome Linked List</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Fast &amp; Slow Pointers</span><span class="pill">In-place Reversal</span></div>
<p class="dropcap">Given the head of a singly linked list, determine whether it is a palindrome, using O(n) time and O(1) extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input:  1 → 2 → 3 → 4 → 4 → 3 → 2 → 1
Output: true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= number of nodes &lt;= 10^5</li><li>0 &lt;= Node.val &lt;= 9</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A stack or array gives O(n) space trivially. For O(1) space: find the middle, reverse the second half in place, then compare the two halves node by node.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Find the middle with slow/fast pointers, reverse everything from <code>slow.next</code> onward, then walk a pointer from the original head and one from the reversed tail simultaneously, comparing values. The loop naturally stops once the (shorter) reversed half is exhausted.</p>
<pre class="code" data-lang="java"><code>public boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) return true;
    ListNode slow = head, fast = head;
    while (fast.next != null &amp;&amp; fast.next.next != null) {
        slow = slow.next; fast = fast.next.next;
    }
    ListNode prev = null, cur = slow.next;
    while (cur != null) {
        ListNode next = cur.next;
        cur.next = prev; prev = cur; cur = next;
    }
    ListNode p1 = head, p2 = prev;
    while (p2 != null) {
        if (p1.val != p2.val) return false;
        p1 = p1.next; p2 = p2.next;
    }
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>1→2→3→4→4→3→2→1</code>. Middle lands on the second "4"; reversing the tail gives <code>1→2→3→4</code> reversed as the compare chain. Comparing <code>p1</code> (from head) against <code>p2</code> (from reversed half):</p>
<table class="tbl">
<tr><th>step</th><th>p1.val</th><th>p2.val</th><th>match?</th></tr>
<tr><td>1</td><td>1</td><td>1</td><td>yes</td></tr>
<tr><td>2</td><td>2</td><td>2</td><td>yes</td></tr>
<tr><td>3</td><td>3</td><td>3</td><td>yes</td></tr>
<tr><td>4</td><td>4</td><td>4</td><td>yes</td></tr>
</table>
<p class="fs13">p2 reaches null → loop ends, all matched → <code>true</code>, it's a palindrome. ✓</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n). Space: O(1) — no array/stack copy needed.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Same "middle → reverse half → walk together" combo as Reorder List — once you've internalized it, both problems fall in minutes.</div>`});

})();
