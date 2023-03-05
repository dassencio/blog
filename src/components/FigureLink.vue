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
  subfigureLabel?: string;
}>();
const store = useStore();

const figureLink = computed(() => `#${figureIdToHtmlId(props.id)}`);
const figureNumber = computed(() => store.getters.figureNumber(props.id));
</script>
