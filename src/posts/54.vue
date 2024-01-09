<template>
  <p>
    Consider a set of $n$ fixed point charges $q_1, q_2, \ldots, q_n$ in a
    vacuum, and let $\Vec{E}(\Vec{x})$ be the electric field produced by these
    charges (see <FigureLink id="charges-gaussian-surface" />). Can we find a
    point $\Vec{z}$ in space such that if a charge $q$ is placed there, it will
    remain in stable equilibrium?
  </p>

  <FigureBlock
    id="charges-gaussian-surface"
    caption="A set of $n$ fixed charges and a very small Gaussian surface $S$
             centered at a point $\Vec{z}$."
  >
    <ResponsiveImage
      alt="Fixed charges and a Gaussian surface"
      :src="chargesGaussianSurface"
    />
  </FigureBlock>

  <p>
    The answer is no, and this fact is referred to as
    <a href="https://en.wikipedia.org/wiki/Earnshaw%27s_theorem"
      >Earnshaw's theorem</a
    >. We will prove this assuming $q \gt 0$, but the proof is similar for $q
    \lt 0$.
  </p>

  <p>
    Let's first consider what stable equilibrium means for a charge $q$ placed
    at $\Vec{z}$:
  </p>

  <ListBlock ordered>
    <ListBlockItem>
      The electric force $q\Vec{E}(\Vec{z})$ acting on $q$ must be zero, i.e.,
      $\Vec{E}(\Vec{z}) = \Vec{0}$.
    </ListBlockItem>
    <ListBlockItem>
      For a small displacement $\delta\Vec{z}$ of $q$ around $\Vec{z}$, $q
      \Vec{E}(\Vec{z} + \delta\Vec{z})$ must point toward $\Vec{z}$.
    </ListBlockItem>
  </ListBlock>

  <p>
    The second property implies that the electric force on $q$ must be
    <a href="https://en.wikipedia.org/wiki/Restoring_force">restoring</a>,
    meaning if we move $q$ a little bit away from $\Vec{z}$, this force will
    tend to bring $q$ back to $\Vec{z}$. Since we're assuming $q \gt 0$,
    $\Vec{E}(\Vec{z} + \delta\Vec{z})$ itself must then point toward $\Vec{z}$
    for the electric force on $q$ to be restoring.
  </p>

  <p>
    Consider now a very small
    <a href="https://en.wikipedia.org/wiki/Gaussian_surface"
      >Gaussian surface</a
    >
    $S$ shaped like a sphere of radius $r$ and centered at $\Vec{z}$ (as shown
    in <FigureLink id="charges-gaussian-surface" />). If $\Vec{E}(\Vec{x})$
    points toward $q$ (i.e., inward) for any point $\Vec{x}$ on the surface of
    this sphere, we have:
  </p>

  <EquationBlock label="surface-integral">
    \int_{S} \Vec{E} \cdot \D{\Vec{A}} \lt 0
  </EquationBlock>

  <p>
    where $\D{\Vec{A}}$ is an outward-oriented infinitesimal surface area
    element. However, using the
    <a href="https://en.wikipedia.org/wiki/Divergence_theorem"
      >divergence theorem</a
    >
    and <a href="https://en.wikipedia.org/wiki/Gauss%27s_law">Gauss's law</a> on
    equation \eqref{surface-integral}, we find that there must be a negative
    charge $Q_{\textrm{enc}}$ enclosed inside the sphere:
  </p>

  <EquationBlock>
    \int_{S} \Vec{E} \cdot \D{\Vec{A}} = \int_{V} \nabla \cdot \Vec{E} \D{V} =
    \frac{Q_{\textrm{enc}}}{\epsilon_0} \lt 0
  </EquationBlock>

  <p>
    This contradicts our initial assumption that $\Vec{z}$ is a point in a
    vacuum where no charge is placed (we're not considering $q$ itself, since it
    doesn't contribute to the electric field $\Vec{E}$).
  </p>

  <p>
    One of the consequences of Earnshaw's theorem is that a classical model for
    the atom cannot be stable if it's based on a static (fixed) distribution of
    charges. In such an atom, the charge configuration would not be in stable
    equilibrium and would therefore be unable to resist even the slightest
    disturbance.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import chargesGaussianSurface from "@/assets/images/charges-gaussian-surface.svg";

onMounted(() => onViewMounted());
</script>
