<template>
  <p>
    Consider an object traveling along a circle of radius $r$ on the $(x,y)$
    plane with constant angular velocity $\omega$ as shown in
    <a href="#fig_1">figure 1</a>. The circle is centered at the origin $O$ of
    the plane.
  </p>

  <p>
    In a <RouterLink :to="{ name: '8' }">previous post</RouterLink>, this
    problem was studied from a purely
    <a href="https://en.wikipedia.org/wiki/Kinematics">kinematic</a>
    perspective. In other words, the cause of the motion was ignored. Here, we
    will go over this same problem from a purely
    <a href="https://en.wikipedia.org/wiki/Mechanics">mechanical</a>
    perspective, meaning the main goal will be to better understand the forces
    which cause the object to move along a circular path.
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

  <p>
    In the <RouterLink :to="{ name: '8' }">kinematic description</RouterLink>,
    we saw that when an object travels along a circle of radius $r$ with
    constant angular velocity $\omega$, the acceleration points always to the
    center of the circle. The magnitude $a$ of this acceleration is given by:
  </p>

  <EquationBlock> a = \omega^2 r = \frac{v^2}{r} </EquationBlock>

  <p>
    where $v = \omega r$ is the magnitude of the velocity. With ${\bf x}(t) =
    (x(t), y(t))$ being the position vector of the object at time $t$ (see
    <a href="#fig_1">figure 1</a>), the acceleration ${\bf a}(t)$ of the object
    satisfies:
  </p>

  <EquationBlock> {\bf a}(t) = -\omega^2 {\bf x}(t) </EquationBlock>

  <p>
    <a href="https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion"
      >Newton's second law of motion</a
    >
    states that the acceleration ${\bf a}(t)$ of a body and the
    <a href="https://en.wikipedia.org/wiki/Net_force">net force</a> ${\bf F}(t)$
    acting on that body at time $t$ are related through:
  </p>

  <EquationBlock> {\bf F}(t) = m{\bf a}(t) </EquationBlock>

  <p>
    where $m$ is the mass of the body. Therefore, for uniform circular motion,
    ${\bf F}(t)$ must also point to the center of the circle since it is
    parallel to ${\bf a}(t)$. This net force is called the
    <b>centripetal force</b>. It causes the object to always travel along the
    circle. For completeness, the magnitude of ${\bf F}(t)$ is given by:
  </p>

  <EquationBlock>
    F(t) = \|{\bf F}(t)\| = m\omega^2 r = \frac{mv^2}{r}
  </EquationBlock>

  <p>
    Let's now consider a situation where the above applies. Imagine you're
    washing your clothes in your washing machine, and that its interior is a
    cylindrical body of radius $r$ spinning very fast as shown in
    <a href="#fig_2">figure 2</a>. The clothes seem to be "compressed against"
    the walls of the washing machine, right?
  </p>

  <BaseFigure
    description='Washing machine spinning with constant angular velocity
                 $\omega$. There is no centrifugal force acting on each set of
                 clothes (shown in colors in the figure). Instead, the forces
                 which keep the clothes traveling along a circle point
                 to the center of the machine (these forces are labeled
                 ${\bf N}_r$, ${\bf N}_g$ and ${\bf N}_b$ in the figure, with
                 subscripts $r$, $g$ and $b$ standing for "red", "green" and
                 "blue" respectively).'
    :number="2"
  >
    <ResponsiveImage
      class="figure-2"
      alt="Spinning washing machine"
      :src="washingMachineForces"
    />
  </BaseFigure>

  <p>
    One could think "well, there is clearly some kind of centrifugal force
    pushing the clothes against the walls of the cylindrical body". However,
    based on what we learned above, this is incorrect. In fact, the force acting
    on each set of clothes must point to the center of the machine. But then,
    what is providing this force? It may sound odd, but the answer is: the walls
    of the washing machine. They provide a contact force, called the
    <a href="https://en.wikipedia.org/wiki/Normal_force">normal force</a>, which
    is always perpendicular to the contact surface. It is this contact force
    which acts as the centripetal force for each set of clothes. Gravity and
    friction with the walls are also present, but washing machines typically
    rotate so fast that these forces are negligible. To be precise, if $m_r$,
    $m_g$ and $m_b$ are the masses of the red, green and blue set of clothes
    respectively, then the normal forces acting on them are:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    N_r &= \|{\bf N}_r\| &&= \frac{m_r \omega^2 r}{r} \\
    N_g &= \|{\bf N}_g\| &&= \frac{m_g \omega^2 r}{r} \\
    N_b &= \|{\bf N}_b\| &&= \frac{m_b \omega^2 r}{r}
  </EquationBlock>

  <p>
    This type of contact force is what prevents you from falling through your
    chair or from sinking into the ground towards the center of the Earth due
    the gravitational force which constantly pulls you down. Microscopically,
    this force is the result of the repulsive electromagnetic forces which
    prevent atoms from overlapping. In our example, the normal forces prevent
    the clothes from going through the machine walls.
  </p>

  <p>
    Another interesting example is a car making a turn. Consider, for instance,
    a car traveling along a circular arc of radius $r$ with constant speed $v$
    as shown in
    <a href="#fig_3">figure 3</a>. The net force acting on the car must point to
    the center of the circle which contains the arc the car is traveling on. But
    where is this force coming from? From the friction with the ground! The
    friction forces between the tires and the ground point to the left of the
    car, towards the center of the circle, and when summed, yield the
    centripetal force ${\bf F}_{\textrm{cp}}$ ("cp" here stands for
    "centripetal") which keeps the car on the arc. This is the reason why icy
    roads are very dangerous: the tires do not properly adhere to the ground and
    therefore the friction forces are not strong enough to act as the
    centripetal force the car needs to remain on the road.
  </p>

  <BaseFigure
    description="Car traveling along a circular arc. Figure (a) shows the
                 net force ${\bf F}_{\textrm{cp}}$ acting on the car (the
                 centripetal force). Figure (b) shows friction forces acting on
                 the tires of the car, the sum of which yield the centripetal
                 force ${\bf F}_{\textrm{cp}}$."
    :number="3"
  >
    <BaseSubfigure label="(a)">
      <ResponsiveImage
        class="figure-3a"
        alt="Car traveling along a circular arc"
        :src="carTravelingAlongArc"
      />
    </BaseSubfigure>
    <BaseSubfigure label="(b)">
      <ResponsiveImage
        class="figure-3b"
        alt="Friction forces on car tires"
        :src="carFrictionForces"
      />
    </BaseSubfigure>
  </BaseFigure>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import mathjax from "@/mathjax";
import carFrictionForces from "@/assets/images/car-back-friction-forces.svg";
import carTravelingAlongArc from "@/assets/images/car-traveling-along-arc.svg";
import circularMotion from "@/assets/images/circular-motion.svg";
import washingMachineForces from "@/assets/images/washing-machine-forces.svg";

onMounted(() => {
  mathjax.render();
});
</script>

<style scoped lang="scss">
.figure-1 {
  height: 18.75 * $base-length;
}
.figure-2 {
  height: 16 * $base-length;
}
.figure-3a {
  height: 16 * $base-length;
  padding: 0 $base-length;
}
.figure-3b {
  height: 11.25 * $base-length;
  padding: 0 $base-length;
}
</style>
