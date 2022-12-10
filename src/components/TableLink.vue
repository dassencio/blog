<template>
  <a :href="tableLink(tableNumber)"><slot></slot></a>
</template>

<script setup lang="ts">
import { tableLink } from "@/functions";

defineProps<{
  tableNumber: number;
}>();
</script>
