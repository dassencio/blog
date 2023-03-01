<template>
  <ListBlockItem
    :id="referenceId(referenceNumber)"
    :bullet="`[${referenceNumber}]`"
  >
    <a :href="url"
      ><i>{{ title }}</i></a
    >{{ displayAuthors(authors || []) }}
  </ListBlockItem>
</template>

<script setup lang="ts">
import { referenceId } from "@/functions";

function displayAuthors(authors: string[]): string {
  if (authors.length === 0) {
    return "";
  }
  if (authors.length === 1) {
    return `, by ${authors[0]}`;
  }
  return `, by ${authors.slice(0, -1).join(", ")} and ${authors.slice(-1)}`;
}

defineProps<{
  authors?: string[];
  referenceNumber: number;
  title: string;
  url: string;
}>();
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
