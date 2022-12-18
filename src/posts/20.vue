<template>
  <p>
    Every time a commit is added to a Git repository, a hash string which
    identifies this commit is generated. This hash is computed with the
    <a href="https://en.wikipedia.org/wiki/SHA-1">SHA-1</a> algorithm and is 160
    bits (20 bytes) long. Expressed in hexadecimal notation, such hashes are
    40-digit strings.
  </p>

  <p>
    Since each commit must have a unique hash, one question that naturally
    arises is:
    <i>
      How likely is it that the hash generated for a future commit will coincide
      with the hash of some past commit?
    </i>
  </p>

  <p>
    This question is closely related to the
    <a href="https://en.wikipedia.org/wiki/Birthday_problem">birthday paradox</a
    >. In a <RouterLink :to="{ name: '19' }">previous post</RouterLink>, I have
    discussed the birthday paradox in detail and showed that when we randomly
    select $n$ elements from a
    <a href="https://en.wikipedia.org/wiki/Set_%28mathematics%29">set</a>
    containing $N$ elements (a set contains only distinct elements), the
    probability of obtaining the same element more than once will be greater
    than $50\%$ if $n \geq 1.2\sqrt{N}$ provided that $\sqrt{N} \gg 1$.
  </p>

  <p>
    Since each hash value produced by SHA-1 is 160 bits long, the total number
    of possible hash values is:
  </p>

  <EquationBlock>
    N_{\textrm{SHA-1}} = 2^{160} \approx 1.46 \cdot 10^{48}
  </EquationBlock>

  <p>
    Given that $\sqrt{N} = 2^{80} \approx 1.2 \cdot 10^{24} \gg 1$, this means
    that in order to obtain the same SHA-1 hash value for different inputs (in
    technical words, to obtain a
    <a href="https://en.wikipedia.org/wiki/Collision_(computer_science)"
      >hash collision</a
    >) with probability larger than $50\%$, we must generate approximately:
  </p>

  <EquationBlock>
    n \approx 1.2\sqrt{2^{160}} \approx 1.45 \cdot 10^{24}
  </EquationBlock>

  <p>hashes.</p>

  <p>
    Assume that a given project contains $D$ active developers who generate
    $C_{\textrm{day}}$ commits per day. The number of commits
    $C^T_{\textrm{year}}$ generated per year by such a group is (years with
    $366$ days are ignored here, but the impact of this assumption on the end
    result is negligible for our purposes):
  </p>

  <EquationBlock> C^T_{\textrm{year}} = 365 D C_{\textrm{day}} </EquationBlock>

  <p>
    At this rate, the number of years $Y$ necessary to produce a hash collision
    with $50\%$ probability is given by:
  </p>

  <EquationBlock>
    Y = \frac{1.45 \cdot 10^{24}}{C^T_{\textrm{year}}} \Longrightarrow Y \approx
    \frac{4 \cdot 10^{21}}{D C_{\textrm{day}}} \label{eq_y}
  </EquationBlock>

  <p>
    Consider now an extreme scenario where the entire human population consists
    of only developers (approximately $7$ billion in total), and that each
    person generates a new commit every second without interruptions (i.e., no
    one ever sleeps or takes a break). Equation \eqref{eq_y} then yields:
  </p>

  <EquationBlock>
    Y \approx \frac{4 \cdot 10^{21}}{(7 \cdot 10^9)(86400)} \approx 6.6 \cdot
    10^6 \textrm{years}
  </EquationBlock>

  <p>
    We would therefore need approximately $6.6$ million years to produce a
    number of commits large enough to create a hash collision with $50\%$
    probability!
  </p>

  <p>
    In a more realistic scenario, a large project might have $ 1000$ active
    developers who commit $10$ commits per day. In these circumstances, it would
    take approximately $4 \cdot 10^{17}$ years for a collision to happen with
    $50\%$ probability. For comparison, the
    <a href="https://en.wikipedia.org/wiki/Age_of_the_universe"
      >age of the universe</a
    >
    is estimated to be $13.8 \cdot 10^9$ years.
  </p>

  <p>
    To summarize, the probability of producing a hash collision on a Git
    repository is so small that it will very likely not happen during our
    lifetimes. In any case, if you're wondering what would happen to a
    repository in the event of a hash collision, you can find the answer in
    <a
      href="http://stackoverflow.com/questions/9392365/how-would-git-handle-a-sha-1-collision-on-a-blob"
    >
      this page</a
    >.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
