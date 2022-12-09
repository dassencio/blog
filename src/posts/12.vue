<template>
  <p>
    Consider a regular polygon with $N$ sides (and therefore $N$ vertices) such
    that the distance between its center $O$ and each of its vertices is $r$. An
    electric charge $q$ is placed at each vertex of the polygon as shown in
    <FigureLink :figureNumber="1">figure 1</FigureLink>. What is the electric
    field $\Vec{E}$ produced by these charges at the point $O$?
  </p>

  <FigureBlock
    :figureNumber="1"
    description="Regular pentagon with charges placed at each of its vertices.
                 In the figure, $\theta = 2\pi / 5$. For a regular  polygon with
                 $N$ sides, $\theta = 2\pi / N$."
  >
    <ResponsiveImage
      class="figure-1"
      alt="Charges placed at vertices of a regular polygon"
      :src="chargesOnRegularPolygon"
    />
  </FigureBlock>

  <p>
    If your strategy for solving a problem of this kind is to compute $\Vec{E}$
    by hand, you may have missed an important fact: there is symmetry in the
    charge configuration. Symmetry is a very important ingredient in physics: it
    can turn many complicated-looking problems into easily solvable ones.
  </p>

  <p>
    To see what I mean by that, consider the electric field produced by the
    charges at the point $O$ as shown in
    <FigureLink :figureNumber="2">figure 2a</FigureLink>.
  </p>

  <FigureBlock
    :figureNumber="2"
    description="Rotating a pentagon by $\theta = 2\pi / 5$ around its center
                 point in the counterclockwise (or clockwise) direction produces
                 the same charge configuration (b) as we initially had in (a).
                 In general, this is true if one rotates a regular polygon with
                 $N$ sides by $\theta = 2\pi/N$ around its center point."
  >
    <BaseSubfigure label="(a)">
      <ResponsiveImage
        class="figure-2a"
        alt="Charges placed at vertices of a regular polygon"
        :src="chargesOnRegularPolygonRotationA"
      />
    </BaseSubfigure>
    <BaseSubfigure label="(b)">
      <ResponsiveImage
        class="figure-2b"
        alt="Charges placed at vertices of a regular polygon (rotated)"
        :src="chargesOnRegularPolygonRotationB"
      />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    If we now rotate the polygon by $\theta = 2\pi/N$ clockwise or
    counterclockwise, we will obtain the exact same charge configuration as we
    had before, implying that the electric field $\Vec{E}$ at the point $O$ must
    be the same before and after the rotation is applied. But if the whole
    polygon is rotated, $\Vec{E}$ must also be rotated with it. We will have an
    absurd situation unless the magnitude of the electric field at $O$ is zero.
    Therefore:
  </p>

  <EquationBlock boxed> \Vec{E} = \Vec{0} </EquationBlock>

  <p>
    A reader who prefers things demonstrated mathematically might be skeptical
    against this type of proof. As a matter of fact, some might not even
    consider it a proof at all. However, arguments of this kind are ubiquitous
    in physics and yield correct results with very little effort.
  </p>

  <p>
    In any case, if you're one of those readers I just mentioned, let's compute
    $\Vec{E}$ by hand to bring peace back to your mind. Numbering each charge in
    a counterclockwise manner as in
    <FigureLink :figureNumber="1">figure 1</FigureLink>, the $k$-th charge would
    then be located at:
  </p>

  <EquationBlock>
    \Vec{x}_k = r(\cos\theta_k, \sin\theta_k) = r(\cos(\alpha + 2\pi k/N),
    \sin(\alpha + 2\pi k/N))
  </EquationBlock>

  <p>
    for $k = 1, 2, \ldots, N$, where $\alpha$ is an angle which defines the
    orientation of the polygon with respect to a direction chosen as the
    $x$-axis. Since any point on a two-dimensional plane can be represented as a
    complex number, and given that $e^{i\theta} = (\cos\theta, \sin\theta)$, we
    can write:
  </p>

  <EquationBlock>
    \Vec{x}_k = r e^{i (\alpha + 2\pi k / N)} = r e^{i \alpha} e^{i 2\pi k / N}
  </EquationBlock>

  <p>
    This will allow us to compute $\Vec{E}$ more easily. If $\Vec{E}_k$ is the
    electric field produced by the $k$-th charge at the point $O$, then:
  </p>

  <EquationBlock>
    \Vec{E}_k = \frac{kq}{\|\Vec{x}_k\|^3}(-\Vec{x}_k) = -\frac{kq}{r^3} r e^{i
    \alpha} e^{i 2\pi k / N} = -\frac{kqe^{i \alpha}}{r^2} e^{i 2\pi k / N}
  </EquationBlock>

  <p>and therefore:</p>

  <EquationBlock>
    \Vec{E} = \sum_{k=1}^{N} \Vec{E}_k = \sum_{k=1}^N \left( -\frac{kqe^{i
    \alpha}}{r^2} e^{i 2\pi k / N} \right) = -\frac{kqe^{i \alpha}}{r^2}
    \sum_{k=1}^N (e^{i 2\pi / N})^k \label{E_as_sum}
  </EquationBlock>

  <p>But since for any complex number $z \neq 1$ we have that:</p>

  <EquationBlock>
    \sum_{k=0}^N z^k = \frac{1 - z^{N+1}}{1 - z} \Longrightarrow \sum_{k=1}^N
    z^k = \frac{1 - z^{N+1}}{1 - z} - 1 = \frac{z - z^{N+1}}{1 - z}
  </EquationBlock>

  <p>
    then, from equation \eqref{E_as_sum} with $z = e^{i 2\pi/N}$, we obtain:
  </p>

  <EquationBlock>
    \Vec{E} = -\frac{kqe^{i \alpha}}{r^2} \left( \frac{e^{i 2\pi / N} - (e^{i
    2\pi / N})^{N+1}}{1 - e^{i 2\pi / N}} \right) = -\frac{kqe^{i \alpha}}{r^2}
    e^{i 2\pi / N} \left( \frac{1 - (e^{i 2\pi/N})^N}{1 - e^{i 2\pi / N}}
    \right) = \Vec{0}
  </EquationBlock>

  <p>since:</p>

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

<style scoped lang="scss">
.figure-1 {
  height: 14 * $base-length;
}
.figure-2a,
.figure-2b {
  height: 14 * $base-length;
  padding: 0 (0.5 * $base-length);
}
</style>
