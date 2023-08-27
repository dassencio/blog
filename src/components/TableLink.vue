<template>
  <span v-html="tableLink(id, tableNumber, capitalized)"></span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { tableLink } from "@/functions";

const props = defineProps<{
  capitalized?: boolean;
  id: string;
}>();
const store = useStore();

const tableNumber = computed(() => store.getters.tableNumber(props));
</script>
