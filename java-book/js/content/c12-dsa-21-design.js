/* ===== CHAPTER 52 · DSA: Design & Simulation ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 52, 'DSA: Design & Simulation');

/* Problem 201 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q201 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 201 · EASY</span>Design HashMap</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Design</span><span class="pill">Hashing</span></div>
<p class="dropcap">Design a HashMap without using any built-in hash table library, supporting <code>put(key,value)</code>, <code>get(key)</code> (return -1 if absent), and <code>remove(key)</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>put(1, 1); put(2, 2)
get(1) → 1
get(3) → -1
put(2, 1)  // update
get(2) → 1
remove(2)
get(2) → -1</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= key, value &lt;= 10⁶</li><li>at most 10⁴ calls total</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Use an array of buckets, each a small list of (key,value) pairs, with a hash function like <code>key % bucketCount</code> to pick the bucket — handle collisions by scanning the bucket's list.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Allocate a fixed array of buckets (e.g. 1000), each holding a list of [key,value] pairs. <code>put</code>/<code>get</code>/<code>remove</code> all first locate the bucket via <code>key % bucketCount</code>, then linearly scan that bucket's small list for a matching key.</p>
<pre class="code" data-lang="java"><code>class MyHashMap {
    private final List&lt;int[]&gt;[] buckets = new List[1000];
    public MyHashMap() {
        for (int i = 0; i &lt; 1000; i++) buckets[i] = new ArrayList&lt;&gt;();
    }
    public void put(int key, int value) {
        List&lt;int[]&gt; bucket = buckets[key % 1000];
        for (int[] p : bucket) if (p[0] == key) { p[1] = value; return; }
        bucket.add(new int[]{key, value});
    }
    public int get(int key) {
        for (int[] p : buckets[key % 1000]) if (p[0] == key) return p[1];
        return -1;
    }
    public void remove(int key) {
        buckets[key % 1000].removeIf(p -&gt; p[0] == key);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Operations: <code>put(1,1); put(2,2); get(1); put(2,1); get(2); remove(2); get(2)</code></p>
<table class="tbl">
<tr><th>call</th><th>bucket touched</th><th>result / state</th></tr>
<tr><td>put(1,1)</td><td>bucket[1]</td><td>[[1,1]]</td></tr>
<tr><td>put(2,2)</td><td>bucket[2]</td><td>[[2,2]]</td></tr>
<tr><td>get(1)</td><td>bucket[1]</td><td>returns 1</td></tr>
<tr><td>put(2,1)</td><td>bucket[2]</td><td>found key 2 → updates to [[2,1]]</td></tr>
<tr><td>get(2)</td><td>bucket[2]</td><td>returns 1</td></tr>
<tr><td>remove(2)</td><td>bucket[2]</td><td>bucket[2] becomes []</td></tr>
<tr><td>get(2)</td><td>bucket[2]</td><td>not found → returns -1</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) average per operation (bucket lists stay short). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is literally how a real hash table works under the hood — buckets plus linear-probing-within-bucket for collisions. Design questions often just ask you to build a smaller version of a structure you already use daily.</div>`});

/* Problem 202 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q202 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 202 · EASY</span>Design HashSet</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Design</span><span class="pill">Hashing</span></div>
<p class="dropcap">Design a HashSet without using any built-in hash set library, supporting <code>add(key)</code>, <code>remove(key)</code>, and <code>contains(key)</code> (return true/false).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>add(1); add(2)
contains(1) → true
contains(3) → false
add(2)  // already present, no-op
remove(2)
contains(2) → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= key &lt;= 10⁶</li><li>at most 10⁴ calls total</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Same bucket-array trick as HashMap, but each bucket only needs to store the raw key, not a key-value pair — presence is all that matters.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Array of 1000 buckets, each a small list. <code>add</code> appends the key to its bucket only if not already there; <code>remove</code> scans the bucket and deletes a match; <code>contains</code> scans the bucket for a match.</p>
<pre class="code" data-lang="java"><code>class MyHashSet {
    private final List&lt;Integer&gt;[] buckets = new List[1000];
    public MyHashSet() {
        for (int i = 0; i &lt; 1000; i++) buckets[i] = new LinkedList&lt;&gt;();
    }
    public void add(int key) {
        int b = key % 1000;
        if (!buckets[b].contains(key)) buckets[b].add(key);
    }
    public void remove(int key) {
        buckets[key % 1000].remove(Integer.valueOf(key));
    }
    public boolean contains(int key) {
        return buckets[key % 1000].contains(key);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Operations: <code>add(1); add(2); contains(1); contains(3); add(2); remove(2); contains(2)</code></p>
<table class="tbl">
<tr><th>call</th><th>bucket touched</th><th>result / state</th></tr>
<tr><td>add(1)</td><td>bucket[1]</td><td>[1]</td></tr>
<tr><td>add(2)</td><td>bucket[2]</td><td>[2]</td></tr>
<tr><td>contains(1)</td><td>bucket[1]</td><td>returns true</td></tr>
<tr><td>contains(3)</td><td>bucket[3]</td><td>empty bucket → returns false</td></tr>
<tr><td>add(2)</td><td>bucket[2]</td><td>already contains 2 → no-op, stays [2]</td></tr>
<tr><td>remove(2)</td><td>bucket[2]</td><td>bucket[2] becomes []</td></tr>
<tr><td>contains(2)</td><td>bucket[2]</td><td>not found → returns false</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) average per operation (short bucket lists). Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A HashSet is just a HashMap that only cares about keys — reusing the exact same bucket layout (and dropping the value) is why the two problems always appear back to back.</div>`});

/* Problem 203 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q203 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 203 · MEDIUM</span>Design Circular Queue</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Design</span><span class="pill">Array</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Design a fixed-capacity circular queue supporting <code>enQueue(value)</code>, <code>deQueue()</code>, <code>Front()</code>, <code>Rear()</code>, <code>isEmpty()</code>, and <code>isFull()</code>, all in O(1), reusing freed slots by wrapping around the underlying array.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>MyCircularQueue(3)
enQueue(1) → true
enQueue(2) → true
enQueue(3) → true
enQueue(4) → false   // full
Rear() → 3
deQueue() → true
enQueue(4) → true    // reuses the freed slot
Rear() → 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= k &lt;= 1000</li><li>0 &lt;= value &lt;= 1000</li><li>at most 3000 calls total</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track a front index and a live element count instead of separate front/rear pointers — rear is always derivable as <code>(front + count - 1) % k</code>, which sidesteps the classic "is it empty or full" ambiguity of plain two-pointer circular buffers.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Fixed array of size k plus a front index and a count. Enqueue writes at <code>(front + count) % k</code> and increments count; dequeue advances front by one (mod k) and decrements count. Front/Rear read directly from the array using front and the derived rear index.</p>
<pre class="code" data-lang="java"><code>class MyCircularQueue {
    private final int[] arr;
    private final int capacity;
    private int front = 0, count = 0;
    public MyCircularQueue(int k) {
        arr = new int[k];
        capacity = k;
    }
    public boolean enQueue(int value) {
        if (isFull()) return false;
        arr[(front + count) % capacity] = value;
        count++;
        return true;
    }
    public boolean deQueue() {
        if (isEmpty()) return false;
        front = (front + 1) % capacity;
        count--;
        return true;
    }
    public int Front() {
        return isEmpty() ? -1 : arr[front];
    }
    public int Rear() {
        return isEmpty() ? -1 : arr[(front + count - 1) % capacity];
    }
    public boolean isEmpty() { return count == 0; }
    public boolean isFull() { return count == capacity; }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Operations (k=3): <code>enQueue(1); enQueue(2); enQueue(3); enQueue(4); Rear(); deQueue(); enQueue(4); Rear()</code></p>
<table class="tbl">
<tr><th>call</th><th>index math</th><th>state / result</th></tr>
<tr><td>enQueue(1)</td><td>(0+0)%3=0</td><td>arr=[1,_,_], front=0, count=1 → true</td></tr>
<tr><td>enQueue(2)</td><td>(0+1)%3=1</td><td>arr=[1,2,_], count=2 → true</td></tr>
<tr><td>enQueue(3)</td><td>(0+2)%3=2</td><td>arr=[1,2,3], count=3 (full) → true</td></tr>
<tr><td>enQueue(4)</td><td>count==capacity</td><td>isFull() → false, no change</td></tr>
<tr><td>Rear()</td><td>(0+3-1)%3=2</td><td>returns arr[2]=3</td></tr>
<tr><td>deQueue()</td><td>front=(0+1)%3=1</td><td>count=2 → true</td></tr>
<tr><td>enQueue(4)</td><td>(1+2)%3=0</td><td>arr=[4,2,3], count=3 → true</td></tr>
<tr><td>Rear()</td><td>(1+3-1)%3=0</td><td>returns arr[0]=4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) for every operation. Space: O(k).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Storing a count alongside front (instead of a separate rear pointer) is what makes full vs. empty unambiguous — both states would otherwise collapse to front == rear.</div>`});

/* Problem 204 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q204 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 204 · MEDIUM</span>Insert Delete GetRandom O(1)</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Design</span><span class="pill">Array</span><span class="pill">HashMap</span></div>
<p class="dropcap">Design a data structure supporting <code>insert(val)</code>, <code>remove(val)</code> and <code>getRandom()</code> (uniformly random existing element) — all in average O(1) time.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>insert(1) → true
remove(2) → false
insert(2) → true
getRandom() → 1 or 2, each with probability 1/2
remove(1) → true
insert(2) → false   // already present</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>-2³¹ &lt;= val &lt;= 2³¹-1</li><li>at most 2×10⁵ calls total</li><li>getRandom is only called when the structure is non-empty</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>getRandom() in O(1) forces a dense array (random index pick); insert/remove in O(1) forces a hashmap for lookup. Combine both — the map stores each value's current index in the array, so a deletion can swap-with-last instead of shifting.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>An ArrayList holds the values contiguously (so getRandom just picks a random index); a HashMap tracks value → its index in that list. Removal swaps the target with the last element, fixes the swapped element's index in the map, then pops the last slot — avoiding any O(n) shift.</p>
<pre class="code" data-lang="java"><code>class RandomizedSet {
    private final List&lt;Integer&gt; vals = new ArrayList&lt;&gt;();
    private final Map&lt;Integer, Integer&gt; idx = new HashMap&lt;&gt;();
    private final Random rnd = new Random();

    public boolean insert(int val) {
        if (idx.containsKey(val)) return false;
        idx.put(val, vals.size());
        vals.add(val);
        return true;
    }
    public boolean remove(int val) {
        if (!idx.containsKey(val)) return false;
        int i = idx.get(val);
        int last = vals.get(vals.size() - 1);
        vals.set(i, last);
        idx.put(last, i);
        vals.remove(vals.size() - 1);
        idx.remove(val);
        return true;
    }
    public int getRandom() {
        return vals.get(rnd.nextInt(vals.size()));
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Operations: <code>insert(1); remove(2); insert(2); getRandom(); remove(1); insert(2)</code></p>
<table class="tbl">
<tr><th>call</th><th>logic</th><th>state / result</th></tr>
<tr><td>insert(1)</td><td>not in idx</td><td>vals=[1], idx={1:0} → true</td></tr>
<tr><td>remove(2)</td><td>2 not in idx</td><td>no change → false</td></tr>
<tr><td>insert(2)</td><td>not in idx</td><td>vals=[1,2], idx={1:0,2:1} → true</td></tr>
<tr><td>getRandom()</td><td>rnd.nextInt(2)</td><td>returns vals[0]=1 or vals[1]=2, 50/50</td></tr>
<tr><td>remove(1)</td><td>i=0, last=vals[1]=2</td><td>vals[0]=2 → vals=[2]; idx={2:0} → true</td></tr>
<tr><td>insert(2)</td><td>already in idx</td><td>no change → false</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) average for all three operations. Space: O(n).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Delete from the middle of an array in O(1)" is only possible if you don't care about order — swap-with-last is the standard trick whenever positions, not sequence, are what matter.</div>`});

/* Problem 205 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q205 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 205 · HARD</span>LFU Cache</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Design</span><span class="pill">HashMap</span><span class="pill">Doubly Linked List</span></div>
<p class="dropcap">Design a Least Frequently Used (LFU) cache with fixed capacity, supporting <code>get(key)</code> and <code>put(key,value)</code> in O(1) average time. On eviction, remove the key with the smallest use frequency; break ties by evicting the least recently used among them.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>LFUCache(2)
put(1,1); put(2,2)
get(1) → 1             // freq(1)=2
put(3,3)               // capacity full, evicts key 2 (freq 1, LFU)
get(2) → -1
get(3) → 3              // freq(3)=2
put(4,4)                // freq(1)=freq(3)=2 tie → evicts 1 (used less recently)
get(1) → -1
get(3) → 3
get(4) → 4</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= capacity &lt;= 10⁴</li><li>0 &lt;= key, value &lt;= 10⁵</li><li>at most 2×10⁵ calls to get and put combined</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track three maps: key→value, key→frequency, and frequency→(ordered set of keys at that frequency). A LinkedHashSet per frequency bucket gives both "evict LFU" (its first entry) and "recency within a frequency" for free via insertion order.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Every get/put "bumps" a key: remove it from its current frequency bucket, and re-insert it at the back of the next frequency's bucket (a LinkedHashSet, so insertion order tracks recency). A running <code>minFreq</code> is incremented only when the bucket it points at becomes empty. Eviction always pulls the first (oldest) key out of <code>freqToKeys.get(minFreq)</code>.</p>
<pre class="code" data-lang="java"><code>class LFUCache {
    private final int capacity;
    private int minFreq;
    private final Map&lt;Integer, Integer&gt; keyToVal = new HashMap&lt;&gt;();
    private final Map&lt;Integer, Integer&gt; keyToFreq = new HashMap&lt;&gt;();
    private final Map&lt;Integer, LinkedHashSet&lt;Integer&gt;&gt; freqToKeys = new HashMap&lt;&gt;();

    public LFUCache(int capacity) { this.capacity = capacity; }

    public int get(int key) {
        if (!keyToVal.containsKey(key)) return -1;
        bump(key);
        return keyToVal.get(key);
    }
    public void put(int key, int value) {
        if (capacity == 0) return;
        if (keyToVal.containsKey(key)) {
            keyToVal.put(key, value);
            bump(key);
            return;
        }
        if (keyToVal.size() == capacity) {
            int evict = freqToKeys.get(minFreq).iterator().next();
            freqToKeys.get(minFreq).remove(evict);
            keyToVal.remove(evict);
            keyToFreq.remove(evict);
        }
        keyToVal.put(key, value);
        keyToFreq.put(key, 1);
        freqToKeys.computeIfAbsent(1, k -&gt; new LinkedHashSet&lt;&gt;()).add(key);
        minFreq = 1;
    }
    private void bump(int key) {
        int freq = keyToFreq.get(key);
        freqToKeys.get(freq).remove(key);
        if (freqToKeys.get(freq).isEmpty() &amp;&amp; minFreq == freq) minFreq++;
        keyToFreq.put(key, freq + 1);
        freqToKeys.computeIfAbsent(freq + 1, k -&gt; new LinkedHashSet&lt;&gt;()).add(key);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Operations (capacity=2): <code>put(1,1); put(2,2); get(1); put(3,3); get(2); get(3); put(4,4); get(1); get(3); get(4)</code></p>
<table class="tbl">
<tr><th>call</th><th>freq buckets after</th><th>minFreq</th><th>result</th></tr>
<tr><td>put(1,1)</td><td>f1:{1}</td><td>1</td><td>—</td></tr>
<tr><td>put(2,2)</td><td>f1:{1,2}</td><td>1</td><td>—</td></tr>
<tr><td>get(1)</td><td>f1:{2}, f2:{1}</td><td>1</td><td>1</td></tr>
<tr><td>put(3,3)</td><td>evict LFU@f1 → key 2; f1:{3}, f2:{1}</td><td>1</td><td>—</td></tr>
<tr><td>get(2)</td><td>not found</td><td>1</td><td>-1</td></tr>
<tr><td>get(3)</td><td>f1:{}, f2:{1,3}</td><td>2</td><td>3</td></tr>
<tr><td>put(4,4)</td><td>tie f2:{1,3} → evict 1 (oldest); f1:{4}, f2:{3}</td><td>1</td><td>—</td></tr>
<tr><td>get(1)</td><td>not found</td><td>1</td><td>-1</td></tr>
<tr><td>get(3)</td><td>f1:{4}, f3:{3}</td><td>1</td><td>3</td></tr>
<tr><td>get(4)</td><td>f1:{}, f2:{4}, f3:{3}</td><td>2</td><td>4</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) average for get and put. Space: O(capacity).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>LFU needs two orderings at once — by frequency, and by recency within a frequency — a LinkedHashSet-per-frequency map gets both without any manual doubly-linked-list bookkeeping.</div>`});

/* Problem 206 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q206 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 206 · MEDIUM</span>Design Twitter</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Design</span><span class="pill">HashMap</span><span class="pill">Heap / Sort</span></div>
<p class="dropcap">Design a simplified Twitter: <code>postTweet(userId,tweetId)</code>, <code>getNewsFeed(userId)</code> (the 10 most recent tweet ids from the user and everyone they follow, most recent first), <code>follow(followerId,followeeId)</code>, and <code>unfollow(followerId,followeeId)</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>postTweet(1, 5)
getNewsFeed(1) → [5]
follow(1, 2)
postTweet(2, 6)
getNewsFeed(1) → [6, 5]
unfollow(1, 2)
getNewsFeed(1) → [5]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= userId, followerId, followeeId &lt;= 500</li><li>0 &lt;= tweetId &lt;= 10⁴, all tweetId values are unique</li><li>at most 3×10⁴ calls total</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Stamp every tweet with a global, ever-increasing counter at post time. A feed request just needs to gather the poster's own tweets plus their followees' tweets and take the 10 with the largest timestamps.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Each user maps to a list of (timestamp, tweetId) pairs, appended in post order. <code>follow</code>/<code>unfollow</code> maintain a set of followee ids per user. <code>getNewsFeed</code> pools the caller's own tweets with every followee's tweets, sorts by timestamp descending, and returns the top 10 tweetIds.</p>
<pre class="code" data-lang="java"><code>class Twitter {
    private int timestamp = 0;
    private final Map&lt;Integer, List&lt;int[]&gt;&gt; tweets = new HashMap&lt;&gt;();
    private final Map&lt;Integer, Set&lt;Integer&gt;&gt; following = new HashMap&lt;&gt;();

    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -&gt; new ArrayList&lt;&gt;())
              .add(new int[]{timestamp++, tweetId});
    }
    public List&lt;Integer&gt; getNewsFeed(int userId) {
        List&lt;int[]&gt; all = new ArrayList&lt;&gt;(tweets.getOrDefault(userId, Collections.emptyList()));
        for (int uid : following.getOrDefault(userId, Collections.emptySet()))
            all.addAll(tweets.getOrDefault(uid, Collections.emptyList()));
        all.sort((a, b) -&gt; b[0] - a[0]);
        List&lt;Integer&gt; result = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; Math.min(10, all.size()); i++) result.add(all.get(i)[1]);
        return result;
    }
    public void follow(int followerId, int followeeId) {
        if (followerId != followeeId)
            following.computeIfAbsent(followerId, k -&gt; new HashSet&lt;&gt;()).add(followeeId);
    }
    public void unfollow(int followerId, int followeeId) {
        Set&lt;Integer&gt; set = following.get(followerId);
        if (set != null) set.remove(followeeId);
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Operations: <code>postTweet(1,5); getNewsFeed(1); follow(1,2); postTweet(2,6); getNewsFeed(1); unfollow(1,2); getNewsFeed(1)</code></p>
<table class="tbl">
<tr><th>call</th><th>state change</th><th>result</th></tr>
<tr><td>postTweet(1,5)</td><td>tweets[1]=[(t=0,5)]</td><td>—</td></tr>
<tr><td>getNewsFeed(1)</td><td>no followees; pool=[(0,5)]</td><td>[5]</td></tr>
<tr><td>follow(1,2)</td><td>following[1]={2}</td><td>—</td></tr>
<tr><td>postTweet(2,6)</td><td>tweets[2]=[(t=1,6)]</td><td>—</td></tr>
<tr><td>getNewsFeed(1)</td><td>pool=[(0,5),(1,6)] sorted desc → [(1,6),(0,5)]</td><td>[6, 5]</td></tr>
<tr><td>unfollow(1,2)</td><td>following[1]={}</td><td>—</td></tr>
<tr><td>getNewsFeed(1)</td><td>pool=[(0,5)] only</td><td>[5]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(k log k) per feed call, k = tweets pooled from self + followees. Space: O(total tweets + follow edges).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A single global timestamp counter is what turns "most recent" into a plain numeric sort key — no need to compare wall-clock times or maintain per-user ordering separately.</div>`});

/* Problem 207 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q207 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 207 · MEDIUM</span>Time Based Key-Value Store</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Design</span><span class="pill">HashMap</span><span class="pill">Binary Search</span></div>
<p class="dropcap">Design a time-based key-value store: <code>set(key,value,timestamp)</code> stores the value at that timestamp; <code>get(key,timestamp)</code> returns the value set at the largest stored timestamp &lt;= the given timestamp, or "" if none exists. Calls to set for a given key arrive with strictly increasing timestamps.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>set("foo", "bar", 1)
get("foo", 1) → "bar"
get("foo", 3) → "bar"
set("foo", "bar2", 4)
get("foo", 4) → "bar2"
get("foo", 5) → "bar2"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= key.length, value.length &lt;= 100</li><li>1 &lt;= timestamp &lt;= 10⁷</li><li>timestamps for set on the same key are strictly increasing</li><li>at most 2×10⁵ calls to set and get combined</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Because timestamps for a key only ever increase, storing each key's (timestamp,value) pairs in a plain list keeps that list sorted for free — turning "largest timestamp &lt;= target" into a textbook binary search (upper-bound minus one).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Map each key to an ArrayList of (timestamp,value) pairs, appended in set order (already sorted, since timestamps strictly increase). <code>get</code> binary-searches that list for the rightmost pair whose timestamp does not exceed the query.</p>
<pre class="code" data-lang="java"><code>class TimeMap {
    static class Pair {
        int time; String val;
        Pair(int t, String v) { time = t; val = v; }
    }
    private final Map&lt;String, List&lt;Pair&gt;&gt; store = new HashMap&lt;&gt;();

    public void set(String key, String value, int timestamp) {
        store.computeIfAbsent(key, k -&gt; new ArrayList&lt;&gt;()).add(new Pair(timestamp, value));
    }
    public String get(String key, int timestamp) {
        List&lt;Pair&gt; list = store.get(key);
        if (list == null) return "";
        int lo = 0, hi = list.size() - 1, res = -1;
        while (lo &lt;= hi) {
            int mid = (lo + hi) / 2;
            if (list.get(mid).time &lt;= timestamp) { res = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return res == -1 ? "" : list.get(res).val;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Operations: <code>set("foo","bar",1); get("foo",1); get("foo",3); set("foo","bar2",4); get("foo",4); get("foo",5)</code></p>
<table class="tbl">
<tr><th>call</th><th>list for "foo"</th><th>binary search</th><th>result</th></tr>
<tr><td>set("foo","bar",1)</td><td>[(1,bar)]</td><td>—</td><td>—</td></tr>
<tr><td>get("foo",1)</td><td>[(1,bar)]</td><td>time 1 &lt;= 1 → res=0</td><td>"bar"</td></tr>
<tr><td>get("foo",3)</td><td>[(1,bar)]</td><td>time 1 &lt;= 3 → res=0</td><td>"bar"</td></tr>
<tr><td>set("foo","bar2",4)</td><td>[(1,bar),(4,bar2)]</td><td>—</td><td>—</td></tr>
<tr><td>get("foo",4)</td><td>[(1,bar),(4,bar2)]</td><td>time 4 &lt;= 4 → res=1</td><td>"bar2"</td></tr>
<tr><td>get("foo",5)</td><td>[(1,bar),(4,bar2)]</td><td>time 4 &lt;= 5 → res=1</td><td>"bar2"</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) amortized for set, O(log m) for get (m = entries for that key). Space: O(total set calls).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The strictly-increasing-timestamp guarantee is the whole problem — it's what lets a plain append-only list double as a sorted array, avoiding a TreeMap or manual insertion-sort.</div>`});

/* Problem 208 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q208 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 208 · MEDIUM</span>Design Underground System</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Design</span><span class="pill">HashMap</span><span class="pill">Simulation</span></div>
<p class="dropcap">Design a system tracking passengers travelling through a subway. <code>checkIn(id,stationName,t)</code>, <code>checkOut(id,stationName,t)</code>, and <code>getAverageTime(startStation,endStation)</code> (average travel time between the two stations, over every completed trip so far). Each id checks in, then checks out, then may check in again.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>checkIn(45, "Leyton", 3)
checkIn(32, "Paradise", 8)
checkIn(27, "Leyton", 10)
checkOut(45, "Waterloo", 15)   // 15-3 = 12
checkOut(27, "Waterloo", 20)   // 20-10 = 10
checkOut(32, "Cambridge", 22)  // 22-8 = 14
getAverageTime("Paradise", "Cambridge") → 14.0
getAverageTime("Leyton", "Waterloo") → 11.0   // (12+10)/2</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= id, t &lt;= 10⁶</li><li>station names are non-empty and consist of English letters/digits/spaces</li><li>calls to checkIn/checkOut are always well formed (checkOut always follows a matching checkIn)</li><li>getAverageTime is only called on a route with at least one completed trip</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Two maps do all the work: id → (station, checkIn time) for trips in progress, and "start→end" route → (total time, trip count) for completed trips. checkOut is where a trip closes and both maps get updated.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>On checkIn, remember (station, time) for that id. On checkOut, pop that record, compute the elapsed time, and fold it into a running total/count keyed by the "start→end" route string. getAverageTime is then just totalTime / count for that route key.</p>
<pre class="code" data-lang="java"><code>class UndergroundSystem {
    private final Map&lt;Integer, Object[]&gt; checkIns = new HashMap&lt;&gt;(); // id -&gt; [station, time]
    private final Map&lt;String, double[]&gt; stats = new HashMap&lt;&gt;();     // route -&gt; [totalTime, count]

    public void checkIn(int id, String stationName, int t) {
        checkIns.put(id, new Object[]{stationName, t});
    }
    public void checkOut(int id, String stationName, int t) {
        Object[] in = checkIns.remove(id);
        String start = (String) in[0];
        int startTime = (int) in[1];
        String route = start + "-&gt;" + stationName;
        double[] s = stats.computeIfAbsent(route, k -&gt; new double[2]);
        s[0] += (t - startTime);
        s[1] += 1;
    }
    public double getAverageTime(String startStation, String endStation) {
        double[] s = stats.get(startStation + "-&gt;" + endStation);
        return s[0] / s[1];
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Operations: <code>checkIn(45,Leyton,3); checkIn(32,Paradise,8); checkIn(27,Leyton,10); checkOut(45,Waterloo,15); checkOut(27,Waterloo,20); checkOut(32,Cambridge,22); getAverageTime(Paradise,Cambridge); getAverageTime(Leyton,Waterloo)</code></p>
<table class="tbl">
<tr><th>call</th><th>effect</th><th>result</th></tr>
<tr><td>checkIn(45,Leyton,3)</td><td>checkIns[45]=(Leyton,3)</td><td>—</td></tr>
<tr><td>checkIn(32,Paradise,8)</td><td>checkIns[32]=(Paradise,8)</td><td>—</td></tr>
<tr><td>checkIn(27,Leyton,10)</td><td>checkIns[27]=(Leyton,10)</td><td>—</td></tr>
<tr><td>checkOut(45,Waterloo,15)</td><td>Leyton→Waterloo: total=12, count=1</td><td>—</td></tr>
<tr><td>checkOut(27,Waterloo,20)</td><td>Leyton→Waterloo: total=22, count=2</td><td>—</td></tr>
<tr><td>checkOut(32,Cambridge,22)</td><td>Paradise→Cambridge: total=14, count=1</td><td>—</td></tr>
<tr><td>getAverageTime(Paradise,Cambridge)</td><td>14/1</td><td>14.0</td></tr>
<tr><td>getAverageTime(Leyton,Waterloo)</td><td>22/2</td><td>11.0</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) average for every operation. Space: O(active trips + distinct routes).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Aggregating into a running (sum, count) per route avoids ever storing individual trip durations — the average is always O(1) to compute, no matter how many trips accumulate.</div>`});

/* Problem 209 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q209 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 209 · MEDIUM</span>Snake Game</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Design</span><span class="pill">Simulation</span><span class="pill">Deque</span></div>
<p class="dropcap">Design a Snake game on a <code>width x height</code> grid. <code>move(direction)</code> ('U','D','L','R') advances the snake one cell; eating food (cells given in order) grows the snake by one and scores a point; hitting a wall or the snake's own body ends the game (return -1). Otherwise return the current score.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>SnakeGame(3, 2, food = [[1,2],[0,1]])   // starts at (0,0)
move("R") → 0
move("D") → 0
move("R") → 1   // eats food[0]=(1,2)
move("U") → 1
move("L") → 2   // eats food[1]=(0,1)
move("U") → -1  // row goes to -1, out of bounds</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= width, height &lt;= 25</li><li>1 &lt;= food.length &lt;= 50</li><li>food[i].length == 2, and each food cell lies within the grid</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Represent the snake's body as a deque of (row,col) cells (head at the front) plus a hash set of the same cells for O(1) collision checks. The tail cell is always the one about to be vacated — remove it from the set before checking whether the new head collides.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Compute the new head from the direction and bounds-check it. Evict the tail from both the deque and the occupied set (it's about to move away), then check the new head against what's left. If it eats the next food cell, push the tail back on (the snake grows and keeps that cell occupied) and advance the food pointer.</p>
<pre class="code" data-lang="java"><code>class SnakeGame {
    private final int width, height;
    private final int[][] food;
    private int foodIndex = 0, score = 0;
    private final Deque&lt;int[]&gt; body = new ArrayDeque&lt;&gt;();
    private final Set&lt;Long&gt; occupied = new HashSet&lt;&gt;();

    public SnakeGame(int width, int height, int[][] food) {
        this.width = width; this.height = height; this.food = food;
        body.addFirst(new int[]{0, 0});
        occupied.add(0L);
    }
    public int move(String direction) {
        int[] head = body.peekFirst();
        int r = head[0], c = head[1];
        switch (direction) {
            case "U": r--; break;
            case "D": r++; break;
            case "L": c--; break;
            case "R": c++; break;
        }
        if (r &lt; 0 || r &gt;= height || c &lt; 0 || c &gt;= width) return -1;

        int[] tail = body.peekLast();
        body.removeLast();
        occupied.remove((long) tail[0] * width + tail[1]);

        long newKey = (long) r * width + c;
        if (occupied.contains(newKey)) return -1;
        body.addFirst(new int[]{r, c});
        occupied.add(newKey);

        if (foodIndex &lt; food.length &amp;&amp; food[foodIndex][0] == r &amp;&amp; food[foodIndex][1] == c) {
            foodIndex++; score++;
            body.addLast(tail);
            occupied.add((long) tail[0] * width + tail[1]);
        }
        return score;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Grid 3×2, food = [[1,2],[0,1]], start (0,0). Operations: <code>move(R); move(D); move(R); move(U); move(L); move(U)</code></p>
<table class="tbl">
<tr><th>call</th><th>new head</th><th>food eaten?</th><th>result</th></tr>
<tr><td>move(R)</td><td>(0,1)</td><td>no</td><td>0</td></tr>
<tr><td>move(D)</td><td>(1,1)</td><td>no</td><td>0</td></tr>
<tr><td>move(R)</td><td>(1,2)</td><td>yes, food[0] — grows, score=1</td><td>1</td></tr>
<tr><td>move(U)</td><td>(0,2)</td><td>no</td><td>1</td></tr>
<tr><td>move(L)</td><td>(0,1)</td><td>yes, food[1] — grows, score=2</td><td>2</td></tr>
<tr><td>move(U)</td><td>(-1,1)</td><td>out of bounds</td><td>-1</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) per move. Space: O(snake length + food length).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Removing the tail from the occupied set before checking the new head is what correctly allows a snake to move into the cell its own tail is vacating — a subtle edge case that trips up a naive "check collision against the whole body" approach.</div>`});

/* Problem 210 */
B.spread(
{ kicker: 'DSA · DESIGN & SIMULATION', head: 'Q210 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 210 · EASY</span>Design Parking System</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Design</span><span class="pill">Array</span></div>
<p class="dropcap">Design a parking system for three vehicle sizes — big (1), medium (2), small (3) — with fixed slot counts. <code>addCar(carType)</code> parks a car of that type if a slot is free (returns true and decrements that count), otherwise returns false.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>ParkingSystem(1, 1, 0)
addCar(1) → true    // big: 1 → 0
addCar(2) → true    // medium: 1 → 0
addCar(3) → false   // small: 0 slots to begin with
addCar(1) → false   // big: 0 slots left</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>0 &lt;= big, medium, small &lt;= 1000</li><li>carType is 1, 2, or 3</li><li>at most 1000 calls to addCar</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Three counters is the entire structure — resist the urge to model this as a general-purpose "design" problem; it's really just decrement-and-check.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>A single 4-slot int array indexed directly by carType (1,2,3), initialized from the constructor's arguments. addCar checks and decrements the matching slot in one step.</p>
<pre class="code" data-lang="java"><code>class ParkingSystem {
    private final int[] slots = new int[4]; // 1=big, 2=medium, 3=small

    public ParkingSystem(int big, int medium, int small) {
        slots[1] = big; slots[2] = medium; slots[3] = small;
    }
    public boolean addCar(int carType) {
        if (slots[carType] &gt; 0) {
            slots[carType]--;
            return true;
        }
        return false;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">ParkingSystem(1,1,0) → slots=[_,1,1,0]. Operations: <code>addCar(1); addCar(2); addCar(3); addCar(1)</code></p>
<table class="tbl">
<tr><th>call</th><th>slots[carType] before</th><th>state after</th><th>result</th></tr>
<tr><td>addCar(1)</td><td>slots[1]=1</td><td>slots[1]=0</td><td>true</td></tr>
<tr><td>addCar(2)</td><td>slots[2]=1</td><td>slots[2]=0</td><td>true</td></tr>
<tr><td>addCar(3)</td><td>slots[3]=0</td><td>unchanged</td><td>false</td></tr>
<tr><td>addCar(1)</td><td>slots[1]=0</td><td>unchanged</td><td>false</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(1) per call. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Not every "design" question needs a fancy structure — recognizing when three integers suffice is itself the skill being tested.</div>`});

})();
