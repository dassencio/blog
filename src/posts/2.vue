<template>
  <p>
    Let $A$ and $B$ be two events and let $P(A|B)$ be the conditional
    probability of $A$ given that $B$ has occurred.
    <RouterLink :to="{ name: '1' }">Bayes' theorem</RouterLink>
    states that:
  </p>

  <BlockEquation>
    P(B|A) = \frac{P(A|B)P(B)}{P(A|B)P(B)+ P(A|B^c)P(B^c)}
  </BlockEquation>

  <p>
    In other words, Bayes' theorem gives us the conditional probability of $B$
    given that $A$ has occurred as long as we know $P(A|B)$, $P(A|B^c)$ and
    $P(B) = 1 - P(B^c)$.
  </p>

  <p>
    Bayes' theorem is very important in the evaluation of medical tests. To
    understand why, let's start by assuming that we have a laboratory test
    designed to detect if a subject has a certain disease. In order to assess
    the quality of this test, the following events will be relevant:
  </p>

  <ResponsiveList itemized>
    <div>$D$</div>
    <div>The subject has the disease.</div>
    <div>$D^c$</div>
    <div>The subject does not have the disease.</div>
    <div>$+$</div>
    <div>The laboratory test result for the subject is positive.</div>
    <div>$-$</div>
    <div>The laboratory test result for the subject is negative.</div>
  </ResponsiveList>

  <p>
    Notice that a test result can be positive for a subject who does not have
    the disease (false positive) and also negative for a subject who has the
    disease (false negative). This fact motivates the definition of the
    following two conditional probabilities:
  </p>

  <ResponsiveList itemized>
    <div>$P(+|D)$</div>
    <div>
      Probability that the test result for a subject who has the disease is
      positive.
    </div>
    <div>$P(-|D^c)$</div>
    <div>
      Probability that the test result for a subject who does not have the
      disease is negative.
    </div>
  </ResponsiveList>

  <p>
    These quantities are called the <strong>sensitivity</strong> and
    <strong>specificity</strong> of the test respectively. Ideally, we would
    have $P(+|D) = P(-|D^c) = 1.0$ ($100\%$), meaning the result of the test
    would always correspond to the actual state of the subject (sick or not
    sick). For real world tests, however, this is often not the case.
  </p>

  <p>
    To better understand the relevance of a test's sensitivity and specificity,
    suppose that our laboratory test has $P(+|D) = 0.997$ and $P(-|D^c) =
    0.985$. For such a test, the result for a subject who has the disease will
    be positive with probability $99.7\%$ while the test result for a subject
    who does not have the disease will be negative with probability $98.5\%$.
    Additionally, let's assume that $P(D) = 0.001$, i.e., that the probability
    that a subject chosen randomly from the population has the disease is
    $0.1\%$.
  </p>

  <p>
    Here is where things get strange. The numbers above give us the impression
    that the test results are almost always correct, but from Bayes' theorem and
    using the fact that $P(+|D^c) = 1 - P(-|D^c)$ (for a proof of this equation,
    see
    <RouterLink :to="{ name: '1' }">this post</RouterLink>), we have:
  </p>

  <!-- prettier-ignore -->
  <BlockEquation align>
    P(D|+) &= \frac{P(+|D)P(D)}{P(+|D)P(D)+ P(+|D^c)P(D^c)} \\
           &= \frac{P(+|D)P(D)}{P(+|D)P(D)+ [1 - P(-|D^c)][1 - P(D)]}
  </BlockEquation>

  <p>which yields, after plugging in the numbers mentioned above:</p>

  <BlockEquation>
    P(D|+) = \displaystyle\frac{0.997\times 0.001}{0.997 \times 0.001 + 0.015
    \times 0.999} = 0.062
  </BlockEquation>

  <p>
    In other words, despite the fact that the test seems very accurate, if we
    run it on a randomly chosen subject, a positive result will be correct only
    in $6.2\%$ of the cases. How can that be?!
  </p>

  <p>
    In this scenario, the problem arises from the fact that the fraction of the
    population which has the disease is very small ($0.1\%$). To illustrate why
    this is the case, assume we have a very large population from which we
    randomly choose $N = 1000000$ individuals to take the test. Let $S$ be the
    set of tested subjects who have the disease ("sick") and let $H$ be the set
    of tested subjects who do not have it ("healthy"). Denoting $|S|$ and $|H|$
    as the number of subjects in each of these groups, we can expect that:
  </p>

  <BlockEquation> |S| \approx N\times P(D) = 1000 </BlockEquation>
  <BlockEquation> |H| \approx N\times P(D^c) = 999000 </BlockEquation>

  <p>
    The number $R^+_S$ of positive test results among the subjects in $S$ (true
    positives) will then satisfy:
  </p>

  <BlockEquation> R^+_S \approx |S|\times P(+|D) = 997 </BlockEquation>

  <p>
    and the number $R^+_H$ of positive test results among the subjects in $H$
    (false positives) will satisfy:
  </p>

  <BlockEquation> R^+_H \approx |H|\times P(+|D^c) = 14985 </BlockEquation>

  <p>
    So $R^+_T \coloneqq R^+_H + R^+_S \approx 15982$ is the expected total
    number of performed tests which will result positive. However, among the
    subjects who tested positive, the fraction of those who actually have the
    disease is:
  </p>

  <BlockEquation>
    \frac{R^+_S}{R^+_T} \approx \frac{997}{15982} = 0.062 = P(D|+)
  </BlockEquation>

  <p>
    To summarize, even though positive test results are correct for $99.7\%$ of
    the subjects who have the disease, the number $|H|$ of tested subjects who
    do not have the disease being so much larger than the number $|S|$ of tested
    subjects who have it means the number of false positives of the former set
    ($R^+_H \approx 14985$) greatly exceeds the number of true positives of the
    latter set ($R^+_S \approx 997$). The accuracy of positive test results is
    therefore not good enough to make the test appropriate for detecting whether
    a randomly chosen subject in this population has the disease or not.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import mathjax from "@/mathjax";

onMounted(() => {
  mathjax.render();
});
</script>
