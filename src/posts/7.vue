<template>
  <p>
    Suppose you want to buy some candy at a store. You search your pockets and
    find that you have, in your local currency, an amount of money equal to
    $i^i$ ($i$ here is really the complex number $i$). You choose a snack and
    check its price: its costs $0.10$. Do you have enough money to buy it?
  </p>

  <p>
    If $i^i$ looks absurd to you, you might be surprised by the fact that there
    is such a thing as
    <a href="http://mathworld.wolfram.com/ComplexExponentiation.html"
      >complex exponentiation</a
    >. It turns out that complex exponentiation is extremely important in
    mathematics, in the natural sciences and in engineering. Being myself a
    physicist, I dealt with complex exponentiation countless times when learning
    topics such as waves, circuits, fluids, classical mechanics, quantum
    mechanics and many others.
  </p>

  <p>
    But back to the question: how do we compute $i^i$? The answer starts with
    the definition of the exponential function for a purely imaginary number
    $i\theta$, where $\theta$ is a real number:
  </p>

  <EquationBlock boxed>
    e^{i\theta} \coloneqq \cos\theta + i\sin\theta \label{euler_eq}
  </EquationBlock>

  <p>
    Equation \eqref{euler_eq} is called
    <a href="https://en.wikipedia.org/wiki/Euler%27s_formula">Euler's formula</a
    >. If you're wondering what could motivate such a strange definition,
    consider the Taylor series for $e^x$, where $x$ is a real number:
  </p>

  <EquationBlock>
    e^x = 1 + \frac{x}{1!} + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} +
    \ldots = \sum_{n=0}^{\infty} \frac{x^n}{n!} \label{exp_real_def}
  </EquationBlock>

  <p>
    What would happen if we lost our senses and decided to replace $x$ with
    $i\theta$ in equation \eqref{exp_real_def}? Well, we would obtain:
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
    $\sin\theta$. This is exactly what we have in equation \eqref{euler_eq}!
  </p>

  <p>
    In general, since any complex number $z$ is such that $z = a + ib$ with both
    $a$ and $b$ being real numbers, then we can compute $e^{a + ib}$ through:
  </p>

  <EquationBlock boxed>
    e^z = e^{a + ib} \coloneqq e^a e^{ib} = e^a(\cos{b} + i\sin{b})
  </EquationBlock>

  <p>
    Now we can define the logarithm of a complex number. Since every nonzero
    complex number $z$ can be uniquely written in the form $z = |z|(\cos\theta +
    i\sin\theta)$ for some $\theta$ such that $0 \leq \theta \lt 2\pi$, then we
    can write:
  </p>

  <EquationBlock>
    z = |z|(\cos\theta + i\sin\theta) = |z|e^{i\theta} = e^{\log|z|} e^{i\theta}
    = e^{\log|z| + i\theta} \label{polar_form}
  </EquationBlock>

  <p>
    This leads us to define the logarithm of a complex number $z \neq 0$ as:
  </p>

  <EquationBlock boxed>
    \log{z} = \log(e^{\log|z| + i\theta}) \coloneqq \log|z| + i\theta
    \label{complex_log}
  </EquationBlock>

  <p>
    The value of $\log{z}$ is uniquely defined provided that we enforce $0 \leq
    \theta \lt 2\pi$. This restriction is important since on $z = |z|(\cos\theta
    + i\sin\theta)$ there are infinitely many possible values of $\theta$ values
    since:
  </p>

  <EquationBlock>
    \cos(\theta + 2\pi n) = \cos\theta \quad \sin(\theta + 2\pi n) = \sin\theta
  </EquationBlock>

  <p>
    for any integer $n$. As an example, let's compute $\log i$. Since $|i| = 1$,
    then:
  </p>

  <EquationBlock>
    i = 0 + i = \cos(\pi/2) + i\sin\left(\pi/2) = |i|(\cos(\pi/2) +
    i\sin(\pi/2)\right)
  </EquationBlock>

  <p>
    Using equations \eqref{polar_form} and \eqref{complex_log}, we then get:
  </p>

  <EquationBlock>
    \log i = \log|i| + i\pi/2 = \log 1 + i\pi/2 = i\pi/2 \label{log_i}
  </EquationBlock>

  <p>
    The last ingredient we need is how to compute $z^w$ for two complex numbers
    $z$ and $w$ with $z \neq 0$. This can be done according to the following
    definition:
  </p>

  <EquationBlock boxed> z^w \coloneqq e^{w\log z} </EquationBlock>

  <p>
    which is motivated by the fact that for any pair of real numbers $x \gt 0$
    and $y \neq 0$, we have $x^y = e^{\log x^y} = e^{y\log x}$.
  </p>

  <p>
    If you have endured all of this, you're probably eager to know what the
    value of $i^i$ is. So let's go ahead and compute it:
  </p>

  <EquationBlock boxed>
    i^i = e^{i\log i} = e^{i (i\pi/2)} = e^{-\pi/2} \approx 0.2078
  </EquationBlock>

  <p>
    where equation \eqref{log_i} was used. Interestingly, $i^i$ is a real
    number!
  </p>

  <p>
    Well, there you have it. You can now go ahead and buy your candy. You
    deserve it! :-)
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import mathjax from "@/mathjax";

onMounted(() => {
  mathjax.render();
});
</script>
