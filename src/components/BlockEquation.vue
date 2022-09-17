<template>
  <p class="equation">
    $$
    {{ boxed ? "\\boxed{" : "" }}
    {{ align ? "\\begin{align}" : "" }}
    <slot></slot>
    {{ align ? "\\end{align}" : "" }}
    {{ boxed ? "}" : "" }}
    $$
  </p>
</template>

<script setup lang="ts">
defineProps<{
  align?: boolean;
  boxed?: boolean;
}>();
</script>

<style scoped lang="scss">
.equation {
  /*
   * Equations need extra padding to account for paragraph line height,
   * otherwise they appear too close to the paragraphs above and below. Using
   * margin instead of padding does not fix the problem since adjacent equations
   * still appear closer to each other than adjacent text paragraphs.
   */
  padding: 0.5 * ($view-paragraph-line-height - $view-paragraph-font-size) 0;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  :deep(mjx-container[display="true"]) {
    margin: 0;
  }
}
</style>
