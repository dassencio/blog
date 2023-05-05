<template>
  <span
    v-html="figureLink(id, figureNumber, subfigureLabel, capitalized)"
  ></span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { figureLink } from "@/functions";

const props = defineProps<{
  capitalized?: boolean;
  id: string;
  subfigureId?: string;
}>();
const store = useStore();

const figureNumber = computed(() => store.getters.figureNumber(props));
const subfigureLabel = computed(() =>
  props.subfigureId
    ? store.getters.subfigureLabel({
        id: props.subfigureId,
        parentId: props.id,
      })
    : ""
);
</script>
