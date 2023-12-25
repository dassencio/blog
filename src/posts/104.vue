<template>
  <p>
    If you're using Linux and your MathJax fonts look unpleasant, and if you're
    certain that MathJax is correctly configured on the webpage you're accessing
    (e.g., by checking that things appear fine on another device or browser),
    then your browser is probably selecting the
    <a href="https://en.wikipedia.org/wiki/STIX_Fonts_project">STIX fonts</a>
    installed on your system instead of those provided by MathJax. The simplest
    solution to this issue is to remove these STIX fonts. If you're using
    Ubuntu/Debian, you can do this by opening a terminal and running the
    following command:
  </p>

  <CodeBlock code="sudo apt-get remove fonts-stix" />

  <p>
    You can now determine if this was the root cause of the problem by reloading
    the affected webpage with <code>Ctrl + Shift + R</code> (this action will
    force your browser to bypass its cache).
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
