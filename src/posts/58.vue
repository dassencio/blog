<template>
  <p>
    If you've ever needed to convert temperature values between the
    <a href="https://en.wikipedia.org/wiki/Fahrenheit">Fahrenheit</a>
    and <a href="https://en.wikipedia.org/wiki/Celsius">Celsius</a> scales,
    chances are you used the following equation:
  </p>

  <EquationBlock>
    \frac{\FahrenheitSlim - 32}{9} = \frac{\CelsiusSlim}{5}
  </EquationBlock>

  <p>
    where $\FahrenheitSlim$ is the temperature in the Fahrenheit scale and
    $\CelsiusSlim$ is the temperature in the Celsius scale. More concise ways to
    express the equation above are:
  </p>

  <EquationBlock>
    \FahrenheitSlim = 1.8 \cdot \CelsiusSlim + 32 \label{C-to-F-exact}
  </EquationBlock>

  <p>and its inverse:</p>

  <EquationBlock> \CelsiusSlim = (\FahrenheitSlim - 32) / 1.8 </EquationBlock>

  <p>
    While useful, these equations can be a bit complex for mental conversions of
    everyday temperatures. Dividing or multiplying by $1.8$, and subtracting or
    adding $32$, aren't exactly straightforward operations. Instead, consider
    the following approximation of equation \eqref{C-to-F-exact}:
  </p>

  <EquationBlock boxed>
    \FahrenheitSlim = 2 \cdot \CelsiusSlim + 30 \label{C-to-F-approximation}
  </EquationBlock>

  <p>and its inverse:</p>

  <EquationBlock boxed>
    \CelsiusSlim = (\FahrenheitSlim - 30) / 2 \label{F-to-C-approximation}
  </EquationBlock>

  <p>
    They are much less daunting, aren't they? Dividing or multiplying by $2$ is
    much easier than by $1.8$, and subtracting or adding $30$ is simpler than it
    is with $32$.
  </p>

  <p>
    For the vast majority of the year, and in most regions where the Fahrenheit
    scale is prevalent, temperatures fall within the range $[-10 \Celsius, 35
    \Celsius]$, which is equivalent to $[14 \Fahrenheit, 95 \Fahrenheit]$.
    Fortunately, equations \eqref{C-to-F-approximation} and
    \eqref{F-to-C-approximation} provide reasonably accurate conversions between
    $\CelsiusSlim$ and $\FahrenheitSlim$ over this temperature range (see
    <FigureLink id="conversions" />). In fact, when converting from
    $\CelsiusSlim$ to $\FahrenheitSlim$, the largest deviation between the
    values computed using equations \eqref{C-to-F-exact} and
    \eqref{C-to-F-approximation} is only $5 \Fahrenheit$ at $35 \Celsius$. The
    exact value is $95 \Fahrenheit$, while equation \eqref{C-to-F-approximation}
    yields $100 \Fahrenheit$. A deviation of only $4 \Fahrenheit$ occurs at the
    other end of the temperature range. Equation \eqref{C-to-F-approximation}
    yields $10 \Fahrenheit$ at $-10 \Celsius$, whereas the exact value is $14
    \Fahrenheit$.
  </p>

  <p>
    Before you start thinking, "Well, $5 \Fahrenheit$ is not negligible",
    consider that as you move around your house or apartment, you might already
    experience a difference of a few $\FahrenheitSlim$. Some rooms will be
    warmer than others, and you might not even notice the difference.
    Additionally, the temperatures reported on the internet, TV, radio, etc.,
    are simply values measured at some location near you, but not necessarily
    accurate for your exact location. Finally, note that the deviations
    discussed above occur at the extremes of the given temperature range: "very
    hot" ($35 \Celsius$ or $95 \Fahrenheit$) and "very cold" ($-10 \Celsius$ or
    $14 \Fahrenheit$). For temperatures in between, the deviations are smaller.
    For instance, $20 \Celsius$ is exactly $68 \Fahrenheit$, but equation
    \eqref{C-to-F-approximation} yields $70 \Fahrenheit$. Not so bad, right?
  </p>

  <p>
    Conversions from $\FahrenheitSlim$ to $\CelsiusSlim$ using equation
    \eqref{F-to-C-approximation} yield values with an accuracy of about $2.5
    \Celsius$ over the temperature range mentioned above, with the largest
    deviations occurring at the extremes. Therefore, equations
    \eqref{C-to-F-approximation} and \eqref{F-to-C-approximation} can be safely
    used to convert between $\FahrenheitSlim$ and $\CelsiusSlim$, providing
    reasonably accurate estimates with minimal effort.
  </p>

  <FigureBlock
    id="conversions"
    caption="Exact and approximate conversions from $\CelsiusSlim$ to
             $\FahrenheitSlim$. These curves are described by equations
             \eqref{C-to-F-exact} and \eqref{C-to-F-approximation}
             respectively."
  >
    <FlotChart class="conversions-graph" :data="data" :options="options" />
  </FigureBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());

const minC = -10;
const maxC = 35;

const data = [
  {
    label: "Exact",
    data: [minC, maxC].map((C) => [C, 1.8 * C + 32]),
    color: 1,
  },
  {
    label: "Approximate",
    data: [minC, maxC].map((C) => [C, 2.0 * C + 30]),
    color: 0,
  },
];

const options = {
  xaxis: {
    axisLabel: "&deg;C",
    max: maxC,
    min: minC,
    ticks: 10,
  },
  yaxis: {
    axisLabel: "&deg;F",
    max: 2.0 * maxC + 40,
    min: 2.0 * minC + 20,
    ticks: 5,
  },
};
</script>

<style scoped lang="scss">
.conversions-graph {
  height: 20 * $base-length;
  width: 35 * $base-length;
}
</style>
