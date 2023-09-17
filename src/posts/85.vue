<template>
  <p>
    Suppose we have a surface $S$ and that $\Vec{n}$ is a unit vector normal to
    $S$ at a point $\Vec{x}$ in $S$. There are many common transformations that
    can be applied to $S$, such as
    <a href="https://en.wikipedia.org/wiki/Rotation_matrix">rotation</a>,
    <a href="https://en.wikipedia.org/wiki/Scaling_%28geometry%29">scaling</a>,
    and <a href="https://en.wikipedia.org/wiki/Shear_matrix">shear</a>. After
    transforming $S$ into a new surface $S'$, the point $\Vec{x}$ from $S$ will
    be mapped to a point $\Vec{x}'$ in $S'$. This post addresses the following
    question: when we apply an invertible
    <a href="https://en.wikipedia.org/wiki/Linear_map">linear transformation</a>
    to all points of $S$, how do $\Vec{n}$ and the corresponding unit vector
    $\Vec{n}'$ normal to $S'$ at $\Vec{x}'$ relate?
  </p>

  <p>
    We will illustrate our points in this post using a one-dimensional surface
    on a two-dimensional plane. However, everything discussed here can be
    applied to any surface in an $n$-dimensional space undergoing an invertible
    linear transformation $M$. A natural, yet incorrect, assumption might be
    that $\Vec{n}$ is converted to $\Vec{n}' = M \Vec{n}$ since every point
    $\Vec{x}$ in $S$ is mapped to $\Vec{x}' = M \Vec{x}$ in $S'$. In reality, as
    we will demonstrate, $\Vec{n}'$ is parallel to $(M^{-1})^T \Vec{n}$, which
    generally isn't parallel to $M \Vec{n}$.
  </p>

  <p>
    First, consider what happens when we apply a shear transformation to a
    surface $S$ in a two-dimensional space. Let the transformation matrix $M$
    have the following form (assuming $a \gt 0$):
  </p>

  <EquationBlock>
    M = \MatrixTwoTwo{1}{a}{0}{1} \label{shear-matrix}
  </EquationBlock>

  <p>A point $\Vec{x}$ in $S$ is mapped to $\Vec{x}' = M \Vec{x}$:</p>

  <EquationBlock>
    \Vec{x} \overset{M}{\longrightarrow} \Vec{x}' = M \Vec{x} = \MatrixTwoOne{x
    + ay}{y}
  </EquationBlock>

  <p>
    The transformation $M$ preserves the $y$ coordinates of all points in $S$,
    but modifies the $x$ coordinates by a factor of $ay$.
    <FigureLink id="shear-transformation" capitalized /> illustrates how a unit
    square is transformed by $M$.
  </p>

  <FigureBlock
    id="shear-transformation"
    caption="Result of applying the shear transformation $M$ given in equation
             \eqref{shear-matrix} to all points of a unit square $S$, producing
             the transformed surface $S'$. Surface normals are depicted as red
             arrows. Observe that the direction of a surface normal
             $\Vec{n}_{\textrm{t}}$ on the top edge remains unchanged, whereas
             the direction of a surface normal $\Vec{n}_{\textrm{r}}$ on the
             right edge is altered by $M$."
  >
    <ResponsiveImage
      alt="Shear transformation applied to a unit square"
      :src="shearTransformation"
    />
  </FigureBlock>

  <p>
    Consider the surface normal $\Vec{n}_{\textrm{t}}$ on the top edge of $S$
    with coordinates $(0,1)$. When transformed using $M$, we get $M
    \Vec{n}_{\textrm{t}} = (a,1)$. This is not parallel to the expected
    $\Vec{n}_{\textrm{t}}'$, especially since $\Vec{n}_{\textrm{t}}' =
    \Vec{n}_{\textrm{t}}$ and $a \neq 0$. Similarly, for the right-edge normal
    $\Vec{n}_{\textrm{r}}$ with coordinates $(1,0)$, the transformation yields
    $M \Vec{n}_{\textrm{r}} = (1,0)$, which matches $\Vec{n}_{\textrm{r}}$.
    However, this is not consistent with the expected $\Vec{n}_{\textrm{r}}'$,
    indicating $\Vec{n}_{\textrm{r}}' \neq \Vec{n}_{\textrm{r}}$. These examples
    highlight that surface normals might not transform similarly to points from
    $S$. Therefore, directly applying the transformation $M$ to a normal vector
    $\Vec{n}$ does not ensure that the result, $M \Vec{n}$, will be consistent
    with the direction of the corresponding normal $\Vec{n}'$ in $S'$.
  </p>

  <p>
    The good news is that determining an expression for $\Vec{n}'$ in relation
    to $\Vec{n}$ and $M$ is straightforward. To achieve this, consider how
    tangent vectors in $S$ map to tangent vectors in $S'$. For instance, let's
    think about a tangent vector $\Vec{t}$ connecting $\Vec{x}$ to an
    infinitesimally adjacent point $\Vec{\tilde{x}} = \Vec{x} + \delta\Vec{x}$
    in $S$. This means $\Vec{t} = \Vec{\tilde{x}} - \Vec{x} = \delta\Vec{x}$
    (noting that $\Vec{t}$ isn't necessarily a unit vector, but its direction is
    our primary concern). Given that $\Vec{x}$ and $\Vec{\tilde{x}}$ are mapped
    to $\Vec{x}' = M \Vec{x}$ and $\Vec{\tilde{x}}' = M (\Vec{x} +
    \delta\Vec{x}) = \Vec{x}' + M \delta\Vec{x}$ in $S'$, the infinitesimal
    tangent vector $\Vec{t}'$ linking $\Vec{x}'$ to $\Vec{\tilde{x}}'$ can be
    expressed as:
  </p>

  <EquationBlock>
    \Vec{t}' = \Vec{\tilde{x}}' - \Vec{x}' = M \delta\Vec{x} = M \Vec{t}
  </EquationBlock>

  <p>
    To put it succinctly, an infinitesimal tangent vector $\Vec{t}$ at the point
    $\Vec{x}$ in $S$ transforms into an infinitesimal vector $\Vec{t}' = M
    \Vec{t}$ tangent to $\Vec{x}'$ in $S'$. Due to the linear nature of the
    transformation $M$, this holds true even if $\Vec{t}$ isn't infinitesimal,
    meaning the transformed vector $\Vec{t}' = M \Vec{t}$ will also not be
    infinitesimal.
  </p>

  <p>When we represent vectors in column form, we can establish that:</p>

  <EquationBlock> \Vec{t} \cdot \Vec{n} = \Vec{t}^T \Vec{n} = 0 </EquationBlock>

  <p>
    This relation arises because $\Vec{t}$ and $\Vec{n}$ are orthogonal to each
    other. By the same token, the transformed vectors satisfy:
  </p>

  <EquationBlock>
    \Vec{t}' \cdot \Vec{n}' = (M \Vec{t})^T \Vec{n}' = 0
    \label{dot-product-t-prime-n-prime}
  </EquationBlock>

  <p>
    Equation \eqref{dot-product-t-prime-n-prime} is satisfied when $\Vec{n}' =
    \alpha (M^T)^{-1} \Vec{n}$ for any real value $\alpha$:
  </p>

  <EquationBlock>
    (M \Vec{t})^T \Vec{n}' = (M \Vec{t})^T (\alpha (M^T)^{-1} \Vec{n}) = \alpha
    \Vec{t}^T M^T (M^T)^{-1} \Vec{n} = \alpha \Vec{t}^T \Vec{n} = 0
  </EquationBlock>

  <p>
    Therefore, we can deduce that $(M^T)^{-1} \Vec{n}$ is normal to the surface
    $S'$ at the point $\Vec{x}'$. The next step is to normalize this vector by
    taking $\alpha = 1 / \left\|(M^T)^{-1} \Vec{n}\right\|$:
  </p>

  <EquationBlock boxed>
    \Vec{n}' = \frac{(M^T)^{-1} \Vec{n}}{\left\|(M^T)^{-1} \Vec{n}\right\|}
  </EquationBlock>

  <p>
    It's worth noting that if $M$ is a rotation matrix, then $M^T = M^{-1}$.
    Additionally, since rotations preserve the magnitude of vectors, $\left\|M
    \Vec{n}\right\| = \|\Vec{n}\| = 1$. Therefore, in this scenario, $\Vec{n}' =
    M \Vec{n}$, meaning unit vectors normal to $S$ transform in the same manner
    as regular points from $S$.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import shearTransformation from "@/assets/images/shear-transformation.svg";

onMounted(() => onViewMounted());
</script>
