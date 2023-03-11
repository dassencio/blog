<template>
  <p>
    During my university studies, a
    <a href="https://pt.wikipedia.org/wiki/Henrique_Fleming">professor</a>
    asked us a very interesting question which will be the subject of this post:
    <i
      >What is the probability of finding the electron of a Hydrogen atom inside
      the atom's nucleus?</i
    >
  </p>

  <p>
    The
    <a href="https://en.wikipedia.org/wiki/Charge_radius">radius of a proton</a>
    (the nucleus of a Hydrogen atom) is $r_0 \approx 10^{-15}\textrm{m}$. The
    answer to the question will be hard to find if one tries to compute it
    analytically by integrating the probability density function
    $|\psi(\Vec{x})|^2$ over the volume of the proton:
  </p>

  <EquationBlock>
    P = \int_{\|\Vec{x}\| \leq r_0} |\psi(\Vec{x})|^2 \D{\Vec{x}}
    \label{P-exact}
  </EquationBlock>

  <p>
    where $\|\Vec{x}\| \leq r_0$ refers to the fact that the integral should be
    computed over a sphere of radius $r_0$ centered at the origin (where the
    center of the proton is assumed to be). Instead, as my professor told us, a
    much better idea is to compute $P$ "<i
      >as
      <a href="https://en.wikipedia.org/wiki/Enrico_Fermi">Fermi</a> would</i
    >". By that, he meant the problem can be solved much more easily by using a
    suitable
    <a href="https://en.wikipedia.org/wiki/Fermi_problem">approximation</a>,
    namely that $|\psi(\Vec{x})|$ is constant over the extension of the nucleus.
    This makes the computation of $P$ a much less daunting task:
  </p>

  <EquationBlock>
    P \approx |\psi(\Vec{0})|^2 \int_{\|\Vec{x}\| \leq r_0} \D{\Vec{x}} =
    \frac{4\pi r_0^3}{3}|\psi(\Vec{0})|^2 \label{P-approximate}
  </EquationBlock>

  <p>
    For any state with a known wave function $\psi(\Vec{x})$, we can use
    equation \eqref{P-approximate} to obtain a very good approximation of $P$.
    Consider, for instance, the eigenfunctions of the Hydrogen atom. They are
    specified by three quantum numbers $(n, l, m)$ and always have the form:
  </p>

  <EquationBlock>
    \psi_{nlm}(r,\theta,\phi) = R_{nl}(r)Y^m_l(\theta,\phi)
  </EquationBlock>

  <p>
    where $Y^m_l(\theta,\phi)$ is the
    <a href="https://en.wikipedia.org/wiki/Spherical_harmonic">
      normalized spherical harmonic</a
    >
    of degree $l$ and order $m$ and $R_{nl}(r)$ is a real-valued function of $r$
    which has the form (see
    <ReferenceLink id="griffiths-quantum-mechanics" />, equations 4.73 - 4.75):
  </p>

  <EquationBlock>
    R_{nl}(r) = \frac{1}{r}\rho^{l+1} e^{-\rho} v(\rho)
    \label{radial-wave-function}
  </EquationBlock>

  <p>where $\rho = r / (a_0 n)$, $v(\rho)$ is a polynomial function and</p>

  <EquationBlock>
    a_0 = \frac{4\pi \epsilon_0 \hbar^2}{me^2} = 0.529 \cdot 10^{-10}\textrm{m}
  </EquationBlock>

  <p>
    is the
    <a href="https://en.wikipedia.org/wiki/Bohr_radius">Bohr radius</a> ($m$ is
    the mass of the electron). From equation \eqref{radial-wave-function} and
    the definition of $\rho$, we have that $R_{nl}(r) \propto r^l e^{-\rho}
    v(\rho)$ and therefore $R_{nl}(0) = 0$ for all $l \gt 0$. Hence:
  </p>

  <EquationBlock>
    \psi_{nlm}(\Vec{0}) = \psi_{nlm}(0, \theta, \phi) =
    R_{nl}(0)Y^m_l(\theta,\phi) = 0
  </EquationBlock>

  <p>
    whenever $l \gt 0$. Denoting the value of $P$ for the eigenstate specified
    by the quantum numbers $(n, l, m)$ as $P_{nlm}$, equation
    \eqref{P-approximate} then gives us:
  </p>

  <EquationBlock> l \gt 0 \Longrightarrow P_{nlm} = 0 </EquationBlock>

  <p>
    For the eigenstates of the Hydrogen atom, the probability of finding the
    electron inside the nucleus can therefore be nonzero only when $l = 0$.
    Since $m = 0$ is the only allowed value of $m$ in this case (remember that
    $m$ can only take integer values between $-l$ and $l$), the wave functions
    we need to consider will have the form (see
    <ReferenceLink id="griffiths-quantum-mechanics" />, table 4.2):
  </p>

  <EquationBlock>
    \psi_{n00}(r, \theta, \phi) = R_{n0}(r)Y^0_0(\theta, \phi) = R_{n0}(r)
    \frac{1}{\sqrt{4\pi}}
  </EquationBlock>

  <p>
    The equations below give us $\psi_{n00}(r, \theta, \phi)$ for $n = 1, 2, 3$
    (see <ReferenceLink id="griffiths-quantum-mechanics" />, table 4.6):
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

  <p>For $r = 0$, we obtain:</p>

  <EquationBlock align>
    \psi_{100}(0,\theta,\phi) &= \frac{1}{\sqrt{\pi a_0^3}} \\
    \psi_{200}(0,\theta,\phi) &= \frac{1}{\sqrt{8\pi a_0^3}} \\
    \psi_{300}(0,\theta,\phi) &= \frac{1}{\sqrt{27\pi a_0^3}}
  </EquationBlock>

  <p>
    These values can now be used in equation \eqref{P-exact} to obtain the
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
    atom is therefore extremely small, and decreases as the principal quantum
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
