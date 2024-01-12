<template>
  <div class="subfigure">
    <slot></slot>
    <div class="subfigure__label">({{ subfigureLabel }})</div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { useStore } from "vuex";
import _ from "lodash";

const parentId = inject("parentId");
const props = defineProps<{
  id?: string;
}>();
const store = useStore();

const subfigure = {
  id: props.id ?? _.uniqueId("__subfigure__"),
  parentId,
};

store.dispatch("registerSubfigure", subfigure);

const subfigureLabel = computed(() => store.getters.subfigureLabel(subfigure));
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
