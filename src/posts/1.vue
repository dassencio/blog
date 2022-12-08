<template>
  <p>
    Let $A$ and $B$ be two events and let $P(A|B)$ be the conditional
    probability of $A$ given that $B$ has occurred. Then
    <a href="https://en.wikipedia.org/wiki/Bayes%27_theorem">Bayes' theorem</a>
    states that:
  </p>

  <EquationBlock>
    P(B|A) = \frac{P(A|B)P(B)}{P(A)} = \frac{P(A|B)P(B)}{P(A|B)P(B)+
    P(A|B^c)P(B^c)}
  </EquationBlock>

  <p>
    In other words, Bayes' theorem gives us the conditional probability of $B$
    given that $A$ has occurred as long as we know $P(A|B)$, $P(A|B^c)$ and
    $P(B) = 1 - P(B^c)$.
  </p>

  <p>
    The proof of this equation is quite simple. First, consider the following
    facts:
  </p>

  <EquationBlock>
    P(A|B) \ColonEq \frac{P(A \cap B)}{P(B)} \Longrightarrow P(A \cap B) =
    P(A|B)P(B)
  </EquationBlock>

  <!-- prettier-ignore -->
  <EquationBlock align>
    P(A) &= P((A \cap B) \cup (A \cap B^c)) \\
         &= P(A \cap B) + P(A \cap B^c) \\
         &= P(A|B)P(B) + P(A|B^c)P(B^c) \label{second_fact}
  </EquationBlock>

  <p>
    where in equation \eqref{second_fact} the fact that $A \cap B$ and $A \cap
    B^c$ are mutually exclusive events was used. Therefore, since $A \cap B = B
    \cap A$:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    P(B|A) &= \frac{P(B \cap A)}{P(A)} \\
           &= \frac{P(A|B)P(B)}{P(A)} \\
           &= \frac{P(A|B)P(B)}{P(A|B)P(B) + P(A|B^c)P(B^c)}\label{proof}
  </EquationBlock>

  <p>
    as we wanted to prove. We can also prove a very interesting formula using
    Bayes' theorem. From equation \eqref{proof} (used with both $B$ and $B^c$)
    and equation \eqref{second_fact}, we have:
  </p>

  <EquationBlock>
    P(B|A) + P(B^c|A) = \frac{P(A|B)P(B)}{P(A)} + \frac{P(A|B^c)P(B^c)}{P(A)} =
    \frac{P(A)}{P(A)} = 1
  </EquationBlock>

  <p>so we obtain:</p>

  <EquationBlock> P(B|A) = 1 - P(B^c|A) </EquationBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
