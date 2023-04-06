<template>
  <p>
    The
    <a href="https://en.wikipedia.org/wiki/Theory_of_relativity"
      >theory of relativity</a
    >
    says that a body at rest with mass $m$ contains an amount of energy (called
    its "rest energy") given by:
  </p>

  <EquationBlock> E=mc^2 </EquationBlock>

  <p>
    where $c \approx 3 \cdot 10^8 \Meter\Per\Second$ is the speed of light.
    Assuming that the tip of a human finger contains approximately $1\Gram$ of
    mass, the energy content of a fingertip is then:
  </p>

  <EquationBlock>
    E \approx (10^{-3}\Kilogram) \cdot (3\cdot 10^8 \Meter\Per\Second)^2 = 9
    \cdot 10^{13} \Joule
  </EquationBlock>

  <p>
    This is a very large amount of energy. So large, indeed, that if your body
    would be able to convert mass into energy, you would be able to live your
    entire life off the mass of your fingertip!
  </p>

  <p>
    To convince the skeptical reader that this is indeed the case, let's
    estimate the amount of energy consumed by a human body over the course of
    its lifetime. The recommended daily energy consumption for adult males
    between $20$ and $50$ years of age is approximately $2500 \Kilocalorie
    \approx 10500 \Kilojoule$ (see
    <ReferenceLink id="dietary-guidelines-for-americans" />, page 78). Younger
    or older males are recommended to consume less than that amount per day (on
    average). This means one can expect the energy consumption of a male body
    over its entire lifespan (assume it to be $100$ years to make sure we're not
    underestimating the actual value) to be around:
  </p>

  <EquationBlock>
    E_{\textrm{life}} = (365 \Day\Per\Year) \cdot (100 \Year) \cdot 10500
    \Kilojoule\Per\Day \approx 3.8 \cdot 10^{11} \Joule
  </EquationBlock>

  <p>
    The energy content of a fingertip is therefore more than a hundred times
    larger than the amount of energy consumed by a person during their entire
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
