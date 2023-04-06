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
    This is a very large amount of energy. As a matter of fact, if your body
    would be able to convert mass into energy, you would you be able to survive
    your entire life by merely consuming the mass of your fingertip!
  </p>

  <p>
    To convince yourself that this is indeed the case, let's estimate the amount
    of energy consumed by a human body during over the lifetime of a person. The
    U.S. Department of Agriculture and the U.S. Department of Health and Human
    Services recommend a daily consumption of approximately $2500 \Kilocalorie
    \approx 10500 \Kilojoule$ for adult males between $20$ and $50$ years of age
    (see the
    <a
      href="https://health.gov/sites/default/files/2020-01/DietaryGuidelines2010.pdf"
    >
      Dietary Guidelines for Americans</a
    >, appendix 6). Younger or older males are recommended to consume less than
    that amount per day (on average). This means one can expect the energy
    consumption of a male body over its entire life span (assume it to be $100$
    years to make we are not underestimating the actual value) to be around:
  </p>

  <EquationBlock>
    E_{\textrm{life}} = (365 \Day\Per\Year) \cdot (100 \Year) \cdot 10500
    \Kilojoule\Per\Day \approx 3.8 \cdot 10^{11} \Joule
  </EquationBlock>

  <p>
    In other words, the energy content of a fingertip is more than a hundred
    times larger than the amount of energy consumed by a person during their
    entire lifetime!
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
