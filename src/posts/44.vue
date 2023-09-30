<template>
  <p>
    The
    <a href="https://en.wikipedia.org/wiki/Fibonacci_number"
      >Fibonacci sequence</a
    >
    is a famous sequence defined as follows:
  </p>

  <EquationBlock align>
    F_0 &= 0 \\ F_1 &= 1 \\ F_n &= F_{n-1} + F_{n-2}
  </EquationBlock>

  <p>
    where the last line applies for $n \gt 1$, meaning $F_2 = F_1 + F_0 = 1$,
    $F_3 = F_2 + F_1 = 2$, and so forth.
  </p>

  <SectionTitle>Computing $F_n$ non-recursively</SectionTitle>

  <p>
    Since the sequence is defined recursively, it's not immediately obvious how
    to compute the $n$-th element without using recursion. Nevertheless, it's
    possible if we examine the elements of the Fibonacci sequence in pairs:
  </p>

  <EquationBlock align>
    F_{n+1} &= F_{n} + F_{n-1} \\ F_{n} &= F_{n} \label{fibonacci-pairs}
  </EquationBlock>

  <p>
    The second line may seem trivial, but it helps us interpret equation
    \eqref{fibonacci-pairs} using matrices, as demonstrated below:
  </p>

  <EquationBlock label="fibonacci-pairs-matrix">
    \MatrixTwoOne{F_{n+1}}{F_n} = \MatrixTwoOne{F_{n} + F_{n-1}}{F_{n}} =
    \MatrixTwoTwo{1}{1}{1}{0} \MatrixTwoOne{F_{n}}{F_{n-1}}
  </EquationBlock>

  <p>
    Equation \eqref{fibonacci-pairs-matrix} is particularly interesting as it
    yields a recursive formula linking the pairs $(F_{n+1}, F_n)$ and $(F_n,
    F_{n-1})$. This equation enables us to directly relate $(F_{n+1}, F_n)$ to
    $(F_1, F_0)$. Let's define:
  </p>

  <EquationBlock> M = \MatrixTwoTwo{1}{1}{1}{0} </EquationBlock>

  <p>We then have that:</p>

  <EquationBlock>
    \MatrixTwoOne{F_{n+1}}{F_n} = M \MatrixTwoOne{F_{n}}{F_{n-1}} = M^2
    \MatrixTwoOne{F_{n-1}}{F_{n-2}} = \ldots = M^n \MatrixTwoOne{F_{1}}{F_{0}}
  </EquationBlock>

  <p>Given that $F_0 = 0$ and $F_1 = 1$, we obtain:</p>

  <EquationBlock label="fibonacci-pairs-M-power-n">
    \MatrixTwoOne{F_{n+1}}{F_n} = M^n \MatrixTwoOne{1}{0}
  </EquationBlock>

  <p>
    Computing $M^n$ can be efficiently achieved by first
    <a href="https://en.wikipedia.org/wiki/Diagonalizable_matrix"
      >diagonalizing</a
    >
    it. As $M$ is symmetric, it is therefore diagonalizable. Let's begin by
    finding its eigenvalues:
  </p>

  <EquationBlock label="M-eigenvalues-equation">
    \det(M - \lambda I) = 0 \Longrightarrow \det\MatrixTwoTwo{1 -
    \lambda}{1}{1}{-\lambda} = \lambda^2 - \lambda - 1 = 0
  </EquationBlock>

  <p>
    The solutions of equation \eqref{M-eigenvalues-equation} are the eigenvalues
    of $M$:
  </p>

  <EquationBlock label="M-eigenvalues">
    \lambda_{\pm} = \frac{1 \pm \sqrt{5}}{2}
  </EquationBlock>

  <p>
    The eigenvalue $\lambda_+$ is recognized as the
    <a href="https://en.wikipedia.org/wiki/Golden_ratio">golden ratio</a>,
    typically denoted by the Greek letter $\phi$. In this discussion, however,
    we will use $\lambda_+$ for convenience.
  </p>

  <p>
    Let's proceed to find eigenvectors of $M$ associated with these eigenvalues:
  </p>

  <EquationBlock label="M-eigenvectors-equation">
    \MatrixTwoTwo{1}{1}{1}{0} \MatrixTwoOne{\alpha_{\pm}}{\beta_{\pm}} =
    \MatrixTwoOne{\alpha_{\pm} + \beta_{\pm}}{\alpha_{\pm}} =
    \lambda_{\pm}\MatrixTwoOne{\alpha_{\pm}}{\beta_{\pm}}
  </EquationBlock>

  <p>
    According to equation \eqref{M-eigenvectors-equation}, the eigenvectors of
    $M$ satisfy:
  </p>

  <EquationBlock label="alpha-beta-pm">
    \alpha_{\pm} = \lambda_{\pm}\beta_{\pm}
  </EquationBlock>

  <p>
    Given that we can select $\beta_+$ and $\beta_-$ arbitrarily, we will choose
    $\beta_+ = \beta_- = 1$ to obtain two eigenvectors $\Vec{w}_+$ and
    $\Vec{w}_-$ of $M$ associated with $\lambda_+$ and $\lambda_-$ respectively.
    Adopting these values for $\beta_{\pm}$ and referring to equation
    \eqref{alpha-beta-pm}, we obtain:
  </p>

  <EquationBlock label="M-eigenvectors">
    \Vec{w}_{\pm} = \MatrixTwoOne{\lambda_{\pm}}{1}
  </EquationBlock>

  <p>
    It's worth noting that since $M$ is symmetric, its eigenvectors should be
    orthogonal. As expected:
  </p>

  <EquationBlock>
    \Vec{w}_+^T \Vec{w}_- = \lambda_+ \lambda_- + 1 = \left(\frac{1 +
    \sqrt{5}}{2}\right)\left(\frac{1 - \sqrt{5}}{2}\right) + 1 =\frac{1 - 5}{4}
    + 1 = 0
  </EquationBlock>

  <p>
    Equation \eqref{M-eigenvectors} enables us to diagonalize $M$. By defining
    $P = (\Vec{w}_+, \Vec{w}_-)$ as the $2 \times 2$ matrix with columns
    corresponding to $\Vec{w}_+$ and $\Vec{w}_-$, we find that:
  </p>

  <EquationBlock> P = \MatrixTwoTwo{\lambda_+}{\lambda_-}{1}{1} </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock>
    MP = (M\Vec{w}_+, M\Vec{w}_-) = (\lambda_+\Vec{w}_+, \lambda_-\Vec{w}_-) =
    (\Vec{w}_+, \Vec{w}_-) \MatrixTwoTwo{\lambda_+}{0}{0}{\lambda_-} = PD
  </EquationBlock>

  <p>where:</p>

  <EquationBlock> D = \MatrixTwoTwo{\lambda_+}{0}{0}{\lambda_-} </EquationBlock>

  <p>This implies:</p>

  <EquationBlock label="M-diagonalization"> M = PDP^{-1} </EquationBlock>

  <p>where:</p>

  <EquationBlock>
    P^{-1} = \frac{1}{\lambda_+ - \lambda_-}
    \MatrixTwoTwo{1}{-\lambda_-}{-1}{\lambda_+}
  </EquationBlock>

  <p>
    The above expression for $P^{-1}$ is obtained using the
    <a href="http://mathworld.wolfram.com/MatrixInverse.html"
      >standard formula</a
    >
    for the inverse of $2 \times 2$ matrices. $P$ is invertible since $\det(P) =
    \lambda_+ - \lambda_- \neq 0$.
  </p>

  <p>
    Equation \eqref{M-diagonalization} provides the diagonalization of $M$. This
    equation is particularly valuable as it simplifies the computation of $M^n$:
  </p>

  <EquationBlock label="M-power-n">
    M^n = (PDP^{-1})^n = PD^nP^{-1}
  </EquationBlock>

  <p>where:</p>

  <EquationBlock label="D-power-n">
    D^n = \MatrixTwoTwo{\lambda_+^n}{0}{0}{\lambda_-^n}
  </EquationBlock>

  <p>
    By applying equations \eqref{M-power-n} and \eqref{D-power-n} to equation
    \eqref{fibonacci-pairs-M-power-n}, we obtain:
  </p>

  <EquationBlock label="fibonacci-pair-analytic-solution">
    \MatrixTwoOne{F_{n+1}}{F_n} = PD^nP^{-1} \MatrixTwoOne{1}{0} =
    \frac{1}{\lambda_+ - \lambda_-} \MatrixTwoOne{\lambda_+^{n+1} -
    \lambda_-^{n+1}}{\lambda_+^{n} - \lambda_-^{n}}
  </EquationBlock>

  <p>
    By employing the values of $\lambda_{\pm}$ from equation
    \eqref{M-eigenvalues}, we arrive at the final expression for $F_n$:
  </p>

  <EquationBlock boxed label="Fn">
    F_n = \frac{1}{\sqrt{5}}\left[\left(\frac{1 + \sqrt{5}}{2}\right)^n -
    \left(\frac{1 - \sqrt{5}}{2}\right)^n\right]
  </EquationBlock>

  <SectionTitle>The golden ratio</SectionTitle>

  <p>
    As the Fibonacci sequence $F_{n+1} = F_{n} + F_{n-1}$ is such that $F_{n+1}
    \geq F_{n} + 1$ for all $n \geq 2$, the sequence $F_n$ diverges when $n
    \rightarrow \infty$. Interestingly, the following sequence (starting at $n =
    1$ since $F_0 = 0$):
  </p>

  <EquationBlock> a_n = \frac{F_{n+1}}{F_n} </EquationBlock>

  <p>
    does not diverge. In fact, it converges to the golden ratio. It is
    straightforward to demonstrate this fact (and there are numerous methods to
    do so). From equation \eqref{fibonacci-pair-analytic-solution}, we deduce
    that:
  </p>

  <EquationBlock>
    \frac{F_{n+1}}{F_n} = \frac{\lambda_+^{n+1} - \lambda_-^{n+1}}{\lambda_+^{n}
    - \lambda_-^{n}} = \lambda_+\left(\frac{1 - (\lambda_-/\lambda_+)^{n+1}}{1 -
    (\lambda_-/\lambda_+)^{n}}\right)
  </EquationBlock>

  <p>
    Given that $|\lambda_+| \approx 1.62$ is greater than $|\lambda_-| \approx
    0.62$, both $(\lambda_-/\lambda_+)^{n+1}$ and $(\lambda_-/\lambda_+)^{n}$
    approach zero as $n \rightarrow \infty$. This implies the following:
  </p>

  <EquationBlock boxed>
    \lim_{n \rightarrow \infty} \frac{F_{n+1}}{F_n} = \lambda_+ = \frac{1 +
    \sqrt{5}}{2} \approx 1.61803
  </EquationBlock>

  <SectionTitle>Finding $F_n$ for large values of $n$</SectionTitle>

  <p>
    Despite equation \eqref{Fn} providing an analytical expression for $F_n$, it
    is not useful in practice for obtaining the value of $F_n$ on a computer.
    The challenge arises from the precision errors that are inherent in
    <a href="https://en.wikipedia.org/wiki/Floating_point"
      >floating-point arithmetic</a
    >.
  </p>

  <p>
    Alternatively, one could use
    <a href="https://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic"
      >arbitrary precision arithmetic</a
    >
    in conjunction with
    <a href="https://en.wikipedia.org/wiki/Exponentiation_by_squaring"
      >exponentiation by squaring</a
    >
    to compute $F_n$ via equation \eqref{fibonacci-pairs-M-power-n}. A Python
    script showcasing this approach can be found
    <a href="https://github.com/dassencio/fibonacci">here</a>.
  </p>

  <p>
    It's important to clarify that the time complexity of the method discussed
    above isn't $O(\log_2 n)$. Even though the exponentiation by squaring
    technique bears a logarithmic time complexity, when we introduce arbitrary
    precision, it changes the time complexity of the entire algorithm to $O(n)$.
    This is because the quantity $\Digits(F_n)$, which represents the number of
    digits in $F_n$, is proportional to $n$ for large values of $n$. We can
    demonstrate this by using equation \eqref{Fn}:
  </p>

  <EquationBlock>
    \Digits(F_n) \approx \log_{10} F_n = \log_{10}\left(\frac{\lambda_+^n -
    \lambda_-^n}{\sqrt{5}}\right) \approx n\log_{10} \lambda_+ \propto n
  </EquationBlock>

  <p>
    where above we used the fact that $\lambda_-^n \rightarrow 0$ as $n
    \rightarrow \infty$. To further explain this, consider that an algorithm
    cannot produce a result with $n$ digits in less than $O(n)$ time.
    Furthermore, the time complexity of arithmetic operations involving
    arbitrary precision is typically
    <a
      href="https://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic#Implementation_issues"
      >$O(n)$ or worse</a
    >. As a result, it's not feasible to compute $F_n$ in less than $O(n)$ time.
    Even the operation of adding two large numbers with $n$ digits has a time
    complexity of $O(n)$.
  </p>

  <p>
    To see this in action, I ran the Python script mentioned earlier. In this
    experiment, I computed $F_n$ for values of $n = 2^i$, where $i$ ranges from
    20 to 30 (these represent notably large values of $n$). As can be seen in
    <FigureLink id="computation-time" />, the time required to compute $F_n$
    exhibits a linear relationship with $n$.
  </p>

  <FigureBlock
    id="computation-time"
    caption="Graph of $\log_2(T_n)$ vs. $\log_2(n)$, where $T_n$ denotes the
             time (in seconds) required to compute $F_n$. A linear fit for the
             given data is also depicted to emphasize the fact that $T_n$
             grows linearly with $n$."
  >
    <FlotChart class="computation-time-graph" :data="data" :options="options" />
  </FigureBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());

const dataPoints = [
  [20, -2.9771],
  [21, -1.9771],
  [22, -0.66887],
  [23, 0.41684],
  [24, 1.58304],
  [25, 2.70354],
  [26, 3.85937],
  [27, 4.99127],
  [28, 6.09119],
  [29, 7.16527],
  [30, 8.3973],
];

const linearFitPoints = [];

for (let n = 20; n <= 30; ++n) {
  linearFitPoints.push([n, 1.1377 * n - 25.7529]);
}

const options = {
  xaxis: {
    axisLabel: "$\\log_2(n)$",
    max: 30,
    min: 20,
    ticks: 10,
  },
  yaxis: {
    axisLabel: "$\\log_2(T_n)$",
    max: 9.0,
    min: -3.5,
    ticks: 5,
  },
};

const data = [
  {
    data: linearFitPoints,
    lines: {
      show: true,
    },
    color: 1,
  },
  {
    data: dataPoints,
    points: {
      show: true,
    },
    color: 0,
  },
];
</script>

<style scoped lang="scss">
.computation-time-graph {
  height: 20 * $base-length;
  width: 35 * $base-length;
  :deep(.yaxisLabel) {
    margin-left: 0.9 * $base-length;
  }
}
</style>
