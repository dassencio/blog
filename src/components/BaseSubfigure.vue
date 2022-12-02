<template>
  <div class="subfigure">
    <slot></slot>
    <div class="subfigure__label">{{ label }}</div>
  </div>
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
  justify-content: flex-end;
  row-gap: $view-subfigure-vertical-gap;
  &__label {
    line-height: 1;
  }
}
</style>
