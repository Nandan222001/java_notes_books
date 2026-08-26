/* ===== CHAPTER 51 · DSA: Matrix ===== */
(function () {
var B = window.BOOK;
B.chapter('pd', 51, 'DSA: Matrix');

/* Problem 191 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q191 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 191 · MEDIUM</span>Rotate Image</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Matrix</span><span class="pill">In-Place</span></div>
<p class="dropcap">You are given an <code>n x n</code> 2D matrix representing an image. Rotate the image by 90 degrees clockwise, in place (no extra matrix).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == matrix.length == matrix[i].length</li><li>1 &lt;= n &lt;= 20</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>A 90° clockwise rotation equals "transpose the matrix, then reverse each row" — two simple in-place operations chained together.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>First transpose the matrix in place (swap matrix[i][j] with matrix[j][i] for i &lt; j), which flips it along the main diagonal. Then reverse each row, which completes the 90° clockwise rotation.</p>
<pre class="code" data-lang="java"><code>public void rotate(int[][] matrix) {
    int n = matrix.length;
    for (int i = 0; i &lt; n; i++)
        for (int j = i + 1; j &lt; n; j++) {
            int tmp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = tmp;
        }
    for (int[] row : matrix) {
        for (int l = 0, r = row.length - 1; l &lt; r; l++, r--) {
            int tmp = row[l]; row[l] = row[r]; row[r] = tmp;
        }
    }
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix = [[1,2,3],[4,5,6],[7,8,9]]</code></p>
<table class="tbl">
<tr><th>step</th><th>matrix state</th></tr>
<tr><td>start</td><td>[1,2,3] / [4,5,6] / [7,8,9]</td></tr>
<tr><td>after transpose</td><td>[1,4,7] / [2,5,8] / [3,6,9]</td></tr>
<tr><td>after row reverse</td><td>[7,4,1] / [8,5,2] / [9,6,3]</td></tr>
</table>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(1) — fully in place.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Any matrix rotation can be decomposed into transpose + reverse (or reverse + transpose) — memorize this pair instead of deriving index formulas from scratch.</div>`});

/* Problem 192 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q192 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 192 · MEDIUM</span>Spiral Matrix</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Matrix</span><span class="pill">Simulation</span></div>
<p class="dropcap">Given an <code>m x n</code> matrix, return all elements of the matrix in spiral order — starting top-left, sweeping right, then down, then left, then up, and repeating inward.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == matrix.length, n == matrix[i].length</li><li>1 &lt;= m, n &lt;= 10</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track four shrinking boundaries — top, bottom, left, right. Peel off the top row, right column, bottom row, left column in order, tightening the boundary after each side, until they cross.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Maintain <code>top, bottom, left, right</code> boundaries. Each outer-loop pass walks the current top row left-to-right, the current right column top-to-bottom, then — guarded by a boundary check so a collapsed row/column isn't walked twice — the bottom row right-to-left and the left column bottom-to-top. After each side, shrink its boundary inward.</p>
<pre class="code" data-lang="java"><code>public List&lt;Integer&gt; spiralOrder(int[][] matrix) {
    List&lt;Integer&gt; result = new ArrayList&lt;&gt;();
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;
    while (top &lt;= bottom &amp;&amp; left &lt;= right) {
        for (int j = left; j &lt;= right; j++) result.add(matrix[top][j]);
        top++;
        for (int i = top; i &lt;= bottom; i++) result.add(matrix[i][right]);
        right--;
        if (top &lt;= bottom) {
            for (int j = right; j &gt;= left; j--) result.add(matrix[bottom][j]);
            bottom--;
        }
        if (left &lt;= right) {
            for (int i = bottom; i &gt;= top; i--) result.add(matrix[i][left]);
            left--;
        }
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix = [[1,2,3],[4,5,6],[7,8,9]]</code>, boundaries start top=0,bottom=2,left=0,right=2</p>
<table class="tbl">
<tr><th>side walked</th><th>values added</th><th>boundary after</th></tr>
<tr><td>top row (j: 0→2)</td><td>1, 2, 3</td><td>top=1</td></tr>
<tr><td>right col (i: 1→2)</td><td>6, 9</td><td>right=1</td></tr>
<tr><td>bottom row (j: 1→0)</td><td>8, 7</td><td>bottom=1</td></tr>
<tr><td>left col (i: 1→1)</td><td>4</td><td>left=1</td></tr>
<tr><td>top row (j: 1→1)</td><td>5</td><td>top=2, loop ends (top&gt;bottom)</td></tr>
</table>
<p class="fs13">Final <code>result = [1,2,3,6,9,8,7,4,5]</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — every cell visited once. Space: O(1) extra (excluding output).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>The two <code>if</code> guards before the bottom row and left column are what stop a single-row or single-column matrix from being traversed twice — the classic off-by-one bug in this pattern.</div>`});

/* Problem 193 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q193 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 193 · MEDIUM</span>Spiral Matrix II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Matrix</span><span class="pill">Simulation</span></div>
<p class="dropcap">Given a positive integer <code>n</code>, generate an <code>n x n</code> matrix filled with elements from <code>1</code> to <code>n²</code> in spiral order.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>1 &lt;= n &lt;= 20</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>This is the write-side twin of Spiral Matrix — same four-boundary walk, except instead of reading values out you write an incrementing counter into each cell as you visit it.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Identical boundary-shrinking walk as reading a spiral, but each visited cell is assigned the next value of a counter starting at 1 instead of being read. The same four bounded loops (top row, right col, bottom row, left col) with the same guards handle every shape correctly, including odd n where a single center cell remains.</p>
<pre class="code" data-lang="java"><code>public int[][] generateMatrix(int n) {
    int[][] matrix = new int[n][n];
    int top = 0, bottom = n - 1, left = 0, right = n - 1;
    int num = 1;
    while (top &lt;= bottom &amp;&amp; left &lt;= right) {
        for (int j = left; j &lt;= right; j++) matrix[top][j] = num++;
        top++;
        for (int i = top; i &lt;= bottom; i++) matrix[i][right] = num++;
        right--;
        if (top &lt;= bottom) {
            for (int j = right; j &gt;= left; j--) matrix[bottom][j] = num++;
            bottom--;
        }
        if (left &lt;= right) {
            for (int i = bottom; i &gt;= top; i--) matrix[i][left] = num++;
            left--;
        }
    }
    return matrix;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>n = 3</code>, boundaries start top=0,bottom=2,left=0,right=2, num=1</p>
<table class="tbl">
<tr><th>side written</th><th>cells set</th><th>num after</th></tr>
<tr><td>top row (j: 0→2)</td><td>[0][0]=1,[0][1]=2,[0][2]=3</td><td>4</td></tr>
<tr><td>right col (i: 1→2)</td><td>[1][2]=4,[2][2]=5</td><td>6</td></tr>
<tr><td>bottom row (j: 1→0)</td><td>[2][1]=6,[2][0]=7</td><td>8</td></tr>
<tr><td>left col (i: 1→1)</td><td>[1][0]=8</td><td>9</td></tr>
<tr><td>top row (j: 1→1)</td><td>[1][1]=9</td><td>10, loop ends</td></tr>
</table>
<p class="fs13">Final matrix: <code>[1,2,3] / [8,9,4] / [7,6,5]</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n²). Space: O(1) extra (excluding output).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Once you know the four-boundary spiral skeleton, "read in spiral order" and "write in spiral order" are the same loop with one line swapped — no need to re-derive the traversal.</div>`});

/* Problem 194 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q194 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 194 · MEDIUM</span>Set Matrix Zeroes</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Matrix</span><span class="pill">In-Place</span></div>
<p class="dropcap">Given an <code>m x n</code> matrix, if an element is <code>0</code>, set its entire row and column to <code>0</code>. Do it in place, using O(1) extra space (not counting the output).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == matrix.length, n == matrix[i].length</li><li>1 &lt;= m, n &lt;= 200</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>You can't zero cells as you find them or you'd corrupt the very zeros you still need to scan for. Instead, use row 0 and column 0 themselves as marker storage for which rows/columns must become zero, tracking their own original zero-ness separately.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>First record whether the real first row / first column already contain a zero (two booleans). Then scan the interior (i,j ≥ 1): whenever matrix[i][j] is 0, mark it by zeroing matrix[i][0] and matrix[0][j]. A second interior pass zeroes any cell whose row-marker or column-marker is 0. Finally, zero out the first row and/or first column if the initial booleans say they need it.</p>
<pre class="code" data-lang="java"><code>public void setZeroes(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean firstRowZero = false, firstColZero = false;
    for (int j = 0; j &lt; n; j++) if (matrix[0][j] == 0) firstRowZero = true;
    for (int i = 0; i &lt; m; i++) if (matrix[i][0] == 0) firstColZero = true;
    for (int i = 1; i &lt; m; i++)
        for (int j = 1; j &lt; n; j++)
            if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
    for (int i = 1; i &lt; m; i++)
        for (int j = 1; j &lt; n; j++)
            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
    if (firstRowZero) for (int j = 0; j &lt; n; j++) matrix[0][j] = 0;
    if (firstColZero) for (int i = 0; i &lt; m; i++) matrix[i][0] = 0;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix = [[1,1,1],[1,0,1],[1,1,1]]</code> — firstRowZero=false, firstColZero=false</p>
<table class="tbl">
<tr><th>step</th><th>matrix state</th></tr>
<tr><td>start</td><td>[1,1,1] / [1,0,1] / [1,1,1]</td></tr>
<tr><td>mark pass: (1,1)=0 → mark [1][0]=0, [0][1]=0</td><td>[1,0,1] / [0,0,1] / [1,1,1]</td></tr>
<tr><td>zero pass: (1,1) and (1,2) zeroed via row-marker; (2,1) zeroed via col-marker</td><td>[1,0,1] / [0,0,0] / [1,0,1]</td></tr>
<tr><td>firstRowZero/firstColZero both false</td><td>no further change</td></tr>
</table>
<p class="fs13">Final <code>matrix = [[1,0,1],[0,0,0],[1,0,1]]</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(1) — row 0 / col 0 double as the marker array.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Reuse part of the input as your marker storage" is the go-to move whenever a problem demands O(1) space but a marker/visited structure feels unavoidable.</div>`});

/* Problem 195 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q195 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 195 · MEDIUM</span>Diagonal Traverse</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Matrix</span><span class="pill">Simulation</span></div>
<p class="dropcap">Given an <code>m x n</code> matrix, return all elements in diagonal order: sweep each diagonal alternately upward (toward the top-right) and downward (toward the bottom-left).</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == matrix.length, n == matrix[i].length</li><li>1 &lt;= m, n &lt;= 10⁴</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Track a current cell and a direction flag. Moving "up" is (row-1, col+1); moving "down" is (row+1, col-1). Flip direction whenever a move would fall off an edge, and nudge along that edge to start the next diagonal.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Walk cell by cell, appending as you go. While heading "up-right", if you're at the last column, drop down a row and flip direction; else if you're at the top row, step right and flip direction; otherwise move diagonally up-right. The "down-left" branch mirrors this against the last row and first column. This single state machine handles every edge case without special-casing matrix corners.</p>
<pre class="code" data-lang="java"><code>public int[] findDiagonalOrder(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int[] result = new int[m * n];
    int row = 0, col = 0, idx = 0;
    boolean goingUp = true;
    while (idx &lt; m * n) {
        result[idx++] = matrix[row][col];
        if (goingUp) {
            if (col == n - 1) { row++; goingUp = false; }
            else if (row == 0) { col++; goingUp = false; }
            else { row--; col++; }
        } else {
            if (row == m - 1) { col++; goingUp = true; }
            else if (col == 0) { row++; goingUp = true; }
            else { row++; col--; }
        }
    }
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix = [[1,2,3],[4,5,6],[7,8,9]]</code></p>
<table class="tbl">
<tr><th>visit</th><th>(row,col)</th><th>value</th><th>next move</th></tr>
<tr><td>1</td><td>(0,0)</td><td>1</td><td>row==0 → col++, flip down</td></tr>
<tr><td>2</td><td>(0,1)</td><td>2</td><td>interior → row++,col--</td></tr>
<tr><td>3</td><td>(1,0)</td><td>4</td><td>col==0 → row++, flip up</td></tr>
<tr><td>4</td><td>(2,0)</td><td>7</td><td>interior → row--,col++</td></tr>
<tr><td>5</td><td>(1,1)</td><td>5</td><td>interior → row--,col++</td></tr>
<tr><td>6</td><td>(0,2)</td><td>3</td><td>col==n-1 → row++, flip down</td></tr>
<tr><td>7</td><td>(1,2)</td><td>6</td><td>interior → row++,col--</td></tr>
<tr><td>8</td><td>(2,1)</td><td>8</td><td>row==m-1 → col++, flip up</td></tr>
<tr><td>9</td><td>(2,2)</td><td>9</td><td>idx=9=m·n → stop</td></tr>
</table>
<p class="fs13">Final <code>result = [1,2,4,7,5,3,6,8,9]</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(1) extra (excluding output).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Encode the zigzag as "which edge did I hit" rather than tracking diagonal index and parity separately — it collapses four corner special-cases into two clean if/else chains.</div>`});

/* Problem 196 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q196 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 196 · MEDIUM</span>Game of Life</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Matrix</span><span class="pill">Simulation</span></div>
<p class="dropcap">Given an <code>m x n</code> board where each cell is <code>1</code> (live) or <code>0</code> (dead), compute the board's next state per Conway's rules: a live cell with fewer than 2 or more than 3 live neighbors dies; a live cell with 2–3 live neighbors survives; a dead cell with exactly 3 live neighbors becomes live. Update the board in place, simultaneously.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: board = [[0,1,0],[0,1,0],[0,1,0]]
Output: [[0,0,0],[1,1,1],[0,0,0]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == board.length, n == board[i].length</li><li>1 &lt;= m, n &lt;= 25</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Updating in place is tricky because a cell's neighbors need its <em>original</em> value, but the naive approach overwrites cells as it goes. Encode both old and new state in the same integer — e.g. 2 = "was live, now dead", 3 = "was dead, now live" — then normalize with mod 2 at the end.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>For each cell, count live neighbors by checking <code>== 1 || == 2</code> — both values mean "originally live," so a neighbor already visited and rewritten this pass still counts correctly. Apply the rules but write 2 (live→dead) or 3 (dead→live) instead of 0/1. A final pass takes every cell mod 2 to collapse the encoding into the real next state.</p>
<pre class="code" data-lang="java"><code>public void gameOfLife(int[][] board) {
    int m = board.length, n = board[0].length;
    for (int i = 0; i &lt; m; i++)
        for (int j = 0; j &lt; n; j++) {
            int live = 0;
            for (int di = -1; di &lt;= 1; di++)
                for (int dj = -1; dj &lt;= 1; dj++) {
                    if (di == 0 &amp;&amp; dj == 0) continue;
                    int ni = i + di, nj = j + dj;
                    if (ni &gt;= 0 &amp;&amp; ni &lt; m &amp;&amp; nj &gt;= 0 &amp;&amp; nj &lt; n
                        &amp;&amp; (board[ni][nj] == 1 || board[ni][nj] == 2)) live++;
                }
            if (board[i][j] == 1 &amp;&amp; (live &lt; 2 || live &gt; 3)) board[i][j] = 2;
            if (board[i][j] == 0 &amp;&amp; live == 3) board[i][j] = 3;
        }
    for (int i = 0; i &lt; m; i++)
        for (int j = 0; j &lt; n; j++) board[i][j] %= 2;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>board = [[0,1,0],[0,1,0],[0,1,0]]</code> (vertical blinker, middle column)</p>
<table class="tbl">
<tr><th>cell</th><th>live neighbors</th><th>rule applied</th><th>encoded value</th></tr>
<tr><td>(0,0)</td><td>2</td><td>dead, ≠3 → stays dead</td><td>0</td></tr>
<tr><td>(0,1)</td><td>1</td><td>live, &lt;2 → dies</td><td>2</td></tr>
<tr><td>(0,2)</td><td>2</td><td>dead, ≠3 → stays dead</td><td>0</td></tr>
<tr><td>(1,0)</td><td>3</td><td>dead, =3 → becomes live</td><td>3</td></tr>
<tr><td>(1,1)</td><td>2</td><td>live, 2–3 → survives</td><td>1</td></tr>
<tr><td>(1,2)</td><td>3</td><td>dead, =3 → becomes live</td><td>3</td></tr>
<tr><td>(2,0)</td><td>2</td><td>dead, ≠3 → stays dead</td><td>0</td></tr>
<tr><td>(2,1)</td><td>1</td><td>live, &lt;2 → dies</td><td>2</td></tr>
<tr><td>(2,2)</td><td>2</td><td>dead, ≠3 → stays dead</td><td>0</td></tr>
</table>
<p class="fs13">After mod 2: <code>[[0,0,0],[1,1,1],[0,0,0]]</code> — the blinker flips to horizontal, matching expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n) — 8 neighbor checks per cell. Space: O(1) — encoded in place.</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Pack old-state and new-state into one value, decode with a final normalization pass" is the standard trick for any in-place simultaneous-update grid simulation.</div>`});

/* Problem 197 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q197 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 197 · MEDIUM</span>Kth Smallest Element in a Sorted Matrix</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Matrix</span><span class="pill">Binary Search</span></div>
<p class="dropcap">Given an <code>n x n</code> matrix where each of the rows and columns is sorted in ascending order, return the <code>k</code>th smallest element (counting duplicates by their multiplicity), not the k<sup>th</sup> distinct element.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>n == matrix.length == matrix[i].length</li><li>1 &lt;= n &lt;= 300</li><li>1 &lt;= k &lt;= n²</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Binary search on the <em>value</em> range, not on indices: for a candidate value <code>mid</code>, you can count how many matrix elements are ≤ mid in O(n) by walking from the bottom-left corner. Shrink the range until it converges on the answer.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Binary search <code>lo..hi</code> over the value range <code>[matrix[0][0], matrix[n-1][n-1]]</code>. For each <code>mid</code>, count elements ≤ mid using a staircase walk from the bottom-left corner: step right (col++) when the current value qualifies (adding a whole column's worth of qualifying rows at once), otherwise step up (row--). If the count is &lt; k, the answer lies above mid; otherwise it lies at or below mid. The search converges to the smallest value whose count-≤ reaches k, which is exactly the kth smallest.</p>
<pre class="code" data-lang="java"><code>public int kthSmallest(int[][] matrix, int k) {
    int n = matrix.length;
    int lo = matrix[0][0], hi = matrix[n - 1][n - 1];
    while (lo &lt; hi) {
        int mid = lo + (hi - lo) / 2;
        int count = countLessEqual(matrix, mid);
        if (count &lt; k) lo = mid + 1; else hi = mid;
    }
    return lo;
}
private int countLessEqual(int[][] matrix, int target) {
    int n = matrix.length, count = 0, row = n - 1, col = 0;
    while (row &gt;= 0 &amp;&amp; col &lt; n) {
        if (matrix[row][col] &lt;= target) { count += row + 1; col++; }
        else row--;
    }
    return count;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix = [[1,5,9],[10,11,13],[12,13,15]]</code>, k = 8 — lo=1, hi=15</p>
<table class="tbl">
<tr><th>lo</th><th>hi</th><th>mid</th><th>countLessEqual(mid)</th><th>action</th></tr>
<tr><td>1</td><td>15</td><td>8</td><td>2</td><td>2 &lt; 8 → lo = 9</td></tr>
<tr><td>9</td><td>15</td><td>12</td><td>6</td><td>6 &lt; 8 → lo = 13</td></tr>
<tr><td>13</td><td>15</td><td>14</td><td>8</td><td>8 ≥ 8 → hi = 14</td></tr>
<tr><td>13</td><td>14</td><td>13</td><td>8</td><td>8 ≥ 8 → hi = 13</td></tr>
</table>
<p class="fs13">lo == hi == 13 → loop ends, return <code>13</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(n log(max−min)) — n work per binary-search step. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Binary search the answer's value, verify with a monotonic O(n) counter" beats a min-heap approach (O(k log n)) whenever k is close to n², and needs no extra heap memory.</div>`});

/* Problem 198 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q198 · Medium',
html: `<h2 class="chap"><span class="chnum">PROBLEM 198 · MEDIUM</span>Search a 2D Matrix II</h2>
<div class="pillrow"><span class="pill" style="--pc:#e76f00">MEDIUM</span><span class="pill">Matrix</span><span class="pill">Two Pointers</span></div>
<p class="dropcap">Write an efficient algorithm that searches for a <code>target</code> value in an <code>m x n</code> matrix where each row is sorted left-to-right and each column is sorted top-to-bottom independently — unlike a fully-sorted grid, the last element of one row is not necessarily ≤ the first element of the next row.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [[1,4,7,11,15],
                 [2,5,8,12,19],
                 [3,6,9,16,22],
                 [10,13,14,17,24],
                 [18,21,23,26,30]], target = 5
Output: true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == matrix.length, n == matrix[i].length</li><li>1 &lt;= m, n &lt;= 300</li><li>Rows sorted ascending left→right; columns sorted ascending top→bottom</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Start at the top-right corner. That cell is the largest in its row and smallest in its column — so a value larger than it can only be found below, and a value smaller than it can only be found to the left. Eliminate a whole row or column with every comparison.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>This is the "staircase search," different from binary-searching a fully-sorted matrix. From the top-right corner: if the current cell equals target, done. If it's greater than target, the whole column below it is even larger, so move left. If it's less than target, the whole row to its left is even smaller, so move down. Each step eliminates one row or one column entirely.</p>
<pre class="code" data-lang="java"><code>public boolean searchMatrix(int[][] matrix, int target) {
    int row = 0, col = matrix[0].length - 1;
    while (row &lt; matrix.length &amp;&amp; col &gt;= 0) {
        int val = matrix[row][col];
        if (val == target) return true;
        else if (val &gt; target) col--;
        else row++;
    }
    return false;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: 5×5 matrix above, target = 5 — start row=0, col=4</p>
<table class="tbl">
<tr><th>row</th><th>col</th><th>matrix[row][col]</th><th>compare</th><th>move</th></tr>
<tr><td>0</td><td>4</td><td>15</td><td>15 &gt; 5</td><td>col--</td></tr>
<tr><td>0</td><td>3</td><td>11</td><td>11 &gt; 5</td><td>col--</td></tr>
<tr><td>0</td><td>2</td><td>7</td><td>7 &gt; 5</td><td>col--</td></tr>
<tr><td>0</td><td>1</td><td>4</td><td>4 &lt; 5</td><td>row++</td></tr>
<tr><td>1</td><td>1</td><td>5</td><td>5 == 5</td><td>return true</td></tr>
</table>
<p class="fs13">Found target in 5 steps — matches expected output <code>true</code></p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m + n) — at most one full row's and one full column's worth of steps. Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Don't confuse this with "Search a 2D Matrix" (flattened binary search) — that problem needs the whole grid to form one sorted sequence; this one only needs rows and columns individually sorted, which is why the corner-elimination walk is required instead.</div>`});

/* Problem 199 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q199 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 199 · EASY</span>Transpose Matrix</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Matrix</span><span class="pill">Array</span></div>
<p class="dropcap">Given a 2D integer array <code>matrix</code>, return its transpose: the matrix obtained by flipping <code>matrix</code> over its main diagonal, turning rows into columns.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == matrix.length, n == matrix[i].length</li><li>1 &lt;= m, n &lt;= 1000</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Unlike Rotate Image, this matrix isn't necessarily square, so it can't be transposed in place — allocate a new <code>n x m</code> result and copy <code>matrix[i][j]</code> to <code>result[j][i]</code>.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Allocate a result matrix with swapped dimensions (n rows, m columns for an m×n input). Iterate every cell of the source and place it at the mirrored coordinate — row and column swapped — in the result. No auxiliary logic is needed since rectangular inputs can't be transposed in place.</p>
<pre class="code" data-lang="java"><code>public int[][] transpose(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int[][] result = new int[n][m];
    for (int i = 0; i &lt; m; i++)
        for (int j = 0; j &lt; n; j++)
            result[j][i] = matrix[i][j];
    return result;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix = [[1,2,3],[4,5,6]]</code>, m=2, n=3</p>
<table class="tbl">
<tr><th>i</th><th>j</th><th>matrix[i][j]</th><th>assignment</th></tr>
<tr><td>0</td><td>0</td><td>1</td><td>result[0][0] = 1</td></tr>
<tr><td>0</td><td>1</td><td>2</td><td>result[1][0] = 2</td></tr>
<tr><td>0</td><td>2</td><td>3</td><td>result[2][0] = 3</td></tr>
<tr><td>1</td><td>0</td><td>4</td><td>result[0][1] = 4</td></tr>
<tr><td>1</td><td>1</td><td>5</td><td>result[1][1] = 5</td></tr>
<tr><td>1</td><td>2</td><td>6</td><td>result[2][1] = 6</td></tr>
</table>
<p class="fs13">Final <code>result = [[1,4],[2,5],[3,6]]</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(m·n) for the output (unavoidable for a non-square result).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>Square in-place transpose (as in Rotate Image) and general rectangular transpose are two different problems — swapping i/j indices in place only works when the matrix is square.</div>`});

/* Problem 200 */
B.spread(
{ kicker: 'DSA · MATRIX', head: 'Q200 · Easy',
html: `<h2 class="chap"><span class="chnum">PROBLEM 200 · EASY</span>Toeplitz Matrix</h2>
<div class="pillrow"><span class="pill" style="--pc:#2e7d32">EASY</span><span class="pill">Matrix</span><span class="pill">Array</span></div>
<p class="dropcap">Given an <code>m x n</code> matrix, return <code>true</code> if it is Toeplitz. A matrix is Toeplitz if every diagonal running from top-left to bottom-right has the same elements.</p>
<h3 class="sec">Example</h3>
<pre class="code" data-lang="text"><code>Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
Output: true</code></pre>
<h3 class="sec">Constraints</h3>
<ul><li>m == matrix.length, n == matrix[i].length</li><li>1 &lt;= m, n &lt;= 20</li></ul>
<div class="callout note"><span class="ct">📝 Hint</span>Every cell on a top-left-to-bottom-right diagonal shares the same <code>row − col</code>. So the matrix is Toeplitz exactly when every cell equals its upper-left neighbor: <code>matrix[i][j] == matrix[i-1][j-1]</code> for all valid i, j.</div>`},
{ kicker: 'DRY RUN & TRACE', head: 'Walkthrough',
html: `<h3 class="sec">Approach</h3>
<p>Instead of grouping cells by diagonal explicitly, just compare each interior cell against the one diagonally above-left of it. If they ever differ, the diagonal isn't constant and the matrix fails immediately. If every comparison passes, all diagonals are constant by induction.</p>
<pre class="code" data-lang="java"><code>public boolean isToeplitzMatrix(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    for (int i = 1; i &lt; m; i++)
        for (int j = 1; j &lt; n; j++)
            if (matrix[i][j] != matrix[i - 1][j - 1]) return false;
    return true;
}</code></pre>
<h3 class="sec">Dry Run</h3>
<p class="fs13">Input: <code>matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]</code>, m=3, n=4</p>
<table class="tbl">
<tr><th>i</th><th>j</th><th>matrix[i][j]</th><th>matrix[i-1][j-1]</th><th>equal?</th></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>yes</td></tr>
<tr><td>1</td><td>2</td><td>2</td><td>2</td><td>yes</td></tr>
<tr><td>1</td><td>3</td><td>3</td><td>3</td><td>yes</td></tr>
<tr><td>2</td><td>1</td><td>5</td><td>5</td><td>yes</td></tr>
<tr><td>2</td><td>2</td><td>1</td><td>1</td><td>yes</td></tr>
<tr><td>2</td><td>3</td><td>2</td><td>2</td><td>yes</td></tr>
</table>
<p class="fs13">Every comparison passes → return <code>true</code> — matches expected output</p>
<div class="callout tip"><span class="ct">⏱️ Complexity</span>Time: O(m·n). Space: O(1).</div>
<div class="callout hook"><span class="ct">🎯 Key Insight</span>"Compare each cell to its upper-left neighbor" is a constant-space substitute for grouping by <code>row − col</code> into buckets — the same trick generalizes to anti-diagonal checks by comparing against the upper-right neighbor instead.</div>`});

})();
