<template>
  <p>
    Let $A$ and $B$ be two events and let $P(A|B)$ be the conditional
    probability of $A$ given that $B$ has occurred. Then
    <a href="https://en.wikipedia.org/wiki/Bayes%27_theorem">Bayes' theorem</a>
    states that:
  </p>

  <BlockEquation boxed>
    P(B|A) = \frac{P(A|B)P(B)}{P(A)} = \frac{P(A|B)P(B)}{P(A|B)P(B)+
    P(A|B^c)P(B^c)}
  </BlockEquation>

  <p>
    In other words, Bayes' theorem gives us the conditional probability of $B$
    given that $A$ has occurred as long as we know $P(A|B)$, $P(A|B^c)$ and
    $P(B) = 1 - P(B^c)$.
  </p>

  <p>
    The proof of this equation is quite simple. First, consider the following
    facts:
  </p>

  <BlockEquation>
    P(A|B) \coloneqq \frac{P(A \cap B)}{P(B)} \Longrightarrow P(A \cap B) =
    P(A|B)P(B)
  </BlockEquation>

  <!-- prettier-ignore -->
  <BlockEquation align>
    P(A) &= P((A \cap B) \cup (A \cap B^c)) \\
         &= P(A \cap B) + P(A \cap B^c) \\
         &= P(A|B)P(B) + P(A|B^c)P(B^c) \label{second_fact}
  </BlockEquation>

  <p>
    where in equation \eqref{second_fact} the fact that $A \cap B$ and $A \cap
    B^c$ are mutually exclusive events was used. Therefore, since $A \cap B = B
    \cap A$:
  </p>

  <!-- prettier-ignore -->
  <BlockEquation align>
    P(B|A) &= \frac{P(B \cap A)}{P(A)} \\
           &= \frac{P(A|B)P(B)}{P(A)} \\
           &= \frac{P(A|B)P(B)}{P(A|B)P(B) + P(A|B^c)P(B^c)}\label{proof}
  </BlockEquation>

  <p>
    as we wanted to prove. We can also prove a very interesting formula using
    Bayes' theorem. From equation \eqref{proof} (used with both $B$ and $B^c$)
    and equation \eqref{second_fact}, we have:
  </p>

  <BlockEquation>
    P(B|A) + P(B^c|A) = \frac{P(A|B)P(B)}{P(A)} + \frac{P(A|B^c)P(B^c)}{P(A)} =
    \frac{P(A)}{P(A)} = 1
  </BlockEquation>

  <p>so we obtain:</p>

  <BlockEquation boxed> P(B|A) = 1 - P(B^c|A) </BlockEquation>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import mathjax from "@/mathjax";

onMounted(() => {
  mathjax.render();
});
</script>
