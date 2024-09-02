<template>
  <p>
    Consider a sequence of $n$ values $x_i$, where $i = 1, 2, \ldots, n$. The
    <a href="https://en.wikipedia.org/wiki/Arithmetic_mean">arithmetic mean</a>
    $\mu_n$ of these values is defined as follows:
  </p>

  <EquationBlock label="mean">
    \mu_n = \frac{1}{n} \sum_{i=1}^n x_i
  </EquationBlock>

  <p>
    Despite the apparent simplicity of equation \eqref{mean}, numerically
    computing the sum of all values $x_i$ presents a problem: it can lead to
    cascading rounding errors due to the inherent limitations of
    <a href="https://en.wikipedia.org/wiki/Floating_point"
      >floating-point arithmetic</a
    >. Specifically, when aggregating the values $x_i$, the partial sum may
    become excessively large, in which case adding the next value $x_i$ can be
    equivalent to adding a small number to a large one. Given the finite
    precision involved in these additions, the accuracy of each computed partial
    sum may progressively decline, compromising the accuracy of the computed
    mean value.
  </p>

  <p>
    A better approach to computing $\mu_n$ can be obtained by rewriting equation
    \eqref{mean} as follows:
  </p>

  <EquationBlock>
    \mu_n = \frac{1}{n} \sum_{i=1}^n x_i = \frac{1}{n} \left(x_n +
    \sum_{i=1}^{n-1} x_i\right) = \frac{1}{n} \left(x_n + (n-1) \mu_{n-1}\right)
  </EquationBlock>

  <p>
    where $\mu_{n-1}$ is the arithmetic mean of the first $(n-1)$ values $x_1,
    x_2, \ldots, x_{n-1}$:
  </p>

  <EquationBlock>
    \mu_{n-1} = \frac{1}{n-1} \sum_{i=1}^{n-1} x_i
  </EquationBlock>

  <p>Therefore, we have:</p>

  <EquationBlock boxed label="mean-recursive">
    \mu_n = \mu_{n-1} + \frac{1}{n} (x_n - \mu_{n-1})
  </EquationBlock>

  <p>
    Equation \eqref{mean-recursive} provides a recursive formula for computing
    $\mu_n$ using the values of $\mu_{n-1}$ and $x_n$. It requires knowing
    $\mu_{n-1}$ to compute $\mu_n$, which in turn implies $\mu_{n-2}$ must be
    computed prior to $\mu_{n-1}$, and so on. Therefore, to compute $\mu_n$, we
    must first sequentially compute $\mu_1, \mu_2, \ldots, \mu_{n-1}$. While
    this approach involves more arithmetic operations than directly using
    \eqref{mean}, resulting in higher computational cost, its
    <a href="https://en.wikipedia.org/wiki/Time_complexity">time complexity</a>
    remains $O(n)$.
  </p>

  <p>
    So, why is the recursive formula \eqref{mean-recursive} preferred over the
    sum formula \eqref{mean}? The answer lies in its ability to better prevent
    arithmetic operations with large and small numbers. One potential drawback
    is that the factor $1/n$ can cause the second term to be significantly
    smaller than the first if $n$ is very large. However, in practice, this
    issue is less of a concern than the accuracy problems discussed earlier.
  </p>

  <p>
    To illustrate the practical difference between equations \eqref{mean} and
    \eqref{mean-recursive}, suppose we roll a six-faced dice $n$ times and
    compute the mean value of the face that lands upward (the dice does not have
    to be fair). Let's say each face $k = 1, 2, \ldots, 6$ lands upward $n_k$
    times. The exact mean value $\mu^\SupPar{e}_n$ of the top face is then given
    by:
  </p>

  <EquationBlock label="dice-mean">
    \mu^\SupPar{e}_n = \frac{1}{n} \sum_{i=1}^n x_i = \frac{1}{\sum_{k=1}^6 n_k}
    \sum_{k=1}^6 k n_k = \frac{n_1 + 2 n_2 + 3 n_3 + 4 n_4 + 5 n_5 + 6 n_6}{n_1
    + n_2 + n_3 + n_4 + n_5 + n_6}
  </EquationBlock>

  <p>
    where $x_i$ represents the result of the $i$-th roll. Let's denote the mean
    values computed numerically using equations \eqref{mean} and
    \eqref{mean-recursive} as $\mu^\SupPar{s}_n$ and $\mu^\SupPar{r}_n$, where
    $s$ and $r$ stand for "sum" and "recursive", respectively. We can assess the
    accuracy of each technique by comparing these computed values with the exact
    value $\mu^\SupPar{e}_n$.
    <TableLink id="mean-values" capitalized /> presents numerical results
    obtained for various combinations of values for each of the variables $(n_1,
    n_2, \ldots, n_6)$. These results were obtained using
    <a
      href="https://en.wikipedia.org/wiki/Single-precision_floating-point_format"
      >single-precision</a
    >
    floating-point numbers to make the effects of finite precision arithmetic
    more discernible. However, the accuracy issues described earlier also apply
    to
    <a
      href="https://en.wikipedia.org/wiki/Double-precision_floating-point_format"
      >double-precision</a
    >
    numbers, though larger values of $n$ may be needed for the effects to become
    noticeable.
  </p>

  <TableBlock
    id="mean-values"
    :columns="5"
    caption="Exact and approximate mean values computed using equations
             \eqref{mean}, \eqref{mean-recursive}, and \eqref{dice-mean}. Long
             sequences of values are used to highlight the effects of finite
             precision arithmetic. All values of $n$ and $n_k$ for $k = 1, 2,
             \ldots, 6$ are shown in millions. Note that the accuracy of
             $\mu^\SupPar{r}_n$ is more robust than that of
             $\mu^\SupPar{s}_n$."
  >
    <span>$n / 10^6$</span>
    <span>$(n_1, n_2, n_3, n_4, n_5, n_6) / 10^6$</span>
    <span>$\mu^\SupPar{e}_n$</span>
    <span>$\mu^\SupPar{s}_n$</span>
    <span>$\mu^\SupPar{r}_n$</span>

    <span>$6$</span>
    <span>$(1, 1, 1, 1, 1, 1)$</span>
    <span>$3.5000$</span>
    <span>$3.4856$</span>
    <span>$3.4997$</span>

    <span>$18$</span>
    <span>$(3, 3, 3, 3, 3, 3)$</span>
    <span>$3.5000$</span>
    <span>$3.4037$</span>
    <span>$3.5002$</span>

    <span>$18$</span>
    <span>$(4, 2, 1, 4, 2, 5)$</span>
    <span>$3.7222$</span>
    <span>$3.6160$</span>
    <span>$3.7191$</span>

    <span>$20$</span>
    <span>$(20, 0, 0, 0, 0, 0)$</span>
    <span>$1.0000$</span>
    <span>$0.8389$</span>
    <span>$1.0000$</span>
  </TableBlock>

  <p>
    Below is the script (written in Python 3) that was used to compute the
    values of $\mu^\SupPar{e}_n$, $\mu^\SupPar{s}_n$, and $\mu^\SupPar{r}_n$ in
    the table above. You can download it by clicking
    <a :href="pythonFile" download="mean.py">here</a>.
  </p>

  <CodeBlock language="python" :code="pythonCode" />

  <p>
    As a concluding remark, it should be noted that the recursive formula does
    not always yield more accurate results than the sum formula. Typically, when
    the computations are not heavily affected by rounding errors, the sum
    formula is likely to yield greater accuracy. This is because the recursive
    formula involves more arithmetic operations, including multiplications and
    divisions, both of which are more susceptible to rounding errors than
    additions and subtractions. However, the recursive formula is generally more
    resilient against rounding errors, making it a more reliable technique for
    computing the mean of arbitrary sequences of values.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());

const pythonCode = `
import random
import numpy

# Dice face values.
face_values = [1, 2, 3, 4, 5, 6]

# Number of times each dice face lands upward.
n_face = [4000000, 2000000, 1000000, 4000000, 2000000, 5000000]

# Create a shuffled sequence of dice rolls.
dice_rolls = []
for i in range(6):
  dice_rolls += [face_values[i]] * n_face[i]
random.seed(0)
random.shuffle(dice_rolls)

# Compute the exact mean face value.
exact_mean = numpy.dot(face_values, n_face) / len(dice_rolls)
print("mu^e: %.4f" % exact_mean)

# Compute the mean face value using the sum formula.
total_sum = numpy.float32(0)
for x in dice_rolls:
  total_sum += numpy.float32(x)
sum_mean = total_sum / numpy.float32(len(dice_rolls))
print("mu^s: %.4f" % sum_mean)

# Compute the mean face value using the recursive formula.
recursive_mean = numpy.float32(0)
for n, x in enumerate(dice_rolls, start=1):
  recursive_mean += (numpy.float32(x) - recursive_mean) / numpy.float32(n)
print("mu^r: %.4f" % recursive_mean)
`;

const pythonFile = URL.createObjectURL(
  new Blob([pythonCode.trim()], { type: "text/plain" })
);
</script>
