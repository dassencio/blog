<template>
  <p>
    Suppose you have a coin which, when flipped, yields a head with probability
    $p \gt 0$ and a tail with probability $q = 1 - p$ (if the coin is fair, then
    $p = q = 1/2$). How many times would you need to flip this coin on average
    until you get a head?
  </p>

  <p>
    To answer this question, consider the probability $P(n)$ of obtaining a head
    for the first time on the $n$-th coin flip. In other words, $P(n)$
    represents the probability of obtaining $n - 1$ consecutive tails and then a
    head:
  </p>

  <EquationBlock> P(n) = q^{n-1} p </EquationBlock>

  <p>The average number of coin flips needed until a head appears is then:</p>

  <EquationBlock>
    E_p[n] = \sum_{n=1}^\infty n P(n) = \sum_{n=1}^\infty n q^{n-1} p
    \label{E-p}
  </EquationBlock>

  <p>
    The only thing left to do now is to compute the infinite sum on the
    right-hand side of equation \eqref{E-p}. To achieve this, consider the
    following sequence:
  </p>

  <EquationBlock>
    e_k = \sum_{n=1}^k n q^{n-1} p = p \sum_{n=1}^k n q^{n-1} \label{e-k}
  </EquationBlock>

  <p>
    The sequence $e_k$ is such that $E_p[n] = \lim_{k \rightarrow \infty} e_k$.
    It is closely related to the
    <a href="https://en.wikipedia.org/wiki/Geometric_series">geometric series</a
    >. In fact, consider the sequence $g_k$, which is obtained by taking the
    first $k + 1$ terms of the geometric series as its $k$-th element. For any
    real value $x \neq 1$, we have:
  </p>

  <EquationBlock>
    g_k = \sum_{n=0}^k x^n = \frac{1 - x^{k+1}}{1 - x}
  </EquationBlock>

  <p>Taking the derivative of $g_k$ with respect to $x$ yields:</p>

  <EquationBlock>
    \DD{g_k}{x} = \sum_{n=1}^k n x^{n-1} = -\frac{(k+1) x^k}{1 - x} + \frac{1 -
    x^{k+1}}{(1 - x)^2} \label{g-k-derivative}
  </EquationBlock>

  <p>
    where the term with $n = 0$ was omitted since it is identically zero.
    Comparing equations \eqref{e-k} and \eqref{g-k-derivative}, we see that:
  </p>

  <EquationBlock>
    e_k = p \sum_{n=1}^k n q^{n-1} = p \left. \DD{g_k}{x} \right|_{x = q}
  </EquationBlock>

  <p>
    In other words, $e_k$ equals $p$ times the derivative of $g_k$ with respect
    to $x$ evaluated at $x = q$:
  </p>

  <EquationBlock>
    e_k = p \left(-\frac{(k + 1) q^k}{p} + \frac{1 - q^{k+1}}{p^2}\right) =
    -(k+1) q^k + \frac{1 - q^{k+1}}{p} \label{e-k-2}
  </EquationBlock>

  <p>
    Given our assumption that $p \gt 0$, it follows that $q \lt 1$ and,
    consequently, both $k q^k$ and $q^k$ vanish as $k \rightarrow \infty$.
    Applying this fact to equation \eqref{e-k-2}, we obtain:
  </p>

  <EquationBlock boxed>
    E_p[n] = \lim_{k \rightarrow \infty} e_k = \frac{1}{p}
  </EquationBlock>

  <p>
    The solution to the problem is elegantly simple: the average number of times
    we need to flip the coin until we get a head is $1 / p$. If $p = 1$, every
    coin flip results in a head, so $E_{p=1}[n] = 1$. As $p$ approaches $0$, the
    coin becomes increasingly biased toward tails, and, unsurprisingly, the
    average number of flips required to get a head increases, diverging as $p
    \rightarrow 0$. For a fair coin, where $p = 1/2$, we find that:
  </p>

  <EquationBlock> E_{p=1/2}[n] = 2 </EquationBlock>

  <p>Hence, on average, we only need to flip the coin twice to get a head.</p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
