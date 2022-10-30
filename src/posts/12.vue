<template>
  <p>
    Consider a regular polygon with $N$ sides (and therefore $N$ vertices) such
    that the distance between its center $O$ and each of its vertices is $r$. An
    electric charge $q$ is placed at each vertex of the polygon as shown in
    <a href="#fig_1">figure 1</a>. What is the electric field ${\bf E}$ produced
    by these charges at the point $O$?
  </p>

  <BaseFigure
    description="Regular pentagon with a charge $q$ placed on each of its
                 vertices. In the figure, $\theta = 2\pi / 5$. For a general
                 regular polygon with $N$ sides, $\theta = 2\pi / N$."
    :number="1"
  >
    <ResponsiveImage
      class="figure-1"
      alt="Charges placed on vertices of a regular polygon"
      :src="chargesOnRegularPolygon"
    />
  </BaseFigure>

  <p>
    If your strategy for solving a problem of this kind is to compute ${\bf E}$
    by hand, you may have missed an important fact: there is symmetry in the
    charge configuration. Symmetry is a very important ingredient in physics: it
    can turn many complicated-looking problems into easily solvable ones.
  </p>

  <p>
    To see what I mean by that, consider the electric field produced by the
    charges at the point $O$ is as shown in <a href="#fig_2">figure 2a</a>.
  </p>

  <BaseFigure
    description="Rotating a pentagon by $\theta = 2\pi / 5$ around its center
                 point in the anti-clockwise (or clockwise) direction produces
                 the same charge configuration (b) as we initially had in (a).
                 In general, this is true if one rotates a regular polygon with
                 $N$ sides by $\theta = 2\pi/N$ around its center point."
    :number="2"
  >
    <BaseSubfigure label="(a)">
      <ResponsiveImage
        class="figure-2a"
        alt="Charges placed on vertices of a regular polygon"
        :src="chargesOnRegularPolygonRotationA"
      />
    </BaseSubfigure>
    <BaseSubfigure label="(b)">
      <ResponsiveImage
        class="figure-2b"
        alt="Charges placed on vertices of a regular polygon (rotated)"
        :src="chargesOnRegularPolygonRotationB"
      />
    </BaseSubfigure>
  </BaseFigure>

  <p>
    If we now rotate the polygon by $\theta = 2\pi/N$ clockwise or
    counterclockwise, we will obtain the exact same charge configuration as we
    had before. In other words, the electric field ${\bf E}$ at the point $O$
    must be the same before and after the rotation is applied. But if the whole
    polygon is rotated, ${\bf E}$ must also be rotated with it. We will have an
    absurd situation unless the magnitude of the electric field at $O$ is zero.
    Therefore:
  </p>

  <EquationBlock boxed> {\bf E} = {\bf 0} </EquationBlock>

  <p>
    A reader who prefers things proved mathematically might be bothered with
    this type of proof. As a matter of fact, some might not even consider it a
    proof at all. However, arguments of this kind are ubiquitous in physics and
    yield correct results with very little effort.
  </p>

  <p>
    In any case, if you're one of those readers I just mentioned, let's compute
    ${\bf E}$ by hand to bring peace back to your mind. Numbering each charge in
    a counterclockwise manner as in <a href="#fig_1">figure 1</a>, the $k$-th
    charge would then be located at:
  </p>

  <EquationBlock>
    {\bf x}_k = r(\cos\theta_k, \sin\theta_k) = r(\cos(2\pi k/N), \sin(2\pi
    k/N))
  </EquationBlock>

  <p>
    for $k = 1, 2, \ldots, N$. Since $e^{i\theta} = (\cos\theta, \sin\theta)$ (a
    complex number is a point in $\mathbb{R}^2$), then we can write:
  </p>

  <EquationBlock> {\bf x}_k = r e^{i 2\pi k / N} </EquationBlock>

  <p>
    This will allow us to compute ${\bf E}$ more easily. If ${\bf E}_k$ is the
    electric field produced by the $k$-th charge at the point $O$, then:
  </p>

  <EquationBlock>
    {\bf E}_k = \frac{kq}{\|{\bf x}_k\|^3}(-{\bf x}_k) = -\frac{kq}{r^3} r e^{i
    2\pi k / N} = -\frac{kq}{r^2} e^{i 2\pi k / N}
  </EquationBlock>

  <p>and therefore:</p>

  <EquationBlock>
    {\bf E} = \sum_{k=1}^{N} {\bf E}_k = \sum_{k=1}^N \left( -\frac{kq}{r^2}
    e^{i 2\pi k / N} \right) = -\frac{kq}{r^2} \sum_{k=1}^N (e^{i 2\pi / N})^k
    \label{E_as_sum}
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
    {\bf E} = -\frac{kq}{r^2} \left( \frac{e^{i 2\pi / N} - (e^{i 2\pi /
    N})^{N+1}}{1 - e^{i 2\pi / N}} \right) = -\frac{kq}{r^2} e^{i 2\pi / N}
    \left( \frac{1 - (e^{i 2\pi/N})^N}{1 - e^{i 2\pi / N}} \right) = {\bf 0}
  </EquationBlock>

  <p>since:</p>

  <EquationBlock>
    (e^{i 2\pi / N})^N = e^{i 2\pi} = (\cos 2\pi, \sin 2\pi) = 1
  </EquationBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import mathjax from "@/mathjax";
import chargesOnRegularPolygon from "@/assets/images/charges-on-regular-polygon.svg";
import chargesOnRegularPolygonRotationA from "@/assets/images/charges-on-regular-polygon-rotation-a.svg";
import chargesOnRegularPolygonRotationB from "@/assets/images/charges-on-regular-polygon-rotation-b.svg";

onMounted(() => {
  mathjax.render();
});
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
