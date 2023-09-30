<template>
  <p>
    Consider the double pendulum shown in <FigureLink id="double-pendulum" />. A
    double pendulum is a system consisting of a standard pendulum directly
    attached to another one. Each pendulum consists of a bob connected to a
    massless rigid rod that is only allowed to move along a vertical plane. The
    pivot of the first pendulum is fixed to a point $O$, and all motion is
    frictionless.
  </p>

  <FigureBlock id="double-pendulum" caption="A double pendulum.">
    <ResponsiveImage alt="Double pendulum" :src="doublePendulum" />
  </FigureBlock>

  <p>
    As shown in a
    <RouterLink :to="{ name: '33' }">previous post</RouterLink>, if we define
    $\theta_1$ and $\theta_2$ as the angles that the first and second rods make
    with the vertical direction, respectively, we can obtain the following
    expression for the
    <a
      href="https://en.wikipedia.org/wiki/Lagrangian_mechanics#Lagrangian_and_action"
      >Lagrangian</a
    >
    of the system:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    L = \frac{1}{2}(m_1 + m_2) l_1^2 \dot{\theta}_1^2
      &+ \frac{1}{2} m_2 l_2^2 \dot{\theta}_2^2
       + m_2 l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2) \\
      &+ (m_1 + m_2) g l_1 \cos\theta_1 + m_2 g l_2 \cos\theta_2
  </EquationBlock>

  <p>From the Lagrangian, we can obtain the canonical momenta of the system:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    p_{\theta_1}
      &= \PP{L}{\dot{\theta}_1}
      &&= (m_1 + m_2) l_1^2 \dot{\theta}_1
          + m_2 l_1 l_2 \dot{\theta}_2 \cos(\theta_1 - \theta_2)
      \label{p-theta-1} \\
    p_{\theta_2}
      &= \PP{L}{\dot{\theta}_2}
      &&= m_2 l_2^2 \dot{\theta}_2
          + m_2 l_1 l_2 \dot{\theta}_1 \cos(\theta_1 - \theta_2)
      \label{p-theta-2}
  </EquationBlock>

  <p>
    The
    <a href="https://en.wikipedia.org/wiki/Hamiltonian_mechanics"
      >Hamiltonian</a
    >
    of the system is given by:
  </p>

  <EquationBlock label="hamiltonian-definition">
    H = \sum_{i=1}^2 \dot{\theta}_i p_{\theta_i} - L
  </EquationBlock>

  <p>
    From the Hamiltonian $H$, we can derive a set of equations of motion for the
    system, which are equivalent to the
    <a
      href="https://en.wikipedia.org/wiki/Lagrangian_mechanics#Euler.E2.80.93Lagrange_equations"
      >Euler-Lagrange equations</a
    >:
  </p>

  <EquationBlock align numberLines>
    \dot{\theta}_i &= \PP{H}{p_{\theta_i}} \label{hamilton-equations-theta-i} \\
    \dot{p}_{\theta_i} &= -\frac{\partial H}{\partial \theta_i}
    \label{hamilton-equations-p-theta-i}
  </EquationBlock>

  <p>
    for $i = 1,2$. Equations \eqref{hamilton-equations-theta-i} and
    \eqref{hamilton-equations-p-theta-i} require us to write $H$ as a function
    of the variables $\theta_1$, $\theta_2$, $p_{\theta_1}$, and $p_{\theta_2}$.
    In order to achieve that, we must first determine $\dot{\theta}_i$ and $L$
    in terms of these variables so that we can substitute them into equation
    \eqref{hamiltonian-definition}. With this in mind, note that equations
    \eqref{p-theta-1} and \eqref{p-theta-2} can be written in matrix form as
    shown below:
  </p>

  <EquationBlock label="p-matrix-form">
    \MatrixTwoOne{p_{\theta_1}}{p_{\theta_2}} = B
    \MatrixTwoOne{\dot{\theta}_1}{\dot{\theta}_2}
  </EquationBlock>

  <p>
    where $B$ is a $2 \times 2$ matrix with entries that are functions of
    $\theta_1$ and $\theta_2$:
  </p>

  <EquationBlock>
    B = \MatrixTwoTwo{(m_1 + m_2) l_1^2}{m_2 l_1 l_2 \cos(\theta_1-\theta_2)}
    {m_2 l_1 l_2 \cos(\theta_1 - \theta_2)}{m_2 l_2^2}
  </EquationBlock>

  <p>
    From equation \eqref{p-matrix-form}, we can obtain the generalized
    velocities $\dot{\theta}_i$ in terms of the canonical momenta $p_{\theta_i}$
    and the angles $\theta_i$:
  </p>

  <EquationBlock label="dot-theta-matrix-form">
    \MatrixTwoOne{\dot{\theta}_1}{\dot{\theta}_2} = B^{-1}
    \MatrixTwoOne{p_{\theta_1}}{p_{\theta_2}}
  </EquationBlock>

  <p>
    The matrix $B$ is indeed invertible for all values of $\theta_1$ and
    $\theta_2$ since:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align label="det-B">
    \det(B)
      &= m_1 m_2 l_1^2 l_2^2 + m_2^2 l_1^2 l_2^2
         \left[1 - \cos^2(\theta_1 - \theta_2)\right] \\
      &= m_1 m_2 l_1^2 l_2^2 + m_2^2 l_1^2 l_2^2 \sin^2(\theta_1 - \theta_2) \\
      &\geq m_1 m_2 l_1^2 l_2^2
  </EquationBlock>

  <p>
    Being a $2 \times 2$ matrix, $B$ can be
    <a href="http://mathworld.wolfram.com/MatrixInverse.html">inverted</a>
    directly:
  </p>

  <EquationBlock label="inverse-B">
    B^{-1} = \frac{1}{\det(B)} \MatrixTwoTwo{m_2 l_2^2}{-m_2 l_1 l_2
    \cos(\theta_1 - \theta_2)}{-m_2 l_1 l_2 \cos(\theta_1 - \theta_2)}{(m_1 +
    m_2) l_1^2}
  </EquationBlock>

  <p>
    By applying equations \eqref{inverse-B} and \eqref{det-B} to equation
    \eqref{dot-theta-matrix-form}, we get (after canceling out common factors
    and rearranging some terms):
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \dot{\theta}_1
      &= \frac{l_2 p_{\theta_1} - l_1 p_{\theta_2} \cos(\theta_1 - \theta_2)}
         {l_1^2 l_2 \left[m_1 + m_2 \sin^2(\theta_1 - \theta_2)\right]}
         \label{dot-theta-1-p-theta-1} \\
    \dot{\theta}_2
      &= \frac{-m_2 l_2 p_{\theta_1} \cos(\theta_1 - \theta_2) + (m_1
         + m_2) l_1 p_{\theta_2}}{m_2 l_1 l_2^2 \left[m_1 + m_2
         \sin^2(\theta_1 - \theta_2)\right]}
         \label{dot-theta-2-p-theta-2}
  </EquationBlock>

  <p>
    Applying equations \eqref{dot-theta-1-p-theta-1} and
    \eqref{dot-theta-2-p-theta-2} to equation \eqref{hamiltonian-definition}
    yields the Hamiltonian $H$ in terms of $\theta_1$, $\theta_2$,
    $p_{\theta_1}$ and $p_{\theta_2}$ (after some extensive algebra):
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align label="hamiltonian">
    H &= \frac{m_2 l_2^2 p^2_{\theta_1} + (m_1 + m_2) l_1^2 p^2_{\theta_2}
         - 2 m_2 l_1 l_2 p_{\theta_1} p_{\theta_2} \cos(\theta_1 - \theta_2)}
         {2 m_2 l_1^2 l_2^2 \left[m_1 + m_2 \sin^2(\theta_1 - \theta_2)\right]} \\
      & \quad\quad - (m_1 + m_2) g l_1 \cos\theta_1 - m_2 g l_2\cos\theta_2
  </EquationBlock>

  <p>
    We can finally use equation \eqref{hamiltonian} in equations
    \eqref{hamilton-equations-theta-i} and \eqref{hamilton-equations-p-theta-i}
    to derive the Hamilton's equations of motion for the double pendulum:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \dot{\theta}_1
      &= &&\PP{H}{p_{\theta_1}}
      &&= \frac{l_2 p_{\theta_1} - l_1 p_{\theta_2} \cos(\theta_1 - \theta_2)}
          {l_1^2 l_2 \left[m_1 + m_2 \sin^2(\theta_1 - \theta_2)\right]}
          \label{dot-theta-1} \\
    \dot{\theta}_2
      &= &&\PP{H}{p_{\theta_2}}
      &&= \frac{-m_2 l_2 p_{\theta_1} \cos(\theta_1 - \theta_2)
          + (m_1 + m_2) l_1 p_{\theta_2}}{m_2 l_1 l_2^2 \left[m_1 + m_2
          \sin^2(\theta_1 - \theta_2)\right]}
         \label{dot-theta-2} \\
    \dot{p}_{\theta_1}
      &= -&&\PP{H}{\theta_1}
      &&= -(m_1 + m_2) g l_1 \sin\theta_1 - h_1 + h_2 \sin\left[2 (\theta_1
          - \theta_2)\right] \\
    \dot{p}_{\theta_2}
      &= -&&\PP{H}{\theta_2}
      &&= -m_2 g l_2 \sin\theta_2 + h_1
          - h_2\sin\left[2 (\theta_1 - \theta_2)\right]
          \label{dot-p-theta-2}
  </EquationBlock>

  <p>where:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    h_1 &= \frac{p_{\theta_1} p_{\theta_2} \sin(\theta_1 - \theta_2)}{l_1 l_2
           \left[m_1 + m_2 \sin^2(\theta_1 - \theta_2)\right]} \\
    h_2 &= \frac{m_2 l_2^2 p^2_{\theta_1} + (m_1 + m_2) l_1^2 p^2_{\theta_2} - 2
           m_2 l_1 l_2 p_{\theta_1} p_{\theta_2} \cos(\theta_1 - \theta_2)}
           {2 l_1^2 l_2^2 \left[m_1 + m_2 \sin^2(\theta_1 - \theta_2)\right]^2}
  </EquationBlock>

  <p>
    Note that equations \eqref{dot-theta-1} and \eqref{dot-theta-2} are the same
    as equations \eqref{dot-theta-1-p-theta-1} and
    \eqref{dot-theta-2-p-theta-2}. Thus, in the process of determining the
    Hamiltonian in terms of the canonical momenta $p_{\theta_i}$ and the angles
    $\theta_i$, we unintentionally obtained two of Hamilton's equations.
  </p>

  <p>
    Equations \eqref{dot-theta-1}-\eqref{dot-p-theta-2} form a set of coupled
    first-order differential equations on the variables $\theta_1$, $\theta_2$,
    $p_{\theta_1}$, and $p_{\theta_2}$. Although they cannot be solved
    analytically, numerical solutions can be obtained using numerical solvers
    such as
    <a href="https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods"
      >Runge-Kutta</a
    >
    methods. A double pendulum simulator based on the classic (fourth-order)
    Runge-Kutta method can be found
    <a href="https://github.com/dassencio/double-pendulum.git">here</a>.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import doublePendulum from "@/assets/images/double-pendulum.svg";

onMounted(() => onViewMounted());
</script>
