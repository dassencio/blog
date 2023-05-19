<template>
  <p>
    On Linux, you can limit the amount of time a command is allowed to run using
    a CLI tool called
    <a href="http://man7.org/linux/man-pages/man1/timeout.1.html">timeout</a>:
  </p>

  <CodeBlock code="timeout <time> <command>" />

  <p>
    For example, to recursively list all files in the current working directory
    for no longer than two seconds, open a terminal and run:
  </p>

  <CodeBlock code="timeout 2s ls -R" />

  <p>
    The command which is passed as an argument to the
    <code>timeout</code> command will be automatically killed if it is still
    running after the specified amount of time, with exit status code
    <code>124</code>.
  </p>

  <p>For more on this topic, see the man page of <code>timeout</code>:</p>

  <CodeBlock code="man timeout" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
