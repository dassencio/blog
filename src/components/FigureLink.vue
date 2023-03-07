<template>
  <a :href="figureLink"
    >{{ capitalized ? "Figure" : "figure" }} {{ figureNumber
    }}{{ subfigureLabel }}</a
  >
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { figureIdToHtmlId } from "@/functions";

const props = defineProps<{
  capitalized?: boolean;
  id: string;
  subfigureId?: string;
}>();
const store = useStore();

const figureLink = computed(() => `#${figureIdToHtmlId(props.id)}`);
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
