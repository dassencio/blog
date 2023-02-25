<template>
  <p>
    In this post, I will compute how much time a given amount of fluid (e.g.
    water) takes to go through a
    <a href="https://en.wikipedia.org/wiki/Funnel">funnel</a>. Certain
    assumptions about the funnel will be made to make the problem tractable, but
    while the obtained result will not be valid in general, it will still be a
    good approximation in a broad range of scenarios.
  </p>

  <p>
    The funnel is shaped like an "upside down" cone whose tip has been cut (see
    <FigureLink :figureNumber="1">Figure 1</FigureLink>), plus a short neck with
    a much smaller diameter than the funnel's mouth. The funnel is initially
    completely filled with an incompressible fluid, and the flow is assumed to
    be <a href="https://en.wikipedia.org/wiki/Inviscid_flow">inviscid</a>, i.e.,
    we will treat the fluid as having zero viscosity.
  </p>

  <FigureBlock
    :figureNumber="1"
    caption="A funnel with conical shape. The funnel has mouth radius $b$ and
             neck radius $a$. The initial fluid height is $h_0$, which is the
             height of the funnel itself. At time $t$, the height of the fluid
             is $h(t)$ and the radius of the fluid's surface is $r(t)$."
  >
    <ResponsiveImage alt="Funnel" :src="fluidFunnel" />
  </FigureBlock>

  <p>
    As the fluid flows through the funnel, its top surface will move down very
    slowly. This will remain valid for as long as $h(t)$ is not too small, but
    will no longer be true as $h(t) \rightarrow 0$. Nonetheless, since $h(t)$
    becomes small only towards the end of the flow, we will assume its top
    surface moves down slowly for the entire duration of the flow. This will
    make the problem solvable in the same way as is done for the "orifice in a
    large tank" problem, with the neck opening playing the role of the orifice.
  </p>

  <p>
    Consider points $A$ and $B$ in
    <FigureLink :figureNumber="1">figure 1</FigureLink>, both of which are
    assumed to be on the same flow streamline (the dashed line). Using
    <a href="https://en.wikipedia.org/wiki/Bernoulli%27s_principle"
      >Bernoulli's equation</a
    >, we can write:
  </p>

  <EquationBlock>
    \frac{v_A^2(t)}{2} + \frac{p_A}{\rho} + gh_A(t) = \frac{v_B^2(t)}{2} +
    \frac{p_B}{\rho} + gh_B(t) \label{eq_bern}
  </EquationBlock>

  <p>
    where $\rho$ is the density of the fluid, $v_A(t)$ is the fluid speed at
    $A$, $p_A$ is the pressure at $A$ and $h_A(t)$ is the height of point $A$.
    All quantities associated with $B$ are equivalently defined. Since both
    points $A$ and $B$ are in direct contact with the surrounding air, $p_A =
    p_B = p_0$, where $p_0$ is the atmospheric pressure. Also, setting $h_B(t) =
    0$ gives us $h_A(t) = h(t)$. Finally, since we assume the surface of the
    fluid moves down slowly, we can take $v_A(t) \approx 0$. Equation
    \eqref{eq_bern} then becomes:
  </p>

  <EquationBlock>
    \frac{p_0}{\rho} + gh(t) = \frac{v_B^2(t)}{2} + \frac{p_0}{\rho}
  </EquationBlock>

  <p>and therefore:</p>

  <EquationBlock> v_B(t) = \sqrt{2gh(t)} \label{eq_vB} </EquationBlock>

  <p>
    so the fluid comes out of the funnel with speed $v_B(t) = v(t) =
    \sqrt{2gh(t)}$.
  </p>

  <p>
    Before we proceed, let's obtain a relation between $r(t)$ and $h(t)$. Since
    we assume $a$ to be small ($a \ll r(t)$ and $a \ll b$), the cross section of
    the cone shown on <FigureLink :figureNumber="1">figure 1</FigureLink> can be
    treated as a triangle:
  </p>

  <EquationBlock>
    \frac{r(t)}{h(t)} = \frac{b}{h_0} \Longrightarrow r(t) = h(t)\frac{b}{h_0}
  </EquationBlock>

  <p></p>

  <p>
    Using the same reasoning, we can treat the funnel as a cone and obtain the
    volume $V(t)$ of fluid it contains at time $t$ as follows:
  </p>

  <EquationBlock>
    V(t) = \frac{1}{3}\pi r^2(t) h(t) =
    \frac{\pi}{3}\left(\frac{b}{h_0}\right)^2h^3(t) \label{eq_volume}
  </EquationBlock>

  <p>
    This approximation will be good as long as $r(t) \gg a$. As $h(t)
    \rightarrow 0$, $r(t) \rightarrow a$ so this approximation becomes poor, but
    by that time, there will only be a small amount of fluid remaining in the
    funnel, and that small amount will leave the funnel quickly enough to have
    little impact on the overall time taken by all the fluid to go through the
    funnel.
  </p>

  <p>
    From equation \eqref{eq_vB}, the volumetric rate at which the fluid flows
    out of the funnel is equal to:
  </p>

  <EquationBlock>
    \Phi(t) = A v(t) = (\pi a^2) v(t) = \pi a^2 \sqrt{2gh(t)}
    \label{eq_flow_rate}
  </EquationBlock>

  <p>
    where $A = \pi a^2$ is the cross sectional area of the funnel's neck. Since
    this flow rate is the rate at which the fluid leaves the funnel, we have
    (below the notation $\dot{q}$ is used to represent $dq/dt$):
  </p>

  <EquationBlock> \dot{V}(t) = -\Phi(t) \label{eq_v_phi} </EquationBlock>

  <p>But from equation \eqref{eq_volume}, we have that:</p>

  <EquationBlock>
    \dot{V}(t) = \frac{\pi}{3}\left(\frac{b}{h_0}\right)^2 3 h^2(t) \dot{h}(t) =
    \pi\left(\frac{b}{h_0}\right)^2 h^2(t) \dot{h}(t)
  </EquationBlock>

  <p>
    Inserting this on equation \eqref{eq_v_phi} and using equation
    \eqref{eq_flow_rate}, we get:
  </p>

  <EquationBlock>
    \pi\left(\frac{b}{h_0}\right)^2 h^2(t) \dot{h}(t) = -\pi a^2 \sqrt{2gh(t)}
  </EquationBlock>

  <p>Cancelling common terms on both sides of the equation above yields:</p>

  <EquationBlock>
    \left(\frac{b}{h_0}\right)^2 h^{3/2}(t) \dot{h}(t) = -a^2 \sqrt{2g}
    \label{eq_hr}
  </EquationBlock>

  <p>Since:</p>

  <EquationBlock>
    h^{3/2}(t) \dot{h}(t) = \frac{2}{5}\frac{d}{dt}h^{5/2}(t)
  </EquationBlock>

  <p>then equation \eqref{eq_hr} can be rewritten as:</p>

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
    \sqrt{\frac{2g}{h_0}} t \right]^{2/5} \label{eq_h_vs_t}
  </EquationBlock>

  <p>
    The time $T$ the entire fluid volume takes to go through the funnel is such
    that $h(T) = 0$, which implies:
  </p>

  <EquationBlock>
    1 - \frac{5}{2} \left(\frac{a}{b}\right)^2 \sqrt{\frac{2g}{h_0}} T = 0
  </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock boxed>
    T = \frac{2}{5} \left(\frac{b}{a}\right)^2 \sqrt{\frac{h_0}{2g}}
    \label{eq_T}
  </EquationBlock>

  <p>
    Equation \eqref{eq_T} can be used to write equation \eqref{eq_h_vs_t} in a
    simpler form:
  </p>

  <EquationBlock>
    h(t) = h_0\left( 1 - \frac{t}{T} \right)^{2/5}
  </EquationBlock>

  <p>
    <FigureLink :figureNumber="2">Figure 2</FigureLink> shows a graph of
    $h(t)/h_0$ versus $t / T$.
  </p>

  <FigureBlock :figureNumber="2" caption="Fluid height $h(t)/h_0$ vs. $t/T$.">
    <FlotChart class="figure-2" :data="data" :options="options" />
  </FigureBlock>

  <p>
    As the graph on <FigureLink :figureNumber="2">figure 2</FigureLink> shows,
    the fluid's surface moves down slowly until about $t = 0.95T$, at which
    point $h(t)$ starts decreasing quickly. From there on, some of our
    assumptions about the nature of the flow will no longer be accurate, but as
    mentioned above, this will not cause a substantial deviation from our
    computed estimate of $T$.
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

const data = [{ label: "$h(t)/h_0$", data: points }];

const options = {
  legend: {
    position: "ne",
  },
  xaxis: {
    axisLabel: "$t/T$",
    max: 1.05,
    min: 0.0,
    ticks: 10,
  },
  yaxis: {
    axisLabel: "$h(t)/h_0$",
    max: 1.1,
    min: 0.0,
    ticks: 4,
  },
};
</script>

<style scoped lang="scss">
.figure-2 {
  height: 20 * $base-length;
  width: 35 * $base-length;
}
</style>
