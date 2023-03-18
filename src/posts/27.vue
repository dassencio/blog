<template>
  <p>
    I have recently released the first official version of a project I have
    worked on during the last few months. It's called
    <a href="https://github.com/dassencio/freeaml">freeAML</a>: an easy-to-use,
    free and open-source applied mathematics library written in C++.
  </p>

  <p>
    In this first version, the library contains the necessary basic data
    structures such as dense and sparse vectors/matrices, linear system solvers,
    linear least squares solvers and matrix factorization algorithms.
  </p>

  <p>
    FreeAML has an official webpage:
    <a href="http://freeaml.org">freeAML.org</a>. It contains lots of examples
    describing most of the tools available in the library and also an
    installation guide.
  </p>

  <p>I hope this helps someone out there. Have fun! ;-)</p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
