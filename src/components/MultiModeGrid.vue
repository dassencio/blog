<template>
  <p class="grid" :class="mode">
    <span class="grid__contents" :style="gridContentsStyle">
      <slot></slot>
    </span>
  </p>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  columns?: number;
  itemized?: boolean;
  mode: "list" | "table";
}

const props = withDefaults(defineProps<Props>(), {
  columns: 1,
  itemized: false,
});

const gridContentsStyle = computed(() =>
  props.mode === "list"
    ? {
        gridTemplateColumns: props.itemized ? "auto minmax(0, 1fr)" : "auto",
      }
    : {
        gridTemplateColumns: `repeat(${props.columns}, auto)`,
      }
);
</script>

<style scoped lang="scss">
.grid {
  &.list {
    margin-left: $view-indentation-length;
  }
  &.list &__contents {
    gap: $view-multi-mode-grid-vertical-gap $view-multi-mode-grid-horizontal-gap;
  }
  &.table {
    max-width: 100%;
    overflow-x: auto;
    text-align: center;
  }
  &.table &__contents {
    :deep(> *) {
      padding: $view-multi-mode-grid-vertical-padding
        $view-multi-mode-grid-horizontal-padding;
      white-space: nowrap;
    }
  }
  &__contents {
    display: inline-grid;
    :deep(> *) {
      line-height: $view-paragraph-line-height;
    }
  }
}
</style>
