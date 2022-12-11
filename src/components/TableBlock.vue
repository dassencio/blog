<template>
  <div class="table" :id="tableId(tableNumber)">
    <div
      class="table__contents"
      :style="{ gridTemplateColumns: `repeat(${columns}, auto)` }"
    >
      <slot></slot>
    </div>
  </div>
  <CaptionBlock :caption="caption" :tableNumber="tableNumber" />
</template>

<script setup lang="ts">
import CaptionBlock from "@/components/CaptionBlock.vue";
import { tableId } from "@/functions";

defineProps<{
  caption: string;
  columns: number;
  tableNumber: number;
}>();
</script>

<style scoped lang="scss">
.table {
  display: flex;
  justify-content: center;
  line-height: $view-paragraph-line-height;
  margin: $view-paragraph-vertical-margin 0;
  &__contents {
    display: inline-grid;
    gap: $view-table-block-vertical-gap $view-table-block-horizontal-gap;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
