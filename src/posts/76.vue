<template>
  <p>
    Shell users often run commands using
    <a href="http://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm"
      >globbing patterns</a
    >. For example, in the command below, the asterisk (<code>*</code>) expands
    to a list of all files and subdirectories in the current working directory
    that end with <code>.pdf</code>:
  </p>

  <CodeBlock code="ls *.pdf" />

  <p>
    Bash also allows users to negate globbing patterns. For instance, in the
    command below, the expression <code>!(*.pdf)</code> expands to a list of all
    files and subdirectories that do not end with <code>.pdf</code>, such as
    <code>file.txt</code> or <code>song.mp3</code>:
  </p>

  <CodeBlock code="ls !(*.pdf)" />

  <p>
    This functionality is available for any globbing pattern. Note that in
    expressions with curly braces, negation is applied to each globbing pattern
    individually. To clarify, the command:
  </p>

  <CodeBlock code="ls !({*.pdf,prefix*})" />

  <p>is equivalent to the one below:</p>

  <CodeBlock code="ls {!(*.pdf),!(prefix*)}" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
