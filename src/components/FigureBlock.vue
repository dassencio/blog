<template>
  <div class="figure" :id="figureHtmlId">
    <div class="figure__contents"><slot></slot></div>
  </div>
  <CaptionBlock :caption="caption" :figureNumber="figureNumber" />
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import { useStore } from "vuex";
import _ from "lodash";
import CaptionBlock from "@/components/CaptionBlock.vue";
import { figureIdToHtmlId } from "@/functions";

const props = defineProps<{
  caption: string;
  id?: string;
}>();
const store = useStore();

const figure = {
  id: props.id ?? _.uniqueId("__figure__"),
};

store.dispatch("registerFigure", figure);

provide("parentId", figure.id);

const figureHtmlId = figureIdToHtmlId(figure.id);
const figureNumber = computed(() => store.getters.figureNumber(figure));
</script>

<style scoped lang="scss">
.figure {
  margin: $view-paragraph-vertical-margin 0;
  padding-top: $view-vertical-correction-padding;
  &__contents {
    display: flex;
    flex-wrap: wrap;
    gap: $view-figure-contents-vertical-gap $view-figure-contents-horizontal-gap;
    justify-content: center;
  }
}
</style>
