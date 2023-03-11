<template>
  <p>
    Frequently, in scientific computing, one needs to integrate polynomials over
    <a href="https://en.wikipedia.org/wiki/Polygonal_chain">polygonal curves</a
    >. This post derives a general formula for the integral of polynomial
    functions over two-dimensional polygonal curves.
  </p>

  <p>Let $p_d(x,y)$ be a polynomial of degree $d$:</p>

  <EquationBlock> p_d(x,y) = \sum_{m,n = 0}^{d} c_{mn}x^m y ^n </EquationBlock>

  <p>For instance, if $d = 2$:</p>

  <EquationBlock>
    p_2(x,y) = c_{00} + c_{10}x + c_{01}y + c_{20}x^2 + c_{11}xy + c_{02}y^2
    \label{polynomial-degree-2}
  </EquationBlock>

  <p>
    Let $S$ be a two-dimensional polygonal curve. We wish to compute the
    <a href="https://en.wikipedia.org/wiki/Line_integral">line integral</a>
    of $p_d(x,y)$ over $S$:
  </p>

  <EquationBlock> \int_{S} p_d(x,y) \D{l} </EquationBlock>

  <p>
    The curve $S$ is a collection of $n$ segments $S_i$, for $i = 1,2,\ldots,n$.
    Let $L_i$ be the length of $S_i$ and $(x_i, y_i)$ and $(x_{i+1}, y_{i+1}) =
    (x_i + \Delta{x_i}, y_i + \Delta{y_i})$ be the coordinates of its end nodes
    (see <FigureLink id="polygonal-curve" /> for an example where $n = 3$). We
    can parameterize $S_i$ as follows:
  </p>

  <EquationBlock>
    \Vec{r}_i(s) = \left(\tilde{x}_i(s), \tilde{y}_i(s) \right) = (x_i +
    s\Delta{x_i}, y_i + s\Delta{y_i}) \label{parameterization}
  </EquationBlock>

  <p>
    where $s \in [0,1]$. To convince yourself that $\Vec{r}_i(s)$ is a valid
    parameterization of $S_i$, notice that $\Vec{r}_i(0) = (x_i, y_i)$ and
    $\Vec{r}_i(1) = (x_{i+1}, y_{i+1})$, so as $s$ varies from $0$ to $1$,
    $\Vec{r}_i(s)$ travels through all points on the segment connecting $(x_i,
    y_i)$ to $(x_{i+1}, y_{i+1})$.
  </p>

  <FigureBlock
    id="polygonal-curve"
    caption="A polygonal curve $S$ with three segments."
  >
    <ResponsiveImage alt="Polygonal curve" :src="polygonalCurve" />
  </FigureBlock>

  <p>
    Let $\Vec{r}_i'(s)$ be the derivative of $\Vec{r}_i(s)$ with respect to $s$.
    The norm of $\Vec{r}_i'(s)$ is:
  </p>

  <EquationBlock>
    \left\|\Vec{r}'_i(s)\right\| =
    \left\|(\Delta{x_i},\Vec{r}_i(s)\Delta{y_i})\right\| = \sqrt{\Delta{x_i}^2 +
    \Delta{y_i}^2} = L_i \label{parameterization-derivative}
  </EquationBlock>

  <p>
    We can now use equations \eqref{parameterization} and
    \eqref{parameterization-derivative} to compute the line integral of
    $p_d(x,y)$ over $S$:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{S} p_d(x,y) \D{l}
      &= \sum_{i=1}^{n} \int_{S_i} p_d(x,y) \D{l} \\
      &= \sum_{i=1}^{n} \int_0^1 p_d(\tilde{x}_i(s), \tilde{y}_i(s)) \left|\Vec{r}'_i(s)\right\|\D{s} \\
      &= \sum_{i=1}^{n} \int_0^1 p_d(x_i + s\Delta{x_i}, y_i + s\Delta{y_i}) L_i \D{s} \\
      &= \sum_{i=1}^{n} L_i \int_0^1 \sum_{m,n = 0}^{d} c_{mn} (x_i + s\Delta{x_i})^m (y_i + s\Delta{y_i})^n \D{s}
  </EquationBlock>

  <p>Using the polynomial expansions below:</p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    (x_i + s\Delta{x_i})^m &= \sum_{k=0}^{m} \binom{m}{k} x_i^{m-k} \Delta{x_i}^k s^k \\
    (y_i + s\Delta{y_i})^n &= \sum_{p=0}^{n} \binom{n}{p} y_i^{n-p} \Delta{y_i}^p s^p
  </EquationBlock>

  <p>and doing a bit more algebraic work, one gets:</p>

  <EquationBlock>
    \int_0^1 p_d(\tilde{x}_i(s), \tilde{y}_i(s)) \D{s} = \sum_{m,n=0}^{d}
    \sum_{k=0}^{m} \sum_{p=0}^{n} \alpha_{mnkp} \frac{x_i^{m-k} \Delta{x_i}^k
    y_i^{n-p} \Delta{y_i}^p}{k+p+1}
  </EquationBlock>

  <p>where:</p>

  <EquationBlock>
    \alpha_{mnkp} = \binom{m}{k} \binom{n}{p} c_{mn}
  </EquationBlock>

  <p>From the result above, we have that:</p>

  <EquationBlock boxed>
    \int_{S} p_d(x,y) \D{l} = \sum_{i=1}^{n} L_i \left(\sum_{m,n=0}^{d}
    \sum_{k=0}^{m} \sum_{p=0}^{n} \alpha_{mnkp} \frac{x_i^{m-k} \Delta{x_i}^k
    y_i^{n-p} \Delta{y_i}^p}{k+p+1}\right) \label{integral-polygonal-curve}
  </EquationBlock>

  <p></p>

  <p>
    Unfortunately, equation \eqref{integral-polygonal-curve} is not very
    efficient for numerical computations (although it can be used as a last
    resort). Whenever possible, it's better to compute the integrals explicitly
    and hard-code them. As an example, for polynomials of degree $d = 2$ as in
    equation \eqref{polynomial-degree-2}, one can use equation
    \eqref{integral-polygonal-curve} to obtain a formula which is easy to
    hard-code:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{S} p_2(x,y) \D{l} = \sum_{i=1}^{n} L_i \Bigg[
      &  &&\; c_{00} \\
      &+ &&\; c_{10}\left(x_i + \frac{\Delta{x_i}}{2}\right) \\
      &+ &&\; c_{01}\left(y_i + \frac{\Delta{y_i}}{2}\right) \\
      &+ &&\; c_{20}\left(x_i^2 + x_i\Delta{x_i} + \frac{\Delta{x_i}^2}{3}\right) \\
      &+ &&\; c_{11}\left(x_i y_i + \frac{x_i\Delta{y_i}}{2} + \frac{y_i\Delta{x_i}}{2} + \frac{\Delta{x_i} \Delta{y_i}}{3}\right) \\
      &+ &&\; c_{02}\left(y_i^2 + y_i\Delta{y_i} + \frac{\Delta{y_i}^2}{3}\right)
    \Bigg]
  </EquationBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import polygonalCurve from "@/assets/images/polygonal-curve.svg";

onMounted(() => onViewMounted());
</script>
