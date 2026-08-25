/* ===== CHAPTER 33 · DSA: Two Pointers ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 33, 'DSA: Two Pointers');

/* Problem 011 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q011 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 011 · EASY</span>Valid Palindrome</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">String</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given a string <code>s</code>, return true if it's a palindrome after converting to lowercase and removing all non-alphanumeric characters.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" reads the same forwards and backwards</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 2 × 10⁵</li><li>s consists of printable ASCII characters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>You don't need to build a cleaned copy of the string — two pointers can skip junk characters in place.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Start pointers at both ends. Skip non-alphanumeric characters on either side, then compare lowercased characters; mismatch means not a palindrome. Pointers cross means success.</p>
<pre class="code" data-lang="java"><code>public boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l &lt; r) {
        while (l &lt; r &amp;&amp; !Character.isLetterOrDigit(s.charAt(l))) l++;
        while (l &lt; r &amp;&amp; !Character.isLetterOrDigit(s.charAt(r))) r--;
        if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
        l++; r--;
    }
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "ab, a"</code> (shortened for trace clarity)</p>
<table class="tbl">
<tr><th>l</th><th>r</th><th>s[l]</th><th>s[r]</th><th>action</th></tr>
<tr><td>0</td><td>4</td><td>'a'</td><td>'a'</td><td>match → l=1, r=3</td></tr>
<tr><td>1</td><td>3</td><td>'b'</td><td>skip ','→ r=2, 'a'</td><td>match → l=2, r=1</td></tr>
<tr><td>2</td><td>1</td><td>—</td><td>—</td><td>l &gt;= r → loop ends, return true</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each character visited once. Space: O(1) — no extra buffer.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Two pointers closing in from both ends avoids allocating a cleaned copy of the string entirely.</div>`});

/* Problem 012 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q012 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 012 · EASY</span>Two Sum II — Input Array Is Sorted</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given a <strong>1-indexed</strong> array <code>numbers</code> sorted in non-decreasing order, find two numbers that add up to <code>target</code>. Return their indices as <code>[index1, index2]</code> where <code>index1 &lt; index2</code>. Exactly one solution exists; you may not reuse the same element twice.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: numbers[1-1] + numbers[2-1] = 2 + 7 = 9</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>2 &lt;= numbers.length &lt;= 3 × 10⁴</li><li>-1000 &lt;= numbers[i] &lt;= 1000</li><li>numbers is sorted in non-decreasing order</li><li>Exactly one valid answer exists</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A HashMap solves this in O(n) too, but the array is already sorted — that fact is a free hint to use two pointers and drop to O(1) space.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Anchor pointers at both ends. If the pair sum is too small, the only way to grow it is moving <code>l</code> right (bigger value); if too big, move <code>r</code> left. Sortedness guarantees this never skips the answer.</p>
<pre class="code" data-lang="java"><code>public int[] twoSum(int[] numbers, int target) {
    int l = 0, r = numbers.length - 1;
    while (l &lt; r) {
        int sum = numbers[l] + numbers[r];
        if (sum == target) return new int[]{l + 1, r + 1};
        else if (sum &lt; target) l++;
        else r--;
    }
    return new int[]{-1, -1};
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>numbers = [1,2,4,6,8,9,14,15], target = 13</code></p>
<table class="tbl">
<tr><th>l</th><th>r</th><th>numbers[l]</th><th>numbers[r]</th><th>sum</th><th>action</th></tr>
<tr><td>0</td><td>7</td><td>1</td><td>15</td><td>16</td><td>16 &gt; 13 → r--</td></tr>
<tr><td>0</td><td>6</td><td>1</td><td>14</td><td>15</td><td>15 &gt; 13 → r--</td></tr>
<tr><td>0</td><td>5</td><td>1</td><td>9</td><td>10</td><td>10 &lt; 13 → l++</td></tr>
<tr><td>1</td><td>5</td><td>2</td><td>9</td><td>11</td><td>11 &lt; 13 → l++</td></tr>
<tr><td>2</td><td>5</td><td>4</td><td>9</td><td>13</td><td>match → return [3,6]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — pointers together traverse the array once. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Sorted array + pair target" is the interview signal word for two pointers over hashing — it trades O(n) space for O(1).</div>`});

/* Problem 013 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q013 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 013 · MEDIUM</span>3Sum</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Sorting</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given an integer array <code>nums</code>, return all unique triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j != k</code> and <code>nums[i] + nums[j] + nums[k] == 0</code>. The solution set must not contain duplicate triplets.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>3 &lt;= nums.length &lt;= 3000</li><li>-10⁵ &lt;= nums[i] &lt;= 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Sort first. Then fix one number and run the classic two-pointer pair-sum on the rest — skip duplicate values at every one of the three positions to avoid repeat triplets.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Sort the array. Loop <code>i</code> as the fixed first element (skipping repeats of the previous <code>i</code>), then two-pointer the remainder for <code>-nums[i]</code>. On a match, record the triplet and skip duplicate values at both <code>l</code> and <code>r</code> before continuing.</p>
<pre class="code" data-lang="java"><code>public List&lt;List&lt;Integer&gt;&gt; threeSum(int[] nums) {
    Arrays.sort(nums);
    List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; nums.length - 2; i++) {
        if (i &gt; 0 &amp;&amp; nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = nums.length - 1;
        while (l &lt; r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                while (l &lt; r &amp;&amp; nums[l] == nums[l + 1]) l++;
                while (l &lt; r &amp;&amp; nums[r] == nums[r - 1]) r--;
                l++; r--;
            } else if (sum &lt; 0) l++;
            else r--;
        }
    }
    return res;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Sorted input: <code>nums = [-4,-1,-1,0,1,2]</code> (indices 0..5)</p>
<table class="tbl">
<tr><th>i (nums[i])</th><th>l</th><th>r</th><th>sum</th><th>action</th></tr>
<tr><td>0 (-4)</td><td>1</td><td>5</td><td>-3</td><td>&lt; 0 → l++</td></tr>
<tr><td>0 (-4)</td><td>4</td><td>5</td><td>-1</td><td>&lt; 0 → l++ (l==r, i done)</td></tr>
<tr><td>1 (-1)</td><td>2</td><td>5</td><td>0</td><td>found [-1,-1,2] → l=3, r=4</td></tr>
<tr><td>1 (-1)</td><td>3</td><td>4</td><td>0</td><td>found [-1,0,1] → l=4, r=3 (done)</td></tr>
<tr><td>2 (-1)</td><td>—</td><td>—</td><td>—</td><td>nums[2]==nums[1] → skip (duplicate)</td></tr>
<tr><td>3 (0)</td><td>4</td><td>5</td><td>3</td><td>&gt; 0 → r-- (l==r, done)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) — n outer iterations × O(n) inner two-pointer sweep, plus O(n log n) sort. Space: O(1) extra (excluding output/sort space).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>3Sum = "fix one element, two-pointer the rest." This reduction pattern also unlocks 4Sum (fix two, two-pointer the rest).</div>`});

/* Problem 014 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q014 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 014 · MEDIUM</span>Container With Most Water</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Greedy</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given <code>n</code> non-negative integers <code>height[i]</code>, each representing a vertical line at <code>x = i</code>, find two lines that together with the x-axis form a container holding the most water. Return the maximum area.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: lines at index 1 (height 8) and index 8 (height 7) → area = min(8,7) × (8-1) = 49</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == height.length</li><li>2 &lt;= n &lt;= 10⁵</li><li>0 &lt;= height[i] &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Start with the widest possible container. The shorter wall is always the bottleneck — moving the taller wall inward can only shrink width without ever gaining height, so it never helps.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Start with pointers at the two ends (max width). At each step, area is <code>min(height[l], height[r]) × (r - l)</code>; track the best. Always move the pointer at the shorter wall inward — it's the only move that can possibly increase the area.</p>
<pre class="code" data-lang="java"><code>public int maxArea(int[] height) {
    int l = 0, r = height.length - 1, best = 0;
    while (l &lt; r) {
        int h = Math.min(height[l], height[r]);
        best = Math.max(best, h * (r - l));
        if (height[l] &lt; height[r]) l++;
        else r--;
    }
    return best;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>height = [1,8,6,2,5,4,8,3,7]</code> (indices 0..8)</p>
<table class="tbl">
<tr><th>l</th><th>r</th><th>h[l]</th><th>h[r]</th><th>area</th><th>best</th><th>move</th></tr>
<tr><td>0</td><td>8</td><td>1</td><td>7</td><td>1×8=8</td><td>8</td><td>l++</td></tr>
<tr><td>1</td><td>8</td><td>8</td><td>7</td><td>7×7=49</td><td>49</td><td>r--</td></tr>
<tr><td>1</td><td>7</td><td>8</td><td>3</td><td>3×6=18</td><td>49</td><td>r--</td></tr>
<tr><td>1</td><td>6</td><td>8</td><td>8</td><td>8×5=40</td><td>49</td><td>r--</td></tr>
<tr><td>1</td><td>5</td><td>8</td><td>4</td><td>4×4=16</td><td>49</td><td>r--</td></tr>
<tr><td>1</td><td>4</td><td>8</td><td>5</td><td>5×3=15</td><td>49</td><td>r--</td></tr>
<tr><td>1</td><td>3</td><td>8</td><td>2</td><td>2×2=4</td><td>49</td><td>r--</td></tr>
<tr><td>1</td><td>2</td><td>8</td><td>6</td><td>6×1=6</td><td>49</td><td>r-- (l==r, done)</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — each pointer moves at most n times total. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This is a greedy proof disguised as two pointers: discarding the shorter wall's current position is provably safe since no future pairing with it can beat what's already been measured.</div>`});

/* Problem 015 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q015 · Hard',
html: `<h2 class="chap"><span class="chnum">PROBLEM 015 · HARD</span>Trapping Rain Water</h2>
<div class="pillrow"><span class="pill" style="--pc:#c0392b">HARD</span><span class="pill">Array</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == height.length</li><li>1 &lt;= n &lt;= 2 × 10⁴</li><li>0 &lt;= height[i] &lt;= 10⁵</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Water above index i is bounded by the shorter of the tallest wall to its left and the tallest wall to its right. You don't need those two arrays precomputed — track running maxima with two pointers instead.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Track <code>leftMax</code>/<code>rightMax</code> while closing pointers inward. Whichever side is currently lower is the side whose water level is fully determined — that side's max is a hard ceiling regardless of what lies beyond the other pointer — so process it: add <code>currentMax - height[pointer]</code> and advance.</p>
<pre class="code" data-lang="java"><code>public int trap(int[] height) {
    int l = 0, r = height.length - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (l &lt; r) {
        if (height[l] &lt; height[r]) {
            leftMax = Math.max(leftMax, height[l]);
            water += leftMax - height[l];
            l++;
        } else {
            rightMax = Math.max(rightMax, height[r]);
            water += rightMax - height[r];
            r--;
        }
    }
    return water;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>height = [4,2,0,3,2,5]</code> (smaller array for trace clarity)</p>
<table class="tbl">
<tr><th>l</th><th>r</th><th>h[l]</th><th>h[r]</th><th>branch</th><th>water total</th></tr>
<tr><td>0</td><td>5</td><td>4</td><td>5</td><td>leftMax=4, +0, l++</td><td>0</td></tr>
<tr><td>1</td><td>5</td><td>2</td><td>5</td><td>leftMax=4, +2, l++</td><td>2</td></tr>
<tr><td>2</td><td>5</td><td>0</td><td>5</td><td>leftMax=4, +4, l++</td><td>6</td></tr>
<tr><td>3</td><td>5</td><td>3</td><td>5</td><td>leftMax=4, +1, l++</td><td>7</td></tr>
<tr><td>4</td><td>5</td><td>2</td><td>5</td><td>leftMax=4, +2, l++ (l==r, done)</td><td>9</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — single pass, each index visited once. Space: O(1) — no left/right max arrays needed.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The pointer on the lower wall is "safe" to resolve immediately because its ceiling (its own side's running max) can never be raised by anything the other pointer will encounter.</div>`});

/* Problem 016 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q016 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 016 · EASY</span>Remove Duplicates from Sorted Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given an integer array <code>nums</code> sorted in non-decreasing order, remove the duplicates in-place so each unique element appears only once. Return the number <code>k</code> of unique elements; the first <code>k</code> elements of <code>nums</code> must hold the result in order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 3 × 10⁴</li><li>-100 &lt;= nums[i] &lt;= 100</li><li>nums is sorted in non-decreasing order</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A slow pointer marks "last written unique position"; a fast pointer scans ahead. They only diverge when a new, never-seen value shows up.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Since the array is sorted, duplicates are always adjacent. Keep <code>slow</code> at the last confirmed-unique index; scan with <code>fast</code>. Whenever <code>nums[fast]</code> differs from <code>nums[slow]</code>, it's a new unique value — advance <code>slow</code> and overwrite it there.</p>
<pre class="code" data-lang="java"><code>public int removeDuplicates(int[] nums) {
    int slow = 0;
    for (int fast = 1; fast &lt; nums.length; fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [1,1,2,2,3]</code></p>
<table class="tbl">
<tr><th>fast</th><th>nums[fast]</th><th>slow</th><th>nums[slow]</th><th>action</th></tr>
<tr><td>1</td><td>1</td><td>0</td><td>1</td><td>equal → skip</td></tr>
<tr><td>2</td><td>2</td><td>0</td><td>1</td><td>differ → slow=1, nums[1]=2 → [1,2,2,2,3]</td></tr>
<tr><td>3</td><td>2</td><td>1</td><td>2</td><td>equal → skip</td></tr>
<tr><td>4</td><td>3</td><td>1</td><td>2</td><td>differ → slow=2, nums[2]=3 → [1,2,3,2,3]</td></tr>
</table>
<p class="fs13">Return <code>slow + 1 = 3</code>; first 3 elements <code>[1,2,3]</code> are the unique run.</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — single pass. Space: O(1) — overwrites in place.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>This "slow writes, fast reads" shape is the template for every in-place array-compaction problem — Remove Element, Move Zeroes, and this one all share it.</div>`});

/* Problem 017 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q017 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 017 · MEDIUM</span>Sort Colors (Dutch National Flag)</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Array</span><span class="pill">Three Pointers</span></div>
<p class="dropcap">Given an array <code>nums</code> with <code>n</code> objects colored red, white, or blue (represented by integers 0, 1, 2), sort them in-place so objects of the same color are adjacent, in the order red, white, blue — using one pass and constant extra space.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == nums.length</li><li>1 &lt;= n &lt;= 300</li><li>nums[i] is 0, 1, or 2</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>You only have three possible values — partition the array into three zones with three pointers instead of sorting or counting.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain <code>low</code> (boundary of the 0-zone), <code>mid</code> (current scan), and <code>high</code> (boundary of the 2-zone). A 0 swaps to the front and both <code>low</code>/<code>mid</code> advance; a 1 is already in place, just advance <code>mid</code>; a 2 swaps to the back but <code>mid</code> stays — the swapped-in value still needs checking.</p>
<pre class="code" data-lang="java"><code>public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;
    while (mid &lt;= high) {
        if (nums[mid] == 0) {
            swap(nums, low++, mid++);
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums, mid, high--);
        }
    }
}
private void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [2,0,2,1,1,0]</code></p>
<table class="tbl">
<tr><th>low</th><th>mid</th><th>high</th><th>nums[mid]</th><th>action</th><th>array after</th></tr>
<tr><td>0</td><td>0</td><td>5</td><td>2</td><td>swap(mid,high) → high=4</td><td>[0,0,2,1,1,2]</td></tr>
<tr><td>0</td><td>0</td><td>4</td><td>0</td><td>swap(low,mid) → low=1, mid=1</td><td>[0,0,2,1,1,2]</td></tr>
<tr><td>1</td><td>1</td><td>4</td><td>0</td><td>swap(low,mid) → low=2, mid=2</td><td>[0,0,2,1,1,2]</td></tr>
<tr><td>2</td><td>2</td><td>4</td><td>2</td><td>swap(mid,high) → high=3</td><td>[0,0,1,1,2,2]</td></tr>
<tr><td>2</td><td>2</td><td>3</td><td>1</td><td>mid++ → mid=3</td><td>[0,0,1,1,2,2]</td></tr>
<tr><td>2</td><td>3</td><td>3</td><td>1</td><td>mid++ → mid=4 (mid &gt; high, done)</td><td>[0,0,1,1,2,2]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — one pass, mid never revisits a resolved position. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Notice <code>mid</code> only advances on 0 or 1 — never on a swap-from-high, because that swapped-in value is unverified and must be re-examined.</div>`});

/* Problem 018 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q018 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 018 · EASY</span>Move Zeroes</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given an integer array <code>nums</code>, move all 0's to the end while maintaining the relative order of the non-zero elements. This must be done in-place without making a copy of the array.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= nums.length &lt;= 10⁴</li><li>-2³¹ &lt;= nums[i] &lt;= 2³¹ - 1</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This is Remove Duplicates' sibling: instead of compacting past duplicates, compact past zeros, then backfill the tail with zeros — or swap as you go to avoid a second pass.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p><code>insert</code> tracks where the next non-zero value belongs. Scan with <code>i</code>; whenever <code>nums[i]</code> is non-zero, swap it into <code>nums[insert]</code> and advance <code>insert</code>. Swapping (not just overwriting) keeps a zero moving rightward instead of being lost.</p>
<pre class="code" data-lang="java"><code>public void moveZeroes(int[] nums) {
    int insert = 0;
    for (int i = 0; i &lt; nums.length; i++) {
        if (nums[i] != 0) {
            int t = nums[insert];
            nums[insert] = nums[i];
            nums[i] = t;
            insert++;
        }
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums = [0,1,0,3,12]</code></p>
<table class="tbl">
<tr><th>i</th><th>nums[i]</th><th>insert</th><th>action</th><th>array after</th></tr>
<tr><td>0</td><td>0</td><td>0</td><td>zero → skip</td><td>[0,1,0,3,12]</td></tr>
<tr><td>1</td><td>1</td><td>0</td><td>swap(0,1) → insert=1</td><td>[1,0,0,3,12]</td></tr>
<tr><td>2</td><td>0</td><td>1</td><td>zero → skip</td><td>[1,0,0,3,12]</td></tr>
<tr><td>3</td><td>3</td><td>1</td><td>swap(1,3) → insert=2</td><td>[1,3,0,0,12]</td></tr>
<tr><td>4</td><td>12</td><td>2</td><td>swap(2,4) → insert=3</td><td>[1,3,12,0,0]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n) — single pass. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Swapping instead of overwriting is the trick — it guarantees every zero eventually lands at the tail without needing a second cleanup pass.</div>`});

/* Problem 019 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q019 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 019 · EASY</span>Merge Sorted Array</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Array</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">You're given two sorted integer arrays <code>nums1</code> and <code>nums2</code>. <code>nums1</code> has length <code>m + n</code>, with the first <code>m</code> elements meaningful and the last <code>n</code> elements set to 0 as placeholder space. Merge <code>nums2</code> into <code>nums1</code> in-place as one sorted array.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>nums1.length == m + n, nums2.length == n</li><li>0 &lt;= m, n &lt;= 200, 1 &lt;= m + n &lt;= 200</li><li>Both input arrays are sorted in non-decreasing order</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Merging from the front forces shifting elements out of the way. Merge from the back instead — the empty placeholder slots are exactly where the largest remaining values belong.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Three pointers: <code>i</code> at the last real element of <code>nums1</code>, <code>j</code> at the last of <code>nums2</code>, <code>k</code> at the last slot overall. Repeatedly place the larger of <code>nums1[i]</code> / <code>nums2[j]</code> at <code>nums1[k]</code>, working backward so nothing meaningful is ever overwritten before it's read.</p>
<pre class="code" data-lang="java"><code>public void merge(int[] nums1, int m, int[] nums2, int n) {
    int i = m - 1, j = n - 1, k = m + n - 1;
    while (j &gt;= 0) {
        if (i &gt;= 0 &amp;&amp; nums1[i] &gt; nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3</code></p>
<table class="tbl">
<tr><th>i</th><th>j</th><th>k</th><th>nums1[i] vs nums2[j]</th><th>action</th><th>nums1 after</th></tr>
<tr><td>2</td><td>2</td><td>5</td><td>3 vs 6</td><td>3&gt;6 false → nums1[5]=6, j=1, k=4</td><td>[1,2,3,0,0,6]</td></tr>
<tr><td>2</td><td>1</td><td>4</td><td>3 vs 5</td><td>3&gt;5 false → nums1[4]=5, j=0, k=3</td><td>[1,2,3,0,5,6]</td></tr>
<tr><td>2</td><td>0</td><td>3</td><td>3 vs 2</td><td>3&gt;2 true → nums1[3]=3, i=1, k=2</td><td>[1,2,3,3,5,6]</td></tr>
<tr><td>1</td><td>0</td><td>2</td><td>2 vs 2</td><td>2&gt;2 false → nums1[2]=2, j=-1, k=1</td><td>[1,2,2,3,5,6]</td></tr>
<tr><td>—</td><td>-1</td><td>—</td><td>—</td><td>j &lt; 0 → loop ends</td><td>[1,2,2,3,5,6]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m + n) — each element placed exactly once. Space: O(1) — no auxiliary array.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Merging back-to-front is the general fix whenever "merge into the array with the spare capacity" would otherwise require shifting elements forward.</div>`});

/* Problem 020 */
B.spread(
{ kicker: 'DSA · TWO POINTERS', head: 'Q020 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 020 · MEDIUM</span>Longest Palindromic Substring</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">String</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Given a string <code>s</code>, return the longest substring of <code>s</code> that is a palindrome.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= s.length &lt;= 1000</li><li>s consists of digits and English letters</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every palindrome has a center — either one character (odd length) or the gap between two characters (even length). Expanding outward from each of the 2n-1 centers avoids DP's O(n²) space entirely.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>For every index <code>i</code>, expand around it twice — once treating <code>i</code> as an odd center, once treating the gap <code>(i, i+1)</code> as an even center. Track the widest expansion seen and its <code>start</code>/<code>end</code> bounds.</p>
<pre class="code" data-lang="java"><code>public String longestPalindrome(String s) {
    if (s == null || s.length() &lt; 1) return "";
    int start = 0, end = 0;
    for (int i = 0; i &lt; s.length(); i++) {
        int len1 = expand(s, i, i);
        int len2 = expand(s, i, i + 1);
        int len = Math.max(len1, len2);
        if (len &gt; end - start + 1) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end + 1);
}
private int expand(String s, int l, int r) {
    while (l &gt;= 0 &amp;&amp; r &lt; s.length() &amp;&amp; s.charAt(l) == s.charAt(r)) { l--; r++; }
    return r - l - 1;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>s = "babad"</code> (indices: b0 a1 b2 a3 d4)</p>
<table class="tbl">
<tr><th>i</th><th>len1 (odd)</th><th>len2 (even)</th><th>len</th><th>update</th></tr>
<tr><td>0 ('b')</td><td>1</td><td>0</td><td>1</td><td>1 not &gt; 1 → no change</td></tr>
<tr><td>1 ('a')</td><td>3 ("bab")</td><td>0</td><td>3</td><td>3 &gt; 1 → start=0, end=2</td></tr>
<tr><td>2 ('b')</td><td>3 ("aba")</td><td>0</td><td>3</td><td>3 not &gt; 3 → no change</td></tr>
<tr><td>3 ('a')</td><td>1</td><td>0</td><td>1</td><td>no change</td></tr>
<tr><td>4 ('d')</td><td>1</td><td>0</td><td>1</td><td>no change</td></tr>
</table>
<p class="fs13">Final: <code>substring(0, 3) = "bab"</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²) — n centers, each expansion up to O(n) worst case. Space: O(1) extra (Manacher's gets O(n) time if pushed further).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Odd- and even-length palindromes are really the same algorithm on two different "center" definitions — always check both from every index.</div>`});

})();
