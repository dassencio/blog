<template>
  <p>
    The
    <a href="https://en.wikipedia.org/wiki/Theory_of_relativity"
      >theory of relativity</a
    >
    states that a body at rest with mass $m$ contains an amount of energy
    (referred to as its "rest energy"), which is given by:
  </p>

  <EquationBlock> E=mc^2 </EquationBlock>

  <p>
    where $c \approx 3 \cdot 10^8 \Meter\Per\Second$ is the speed of light.
    Assuming that the tip of a human finger contains approximately $1 \Gram$ of
    mass, the energy content of a fingertip can be calculated as follows:
  </p>

  <EquationBlock>
    E \approx (10^{-3} \Kilogram) \cdot (3\cdot 10^8 \Meter\Per\Second)^2 = 9
    \cdot 10^{13} \Joule
  </EquationBlock>

  <p>
    This value represents a large amount of energy. So large, in fact, that if
    your body were capable of converting mass into energy, you could potentially
    live your entire life off the mass of your fingertip!
  </p>

  <p>
    To validate this argument for the skeptical reader, let's estimate the
    amount of energy consumed by a human body over the course of its lifetime.
    The recommended daily energy intake for adult males between $20$ and $50$
    years of age is approximately $2500 \Kilocalorie \approx 10500 \Kilojoule$
    (see
    <ReferenceLink id="dietary-guidelines-for-americans" />, page 78). Younger
    and older males are recommended to consume less energy per day (on average).
    Therefore, one can expect the energy consumption of a male body over its
    entire lifespan (assuming it to be $100$ years to avoid underestimation) to
    be approximately:
  </p>

  <EquationBlock>
    E_{\textrm{life}} = (365 \Day\Per\Year) \cdot (100 \Year) \cdot 10500
    \Kilojoule\Per\Day \approx 3.8 \cdot 10^{11} \Joule
  </EquationBlock>

  <p>
    Thus, the energy content of a fingertip is more than a hundred times greater
    than the amount of energy consumed by a person throughout their entire
    lifetime!
  </p>

  <ReferenceListBlock>
    <ReferenceListBlockItem
      id="dietary-guidelines-for-americans"
      :authors="[
        'U.S. Department of Agriculture',
        'U.S. Department of Health and Human Services',
      ]"
      title="Dietary Guidelines for Americans"
      url="https://health.gov/sites/default/files/2020-01/DietaryGuidelines2010.pdf"
    />
  </ReferenceListBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
