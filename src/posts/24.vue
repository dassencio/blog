<template>
  <p>
    During my university studies, a
    <a href="https://pt.wikipedia.org/wiki/Henrique_Fleming">professor</a>
    posed an intriguing question, which I will be discussing in this post: what
    is the probability of finding the electron of a Hydrogen atom inside the
    atom's nucleus?
  </p>

  <p>
    The
    <a href="https://en.wikipedia.org/wiki/Charge_radius">radius of a proton</a>
    (which makes up the nucleus of a Hydrogen atom) is approximately $r_0 =
    10^{-15} \Meter$. Finding an answer to the question analytically by
    integrating the probability density function $|\psi(\Vec{x})|^2$ over the
    volume of the proton proves to be a complex task:
  </p>

  <EquationBlock>
    P = \int_{\|\Vec{x}\| \leq r_0} |\psi(\Vec{x})|^2 \D{\Vec{x}}
  </EquationBlock>

  <p>
    where $\|\Vec{x}\| \leq r_0$ expresses that the integral should be computed
    over a sphere of radius $r_0$ centered at the origin, where the center of
    the proton is assumed to be located. However, my professor offered an
    ingenious alternative. He suggested it would be more practical to compute
    $P$ "<i
      >as
      <a href="https://en.wikipedia.org/wiki/Enrico_Fermi">Fermi</a> would</i
    >". This meant that the problem could be simplified by using a suitable
    <a href="https://en.wikipedia.org/wiki/Fermi_problem">approximation</a>,
    specifically by assuming that $|\psi(\Vec{x})|$ remains constant over the
    extent of the nucleus. This assumption makes the computation of $P$ much
    more manageable:
  </p>

  <EquationBlock label="P-approximate">
    P \approx |\psi(\Vec{0})|^2 \int_{\|\Vec{x}\| \leq r_0} \D{\Vec{x}} =
    \frac{4\pi r_0^3}{3}|\psi(\Vec{0})|^2
  </EquationBlock>

  <p>
    For any state with a known wave function $\psi(\Vec{x})$, we can use
    equation \eqref{P-approximate} to obtain a highly accurate approximation of
    $P$. Take, for instance, the eigenfunctions of the Hydrogen atom. These are
    specified by three quantum numbers $(n, l, m)$ and have the form:
  </p>

  <EquationBlock>
    \psi_{nlm}(r,\theta,\phi) = R_{nl}(r)Y^m_l(\theta,\phi)
  </EquationBlock>

  <p>
    where $Y^m_l(\theta,\phi)$ is the
    <a href="https://en.wikipedia.org/wiki/Spherical_harmonic"
      >normalized spherical harmonic</a
    >
    of degree $l$ and order $m$, and $R_{nl}(r)$ is a real-valued function of
    $r$ that takes the following form (see
    <ReferenceLink id="griffiths-quantum-mechanics" />, equations 4.73 - 4.75):
  </p>

  <EquationBlock label="radial-wave-function">
    R_{nl}(r) = \frac{1}{r}\rho^{l+1} e^{-\rho} v(\rho)
  </EquationBlock>

  <p>Above, $\rho = r / (a_0 n)$, $v(\rho)$ is a polynomial function, and:</p>

  <EquationBlock>
    a_0 = \frac{4\pi \epsilon_0 \hbar^2}{me^2} = 0.529 \cdot 10^{-10}\Meter
  </EquationBlock>

  <p>
    is the
    <a href="https://en.wikipedia.org/wiki/Bohr_radius">Bohr radius</a>, where
    $m$ denotes the mass of the electron. From equation
    \eqref{radial-wave-function} and the definition of $\rho$, it follows that
    $R_{nl}(r) \propto r^l e^{-\rho} v(\rho)$ and therefore $R_{nl}(0) = 0$ for
    all $l \gt 0$. Hence:
  </p>

  <EquationBlock>
    \psi_{nlm}(\Vec{0}) = \psi_{nlm}(0, \theta, \phi) =
    R_{nl}(0)Y^m_l(\theta,\phi) = 0
  </EquationBlock>

  <p>
    whenever $l \gt 0$. Let's denote the value of $P$ for the eigenstate
    specified by the quantum numbers $(n, l, m)$ as $P_{nlm}$. Using equation
    \eqref{P-approximate}, we then obtain:
  </p>

  <EquationBlock> l \gt 0 \Longrightarrow P_{nlm} = 0 </EquationBlock>

  <p>
    Thus, for the eigenstates of the Hydrogen atom, the probability of finding
    the electron inside the nucleus can be nonzero only when $l = 0$. Since the
    only allowed value of $m$ in this case is $m = 0$ (recall that $m$ can only
    take integer values between $-l$ and $l$), the wave functions we need to
    consider take the form (see
    <ReferenceLink id="griffiths-quantum-mechanics" />, table 4.2):
  </p>

  <EquationBlock>
    \psi_{n00}(r, \theta, \phi) = R_{n0}(r)Y^0_0(\theta, \phi) = R_{n0}(r)
    \frac{1}{\sqrt{4\pi}}
  </EquationBlock>

  <p>
    The equations below provide us with $\psi_{n00}(r, \theta, \phi)$ for $n =
    1, 2, 3$ (see <ReferenceLink id="griffiths-quantum-mechanics" />, table
    4.6):
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    \psi_{100}(r,\theta,\phi) &=
      \frac{1}{\sqrt{\pi a_0^3}}e^{-r/a_0} \\
    \psi_{200}(r,\theta,\phi) &=
      \frac{1}{\sqrt{8\pi a_0^3}} \left(1 - \frac{1}{2}\frac{r}{a_0} \right)e^{-r/2a_0} \\
    \psi_{300}(r,\theta,\phi) &=
      \frac{1}{\sqrt{27\pi a_0^3}} \left[1 - \frac{2}{3}\frac{r}{a_0} +
      \frac{2}{27}\left(\frac{r}{a_0}\right)^2\right]e^{-r/3a_0}
  </EquationBlock>

  <p>At $r = 0$, we have:</p>

  <EquationBlock align>
    \psi_{100}(0,\theta,\phi) &= \frac{1}{\sqrt{\pi a_0^3}} \\
    \psi_{200}(0,\theta,\phi) &= \frac{1}{\sqrt{8\pi a_0^3}} \\
    \psi_{300}(0,\theta,\phi) &= \frac{1}{\sqrt{27\pi a_0^3}}
  </EquationBlock>

  <p>
    We can now use these values in equation \eqref{P-approximate} to compute the
    probability of finding the electron inside the nucleus for the eigenstates
    with $n = 1, 2, 3$ and $l = m = 0$:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    P_{100} &= \frac{4\pi r_0^3}{3} \frac{1}{\pi a_0^3} =
      \frac{4}{3}\left(\frac{r_0}{a_0}\right)^3 \approx 9 \cdot 10^{-15} \\
    P_{200} &= \frac{4\pi r_0^3}{3} \frac{1}{8 \pi a_0^3} =
     \frac{1}{6}\left(\frac{r_0}{a_0}\right)^3 \approx 1.1 \cdot 10^{-15} \\
    P_{300} &= \frac{4\pi r_0^3}{3} \frac{1}{27 \pi a_0^3} =
      \frac{4}{81}\left(\frac{r_0}{a_0}\right)^3 \approx 3.3 \cdot 10^{-16}
  </EquationBlock>

  <p>
    The probability of finding the electron inside the nucleus of a Hydrogen
    atom is therefore exceedingly small and decreases as the principal quantum
    number $n$ increases.
  </p>

  <ReferenceListBlock>
    <ReferenceListBlockItem
      id="griffiths-quantum-mechanics"
      :authors="['David J. Griffiths', ' Darrell F. Schroeter']"
      title="Introduction to Quantum Mechanics"
      url="https://doi.org/10.1017/9781316995433"
    />
  </ReferenceListBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
