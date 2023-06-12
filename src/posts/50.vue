<template>
  <p>
    The
    <a href="https://en.wikipedia.org/wiki/Binary_search_algorithm"
      >binary search</a
    >
    algorithm is a very famous and conceptually simple method for determining
    whether a given value is stored in a sorted array. If the value is found,
    its position is returned; otherwise, a "not found" notification is returned.
    The running time of the algorithm is $O(\log_2 n)$, where $n$ is the length
    of the array.
  </p>

  <p>
    There are numerous ways to implement the binary search algorithm. The term
    "tricky" in the post title highlights how easily one can devise an
    implementation that seems correct, but harbors subtle bugs. For instance,
    try to identify the issue in the Python implementation below:
  </p>

  <CodeBlock
    language="python"
    code="
    # A conceptually flawed implementation of binary search.
    def binary_search(u, x):
      if len(u) == 0:
        return None

      left = 0
      right = len(u) - 1

      while left != right:
        # Left subarray: u[i] for i in [left, middle].
        # Right subarray: u[i] for i in [middle, right].
        middle = left + (right - left) // 2
        if u[middle] <= x:
          left = middle
        else:
          right = middle

      # At this point, left == right. Check if x was found.
      if u[left] == x:
        return left
      else:
        return None
    "
  />

  <p>
    Consider what would happen if <code>u = [0, 1]</code> and
    <code>x = 0</code>. Initially, <code>left = 0</code> and
    <code>right = 1</code>. Inside the <code>while</code> loop,
    <code>middle</code> is set to <code>0</code> since
    <code>(right - left) // 2 = 0</code> (the <code>//</code> operator computes
    integer division, which is necessary because regular division is
    <a href="http://legacy.python.org/dev/peps/pep-0238/"
      >converted to a floating-point</a
    >
    value in newer versions of Python). After that, the condition
    <code>u[middle] &lt;= x</code> is satisfied and
    <code>left = middle</code> sets <code>left</code> to <code>0</code>. Since
    neither <code>left</code> nor <code>right</code> have changed, the loop will
    restart and be executed indefinitely (or at least until you get tired of
    waiting and stop the process). In short, integer arithmetic has pulled the
    rug out from under us.
  </p>

  <p>
    Before working on a fix for the implementation above, it's important to note
    that it has a suboptimal design decision, which, as will be shown below, is
    closely related to the infinite loop just described. The implementation
    above "divides" the currently considered portion of the array
    <code>u</code> into two overlapping subarrays: a "left subarray" containing
    the elements with indices in the closed interval
    <code>[left, middle]</code> and a "right subarray" containing the elements
    with indices in <code>[middle, right]</code>. In other words,
    <code>u[middle]</code> is a part of both intervals. Inside the
    <code>while</code> loop, the program decides whether to continue iterating
    over the left or the right subarray.
  </p>

  <p>
    There is no need to consider two overlapping subarrays. Let's first analyze
    what would happen if <code>u[middle]</code> were part of the right subarray
    but not of the left one. One could attempt to improve the implementation
    above by explicitly adopting this assumption through the following change in
    how the value of <code>right</code> is updated:
  </p>

  <CodeBlock
    language="python"
    code="
    # A conceptually improved, yet still flawed, implementation of binary search.
    def binary_search(u, x):
      ...
      while left != right:
        # Left subarray: u[i] for i in [left, middle).
        # Right subarray: u[i] for i in [middle, right].
        middle = left + (right - left) // 2
        if u[middle] <= x:
          left = middle
        else:
          right = middle - 1
      ...
    "
  />

  <p>
    The implementation above is conceptually better in the sense that each
    subarray is strictly smaller than the original one, which makes it clear
    that the method will converge if there are no other issues. Unfortunately,
    the changes made do not fix the original problem: given
    <code>u = [0, 1]</code> and <code>x = 0</code>, the program will still enter
    an infinite loop in the <code>while</code> loop. However, allowing
    <code>u[middle]</code> to be part of the left subarray but not of the right
    subarray resolves our problem:
  </p>

  <CodeBlock
    language="python"
    code="
    # A correct and conceptually elegant implementation of binary search.
    def binary_search(u, x):
      if len(u) == 0:
        return None

      left = 0
      right = len(u) - 1

      while left != right:
        # Left subarray: u[i] for i in [left, middle].
        # Right subarray: u[i] for i in (middle, right].
        middle = left + (right - left) // 2
        if u[middle] < x:
          left = middle + 1
        else:
          right = middle

      # At this point, left == right. Check if x was found.
      if u[left] == x:
        return left
      else:
        return None
    "
  />

  <p>
    The implementation above is correct and will always find the desired value
    <code>x</code> if it is in the array <code>u</code>. In each iteration, the
    value of either <code>left</code> or <code>right</code> must change, as the
    <code>if</code> statement increases <code>left</code> by at least
    <code>1</code> (recall that initially <code>left &lt;= middle</code>), and
    the <code>else</code> statement decreases <code>right</code> by at least
    <code>1</code> (since initially <code>middle &lt; right</code>).
    Additionally, by design, <code>left</code> never becomes larger than
    <code>right</code>. Therefore, at some point, both variables must contain
    the same value, and the <code>while</code> loop will terminate.
  </p>

  <SectionTitle>Computing the <code>middle</code> index</SectionTitle>

  <p>The <code>middle</code> index can be computed as shown below:</p>

  <CodeBlock language="python" code="middle = (left + right) // 2" />

  <p>
    However, computing the integer arithmetic in this way is prone to bugs that
    can be very difficult to identify. In Python, this is not an issue since
    integers are promoted to arbitrary precision
    <a
      href="https://docs.python.org/2/library/stdtypes.html#numeric-types-int-float-long-complex"
      >by default</a
    >, but in other languages, such as C and C++, the sum of two integers can
    overflow and yield a result that is completely different from what you might
    expect. This overflow can be safely avoided by computing the
    <code>middle</code> as shown below:
  </p>

  <CodeBlock language="python" code="middle = left + (right - left) // 2" />

  <SectionTitle
    >A final note on arrays with possibly duplicate values</SectionTitle
  >

  <p>
    A curious reader might wonder what would happen if we tried to find a value
    <code>x</code> that occurs more than once in <code>u</code>. In this
    scenario, if <code>left</code> is ever modified in the
    <code>while</code> loop, it will always satisfy
    <code>u[left - 1] &lt; x</code>. This property will hold until the condition
    <code>left == right</code> is met, at which point <code>left</code> must
    either be the index of the first occurrence of <code>x</code> in
    <code>u</code> or the index of a value different from <code>x</code> (in
    which case <code>x</code> is not in <code>u</code>). If <code>left</code> is
    not changed throughout the loop, it remains at <code>0</code>, indicating
    that the searched value <code>x</code> is either at the first position in
    <code>u</code> or not in <code>u</code> at all (in the latter case,
    <code>x</code> must be smaller than <code>u[0]</code>).
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
