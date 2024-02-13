<template>
  <p>
    The most powerful thermonuclear bomb ever created and detonated was the
    <a href="https://en.wikipedia.org/wiki/Tsar_Bomba">Tsar Bomba</a>. Weighing
    $27$ metric tons ($27,000 \Kilogram$) and with a length of $8 \Meter$, its
    detonation created a blast wave that circled the Earth three times, broke
    windows $900 \Kilometer$ away from the detonation site, and generated a
    flare so bright that it was visible from $1,000 \Kilometer$ away. Its total
    yield is estimated to be $50 \Megaton$ ($50$ megatons) of
    <a href="https://en.wikipedia.org/wiki/TNT_equivalent">TNT</a>, which
    amounts to $E_{\textrm{Tsar}} = 2.1 \cdot 10^{17} \Joule$ of energy.
  </p>

  <p>
    While these numbers are astounding, they are dwarfed by the energy
    equivalent of a human body, which is what this post is about. Consider, for
    example, a
    <a
      href="https://en.wikipedia.org/wiki/Human_body_weight#Average_weight_around_the_world"
      >person</a
    >
    weighing $70 \Kilogram$. The energy equivalent of their body mass is:
  </p>

  <EquationBlock>
    E_{\textrm{human}} = mc^2 = 70 \Kilogram \cdot (3 \cdot 10^8
    \Meter\Per\Second)^2 = 6.3 \cdot 10^{18} \Joule
  </EquationBlock>

  <p>
    This is $30$ times the energy released by the Tsar Bomba! As a matter of
    fact, it is about three times greater than the total amount of energy
    released in
    <a href="https://en.wikipedia.org/wiki/Nuclear_weapon_yield"
      >all known nuclear tests combined</a
    >, which is estimated to be $2.1 \cdot 10^{18} \Joule$.
  </p>

  <p>
    It must be noted, however, that transforming $70 \Kilogram$ of matter into
    its energy equivalent is not a practical endeavor. Doing so would require
    the production of an identical amount of antimatter, which is currently
    unattainable and will likely remain so for the foreseeable future.
    Additionally, the energy released by the annihilation of $70 \Kilogram$ of
    matter with its antimatter counterpart would amount to twice the energy
    value calculated above, since the antimatter would also be annihilated in
    the process.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
