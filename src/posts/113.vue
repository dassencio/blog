<template>
  <p>
    In this post, we will delve deeply into the
    <a href="https://en.wikipedia.org/wiki/Twin_paradox">twin paradox</a>. This
    paradox is a thought experiment in special relativity involving two
    identical twins. One twin embarks on a journey into space in a high-speed
    rocket and returns home to find that the twin who stayed on Earth has aged
    more. This occurs because the traveling twin experiences acceleration during
    the journey, which breaks the symmetry between the two twins.
  </p>

  <p>
    I have always found the instantaneous change of direction in the classic
    formulation of the twin paradox to be a source of confusion. By sidestepping
    a direct confrontation with the acceleration effects experienced by the
    traveling twin, the essential physics needed to unravel the paradox is
    obscured. The instantaneous transition from one inertial frame of reference
    moving at velocity $v$ away from the Earth to another moving at velocity
    $-v$ toward the Earth is not only physically unrealistic, but also conceals
    the fact that the traveling twin undergoes acceleration, which is crucial
    for understanding the paradox. Therefore, in this post, we will focus on the
    acceleration of the traveling twin and the impact of this acceleration on
    their aging process.
  </p>

  <p>
    Consider the following scenario: one of the twins, whom we shall refer to as
    the "rocket twin", always travels along the $x$ axis. Their position at time
    $t$ relative to the Earth is denoted by $x(t)$, where $t$ represents the
    time measured by a clock on Earth. At any given time $t$, we will denote
    $S_t'$ as the instantaneous rest frame of the rocket twin, that is, the
    frame whose origin coincides with the position of the rocket twin at time
    $t$ and moves at the same velocity as the rocket twin (see
    <FigureLink id="inertial-frames" />). In essence, the origin of $S_t'$ is
    $x(t)$ (as observed from Earth) at time $t$, and its velocity is constant
    and matches the velocity of the rocket twin, i.e., $v = v(t) = \dot{x}(t)$.
    Although the velocity of the rocket twin may change over time, the velocity
    of $S_t'$ is constant and equals the rocket twin's velocity at time $t$.
  </p>

  <NoteBlock>
    It is important to acknowledge that, according to general relativity, the
    Earth's gravitational field influences the aging process of the Earth twin.
    Yet, within the scope of this post, the Earth functions merely as a point of
    reference for the rocket twin's journey. Should this detail introduce any
    confusion, consider the "Earth twin" as simply floating in empty space,
    stationary at the origin of reference frame $S$, with no gravitational
    interactions influencing their aging process.
  </NoteBlock>

  <FigureBlock
    id="inertial-frames"
    caption="Inertial frames of reference $S$ and $S_t'$. The Earth is
             positioned at the origin of $S$, while $S_t'$ represents a frame of
             reference in which the rocket twin is instantaneously at rest.
             $S_t'$ moves with a constant velocity $v = v(t)$ relative to $S$."
  >
    <ResponsiveImage
      alt="Inertial frames of reference"
      :src="twinParadoxFrames"
    />
  </FigureBlock>

  <p>
    Given that $S_t'$ is instantaneously traveling together with the rocket
    twin, a clock situated at the origin of $S_t'$ will, for a brief period
    $\Di{\tau}$ (experienced in $S_t'$), tick at the same rate as a clock
    carried by the rocket twin (i.e., both clocks will remain synchronized
    during $\Di{\tau}$). By dividing the journey of the rocket twin into
    infinitesimal segments, we can determine the rocket twin's aging by summing
    up the time experienced by the clock in each frame $S_t'$ associated with
    these segments. This cumulative time is referred to as the
    <a href="https://en.wikipedia.org/wiki/Proper_time">proper time</a>
    ($\tau$) of the rocket twin, a key concept in special relativity.
  </p>

  <p>
    Linking $\Di{\tau}$ at an infinitesimal segment of the journey to the
    corresponding $\Di{t}$ measured by the Earth twin is straightforward. Given
    that $S_t'$ moves at a constant velocity $v = v(t)$ relative to the Earth
    twin, the
    <a href="https://en.wikipedia.org/wiki/Time_dilation">time dilation</a>
    formula shows that the time measured by the Earth twin's clock is connected
    to the rocket twin's proper time by:
  </p>

  <EquationBlock label="dtau">
    \Di{t} = \gamma(t) \Di{\tau} \implies \Di{\tau} = \sqrt{1 -
    \frac{v(t)^2}{c^2}} \Di{t}
  </EquationBlock>

  <p>
    It is worth noting that whenever $v(t) \neq 0$, we have $\sqrt{1 - v(t)^2 /
    c^2} \lt 1$, indicating that $\Di{\tau} \lt \Di{t}$. This, however, does not
    necessarily imply that the rocket twin ages less than the Earth twin. The
    observation that $\Di{\tau} \lt \Di{t}$ merely results from the rocket twin
    moving relative to the Earth. If the rocket twin travels at a constant
    velocity, they will also perceive the Earth twin's clock to be ticking
    slower than their own. This time dilation effect is reciprocal and stems
    from the relativity of simultaneity. Events deemed simultaneous in one frame
    of reference may not be regarded as simultaneous in another frame of
    reference in motion relative to the first.
  </p>

  <p>
    The problem becomes more intriguing when the rocket twin undergoes
    acceleration. To understand why, let us first examine the total time elapsed
    from the rocket twin's perspective during a specific journey. Assume that
    the rocket twin begins their journey from Earth (i.e., $x(0) = 0$) and that
    the twins synchronize clocks at the beginning of the journey, meaning the
    Earth twin sets their clock to $t = 0$, and the rocket twin sets their clock
    to $\tau = 0$. The rocket twin is allowed to have a nonzero initial
    velocity. At time $t = T_{\textrm{total}}$, the rocket twin reaches the
    position $x(T_{\textrm{total}})$ as seen from Earth and transmits a signal
    to the Earth twin displaying their clock's reading, $\tau$. To compute
    $\tau$ in terms of $T_{\textrm{total}}$, we integrate equation \eqref{dtau}
    from $t = 0$ to $t = T_{\textrm{total}}$:
  </p>

  <EquationBlock label="tau">
    \tau = \int_0^{T_{\textrm{total}}} \sqrt{1 - \frac{v(t)^2}{c^2}} \D{t}
  </EquationBlock>

  <p>
    Equation \eqref{tau} is applicable to any conceivable trajectory of the
    rocket twin, regardless of whether $v(t)$ is constant.
  </p>

  <p>
    Now, consider the following scenario: the rocket twin is initially at rest
    relative to the Earth (i.e., $v(0) = 0$), travels away from the Earth, then
    returns and comes to rest at time $t = T_{\textrm{total}}$ (i.e.,
    $x(T_{\textrm{total}}) = 0$ and $v(T_{\textrm{total}}) = 0$). At both $t =
    0$ and $t = T_{\textrm{total}}$, the frame of reference for the rocket twin
    is identical to that of the Earth twin. For such a journey, $v(t) \neq 0$
    (and thus $\sqrt{1 - v(t)^2 / c^2} \lt 1$) must hold for at least parts of
    the journey. Hence, equation \eqref{tau} implies that the rocket twin
    experiences less time than the Earth twin. As mentioned earlier, it is the
    acceleration that causes the rocket twin to age less than the Earth twin,
    breaking the relativity of simultaneity between the two frames. This
    phenomenon is the essence of the twin paradox.
  </p>

  <p>
    With the foundational concepts established, let us now explore some concrete
    examples with known trajectories $x(t)$.
  </p>

  <SectionTitle>Example #1: One-way journey</SectionTitle>

  <p>
    Our first example involves the rocket traveling away from the Earth and then
    coming to a complete stop. The velocity of the rocket twin as observed by
    the Earth twin is described by:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="v1">
    v_1(t) =
      \begin{cases}
        0 & t \lt 0 \\
        at & 0 \leq t \lt T \\
        v_{\textrm{max}} - a(t - T) \quad & T \leq t \lt 2T \\
        0 & 2T \leq t
      \end{cases}
  </EquationBlock>

  <p>
    where $v_{\textrm{max}} = aT \lt c$ represents the rocket twin's maximum
    velocity, and $a \gt 0$ denotes the acceleration experienced by the rocket
    twin from $t = 0$ to $t = T$.
    <FigureLink id="example-1" capitalized /> illustrates the rocket twin's
    velocity as a function of time.
  </p>

  <FigureBlock
    id="example-1"
    caption="Rocket twin's velocity $v_1(t)$, as observed by the Earth twin.
             The rocket twin starts at rest, travels away from the Earth with
             constant acceleration $a$, and then decelerates with the same
             magnitude of acceleration until coming to a complete stop."
  >
    <ResponsiveImage
      alt="Rocket velocity (example #1)"
      :src="twinParadoxExample1"
    />
  </FigureBlock>

  <p>
    The equation of motion for the rocket twin is derived by integrating
    equation \eqref{v1} with respect to $t$, considering that $x(0) = 0$:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    x_1(t) =
      \begin{cases}
        0 & t \lt 0 \\
        \frac{1}{2} at^2 & 0 \leq t \lt T \\
        \frac{1}{2} v_{\textrm{max}}T + v_{\textrm{max}}(t - T)
          - \frac{1}{2} a(t - T)^2 \quad & T \leq t \lt 2T \\
        v_{\textrm{max}}T & 2T \leq t
      \end{cases}
  </EquationBlock>

  <p>
    Since, at time $t = 2T$, both the Earth twin and the rocket twin no longer
    move with respect to each other, their clocks will start ticking at the same
    rate. The rocket twin can then send a signal to the Earth twin showing the
    current time on their clock, allowing the Earth twin to compare that
    measurement with the time at which the rocket stopped moving ($2T$). The
    discrepancy between these two times will reveal whether the rocket twin has
    aged more or less than the Earth twin.
  </p>

  <p>From equation \eqref{tau}, we have:</p>

  <!-- prettier-ignore -->
  <EquationBlock split label="tau-1">
    \tau_1
      &= \int_0^T \sqrt{1 - \frac{(at)^2}{c^2}} \D{t} +
         \int_T^{2T} \sqrt{1 - \frac{\left[
           v_{\textrm{max}} - a(t - T)
         \right]^2}{c^2}} \D{t} \\
      &= \int_0^T \sqrt{1 - \frac{(at)^2}{c^2}} \D{t} +
         \int_T^{2T} \sqrt{1 - \frac{(2v_{\textrm{max}} - at)^2}{c^2}} \D{t}
  </EquationBlock>

  <p>
    By defining $\beta = at / c$ for the first integral in equation
    \eqref{tau-1}, with $\Di{\beta} = (a / c) \Di{t}$, we obtain:
  </p>

  <EquationBlock label="tau-1-first-integral">
    \int_0^T \sqrt{1 - \frac{(at)^2}{c^2}} \D{t} = \frac{c}{a}
    \int_0^{v_{\textrm{max}} / c} \sqrt{1 - \beta^2} \D{\beta}
  </EquationBlock>

  <p>
    Similarly, by defining $\beta = (2v_{\textrm{max}} - at) / c$ for the second
    integral in equation \eqref{tau-1}, with $\Di{\beta} = -(a / c) \Di{t}$, we
    find:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="tau-1-second-integral">
    \int_T^{2T} \sqrt{1 - \frac{(2v_{\textrm{max}} - at)^2}{c^2}} \D{t}
      &= -\frac{c}{a} \int_{v_{\textrm{max}} / c}^0 \sqrt{1 - \beta^2} \D{\beta} \\
      &= \frac{c}{a} \int_0^{v_{\textrm{max}} / c} \sqrt{1 - \beta^2} \D{\beta}
  </EquationBlock>

  <p>
    Note that the integrals in equations \eqref{tau-1-first-integral} and
    \eqref{tau-1-second-integral} are identical. Therefore:
  </p>

  <EquationBlock label="tau-1-step">
    \tau_1 = \frac{2c}{a} \int_0^{v_{\textrm{max}} / c} \sqrt{1 - \beta^2}
    \D{\beta}
  </EquationBlock>

  <p>But since:</p>

  <EquationBlock>
    \int \sqrt{1 - \beta^2} \D{\beta} = \frac{1}{2} \left(\beta \sqrt{1 -
    \beta^2} + \sin^{-1}(\beta)\right) + C
  </EquationBlock>

  <p>where $C$ is a constant, then:</p>

  <!-- prettier-ignore -->
  <EquationBlock split label="tau-1-final">
    \tau_1
      &= \frac{c}{a} \left(
           \frac{v_{\textrm{max}}}{c} \sqrt{1 - \frac{v_{\textrm{max}}^2}{c^2}}
           + \sin^{-1}\left(\frac{v_{\textrm{max}}}{c}\right)
         \right) \\
      &= T \left(
           \sqrt{1 - \frac{v_{\textrm{max}}^2}{c^2}} + \frac{c}{v_{\textrm{max}}}
           \sin^{-1}\left(\frac{v_{\textrm{max}}}{c}\right)
         \right)
  </EquationBlock>

  <p>
    At this point, we can demonstrate that $\tau_1 \lt 2T$ whenever $0 \lt
    v_{\textrm{max}} \lt c$. Instead of delving into the complexities of
    equation \eqref{tau-1-final}, let us turn our attention to equation
    \eqref{tau-1-step}. Given that $\sqrt{1 - \beta^2} \lt 1$ for all $0 \lt
    \beta \lt v_{\textrm{max}} / c$, it follows that:
  </p>

  <EquationBlock>
    \tau_1 \lt \frac{2c}{a} \int_0^{v_{\textrm{max}} / c} \D{\beta} =
    \frac{2c}{a} \frac{v_{\textrm{max}}}{c} = 2T
  </EquationBlock>

  <p>
    This conclusively proves that the rocket twin ages less than the Earth twin
    by the journey's end. The magnitude of the age difference is given by:
  </p>

  <EquationBlock label="age-difference">
    \Delta\textrm{Age}_1 = 2T - \tau_1 = 2T \left[1 - \frac{1}{2} \left(\sqrt{1
    - \frac{v_{\textrm{max}}^2}{c^2}} + \frac{c}{v_{\textrm{max}}}
    \sin^{-1}\left(\frac{v_{\textrm{max}}}{c}\right)\right) \right]
  </EquationBlock>

  <p>
    Since the total journey time is $T^{(1)}_{\textrm{total}} = 2T$, the age
    difference can be written as:
  </p>

  <EquationBlock label="delta-age-1">
    \Delta\textrm{Age}_1 = T^{(1)}_{\textrm{total}} \left[1 - \frac{1}{2}
    \left(\sqrt{1 - \frac{v_{\textrm{max}}^2}{c^2}} + \frac{c}{v_{\textrm{max}}}
    \sin^{-1}\left(\frac{v_{\textrm{max}}}{c}\right)\right) \right]
  </EquationBlock>

  <SectionTitle>Example #2: Round-trip journey</SectionTitle>

  <p>
    Let us now explore the problem further by considering a round-trip journey.
    We assume that the rocket twin turns around at $t = 2T$ and heads back to
    Earth in a way that mirrors the initial motion. The equation of motion for
    this return journey is described as follows:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="x2">
    x_2(t) =
      \begin{cases}
        x_1(t) & t \lt 2T \\
        x_1(2T - (t - 2T)) = x_1(4T - t) \quad & 2T \leq t
      \end{cases}
  </EquationBlock>

  <p>
    At $t = 4T$, $x_2(4T) = x_1(0) = 0$, indicating that the rocket twin
    reunites with the Earth twin at that time. From this point onward, the
    rocket twin remains stationary, aligning the frames of reference of both
    twins once more.
  </p>

  <p>
    Based on equation \eqref{x2}, the velocity equation for the full journey is
    given by:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="v2">
    v_2(t) =
      \begin{cases}
        v_1(t) & t \lt 2T \\
        -v_1(4T - t) \quad & 2T \leq t
      \end{cases}
  </EquationBlock>

  <p>Using equation \eqref{v1}, we obtain:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    v_2(t) =
      \begin{cases}
        0 & t \lt 0 \\
        at & 0 \leq t \lt T \\
        v_{\textrm{max}} - a(t - T) & T \leq t \lt 2T \\
        -a(t - 2T) & 2T \leq t \lt 3T \\
        -v_{\textrm{max}} + a(t - 3T) \quad & 3T \leq t \lt 4T \\
        0 & 4T \leq t
      \end{cases}
  </EquationBlock>

  <p>
    <FigureLink id="example-2" capitalized /> illustrates the rocket twin's
    velocity as a function of time.
  </p>

  <FigureBlock
    id="example-2"
    caption="Rocket twin's velocity $v_2(t)$, as observed by the Earth twin.
             The rocket twin starts at rest, accelerates away from the Earth,
             decelerates to a stop, accelerates back toward Earth, and finally
             decelerates to a stop at the original position alongside the
             Earth twin."
  >
    <ResponsiveImage
      alt="Rocket velocity (example #2)"
      :src="twinParadoxExample2"
    />
  </FigureBlock>

  <p>
    The time $\tau_2$ that the rocket twin ages by the time they reunite with
    the Earth twin at $t = 4T$ is given by:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \tau_2
      &= \int_0^{4T} \sqrt{1 - \frac{v_2^2(t)}{c^2}} \D{t} \\
      &= \int_0^{2T} \sqrt{1 - \frac{v_1^2(t)}{c^2}} \D{t}
       + \int_{2T}^{4T} \sqrt{1 - \frac{v_1^2(4T - t)}{c^2}} \D{t}
  </EquationBlock>

  <p>
    Applying the variable change $t \rightarrow 4T - t$ to the second integral
    yields:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \tau_2
      &= \int_0^{2T} \sqrt{1 - \frac{v_1^2(t)}{c^2}} \D{t}
       - \int_{2T}^0 \sqrt{1 - \frac{v_1^2(t)}{c^2}} \D{t} \\
      &= 2\int_0^{2T} \sqrt{1 - \frac{v_1^2(t)}{c^2}} \D{t} \\
      &= 2\tau_1
  </EquationBlock>

  <p>
    Thus, the time change experienced by the rocket twin for the complete
    journey is twice that of the first leg, reflecting the journey's symmetric
    nature. Consequently, the age difference by the journey's end is also twice
    that observed at the end of the first leg:
  </p>

  <EquationBlock>
    \Delta\textrm{Age}_2 = 4T - \tau_2 = 4T - 2\tau_1 = 2\Delta\textrm{Age}_1
  </EquationBlock>

  <p>
    Using equation \eqref{delta-age-1} and the fact that the total journey time
    is now $T^{(2)}_{\textrm{total}} = 4T = 2T^{(1)}_{\textrm{total}}$, we
    obtain:
  </p>

  <EquationBlock>
    \Delta\textrm{Age}_2 = T^{(2)}_{\textrm{total}} \left[1 - \frac{1}{2}
    \left(\sqrt{1 - \frac{v_{\textrm{max}}^2}{c^2}} + \frac{c}{v_{\textrm{max}}}
    \sin^{-1}\left(\frac{v_{\textrm{max}}}{c}\right)\right) \right]
  </EquationBlock>

  <SectionTitle>Example #3: The classic twin paradox</SectionTitle>

  <p>
    We now enhance the journey from example #2 by incorporating a period of
    constant velocity $v(t) = v_{\textrm{max}}$ during the departure from Earth.
    This period lasts for $T_{v_{\textrm{max}}}$, meaning that after achieving
    velocity $v_{\textrm{max}}$, the rocket twin maintains it for a time
    interval $T_{v_{\textrm{max}}}$ before beginning their deceleration.
    Similarly, on the return journey to Earth, there is an equivalent period of
    constant velocity $v(t) = -v_{\textrm{max}}$. Given that $\sqrt{1 - v(t)^2 /
    c^2}$ remains equal to $\sqrt{1 - v_{\textrm{max}}^2 / c^2}$ during these
    segments, the total time elapsed for the rocket twin, as computed using
    equation \eqref{tau}, is:
  </p>

  <EquationBlock>
    \tau_3 = \tau_2 + 2T_{v_{\textrm{max}}} \sqrt{1 -
    \frac{v_{\textrm{max}}^2}{c^2}}
  </EquationBlock>

  <p>
    In the classic twin paradox scenario, the rocket twin embarks on their
    journey at a constant velocity $v_{\textrm{max}}$ relative to the Earth twin
    and returns at velocity $-v_{\textrm{max}}$ after an instantaneous velocity
    change. This scenario can be modeled by considering $T \rightarrow 0$,
    meaning the acceleration and deceleration phases are instantaneous. As $T
    \rightarrow 0$, equation \eqref{tau-1-final} implies that $\tau_1
    \rightarrow 0$, leading to $\tau_2 = 2\tau_1 \rightarrow 0$. Therefore:
  </p>

  <EquationBlock>
    \lim_{T \rightarrow 0} \tau_3 = 2T_{v_{\textrm{max}}} \sqrt{1 -
    \frac{v_{\textrm{max}}^2}{c^2}}
  </EquationBlock>

  <p>
    Thus, the age difference between the rocket twin and the Earth twin at the
    journey's end is:
  </p>

  <EquationBlock>
    \Delta\textrm{Age}_3 = 2T_{v_{\textrm{max}}} - \tau_3 =
    2T_{v_{\textrm{max}}} \left(1 - \sqrt{1 -
    \frac{v_{\textrm{max}}^2}{c^2}}\right)
  </EquationBlock>

  <p>which aligns with the results of the classic twin paradox.</p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import twinParadoxFrames from "@/assets/images/twin-paradox-frames.svg";
import twinParadoxExample1 from "@/assets/images/twin-paradox-example-1.svg";
import twinParadoxExample2 from "@/assets/images/twin-paradox-example-2.svg";

onMounted(() => onViewMounted());
</script>
