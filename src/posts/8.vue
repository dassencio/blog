<template>
  <p>
    Consider an object traveling along a circle with radius $r$ in the $(x,y)$
    plane, as shown in <FigureLink id="circular-motion" />. The circle is
    centered at the origin $O$ of the plane. The object travels with a constant
    angular velocity $\omega$, which means the angle $\theta(t)$, formed by its
    path with the positive $x$-axis at time $t$, is given by:
  </p>

  <EquationBlock> \theta(t) = \theta_0 + \omega t </EquationBlock>

  <p>
    where $\theta_0$ is the value of $\theta(t)$ when $t = 0$. We will assume
    that $\theta_0 = 0$. In other words, the object is at position $(x_0, y_0) =
    (r, 0)$ when $t = 0$.
  </p>

  <FigureBlock
    id="circular-motion"
    caption="An object traveling along a circle with radius $r$ at a constant
             angular velocity $\omega$."
  >
    <ResponsiveImage alt="Circular motion" :src="circularMotion" />
  </FigureBlock>

  <p>The equations of motion for the object are given by:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    x(t) &= r\cos\theta(t) &&= r\cos(\omega t) \label{position-x} \\
    y(t) &= r\sin\theta(t) &&= r\sin(\omega t) \label{position-y}
  </EquationBlock>

  <p>
    The velocities and accelerations in the $x$ and $y$ directions can be
    obtained directly from equations \eqref{position-x} and \eqref{position-y}.
    Using the notation $\dot{q}$ to represent $\DDi{q}{t}$, we have:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    v_x(t) &= \dot{x}(t) &&= -\omega r \sin(\omega t) \\
    v_y(t) &= \dot{y}(t) &&= \omega r \cos(\omega t)
  </EquationBlock>

  <p>and:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    a_x(t) &= \dot{v}_x(t) &&= -\omega^2 r \cos(\omega t) \\
    a_y(t) &= \dot{v}_y(t) &&= -\omega^2 r \sin(\omega t)
  </EquationBlock>

  <p>
    This is where the interesting physics begins. Let $\Vec{x}(t)$ be the
    position vector connecting the origin $O$ to the object, as depicted in
    <FigureLink id="circular-motion" />:
  </p>

  <EquationBlock>
    \Vec{x}(t) = (x(t), y(t)) = r(\cos(\omega t), \sin(\omega t))
  </EquationBlock>

  <p>
    Now, let $\Vec{v}(t) = (v_x(t), v_y(t))$ and $\Vec{a}(t) = (a_x(t), a_y(t))$
    represent the object's velocity and acceleration vectors, respectively, at
    time $t$. We obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \Vec{v}(t) &= \omega r (-\sin(\omega t), \cos(\omega t)) \\
    \Vec{a}(t) &= -\omega^2 r (\cos(\omega t), \sin(\omega t)) = -\omega^2
    \Vec{x}(t) \label{acceleration}
  </EquationBlock>

  <p>
    <FigureLink id="circular-motion-a-v" capitalized /> visually depicts the
    velocities and accelerations at various positions along the circular path:
  </p>

  <FigureBlock
    id="circular-motion-a-v"
    caption="Accelerations (blue) and velocities (red) at $\theta= 0, \pi/2,
             \pi$, and $3\pi/2$. Observe how the acceleration consistently
             points toward the center of the circle, while the velocity remains
             tangential to it."
  >
    <ResponsiveImage
      alt="Circular motion: a and v at different values of theta"
      :src="circularMotionAV"
    />
  </FigureBlock>

  <p>
    Since $\Vec{x}(t)$ always points away from the center $O$ of the circle,
    equation \eqref{acceleration} implies that the acceleration $\Vec{a}(t)$,
    known as <b>centripetal acceleration</b>, always points toward the center of
    the circle. To build a better understanding of why this is the case, observe
    that the velocity vector $\Vec{v}(t)$ is orthogonal to the position vector
    $\Vec{x}(t)$ at all times:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \Vec{v}(t)\cdot\Vec{x}(t)
      &= v_x(t)x(t) + v_y(t)y(t) \\
      &= \omega r^2\left[-\sin(\omega t)\cos(\omega t) +
         \cos(\omega t)\sin(\omega t)\right] \\
      &= 0
  </EquationBlock>

  <p>
    This means that the velocity of the object is always tangential to the
    circle. Interestingly, this remains true even if the angular velocity
    $\dot{\theta}(t)$ varies over time. For those skeptical, I encourage you to
    verify this independently as an exercise.
  </p>

  <p>
    The magnitude $v(t)$ of the velocity remains constant, as the angular
    velocity $\omega$ is also constant. More specifically:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    v(t)
      &= \|\Vec{v}(t)\| \\
      &= \sqrt{v_x^2(t) + v_y^2(t)} \\
      &= \sqrt{\omega^2 r^2 \sin^2(\omega t) + \omega^2 r^2\cos^2(\omega t)} \\
      &= \omega r \sqrt{\sin^2(\omega t) + \cos^2(\omega t)} \\
      &= \omega r \label{speed}
  </EquationBlock>

  <p>
    Given that $\Vec{a}(t)$ is parallel to $\Vec{x}(t)$, it follows that the
    velocity vector $\Vec{v}(t)$ and the acceleration vector $\Vec{a}(t)$ are
    always orthogonal to each other:
  </p>

  <EquationBlock>
    \Vec{v}(t) \cdot \Vec{a}(t) = \Vec{v}(t) \cdot \left(-\omega^2
    \Vec{x}(t)\right) = -\omega^2 \Vec{v}(t) \cdot \Vec{x}(t) = 0
  </EquationBlock>

  <p>
    The effect of the acceleration $\Vec{a}(t)$ is thus to continuously change
    the direction of the velocity $\Vec{v}(t)$ without altering its magnitude.
    To delve deeper into this, let's determine how the magnitude of $\Vec{v}(t)$
    evolves over time for any arbitrary motion:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \DD{\|\Vec{v}(t)\|}{t}
    &= \DDo{t}\sqrt{v_x^2(t) + v_y^2(t)} \\
    &= \frac{2v_x(t)a_x(t) + 2v_y(t)a_y(t)}{2\sqrt{v_x^2(t) + v_y^2(t)}} \\
    &= \frac{ \Vec{v}(t)\cdot\Vec{a}(t) }{\|\Vec{v}(t)\|} \label{speed-derivative}
  </EquationBlock>

  <p>
    When $\Vec{a}(t)$ is orthogonal to $\Vec{v}(t)$, the magnitude of
    $\Vec{v}(t)$ remains constant, but its direction will change if the
    acceleration is nonzero. Since no specific assumptions were made regarding
    $\Vec{v}(t)$ and $\Vec{a}(t)$ in the derivation of equation
    \eqref{speed-derivative}, this conclusion is generally valid.
  </p>

  <p>
    Considering that the object is always moving in a circle with radius $r$,
    and $\|\Vec{x}(t)\| = r$ for all $t$, equation \eqref{acceleration} shows
    that the magnitude $a(t)$ of the acceleration is also constant and can be
    expressed as:
  </p>

  <EquationBlock>
    a(t) = \|\Vec{a}(t)\| = \omega^2 \|\Vec{x}(t)\| = \omega^2 r = \frac{v^2}{r}
  </EquationBlock>

  <p>where equation \eqref{speed} was used.</p>

  <p>
    In summary, when an object traverses a circular path with constant angular
    velocity, its acceleration always points toward the center of the circle,
    and its velocity is invariably tangential to the path. It's important to
    note that we have not investigated the causes of the object's motion; we
    merely assumed it moves in a circular pattern without delving into the
    reasons (in other words, we approached the object's motion as a
    <a href="https://en.wikipedia.org/wiki/Kinematics">kinematics</a> problem).
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import circularMotion from "@/assets/images/circular-motion.svg";
import circularMotionAV from "@/assets/images/circular-motion-a-v.svg";

onMounted(() => onViewMounted());
</script>
