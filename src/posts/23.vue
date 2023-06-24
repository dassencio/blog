<template>
  <p>
    In this post, I will compute how much time a specified quantity of an
    incompressible fluid (e.g., water) takes to pass through a
    <a href="https://en.wikipedia.org/wiki/Funnel">funnel</a>. We will assume
    that the fluid's viscosity is low enough to be negligible, meaning that the
    flow will be treated as
    <a href="https://en.wikipedia.org/wiki/Inviscid_flow">inviscid</a>.
    Furthermore, we will make certain assumptions about the funnel's shape in
    order to make the problem analytically solvable. This approach leads to
    results that, while not universally applicable, are still accurate for a
    wide range of scenarios.
  </p>

  <p>
    We will assume the funnel has the shape of an inverted cone with the tip cut
    off (see <FigureLink id="funnel" />), along with a short neck whose diameter
    is considerably smaller than the diameter of the funnel's mouth. The funnel
    is initially filled entirely with fluid.
  </p>

  <FigureBlock
    id="funnel"
    caption="A funnel in the shape of a truncated cone. The funnel has mouth
             radius $b$ and neck radius $a \ll b$. The initial fluid height is
             $h_0$, which is equal to the height of the funnel itself. At time
             $t$, the height of the fluid is $h(t)$, and the radius of the
             fluid's top surface is $r(t)$."
  >
    <ResponsiveImage alt="Funnel" :src="fluidFunnel" />
  </FigureBlock>

  <p>
    As the fluid starts to flow through the funnel, its top surface begins to
    descend. This descent is gradual as long as $h(t)$ is not too small compared
    to $h_0$. Thus, we can largely disregard the downward movement of the
    fluid's top surface during the flow and approach the problem as we would for
    an orifice in a large tank.
  </p>

  <p>
    Let's consider points $A$ and $B$ in <FigureLink id="funnel" />. We will
    assume that both points lie on the same flow streamline (indicated by the
    dashed line). By applying
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
    point $A$, $p_A$ is the pressure at point $A$, and $h_A(t)$ denotes the
    height at point $A$. The quantities associated with point $B$ are defined
    similarly. As both points $A$ and $B$ are exposed to the surrounding air, we
    can say that $p_A = p_B = p_0$, where $p_0$ is the atmospheric pressure. By
    setting $h_B(t) = 0$, it follows that $h_A(t) = h(t)$. Additionally, given
    that the fluid's top surface descends slowly, we can approximate $v_A(t)$ as
    nearly zero. Using these facts, equation \eqref{bernoulli} simplifies to:
  </p>

  <EquationBlock>
    \frac{p_0}{\rho} + gh(t) = \frac{v_B^2(t)}{2} + \frac{p_0}{\rho}
  </EquationBlock>

  <p>which leads to:</p>

  <EquationBlock> v_B(t) = \sqrt{2gh(t)} \label{flow-speed} </EquationBlock>

  <p>
    This implies that the fluid exits the funnel at a speed $v(t) = v_B(t) =
    \sqrt{2gh(t)}$.
  </p>

  <p>
    Next, let's establish a relationship between $r(t)$ and $h(t)$. Assuming
    that $a$ is small (i.e., $a \ll r(t)$ and $a \ll b$), the cross-section of
    the cone depicted in <FigureLink id="funnel" /> can be approximated as a
    triangle:
  </p>

  <EquationBlock>
    \frac{r(t)}{h(t)} = \frac{b}{h_0} \Longrightarrow r(t) = h(t)\frac{b}{h_0}
  </EquationBlock>

  <p>
    Using similar logic, we can model the funnel as a cone and compute the
    volume of fluid $V(t)$ contained within it at time $t$ as follows:
  </p>

  <EquationBlock>
    V(t) = \frac{1}{3}\pi r^2(t) h(t) =
    \frac{\pi}{3}\left(\frac{b}{h_0}\right)^2h^3(t) \label{volume}
  </EquationBlock>

  <p>
    As $h(t) \rightarrow 0$, $r(t) \rightarrow a$, and equation \eqref{volume}
    becomes less accurate in approximating the actual fluid volume in the
    funnel. However, since the remaining fluid at this point leaves the funnel
    rapidly, it has little impact on the total time taken for the entire volume
    of fluid to pass through. Given this, we will employ equation \eqref{volume}
    to represent the fluid volume at all times.
  </p>

  <p>
    According to equation \eqref{flow-speed}, the volumetric flow rate at which
    the fluid exits the funnel is:
  </p>

  <EquationBlock>
    \Phi(t) = A v(t) = (\pi a^2) v(t) = \pi a^2 \sqrt{2gh(t)} \label{flow-rate}
  </EquationBlock>

  <p>
    where $A = \pi a^2$ is the cross-sectional area of the funnel's neck. As
    this flow rate is the rate at which the volume of fluid in the funnel
    decreases, we can write:
  </p>

  <EquationBlock>
    \dot{V}(t) = -\Phi(t) \label{volume-derivative}
  </EquationBlock>

  <p>Also, from equation \eqref{volume}, we have:</p>

  <EquationBlock>
    \dot{V}(t) = \frac{\pi}{3}\left(\frac{b}{h_0}\right)^2 3 h^2(t) \dot{h}(t) =
    \pi\left(\frac{b}{h_0}\right)^2 h^2(t) \dot{h}(t)
  </EquationBlock>

  <p>
    Substituting this into equation \eqref{volume-derivative} and employing
    equation \eqref{flow-rate}, we obtain:
  </p>

  <EquationBlock>
    \pi\left(\frac{b}{h_0}\right)^2 h^2(t) \dot{h}(t) = -\pi a^2 \sqrt{2gh(t)}
  </EquationBlock>

  <p>Cancelling common terms on both sides of this equation, we arrive at:</p>

  <EquationBlock>
    \left(\frac{b}{h_0}\right)^2 h^{3/2}(t) \dot{h}(t) = -a^2 \sqrt{2g}
    \label{fluid-height-derivative}
  </EquationBlock>

  <p>Given that:</p>

  <EquationBlock>
    h^{3/2}(t) \dot{h}(t) = \frac{2}{5}\DDo{t}h^{5/2}(t)
  </EquationBlock>

  <p>we can rewrite equation \eqref{fluid-height-derivative} as:</p>

  <EquationBlock>
    \DDo{t}h^{5/2}(t) = -\frac{5}{2} \left(\frac{h_0}{b}\right)^2 a^2 \sqrt{2g}
  </EquationBlock>

  <p>Integrating both sides with respect to time, we obtain:</p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \int_{t'=0}^{t'=t} \DDo{t'}h^{5/2}(t')\D{t'} &=
      -\int_{t'=0}^{t'=t} \frac{5}{2} \left(\frac{h_0}{b}\right)^2 a^2 \sqrt{2g}\D{t'} \\
    h^{5/2}(t)\bigg|_{t'=0}^{t'=t} &=
      -\frac{5}{2} \left(\frac{h_0}{b}\right)^2 a^2 \sqrt{2g} t \\
    h^{5/2}(t) - h_0^{5/2} &=
      -\frac{5}{2}\left(\frac{h_0}{b}\right)^2 a^2 \sqrt{2g} t
  </EquationBlock>

  <p>This leads us to an expression for the fluid height $h(t)$:</p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    h(t) &= \left[h_0^{5/2} - \frac{5}{2}\left(\frac{h_0}{b}\right)^2 a^2 \sqrt{2g} t \right]^{2/5} \\
         &= h_0 \left[1 - \frac{5}{2} \frac{1}{\sqrt{h_0}b^2} a^2 \sqrt{2g} t \right]^{2/5}
  </EquationBlock>

  <p>After some algebraic manipulation, we arrive at:</p>

  <EquationBlock>
    h(t) = h_0\left[ 1 - \frac{5}{2} \left(\frac{a}{b}\right)^2
    \sqrt{\frac{2g}{h_0}} t \right]^{2/5} \label{fluid-height}
  </EquationBlock>

  <p>
    The total time $T$ for the entire volume of fluid to pass through the funnel
    is found when $h(T) = 0$. This leads to:
  </p>

  <EquationBlock>
    1 - \frac{5}{2} \left(\frac{a}{b}\right)^2 \sqrt{\frac{2g}{h_0}} T = 0
  </EquationBlock>

  <p>Therefore, we have:</p>

  <EquationBlock boxed>
    T = \frac{2}{5} \left(\frac{b}{a}\right)^2 \sqrt{\frac{h_0}{2g}}
    \label{flow-time}
  </EquationBlock>

  <p>
    Using equation \eqref{flow-time}, we can express equation
    \eqref{fluid-height} in a more simplified form:
  </p>

  <EquationBlock> h(t) = h_0\left(1 - \frac{t}{T} \right)^{2/5} </EquationBlock>

  <p>
    <FigureLink id="fluid-height" capitalized /> shows a graph of $h(t)/h_0$
    against $t/T$.
  </p>

  <FigureBlock
    id="fluid-height"
    caption="Fluid height $h(t)/h_0$ as a function of $t/T$."
  >
    <FlotChart class="fluid-height-graph" :data="data" :options="options" />
  </FigureBlock>

  <p>
    As the graph in <FigureLink id="fluid-height" /> indicates, the top surface
    of the fluid descends slowly until about $t \approx 0.95T$. After this
    point, $h(t)$ decreases rapidly. It's important to note that some of the
    assumptions made earlier about the flow may not be as accurate in this
    phase. However, as discussed before, this will not have a significant impact
    on the accuracy of our estimated value for $T$.
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
