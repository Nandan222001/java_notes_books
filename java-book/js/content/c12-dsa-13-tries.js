/* ===== CHAPTER 44 · DSA: Tries (Prefix Trees) ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 44, 'DSA: Tries (Prefix Trees)');

/* Problem 121 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q121 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 121 · MEDIUM</span>Implement Trie (Prefix Tree)</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Trie</span><span class="pill">Design</span></div>
<p class="dropcap">Implement a trie with <code>insert(word)</code>, <code>search(word)</code> (exact match), and <code>startsWith(prefix)</code> (any word begins with this prefix).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>insert("apple"); search("apple") → true
search("app") → false
startsWith("app") → true
insert("app"); search("app") → true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= word.length &lt;= 2000</li><li>lowercase English letters only</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Each node holds 26 child pointers (one per letter) and a boolean marking "a word ends here" — insertion and lookup both just walk pointers character by character.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Each <code>TrieNode</code> has a fixed array of 26 children and an <code>isEnd</code> flag. <code>insert</code> walks/creates nodes per character then marks the last one's <code>isEnd</code>. <code>search</code> and <code>startsWith</code> share a walk helper, differing only in whether they require <code>isEnd</code> at the destination.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}
class Trie {
    TrieNode root = new TrieNode();
    public void insert(String word) {
        TrieNode cur = root;
        for (char ch : word.toCharArray()) {
            int i = ch - 'a';
            if (cur.children[i] == null) cur.children[i] = new TrieNode();
            cur = cur.children[i];
        }
        cur.isEnd = true;
    }
    private TrieNode walk(String s) {
        TrieNode cur = root;
        for (char ch : s.toCharArray()) {
            cur = cur.children[ch - 'a'];
            if (cur == null) return null;
        }
        return cur;
    }
    public boolean search(String word) {
        TrieNode node = walk(word);
        return node != null &amp;&amp; node.isEnd;
    }
    public boolean startsWith(String prefix) {
        return walk(prefix) != null;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>insert("app")</code> then <code>search("app")</code></p>
<table class="tbl">
<tr><th>char</th><th>action</th></tr>
<tr><td>a</td><td>root.children['a'] created → cur = node_a</td></tr>
<tr><td>p</td><td>node_a.children['p'] created → cur = node_ap</td></tr>
<tr><td>p</td><td>node_ap.children['p'] created → cur = node_app; isEnd = true</td></tr>
</table>
<p class="fs13">search("app") walks the same 3 nodes, reaches node_app, checks <code>isEnd == true</code> → returns <code>true</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(L) per operation, L = word length. Space: O(total characters inserted).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A trie trades memory for turning "does any word share this prefix?" into an O(L) pointer walk instead of scanning every word.</div>`});

/* Problem 122 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q122 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 122 · MEDIUM</span>Design Add and Search Words Data Structure</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Trie</span><span class="pill">DFS</span><span class="pill">Design</span></div>
<p class="dropcap">Design a data structure supporting <code>addWord(word)</code> and <code>search(word)</code>, where the search word may contain <code>.</code> characters that each match any single letter.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>addWord("bad"); addWord("dad"); addWord("mad");
search("pad") → false
search("bad") → true
search(".ad") → true
search("b..") → true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= word.length &lt;= 25</li><li>word in addWord: lowercase letters only</li><li>word in search: lowercase letters and '.'</li><li>at most 10⁴ calls total, at most 2 dots per search call</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Same trie as before for storage, but search needs backtracking DFS: on a '.', try every non-null child instead of following one fixed pointer.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Insertion is identical to a plain trie. Search is a recursive DFS over (node, index): a normal letter follows one child pointer; a <code>.</code> fans out and tries every non-null child, returning true if any branch succeeds. Base case: index reaches the word's length → check <code>isEnd</code>.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}
class WordDictionary {
    TrieNode root = new TrieNode();
    public void addWord(String word) {
        TrieNode cur = root;
        for (char ch : word.toCharArray()) {
            int i = ch - 'a';
            if (cur.children[i] == null) cur.children[i] = new TrieNode();
            cur = cur.children[i];
        }
        cur.isEnd = true;
    }
    public boolean search(String word) {
        return dfs(word, 0, root);
    }
    private boolean dfs(String word, int idx, TrieNode node) {
        if (node == null) return false;
        if (idx == word.length()) return node.isEnd;
        char ch = word.charAt(idx);
        if (ch != '.') return dfs(word, idx + 1, node.children[ch - 'a']);
        for (TrieNode child : node.children) {
            if (dfs(word, idx + 1, child)) return true;
        }
        return false;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: dictionary has "bad", "dad", "mad"; <code>search(".ad")</code></p>
<table class="tbl">
<tr><th>idx</th><th>char</th><th>action</th></tr>
<tr><td>0</td><td>.</td><td>fan out: try children 'b','d','m' at root</td></tr>
<tr><td>1 (via b)</td><td>a</td><td>dfs(".ad",2,node_ba) — follow 'a' pointer</td></tr>
<tr><td>2 (via ba)</td><td>d</td><td>dfs(...,3,node_bad) — follow 'd' pointer</td></tr>
<tr><td>3</td><td>—</td><td>idx==len → node_bad.isEnd == true → returns true</td></tr>
</table>
<p class="fs13">First branch ('b') already returns true, so 'd' and 'm' branches are never explored.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(26^d · L) worst case where d = number of dots (bounded by 2 here), O(L) with none. Space: O(L) recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>A wildcard in a trie search is just DFS with a branch point — instead of one pointer, loop over all 26 and OR the results together.</div>`});

/* Problem 123 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q123 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 123 · HARD</span>Word Search II</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Trie</span><span class="pill">Backtracking</span><span class="pill">Grid</span></div>
<p class="dropcap">Given an <code>m x n</code> board of characters and a list of words, return all words from the list that can be formed by a path of adjacent cells (horizontally or vertically neighboring), using each cell at most once per word.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
       words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= m, n &lt;= 12</li><li>1 &lt;= words.length &lt;= 3 &times; 10⁴</li><li>1 &lt;= word.length &lt;= 10</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Running backtracking search once per word from every cell is too slow. Instead build ONE trie of all words, then do a single DFS over the board that walks the trie in lockstep — this shares work across words with common prefixes and lets you prune the instant no word matches.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Insert every word into a trie, storing the full word string at the terminal node (simplifies collection). DFS from each board cell, carrying the current trie node; if the cell's letter has no matching child, prune immediately. Mark visited cells with a sentinel, backtrack after recursing, and clear a node's stored word after collecting it to avoid duplicate hits.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[26];
    String word = null;
}
public List&lt;String&gt; findWords(char[][] board, String[] words) {
    TrieNode root = new TrieNode();
    for (String w : words) {
        TrieNode cur = root;
        for (char ch : w.toCharArray()) {
            int i = ch - 'a';
            if (cur.children[i] == null) cur.children[i] = new TrieNode();
            cur = cur.children[i];
        }
        cur.word = w;
    }
    List&lt;String&gt; result = new ArrayList&lt;&gt;();
    int m = board.length, n = board[0].length;
    for (int r = 0; r &lt; m; r++)
        for (int c = 0; c &lt; n; c++)
            dfs(board, r, c, root, result);
    return result;
}
private void dfs(char[][] board, int r, int c, TrieNode node, List&lt;String&gt; result) {
    if (r &lt; 0 || c &lt; 0 || r &gt;= board.length || c &gt;= board[0].length) return;
    char ch = board[r][c];
    if (ch == '#' || node.children[ch - 'a'] == null) return;
    TrieNode next = node.children[ch - 'a'];
    if (next.word != null) {
        result.add(next.word);
        next.word = null; // avoid duplicate collection
    }
    board[r][c] = '#';
    dfs(board, r + 1, c, next, result);
    dfs(board, r - 1, c, next, result);
    dfs(board, r, c + 1, next, result);
    dfs(board, r, c - 1, next, result);
    board[r][c] = ch;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: words = ["eat"], starting DFS at board[1][1]='t'... trace instead starts at board[1][3]='e' → board[2][3]='r'... use board[1][0]='e' path e→a→t</p>
<table class="tbl">
<tr><th>cell</th><th>char</th><th>trie node</th><th>action</th></tr>
<tr><td>(1,0)</td><td>e</td><td>root.children['e'] exists</td><td>mark '#', recurse to neighbors</td></tr>
<tr><td>(2,0)</td><td>i</td><td>node_e has no child 'i'</td><td>pruned, backtrack</td></tr>
<tr><td>(1,1)</td><td>t</td><td>node_e has no child 't'</td><td>pruned, backtrack</td></tr>
<tr><td>(0,0)</td><td>o</td><td>node_e has no child 'o'</td><td>pruned (only valid move is via 'a')</td></tr>
</table>
<p class="fs13">Full match path e(1,0)→a→t reaches node with <code>word="eat"</code> → added to result, then cleared to prevent re-adding on a later DFS start.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n·4^L) worst case, L = max word length, but the shared trie prunes far earlier than per-word search. Space: O(sum of word lengths) for the trie.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Building one trie for ALL target words and walking it in lockstep with the grid DFS is the pattern that turns an O(words &times; boggle-search) brute force into a single shared search.</div>`});

/* Problem 124 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q124 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 124 · MEDIUM</span>Replace Words</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Trie</span><span class="pill">String</span></div>
<p class="dropcap">Given a dictionary of root words and a sentence, replace every word in the sentence that has a root as a prefix with that (shortest) root. If a word has multiple matching roots, use the shortest one; if none match, leave the word unchanged.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= dictionary.length &lt;= 1000</li><li>1 &lt;= sentence words &lt;= 1000</li><li>lowercase English letters only</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Insert all roots into a trie, then for each sentence word walk the trie character by character and stop at the FIRST <code>isEnd</code> you hit — that's automatically the shortest matching root.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build a trie from the roots. For each word, walk the trie; the moment a node with <code>isEnd == true</code> is reached, the prefix walked so far is the shortest root — return it immediately. If the walk falls off the trie (missing child) or never hits an end before the word is exhausted, keep the original word.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}
public String replaceWords(List&lt;String&gt; dictionary, String sentence) {
    TrieNode root = new TrieNode();
    for (String r : dictionary) {
        TrieNode cur = root;
        for (char ch : r.toCharArray()) {
            int i = ch - 'a';
            if (cur.children[i] == null) cur.children[i] = new TrieNode();
            cur = cur.children[i];
        }
        cur.isEnd = true;
    }
    StringBuilder sb = new StringBuilder();
    for (String word : sentence.split(" ")) {
        if (sb.length() &gt; 0) sb.append(" ");
        sb.append(shortestRoot(word, root));
    }
    return sb.toString();
}
private String shortestRoot(String word, TrieNode root) {
    TrieNode cur = root;
    StringBuilder prefix = new StringBuilder();
    for (char ch : word.toCharArray()) {
        int i = ch - 'a';
        if (cur.children[i] == null) return word;
        prefix.append(ch);
        cur = cur.children[i];
        if (cur.isEnd) return prefix.toString();
    }
    return word;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: dictionary = ["cat","bat","rat"], word = "cattle"</p>
<table class="tbl">
<tr><th>char</th><th>prefix</th><th>cur.isEnd?</th><th>action</th></tr>
<tr><td>c</td><td>c</td><td>false</td><td>continue</td></tr>
<tr><td>a</td><td>ca</td><td>false</td><td>continue</td></tr>
<tr><td>t</td><td>cat</td><td>true</td><td>return "cat" immediately</td></tr>
</table>
<p class="fs13">"tle" is never examined — the walk stops at the first completed root, guaranteeing the shortest one.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(sum of dictionary lengths) to build + O(sentence length) to replace. Space: O(sum of dictionary root characters).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Shortest matching prefix" is exactly "first isEnd hit while walking down" — no need to collect all matches and compare lengths.</div>`});

/* Problem 125 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q125 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 125 · MEDIUM</span>Longest Word in Dictionary</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Trie</span><span class="pill">DFS</span></div>
<p class="dropcap">Given an array of strings <code>words</code>, return the longest word that can be built one character at a time by other words in the array (every prefix of the word, including the word itself minus its last letter down to length 1, must also be in the array). If there are ties, return the lexicographically smallest one.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: words = ["w","wo","wor","worl","world"]
Output: "world"
Explanation: every prefix "w","wo","wor","worl" is also present</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= words.length &lt;= 1000</li><li>1 &lt;= words[i].length &lt;= 30</li><li>lowercase English letters only</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Insert every word into a trie marking isEnd, then DFS from the root, only descending into a child if that child is ALSO an end-of-word node — that enforces "buildable one letter at a time".</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>After inserting all words, DFS the trie top-down but only step into a child node when it is marked <code>isEnd</code> — that mirrors "this exact prefix exists as its own word". Track the best (longest, then lexicographically smallest) string seen at any visited end node. Sorting words first lets a simpler prefix-set check work too, but the trie DFS avoids sorting and generalizes better.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}
TrieNode root = new TrieNode();
String best = "";
public String longestWord(String[] words) {
    for (String w : words) insert(w);
    dfs(root, new StringBuilder());
    return best;
}
private void insert(String w) {
    TrieNode cur = root;
    for (char ch : w.toCharArray()) {
        int i = ch - 'a';
        if (cur.children[i] == null) cur.children[i] = new TrieNode();
        cur = cur.children[i];
    }
    cur.isEnd = true;
}
private void dfs(TrieNode node, StringBuilder path) {
    for (int i = 0; i &lt; 26; i++) {
        TrieNode child = node.children[i];
        if (child != null &amp;&amp; child.isEnd) {
            path.append((char) ('a' + i));
            if (path.length() &gt; best.length()) best = path.toString();
            dfs(child, path);
            path.deleteCharAt(path.length() - 1);
        }
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: words = ["w","wo","wor","worl","world"] (all prefixes present)</p>
<table class="tbl">
<tr><th>path</th><th>node.isEnd?</th><th>best updated?</th></tr>
<tr><td>"w"</td><td>true</td><td>best = "w"</td></tr>
<tr><td>"wo"</td><td>true</td><td>best = "wo"</td></tr>
<tr><td>"wor"</td><td>true</td><td>best = "wor"</td></tr>
<tr><td>"worl"</td><td>true</td><td>best = "worl"</td></tr>
<tr><td>"world"</td><td>true</td><td>best = "world" (final)</td></tr>
</table>
<p class="fs13">Iterating children in index order (a→z) at each level also handles ties: the first-found longest string is already the lexicographically smallest.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(sum of word lengths) — build + DFS both linear in total characters. Space: O(sum of word lengths) for the trie.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Only recurse into isEnd children" is the trie idiom for any "must be buildable step by step from smaller valid pieces" constraint.</div>`});

/* Problem 126 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q126 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 126 · MEDIUM</span>Maximum XOR of Two Numbers in an Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Trie</span><span class="pill">Bit Manipulation</span></div>
<p class="dropcap">Given an integer array <code>nums</code>, find the maximum value of <code>nums[i] XOR nums[j]</code> over all pairs <code>0 &lt;= i &lt;= j &lt; nums.length</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: 5 XOR 25 = 28 (00101 XOR 11001 = 11100)</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 2 &times; 10⁵</li><li>0 &lt;= nums[i] &lt;= 2³¹ − 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Build a binary trie over the 32-bit representation of every number (MSB first). For each number, greedily walk the trie choosing the OPPOSITE bit at every level when available — that greedily maximizes the XOR with some number already inserted.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Each trie node has two children: bit 0 and bit 1. Insert every number bit by bit from bit 31 down to bit 0. Then for each number, walk the trie again trying to go to the opposite bit at each level (maximizing XOR contribution 2^k at that position); if the opposite branch doesn't exist, fall back to the same bit. Track the best XOR found.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[2];
}
public int findMaximumXOR(int[] nums) {
    TrieNode root = new TrieNode();
    for (int num : nums) insert(root, num);
    int max = 0;
    for (int num : nums) max = Math.max(max, query(root, num));
    return max;
}
private void insert(TrieNode root, int num) {
    TrieNode cur = root;
    for (int b = 31; b &gt;= 0; b--) {
        int bit = (num &gt;&gt; b) &amp; 1;
        if (cur.children[bit] == null) cur.children[bit] = new TrieNode();
        cur = cur.children[bit];
    }
}
private int query(TrieNode root, int num) {
    TrieNode cur = root;
    int result = 0;
    for (int b = 31; b &gt;= 0; b--) {
        int bit = (num &gt;&gt; b) &amp; 1;
        int wanted = 1 - bit;
        if (cur.children[wanted] != null) {
            result |= (1 &lt;&lt; b);
            cur = cur.children[wanted];
        } else {
            cur = cur.children[bit];
        }
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: nums = [5, 25] as 5-bit values 00101, 11001 — trie built from both; query(5)</p>
<table class="tbl">
<tr><th>bit pos</th><th>bit of 5</th><th>wanted</th><th>available?</th><th>action</th></tr>
<tr><td>4</td><td>0</td><td>1</td><td>yes (from 25)</td><td>result bit 4 = 1, descend to wanted</td></tr>
<tr><td>3</td><td>0</td><td>1</td><td>yes (25's bit)</td><td>result bit 3 = 1</td></tr>
<tr><td>2</td><td>1</td><td>0</td><td>yes (25's bit)</td><td>result bit 2 = 1</td></tr>
<tr><td>1</td><td>0</td><td>1</td><td>yes (25's bit)</td><td>result bit 1 = 1</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>yes (25's bit)</td><td>result bit 0 = 1</td></tr>
</table>
<p class="fs13">result = 11100₂ = 28, matching 5 XOR 25 = 28.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(32n) — 32 bits per number, build and query both linear in n. Space: O(32n) trie nodes worst case.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Maximizing XOR is a greedy "pick the opposite bit whenever possible, from most significant bit down" — the binary trie is what makes that opposite-bit lookup O(1) per level instead of scanning all numbers.</div>`});

/* Problem 127 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q127 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 127 · MEDIUM</span>Search Suggestions System</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Trie</span><span class="pill">Sorting</span></div>
<p class="dropcap">Given an array of product names and a search word, design a system that after each character the user types returns up to 3 lexicographically smallest products that share that prefix. Return a list of lists — one list of suggestions per prefix length typed.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [["mobile","moneypot","monitor"],
         ["mobile","moneypot","monitor"],
         ["mouse","mousepad"],
         ["mouse","mousepad"],
         ["mouse","mousepad"]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= products.length &lt;= 1000</li><li>1 &lt;= product length, searchWord length &lt;= 3000</li><li>lowercase English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Build a trie where each node caches up to 3 lexicographically smallest words passing through it (insert products in sorted order and push the word down at every node along its path, capped at 3). Then just walk the trie once per typed character.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort products first so insertion order is already lexicographic. During insert, at every node on the path append the current word to that node's suggestion list if it has fewer than 3 entries. Then walk the trie once, one character of searchWord at a time; at each step append the current node's cached list (or an empty list once the path breaks) to the answer.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[26];
    List&lt;String&gt; suggestions = new ArrayList&lt;&gt;();
}
public List&lt;List&lt;String&gt;&gt; suggestedProducts(String[] products, String searchWord) {
    Arrays.sort(products);
    TrieNode root = new TrieNode();
    for (String p : products) {
        TrieNode cur = root;
        for (char ch : p.toCharArray()) {
            int i = ch - 'a';
            if (cur.children[i] == null) cur.children[i] = new TrieNode();
            cur = cur.children[i];
            if (cur.suggestions.size() &lt; 3) cur.suggestions.add(p);
        }
    }
    List&lt;List&lt;String&gt;&gt; result = new ArrayList&lt;&gt;();
    TrieNode cur = root;
    boolean broken = false;
    for (char ch : searchWord.toCharArray()) {
        if (!broken) {
            cur = cur.children[ch - 'a'];
            if (cur == null) broken = true;
        }
        result.add(broken ? new ArrayList&lt;&gt;() : new ArrayList&lt;&gt;(cur.suggestions));
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Sorted products: ["mobile","moneypot","monitor","mouse","mousepad"]; searchWord = "mo" (first 2 chars)</p>
<table class="tbl">
<tr><th>char typed</th><th>node reached</th><th>suggestions cached there</th></tr>
<tr><td>m</td><td>node_m</td><td>[mobile, moneypot, monitor] (capped at 3, in insertion/sorted order)</td></tr>
<tr><td>o</td><td>node_mo</td><td>[mobile, moneypot, monitor]</td></tr>
</table>
<p class="fs13">Continuing with "use" from "mouse": at node_mou, "mobile"/"moneypot"/"monitor" no longer share the prefix, so that node's cached list is only [mouse, mousepad] — built fresh during insertion, not filtered at query time.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log n) to sort + O(sum of product lengths) to build + O(searchWord length) to query. Space: O(n) for cached suggestions (at most 3 strings per node).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Caching the top-3 AT INSERT TIME (since products are pre-sorted) turns every query character into an O(1) lookup instead of re-searching the subtree each keystroke.</div>`});

/* Problem 128 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q128 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 128 · MEDIUM</span>Map Sum Pairs</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Trie</span><span class="pill">Design</span></div>
<p class="dropcap">Design a map that supports <code>insert(key, val)</code> (overwriting any existing value for that exact key) and <code>sum(prefix)</code>, which returns the sum of values for every key-value pair whose key starts with <code>prefix</code>.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>insert("apple", 3); sum("ap") → 3
insert("app", 2); sum("ap") → 5
Explanation: after both inserts, "apple"→3 and "app"→2 both start with "ap"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= key.length &lt;= 50</li><li>1 &lt;= val &lt;= 1000</li><li>lowercase English letters and digits; at most 50 calls to insert and sum</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Re-inserting a key must correctly REPLACE, not add to, its old value — track raw key→value pairs separately, and on insert apply the delta (newVal − oldVal) along the trie path so every prefix sum stays correct.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Keep a HashMap of key → value for exact lookups. Each trie node stores a running <code>sum</code> of all values inserted through it. On insert, compute <code>delta = newVal - oldVal</code> (0 if the key is new) and add that delta to every node along the key's path — this keeps all prefix sums correct even when a key is overwritten. <code>sum(prefix)</code> just walks to the prefix's node and returns its cached sum.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[26];
    int sum = 0;
}
class MapSum {
    TrieNode root = new TrieNode();
    Map&lt;String, Integer&gt; map = new HashMap&lt;&gt;();
    public void insert(String key, int val) {
        int delta = val - map.getOrDefault(key, 0);
        map.put(key, val);
        TrieNode cur = root;
        cur.sum += delta;
        for (char ch : key.toCharArray()) {
            int i = ch - 'a';
            if (cur.children[i] == null) cur.children[i] = new TrieNode();
            cur = cur.children[i];
            cur.sum += delta;
        }
    }
    public int sum(String prefix) {
        TrieNode cur = root;
        for (char ch : prefix.toCharArray()) {
            cur = cur.children[ch - 'a'];
            if (cur == null) return 0;
        }
        return cur.sum;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>insert("apple",3)</code>, <code>sum("ap")</code>=3, then <code>insert("app",2)</code>, <code>sum("ap")</code></p>
<table class="tbl">
<tr><th>call</th><th>delta</th><th>nodes updated</th><th>node "ap".sum after</th></tr>
<tr><td>insert("apple",3)</td><td>3-0=3</td><td>root,a,ap,app,appl,apple each +3</td><td>3</td></tr>
<tr><td>insert("app",2)</td><td>2-0=2</td><td>root,a,ap,app each +2</td><td>3+2=5</td></tr>
<tr><td>sum("ap")</td><td>—</td><td>walk root→a→ap, read cached sum</td><td>returns 5</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(L) per insert and per sum, L = key/prefix length. Space: O(sum of key lengths).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Caching an aggregate (sum, count, max) AT EVERY NODE turns "sum of everything under this prefix" from an O(subtree size) DFS into an O(1) read — but only works cleanly if you handle overwrites via a delta, not a blind add.</div>`});

/* Problem 129 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q129 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 129 · MEDIUM</span>Implement Magic Dictionary</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Trie</span><span class="pill">DFS</span><span class="pill">Design</span></div>
<p class="dropcap">Design a data structure that, after being built from a dictionary of distinct words via <code>buildDict(words)</code>, supports <code>search(searchWord)</code> — returning true if changing EXACTLY one character of searchWord turns it into some word in the dictionary (the changed character must differ from the original).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>buildDict(["hello","leetcode"])
search("hello") → false  (no character may be changed — must differ from original)
search("hhllo") → true   (change 2nd char h→e)
search("hell")  → false  (wrong length)
search("leetcoded") → false</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= words.length &lt;= 100</li><li>1 &lt;= word length &lt;= 100, lowercase English letters, all distinct</li><li>at most 100 search calls</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Insert all dictionary words into a trie, then DFS the searchWord through it allowing exactly one substitution: at each position, either follow the matching child normally, OR (if a substitution hasn't been used yet) try every OTHER non-null child and continue matching the rest of the word exactly.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Build a standard trie from the dictionary. <code>search</code> is a DFS over <code>(node, index, changesUsed)</code>: for the current character, recurse into the matching child with the budget unchanged; additionally, if no change has been used yet, recurse into every OTHER non-null child with the budget spent. Success = reaching the end of the word at a node with <code>isEnd == true</code> AND having used exactly one change.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}
class MagicDictionary {
    TrieNode root = new TrieNode();
    public void buildDict(String[] words) {
        for (String w : words) {
            TrieNode cur = root;
            for (char ch : w.toCharArray()) {
                int i = ch - 'a';
                if (cur.children[i] == null) cur.children[i] = new TrieNode();
                cur = cur.children[i];
            }
            cur.isEnd = true;
        }
    }
    public boolean search(String word) {
        return dfs(word, 0, root, false);
    }
    private boolean dfs(String word, int idx, TrieNode node, boolean used) {
        if (node == null) return false;
        if (idx == word.length()) return used &amp;&amp; node.isEnd;
        int want = word.charAt(idx) - 'a';
        for (int i = 0; i &lt; 26; i++) {
            if (node.children[i] == null) continue;
            if (i == want) {
                if (dfs(word, idx + 1, node.children[i], used)) return true;
            } else if (!used) {
                if (dfs(word, idx + 1, node.children[i], true)) return true;
            }
        }
        return false;
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Dictionary has "hello"; <code>search("hhllo")</code> — differs from "hello" only at index 1 (h vs e)</p>
<table class="tbl">
<tr><th>idx</th><th>char in word</th><th>branch taken</th><th>used</th></tr>
<tr><td>0</td><td>h</td><td>matches child 'h' exactly</td><td>false</td></tr>
<tr><td>1</td><td>h</td><td>only child here is 'e' → substitution branch (h≠e, used was false)</td><td>true</td></tr>
<tr><td>2</td><td>l</td><td>matches child 'l' exactly</td><td>true</td></tr>
<tr><td>3</td><td>l</td><td>matches child 'l' exactly</td><td>true</td></tr>
<tr><td>4</td><td>o</td><td>matches child 'o' exactly; idx==5 → used &amp;&amp; isEnd</td><td>true → returns true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(L·26) per search worst case, L = word length. Space: O(sum of dictionary word lengths) for the trie.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Exactly one edit allowed" is modeled by carrying a used/unused budget flag through the trie DFS — the same skeleton generalizes to "at most k edits" by carrying an integer budget instead of a boolean.</div>`});

/* Problem 130 */
B.spread(
{ kicker: 'DSA · TRIES', head: 'Q130 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 130 · HARD</span>Concatenated Words</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Trie</span><span class="pill">DP</span><span class="pill">DFS</span></div>
<p class="dropcap">Given an array of distinct words, return all words that can be formed by concatenating at least two shorter words from the same array (words can repeat in the concatenation).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
Explanation: e.g. "ratcatdogcat" = "rat"+"cat"+"dog"+"cat"</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= words.length &lt;= 10⁴</li><li>0 &lt;= word length &lt;= 30, lowercase English letters, all distinct</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Insert every word into a trie. For each candidate word, run a DP/DFS over its indices: <code>canForm(word, start)</code> is true if some prefix from start is a complete dictionary word AND the remainder is also formable — with the constraint that at least 2 pieces are used (skip using the whole word itself as one single piece).</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Insert all words into a trie. For each word, DFS from index 0 walking the trie char by char; whenever the trie signals <code>isEnd</code> at some index (and that index isn't the very end unless a piece boundary already happened, tracked via a "count" of pieces used), recursively try to break the remaining suffix the same way. Memoize failed starting indices to avoid recomputation. A word qualifies if it can be split into &gt;= 2 dictionary pieces.</p>
<pre class="code" data-lang="java"><code>class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}
TrieNode root = new TrieNode();
public List&lt;String&gt; findAllConcatenatedWordsInADict(String[] words) {
    for (String w : words) insert(w);
    List&lt;String&gt; result = new ArrayList&lt;&gt;();
    for (String w : words) {
        if (w.isEmpty()) continue;
        if (canBreak(w, 0, 0)) result.add(w);
    }
    return result;
}
private void insert(String w) {
    TrieNode cur = root;
    for (char ch : w.toCharArray()) {
        int i = ch - 'a';
        if (cur.children[i] == null) cur.children[i] = new TrieNode();
        cur = cur.children[i];
    }
    cur.isEnd = true;
}
// count = number of complete pieces used so far
private boolean canBreak(String w, int start, int count) {
    if (start == w.length()) return count &gt;= 2;
    TrieNode cur = root;
    for (int i = start; i &lt; w.length(); i++) {
        cur = cur.children[w.charAt(i) - 'a'];
        if (cur == null) return false;
        if (cur.isEnd &amp;&amp; canBreak(w, i + 1, count + 1)) return true;
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Dictionary contains "cat","cats","dog"; word = "catsdog" (checking a shorter analog of "catsdogcats")</p>
<table class="tbl">
<tr><th>call</th><th>i scanned</th><th>isEnd hit</th><th>action</th></tr>
<tr><td>canBreak("catsdog",0,0)</td><td>i=2 → "cat"</td><td>true</td><td>try canBreak(...,3,1)</td></tr>
<tr><td>canBreak("catsdog",3,1)</td><td>i=6 → "dog"</td><td>true</td><td>try canBreak(...,7,2)</td></tr>
<tr><td>canBreak("catsdog",7,2)</td><td>start==length</td><td>—</td><td>count(2)&gt;=2 → return true</td></tr>
<tr><td>canBreak("catsdog",0,0) alt path</td><td>i=3 → "cats"</td><td>true</td><td>never needed; first path already succeeded</td></tr>
</table>
<p class="fs13">"catsdog" is confirmed concatenated (cat+dog). The count&gt;=2 check is what excludes a word that is only itself a single dictionary entry.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n · L²) roughly — n words, each doing an O(L²) trie-DFS break check (L = word length). Space: O(sum of word lengths) for the trie plus O(L) recursion depth.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is Word Break, but the dictionary IS the input array and the DP must also track "used at least 2 pieces" — the trie replaces a HashSet to make each prefix-extension check O(1) per character instead of O(word length) per substring.</div>`});

})();
