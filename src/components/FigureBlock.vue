<template>
  <div class="figure" :id="figureHtmlId">
    <div class="figure__contents"><slot></slot></div>
  </div>
  <CaptionBlock :caption="caption" :figureNumber="figureNumber" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import CaptionBlock from "@/components/CaptionBlock.vue";
import { figureIdToHtmlId } from "@/functions";

const props = defineProps<{
  caption: string;
  id: string;
}>();
const store = useStore();

store.dispatch("registerFigure", props.id);

const figureHtmlId = computed(() => figureIdToHtmlId(props.id));
const figureNumber = computed(() => store.getters.figureNumber(props.id));
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
