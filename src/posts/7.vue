<template>
  <p>
    Suppose you want to buy some candy at a store. You search your pockets and
    find that you have, in your local currency, an amount of money equal to
    $i^i$ (here, $i$ is the complex number $i$). You choose your candy and check
    its price: it costs $0.10$. Do you have enough money to buy it?
  </p>

  <p>
    If $i^i$ looks absurd to you, you might be surprised to learn that there is
    such a thing as
    <a href="http://mathworld.wolfram.com/ComplexExponentiation.html"
      >complex exponentiation</a
    >, and it's an extremely important tool with countless applications in
    mathematics, the natural sciences, and engineering.
  </p>

  <p>
    But back to the question: how do we compute $i^i$? The answer starts with
    the definition of the exponential function for a purely imaginary number
    $i\theta$, where $\theta$ is a real number:
  </p>

  <EquationBlock>
    e^{i\theta} \ColonEq \cos\theta + i\sin\theta \label{eulers-formula}
  </EquationBlock>

  <p>
    Equation \eqref{eulers-formula} is called
    <a href="https://en.wikipedia.org/wiki/Euler%27s_formula">Euler's formula</a
    >. If you're wondering what could motivate such a strange definition,
    consider the Taylor series for $e^x$, where $x$ is a real number:
  </p>

  <EquationBlock>
    e^x = 1 + \frac{x}{1!} + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} +
    \ldots = \sum_{n=0}^{\infty} \frac{x^n}{n!} \label{exp-taylor-series}
  </EquationBlock>

  <p>
    What would happen if we threw caution to the wind and decided to replace $x$
    with $i\theta$ in equation \eqref{exp-taylor-series}? Well, we would obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    e^{i\theta}
    &= 1 + \frac{(i\theta)}{1!} + \frac{(i\theta)^2}{2!} +
       \frac{(i\theta)^3}{3!} + \frac{(i\theta)^4}{4!} +
       \frac{(i\theta)^5}{5!} + \ldots \\
    &= 1 + i\theta - \frac{\theta^2}{2!} - i\frac{\theta^3}{3!} +
       \frac{\theta^4}{4!} + i\frac{\theta^5}{5!} + \ldots \\
    &= \left(1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} + \ldots\right) +
       i\left(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} +
       \ldots\right) \\
    &= \cos\theta + i\sin\theta
  </EquationBlock>

  <p>
    where above we used the Taylor series for both $\cos\theta$ and
    $\sin\theta$. This is exactly what we have in equation
    \eqref{eulers-formula}!
  </p>

  <p>
    In general, since any complex number $z$ can be expressed as $z = a + ib$,
    where both $a$ and $b$ are real numbers, we can compute $e^{a + ib}$ as
    follows:
  </p>

  <EquationBlock>
    e^z = e^{a + ib} \ColonEq e^a e^{ib} = e^a(\cos{b} + i\sin{b})
  </EquationBlock>

  <p>
    Now, we can define the logarithm of a complex number. Since every nonzero
    complex number $z$ can be uniquely written in the form $z = |z|(\cos\theta +
    i\sin\theta)$ for some $\theta$ such that $0 \leq \theta \lt 2\pi$, we can
    write:
  </p>

  <EquationBlock>
    z = |z|(\cos\theta + i\sin\theta) = |z|e^{i\theta} = e^{\log|z|} e^{i\theta}
    = e^{\log|z| + i\theta}
  </EquationBlock>

  <p>
    This leads us to define the logarithm of a complex number $z \neq 0$ as:
  </p>

  <EquationBlock>
    \log{z} = \log(e^{\log|z| + i\theta}) \ColonEq \log|z| + i\theta
    \label{complex-log}
  </EquationBlock>

  <p>
    The value of $\log{z}$ is uniquely defined provided that we enforce $0 \leq
    \theta \lt 2\pi$. This restriction is important because in $z =
    |z|(\cos\theta + i\sin\theta)$, there are infinitely many possible values of
    $\theta$ since, for any integer $n$:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \cos(\theta + 2\pi n) &= \cos\theta \\
    \sin(\theta + 2\pi n) &= \sin\theta
  </EquationBlock>

  <p>
    As a next step, let's use equation \eqref{complex-log} to compute $\log i$.
    Since $|i| = 1$, we have:
  </p>

  <EquationBlock>
    i = 0 + i = \cos(\pi/2) + i\sin(\pi/2) = e^{i\pi/2} = |i|e^{i\pi/2}
  </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock>
    \log i = \log|i| + i\pi/2 = \log 1 + i\pi/2 = i\pi/2 \label{log-i}
  </EquationBlock>

  <p>
    The last ingredient we need is to understand how to compute $z^w$ for two
    complex numbers $z$ and $w$, with $z \neq 0$. This can be done using the
    following definition:
  </p>

  <EquationBlock> z^w \ColonEq e^{w\log z} </EquationBlock>

  <p>
    This is motivated by the fact that for any pair of real numbers $x \gt 0$
    and $y$, we have $x^y = e^{\log x^y} = e^{y\log x}$.
  </p>

  <p>
    If you have followed along this far, you're probably eager to know what the
    value of $i^i$ is. Let's go ahead and compute it:
  </p>

  <EquationBlock boxed>
    i^i = e^{i\log i} = e^{i (i\pi/2)} = e^{-\pi/2} \approx 0.2078
  </EquationBlock>

  <p>
    Here, equation \eqref{log-i} was used. Interestingly, $i^i$ is a real
    number!
  </p>

  <p>
    Well, there you have it. You can now go ahead and buy your candy. You
    deserve it! :-)
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
