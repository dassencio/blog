<template>
  <p>
    In this post, we will prove that the set $\mathcal{L}_{\{0,1\}}$ of all
    <a href="https://en.wikipedia.org/wiki/Formal_language">languages</a> over
    the set $\{0,1\}$ is not
    <a href="https://en.wikipedia.org/wiki/Countable_set">countable</a>. In
    other words, we cannot
    <a href="https://en.wikipedia.org/wiki/Enumeration">enumerate</a> the
    infinitely many languages in $\mathcal{L}_{\{0,1\}}$. A language over
    $\{0,1\}$ is a set of finite-length strings formed using only the symbols
    $0$ and $1$. For example, $\{0, 10, 01, 101\}$ and $\{1, 10, 100, 1000,
    \ldots\}$ are languages over $\{0,1\}$. Note that while each string in a
    language must have a finite length, the language itself can contain
    infinitely many strings, as illustrated by the second example.
  </p>

  <p>
    Our proof relies on a
    <a href="https://en.wikipedia.org/wiki/Proof_by_contradiction"
      >contradiction</a
    >
    that arises when we consider $\mathcal{L}_{\{0,1\}}$ as countable. We begin
    by proving that we can enumerate the strings in the set $W$ of all
    finite-length strings over $\{0,1\}$. This enumeration is facilitated by
    defining $W' = \{1s \mid s \in W\}$, a set derived by prefixing a $1$ to
    each string in $W$. For example, the string $0110 \in W$ translates to
    $10110$ in $W'$, which is the binary representation of the
    <a href="https://en.wikipedia.org/wiki/Natural_number">natural number</a>
    $22$ (in decimal notation). The creation of $W'$ addresses a potential
    overlap in $W$, where strings like $0010$ and $10$ represent the same
    natural number in binary despite the leading zeros. Assuming that zero is
    not a natural number, every natural number has a binary representation with
    its leftmost digit being $1$, meaning each natural number finds its
    representation in $W'$. Conversely, every string in $W'$ represents a
    natural number. This relationship allows us to set up a
    <a href="https://en.wikipedia.org/wiki/Bijection">one-to-one</a>
    correspondence between $W'$ and $\mathbb{N}$. And since every string in $W'$
    is associated with a string in $W$ (achieved by simply removing the leading
    $1$), there is a one-to-one mapping between $W$ and $W'$, and by extension,
    between $W$ and $\mathbb{N}$. Consequently, $W$ is countable, which means
    the strings in $W$ can be ordered in a sequence: $W = \{s_1, s_2, s_3,
    \ldots\}$, with $s_j$ being the $j$-th string over $\{0,1\}$.
  </p>

  <p>
    Let's now assume that $\mathcal{L}_{\{0,1\}}$ is countable, meaning
    $\mathcal{L}_{\{0,1\}} = \{L_1, L_2, L_3, \ldots\}$, with each $L_i$
    representing a language over $\{0,1\}$. Considering that each $L_i$ consists
    of elements (strings) from $W$, and given that $W$ is countable, we can
    construct a table with row indices representing language indices and column
    indices representing string indices. In this table, for every cell at row
    index $i$ and column index $j$, we will mark it with a $1$ if the language
    $L_i$ includes the string $s_j$, and $0$ otherwise. Such a table provides a
    comprehensive view of which strings $s_j \in W$ are present in each language
    $L_i \in \mathcal{L}_{\{0,1\}}$. Here is an illustrative example of how this
    table might look like:
  </p>

  <TableBlock
    id="languages"
    :columns="6"
    caption="Table representation of languages $L_i \in \mathcal{L}_{\{0,1\}}$.
             A cell contains a $1$ if the corresponding language includes the
             string, and $0$ otherwise."
  >
    <span></span>
    <span>$s_1$</span>
    <span>$s_2$</span>
    <span>$s_3$</span>
    <span>$s_4$</span>
    <span>$\ldots$</span>

    <span>$L_1$</span>
    <span>$1$</span>
    <span>$0$</span>
    <span>$1$</span>
    <span>$1$</span>
    <span>$\ldots$</span>

    <span>$L_2$</span>
    <span>$0$</span>
    <span>$0$</span>
    <span>$0$</span>
    <span>$1$</span>
    <span>$\ldots$</span>

    <span>$L_3$</span>
    <span>$1$</span>
    <span>$1$</span>
    <span>$0$</span>
    <span>$0$</span>
    <span>$\ldots$</span>

    <span>$L_4$</span>
    <span>$0$</span>
    <span>$0$</span>
    <span>$1$</span>
    <span>$1$</span>
    <span>$\ldots$</span>

    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\ddots$</span>
  </TableBlock>

  <p>
    Now, let's consider a language constructed using the following method: for
    every diagonal cell in <TableLink id="languages" />, invert its value. Then,
    gather all strings $s_j$ where the inverted diagonal cell in the column of
    $s_j$ holds a value of $1$. Denote this set of strings as
    $L_{\textrm{diag}}$.
  </p>

  <p>
    For a clearer understanding of how $L_{\textrm{diag}}$ is formed, see
    <TableLink id="inverted-diagonal" />, which is the result of inverting the
    diagonal entries of <TableLink id="languages" />.
  </p>

  <TableBlock
    id="inverted-diagonal"
    :columns="6"
    :caption="`Table generated by inverting the diagonal entries from
              ${languagesLink}.`"
  >
    <span></span>
    <span>$s_1$</span>
    <span>$s_2$</span>
    <span>$s_3$</span>
    <span>$s_4$</span>
    <span>$\ldots$</span>

    <span>$L_1$</span>
    <span class="highlight">$0$</span>
    <span>$0$</span>
    <span>$1$</span>
    <span>$1$</span>
    <span>$\ldots$</span>

    <span>$L_2$</span>
    <span>$0$</span>
    <span class="highlight">$1$</span>
    <span>$0$</span>
    <span>$1$</span>
    <span>$\ldots$</span>

    <span>$L_3$</span>
    <span>$1$</span>
    <span>$1$</span>
    <span class="highlight">$1$</span>
    <span>$0$</span>
    <span>$\ldots$</span>

    <span>$L_4$</span>
    <span>$0$</span>
    <span>$0$</span>
    <span>$1$</span>
    <span class="highlight">$0$</span>
    <span>$\ldots$</span>

    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\ddots$</span>
  </TableBlock>

  <p>
    From the procedure just described, $L_{\textrm{diag}} = \{s_2, s_3,
    \ldots\}$, so $L_{\textrm{diag}}$ does not contain $s_1$ or $s_4$ but does
    contain $s_2$ and $s_3$.
  </p>

  <p>
    $L_{\textrm{diag}}$ is a language with a special property: it differs from
    every language $L_i$ in $\mathcal{L}_{\{0,1\}}$. Indeed, for every $L_i$ in
    $\mathcal{L}_{\{0,1\}}$, if $L_i$ contains $s_i$, $L_{\textrm{diag}}$ does
    not. Conversely, if $L_i$ does not contain $s_i$, $L_{\textrm{diag}}$ does.
    This implies $L_{\textrm{diag}}$ is not equal to $L_i$ for any $L_i$ in
    $\mathcal{L}_{\{0,1\}}$, which means $L_{\textrm{diag}}$ is not in
    $\mathcal{L}_{\{0,1\}}$. However, since $L_{\textrm{diag}}$ is a set of
    strings from $W$, it is a language over $\{0,1\}$ and therefore should be in
    $\mathcal{L}_{\{0,1\}}$. This contradiction proves that
    $\mathcal{L}_{\{0,1\}}$ cannot be countable.
  </p>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { onViewMounted, tableLink } from "@/functions";
import store from "@/store";

onMounted(() => onViewMounted());

const languagesLink = computed(() =>
  tableLink("languages", store.getters.tableNumber({ id: "languages" }))
);
</script>

<style scoped lang="scss">
.highlight {
  color: crimson;
}
</style>
