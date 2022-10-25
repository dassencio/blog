<template>
  <span class="subfigure">
    <slot></slot>
    <span class="subfigure__label">{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<style scoped lang="scss">
.subfigure {
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: $view-subfigure-vertical-gap;
  &__label {
    line-height: 1;
  }
}
</style>
