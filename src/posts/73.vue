<template>
  <p>
    Consider a uniform elastic band with rest length $L$ and mass $M$, as
    illustrated in
    <FigureLink id="elastic-band" subfigureId="arbitrary-configuration" />. The
    rest length $L$ is such that when the elastic band forms a circle with
    perimeter $L$ (i.e., a circle with radius $R = L/2\pi$), the elastic force
    at every point of the band is zero. In this rest configuration, each point
    of the band can be parameterized by its arc length $s$. To do this, we
    select a point on the band and designate it as $s = 0$, then assign
    increasing $s$ values to all other points on the band in a counterclockwise
    direction. Therefore, $s$ values fall within the range $[0, L)$, as depicted
    in <FigureLink id="elastic-band" subfigureId="rest-configuration" />.
  </p>

  <FigureBlock
    id="elastic-band"
    caption="An elastic band. Figure (a) displays the elastic band in an
             arbitrary configuration, represented by the function
             $\Vec{X}(s,t)$, along with the unit vector $\Vecg{\tau}(s,t)$
             tangent to the band at the point $\Vec{X}(s,t)$. Figure (b)
             indicates how the arc length value $s$ is defined for each point
             of the band in its rest configuration."
  >
    <BaseSubfigure id="arbitrary-configuration">
      <ResponsiveImage alt="Elastic band" :src="elasticBand" />
    </BaseSubfigure>
    <BaseSubfigure id="rest-configuration">
      <ResponsiveImage
        alt="Elastic band in its rest configuration"
        :src="elasticBandRestConfiguration"
      />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    As the elastic band moves, we can track the position of each of its points
    using the arc length value $s$ assigned in the rest (circular)
    configuration. Specifically, we can define the position of each point on the
    band with a function $\Vec{X}(s,t)$ that represents the location of the
    point with the assigned arc length value $s$ at time $t$ (see
    <FigureLink id="elastic-band" subfigureId="arbitrary-configuration" />).
  </p>

  <p>
    Our goal in this post is to determine the force per unit length, denoted as
    $\Vec{f}(s,t)$, at each point $\Vec{X}(s,t)$ for an arbitrary configuration
    of the elastic band. To achieve this, we initially model the band as a
    series of $n$ small masses (each with a mass of $M/n$) connected by
    identical springs. These springs have all the same elastic coefficient $k$
    and rest length $\Delta{s} = L/n$ (see
    <FigureLink id="elastic-band-as-springs" />). In what follows, we will refer
    to this model as the "discrete elastic band".
  </p>

  <FigureBlock
    id="elastic-band-as-springs"
    caption="A discrete elastic band, comprised of masses connected by springs."
  >
    <ResponsiveImage alt="Discrete elastic band" :src="elasticBandAsSprings" />
  </FigureBlock>

  <p>
    The force exerted on the mass situated at $\Vec{x}_i$ is the combined result
    of the elastic forces from the two springs attached to it. Let
    $\Delta\Vec{x}_i = \Vec{x}_{i+1} - \Vec{x}_i$ and define $\Vecg{\eta}_i$ as
    a unit vector aligned with $\Delta\Vec{x}_i$:
  </p>

  <EquationBlock>
    \Vecg{\eta}_i = \frac{\Vec{x}_{i+1} - \Vec{x}_i}{\|\Vec{x}_{i+1} -
    \Vec{x}_i\|} = \frac{\Delta\Vec{x}_i}{\|\Delta\Vec{x}_i\|}
  </EquationBlock>

  <p>
    Given the above definitions, the force acting on the mass at the position
    $\Vec{x}_i$ is:
  </p>

  <EquationBlock label="force-discrete-band">
    \Delta\Vec{F}_i = k \left(\|\Delta\Vec{x}_i\| - \Delta{s}\right)
    \Vecg{\eta}_i + k \left(\|\Delta\Vec{x}_{i-1}\| - \Delta{s}\right)
    (-\Vecg{\eta}_{i-1})
  </EquationBlock>

  <p>
    The negative sign before $\Vecg{\eta}_{i-1}$ in the second term is due to
    the fact that when the spring connecting $\Vec{x}_i$ and $\Vec{x}_{i-1}$
    stretches beyond its rest length $\Delta{s}$, the force on the mass at
    $\Vec{x}_i$ is directed toward the mass at $\Vec{x}_{i-1}$. In other words,
    it's parallel to $-\Vecg{\eta}_{i-1}$. To determine the force per unit
    length $\Vec{f}_i$ at $\Vec{x}_i$, we divide equation
    \eqref{force-discrete-band} by the band length $\Delta{L}_i$ associated with
    the mass at that position:
  </p>

  <EquationBlock label="delta-L">
    \Delta{L}_i = \frac{\|\Delta\Vec{x}_i\| + \|\Delta\Vec{x}_{i-1}\|}{2}
  </EquationBlock>

  <p>We then have:</p>

  <!-- prettier-ignore -->
  <EquationBlock align label="force-density-discrete-band">
    \Vec{f}_i &= \frac{\Delta\Vec{F}_i}{\Delta{L}_i} \\
              &= \frac{\Delta{s}}{\Delta{L}_i} \frac{\Delta\Vec{F}_i}{\Delta{s}} \\
              &= \frac{\Delta{s}}{\Delta{L}_i} k \left[
                 \left(\frac{\|\Delta\Vec{x}_i\|}{\Delta{s}} - 1\right)
                 \Vecg{\eta}_i - \left(\frac{\|\Delta\Vec{x}_{i-1}\|}{\Delta{s}}
                 - 1\right) \Vecg{\eta}_{i-1} \right] \\
              &= (k\Delta{s}) \frac{\Delta{s}}{\Delta{L}_i} \frac{1}{\Delta{s}}
                 \left[\left(\frac{\|\Delta\Vec{x}_i\|}{\Delta{s}} - 1\right)
                 \Vecg{\eta}_i - \left(\frac{\|\Delta\Vec{x}_{i-1}\|}{\Delta{s}}
                 - 1\right) \Vecg{\eta}_{i-1}\right]
  </EquationBlock>

  <p>
    As the number of masses $n$ in the discrete band increases (ensuring the
    total mass remains equal to $M$) the discrete force density $\Vec{f}_i$
    approaches the force density $\Vec{f}(s,t)$ we seek to compute. To determine
    $\Vec{f}(s,t)$, we need to examine each term in the last line of equation
    \eqref{force-density-discrete-band}, observing its behavior as $n
    \rightarrow \infty$. Given the elastic band is parameterized by the function
    $\Vec{X}(s,t)$, as described earlier, and as $\Delta{s} \rightarrow \Di{s}$
    when $n \rightarrow \infty$, we get:
  </p>

  <EquationBlock label="dx-ds-1">
    \frac{\|\Delta\Vec{x}_i\|}{\Delta{s}} = \left\|
    \frac{\Delta\Vec{x}_i}{\Delta{s}} \right\| \longrightarrow
    \left\|\PP{\Vec{X}}{s} \right\|
  </EquationBlock>

  <p>Similarly:</p>

  <EquationBlock label="dx-ds-2">
    \frac{\|\Delta\Vec{x}_{i-1}\|}{\Delta{s}} = \left\|
    \frac{\Delta\Vec{x}_{i-1}}{\Delta{s}} \right\| \longrightarrow
    \left\|\PP{\Vec{X}}{s}\right\|
  </EquationBlock>

  <p>
    Given the definition of $\Delta{L}_i$ in equation \eqref{delta-L}, and using
    equations \eqref{dx-ds-1} and \eqref{dx-ds-2}, we obtain:
  </p>

  <EquationBlock label="dL-ds">
    \frac{\Delta{L}_i}{\Delta{s}} = \frac{1}{2}
    \left(\frac{\|\Delta\Vec{x}_i\|}{\Delta{s}} +
    \frac{\|\Delta\Vec{x}_{i-1}\|}{\Delta{s}}\right) \longrightarrow
    \left\|\PP{\Vec{X}}{s}\right\|
  </EquationBlock>

  <p>Additionally, we have:</p>

  <EquationBlock>
    \Vecg{\eta}_i = \frac{\Delta\Vec{x}_i}{\|\Delta\Vec{x}_i\|} =
    \left(\frac{\Delta\Vec{x}_i}{\Delta{s}}\right) \Big/
    \left(\frac{\|\Delta\Vec{x}_i\|}{\Delta{s}}\right)
  </EquationBlock>

  <p>Consequently (and the same applies to $\Vecg{\eta}_{i-1}$):</p>

  <EquationBlock label="eta-converges">
    \Vecg{\eta}_i \longrightarrow \PP{\Vec{X}}{s} \Big/
    \left\|\PP{\Vec{X}}{s}\right\| = \Vecg{\tau}(s,t)
  </EquationBlock>

  <p>
    where $\Vecg{\tau}(s,t)$ is the unit vector tangent to the elastic band at
    the point $\Vec{X}(s,t)$, as depicted in
    <FigureLink id="elastic-band" subfigureId="arbitrary-configuration" />. By
    examining equations \eqref{dx-ds-1}, \eqref{dx-ds-2}, and
    \eqref{eta-converges}, we observe that the expression:
  </p>

  <EquationBlock>
    \frac{1}{\Delta{s}} \left[\left(\frac{\|\Delta\Vec{x}_i\|}{\Delta{s}} -
    1\right) \Vecg{\eta}_i - \left(\frac{\|\Delta\Vec{x}_{i-1}\|}{\Delta{s}} -
    1\right) \Vecg{\eta}_{i-1}\right]
  </EquationBlock>

  <p>approaches, as $n \rightarrow \infty$, the following:</p>

  <EquationBlock label="partial-term">
    \PPo{s}\left[ \left(\left\|\PP{\Vec{X}}{s}\right\| - 1\right)
    \Vecg{\tau}\right] = \PPo{s} \left[\left(\left\|\PP{\Vec{X}}{s}\right\| -
    1\right) \PP{\Vec{X}}{s} \Big/ \left\|\PP{\Vec{X}}{s}\right\|\right]
  </EquationBlock>

  <p>
    The final element to scrutinize is the elastic constant $k$. As $n
    \rightarrow \infty$, what value does it approach? Clues to this can be found
    in equation \eqref{force-density-discrete-band}. As every other term tends
    toward fixed quantities, the same must be true for the product $k\Delta{s}$.
    Physically speaking, since $k\Delta{s}$ is linked to the elasticity of the
    band, we must have $k\Delta{s} \rightarrow \kappa$, where $\kappa$ is a
    fixed constant. This implies that as $\Delta{s} \rightarrow 0$, $k$ should
    grow inversely proportional to $1/\Delta{s}$. Here, the constant $\kappa$
    embodies the elastic coefficient of the continuous elastic band. By
    combining this fact with equations \eqref{dL-ds} and \eqref{partial-term},
    we find that the force density $\Vec{f}(s,t)$ at point $\Vec{X}(s,t)$ on the
    elastic band is given by:
  </p>

  <EquationBlock boxed>
    \Vec{f}(s,t) = \PPo{s}(T\Vecg{\tau}) \Big/ \left\|\PP{\Vec{X}}{s}\right\|
  </EquationBlock>

  <p>
    where $T(s,t)$ represents the tension exerted on the elastic band at the
    point $\Vec{X}(s,t)$:
  </p>

  <EquationBlock boxed>
    T(s,t) = \kappa \left(\left\|\PP{\Vec{X}}{s}\right\| - 1\right)
  </EquationBlock>

  <p>
    To conclude, it's worth noting that our analysis did not make use of the
    assumption that the elastic band is a closed loop. As such, the results
    derived above are applicable to elastic fibers in general. Elastic fibers
    are very important in certain types of numerical simulations, particularly
    those involving fluid-structure interactions. As an example, the
    <a href="https://en.wikipedia.org/wiki/Immersed_boundary_method"
      >immersed boundary method</a
    >, which was developed by
    <a href="http://www.math.nyu.edu/faculty/peskin/">Prof. Charles S. Peskin</a
    >, employs elastic fibers as a technique to simulate blood flow within the
    human heart.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import elasticBand from "@/assets/images/elastic-band.svg";
import elasticBandAsSprings from "@/assets/images/elastic-band-as-springs.svg";
import elasticBandRestConfiguration from "@/assets/images/elastic-band-rest.svg";

onMounted(() => onViewMounted());
</script>
