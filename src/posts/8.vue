<template>
  <p>
    Consider an object traveling along a circle of radius $r$ on the $(x,y)$
    plane as shown in <a href="#fig_1">figure 1</a>. The circle is centered at
    the origin $O$ of the plane. The object travels with constant angular
    velocity $\omega$, meaning the angle $\theta(t)$ formed by its path with the
    positive $x$ axis at time $t$ is given by:
  </p>

  <EquationBlock> \theta(t) = \theta_0 + \omega t </EquationBlock>

  <p>
    where $\theta_0$ is the value of $\theta(t)$ at $t = 0$. We will assume here
    that $\theta_0 = 0$. In other words, the object is at the position $(x_0,
    y_0) = (r, 0)$ at $t = 0$.
  </p>

  <BaseFigure
    description="An object traveling along a circle of radius $r$ with constant
                 angular velocity $\omega$."
    :number="1"
  >
    <ResponsiveImage
      class="figure-1"
      alt="Circular motion"
      :src="circularMotion"
    />
  </BaseFigure>

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
    Here is where the interesting physics starts. Let the position vector ${\bf
    x}(t)$ be the vector connecting the origin $O$ to the object as in
    <a href="#fig_1">figure 1</a>. In other words:
  </p>

  <EquationBlock>
    {\bf x}(t) = (x(t), y(t)) = r(\cos(\omega t), \sin(\omega t))
  </EquationBlock>

  <p>
    Then, if ${\bf v}(t) = (v_x(t), v_y(t))$ and ${\bf a}(t) = (a_x(t), a_y(t))$
    are the object velocity and acceleration vectors at time $t$ respectively,
    we obtain the following:
  </p>

  <EquationBlock>
    {\bf v}(t) = \omega r (-\sin(\omega t), \cos(\omega t))
  </EquationBlock>

  <EquationBlock>
    {\bf a}(t) = -\omega^2 r (\cos(\omega t), \sin(\omega t)) = -\omega^2 {\bf
    x}(t) \label{accel_vec}
  </EquationBlock>

  <p>
    <a href="#fig_2">Figure 2</a> visually depicts velocities and accelerations
    at different positions along the circular path:
  </p>

  <BaseFigure
    description="Accelerations (blue) and velocities (red) at $\theta= 0,
                 \pi/2, \pi$ and $3\pi/2$. Notice how the acceleration always
                 points to the center of the circle while the velocity is always
                 tangential to it."
    :number="2"
  >
    <ResponsiveImage
      class="figure-2"
      alt="Circular motion: a and v at different values of theta"
      :src="circularMotionAV"
    />
  </BaseFigure>

  <p>
    Since ${\bf x}(t)$ always points away from the center $O$ of the circle,
    equation \eqref{accel_vec} tells us that the acceleration ${\bf a}(t)$,
    called <b>centripetal acceleration</b>, points always towards the center of
    the circle. To gain more intuition about why this is so, notice first that
    the velocity vector ${\bf v}(t)$ is orthogonal to the position vector ${\bf
    x}(t)$ at all times:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    {\bf v}(t)\cdot{\bf x}(t)
      &= x(t)v_x(t) + y(t)v_y(t) \\
      &= \omega r^2\left[\cos(\omega t)(-\sin(\omega t)) +
         \sin(\omega t)\cos(\omega t)\right] \\
      &= 0
  </EquationBlock>

  <p>
    Therefore, for circular motion, the velocity of the object is always
    tangential to the circle. This is true even if the angular velocity $\omega$
    is not constant over time, and I recommend any unconvinced reader to check
    this fact themselves by computing the derivative of ${\bf x}(t) =
    (r\cos\theta(t), r\sin\theta(t))$ with respect to time for an arbitrary
    $\theta(t)$ and taking the dot product of ${\bf x}(t)$ and the resulting
    ${\bf v}(t)$.
  </p>

  <p>
    The magnitude $v(t)$ of the velocity is always constant since the angular
    velocity $\omega$ is itself constant. In fact:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    v(t)
      &= \|{\bf v}(t)\| \\
      &= \sqrt{v_x^2(t) + v_y^2(t)} \\
      &= \sqrt{\omega^2 r^2 \sin^2(\omega t) + \omega^2 r^2\cos^2(\omega t)} \\
      &= \omega r \sqrt{\sin^2(\omega t) + \cos^2(\omega t)} \\
      &= \omega r \label{mag_v}
  </EquationBlock>

  <p>
    Because ${\bf a}(t)$ is parallel to ${\bf x}(t)$, the velocity ${\bf v}(t)$
    and the acceleration ${\bf a}(t)$ are also always orthogonal to each other:
  </p>

  <EquationBlock>
    {\bf v}(t) \cdot {\bf a}(t) = {\bf v}(t) \cdot \left(-\omega^2 {\bf
    x}(t)\right) = -\omega^2 {\bf v}(t) \cdot {\bf x}(t) = 0
  </EquationBlock>

  <p>
    The effect of the acceleration ${\bf a}(t)$ is therefore to continuously
    change the direction of the velocity ${\bf v}(t)$ without changing its
    magnitude. To better understand this, let's compute how the magnitude of
    ${\bf v}(t)$ changes over time for any arbitrary motion:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \frac{d\|{\bf v}(t)\|}{dt}
    &= \frac{d}{dt}\sqrt{v_x^2(t) + v_y^2(t)} \\
    &= \frac{2v_x(t)a_x(t) + 2v_y(t)a_y(t)}{2\sqrt{v_x^2(t) + v_y^2(t)}} \\
    &= \frac{ {\bf v}(t)\cdot{\bf a}(t) }{\|{\bf v}(t)\|} \label{dv_dt}
  </EquationBlock>

  <p>
    When ${\bf a}(t)$ is orthogonal to ${\bf v}(t)$, the magnitude of ${\bf
    v}(t)$ remains constant despite the fact that its direction will change if
    the acceleration is not zero. Since we made no assumptions on ${\bf v}(t)$
    and ${\bf a}(t)$ when deriving equation \eqref{dv_dt}, it must be valid in
    general.
  </p>

  <p>
    Given that the object always travels in a circle of radius $r$, then $\|{\bf
    x}(t)\| = r$ for all $t$, so from equation \eqref{accel_vec}, the magnitude
    $a(t)$ of the acceleration is also constant and given by:
  </p>

  <EquationBlock>
    a(t) = \|{\bf a}(t)\| = \omega^2 \|{\bf x}(t)\| = \omega^2 r = \frac{v^2}{r}
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
import mathjax from "@/mathjax";
import circularMotion from "@/assets/images/circular-motion.svg";
import circularMotionAV from "@/assets/images/circular-motion-a-v.svg";

onMounted(() => {
  mathjax.render();
});
</script>

<style scoped lang="scss">
.figure-1,
.figure-2 {
  height: 18.75 * $base-length;
}
</style>
