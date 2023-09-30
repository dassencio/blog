<template>
  <p>
    In the world of scientific computing, integrating polynomials over
    <a href="https://en.wikipedia.org/wiki/Polygonal_chain">polygonal curves</a>
    (also referred to as "polygonal chains", "polygonal paths", or "polylines")
    is a common and important operation. In this post, I will derive a general
    formula for computing such integrals in two dimensions.
  </p>

  <p>Let $p_d(x,y)$ be a two-dimensional polynomial of degree $d$:</p>

  <EquationBlock>
    p_d(x,y) = \SumSub{m,n=0}{m + n \leq d}^d c_{mn} x^m y^n
  </EquationBlock>

  <p>
    and let $S$ be a two-dimensional polygonal curve. Our goal is to compute the
    <a href="https://en.wikipedia.org/wiki/Line_integral">line integral</a>
    of $p_d(x,y)$ over $S$:
  </p>

  <EquationBlock> \int_{S} p_d(x,y) \D{l} </EquationBlock>

  <p>
    The curve $S$ consists of a connected series of $n$ line segments $S_i$,
    with $i = 1, 2, \ldots, n$. Let $L_i$ be the length of $S_i$ and let $(x_i,
    y_i)$ and $(x_{i+1}, y_{i+1}) = (x_i + \Delta{x_i}, y_i + \Delta{y_i})$
    represent the coordinates of its end nodes (see
    <FigureLink id="polygonal-curve" /> for an example with $n = 3$).
  </p>

  <FigureBlock
    id="polygonal-curve"
    caption="A polygonal curve with three segments."
  >
    <ResponsiveImage alt="Polygonal curve" :src="polygonalCurve" />
  </FigureBlock>

  <p>We can parameterize each segment $S_i$ as shown below:</p>

  <EquationBlock label="Si-parameterization">
    \Vec{r}_i(s) = \left(\tilde{x}_i(s), \tilde{y}_i(s)\right) = (x_i +
    s\Delta{x_i}, y_i + s\Delta{y_i})
  </EquationBlock>

  <p>
    where $s \in [0,1]$. To convince yourself that $\Vec{r}_i(s)$ is a valid
    parameterization of $S_i$, note that $\Vec{r}_i(0) = (x_i, y_i)$ and that
    $\Vec{r}_i(1) = (x_{i+1}, y_{i+1})$, so as $s$ varies from $0$ to $1$,
    $\Vec{r}_i(s)$ travels through all points on the segment connecting $(x_i,
    y_i)$ to $(x_{i+1}, y_{i+1})$.
  </p>

  <p>
    Let $\Vec{r}_i'(s)$ be the derivative of $\Vec{r}_i(s)$ with respect to $s$.
    The norm of $\Vec{r}_i'(s)$ is given by:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock label="Si-parameterization-derivative">
    \left\|\Vec{r}_i'(s)\right\|
      = \left\|\left(\tilde{x}_i'(s), \tilde{y}_i'(s)\right)\right\|
      = \left\|(\Delta{x_i}, \Delta{y_i})\right\|
      = \sqrt{\Delta{x_i}^2 + \Delta{y_i}^2} = L_i
  </EquationBlock>

  <p>
    Equations \eqref{Si-parameterization} and
    \eqref{Si-parameterization-derivative} provide all we need to compute the
    line integral of $p_d(x,y)$ over $S$:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{S} p_d(x,y) \D{l}
      &= \sum_{i=1}^{n} \int_{S_i} p_d(x,y) \D{l} \\
      &= \sum_{i=1}^{n} \int_0^1 p_d(\tilde{x}_i(s), \tilde{y}_i(s))
         \left\|\Vec{r}_i'(s)\right\| \D{s} \\
      &= \sum_{i=1}^{n} \int_0^1 p_d(x_i + s\Delta{x_i}, y_i + s\Delta{y_i}) L_i \D{s} \\
      &= \sum_{i=1}^{n} L_i \int_0^1 \SumSub{m,n=0}{m + n \leq d}^d
         c_{mn} (x_i + s\Delta{x_i})^m (y_i + s\Delta{y_i})^n \D{s} \\
      &= \sum_{i=1}^{n} \SumSub{m,n=0}{m + n \leq d}^d L_i c_{mn}
         \int_0^1 (x_i + s\Delta{x_i})^m (y_i + s\Delta{y_i})^n \D{s}
      \label{integral-expansion}
  </EquationBlock>

  <p>Using the polynomial expansions below:</p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    (x_i + s\Delta{x_i})^m &= \sum_{k=0}^{m} \binom{m}{k} x_i^{m-k} s^k \Delta{x_i}^k  \\
    (y_i + s\Delta{y_i})^n &= \sum_{p=0}^{n} \binom{n}{p} y_i^{n-p} s^p \Delta{y_i}^p
  </EquationBlock>

  <p>we have:</p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    (x_i + s\Delta{x_i})^m (y_i + s\Delta{y_i})^n
      &= \sum_{k=0}^{m} \binom{m}{k} x_i^{m-k} s^k \Delta{x_i}^k \sum_{p=0}^{n}
         \binom{n}{p} y_i^{n-p} s^p \Delta{y_i}^p \\
      &= \sum_{k=0}^{m} \sum_{p=0}^{n} \binom{m}{k} \binom{n}{p} x_i^{m-k}
         \Delta{x_i}^k y_i^{n-p} \Delta{y_i}^p s^{k+p} \\
      &= \sum_{k=0}^{m} \sum_{p=0}^{n} \alpha_{mnkpi} s^{k+p}
  </EquationBlock>

  <p>where:</p>

  <EquationBlock label="alpha">
    \alpha_{mnkpi} = \binom{m}{k} \binom{n}{p} x_i^{m-k} \Delta{x_i}^k y_i^{n-p}
    \Delta{y_i}^p
  </EquationBlock>

  <p>Therefore:</p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_0^1 (x_i + s\Delta{x_i})^m (y_i + s\Delta{y_i})^n \D{s}
      &= \int_0^1 \sum_{k=0}^{m} \sum_{p=0}^{n} \alpha_{mnkpi} s^{k+p} \D{s} \\
      &= \sum_{k=0}^{m} \sum_{p=0}^{n} \alpha_{mnkpi} \int_0^1 s^{k+p} \D{s} \\
      &= \sum_{k=0}^{m} \sum_{p=0}^{n} \frac{\alpha_{mnkpi}}{k+p+1}
  </EquationBlock>

  <p>
    Inserting this result into equation \eqref{integral-expansion} gives us:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{S} p_d(x,y) \D{l}
      &= \sum_{i=1}^{n} \SumSub{m,n=0}{m + n \leq d}^d L_i c_{mn} \sum_{k=0}^{m}
         \sum_{p=0}^{n} \frac{\alpha_{mnkpi}}{k+p+1} \\
      &= \sum_{i=1}^{n} \SumSub{m,n=0}{m + n \leq d}^d \sum_{k=0}^{m}
         \sum_{p=0}^{n} L_i c_{mn} \frac{\alpha_{mnkpi}}{k+p+1} \\
  </EquationBlock>

  <p>
    From the definition of $\alpha_{mnkpi}$ in equation \eqref{alpha}, we
    finally obtain:
  </p>

  <EquationBlock boxed label="integral-polygonal-curve">
    \int_{S} p_d(x,y) \D{l} = \sum_{i=1}^{n} \SumSub{m,n=0}{m + n \leq d}^d
    \sum_{k=0}^{m} \sum_{p=0}^{n} L_i c_{mn} \binom{m}{k} \binom{n}{p}
    \frac{x_i^{m-k} \Delta{x_i}^k y_i^{n-p} \Delta{y_i}^p}{k+p+1}
  </EquationBlock>

  <p>
    Despite equation \eqref{integral-polygonal-curve} providing a general,
    analytic solution to the problem, implementing it numerically in this form
    can result in suboptimal performance. A more efficient method can be
    obtained by computing all coefficients in advance and then hard-coding the
    obtained formula. To illustrate this, consider a polynomial of degree $d =
    2$:
  </p>

  <EquationBlock>
    p_2(x,y) = c_{00} + c_{10}x + c_{01}y + c_{20}x^2 + c_{11}xy + c_{02}y^2
  </EquationBlock>

  <p>
    By pre-computing the coefficients in equation
    \eqref{integral-polygonal-curve} for $p_2(x,y)$, we can derive a formula
    that is easier to implement numerically and more computationally efficient:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{S} p_2(x,y) \D{l} = \sum_{i=1}^{n} L_i \Bigg[
      &  &&\; c_{00} \\
      &+ &&\; c_{10}\left(x_i + \frac{\Delta{x_i}}{2}\right) \\
      &+ &&\; c_{01}\left(y_i + \frac{\Delta{y_i}}{2}\right) \\
      &+ &&\; c_{20}\left(x_i^2 + x_i\Delta{x_i} + \frac{\Delta{x_i}^2}{3}\right) \\
      &+ &&\; c_{11}\left(x_i y_i + \frac{x_i\Delta{y_i}}{2} + \frac{y_i\Delta{x_i}}{2}
              + \frac{\Delta{x_i} \Delta{y_i}}{3}\right) \\
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
