<template>
  <p>
    Using the basic operations of
    <a href="https://en.wikipedia.org/wiki/Relational_algebra"
      >relational algebra</a
    >
    (RA), we can obtain the largest value assigned to a given attribute of a
    relation. This post will show how this can be done.
  </p>

  <p>
    To begin, let's consider the following operators of RA (below, $R$ and $S$
    are relations):
  </p>

  <MapBlock>
    <span>$\sigma_{\theta}(R)$</span>
    <span>
      <a href="https://en.wikipedia.org/wiki/Selection_%28relational_algebra%29"
        >Select tuples</a
      >
      (rows) from $R$ that satisfy the condition $\theta$, where $\theta$
      consists of comparisons of attributes from $R$ using the following binary
      operators: $\lt$, $\leq$, $=$, $\geq$, and $\gt$.
    </span>

    <span>$\Pi_{a_1,\ldots,a_n}(R)$</span>
    <span>
      <a
        href="https://en.wikipedia.org/wiki/Projection_%28relational_algebra%29"
        >Extract attributes</a
      >
      (columns) $a_1,\ldots,a_n$ from $R$. Duplicate tuples are discarded, so
      each tuple in the resulting relation is unique.
    </span>

    <span>$\rho_{a/b}(R)$</span>
    <span>
      <a href="https://en.wikipedia.org/wiki/Rename_%28relational_algebra%29"
        >Rename</a
      >
      attribute $b$ in $R$ to $a$.
    </span>

    <span>$R \bowtie_{\theta} S$</span>
    <span>
      <a
        href="https://en.wikipedia.org/wiki/Relational_algebra#.CE.B8-join_and_equijoin"
        >$\theta$-join</a
      >
      of $R$ and $S$: Compute all combinations of tuples from $R$ and $S$ that
      satisfy the condition $\theta$ ($R \bowtie_{\theta} S = \sigma_{\theta}(R
      \times S)$, where $R \times S$ is the Cartesian product of $R$ and $S$).
    </span>
  </MapBlock>

  <p>Now, consider the relation $P$ below:</p>

  <TableBlock :columns="2" caption="A simple relation.">
    <b>Name</b>
    <b>Age</b>

    <span>Peter</span>
    <span>21</span>

    <span>Bob</span>
    <span>25</span>

    <span>Alice</span>
    <span>32</span>

    <span>John</span>
    <span>27</span>
  </TableBlock>

  <p>
    The maximum age of the people listed in $P$ can be retrieved as follows:
  </p>

  <EquationBlock>
    \max_{P}(\textrm{Age}) \ColonEq \Pi_{\textrm{Age}} P -
    \Pi_{\textrm{Age}}\left[ P \underset{\textrm{Age} \lt
    \textrm{Age2}}{\bowtie}
    \left(\rho_{\textrm{Name2/Name}}\rho_{\textrm{Age2/Age}} P\right)\right]
  </EquationBlock>

  <p>
    In other words, we first obtain a relation $\Pi_{\textrm{Age}} P$ that
    contains a single column with all ages, and then subtract from it the set of
    all ages which are smaller than some other age. To clarify the second part,
    notice that:
  </p>

  <EquationBlock>
    P \underset{\textrm{Age} \lt \textrm{Age2}}{\bowtie}
    \left(\rho_{\textrm{Name2/Name}}\rho_{\textrm{Age2/Age}} P\right)
  </EquationBlock>

  <p>
    is a relation containing four columns $(\textrm{Name}$, $\textrm{Age}$,
    $\textrm{Name2}$, $\textrm{Age2})$, with each of its tuples satisfying
    $\textrm{Age} \lt \textrm{Age2}$. Applying $\Pi_{\textrm{Age}}$ to this
    relation results in another relation with a single column $(\textrm{Age})$
    containing all original age values from $P$ that are smaller than some other
    age value in $P$. Therefore, the relation
  </p>

  <EquationBlock>
    \Pi_{\textrm{Age}}\left[ P \underset{\textrm{Age} \lt
    \textrm{Age2}}{\bowtie}
    \left(\rho_{\textrm{Name2/Name}}\rho_{\textrm{Age2/Age}} P\right)\right]
  </EquationBlock>

  <p>
    contains all ages except the largest one, so removing these values from
    $\Pi_{\textrm{Age}} P$ yields a relation with only a single age value: the
    largest one.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
