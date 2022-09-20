<template>
  <p class="list" :style="style">
    <slot></slot>
  </p>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  itemized?: boolean;
}>();

const style = computed(() => ({
  gridTemplateColumns: props.itemized ? "auto minmax(0, 1fr)" : "1fr",
}));
</script>

<style scoped lang="scss">
.list {
  display: grid;
  gap: $view-responsive-list-vertical-gap $view-responsive-list-horizontal-gap;
  margin-left: $view-indentation-length;
  :deep(> *) {
    line-height: $view-paragraph-line-height;
  }
}
</style>
