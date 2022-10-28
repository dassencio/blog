<template>
  <p>
    The
    <a href="https://en.wikipedia.org/wiki/IPv6">Internet Protocol version 6</a>
    (IPv6) has a very large address space. In fact, since an IPv6 address is
    $128$ bits long, the number of possible IPv6 addresses is:
  </p>

  <EquationBlock>
    N_{\textrm{IPv6}} = 2^{128} \approx 3.4 \times 10^{38}
  </EquationBlock>

  <p>
    For comparison, the
    <a href="https://en.wikipedia.org/wiki/Cell_%28biology%29"
      >number of cells in a human body</a
    >
    is lower than $100$ trillion ($10^{14}$), and the
    <a
      href="https://en.wikipedia.org/wiki/Observable_universe#Extrapolation_from_number_of_stars"
    >
      number of stars in the observable universe</a
    >
    seems to be in the range $10^{22} - 10^{24}$.
  </p>

  <p>
    In other words, the number of possible IPv6 addresses is unimaginably
    immense.
    <a href="https://en.wikipedia.org/wiki/IPv4">IPv4</a> addresses, on the
    other hand, are $32$ bits long, so the IPv4 address space contains only
    $N_{\textrm{IPv4}} = 2^{32} \approx 4.3 \times 10^{9}$ (about $4.3$ billion)
    addresses. This small address space is one of the reasons behind the
    <a href="https://en.wikipedia.org/wiki/IPv4_address_exhaustion"
      >IPv4 address exhaustion</a
    >.
  </p>

  <p>
    Let's compute the number of unique IPv6 addresses that could be assigned to
    each square meter of the Earth's surface. Since the Earth is
    <a href="http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html"
      >approximately a sphere</a
    >
    with radius $R_{\textrm{Earth}} = 6.4 \times 10^6\textrm{m}$, its area is
    approximately given by:
  </p>

  <EquationBlock>
    A_{\textrm{Earth}} = 4\pi R_{\textrm{Earth}}^2 \approx 4 \times 3.14 \times
    (6.4 \times 10^6 \textrm{m})^2 \approx 5.1 \times 10^{14} \textrm{m}^2
  </EquationBlock>

  <p>
    The number of IPv6 addresses per square meter of the Earth's surface is
    then:
  </p>

  <EquationBlock>
    \sigma_{\textrm{IPv6}} \coloneqq
    \frac{N_{\textrm{IPv6}}}{A_{\textrm{Earth}}} \approx 6.6 \times 10^{23}
    \textrm{m}^{-2}
  </EquationBlock>

  <p>
    Interestingly, this number is close to the
    <a href="https://en.wikipedia.org/wiki/Avogadro_constant"
      >Avogadro constant</a
    >
    ($N_A = 6.022 \times 10^{23}$). From this, we can compute how much area a
    single IPv6 address would "occupy". This value is given by:
  </p>

  <EquationBlock>
    A_{\textrm{IPv6}} \coloneqq \frac{1}{\sigma_{\textrm{IPv6}}} \approx 1.5
    \times 10^{-24} \textrm{m}^2 = 1.5 \textrm{pm}^2
  </EquationBlock>

  <p>
    since $1\textrm{pm} = 10^{-12}\textrm{m}$ ($\textrm{pm}$ stands for
    <a href="https://en.wikipedia.org/wiki/Picometre">picometer</a>). Given that
    a Helium atom, which is the
    <a
      href="https://en.wikipedia.org/wiki/Atomic_radius#Calculated_atomic_radius"
      >smallest atom</a
    >, has a maximum cross-sectional area of approximately:
  </p>

  <EquationBlock>
    A_{\textrm{He}} = \pi R_{\textrm{He}}^2 \approx 3.14 \times (31
    \textrm{pm})^2 \approx 3000\textrm{pm}^2 \approx 2000 A_{\textrm{IPv6}}
  </EquationBlock>

  <p>
    then each atom on the Earth's surface could have thousands of unique IPv6
    addresses assigned to it.
  </p>

  <p>
    To finalize, it must be said that although huge, the IPv6 address space
    might still be small enough to
    <a href="http://xkcd.com/865/">save our planet</a> one day.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import mathjax from "@/mathjax";

onMounted(() => {
  mathjax.render();
});
</script>
