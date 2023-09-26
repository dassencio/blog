<template>
  <p>
    In this post, we will derive the general formula for a rotation matrix in
    three dimensions. Our derivation will favor geometrical arguments over a
    purely algebraic approach and, therefore, will only require a basic
    knowledge of
    <a href="https://en.wikipedia.org/wiki/Analytic_geometry"
      >analytic geometry</a
    >.
  </p>

  <p>
    Given a vector $\Vec{x} = (x, y, z)$, our goal is to rotate it by an angle
    $\theta \gt 0$ around a fixed axis, represented by a unit vector $\Vec{\hat
    n} = (n_x, n_y, n_z)$. We will refer to the result of rotating $\Vec{x}$
    around $\Vec{\hat n}$ as $\Vec{x}'$. The rotation is such that, when
    observed from the direction of $\Vec{\hat n}$, the vector $\Vec{x}$ will
    appear to rotate in the counter-clockwise direction (see
    <FigureLink id="vector-rotation" />).
  </p>

  <FigureBlock
    id="vector-rotation"
    caption="The vector $\Vec{x}$ is rotated by an angle $\theta$ around
             $\Vec{\hat n}$. Figure (a) depicts the components
             $\Vec{x}_{\parallel}$ and $\Vec{x}_{\perp}$ of $\Vec{x}$, which are
             parallel and perpendicular to $\Vec{\hat n}$, respectively. Figure
             (b) illustrates the rotation from top to bottom, i.e., from the
             perspective of an observer looking into the head of $\Vec{\hat n}$.
             $\Vec{x}_{\parallel}$ remains unchanged after the rotation; only
             $\Vec{x}_{\perp}$ undergoes change. The unit vector $\Vec{\hat q}$
             is parallel to $\Vec{\hat n} \times \Vec{x} = \Vec{\hat n} \times
             \Vec{x}_{\perp}$. For $\theta \gt 0$, the rotation is in the
             counterclockwise direction."
  >
    <BaseSubfigure id="side-view">
      <ResponsiveImage
        alt="Vector rotation: side view"
        :src="vectorRotationSideView"
      />
    </BaseSubfigure>
    <BaseSubfigure id="top-view">
      <ResponsiveImage
        alt="Vector rotation: top view"
        :src="vectorRotationTopView"
      />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    Although we have already anticipated that the transformation rotating
    $\Vec{x}$ into $\Vec{x}'$ can be represented as a matrix, we will explicitly
    prove this by showing that $\Vec{x}' = R(\Vec{\hat n}, \theta) \Vec{x}$,
    with $R(\Vec{\hat n}, \theta)$ being a $3 \times 3$ matrix whose components
    depend only on $\Vec{\hat n}$ and $\theta$.
  </p>

  <p>
    To begin, observe that $\Vec{x}$ can be decomposed into two components,
    $\Vec{x}_{\parallel}$ and $\Vec{x}_{\perp}$, which are parallel and
    perpendicular to $\Vec{\hat n}$, respectively, as illustrated in
    <FigureLink id="vector-rotation" subfigureId="side-view" />. This implies:
  </p>

  <EquationBlock>
    \Vec{x} = \Vec{x}_{\parallel} + \Vec{x}_{\perp}
  </EquationBlock>

  <p>Since $\Vec{\hat n}$ is a unit vector, we have:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \Vec{x}_{\parallel}
      &= (\Vec{\hat n} \cdot \Vec{x}) \Vec{\hat n} \label{x-parallel} \\
    \Vec{x}_{\perp}
      &= \Vec{x} - \Vec{x}_{\parallel}
       = \Vec{x} - (\Vec{\hat n} \cdot \Vec{x}) \Vec{\hat n}
         \label{x-perpendicular}
  </EquationBlock>

  <p>
    When $\Vec{x}$ is rotated around $\Vec{\hat n}$, its parallel component
    $\Vec{x}_{\parallel}$ remains unchanged; it is only the perpendicular
    component $\Vec{x}_{\perp}$ that actually rotates around $\Vec{\hat n}$.
    Thus, we have:
  </p>

  <EquationBlock>
    \Vec{x}_{\parallel}' = \Vec{x}_{\parallel} = (\Vec{\hat n} \cdot \Vec{x})
    \Vec{\hat n} \label{x-prime-parallel}
  </EquationBlock>

  <p>
    Now, let's define a unit vector $\Vec{\hat q}$ that is orthogonal to both
    $\Vec{\hat n}$ and $\Vec{x}$, as depicted in
    <FigureLink id="vector-rotation" subfigureId="top-view" />. This can be
    achieved by computing and normalizing the cross product of $\Vec{\hat n}$
    and $\Vec{x}$. Below, we implicitly assume that $\Vec{\hat n}$ and $\Vec{x}$
    are not parallel to each other; however, if they are, we trivially have
    $\Vec{x}' = \Vec{x} = \Vec{x}_{\parallel}$, and our final results will be
    compatible with this corner case as well:
  </p>

  <EquationBlock>
    \Vec{\hat q} = \frac{\Vec{\hat n} \times \Vec{x}}{\|\Vec{\hat n} \times
    \Vec{x}\|} \label{q}
  </EquationBlock>

  <p>
    Since a rotation does not change the length of a vector, we can deduce that
    $\|\Vec{x}'\| = \|\Vec{x}\|$. In particular, $\|\Vec{x}_{\perp}'\| =
    \|\Vec{x}_{\perp}\|$, as depicted in
    <FigureLink id="vector-rotation" subfigureId="top-view" />. When we rotate
    $\Vec{x}_{\perp}$ by an angle $\theta$ around $\Vec{\hat n}$, a component
    proportional to $\|\Vec{x}_{\perp}\| \cos\theta$ remains parallel to
    $\Vec{x}_{\perp}$, and a new component proportional to $\|\Vec{x}_{\perp}\|
    \sin\theta$, which is parallel to $\Vec{\hat q}$, is generated. Thus:
  </p>

  <EquationBlock>
    \Vec{x}_{\perp}' = \cos\theta \, \Vec{x}_{\perp} + \|\Vec{x}_{\perp}\|
    \sin\theta \, \Vec{\hat q} = \cos\theta \, \Vec{x}_{\perp} + \sin\theta \,
    (\Vec{\hat n} \times \Vec{x}) \label{x-prime-perp}
  </EquationBlock>

  <p>
    where above, we used the definition of $\Vec{\hat q}$ from equation
    \eqref{q} as well as the fact that:
  </p>

  <EquationBlock>
    \|\Vec{\hat n} \times \Vec{x}\| = \|\Vec{\hat n}\| \|\Vec{x}\| \sin\alpha =
    \|\Vec{x}_{\perp}\|
  </EquationBlock>

  <p>
    with $\alpha$ being the angle between $\Vec{\hat n}$ and $\Vec{x}$, as
    depicted in <FigureLink id="vector-rotation" subfigureId="side-view" />.
  </p>

  <p>
    We can now derive an expression that relates $\Vec{x}'$ to $\Vec{x}$ in
    terms of $\Vec{\hat n}$ and $\theta$. Since $\Vec{x}' = \Vec{x}_{\parallel}'
    + \Vec{x}_{\perp}'$ and using equations \eqref{x-prime-parallel} and
    \eqref{x-prime-perp}, we obtain:
  </p>

  <EquationBlock>
    \Vec{x}' = (\Vec{\hat n} \cdot \Vec{x}) \Vec{\hat n} + \cos\theta \,
    \Vec{x}_{\perp} + \sin\theta \, (\Vec{\hat n} \times \Vec{x})
  </EquationBlock>

  <p>Now, using equation \eqref{x-perpendicular}, we deduce:</p>

  <EquationBlock>
    \Vec{x}' = (\Vec{\hat n} \cdot \Vec{x}) \Vec{\hat n} + \cos\theta\, (\Vec{x}
    - (\Vec{\hat n} \cdot \Vec{x}) \Vec{\hat n}) + \sin\theta \, (\Vec{\hat n}
    \times \Vec{x})
  </EquationBlock>

  <p>
    By rearranging the terms, we obtain a highly useful expression for computing
    $\Vec{x}'$:
  </p>

  <EquationBlock boxed>
    \Vec{x}' = \cos\theta \, \Vec{x} + (1 - \cos\theta) (\Vec{\hat n} \cdot
    \Vec{x}) \Vec{\hat n} + \sin\theta \, (\Vec{\hat n} \times \Vec{x})
    \label{x-prime-x}
  </EquationBlock>

  <p>
    As mentioned earlier, equation \eqref{x-prime-x} can be represented as
    $\Vec{x}' = R(\Vec{\hat n}, \theta) \Vec{x}$, where $R(\Vec{\hat n},
    \theta)$ is a $3 \times 3$ matrix. To demonstrate this, observe that:
  </p>

  <EquationBlock>
    \cos\theta \, \Vec{x} = \cos\theta \IdentityMatrixThree
    \MatrixThreeOne{x}{y}{z}
  </EquationBlock>

  <p>and that:</p>

  <!--prettier-ignore -->
  <EquationBlock>
    (\Vec{\hat n} \cdot \Vec{x}) \Vec{\hat n}
     = \MatrixThreeOne{(\Vec{\hat n} \cdot \Vec{x}) n_x}
                      {(\Vec{\hat n} \cdot \Vec{x}) n_y}
                      {(\Vec{\hat n} \cdot \Vec{x}) n_z}
    = \MatrixThreeThree{n_x^2}{n_y n_x}{n_z n_x}
                       {n_x n_y}{n_y^2}{n_z n_y}
                       {n_x n_z}{n_y n_z}{n_z^2} \MatrixThreeOne{x}{y}{z}
  </EquationBlock>

  <p>and also that:</p>

  <!-- prettier-ignore -->
  <EquationBlock>
    \Vec{\hat n} \times \Vec{x}
    = \MatrixThreeOne{n_y z - n_z y}{n_z x - n_x z}{n_x y - n_y x}
    = \MatrixThreeThree{0}{-n_z}{n_y}
                       {n_z}{0}{-n_x}
                       {-n_y}{n_x}{0} \MatrixThreeOne{x}{y}{z}
  </EquationBlock>

  <p>Thus, $\Vec{x}' = R(\Vec{\hat n}, \theta) \Vec{x}$, with:</p>

  <!-- prettier-ignore -->
  <EquationBlock boxed>
    \Split{
      R(\Vec{\hat n}, \theta)
      &= \cos\theta \IdentityMatrixThree +
        (1 - \cos\theta) \MatrixThreeThree{n_x^2}{n_y n_x}{n_z n_x}
                                          {n_x n_y}{n_y^2}{n_z n_y}
                                          {n_x n_z}{n_y n_z}{n_z^2} \\
      & \quad \quad + \sin\theta \MatrixThreeThree{0}{-n_z}{n_y}
                                                  {n_z}{0}{-n_x}
                                                  {-n_y}{n_x}{0}
    }
  </EquationBlock>

  <p>
    When $\Vec{\hat n}$ and $\Vec{x}$ are parallel, we have $\Vec{x} =
    \Vec{x}_{\parallel}$, and $\Vec{\hat n} \times \Vec{x} = \Vec{0}$. Hence,
    combining equations \eqref{x-prime-x} and \eqref{x-parallel} results in
    $\Vec{x}' = \Vec{x}$, which is as expected. Additionally, our derivation did
    not specifically rely on the assumption that $\theta \gt 0$, making it
    applicable for any value of $\theta$. Furthermore, observe that by
    substituting $\Vec{\hat n} \rightarrow -\Vec{\hat n}$ and $\theta
    \rightarrow -\theta$, $R(\Vec{\hat n}, \theta)$ remains unchanged, i.e.,
    $R(\Vec{\hat n}, \theta) = R(-\Vec{\hat n}, -\theta)$. This implies that any
    rotation with $\theta \lt 0$ can be equivalently represented with $\theta
    \gt 0$ by reversing the direction of $\Vec{\hat n}$ and changing the sign of
    $\theta$.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import vectorRotationSideView from "@/assets/images/vector-rotation-side-view.svg";
import vectorRotationTopView from "@/assets/images/vector-rotation-top-view.svg";

onMounted(() => onViewMounted());
</script>
