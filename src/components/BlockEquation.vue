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
$base-length: $view-paragraph-font-size;

.equation {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  :deep(mjx-container[display="true"]) {
    margin: 0 !important;
    /*
     * Add extra padding to account for paragraph line height. Without this
     * correction, equations appear too close to the paragraphs above and below.
     */
    padding: (0.5 * ($view-paragraph-line-height - 1) * $base-length) 0 !important;
  }
}
</style>
