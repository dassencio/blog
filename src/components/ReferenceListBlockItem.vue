<template>
  <ListBlockItem :id="referenceHtmlId" :bullet="`[${referenceNumber}]`">
    <a :href="url"
      ><i>{{ title }}</i></a
    >{{ displayAuthors(authors || []) }}
  </ListBlockItem>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import _ from "lodash";
import { referenceIdToHtmlId } from "@/functions";

function displayAuthors(authors: string[]): string {
  if (authors.length === 0) {
    return "";
  }
  if (authors.length === 1) {
    return `, by ${authors[0]}`;
  }
  return `, by ${authors.slice(0, -1).join(", ")} and ${authors.slice(-1)}`;
}

const props = defineProps<{
  authors?: string[];
  id?: string;
  title: string;
  url: string;
}>();
const store = useStore();

const reference = {
  id: props.id || _.uniqueId("__reference__"),
};

store.dispatch("registerReference", reference);

const referenceHtmlId = referenceIdToHtmlId(reference.id);
const referenceNumber = computed(() =>
  store.getters.referenceNumber(reference)
);
</script>

<style scoped lang="scss">
.item {
  line-height: $view-paragraph-line-height;
  text-align: left;
  @media (min-width: $desktop-width-mode) {
    text-align: justify;
  }
}
</style>
