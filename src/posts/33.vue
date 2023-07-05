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
    In our discussion, the fixed point $O$ will be taken as the origin of a
    Cartesian coordinate system with the $x$ axis pointing along the horizontal
    direction and the $y$ axis pointing vertically upwards. Let $\theta_1$ and
    $\theta_2$ be the angles that the first and second rods make with the
    vertical direction, respectively. As can be seen in
    <FigureLink id="double-pendulum" />, the positions of the bobs are given by:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    x_1 &= l_1 \sin\theta_1 \\
    x_2 &= l_1 \sin\theta_1 + l_2 \sin\theta_2 \\
    y_1 &= -l_1 \cos\theta_1 \\
    y_2 &= -l_1 \cos\theta_1 - l_2 \cos\theta_2
  </EquationBlock>

  <p>
    Differentiating the quantities above with respect to time, we obtain the
    velocities of the bobs:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \dot{x}_1 &= l_1 \dot{\theta}_1\cos\theta_1 \\
    \dot{x}_2 &= l_1 \dot{\theta}_1\cos\theta_1 + l_2 \dot{\theta}_2\cos\theta_2 \\
    \dot{y}_1 &= l_1 \dot{\theta}_1\sin\theta_1 \\
    \dot{y}_2 &= l_1 \dot{\theta}_1\sin\theta_1 + l_2 \dot{\theta}_2\sin\theta_2
  </EquationBlock>

  <p>
    The
    <a
      href="https://en.wikipedia.org/wiki/Lagrangian_mechanics#Lagrangian_and_action"
      >Lagrangian</a
    >
    of a double pendulum is given by $L = T - V$, where $T$ and $V$ are the
    kinetic and potential energies of the system, respectively. The kinetic
    energy $T$ is given by:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    T &= \frac{1}{2}m_1 v_1^2 + \frac{1}{2}m_2 v_2^2 \\
      &= \frac{1}{2}m_1(\dot{x}_1^2 + \dot{y}_1^2) + \frac{1}{2}m_2(\dot{x}_2^2 + \dot{y}_2^2) \\
      &= \frac{1}{2}m_1 l_1^2 \dot{\theta}_1^2 + \frac{1}{2}m_2\left[l_1^2 \dot{\theta}_1^2
       + l_2^2 \dot{\theta}_2^2 + 2 l_1 l_2 \dot{\theta}_1\dot{\theta}_2 \cos(\theta_1 - \theta_2)\right]
  </EquationBlock>

  <p>
    where above we used the fact that $\cos\theta_1\cos\theta_2 +
    \sin\theta_1\sin\theta_2 =$ $\cos(\theta_1-\theta_2)$. The potential energy
    $V$ is given by:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    V &= m_1 g y_1 + m_2 g y_2 \\
      &= -m_1 g l_1 \cos\theta_1 - m_2 g (l_1 \cos\theta_1 + l_2 \cos\theta_2) \\
      &= -(m_1 + m_2) g l_1 \cos\theta_1 - m_2 g l_2\cos\theta_2
  </EquationBlock>

  <p>The Lagrangian of the double pendulum is therefore:</p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    L =\frac{1}{2}(m_1 + m_2) l_1^2 \dot{\theta}_1^2
      &+ \frac{1}{2}m_2 l_2^2 \dot{\theta}_2^2
        + m_2 l_1 l_2 \dot{\theta}_1\dot{\theta}_2 \cos(\theta_1 - \theta_2) \\
      &+ (m_1 + m_2) g l_1 \cos\theta_1 + m_2 g l_2\cos\theta_2
  </EquationBlock>

  <p>
    The canonical momenta associated with the coordinates $\theta_1$ and
    $\theta_2$ can be obtained directly from $L$:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    p_{\theta_1} &= \PP{L}{\dot{\theta}_1}
      = (m_1 + m_2) l_1^2 \dot{\theta}_1 + m_2 l_1 l_2 \dot{\theta}_2\cos(\theta_1 - \theta_2) \\
    p_{\theta_2} &= \PP{L}{\dot{\theta}_2}
      = m_2 l_2^2 \dot{\theta}_2 + m_2 l_1 l_2 \dot{\theta}_1\cos(\theta_1 - \theta_2)
  </EquationBlock>

  <p>
    The equations of motion of the system are given by the
    <a
      href="https://en.wikipedia.org/wiki/Lagrangian_mechanics#Euler.E2.80.93Lagrange_equations"
      >Euler-Lagrange equations</a
    >:
  </p>

  <EquationBlock>
    \DDo{t}\left(\PP{L}{\dot{\theta}_i}\right) - \PP{L}{\theta_i} = 0
    \Longrightarrow \DD{p_{\theta_i}}{t} - \PP{L}{\theta_i} = 0
    \label{euler-lagrange}
  </EquationBlock>

  <p>for $i = 1, 2$. Since:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \DD{p_{\theta_1}}{t}
      &= (m_1 + m_2) l_1^2 \ddot{\theta}_1 + m_2 l_1 l_2
         \ddot{\theta}_2 \cos(\theta_1 - \theta_2) \nonumber \\
      &\quad -\, m_2 l_1 l_2 \dot{\theta}_2\dot{\theta}_1\sin(\theta_1 - \theta_2)
       + m_2 l_1 l_2 \dot{\theta}_2^2\sin(\theta_1 - \theta_2) \\
    \DD{p_{\theta_2}}{t}
      &= m_2 l_2^2 \ddot{\theta}_2 + m_2 l_1 l_2 \ddot{\theta}_1
         \cos(\theta_1 - \theta_2) \nonumber \\
      &\quad -\, m_2 l_1 l_2 \dot{\theta}_1^2 \sin(\theta_1 - \theta_2)
       + m_2 l_1 l_2 \dot{\theta}_1\dot{\theta}_2 \sin(\theta_1 - \theta_2) \\
    \PP{L}{\theta_1}
      &= - m_2 l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \sin(\theta_1 - \theta_2)
         - (m_1 + m_2) g l_1 \sin\theta_1 \\
    \PP{L}{\theta_2}
      &= m_2 l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \sin(\theta_1 - \theta_2)
       - m_2 g l_2 \sin\theta_2
  </EquationBlock>

  <p>
    then equation \eqref{euler-lagrange} yields (after dividing by $l_1$ when $i
    = 1$ and by $m_2 l_2$ when $i = 2$):
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    (m_1 + m_2) l_1 \ddot{\theta}_1
    &+ m_2 l_2 \ddot{\theta}_2 \cos(\theta_1 - \theta_2) \nonumber \\
    &+ m_2 l_2 \dot{\theta}_2^2\sin(\theta_1 - \theta_2) + (m_1 + m_2) g \sin\theta_1 = 0
    \label{euler-lagrange-1}
  </EquationBlock>

  <EquationBlock>
    l_2 \ddot{\theta}_2 + l_1 \ddot{\theta}_1 \cos(\theta_1 - \theta_2) - l_1
    \dot{\theta}_1^2 \sin(\theta_1 - \theta_2) + g \sin\theta_2 = 0
    \label{euler-lagrange-2}
  </EquationBlock>

  <p>
    Equations \eqref{euler-lagrange-1} and \eqref{euler-lagrange-2} form a
    system of coupled second-order nonlinear differential equations. By dividing
    them by $(m_1 + m_2)l_1$ and $l_2$ respectively, and moving all terms that
    do not involve $\ddot{\theta}_1$ and $\ddot{\theta}_2$ to the right-hand
    side, we obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \ddot{\theta}_1 + \alpha_1(\theta_1,\theta_2) \ddot{\theta}_2
      &= f_1(\theta_1, \theta_2, \dot{\theta}_1, \dot{\theta}_2)
      \label{euler-lagrange-1-short} \\
    \ddot{\theta}_2 + \alpha_2(\theta_1,\theta_2) \ddot{\theta}_1
      &= f_2(\theta_1, \theta_2, \dot{\theta}_1, \dot{\theta}_2)
      \label{euler-lagrange-2-short}
  </EquationBlock>

  <p>where:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \alpha_1(\theta_1,\theta_2)
      &\ColonEq \frac{l_2}{l_1}\left(\frac{m_2}{m_1 + m_2}\right)\cos(\theta_1 - \theta_2)
       \label{alpha_1} \\
    \alpha_2(\theta_1,\theta_2)
      &\ColonEq \frac{l_1}{l_2}\cos(\theta_1-\theta_2)
       \label{alpha_2}
  </EquationBlock>

  <p>and:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    f_1(\theta_1, \theta_2, \dot{\theta}_1, \dot{\theta}_2)
      &\ColonEq - \frac{l_2}{l_1}\left(\frac{m_2}{m_1 + m_2}\right)
       \dot{\theta}_2^2\sin(\theta_1 - \theta_2) - \frac{g}{l_1} \sin\theta_1
       \label{f_1} \\
    f_2(\theta_1, \theta_2, \dot{\theta}_1, \dot{\theta}_2)
      &\ColonEq \frac{l_1}{l_2}\dot{\theta}_1^2\sin(\theta_1 - \theta_2)
       - \frac{g}{l_2} \sin\theta_2
       \label{f_2}
  </EquationBlock>

  <p>
    Interestingly, $f_1$ does not depend on $\dot{\theta}_1$, and $f_2$ does not
    depend on $\dot{\theta}_2$. Equations \eqref{euler-lagrange-1-short} and
    \eqref{euler-lagrange-2-short} can be combined into a single equation:
  </p>

  <EquationBlock>
    A \MatrixTwoOne{\ddot{\theta}_1}{\ddot{\theta}_2} =
    \MatrixTwoTwo{1}{\alpha_1}{\alpha_2}{1}
    \MatrixTwoOne{\ddot{\theta}_1}{\ddot{\theta}_2} = \MatrixTwoOne{f_1}{f_2}
    \label{euler-lagrange-matrix-form}
  </EquationBlock>

  <p>
    where the matrix $A$ depends on $\theta_1$ and $\theta_2$ since $\alpha_1$
    and $\alpha_2$ depend on these variables. Being a $2 \times 2$ matrix, $A$
    can be
    <a href="http://mathworld.wolfram.com/MatrixInverse.html">inverted</a>
    directly:
  </p>

  <EquationBlock>
    A^{-1} = \frac{1}{\det(A)} \MatrixTwoTwo{1}{-\alpha_1}{-\alpha_2}{1} =
    \frac{1}{1 - \alpha_1\alpha_2} \MatrixTwoTwo{1}{-\alpha_1}{-\alpha_2}{1}
    \label{inverse-A}
  </EquationBlock>

  <p>Before we continue, note that $A$ is always invertible since:</p>

  <EquationBlock>
    \det(A) = 1 - \alpha_1\alpha_2 = 1 - \left(\frac{m_2}{m_1 +
    m_2}\right)\cos^2(\theta_1 - \theta_2) \gt 0
  </EquationBlock>

  <p>
    because $m_2 / (m_1 + m_2) \lt 1$ and $\cos^2(x) \leq 1$ for all real values
    of $x$. From equations \eqref{euler-lagrange-matrix-form} and
    \eqref{inverse-A}, we obtain:
  </p>

  <EquationBlock>
    \MatrixTwoOne{\ddot{\theta}_1}{\ddot{\theta}_2} = A^{-1}
    \MatrixTwoOne{f_1}{f_2} = \frac{1}{1 - \alpha_1\alpha_2} \MatrixTwoOne{f_1 -
    \alpha_1 f_2}{-\alpha_2 f_1 + f_2 }
  </EquationBlock>

  <p>
    Finally, letting $\omega_1 \ColonEq \dot{\theta}_1$ and $\omega_2 \ColonEq
    \dot{\theta}_2$, we can write the equations of motion of the double pendulum
    as a system of coupled first order differential equations on the variables
    $\theta_1$, $\theta_2$, $\omega_1$, $\omega_2$:
  </p>

  <EquationBlock>
    \DDo{t} \MatrixFourOne{\theta_1}{\theta_2}{\omega_1}{\omega_2} =
    \MatrixFourOne{\omega_1}{\omega_2}{g_1(\theta_1,\theta_2,\omega_1,\omega_2)}{g_2(\theta_1,\theta_2,\omega_1,\omega_2)}
    \label{euler-lagrange-system}
  </EquationBlock>

  <p>where:</p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    g_1 &\ColonEq \frac{f_1 - \alpha_1 f_2}{1 - \alpha_1\alpha_2} \\
    g_2 &\ColonEq \frac{-\alpha_2 f_1 + f_2}{1 - \alpha_1\alpha_2}
  </EquationBlock>

  <p>
    with $\alpha_i = \alpha_i(\theta_1,\theta_2)$ and $f_i =
    f_i(\theta_1,\theta_2,\omega_1,\omega_2)$ for $i = 1,2$ defined in equations
    \eqref{alpha_1}, \eqref{alpha_2}, \eqref{f_1} and \eqref{f_2}.
  </p>

  <p>
    Equation \eqref{euler-lagrange-system} cannot be solved analytically, but
    numerical solutions can be obtained using numerical solvers such as
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
