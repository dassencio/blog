<template>
  <p>
    If you're a physicist, or at least know a bit about the
    <a href="https://en.wikipedia.org/wiki/Theory_of_relativity"
      >theory of relativity</a
    >, your answer to this question might be a confident "no". Sure, if nothing
    can exceed the speed of light, one would need an infinite amount of time to
    travel an infinite distance. But let's put the relativistic laws of physics
    aside and imagine a purely Newtonian universe. In such a universe, any
    object can move arbitrarily fast. But would it be possible to travel to
    infinity in a finite amount of time? As we will show below, the answer is
    yes.
  </p>

  <p>
    Let's prove this with an example. Imagine an object at $x = 0$ that is at
    rest at $t = 0$. Between $t = 0$ and some $t = T \gt 0$, a force $F(t)$
    pointing along the positive $x$-axis is applied to the object. This force is
    given by:
  </p>

  <EquationBlock> F(t) = \frac{\alpha}{(T - t)^3} </EquationBlock>

  <p>
    for some constant $\alpha \gt 0$. For $0 \leq t \lt T$, the value of $F(t)$
    is positive and finite. Its value increases as $t \rightarrow T$ (here, and
    in what follows, $t \rightarrow T$ means $t$ approaches $T$ from the left
    side, so $t \lt T$) and diverges at $t = T$.
  </p>

  <p>
    If the mass of the object is $m$,
    <a href="https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion"
      >Newton's second law of motion</a
    >
    states that:
  </p>

  <EquationBlock>
    F(t) = ma(t) = m\ddot{x}(t) = \frac{\alpha}{(T - t)^3}
  </EquationBlock>

  <p>
    where $a(t)$ is the acceleration experienced by the object at time $t$. This
    implies that:
  </p>

  <EquationBlock>
    \ddot{x}(t) = \frac{\alpha}{m}\frac{1}{(T - t)^3} \Longrightarrow \int_{t' =
    0}^{t' = t} \ddot{x}(t')\D{t'} = \int_{t' = 0}^{t' = t}
    \frac{\alpha}{m}\frac{1}{(T - t')^3}\D{t'}
  </EquationBlock>

  <p>
    The integral on the right-hand side can be computed by letting $w \ColonEq T
    - t'$, with $\Di{w} = -\Di{t'}$:
  </p>

  <EquationBlock>
    \dot{x}(t) - \dot{x}(0) = \frac{\alpha}{m}\int_{w = T}^{w = T - t}
    \frac{(-1)}{w^3}\D{w} = \frac{\alpha}{m}\left(\frac{1}{2w^2}\right)
    \bigg|_{w = T}^{w = T - t}
  </EquationBlock>

  <p>Since the object is initially at rest, we get:</p>

  <EquationBlock label="velocity">
    \dot{x}(t) = \frac{\alpha}{2m}\left[ \frac{1}{(T - t)^2} - \frac{1}{T^2}
    \right]
  </EquationBlock>

  <p>
    This expression gives us the velocity $v(t) = \dot{x}(t)$ of the object at
    time $t$ for $0 \leq t \lt T$. For all $0 \lt t \lt T$, we have $\dot{x}(t)
    \gt 0$ since, in this interval, $(T - t) \lt T$. The velocity diverges at $t
    = T$.
  </p>

  <p>Integrating equation \eqref{velocity} with respect to time yields:</p>

  <EquationBlock>
    \int_{t' = 0}^{t' = t}\dot{x}(t')\D{t'} = \frac{\alpha}{2m}\left[ \int_{t' =
    0}^{t' = t}\frac{1}{(T - t')^2}\D{t'} - \int_{t' = 0}^{t' =
    t}\frac{1}{T^2}\D{t'} \right]
  </EquationBlock>

  <p>
    Computing the second integral on the right-hand side is a trivial task since
    the integrand $1/T^2$ is a constant. To compute the first integral on the
    right-hand side, let $w \ColonEq T - t'$, with $\Di{w} = -\Di{t'}$. We then
    obtain:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align label="position">
    x(t) - x(0)
      &= \frac{\alpha}{2m}\left[ \int_{w = T}^{w = T
         - t}\frac{(-1)}{w^2}\D{w} - \frac{t}{T^2} \right] \\
      &= \frac{\alpha}{2m}\left[ \left(\frac{1}{w}\right)\bigg|_{w = T}^{w = T - t}
         - \frac{t}{T^2}\right] \\
      &= \frac{\alpha}{2m}\left[ \frac{1}{T - t} - \frac{1}{T} -
         \frac{t}{T^2}\right] \\
      &= \frac{\alpha}{2m}\left[ \frac{T^2 - T(T- t) - t(T - t)}{T^2(T - t)} \right] \\
      &= \frac{\alpha}{2m}\left[ \frac{T^2 - T^2 + Tt - tT + t^2}{T^2(T - t)} \right] \\
      &= \frac{\alpha}{2mT^2} \frac{t^2}{(T - t)}
  </EquationBlock>

  <p>
    The object is initially at $x = 0$, so equation \eqref{position} yields:
  </p>

  <EquationBlock>
    x(t) = \frac{\alpha}{2mT^2} \frac{t^2}{(T - t)}
  </EquationBlock>

  <p>
    Since $\dot{x}(t) \gt 0$ for $0 \lt t \lt T$, $x(t)$ increases monotonically
    during this time interval. As $t \rightarrow T$, $x(t)$ diverges. In other
    words:
  </p>

  <EquationBlock>
    t \rightarrow T \Longrightarrow x(t) \rightarrow \infty
  </EquationBlock>

  <p>
    so the object reaches infinity in a finite amount of time (namely, in time
    $T$).
  </p>

  <p>
    Although theoretically possible, one would have to come up with a way to
    produce such a force on an object. But that task, dear reader, I will leave
    as an exercise for you! ;-)
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
