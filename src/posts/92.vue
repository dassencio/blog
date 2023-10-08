<template>
  <p>
    In this post, we will derive the energy levels of the Hydrogen atom using
    only operator algebra, without delving into
    <a href="https://en.wikipedia.org/wiki/Wave_function">wave functions</a>.
    Our approach will primarily involve defining special operators that will
    help us determine the eigenvalues of the
    <a href="https://en.wikipedia.org/wiki/Hamiltonian_(quantum_mechanics)"
      >Hamiltonian</a
    >
    $H$ directly. Our model of the Hydrogen atom consists of an electron with
    mass $m$ in the presence of a
    <a href="https://en.wikipedia.org/wiki/Electric_potential_energy"
      >Coulomb potential</a
    >. The associated Hamiltonian is a staple for physics students who have
    completed a course in quantum mechanics:
  </p>

  <EquationBlock label="hamiltonian">
    H = \frac{\Vec{p}^2}{2m} - \frac{e^2}{r}
  </EquationBlock>

  <p>
    The first term on the right-hand side of the equation above represents the
    kinetic energy of the electron, while the second term represents its
    electrostatic potential energy due to the presence of a proton fixed at the
    origin. In the equation, $\Vec{p}$ and $\Vec{x}$ are the momentum and
    position operators, respectively, with $r = \|\Vec{x}\|$.
  </p>

  <p>
    A significant portion of our derivation hinges on the properties of the
    self-adjoint operator $\Vec{A}$, defined below. This operator is known as
    the
    <a
      href="https://en.wikipedia.org/wiki/Laplace%E2%80%93Runge%E2%80%93Lenz_vector"
      >Laplace-Runge-Lenz vector</a
    >
    operator:
  </p>

  <EquationBlock>
    \Vec{A} = \frac{1}{2} (\Vec{L} \times \Vec{p} - \Vec{p} \times \Vec{L}) +
    me^2 \frac{\Vec{x}}{r}
  </EquationBlock>

  <p>
    where $\Vec{L} = \Vec{x} \times \Vec{p}$ is the angular momentum operator.
    The self-adjoint nature of $\Vec{A}$ is due to the fact that both $\Vec{x}$
    and $r$ are self-adjoint, and also due to the relationship $(\Vec{L} \times
    \Vec{p})^{\dagger} = - \Vec{p} \times \Vec{L}$. As we progress, we will
    frequently utilize the
    <a href="https://en.wikipedia.org/wiki/Einstein_notation"
      >Einstein summation notation</a
    >. In this notation, a product $a_i b_i$ represents the sum $\sum_{i=1}^3
    a_i b_i$, given two vector quantities $\Vec{a} = (a_1, a_2, a_3)$ and
    $\Vec{b} = (b_1, b_2, b_3)$.
  </p>

  <SectionTitle>Basic commutators</SectionTitle>

  <p>Let's start by reviewing some well-known commutators:</p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    [x_i, x_j] &= 0 \\
    [p_i, p_j] &= 0 \\
    [x_i, p_j] &= i \hbar \delta_{ij}
  </EquationBlock>

  <p>From these commutators, we have:</p>

  <!-- prettier-ignore -->
  <EquationBlock split label="commutator-xi-Lj">
    [x_i, L_j] &= [x_i, \epsilon_{jkl} x_k p_l] \\
               &= \epsilon_{jkl} x_k [x_i, p_l] \\
               &= \epsilon_{jkl} x_k i \hbar \delta_{il} \\
               &= i \hbar \epsilon_{jki} x_k \\
               &= i \hbar \epsilon_{ijk} x_k
  </EquationBlock>

  <!-- prettier-ignore -->
  <EquationBlock split label="commutator-pi-Lj">
    [p_i, L_j] &= [p_i, \epsilon_{jkl} x_k p_l] \\
               &= \epsilon_{jkl} [p_i, x_k] p_l \\
               &= \epsilon_{jkl} (-i \hbar) \delta_{ik} p_l \\
               &= -i \hbar \epsilon_{jil} p_l \\
               &= i \hbar \epsilon_{ijk} p_k
  </EquationBlock>

  <p>
    Above, we used several properties of the
    <a href="https://en.wikipedia.org/wiki/Levi-Civita_symbol"
      >Levi-Civita symbol</a
    >
    $\epsilon_{ijk}$. Using the following identity:
  </p>

  <EquationBlock label="commutator-A-BC">
    [A, BC] = ABC - BCA + BAC - BAC = [A,B]C + B[A,C]
  </EquationBlock>

  <p>we can deduce:</p>

  <!-- prettier-ignore -->
  <EquationBlock split label="commutator-Li-Lj">
    [L_i, L_j]
      &= [\epsilon_{imn} x_m p_n, \epsilon_{jkl} x_k p_l] \\
      &= \epsilon_{imn} \epsilon_{jkl} [x_m p_n, x_k p_l] \\
      &= \epsilon_{imn} \epsilon_{jkl} \left([x_m p_n, x_k] p_l
                                             + x_k [x_m p_n, p_l]\right) \\
      &= \epsilon_{imn} \epsilon_{jkl} \left(x_m [p_n, x_k] p_l
                                             + x_k [x_m, p_l] p_n\right) \\
      &= \epsilon_{imn} \epsilon_{jkl} \left(x_m (-i \hbar) \delta_{kn} p_l
                                             + x_k i \hbar \delta_{ml} p_n\right) \\
      &= i \hbar \left(- \epsilon_{imk} \epsilon_{jkl} x_m p_l
                       + \epsilon_{iln} \epsilon_{jkl} x_k p_n\right) \\
      &= i \hbar \left(\epsilon_{imk} \epsilon_{jlk} x_m p_l
                       - \epsilon_{inl} \epsilon_{jkl} x_k p_n\right) \\
      &= i \hbar \left((\delta_{ij} \delta_{ml}
                        - \delta_{il} \delta_{mj}) x_m p_l
                        - (\delta_{ij} \delta_{nk}
                        - \delta_{ik} \delta_{nj}) x_k p_n\right) \\
      &= i \hbar \left(\delta_{ij} x_m p_m
                       - \delta_{il} \delta_{mj} x_m p_l
                       - \delta_{ij} x_n p_n
                       + \delta_{ik} \delta_{nj} x_k p_n\right) \\
      &= i \hbar \left(- \delta_{il} \delta_{mj} x_m p_l
                       + \delta_{ik} \delta_{nj} x_k p_n\right) \\
      &= i \hbar \left(- \delta_{il} \delta_{jm} x_m p_l
                       + \delta_{im} \delta_{jl} x_m p_l\right) \\
      &= i \hbar \left(\delta_{im} \delta_{jl}
                       - \delta_{il} \delta_{jm} \right) x_m p_l \\
      &= i \hbar \epsilon_{ijk} \epsilon_{mlk} x_m p_l \\
      &= i \hbar \epsilon_{ijk} \epsilon_{kml} x_m p_l \\
      &= i \hbar \epsilon_{ijk} L_k
  </EquationBlock>

  <p>Additionally, given that $r = \sqrt{x_ix_i}$, we have:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    [p_i, f(r)]
      &= -i \hbar \PP{f(r)}{x_i} \\
      &= -i \hbar \DD{f(r)}{r} \PP{r}{x_i} \\
      &= -i \hbar \DD{f(r)}{r} \frac{x_i}{r}
  </EquationBlock>

  <p>From this, we deduce:</p>

  <!-- prettier-ignore -->
  <EquationBlock split label="commutator-pi-1r">
    \left[p_i, \frac{1}{r}\right]
      &= -i \hbar \DDo{r} \left(\frac{1}{r}\right) \frac{x_i}{r} \\
      &= -i \hbar \left(-\frac{1}{r^2}\right) \frac{x_i}{r} \\
      &= i \hbar \frac{x_i}{r^3}
  </EquationBlock>

  <p>
    Using equation \eqref{commutator-pi-1r} and taking into account that $[x_i,
    f(r)] = 0$, we can then deduce:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="commutator-Li-1r">
    \left[L_i, \frac{1}{r}\right]
      &= \epsilon_{ijk} \left[x_j p_k, \frac{1}{r}\right] \\
      &= \epsilon_{ijk} x_j \left[p_k, \frac{1}{r}\right] \\
      &= \epsilon_{ijk} x_j i \hbar \frac{x_k}{r^3} \\
      &= \frac{i \hbar}{r^3} \epsilon_{ijk} x_j x_k \\
      &= 0
  </EquationBlock>

  <p>
    since $\epsilon_{ijk}$ is an anti-symmetric tensor. Equation
    \eqref{commutator-Li-1r} underscores the fact that $r$ remains invariant
    under rotations.
  </p>

  <SectionTitle>Computation of $[L_i, A_j]$</SectionTitle>

  <p>
    Using the commutators we have computed above, we can directly compute $[L_i,
    A_j]$:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="commutator-Li-Aj-step">
    [L_i, A_j]
      &= \left[L_i, \frac{1}{2} \epsilon_{jkl} (L_k p_l - p_k L_l)
               + me^2 \frac{x_j}{r}\right] \\
      &= \frac{1}{2} \epsilon_{jkl} \left([L_i, L_k p_l] - [L_i, p_k L_l]\right)
         + me^2 \left[L_i, \frac{x_j}{r}\right]
  </EquationBlock>

  <p>
    We will compute each of the terms above separately. From equations
    \eqref{commutator-pi-Lj}, \eqref{commutator-A-BC}, and
    \eqref{commutator-Li-Lj}, we find:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="commutator-Li-Lkpl">
    \epsilon_{jkl} [L_i, L_k p_l]
      &= \epsilon_{jkl} ([L_i, L_k] p_l + L_k [L_i, p_l]) \\
      &= \epsilon_{jkl} i \hbar \epsilon_{ikm} L_m p_l
         + \epsilon_{jkl} L_k (-i \hbar) \epsilon_{lim} p_m \\
      &= i \hbar \epsilon_{jlk} \epsilon_{imk} L_m p_l
         - i \hbar \epsilon_{jkl} \epsilon_{iml} L_k p_m \\
      &= i \hbar \left(
              (\delta_{ji} \delta_{lm} - \delta_{jm} \delta_{li}) L_m p_l
            - (\delta_{ji} \delta_{km} - \delta_{jm} \delta_{ki}) L_k p_m
          \right) \\
      &= i \hbar \left(
             \delta_{ji} L_m p_m - \delta_{jm} \delta_{li} L_m p_l
           - \delta_{ji} L_m p_m + \delta_{jm} \delta_{ki} L_k p_m
         \right) \\
      &= i \hbar \left(- \delta_{jm} \delta_{li} L_m p_l
                       + \delta_{jm} \delta_{ki} L_k p_m\right) \\
      &= i \hbar \left(- \delta_{jm} \delta_{li} L_m p_l
                       + \delta_{jl} \delta_{mi} L_m p_l\right) \\
      &= i \hbar \left(\delta_{im} \delta_{jl}
                       - \delta_{il} \delta_{jm}\right) L_m p_l \\
      &= i \hbar \epsilon_{ijk} \epsilon_{mlk} L_m p_l \\
      &= i \hbar \epsilon_{ijk} \epsilon_{kml} L_m p_l \\
      &= i \hbar \epsilon_{ijk} (\Vec{L} \times \Vec{p})_k
  </EquationBlock>

  <!-- prettier-ignore -->
  <EquationBlock split label="commutator-Li-pkLl">
    \epsilon_{jkl} [L_i, p_k L_l]
      &= \epsilon_{jkl} ([L_i, p_k] L_l + p_k [L_i, L_l]) \\
      &= \epsilon_{jkl} (-i \hbar) \epsilon_{kim} p_m L_l
         + \epsilon_{jkl} p_k i \hbar \epsilon_{ilm} L_m \\
      &= i \hbar \epsilon_{jlk} \epsilon_{imk} p_m L_l
         - i \hbar \epsilon_{jkl} \epsilon_{iml} p_k L_m \\
      &= i \hbar \left(
             (\delta_{ji} \delta_{lm} - \delta_{jm} \delta_{li}) p_m L_l
           - (\delta_{ji} \delta_{km} - \delta_{jm} \delta_{ki}) p_k L_m
         \right) \\
      &= i \hbar \left(
             \delta_{ji} p_m L_m - \delta_{jm} \delta_{li} p_m L_l
           - \delta_{ji} p_m L_m + \delta_{jm} \delta_{ki} p_k L_m
         \right) \\
      &= i \hbar \left(- \delta_{jm} \delta_{li} p_m L_l
                       + \delta_{jm} \delta_{ki} p_k L_m\right) \\
      &= i \hbar \left(- \delta_{jm} \delta_{li} p_m L_l
                       + \delta_{jl} \delta_{mi} p_m L_l\right) \\
      &= i \hbar \left(\delta_{im} \delta_{jl}
                       - \delta_{il} \delta_{jm}\right) p_m L_l \\
      &= i \hbar \epsilon_{ijk} \epsilon_{mlk} p_m L_l \\
      &= i \hbar \epsilon_{ijk} \epsilon_{kml} p_m L_l \\
      &= i \hbar \epsilon_{ijk} (\Vec{p} \times \Vec{L})_k
  </EquationBlock>

  <p>
    Finally, using equations \eqref{commutator-xi-Lj} and
    \eqref{commutator-Li-1r}, we have:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="commutator-Li-xjr">
    \left[L_i, \frac{x_j}{r}\right]
      &= \frac{1}{r} [L_i, x_j] \\
      &= \frac{1}{r} (-i \hbar) \epsilon_{jik} x_k \\
      &= i \hbar \epsilon_{ijk} \frac{x_k}{r} \\
      &= i \hbar \epsilon_{ijk} \left(\frac{\Vec{x}}{r}\right)_k
  </EquationBlock>

  <p>
    Using equations \eqref{commutator-Li-Lkpl}, \eqref{commutator-Li-pkLl}, and
    \eqref{commutator-Li-xjr} in equation \eqref{commutator-Li-Aj-step} yields:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    [L_i, A_j]
      &= \frac{1}{2} \epsilon_{jkl} \left([L_i, L_k p_l] - [L_i, p_k L_l]\right)
         + me^2 \left[L_i, \frac{x_j}{r}\right] \\
      &= \frac{1}{2} \left(
             i \hbar \epsilon_{ijk} (\Vec{L} \times \Vec{p})_k
           - i \hbar \epsilon_{ijk} (\Vec{p} \times \Vec{L})_k
         \right) + me^2 i \hbar \epsilon_{ijk} \left(\frac{\Vec{x}}{r}\right)_k \\
      &= i \hbar \epsilon_{ijk} \left(
             \frac{1}{2} \left((\Vec{L} \times \Vec{p})_k
                               - (\Vec{p} \times \Vec{L})_k\right)
           + me^2 \left(\frac{\Vec{x}}{r}\right)_k
         \right)
  </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock> [L_i, A_j] = i \hbar \epsilon_{ijk} A_k </EquationBlock>

  <SectionTitle>Computation of $[A_i, A_j]$</SectionTitle>

  <p>
    The computation of $[A_i, A_j]$ is lengthy and tedious. While it doesn't
    introduce any new techniques beyond what we have discussed above, we will
    simply state the result of this commutator. However, readers are strongly
    encouraged to prove the equation below on their own. This derivation is an
    excellent opportunity to gain a deeper understanding of everything covered
    so far. For assistance, there is plenty of helpful material available
    <a href="files/hydrogen-energy-eigenvalues.pdf">here</a>:
  </p>

  <EquationBlock> [A_i, A_j] = -i \hbar 2m \epsilon_{ijk} L_k H </EquationBlock>

  <p>where $H$ is the Hamiltonian given in equation \eqref{hamiltonian}.</p>

  <SectionTitle>The $\Vec{K}^+$ and $\Vec{K}^-$ operators</SectionTitle>

  <p>
    Imagine we have an eigenstate of $H$ that represents a bound state with
    energy eigenvalue $E = -\kappa^2 / 2m$, where $\kappa \gt 0$. It's worth
    noting that the assumption $E \lt 0$ is valid for a bound state. If $E \geq
    0$, it would mean the electron possesses sufficient kinetic energy to break
    free from the proton's electric potential. Let's define the operators
    $\Vec{K}^{\pm}$ as follows:
  </p>

  <EquationBlock>
    \Vec{K}^{\pm} = \frac{1}{2} \Vec{L} \pm \frac{1}{2 \kappa} \Vec{A}
  </EquationBlock>

  <p>Our aim is to compute $[K^+_i, K^-_j]$ and $[K^\pm_i, K^\pm_j]$.</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    [K^+_i, K^-_j]
      &= \frac{1}{4} [L_i, L_j] - \frac{1}{4 \kappa} [L_i, A_j]
         + \frac{1}{4 \kappa} [A_i, L_j] - \frac{1}{4 \kappa^2} [A_i, A_j] \\
      &= \frac{i \hbar}{4} \left(
             \epsilon_{ijk} L_k
           - \frac{1}{\kappa} \epsilon_{ijk} A_k
           - \frac{1}{\kappa} \epsilon_{jik} A_k
           - \frac{1}{\kappa^2} (-2m) \epsilon_{ijk} L_k H
         \right) \\
      &= \frac{i \hbar}{4} \left(
             \epsilon_{ijk} L_k
           - \frac{1}{\kappa} \epsilon_{ijk} A_k
           + \frac{1}{\kappa} \epsilon_{ijk} A_k
           - \frac{1}{\kappa^2} (-2m) \epsilon_{ijk} L_k H
         \right) \\
      &= \frac{i \hbar}{4} \left(
             \epsilon_{ijk} L_k
           - \frac{1}{\kappa^2} (-2m) \epsilon_{ijk} L_k H
         \right)
  </EquationBlock>

  <p>
    When applying this result to the aforementioned energy eigenstate, we
    recognize that $H \rightarrow E = -\kappa^2/2m$, leading to:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    [K^+_i, K^-_j]
      &= \frac{i \hbar}{4} \left(
             \epsilon_{ijk} L_k
           - \frac{1}{\kappa^2} (-2m) \epsilon_{ijk} L_k \frac{(-\kappa^2)}{2m}
         \right) \\
     &= \frac{i \hbar}{4} \left(\epsilon_{ijk} L_k - \epsilon_{ijk} L_k\right)
  </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock> [K^+_i, K^-_j] = 0 </EquationBlock>

  <p>Also:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    [K^\pm_i, K^\pm_j]
      &= \frac{1}{4} [L_i, L_j] \pm \frac{1}{4 \kappa} [L_i, A_j]
         \pm \frac{1}{4 \kappa} [A_i, L_j] + \frac{1}{4 \kappa^2} [A_i, A_j] \\
      &= \frac{i \hbar}{4} \left(
               \epsilon_{ijk} L_k
           \pm \frac{1}{\kappa} \epsilon_{ijk} A_k
           \mp \frac{1}{\kappa} \epsilon_{jik} A_k
           + \frac{1}{\kappa^2} (-2m) \epsilon_{ijk} L_k H
         \right) \\
      &= \frac{i \hbar}{4} \left(
               \epsilon_{ijk} L_k
           \pm \frac{1}{\kappa} \epsilon_{ijk} A_k
           \pm \frac{1}{\kappa} \epsilon_{ijk} A_k
           + \frac{1}{\kappa^2} (-2m) \epsilon_{ijk} L_k H
         \right) \\
      &= \frac{i \hbar}{4} \epsilon_{ijk} \left(L_k \pm \frac{2}{\kappa} A_k
         + \frac{1}{\kappa^2} (-2m) L_k \frac{(-\kappa^2)}{2m} \right) \\
      &= \frac{i \hbar}{4} \epsilon_{ijk}
         \left(2 L_k \pm \frac{2}{\kappa} A_k\right) \\
      &= i \hbar \epsilon_{ijk} \left(\frac{1}{2} L_k
                                      \pm \frac{1}{2 \kappa}A_k\right)
  </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock label="commutator-Ki-Kj">
    [K^\pm_i, K^\pm_j] = i \hbar \epsilon_{ijk} K^{\pm}_k
  </EquationBlock>

  <SectionTitle>Computation of $\Vec{A}^2$</SectionTitle>

  <!-- prettier-ignore -->
  <EquationBlock split label="AA-step">
    \Vec{A}^2
      &= \Vec{A} \cdot \Vec{A} \\
      &= \frac{1}{4} \left((\Vec{L} \times \Vec{p}) \cdot (\Vec{L} \times \Vec{p})
         - (\Vec{L} \times \Vec{p}) \cdot (\Vec{p} \times \Vec{L})\right) \\
      &+ \frac{1}{4} \left(-(\Vec{p} \times \Vec{L}) \cdot (\Vec{L} \times \Vec{p})
       + (\Vec{p} \times \Vec{L}) \cdot (\Vec{p} \times \Vec{L})\right) \\
      &+ \frac{me^2}{2} (\Vec{L} \times \Vec{p} - \Vec{p} \times \Vec{L})
         \cdot \frac{\Vec{x}}{r}
       + \frac{me^2}{2} \frac{\Vec{x}}{r} \cdot
         (\Vec{L} \times \Vec{p} - \Vec{p} \times \Vec{L}) \\
      &+ m^2e^4 \frac{\Vec{x}}{r} \cdot \frac{\Vec{x}}{r}
  </EquationBlock>

  <p>Each of the terms in the equation above will be computed separately:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    (\Vec{L} \times \Vec{p}) \cdot (\Vec{L} \times \Vec{p})
      &= (\Vec{L} \times \Vec{p})_i (\Vec{L} \times \Vec{p})_i \\
      &= (\epsilon_{ijk} L_j p_k) (\epsilon_{ilm} L_l p_m) \\
      &= \epsilon_{jki} \epsilon_{lmi} L_j p_k L_l p_m \\
      &= (\delta_{jl} \delta_{km} - \delta_{jm} \delta_{kl}) L_j p_k L_l p_m \\
      &= L_j p_k L_j p_k - L_j p_k L_k p_j
  </EquationBlock>

  <p>Since $\epsilon_{ijk}$ is anti-symmetric, we have:</p>

  <EquationBlock>
    p_k L_k = \Vec{p} \cdot \Vec{L} = \epsilon_{ijk} p_i x_j p_k = 0
  </EquationBlock>

  <p>Therefore:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    (\Vec{L} \times \Vec{p}) \cdot (\Vec{L} \times \Vec{p})
      &= L_j p_k L_j p_k \\
      &= L_j (L_j p_k + [p_k, L_j]) p_k \\
      &= L_j L_j p_k p_k + i \hbar \epsilon_{kjm} p_m p_k \\
      &= \Vec{L}^2 \Vec{p}^2
  </EquationBlock>

  <p>
    Using a nearly identical sequence of derivation steps, we can also obtain
    the following three identities:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    (\Vec{L} \times \Vec{p}) \cdot (\Vec{p} \times \Vec{L})
      &= -\Vec{L}^2 \Vec{p}^2 \\
    (\Vec{p} \times \Vec{L}) \cdot (\Vec{L} \times \Vec{p})
      &= - (\Vec{L}^2 + 4 \hbar^2) \Vec{p}^2 \\
    (\Vec{p} \times \Vec{L}) \cdot (\Vec{p} \times \Vec{L})
      &= \Vec{L}^2 \Vec{p}^2
  </EquationBlock>

  <p>Let's now examine the other terms in equation \eqref{AA-step}:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    (\Vec{L} \times \Vec{p}) \cdot \frac{\Vec{x}}{r}
      &= \epsilon_{ijk} L_j p_k x_i \frac{1}{r} \\
      &= - L_j \epsilon_{jik} p_k x_i \frac{1}{r} \\
      &= - L_j L_j^\dagger \frac{1}{r} \\
      &= - \frac{\Vec{L^2}}{r}
  </EquationBlock>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \frac{\Vec{x}}{r} \cdot (\Vec{p} \times \Vec{L})
      &= \left((\Vec{p} \times \Vec{L})^\dagger \cdot
         \left(\frac{\Vec{x}}{r}\right)^\dagger\right)^\dagger \\
      &= \left(-(\Vec{L} \times \Vec{p}) \cdot \frac{\Vec{x}}{r}\right)^\dagger \\
      &= \left(\frac{\Vec{L^2}}{r}\right)^\dagger \\
      &= \frac{\Vec{L^2}}{r}
  </EquationBlock>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \frac{\Vec{x}}{r} \cdot (\Vec{L} \times \Vec{p})
      &= \frac{1}{r} \epsilon_{ijk} x_i L_j p_k \\
      &= \frac{1}{r} \epsilon_{ijk} (L_j x_i + [x_i, L_j]) p_k \\
      &= \frac{1}{r} (\epsilon_{ijk} L_j x_i p_k
                      + \epsilon_{ijk} i \hbar \epsilon_{ijm} x_m p_k) \\
      &= \frac{1}{r} (-\epsilon_{jik} L_j x_i p_k
                      + i \hbar \epsilon_{ikj} \epsilon_{imj} x_m p_k) \\
      &= \frac{1}{r} (- L_j L_j + i \hbar (\delta_{ii} \delta_{km}
                                           - \delta_{im} \delta_{ki}) x_m p_k) \\
      &= \frac{1}{r} (- \Vec{L}^2 + i \hbar (3 x_k p_k - x_i p_i)) \\
      &= \frac{1}{r} (- \Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p})
  </EquationBlock>

  <!-- prettier-ignore -->
  <EquationBlock split>
    (\Vec{p} \times \Vec{L}) \cdot \frac{\Vec{x}}{r}
      &= \left(\left(\frac{\Vec{x}}{r}\right)^\dagger
         \cdot (\Vec{p} \times \Vec{L})^\dagger\right)^\dagger \\
      &= \left(\frac{\Vec{x}}{r} \cdot (-\Vec{L} \times \Vec{p})\right)^\dagger \\
      &= -\left(
           \frac{1}{r} (- \Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p})
         \right)^\dagger \\
      &= -(-\Vec{L}^2 - 2i \hbar \Vec{p} \cdot \Vec{x}) \frac{1}{r} \\
      &= \left(\Vec{L}^2 + 2i \hbar p_i x_i\right) \frac{1}{r} \\
      &= \left(\Vec{L}^2 + 2i \hbar (x_i p_i + [p_i, x_i])\right) \frac{1}{r} \\
      &= \left(\Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p}
               + 2i \hbar (-i \hbar) \delta_{ii}\right) \frac{1}{r} \\
      &= (\Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p} + 6 \hbar^2) \frac{1}{r} \\
      &= \frac{1}{r} (\Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p} + 6 \hbar^2)
         + \left[2i \hbar \Vec{x} \cdot \Vec{p}, \frac{1}{r}\right] \\
      &= \frac{1}{r} (\Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p} + 6 \hbar^2)
         + 2i \hbar x_i \left[p_i, \frac{1}{r}\right] \\
      &= \frac{1}{r} (\Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p} + 6 \hbar^2)
         + 2i \hbar x_i i \hbar \frac{x_i}{r^3} \\
      &= \frac{1}{r} (\Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p} + 6 \hbar^2)
         - 2 \hbar^2 \frac{1}{r} \\
      &= \frac{1}{r} (\Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p} + 4 \hbar^2)
  </EquationBlock>

  <p>Combining all the results above with equation \eqref{AA-step} yields:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \Vec{A}^2
      &= \frac{1}{4} (\Vec{L}^2 \Vec{p}^2 + \Vec{L}^2 \Vec{p}^2
                      + \Vec{L}^2 \Vec{p}^2 + 4 \hbar^2 \Vec{p}^2
                      + \Vec{L}^2 \Vec{p}^2) \\
      &+ \frac{me^2}{2r} \left(
           - \Vec{L}^2 - \Vec{L}^2 - 2i \hbar \Vec{x} \cdot \Vec{p}
           - 4 \hbar^2 - \Vec{L}^2 + 2i \hbar \Vec{x} \cdot \Vec{p}
           - \Vec{L}^2
         \right) \\
      &+ m^2e^4 \\
      &= \Vec{L}^2 \Vec{p}^2 + \hbar^2 \Vec{p}^2 - \frac{2me^2}{r} \Vec{L}^2
         - \frac{2me^2 \hbar^2}{r} + m^2e^4 \\
      &= (\Vec{L}^2 + \hbar^2) \left(\Vec{p}^2 - \frac{2me^2}{r}\right) + m^2e^4 \\
      &= (\Vec{L}^2 + \hbar^2) 2mH + m^2e^4
  </EquationBlock>

  <p>
    Applying this result to our energy eigenstate, we find $H \rightarrow E =
    -\kappa^2/2m$, so we get:
  </p>

  <EquationBlock label="AA">
    \Vec{A}^2 = -\kappa^2 (\Vec{L}^2 + \hbar^2) + m^2e^4
  </EquationBlock>

  <SectionTitle>Determination of $E$ in terms of $\Vec{K}^\pm$</SectionTitle>

  <p>Since both $\Vec{L}$ and $\Vec{A}$ are self-adjoint operators, then:</p>

  <!-- prettier-ignore -->
  <EquationBlock>
    \Vec{L} \cdot \Vec{A} + \Vec{A} \cdot \Vec{L}
      = \Vec{L} \cdot \Vec{A} + (\Vec{L}^\dagger \cdot \Vec{A}^\dagger)^\dagger
      = \Vec{L} \cdot \Vec{A} + (\Vec{L} \cdot \Vec{A})^\dagger
  </EquationBlock>

  <p>Given that:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \Vec{L} \cdot \Vec{A}
      &= \Vec{L} \cdot \frac{1}{2} (\Vec{L} \times \Vec{x} - \Vec{x} \times \Vec{L})
        + me^2 \Vec{L} \cdot \frac{\Vec{x}}{r} \\
      &= me^2 (\Vec{x} \times \Vec{p}) \cdot \frac{\Vec{x}}{r} \\
      &= 0
  </EquationBlock>

  <p>then:</p>

  <EquationBlock label="LA-AL">
    \Vec{L} \cdot \Vec{A} + \Vec{A} \cdot \Vec{L} = 0
  </EquationBlock>

  <p>From equations \eqref{AA} and \eqref{LA-AL}, it follows that:</p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    (\Vec{K}^\pm)^2
      &= \Vec{K}^\pm \cdot \Vec{K}^\pm \\
      &= \frac{1}{4} \Vec{L} \cdot \Vec{L}
         \pm \frac{1}{4 \kappa} (\Vec{L} \cdot \Vec{A} + \Vec{A} \cdot \Vec{L})
         + \frac{1}{4 \kappa^2} \Vec{A} \cdot \Vec{A} \\
      &= \frac{1}{4} \Vec{L}^2
         + \frac{1}{4 \kappa^2} (-\kappa^2 (\Vec{L}^2 + \hbar^2) + m^2e^4) \\
      &= \frac{1}{4} \Vec{L}^2 - \frac{1}{4} \Vec{L}^2 - \frac{\hbar^2}{4} +
         \frac{m^2e^4}{4 \kappa^2}
  </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock label="Kp2">
    (\Vec{K}^+)^2 = (\Vec{K}^-)^2 = \frac{1}{4} \left(-\hbar^2 +
    \frac{m^2e^4}{\kappa^2}\right)
  </EquationBlock>

  <p>Using this result, it follows that:</p>

  <EquationBlock label="E-step">
    E = -\frac{\kappa^2}{2m} = -\frac{m^2e^4}{2m} \left(\hbar^2 + 4
    (\Vec{K}^\pm)^2\right)^{-1}
  </EquationBlock>

  <SectionTitle>Final expression for $E$</SectionTitle>

  <p>
    As demonstrated in equation \eqref{commutator-Ki-Kj}, the operators $K^+_i$
    and $K^-_i$ satisfy the commutation relations of angular momentum operators:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    [K^+_i, K^+_j] &= i \hbar \epsilon_{ijk} K^+_k \\
    [K^-_i, K^-_j] &= i \hbar \epsilon_{ijk} K^-_k
  </EquationBlock>

  <p>From this, it directly follows that:</p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    [(\Vec{K}^+)^2, K^+_i] &= 0 \\
    [(\Vec{K}^-)^2, K^-_i] &= 0
  </EquationBlock>

  <p>
    Using
    <a href="https://en.wikipedia.org/wiki/Ladder_operator">ladder operators</a
    >, it's straightforward to
    <a
      href="https://en.wikipedia.org/wiki/Angular_momentum_operator#Derivation_using_ladder_operators"
      >prove</a
    >
    that the eigenvalues of $(\Vec{K}^+)^2$ and $(\Vec{K}^-)^2$ are of the form
    $\hbar^2 j (j+1)$, where the values of $j$ can either be integers or
    half-integers, i.e., $j = (n - 1) /2$ for integer values $n \geq 1$. Since
    we assume an energy eigenstate with energy $E = -\kappa^2 / 2m$, and given
    that equation \eqref{Kp2} implies that such a state is also an eigenstate of
    both $(\Vec{K}^+)^2$ and $(\Vec{K}^-)^2$, then from equation \eqref{E-step}
    we obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    E &= -\frac{m^2e^4}{2m} \left(\hbar^2 + 4 (\Vec{K}^\pm)^2\right)^{-1} \\
      &= -\frac{m^2e^4}{2m} \left(\hbar^2 + 4 \hbar^2 j (j + 1)\right)^{-1} \\
      &= -\frac{m^2e^4}{2m} \left(
           \hbar^2 + 4 \hbar^2 \frac{n - 1}{2} \frac{n + 1}{2}
         \right)^{-1} \\
      &= -\frac{m^2e^4}{2m} \left(\hbar^2 + \hbar^2 (n^2 - 1)\right)^{-1}
  </EquationBlock>

  <p>
    Finally, we arrive at our desired result, which we express as $E_n$ to make
    its dependence on $n$ explicit:
  </p>

  <EquationBlock> E_n = -\frac{me^4}{2 \hbar^2 n^2} </EquationBlock>

  <p>
    Since we used $4 \pi \epsilon_0 = 1$ in equation \eqref{hamiltonian}, we can
    substitute $e^2$ with $e^2 / 4 \pi \epsilon_0$ to obtain the
    <a href="https://en.wikipedia.org/wiki/Hydrogen_atom#Bohr-Sommerfeld_Model"
      >energy levels</a
    >
    in SI units:
  </p>

  <EquationBlock boxed>
    E_n = -\frac{me^4}{2 \hbar^2 (4 \pi \epsilon_0)^2 n^2}
  </EquationBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
