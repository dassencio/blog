<template>
  <p>
    Consider a regular polygon with $N$ sides (and therefore $N$ vertices),
    where the distance between its center $O$ and each of its vertices is $r$.
    An electric charge $q$ is placed at each vertex of the polygon, as shown in
    <FigureLink id="charges" />. What is the electric field $\Vec{E}$ produced
    by these charges at the point $O$?
  </p>

  <FigureBlock
    id="charges"
    caption="A regular pentagon with charges placed at each of its vertices. In
             the figure, $\theta = 2\pi / 5$. For a regular polygon with $N$
             sides, $\theta = 2\pi / N$."
  >
    <ResponsiveImage
      alt="Charges placed at vertices of a regular polygon"
      :src="chargesOnRegularPolygon"
    />
  </FigureBlock>

  <p>
    If your strategy for solving a problem of this kind involves computing
    $\Vec{E}$ by hand, you might have overlooked an important fact: there is
    symmetry in the charge configuration. Symmetry is a crucial element in
    physics as it can transform many complicated-looking problems into more
    easily solvable ones.
  </p>

  <p>
    To understand the relevance of symmetry in this particular problem, consider
    the electric field produced by the charges at the point $O$, as depicted in
    <FigureLink id="charges-rotated" subfigureId="original" />.
  </p>

  <FigureBlock
    id="charges-rotated"
    caption="Rotating a pentagon by $\theta = 2\pi / 5$ around its center point
             in the counterclockwise (or clockwise) direction yields the same
             charge configuration (b) as initially present in (a). Generally,
             this holds true when rotating a regular polygon with $N$ sides by
             $\theta = 2\pi/N$ around its center point."
  >
    <BaseSubfigure id="original">
      <ResponsiveImage
        alt="Charges placed at vertices of a regular polygon"
        :src="chargesOnRegularPolygonRotationA"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Charges placed at vertices of a regular polygon (rotated)"
        :src="chargesOnRegularPolygonRotationB"
      />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    If we now rotate the polygon by $\theta = 2\pi/N$ clockwise or
    counterclockwise, we obtain the exact same charge configuration as before.
    This implies that the electric field $\Vec{E}$ at point $O$ must be the same
    as before the rotation is applied. However, if the entire polygon is
    rotated, $\Vec{E}$ must also rotate accordingly. This would lead to an
    inconsistency unless the magnitude of the electric field at $O$ is zero.
    Therefore:
  </p>

  <EquationBlock boxed> \Vec{E} = \Vec{0} </EquationBlock>

  <p>
    A reader who prefers mathematical demonstrations might be skeptical of this
    type of reasoning. In fact, some might not consider it a proof at all.
    However, arguments of this nature are ubiquitous in physics and often yield
    correct results with minimal effort.
  </p>

  <p>
    In any case, if you're among the skeptical readers, let's compute $\Vec{E}$
    algebraically to put your mind at ease. By numbering each charge in a
    counterclockwise manner as shown in <FigureLink id="charges" />, the
    position of the $k$-th charge is given by:
  </p>

  <EquationBlock>
    \Vec{x}_k = r(\cos\theta_k, \sin\theta_k) = r(\cos(\alpha + 2\pi k/N),
    \sin(\alpha + 2\pi k/N))
  </EquationBlock>

  <p>
    for $k = 1, 2, \ldots, N$, where $\alpha$ is an angle that defines the
    orientation of the polygon with respect to a direction chosen as the
    $x$-axis. Since any point on a two-dimensional plane can be represented as a
    complex number, and given that $e^{i\theta} = (\cos\theta, \sin\theta)$, we
    have:
  </p>

  <EquationBlock>
    \Vec{x}_k = r e^{i (\alpha + 2\pi k / N)} = r e^{i \alpha} e^{i 2\pi k / N}
  </EquationBlock>

  <p>
    If $\Vec{E}_k$ represents the electric field produced by the $k$-th charge
    at point $O$, then:
  </p>

  <EquationBlock>
    \Vec{E}_k = \frac{kq}{\|\Vec{x}_k\|^3}(-\Vec{x}_k) = -\frac{kq}{r^3} r e^{i
    \alpha} e^{i 2\pi k / N} = -\frac{kqe^{i \alpha}}{r^2} e^{i 2\pi k / N}
  </EquationBlock>

  <p>and therefore:</p>

  <EquationBlock>
    \Vec{E} = \sum_{k=1}^{N} \Vec{E}_k = \sum_{k=1}^N \left( -\frac{kqe^{i
    \alpha}}{r^2} e^{i 2\pi k / N} \right) = -\frac{kqe^{i \alpha}}{r^2}
    \sum_{k=1}^N (e^{i 2\pi / N})^k \label{electric-field}
  </EquationBlock>
  <p>However, for any complex number $z \neq 1$, we have:</p>

  <EquationBlock>
    \sum_{k=0}^N z^k = \frac{1 - z^{N+1}}{1 - z} \Longrightarrow \sum_{k=1}^N
    z^k = \frac{1 - z^{N+1}}{1 - z} - 1 = \frac{z - z^{N+1}}{1 - z}
  </EquationBlock>

  <p>
    Substituting this into equation \eqref{electric-field} with $z = e^{i
    2\pi/N}$, we obtain:
  </p>

  <EquationBlock>
    \Vec{E} = -\frac{kqe^{i \alpha}}{r^2} \left( \frac{e^{i 2\pi / N} - (e^{i
    2\pi / N})^{N+1}}{1 - e^{i 2\pi / N}} \right) = -\frac{kqe^{i \alpha}}{r^2}
    e^{i 2\pi / N} \left( \frac{1 - (e^{i 2\pi/N})^N}{1 - e^{i 2\pi / N}}
    \right) = \Vec{0}
  </EquationBlock>

  <p>where above, we used the fact that:</p>

  <EquationBlock>
    (e^{i 2\pi / N})^N = e^{i 2\pi} = (\cos 2\pi, \sin 2\pi) = 1
  </EquationBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import chargesOnRegularPolygon from "@/assets/images/charges-on-regular-polygon.svg";
import chargesOnRegularPolygonRotationA from "@/assets/images/charges-on-regular-polygon-rotation-a.svg";
import chargesOnRegularPolygonRotationB from "@/assets/images/charges-on-regular-polygon-rotation-b.svg";

onMounted(() => onViewMounted());
</script>
