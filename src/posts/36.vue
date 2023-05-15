<template>
  <p>
    In a <RouterLink :to="{ name: '25' }">previous post</RouterLink>, I
    described how to integrate polynomials over
    <a href="https://en.wikipedia.org/wiki/Polygonal_chain">polygonal curves</a>
    in two dimensions. This post extends the previous one by outlining how to
    integrate polynomials over
    <a href="https://en.wikipedia.org/wiki/Polygon">polygonal domains</a> (with
    boundaries that do not self-intersect).
  </p>

  <p>Let $p_d(x,y)$ be a polynomial of degree $d$:</p>

  <EquationBlock>
    p_d(x,y) = \SumSub{m,n=0}{m + n \leq d}^d c_{mn} x^m y^n
  </EquationBlock>

  <p>
    Let's denote $\Omega$ as a two-dimensional polygonal domain, and $S$ as the
    positively oriented boundary of $\Omega$. Our goal is to compute the area
    integral of $p_d(x,y)$ over $\Omega$:
  </p>

  <EquationBlock> \int_{\Omega} p_d(x,y) \D{x}\D{y} </EquationBlock>

  <p>
    The curve $S$ consists of a connected series of $n$ line segments $S_i$,
    with $i = 1, 2, \ldots, n$. Let $L_i$ be the length of $S_i$ and let $(x_i,
    y_i)$ and $(x_{i+1}, y_{i+1}) = (x_i + \Delta{x_i}, y_i + \Delta{y_i})$
    represent the coordinates of its end nodes (see
    <FigureLink id="polygonal-domain" /> for an example with $n = 6$).
  </p>

  <FigureBlock
    id="polygonal-domain"
    caption="A polygonal domain $\Omega$ and its positively oriented boundary
             $S$. Since $S$ is a closed curve, the starting point $(x_1, y_1)$
             is equal to the ending point $(x_7, y_7)$, which is also the point
             reached from $(x_6, y_6)$ by the displacement
             $(\Delta{x_6}, \Delta{y_6})$. Hence, we have
             $(x_1, y_1) = (x_7, y_7) = (x_6 + \Delta{x_6}, y_6 + \Delta{y_6})$."
  >
    <ResponsiveImage alt="Polygonal domain" :src="polygonalDomain" />
  </FigureBlock>

  <p>
    To compute $\int_{\Omega} p_d(x,y) \D{x}\D{y}$, we can employ the
    <a href=" https://en.wikipedia.org/wiki/Divergence_theorem"
      >divergence theorem</a
    >. First, notice that:
  </p>

  <EquationBlock>
    p_d(x,y) = \DDo{x} \left( \SumSub{m,n=0}{m + n \leq d}^d c_{mn}
    \frac{x^{m+1}}{m+1}y^n \right) = \nabla\cdot(q_{d+1}(x,y), 0)
    \label{p-divergent-form}
  </EquationBlock>

  <p>where</p>

  <EquationBlock>
    q_{d+1}(x,y) = \SumSub{m,n=0}{m + n \leq d}^d c_{mn} \frac{x^{m+1}}{m+1} y^n
    \label{definition-q}
  </EquationBlock>

  <p>
    is a polynomial of degree $(d + 1)$. Integrating both sides of equation
    \eqref{p-divergent-form} yields:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{\Omega} p_d(x,y) \D{x}\D{y}
      &= \int_{\Omega} \nabla\cdot(q_{d+1}(x,y), 0) \D{x}\D{y} \\
      &= \int_{S} (q_{d+1}(x,y), 0) \cdot \Vec{n}(x,y) \D{l} \\
      &= \int_{S} q_{d+1}(x,y) n^1(x,y) \D{l} \\
      &= \sum_{i=1}^{n} \int_{S_i} q_{d+1}(x,y)n^1(x,y) \D{l} \label{integral-q-n1}
  </EquationBlock>

  <p>
    where $\Vec{n}(x,y)$ is the outward unit normal to the surface $S$ (keep in
    mind that $S$ is positively oriented) and $n^1(x,y)$ is its $x$ component.
    Over the extension of each segment, the normal $\Vec{n}(x,y)$ remains
    constant. Denoting the normal along the segment $S_i$ as $\Vec{n}_i$, we can
    then rewrite equation \eqref{integral-q-n1} as:
  </p>

  <EquationBlock>
    \int_{\Omega} p_d(x,y) \D{x}\D{y} = \sum_{i=1}^{n} n^1_i \int_{S_i}
    q_{d+1}(x,y) \D{l} \label{integral-q}
  </EquationBlock>

  <p>
    An expression for $\Vec{n}_i$ can be obtained by rotating the vector
    $(\Delta{x_i}, \Delta{y_i})$ by $\pi/2$ in the clockwise direction and
    normalizing the resulting vector:
  </p>

  <EquationBlock>
    \Vec{n}_i = \frac{(\Delta{y_i}, -\Delta{x_i})}{\sqrt{\Delta{y_i}^2 +
    \Delta{x_i}^2}} \Longrightarrow n^1_i =
    \frac{\Delta{y_i}}{\sqrt{\Delta{x_i}^2 + \Delta{y_i}^2}} =
    \frac{\Delta{y_i}}{L_i} \label{n_i}
  </EquationBlock>

  <p>
    Although the right-hand side of equation \eqref{integral-q} can be computed
    using the method described in the
    <RouterLink :to="{ name: '25' }">previous post</RouterLink>, we will opt for
    another approach that yields a simpler expression for the area integral we
    wish to compute.
  </p>

  <p>
    To start, notice that segments with $\Delta{y_i} = 0$ (horizontal segments)
    do not contribute to the sum in equation \eqref{integral-q} since for these
    segments $n^1_i = 0$. In other words, we only need to consider the segments
    $S_i$ where $\Delta{y_i} \neq 0$.
  </p>

  <p>We can parameterize each such segment $S_i$ as shown below:</p>

  <EquationBlock>
    \Vec{r}_i(s) = \left(\tilde{x}_i(s), \tilde{y}_i(s)\right) = (x_i +
    s\Delta{x_i}, y_i + s\Delta{y_i}) \label{S_i-parameterization}
  </EquationBlock>

  <p>
    where $s \in [0,1]$. Let $\Vec{r}_i'(s)$ be the derivative of $\Vec{r}_i(s)$
    with respect to $s$. The length of $\Vec{r}_i'(s)$ is:
  </p>

  <EquationBlock>
    \left\|\Vec{r}'_i(s)\right\| = \left\|(\Delta{x_i}, \Delta{y_i})\right\| =
    \sqrt{\Delta{x_i}^2 + \Delta{y_i}^2} = L_i
  </EquationBlock>

  <p>
    We can now use the parameterization from equation
    \eqref{S_i-parameterization} as well as the definition of
    <a href="https://en.wikipedia.org/wiki/Line_integral">line integral</a>
    to compute the right-hand side of equation \eqref{integral-q}:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{\Omega} p_d(x,y) \D{x}\D{y}
      &= \sum_{i=1}^{n} n^1_i \int_{S_i} q_{d+1}(x,y) \D{l} \\
      &= \sum_{i=1}^{n} n^1_i \int_{0}^{1} q_{d+1}(\tilde{x}_i(s),\tilde{y}_i(s))
         \left\|\Vec{r}'_i(s)\right\|\D{s} \\
      &= \sum_{i=1}^{n} n^1_i \int_{0}^{1} q_{d+1}(x_i + s\Delta{x_i}, y_i +
         s\Delta{y_i}) L_i \D{s} \label{integral-expansion}
  </EquationBlock>

  <p>
    Now consider the following change of variable (from now on we will
    explicitly consider only segments with $\Delta{y_i} \neq 0$):
  </p>

  <EquationBlock>
    y = y_i + s\Delta{y_i} \Longrightarrow \Di{y} = \Delta{y_i} \D{s}
    \label{y-in-terms-of-s}
  </EquationBlock>

  <p>As for the $x$ variable, \eqref{y-in-terms-of-s} implies:</p>

  <EquationBlock>
    x_i + s\Delta{x_i} = x_i + (y - y_i)\frac{\Delta{x_i}}{\Delta{y_i}} = x_i +
    m_i (y - y_i) \label{x-in-terms-of-s}
  </EquationBlock>

  <p>where $m_i = \Delta{x_i} / \Delta{y_i}$.</p>

  <p>
    Using equations \eqref{y-in-terms-of-s} and \eqref{x-in-terms-of-s} in
    equation \eqref{integral-expansion}, we obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{\Omega} p_d(x,y) \D{x}\D{y}
      &= \SumSub{i=1}{\Delta{y_i} \neq 0}^{n} n^1_i L_i \int_{y_i}^{y_{i+1}}
         q_{d+1}(x_i + m_i (y - y_i), y) \frac{1}{\Delta{y_i}} \D{y} \\
      &= \SumSub{i=1}{\Delta{y_i} \neq 0}^{n} \frac{n^1_i L_i}{\Delta{y_i}}
         \int_{y_i}^{y_{i+1}} q_{d+1}(x_i + m_i (y - y_i), y) \D{y} \\
      &= \SumSub{i=1}{\Delta{y_i} \neq 0}^{n} \int_{y_i}^{y_{i+1}}
         q_{d+1}(x_i - m_i y_i + m_i y, y) \D{y} \\
      &= \SumSub{i=1}{\Delta{y_i} \neq 0}^{n} \SumSub{m,n=0}{m + n \leq d}
         c_{mn} \int_{y_i}^{y_{i+1}} \frac{(x_i - m_i y_i + m_i y)^{m+1}}{m+1}
         y^n \D{y} \label{integral-y}
  </EquationBlock>

  <p>where equations \eqref{n_i} and \eqref{definition-q} were used. Since:</p>

  <EquationBlock>
    (x_i - m_i y_i + m_i y)^{m+1} = \sum_{p=0}^{m+1} \binom{m+1}{p} (x_i - m_i
    y_i)^p m_i^{m+1-p} y^{m+1-p}
  </EquationBlock>

  <p>then equation \eqref{integral-y} can be written as:</p>

  <EquationBlock>
    \int_{\Omega} p_d(x,y) \D{x}\D{y} = \SumSub{i=1}{\Delta{y_i} \neq 0}^{n}
    \SumSub{m,n=0}{m + n \leq d}^{d} \sum_{p=0}^{m+1}
    \beta_{mnip}\int_{y_i}^{y_{i+1}} y^{m+1-p+n} \D{y} \label{integral-y-2}
  </EquationBlock>

  <p>where:</p>

  <EquationBlock>
    \beta_{mnip} = c_{mn} \binom{m+1}{p} \frac{(x_i - m_i y_i)^p}{m+1}
    \left(\frac{\Delta{x_i}}{\Delta{y_i}}\right)^{m+1-p}
  </EquationBlock>

  <p>
    Finally, evaluating the integrals over $y$ in equation \eqref{integral-y-2}
    gives us our final result:
  </p>

  <EquationBlock boxed>
    \int_{\Omega} p_d(x,y) \D{x}\D{y} = \SumSub{i=1}{\Delta{y_i} \neq 0}^{n}
    \SumSub{m,n=0}{m + n \leq d}^{d} \sum_{p=0}^{m+1}
    \beta_{mnip}\frac{\left(y_{i+1}^{m+2-p+n} - y_i^{m+2-p+n}\right)}{m+2-p+n}
    \label{integral-polygonal-domain}
  </EquationBlock>

  <p>
    Despite equation \eqref{integral-polygonal-domain} providing a general,
    analytic solution to the problem, implementing it numerically in this form
    can result in suboptimal performance. A more efficient method can be
    obtained by calculating all coefficients in advance and then hard-coding the
    obtained formula. To illustrate this, consider a polynomial of degree $d =
    2$:
  </p>

  <EquationBlock>
    p_2(x,y) = c_{00} + c_{10}x + c_{01}y + c_{20}x^2 + c_{11}xy + c_{02}y^2
  </EquationBlock>

  <p>
    By pre-computing the coefficients in equation
    \eqref{integral-polygonal-domain} for $p_2(x,y)$, we can derive a formula
    that is easier to implement numerically and more computationally efficient:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{\Omega} p_2(x,y) \D{x}\D{y} = \sum_{i=1}^{n} \Delta{y_i} \Bigg[
      &  &&\; c_{00} \bigg( \frac{\Delta{x_i}}{2} + x_i \bigg) \\
      &+ &&\; c_{10} \bigg( \frac{\Delta{x_i}^2}{6} + \frac{\Delta{x_i} x_i}{2}
              + \frac{x_i^2}{2} \bigg) \\
      &+ &&\;  c_{01} \bigg( \frac{\Delta{x_i}\Delta{y_i}}{3}
               + \frac{\Delta{x_i} y_i + \Delta{y_i} x_i}{2} + x_i y_i \bigg) \\
      &+ &&\; c_{20}\bigg( \frac{\Delta{x_i}^3}{12} + \frac{x_i\Delta{x_i}^2}{3}
              + \frac{x_i^2 \Delta{x_i}}{2} + \frac{x_i^3}{3} \bigg) \\
      &+ &&\; c_{11}\bigg( \frac{\Delta{x_i}^2\Delta{y_i}}{8}
              + \frac{\Delta{x_i}\Delta{y_i} x_i}{3} + \frac{x_i^2 \Delta{y_i}}{4} \\
      &  &&\; \quad \quad + \frac{\Delta{x_i}^2 y_i}{6}
              + \frac{\Delta{x_i} x_i y_i}{2} + \frac{x_i^2 y_i}{2} \bigg) \\
      &+ &&\; c_{02} \bigg(\frac{\Delta{x_i}\Delta{y_i}^2}{4}
              + \frac{2\Delta{x_i}\Delta{y_i} y_i}{3} + \frac{\Delta{x_i} y_i^2}{2} \\
      &  &&\; \quad \quad + \frac{x_i\Delta{y_i}^2}{3}
              + \Delta{y_i} y_i x_i + x_i y_i^2 \bigg)
    \Bigg]
  </EquationBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import polygonalDomain from "@/assets/images/polygonal-domain.svg";

onMounted(() => onViewMounted());
</script>
