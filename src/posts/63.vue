<template>
  <p>
    If you wish to pause the execution of an R script until the user presses the
    <code>&lt;Return&gt;</code> key, you can use the following pause function:
  </p>

  <CodeBlock
    language="R"
    code='
    pause = function() {
      if (interactive()) {
        invisible(readline(prompt = "Press <Return> to continue..."))
      }
      else {
        cat("Press <Return> to continue...")
        invisible(readLines(file("stdin"), 1))
      }
    }
    '
  />

  <p>
    This function works in both interactive and batch processing modes, meaning
    it operates effectively whether you're working within Rstudio, an R terminal
    session, or executing an R script using <code>Rscript</code>. Readers
    interested in learning more about the difference between these modes should
    check out
    <a
      href="http://www.r-bloggers.com/batch-processing-vs-interactive-sessions/"
      >this article</a
    >.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
