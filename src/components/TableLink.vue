<template>
  <a :href="tableLink"
    >{{ capitalized ? "Table" : "table" }} {{ tableNumber }}</a
  >
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { tableIdToHtmlId } from "@/functions";

const props = defineProps<{
  capitalized?: boolean;
  id: string;
}>();
const store = useStore();

const tableLink = computed(() => `#${tableIdToHtmlId(props.id)}`);
const tableNumber = computed(() => store.getters.tableNumber(props.id));
</script>
