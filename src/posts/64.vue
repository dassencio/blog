<template>
  <p>
    Consider a bucket holding a viscous, homogeneous, and incompressible fluid,
    such as water. The bucket begins to rotate with constant angular frequency
    $\omega$ around a vertical axis that passes through the center of its bottom
    surface (see <FigureLink id="rotating-bucket" />). The friction between the
    fluid and the bucket's walls causes the fluid to eventually rotate at the
    same angular frequency $\omega$. This post answers the following question:
    what shape does the fluid surface take at this point?
  </p>

  <p>
    One way to solve this problem is by using a non-inertial frame of reference
    that rotates with the bucket. The vertical axis $z'$ of this rotating frame
    is chosen to be the axis of rotation of the bucket, as shown in
    <FigureLink id="rotating-bucket" />. At the point where the fluid is
    rotating with the bucket at angular frequency $\omega$, the fluid appears to
    be at rest in this rotating frame.
  </p>

  <FigureBlock
    id="rotating-bucket"
    caption="A rotating bucket holding a viscous, homogeneous, and
             incompressible fluid. The reference frame $S$ observes the bucket
             rotating with angular frequency $\omega$ around the $z$ axis. In
             the frame $S'$, the bucket appears at rest since $S'$ is also
             rotating with respect to $S$ at angular frequency $\omega$."
  >
    <ResponsiveImage alt="Rotating bucket" :src="rotatingBucket" />
  </FigureBlock>

  <p>
    Let $S$ be a reference frame in which the bucket is rotating, and $S'$ be a
    frame that rotates along with the bucket, as shown in
    <FigureLink id="rotating-bucket" />. As proven in a
    <RouterLink :to="{ name: '56' }">previous post</RouterLink>, the following
    equation relates the force $\Vec{F}_S$ experienced by a fluid element of
    mass $m$ in $S$, and the effective force $\Vec{F}^{\textrm{eff}}_{S'}$
    experienced by this same fluid element in $S'$ (terms that trivially vanish
    were omitted below):
  </p>

  <EquationBlock>
    \Vec{F}^{\textrm{eff}}_{S'} = m \Vec{a}_{S'} = \Vec{F}_S - m \Vecg{\omega}
    \times (\Vecg{\omega} \times \Vec{x}') = \Vec{F}_S + m \omega^2 \rho
    \hat{\Vecg{\rho}} \label{F-eff-S-prime}
  </EquationBlock>

  <p>
    where $\Vec{a}_{S'}$ and $\Vec{x}'$ are the acceleration and position of the
    fluid element as measured in $S'$ respectively, $\Vecg{\omega} = \omega
    \hat{\Vec{z}}$ is the angular velocity of the bucket as measured in $S$,
    $\rho$ is the distance between the fluid element and the $z$ (or $z'$) axis,
    and $\hat{\Vecg{\rho}}$ is the unit vector that points radially outwards
    from the $z$ axis (see <FigureLink id="rotating-bucket-forces" />).
  </p>

  <FigureBlock
    id="rotating-bucket-forces"
    caption="Forces acting on a fluid element of mass $m$ at the surface of the
             fluid (assumed to be already rotating with the bucket). The figure
             shows a cross-section of the bucket that passes through the $z$
             axis."
  >
    <ResponsiveImage
      alt="Forces acting on fluid element at the surface"
      :src="rotatingBucketForces"
    />
  </FigureBlock>

  <p>
    The term $\Vec{F}_S$ is the sum of the only two forces experienced in the
    non-rotating frame $S$: the gravitational force and the force exerted on the
    fluid element by the surrounding fluid. Until now, we haven't made any
    assumptions about the location of the fluid element. As such, the following
    equation applies to any fluid element:
  </p>

  <EquationBlock>
    \Vec{F}_S = m \Vec{g} + \Vec{F}_{\textrm{fluid}} \label{F-S}
  </EquationBlock>

  <p>
    Since the fluid is at rest in $S'$, $\Vec{a}_{S'} = \Vec{0}$. This fact,
    along with equations \eqref{F-eff-S-prime} and \eqref{F-S}, yields the
    following:
  </p>

  <EquationBlock>
    \Vec{0} = \Vec{F}_{\textrm{fluid}} + m \left(\Vec{g} - \Vecg{\omega} \times
    (\Vecg{\omega} \times \Vec{x}')\right) \Longrightarrow
    \Vec{F}_{\textrm{fluid}} = -m \left(\Vec{g} + \omega^2 \rho
    \hat{\Vecg{\rho}}\right) \label{acceleration}
  </EquationBlock>

  <p>
    <FigureLink id="rotating-bucket-forces" capitalized /> illustrates these
    three forces. In equation \eqref{acceleration}, the centrifugal acceleration
    term $\omega^2 \rho \hat{\Vecg{\rho}}$ can be interpreted as an additional
    gravity component. When combined with the gravitational acceleration
    $\Vec{g}$, it yields an effective gravitational acceleration that isn't
    uniform in space:
  </p>

  <EquationBlock>
    \Vec{g}^{\textrm{eff}} = \Vec{g} - \Vecg{\omega} \times (\Vecg{\omega}
    \times \Vec{x}') = \Vec{g} + \omega^2 \rho \hat{\Vecg{\rho}}
    \label{effective-gravity}
  </EquationBlock>

  <p>
    From this point forward, we will assume that the fluid element is located at
    the surface of the fluid. The key concept to grasp here is that the surface
    of the fluid is always locally orthogonal to the effective gravitational
    acceleration acting on the fluid element, with $\Vec{F}_{\textrm{fluid}}$
    being the force that keeps the fluid element stationary in the rotating
    frame. To understand why this is so, consider a scenario with no rotation,
    i.e., $\Vecg{\omega} = \Vec{0}$. In this case, the frames $S$ and $S'$
    coincide, and the fluid is stationary in both frames. According to equation
    \eqref{acceleration}, $\Vec{F}_{\textrm{fluid}} = -m \Vec{g}$, meaning that
    $\Vec{F}_{\textrm{fluid}}$ perfectly counterbalances the gravitational force
    acting on the fluid element, preventing it from sinking. As the fluid
    surface is flat under these conditions, $\Vec{g}$ is orthogonal to it. Once
    the fluid starts rotating, $\Vec{g}^{\textrm{eff}}$ plays the role of
    $\Vec{g}$, and the fluid surface remains orthogonal to it at each point.
    Since $\Vec{g}^{\textrm{eff}}$ is no longer constant in space, the fluid
    surface is no longer flat.
  </p>

  <p>
    As illustrated in <FigureLink id="rotating-bucket-forces" />, the height
    $h(\rho)$ of a point at the surface of the fluid depends only on the
    distance between this point and the $z$ axis, due to the cylindrical
    symmetry of $\Vec{g}^{\textrm{eff}}$. Indeed, along any radial line that
    passes through the $z$ axis, $\DDi{h}{\rho}$ is the tangent to the curve
    $h(\rho)$ at a point that is at a distance $\rho$ from the $z$ axis:
  </p>

  <EquationBlock>
    \tan\phi = \DD{h}{\rho} = \frac{m \omega^2 \rho}{mg} = \frac{\omega^2
    \rho}{g} \Longrightarrow \DD{h}{\rho} = \frac{\omega^2 \rho}{g}
  </EquationBlock>

  <p>
    By integrating both sides of this equation, we can determine the explicit
    form of $h(\rho)$:
  </p>

  <EquationBlock boxed>
    h(\rho) = h(0) + \frac{\omega^2 \rho^2}{2g} \label{surface-height}
  </EquationBlock>

  <p>
    where $h(0)$ represents the height of the fluid at $\rho = 0$, i.e., at the
    surface fluid element directly at the rotation axis. Equation
    \eqref{surface-height} reveals the shape of the fluid surface: it's a
    <a href="https://en.wikipedia.org/wiki/Paraboloid">circular paraboloid</a>
    with its vertex at the rotation axis.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import rotatingBucket from "@/assets/images/rotating-bucket.svg";
import rotatingBucketForces from "@/assets/images/rotating-bucket-forces.svg";

onMounted(() => onViewMounted());
</script>
