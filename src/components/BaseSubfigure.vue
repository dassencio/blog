<template>
  <div class="subfigure">
    <slot></slot>
    <div class="subfigure__label">({{ subfigureLabel }})</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  id: string;
  parentId: string;
}>();

const store = useStore();

store.dispatch("registerSubfigure", props);

const subfigureLabel = computed(() => store.getters.subfigureLabel(props));
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
