<template>
  <div class="figure" :id="figureId(figureNumber)">
    <div class="figure__contents"><slot></slot></div>
    <CaptionBlock :caption="caption" :figureNumber="figureNumber" />
  </div>
</template>

<script setup lang="ts">
import CaptionBlock from "@/components/CaptionBlock.vue";
import { figureId } from "@/functions";

defineProps<{
  caption: string;
  figureNumber: number;
}>();
</script>

<style scoped lang="scss">
.figure {
  margin: $view-paragraph-vertical-margin 0;
  padding-top: $view-vertical-correction-padding;
  &__contents {
    display: flex;
    flex-wrap: wrap;
    gap: $view-figure-contents-gap;
    justify-content: center;
  }
}
</style>
