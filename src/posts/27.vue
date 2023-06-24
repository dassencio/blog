<template>
  <p>
    I recently released the first official version of a project I have been
    working on for the last few months. It's called
    <a href="https://github.com/dassencio/freeaml">freeAML</a>: an easy-to-use,
    free, and open-source applied mathematics library written in C++.
  </p>

  <p>
    In this first version, the library contains essential data structures such
    as dense and sparse vectors/matrices as well as linear system solvers,
    linear least squares solvers, and matrix factorization algorithms.
  </p>

  <p>
    Examples describing most of the tools available in the library, as well as
    an installation guide, are available
    <a href="https://github.com/dassencio/freeaml#available-tools">here</a>.
    Enjoy! ;-)
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
