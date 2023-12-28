<template>
  <p>
    Let $T(n)$ be the runtime of a
    <a href="https://en.wikipedia.org/wiki/Comparison_sort">comparison-based</a>
    sorting algorithm for a sequence of length $n$. By "comparison-based", I
    mean a sorting algorithm that accesses input array elements solely through
    comparisons, as is the case for general-purpose sorting algorithms such as
    <a href="https://en.wikipedia.org/wiki/Merge_sort">merge sort</a>,
    <a href="https://en.wikipedia.org/wiki/Quicksort">quicksort</a>, and
    <a href="https://en.wikipedia.org/wiki/Heapsort">heapsort</a>. Such an
    algorithm does not know in advance the values the input array will store (as
    is the case, for instance, with
    <a href="https://en.wikipedia.org/wiki/Bucket_sort">bucket sort</a>), but
    rather orders them using a predefined "less than" comparison function. In
    this post, I will demonstrate that regardless of how well an algorithm of
    this type is designed, its worst-case runtime cannot be faster than $cn
    \log_2(n)$ as $n$ becomes large (for some constant $c \gt 0$). In more
    technical terms, there exist constants $n_0 \geq 0$ and $c \gt 0$ such that
    $T(n) \geq cn \log_2(n)$ for all $n \geq n_0$, and therefore $T(n) =
    \Omega(n \log_2(n))$.
  </p>

  <p>
    This post will deal only with deterministic algorithms, but the results
    extend to randomized algorithms as well. The main idea of the proof is to
    consider only input arrays that are permutations of $S_n = \{1, 2, \ldots,
    n\}$. The total number of distinct arrays representing permutations of $S_n$
    is $n!$.
  </p>

  <p>
    For a given deterministic, comparison-based sorting algorithm, let $k$ be
    the largest number of comparisons within which it can sort any of the $n!$
    arrays mentioned above. Because the execution of the algorithm is based on
    the results of the value comparisons it performs, there are at most $2^k$
    possible distinct execution paths for it. To clarify, the algorithm sorts an
    input array by repeatedly comparing pairs of values and deciding how to
    proceed depending on which value is greater according to the comparison
    function. Each comparison generates two possible branches of execution, and
    since the total number of comparisons performed cannot exceed $k$, there can
    be at most $2^k$ distinct execution paths for the arrays we are considering.
  </p>

  <p>
    Suppose now that $2^k \lt n!$. If that is the case, then the number of
    possible execution paths of the algorithm is fewer than the total number of
    input arrays we are considering. Therefore, there must be at least two
    distinct input arrays for which the algorithm executes following the exact
    same path (this is referred to as the
    <a href="https://en.wikipedia.org/wiki/Pigeonhole_principle"
      >pigeonhole principle</a
    >
    in mathematics). This implies that when the algorithm is applied to these
    arrays, the same transformations (e.g., element swaps) are applied to each
    of them, resulting in the same final arrangement: the values of $S_n$
    ordered according to the predefined comparison function. This is however not
    possible since the algorithm is deterministic: by inverting its steps from
    the final (sorted) result, we cannot arrive at two distinct initial inputs.
    Therefore, $2^k \geq n!$.
  </p>

  <p>The final step in the proof involves a simple fact about $n!$:</p>

  <EquationBlock>
    n! = n (n-1) (n-2) \ldots \frac{n}{2} \left(\frac{n}{2} - 1\right) \ldots 1
    \geq \left(\frac{n}{2}\right)^{\frac{n}{2}}
  </EquationBlock>

  <p>Hence, since $2^k \geq n!$:</p>

  <EquationBlock>
    \log_2(2^k) \geq \log_2(n!) \Longrightarrow k \geq \frac{n}{2} \log_2
    \left(\frac{n}{2}\right) \Longrightarrow k = \Omega(n \log_2(n))
  </EquationBlock>

  <p>
    Therefore, the best lower bound for the worst-case runtime of the sorting
    algorithm is $T(n) = \Omega(n \log_2(n))$.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
