<template>
  <p>
    Consider an object traveling along a circle of radius $r$ on the $(x,y)$
    plane as shown in <FigureLink :figureNumber="1">figure 1</FigureLink>. The
    circle is centered at the origin $O$ of the plane. The object travels with
    constant angular velocity $\omega$, meaning the angle $\theta(t)$ formed by
    its path with the positive $x$-axis at time $t$ is given by:
  </p>

  <EquationBlock> \theta(t) = \theta_0 + \omega t </EquationBlock>

  <p>
    where $\theta_0$ is the value of $\theta(t)$ at $t = 0$. We will assume here
    that $\theta_0 = 0$. In other words, the object is at position $(x_0, y_0) =
    (r, 0)$ at $t = 0$.
  </p>

  <FigureBlock
    :figureNumber="1"
    caption="An object traveling along a circle of radius $r$ with constant
             angular velocity $\omega$."
  >
    <ResponsiveImage
      class="figure-1"
      alt="Circular motion"
      :src="circularMotion"
    />
  </FigureBlock>

  <p>The equations of motion of the object are given by:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    x(t) &= r\cos\theta(t) &&= r\cos(\omega t) \label{eq_motion_x} \\
    y(t) &= r\sin\theta(t) &&= r\sin(\omega t) \label{eq_motion_y}
  </EquationBlock>

  <p>
    The velocities and accelerations along the $x$ and $y$ directions can be
    obtained directly from equations \eqref{eq_motion_x} and
    \eqref{eq_motion_y}. Using the notation $\dot{q}$ to represent $dq/dt$, we
    have that:
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
    Here is where the interesting physics starts. Let $\Vec{x}(t)$ be the
    position vector connecting the origin $O$ to the object as in
    <FigureLink :figureNumber="1">figure 1</FigureLink>:
  </p>

  <EquationBlock>
    \Vec{x}(t) = (x(t), y(t)) = r(\cos(\omega t), \sin(\omega t))
  </EquationBlock>

  <p>
    Then, with $\Vec{v}(t) = (v_x(t), v_y(t))$ and $\Vec{a}(t) = (a_x(t),
    a_y(t))$ being the object velocity and acceleration vectors respectively at
    time $t$, we obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \Vec{v}(t) &= \omega r (-\sin(\omega t), \cos(\omega t)) \\
    \Vec{a}(t) &= -\omega^2 r (\cos(\omega t), \sin(\omega t)) = -\omega^2
    \Vec{x}(t) \label{accel_vec}
  </EquationBlock>

  <p>
    <FigureLink :figureNumber="2">Figure 2</FigureLink> visually depicts
    velocities and accelerations at different positions along the circular path:
  </p>

  <FigureBlock
    :figureNumber="2"
    caption="Accelerations (blue) and velocities (red) at $\theta= 0, \pi/2,
             \pi$ and $3\pi/2$. Notice how the acceleration always points to the
             center of the circle while the velocity is always tangential to
             it."
  >
    <ResponsiveImage
      class="figure-2"
      alt="Circular motion: a and v at different values of theta"
      :src="circularMotionAV"
    />
  </FigureBlock>

  <p>
    Since $\Vec{x}(t)$ always points away from the center $O$ of the circle,
    equation \eqref{accel_vec} tells us that the acceleration $\Vec{a}(t)$,
    called <b>centripetal acceleration</b>, points always to the center of the
    circle. To gain more intuition about why this is so, notice first that the
    velocity vector $\Vec{v}(t)$ is orthogonal to the position vector
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
    The velocity of the object is therefore always tangential to the circle. As
    a matter of fact, this is true even when the angular velocity
    $\dot{\theta}(t)$ changes over time, and I recommend the unconvinced reader
    to verify this by themselves as an exercise.
  </p>

  <p>
    The magnitude $v(t)$ of the velocity is always constant since the angular
    velocity $\omega$ is itself constant. In fact:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    v(t)
      &= \|\Vec{v}(t)\| \\
      &= \sqrt{v_x^2(t) + v_y^2(t)} \\
      &= \sqrt{\omega^2 r^2 \sin^2(\omega t) + \omega^2 r^2\cos^2(\omega t)} \\
      &= \omega r \sqrt{\sin^2(\omega t) + \cos^2(\omega t)} \\
      &= \omega r \label{mag_v}
  </EquationBlock>

  <p>
    Because $\Vec{a}(t)$ is parallel to $\Vec{x}(t)$, the velocity $\Vec{v}(t)$
    and the acceleration $\Vec{a}(t)$ are also always orthogonal to each other:
  </p>

  <EquationBlock>
    \Vec{v}(t) \cdot \Vec{a}(t) = \Vec{v}(t) \cdot \left(-\omega^2
    \Vec{x}(t)\right) = -\omega^2 \Vec{v}(t) \cdot \Vec{x}(t) = 0
  </EquationBlock>

  <p>
    The effect of the acceleration $\Vec{a}(t)$ is therefore to continuously
    change the direction of the velocity $\Vec{v}(t)$ without changing its
    magnitude. To better understand this, let's compute how the magnitude of
    $\Vec{v}(t)$ changes over time for any arbitrary motion:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \frac{d\|\Vec{v}(t)\|}{dt}
    &= \frac{d}{dt}\sqrt{v_x^2(t) + v_y^2(t)} \\
    &= \frac{2v_x(t)a_x(t) + 2v_y(t)a_y(t)}{2\sqrt{v_x^2(t) + v_y^2(t)}} \\
    &= \frac{ \Vec{v}(t)\cdot\Vec{a}(t) }{\|\Vec{v}(t)\|} \label{dv_dt}
  </EquationBlock>

  <p>
    When $\Vec{a}(t)$ is orthogonal to $\Vec{v}(t)$, the magnitude of
    $\Vec{v}(t)$ remains constant despite the fact that its direction will
    change if the acceleration is not zero. Since we made no assumptions on
    $\Vec{v}(t)$ and $\Vec{a}(t)$ when deriving equation \eqref{dv_dt}, it must
    be valid in general.
  </p>

  <p>
    Given that the object always travels in a circle of radius $r$, then
    $\|\Vec{x}(t)\| = r$ for all $t$, so from equation \eqref{accel_vec}, the
    magnitude $a(t)$ of the acceleration is also constant and given by:
  </p>

  <EquationBlock>
    a(t) = \|\Vec{a}(t)\| = \omega^2 \|\Vec{x}(t)\| = \omega^2 r = \frac{v^2}{r}
  </EquationBlock>

  <p>where equation \eqref{mag_v} was used.</p>

  <p>
    To sum up, whenever an object moves along a circular path with constant
    angular velocity, its acceleration points always to the center of the circle
    while its velocity is always tangential to it. Notice that we have not
    discussed what causes the motion of the object; we simply assumed it moves
    along a circle without caring about why (in other words, we treated the
    object motion as a
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

<style scoped lang="scss">
.figure-1,
.figure-2 {
  height: 18.75 * $base-length;
}
</style>
