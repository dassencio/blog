<template>
  <p class="equation">
    $${{ boxed ? "\\boxed{" : "" }}
    <slot></slot>
    {{ boxed ? "}" : "" }}$$
  </p>
</template>

<script setup lang="ts">
defineProps<{
  boxed?: boolean;
}>();
</script>

<style scoped lang="scss">
.equation {
  /*
   * Equations need extra margin to account for paragraph line height,
   * otherwise they appear too close to the paragraphs above and below.
   */
  margin: $view-block-equation-vertical-margin 0 !important;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  :deep(mjx-container[display="true"]) {
    margin: 0;
  }
}
</style>
