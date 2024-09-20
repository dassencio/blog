<template>
  <p>
    In this post, we will demonstrate that, in the absence of electric charges
    and currents, electric and magnetic fields propagate through space as waves
    at the speed of light. While many introductory proofs of this fact can be
    found in textbooks and literature, we will take a slightly more advanced
    approach, utilizing the
    <a href="https://en.wikipedia.org/wiki/Levi-Civita_symbol#Three_dimensions"
      >Levi-Civita symbol</a
    >
    $\epsilon_{ijk}$ and the
    <a href="https://en.wikipedia.org/wiki/Einstein_notation"
      >Einstein summation convention</a
    >
    to streamline some of the algebraic work. Additionally, we will employ the
    following compact notation for partial derivatives to make the equations
    more concise:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \PPo{x_i} &\rightarrow \P{i} \quad\quad \PPno{2}{x_i} &\rightarrow \P{i}^2 \\
    \PPo{t} &\rightarrow \P{t} \quad\quad \PPno{2}{t} &\rightarrow \P{t}^2
  </EquationBlock>

  <p>
    Consider the
    <a href="https://en.wikipedia.org/wiki/Maxwell%27s_equations"
      >Maxwell's equations</a
    >
    in vacuum:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    \Div\Vec{E} &= 0 \label{div-E} \\
    \Div\Vec{B} &= 0 \label{div-B} \\
    \Curl\Vec{E} &= -\P{t}\Vec{B} \label{curl-E} \\
    \Curl\Vec{B} &= \mu_0 \epsilon_0 \P{t}\Vec{E} \label{curl-B}
  </EquationBlock>

  <p>
    Expressing the equations above in terms of vector components, we obtain the
    following system of equations:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    \P{i} E_i &= 0 \\
    \P{i} B_i &= 0 \\
    \epsilon_{ijk} \P{j} E_k &= -\P{t} B_i \\
    \epsilon_{ijk} \P{j} B_k &= \mu_0 \epsilon_0 \P{t} E_i
  </EquationBlock>

  <p>
    Taking the curl of equation \eqref{curl-E} and using equation
    \eqref{curl-B}, we obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="curl-curl-E">
    \Curl(\Curl\Vec{E})
      &= \Curl(-\P{t}\Vec{B}) \\
      &= -\P{t}(\Curl\Vec{B}) \\
      &= -\P{t}(\mu_0 \epsilon_0 \P{t}\Vec{E}) \\
      &= -\mu_0 \epsilon_0 \P{t}^2\Vec{E}
  </EquationBlock>

  <p>
    The left-hand side of equation \eqref{curl-curl-E} can be simplified as
    follows:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="curl-curl-E-simplified">
    (\Curl(\Curl\Vec{E}))_i
      &= \epsilon_{ijk} \P{j} (\Curl\Vec{E})_k \\
      &= \epsilon_{ijk} \P{j} \left(\epsilon_{klm} \P{l} E_m\right) \\
      &= \epsilon_{ijk} \epsilon_{klm} \P{j} \P{l} E_m \\
      &= \epsilon_{kij} \epsilon_{klm} \P{j} \P{l} E_m \\
      &= \left(\delta_{il} \delta_{jm} - \delta_{im} \delta_{jl}\right) \P{j} \P{l} E_m \\
      &= \P{j} \P{i} E_j - \P{j} \P{j} E_i \\
      &= \P{i} (\Div\Vec{E}) - \Lap E_i \\
      &= (\Grad(\Div\Vec{E}) - \Lap\Vec{E})_i
  </EquationBlock>

  <p>
    Therefore, in vector form, equation \eqref{curl-curl-E-simplified} becomes:
  </p>

  <EquationBlock>
    \Curl(\Curl\Vec{E}) = \Grad(\Div\Vec{E}) - \Lap\Vec{E}
  </EquationBlock>

  <p>
    Using this result in equation \eqref{curl-curl-E}, together with the fact
    that $\Div\Vec{E} = 0$, we obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock>
    -\Lap\Vec{E} = -\mu_0 \epsilon_0 \P{t}^2\Vec{E}
  </EquationBlock>

  <p>and finally:</p>

  <EquationBlock label="E-wave-step">
    \P{t}^2\Vec{E} = \frac{1}{ \mu_0 \epsilon_0}\Lap\Vec{E}
  </EquationBlock>

  <p>
    In other words, the electric field $\Vec{E}$ propagates in vacuum as a
    <a href="https://en.wikipedia.org/wiki/Wave_equation">wave</a>
    with speed $v = 1 / \sqrt{\mu_0 \epsilon_0}$. Interestingly, that speed
    happens to be equal to the speed of light. Indeed, given that:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    \mu_0 &= 1.257 \cdot 10^{-6} \Coulomb^{-2} \cdot \Kilogram \cdot \Meter \\
    \epsilon_0 &= 8.854 \cdot 10^{-12} \Coulomb^2 \cdot \Kilogram^{-1} \cdot \Meter^{-3} \cdot \Second^2
  </EquationBlock>

  <p>we have:</p>

  <EquationBlock>
    v = \frac{1}{\sqrt{\mu_0 \epsilon_0}} = 2.998 \cdot 10^8 \Meter\Per\Second =
    c
  </EquationBlock>

  <p>We can then rewrite equation \eqref{E-wave-step} as:</p>

  <EquationBlock boxed label="E-wave">
    \P{t}^2 \Vec{E} = c^2 \Lap\Vec{E}
  </EquationBlock>

  <p>
    Let us now focus on the magnetic field $\Vec{B}$. Taking the curl of
    equation \eqref{curl-B} and using equation \eqref{curl-E}, we obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="curl-curl-B">
    \Curl(\Curl\Vec{B})
      &= \Curl(\mu_0 \epsilon_0 \P{t}\Vec{E}) \\
      &= \mu_0 \epsilon_0 \P{t}(\Curl\Vec{E}) \\
      &= -\mu_0 \epsilon_0 \P{t}^2\Vec{B}
  </EquationBlock>

  <p>
    The left-hand side of equation \eqref{curl-curl-B} can be simplified in the
    exact same manner as we did for equation \eqref{curl-curl-E} above.
    Following the same algebraic steps as in equation
    \eqref{curl-curl-E-simplified} and using equation \eqref{div-B}, we find
    that:
  </p>

  <EquationBlock>
    \Curl(\Curl\Vec{B}) = \Grad(\Div\Vec{B}) - \Lap\Vec{B} = -\Lap\Vec{B}
  </EquationBlock>

  <p>Using this result in equation \eqref{curl-curl-B}, we obtain:</p>

  <EquationBlock>
    -\Lap\Vec{B} = -\mu_0 \epsilon_0 \P{t}^2\Vec{B}
  </EquationBlock>

  <p>and finally:</p>

  <EquationBlock boxed label="B-wave">
    \P{t}^2\Vec{B} = c^2 \Lap\Vec{B}
  </EquationBlock>

  <p>
    Per se, equations \eqref{E-wave} and \eqref{B-wave} do not prove that light
    is an electromagnetic wave, but the fact that both electric and magnetic
    fields propagate at the speed of light is a coincidence that is very
    difficult to ignore &mdash; a coincidence that led Maxwell to propose that
    light is, in fact, an electromagnetic wave.
  </p>

  <SectionTitle>Electromagnetic plane waves</SectionTitle>

  <p>
    The way electric and magnetic fields interact to form electromagnetic waves
    is a fascinating topic within
    <a href="https://en.wikipedia.org/wiki/Classical_electromagnetism"
      >classical electromagnetism</a
    >. Here, we will look into
    <a href="https://en.wikipedia.org/wiki/Plane_wave">plane waves</a>. We start
    by assuming that the electric field has the following form:
  </p>

  <EquationBlock label="E-plane">
    \Vec{E}(\Vec{x}, t) = \Vec{E}_0 \cos(\Vec{k} \cdot \Vec{x} - \omega t)
  </EquationBlock>

  <p>
    where $\Vec{E}_0$ is a constant vector. Equation \eqref{E-plane} describes a
    plane wave with wave vector $\Vec{k}$ pointing in the direction of wave
    propagation, and angular frequency $\omega$. The relation between $\Vec{k}$
    and $\omega$ can be obtained by substituting equation \eqref{E-plane} into
    equation \eqref{E-wave}. Let us do this step by step:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \Lap\Vec{E}
      &= \Lap(\Vec{E}_0 \cos(\Vec{k} \cdot \Vec{x} - \omega t)) \\
      &= \P{i} \P{i} (\Vec{E}_0 \cos(\Vec{k} \cdot \Vec{x} - \omega t)) \\
      &= -\P{i} (\Vec{E}_0 k_i \sin(\Vec{k} \cdot \Vec{x} - \omega t)) \\
      &= - \Vec{E}_0 k_i^2 \cos(\Vec{k} \cdot \Vec{x} - \omega t) \\
      &= - \|\Vec{k}\|^2 \Vec{E}_0 \cos(\Vec{k} \cdot \Vec{x} - \omega t)
  </EquationBlock>

  <p>where above we used the fact that:</p>

  <EquationBlock>
    \P{i} (\Vec{k} \cdot \Vec{x}) = \P{i} (k_j x_j) = k_j \delta_{ij} = k_i
  </EquationBlock>

  <p>Additionally, we have:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \P{t}^2\Vec{E}
      &= \P{t}^2(\Vec{E}_0 \cos(\Vec{k} \cdot \Vec{x} - \omega t)) \\
      &= -\P{t}(\Vec{E}_0 (-\omega) \sin(\Vec{k} \cdot \Vec{x} - \omega t)) \\
      &= -\omega^2 \Vec{E}_0 \cos(\Vec{k} \cdot \Vec{x} - \omega t)
  </EquationBlock>

  <p>Substituting the results above into equation \eqref{E-wave}, we obtain:</p>

  <EquationBlock>
    - \omega^2 \Vec{E}_0 \cos(\Vec{k} \cdot \Vec{x} - \omega t) = - c^2
    \|\Vec{k}\|^2 \Vec{E}_0 \cos(\Vec{k} \cdot \Vec{x} - \omega t)
  </EquationBlock>

  <p>and therefore:</p>

  <EquationBlock>
    \omega^2 = c^2 \|\Vec{k}\|^2 \Longrightarrow \|\Vec{k}\| = \frac{\omega}{c}
  </EquationBlock>

  <p>
    Given equation \eqref{E-plane}, we can determine the associated magnetic
    field $\Vec{B}$ by using equation \eqref{curl-E}:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    (\P{t}\Vec{B})_i
      &= -(\Curl\Vec{E})_i \\
      &= -\epsilon_{ijk} \P{j} E_k \\
      &= -\epsilon_{ijk} (\Vec{E}_0)_k \P{j} \cos(\Vec{k} \cdot \Vec{x} - \omega t) \\
      &= \epsilon_{ijk} (\Vec{E}_0)_k k_j \sin(\Vec{k} \cdot \Vec{x} - \omega t) \\
      &= (\Vec{k} \times \Vec{E}_0)_i \sin(\Vec{k} \cdot \Vec{x} - \omega t) \\
      &= (\Vec{k} \times \Vec{E}_0)_i \frac{1}{\omega} \P{t}\cos(\Vec{k} \cdot \Vec{x} - \omega t) \\
      &= \P{t} \left(\frac{1}{\omega} (\Vec{k} \times \Vec{E}_0) \cos(\Vec{k} \cdot \Vec{x} - \omega t)\right)_i \\
      &= \P{t} \left(\frac{1}{\omega} (\Vec{k} \times \Vec{E})\right)_i
  </EquationBlock>

  <p>and therefore:</p>

  <EquationBlock>
    \Vec{B} = \frac{1}{\omega} \Vec{k} \times \Vec{E}
  </EquationBlock>

  <p>
    Since $\Vec{k} = \|\Vec{k}\| \hat{\Vec{k}} = (\omega / c) \hat{\Vec{k}}$,
    where $\hat{\Vec{k}}$ is a unit vector pointing in the direction of
    $\Vec{k}$, we can also express the above as:
  </p>

  <EquationBlock>
    \Vec{B}(\Vec{x}, t) = \frac{1}{c} \hat{\Vec{k}} \times \Vec{E}(\Vec{x}, t) =
    \Vec{B}_0 \cos(\Vec{k} \cdot \Vec{x} - \omega t)
  </EquationBlock>

  <p>where:</p>

  <EquationBlock>
    \Vec{B}_0 = \frac{1}{c} \hat{\Vec{k}} \times \Vec{E}_0
  </EquationBlock>

  <p>
    This implies that $\Vec{E}$ and $\Vec{B}$ are orthogonal to each other, and
    that $\Vec{B}$ is orthogonal to the direction of propagation of the wave.
    Additionally, from equation \eqref{div-E}, we have:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \Div\Vec{E}
      &= \P{i} E_i \\
      &= \P{i} ((\Vec{E}_0)_i \cos(\Vec{k} \cdot \Vec{x} - \omega t)) \\
      &= -(\Vec{E}_0)_i k_i \sin(\Vec{k} \cdot \Vec{x} - \omega t) \\
      &= -(\Vec{E}_0 \cdot \Vec{k}) \sin(\Vec{k} \cdot \Vec{x} - \omega t) \\
      &= 0
  </EquationBlock>

  <p>
    This implies that $\Vec{E}_0 \cdot \Vec{k} = 0$ and therefore $\Vec{E} \cdot
    \Vec{k} = 0$. In other words, the electric field $\Vec{E}$ is orthogonal to
    both the wave vector $\Vec{k}$ and the magnetic field $\Vec{B}$. Thus, the
    structure of electromagnetic plane waves is such that the electric and
    magnetic fields oscillate in directions that are orthogonal to each other
    and to the direction of propagation of the wave.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
