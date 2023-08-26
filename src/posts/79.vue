<template>
  <p>
    If you need to quickly determine the size and range of a given integer type
    in C/C++ (including <code>char</code>) for your architecture, there is no
    need to spend time writing a program to display these values using the
    <a href="https://en.wikipedia.org/wiki/Sizeof"><code>sizeof</code></a>
    operator or the
    <a href="http://en.cppreference.com/w/cpp/types/numeric_limits"
      ><code>std::numeric_limits</code></a
    >
    class template. Instead, if you're on Linux, simply open a terminal and run:
  </p>

  <CodeBlock code="less /usr/include/limits.h" />

  <p>This file should provide all the information you need. Enjoy! :-)</p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
