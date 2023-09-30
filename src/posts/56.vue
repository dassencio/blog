<template>
  <p>
    Some physical systems can be studied much more easily when we consider their
    equations of motion in
    <a href="https://en.wikipedia.org/wiki/Non-inertial_reference_frame"
      >non-inertial frames of reference</a
    >. For example, studying ocean tides is easier if we use a non-inertial
    frame with origin at the center of the Earth. This frame is non-inertial
    because the Earth is under the action of gravitational forces caused by
    other bodies in the solar system, such as the Sun and the Moon.
  </p>

  <p>
    Consider a fixed
    <a href="https://en.wikipedia.org/wiki/Inertial_frame_of_reference"
      >inertial frame of reference</a
    >
    $S$ with origin at a point $O$, and a non-inertial frame of reference $S'$,
    whose origin $O'$ is positioned at $\Vec{R}(t)$ as measured in $S$ at time
    $t$ (see <FigureLink id="non-inertial-frame" />). Our goal is to examine the
    motion of a particle of mass $m$ in both $S$ and $S'$ and determine the
    relationships between the positions, velocities, and accelerations measured
    in each of these frames. Afterward, we will study the so-called
    <a href="https://en.wikipedia.org/wiki/Fictitious_force"
      >fictitious forces</a
    >
    that arise in non-inertial frames of reference. The axes of the frames $S$
    and $S'$ are labeled as $x_i$ and $x_i'$, respectively, for $i = 1, 2, 3$.
  </p>

  <FigureBlock
    id="non-inertial-frame"
    caption="A fixed inertial frame of reference $S$ and a non-inertial frame of
             reference $S'$. At time $t$, the position of the origin $O'$ of
             $S'$ is located at $\Vec{R}(t)$ as measured in the frame $S$."
  >
    <ResponsiveImage
      alt="Non-inertial frame of reference"
      :src="nonInertialFrame"
    />
  </FigureBlock>

  <p>From <FigureLink id="non-inertial-frame" />, we see that:</p>

  <EquationBlock boxed label="x-x-prime">
    \Vec{x}(t) = \Vec{R}(t) + \Vec{x}'(t)
  </EquationBlock>

  <p>
    This equation relates the coordinates $\Vec{x}(t)$ of the particle in $S$ to
    its coordinates $\Vec{x}'(t)$ in $S'$.
  </p>

  <p>
    With respect to the fixed frame $S$, the motion of the frame $S'$ over an
    infinitesimal amount of time $\Di{t}$ can be broken down into two parts: the
    translation of its origin and an infinitesimal rotation of its axes around
    an axis that passes through the origin of $S'$. To make this clearer,
    consider the case where the origins of $S$ and $S'$ always coincide, i.e.,
    $\Vec{R}(t) = \Vec{0}$ for all $t$. Over an infinitesimal amount of time
    $\Di{t}$, the axes of $S'$ can do nothing but rotate by an infinitesimal
    angle $\Di{\theta}$ around some axis passing through its origin. This axis,
    known as the "instantaneous axis of rotation" of $S'$, can vary over time.
    In other words, the infinitesimal rotations can occur around different axes
    at different times. By allowing the origin $O'$ of $S'$ to move as well, we
    see that the complete motion of $S'$ can be described by the translation of
    its origin plus the rotation of its axes.
  </p>

  <p>
    Now, consider how both $S$ and $S'$ perceive changes in $\Vec{x}'(t)$ over
    an infinitesimal amount of time $\Di{t}$ (from this point onward, the
    dependence on $t$ will be omitted unless it could lead to confusion). If
    $S'$ observes a change $(\Di{\Vec{x}'})_{S'}$, and considering the axes of
    $S'$ might undergo an infinitesimal rotation during the time period
    $\Di{t}$, then $S$ perceives a change of $(\Di{\Vec{x}'})_{S'}$ plus this
    small rotation:
  </p>

  <EquationBlock label="dx-prime-S-dx-prime-S-prime">
    (\Di{\Vec{x}'})_S = (\Di{\Vec{x}'})_{S'} + \Di{\Vecg{\theta}} \times
    \Vec{x}'
  </EquationBlock>

  <p>
    where $\Di{\Vecg{\theta}} = \Di{\Vecg{\theta}}(t)$ is a vector parallel to
    the rotation axis of $S'$ at time $t$ with magnitude $\Di{\theta}$. Dividing
    both sides of the equation above by $\Di{t}$, we obtain:
  </p>

  <EquationBlock label="ddt-x-prime-S-ddt-x-prime-S-prime">
    \left(\DD{\Vec{x}'}{t}\right)_S = \left(\DD{\Vec{x}'}{t}\right)_{S'} +
    \DD{\Vecg{\theta}}{t} \times \Vec{x}' = \left(\DD{\Vec{x}'}{t}\right)_{S'} +
    \Vecg{\omega} \times \Vec{x}'
  </EquationBlock>

  <p>
    where $\Vecg{\omega} = \Vecg{\omega}(t)$ is the angular velocity of the axes
    of $S'$ as measured in $S$ at time $t$. Note that the derivation of
    \eqref{dx-prime-S-dx-prime-S-prime} does not explicitly require that
    $\Vec{x}'$ represents the position of a particle as measured in $S'$. In
    fact, it could just as well represent any other vectorial physical quantity
    of interest specific to $S'$. Therefore, a change $(\Di{\Vec{q}})_{S'}$ in
    any quantity $\Vec{q}$ specific to $S'$ during $\Di{t}$ is perceived by $S$
    as the same change $(\Di{\Vec{q}})_{S'}$ plus an additional term that arises
    from the infinitesimal rotation of $S'$ during $\Di{t}$:
  </p>

  <EquationBlock>
    (\Di{\Vec{q}})_S = (\Di{\Vec{q}})_{S'} + \Di{\Vecg{\theta}} \times \Vec{q}
  </EquationBlock>

  <p>Dividing both sides by $\Di{t}$, we obtain:</p>

  <EquationBlock label="ddt-q-S-ddt-q-S-prime">
    \left(\DD{\Vec{q}}{t}\right)_S = \left(\DD{\Vec{q}}{t}\right)_{S'} +
    \left(\DD{\Vecg{\theta}}{t}\right)_S \times \Vec{q} =
    \left(\DD{\Vec{q}}{t}\right)_{S'} + \Vecg{\omega} \times \Vec{q}
  </EquationBlock>

  <p>
    Using equation \eqref{ddt-x-prime-S-ddt-x-prime-S-prime}, we can relate the
    velocities of the particle measured in the frames $S$ and $S'$. Consider the
    perspective from frame $S$. From equation \eqref{x-x-prime}, we have:
  </p>

  <EquationBlock label="ddt-x-S-ddt-x-prime-S">
    \left(\DD{\Vec{x}}{t}\right)_S = \left(\DD{\Vec{R}}{t}\right)_S +
    \left(\DD{\Vec{x}'}{t}\right)_S
  </EquationBlock>

  <p>
    But using equation \eqref{ddt-x-prime-S-ddt-x-prime-S-prime} on equation
    \eqref{ddt-x-S-ddt-x-prime-S}, we obtain:
  </p>

  <EquationBlock>
    \left(\DD{\Vec{x}}{t}\right)_S = \left(\DD{\Vec{R}}{t}\right)_S +
    \left(\DD{\Vec{x}'}{t}\right)_{S'} + \Vecg{\omega} \times \Vec{x}'
  </EquationBlock>

  <p>A better way to write the equation above is:</p>

  <EquationBlock boxed label="v-S-v-S-prime">
    \Vec{v}_S = \dot{\Vec{R}} + \Vec{v}_{S'} + \Vecg{\omega} \times \Vec{x}'
  </EquationBlock>

  <p>
    where $\Vec{v}_S$ is the velocity of the particle as measured in the
    inertial frame $S$, $\dot{\Vec{R}}$ is the velocity of the origin of $S'$
    with respect to $S$, $\Vec{v}_{S'}$ is the velocity of the particle as
    measured in the non-inertial frame $S'$, $\Vecg{\omega}$ is the
    (instantaneous) angular velocity of the axes of $S'$, and $\Vec{x}'$ is the
    position of the particle as measured in $S'$.
  </p>

  <p>
    We can now relate the accelerations of the particle as measured in the
    frames $S$ and $S'$. Consider again the perspective from frame $S$. From
    equation \eqref{v-S-v-S-prime}, we have:
  </p>

  <EquationBlock label="ddt-v-S-ddt-v-S-prime-1">
    \left(\DD{\Vec{v}_S}{t}\right)_S = \left(\DD{\dot{\Vec{R}}}{t}\right)_S +
    \left(\DD{\Vec{v}_{S'}}{t}\right)_S + \left(\DD{\Vecg{\omega}}{t}\right)_S
    \times \Vec{x}' + \Vecg{\omega} \times \left(\DD{\Vec{x}'}{t}\right)_S
  </EquationBlock>

  <p>
    Using equation \eqref{ddt-q-S-ddt-q-S-prime} with $\Vec{q}$ replaced by
    $\Vec{v}_{S'}$ and equation \eqref{ddt-x-prime-S-ddt-x-prime-S-prime} on
    equation \eqref{ddt-v-S-ddt-v-S-prime-1}, we get:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \left(\DD{\Vec{v}_S}{t}\right)_S = \left(\DD{\dot{\Vec{R}}}{t}\right)_S +
      \left(\DD{\Vec{v}_{S'}}{t}\right)_{S'}
    &+ \Vecg{\omega} \times \Vec{v}_{S'} + \left(\DD{\Vecg{\omega}}{t}\right)_S
        \times \Vec{x}' \\
    &+ \Vecg{\omega} \times \left[\left(\DD{\Vec{x}'}{t}\right)_{S'} +
        \Vecg{\omega} \times \Vec{x}'\right]
        \label{ddt-v-S-ddt-v-S-prime-2}
  </EquationBlock>

  <p>But since:</p>

  <EquationBlock>
    \Vec{v}_{S'} = \left(\DD{\Vec{x}'}{t}\right)_{S'}
  </EquationBlock>

  <p>
    equation \eqref{ddt-v-S-ddt-v-S-prime-2} can then be written in a simpler
    form:
  </p>

  <EquationBlock boxed label="a-S-a-S-prime">
    \Vec{a}_S = \ddot{\Vec{R}} + \Vec{a}_{S'} + \dot{\Vecg{\omega}} \times
    \Vec{x}' + \Vecg{\omega} \times (\Vecg{\omega} \times \Vec{x}') + 2
    \Vecg{\omega} \times \Vec{v}_{S'}
  </EquationBlock>

  <p>
    where $\Vec{a}_S$ is the acceleration of the particle as measured in the
    inertial frame $S$, $\ddot{\Vec{R}}$ is the acceleration of the origin of
    $S'$ with respect to $S$, $\dot{\Vecg{\omega}}$ is the (instantaneous)
    angular acceleration of the axes of $S'$, and $\Vec{a}_{S'}$ is the
    acceleration of the particle as measured in the non-inertial frame $S'$.
  </p>

  <p>
    Equation \eqref{a-S-a-S-prime} is very important as it allows us to compute
    effective forces on non-inertial frames of reference. Before we proceed,
    note that Newton's
    <a href="https://en.wikipedia.org/wiki/Newton's_laws_of_motion"
      >second law</a
    >
    of motion states that in an inertial frame of reference $S$, the net force
    $\Vec{F}_S$ acting on an object of constant mass $m$ satisfies:
  </p>

  <EquationBlock label="newtons-2nd-law">
    \Vec{F}_S = m \Vec{a}_S
  </EquationBlock>

  <p>
    Using equations \eqref{a-S-a-S-prime} and \eqref{newtons-2nd-law}, we can
    now define an "effective" force acting on the mass $m$ as measured in $S'$:
  </p>

  <EquationBlock label="F-effective-S-prime">
    \Vec{F}^{\textrm{eff}}_{S'} = m \Vec{a}_{S'} = \Vec{F}_S - m \ddot{\Vec{R}}
    - m \dot{\Vecg{\omega}} \times \Vec{x}' - m \Vecg{\omega} \times
    (\Vecg{\omega} \times \Vec{x}') - 2m \Vecg{\omega} \times \Vec{v}_{S'}
  </EquationBlock>

  <p>
    According to Newton's laws, the real force is the one experienced in the
    inertial frame $S$. Therefore, all the terms on the right-hand side of
    equation \eqref{F-effective-S-prime}, except for $\Vec{F}_S$, represent
    fictitious forces. These forces arise from formulating the equation in the
    form $\Vec{F}_{S'} = m \Vec{a}_{S'}$ for the non-inertial frame of reference
    $S'$. It's important to note that Newton's second law, $\Vec{F} = m\Vec{a}$,
    is valid only in inertial frames of reference.
  </p>

  <p>
    To conclude our study, let's analyze each of the fictitious forces in
    equation \eqref{F-effective-S-prime}:
  </p>

  <MapBlock>
    <span>$-m \ddot{\Vec{R}}$</span>
    <span>
      This force arises from the acceleration of $S'$ with respect to $S$.
    </span>

    <span>$-m \dot{\Vecg{\omega}} \times \Vec{x}'$</span>
    <span>
      This force manifests when the axes of $S'$ rotate non-uniformly as viewed
      from $S$. In other words, it can only be nonzero if the angular velocity
      $\Vecg{\omega}$ changes over time.
    </span>

    <span>$-m \Vecg{\omega} \times (\Vecg{\omega} \times \Vec{x}')$</span>
    <span>
      Often referred to as the
      <a href="https://en.wikipedia.org/wiki/Centrifugal_force"
        >centrifugal force</a
      >, this force always points outward from the axis of rotation of $S'$. Its
      magnitude is $m \omega^2 \rho$, where $\rho$ is the distance between the
      particle and the axis of rotation (see
      <FigureLink id="centrifugal-force" />).
    </span>

    <span>$-2m \Vecg{\omega} \times \Vec{v}_{S'}$</span>
    <span>
      Known as the
      <a href="https://en.wikipedia.org/wiki/Coriolis_effect">Coriolis force</a
      >, this force arises from the motion of the particle as measured in $S'$.
      It always points to the right of the direction in which the particle is
      traveling if $\Vecg{\omega}$ is taken as the "upward" direction (see
      <FigureLink id="coriolis-force" />).
    </span>
  </MapBlock>

  <FigureBlock
    id="centrifugal-force"
    caption="The centrifugal force. As illustrated, this force always points
             outward from the axis of rotation. The magnitude of the
             centrifugal force is $m \omega^2 \|\Vec{x}'\| \sin\phi =
             m \omega^2 \rho$, where $\rho = \|\Vec{x}'\| \sin\phi$ represents
             the distance between the axis of rotation and the particle."
  >
    <ResponsiveImage alt="Centrifugal force" :src="centrifugalForce" />
  </FigureBlock>

  <FigureBlock
    id="coriolis-force"
    caption="The Coriolis force. The velocity of the particle in the frame $S'$
             is $\Vec{v}_{S'} = \Vec{v}^{\small{\parallel}}_{S'} +
             \Vec{v}_{S'}^{\perp}$, where $\Vec{v}^{\small{\parallel}}_{S'}$
             and $\Vec{v}^{\perp}_{S'}$ are the components of $\Vec{v}_{S'}$
             that are parallel and orthogonal to $\Vecg{\omega}$, respectively.
             As $\Vecg{\omega} \times \Vec{v}^{\small{\parallel}}_{S'} =
             \Vec{0}$, the Coriolis force equates to $-2m \Vecg{\omega} \times
             \Vec{v}^{\perp}_{S'}$, which always points to the right of
             $\Vec{v}_{S'}$ when observed from a perspective where
             $\Vecg{\omega}$ points toward the observer."
  >
    <ResponsiveImage alt="Coriolis force" :src="coriolisForce" />
  </FigureBlock>

  <ReferenceListBlock>
    <ReferenceListBlockItem
      :authors="['Stephen T. Thornton', 'Jerry B. Marion']"
      title="Classical Dynamics of Particles and Systems"
      url="https://openlibrary.org/books/OL3696658M/Classical_dynamics_of_particles_and_systems"
    />
    <ReferenceListBlockItem
      :authors="['Herch M. Nussenzveig']"
      title="Curso de Física Básica - Vol. 1 (Mecânica)"
      url="https://www.blucher.com.br/curso-de-fisica-basica-vol-1_9788521207450"
    />
  </ReferenceListBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import centrifugalForce from "@/assets/images/centrifugal-force.svg";
import coriolisForce from "@/assets/images/coriolis-force.svg";
import nonInertialFrame from "@/assets/images/non-inertial-frame.svg";

onMounted(() => onViewMounted());
</script>
