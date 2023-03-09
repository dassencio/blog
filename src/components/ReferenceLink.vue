<template>
  [<a :href="referenceLink">{{ referenceNumber }}</a
  >]
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { referenceIdToHtmlId } from "@/functions";

const props = defineProps<{
  id: string;
}>();
const store = useStore();

const referenceLink = `#${referenceIdToHtmlId(props.id)}`;
const referenceNumber = computed(() => store.getters.referenceNumber(props));
</script>
