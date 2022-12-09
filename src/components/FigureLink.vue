<template>
  <a :href="figureLink(figureNumber)"><slot></slot></a>
</template>

<script setup lang="ts">
import { figureLink } from "@/functions";

defineProps<{
  figureNumber: number;
}>();
</script>
