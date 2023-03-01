<template>
  [<a :href="referenceLink(referenceNumber)">{{ referenceNumber }}</a
  >]
</template>

<script setup lang="ts">
import { referenceLink } from "@/functions";

defineProps<{
  referenceNumber: number;
}>();
</script>
