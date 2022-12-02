<template>
  <div class="table">
    <div
      class="table__contents"
      :style="{ gridTemplateColumns: `repeat(${columns}, auto)` }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: number;
}>();
</script>

<style scoped lang="scss">
.table {
  line-height: $view-paragraph-line-height;
  margin: $view-paragraph-vertical-margin 0;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  text-align: center;
  &__contents {
    display: inline-grid;
    gap: $view-table-block-vertical-gap $view-table-block-horizontal-gap;
  }
}
</style>
