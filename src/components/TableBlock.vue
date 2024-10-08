<template>
  <div class="table" :id="tableHtmlId">
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
import { computed } from "vue";
import { useStore } from "vuex";
import _ from "lodash";
import CaptionBlock from "@/components/CaptionBlock.vue";
import { tableIdToHtmlId } from "@/functions";

const props = defineProps<{
  caption: string;
  columns: number;
  id?: string;
}>();
const store = useStore();

const table = {
  id: props.id ?? _.uniqueId("__table__"),
};

store.dispatch("registerTable", table);

const tableHtmlId = tableIdToHtmlId(table.id);
const tableNumber = computed(() => store.getters.tableNumber(table));
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
