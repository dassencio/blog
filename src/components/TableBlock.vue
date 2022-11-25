<template>
  <p class="table">
    <span
      class="table__contents"
      :style="{ gridTemplateColumns: `repeat(${columns}, auto)` }"
    >
      <slot></slot>
    </span>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  columns: number;
}>();
</script>

<style scoped lang="scss">
.table {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  text-align: center;
  &__contents {
    display: inline-grid;
    :deep(> *) {
      line-height: $view-paragraph-line-height;
      padding: $view-table-block-vertical-padding
        $view-table-block-horizontal-padding;
      white-space: nowrap;
    }
  }
}
</style>
