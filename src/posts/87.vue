<template>
  <p>
    I have recently published solutions which I wrote in C++ for many of the
    problems from the book "<a href="http://www.crackingthecodinginterview.com/"
      >Cracking the Coding Interview</a
    >: 150 Programming Interview Questions and Solutions", 4th edition. They can
    be found
    <a href="https://github.com/dassencio/cracking-the-coding-interview">here</a
    >.
  </p>

  <p>
    These solutions were very carefully written and tested. Whenever possible, I
    have tested results obtained from sophisticated approaches to a problem
    against more elementary ones such as brute force. This means that most
    problems are solved in at least two different ways, and results from
    different techniques are compared to enhance trust in their correctness.
  </p>

  <p>
    Bug fixes and suggestions for improvement will be very much appreciated.
    Enjoy! :-)
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
