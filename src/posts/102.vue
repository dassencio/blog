<template>
  <p>
    <i>
      Let $C_1$ and $C_2$ be two circles with radii $r_1$ and $r_2$,
      respectively, whose centers are at a distance $d$ from each other. Assume,
      without loss of generality, that $r_1 \geq r_2$. What is the intersection
      area of these two circles?
    </i>
  </p>

  <p>
    If $d \geq r_1 + r_2$, the circles intersect at most up to a point (when $d
    = r_1 + r_2$) and therefore the intersection area is zero. On the other
    extreme, if $d + r_2 \leq r_1$, circle $C_2$ is entirely contained within
    $C_1$ and the intersection area is the area of $C_2$ itself: $\pi r_2^2$.
    The challenging case occurs when both $d \lt r_1 + r_2$ and $d + r_2 \gt
    r_1$ are satisfied, i.e., when the circles intersect only partially but the
    intersection area is more than simply a point. Upon rearranging the second
    inequality, we obtain $r_1 - r_2 \lt d \lt r_1 + r_2$; we will assume this
    to be the case from now on.
  </p>

  <p>
    To solve this problem, we will make use of a Cartesian coordinate system
    with the origin at the center of circle $C_1$ such that the center of $C_2$
    is at $(d, 0)$ as shown in <FigureLink id="intersecting-circles" />.
  </p>

  <FigureBlock
    id="intersecting-circles"
    caption="Two intersecting circles $C_1$ (blue) and $C_2$ (red) with radii
             $r_1$ and $r_2$, respectively. The distance between the centers of
             the circles is $d = d_1 + d_2$, where $d_1$ is the $x$ coordinate
             of the intersection points and $d_2 = d - d_1$. Notice that $d_1
             \geq 0$ since these points are always located to the right of the
             center of $C_1$, but $d_2$ may be negative when $r_2 \lt r_1$
             since, in this case, the intersection points will eventually fall
             to the right of the center of $C_2$ as we move $C_2$ to the left,
             making $d \lt d_1$ and therefore $d_2 \lt 0$."
  >
    <ResponsiveImage
      alt="Two intersecting circles"
      :src="intersectingCircles"
    />
  </FigureBlock>

  <p>
    The circles $C_1$ and $C_2$ are described by the following equations,
    respectively:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock multiple label="c1">
    x^2 + y^2 &= r_1^2 \\
    (x - d)^2 + y^2 &= r_2^2
  </EquationBlock>

  <p>
    At the intersection points, we have $x = d_1$. To determine $d_1$, we can
    replace $x$ with $d_1$ and isolate $y^2$ on both equations above to get:
  </p>

  <EquationBlock> r_1^2 - d_1^2 = r_2^2 - (d_1 - d)^2 </EquationBlock>

  <p>Solving for $d_1$ is a simple task:</p>

  <EquationBlock label="d1">
    r_1^2 - d_1^2 = r_2^2 - d_1^2 + 2d_1d - d^2 \Longrightarrow d_1 =
    \frac{r_1^2 - r_2^2 + d^2}{2d}
  </EquationBlock>

  <p>
    From equation \eqref{d1}, we can see that $d_1 \geq 0$ since $r_1 \geq r_2$.
    The intersection area is the sum of the blue and red areas shown in
    <FigureLink id="intersecting-circles" />, which we refer to as $A_1$ and
    $A_2$, respectively. We then have:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    A_1 &= 2\int_{d_1}^{r_1} \sqrt{r_1^2 - x^2} \D{x} \label{A1-definition} \\
    A_2 &= 2\int_{d - r_2}^{d_1} \sqrt{r_2^2 - (x - d)^2} \D{x}
  </EquationBlock>

  <p>
    where the factors of $2$ come from the fact that each integral above
    accounts for only half of the area of the associated region (only points on
    and above the $x$ axis are taken into account); the results must then be
    multiplied by two so that the areas below the $x$ axis are taken into
    account as well.
  </p>

  <p>
    The computation of these integrals is straightforward. Before we proceed,
    note first that:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="A2">
    A_2 &= 2\int_{d - r_2}^{d_1} \sqrt{r_2^2 - (x - d)^2} \D{x} \\
        &= 2\int_{-r_2}^{d_1 - d} \sqrt{r_2^2 - x^2} \D{x} \\
        &= 2\int_{d - d_1}^{r_2} \sqrt{r_2^2 - x^2} \D{x} \\
        &= 2\int_{d_2}^{r_2} \sqrt{r_2^2 - x^2} \D{x}
  </EquationBlock>

  <p>
    where above we used the fact that $d_2 = d - d_1$. This is the same as
    equation \eqref{A1-definition} if we apply the substitutions $d_1
    \rightarrow d_2$ and $r_1 \rightarrow r_2$. Therefore, by computing $A_1$,
    we will immediately obtain $A_2$ as well. Let's then compute $A_1$ first:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="A1">
    A_1 &= 2\int_{d_1}^{r_1} \sqrt{r_1^2 - x^2} \D{x} \\
        &= 2r_1 \int_{d_1}^{r_1} \sqrt{1 - \left(\frac{x}{r_1}\right)^2} \D{x} \\
        &= 2r_1^2 \int_{d_1/r_1}^{1} \sqrt{1 - x^2} \D{x}
  </EquationBlock>

  <p>
    All we need to do now is to integrate $\sqrt{1 - x^2}$. The process is
    straightforward if we use integration by parts:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \int \sqrt{1 - x^2} \D{x}
      &= x \sqrt{1 - x^2} - \int x \left(\frac{-x}{\sqrt{1 - x^2}}\right) \D{x} \\
      &= x \sqrt{1 - x^2} + \int \frac{x^2 - 1}{\sqrt{1 - x^2}} \D{x}
         + \int \frac{1}{\sqrt{1 - x^2}} \D{x} \\
      &= x \sqrt{1 - x^2} - \int \sqrt{1 - x^2} \D{x} + \sin^{-1}(x)
  </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock label="term-for-A1-A2">
    \int \sqrt{1 - x^2} \D{x} = \frac{1}{2}\left( x \sqrt{1 - x^2} +
    \sin^{-1}(x) \right)
  </EquationBlock>

  <p>Using equation \eqref{term-for-A1-A2} on equation \eqref{A1} yields:</p>

  <!-- prettier-ignore -->
  <EquationBlock split label="A1-final">
    A_1 &= r_1^2 \left(
             \frac{\pi}{2} - \frac{d_1}{r_1} \sqrt{1 - \left(\frac{d_1}{r_1}\right)^2}
             - \sin^{-1} \left(\frac{d_1}{r_1}\right)
           \right) \\
        &= r_1^2 \left(
             \cos^{-1} \left(\frac{d_1}{r_1}\right)
             - \frac{d_1}{r_1} \sqrt{1 - \left(\frac{d_1}{r_1}\right)^2}
           \right) \\
        &= r_1^2 \cos^{-1} \left(\frac{d_1}{r_1}\right) - d_1 \sqrt{r_1^2 - d_1^2}
  </EquationBlock>

  <p>
    where above we used the fact that $\pi/2 - \sin^{-1}(\alpha) =
    \cos^{-1}(\alpha)$ for any $\alpha$ in $[-1, 1]$. This fact is easy to
    prove:
  </p>

  <EquationBlock>
    \cos\left(\frac{\pi}{2} - \sin^{-1}(\alpha)\right) = \sin(\sin^{-1}(\alpha))
    = \alpha
  </EquationBlock>

  <p>
    and therefore $\pi/2 - \sin^{-1}(\alpha) = \cos^{-1}(\alpha)$. As discussed
    above, we can now obtain $A_2$ directly by doing the substitutions $d_1
    \rightarrow d_2$ and $r_1 \rightarrow r_2$ on the expression for $A_1$ in
    equation \eqref{A1-final}:
  </p>

  <EquationBlock>
    A_2 = r_2^2 \cos^{-1}\left(\frac{d_2}{r_2}\right) - d_2 \sqrt{r_2^2 - d_2^2}
  </EquationBlock>

  <p>
    The sum of $A_1$ and $A_2$ is the total intersection area of the circles:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock boxed split label="A-intersection">
    A_{\textrm{intersection}}
      &= r_1^2 \cos^{-1} \left(\frac{d_1}{r_1}\right) - d_1 \sqrt{r_1^2 - d_1^2} \\
      &+ r_2^2 \cos^{-1} \left(\frac{d_2}{r_2}\right) - d_2 \sqrt{r_2^2 - d_2^2}
  </EquationBlock>

  <p>where:</p>

  <EquationBlock boxed> d_1 = \frac{r_1^2 - r_2^2 + d^2}{2d} </EquationBlock>

  <p>and:</p>

  <EquationBlock boxed>
    d_2 = d - d_1 = \frac{r_2^2 - r_1^2 + d^2}{2d}
  </EquationBlock>

  <SectionTitle>Summary</SectionTitle>

  <p>
    Given two circles $C_1$ and $C_2$ with radii $r_1 \geq r_2$, respectively,
    whose center points are at a distance $d$ from each other, the intersection
    area of the circles is:
  </p>

  <ListBlock>
    <ListBlockItem bullet="1.">
      Zero, if $d \geq r_1 + r_2$, since in this case the circles intersect at
      most up to a point.
    </ListBlockItem>
    <ListBlockItem bullet="2.">
      $\pi r_2^2$, if $d \leq r_1 - r_2$, since in this case $C_2$ is entirely
      contained within $C_1$.
    </ListBlockItem>
    <ListBlockItem bullet="3.">
      Given by equation \eqref{A-intersection} in all other cases.
    </ListBlockItem>
  </ListBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import intersectingCircles from "@/assets/images/circle-circle-intersection.svg";

onMounted(() => onViewMounted());
</script>
