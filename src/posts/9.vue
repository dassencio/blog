<template>
  <p>
    Consider an object traveling along a circle in the $(x,y)$ plane with radius
    $r$, as shown in <FigureLink id="circular-motion" />. The circle is centered
    at the origin $O$ of the plane, and the object is moving with a constant
    angular velocity $\omega$.
  </p>

  <p>
    In a <RouterLink :to="{ name: '8' }">previous post</RouterLink>, this
    problem was studied from a purely
    <a href="https://en.wikipedia.org/wiki/Kinematics">kinematic</a>
    perspective. In other words, the cause of the motion was ignored. In this
    post, we will examine the same problem from a purely
    <a href="https://en.wikipedia.org/wiki/Mechanics">mechanical</a>
    perspective, meaning that the main goal will be to better understand the
    forces that cause the object to move along a circular path.
  </p>

  <FigureBlock
    id="circular-motion"
    caption="An object traveling along a circle with radius $r$ at a constant
             angular velocity $\omega$."
  >
    <ResponsiveImage alt="Circular motion" :src="circularMotion" />
  </FigureBlock>

  <p>
    In the <RouterLink :to="{ name: '8' }">kinematic description</RouterLink>,
    we discovered that the acceleration $\Vec{a}(t)$ of the object always points
    toward the center of the circle. The magnitude $a$ of this acceleration is
    given by:
  </p>

  <EquationBlock> a = \omega^2 r = \frac{v^2}{r} </EquationBlock>

  <p>
    where $v = \omega r$ represents the magnitude of the velocity. With
    $\Vec{x}(t) = (x(t), y(t))$ being the position vector of the object at time
    $t$ (see <FigureLink id="circular-motion" />), we have:
  </p>

  <EquationBlock> \Vec{a}(t) = -\omega^2 \Vec{x}(t) </EquationBlock>

  <p>
    <a href="https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion"
      >Newton's second law of motion</a
    >
    states that the acceleration $\Vec{a}(t)$ of a body and the
    <a href="https://en.wikipedia.org/wiki/Net_force">net force</a>
    $\Vec{F}(t)$ acting on that body at time $t$ are related through:
  </p>

  <EquationBlock> \Vec{F}(t) = m\Vec{a}(t) </EquationBlock>

  <p>
    where $m$ is the mass of the body. Therefore, in uniform circular motion,
    $\Vec{F}(t)$ must also point toward the center of the circle, as it's
    parallel to $\Vec{a}(t)$. This net force is referred to as the
    <b>centripetal force</b>. It's responsible for causing the object to
    continuously travel along the circle. For completeness, the magnitude of
    $\Vec{F}(t)$ is given by:
  </p>

  <EquationBlock>
    F(t) = \|\Vec{F}(t)\| = m\omega^2 r = \frac{mv^2}{r}
  </EquationBlock>

  <p>
    Let's now consider a situation to which the above concept applies. Imagine
    you're washing your clothes in your washing machine, and the interior of the
    machine is a cylindrical body with radius $r$, spinning at a high speed as
    shown in
    <FigureLink id="washing-machine" />. You may notice that the clothes appear
    to be "pressed against" the walls of the washing machine, right?
  </p>

  <FigureBlock
    id="washing-machine"
    caption='A washing machine spinning with a constant angular velocity
             $\omega$. There is no centrifugal force acting on each set of
             clothes (shown in different colors in the figure). Instead, the
             forces keeping the clothes traveling along a circular path point
             toward the center of the machine (these forces are labeled
             $\Vec{N}_r$, $\Vec{N}_g$, and $\Vec{N}_b$ in the figure, with
             subscripts $r$, $g$, and $b$ standing for "red", "green",
             and "blue", respectively).'
  >
    <ResponsiveImage
      alt="Spinning washing machine"
      :src="washingMachineForces"
    />
  </FigureBlock>

  <p>
    One might think, "Well, there is clearly some kind of centrifugal force
    pushing the clothes against the walls of the cylindrical body". However,
    based on what we have learned above, this is not the case. In reality, the
    force acting on each set of clothes must point toward the center of the
    machine. So, what is generating this force? It may sound counterintuitive,
    but the answer is: the walls of the washing machine. They provide a contact
    force, known as the
    <a href="https://en.wikipedia.org/wiki/Normal_force">normal force</a>, which
    is always perpendicular to the contact surface. This contact force acts as
    the centripetal force for each set of clothes. Gravity and friction with the
    walls are also present, but washing machines typically rotate so rapidly
    that these forces are negligible. If $m_r$, $m_g$, and $m_b$ are the masses
    of the red, green, and blue sets of clothes, respectively, then the normal
    forces acting on them are:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    N_r &= \|\Vec{N}_r\| &&= m_r \omega^2 r \\
    N_g &= \|\Vec{N}_g\| &&= m_g \omega^2 r \\
    N_b &= \|\Vec{N}_b\| &&= m_b \omega^2 r
  </EquationBlock>

  <p>
    This type of contact force is what prevents you from falling through your
    chair or from sinking into the ground toward the center of the Earth due to
    the gravitational force that constantly pulls you downward. Microscopically,
    this force is the result of the repulsive electromagnetic forces that
    prevent atoms from overlapping. In our example, the normal forces prevent
    the clothes from passing through the walls of the machine.
  </p>

  <p>
    Another interesting example involves a car making a turn. Consider, for
    instance, a car traveling along a circular arc with radius $r$ at a constant
    speed $v$, as shown in
    <FigureLink id="car-on-circular-arc" />. The net force acting on the car
    must point toward the center of the circle that contains the arc on which
    the car is traveling. But where does this force come from? It comes from the
    friction between the tires and the ground! The frictional forces between the
    tires and the ground are directed to the left of the car, toward the center
    of the circle, and when summed, they yield the centripetal force
    $\Vec{F}_{\textrm{cp}}$ (where "cp" stands for "centripetal") that keeps the
    car on the arc. This is why icy roads are very dangerous: the tires do not
    adhere properly to the ground, and therefore the frictional forces are not
    strong enough to provide the centripetal force needed for the car to stay on
    the road.
  </p>

  <FigureBlock
    id="car-on-circular-arc"
    caption="A car traveling along a circular arc. Figure (a) shows the net force
             $\Vec{F}_{\textrm{cp}}$ acting on the car (the centripetal force).
             Figure (b) shows the frictional forces acting on the tires of the
             car, the sum of which yields the centripetal force
             $\Vec{F}_{\textrm{cp}}$."
  >
    <BaseSubfigure>
      <ResponsiveImage
        alt="Car traveling along a circular arc"
        :src="carTravelingAlongArc"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Frictional forces on car tires"
        :src="carFrictionForces"
      />
    </BaseSubfigure>
  </FigureBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import carFrictionForces from "@/assets/images/car-back-friction-forces.svg";
import carTravelingAlongArc from "@/assets/images/car-traveling-along-arc.svg";
import circularMotion from "@/assets/images/circular-motion.svg";
import washingMachineForces from "@/assets/images/washing-machine-forces.svg";

onMounted(() => onViewMounted());
</script>
