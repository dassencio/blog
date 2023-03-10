<template>
  <p>
    In this post, I will compute how much time a given amount of an
    incompressible fluid (e.g. water) takes to go through a
    <a href="https://en.wikipedia.org/wiki/Funnel">funnel</a>. The fluid
    viscosity is assumed low enough to be negligible (i.e., the flow will be
    treated as
    <a href="https://en.wikipedia.org/wiki/Inviscid_flow">inviscid</a>), and
    certain assumptions about the shape of the funnel will also be made to make
    the problem solvable analytically, leading to results which will not be
    valid in general but still accurate in a broad range of scenarios.
  </p>

  <p>
    The funnel is assumed to have the shape of an "upside down" cone whose tip
    has been cut off (see
    <FigureLink id="funnel" />), plus a short neck whose diameter is small
    compared to the funnel's mouth. The funnel is initially completely filled
    with fluid.
  </p>

  <FigureBlock
    id="funnel"
    caption="A funnel with conical shape. The funnel has mouth radius $b$ and
             neck radius $a \ll b$. The initial fluid height is $h_0$, which is
             the height of the funnel itself. At time $t$, the height of the
             fluid is $h(t)$ and the radius of the fluid's top surface is
             $r(t)$."
  >
    <ResponsiveImage alt="Funnel" :src="fluidFunnel" />
  </FigureBlock>

  <p>
    As the fluid starts flowing through the funnel, its top surface will move
    down slowly. This will remain true for as long as $h(t)$ is not small
    compared to $h_0$, but since $h(t)$ becomes small only towards the very end
    of the flow, we can safely ignore the downward motion of the fluid's top
    surface throughout the entire duration of the flow and solve the problem in
    the same way as is done for an orifice in a large tank.
  </p>

  <p>
    Consider points $A$ and $B$ in
    <FigureLink id="funnel" />, both of which are assumed to be on the same flow
    streamline (the dashed line). Using
    <a href="https://en.wikipedia.org/wiki/Bernoulli%27s_principle"
      >Bernoulli's equation</a
    >, we can write:
  </p>

  <EquationBlock>
    \frac{v_A^2(t)}{2} + \frac{p_A}{\rho} + gh_A(t) = \frac{v_B^2(t)}{2} +
    \frac{p_B}{\rho} + gh_B(t) \label{bernoulli}
  </EquationBlock>

  <p>
    where $\rho$ is the density of the fluid, $v_A(t)$ is the fluid speed at
    $A$, $p_A$ is the pressure at $A$ and $h_A(t)$ is the height of point $A$
    (quantities associated with $B$ are equivalently defined). Since both points
    $A$ and $B$ are in direct contact with the surrounding air, $p_A = p_B =
    p_0$, where $p_0$ is the atmospheric pressure. Also, setting $h_B(t) = 0$
    gives us $h_A(t) = h(t)$. Finally, since the fluid's top surface moves down
    slowly, we can take $v_A(t) \approx 0$. Equation \eqref{bernoulli} then
    becomes:
  </p>

  <EquationBlock>
    \frac{p_0}{\rho} + gh(t) = \frac{v_B^2(t)}{2} + \frac{p_0}{\rho}
  </EquationBlock>

  <p>and therefore:</p>

  <EquationBlock> v_B(t) = \sqrt{2gh(t)} \label{flow-speed} </EquationBlock>

  <p>
    so the fluid comes out of the funnel with speed $v(t) = v_B(t) =
    \sqrt{2gh(t)}$.
  </p>

  <p>
    Let's now obtain a relation between $r(t)$ and $h(t)$. Since we assume $a$
    to be small ($a \ll r(t)$ and $a \ll b$), the cross section of the cone
    shown in <FigureLink id="funnel" /> can be treated as a triangle:
  </p>

  <EquationBlock>
    \frac{r(t)}{h(t)} = \frac{b}{h_0} \Longrightarrow r(t) = h(t)\frac{b}{h_0}
  </EquationBlock>

  <p>
    Using the same reasoning, we can treat the funnel as a cone and obtain the
    fluid volume $V(t)$ it holds at time $t$ as follows:
  </p>

  <EquationBlock>
    V(t) = \frac{1}{3}\pi r^2(t) h(t) =
    \frac{\pi}{3}\left(\frac{b}{h_0}\right)^2h^3(t) \label{volume}
  </EquationBlock>

  <p>
    As $h(t) \rightarrow 0$, $r(t) \rightarrow a$ and equation \eqref{volume}
    will no longer be an accurate approximation of the actual fluid volume in
    the funnel. The small amount of remaining fluid at that time will however
    leave the funnel quickly enough to have little influence on the overall time
    taken by the entire fluid volume to go through it, which is the quantity we
    ultimately care about. In light of that, we will use equation \eqref{volume}
    to express the fluid volume at all times.
  </p>

  <p>
    From equation \eqref{flow-speed}, the volumetric rate at which the fluid
    flows out of the funnel is equal to:
  </p>

  <EquationBlock>
    \Phi(t) = A v(t) = (\pi a^2) v(t) = \pi a^2 \sqrt{2gh(t)} \label{flow-rate}
  </EquationBlock>

  <p>
    where $A = \pi a^2$ is the cross-sectional area of the funnel's neck. Since
    this flow rate is the rate at which the fluid volume in the funnel
    decreases, we have:
  </p>

  <EquationBlock>
    \dot{V}(t) = -\Phi(t) \label{volume-derivative}
  </EquationBlock>

  <p>But from equation \eqref{volume}, we have that:</p>

  <EquationBlock>
    \dot{V}(t) = \frac{\pi}{3}\left(\frac{b}{h_0}\right)^2 3 h^2(t) \dot{h}(t) =
    \pi\left(\frac{b}{h_0}\right)^2 h^2(t) \dot{h}(t)
  </EquationBlock>

  <p>
    Inserting this into equation \eqref{volume-derivative} and using equation
    \eqref{flow-rate}, we get:
  </p>

  <EquationBlock>
    \pi\left(\frac{b}{h_0}\right)^2 h^2(t) \dot{h}(t) = -\pi a^2 \sqrt{2gh(t)}
  </EquationBlock>

  <p>Cancelling common terms on both sides of this equation yields:</p>

  <EquationBlock>
    \left(\frac{b}{h_0}\right)^2 h^{3/2}(t) \dot{h}(t) = -a^2 \sqrt{2g}
    \label{fluid-height-derivative}
  </EquationBlock>

  <p>Since:</p>

  <EquationBlock>
    h^{3/2}(t) \dot{h}(t) = \frac{2}{5}\frac{d}{dt}h^{5/2}(t)
  </EquationBlock>

  <p>then equation \eqref{fluid-height-derivative} can be rewritten as:</p>

  <EquationBlock>
    \frac{d}{dt}h^{5/2}(t) = -\frac{5}{2} \left(\frac{h_0}{b}\right)^2 a^2
    \sqrt{2g}
  </EquationBlock>

  <p>Integrating both sides with respect to time yields:</p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{t'=0}^{t'=t} \frac{d}{dt'}h^{5/2}(t')dt' &=
      -\int_{t'=0}^{t'=t} \frac{5}{2} \left(\frac{h_0}{b}\right)^2 a^2 \sqrt{2g} dt' \\
    h^{5/2}(t)\bigg|_{t'=0}^{t'=t} &=
      -\frac{5}{2} \left(\frac{h_0}{b}\right)^2 a^2 \sqrt{2g} t \\
    h^{5/2}(t) - h_0^{5/2} &=
      -\frac{5}{2}\left(\frac{h_0}{b}\right)^2 a^2 \sqrt{2g} t
  </EquationBlock>

  <p>This gives us an expression for the fluid height $h(t)$:</p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    h(t) &= \left[h_0^{5/2} - \frac{5}{2}\left(\frac{h_0}{b}\right)^2 a^2 \sqrt{2g} t \right]^{2/5} \\
         &= h_0 \left[1 - \frac{5}{2} \frac{1}{\sqrt{h_0}b^2} a^2 \sqrt{2g} t \right]^{2/5}
  </EquationBlock>

  <p>A bit more algebraic manipulation yields:</p>

  <EquationBlock>
    h(t) = h_0\left[ 1 - \frac{5}{2} \left(\frac{a}{b}\right)^2
    \sqrt{\frac{2g}{h_0}} t \right]^{2/5} \label{fluid-height}
  </EquationBlock>

  <p>
    The time $T$ taken by the entire fluid volume to go through the funnel is
    such that $h(T) = 0$, which implies:
  </p>

  <EquationBlock>
    1 - \frac{5}{2} \left(\frac{a}{b}\right)^2 \sqrt{\frac{2g}{h_0}} T = 0
  </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock boxed>
    T = \frac{2}{5} \left(\frac{b}{a}\right)^2 \sqrt{\frac{h_0}{2g}}
    \label{flow-time}
  </EquationBlock>

  <p>
    Equation \eqref{flow-time} can be used to write equation
    \eqref{fluid-height} in a simpler form:
  </p>

  <EquationBlock> h(t) = h_0\left(1 - \frac{t}{T} \right)^{2/5} </EquationBlock>

  <p>
    <FigureLink id="fluid-height" capitalized /> shows a graph of $h(t)/h_0$
    versus $t / T$.
  </p>

  <FigureBlock id="fluid-height" caption="Fluid height $h(t)/h_0$ vs. $t/T$.">
    <FlotChart class="fluid-height-graph" :data="data" :options="options" />
  </FigureBlock>

  <p>
    As the graph on <FigureLink id="fluid-height" /> shows, the fluid's top
    surface moves down slowly until about $t \approx 0.95T$, at which point
    $h(t)$ starts decreasing quickly. From there on, some of our assumptions
    about the nature of the flow will no longer be accurate, but as mentioned
    above, this will not cause a substantial deviation from our computed
    estimate of $T$.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import fluidFunnel from "@/assets/images/fluid-funnel.svg";

onMounted(() => onViewMounted());

const N = 500;
const dx = 1.0 / N;
const points = [];

for (let n = 0; n <= N; ++n) {
  points.push([n * dx, Math.pow(1 - n * dx, 0.4)]);
}

const data = [{ data: points }];

const options = {
  legend: {
    position: "ne",
  },
  xaxis: {
    axisLabel: "$t/T$",
    max: 1.025,
    min: 0.0,
    ticks: 10,
  },
  yaxis: {
    axisLabel: "$h(t)/h_0$",
    max: 1.05,
    min: 0.0,
    ticks: 4,
  },
};
</script>

<style scoped lang="scss">
.fluid-height-graph {
  height: 20 * $base-length;
  width: 35 * $base-length;
}
</style>
