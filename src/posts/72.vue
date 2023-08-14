<template>
  <p>
    Anyone who works with technology intuitively knows that as more features are
    added to a system, its complexity increases rapidly and often in
    unpredictable ways. Given that a more complex system is more susceptible to
    incorrect or suboptimal functioning due to improper interactions of its
    components, one is led to wonder: how quickly does the complexity of a
    system grow with the addition of new features?
  </p>

  <p>
    Even if we could precisely quantify the complexity of a given system, its
    computation would likely require us to understand the system in its
    entirety, which is not our main goal here. Consider, instead, this simple
    question: for a system with $n$ features, how many pairwise feature
    interactions are possible?
  </p>

  <p>
    The question might seem abstract, so let's illustrate it with an example.
    Imagine a car. If a driver presses the gas pedal while the parking brake is
    engaged, the car might move, albeit at a slower pace than if the parking
    brake were disengaged. Operating in this mode over extended periods of time
    might even cause physical damage to the car. This example underscores how
    two features of the system (the gas pedal and the parking brake) can result
    in suboptimal performance when used incorrectly.
  </p>

  <p>
    The example above showcases just one of the many potential interactions
    between the features of a car. A car is indeed a complex system, and
    comprehending how its features interact is crucial for its effective
    operation. If a car possesses $n$ features, the total number of pairwise
    feature interactions, denoted as $N^{\small{(2)}}$, equates to the total
    number of possible
    <a href="https://en.wikipedia.org/wiki/Combinations">combinations</a> of two
    from those $n$ features:
  </p>

  <EquationBlock>
    N^{\small{(2)}} = \binom{n}{2} = \frac{n!}{2!(n-2)!} = \frac{n(n-1)}{2} =
    \frac{1}{2}(n^2 - n)
  </EquationBlock>

  <p>
    This result is quite revealing: the number of pairwise feature interactions
    grows quadratically as the number of features increases. Naturally, one
    might inquire about the number of possible interactions, $N^{\small{(3)}}$,
    when three features are involved. This corresponds to the total number of
    possible combinations of three out of the $n$ features:
  </p>

  <EquationBlock>
    N^{\small{(3)}} = \binom{n}{3} = \frac{n!}{3!(n-3)!} = \frac{n(n-1)(n-2)}{6}
    = \frac{1}{6}(n^3 - 3n^2 + 2n)
  </EquationBlock>

  <p>
    The situation has intensified: the complexity of our system now grows
    cubically with the number of features. Let's proceed and find the total
    number $N$ of possible interactions across any subset of the system's
    features:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    N &= N^{\small{(2)}} + N^{\small{(3)}} + \ldots + N^{\small{(n)}} \\
      &= \binom{n}{2} + \binom{n}{3} + \ldots + \binom{n}{n} \\
      &= \sum_{k=0}^n \binom{n}{k} - \binom{n}{1} - \binom{n}{0} \\
      &= \sum_{k=0}^n \binom{n}{k} - n - 1
    \label{N}
  </EquationBlock>

  <p>
    To compute the sum in the last line of equation \eqref{N}, we can employ the
    <a href="https://en.wikipedia.org/wiki/Binomial_theorem">binomial theorem</a
    >:
  </p>

  <EquationBlock>
    (x + y)^n = \sum_{k=0}^n \binom{n}{k} x^{n-k} y^k
  </EquationBlock>

  <p>By setting both $x$ and $y$ to 1, we obtain:</p>

  <EquationBlock>
    (1 + 1)^n = 2^n = \sum_{k=0}^n \binom{n}{k} \label{binomial-theorem}
  </EquationBlock>

  <p>
    The right-hand side of equation \eqref{binomial-theorem} matches the sum in
    the last line of equation \eqref{N}. Therefore:
  </p>

  <EquationBlock boxed>N = 2^n - n - 1</EquationBlock>

  <p>
    As $n$ increases, the value of $N$ becomes predominantly influenced by the
    term $2^n$. In other words, the number of possible feature interactions
    grows exponentially with the number of features.
  </p>

  <p>
    Despite its simplistic nature, the above analysis has profound implications
    for the development and testing of technologies. As a system accrues more
    features, the number of potential interactions between these features grows
    at such a fast rate that it quickly surpasses human comprehension. Testing
    every possible scenario evolves from being challenging to becoming
    practically unfeasible. Consequently, unexpected issues might surface in the
    production version of the system &mdash; some of which can be particularly
    embarrassing for its creators.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
