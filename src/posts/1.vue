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
    P(A|B) := \frac{P(A \cap B)}{P(B)} \Longrightarrow P(A \cap B) = P(A|B)P(B)
  </BlockEquation>

  <BlockEquation>
    \begin{eqnarray} P(A) &amp; = &amp; P((A \cap B) \cup (A \cap B^c))
    \nonumber\\[5pt] &amp; = &amp; P(A \cap B) + P(A \cap B^c) \nonumber\\[5pt]
    &amp; = &amp; P(A|B)P(B) + P(A|B^c)P(B^c) \label{second_fact} \end{eqnarray}
  </BlockEquation>

  <p>
    where on equation \eqref{second_fact} the fact that $A \cap B$ and $A \cap
    B^c$ are mutually exclusive events was used. Therefore, since $A\cap B =
    B\cap A$:
  </p>

  <BlockEquation>
    \begin{eqnarray} P(B|A) &amp;=&amp; \frac{P(B \cap A)}{P(A)}
    \nonumber\\[5pt] &amp;=&amp; \frac{P(A|B)P(B)}{P(A)} \nonumber\\[5pt]
    &amp;=&amp; \frac{P(A|B)P(B)}{P(A|B)P(B)+ P(A|B^c)P(B^c)} \label{proof}
    \end{eqnarray}
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
import BlockEquation from "@/components/BlockEquation.vue";
import mathjax from "@/mathjax";

onMounted(() => {
  mathjax.render();
});
</script>
