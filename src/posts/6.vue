<template>
  <p>
    According to the theory of general relativity, if a body of mass $M$ is
    compressed into a sphere of radius equal to or smaller than the
    <a href="https://en.wikipedia.org/wiki/Schwarzschild_radius"
      >Schwarzschild radius</a
    >
    $R_s$ of that body:
  </p>

  <EquationBlock> R_s \ColonEq \frac{2GM}{c^2} </EquationBlock>

  <p>
    then the body collapses into a
    <a href="https://en.wikipedia.org/wiki/Black_hole">black hole</a>, a region
    of spacetime where gravity is so strong that nothing can escape from it, not
    even light.
  </p>

  <p>
    Curiously, the Schwarzschild radius is also relevant in the Newtonian theory
    of gravitation. To see why, consider a particle of mass $m$ subject to the
    gravitational field of a spherical and uniformly dense body of mass $M$ and
    radius $r \leq R_s$. Since gravity is a conservative force, we have that,
    for any two locations $i$ (initial) and $f$ (final) along the particle's
    trajectory, the following applies when both $i$ and $f$ are outside the
    volume occupied by $M$:
  </p>

  <EquationBlock>
    E_i = E_f \Longrightarrow \frac{1}{2}mv_i^2 - \frac{GMm}{r_i} =
    \frac{1}{2}mv_f^2 - \frac{GMm}{r_f}
  </EquationBlock>

  <p>
    where $r_i$ and $r_f$ are the initial and final distances between the
    particle and the center of mass of $M$ respectively.
  </p>

  <p>
    The minimum speed (also called the
    <a href="https://en.wikipedia.org/wiki/Escape_velocity">escape speed</a>)
    $v_e$ which $m$ needs to initially have to escape the gravitational field of
    $M$ is such that when $m$ reaches "infinity", its speed $v_f$ is zero
    ("infinity" here means an $r_f$ large enough so that the gravitational force
    of $M$ on $m$ becomes negligible). From this fact, we have that:
  </p>

  <EquationBlock>
    \frac{1}{2}mv_e^2 - \frac{GMm}{r_i} = \frac{1}{2}m(0)^2 - \frac{GMm}{\infty}
    = 0 \Longrightarrow v_e = \sqrt{\frac{2GM}{r_i}}
  </EquationBlock>

  <p>
    If $m$ is initially at a distance $r_i = R_s = 2GM/c^2$ from the center of
    mass of $M$, then its escape speed is:
  </p>

  <EquationBlock>
    v_e = \sqrt{\frac{2GM}{r_i}} = \sqrt{2GM \left(\frac{c^2}{2GM}\right)} = c
  </EquationBlock>

  <p>
    Therefore, in this scenario, Newtonian gravity requires $m$ to have an
    initial speed equal to or larger than the speed of light to escape the
    gravitational field produced by $M$. If light is made of particles (photons)
    initially traveling at speed $c$, this implies that light itself would not
    be able to escape, and $M$ would be perceived as a dark object by distant
    observers.
  </p>

  <p>
    Before jumping to the conclusion that black holes can exist in Newtonian
    gravity, it's important to realize that any particle $m$ can escape the
    gravitational field of $M$ in a Newtonian universe. For that to happen, all
    one needs to do is build a rocket big enough to transport $m$, with an
    engine powerful enough to produce an amount of
    <a href="https://en.wikipedia.org/wiki/Thrust">thrust</a> exceeding the
    total gravitational force exerted by $M$. Provided that the rocket can store
    enough fuel, it will succeed in bringing $m$ arbitrarily far from $M$.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import mathjax from "@/mathjax";

onMounted(() => {
  mathjax.render();
});
</script>
