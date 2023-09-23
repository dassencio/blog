<template>
  <p>
    In this post, we will investigate how the Earth's rotation affects the
    surface of its ocean. By "ocean", we refer to the
    <a href="https://en.wikipedia.org/wiki/World_Ocean">global ocean</a>
    of the Earth, i.e., the continuous body of water that encircles it. Our
    model will consist of a spherical Earth with radius $R$
    <a href="https://en.wikipedia.org/wiki/Earth%27s_rotation">rotating</a>
    at an angular velocity $\omega$ around a fixed axis.
  </p>

  <p>
    The most straightforward way to analyze this problem is by using a
    non-inertial frame of reference that rotates with the Earth and has its
    origin at the Earth's center. In this frame, the vertical axis $z'$ is
    aligned with the Earth's axis of rotation (see
    <FigureLink id="rotating-earth" />). As a result, the ocean appears
    stationary since it moves along with the Earth.
  </p>

  <FigureBlock
    id="rotating-earth"
    caption="Earth and the surface of its ocean. In reference frame $S$, the
             Earth rotates with angular velocity $\omega$ around the $z$
             axis. In the frame $S'$, the Earth appears at rest since $S'$ also
             rotates in relation to $S$ with angular velocity $\omega$. In
             other words, $S'$ is anchored to the Earth. The origins of both
             $S$ and $S'$ are at the Earth's center. The effect of the Earth's
             rotation on the surface of its ocean is greatly exaggerated in the
             figure."
  >
    <ResponsiveImage alt="Rotating Earth" :src="rotatingEarth" />
  </FigureBlock>

  <p>
    Let $S$ be a reference frame with its origin at the center of the Earth, in
    which the Earth is observed to rotate with angular velocity $\omega$. Let
    $S'$ be the frame that rotates with the Earth, as shown in
    <FigureLink id="rotating-earth" />. As proven in a
    <RouterLink :to="{ name: '56' }">previous post</RouterLink>, the following
    equation relates the force $\Vec{F}_S$ experienced by a fluid element with
    mass $m$ in frame $S$ to the effective force $\Vec{F}^{\textrm{eff}}_{S'}$
    experienced by the same fluid element in frame $S'$ (terms which trivially
    vanish have been omitted below):
  </p>

  <EquationBlock>
    \Vec{F}^{\textrm{eff}}_{S'} = m \Vec{a}_{S'} = \Vec{F}_S - m \Vecg{\omega}
    \times (\Vecg{\omega} \times \Vec{x}') = \Vec{F}_S + m \omega^2 \rho
    \Vecg{\hat \rho} \label{forces-S-prime}
  </EquationBlock>

  <p>
    Above, $\Vec{a}_{S'}$ and $\Vec{x}'$ represent the acceleration and position
    of the fluid element as measured in $S'$, respectively, $\Vecg{\omega} =
    \omega \Vec{\hat z}$ is the angular velocity of the Earth as observed in
    frame $S$, $\rho$ denotes the distance between the fluid element and the $z$
    (or $z'$) axis, and $\Vecg{\hat \rho}$ is the unit vector pointing radially
    outward from the $z$ (or $z'$) axis (see
    <FigureLink id="rotating-earth-forces" />).
  </p>

  <FigureBlock
    id="rotating-earth-forces"
    caption="Forces acting on a fluid element of mass $m$ as observed in $S'$.
             The figure displays a cross-section of the Earth passing through
             the $z$ (or $z'$) axis."
  >
    <ResponsiveImage
      alt="Forces acting on a fluid element at the Earth's surface"
      :src="rotatingEarthForces"
    />
  </FigureBlock>

  <p>
    The term $\Vec{F}_S$ represents the sum of the only two forces experienced
    in the non-rotating frame $S$: the gravitational force $m \Vec{g}$ and the
    force $\Vec{F}_{\textrm{fluid}}$ exerted on the fluid element by the
    surrounding fluid. Up to this point, we have not made any assumptions
    regarding the position of the fluid element within the ocean, so the
    equation below applies to any fluid element:
  </p>

  <EquationBlock>
    \Vec{F}_S = m \Vec{g} + \Vec{F}_{\textrm{fluid}} \label{forces-S}
  </EquationBlock>

  <p>
    Since in frame $S'$ the fluid element is at rest, its acceleration
    $\Vec{a}_{S'}$ is zero. Combining this observation with equations
    \eqref{forces-S-prime} and \eqref{forces-S} leads to the following result:
  </p>

  <EquationBlock>
    \Vec{0} = \Vec{F}_{\textrm{fluid}} + m \left(\Vec{g} - \Vecg{\omega} \times
    (\Vecg{\omega} \times \Vec{x}')\right) = \Vec{F}_{\textrm{fluid}} + m
    \left(\Vec{g} + \omega^2 \rho \Vecg{\hat \rho}\right)
    \label{acceleration-S-prime}
  </EquationBlock>

  <p>
    <FigureLink id="rotating-earth-forces" capitalized /> illustrates these
    forces. In equation \eqref{acceleration-S-prime}, the centrifugal
    acceleration term $\omega^2 \rho \Vecg{\hat \rho}$ can be interpreted as an
    additional gravity component which, when combined with the gravitational
    acceleration $\Vec{g}$, yields an effective gravitational acceleration that
    isn't uniform in space:
  </p>

  <EquationBlock>
    \Vec{g}^{\textrm{eff}} = \Vec{g} - \Vecg{\omega} \times (\Vecg{\omega}
    \times \Vec{x}') = \Vec{g} + \omega^2 \rho \Vecg{\hat \rho} = \Vec{g} +
    \omega^2 R \sin\theta \Vecg{\hat \rho} \label{effective-gravity-S-prime}
  </EquationBlock>

  <p>
    In the equation above, we used the approximation $\rho \approx R
    \sin\theta$, given that the ocean's surface is nearly aligned with the
    surface of the Earth. Above, $\theta$ represents the angle between the $z'$
    axis and a segment connecting the Earth's center to the fluid element.
  </p>

  <p>
    From this point forward, we will assume that the fluid element is located at
    the surface of the ocean. The key concept to grasp here is that the surface
    of the ocean is always locally orthogonal to the effective gravitational
    acceleration, with $\Vec{F}_{\textrm{fluid}}$ being the force that keeps the
    fluid element stationary in the rotating frame. To understand why this is
    so, consider a scenario with no rotation, i.e., $\omega = 0$. In this case,
    the frames $S$ and $S'$ coincide, and both frames observe the ocean to be
    stationary. According to equation \eqref{forces-S},
    $\Vec{F}_{\textrm{fluid}} = -m \Vec{g}$, meaning that
    $\Vec{F}_{\textrm{fluid}}$ perfectly counterbalances the gravitational force
    acting on the fluid element, preventing it from sinking. Under these
    conditions, the ocean's surface is spherical, and given that $\Vec{g}$
    always points to the center of the Earth, $\Vec{g}$ is orthogonal to the
    ocean's surface. However, when $\omega \neq 0$, the ocean's surface remains
    orthogonal to $\Vec{g}^{\textrm{eff}}$ at each point, i.e.,
    $\Vec{g}^{\textrm{eff}}$ now plays the role of $\Vec{g}$. Since
    $\Vec{g}^{\textrm{eff}}$ no longer always points to the Earth's center (see
    <FigureLink id="rotating-earth-accel-components" />), the ocean's surface is
    no longer spherical.
  </p>

  <p>
    To better understand how the surface of the ocean is shaped by
    $\Vec{g}^{\textrm{eff}}$, consider the poles of the Earth first. At those
    points, $\theta = 0$ and $\theta = \pi$, and $\Vec{g}^{\textrm{eff}}$ aligns
    with $\Vec{g}$, meaning the ocean's surface at these locations is orthogonal
    to $\Vec{g}$. On the equator, where $\theta = \pi / 2$,
    $\Vec{g}^{\textrm{eff}}$ is equal to $\Vec{g} + \omega^2 R \Vecg{\hat
    \rho}$. As both $\Vecg{\hat \rho}$ and $\Vec{g}$ are aligned,
    $\Vec{g}^{\textrm{eff}}$ still points to the Earth's center. However, the
    component $\omega^2 R \Vecg{\hat \rho}$ points in the opposite direction as
    $\Vec{g}$, reducing the magnitude of $\Vec{g}^{\textrm{eff}}$ at the equator
    compared to its maximum at the poles. At all other locations, $\Vec{g}$ and
    $\omega^2 R \sin\theta \Vecg{\hat \rho}$ are not aligned, resulting in the
    ocean's surface generally not being orthogonal to $\Vec{g}$.
  </p>

  <FigureBlock
    id="rotating-earth-accel-components"
    caption="Components of $\Vec{g}^{\textrm{eff}}$ for fluid elements at
             various points on the ocean's surface. Except at the poles and the
             equator, the ocean's surface isn't orthogonal to $\Vec{g}$."
  >
    <ResponsiveImage
      alt="Effective gravitational acceleration components."
      :src="rotatingEarthAccelComponents"
    />
  </FigureBlock>

  <p>
    It's important to note that our discussion on the ocean's surface assumed a
    perfectly rigid, spherical Earth. In reality, the centrifugal acceleration
    $\omega^2 \rho \Vecg{\hat \rho}$ molds the Earth into an
    <a href="https://en.wikipedia.org/wiki/Oblate_spheroid">oblate spheroid</a>
    shape, characterized by an
    <a href="https://en.wikipedia.org/wiki/Equatorial_bulge"
      >equatorial bulge</a
    >
    measuring about $43 \Kilometer$. This structural deformation impacts the
    ocean's shape as well. Additionally, the gravitational pull from the Sun and
    the Moon introduces significant shape variations in both the Earth and the
    ocean, attributable to the
    <a href="https://en.wikipedia.org/wiki/Tidal_force">tidal forces</a> they
    exert.
  </p>

  <p>
    For those intrigued, $\omega^2 R \approx 0.34 \Meter\Per\Second^2$.
    Consequently, Earth's rotation results in objects at the equator weighing
    about $\omega^2 R / g \approx 0.35 \%$ less than those at the poles,
    considering $g = 9.8 \Meter\Per\Second^2$. Due to the Earth's oblate
    spheroid shape, this weight difference is even further accentuated, as
    objects at the equator are positioned further from the Earth's center
    compared to those at the poles.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import rotatingEarth from "@/assets/images/rotating-earth.svg";
import rotatingEarthAccelComponents from "@/assets/images/rotating-earth-accel-components.svg";
import rotatingEarthForces from "@/assets/images/rotating-earth-forces.svg";

onMounted(() => onViewMounted());
</script>
