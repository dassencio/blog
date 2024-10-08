<template>
  <p>
    Let $A$ and $B$ be two events, and let $P(A|B)$ be the conditional
    probability of $A$ given that $B$ has occurred.
    <RouterLink :to="{ name: '1' }">Bayes' theorem</RouterLink>
    states that:
  </p>

  <EquationBlock>
    P(B|A) = \frac{P(A|B)P(B)}{P(A|B)P(B)+ P(A|B^c)P(B^c)}
  </EquationBlock>

  <p>
    In other words, Bayes' theorem gives us the conditional probability of $B$
    given that $A$ has occurred as long as we know $P(A|B)$, $P(A|B^c)$, and
    $P(B) = 1 - P(B^c)$.
  </p>

  <p>
    Bayes' theorem is very important in the evaluation of medical tests. To
    understand why, let's start by assuming that we have a laboratory test
    designed to detect if a subject has a certain disease. In order to assess
    the quality of this test, the following events will be relevant:
  </p>

  <MapBlock>
    <span>$D$</span>
    <span>The subject has the disease.</span>

    <span>$D^c$</span>
    <span>The subject does not have the disease.</span>

    <span>$+$</span>
    <span>The laboratory test result for the subject is positive.</span>

    <span>$-$</span>
    <span>The laboratory test result for the subject is negative.</span>
  </MapBlock>

  <p>
    Note that a test result can be positive for a subject who does not have the
    disease (false positive), and also negative for a subject who has the
    disease (false negative). This fact motivates the definition of the
    following two conditional probabilities:
  </p>

  <MapBlock>
    <span>$P(+|D)$</span>
    <span>
      Probability that the test result for a subject with the disease is
      positive.
    </span>

    <span>$P(-|D^c)$</span>
    <span>
      Probability that the test result for a subject without the disease is
      negative.
    </span>
  </MapBlock>

  <p>
    These quantities are called the <b>sensitivity</b> and <b>specificity</b> of
    the test, respectively. Ideally, we would want $P(+|D) = P(-|D^c) = 1.0$
    ($100\%$), meaning that the test result would always correspond to the
    actual state of the subject (sick or not sick). However, in real-world
    tests, this is often not the case.
  </p>

  <p>
    To better understand the relevance of a test's sensitivity and specificity,
    suppose that our laboratory test has $P(+|D) = 0.997$ and $P(-|D^c) =
    0.985$. With such a test, the result for a subject who has the disease will
    be positive with probability $99.7\%$, while the test result for a subject
    who does not have the disease will be negative with probability $98.5\%$.
    Additionally, let's assume that $P(D) = 0.001$, i.e., the probability that a
    subject chosen randomly from the population has the disease is $0.1\%$.
  </p>

  <p>
    This is where things get intriguing. The numbers above give us the
    impression that the test results are almost always correct, but using Bayes'
    theorem and taking into account that $P(+|D^c) = 1 - P(-|D^c)$ (for a proof
    of this equation, see
    <RouterLink :to="{ name: '1' }">this post</RouterLink>), we have:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    P(D|+) &= \frac{P(+|D)P(D)}{P(+|D)P(D)+ P(+|D^c)P(D^c)} \\
           &= \frac{P(+|D)P(D)}{P(+|D)P(D)+ [1 - P(-|D^c)][1 - P(D)]}
  </EquationBlock>

  <p>which yields, after plugging in the numbers mentioned above:</p>

  <EquationBlock>
    P(D|+) = \frac{0.997\cdot 0.001}{0.997 \cdot 0.001 + 0.015 \cdot 0.999} =
    0.062
  </EquationBlock>

  <p>
    In other words, despite the fact that the test seems very accurate, if we
    run it on a randomly chosen subject, a positive result will only be correct
    in $6.2\%$ of the cases. How can this be?!
  </p>

  <p>
    In this scenario, the problem arises from the fact that the fraction of the
    population that has the disease is very small ($0.1\%$). To illustrate why
    this is the case, assume we have a very large population from which we
    randomly choose $N = 1,000,000$ individuals to take the test. Let $S$ be the
    set of tested subjects who have the disease ("sick"), and let $H$ be the set
    of tested subjects who do not have it ("healthy"). Denoting $|S|$ and $|H|$
    as the number of subjects in each of these groups, we can expect that:
  </p>

  <EquationBlock> |S| \approx N \cdot P(D) = 1000 </EquationBlock>
  <EquationBlock> |H| \approx N \cdot P(D^c) = 999,000 </EquationBlock>

  <p>
    The number $R^+_S$ of positive test results among the subjects in $S$ (true
    positives) will then be:
  </p>

  <EquationBlock> R^+_S \approx |S| \cdot P(+|D) = 997 </EquationBlock>

  <p>
    and the number $R^+_H$ of positive test results among the subjects in $H$
    (false positives) will be:
  </p>

  <EquationBlock> R^+_H \approx |H| \cdot P(+|D^c) = 14,985 </EquationBlock>

  <p>
    Therefore, $R^+_T = R^+_H + R^+_S \approx 15,982$ is the expected total
    number of positive test results. However, among the subjects who tested
    positive, the fraction of those who actually have the disease is:
  </p>

  <EquationBlock>
    \frac{R^+_S}{R^+_T} \approx \frac{997}{15,982} = 0.062 = P(D|+)
  </EquationBlock>

  <p>
    To summarize, even though positive test results are correct for $99.7\%$ of
    the subjects with the disease, the number $|H|$ of tested subjects without
    the disease being significantly larger than the number $|S|$ of tested
    subjects with the disease means the number of false positives ($R^+_H
    \approx 14,985$) greatly exceeds the number of true positives ($R^+_S
    \approx 997$). The accuracy of positive test results is therefore not high
    enough to make the test reliable for detecting whether a randomly chosen
    subject in this population has the disease or not.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
